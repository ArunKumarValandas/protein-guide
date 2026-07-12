import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/utils/cn';

export function ArrayVisualizer({ array, highlights = {}, className, barMaxHeight = 280 }) {
  const maxValue = useMemo(() => Math.max(...array, 1), [array]);

  const getBarColor = (index) => {
    const { comparing, swapping, sorted, current, pivot, key, shifting, merging, placing } = highlights;

    if (highlights.found?.includes(index)) return 'bg-green-500';
    if (sorted?.includes(index)) return 'bg-green-500';
    if (swapping?.includes(index)) return 'bg-red-500';
    if (comparing?.includes(index)) return 'bg-yellow-500';
    if (pivot === index) return 'bg-purple-500';
    if (current?.includes(index)) return 'bg-blue-500';
    if (key === index) return 'bg-orange-500';
    if (shifting?.includes(index)) return 'bg-pink-500';
    if (merging?.includes(index)) return 'bg-cyan-500';
    if (placing?.includes(index)) return 'bg-teal-500';
    return 'bg-accent opacity-80';
  };

  return (
    <div
      className={cn('flex items-end justify-center gap-1 sm:gap-2', className)}
      role="img"
      aria-label={`Array visualization with ${array.length} elements`}
    >
      {array.map((value, index) => {
        const height = (value / maxValue) * barMaxHeight;
        return (
          <div key={index} className="flex flex-col items-center gap-1">
            <motion.div
              className={cn('w-6 rounded-t-md sm:w-8', getBarColor(index))}
              style={{ height: Math.max(height, 4) }}
              initial={false}
              animate={{ height: Math.max(height, 4) }}
              transition={{ duration: 0.15 }}
              aria-label={`Element ${index}: ${value}`}
            />
            {array.length <= 30 && (
              <span className="text-[10px] text-content-muted sm:text-xs">{value}</span>
            )}
          </div>
        );
      })}
    </div>
  );
}
