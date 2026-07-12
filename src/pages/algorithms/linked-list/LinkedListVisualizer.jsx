import { useCallback, useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { getCodeId, getLinkedListMetadata, LINKED_LIST_OPERATIONS, LINKED_LIST_TYPES } from '@/constants/dataStructures';
import { ROUTES } from '@/config/routes';
import { useKeyboardNav } from '@/hooks/useKeyboardNav';
import { usePlayback } from '@/hooks/usePlayback';
import { runLinkedListOperation } from '@/services/dataStructures';
import { useAppStore } from '@/store/useAppStore';
import { useVisualizerStore } from '@/store/useVisualizerStore';
import { parseArrayInput } from '@/utils/array';
import { Button } from '@/components/common/Button';
import { ExportButton } from '@/components/common/ExportButton';
import { PlaybackControls } from '@/components/controls/PlaybackControls';
import { StatsPanel } from '@/components/controls/StatsPanel';
import { CodeViewer } from '@/components/learning/CodeViewer';
import { LearningPanel } from '@/components/learning/LearningPanel';
import { VisualizerTabs } from '@/components/common/VisualizerTabs';
import { LinkedListVisualizer as LinkedListGraphic } from '@/components/visualizers/LinkedListVisualizer';

function randomList() {
  return Array.from({ length: 6 }, () => Math.floor(Math.random() * 90) + 10);
}

function pickOperationValue(operation, values) {
  if (operation === 'insert') return Math.floor(Math.random() * 90) + 10;
  if (operation === 'reverse' || operation === 'traverse') return null;
  return values[Math.floor(Math.random() * values.length)];
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

export function LinkedListVisualizer() {
  const { type = 'singly', operation = 'insert' } = useParams();
  const [activeTab, setActiveTab] = useState('visualize');
  const [manualInput, setManualInput] = useState('12, 24, 36, 48, 60');
  const [operationValue, setOperationValue] = useState('18');

  const validType = LINKED_LIST_TYPES[type] ? type : 'singly';
  const validOperation = LINKED_LIST_OPERATIONS[operation] ? operation : 'insert';
  const algorithm = useMemo(
    () => getLinkedListMetadata(validType, validOperation),
    [validType, validOperation],
  );

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
  const needsValue = !['reverse', 'traverse'].includes(validOperation);
  const codeId = getCodeId('linked-list', validType, validOperation);

  const generateAndRun = useCallback(
    (inputValues, inputValue) => {
      const values = inputValues?.length ? inputValues : randomList();
      const value = inputValue ?? pickOperationValue(validOperation, values);
      const nextFrames = runLinkedListOperation(validType, validOperation, values, value);
      if (value !== null && value !== undefined) setOperationValue(String(value));
      setManualInput(values.join(', '));
      setVisualData(nextFrames[0]?.visualData || null);
      setFrames(nextFrames);
      setInitialStats(nextFrames);
    },
    [setFrames, setVisualData, validOperation, validType],
  );

  useEffect(() => {
    const values = randomList();
    generateAndRun(values, pickOperationValue(validOperation, values));
    return () => reset();
  }, [generateAndRun, reset, validOperation]);

  usePlayback(() => {
    const id = `linked-list-${validType}-${validOperation}`;
    addRecentActivity({ type: 'linked-list', algorithm: id, name: algorithm.name });
    updateProgress(id, { completed: true });
  });

  useKeyboardNav({
    onPlayPause: () => (useVisualizerStore.getState().playbackState === 'playing' ? pause() : play()),
    onNext: nextStep,
    onPrev: prevStep,
    onReset: () => generateAndRun(),
  });

  const handleApplyInput = () => {
    const parsed = parseArrayInput(manualInput).slice(0, 12);
    const value = needsValue ? Number(operationValue) : null;
    if (parsed.length > 0 && (!needsValue || !Number.isNaN(value))) {
      generateAndRun(parsed, value);
    }
  };

  const handleRandom = () => {
    const values = randomList();
    generateAndRun(values, pickOperationValue(validOperation, values));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <Link to={ROUTES.LINKED_LIST}>
            <Button variant="ghost" size="icon" aria-label="Back to linked lists">
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
              <LinkedListGraphic visualData={visualData} highlights={highlights} className="min-h-[280px]" />
            </div>
            <StatsPanel
              comparisons={comparisons}
              swaps={swaps}
              steps={steps}
              executionTime={executionTime}
              message={message}
              labels={{ swaps: 'Pointer Updates' }}
            />
          </div>
          <div className="space-y-4">
            <div className="card">
              <PlaybackControls
                onGenerateRandom={handleRandom}
                onReset={handleApplyInput}
                showArrayControls={false}
                randomLabel="Generate random linked list"
              />
            </div>
            <div className="card space-y-3">
              <label htmlFor="linked-list-input" className="text-sm font-medium text-content">
                Node Values
              </label>
              <input
                id="linked-list-input"
                type="text"
                className="input"
                value={manualInput}
                onChange={(event) => setManualInput(event.target.value)}
                placeholder="e.g. 12, 24, 36, 48"
              />
              {needsValue && (
                <>
                  <label htmlFor="linked-list-value" className="text-sm font-medium text-content">
                    Operation Value
                  </label>
                  <input
                    id="linked-list-value"
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
