import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from '../hooks/useReducedMotion';

gsap.registerPlugin(ScrollTrigger);

export const Manifesto: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textContainerRef = useRef<HTMLParagraphElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const manifestoText =
    "Some days you'll feel unstoppable. Other days, showing up will be the hardest part. Build a routine that works on both. Train with intention, measure your progress, and let the work add up.";

  const words = manifestoText.split(' ');

  useEffect(() => {
    if (prefersReducedMotion || !containerRef.current || !textContainerRef.current) return;

    const wordSpans = textContainerRef.current.querySelectorAll('.manifesto-word');

    const ctx = gsap.context(() => {
      gsap.fromTo(
        wordSpans,
        {
          opacity: 0.18,
          color: 'var(--color-text-muted)',
        },
        {
          opacity: 1,
          color: 'var(--color-text-primary)',
          stagger: 0.05,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 75%',
            end: 'bottom 45%',
            scrub: 0.8,
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <section
      id="manifesto"
      ref={containerRef}
      className="relative py-28 md:py-36 bg-background text-text-primary overflow-hidden transition-colors duration-theme"
    >
      <div className="max-w-1440 mx-auto px-6 sm:px-8">
        {/* Editorial Top Badge */}
        <div className="flex items-center justify-between pb-8 border-b border-border mb-12 md:mb-16">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-accent" />
            <span className="label-mono text-accent text-xs">
              THE IRONVAULT STANDARD / 001
            </span>
          </div>

          <span className="label-mono text-text-muted text-[11px] hidden sm:inline-block">
            TRAINING PHILOSOPHY
          </span>
        </div>

        {/* Oversized Headline */}
        <div className="max-w-5xl mb-12 md:mb-16">
          <h2 className="h2-fluid text-text-primary tracking-tighter leading-tight font-heading">
            YOU DON'T NEED MORE MOTIVATION.{' '}
            <span className="text-accent underline decoration-accent/30 decoration-2 underline-offset-8">
              YOU NEED A PLAN.
            </span>
          </h2>
        </div>

        {/* Progressive Scroll-Scrubbed Text Block */}
        <div className="max-w-4xl">
          <p
            ref={textContainerRef}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-heading font-medium tracking-tight leading-snug"
          >
            {words.map((word, idx) => (
              <span
                key={idx}
                className={`manifesto-word inline-block mr-[0.25em] transition-colors ${
                  prefersReducedMotion ? 'opacity-100 text-text-primary' : 'opacity-20 text-text-muted'
                }`}
              >
                {word}
              </span>
            ))}
          </p>
        </div>

        {/* Minimal Signature / Bottom detail */}
        <div className="mt-16 pt-8 border-t border-border flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs font-mono text-text-muted gap-4">
          <div className="flex items-center gap-4">
            <span>METHOD // PROGRESSIVE OVERLOAD</span>
            <span>•</span>
            <span>PERIODIZATION // WAVE LOADED</span>
          </div>
          <div>
            DOCUMENTED ADAPTATION PROTOCOL
          </div>
        </div>
      </div>
    </section>
  );
};
