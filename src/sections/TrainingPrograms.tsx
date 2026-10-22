import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { SectionHeading } from '../components/SectionHeading';
import { ProgramCard } from '../components/ProgramCard';
import { TRAINING_PROGRAMS } from '../lib/designTokens';
import type { TrainingProgram } from '../types';
import { useReducedMotion } from '../hooks/useReducedMotion';

gsap.registerPlugin(ScrollTrigger);

interface TrainingProgramsProps {
  onSelectProgram: (program: TrainingProgram) => void;
}

export const TrainingPrograms: React.FC<TrainingProgramsProps> = ({
  onSelectProgram,
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [mobileIndex, setMobileIndex] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion || isMobile || !sectionRef.current || !trackRef.current) return;

    const section = sectionRef.current;
    const track = trackRef.current;

    const ctx = gsap.context(() => {
      // Calculate how far the track needs to translate
      const getScrollAmount = () => {
        return track.scrollWidth - window.innerWidth + 96;
      };

      gsap.to(track, {
        x: () => -getScrollAmount(),
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          pin: true,
          scrub: 0.9,
          start: 'top 80px',
          end: () => `+=${getScrollAmount()}`,
          invalidateOnRefresh: true,
        },
      });
    }, section);

    return () => ctx.revert();
  }, [prefersReducedMotion, isMobile]);

  const handlePrev = () => {
    setMobileIndex(prev => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setMobileIndex(prev => Math.min(TRAINING_PROGRAMS.length - 1, prev + 1));
  };

  return (
    <section
      id="programs"
      ref={sectionRef}
      className="py-24 md:py-32 bg-background overflow-hidden transition-colors duration-theme border-b border-border"
    >
      <div className="max-w-1440 mx-auto px-6 sm:px-8 mb-8 md:mb-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <SectionHeading
            eyebrow="PERIODIZED CURRICULUM"
            title="FIND YOUR TRAINING STYLE."
            description="Different goals. Different methods. One standard: show up and do the work."
            className="mb-0 md:mb-0"
          />

          {/* Desktop scroll hint or Mobile Controls */}
          {isMobile ? (
            <div className="flex items-center gap-3">
              <span className="label-mono text-xs text-text-muted">
                {mobileIndex + 1} / {TRAINING_PROGRAMS.length}
              </span>
              <button
                type="button"
                onClick={handlePrev}
                disabled={mobileIndex === 0}
                className="p-2.5 rounded-btn border border-border bg-surface text-text-primary disabled:opacity-40 hover:border-accent transition-colors"
                aria-label="Previous training program"
              >
                <ChevronLeft size={18} strokeWidth={1.5} />
              </button>
              <button
                type="button"
                onClick={handleNext}
                disabled={mobileIndex === TRAINING_PROGRAMS.length - 1}
                className="p-2.5 rounded-btn border border-border bg-surface text-text-primary disabled:opacity-40 hover:border-accent transition-colors"
                aria-label="Next training program"
              >
                <ChevronRight size={18} strokeWidth={1.5} />
              </button>
            </div>
          ) : (
            <div className="hidden lg:flex items-center gap-2 text-xs font-mono text-text-muted pb-2">
              <span className="w-2 h-2 rounded-full bg-accent" />
              <span>HORIZONTAL SCROLL CATALOGUE // PINNED</span>
            </div>
          )}
        </div>
      </div>

      {/* Program Showcase: Pinned Track on Desktop / Swipeable on Mobile */}
      {isMobile ? (
        <div className="px-6 sm:px-8">
          <div className="w-full flex justify-center">
            <ProgramCard
              program={TRAINING_PROGRAMS[mobileIndex]}
              onSelect={onSelectProgram}
            />
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center items-center gap-2 mt-6">
            {TRAINING_PROGRAMS.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setMobileIndex(idx)}
                className={`h-2 rounded-full transition-all ${
                  mobileIndex === idx ? 'w-6 bg-accent' : 'w-2 bg-border'
                }`}
                aria-label={`Go to program ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="w-full pl-6 sm:pl-8 lg:pl-[max(2rem,calc((100vw-1440px)/2+2rem))]">
          <div
            ref={trackRef}
            className="flex items-center gap-6 md:gap-8 will-change-transform"
          >
            {TRAINING_PROGRAMS.map(program => (
              <ProgramCard
                key={program.id}
                program={program}
                onSelect={onSelectProgram}
              />
            ))}

            {/* Ending Summary Card */}
            <div className="flex-shrink-0 w-[300px] h-[520px] md:h-[580px] rounded-card border-2 border-dashed border-border bg-surface-elevated/50 p-8 flex flex-col justify-between">
              <span className="label-mono text-accent text-xs">MORE IN DEVELOPMENT</span>
              <div>
                <h4 className="font-heading text-2xl font-bold text-text-primary mb-2">
                  CUSTOM TRACKS
                </h4>
                <p className="text-xs text-text-muted leading-relaxed">
                  Athletes can import custom wave-loading cycles and calibrate accessory blocks directly with our training director.
                </p>
              </div>
              <div className="label-mono text-[10px] text-text-muted">
                IRONVAULT LABS // 2026
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
