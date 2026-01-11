/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Variants } from 'framer-motion';

/**
 * 중앙 관리되는 애니메이션 variants
 * 프로젝트 전체에서 일관된 애니메이션 경험 제공
 */

// ==================== CONTAINER ANIMATIONS ====================

export const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 }
  }
};

export const headerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.3 }
  }
};

// ==================== ITEM ANIMATIONS ====================

export const itemVariants: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
  }
};

export const riseVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65 }
  }
};

export const scaleInVariants: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
  }
};

// ==================== BLIND EFFECT (TEXT REVEAL) ====================

export const blindGroupVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.09 }
  }
};

export const blindGroupDelayedVariants: Variants = {
  hidden: {},
  visible: {
    transition: { delayChildren: 0.65, staggerChildren: 0.09 }
  }
};

export const blindLineVariants: Variants = {
  hidden: { y: '120%' },
  visible: {
    y: '0%',
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] }
  }
};

// ==================== FADE ANIMATIONS ====================

export const fadeInVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.6 }
  }
};

export const fadeInUpVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
  }
};

// ==================== CUSTOM EASING ====================

export const EASING = {
  smooth: [0.22, 1, 0.36, 1] as [number, number, number, number],
  spring: { type: 'spring', damping: 20, stiffness: 200 }
} as const;

// ==================== ANIMATION DURATIONS ====================

export const DURATION = {
  fast: 0.3,
  medium: 0.6,
  slow: 0.8,
  verySlow: 1.2
} as const;
