import React from 'react';
import { SectionHeading } from '../components/SectionHeading';
import { DashboardPreview } from '../components/DashboardPreview';

export const Dashboard: React.FC = () => {
  return (
    <section
      id="dashboard"
      className="py-24 md:py-36 bg-background transition-colors duration-theme border-b border-border"
    >
      <div className="max-w-1440 mx-auto px-6 sm:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <SectionHeading
            eyebrow="PRODUCT EXPERIENCE"
            title="THE TRAINING DASHBOARD."
            description="Designed for the gym floor. Clear numbers, fast logging, and immediate visibility into your physical adaptation."
            className="mb-0 md:mb-0"
          />

          <div className="flex items-center gap-3">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-accent animate-pulse" />
            <span className="label-mono text-xs text-text-primary">
              PLATFORM PREVIEW
            </span>
          </div>
        </div>

        {/* Interactive Dashboard Application Preview */}
        <DashboardPreview />
      </div>
    </section>
  );
};
