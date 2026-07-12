import { cn } from '@/utils/cn';

function cellClass(cellKey, visualData, highlights) {
  if (cellKey === visualData.start) return 'border-green-500 bg-green-500 text-white';
  if (cellKey === visualData.end) return 'border-red-500 bg-red-500 text-white';
  if (visualData.walls?.includes(cellKey)) return 'border-slate-700 bg-slate-700';
  if (highlights.path?.includes(cellKey)) return 'border-yellow-500 bg-yellow-500 text-slate-950';
  if (highlights.current?.includes(cellKey)) return 'border-blue-500 bg-blue-500 text-white';
  if (highlights.frontier?.includes(cellKey)) return 'border-purple-500 bg-purple-500/40';
  if (highlights.visited?.includes(cellKey)) return 'border-accent bg-accent-muted';
  return 'border-border bg-surface';
}

export function PathfindingVisualizer({ visualData, highlights = {}, className }) {
  const rows = visualData?.rows || 0;
  const cols = visualData?.cols || 0;
  const path = visualData?.path || highlights.path || [];

  return (
    <div className={cn('space-y-4', className)}>
      <div
        className="mx-auto grid max-w-3xl gap-1"
        style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
        role="grid"
        aria-label={`${rows} by ${cols} pathfinding grid`}
      >
        {Array.from({ length: rows * cols }, (_, index) => {
          const row = Math.floor(index / cols);
          const col = index % cols;
          const cellKey = `${row}-${col}`;
          return (
            <div
              key={cellKey}
              className={cn(
                'flex aspect-square min-h-6 items-center justify-center rounded border text-[10px] font-bold transition-colors sm:min-h-8',
                cellClass(cellKey, visualData, highlights),
              )}
              role="gridcell"
              aria-label={`Cell ${cellKey}`}
            >
              {cellKey === visualData.start ? 'S' : cellKey === visualData.end ? 'E' : ''}
            </div>
          );
        })}
      </div>

      <div className="flex flex-wrap justify-center gap-2 text-xs text-content-muted">
        <span>Visited: {highlights.visited?.length || 0}</span>
        <span>Frontier: {visualData?.frontier?.length || highlights.frontier?.length || 0}</span>
        <span>Path: {path.length || 0}</span>
      </div>
    </div>
  );
}
