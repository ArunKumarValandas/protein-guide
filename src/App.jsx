import { useEffect } from 'react';
import { AppRouter } from '@/app/Router';
import { ErrorBoundary } from '@/components/common/ErrorBoundary';
import { useTheme } from '@/hooks/useTheme';
import { initDailyChallenge } from '@/store/useAppStore';

function AppInitializer({ children }) {
  useTheme();

  useEffect(() => {
    initDailyChallenge();
  }, []);

  return children;
}

export default function App() {
  return (
    <ErrorBoundary>
      <AppInitializer>
        <AppRouter />
      </AppInitializer>
    </ErrorBoundary>
  );
}
