import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';
import { HOW_IT_WORKS_STEPS } from '../lib/designTokens';
import { useReducedMotion } from '../hooks/useReducedMotion';

gsap.registerPlugin(ScrollTrigger);

interface HowItWorksProps {
  onExplorePlatform: () => void;
}

export const HowItWorks: React.FC<HowItWorksProps> = ({ onExplorePlatform }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const lineFillRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion || !sectionRef.current) return;

    const steps = sectionRef.current.querySelectorAll('.how-step-item');

    const ctx = gsap.context(() => {
      // Animate vertical accent line filling as user scrolls through section
      if (lineFillRef.current) {
        gsap.fromTo(
          lineFillRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 60%',
              end: 'bottom 80%',
              scrub: true,
            },
          }
        );
      }

      // Track active step for contrast highlight
      steps.forEach((step, idx) => {
        ScrollTrigger.create({
          trigger: step,
          start: 'top 65%',
          end: 'bottom 65%',
          onEnter: () => setActiveStep(idx),
          onEnterBack: () => setActiveStep(idx),
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <section
      id="how-it-works"
      ref={sectionRef}
      className="py-24 md:py-36 bg-surface transition-colors duration-theme border-b border-border"
    >
      <div className="max-w-1440 mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Sticky Heading & Supporting Copy */}
          <div className="lg:col-span-5 lg:sticky lg:top-28">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-accent" />
              <span className="label-mono text-accent text-xs">METHODOLOGY</span>
            </div>

            <h2 className="h2-fluid text-text-primary tracking-tighter mb-4">
              LESS GUESSWORK. <br />
              <span className="text-accent">MORE GOOD WORK.</span>
            </h2>

            <p className="text-base sm:text-lg text-text-muted leading-relaxed font-normal mb-8 max-w-md">
              A simple system for turning a goal into a training routine you can actually follow.
            </p>

            <button
              type="button"
              onClick={onExplorePlatform}
              className="editorial-link font-heading font-semibold text-text-primary hover:text-accent transition-colors flex items-center gap-2 group"
            >
              <span>Explore the platform</span>
              <ArrowRight
                size={16}
                strokeWidth={1.5}
                className="transition-transform group-hover:translate-x-1"
              />
            </button>

            {/* Quick summary box */}
            <div className="mt-12 p-5 rounded-card bg-surface-elevated border border-border hidden lg:block">
              <span className="label-mono text-[10px] text-text-muted">EXECUTION STANDARD</span>
              <p className="text-xs text-text-primary mt-1 font-medium leading-relaxed">
                Consistency is not about heroics; it is about eliminating unforced errors and training with measurable intent every single week.
              </p>
            </div>
          </div>

          {/* Right Column: 4 Vertically Arranged Steps with Vertical Line Fill */}
          <div className="lg:col-span-7 relative pl-8 sm:pl-12">
            {/* Background Grey Line */}
            <div className="absolute left-2.5 sm:left-4 top-4 bottom-8 w-[2px] bg-border origin-top" />

            {/* Animated Filling Lime Line */}
            <div
              ref={lineFillRef}
              className="absolute left-2.5 sm:left-4 top-4 bottom-8 w-[2px] bg-accent origin-top shadow-[0_0_8px_rgba(217,243,106,0.5)]"
              style={{ transform: prefersReducedMotion ? 'scaleY(1)' : 'scaleY(0)' }}
            />

            <div className="space-y-12 sm:space-y-16">
              {HOW_IT_WORKS_STEPS.map((step, idx) => {
                const isActive = activeStep === idx;

                return (
                  <div
                    key={step.number}
                    className={`how-step-item relative transition-all duration-300 ${
                      isActive ? 'opacity-100 translate-x-1' : 'opacity-70'
                    }`}
                  >
                    {/* Node Circle on Line */}
                    <div
                      className={`absolute -left-8 sm:-left-12 top-1 w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                        isActive
                          ? 'border-accent bg-accent text-[#10110F] scale-110 shadow-[0_0_12px_rgba(217,243,106,0.6)]'
                          : 'border-border bg-surface text-text-muted'
                      }`}
                    >
                      <span className="font-mono text-[9px] font-bold">
                        {step.number}
                      </span>
                    </div>

                    {/* Step Card Content */}
                    <div className="p-6 sm:p-8 rounded-card border border-border bg-background transition-colors hover:border-text-muted">
                      <div className="flex items-center justify-between mb-2">
                        <span className="label-mono text-accent text-xs">
                          PHASE // {step.number}
                        </span>
                        {isActive && (
                          <span className="label-mono text-[10px] text-accent px-2 py-0.5 rounded bg-accent/15 border border-accent/30">
                            CURRENT FOCUS
                          </span>
                        )}
                      </div>

                      <h3 className="font-heading text-2xl sm:text-3xl font-bold text-text-primary tracking-tight mb-2">
                        {step.title}
                      </h3>

                      <p className="text-base text-text-primary font-medium leading-relaxed mb-3">
                        {step.description}
                      </p>

                      <p className="text-sm text-text-muted leading-relaxed font-sans">
                        {step.detail}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
