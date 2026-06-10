import React, { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Loader2, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Progress } from '@/components/ui/progress';

import Header from '@/components/converter/Header';
import DropZone from '@/components/converter/DropZone';
import FormatSelector, { FORMAT_GROUPS } from '@/components/converter/FormatSelector';
import ResultsPanel from '@/components/converter/ResultsPanel';
import { convertImage, downloadBlob } from '@/lib/imageConverter';
import { createZip } from '@/lib/zipBuilder';

const ALL_FORMATS = FORMAT_GROUPS.flatMap(g => g.formats);

export default function Home() {
  const [image, setImage] = useState(null);
  const [selectedFormats, setSelectedFormats] = useState(['ico-16', 'ico-32', 'ico-48', 'png-32', 'png-128', 'png-256']);
  const [results, setResults] = useState([]);
  const [isConverting, setIsConverting] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleToggle = useCallback((id) => {
    setSelectedFormats(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  }, []);

  const handleToggleGroup = useCallback((ids, select) => {
    setSelectedFormats(prev => {
      if (select) {
        return [...new Set([...prev, ...ids])];
      }
      return prev.filter(id => !ids.includes(id));
    });
  }, []);

  const handleSelectAll = useCallback(() => {
    setSelectedFormats(ALL_FORMATS.map(f => f.id));
  }, []);

  const handleClearAll = useCallback(() => {
    setSelectedFormats([]);
  }, []);

  const handleConvert = async () => {
    if (!image || selectedFormats.length === 0) return;
    setIsConverting(true);
    setResults([]);
    setProgress(0);

    const formats = ALL_FORMATS.filter(f => selectedFormats.includes(f.id));
    const converted = [];

    for (let i = 0; i < formats.length; i++) {
      const result = await convertImage(image.dataUrl, formats[i]);
      converted.push(result);
      setProgress(Math.round(((i + 1) / formats.length) * 100));
    }

    setResults(converted);
    setIsConverting(false);
  };

  const handleDownloadSingle = (item) => {
    downloadBlob(item.blob, item.fileName);
  };

  const handleDownloadZip = async () => {
    const files = results.map(r => ({ name: r.fileName, blob: r.blob }));
    const zipBlob = await createZip(files);
    downloadBlob(zipBlob, 'phx-it-icons.zip');
  };

  const handleClear = () => {
    setImage(null);
    setResults([]);
    setProgress(0);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Subtle grid background */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.02]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--foreground)) 1px, transparent 0)`,
          backgroundSize: '32px 32px'
        }}
      />

      {/* Ambient glow */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative max-w-3xl mx-auto px-4 py-12 sm:py-16">
        <Header />

        <div className="space-y-8">
          {/* Upload */}
          <DropZone onImageLoad={setImage} currentImage={image} onClear={handleClear} />

          {/* Format Selection */}
          <AnimatePresence>
            {image && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div className="bg-card border border-border rounded-2xl p-6">
                  <FormatSelector
                    selectedFormats={selectedFormats}
                    onToggle={handleToggle}
                    onToggleGroup={handleToggleGroup}
                    onSelectAll={handleSelectAll}
                    onClearAll={handleClearAll}
                  />

                  {/* Convert button */}
                  <div className="mt-8 flex flex-col items-center gap-4">
                    {isConverting && (
                      <div className="w-full">
                        <Progress value={progress} className="h-1.5 bg-muted" />
                        <p className="text-xs text-muted-foreground text-center mt-2">
                          Converting... {progress}%
                        </p>
                      </div>
                    )}
                    <Button
                      onClick={handleConvert}
                      disabled={isConverting || selectedFormats.length === 0}
                      size="lg"
                      className="w-full sm:w-auto bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground rounded-xl gap-2 font-semibold px-10 h-12 shadow-lg shadow-primary/20 transition-all hover:shadow-xl hover:shadow-primary/30"
                    >
                      {isConverting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Converting...
                        </>
                      ) : (
                        <>
                          <Zap className="w-4 h-4" />
                          Convert {selectedFormats.length} Format{selectedFormats.length !== 1 ? 's' : ''}
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Results */}
          <AnimatePresence>
            {results.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-card border border-border rounded-2xl p-6"
              >
                <ResultsPanel
                  results={results}
                  onDownloadSingle={handleDownloadSingle}
                  onDownloadZip={handleDownloadZip}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-16"
        >
          <p className="text-xs text-muted-foreground/50 font-mono tracking-widest">
            PHX-IT CONVERTER · 100% CLIENT-SIDE · NO UPLOADS · YOUR IMAGES STAY PRIVATE
          </p>
        </motion.div>
      </div>
    </div>
  );
}