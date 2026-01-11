/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { memo } from 'react';
import { motion } from 'framer-motion';

interface ScrollIndicatorProps {
  className?: string;
  delay?: number;
}

/**
 * Scroll Indicator Component
 * 스크롤 유도 인디케이터 (About, Contact 페이지에서 사용)
 */
const ScrollIndicator: React.FC<ScrollIndicatorProps> = memo(({
  className = '',
  delay = 1.5
}) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay, duration: 1 }}
    className={`flex flex-col items-center gap-2 ${className}`}
  >
    <motion.div
      animate={{ y: [0, 6, 0] }}
      transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      className="w-[1px] h-12 bg-black/20"
    />
    <p className="text-xs font-medium text-black/30 tracking-wider">SCROLL</p>
  </motion.div>
));

ScrollIndicator.displayName = 'ScrollIndicator';

export default ScrollIndicator;
