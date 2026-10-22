import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '../components/Button';

interface FinalCTAProps {
  onStartTraining: () => void;
  onExplorePrograms: () => void;
}

export const FinalCTA: React.FC<FinalCTAProps> = ({
  onStartTraining,
  onExplorePrograms,
}) => {
  return (
    <section className="relative py-28 md:py-36 bg-[#253123] text-[#F1F0E9] overflow-hidden">
      {/* Background Subtle Athletic Photography with atmospheric vignette */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <img
          src="https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=85&w=2000&auto=format&fit=crop"
          alt="Barbell plates on lifting platform"
          loading="lazy"
          className="w-full h-full object-cover filter contrast-125 brightness-[0.22] grayscale-[40%]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1E271D] via-[#253123]/90 to-[#1E271D]" />
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#10110F]/30 to-[#10110F]/80" />
      </div>

      <div className="relative z-10 max-w-1440 mx-auto px-6 sm:px-8 text-center">
        <div className="max-w-3xl mx-auto">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 mb-6">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="label-mono text-accent text-xs">JOIN THE CLUB</span>
          </div>

          {/* Oversized Headline */}
          <h2 className="h2-fluid text-[#F1F0E9] tracking-tighter mb-6 font-heading">
            YOUR NEXT REP <br />
            <span className="text-accent underline decoration-accent/40 decoration-4 underline-offset-8">
              STARTS HERE.
            </span>
          </h2>

          {/* Supporting Text */}
          <p className="text-lg sm:text-xl text-[#A1A49A] max-w-xl mx-auto leading-relaxed mb-10 font-normal">
            Set the goal. Follow the plan. Put in the work.
          </p>

          {/* Interactive CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
            <Button
              variant="primary"
              size="lg"
              withArrow
              magnetic
              onClick={onStartTraining}
              className="w-full sm:w-auto min-w-[200px]"
            >
              Start training
            </Button>

            <button
              type="button"
              onClick={onExplorePrograms}
              className="editorial-link font-heading font-semibold text-base text-[#F1F0E9] hover:text-accent transition-colors py-3 px-4 flex items-center gap-2 group"
            >
              <span>Explore programs</span>
              <ArrowRight
                size={16}
                strokeWidth={1.5}
                className="transition-transform group-hover:translate-x-1"
              />
            </button>
          </div>

          {/* Bottom Trust Meta */}
          <div className="mt-12 pt-8 border-t border-[#344332] flex flex-wrap items-center justify-center gap-6 text-xs font-mono text-[#A1A49A]">
            <span>NO PRESSURE 14-DAY TRIAL</span>
            <span>•</span>
            <span>CANCEL ANYTIME</span>
            <span>•</span>
            <span>DIRECT COACHING ACCESS</span>
          </div>
        </div>
      </div>
    </section>
  );
};
