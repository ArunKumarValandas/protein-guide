import { useCallback, useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { getCodeId, getQueueMetadata, QUEUE_OPERATIONS, QUEUE_TYPES } from '@/constants/dataStructures';
import { ROUTES } from '@/config/routes';
import { useKeyboardNav } from '@/hooks/useKeyboardNav';
import { usePlayback } from '@/hooks/usePlayback';
import { runQueueOperation } from '@/services/dataStructures';
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
import { QueueVisualizer as QueueGraphic } from '@/components/visualizers/QueueVisualizer';

function randomQueue() {
  return Array.from({ length: 5 }, () => Math.floor(Math.random() * 90) + 10);
}

function randomQueueValue() {
  return Math.floor(Math.random() * 90) + 10;
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

export function QueueVisualizer() {
  const { type = 'queue', operation = 'enqueue' } = useParams();
  const validType = QUEUE_TYPES[type] ? type : 'queue';
  const validOperation = QUEUE_OPERATIONS[operation] ? operation : 'enqueue';
  const algorithm = useMemo(() => getQueueMetadata(validType, validOperation), [validOperation, validType]);
  const [activeTab, setActiveTab] = useState('visualize');
  const [manualInput, setManualInput] = useState('18, 32, 46, 60');
  const [operationValue, setOperationValue] = useState('74');

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
  const needsValue = validOperation === 'enqueue';
  const codeId = getCodeId('queue', validType, validOperation);

  const generateAndRun = useCallback(
    (inputValues, inputValue) => {
      const values = inputValues?.length ? inputValues : randomQueue();
      const value = inputValue ?? randomQueueValue();
      const nextFrames = runQueueOperation(validType, validOperation, values, value);
      setManualInput(values.join(', '));
      if (needsValue) setOperationValue(String(value));
      setVisualData(nextFrames[0]?.visualData || null);
      setFrames(nextFrames);
      setInitialStats(nextFrames);
    },
    [needsValue, setFrames, setVisualData, validOperation, validType],
  );

  useEffect(() => {
    generateAndRun(randomQueue(), randomQueueValue());
    return () => reset();
  }, [generateAndRun, reset]);

  usePlayback(() => {
    const id = `queue-${validType}-${validOperation}`;
    addRecentActivity({ type: 'queue', algorithm: id, name: algorithm.name });
    updateProgress(id, { completed: true });
  });

  useKeyboardNav({
    onPlayPause: () => (useVisualizerStore.getState().playbackState === 'playing' ? pause() : play()),
    onNext: nextStep,
    onPrev: prevStep,
    onReset: () => generateAndRun(),
  });

  const handleApplyInput = () => {
    const values = parseArrayInput(manualInput).slice(0, 8);
    const value = needsValue ? Number(operationValue) : null;
    if (values.length > 0 && (!needsValue || !Number.isNaN(value))) {
      generateAndRun(values, value);
    }
  };

  const handleRandom = () => {
    generateAndRun(randomQueue(), randomQueueValue());
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <Link to={ROUTES.QUEUE}>
            <Button variant="ghost" size="icon" aria-label="Back to queues">
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
            <div id="visualizer-export" className="card min-h-[320px]">
              <QueueGraphic visualData={visualData} highlights={highlights} />
            </div>
            <StatsPanel
              comparisons={comparisons}
              swaps={swaps}
              steps={steps}
              executionTime={executionTime}
              message={message}
              labels={{ comparisons: 'Inspections', swaps: 'Pointer Moves' }}
            />
          </div>
          <div className="space-y-4">
            <div className="card">
              <PlaybackControls
                onGenerateRandom={handleRandom}
                onReset={handleApplyInput}
                showArrayControls={false}
                randomLabel="Generate random queue"
              />
            </div>
            <div className="card space-y-3">
              <label htmlFor="queue-input" className="text-sm font-medium text-content">
                Queue Values
              </label>
              <input
                id="queue-input"
                type="text"
                className="input"
                value={manualInput}
                onChange={(event) => setManualInput(event.target.value)}
                placeholder="e.g. 18, 32, 46, 60"
              />
              {needsValue && (
                <>
                  <label htmlFor="queue-value" className="text-sm font-medium text-content">
                    Enqueue Value
                  </label>
                  <input
                    id="queue-value"
                    type="number"
                    className="input"
                    value={operationValue}
                    onChange={(event) => setOperationValue(event.target.value)}
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
      {activeTab === 'code' && <CodeViewer algorithmId={codeId} />}
    </div>
  );
}
