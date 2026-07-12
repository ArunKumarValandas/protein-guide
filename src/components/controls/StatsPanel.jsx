import { Clock, ArrowLeftRight, GitCompare, Footprints } from 'lucide-react';
import { Card, CardContent } from '@/components/common/Card';
import { formatDuration } from '@/utils/format';

export function StatsPanel({ comparisons, swaps, steps, executionTime, message, labels = {} }) {
  const stats = [
    { icon: GitCompare, label: labels.comparisons || 'Comparisons', value: comparisons },
    { icon: ArrowLeftRight, label: labels.swaps || 'Swaps', value: swaps },
    { icon: Footprints, label: labels.steps || 'Steps', value: steps },
    { icon: Clock, label: labels.executionTime || 'Time', value: formatDuration(executionTime) },
  ];

  return (
    <div className="space-y-4">
      {message && (
        <div className="rounded-lg border border-border bg-surface-muted px-4 py-2 text-sm text-content">
          {message}
        </div>
      )}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.label} className="p-4">
            <CardContent className="flex items-center gap-3 p-0">
              <stat.icon className="h-5 w-5 text-accent" aria-hidden="true" />
              <div>
                <div className="text-xs text-content-muted">{stat.label}</div>
                <div className="text-lg font-semibold text-content">{stat.value}</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
