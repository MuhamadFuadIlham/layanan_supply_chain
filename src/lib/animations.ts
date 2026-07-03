export const fadeUpVariant = {
  hidden: { opacity: 0, y: 24 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { type: 'spring', stiffness: 100, damping: 20 }
  }
};

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
};

export const hoverCardVariant = {
  hover: { 
    y: -4, 
    scale: 1.01,
    boxShadow: '0 8px 30px rgba(99, 102, 241, 0.12)',
    transition: { type: 'spring', stiffness: 400, damping: 25 }
  }
};
