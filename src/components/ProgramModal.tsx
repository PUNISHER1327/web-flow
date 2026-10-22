import React from 'react';
import { X, Check, Clock, Target } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { TrainingProgram } from '../types';
import { Button } from './Button';

interface ProgramModalProps {
  program: TrainingProgram | null;
  onClose: () => void;
  onEnroll: (program: TrainingProgram) => void;
}

export const ProgramModal: React.FC<ProgramModalProps> = ({
  program,
  onClose,
  onEnroll,
}) => {
  if (!program) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#0A0B09]/80 backdrop-blur-md"
        />

        {/* Modal Dialog */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full max-w-2xl bg-surface border border-border rounded-card shadow-2xl overflow-hidden z-10 my-8"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-program-title"
        >
          {/* Header image banner */}
          <div className="relative h-48 sm:h-56 w-full overflow-hidden">
            <img
              src={program.visual}
              alt={program.title}
              className="w-full h-full object-cover filter contrast-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/60 to-transparent" />

            <button
              type="button"
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full bg-[#10110F]/70 text-white hover:bg-[#10110F] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              aria-label="Close program details"
            >
              <X size={18} strokeWidth={1.5} />
            </button>

            <div className="absolute bottom-4 left-6 sm:left-8">
              <span className="label-mono text-accent text-xs">
                PROGRAM {program.number} // {program.difficulty}
              </span>
              <h3 id="modal-program-title" className="font-heading text-2xl sm:text-3xl font-bold text-text-primary">
                {program.title}
              </h3>
            </div>
          </div>

          {/* Modal Body */}
          <div className="p-6 sm:p-8 space-y-6">
            <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-text-muted pb-4 border-b border-border">
              <span className="flex items-center gap-1.5 text-text-primary">
                <Clock size={14} className="text-accent" /> Duration: {program.duration}
              </span>
              <span className="flex items-center gap-1.5 text-text-primary">
                <Target size={14} className="text-accent" /> Focus: {program.focus}
              </span>
            </div>

            <div>
              <h4 className="font-heading font-semibold text-text-primary text-base mb-2">
                Program Architecture
              </h4>
              <p className="text-sm text-text-muted leading-relaxed">
                {program.description}
              </p>
            </div>

            <div>
              <h4 className="font-heading font-semibold text-text-primary text-base mb-3">
                Included Protocols & Benchmarks
              </h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {program.details.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs text-text-primary font-medium">
                    <div className="mt-0.5 p-0.5 rounded-full bg-accent/20 text-accent">
                      <Check size={12} strokeWidth={2.5} />
                    </div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-4 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-text-muted font-mono">
                INCLUDED IN ALL MEMBERSHIP PLANS
              </div>
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <Button variant="secondary" size="md" onClick={onClose} className="w-1/2 sm:w-auto">
                  Close
                </Button>
                <Button
                  variant="primary"
                  size="md"
                  withArrow
                  onClick={() => onEnroll(program)}
                  className="w-1/2 sm:w-auto"
                >
                  Start this plan
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
