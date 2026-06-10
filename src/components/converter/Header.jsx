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
      <div className="inline-flex items-center gap-3 mb-4">
        <div className="relative">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg shadow-primary/20">
            <Flame className="w-6 h-6 text-primary-foreground" />
          </div>
          <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 blur-lg -z-10" />
        </div>
        <div className="text-left">
          <h1 className="text-2xl font-extrabold tracking-tight text-foreground">
            PHX-IT <span className="text-primary">Converter</span>
          </h1>
          <p className="text-[11px] font-mono text-muted-foreground tracking-widest uppercase">ICO · Favicon · Icon · Photo</p>
        </div>
      </div>
      <p className="text-sm text-muted-foreground max-w-md mx-auto leading-relaxed">
        Convert any image to ICO, favicons, Apple/Android icons, and more — download individually or as a ZIP package.
      </p>
    </motion.div>
  );
}