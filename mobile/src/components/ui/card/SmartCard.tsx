
import React from 'react';
import { cn } from '@/lib/utils';

interface SmartCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'glass' | 'outline' | 'subtle' | 'vibrant' | 'warm' | 'gradient';
  isHoverable?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  isFloating?: boolean;
  hasGlow?: boolean;
  isRounded?: boolean;
  className?: string;
  children: React.ReactNode;
}

const paddingMap = {
  none: 'p-0',
  sm: 'p-3',
  md: 'p-5',
  lg: 'p-7',
};

const SmartCard: React.FC<SmartCardProps> = ({
  variant = 'default',
  isHoverable = true,
  padding = 'md',
  isFloating = false,
  hasGlow = false,
  isRounded = false,
  className,
  children,
  ...props
}) => {
  const baseStyles = isRounded ? 'rounded-3xl overflow-hidden' : 'rounded-lg overflow-hidden';
  
  const variantStyles = {
    default: 'bg-card shadow-elegant',
    glass: 'glass-card backdrop-blur-lg',
    outline: 'border-2 border-border bg-transparent',
    subtle: 'bg-secondary/50',
    vibrant: 'bg-gradient-to-br from-orange-50 to-white border border-orange-100 shadow-vibrant',
    warm: 'bg-warm-50 border border-warm-200',
    gradient: 'bg-gradient-to-br from-warm-100 to-amber-50 border border-warm-200',
  };

  const hoverStyles = isHoverable 
    ? 'transition-all duration-300 ease-out hover:shadow-float hover:-translate-y-1'
    : '';
    
  const floatingStyles = isFloating
    ? 'animate-floating shadow-float'
    : '';
    
  const glowStyles = hasGlow
    ? 'after:content-[""] after:absolute after:inset-0 after:z-[-1] after:bg-inherit after:blur-md after:opacity-30'
    : '';

  return (
    <div
      className={cn(
        baseStyles,
        variantStyles[variant],
        paddingMap[padding],
        hoverStyles,
        floatingStyles,
        glowStyles,
        'relative',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default SmartCard;
