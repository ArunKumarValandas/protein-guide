import {
  Play,
  Pause,
  SkipBack,
  RotateCcw,
  StepBack,
  StepForward,
  Shuffle,
} from 'lucide-react';
import { useVisualizerStore, PLAYBACK_STATE } from '@/store/useVisualizerStore';
import { Button } from '@/components/common/Button';
import { Slider } from '@/components/common/Slider';

export function PlaybackControls({
  onGenerateRandom,
  onReset,
  showArrayControls = true,
  randomLabel = 'Generate random array',
}) {
  const playbackState = useVisualizerStore((s) => s.playbackState);
  const speed = useVisualizerStore((s) => s.speed);
  const arraySize = useVisualizerStore((s) => s.arraySize);
  const frames = useVisualizerStore((s) => s.frames);
  const currentFrame = useVisualizerStore((s) => s.currentFrame);
  const setSpeed = useVisualizerStore((s) => s.setSpeed);
  const setArraySize = useVisualizerStore((s) => s.setArraySize);
  const play = useVisualizerStore((s) => s.play);
  const pause = useVisualizerStore((s) => s.pause);
  const resume = useVisualizerStore((s) => s.resume);
  const nextStep = useVisualizerStore((s) => s.nextStep);
  const prevStep = useVisualizerStore((s) => s.prevStep);
  const stop = useVisualizerStore((s) => s.stop);

  const isPlaying = playbackState === PLAYBACK_STATE.PLAYING;
  const isPaused = playbackState === PLAYBACK_STATE.PAUSED;
  const hasFrames = frames.length > 0;

  const handlePlayPause = () => {
    if (isPlaying) {
      pause();
    } else if (isPaused) {
      resume();
    } else {
      play();
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-center gap-2">
        <Button variant="ghost" size="icon" onClick={stop} disabled={!hasFrames} aria-label="Reset to start">
          <SkipBack className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" onClick={prevStep} disabled={!hasFrames || currentFrame === 0} aria-label="Previous step">
          <StepBack className="h-4 w-4" />
        </Button>
        <Button
          variant="primary"
          size="icon"
          onClick={handlePlayPause}
          disabled={!hasFrames}
          aria-label={isPlaying ? 'Pause' : 'Play'}
        >
          {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={nextStep}
          disabled={!hasFrames || currentFrame >= frames.length - 1}
          aria-label="Next step"
        >
          <StepForward className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" onClick={onReset} aria-label="Reset">
          <RotateCcw className="h-4 w-4" />
        </Button>
        {onGenerateRandom && (
          <Button variant="secondary" size="icon" onClick={onGenerateRandom} aria-label={randomLabel}>
            <Shuffle className="h-4 w-4" />
          </Button>
        )}
      </div>

      <Slider label="Speed" value={speed} onChange={setSpeed} min={1} max={100} unit="%" />

      {showArrayControls && (
        <Slider
          label="Array Size"
          value={arraySize}
          onChange={setArraySize}
          min={5}
          max={50}
          disabled={isPlaying}
        />
      )}

      {hasFrames && (
        <div className="text-center text-xs text-content-muted">
          Step {currentFrame + 1} of {frames.length}
        </div>
      )}
    </div>
  );
}
