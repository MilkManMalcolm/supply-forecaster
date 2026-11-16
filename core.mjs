// Browser/Node shared forecasting engine. No network or dependencies.
export const HEADERS = ['date', 'product_name', 'units_baked', 'units_sold', 'sold_out', 'forecast_temperature_c', 'forecast_rain_mm', 'is_holiday', 'nearby_event'];
export const LIMITS = Object.freeze({ maxBytes: 5_000_000, warnBytes: 1_000_000, maxRows: 20_000, warnRows: 8_000, maxProducts: 30, maxSpanDays: 7_305, maxNameLength: 120, minHistoryDays: 56, minEligibleRows: 40, minProductEligibleRows: 14 });
export const HYPERPARAMETERS = Object.freeze({ trees: 48, learningRate: 0.10, maxDepth: 3, minLeaf: 12, minGain: 1e-8 });
const DAY_MS = 86_400_000;

export class EngineError extends Error {
  constructor(code, params = {}) { super(code); this.name = 'EngineError'; this.code = code; this.params = params; }
}
const fail = (code, params = {}) => { throw new EngineError(code, params); };
export function isoDay(day) { return new Date(day * DAY_MS).toISOString().slice(0, 10); }
export function parseDay(value, row) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) fail('INVALID_DATE', { row, value });
  const ms = Date.parse(value + 'T00:00:00.000Z');
  if (!Number.isFinite(ms) || new Date(ms).toISOString().slice(0, 10) !== value) fail('INVALID_DATE', { row, value });
  if (value === '9999-12-31') fail('DATE_OUT_OF_RANGE', { row, value });
  return ms / DAY_MS;
}

// RFC-4180-style CSV scanner, with LF or CRLF. Reject malformed quoting.
export function parseCsvRows(csv) {
  if (typeof csv !== 'string') fail('INVALID_CSV_INPUT');
  const bytes = new TextEncoder().encode(csv).length;
  if (bytes > LIMITS.maxBytes) fail('FILE_TOO_LARGE', { bytes, maxBytes: LIMITS.maxBytes });
  if (!csv.length) fail('EMPTY_FILE');
  if (csv.charCodeAt(0) === 0xFEFF) csv = csv.slice(1);
  const rows = []; let row = [], cell = '', state = 'start';
  const finishCell = () => { row.push(cell); cell = ''; state = 'start'; };
  const finishRow = () => { finishCell(); rows.push(row); row = []; if (rows.length > LIMITS.maxRows + 1) fail('TOO_MANY_ROWS', { maxRows: LIMITS.maxRows }); };
  for (let i = 0; i < csv.length; i++) {
    const c = csv[i];
    if (state === 'quoted') {
      if (c === '"') { if (csv[i + 1] === '"') { cell += '"'; i++; } else state = 'closed'; }
      else cell += c;
    } else if (state === 'closed') {
      if (c === ',') finishCell();
      else if (c === '\n' || c === '\r') { if (c === '\r' && csv[i + 1] === '\n') i++; finishRow(); }
      else fail('MALFORMED_CSV', { row: rows.length + 1 });
    } else if (c === ',') finishCell();
    else if (c === '\n' || c === '\r') { if (c === '\r' && csv[i + 1] === '\n') i++; finishRow(); }
    else if (c === '"') { if (state !== 'start') fail('MALFORMED_CSV', { row: rows.length + 1 }); state = 'quoted'; }
    else { cell += c; state = 'plain'; }
  }
  if (state === 'quoted') fail('MALFORMED_CSV', { row: rows.length + 1 });
  if (row.length || cell.length || state === 'closed') finishRow();
  return { rows, bytes };
}

function whole(value, field, row) {
  if (!/^\d+$/.test(value)) fail('INVALID_UNITS', { row, field, value });
  const n = Number(value);
  if (!Number.isSafeInteger(n)) fail('INVALID_UNITS', { row, field, value });
  return n;
}
function decimal(value, field, row) {
  if (!/^[+-]?(?:\d+(?:\.\d*)?|\.\d+)(?:[eE][+-]?\d+)?$/.test(value)) fail('INVALID_NUMBER', { row, field, value });
  const n = Number(value);
  if (!Number.isFinite(n)) fail('INVALID_NUMBER', { row, field, value });
  return n;
}
function flag(value, field, row) {
  if (value !== '0' && value !== '1') fail('INVALID_FLAG', { row, field, value });
  return value === '1';
}

