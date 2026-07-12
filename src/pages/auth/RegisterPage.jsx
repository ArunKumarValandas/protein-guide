import { useState } from 'react';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { UserPlus } from 'lucide-react';
import { ROUTES } from '@/config/routes';
import { useAppStore } from '@/store/useAppStore';
import { Button } from '@/components/common/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/common/Card';

export function RegisterPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const register = useAppStore((s) => s.register);
  const currentUser = useAppStore((s) => s.currentUser);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const redirectTo = location.state?.from?.pathname || ROUTES.DASHBOARD;

  if (currentUser) return <Navigate to={redirectTo} replace />;

  const handleSubmit = (event) => {
    event.preventDefault();
    const result = register({ name, email, password });
    if (!result.ok) {
      setError(result.error);
      return;
    }
    navigate(redirectTo, { replace: true });
  };

  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4 py-12">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UserPlus className="h-5 w-5 text-accent" />
            Create Account
          </CardTitle>
          <CardDescription>Save progress locally in this browser.</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={handleSubmit}>
            {error && <div className="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-500">{error}</div>}
            <label className="space-y-2">
              <span className="text-sm font-medium text-content">Name</span>
              <input className="input" value={name} onChange={(event) => setName(event.target.value)} autoComplete="name" />
            </label>
            <label className="space-y-2">
              <span className="text-sm font-medium text-content">Email</span>
              <input className="input" type="email" value={email} onChange={(event) => setEmail(event.target.value)} autoComplete="email" />
            </label>
            <label className="space-y-2">
              <span className="text-sm font-medium text-content">Password</span>
              <input className="input" type="password" value={password} onChange={(event) => setPassword(event.target.value)} autoComplete="new-password" />
            </label>
            <Button className="w-full" type="submit">Create Account</Button>
            <p className="text-center text-sm text-content-muted">
              Already have one? <Link className="text-accent hover:underline" to={ROUTES.LOGIN}>Login</Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
