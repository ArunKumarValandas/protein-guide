import { cn } from '@/utils/cn';

function cellClass(id, highlights) {
  if (highlights.solved?.includes(id)) return 'border-green-500 bg-green-500/15 text-green-500';
  if (highlights.current?.includes(id)) return 'border-yellow-500 bg-yellow-500/20 text-yellow-500';
  if (highlights.dependencies?.includes(id)) return 'border-blue-500 bg-blue-500/15 text-blue-500';
  return 'border-border bg-surface text-content';
}

export function DpTableVisualizer({ visualData, highlights = {}, className }) {
  const table = visualData?.table || [];
  const rowLabels = visualData?.rowLabels || table.map((_, i) => String(i));
  const colLabels = visualData?.colLabels || table[0]?.map((_, i) => String(i)) || [];

  return (
    <div className={cn('space-y-4 overflow-auto scrollbar-thin', className)}>
      <div className="inline-grid gap-1" style={{ gridTemplateColumns: `repeat(${colLabels.length + 1}, minmax(48px, 1fr))` }}>
        <div />
        {colLabels.map((label, index) => (
          <div key={`header-${index}`} className="flex h-9 items-center justify-center rounded bg-surface-muted px-2 text-xs font-semibold text-content-muted">
            {label}
          </div>
        ))}
        {table.map((row, rowIndex) => [
            <div key={`row-${rowIndex}`} className="flex h-11 items-center justify-center rounded bg-surface-muted px-2 text-xs font-semibold text-content-muted">
              {rowLabels[rowIndex]}
            </div>,
            ...row.map((value, colIndex) => {
              const id = `${rowIndex}-${colIndex}`;
              return (
                <div key={id} className={cn('flex h-11 items-center justify-center rounded border text-sm font-semibold transition-colors', cellClass(id, highlights))}>
                  {value}
                </div>
              );
            }),
          ])}
      </div>

      {visualData?.result !== undefined && (
        <div className="rounded-lg border border-border bg-surface-muted px-4 py-3 text-sm text-content">
          <span className="font-medium">Result:</span> {visualData.result}
        </div>
      )}
    </div>
  );
}