export function loadDataset(csv) {
  const { rows, bytes } = parseCsvRows(csv);
  if (!rows.length) fail('EMPTY_FILE');
  if (rows[0].length !== HEADERS.length || rows[0].some((v, i) => v !== HEADERS[i])) fail('INVALID_HEADERS', { expected: HEADERS.join(',') });
  if (rows.length === 1) fail('NO_DATA_ROWS');
  const records = [], productsSet = new Set(), seen = new Set(), counts = new Map();
  for (let i = 1; i < rows.length; i++) {
    const row = rows[i], rowNumber = i + 1;
    if (row.length !== HEADERS.length) fail('INVALID_COLUMN_COUNT', { row: rowNumber, expected: HEADERS.length, actual: row.length });
    if (row.some(v => !v.trim())) fail('MISSING_VALUE', { row: rowNumber, field: HEADERS[row.findIndex(v => !v.trim())] });
    const v = row.map(x => x.trim());
    const day = parseDay(v[0], rowNumber), product = v[1];
    if (product.length > LIMITS.maxNameLength) fail('PRODUCT_NAME_TOO_LONG', { row: rowNumber, maxLength: LIMITS.maxNameLength });
    const baked = whole(v[2], HEADERS[2], rowNumber), sold = whole(v[3], HEADERS[3], rowNumber);
    if (sold > baked) fail('SOLD_EXCEEDS_BAKED', { row: rowNumber, sold, baked });
    const stockout = flag(v[4], HEADERS[4], rowNumber), temperature = decimal(v[5], HEADERS[5], rowNumber), rain = decimal(v[6], HEADERS[6], rowNumber);
    if (rain < 0) fail('NEGATIVE_RAIN', { row: rowNumber, value: rain });
    const holiday = flag(v[7], HEADERS[7], rowNumber), event = flag(v[8], HEADERS[8], rowNumber);
    // A JSON tuple avoids any separator ambiguity in arbitrary product names.
    const key = JSON.stringify([product, day]);
    if (seen.has(key)) fail('DUPLICATE_PRODUCT_DATE', { row: rowNumber, product, date: v[0] });
    seen.add(key); productsSet.add(product);
    if (productsSet.size > LIMITS.maxProducts) fail('TOO_MANY_PRODUCTS', { maxProducts: LIMITS.maxProducts });
    counts.set(day, (counts.get(day) || 0) + 1);
    records.push({ day, date: v[0], product, baked, sold, stockout, temperature, rain, holiday, event });
  }
  const products = [...productsSet].sort((a, b) => a < b ? -1 : a > b ? 1 : 0);
  const days = [...counts.keys()].sort((a, b) => a - b);
  if (days[days.length - 1] - days[0] + 1 > LIMITS.maxSpanDays) fail('DATE_SPAN_TOO_LARGE', { maxDays: LIMITS.maxSpanDays });
  let endDay;
  for (let i = days.length - 1; i >= 0; i--) if (counts.get(days[i]) === products.length) { endDay = days[i]; break; }
  if (endDay === undefined) fail('NO_COMPLETE_DAY', { productCount: products.length });
  const kept = records.filter(r => r.day <= endDay).sort((a, b) => a.day - b.day || (a.product < b.product ? -1 : a.product > b.product ? 1 : 0));
  const startDay = kept[0].day, span = endDay - startDay + 1;
  const keptDays = days.filter(d => d <= endDay), missingDays = span - keptDays.length;
  const missingRows = span * products.length - kept.length;
  const warnings = [];
  const dropped = records.length - kept.length;
  if (dropped) warnings.push({ code: 'INCOMPLETE_LATEST_DAYS', params: { endDate: isoDay(endDay), ignoredRows: dropped, ignoredDays: days.filter(d => d > endDay).length } });
  if (missingDays) warnings.push({ code: 'MISSING_DATES', params: { count: missingDays } });
  if (missingRows) warnings.push({ code: 'INCOMPLETE_PRODUCT_HISTORY', params: { missingRows } });
  if (bytes > LIMITS.warnBytes || records.length > LIMITS.warnRows) warnings.push({ code: 'LARGE_DATASET', params: { bytes, rows: records.length, maxBytes: LIMITS.maxBytes, maxRows: LIMITS.maxRows } });
  const productCounts = new Map(products.map(p => [p, 0])), seenProducts = new Set();
  for (const r of kept) {
    if (seenProducts.has(r.product) && !r.stockout) productCounts.set(r.product, productCounts.get(r.product) + 1);
    seenProducts.add(r.product);
  }
  const eligibleRows = [...productCounts.values()].reduce((sum, count) => sum + count, 0);
  if (span < LIMITS.minHistoryDays || eligibleRows < LIMITS.minEligibleRows) warnings.push({ code: 'INSUFFICIENT_HISTORY', params: { days: span, minDays: LIMITS.minHistoryDays, eligibleRows, minRows: LIMITS.minEligibleRows } });
  for (const product of products) {
    const n = productCounts.get(product);
    if (n < LIMITS.minProductEligibleRows) warnings.push({ code: 'INSUFFICIENT_PRODUCT_HISTORY', params: { product, eligibleRows: n, minRows: LIMITS.minProductEligibleRows } });
  }
  const meta = { startDate: isoDay(startDay), endDate: isoDay(endDay), forecastDate: isoDay(endDay + 1), productCount: products.length, products, warnings };
  return { records: kept, products, startDay, endDay, meta };
}

