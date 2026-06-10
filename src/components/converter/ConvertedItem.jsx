import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Download, Check } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ConvertedItem({ item, index, onDownload }) {
  const [downloaded, setDownloaded] = React.useState(false);

  const handleDownload = () => {
    onDownload(item);
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.03 }}
      className="flex items-center justify-between p-3 rounded-xl border border-border bg-card hover:bg-muted/30 transition-colors group"
    >
      <div className="flex items-center gap-3 min-w-0">
        <div
          className="flex-shrink-0 rounded-lg overflow-hidden border border-border flex items-center justify-center"
          style={{
            width: Math.max(32, Math.min(item.size, 48)),
            height: Math.max(32, Math.min(item.size, 48)),
            backgroundImage: 'repeating-conic-gradient(hsl(var(--muted)) 0% 25%, transparent 0% 50%) 50% / 8px 8px'
          }}
        >
          {item.preview && (
            <img
              src={item.preview}
              alt={item.name}
              style={{ width: Math.max(16, Math.min(item.size, 48)), height: Math.max(16, Math.min(item.size, 48)) }}
              className="object-contain"
            />
          )}
        </div>
        <div className="min-w-0">
          <p className="text-sm font-medium text-foreground truncate">{item.fileName}</p>
          <p className="text-xs text-muted-foreground">
            {item.size}×{item.size} · {item.type.toUpperCase()} · {(item.blob.size / 1024).toFixed(1)} KB
          </p>
        </div>
      </div>
      <Button
        size="sm"
        variant={downloaded ? 'default' : 'ghost'}
        onClick={handleDownload}
        className={`flex-shrink-0 transition-all ${downloaded ? 'bg-green-600 hover:bg-green-600 text-white' : 'text-muted-foreground hover:text-primary'}`}
      >
        {downloaded ? <Check className="w-4 h-4" /> : <Download className="w-4 h-4" />}
      </Button>
    </motion.div>
  );
}