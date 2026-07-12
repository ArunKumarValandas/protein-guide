import { cn } from '@/utils/cn';

export function Card({ children, className, hover = false, ...props }) {
  return (
    <div
      className={cn(
        'card',
        hover && 'transition-all duration-200 hover:border-accent/50 hover:shadow-md',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({ children, className }) {
  return <div className={cn('mb-4', className)}>{children}</div>;
}

export function CardTitle({ children, className }) {
  return <h3 className={cn('text-lg font-semibold text-content', className)}>{children}</h3>;
}

export function CardDescription({ children, className }) {
  return <p className={cn('mt-1 text-sm text-content-muted', className)}>{children}</p>;
}

export function CardContent({ children, className }) {
  return <div className={cn(className)}>{children}</div>;
}
