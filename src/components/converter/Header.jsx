import React from 'react';
import { Flame } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Header() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center mb-10"
    >
      <div className="inline-flex items-center gap-4 mb-4">
        <div className="relative">
          <div className="absolute -inset-3 rounded-2xl bg-primary/30 blur-xl animate-pulse" />
          <div className="absolute -inset-6 rounded-2xl bg-accent/20 blur-2xl" />
          <div className="relative w-14 h-14 rounded-2xl bg-background border-2 border-primary flex items-center justify-center"
            style={{ boxShadow: '0 0 30px hsl(190 100% 50% / 0.4), 0 0 60px hsl(190 100% 50% / 0.15), inset 0 0 15px hsl(190 100% 50% / 0.1)' }}
          >
            <Flame className="w-7 h-7 text-primary" style={{ filter: 'drop-shadow(0 0 8px hsl(190 100% 50% / 0.6))' }} />
          </div>
        </div>
        <div className="text-left">
          <h1 className="text-2xl font-black tracking-tight" style={{ textShadow: '0 0 20px hsl(190 100% 50% / 0.5), 0 0 40px hsl(190 100% 50% / 0.2)' }}>
            <span className="text-foreground">PHX-IT </span>
            <span className="bg-gradient-to-r from-primary via-primary to-accent bg-clip-text text-transparent" style={{ filter: 'drop-shadow(0 0 8px hsl(300 100% 55% / 0.5))' }}>
              Converter
            </span>
          </h1>
          <p className="text-[11px] font-mono text-muted-foreground tracking-[0.25em] uppercase">ICO · Favicon · Icon · Photo</p>
        </div>
      </div>
      <p className="text-sm text-foreground/60 max-w-md mx-auto leading-relaxed">
        Convert any image to ICO, favicons, Apple/Android icons, and more — download individually or as a ZIP package.
      </p>
    </motion.div>
  );
}