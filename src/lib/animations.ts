import type { Variants } from 'framer-motion';

export const CUBIC_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export const FADE_UP_VARIANTS: Variants = {
  hidden: {
    opacity: 0,
    y: 24,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.75,
      ease: CUBIC_EASE,
    },
  },
};

export const STAGGER_CONTAINER: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
};

export const WORD_REVEAL_CONTAINER: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

export const WORD_REVEAL_ITEM: Variants = {
  hidden: {
    y: '105%',
    opacity: 0,
  },
  visible: {
    y: '0%',
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: CUBIC_EASE,
    },
  },
};

export const BUTTON_HOVER_MOTION = {
  whileHover: { scale: 1.01 },
  whileTap: { scale: 0.97 },
  transition: { duration: 0.15, ease: CUBIC_EASE },
};
