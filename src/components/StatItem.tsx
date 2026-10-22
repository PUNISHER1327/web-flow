import React, { useEffect, useRef, useState } from 'react';
import type { StatItemData } from '../types';
import { useReducedMotion } from '../hooks/useReducedMotion';

interface StatItemProps {
  stat: StatItemData;
  index: number;
}

export const StatItem: React.FC<StatItemProps> = ({ stat, index }) => {
  const [currentVal, setCurrentVal] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      setCurrentVal(stat.numericPart);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);

          const duration = 1400; // ms
          const startTime = performance.now();
          const target = stat.numericPart;

          const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out cubic
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const val = Math.floor(easeOut * target);

            setCurrentVal(val);

            if (progress < 1) {
              requestAnimationFrame(animate);
            } else {
              setCurrentVal(target);
            }
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.3 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated, prefersReducedMotion, stat.numericPart]);

  const displayedFigure = prefersReducedMotion ? stat.value : `${currentVal}${stat.suffix || ''}`;

  return (
    <div
      ref={containerRef}
      className={`relative p-6 md:p-8 flex flex-col justify-between ${
        index !== 0 ? 'md:border-l border-border' : ''
      } border-t md:border-t-0 border-border first:border-t-0`}
    >
      <div className="label-mono text-accent/90 mb-3">
        METRIC // 0{index + 1}
      </div>

      <div className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tighter text-text-primary mb-2">
        {displayedFigure}
      </div>

      <div>
        <p className="label-mono text-text-primary font-semibold tracking-wider text-xs">
          {stat.label}
        </p>
        {stat.description && (
          <p className="mt-1 text-xs text-text-muted leading-relaxed font-sans">
            {stat.description}
          </p>
        )}
      </div>
    </div>
  );
};
