import React from 'react';
import { House } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

export default function HomeButton() {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <AnimatePresence>
      {!isHome && (
        <motion.a
          href="/"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="fixed bottom-6 left-6 z-50 flex items-center gap-2 px-4 py-2.5 rounded-full border border-primary/20 bg-card/90 backdrop-blur-sm text-sm font-medium text-foreground/70 hover:text-primary hover:border-primary/40 transition-all"
          style={{ boxShadow: '0 0 15px hsl(330 100% 65% / 0.1)' }}
        >
          <House className="w-4 h-4" style={{ filter: 'drop-shadow(0 0 4px hsl(330 100% 65% / 0.3))' }} />
          Home
        </motion.a>
      )}
    </AnimatePresence>
  );
}