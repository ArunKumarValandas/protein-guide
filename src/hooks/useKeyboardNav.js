import { useEffect } from 'react';

export function useKeyboardNav(handlers) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

      switch (e.key) {
        case ' ':
          e.preventDefault();
          handlers.onPlayPause?.();
          break;
        case 'ArrowRight':
          e.preventDefault();
          handlers.onNext?.();
          break;
        case 'ArrowLeft':
          e.preventDefault();
          handlers.onPrev?.();
          break;
        case 'r':
        case 'R':
          handlers.onReset?.();
          break;
        case 'Escape':
          handlers.onEscape?.();
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handlers]);
}
