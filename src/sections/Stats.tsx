import React from 'react';
import { StatItem } from '../components/StatItem';
import { STATS_DATA } from '../lib/designTokens';

export const Stats: React.FC = () => {
  return (
    <section
      aria-label="Platform Performance Statistics"
      className="w-full bg-surface border-y border-border transition-colors duration-theme"
    >
      <div className="max-w-1440 mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {STATS_DATA.map((stat, index) => (
            <StatItem key={index} stat={stat} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};
