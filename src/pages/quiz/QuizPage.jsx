import { useMemo, useState } from 'react';
import { CheckCircle, HelpCircle, XCircle } from 'lucide-react';
import { QUIZ_QUESTIONS } from '@/constants/quiz';
import { calculateQuizScore, isPerfectQuizScore } from '@/utils/quiz';
import { useAppStore } from '@/store/useAppStore';
import { Button } from '@/components/common/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/common/Card';
import { Badge } from '@/components/common/Badge';
import { cn } from '@/utils/cn';

export function QuizPage() {
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const unlockAchievement = useAppStore((s) => s.unlockAchievement);
  const addRecentActivity = useAppStore((s) => s.addRecentActivity);

  const score = useMemo(
    () => calculateQuizScore(answers, QUIZ_QUESTIONS),
    [answers],
  );

  const handleSubmit = () => {
    setSubmitted(true);
    addRecentActivity({ type: 'quiz', algorithm: 'quiz', name: `Quiz score ${score.percentage}%` });
    if (isPerfectQuizScore(score)) unlockAchievement('quiz_champion');
  };

  const handleReset = () => {
    setAnswers({});
    setSubmitted(false);
  };

  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-content">Quiz</h1>
        <p className="mt-2 text-content-muted">Test your DSA understanding with focused concept questions.</p>
      </div>

      {submitted && (
        <Card className="border-accent/40 bg-accent-muted/20">
          <CardContent className="flex flex-col gap-3 p-0 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="text-2xl font-bold text-content">{score.percentage}%</div>
              <div className="text-sm text-content-muted">{score.correct} of {score.total} correct</div>
            </div>
            <Badge variant={score.percentage >= 80 ? 'success' : 'warning'}>
              {score.percentage >= 80 ? 'Strong result' : 'Keep practicing'}
            </Badge>
          </CardContent>
        </Card>
      )}

      <div className="space-y-4">
        {QUIZ_QUESTIONS.map((question, index) => {
          const selected = answers[index];
          const isCorrect = selected === question.correctIndex;
          return (
            <Card key={question.id}>
              <CardHeader>
                <CardTitle className="flex items-start gap-2">
                  <HelpCircle className="mt-1 h-5 w-5 shrink-0 text-accent" />
                  {index + 1}. {question.prompt}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid gap-2">
                  {question.options.map((option, optionIndex) => {
                    const active = selected === optionIndex;
                    const correct = submitted && optionIndex === question.correctIndex;
                    const wrong = submitted && active && !correct;
                    return (
                      <button
                        key={option}
                        onClick={() => !submitted && setAnswers((current) => ({ ...current, [index]: optionIndex }))}
                        className={cn(
                          'flex items-center justify-between rounded-lg border px-4 py-3 text-left text-sm transition-colors',
                          active ? 'border-accent bg-accent-muted text-accent' : 'border-border bg-surface text-content-muted hover:text-content',
                          correct && 'border-green-500 bg-green-500/10 text-green-500',
                          wrong && 'border-red-500 bg-red-500/10 text-red-500',
                        )}
                      >
                        {option}
                        {correct && <CheckCircle className="h-4 w-4" />}
                        {wrong && <XCircle className="h-4 w-4" />}
                      </button>
                    );
                  })}
                </div>
                {submitted && (
                  <p className={cn('text-sm', isCorrect ? 'text-green-500' : 'text-content-muted')}>
                    {question.explanation}
                  </p>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="flex gap-3">
        <Button onClick={handleSubmit} disabled={Object.keys(answers).length !== QUIZ_QUESTIONS.length || submitted}>
          Submit Quiz
        </Button>
        <Button variant="secondary" onClick={handleReset}>Reset</Button>
      </div>
    </div>
  );
}
