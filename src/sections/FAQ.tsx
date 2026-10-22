import React from 'react';
import { SectionHeading } from '../components/SectionHeading';
import { Accordion } from '../components/Accordion';
import { FAQ_ITEMS } from '../lib/designTokens';

export const FAQ: React.FC = () => {
  return (
    <section
      id="faq"
      className="py-24 md:py-36 bg-surface transition-colors duration-theme border-b border-border"
    >
      <div className="max-w-1440 mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Heading & Support Context */}
          <div className="lg:col-span-5 lg:sticky lg:top-28">
            <SectionHeading
              eyebrow="FREQUENTLY ASKED"
              title="CLARITY BEFORE THE WORK."
              description="Transparent answers regarding program structure, lifting backgrounds, and how the platform integrates with your training."
              className="mb-8"
            />

            <div className="p-6 rounded-card bg-surface-elevated border border-border">
              <span className="label-mono text-accent text-xs">DIRECT ASSISTANCE</span>
              <h4 className="font-heading font-bold text-text-primary text-lg mt-1 mb-2">
                Have specific equipment or injury concerns?
              </h4>
              <p className="text-xs text-text-muted leading-relaxed font-sans mb-4">
                Our support team and training advisory review exercise substitutions and periodization adjustments directly with members.
              </p>
              <a
                href="mailto:training@ironvault.club"
                className="editorial-link text-xs font-mono text-accent"
              >
                CONTACT TRAINING ADVISORY →
              </a>
            </div>
          </div>

          {/* Right Column: 6 Accordions */}
          <div className="lg:col-span-7">
            <Accordion items={FAQ_ITEMS} />
          </div>
        </div>
      </div>
    </section>
  );
};
