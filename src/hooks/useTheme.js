import { useEffect } from 'react';
import { useAppStore } from '@/store/useAppStore';
import { applyTheme } from '@/styles/themes';

export function useTheme() {
  const theme = useAppStore((s) => s.theme);
  const setTheme = useAppStore((s) => s.setTheme);
  const highContrast = useAppStore((s) => s.highContrast);
  const reducedMotion = useAppStore((s) => s.reducedMotion);

  useEffect(() => {
    applyTheme(theme);
    document.documentElement.toggleAttribute('data-high-contrast', highContrast);
    document.documentElement.toggleAttribute('data-reduced-motion', reducedMotion);
  }, [theme, highContrast, reducedMotion]);

  return { theme, setTheme };
}
