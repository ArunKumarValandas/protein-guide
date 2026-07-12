import { BookOpen, Code, Eye } from 'lucide-react';
import { cn } from '@/utils/cn';

const TABS = [
  { id: 'visualize', label: 'Visualize', icon: Eye },
  { id: 'learn', label: 'Learn', icon: BookOpen },
  { id: 'code', label: 'Code', icon: Code },
];

export function VisualizerTabs({ activeTab, onTabChange }) {
  return (
    <div className="flex gap-2 border-b border-border" role="tablist">
      {TABS.map((tab) => (
        <button
          key={tab.id}
          role="tab"
          aria-selected={activeTab === tab.id}
          onClick={() => onTabChange(tab.id)}
          className={cn(
            'flex items-center gap-2 border-b-2 px-4 py-2 text-sm font-medium transition-colors',
            activeTab === tab.id
              ? 'border-accent text-accent'
              : 'border-transparent text-content-muted hover:text-content',
          )}
        >
          <tab.icon className="h-4 w-4" />
          {tab.label}
        </button>
      ))}
    </div>
  );
}
