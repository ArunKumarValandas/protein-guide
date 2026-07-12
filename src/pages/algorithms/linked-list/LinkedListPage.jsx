import { Link } from 'react-router-dom';
import { Link as LinkIcon, Clock, HardDrive } from 'lucide-react';
import { LINKED_LIST_OPERATION_LIST, LINKED_LIST_TYPE_LIST } from '@/constants/dataStructures';
import { ROUTES } from '@/config/routes';
import { Badge } from '@/components/common/Badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/common/Card';

export function LinkedListPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-content">Linked Lists</h1>
        <p className="mt-2 text-content-muted">
          Visualize pointer operations for singly, doubly, and circular linked lists.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {LINKED_LIST_TYPE_LIST.map((type) => (
          <Card key={type.id} className="h-full">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent-muted">
                  <LinkIcon className="h-5 w-5 text-accent" aria-hidden="true" />
                </div>
                <div>
                  <CardTitle>{type.name}</CardTitle>
                  <CardDescription>{type.description}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-2">
                <Badge variant="info">
                  <Clock className="mr-1 h-3 w-3" />
                  {type.timeComplexity.average}
                </Badge>
                <Badge>
                  <HardDrive className="mr-1 h-3 w-3" />
                  {type.spaceComplexity}
                </Badge>
              </div>
              <div className="grid gap-2">
                {LINKED_LIST_OPERATION_LIST.map((operation) => (
                  <Link
                    key={operation.id}
                    to={`${ROUTES.LINKED_LIST}/${type.id}/${operation.id}`}
                    className="rounded-lg border border-border px-3 py-2 text-sm font-medium text-content-muted transition-colors hover:border-accent/50 hover:bg-surface-muted hover:text-content"
                  >
                    {operation.name}
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
