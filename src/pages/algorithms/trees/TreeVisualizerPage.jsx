import { useCallback, useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { TREE_ALGORITHMS } from '@/constants/trees';
import { ROUTES } from '@/config/routes';
import { useKeyboardNav } from '@/hooks/useKeyboardNav';
import { usePlayback } from '@/hooks/usePlayback';
import { runTreeAlgorithm } from '@/services/algorithms/trees';
import { useAppStore } from '@/store/useAppStore';
import { useVisualizerStore } from '@/store/useVisualizerStore';
import { parseArrayInput } from '@/utils/array';
import { Button } from '@/components/common/Button';
import { ExportButton } from '@/components/common/ExportButton';
import { VisualizerTabs } from '@/components/common/VisualizerTabs';
import { PlaybackControls } from '@/components/controls/PlaybackControls';
import { StatsPanel } from '@/components/controls/StatsPanel';
import { CodeViewer } from '@/components/learning/CodeViewer';
import { LearningPanel } from '@/components/learning/LearningPanel';
import { TreeVisualizer } from '@/components/visualizers/TreeVisualizer';

const DEFAULT_VALUES = [40, 20, 60, 10, 30, 50, 70];

function randomTreeValues() {
  const values = new Set();
  while (values.size < 7) values.add(Math.floor(Math.random() * 90) + 10);
  return [...values];
}

function setInitialStats(frames) {
  const first = frames[0];
  useVisualizerStore.setState({
    comparisons: first?.stats?.comparisons || 0,
    swaps: first?.stats?.swaps || 0,
    steps: first?.stats?.steps || 0,
    executionTime: first?.stats?.executionTime || 0,
  });
}

export function TreeVisualizerPage() {
  const { algorithm: algorithmId = 'bst-insert' } = useParams();
  const algorithm = TREE_ALGORITHMS[algorithmId] || TREE_ALGORITHMS['bst-insert'];
  const [activeTab, setActiveTab] = useState('visualize');
  const [manualInput, setManualInput] = useState(DEFAULT_VALUES.join(', '));
  const [targetValue, setTargetValue] = useState('25');

  const frames = useVisualizerStore((s) => s.frames);
  const currentFrame = useVisualizerStore((s) => s.currentFrame);
  const visualData = useVisualizerStore((s) => s.visualData);
  const comparisons = useVisualizerStore((s) => s.comparisons);
  const swaps = useVisualizerStore((s) => s.swaps);
  const steps = useVisualizerStore((s) => s.steps);
  const executionTime = useVisualizerStore((s) => s.executionTime);
  const setFrames = useVisualizerStore((s) => s.setFrames);
  const setVisualData = useVisualizerStore((s) => s.setVisualData);
  const reset = useVisualizerStore((s) => s.reset);
  const play = useVisualizerStore((s) => s.play);
  const pause = useVisualizerStore((s) => s.pause);
  const nextStep = useVisualizerStore((s) => s.nextStep);
  const prevStep = useVisualizerStore((s) => s.prevStep);

  const addRecentActivity = useAppStore((s) => s.addRecentActivity);
  const updateProgress = useAppStore((s) => s.updateProgress);

  const currentFrameData = frames[currentFrame] || {};
  const highlights = currentFrameData.highlights || {};
  const message = currentFrameData.meta?.message || '';
  const needsTarget = useMemo(() => ['bst-insert', 'bst-search'].includes(algorithm.id), [algorithm.id]);

  const generateAndRun = useCallback(
    (inputValues, target) => {
      const values = inputValues?.length ? inputValues : randomTreeValues();
      const value = target ?? (algorithm.id === 'bst-search' ? values[Math.floor(values.length / 2)] : 25);
      const nextFrames = runTreeAlgorithm(algorithm.id, values, value);
      setManualInput(values.join(', '));
      if (needsTarget) setTargetValue(String(value));
      setVisualData(nextFrames[0]?.visualData || null);
      setFrames(nextFrames);
      setInitialStats(nextFrames);
    },
    [algorithm.id, needsTarget, setFrames, setVisualData],
  );

  useEffect(() => {
    generateAndRun(DEFAULT_VALUES, algorithm.id === 'bst-search' ? 30 : 25);
    return () => reset();
  }, [algorithm.id, generateAndRun, reset]);

  usePlayback(() => {
    addRecentActivity({ type: 'trees', algorithm: algorithm.id, name: algorithm.name });
    updateProgress(algorithm.id, { completed: true });
  });

  useKeyboardNav({
    onPlayPause: () => (useVisualizerStore.getState().playbackState === 'playing' ? pause() : play()),
    onNext: nextStep,
    onPrev: prevStep,
    onReset: () => generateAndRun(),
  });

  const handleApplyInput = () => {
    const values = parseArrayInput(manualInput).slice(0, 11);
    const value = needsTarget ? Number(targetValue) : null;
    if (values.length > 0 && (!needsTarget || !Number.isNaN(value))) {
      generateAndRun(values, value);
    }
  };

  const handleRandom = () => {
    const values = randomTreeValues();
    generateAndRun(values, algorithm.id === 'bst-search' ? values[Math.floor(values.length / 2)] : Math.floor(Math.random() * 90) + 10);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <Link to={ROUTES.TREES}>
            <Button variant="ghost" size="icon" aria-label="Back to trees">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-content">{algorithm.name}</h1>
            <p className="text-sm text-content-muted">{algorithm.description}</p>
          </div>
        </div>
        <ExportButton />
      </div>

      <VisualizerTabs activeTab={activeTab} onTabChange={setActiveTab} />

      {activeTab === 'visualize' && (
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            <div id="visualizer-export" className="card min-h-[360px]">
              <TreeVisualizer visualData={visualData} highlights={highlights} />
            </div>
            <StatsPanel
              comparisons={comparisons}
              swaps={swaps}
              steps={steps}
              executionTime={executionTime}
              message={message}
              labels={{ swaps: 'Links Updated' }}
            />
          </div>
          <div className="space-y-4">
            <div className="card">
              <PlaybackControls
                onGenerateRandom={handleRandom}
                onReset={handleApplyInput}
                showArrayControls={false}
                randomLabel="Generate random tree"
              />
            </div>
            <div className="card space-y-3">
              <label htmlFor="tree-input" className="text-sm font-medium text-content">
                BST Values
              </label>
              <input
                id="tree-input"
                type="text"
                className="input"
                value={manualInput}
                onChange={(event) => setManualInput(event.target.value)}
              />
              {needsTarget && (
                <>
                  <label htmlFor="tree-target" className="text-sm font-medium text-content">
                    {algorithm.id === 'bst-insert' ? 'Insert Value' : 'Search Target'}
                  </label>
                  <input
                    id="tree-target"
                    type="number"
                    className="input"
                    value={targetValue}
                    onChange={(event) => setTargetValue(event.target.value)}
                  />
                </>
              )}
              <Button variant="secondary" className="w-full" onClick={handleApplyInput}>
                Apply Input
              </Button>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'learn' && <LearningPanel algorithm={algorithm} />}
      {activeTab === 'code' && <CodeViewer algorithmId={algorithm.id} />}
    </div>
  );
}
