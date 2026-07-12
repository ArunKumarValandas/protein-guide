import { cn } from '@/utils/cn';

function itemClass(itemId, highlights) {
  if (highlights.selected?.includes(itemId)) return 'border-green-500 bg-green-500/15 text-green-500';
  if (highlights.rejected?.includes(itemId)) return 'border-red-500 bg-red-500/15 text-red-500';
  if (highlights.current?.includes(itemId)) return 'border-yellow-500 bg-yellow-500/20 text-yellow-500';
  return 'border-border bg-surface text-content';
}

function describe(item) {
  if (item.start !== undefined) return `${item.start}-${item.finish}`;
  if (item.ratio !== undefined) return `w${item.weight} v${item.value} r${item.ratio.toFixed(1)}`;
  if (item.frequency !== undefined) return `freq ${item.frequency}`;
  return '';
}

export function GreedyVisualizer({ visualData, highlights = {}, className }) {
  const items = visualData?.items || [];

  return (
    <div className={cn('space-y-4', className)}>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <div
            key={item.id}
            className={cn('rounded-lg border-2 p-4 transition-colors', itemClass(item.id, highlights))}
          >
            <div className="flex items-center justify-between gap-2">
              <span className="text-lg font-bold">{item.label}</span>
              <span className="text-xs text-content-muted">{describe(item)}</span>
            </div>
            {item.taken !== undefined && (
              <div className="mt-3 h-2 overflow-hidden rounded-full bg-surface-muted">
                <div className="h-full rounded-full bg-accent" style={{ width: `${item.taken * 100}%` }} />
              </div>
            )}
            {item.children && (
              <div className="mt-2 text-xs text-content-muted">merged: {item.children.join(' + ')}</div>
            )}
          </div>
        ))}
      </div>

      <div className="rounded-lg border border-border bg-surface-muted px-4 py-3 text-sm text-content">
        <span className="font-medium">Total:</span> {visualData?.total ?? 0}
        {visualData?.remaining !== undefined && <span className="ml-4">Remaining capacity: {visualData.remaining}</span>}
      </div>
    </div>
  );
}
