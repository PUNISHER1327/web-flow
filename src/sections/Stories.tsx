import React from 'react';
import { Quote } from 'lucide-react';
import { SectionHeading } from '../components/SectionHeading';
import { MEMBER_STORIES } from '../lib/designTokens';

export const Stories: React.FC = () => {
  return (
    <section
      id="stories"
      className="py-24 md:py-36 bg-surface transition-colors duration-theme border-b border-border"
    >
      <div className="max-w-1440 mx-auto px-6 sm:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <SectionHeading
            eyebrow="MEMBER SCENARIOS // 002"
            title="THE WORK SPEAKS."
            description="Real routines built for demanding professions. Configured for consistency, measurable strength, and sustainable progress."
            className="mb-0 md:mb-0"
          />

          <span className="label-mono text-[10px] text-text-muted">
            ILLUSTRATIVE ATHLETE CASE PROFILES
          </span>
        </div>

        {/* Stacked Sticky Card Container */}
        <div className="relative max-w-4xl mx-auto space-y-8 md:space-y-12">
          {MEMBER_STORIES.map((story, idx) => {
            // Compute sticky top offset for stacking effect
            const topOffset = 100 + idx * 24;

            return (
              <div
                key={story.id}
                style={{ top: `${topOffset}px` }}
                className="sticky rounded-card border border-border bg-background p-8 md:p-12 shadow-xl transition-all duration-300 hover:border-accent"
              >
                <div className="flex flex-col md:flex-row gap-8 items-start justify-between">
                  {/* Left: Quote & Attribution */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 rounded-full bg-accent/20 text-accent flex items-center justify-center border border-accent/40">
                        <Quote size={18} strokeWidth={1.5} />
                      </div>
                      <div>
                        <span className="label-mono text-xs text-accent">
                          CASE FILE // 0{idx + 1}
                        </span>
                        <div className="font-mono text-xs text-text-muted">
                          {story.program} • {story.weeksTraining} WEEKS LOGGED
                        </div>
                      </div>
                    </div>

                    <blockquote className="font-heading text-xl sm:text-2xl md:text-3xl font-medium text-text-primary tracking-tight leading-snug mb-8">
                      "{story.quote}"
                    </blockquote>

                    <div className="flex items-center justify-between pt-6 border-t border-border">
                      <div>
                        <h4 className="font-heading font-bold text-lg text-text-primary">
                          {story.name}
                        </h4>
                        <p className="text-xs font-mono text-text-muted mt-0.5">
                          {story.role}
                        </p>
                      </div>

                      <div className="text-right">
                        <span className="label-mono text-[10px] text-text-muted">OUTCOME</span>
                        <div className="font-mono text-xs sm:text-sm font-semibold text-accent">
                          {story.highlight}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right: Portrait Image */}
                  {story.image && (
                    <div className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 rounded-card overflow-hidden flex-shrink-0 border border-border">
                      <img
                        src={story.image}
                        alt={`Portrait of ${story.name}`}
                        loading="lazy"
                        className="w-full h-full object-cover filter grayscale contrast-110"
                      />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
