import React from 'react';
import { LucideIcon } from 'lucide-react';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg' | 'xl';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: LucideIcon;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
  children: React.ReactNode;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: 'bg-kollab-red text-white hover:bg-white hover:text-kollab-red border-2 border-transparent hover:border-kollab-red shadow-[0_0_20px_rgba(220,0,0,0.4)] hover:shadow-[0_0_40px_rgba(220,0,0,0.7)]',
  secondary: 'bg-white text-black hover:bg-kollab-red hover:text-white border-2 border-transparent',
  outline: 'bg-transparent border-2 border-white text-white hover:bg-white hover:text-black',
  ghost: 'bg-transparent text-white hover:bg-white/10',
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-6 py-2 text-sm',
  md: 'px-10 py-3 text-base',
  lg: 'px-12 py-5 text-lg',
  xl: 'px-16 py-6 text-xl',
};

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  icon: Icon,
  iconPosition = 'right',
  fullWidth = false,
  className = '',
  children,
  disabled = false,
  ...props
}) => {
  const baseStyles = 'font-black uppercase tracking-widest transition-all duration-300 relative overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed';
  const widthStyles = fullWidth ? 'w-full' : 'w-auto';

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${widthStyles} ${className}`}
      disabled={disabled}
      {...props}
    >
      <span className="relative z-10 flex items-center justify-center gap-3">
        {Icon && iconPosition === 'left' && <Icon size={size === 'xl' ? 28 : size === 'lg' ? 24 : 20} />}
        {children}
        {Icon && iconPosition === 'right' && (
          <Icon 
            size={size === 'xl' ? 28 : size === 'lg' ? 24 : 20} 
            className="group-hover:translate-x-1 transition-transform"
          />
        )}
      </span>
      {/* Hover shine effect for primary variant */}
      {variant === 'primary' && (
        <div className="absolute top-0 -left-full w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[-20deg] group-hover:animate-[shine_1s_ease-in-out]"></div>
      )}
    </button>
  );
};

