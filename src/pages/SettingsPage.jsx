import { useAppStore } from '@/store/useAppStore';
import { ThemeSelector } from '@/components/layout/ThemeSelector';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/common/Card';

export function SettingsPage() {
  const highContrast = useAppStore((s) => s.highContrast);
  const reducedMotion = useAppStore((s) => s.reducedMotion);
  const setHighContrast = useAppStore((s) => s.setHighContrast);
  const setReducedMotion = useAppStore((s) => s.setReducedMotion);

  return (
    <div className="mx-auto max-w-2xl space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-content">Settings</h1>
        <p className="mt-2 text-content-muted">Customize your AlgoVision Pro experience</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Theme</CardTitle>
          <CardDescription>Choose your preferred visual theme</CardDescription>
        </CardHeader>
        <CardContent>
          <ThemeSelector />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Accessibility</CardTitle>
          <CardDescription>Adjust settings for better accessibility</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <label className="flex items-center justify-between">
            <span className="text-content">High Contrast Mode</span>
            <input
              type="checkbox"
              checked={highContrast}
              onChange={(e) => setHighContrast(e.target.checked)}
              className="h-5 w-5 accent-accent"
            />
          </label>
          <label className="flex items-center justify-between">
            <span className="text-content">Reduce Motion</span>
            <input
              type="checkbox"
              checked={reducedMotion}
              onChange={(e) => setReducedMotion(e.target.checked)}
              className="h-5 w-5 accent-accent"
            />
          </label>
        </CardContent>
      </Card>
    </div>
  );
}
