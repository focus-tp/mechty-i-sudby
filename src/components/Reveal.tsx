import React, { ReactNode } from 'react';
import { motion } from 'motion/react';

interface RevealProps {
  children: ReactNode;
  delay?: number;
  type?: 'up' | 'left' | 'right';
  className?: string;
  amount?: number | 'some' | 'all';
  key?: React.Key;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
}

export const Reveal = ({ children, delay = 0, type = 'up', className = '', amount = 0.1, onClick }: RevealProps) => {
  const getVariants = () => {
    switch (type) {
      case 'left':
        return { hidden: { opacity: 0, x: -30 }, visible: { opacity: 1, x: 0 } };
      case 'right':
        return { hidden: { opacity: 0, x: 30 }, visible: { opacity: 1, x: 0 } };
      case 'up':
      default:
        return { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } };
    }
  };

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount, margin: '0px 0px -40px 0px' }}
      transition={{ duration: 0.7, delay, ease: [0.34, 1.56, 0.64, 1] }}
      variants={getVariants()}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
};
