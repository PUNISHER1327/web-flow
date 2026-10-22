import React from 'react';
import { ArrowUpRight, Clock, Target } from 'lucide-react';
import type { TrainingProgram } from '../types';

interface ProgramCardProps {
  program: TrainingProgram;
  onSelect?: (program: TrainingProgram) => void;
}

export const ProgramCard: React.FC<ProgramCardProps> = ({ program, onSelect }) => {
  return (
    <div
      data-cursor="view"
      onClick={() => onSelect?.(program)}
      className="group relative flex-shrink-0 w-[300px] sm:w-[360px] md:w-[420px] h-[520px] md:h-[580px] rounded-card overflow-hidden border border-border bg-surface cursor-pointer select-none transition-all duration-300 hover:border-accent hover:shadow-[0_8px_30px_rgba(0,0,0,0.25)]"
    >
      {/* Background Image with Slow Zoom on hover */}
      <div className="absolute inset-0 overflow-hidden">
        <img
          src={program.visual}
          alt={program.title}
          loading="lazy"
          className="w-full h-full object-cover object-center filter grayscale-[35%] contrast-110 brightness-90 transition-transform duration-700 ease-out group-hover:scale-105 group-hover:grayscale-0 group-hover:brightness-95"
        />
        {/* Layered gradients for readability in both light/dark modes */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#10110F] via-[#10110F]/60 to-transparent opacity-90 transition-opacity duration-300 group-hover:opacity-85" />
      </div>

      {/* Card Header Content */}
      <div className="relative z-10 p-6 md:p-8 flex flex-col justify-between h-full text-[#F1F0E9]">
        {/* Top bar: Number & Difficulty */}
        <div className="flex items-center justify-between">
          <span className="font-mono text-xs font-semibold tracking-widest text-accent px-2.5 py-1 rounded bg-[#10110F]/80 border border-border/60">
            PROG // {program.number}
          </span>
          <span className="label-mono text-[10px] text-[#A1A49A] px-2.5 py-1 rounded bg-[#10110F]/60 backdrop-blur-sm border border-border/40">
            {program.difficulty}
          </span>
        </div>

        {/* Bottom Content Area with Slide-Up Hover Details */}
        <div className="flex flex-col">
          {/* Duration & Focus tags */}
          <div className="flex items-center gap-4 text-xs font-mono text-accent mb-2">
            <span className="flex items-center gap-1.5">
              <Clock size={13} strokeWidth={1.5} />
              {program.duration}
            </span>
            <span className="flex items-center gap-1.5">
              <Target size={13} strokeWidth={1.5} />
              {program.focus}
            </span>
          </div>

          <h3 className="font-heading text-2xl md:text-3xl font-bold tracking-tight text-[#F1F0E9] group-hover:text-accent transition-colors duration-200">
            {program.title}
          </h3>

          <p className="mt-2 text-sm text-[#A1A49A] line-clamp-2 leading-relaxed">
            {program.description}
          </p>

          {/* Hidden/Slide-up extra details */}
          <div className="mt-4 pt-4 border-t border-[#30332C] max-h-0 opacity-0 overflow-hidden group-hover:max-h-36 group-hover:opacity-100 transition-all duration-300 ease-out">
            <ul className="text-xs text-[#DFDDD5] space-y-1 mb-3">
              {program.details.slice(0, 2).map((detail, idx) => (
                <li key={idx} className="flex items-center gap-1.5">
                  <span className="w-1 h-1 bg-accent rounded-full" />
                  {detail}
                </li>
              ))}
            </ul>
          </div>

          {/* CTA Link */}
          <div className="mt-4 flex items-center justify-between text-sm font-heading font-semibold text-accent group-hover:text-white transition-colors duration-200">
            <span className="flex items-center gap-1">
              View program
              <ArrowUpRight
                size={16}
                strokeWidth={1.5}
                className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </span>
            <span className="label-mono text-[10px] text-[#A1A49A] group-hover:text-accent transition-colors">
              SYLLABUS
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
