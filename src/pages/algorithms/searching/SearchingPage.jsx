import { Link } from 'react-router-dom';
import { Search, Clock, HardDrive } from 'lucide-react';
import { SEARCHING_ALGO_LIST } from '@/constants/algorithms';
import { ROUTES } from '@/config/routes';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/common/Card';
import { Badge } from '@/components/common/Badge';

export function SearchingPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-content">Searching Algorithms</h1>
        <p className="mt-2 text-content-muted">
          Visualize linear, binary, jump, interpolation, and exponential search
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {SEARCHING_ALGO_LIST.map((algo) => (
          <Link key={algo.id} to={`${ROUTES.SEARCHING}/${algo.id}`}>
            <Card hover className="h-full">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent-muted">
                    <Search className="h-5 w-5 text-accent" aria-hidden="true" />
                  </div>
                  <div>
                    <CardTitle>{algo.name}</CardTitle>
                    <CardDescription className="line-clamp-2">{algo.description}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="info">
                    <Clock className="mr-1 h-3 w-3" />
                    {algo.timeComplexity.average}
                  </Badge>
                  <Badge variant="default">
                    <HardDrive className="mr-1 h-3 w-3" />
                    {algo.spaceComplexity}
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
