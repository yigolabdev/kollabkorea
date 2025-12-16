/**
 * KOLLAB KOREA - Design Tokens
 * 
 * 디자인 시스템의 핵심 토큰 정의
 * Tailwind config와 동기화되어 있습니다.
 */

// ============================================
// COLORS
// ============================================

export const colors = {
  // Primary Brand Colors
  kollab: {
    red: '#dc0000',      // HEX #dc0000 | RGB 220,0,0 | CMYK 4,100,100,0
    beige: '#e4e0db',    // HEX #e4e0db | RGB 228,224,218 | CMYK 13,13,14,0
    silver: '#c0c0c0',   // HEX #c0c0c0 | RGB 192,192,192 | CMYK 0,0,0,25
    black: '#000000',    // HEX #000000 | RGB 0,0,0 | CMYK 0,0,0,100
    dark: '#111111',     // HEX #111111 | Off-black for contrast
  },
  
  // Semantic Colors (Tailwind zinc scale)
  neutral: {
    white: '#ffffff',
    black: '#000000',
    gray: {
      50: '#fafafa',
      100: '#f5f5f5',
      200: '#e5e5e5',
      300: '#d4d4d4',
      400: '#a3a3a3',
      500: '#737373',
      600: '#525252',
      700: '#404040',
      800: '#1f1f1f',
      900: '#111111',
    }
  }
} as const;

// ============================================
// TYPOGRAPHY
// ============================================

export const typography = {
  fontFamily: {
    sans: ['Inter', 'sans-serif'],
    mono: ['Monaco', 'Courier New', 'monospace'],
  },
  
  fontWeight: {
    light: 300,
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    black: 900,
  },
  
  fontSize: {
    // Heading sizes (responsive)
    h1: {
      mobile: '3rem',      // 48px
      tablet: '4.5rem',    // 72px
      desktop: '6rem',     // 96px
      large: '8rem',       // 128px
    },
    h2: {
      mobile: '2.5rem',    // 40px
      tablet: '3.75rem',   // 60px
      desktop: '4.5rem',   // 72px
      large: '6rem',       // 96px
    },
    h3: {
      mobile: '2rem',      // 32px
      tablet: '2.25rem',   // 36px
      desktop: '3rem',     // 48px
      large: '3.75rem',    // 60px
    },
    h4: {
      mobile: '1.5rem',    // 24px
      tablet: '1.875rem',  // 30px
      desktop: '2.25rem',  // 36px
    },
    h5: {
      mobile: '1.25rem',   // 20px
      tablet: '1.5rem',    // 24px
      desktop: '1.875rem', // 30px
    },
    h6: {
      mobile: '1.125rem',  // 18px
      tablet: '1.25rem',   // 20px
      desktop: '1.5rem',   // 24px
    },
    
    // Body sizes
    body: {
      xl: '1.25rem',       // 20px
      lg: '1.125rem',      // 18px
      md: '1rem',          // 16px (base)
      sm: '0.875rem',      // 14px
      xs: '0.75rem',       // 12px
    }
  },
  
  lineHeight: {
    none: 0.9,
    tight: 1.1,
    snug: 1.25,
    normal: 1.5,
    relaxed: 1.625,
    loose: 2,
  },
  
  letterSpacing: {
    tighter: '-0.05em',
    tight: '-0.025em',
    normal: '0',
    wide: '0.025em',
    wider: '0.05em',
    widest: '0.1em',
  }
} as const;

// ============================================
// SPACING
// ============================================

export const spacing = {
  // Base unit: 4px
  0: '0',
  1: '0.25rem',    // 4px
  2: '0.5rem',     // 8px
  3: '0.75rem',    // 12px
  4: '1rem',       // 16px
  5: '1.25rem',    // 20px
  6: '1.5rem',     // 24px
  8: '2rem',       // 32px
  10: '2.5rem',    // 40px
  12: '3rem',      // 48px
  16: '4rem',      // 64px
  20: '5rem',      // 80px
  24: '6rem',      // 96px
  32: '8rem',      // 128px
  40: '10rem',     // 160px
  48: '12rem',     // 192px
  56: '14rem',     // 224px
  64: '16rem',     // 256px
} as const;

