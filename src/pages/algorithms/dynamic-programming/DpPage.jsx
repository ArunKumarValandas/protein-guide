import { Link } from 'react-router-dom';
import { Grid3x3, Clock, HardDrive } from 'lucide-react';
import { DP_ALGO_LIST } from '@/constants/dynamicProgramming';
import { ROUTES } from '@/config/routes';
import { Badge } from '@/components/common/Badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/common/Card';

export function DpPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-content">Dynamic Programming</h1>
        <p className="mt-2 text-content-muted">
          Visualize tabulation, recurrence dependencies, and optimal substructure.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {DP_ALGO_LIST.map((algorithm) => (
          <Link key={algorithm.id} to={`${ROUTES.DP}/${algorithm.id}`}>
            <Card hover className="h-full">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent-muted">
                    <Grid3x3 className="h-5 w-5 text-accent" aria-hidden="true" />
                  </div>
                  <div>
                    <CardTitle>{algorithm.name}</CardTitle>
                    <CardDescription className="line-clamp-2">{algorithm.description}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="info">
                    <Clock className="mr-1 h-3 w-3" />
                    {algorithm.timeComplexity.average}
                  </Badge>
                  <Badge>
                    <HardDrive className="mr-1 h-3 w-3" />
                    {algorithm.spaceComplexity}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
