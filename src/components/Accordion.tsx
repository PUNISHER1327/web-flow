import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { FAQItem } from '../types';
import { useReducedMotion } from '../hooks/useReducedMotion';

interface AccordionProps {
  items: FAQItem[];
}

export const Accordion: React.FC<AccordionProps> = ({ items }) => {
  const [openId, setOpenId] = useState<string | null>(items[0]?.id || null);
  const prefersReducedMotion = useReducedMotion();

  const handleToggle = (id: string) => {
    setOpenId(prev => (prev === id ? null : id));
  };

  return (
    <div className="w-full divide-y divide-border border-y border-border">
      {items.map((item, index) => {
        const isOpen = openId === item.id;
        const triggerId = `faq-trigger-${item.id}`;
        const panelId = `faq-panel-${item.id}`;

        return (
          <div key={item.id} className="py-2 transition-colors duration-200">
            <h3>
              <button
                id={triggerId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => handleToggle(item.id)}
                className="w-full py-5 text-left flex items-center justify-between gap-4 group focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm"
              >
                <div className="flex items-center gap-4">
                  <span className="font-mono text-xs text-accent font-semibold tracking-widest">
                    0{index + 1}
                  </span>
                  <span className="font-heading text-lg md:text-xl font-semibold text-text-primary group-hover:text-accent transition-colors duration-200">
                    {item.question}
                  </span>
                </div>

                <div
                  className={`flex-shrink-0 w-8 h-8 rounded-full border border-border flex items-center justify-center transition-all duration-300 ${
                    isOpen
                      ? 'bg-accent border-accent text-[#10110F] rotate-45'
                      : 'text-text-primary group-hover:border-text-primary'
                  }`}
                  aria-hidden="true"
                >
                  <Plus size={16} strokeWidth={1.5} />
                </div>
              </button>
            </h3>

            {prefersReducedMotion ? (
              isOpen && (
                <div id={panelId} role="region" aria-labelledby={triggerId} className="pb-6 pl-10 pr-4">
                  <p className="text-text-muted text-base leading-relaxed font-sans">{item.answer}</p>
                </div>
              )
            ) : (
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    id={panelId}
                    role="region"
                    aria-labelledby={triggerId}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{
                      height: 'auto',
                      opacity: 1,
                      transition: {
                        height: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
                        opacity: { duration: 0.25, delay: 0.05 },
                      },
                    }}
                    exit={{
                      height: 0,
                      opacity: 0,
                      transition: {
                        height: { duration: 0.25, ease: [0.22, 1, 0.36, 1] },
                        opacity: { duration: 0.15 },
                      },
                    }}
                    className="overflow-hidden"
                  >
                    <div className="pb-6 pl-10 pr-4">
                      <p className="text-text-muted text-base leading-relaxed font-sans">{item.answer}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            )}
          </div>
        );
      })}
    </div>
  );
};
