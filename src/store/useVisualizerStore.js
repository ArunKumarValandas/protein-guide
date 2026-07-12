import { create } from 'zustand';

export const PLAYBACK_STATE = {
  IDLE: 'idle',
  PLAYING: 'playing',
  PAUSED: 'paused',
  COMPLETED: 'completed',
};

export const useVisualizerStore = create((set, get) => ({
  array: [],
  originalArray: [],
  frames: [],
  currentFrame: 0,
  playbackState: PLAYBACK_STATE.IDLE,
  speed: 50,
  arraySize: 25,
  comparisons: 0,
  swaps: 0,
  steps: 0,
  executionTime: 0,
  startTime: null,
  targetValue: null,
  isManualInput: false,
  visualData: null,
  originalVisualData: null,

  setArray: (array) => set({ array: [...array], originalArray: [...array] }),
  setVisualData: (visualData) =>
    set({ visualData, originalVisualData: JSON.parse(JSON.stringify(visualData)) }),
  setFrames: (frames) => set({ frames, currentFrame: 0, playbackState: PLAYBACK_STATE.IDLE }),
  setSpeed: (speed) => set({ speed }),
  setArraySize: (arraySize) => set({ arraySize }),
  setTargetValue: (targetValue) => set({ targetValue }),
  setManualInput: (isManualInput) => set({ isManualInput }),

  reset: () =>
    set({
      currentFrame: 0,
      playbackState: PLAYBACK_STATE.IDLE,
      comparisons: 0,
      swaps: 0,
      steps: 0,
      executionTime: 0,
      startTime: null,
      frames: [],
      array: [...get().originalArray],
      visualData: get().originalVisualData
        ? JSON.parse(JSON.stringify(get().originalVisualData))
        : null,
    }),

  play: () => {
    const { frames, currentFrame } = get();
    if (frames.length === 0) return;
    if (currentFrame >= frames.length - 1) {
      set({ currentFrame: 0 });
    }
    set({ playbackState: PLAYBACK_STATE.PLAYING, startTime: performance.now() });
  },

  pause: () => set({ playbackState: PLAYBACK_STATE.PAUSED }),

  resume: () => {
    const { playbackState } = get();
    if (playbackState === PLAYBACK_STATE.PAUSED) {
      set({ playbackState: PLAYBACK_STATE.PLAYING });
    }
  },

  stop: () =>
    set({
      playbackState: PLAYBACK_STATE.IDLE,
      currentFrame: 0,
      array: [...get().originalArray],
    }),

  nextStep: () => {
    const { frames, currentFrame } = get();
    if (currentFrame < frames.length - 1) {
      const next = currentFrame + 1;
      set({
        currentFrame: next,
        ...frames[next].stats,
        array: frames[next].array ? [...frames[next].array] : get().array,
        visualData: frames[next].visualData
          ? JSON.parse(JSON.stringify(frames[next].visualData))
          : get().visualData,
        playbackState: next >= frames.length - 1 ? PLAYBACK_STATE.COMPLETED : PLAYBACK_STATE.PAUSED,
      });
    }
  },

  prevStep: () => {
    const { frames, currentFrame } = get();
    if (currentFrame > 0) {
      const prev = currentFrame - 1;
      set({
        currentFrame: prev,
        ...frames[prev].stats,
        array: frames[prev].array ? [...frames[prev].array] : get().array,
        visualData: frames[prev].visualData
          ? JSON.parse(JSON.stringify(frames[prev].visualData))
          : get().visualData,
        playbackState: PLAYBACK_STATE.PAUSED,
      });
    }
  },

  goToFrame: (frameIndex) => {
    const { frames } = get();
    if (frameIndex >= 0 && frameIndex < frames.length) {
      set({
        currentFrame: frameIndex,
        ...frames[frameIndex].stats,
        array: frames[frameIndex].array ? [...frames[frameIndex].array] : get().array,
        visualData: frames[frameIndex].visualData
          ? JSON.parse(JSON.stringify(frames[frameIndex].visualData))
          : get().visualData,
        playbackState:
          frameIndex >= frames.length - 1 ? PLAYBACK_STATE.COMPLETED : PLAYBACK_STATE.PAUSED,
      });
    }
  },

  tick: () => {
    const { frames, currentFrame, playbackState } = get();
    if (playbackState !== PLAYBACK_STATE.PLAYING) return false;

    if (currentFrame < frames.length - 1) {
      const next = currentFrame + 1;
      set({
        currentFrame: next,
        ...frames[next].stats,
        array: frames[next].array ? [...frames[next].array] : get().array,
        visualData: frames[next].visualData
          ? JSON.parse(JSON.stringify(frames[next].visualData))
          : get().visualData,
        playbackState: next >= frames.length - 1 ? PLAYBACK_STATE.COMPLETED : PLAYBACK_STATE.PLAYING,
      });
      return true;
    }

    set({ playbackState: PLAYBACK_STATE.COMPLETED });
    return false;
  },

  updateStats: (stats) => set(stats),
}));
