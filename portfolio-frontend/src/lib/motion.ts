/**
 * Shared Framer Motion variants.
 * Import these instead of defining inline objects so every component
 * uses the exact same timing and feel.
 */

export const VIEWPORT = { once: true, margin: '-80px' };

export const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } },
};

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5, ease: 'easeOut' } },
};

export const fadeScale = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.55, ease: 'easeOut' } },
};

export const slideLeft = {
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.55, ease: 'easeOut' } },
};

export const slideRight = {
  hidden: { opacity: 0, x: 30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.55, ease: 'easeOut' } },
};

/** Wrap a list with this; children get staggered. */
export const staggerContainer = (stagger = 0.1, delayChildren = 0) => ({
  hidden: {},
  visible: {
    transition: { staggerChildren: stagger, delayChildren },
  },
});

/** Single item inside a stagger container. */
export const staggerItem = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};
