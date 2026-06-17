import React, { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Loader2, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Progress } from '@/components/ui/progress';

import Header from '@/components/converter/Header';
import DropZone from '@/components/converter/DropZone';
import FormatSelector, { FORMAT_GROUPS } from '@/components/converter/FormatSelector';
import ResultsPanel from '@/components/converter/ResultsPanel';
import QuoteBanner from '@/components/converter/QuoteBanner';
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
    <div className="min-h-screen bg-background overflow-hidden">
      {/* Grid background */}
      <div className="fixed inset-0 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, hsl(330 100% 65% / 0.07) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}
      />

      {/* Ambient neon glows */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, hsl(330 100% 65% / 0.07) 0%, transparent 70%)', filter: 'blur(60px)' }} />
      <div className="fixed bottom-0 left-1/4 w-[600px] h-[300px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, hsl(330 100% 65% / 0.05) 0%, transparent 70%)', filter: 'blur(80px)' }} />
      <div className="fixed top-1/3 right-0 w-[500px] h-[300px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, hsl(175 100% 55% / 0.035) 0%, transparent 70%)', filter: 'blur(80px)' }} />

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
                <div className="bg-card border border-primary/15 rounded-xl p-6" style={{ boxShadow: '0 0 25px hsl(330 100% 65% / 0.07)' }}>
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
                        <Progress value={progress} className="h-1.5 bg-primary/10 [&>div]:bg-primary" style={{ boxShadow: '0 0 8px hsl(330 100% 65% / 0.12)' }} />
                        <p className="text-xs text-primary/60 text-center mt-2">
                          Converting... {progress}%
                        </p>
                      </div>
                    )}
                    <Button
                      onClick={handleConvert}
                      disabled={isConverting || selectedFormats.length === 0}
                      size="lg"
                      style={{ boxShadow: '0 0 25px hsl(330 100% 65% / 0.5), 0 0 50px hsl(330 100% 65% / 0.18), 0 0 20px hsl(175 100% 55% / 0.25)' }}
                      className="w-full sm:w-auto bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground rounded-lg gap-2 font-bold px-10 h-12 transition-all hover:scale-[1.02]"
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
                className="bg-card border border-primary/20 rounded-xl p-6" style={{ boxShadow: '0 0 30px hsl(330 100% 65% / 0.1)' }}
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
          className="text-center mt-16 pt-8 border-t border-primary/10"
        >
          <p className="text-[10px] text-primary/20 font-mono tracking-[0.2em] mb-3" style={{ textShadow: '0 0 8px hsl(330 100% 65% / 0.12)' }}>
            PHX-IT CONVERTER · 100% CLIENT-SIDE · NO UPLOADS · YOUR IMAGES STAY PRIVATE
          </p>

          <div className="space-y-2">
            <p className="text-sm font-semibold text-foreground/70">
              &copy; PHX-IT Phoenix
              <span className="mx-2 text-primary/30">|</span>
              <span className="text-foreground/50 font-normal">Software &amp; Automation by Skyler Jones</span>
            </p>
            <p className="text-xs text-foreground/35 italic max-w-lg mx-auto leading-relaxed">
              Empowering creators, builders, and digital workflows.
            </p>
            <a
              href="https://buymeacoffee.com/sj.master"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 mt-3 px-4 py-2 rounded-full border border-primary/20 bg-primary/5 text-xs font-medium text-primary/80 hover:bg-primary/10 hover:border-primary/40 transition-all"
              style={{ boxShadow: '0 0 12px hsl(330 100% 65% / 0.1)' }}
            >
              &#9749; Sponsor development or buy me a coffee
            </a>
          </div>

          {/* Quote generator */}
          <QuoteBanner />
        </motion.div>
      </div>
    </div>
  );
}