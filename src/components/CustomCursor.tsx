import React, { useEffect, useState, useRef } from 'react';
import { useReducedMotion } from '../hooks/useReducedMotion';

export const CustomCursor: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();
  const [isVisible, setIsVisible] = useState(false);
  const [isTouch, setIsTouch] = useState(false);
  const [cursorType, setCursorType] = useState<'default' | 'view' | 'pointer' | 'hidden'>('default');

  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  const mousePos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });

  useEffect(() => {
    // Detect touch device
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsTouch(true);
      return;
    }

    if (prefersReducedMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);

      // Check element under cursor
      const target = e.target as HTMLElement | null;
      if (!target) return;

      if (target.closest('input, textarea, select, [contenteditable="true"]')) {
        setCursorType('hidden');
      } else if (target.closest('[data-cursor="view"]')) {
        setCursorType('view');
      } else if (target.closest('button, a, [role="button"]')) {
        setCursorType('pointer');
      } else {
        setCursorType('default');
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    let animationFrameId: number;
    const render = () => {
      // Smooth interpolation for ring lag
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * 0.18;
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * 0.18;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mousePos.current.x}px, ${mousePos.current.y}px, 0)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0)`;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isVisible, prefersReducedMotion]);

  if (isTouch || prefersReducedMotion || !isVisible || cursorType === 'hidden') {
    return null;
  }

  const isView = cursorType === 'view';
  const isPointer = cursorType === 'pointer';

  return (
    <>
      {/* 8px Center Dot */}
      <div
        ref={dotRef}
        aria-hidden="true"
        className={`fixed top-0 left-0 -mt-1 -ml-1 w-2 h-2 rounded-full pointer-events-none z-[9999] transition-opacity duration-150 ${
          isView ? 'opacity-0' : 'bg-accent opacity-100 shadow-[0_0_6px_rgba(217,243,106,0.8)]'
        }`}
      />

      {/* 32px Lagging Ring / Expand on View */}
      <div
        ref={ringRef}
        aria-hidden="true"
        className={`fixed top-0 left-0 pointer-events-none z-[9998] rounded-full flex items-center justify-center transition-all duration-200 ease-out ${
          isView
            ? '-mt-8 -ml-8 w-16 h-16 bg-accent text-[#10110F] font-mono text-[11px] font-bold tracking-wider shadow-lg'
            : isPointer
            ? '-mt-5 -ml-5 w-10 h-10 border border-accent bg-accent/15'
            : '-mt-4 -ml-4 w-8 h-8 border border-accent/70'
        }`}
      >
        {isView && <span>VIEW</span>}
      </div>
    </>
  );
};
