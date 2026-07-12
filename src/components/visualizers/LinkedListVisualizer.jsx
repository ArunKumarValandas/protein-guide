import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, RotateCw } from 'lucide-react';
import { cn } from '@/utils/cn';

function getNodeClasses(nodeId, highlights) {
  if (highlights.found?.includes(nodeId)) return 'border-green-500 bg-green-500/15 text-green-500';
  if (highlights.deleting?.includes(nodeId)) return 'border-red-500 bg-red-500/15 text-red-500';
  if (highlights.inserted?.includes(nodeId)) return 'border-blue-500 bg-blue-500/15 text-blue-500';
  if (highlights.current?.includes(nodeId)) return 'border-yellow-500 bg-yellow-500/15 text-yellow-500';
  if (highlights.rewired?.includes(nodeId)) return 'border-purple-500 bg-purple-500/15 text-purple-500';
  if (highlights.visited?.includes(nodeId)) return 'border-accent bg-accent-muted text-accent';
  return 'border-border bg-surface text-content';
}

function Pointer({ doubly, active }) {
  return (
    <div
      className={cn(
        'flex h-20 w-12 shrink-0 flex-col items-center justify-center gap-2 text-content-muted sm:w-16',
        active && 'text-accent',
      )}
      aria-hidden="true"
    >
      <ArrowRight className="h-5 w-5" />
      {doubly && <ArrowLeft className="h-4 w-4 opacity-70" />}
    </div>
  );
}

export function LinkedListVisualizer({ visualData, highlights = {}, className }) {
  const nodes = visualData?.nodes || [];
  const doubly = visualData?.doubly;
  const circular = visualData?.circular;

  if (nodes.length === 0) {
    return (
      <div className={cn('flex min-h-[260px] items-center justify-center text-content-muted', className)}>
        Empty linked list
      </div>
    );
  }

  return (
    <div
      className={cn('overflow-x-auto py-4 scrollbar-thin', className)}
      role="img"
      aria-label={`${visualData.type} linked list visualization with ${nodes.length} nodes`}
    >
      <div className="min-w-max">
        <div className="flex items-center px-2">
          {nodes.map((node, index) => {
            const isHead = node.id === visualData.headId;
            const isTail = node.id === visualData.tailId;
            const nextIsActive = highlights.rewired?.includes(node.id) || highlights.current?.includes(node.id);

            return (
              <div key={node.id} className="flex items-center">
                <div className="flex flex-col items-center gap-2">
                  <div className="h-5 text-xs font-medium text-content-muted">
                    {isHead ? 'HEAD' : isTail ? 'TAIL' : ''}
                  </div>
                  <motion.div
                    layout
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={cn(
                      'flex h-20 w-24 flex-col items-center justify-center rounded-lg border-2 shadow-sm transition-colors sm:w-28',
                      getNodeClasses(node.id, highlights),
                    )}
                  >
                    <span className="text-xs uppercase tracking-wide opacity-70">value</span>
                    <span className="text-2xl font-bold">{node.value}</span>
                  </motion.div>
                  <div className="h-5 text-xs text-content-muted">
                    {doubly && node.prev ? `prev: ${node.prev.replace('node-', '')}` : node.next ? `next` : 'null'}
                  </div>
                </div>
                {index < nodes.length - 1 && <Pointer doubly={doubly} active={nextIsActive} />}
              </div>
            );
          })}
        </div>

        {circular && nodes.length > 1 && (
          <div className="mt-5 flex items-center justify-center gap-2 text-sm text-accent">
            <RotateCw className="h-4 w-4" aria-hidden="true" />
            <span>Tail points back to head</span>
          </div>
        )}
      </div>
    </div>
  );
}
