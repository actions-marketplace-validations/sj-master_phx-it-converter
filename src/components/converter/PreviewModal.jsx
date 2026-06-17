import React from 'react';
import { X, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

export default function PreviewModal({ item, onClose, onDownload }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="relative bg-card border border-primary/20 rounded-2xl p-6 max-w-sm w-full shadow-2xl"
        style={{ boxShadow: '0 0 40px hsl(330 100% 65% / 0.25), 0 0 80px hsl(330 100% 65% / 0.1)' }}
        onClick={(e) => e.stopPropagation()}
      >
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="absolute top-3 right-3 h-8 w-8 rounded-full hover:bg-primary/10"
        >
          <X className="w-4 h-4" />
        </Button>

        <div className="flex flex-col items-center gap-5">
          <h3 className="text-sm font-semibold text-primary/80 uppercase tracking-wider"
            style={{ textShadow: '0 0 10px hsl(330 100% 65% / 0.2)' }}>
            Preview
          </h3>

          <div
            className="rounded-xl overflow-hidden border-2 border-primary/20 flex items-center justify-center"
            style={{
              width: 200,
              height: 200,
              boxShadow: '0 0 25px hsl(330 100% 65% / 0.15), inset 0 0 20px hsl(330 100% 65% / 0.03)',
              backgroundImage: 'repeating-conic-gradient(hsl(var(--muted)) 0% 25%, transparent 0% 50%) 50% / 12px 12px'
            }}
          >
            {item.preview && (
              <img
                src={item.preview}
                alt={item.fileName}
                className="max-w-full max-h-full object-contain"
                style={{
                  filter: 'drop-shadow(0 0 6px hsl(330 100% 65% / 0.25))'
                }}
              />
            )}
          </div>

          <div className="text-center space-y-1">
            <p className="text-sm font-medium text-foreground">{item.fileName}</p>
            <p className="text-xs text-foreground/50">
              {item.size}×{item.size}px · {item.type.toUpperCase()} · {(item.blob.size / 1024).toFixed(1)} KB
            </p>
          </div>

          <Button
            onClick={() => { onDownload(item); onClose(); }}
            className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2 w-full rounded-lg"
            style={{ boxShadow: '0 0 20px hsl(330 100% 65% / 0.35)' }}
          >
            <Download className="w-4 h-4" />
            Download
          </Button>
        </div>
      </motion.div>
    </motion.div>
  );
}