import { cn } from '@/utils/cn';

const variants = {
  default: 'bg-surface-muted text-content',
  primary: 'bg-accent-muted text-accent',
  success: 'bg-green-500/10 text-green-500',
  warning: 'bg-yellow-500/10 text-yellow-500',
  error: 'bg-red-500/10 text-red-500',
  info: 'bg-blue-500/10 text-blue-500',
};

export function Badge({ children, variant = 'default', className }) {
  return <span className={cn('badge', variants[variant], className)}>{children}</span>;
}
