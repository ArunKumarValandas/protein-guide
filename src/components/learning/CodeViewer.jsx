import { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { getCodeSnippet } from '@/constants/codeSnippets';
import { Button } from '@/components/common/Button';
import { cn } from '@/utils/cn';

const LANGUAGES = [
  { id: 'javascript', label: 'JavaScript' },
  { id: 'python', label: 'Python' },
  { id: 'java', label: 'Java' },
  { id: 'cpp', label: 'C++' },
];

export function CodeViewer({ algorithmId }) {
  const [language, setLanguage] = useState('javascript');
  const [copied, setCopied] = useState(false);

  const code = getCodeSnippet(algorithmId, language);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex gap-1 rounded-lg border border-border bg-surface-muted p-1" role="tablist">
          {LANGUAGES.map((lang) => (
            <button
              key={lang.id}
              role="tab"
              aria-selected={language === lang.id}
              onClick={() => setLanguage(lang.id)}
              className={cn(
                'rounded-md px-3 py-1.5 text-xs font-medium transition-colors',
                language === lang.id
                  ? 'bg-accent text-white'
                  : 'text-content-muted hover:text-content',
              )}
            >
              {lang.label}
            </button>
          ))}
        </div>
        <Button variant="secondary" size="sm" onClick={handleCopy}>
          {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          {copied ? 'Copied!' : 'Copy'}
        </Button>
      </div>
      <pre className="overflow-x-auto rounded-lg border border-border bg-surface-muted p-4 font-mono text-sm text-content scrollbar-thin">
        <code>{code}</code>
      </pre>
    </div>
  );
}
