
import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { cva, type VariantProps } from 'class-variance-authority';

const buttonVariants = cva(
  'relative inline-flex items-center justify-center rounded-md text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50 disabled:pointer-events-none',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground shadow hover:bg-primary/90',
        destructive: 'bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90',
        outline: 'border border-input bg-transparent hover:bg-accent hover:text-accent-foreground',
        secondary: 'bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
        gradient: 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-md hover:from-orange-600 hover:to-amber-600',
        glass: 'backdrop-blur-md bg-white/20 border border-white/20 text-foreground hover:bg-white/30',
        police: 'bg-police-blue text-white shadow-md hover:bg-police-blue/90',
        vibrant: 'bg-warm-500 text-white shadow-vibrant hover:bg-warm-600 hover:shadow-lg',
        'vibrant-gradient': 'bg-vibrant-gradient text-white shadow-vibrant hover:opacity-90',
        soft: 'bg-warm-100 text-warm-800 border border-warm-200 hover:bg-warm-200',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-8 rounded-md px-3 text-xs',
        lg: 'h-12 rounded-md px-8',
        icon: 'h-9 w-9',
        'icon-sm': 'h-7 w-7 rounded-md',
        pill: 'h-10 px-5 py-2 rounded-full',
        'pill-sm': 'h-8 px-4 py-1 rounded-full text-xs',
      },
      isAnimated: {
        true: 'overflow-hidden transition-all duration-300 ease-in-out transform hover:-translate-y-1 active:translate-y-0',
        false: 'transition-colors duration-200',
      },
      isRounded: {
        true: 'rounded-full',
        false: 'rounded-md',
      },
      hasGlow: {
        true: 'after:content-[""] after:absolute after:inset-0 after:z-[-1] after:bg-inherit after:blur-md after:opacity-50',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
      isAnimated: true,
      isRounded: false,
      hasGlow: false,
    },
  }
);

export interface SmartButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  isLoading?: boolean;
  loadingText?: string;
  withRipple?: boolean;
}

const SmartButton = React.forwardRef<HTMLButtonElement, SmartButtonProps>(
  (
    {
      className,
      variant,
      size,
      isAnimated,
      isRounded,
      hasGlow,
      icon,
      iconPosition = 'left',
      isLoading = false,
      loadingText,
      withRipple = false,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <Button
        className={cn(buttonVariants({ variant, size, isAnimated, isRounded, hasGlow, className }))}
        ref={ref}
        disabled={isLoading || props.disabled}
        {...props}
      >
        {isLoading ? (
          <>
            <span className="mr-2 animate-spin">○</span>
            {loadingText || children}
          </>
        ) : (
          <>
            {icon && iconPosition === 'left' && <span className="mr-2">{icon}</span>}
            {children}
            {icon && iconPosition === 'right' && <span className="ml-2">{icon}</span>}
          </>
        )}
      </Button>
    );
  }
);

SmartButton.displayName = 'SmartButton';

export { SmartButton, buttonVariants };
