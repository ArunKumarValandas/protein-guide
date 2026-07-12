import { Badge } from '@/components/common/Badge';

export function ComplexityBadge({ algorithm }) {
  if (!algorithm) return null;

  return (
    <div className="flex flex-wrap gap-2">
      <Badge variant="info">Time: {algorithm.timeComplexity?.average || algorithm.timeComplexity}</Badge>
      <Badge variant="default">Space: {algorithm.spaceComplexity}</Badge>
      {algorithm.stable !== undefined && (
        <Badge variant={algorithm.stable ? 'success' : 'warning'}>
          {algorithm.stable ? 'Stable' : 'Unstable'}
        </Badge>
      )}
      {algorithm.inPlace !== undefined && (
        <Badge variant={algorithm.inPlace ? 'success' : 'warning'}>
          {algorithm.inPlace ? 'In-place' : 'Not in-place'}
        </Badge>
      )}
    </div>
  );
}
