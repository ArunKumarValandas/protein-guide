import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  ArrowUpDown,
  Search,
  Link as LinkIcon,
  Layers,
  ListOrdered,
  GitBranch,
  Share2,
  Map,
  Grid3x3,
  Target,
  Undo2,
  GitCompare,
  BarChart3,
  HelpCircle,
  Code2,
  Trophy,
  ChevronDown,
  ChevronRight,
  Settings,
} from 'lucide-react';
import { useState } from 'react';
import { NAV_ITEMS, ROUTES } from '@/config/routes';
import { useAppStore } from '@/store/useAppStore';
import { cn } from '@/utils/cn';

const ICONS = {
  LayoutDashboard,
  ArrowUpDown,
  Search,
  Link: LinkIcon,
  Layers,
  ListOrdered,
  GitBranch,
  Share2,
  Map,
  Grid3x3,
  Target,
  Undo2,
  GitCompare,
  BarChart3,
  HelpCircle,
  Code2,
  Trophy,
  Binary: GitBranch,
};

function NavItem({ item, depth = 0 }) {
  const location = useLocation();
  const [expanded, setExpanded] = useState(true);
  const Icon = ICONS[item.icon];
  const hasChildren = item.children?.length > 0;
  const isActive = item.path
    ? location.pathname === item.path || location.pathname.startsWith(item.path + '/')
    : item.children?.some(
        (c) => location.pathname === c.path || location.pathname.startsWith(c.path + '/'),
      );

  if (hasChildren) {
    return (
      <div>
        <button
          onClick={() => setExpanded(!expanded)}
          className={cn(
            'flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
            isActive ? 'text-accent' : 'text-content-muted hover:bg-surface-muted hover:text-content',
          )}
          aria-expanded={expanded}
        >
          {Icon && <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />}
          <span className="flex-1 text-left">{item.label}</span>
          {expanded ? (
            <ChevronDown className="h-4 w-4" aria-hidden="true" />
          ) : (
            <ChevronRight className="h-4 w-4" aria-hidden="true" />
          )}
        </button>
        {expanded && (
          <div className="ml-4 mt-1 space-y-1 border-l border-border pl-3">
            {item.children.map((child) => (
              <NavItem key={child.path} item={child} depth={depth + 1} />
            ))}
          </div>
        )}
      </div>
    );
  }

  const ChildIcon = ICONS[item.icon];

  return (
    <Link
      to={item.path}
      className={cn(
        'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
        location.pathname === item.path || location.pathname.startsWith(item.path + '/')
          ? 'bg-accent-muted text-accent'
          : 'text-content-muted hover:bg-surface-muted hover:text-content',
      )}
      aria-current={
        location.pathname === item.path || location.pathname.startsWith(item.path + '/')
          ? 'page'
          : undefined
      }
    >
      {ChildIcon && <ChildIcon className="h-4 w-4 shrink-0" aria-hidden="true" />}
      <span>{item.label}</span>
    </Link>
  );
}

export function Sidebar() {
  const sidebarOpen = useAppStore((s) => s.sidebarOpen);
  const level = useAppStore((s) => s.level);
  const xp = useAppStore((s) => s.xp);

  return (
    <>
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 lg:hidden"
          onClick={() => useAppStore.getState().toggleSidebar()}
          aria-hidden="true"
        />
      )}
      <aside
        className={cn(
          'fixed left-0 top-16 z-30 flex h-[calc(100vh-4rem)] w-64 flex-col border-r border-border bg-surface transition-transform lg:static lg:translate-x-0',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full',
        )}
        aria-label="Main navigation"
      >
        <div className="border-b border-border p-4">
          <div className="text-xs font-medium text-content-muted">Level {level}</div>
          <div className="mt-1 h-2 overflow-hidden rounded-full bg-surface-muted">
            <div
              className="h-full rounded-full bg-accent transition-all"
              style={{ width: `${((xp % 500) / 500) * 100}%` }}
              role="progressbar"
              aria-valuenow={xp % 500}
              aria-valuemin={0}
              aria-valuemax={500}
              aria-label="XP progress"
            />
          </div>
          <div className="mt-1 text-xs text-content-muted">{xp} XP</div>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto p-4 scrollbar-thin">
          {NAV_ITEMS.map((item) => (
            <NavItem key={item.label} item={item} />
          ))}
        </nav>

        <div className="border-t border-border p-4">
          <Link
            to={ROUTES.SETTINGS}
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-content-muted hover:bg-surface-muted hover:text-content"
          >
            <Settings className="h-4 w-4" aria-hidden="true" />
            Settings
          </Link>
        </div>
      </aside>
    </>
  );
}
