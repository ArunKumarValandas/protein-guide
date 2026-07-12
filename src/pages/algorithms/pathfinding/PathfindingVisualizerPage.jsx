import { useCallback, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { PATHFINDING_ALGORITHMS } from '@/constants/pathfinding';
import { ROUTES } from '@/config/routes';
import { useKeyboardNav } from '@/hooks/useKeyboardNav';
import { usePlayback } from '@/hooks/usePlayback';
import { runPathfindingAlgorithm } from '@/services/algorithms/pathfinding';
import { useAppStore } from '@/store/useAppStore';
import { useVisualizerStore } from '@/store/useVisualizerStore';
import { Button } from '@/components/common/Button';
import { ExportButton } from '@/components/common/ExportButton';
import { VisualizerTabs } from '@/components/common/VisualizerTabs';
import { PlaybackControls } from '@/components/controls/PlaybackControls';
import { StatsPanel } from '@/components/controls/StatsPanel';
import { CodeViewer } from '@/components/learning/CodeViewer';
import { LearningPanel } from '@/components/learning/LearningPanel';
import { PathfindingVisualizer } from '@/components/visualizers/PathfindingVisualizer';

function setInitialStats(frames) {
  const first = frames[0];
  useVisualizerStore.setState({
    comparisons: first?.stats?.comparisons || 0,
    swaps: first?.stats?.swaps || 0,
    steps: first?.stats?.steps || 0,
    executionTime: first?.stats?.executionTime || 0,
  });
}

export function PathfindingVisualizerPage() {
  const { algorithm: algorithmId = 'path-bfs' } = useParams();
  const algorithm = PATHFINDING_ALGORITHMS[algorithmId] || PATHFINDING_ALGORITHMS['path-bfs'];
  const [activeTab, setActiveTab] = useState('visualize');

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
  const unlockAchievement = useAppStore((s) => s.unlockAchievement);

  const currentFrameData = frames[currentFrame] || {};
  const highlights = currentFrameData.highlights || {};
  const message = currentFrameData.meta?.message || '';

  const generateAndRun = useCallback(() => {
    const nextFrames = runPathfindingAlgorithm(algorithm.id);
    setVisualData(nextFrames[0]?.visualData || null);
    setFrames(nextFrames);
    setInitialStats(nextFrames);
  }, [algorithm.id, setFrames, setVisualData]);

  useEffect(() => {
    generateAndRun();
    return () => reset();
  }, [generateAndRun, reset]);

  usePlayback(() => {
    addRecentActivity({ type: 'pathfinding', algorithm: algorithm.id, name: algorithm.name });
    updateProgress(algorithm.id, { completed: true });
    unlockAchievement('pathfinder');
  });

  useKeyboardNav({
    onPlayPause: () => (useVisualizerStore.getState().playbackState === 'playing' ? pause() : play()),
    onNext: nextStep,
    onPrev: prevStep,
    onReset: generateAndRun,
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <Link to={ROUTES.PATHFINDING}>
            <Button variant="ghost" size="icon" aria-label="Back to pathfinding">
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
            <div id="visualizer-export" className="card min-h-[380px]">
              <PathfindingVisualizer visualData={visualData} highlights={highlights} />
            </div>
            <StatsPanel
              comparisons={comparisons}
              swaps={swaps}
              steps={steps}
              executionTime={executionTime}
              message={message}
              labels={{ swaps: 'Parent Updates' }}
            />
          </div>
          <div className="space-y-4">
            <div className="card">
              <PlaybackControls
                onGenerateRandom={generateAndRun}
                onReset={generateAndRun}
                showArrayControls={false}
                randomLabel="Reset maze"
              />
            </div>
            <div className="card space-y-2 text-sm text-content-muted">
              <p>S is the start cell. E is the goal cell.</p>
              <p>Dark cells are walls. Yellow cells show the reconstructed path.</p>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'learn' && <LearningPanel algorithm={algorithm} />}
      {activeTab === 'code' && <CodeViewer algorithmId={algorithm.id} />}
    </div>
  );
}
