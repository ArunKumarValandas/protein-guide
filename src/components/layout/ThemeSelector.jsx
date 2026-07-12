import { Sun, Moon, Terminal, Zap, Cpu } from 'lucide-react';
import { THEMES } from '@/styles/themes';
import { useTheme } from '@/hooks/useTheme';
import { cn } from '@/utils/cn';

const ICONS = { Sun, Moon, Terminal, Zap, Cpu };

export function ThemeSelector({ compact = false }) {
  const { theme, setTheme } = useTheme();

  if (compact) {
    return (
      <select
        value={theme}
        onChange={(e) => setTheme(e.target.value)}
        className="input w-auto py-1.5 text-sm"
        aria-label="Select theme"
      >
        {Object.values(THEMES).map((t) => (
          <option key={t.id} value={t.id}>
            {t.name}
          </option>
        ))}
      </select>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5" role="radiogroup" aria-label="Theme selection">
      {Object.values(THEMES).map((t) => {
        const Icon = ICONS[t.icon];
        const isActive = theme === t.id;

        return (
          <button
            key={t.id}
            role="radio"
            aria-checked={isActive}
            onClick={() => setTheme(t.id)}
            className={cn(
              'flex flex-col items-center gap-2 rounded-lg border p-3 transition-all',
              isActive
                ? 'border-accent bg-accent-muted text-accent'
                : 'border-border bg-surface-elevated text-content-muted hover:border-accent/50',
            )}
          >
            <Icon className="h-5 w-5" aria-hidden="true" />
            <span className="text-xs font-medium">{t.name}</span>
          </button>
        );
      })}
    </div>
  );
}
