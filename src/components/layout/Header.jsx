import { Link } from 'react-router-dom';
import { LogOut, Menu, X, BarChart3 } from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';
import { ROUTES } from '@/config/routes';
import { ThemeSelector } from './ThemeSelector';
import { Button } from '@/components/common/Button';

export function Header({ showNav = true }) {
  const sidebarOpen = useAppStore((s) => s.sidebarOpen);
  const toggleSidebar = useAppStore((s) => s.toggleSidebar);
  const currentUser = useAppStore((s) => s.currentUser);
  const logout = useAppStore((s) => s.logout);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-surface/80 backdrop-blur-xl">
      <div className="flex h-16 items-center justify-between px-4 lg:px-6">
        <div className="flex items-center gap-4">
          {showNav && (
            <button
              onClick={toggleSidebar}
              className="btn-icon lg:hidden"
              aria-label={sidebarOpen ? 'Close menu' : 'Open menu'}
            >
              {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          )}
          <Link to={ROUTES.HOME} className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent">
              <BarChart3 className="h-5 w-5 text-white" aria-hidden="true" />
            </div>
            <span className="font-display text-xl font-bold text-content">
              Algo<span className="text-accent">Vision</span> Pro
            </span>
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden md:block">
            <ThemeSelector compact />
          </div>
          {currentUser ? (
            <>
              <span className="hidden text-sm text-content-muted sm:inline">{currentUser.name}</span>
              <Button size="sm" variant="secondary" onClick={logout}>
                <LogOut className="h-4 w-4" />
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link to={ROUTES.LOGIN}>
                <Button variant="secondary" size="sm">Login</Button>
              </Link>
              <Link to={ROUTES.DASHBOARD}>
                <Button size="sm">Launch App</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
