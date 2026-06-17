import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Download, Package, Loader2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import ConvertedItem from './ConvertedItem';

export default function ResultsPanel({ results, onDownloadSingle, onDownloadZip }) {
  const [isZipping, setIsZipping] = useState(false);

  const handleZip = async () => {
    setIsZipping(true);
    await onDownloadZip();
    setIsZipping(false);
  };

  if (!results.length) return null;

  const groupedResults = {};
  results.forEach(r => {
    const key = r.type.toUpperCase();
    if (!groupedResults[key]) groupedResults[key] = [];
    groupedResults[key].push(r);
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h3 className="text-sm font-semibold text-primary/80 uppercase tracking-wider" style={{ textShadow: '0 0 10px hsl(330 100% 65% / 0.2)' }}>Converted Files</h3>
          <Badge className="bg-primary/15 text-primary border-0 text-xs" style={{ boxShadow: '0 0 10px hsl(330 100% 65% / 0.25)' }}>{results.length}</Badge>
        </div>
        <Button
          onClick={handleZip}
          disabled={isZipping}
          className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2 rounded-lg"
          style={{ boxShadow: '0 0 20px hsl(330 100% 65% / 0.4), 0 0 40px hsl(330 100% 65% / 0.15)' }}
        >
          {isZipping ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Package className="w-4 h-4" />
          )}
          Download All (.zip)
        </Button>
      </div>

      {Object.entries(groupedResults).map(([type, items]) => (
        <div key={type}>
          <p className="text-xs font-semibold text-primary/50 uppercase tracking-widest mb-2" style={{ textShadow: '0 0 6px hsl(330 100% 65% / 0.1)' }}>{type} Files</p>
          <div className="space-y-1.5">
            {items.map((item, i) => (
              <ConvertedItem key={item.id} item={item} index={i} onDownload={onDownloadSingle} />
            ))}
          </div>
        </div>
      ))}
    </motion.div>
  );
}