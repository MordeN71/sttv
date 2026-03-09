'use client';

import { useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const SIZE = 400;
const OFFSET = SIZE / 2;

export function GlowCursor() {
  const cursorX = useMotionValue(-OFFSET);
  const cursorY = useMotionValue(-OFFSET);

  const springConfig = { damping: 30, stiffness: 100 };
  const x = useSpring(cursorX, springConfig);
  const y = useSpring(cursorY, springConfig);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      cursorX.set(e.clientX - OFFSET);
      cursorY.set(e.clientY - OFFSET);
    };
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, [cursorX, cursorY]);

  return (
    <motion.div
      style={{
        position: 'fixed',
        left: 0,
        top: 0,
        width: SIZE,
        height: SIZE,
        x,
        y,
        background: 'radial-gradient(circle, rgba(168, 85, 247, 0.6) 0%, rgba(168, 85, 247, 0.2) 40%, transparent 70%)',
        pointerEvents: 'none',
        zIndex: 0,
        mixBlendMode: 'screen',
      }}
    />
  );
}
