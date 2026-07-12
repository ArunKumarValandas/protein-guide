import { motion } from 'framer-motion';
import { cn } from '@/utils/cn';

function nodeColors(nodeId, highlights) {
  if (highlights.found?.includes(nodeId)) return { fill: 'var(--color-success)', stroke: 'var(--color-success)', text: '#ffffff' };
  if (highlights.inserted?.includes(nodeId)) return { fill: 'var(--color-info)', stroke: 'var(--color-info)', text: '#ffffff' };
  if (highlights.current?.includes(nodeId)) return { fill: 'var(--color-warning)', stroke: 'var(--color-warning)', text: '#111827' };
  if (highlights.visited?.includes(nodeId)) return { fill: 'var(--color-accent-muted)', stroke: 'var(--color-accent)', text: 'var(--color-accent)' };
  return { fill: 'var(--color-surface)', stroke: 'var(--color-border)', text: 'var(--color-text)' };
}

export function TreeVisualizer({ visualData, highlights = {}, className }) {
  const nodes = visualData?.nodes || [];
  const edges = visualData?.edges || [];
  const nodeMap = new Map(nodes.map((node) => [node.id, node]));
  const height = Math.max(320, ...nodes.map((node) => node.y + 70), 320);

  if (nodes.length === 0) {
    return (
      <div className={cn('flex min-h-[280px] items-center justify-center text-content-muted', className)}>
        Empty tree
      </div>
    );
  }

  return (
    <div
      className={cn('overflow-x-auto scrollbar-thin', className)}
      role="img"
      aria-label={`Tree visualization with ${nodes.length} nodes`}
    >
      <svg viewBox={`0 0 720 ${height}`} className="min-h-[300px] min-w-[720px]">
        {edges.map((edge) => {
          const from = nodeMap.get(edge.from);
          const to = nodeMap.get(edge.to);
          if (!from || !to) return null;
          return (
            <motion.line
              key={`${edge.from}-${edge.to}`}
              x1={from.x}
              y1={from.y}
              x2={to.x}
              y2={to.y}
              stroke="var(--color-border)"
              strokeWidth="2"
              initial={false}
              animate={{ opacity: highlights.visited?.includes(to.id) ? 1 : 0.55 }}
            />
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
              <text
                x={node.x}
                y={node.y + 5}
                textAnchor="middle"
                className="select-none text-sm font-bold"
                fill={colors.text}
              >
                {node.value}
              </text>
            </g>
          );
        })}
      </svg>

      {visualData?.traversal?.length > 0 && (
        <div className="mt-3 rounded-lg border border-border bg-surface-muted px-4 py-3 text-sm text-content">
          <span className="font-medium">Traversal:</span> {visualData.traversal.join(' -> ')}
        </div>
      )}
    </div>
  );
}
