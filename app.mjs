const copy = {
  en: {
    resultsRegion: 'Forecast results', dataWorkspace: 'Data workspace', homeLabel: 'Supply Forecaster home', dataEyebrow: 'THE STARTING POINT', yourData: 'Your data', dataIntro: 'Start with the sample, or bring your own daily records.', source: 'SOURCE', dateRange: 'DATE RANGE', products: 'PRODUCTS', useSample: 'Use sample data', uploadCsv: 'Upload CSV', downloadTemplate: 'Download CSV template', localNote: 'Your data is processed locally in your browser.', sidebarFooter: 'A practical aid for daily baking.', workspace: 'BAKERY PLANNING WORKSPACE', language: 'Language', pageEyebrow: 'A LITTLE MORE CLARITY FOR TOMORROW', pageTitle: 'Plan tomorrow with more confidence.', pageDescription: 'Turn past sales and tomorrow’s conditions into a practical starting point for your baking plan.', stepOne: 'SET THE SCENE', conditionsTitle: 'Forecast conditions', forecastDate: 'FORECAST DATE', conditionsDescription: 'Enter conditions for the day after your latest complete data day—not necessarily tomorrow on the calendar.', temperature: 'Temperature', rainfall: 'Rainfall', holiday: 'Public holiday', holidayHelp: 'On the forecast date', event: 'Nearby event', eventHelp: 'On the forecast date', trainForecast: 'Train & forecast', updateForecast: 'Update forecast', trainingProgress: 'Training progress', stepTwo: 'MAKE A PLAN', resultsTitle: 'Your forecast', staleBadge: 'UPDATE NEEDED', resultsDescription: 'Choose a planning approach. Your predicted demand stays the same.', planningApproach: 'PLANNING APPROACH', minimizeWaste: 'Minimize waste', balanced: 'Balanced', prioritizeAvailability: 'Prioritize availability', product: 'Product', predictedDemand: 'Predicted demand', recommendedQuantity: 'Recommended baking quantity', emptyResults: 'Your forecast will appear here after training.', inputsUsed: 'INPUTS USED', advisory: 'These quantities are illustrative, not optimized. Use your own judgment when deciding how much to bake.', howItWorks: 'How it works & limitations', howCopy1: 'The model learns patterns from past sales and uses the selected forecast weather, holiday and nearby-event conditions. The forecast date is the day after the latest complete day in the data; it is not necessarily tomorrow on the calendar.', howCopy2: 'Sales during stockouts can undercount demand. Stockout flags should be recorded independently; flagged sales are excluded as fitting targets, but remain available as historical context. Missing or inaccurate flags and excluding these days can bias results.', howCopy3: 'This is a small gradient-boosted regression-tree model, not LightGBM. Forecasts are estimates, not guarantees. The planning choices apply 90%, 100% or 110% to the raw prediction and round to a nonnegative whole number; they are simple rules, not optimization.', footerLeft: 'SUPPLY FORECASTER', footerRight: 'A starting point, not a guarantee.', sampleSource: 'Synthetic demonstration data', uploadSource: 'User-uploaded data; provenance not verified', loading: 'Loading data…', ready: 'Data ready to train', training: 'Training the model…', predicting: 'Updating forecast…', complete: 'Forecast ready', stale: 'Conditions changed. Update the forecast.', failed: 'Something needs attention', yes: 'Yes', no: 'No', usedSummary: 'Historical sales patterns · {temperature} °C · {rain} mm rain · Holiday: {holiday} · Nearby event: {event}', warningHeading: 'Data notes', errorHeading: 'Could not continue', countProducts: '{count}',
    errors: {
      GENERIC: 'Something went wrong. Please check your data and try again.', FILE_TOO_LARGE: 'This file is too large. The maximum is 5 MB.', SAMPLE_LOAD_FAILED: 'Could not load the sample data. Check the connection and try again.', FILE_READ_FAILED: 'Could not read the selected file. Please try again.', WORKER_FAILED: 'The forecasting worker could not start or stopped unexpectedly. Try reloading the page.', INVALID_CONDITION: 'Enter a valid temperature and nonnegative rainfall.', EMPTY_FILE: 'The CSV file is empty.', INVALID_HEADERS: 'The CSV headers do not match the template. Download the template and use its column names and order.', NO_DATA_ROWS: 'The CSV has a header but no data rows.', MALFORMED_CSV: 'The CSV has malformed quoting near row {row}.', INVALID_COLUMN_COUNT: 'Row {row} has the wrong number of columns.', MISSING_VALUE: 'Row {row} is missing a value in {field}.', INVALID_DATE: 'Row {row} has an invalid date. Use YYYY-MM-DD.', DATE_OUT_OF_RANGE: 'The date on row {row} is outside the supported range.', INVALID_UNITS: 'Row {row} needs a nonnegative whole number in {field}.', INVALID_NUMBER: 'Row {row} needs a valid number in {field}.', INVALID_FLAG: 'Row {row} needs 0 or 1 in {field}.', NEGATIVE_RAIN: 'Rainfall cannot be negative on row {row}.', SOLD_EXCEEDS_BAKED: 'Units sold exceed units baked on row {row}.', DUPLICATE_PRODUCT_DATE: 'Row {row} repeats a product and date already in the file.', PRODUCT_NAME_TOO_LONG: 'The product name on row {row} is too long.', TOO_MANY_ROWS: 'The file has too many rows. The maximum is {maxRows}.', TOO_MANY_PRODUCTS: 'The file has too many products. The maximum is {maxProducts}.', DATE_SPAN_TOO_LARGE: 'The date range is too long for this tool.', NO_COMPLETE_DAY: 'No day has a record for every product. Please check the data.', INSUFFICIENT_TRAINING_DATA: 'There is not enough eligible history to train. Add more non-stockout records.', NO_PRODUCT_HISTORY: 'There is not enough prior history for {product}.', MODEL_NOT_TRAINED: 'The model is not trained. Train it again.', NO_DATASET: 'Load a dataset before training.', TRAINING_IN_PROGRESS: 'Training is already in progress.', INVALID_TRAINING_DATA: 'The training data could not be used. Please check the CSV.', TRAINING_CANCELLED: 'Training was cancelled. Please try again.'
    },
    warnings: {
      GENERIC: 'There is a data quality note. Please review your records.', INCOMPLETE_LATEST_DAYS: 'The latest incomplete days were excluded. The latest complete day is {endDate}.', MISSING_DATES: '{count} date(s) are missing from the history. Missing sales are not treated as zero.', INCOMPLETE_PRODUCT_HISTORY: '{missingRows} product-day record(s) are missing from the history.', LARGE_DATASET: 'This is a large dataset and may take longer to process.', INSUFFICIENT_HISTORY: 'The history is short or has few eligible records; forecasts may be unreliable.', INSUFFICIENT_PRODUCT_HISTORY: '{product} has few eligible records; its forecast may be unreliable.'
    }
  },
  'zh-HK': {
    resultsRegion: '預測結果', dataWorkspace: '資料工作區', homeLabel: 'Supply Forecaster 首頁', dataEyebrow: '準備資料', yourData: '你的資料', dataIntro: '可以先用示範資料，或者上載自己的每日記錄。', source: '資料來源', dateRange: '日期範圍', products: '產品數目', useSample: '使用示範資料', uploadCsv: '上載 CSV', downloadTemplate: '下載 CSV 範本', localNote: '你的資料只會在瀏覽器內處理。', sidebarFooter: '每日烘焙的實用參考。', workspace: '烘焙規劃工作區', language: '語言', pageEyebrow: '為明天的準備多一點把握', pageTitle: '為明天的烘焙，做好準備。', pageDescription: '結合過往銷售及預測日的情況，為烘焙計劃提供實用的起點。', stepOne: '設定條件', conditionsTitle: '預測條件', forecastDate: '預測日期', conditionsDescription: '請輸入資料中最後完整一天翌日的預計情況；該日未必是日曆上的明天。', temperature: '氣溫', rainfall: '降雨量', holiday: '公眾假期', holidayHelp: '預測日期當天', event: '附近活動', eventHelp: '預測日期當天', trainForecast: '訓練並預測', updateForecast: '更新預測', trainingProgress: '訓練進度', stepTwo: '制定計劃', resultsTitle: '你的預測', staleBadge: '需要更新', resultsDescription: '選擇規劃方向，需求預測不會改變。', planningApproach: '規劃方向', minimizeWaste: '減少浪費', balanced: '平衡', prioritizeAvailability: '優先供應', product: '產品', predictedDemand: '預測需求', recommendedQuantity: '建議烘焙數量', emptyResults: '完成訓練後，預測結果會顯示在這裏。', inputsUsed: '使用的條件', advisory: '這些數量只作示範，並非最佳化結果。烘焙多少，請按實際情況自行決定。', howItWorks: '運作方式及限制', howCopy1: '模型從過往銷售中學習規律，並使用你選擇的預測日天氣、假期及附近活動條件。預測日期是資料中最後完整一天的翌日，未必是日曆上的明天。', howCopy2: '售罄期間的銷量可能低估需求。售罄標記應獨立記錄；標記為售罄的銷量不會作為擬合目標，但仍可作歷史背景。標記缺漏或不準確，以及排除這些日子，都可能令結果有偏差。', howCopy3: '這是一個小型梯度提升迴歸樹模型，並非 LightGBM。預測只是估計，並無保證。規劃選項將原始預測乘以 90%、100% 或 110%，再四捨五入至不小於零的整數；這是簡單規則，不是最佳化。', footerLeft: 'SUPPLY FORECASTER', footerRight: '只作起點，並非保證。', sampleSource: '合成示範資料', uploadSource: '用戶上載資料；來源未經核實', loading: '正在載入資料…', ready: '資料已準備好，可以訓練', training: '正在訓練模型…', predicting: '正在更新預測…', complete: '預測已完成', stale: '條件已更改，請更新預測。', failed: '有問題需要處理', yes: '是', no: '否', usedSummary: '過往銷售規律 · {temperature} °C · 降雨 {rain} mm · 公眾假期：{holiday} · 附近活動：{event}', warningHeading: '資料提示', errorHeading: '未能繼續', countProducts: '{count}',
    errors: {
      GENERIC: '出現問題。請檢查資料後再試。', FILE_TOO_LARGE: '檔案太大，上限為 5 MB。', SAMPLE_LOAD_FAILED: '未能載入示範資料，請檢查連線後再試。', FILE_READ_FAILED: '未能讀取所選檔案，請再試。', WORKER_FAILED: '預測程序未能啟動或意外停止，請重新載入頁面。', INVALID_CONDITION: '請輸入有效氣溫及不小於零的降雨量。', EMPTY_FILE: 'CSV 檔案是空的。', INVALID_HEADERS: 'CSV 欄位名稱不符合範本，請下載範本並依照其名稱及次序填寫。', NO_DATA_ROWS: 'CSV 只有標題，沒有資料。', MALFORMED_CSV: 'CSV 第 {row} 行附近的引號格式有誤。', INVALID_COLUMN_COUNT: '第 {row} 行的欄位數目不正確。', MISSING_VALUE: '第 {row} 行的 {field} 欄位缺少數值。', INVALID_DATE: '第 {row} 行的日期無效，請使用 YYYY-MM-DD。', DATE_OUT_OF_RANGE: '第 {row} 行的日期超出支援範圍。', INVALID_UNITS: '第 {row} 行的 {field} 必須是不小於零的整數。', INVALID_NUMBER: '第 {row} 行的 {field} 必須是有效數字。', INVALID_FLAG: '第 {row} 行的 {field} 必須是 0 或 1。', NEGATIVE_RAIN: '第 {row} 行的降雨量不可為負數。', SOLD_EXCEEDS_BAKED: '第 {row} 行的銷量超過烘焙數量。', DUPLICATE_PRODUCT_DATE: '第 {row} 行的產品及日期與檔案內其他記錄重複。', PRODUCT_NAME_TOO_LONG: '第 {row} 行的產品名稱太長。', TOO_MANY_ROWS: '檔案行數太多，上限為 {maxRows}。', TOO_MANY_PRODUCTS: '產品數目太多，上限為 {maxProducts}。', DATE_SPAN_TOO_LARGE: '日期範圍超出本工具的上限。', NO_COMPLETE_DAY: '沒有任何一天包含所有產品的記錄，請檢查資料。', INSUFFICIENT_TRAINING_DATA: '可用的歷史資料不足，無法訓練。請加入更多非售罄記錄。', NO_PRODUCT_HISTORY: '{product} 缺少足夠的過往記錄。', MODEL_NOT_TRAINED: '模型尚未訓練，請重新訓練。', NO_DATASET: '請先載入資料。', TRAINING_IN_PROGRESS: '模型正在訓練。', INVALID_TRAINING_DATA: '無法使用這些訓練資料，請檢查 CSV。', TRAINING_CANCELLED: '訓練已取消，請再試。'
    },
    warnings: {
      GENERIC: '資料有需要留意的地方，請檢查記錄。', INCOMPLETE_LATEST_DAYS: '最近不完整的日子已被排除；最後完整日期為 {endDate}。', MISSING_DATES: '歷史資料缺少 {count} 個日期；缺少的銷量不會當作零。', INCOMPLETE_PRODUCT_HISTORY: '歷史資料缺少 {missingRows} 筆產品每日記錄。', LARGE_DATASET: '資料量較大，處理可能需要較長時間。', INSUFFICIENT_HISTORY: '歷史資料較短或可用記錄較少，預測可能不可靠。', INSUFFICIENT_PRODUCT_HISTORY: '{product} 的可用記錄較少，其預測可能不可靠。'
    }
  },
  'zh-CN': {
    resultsRegion: '预测结果', dataWorkspace: '数据工作区', homeLabel: 'Supply Forecaster 首页', dataEyebrow: '准备数据', yourData: '你的数据', dataIntro: '可以先使用示例数据，或上传自己的每日记录。', source: '数据来源', dateRange: '日期范围', products: '产品数量', useSample: '使用示例数据', uploadCsv: '上传 CSV', downloadTemplate: '下载 CSV 模板', localNote: '你的数据仅在浏览器内处理。', sidebarFooter: '每日烘焙的实用参考。', workspace: '烘焙规划工作区', language: '语言', pageEyebrow: '让明天的准备更有把握', pageTitle: '为明天的烘焙，做好准备。', pageDescription: '结合历史销售和预测日的情况，为烘焙计划提供实用的起点。', stepOne: '设定条件', conditionsTitle: '预测条件', forecastDate: '预测日期', conditionsDescription: '请输入数据中最后完整一天次日的预计情况；该日不一定是日历上的明天。', temperature: '气温', rainfall: '降雨量', holiday: '公共假日', holidayHelp: '预测日期当天', event: '附近活动', eventHelp: '预测日期当天', trainForecast: '训练并预测', updateForecast: '更新预测', trainingProgress: '训练进度', stepTwo: '制定计划', resultsTitle: '你的预测', staleBadge: '需要更新', resultsDescription: '选择规划方向，需求预测不会改变。', planningApproach: '规划方向', minimizeWaste: '减少浪费', balanced: '平衡', prioritizeAvailability: '优先保证供应', product: '产品', predictedDemand: '预测需求', recommendedQuantity: '建议烘焙数量', emptyResults: '完成训练后，预测结果会显示在这里。', inputsUsed: '使用的条件', advisory: '这些数量仅作示例，并非优化结果。烘焙多少，请根据实际情况自行决定。', howItWorks: '工作原理与局限', howCopy1: '模型从历史销售中学习规律，并使用你选择的预测日天气、假日及附近活动条件。预测日期是数据中最后完整一天的次日，不一定是日历上的明天。', howCopy2: '售罄期间的销量可能低估需求。售罄标记应独立记录；标记为售罄的销量不会作为拟合目标，但仍可作为历史背景。标记缺失或不准确，以及排除这些日期，都可能使结果产生偏差。', howCopy3: '这是一个小型梯度提升回归树模型，不是 LightGBM。预测只是估计，并无保证。规划选项将原始预测乘以 90%、100% 或 110%，再四舍五入为不小于零的整数；这是简单规则，不是优化。', footerLeft: 'SUPPLY FORECASTER', footerRight: '仅供参考，并非保证。', sampleSource: '合成示例数据', uploadSource: '用户上传数据；来源未经核实', loading: '正在加载数据…', ready: '数据已准备好，可以训练', training: '正在训练模型…', predicting: '正在更新预测…', complete: '预测已完成', stale: '条件已更改，请更新预测。', failed: '有问题需要处理', yes: '是', no: '否', usedSummary: '历史销售规律 · {temperature} °C · 降雨 {rain} mm · 公共假日：{holiday} · 附近活动：{event}', warningHeading: '数据提示', errorHeading: '无法继续', countProducts: '{count}',
    errors: {
      GENERIC: '出现问题。请检查数据后重试。', FILE_TOO_LARGE: '文件太大，上限为 5 MB。', SAMPLE_LOAD_FAILED: '无法加载示例数据，请检查连接后重试。', FILE_READ_FAILED: '无法读取所选文件，请重试。', WORKER_FAILED: '预测程序无法启动或意外停止，请重新加载页面。', INVALID_CONDITION: '请输入有效气温和非负降雨量。', EMPTY_FILE: 'CSV 文件为空。', INVALID_HEADERS: 'CSV 列名与模板不符，请下载模板并按其名称和顺序填写。', NO_DATA_ROWS: 'CSV 只有标题，没有数据行。', MALFORMED_CSV: 'CSV 第 {row} 行附近的引号格式有误。', INVALID_COLUMN_COUNT: '第 {row} 行的列数不正确。', MISSING_VALUE: '第 {row} 行的 {field} 缺少数值。', INVALID_DATE: '第 {row} 行的日期无效，请使用 YYYY-MM-DD。', DATE_OUT_OF_RANGE: '第 {row} 行的日期超出支持范围。', INVALID_UNITS: '第 {row} 行的 {field} 必须是非负整数。', INVALID_NUMBER: '第 {row} 行的 {field} 必须是有效数字。', INVALID_FLAG: '第 {row} 行的 {field} 必须是 0 或 1。', NEGATIVE_RAIN: '第 {row} 行的降雨量不能为负数。', SOLD_EXCEEDS_BAKED: '第 {row} 行的销量超过烘焙数量。', DUPLICATE_PRODUCT_DATE: '第 {row} 行的产品和日期与文件中其他记录重复。', PRODUCT_NAME_TOO_LONG: '第 {row} 行的产品名称太长。', TOO_MANY_ROWS: '文件行数过多，上限为 {maxRows}。', TOO_MANY_PRODUCTS: '产品数量过多，上限为 {maxProducts}。', DATE_SPAN_TOO_LARGE: '日期范围超出本工具的上限。', NO_COMPLETE_DAY: '没有任何一天包含所有产品的记录，请检查数据。', INSUFFICIENT_TRAINING_DATA: '可用历史数据不足，无法训练。请添加更多非售罄记录。', NO_PRODUCT_HISTORY: '{product} 缺少足够的历史记录。', MODEL_NOT_TRAINED: '模型尚未训练，请重新训练。', NO_DATASET: '请先加载数据。', TRAINING_IN_PROGRESS: '模型正在训练。', INVALID_TRAINING_DATA: '无法使用这些训练数据，请检查 CSV。', TRAINING_CANCELLED: '训练已取消，请重试。'
    },
    warnings: {
      GENERIC: '数据有需要注意的地方，请检查记录。', INCOMPLETE_LATEST_DAYS: '最近不完整的日期已被排除；最后完整日期为 {endDate}。', MISSING_DATES: '历史数据缺少 {count} 个日期；缺失的销量不会被当作零。', INCOMPLETE_PRODUCT_HISTORY: '历史数据缺少 {missingRows} 条产品每日记录。', LARGE_DATASET: '数据量较大，处理可能需要更长时间。', INSUFFICIENT_HISTORY: '历史数据较短或可用记录较少，预测可能不可靠。', INSUFFICIENT_PRODUCT_HISTORY: '{product} 的可用记录较少，其预测可能不可靠。'
    }
  }
};

