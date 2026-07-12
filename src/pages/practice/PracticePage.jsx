import { useState } from 'react';
import { CheckCircle, Code2, Lightbulb } from 'lucide-react';
import { PRACTICE_PROBLEMS } from '@/constants/practice';
import { useAppStore } from '@/store/useAppStore';
import { Button } from '@/components/common/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/common/Card';
import { Badge } from '@/components/common/Badge';

const difficultyVariant = {
  Easy: 'success',
  Medium: 'warning',
  Hard: 'error',
};

export function PracticePage() {
  const [expanded, setExpanded] = useState(PRACTICE_PROBLEMS[0].id);
  const progress = useAppStore((s) => s.progress);
  const updateProgress = useAppStore((s) => s.updateProgress);
  const addRecentActivity = useAppStore((s) => s.addRecentActivity);

  const completed = PRACTICE_PROBLEMS.filter((problem) => progress[`practice-${problem.id}`]?.completed);

  const markComplete = (problem) => {
    updateProgress(`practice-${problem.id}`, { completed: true });
    addRecentActivity({ type: 'practice', algorithm: problem.id, name: problem.title });
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-content">Practice</h1>
          <p className="mt-2 text-content-muted">Solve interview-style DSA problems by pattern.</p>
        </div>
        <Card className="p-4">
          <CardContent className="p-0 text-sm">
            <span className="font-semibold text-content">{completed.length}</span>
            <span className="text-content-muted"> / {PRACTICE_PROBLEMS.length} completed</span>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4">
        {PRACTICE_PROBLEMS.map((problem) => {
          const isOpen = expanded === problem.id;
          const isDone = progress[`practice-${problem.id}`]?.completed;
          return (
            <Card key={problem.id} className={isDone ? 'border-green-500/40 bg-green-500/5' : ''}>
              <CardHeader>
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Code2 className="h-5 w-5 text-accent" />
                      {problem.title}
                      {isDone && <CheckCircle className="h-5 w-5 text-green-500" />}
                    </CardTitle>
                    <CardDescription>{problem.prompt}</CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Badge variant={difficultyVariant[problem.difficulty]}>{problem.difficulty}</Badge>
                    <Badge>{problem.category}</Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {isOpen && (
                  <>
                    <div className="rounded-lg border border-border bg-surface-muted p-4 text-sm text-content-muted">
                      <div className="mb-1 flex items-center gap-2 font-medium text-content">
                        <Lightbulb className="h-4 w-4 text-accent" />
                        Hint
                      </div>
                      {problem.hint}
                    </div>
                    <div className="rounded-lg border border-border bg-surface-muted p-4 text-sm text-content-muted">
                      <div className="mb-1 font-medium text-content">Solution Approach</div>
                      {problem.solution}
                    </div>
                  </>
                )}
                <div className="flex flex-wrap gap-2">
                  <Button variant="secondary" onClick={() => setExpanded(isOpen ? '' : problem.id)}>
                    {isOpen ? 'Hide Details' : 'Show Details'}
                  </Button>
                  <Button onClick={() => markComplete(problem)} disabled={isDone}>
                    {isDone ? 'Completed' : 'Mark Complete'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
