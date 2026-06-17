# Changelog

All notable changes to PHX-IT Converter will be documented in this file.

---

## [1.0.0] — 2026-06-17

### Added
- Initial public release of PHX-IT Converter.
- ICO conversion support (16×16 through 256×256).
- PNG icon export at 7 standard sizes (16×16 through 512×512).
- Apple touch icon generation for all standard iOS sizes.
- Android app icon generation (192×192 and 512×512).
- JPG, WebP, and BMP format support.
- Bulk ZIP download — select multiple formats and download as one archive.
- Drag-and-drop image upload with visual feedback.
- Image preview with dimensions and file size info.
- Click-to-preview modal for each converted icon (200×200 preview).
- Format selector with grouped categories and select-all/clear controls.
- Progress bar during batch conversion.
- Ember and feather particle background animation.
- Rotating satire quotes in footer banner.
- Neon cyberpunk aesthetic — hot pink and teal on deep purple-black.
- Responsive design — works on desktop, tablet, and mobile.
- SEO optimization — structured data, Open Graph, Twitter Cards, meta tags.
- Terms of Service page.
- Privacy Policy page.
- Global floating Home button on sub-pages.
- Google Analytics integration ready (add Measurement ID to enable).
- Client-side architecture — zero server uploads, 100% browser-based processing.
- Custom ICO binary encoding via Canvas API.
- Lightweight ZIP builder using store method (no external ZIP libraries).

### Technical
- Built with React 18, Vite, Tailwind CSS, Framer Motion.
- HTML5 Canvas API for image resizing and format conversion.
- Custom CRC32 checksum implementation for ZIP generation.
- Converted item subscription-based state management.
- Hosted on Base44 platform.

---

## [Unreleased]

### Planned
- SVG source support
- Custom size input for ad-hoc dimensions
- Multi-image batch upload and processing
- Dark/light theme toggle
- Keyboard shortcuts
- PWA offline support with install prompt
- History — save recent conversions locally
- Social share buttons for converted icons