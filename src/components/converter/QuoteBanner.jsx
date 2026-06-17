import React, { useEffect, useState } from 'react';
import { Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const QUOTES = [
  "i'm not a regular converter, i'm a ✨ neon ✨ converter",
  "your jpeg called — it wants its aura back",
  "we don't resize images, we manifest new dimensions",
  "favicons are just tiny vibes, and our vibes are immaculate",
  "this icon was made with 100% girlblogger energy",
  "sorry i can't hear you over how slay this .ico is",
  "be the favicon you wish to see in the browser tab",
  "pixels? no, these are sparkle particles",
  "converting images like it's brat summer",
  "every icon is a hot girl, every favicon is brat",
  "your website called — it needs a better personality (and favicon)",
  "we put the 'icon' in 'iconic' and the 'o' in 'period'",
  "manifesting high-res aesthetics since 2026",
  "life's too short for boring icons. you're welcome.",
  "this converter runs on monster energy and main character syndrome",
  "your 16x16 has never looked more expensive",
];

export default function QuoteBanner() {
  const [quote, setQuote] = useState(QUOTES[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * QUOTES.length);
      setQuote(QUOTES[randomIndex]);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mt-5 py-3 px-4 rounded-xl border border-primary/10 bg-primary/[0.02]" style={{ boxShadow: '0 0 15px hsl(330 100% 65% / 0.04)' }}>
      <AnimatePresence mode="wait">
        <motion.div
          key={quote}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.4 }}
          className="flex items-center justify-center gap-2"
        >
          <Sparkles className="w-3.5 h-3.5 text-primary/50 flex-shrink-0" style={{ filter: 'drop-shadow(0 0 3px hsl(330 100% 65% / 0.3))' }} />
          <p className="text-xs text-primary/60 italic leading-relaxed" style={{ textShadow: '0 0 6px hsl(330 100% 65% / 0.08)' }}>
            "{quote}"
          </p>
          <Sparkles className="w-3.5 h-3.5 text-primary/50 flex-shrink-0" style={{ filter: 'drop-shadow(0 0 3px hsl(330 100% 65% / 0.3))' }} />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}