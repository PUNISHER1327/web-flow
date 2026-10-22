import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SectionHeading } from '../components/SectionHeading';
import { GALLERY_ITEMS } from '../lib/designTokens';
import { useReducedMotion } from '../hooks/useReducedMotion';

gsap.registerPlugin(ScrollTrigger);

export const Gallery: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const col1Ref = useRef<HTMLDivElement>(null);
  const col2Ref = useRef<HTMLDivElement>(null);
  const col3Ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion || !containerRef.current) return;

    const ctx = gsap.context(() => {
      // Parallax on alternating columns
      if (col1Ref.current) {
        gsap.to(col1Ref.current, {
          yPercent: -8,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          },
        });
      }

      if (col2Ref.current) {
        gsap.to(col2Ref.current, {
          yPercent: 8,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          },
        });
      }

      if (col3Ref.current) {
        gsap.to(col3Ref.current, {
          yPercent: -6,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          },
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  const col1 = [GALLERY_ITEMS[0], GALLERY_ITEMS[3]];
  const col2 = [GALLERY_ITEMS[1], GALLERY_ITEMS[4]];
  const col3 = [GALLERY_ITEMS[2], GALLERY_ITEMS[5]];

  return (
    <section
      ref={containerRef}
      className="py-24 md:py-36 bg-background transition-colors duration-theme border-b border-border overflow-hidden"
    >
      <div className="max-w-1440 mx-auto px-6 sm:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <SectionHeading
            eyebrow="FIELD OBSERVATIONS"
            title="TRAINING GALLERY."
            description="The reality of progressive strength: chalk, steel, focus, and quiet discipline."
            className="mb-0 md:mb-0"
          />

          <span className="label-mono text-[11px] text-text-muted">
            06 FRAMES // INDUSTRIAL PERFORMANCE
          </span>
        </div>

        {/* 3-Column Asymmetric Parallax Masonry */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {/* Column 1 */}
          <div ref={col1Ref} className="flex flex-col gap-6 md:gap-8">
            {col1.map(item => (
              <div
                key={item.id}
                className="group relative rounded-card overflow-hidden border border-border bg-surface cursor-pointer"
              >
                <div className={`w-full ${item.aspect} overflow-hidden`}>
                  <img
                    src={item.url}
                    alt={item.caption}
                    loading="lazy"
                    className="w-full h-full object-cover filter contrast-115 grayscale-[30%] group-hover:scale-105 group-hover:grayscale-0 transition-all duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#10110F] via-transparent to-transparent opacity-0 group-hover:opacity-90 transition-opacity duration-300" />
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  <span className="label-mono text-[10px] text-accent block mb-1">
                    {item.tag}
                  </span>
                  <p className="font-mono text-xs text-[#F1F0E9] font-medium tracking-wider">
                    {item.caption}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Column 2 */}
          <div ref={col2Ref} className="flex flex-col gap-6 md:gap-8">
            {col2.map(item => (
              <div
                key={item.id}
                className="group relative rounded-card overflow-hidden border border-border bg-surface cursor-pointer"
              >
                <div className={`w-full ${item.aspect} overflow-hidden`}>
                  <img
                    src={item.url}
                    alt={item.caption}
                    loading="lazy"
                    className="w-full h-full object-cover filter contrast-115 grayscale-[30%] group-hover:scale-105 group-hover:grayscale-0 transition-all duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#10110F] via-transparent to-transparent opacity-0 group-hover:opacity-90 transition-opacity duration-300" />
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  <span className="label-mono text-[10px] text-accent block mb-1">
                    {item.tag}
                  </span>
                  <p className="font-mono text-xs text-[#F1F0E9] font-medium tracking-wider">
                    {item.caption}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Column 3 */}
          <div ref={col3Ref} className="flex flex-col gap-6 md:gap-8">
            {col3.map(item => (
              <div
                key={item.id}
                className="group relative rounded-card overflow-hidden border border-border bg-surface cursor-pointer"
              >
                <div className={`w-full ${item.aspect} overflow-hidden`}>
                  <img
                    src={item.url}
                    alt={item.caption}
                    loading="lazy"
                    className="w-full h-full object-cover filter contrast-115 grayscale-[30%] group-hover:scale-105 group-hover:grayscale-0 transition-all duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#10110F] via-transparent to-transparent opacity-0 group-hover:opacity-90 transition-opacity duration-300" />
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  <span className="label-mono text-[10px] text-accent block mb-1">
                    {item.tag}
                  </span>
                  <p className="font-mono text-xs text-[#F1F0E9] font-medium tracking-wider">
                    {item.caption}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
