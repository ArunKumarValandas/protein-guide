import { motion } from 'framer-motion';
import { cn } from '@/utils/cn';

function nodeColors(nodeId, highlights) {
  if (highlights.current?.includes(nodeId)) return { fill: 'var(--color-warning)', stroke: 'var(--color-warning)', text: '#111827' };
  if (highlights.inspecting?.includes(nodeId)) return { fill: 'var(--color-info)', stroke: 'var(--color-info)', text: '#ffffff' };
  if (highlights.visited?.includes(nodeId)) return { fill: 'var(--color-accent-muted)', stroke: 'var(--color-accent)', text: 'var(--color-accent)' };
  return { fill: 'var(--color-surface)', stroke: 'var(--color-border)', text: 'var(--color-text)' };
}

function edgeColor(edgeId, highlights) {
  if (highlights.rejectedEdges?.includes(edgeId)) return 'var(--color-error)';
  if (highlights.mstEdges?.includes(edgeId)) return 'var(--color-success)';
  if (highlights.activeEdges?.includes(edgeId)) return 'var(--color-warning)';
  return 'var(--color-border)';
}

export function GraphVisualizer({ visualData, highlights = {}, className }) {
  const nodes = visualData?.nodes || [];
  const edges = visualData?.edges || [];
  const nodeMap = new Map(nodes.map((node) => [node.id, node]));
  const distances = visualData?.distances || {};
  const order = visualData?.order || [];
  const queue = visualData?.queue || [];
  const stack = visualData?.stack || [];

  return (
    <div className={cn('space-y-4 overflow-x-auto scrollbar-thin', className)} role="img" aria-label={`Graph visualization with ${nodes.length} nodes`}>
      <svg viewBox="0 0 730 300" className="min-h-[300px] min-w-[730px]">
        {edges.map((edge) => {
          const from = nodeMap.get(edge.from);
          const to = nodeMap.get(edge.to);
          if (!from || !to) return null;
          const midX = (from.x + to.x) / 2;
          const midY = (from.y + to.y) / 2;
          return (
            <g key={edge.id}>
              <motion.line
                x1={from.x}
                y1={from.y}
                x2={to.x}
                y2={to.y}
                stroke={edgeColor(edge.id, highlights)}
                strokeWidth={highlights.activeEdges?.includes(edge.id) || highlights.mstEdges?.includes(edge.id) ? 4 : 2}
                initial={false}
                animate={{ opacity: highlights.rejectedEdges?.includes(edge.id) ? 0.35 : 1 }}
              />
              <rect x={midX - 11} y={midY - 10} width="22" height="20" rx="6" fill="var(--color-surface-elevated)" />
              <text x={midX} y={midY + 4} textAnchor="middle" className="text-xs font-semibold" fill="var(--color-text-muted)">
                {edge.weight}
              </text>
            </g>
          );
        })}

        {nodes.map((node) => {
          const colors = nodeColors(node.id, highlights);
          return (
            <g key={node.id}>
              <motion.circle
                cx={node.x}
                cy={node.y}
                r="25"
                fill={colors.fill}
                stroke={colors.stroke}
                strokeWidth="3"
                initial={false}
                animate={{ scale: highlights.current?.includes(node.id) ? 1.12 : 1 }}
                style={{ transformOrigin: `${node.x}px ${node.y}px` }}
              />
              <text x={node.x} y={node.y + 5} textAnchor="middle" className="select-none text-sm font-bold" fill={colors.text}>
                {node.label}
              </text>
              {Number.isFinite(distances[node.id]) && (
                <text x={node.x} y={node.y + 42} textAnchor="middle" className="text-[11px] font-medium" fill="var(--color-text-muted)">
                  d={distances[node.id]}
                </text>
              )}
            </g>
          );
        })}
      </svg>

      <div className="grid gap-3 text-sm sm:grid-cols-3">
        <div className="rounded-lg border border-border bg-surface-muted px-3 py-2 text-content">
          <span className="font-medium">Order:</span> {order.length ? order.join(' -> ') : 'None yet'}
        </div>
        <div className="rounded-lg border border-border bg-surface-muted px-3 py-2 text-content">
          <span className="font-medium">Queue:</span> {queue.length ? queue.join(', ') : 'empty'}
        </div>
        <div className="rounded-lg border border-border bg-surface-muted px-3 py-2 text-content">
          <span className="font-medium">Stack:</span> {stack.length ? stack.join(', ') : 'empty'}
        </div>
      </div>
    </div>
  );
}
