import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { ButterflySVG } from "./Decorations";
import { motion, useMotionValue, useSpring } from "motion/react";

export function CustomCursor() {
  const [isEnabled, setIsEnabled] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Пружинная физика для плавного и органичного следования курсора
  const springConfig = { damping: 25, stiffness: 400, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const media = window.matchMedia('(min-width: 1101px) and (hover: hover) and (pointer: fine)');
    const update = () => setIsEnabled(media.matches);

    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    if (!isEnabled) return;

    const onMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX - 16); // Смещение для центрирования бабочки (32px / 2 = 16)
      cursorY.set(e.clientY - 16);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.closest("a") ||
        target.closest("button") ||
        target.closest(".team-card-inner") ||
        target.closest(".cabin-card") ||
        target.closest(".project-card")
      ) {
        setIsHovering(true);
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.closest("a") ||
        target.closest("button") ||
        target.closest(".team-card-inner") ||
        target.closest(".cabin-card") ||
        target.closest(".project-card")
      ) {
        setIsHovering(false);
      }
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
    };
  }, [cursorX, cursorY, isEnabled, isVisible]);

  if (!isEnabled) return null;

  return createPortal(
    <motion.div
      className="custom-cursor fixed top-0 left-0 pointer-events-none z-[9999] w-8 h-8 flex items-center justify-center"
      style={{
        x: cursorXSpring,
        y: cursorYSpring,
        opacity: isVisible ? 1 : 0,
        scale: isHovering ? 1.5 : 1,
        rotate: isHovering ? 195 : 180,
      }}
      initial={{ opacity: 0 }}
      animate={{
        opacity: isVisible ? 1 : 0,
        scale: isHovering ? 1.5 : 1,
        rotate: isHovering ? 195 : 180,
      }}
      transition={{ scale: { duration: 0.2 }, rotate: { duration: 0.2 } }}
    >
      <ButterflySVG className="w-full h-full text-[var(--pink-deep)]" style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))' }} />
    </motion.div>,
    document.body
  );
}