export function validateConditions(c) {
  if (!c || typeof c !== 'object' || typeof c.temperature !== 'number' || !Number.isFinite(c.temperature)) fail('INVALID_CONDITION', { field: 'temperature' });
  if (typeof c.rain !== 'number' || !Number.isFinite(c.rain) || c.rain < 0) fail('INVALID_CONDITION', { field: 'rain' });
  if (typeof c.holiday !== 'boolean') fail('INVALID_CONDITION', { field: 'holiday' });
  if (typeof c.event !== 'boolean') fail('INVALID_CONDITION', { field: 'event' });
  return { temperature: c.temperature, rain: c.rain, holiday: c.holiday, event: c.event };
}

export function createHistory(dataset) {
  const history = new Map(dataset.products.map(p => [p, new Map()]));
  for (const r of dataset.records) history.get(r.product).set(r.day, r);
  return history;
}

// Builds from previous observed days only. Never reads the target day's units or stockout flag.
// Missing lags use the most recent earlier sale, and missing windows use that same prior sale;
// lag-presence indicators distinguish imputed lag values from exact observations.
export function featuresFor(product, day, conditions, products, history) {
  const h = history.get(product);
  if (!h) fail('UNKNOWN_PRODUCT', { product });
  let latest = null, latestDay = -Infinity;
  for (const [d, r] of h) if (d < day && d > latestDay) { latest = r.sold; latestDay = d; }
  if (latest === null) return null;
  const lag1 = h.get(day - 1), lag7 = h.get(day - 7);
  let sum7 = 0, n7 = 0, sum28 = 0, n28 = 0;
  for (let offset = 1; offset <= 28; offset++) {
    const r = h.get(day - offset);
    if (r) { sum28 += r.sold; n28++; if (offset <= 7) { sum7 += r.sold; n7++; } }
  }
  const d = new Date(day * DAY_MS), dow = d.getUTCDay();
  const yearDate = new Date(0); yearDate.setUTCFullYear(d.getUTCFullYear(), 0, 1); yearDate.setUTCHours(0, 0, 0, 0);
  const yearStart = yearDate.getTime() / DAY_MS;
  const season = 2 * Math.PI * (day - yearStart) / 365.25;
  return [conditions.temperature, conditions.rain, +conditions.holiday, +conditions.event,
    Math.sin(season), Math.cos(season),
    ...Array.from({ length: 7 }, (_, i) => +(dow === i)),
    ...products.map(p => +(p === product)),
    lag1 ? lag1.sold : latest, +!!lag1, lag7 ? lag7.sold : latest, +!!lag7,
    n7 ? sum7 / n7 : latest, n28 ? sum28 / n28 : latest];
}

export function makeSamples(dataset) {
  const history = createHistory(dataset), samples = [];
  for (const r of dataset.records) {
    const x = featuresFor(r.product, r.day, r, dataset.products, history);
    if (x && !r.stockout) samples.push({ x, y: r.sold, day: r.day, product: r.product });
  }
  return { samples, history };
}

// Each split minimizes squared residual error. Orders are computed once per fit;
// membership masks let each node scan those orders without sorting for every tree.
export function initializeTraining(samples, params = HYPERPARAMETERS) {
  if (!Array.isArray(samples) || samples.length < LIMITS.minEligibleRows) fail('INSUFFICIENT_TRAINING_DATA', { eligibleRows: samples?.length || 0, minRows: LIMITS.minEligibleRows });
  const n = samples.length, width = samples[0].x.length;
  if (samples.some(s => s.x.length !== width || !Number.isFinite(s.y) || s.x.some(v => !Number.isFinite(v)))) fail('INVALID_TRAINING_DATA');
  const orders = Array.from({ length: width }, (_, f) => {
    const idx = Array.from({ length: n }, (_, i) => i);
    idx.sort((a, b) => samples[a].x[f] - samples[b].x[f] || a - b);
    return idx;
  });
  let sum = 0; for (const s of samples) sum += s.y;
  const base = sum / n, fitted = new Float64Array(n); fitted.fill(base);
  return { samples, params, orders, fitted, model: { base, trees: [], learningRate: params.learningRate }, residuals: new Float64Array(n) };
}

