import React from 'react';

export type LogoVariant = 'primary' | 'stacked';
export type LogoColor = 'black' | 'white' | 'red';

interface LogoProps {
  variant?: LogoVariant;
  color?: LogoColor;
  className?: string;
  alt?: string;
}

/**
 * KOLLAB 로고 컴포넌트
 * 
 * @param variant - 'primary' (한 줄) 또는 'stacked' (두 줄)
 * @param color - 'black', 'white', 'red'
 * @param className - 추가 CSS 클래스
 * @param alt - 대체 텍스트 (기본값: 'KOLLAB')
 */
export const Logo: React.FC<LogoProps> = ({
  variant = 'primary',
  color = 'white',
  className = '',
  alt = 'KOLLAB',
}) => {
  const getLogoPath = () => {
    const base = '/assets/logos/kollab';
    const variantSuffix = variant === 'stacked' ? '-stacked' : '';
    return `${base}${variantSuffix}-${color}.svg`;
  };

  return (
    <img
      src={getLogoPath()}
      alt={alt}
      className={className}
      loading="eager"
    />
  );
};

/**
 * 사용 예시:
 * 
 * // Navbar (한 줄, 화이트)
 * <Logo variant="primary" color="white" className="h-8" />
 * 
 * // Hero (두 줄, 화이트)
 * <Logo variant="stacked" color="white" className="h-32 md:h-48" />
 * 
 * // About (한 줄, 블랙)
 * <Logo variant="primary" color="black" className="h-10" />
 * 
 * // CTA (두 줄, 레드)
 * <Logo variant="stacked" color="red" className="h-24" />
 */

