import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';
import { ROUTES } from '@/config/routes';
import { Button } from '@/components/common/Button';

export function NotFoundPage() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
      <h1 className="font-display text-8xl font-bold text-accent">404</h1>
      <h2 className="mt-4 text-2xl font-bold text-content">Page Not Found</h2>
      <p className="mt-2 max-w-md text-content-muted">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link to={ROUTES.HOME} className="mt-8">
        <Button>
          <Home className="h-4 w-4" />
          Back to Home
        </Button>
      </Link>
    </div>
  );
}
