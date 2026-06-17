import React from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';

const FORMAT_GROUPS = [
  {
    label: 'ICO / Favicon',
    formats: [
      { id: 'ico-16', name: 'ICO 16×16', size: 16, type: 'ico', desc: 'Tiny favicon' },
      { id: 'ico-32', name: 'ICO 32×32', size: 32, type: 'ico', desc: 'Standard favicon' },
      { id: 'ico-48', name: 'ICO 48×48', size: 48, type: 'ico', desc: 'Windows icon' },
      { id: 'ico-64', name: 'ICO 64×64', size: 64, type: 'ico', desc: 'Large favicon' },
      { id: 'ico-128', name: 'ICO 128×128', size: 128, type: 'ico', desc: 'HiDPI favicon' },
      { id: 'ico-256', name: 'ICO 256×256', size: 256, type: 'ico', desc: 'Max ICO' },
    ]
  },
  {
    label: 'PNG Icons',
    formats: [
      { id: 'png-16', name: 'PNG 16×16', size: 16, type: 'png', desc: 'Tiny' },
      { id: 'png-32', name: 'PNG 32×32', size: 32, type: 'png', desc: 'Small' },
      { id: 'png-48', name: 'PNG 48×48', size: 48, type: 'png', desc: 'Medium' },
      { id: 'png-64', name: 'PNG 64×64', size: 64, type: 'png', desc: 'Standard' },
      { id: 'png-128', name: 'PNG 128×128', size: 128, type: 'png', desc: 'Large' },
      { id: 'png-256', name: 'PNG 256×256', size: 256, type: 'png', desc: 'XL' },
      { id: 'png-512', name: 'PNG 512×512', size: 512, type: 'png', desc: 'XXL' },
    ]
  },
  {
    label: 'Apple / Android',
    formats: [
      { id: 'apple-57', name: 'Apple 57×57', size: 57, type: 'png', desc: 'iPhone classic' },
      { id: 'apple-60', name: 'Apple 60×60', size: 60, type: 'png', desc: 'iPhone' },
      { id: 'apple-72', name: 'Apple 72×72', size: 72, type: 'png', desc: 'iPad classic' },
      { id: 'apple-76', name: 'Apple 76×76', size: 76, type: 'png', desc: 'iPad' },
      { id: 'apple-114', name: 'Apple 114×114', size: 114, type: 'png', desc: 'iPhone retina' },
      { id: 'apple-120', name: 'Apple 120×120', size: 120, type: 'png', desc: 'iPhone 6+' },
      { id: 'apple-144', name: 'Apple 144×144', size: 144, type: 'png', desc: 'iPad retina' },
      { id: 'apple-152', name: 'Apple 152×152', size: 152, type: 'png', desc: 'iPad 3+' },
      { id: 'apple-180', name: 'Apple 180×180', size: 180, type: 'png', desc: 'iPhone 6+' },
      { id: 'android-192', name: 'Android 192×192', size: 192, type: 'png', desc: 'Android icon' },
      { id: 'android-512', name: 'Android 512×512', size: 512, type: 'png', desc: 'Play Store' },
    ]
  },
  {
    label: 'Other Formats',
    formats: [
      { id: 'jpg-256', name: 'JPG 256×256', size: 256, type: 'jpg', desc: 'JPEG' },
      { id: 'jpg-512', name: 'JPG 512×512', size: 512, type: 'jpg', desc: 'JPEG large' },
      { id: 'webp-256', name: 'WebP 256×256', size: 256, type: 'webp', desc: 'Modern format' },
      { id: 'webp-512', name: 'WebP 512×512', size: 512, type: 'webp', desc: 'WebP large' },
      { id: 'bmp-64', name: 'BMP 64×64', size: 64, type: 'bmp', desc: 'Bitmap' },
    ]
  }
];

export { FORMAT_GROUPS };

export default function FormatSelector({ selectedFormats, onToggle, onToggleGroup, onSelectAll, onClearAll }) {
  const allIds = FORMAT_GROUPS.flatMap(g => g.formats.map(f => f.id));
  const allSelected = allIds.every(id => selectedFormats.includes(id));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-primary/80 uppercase tracking-wider" style={{ textShadow: '0 0 10px hsl(330 100% 65% / 0.2)' }}>Output Formats</h3>
        <div className="flex gap-2">
          <button onClick={onSelectAll} className="text-xs text-primary hover:text-primary/80 font-medium transition-colors">Select All</button>
          <span className="text-primary/30">·</span>
          <button onClick={onClearAll} className="text-xs text-foreground/40 hover:text-foreground font-medium transition-colors">Clear</button>
        </div>
      </div>

      {FORMAT_GROUPS.map((group, gi) => {
        const groupIds = group.formats.map(f => f.id);
        const groupAllSelected = groupIds.every(id => selectedFormats.includes(id));
        const groupSomeSelected = groupIds.some(id => selectedFormats.includes(id));

        return (
          <motion.div
            key={group.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: gi * 0.05 }}
          >
            <div className="flex items-center gap-3 mb-3">
              <Checkbox
                checked={groupAllSelected}
                onCheckedChange={() => onToggleGroup(groupIds, !groupAllSelected)}
                className="data-[state=checked]:bg-primary data-[state=checked]:border-primary border-primary/30"
              />
              <span className="text-xs font-semibold text-primary/70 uppercase tracking-widest" style={{ textShadow: '0 0 10px hsl(330 100% 65% / 0.2)' }}>{group.label}</span>
              {groupSomeSelected && (
                <Badge variant="secondary" className="text-[10px] px-1.5 py-0 bg-primary/15 text-primary border-0" style={{ boxShadow: '0 0 8px hsl(330 100% 65% / 0.2)' }}>
                  {groupIds.filter(id => selectedFormats.includes(id)).length}
                </Badge>
              )}
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {group.formats.map((fmt) => {
                const isSelected = selectedFormats.includes(fmt.id);
                return (
                  <button
                    key={fmt.id}
                    onClick={() => onToggle(fmt.id)}
                    style={isSelected ? { boxShadow: '0 0 12px hsl(330 100% 65% / 0.2)' } : {}}
                    className={`flex items-center gap-2.5 p-2.5 rounded-lg border text-left transition-all duration-200
                      ${isSelected
                        ? 'border-primary/60 bg-primary/10 ring-1 ring-primary/30'
                        : 'border-primary/10 hover:border-primary/30 hover:bg-primary/[0.04]'
                      }`}
                  >
                    <Checkbox
                      checked={isSelected}
                      className="pointer-events-none data-[state=checked]:bg-primary data-[state=checked]:border-primary border-primary/30"
                    />
                    <div className="min-w-0">
                      <p className={`text-xs font-medium truncate ${isSelected ? 'text-foreground' : 'text-foreground/60'}`}>
                        {fmt.name}
                      </p>
                      <p className="text-[10px] text-foreground/30">{fmt.desc}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}