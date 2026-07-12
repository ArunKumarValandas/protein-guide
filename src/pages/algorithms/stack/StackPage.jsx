import { Link } from 'react-router-dom';
import { Layers, Clock, HardDrive } from 'lucide-react';
import { STACK_OPERATION_LIST } from '@/constants/dataStructures';
import { ROUTES } from '@/config/routes';
import { Badge } from '@/components/common/Badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/common/Card';

export function StackPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-content">Stack</h1>
        <p className="mt-2 text-content-muted">
          Visualize LIFO operations with push, pop, peek, and clear animations.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {STACK_OPERATION_LIST.map((operation) => (
          <Link key={operation.id} to={`${ROUTES.STACK}/${operation.id}`}>
            <Card hover className="h-full">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent-muted">
                    <Layers className="h-5 w-5 text-accent" aria-hidden="true" />
                  </div>
                  <div>
                    <CardTitle>{operation.name}</CardTitle>
                    <CardDescription>{operation.description}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="info">
                    <Clock className="mr-1 h-3 w-3" />
                    {operation.timeComplexity.average}
                  </Badge>
                  <Badge>
                    <HardDrive className="mr-1 h-3 w-3" />
                    {operation.spaceComplexity}
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