const productNames = {
  'Pineapple buns': { 'zh-HK': '菠蘿包', 'zh-CN': '菠萝包' },
  'Egg tarts': { 'zh-HK': '蛋撻', 'zh-CN': '蛋挞' },
  'Cocktail buns': { 'zh-HK': '雞尾包', 'zh-CN': '鸡尾包' },
  'Sausage buns': { 'zh-HK': '腸仔包', 'zh-CN': '香肠面包' },
  'Sourdough loaves': { 'zh-HK': '酸種麵包', 'zh-CN': '酸种面包' }
};
const factors = { waste: 0.9, balanced: 1, availability: 1.1 };
const MAX_BYTES = 5_000_000;
const el = id => document.getElementById(id);
const state = { language: 'en', source: null, meta: null, warnings: [], error: null, worker: null, generation: 0, busy: null, trained: false, predictions: null, resultConditions: null, pendingConditions: null, progress: 0, phase: 'loading' };
let messagesSignature = null;

function t(key) { return copy[state.language][key] ?? copy.en[key] ?? key; }
function interpolate(template, params = {}) {
  return template.replace(/\{(\w+)\}/g, (_, key) => params[key] == null ? '—' : String(params[key]));
}
function productName(name) { return productNames[name]?.[state.language] || name; }
function formatDate(date) {
  if (!date) return '—';
  const d = new Date(`${date}T00:00:00Z`);
  if (!Number.isFinite(d.getTime())) return String(date);
  return new Intl.DateTimeFormat(state.language, { year: 'numeric', month: 'short', day: 'numeric', timeZone: 'UTC' }).format(d);
}
function num(value, maxFractionDigits = 2) { return new Intl.NumberFormat(state.language, { maximumFractionDigits: maxFractionDigits }).format(value); }
function formatIssue(issue, kind) {
  const dictionary = copy[state.language][kind];
  const template = dictionary[issue?.code] || dictionary.GENERIC;
  const params = { ...(issue?.params || {}) };
  if (params.product != null) params.product = productName(String(params.product));
  if (params.endDate != null) params.endDate = formatDate(params.endDate);
  return interpolate(template, params);
}
function currentConditions() {
  const tempText = el('temperature').value.trim();
  const rainText = el('rain').value.trim();
  const temperature = tempText === '' ? NaN : Number(tempText);
  const rain = rainText === '' ? NaN : Number(rainText);
  return { temperature, rain, holiday: el('holiday').checked, event: el('event').checked };
}
function validConditions(c) { return Number.isFinite(c.temperature) && Number.isFinite(c.rain) && c.rain >= 0; }
function sameConditions(a, b) { return !!a && !!b && a.temperature === b.temperature && a.rain === b.rain && a.holiday === b.holiday && a.event === b.event; }
function isStale() { return !!state.predictions && !sameConditions(currentConditions(), state.resultConditions); }
function translateStatic() {
  document.documentElement.lang = state.language;
  document.querySelectorAll('[data-i18n]').forEach(node => { node.textContent = t(node.dataset.i18n); });
  document.querySelectorAll('[data-i18n-aria]').forEach(node => { node.setAttribute('aria-label', t(node.dataset.i18nAria)); });
  document.title = 'Supply Forecaster';
}
function renderMessages() {
  const container = el('messages');
  const signature = JSON.stringify([state.language, state.error, state.warnings]);
  if (signature === messagesSignature) return;
  messagesSignature = signature;
  container.replaceChildren();
  if (state.error) {
    const box = document.createElement('div');
    box.className = 'message error'; box.setAttribute('role', 'alert');
    const title = document.createElement('strong'); title.textContent = t('errorHeading');
    const text = document.createElement('p'); text.textContent = formatIssue(state.error, 'errors');
    box.append(title, text); container.append(box);
  }
  if (state.warnings.length) {
    const box = document.createElement('div'); box.className = 'message';
    const title = document.createElement('strong'); title.textContent = t('warningHeading'); box.append(title);
    for (const issue of state.warnings) { const p = document.createElement('p'); p.textContent = formatIssue(issue, 'warnings'); box.append(p); }
    container.append(box);
  }
}
function renderResults() {
  const body = el('results-body'); body.replaceChildren();
  const predictions = state.predictions;
  el('empty-state').hidden = !!predictions;
  el('inputs-used').hidden = !predictions;
  el('stale-badge').hidden = !isStale();
  if (!predictions) return;
  const strategy = document.querySelector('input[name="strategy"]:checked')?.value || 'balanced';
  for (const prediction of predictions) {
    const row = document.createElement('tr');
    const product = document.createElement('td'); product.textContent = productName(prediction.product);
    const demand = document.createElement('td'); demand.textContent = num(Math.max(0, Math.round(prediction.demand)), 0);
    const quantity = document.createElement('td'); quantity.textContent = num(Math.max(0, Math.round(prediction.demand * factors[strategy])), 0);
    row.append(product, demand, quantity); body.append(row);
  }
  const c = state.resultConditions;
  el('inputs-used-text').textContent = interpolate(t('usedSummary'), { temperature: num(c.temperature), rain: num(c.rain), holiday: t(c.holiday ? 'yes' : 'no'), event: t(c.event ? 'yes' : 'no') });
}
function render() {
  translateStatic();
  el('source-value').textContent = state.source ? t(state.source === 'sample' ? 'sampleSource' : 'uploadSource') : '—';
  el('range-value').textContent = state.meta ? `${formatDate(state.meta.startDate)} – ${formatDate(state.meta.endDate)}` : '—';
  el('products-value').textContent = state.meta ? num(state.meta.productCount, 0) : '—';
  el('forecast-date-value').textContent = state.meta ? formatDate(state.meta.forecastDate) : '—';
  const running = state.busy === 'train' || state.busy === 'predict';
  const button = el('forecast-button');
  button.disabled = !state.meta || !state.worker || !!state.busy;
  button.querySelector('[data-i18n]').textContent = t(state.trained ? 'updateForecast' : 'trainForecast');
  for (const id of ['temperature', 'rain', 'holiday', 'event']) el(id).disabled = running;
  const phase = state.error ? 'failed' : state.busy === 'load' ? 'loading' : state.busy === 'train' ? 'training' : state.busy === 'predict' ? 'predicting' : isStale() ? 'stale' : state.predictions ? 'complete' : state.meta ? 'ready' : state.phase;
  if (el('status-text').textContent !== t(phase)) el('status-text').textContent = t(phase);
  el('status').classList.toggle('error', !!state.error);
  const progress = Math.max(0, Math.min(1, state.progress));
  el('progress-wrap').hidden = state.busy !== 'train';
  el('progress-bar').style.width = `${Math.round(progress * 100)}%`;
  el('progress-accessible').value = progress;
  el('progress-text').textContent = `${Math.round(progress * 100)}%`;
  renderMessages(); renderResults();
}
function setError(code, params = {}) { state.error = { code, params }; state.busy = null; state.phase = 'failed'; render(); }
function startDataset(source) {
  state.generation += 1;
  if (state.worker) state.worker.terminate();
  state.worker = null; state.meta = null; state.warnings = []; state.error = null;
  state.trained = false; state.predictions = null; state.resultConditions = null; state.pendingConditions = null;
  state.source = source; state.progress = 0; state.busy = 'load'; state.phase = 'loading';
  const generation = state.generation;
  render();
  try {
    const worker = new Worker(new URL('./worker.mjs', import.meta.url), { type: 'module' });
    state.worker = worker;
    worker.onmessage = event => { if (generation === state.generation && worker === state.worker) handleWorkerMessage(event.data); };
    worker.onerror = event => { event.preventDefault(); if (generation === state.generation && worker === state.worker) { worker.terminate(); state.worker = null; state.trained = false; setError('WORKER_FAILED'); } };
    worker.onmessageerror = () => { if (generation === state.generation && worker === state.worker) { worker.terminate(); state.worker = null; state.trained = false; setError('WORKER_FAILED'); } };
    return generation;
  } catch { setError('WORKER_FAILED'); return null; }
}
async function loadSample() {
  const generation = startDataset('sample');
  if (generation == null) return;
  try {
    const response = await fetch('./data/sample.csv');
    if (!response.ok) throw new Error('sample');
    const csv = await response.text();
    if (generation !== state.generation || !state.worker) return;
    state.worker.postMessage({ type: 'load', csv });
  } catch { if (generation === state.generation) setError('SAMPLE_LOAD_FAILED'); }
}
async function loadFile(file) {
  const generation = startDataset('upload');
  if (generation == null) return;
  if (file.size > MAX_BYTES) { setError('FILE_TOO_LARGE'); return; }
  try {
    const csv = await file.text();
    if (generation !== state.generation || !state.worker) return;
    state.worker.postMessage({ type: 'load', csv });
  } catch { if (generation === state.generation) setError('FILE_READ_FAILED'); }
}
function handleWorkerMessage(message) {
  if (!message || typeof message !== 'object') return;
  if (message.type === 'loaded') {
    if (state.busy !== 'load') return;
    state.meta = message.meta; state.warnings = Array.isArray(message.meta?.warnings) ? message.meta.warnings : [];
    state.busy = null; state.phase = 'ready'; state.error = null; render();
  } else if (message.type === 'progress') {
    if (state.busy !== 'train') return;
    state.progress = Number.isFinite(message.value) ? message.value : 0; render();
  } else if (message.type === 'forecast') {
    if (state.busy !== 'train' && state.busy !== 'predict') return;
    if (!Array.isArray(message.predictions) || message.predictions.some(p => typeof p.product !== 'string' || !Number.isFinite(p.demand))) { setError('GENERIC'); return; }
    state.predictions = message.predictions; state.resultConditions = state.pendingConditions;
    state.pendingConditions = null; state.trained = true; state.busy = null; state.error = null; state.phase = 'complete'; render();
  } else if (message.type === 'error') {
    if (state.busy === 'train' || message.code === 'MODEL_NOT_TRAINED') state.trained = false;
    setError(message.code || 'GENERIC', message.params || {});
  }
}
function requestForecast() {
  if (!state.meta || !state.worker || state.busy) return;
  const conditions = currentConditions();
  if (!validConditions(conditions)) { setError('INVALID_CONDITION'); return; }
  state.error = null; state.pendingConditions = conditions; state.progress = 0;
  state.busy = state.trained ? 'predict' : 'train';
  state.worker.postMessage({ type: state.busy, conditions });
  render();
}

el('language').addEventListener('change', event => { state.language = copy[event.target.value] ? event.target.value : 'en'; render(); });
el('sample-button').addEventListener('click', loadSample);
el('upload-button').addEventListener('click', () => el('file-input').click());
el('file-input').addEventListener('change', event => { const file = event.target.files?.[0]; event.target.value = ''; if (file) loadFile(file); });
el('forecast-button').addEventListener('click', requestForecast);
for (const id of ['temperature', 'rain', 'holiday', 'event']) {
  el(id).addEventListener('input', () => { if (state.error?.code === 'INVALID_CONDITION') state.error = null; render(); });
}
document.querySelectorAll('input[name="strategy"]').forEach(input => input.addEventListener('change', renderResults));
render();
loadSample();
