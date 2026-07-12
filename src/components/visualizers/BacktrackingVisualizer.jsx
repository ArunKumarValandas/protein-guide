import { cn } from '@/utils/cn';

function cellClass(id, highlights) {
  if (highlights.solved?.includes(id)) return 'border-green-500 bg-green-500/15 text-green-500';
  if (highlights.placed?.includes(id)) return 'border-blue-500 bg-blue-500/15 text-blue-500';
  if (highlights.rejected?.includes(id)) return 'border-red-500 bg-red-500/15 text-red-500';
  if (highlights.current?.includes(id)) return 'border-yellow-500 bg-yellow-500/20 text-yellow-500';
  return 'border-border bg-surface text-content';
}

function BoardView({ visualData, highlights }) {
  const board = visualData.board || [];
  const size = board.length;
  return (
    <div className="mx-auto grid max-w-xl gap-1" style={{ gridTemplateColumns: `repeat(${size}, minmax(0, 1fr))` }}>
      {board.flatMap((row, rowIndex) =>
        row.map((value, colIndex) => {
          const id = `${rowIndex}-${colIndex}`;
          return (
            <div
              key={id}
              className={cn(
                'flex aspect-square min-h-8 items-center justify-center rounded border text-sm font-bold transition-colors sm:text-lg',
                cellClass(id, highlights),
                size === 9 && (colIndex === 2 || colIndex === 5) && 'mr-1',
                size === 9 && (rowIndex === 2 || rowIndex === 5) && 'mb-1',
              )}
            >
              {value}
            </div>
          );
        }),
      )}
    </div>
  );
}

function SequenceView({ visualData, highlights }) {
  return (
    <div className="space-y-5">
      <div className="flex flex-wrap justify-center gap-3">
        {visualData.values.map((value) => (
          <div key={value} className={cn('flex h-14 w-14 items-center justify-center rounded-lg border-2 text-xl font-bold', cellClass(String(value), highlights))}>
            {value}
          </div>
        ))}
      </div>
      <div className="rounded-lg border border-border bg-surface-muted px-4 py-3 text-content">
        <span className="font-medium">Path:</span> {visualData.path.length ? visualData.path.join(' -> ') : 'empty'}
      </div>
      <div className="rounded-lg border border-border bg-surface-muted px-4 py-3 text-sm text-content-muted">
        Results: {visualData.results.length ? visualData.results.join(', ') : 'none yet'}
      </div>
    </div>
  );
}

export function BacktrackingVisualizer({ visualData, highlights = {}, className }) {
  if (!visualData) return null;

  return (
    <div className={cn('py-2', className)}>
      {visualData.type === 'sequence' ? (
        <SequenceView visualData={visualData} highlights={highlights} />
      ) : (
        <BoardView visualData={visualData} highlights={highlights} />
      )}
    </div>
  );
}
