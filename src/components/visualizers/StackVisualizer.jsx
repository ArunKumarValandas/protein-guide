import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import { cn } from '@/utils/cn';

function itemClass(itemId, highlights) {
  if (highlights.found?.includes(itemId)) return 'border-green-500 bg-green-500/15 text-green-500';
  if (highlights.popping?.includes(itemId)) return 'border-red-500 bg-red-500/15 text-red-500';
  if (highlights.pushed?.includes(itemId)) return 'border-blue-500 bg-blue-500/15 text-blue-500';
  if (highlights.current?.includes(itemId)) return 'border-yellow-500 bg-yellow-500/15 text-yellow-500';
  if (highlights.top?.includes(itemId)) return 'border-accent bg-accent-muted text-accent';
  return 'border-border bg-surface text-content';
}

export function StackVisualizer({ visualData, highlights = {}, className }) {
  const items = visualData?.items || [];
  const topFirst = [...items].reverse();

  return (
    <div
      className={cn('flex min-h-[280px] items-center justify-center', className)}
      role="img"
      aria-label={`Stack visualization with ${items.length} items`}
    >
      <div className="flex w-full max-w-sm flex-col items-center">
        <div className="mb-3 flex items-center gap-2 text-sm font-medium text-accent">
          <span>TOP</span>
          <ArrowDown className="h-4 w-4" aria-hidden="true" />
        </div>
        <div className="flex w-full flex-col rounded-lg border-2 border-dashed border-border p-3">
          {topFirst.length === 0 ? (
            <div className="flex h-40 items-center justify-center text-content-muted">Empty stack</div>
          ) : (
            topFirst.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                className={cn(
                  'mb-2 flex h-12 items-center justify-center rounded-lg border-2 text-lg font-semibold shadow-sm last:mb-0',
                  itemClass(item.id, highlights),
                )}
              >
                {item.value}
              </motion.div>
            ))
          )}
        </div>
        <div className="mt-3 text-xs text-content-muted">Bottom</div>
      </div>
    </div>
  );
}
