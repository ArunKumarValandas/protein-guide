import { useMemo, useState } from 'react';
import { GitCompare, Trophy } from 'lucide-react';
import { SORTING_ALGO_LIST } from '@/constants/algorithms';
import { determineComparisonWinner, runAlgorithmBenchmark } from '@/utils/benchmark';
import { generateRandomArray, parseArrayInput } from '@/utils/array';
import { formatDuration } from '@/utils/format';
import { useAppStore } from '@/store/useAppStore';
import { Button } from '@/components/common/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/common/Card';
import { Badge } from '@/components/common/Badge';

function ResultCard({ label, algorithm, result, winner }) {
  return (
    <Card className={winner ? 'border-accent/60 bg-accent-muted/20' : ''}>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          {label}
          {winner && <Badge variant="primary"><Trophy className="mr-1 h-3 w-3" />Winner</Badge>}
        </CardTitle>
        <CardDescription>{algorithm?.name}</CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-3 text-sm">
        <div><span className="text-content-muted">Comparisons</span><div className="font-semibold text-content">{result.comparisons}</div></div>
        <div><span className="text-content-muted">Swaps</span><div className="font-semibold text-content">{result.swaps}</div></div>
        <div><span className="text-content-muted">Steps</span><div className="font-semibold text-content">{result.steps}</div></div>
        <div><span className="text-content-muted">Time</span><div className="font-semibold text-content">{formatDuration(result.executionTime)}</div></div>
      </CardContent>
    </Card>
  );
}

export function ComparisonPage() {
  const [leftId, setLeftId] = useState('bubble-sort');
  const [rightId, setRightId] = useState('quick-sort');
  const [input, setInput] = useState('64, 34, 25, 12, 22, 11, 90');
  const updateStatistics = useAppStore((s) => s.updateStatistics);

  const values = useMemo(() => {
    const parsed = parseArrayInput(input);
    return parsed.length ? parsed.slice(0, 30) : generateRandomArray(12);
  }, [input]);

  const comparison = useMemo(() => {
    const left = runAlgorithmBenchmark(leftId, values);
    const right = runAlgorithmBenchmark(rightId, values);
    const winner = determineComparisonWinner(left, right);
    return { left, right, winner };
  }, [leftId, rightId, values]);

  const handleRandom = () => {
    setInput(generateRandomArray(12).join(', '));
  };

  const handleSave = () => {
    updateStatistics({ comparisons: 1 });
  };

  const leftAlgo = SORTING_ALGO_LIST.find((algo) => algo.id === leftId);
  const rightAlgo = SORTING_ALGO_LIST.find((algo) => algo.id === rightId);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-content">Comparison Mode</h1>
        <p className="mt-2 text-content-muted">Run two sorting algorithms on identical input and compare their behavior.</p>
      </div>

      <Card>
        <CardContent className="grid gap-4 p-0 lg:grid-cols-[1fr_1fr_2fr_auto]">
          <label className="space-y-2">
            <span className="text-sm font-medium text-content">Algorithm A</span>
            <select className="input" value={leftId} onChange={(event) => setLeftId(event.target.value)}>
              {SORTING_ALGO_LIST.map((algo) => <option key={algo.id} value={algo.id}>{algo.name}</option>)}
            </select>
          </label>
          <label className="space-y-2">
            <span className="text-sm font-medium text-content">Algorithm B</span>
            <select className="input" value={rightId} onChange={(event) => setRightId(event.target.value)}>
              {SORTING_ALGO_LIST.map((algo) => <option key={algo.id} value={algo.id}>{algo.name}</option>)}
            </select>
          </label>
          <label className="space-y-2">
            <span className="text-sm font-medium text-content">Input Array</span>
            <input className="input" value={input} onChange={(event) => setInput(event.target.value)} />
          </label>
          <div className="flex items-end gap-2">
            <Button variant="secondary" onClick={handleRandom}>Random</Button>
            <Button onClick={handleSave}><GitCompare className="h-4 w-4" />Save</Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        <ResultCard label="Algorithm A" algorithm={leftAlgo} result={comparison.left} winner={comparison.winner === 'a'} />
        <ResultCard label="Algorithm B" algorithm={rightAlgo} result={comparison.right} winner={comparison.winner === 'b'} />
      </div>

      {comparison.winner === 'tie' && <Badge variant="info">Tie result</Badge>}
    </div>
  );
}
