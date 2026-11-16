import { EngineError, loadDataset, validateConditions, makeSamples, fitModel, predictForecast } from './core.mjs';

let dataset = null, history = null, model = null, generation = 0, training = false;
function postError(error) {
  if (error instanceof EngineError) self.postMessage({ type: 'error', code: error.code, ...(Object.keys(error.params).length ? { params: error.params } : {}) });
  else self.postMessage({ type: 'error', code: 'INTERNAL_ERROR' });
}
self.onmessage = async ({ data }) => {
  try {
    if (!data || typeof data !== 'object' || typeof data.type !== 'string') throw new EngineError('INVALID_MESSAGE');
    if (data.type === 'load') {
      // Invalidate before parsing, including when parsing fails. Also cancel any in-flight fit.
      generation++; dataset = null; history = null; model = null; training = false;
      dataset = loadDataset(data.csv);
      self.postMessage({ type: 'loaded', meta: dataset.meta });
      return;
    }
    if (data.type === 'train') {
      if (!dataset) throw new EngineError('NO_DATASET');
      if (training) throw new EngineError('TRAINING_IN_PROGRESS');
      const conditions = validateConditions(data.conditions);
      const runGeneration = generation, currentDataset = dataset;
      training = true;
      try {
        const start = performance.now();
        const prepared = makeSamples(currentDataset);
        const trained = await fitModel(prepared.samples, {
          shouldCancel: () => runGeneration !== generation,
          onProgress: value => { if (runGeneration === generation) self.postMessage({ type: 'progress', value }); }
        });
        if (runGeneration !== generation) return;
        const predictions = predictForecast(currentDataset, prepared.history, trained, conditions);
        const trainingMs = performance.now() - start;
        history = prepared.history; model = trained;
        self.postMessage({ type: 'forecast', predictions, trainingMs });
      } catch (error) {
        // A newly requested load owns the state; stale runs must not emit stale errors or results.
        if (runGeneration === generation) postError(error);
      } finally { if (runGeneration === generation) training = false; }
      return;
    }
    if (data.type === 'predict') {
      if (!dataset) throw new EngineError('NO_DATASET');
      if (!model) throw new EngineError('MODEL_NOT_TRAINED');
      const predictions = predictForecast(dataset, history, model, data.conditions);
      self.postMessage({ type: 'forecast', predictions, trainingMs: null });
      return;
    }
    throw new EngineError('INVALID_MESSAGE_TYPE');
  } catch (error) { postError(error); }
};
