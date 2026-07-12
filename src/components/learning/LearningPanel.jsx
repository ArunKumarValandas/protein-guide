import { BookOpen, CheckCircle, XCircle, Lightbulb, Code, HelpCircle, AlertTriangle } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/common/Card';
import { ComplexityBadge } from '@/components/controls/ComplexityBadge';

export function LearningPanel({ algorithm }) {
  if (!algorithm) return null;

  const sections = [
    { icon: BookOpen, title: 'Definition', content: algorithm.description },
    { icon: Lightbulb, title: 'How It Works', content: algorithm.working },
    { icon: Code, title: 'Dry Run', content: algorithm.dryRun },
    { icon: CheckCircle, title: 'Advantages', content: algorithm.advantages, list: true },
    { icon: XCircle, title: 'Disadvantages', content: algorithm.disadvantages, list: true },
    { icon: Lightbulb, title: 'Applications', content: algorithm.applications, list: true },
    { icon: HelpCircle, title: 'Interview Questions', content: algorithm.interviewQuestions, list: true },
    { icon: AlertTriangle, title: 'Common Mistakes', content: algorithm.commonMistakes, list: true },
  ].filter((section) => section.content && (!Array.isArray(section.content) || section.content.length > 0));

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-content">{algorithm.name}</h2>
        <div className="mt-3">
          <ComplexityBadge algorithm={algorithm} />
        </div>
      </div>

      {sections.map((section) => (
        <Card key={section.title}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <section.icon className="h-5 w-5 text-accent" aria-hidden="true" />
              {section.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {section.list ? (
              <ul className="list-inside list-disc space-y-1 text-sm text-content-muted">
                {section.content.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-content-muted">{section.content}</p>
            )}
          </CardContent>
        </Card>
      ))}

      {algorithm.pseudocode && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Code className="h-5 w-5 text-accent" aria-hidden="true" />
              Pseudocode
            </CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="overflow-x-auto rounded-lg bg-surface-muted p-4 font-mono text-sm text-content">
              {algorithm.pseudocode}
            </pre>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
