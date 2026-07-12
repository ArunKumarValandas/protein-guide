import { useEffect, useCallback, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, BookOpen, Code } from 'lucide-react';
import { SORTING_ALGORITHMS } from '@/constants/algorithms';
import { ROUTES } from '@/config/routes';
import { useVisualizerStore } from '@/store/useVisualizerStore';
import { useAppStore } from '@/store/useAppStore';
import { usePlayback } from '@/hooks/usePlayback';
import { useKeyboardNav } from '@/hooks/useKeyboardNav';
import { runSortingAlgorithm } from '@/services/algorithms/sorting';
import { generateRandomArray, parseArrayInput } from '@/utils/array';
import { ArrayVisualizer } from '@/components/visualizers/ArrayVisualizer';
import { PlaybackControls } from '@/components/controls/PlaybackControls';
import { StatsPanel } from '@/components/controls/StatsPanel';
import { LearningPanel } from '@/components/learning/LearningPanel';
import { CodeViewer } from '@/components/learning/CodeViewer';
import { Button } from '@/components/common/Button';
import { cn } from '@/utils/cn';

export function SortingVisualizer() {
  const { algorithm: algorithmId } = useParams();
  const algorithm = SORTING_ALGORITHMS[algorithmId];
  const [activeTab, setActiveTab] = useState('visualize');
  const [manualInput, setManualInput] = useState('');

  const array = useVisualizerStore((s) => s.array);
  const frames = useVisualizerStore((s) => s.frames);
  const currentFrame = useVisualizerStore((s) => s.currentFrame);
  const comparisons = useVisualizerStore((s) => s.comparisons);
  const swaps = useVisualizerStore((s) => s.swaps);
  const steps = useVisualizerStore((s) => s.steps);
  const executionTime = useVisualizerStore((s) => s.executionTime);
  const arraySize = useVisualizerStore((s) => s.arraySize);
  const setArray = useVisualizerStore((s) => s.setArray);
  const setFrames = useVisualizerStore((s) => s.setFrames);
  const reset = useVisualizerStore((s) => s.reset);
  const play = useVisualizerStore((s) => s.play);
  const pause = useVisualizerStore((s) => s.pause);
  const nextStep = useVisualizerStore((s) => s.nextStep);
  const prevStep = useVisualizerStore((s) => s.prevStep);

  const addRecentActivity = useAppStore((s) => s.addRecentActivity);
  const updateProgress = useAppStore((s) => s.updateProgress);
  const unlockAchievement = useAppStore((s) => s.unlockAchievement);

  const currentFrameData = frames[currentFrame] || {};
  const highlights = currentFrameData.highlights || {};
  const message = currentFrameData.meta?.message || '';

  const generateAndRun = useCallback(
    (inputArray) => {
      const arr = inputArray || generateRandomArray(arraySize);
      setArray(arr);
      const newFrames = runSortingAlgorithm(algorithmId, arr);
      setFrames(newFrames);
      if (newFrames.length > 0) {
        const first = newFrames[0];
        useVisualizerStore.setState({
          comparisons: first.stats?.comparisons || 0,
          swaps: first.stats?.swaps || 0,
          steps: first.stats?.steps || 0,
          executionTime: first.stats?.executionTime || 0,
        });
      }
    },
    [algorithmId, arraySize, setArray, setFrames],
  );

  useEffect(() => {
    const arr = generateRandomArray(arraySize);
    setArray(arr);
    const newFrames = runSortingAlgorithm(algorithmId, arr);
    setFrames(newFrames);
    if (newFrames.length > 0) {
      const first = newFrames[0];
      useVisualizerStore.setState({
        comparisons: first.stats?.comparisons || 0,
        swaps: first.stats?.swaps || 0,
        steps: first.stats?.steps || 0,
        executionTime: first.stats?.executionTime || 0,
      });
    }
    return () => reset();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [algorithmId, arraySize]);

  usePlayback(() => {
    addRecentActivity({
      type: 'sorting',
      algorithm: algorithmId,
      name: algorithm?.name,
    });
    updateProgress(algorithmId, { completed: true, views: (useAppStore.getState().progress[algorithmId]?.views || 0) + 1 });
    unlockAchievement('first_sort');
  });

  useKeyboardNav({
    onPlayPause: () => (useVisualizerStore.getState().playbackState === 'playing' ? pause() : play()),
    onNext: nextStep,
    onPrev: prevStep,
    onReset: () => generateAndRun(),
  });

  const handleManualInput = () => {
    const parsed = parseArrayInput(manualInput);
    if (parsed.length > 0) generateAndRun(parsed);
  };

  if (!algorithm) {
    return (
      <div className="text-center">
        <h2 className="text-xl font-bold">Algorithm not found</h2>
        <Link to={ROUTES.SORTING} className="mt-4 inline-block text-accent">
          Back to Sorting
        </Link>
      </div>
    );
  }

  const tabs = [
    { id: 'visualize', label: 'Visualize' },
    { id: 'learn', label: 'Learn', icon: BookOpen },
    { id: 'code', label: 'Code', icon: Code },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link to={ROUTES.SORTING}>
          <Button variant="ghost" size="icon" aria-label="Back to sorting">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-content">{algorithm.name}</h1>
          <p className="text-sm text-content-muted">{algorithm.description}</p>
        </div>
      </div>

      <div className="flex gap-2 border-b border-border" role="tablist">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            role="tab"
            aria-selected={activeTab === tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              'flex items-center gap-2 border-b-2 px-4 py-2 text-sm font-medium transition-colors',
              activeTab === tab.id
                ? 'border-accent text-accent'
                : 'border-transparent text-content-muted hover:text-content',
            )}
          >
            {tab.icon && <tab.icon className="h-4 w-4" />}
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'visualize' && (
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            <div className="card min-h-[320px]">
              <ArrayVisualizer array={array} highlights={highlights} className="min-h-[280px]" />
            </div>
            <StatsPanel
              comparisons={comparisons}
              swaps={swaps}
              steps={steps}
              executionTime={executionTime}
              message={message}
            />
          </div>
          <div className="space-y-4">
            <div className="card">
              <PlaybackControls
                onGenerateRandom={() => generateAndRun()}
                onReset={() => generateAndRun()}
              />
            </div>
            <div className="card space-y-3">
              <label htmlFor="manual-input" className="text-sm font-medium text-content">
                Manual Input
              </label>
              <input
                id="manual-input"
                type="text"
                className="input"
                placeholder="e.g. 64, 34, 25, 12, 22"
                value={manualInput}
                onChange={(e) => setManualInput(e.target.value)}
              />
              <Button variant="secondary" className="w-full" onClick={handleManualInput}>
                Apply Input
              </Button>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'learn' && <LearningPanel algorithm={algorithm} />}
      {activeTab === 'code' && <CodeViewer algorithmId={algorithmId} />}
    </div>
  );
}
