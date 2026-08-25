import React, { useRef, useState, ReactNode } from 'react';
import { motion } from 'motion/react';

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
  style?: React.CSSProperties;
}

export function MagneticButton({ children, className = '', onClick, href, style }: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement | HTMLAnchorElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current!.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.2, y: middleY * 0.2 });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  const transition = { type: 'spring' as const, stiffness: 150, damping: 15, mass: 0.1 };

  const commonProps = {
    ref: ref as any,
    onMouseMove: handleMouse,
    onMouseLeave: reset,
    className,
    style,
    animate: { x: position.x, y: position.y },
    transition
  };

  if (href) {
    return (
      <motion.a href={href} {...commonProps}>
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button onClick={onClick} {...commonProps}>
      {children}
    </motion.button>
  );
}
