export function initStats() {
  return {
    comparisons: 0,
    swaps: 0,
    steps: 0,
    executionTime: 0,
  };
}

export function createDsFrame(visualData, highlights = {}, stats = {}, meta = {}) {
  return {
    visualData: JSON.parse(JSON.stringify(visualData)),
    highlights: { ...highlights },
    stats: { ...stats },
    meta: { ...meta },
  };
}

export function collectFrames(generator) {
  const frames = [];
  for (const frame of generator) {
    frames.push(frame);
  }
  return frames;
}

export function cloneVisualData(visualData) {
  return JSON.parse(JSON.stringify(visualData));
}
