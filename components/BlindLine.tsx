/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { blindLineVariants } from '../utils/animations';
import type { BlindLineProps } from '../types';

/**
 * Blind Line Effect Component
 * 텍스트가 아래에서 위로 슬라이드되며 나타나는 효과
 */
const BlindLine: React.FC<BlindLineProps> = memo(({ children }) => (
  <span className="block overflow-hidden">
    <motion.span className="block will-change-transform" variants={blindLineVariants}>
      {children}
    </motion.span>
  </span>
));

BlindLine.displayName = 'BlindLine';

export default BlindLine;
