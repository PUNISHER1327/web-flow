import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, CheckCircle2, ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '../components/Button';
import { useReducedMotion } from '../hooks/useReducedMotion';

gsap.registerPlugin(ScrollTrigger);

interface HeroProps {
  onStartTraining: () => void;
  onExplorePrograms: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onStartTraining,
  onExplorePrograms,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const bgImageRef = useRef<HTMLImageElement>(null);
  const midLayerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const headlineWords = ['BUILD', 'A', 'BODY', 'THAT', "DOESN'T", 'QUIT.'];

  useEffect(() => {
    if (prefersReducedMotion || !containerRef.current) return;

    const ctx = gsap.context(() => {
      // Parallax scroll on background image
      if (bgImageRef.current) {
        gsap.to(bgImageRef.current, {
          yPercent: 18,
          scale: 1.08,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        });
      }

      // Parallax scroll on mid-depth overlay
      if (midLayerRef.current) {
        gsap.to(midLayerRef.current, {
          yPercent: -12,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[100svh] w-full flex flex-col justify-between overflow-hidden bg-[#10110F] text-[#F1F0E9] pt-28 pb-10"
    >
      {/* Background Layer: Deep Industrial Gym Architecture */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          ref={bgImageRef}
          src="https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=85&w=2200&auto=format&fit=crop"
          alt="Athlete gripping barbell in high-performance gym"
          fetchPriority="high"
          className="w-full h-[120%] object-cover object-center filter contrast-125 brightness-[0.42] grayscale-[30%] origin-center"
        />

        {/* Cinematic Vignette & Ambient Radial Glow */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#10110F] via-transparent to-[#10110F]/80" />
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#10110F]/40 to-[#10110F] opacity-90" />
      </div>

      {/* Midground Parallax Depth Layer: Ambient Gym Light Accents */}
      <div
        ref={midLayerRef}
        aria-hidden="true"
        className="absolute inset-0 z-1 pointer-events-none"
      >
        <div className="absolute top-1/4 right-[10%] w-96 h-96 bg-accent/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/3 left-[5%] w-80 h-80 bg-[#344332]/30 rounded-full blur-[100px]" />
      </div>

      {/* Foreground Main Content Area */}
      <div className="relative z-10 max-w-1440 mx-auto px-6 sm:px-8 w-full my-auto">
        <div className="max-w-4xl">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-btn bg-[#191B17]/90 border border-[#30332C] backdrop-blur-sm mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-accent animate-ping" />
            <span className="label-mono text-accent text-xs">BUILT FOR THE WORK</span>
            <span className="text-[#30332C]">•</span>
            <span className="label-mono text-[#A1A49A] text-[10px]">EDITION 2026</span>
          </motion.div>

          {/* H1 Headline with Masked Word-by-Word Slide Up */}
          <h1
            ref={headlineRef}
            className="h1-fluid text-[#F1F0E9] tracking-tighter mb-6 flex flex-wrap gap-x-[0.3em] gap-y-[0.05em]"
          >
            {headlineWords.map((word, idx) => (
              <span key={idx} className="overflow-hidden inline-block leading-none py-1">
                <motion.span
                  initial={{ y: '110%', opacity: 0 }}
                  animate={{ y: '0%', opacity: 1 }}
                  transition={{
                    duration: 0.85,
                    delay: 0.12 + idx * 0.08,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className={`inline-block ${
                    word === "DOESN'T" || word === "QUIT."
                      ? 'text-accent underline decoration-accent/40 decoration-4 underline-offset-8'
                      : ''
                  }`}
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </h1>

          {/* Supporting Copy */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="text-base sm:text-lg md:text-xl text-[#A1A49A] max-w-2xl leading-relaxed mb-8 font-normal"
          >
            Train with a plan. Track every rep. See what you're capable of when consistency becomes your standard.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-10"
          >
            <Button
              variant="primary"
              size="lg"
              withArrow
              magnetic
              onClick={onStartTraining}
            >
              Start training
            </Button>

            <button
              type="button"
              onClick={onExplorePrograms}
              className="editorial-link font-heading font-semibold text-sm sm:text-base text-[#F1F0E9] hover:text-accent transition-colors px-4 py-3 rounded-btn flex items-center justify-center gap-2 group"
            >
              <span>Explore programs</span>
              <ArrowRight
                size={16}
                strokeWidth={1.5}
                className="transition-transform duration-200 group-hover:translate-x-1"
              />
            </button>
          </motion.div>

          {/* Proof Strip */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.0 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-6 pt-6 border-t border-[#30332C]/80"
          >
            {[
              'Structured training programs.',
              'Progress tracking.',
              'Coaching built around your goals.',
            ].map((text, i) => (
              <div key={i} className="flex items-center gap-2 text-xs text-[#A1A49A] font-sans">
                <CheckCircle2 size={14} className="text-accent flex-shrink-0" strokeWidth={2} />
                <span>{text}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Bottom Scroll Indicator */}
      <div className="relative z-10 max-w-1440 mx-auto px-6 sm:px-8 w-full flex items-center justify-between text-[#73756F]">
        <div className="flex items-center gap-3">
          <span className="label-mono text-[10px] text-[#A1A49A] tracking-widest">
            SCROLL TO EXPLORE
          </span>
          <div className="w-12 h-[1px] bg-[#30332C]" />
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ChevronDown size={14} className="text-accent" />
          </motion.div>
        </div>

        <div className="hidden sm:flex items-center gap-4 text-[10px] font-mono text-[#73756F]">
          <span>INDEX // 00</span>
          <span>SYSTEM // ACTIVE</span>
        </div>
      </div>
    </section>
  );
};
