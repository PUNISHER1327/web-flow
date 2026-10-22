import React, { useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { useReducedMotion } from '../hooks/useReducedMotion';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  withArrow?: boolean;
  magnetic?: boolean;
  children: React.ReactNode;
  asAnchor?: boolean;
  href?: string;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  withArrow = false,
  magnetic = false,
  children,
  className = '',
  asAnchor = false,
  href,
  onClick,
  ...rest
}) => {
  const buttonRef = useRef<HTMLButtonElement | HTMLAnchorElement | null>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const prefersReducedMotion = useReducedMotion();

  // Magnetic hover effect (max 40px radius, disabled on touch/reduced motion)
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!magnetic || prefersReducedMotion || !buttonRef.current) return;
    const { left, top, width, height } = buttonRef.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    const deltaX = e.clientX - centerX;
    const deltaY = e.clientY - centerY;
    const distance = Math.hypot(deltaX, deltaY);

    if (distance < 50) {
      setPosition({ x: deltaX * 0.22, y: deltaY * 0.22 });
    } else {
      setPosition({ x: 0, y: 0 });
    }
  };

  const handleMouseLeave = () => {
    if (magnetic) {
      setPosition({ x: 0, y: 0 });
    }
  };

  const baseStyles =
    'group relative inline-flex items-center justify-center font-heading font-semibold text-sm transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 active:scale-[0.97] disabled:opacity-50 disabled:pointer-events-none rounded-btn overflow-hidden select-none cursor-pointer';

  const sizeStyles = {
    sm: 'px-4 py-2 text-xs gap-1.5',
    md: 'px-5 py-2.5 text-sm gap-2',
    lg: 'px-7 py-3.5 text-base gap-2.5',
  }[size];

  const variantStyles = {
    primary:
      'bg-accent text-[#10110F] font-bold shadow-sm hover:shadow-[0_0_20px_rgba(217,243,106,0.3)]',
    secondary:
      'bg-surface-elevated text-text-primary border border-border hover:border-text-muted hover:bg-surface',
    outline:
      'bg-transparent text-text-primary border border-border hover:border-accent hover:text-accent',
    ghost:
      'bg-transparent text-text-primary hover:bg-surface-elevated hover:text-accent',
  }[variant];

  const magneticStyle =
    magnetic && !prefersReducedMotion
      ? {
          transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
          transition: 'transform 0.18s cubic-bezier(0.22, 1, 0.36, 1)',
        }
      : {};

  const content = (
    <>
      {/* Background slide sweep for primary button */}
      {variant === 'primary' && (
        <span
          className="absolute inset-0 bg-[#E5FFA0] -translate-x-full transition-transform duration-300 ease-out group-hover:translate-x-0"
          aria-hidden="true"
        />
      )}

      {/* Button content */}
      <span className="relative z-10 flex items-center gap-2">
        <span>{children}</span>
        {withArrow && (
          <ArrowRight
            size={16}
            strokeWidth={1.5}
            className="transition-transform duration-200 ease-out group-hover:translate-x-1"
          />
        )}
      </span>
    </>
  );

  if (asAnchor && href) {
    return (
      <a
        ref={buttonRef as React.Ref<HTMLAnchorElement>}
        href={href}
        style={magneticStyle}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={`${baseStyles} ${sizeStyles} ${variantStyles} ${className}`}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      ref={buttonRef as React.Ref<HTMLButtonElement>}
      style={magneticStyle}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className={`${baseStyles} ${sizeStyles} ${variantStyles} ${className}`}
      {...rest}
    >
      {content}
    </button>
  );
};
