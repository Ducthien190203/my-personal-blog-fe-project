import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        default:
          'border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80',
        secondary:
          'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80',
        destructive:
          'border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80',
        outline: 'text-foreground',
        category:
          'border-transparent bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800 dark:from-purple-900/20 dark:to-pink-900/20 dark:text-purple-200 hover:from-purple-200 hover:to-pink-200 dark:hover:from-purple-900/40 dark:hover:to-pink-900/40',
        tag: 'border-transparent bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-800 dark:from-blue-900/20 dark:to-cyan-900/20 dark:text-blue-200 hover:from-blue-200 hover:to-cyan-200 dark:hover:from-blue-900/40 dark:hover:to-cyan-900/40',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