function buildTree(state, indices, depth) {
  const { samples, params, orders, residuals } = state;
  let total = 0; for (const i of indices) total += residuals[i];
  const leaf = { value: total / indices.length };
  if (depth >= params.maxDepth || indices.length < params.minLeaf * 2) return leaf;
  const mask = new Uint8Array(samples.length); for (const i of indices) mask[i] = 1;
  let bestGain = params.minGain, bestFeature = -1, bestThreshold = 0;
  const parentScore = total * total / indices.length;
  for (let f = 0; f < orders.length; f++) {
    let leftN = 0, leftSum = 0, prev = 0;
    for (const index of orders[f]) {
      if (!mask[index]) continue;
      const value = samples[index].x[f];
      if (leftN >= params.minLeaf && indices.length - leftN >= params.minLeaf && value > prev) {
        const rightSum = total - leftSum;
        const gain = leftSum * leftSum / leftN + rightSum * rightSum / (indices.length - leftN) - parentScore;
        if (gain > bestGain) {
          bestGain = gain; bestFeature = f;
          const midpoint = prev / 2 + value / 2;
          bestThreshold = midpoint >= value ? prev : midpoint;
        }
      }
      leftN++; leftSum += residuals[index]; prev = value;
    }
  }
  if (bestFeature < 0) return leaf;
  const left = [], right = [];
  for (const i of indices) (samples[i].x[bestFeature] <= bestThreshold ? left : right).push(i);
  if (!left.length || !right.length) return leaf;
  return { feature: bestFeature, threshold: bestThreshold, left: buildTree(state, left, depth + 1), right: buildTree(state, right, depth + 1) };
}
function treePredict(tree, x) { let t = tree; while (t.feature !== undefined) t = x[t.feature] <= t.threshold ? t.left : t.right; return t.value; }
export function trainOneTree(state) {
  for (let i = 0; i < state.samples.length; i++) state.residuals[i] = state.samples[i].y - state.fitted[i];
  const tree = buildTree(state, Array.from({ length: state.samples.length }, (_, i) => i), 0);
  state.model.trees.push(tree);
  for (let i = 0; i < state.samples.length; i++) state.fitted[i] += state.params.learningRate * treePredict(tree, state.samples[i].x);
}
export async function fitModel(samples, { onProgress = () => {}, shouldCancel = () => false, yieldControl = () => new Promise(resolve => setTimeout(resolve, 0)), params = HYPERPARAMETERS } = {}) {
  if (shouldCancel()) fail('TRAINING_CANCELLED');
  onProgress(0);
  // Let the worker process a pending load before beginning work.
  await yieldControl();
  if (shouldCancel()) fail('TRAINING_CANCELLED');
  const state = initializeTraining(samples, params);
  for (let i = 0; i < params.trees; i++) {
    if (shouldCancel()) fail('TRAINING_CANCELLED');
    trainOneTree(state);
    onProgress((i + 1) / params.trees);
    await yieldControl();
  }
  if (shouldCancel()) fail('TRAINING_CANCELLED');
  return state.model;
}
export function predictValue(model, x) {
  let y = model.base; for (const tree of model.trees) y += model.learningRate * treePredict(tree, x);
  return Math.max(0, y);
}
export function predictForecast(dataset, history, model, conditions) {
  conditions = validateConditions(conditions);
  if (!model) fail('MODEL_NOT_TRAINED');
  return dataset.products.map(product => {
    const x = featuresFor(product, dataset.endDay + 1, conditions, dataset.products, history);
    if (!x) fail('NO_PRODUCT_HISTORY', { product });
    return { product, demand: predictValue(model, x) };
  });
}

export function baselineFor(product, day, history) {
  const h = history.get(product), priorWeek = h?.get(day - 7);
  if (priorWeek) return { value: priorWeek.sold, fallback: false };
  let latestDay = -Infinity, latest = null;
  if (h) for (const [d, r] of h) if (d < day && d > latestDay) { latestDay = d; latest = r.sold; }
  if (latest === null) return null;
  return { value: latest, fallback: true };
}
