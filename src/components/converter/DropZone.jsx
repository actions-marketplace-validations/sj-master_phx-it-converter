import React, { useCallback, useState } from 'react';
import { Upload, ImageIcon, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';

export default function DropZone({ onImageLoad, currentImage, onClear }) {
  const [isDragging, setIsDragging] = useState(false);

  const handleFile = useCallback((file) => {
    if (!file || !file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        onImageLoad({ file, dataUrl: e.target.result, width: img.width, height: img.height, name: file.name });
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  }, [onImageLoad]);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    handleFile(file);
  }, [handleFile]);

  const handleDragOver = (e) => { e.preventDefault(); setIsDragging(true); };
  const handleDragLeave = () => setIsDragging(false);

  const handleFileInput = (e) => {
    const file = e.target.files[0];
    handleFile(file);
  };

  return (
    <AnimatePresence mode="wait">
      {!currentImage ? (
        <motion.div
          key="dropzone"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className={`relative border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-300 cursor-pointer group
            ${isDragging
              ? 'border-primary bg-primary/5 scale-[1.02]'
              : 'border-border hover:border-primary/50 hover:bg-muted/30'
            }`}
          onClick={() => document.getElementById('file-input').click()}
        >
          <input id="file-input" type="file" accept="image/*" className="hidden" onChange={handleFileInput} />
          <div className="flex flex-col items-center gap-4">
            <div className={`w-20 h-20 rounded-2xl flex items-center justify-center transition-all duration-300
              ${isDragging ? 'bg-primary/20' : 'bg-muted group-hover:bg-primary/10'}`}>
              <Upload className={`w-8 h-8 transition-colors ${isDragging ? 'text-primary' : 'text-muted-foreground group-hover:text-primary'}`} />
            </div>
            <div>
              <p className="text-lg font-semibold text-foreground">Drop your image here</p>
              <p className="text-sm text-muted-foreground mt-1">or click to browse — PNG, JPG, SVG, BMP, WebP</p>
            </div>
          </div>
          {isDragging && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute inset-0 rounded-2xl bg-primary/5 pointer-events-none"
            />
          )}
        </motion.div>
      ) : (
        <motion.div
          key="preview"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative bg-muted/30 border border-border rounded-2xl p-6"
        >
          <Button
            variant="ghost"
            size="icon"
            onClick={onClear}
            className="absolute top-3 right-3 h-8 w-8 rounded-full bg-background/80 hover:bg-destructive hover:text-destructive-foreground z-10"
          >
            <X className="w-4 h-4" />
          </Button>
          <div className="flex items-center gap-5">
            <div className="w-24 h-24 rounded-xl overflow-hidden bg-background border border-border flex-shrink-0 flex items-center justify-center"
              style={{ backgroundImage: 'repeating-conic-gradient(hsl(var(--muted)) 0% 25%, transparent 0% 50%) 50% / 16px 16px' }}
            >
              <img src={currentImage.dataUrl} alt="Preview" className="max-w-full max-h-full object-contain" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <ImageIcon className="w-4 h-4 text-primary" />
                <p className="font-semibold text-foreground truncate">{currentImage.name}</p>
              </div>
              <p className="text-sm text-muted-foreground">{currentImage.width} × {currentImage.height}px</p>
              <p className="text-xs text-muted-foreground mt-0.5">{(currentImage.file.size / 1024).toFixed(1)} KB</p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}