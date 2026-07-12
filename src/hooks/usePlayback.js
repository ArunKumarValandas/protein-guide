import { useEffect, useRef, useCallback } from 'react';
import { useVisualizerStore, PLAYBACK_STATE } from '@/store/useVisualizerStore';
import { useAppStore } from '@/store/useAppStore';

export function usePlayback(onComplete) {
  const playbackState = useVisualizerStore((s) => s.playbackState);
  const speed = useVisualizerStore((s) => s.speed);
  const tick = useVisualizerStore((s) => s.tick);
  const frames = useVisualizerStore((s) => s.frames);
  const currentFrame = useVisualizerStore((s) => s.currentFrame);
  const updateStatistics = useAppStore((s) => s.updateStatistics);
  const intervalRef = useRef(null);

  const clearInterval_ = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  useEffect(() => {
    if (playbackState === PLAYBACK_STATE.PLAYING && frames.length > 0) {
      const delay = Math.max(10, 110 - speed);
      intervalRef.current = setInterval(() => {
        const continued = tick();
        if (!continued) {
          clearInterval_();
          if (onComplete) onComplete();
        }
      }, delay);
    } else {
      clearInterval_();
    }

    return clearInterval_;
  }, [playbackState, speed, frames.length, tick, clearInterval_, onComplete]);

  useEffect(() => {
    if (playbackState === PLAYBACK_STATE.COMPLETED && frames.length > 0) {
      const lastFrame = frames[frames.length - 1];
      updateStatistics({
        visualizations: 1,
        comparisons: lastFrame.stats?.comparisons || 0,
        swaps: lastFrame.stats?.swaps || 0,
        steps: frames.length,
        timeMs: lastFrame.stats?.executionTime || 0,
      });
    }
  }, [playbackState, frames, updateStatistics]);

  return {
    playbackState,
    currentFrame,
    totalFrames: frames.length,
    progress: frames.length > 0 ? (currentFrame / (frames.length - 1)) * 100 : 0,
  };
}
