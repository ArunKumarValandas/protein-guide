import { motion } from 'framer-motion';
import { ArrowRight, RotateCw } from 'lucide-react';
import { cn } from '@/utils/cn';

function itemClass(itemId, highlights) {
  if (highlights.removing?.includes(itemId)) return 'border-red-500 bg-red-500/15 text-red-500';
  if (highlights.inserted?.includes(itemId)) return 'border-blue-500 bg-blue-500/15 text-blue-500';
  if (highlights.current?.includes(itemId)) return 'border-yellow-500 bg-yellow-500/15 text-yellow-500';
  if (highlights.front?.includes(itemId)) return 'border-green-500 bg-green-500/15 text-green-500';
  if (highlights.rear?.includes(itemId)) return 'border-accent bg-accent-muted text-accent';
  return 'border-border bg-surface text-content';
}

export function QueueVisualizer({ visualData, highlights = {}, className }) {
  const items = visualData?.items || [];
  const slots =
    visualData?.circular
      ? Array.from({ length: visualData.capacity }, (_, index) => items.find((item) => item.slot === index) || null)
      : items;

  return (
    <div
      className={cn('flex min-h-[280px] flex-col items-center justify-center overflow-x-auto py-4 scrollbar-thin', className)}
      role="img"
      aria-label={`${visualData?.type || 'queue'} visualization with ${items.length} items`}
    >
      <div className="mb-4 flex w-full min-w-max items-center justify-between gap-8 px-4 text-sm font-medium text-content-muted">
        <span>FRONT</span>
        <div className="flex items-center gap-2 text-accent">
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
          <span>{visualData?.priority ? 'Priority order' : 'FIFO flow'}</span>
        </div>
        <span>REAR</span>
      </div>

      <div className="flex min-w-max items-center gap-3 px-4">
        {slots.length === 0 ? (
          <div className="flex h-24 w-72 items-center justify-center rounded-lg border border-dashed border-border text-content-muted">
            Empty queue
          </div>
        ) : (
          slots.map((item, index) => (
            <motion.div
              key={item?.id || `empty-${index}`}
              layout
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className={cn(
                'flex h-24 w-24 shrink-0 flex-col items-center justify-center rounded-lg border-2 shadow-sm',
                item ? itemClass(item.id, highlights) : 'border-dashed border-border bg-surface-muted text-content-muted',
              )}
            >
              {item ? (
                <>
                  <span className="text-xl font-bold">{item.value}</span>
                  {visualData.priority && <span className="mt-1 text-[10px]">priority {item.priority}</span>}
                  {visualData.circular && <span className="mt-1 text-[10px]">slot {item.slot}</span>}
                </>
              ) : (
                <span className="text-xs">empty</span>
              )}
            </motion.div>
          ))
        )}
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-center gap-3 text-xs text-content-muted">
        {visualData?.circular && (
          <span className="flex items-center gap-1 text-accent">
            <RotateCw className="h-3 w-3" aria-hidden="true" />
            wraps at capacity {visualData.capacity}
          </span>
        )}
        {visualData?.deque && <span>Deque supports both ends; this view shows queue-style front/rear operations</span>}
        {visualData?.priority && <span>Lowest numeric priority is dequeued first</span>}
      </div>
    </div>
  );
}
