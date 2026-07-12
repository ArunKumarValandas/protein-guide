import { useMemo, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { BarChart3, Trophy } from 'lucide-react';
import { SORTING_ALGO_LIST } from '@/constants/algorithms';
import { rankBenchmarkResults, runAlgorithmBenchmark } from '@/utils/benchmark';
import { generateRandomArray, parseArrayInput } from '@/utils/array';
import { formatDuration } from '@/utils/format';
import { useAppStore } from '@/store/useAppStore';
import { Button } from '@/components/common/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/common/Card';
import { Badge } from '@/components/common/Badge';

export function BenchmarkPage() {
  const [selected, setSelected] = useState(['bubble-sort', 'selection-sort', 'quick-sort', 'merge-sort']);
  const [input, setInput] = useState(generateRandomArray(16).join(', '));
  const updateStatistics = useAppStore((s) => s.updateStatistics);
  const unlockAchievement = useAppStore((s) => s.unlockAchievement);

  const values = useMemo(() => {
    const parsed = parseArrayInput(input);
    return parsed.length ? parsed.slice(0, 40) : generateRandomArray(16);
  }, [input]);

  const results = useMemo(() => {
    return rankBenchmarkResults(
      selected.map((id) => ({
        id,
        name: SORTING_ALGO_LIST.find((algo) => algo.id === id)?.name || id,
        ...runAlgorithmBenchmark(id, values),
      })),
    );
  }, [selected, values]);

  const toggleAlgorithm = (id) => {
    setSelected((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id],
    );
  };

  const handleRandom = () => setInput(generateRandomArray(16).join(', '));

  const handleRecord = () => {
    updateStatistics({ comparisons: 1 });
    unlockAchievement('benchmark_king');
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-content">Benchmark Mode</h1>
        <p className="mt-2 text-content-muted">Rank selected sorting algorithms by runtime, comparisons, and swaps.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Benchmark Setup</CardTitle>
          <CardDescription>Choose algorithms and input data.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {SORTING_ALGO_LIST.map((algorithm) => (
              <button
                key={algorithm.id}
                className={`badge border ${selected.includes(algorithm.id) ? 'border-accent bg-accent-muted text-accent' : 'border-border bg-surface-muted text-content-muted'}`}
                onClick={() => toggleAlgorithm(algorithm.id)}
              >
                {algorithm.name}
              </button>
            ))}
          </div>
          <div className="grid gap-3 lg:grid-cols-[1fr_auto_auto]">
            <input className="input" value={input} onChange={(event) => setInput(event.target.value)} />
            <Button variant="secondary" onClick={handleRandom}>Random</Button>
            <Button onClick={handleRecord}><BarChart3 className="h-4 w-4" />Record</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Comparison Chart</CardTitle>
          <CardDescription>Lower bars are better.</CardDescription>
        </CardHeader>
        <CardContent className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={results}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis dataKey="name" stroke="var(--color-text-muted)" tick={{ fontSize: 11 }} />
              <YAxis stroke="var(--color-text-muted)" />
              <Tooltip contentStyle={{ background: 'var(--color-surface-elevated)', border: '1px solid var(--color-border)' }} />
              <Bar dataKey="comparisons" fill="var(--color-accent)" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid gap-3">
        {results.map((result) => (
          <Card key={result.id}>
            <CardContent className="grid gap-3 p-0 sm:grid-cols-[80px_1fr_repeat(4,120px)] sm:items-center">
              <Badge variant={result.rank === 1 ? 'primary' : 'default'}>
                {result.rank === 1 && <Trophy className="mr-1 h-3 w-3" />}#{result.rank}
              </Badge>
              <div className="font-semibold text-content">{result.name}</div>
              <div className="text-sm text-content-muted">Comparisons: {result.comparisons}</div>
              <div className="text-sm text-content-muted">Swaps: {result.swaps}</div>
              <div className="text-sm text-content-muted">Steps: {result.steps}</div>
              <div className="text-sm text-content-muted">{formatDuration(result.executionTime)}</div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