// ============================================
// BREAKPOINTS
// ============================================

export const breakpoints = {
  sm: '640px',     // Mobile landscape
  md: '768px',     // Tablet
  lg: '1024px',    // Desktop
  xl: '1280px',    // Desktop large
  '2xl': '1536px', // Desktop XL
} as const;

// ============================================
// ANIMATION
// ============================================

export const animation = {
  duration: {
    fast: '300ms',
    medium: '500ms',
    slow: '700ms',
    verySlow: '1000ms',
  },
  
  easing: {
    default: 'ease',
    in: 'ease-in',
    out: 'ease-out',
    inOut: 'ease-in-out',
    linear: 'linear',
  },
  
  delay: {
    none: '0ms',
    short: '100ms',
    medium: '300ms',
    long: '500ms',
  }
} as const;

// ============================================
// SHADOWS
// ============================================

export const shadows = {
  sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  default: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
  md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
  xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
  '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
  
  // Brand specific
  kollab: {
    red: '0 0 20px rgba(220, 0, 0, 0.4)',
    redHover: '0 0 40px rgba(220, 0, 0, 0.7)',
  }
} as const;

// ============================================
// BORDERS
// ============================================

export const borders = {
  width: {
    0: '0',
    1: '1px',
    2: '2px',
    4: '4px',
    8: '8px',
  },
  
  radius: {
    none: '0',
    sm: '0.125rem',   // 2px
    default: '0.25rem', // 4px
    md: '0.375rem',   // 6px
    lg: '0.5rem',     // 8px
    xl: '0.75rem',    // 12px
    '2xl': '1rem',    // 16px
    '3xl': '1.5rem',  // 24px
    full: '9999px',
  }
} as const;

// ============================================
// Z-INDEX
// ============================================

export const zIndex = {
  0: 0,
  10: 10,
  20: 20,
  30: 30,
  40: 40,
  50: 50,
  auto: 'auto',
  
  // Semantic layers
  base: 0,
  dropdown: 1000,
  sticky: 1100,
  fixed: 1200,
  modalBackdrop: 1300,
  modal: 1400,
  popover: 1500,
  tooltip: 1600,
} as const;

// ============================================
// LAYOUT
// ============================================

export const layout = {
  container: {
    maxWidth: '1280px',
    padding: {
      mobile: '1.5rem',   // 24px
      tablet: '2rem',     // 32px
      desktop: '3rem',    // 48px
    }
  },
  
  section: {
    padding: {
      mobile: '5rem',     // 80px
      tablet: '8rem',     // 128px
      desktop: '10rem',   // 160px
    }
  }
} as const;

// ============================================
// COMPONENT VARIANTS
// ============================================

export const components = {
  button: {
    size: {
      sm: {
        padding: '0.5rem 1.5rem',    // py-2 px-6
        fontSize: '0.875rem',         // text-sm
      },
      md: {
        padding: '0.75rem 2.5rem',   // py-3 px-10
        fontSize: '1rem',             // text-base
      },
      lg: {
        padding: '1.25rem 3rem',     // py-5 px-12
        fontSize: '1.125rem',         // text-lg
      },
      xl: {
        padding: '1.5rem 4rem',      // py-6 px-16
        fontSize: '1.25rem',          // text-xl
      }
    }
  },
  
  card: {
    padding: {
      sm: '1.5rem',      // p-6
      md: '2rem',        // p-8
      lg: '2.5rem',      // p-10
      xl: '4rem',        // p-16
    }
  },
  
  input: {
    height: {
      sm: '2rem',        // h-8
      md: '2.5rem',      // h-10
      lg: '3rem',        // h-12
      xl: '3.5rem',      // h-14
    }
  }
} as const;

// ============================================
// EXPORTS
// ============================================

export const designTokens = {
  colors,
  typography,
  spacing,
  breakpoints,
  animation,
  shadows,
  borders,
  zIndex,
  layout,
  components,
} as const;

export type DesignTokens = typeof designTokens;
export type Colors = typeof colors;
export type Typography = typeof typography;
export type Spacing = typeof spacing;
export type Breakpoints = typeof breakpoints;
export type Animation = typeof animation;

export default designTokens;

