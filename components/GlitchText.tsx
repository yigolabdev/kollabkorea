
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';
import { motion } from 'framer-motion';

interface GradientTextProps {
  text: string;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
  className?: string;
}

const GradientText: React.FC<GradientTextProps> = ({ text, as: Component = 'span', className = '' }) => {
  return (
    <Component className={`relative inline-block font-black tracking-tighter ${className} text-black`}>
      <motion.span
        className="absolute inset-0 z-10 block text-black"
        initial={{ opacity: 0.8 }}
        animate={{
          opacity: [0.8, 1, 0.8],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        aria-hidden="true"
      >
        {text}
      </motion.span>
      <span className="block opacity-0">{text}</span>
    </Component>
  );
};

export default GradientText;
