// Converts image to various formats using Canvas API

function resizeImage(dataUrl, size) {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');

    const img = new Image();
    img.onload = () => {
      // Clear with transparency
      ctx.clearRect(0, 0, size, size);

      // Calculate aspect-fill (center crop to square)
      const srcAspect = img.width / img.height;
      let sx = 0, sy = 0, sw = img.width, sh = img.height;
      if (srcAspect > 1) {
        sw = img.height;
        sx = (img.width - sw) / 2;
      } else if (srcAspect < 1) {
        sh = img.width;
        sy = (img.height - sh) / 2;
      }

      ctx.drawImage(img, sx, sy, sw, sh, 0, 0, size, size);
      resolve(canvas);
    };
    img.src = dataUrl;
  });
}

function canvasToBlob(canvas, mimeType, quality) {
  return new Promise((resolve) => {
    canvas.toBlob((blob) => resolve(blob), mimeType, quality);
  });
}

// Creates a valid ICO file from a canvas
function canvasToIcoBlob(canvas) {
  const size = canvas.width;
  const ctx = canvas.getContext('2d');
  const imageData = ctx.getImageData(0, 0, size, size);
  const pixels = imageData.data;

  // BMP info header size
  const bmpInfoHeaderSize = 40;
  // Pixel data: BGRA format
  const pixelDataSize = size * size * 4;
  // AND mask: 1 bit per pixel, rows padded to 4 bytes
  const andMaskRowSize = Math.ceil(size / 32) * 4;
  const andMaskSize = andMaskRowSize * size;

  const bmpSize = bmpInfoHeaderSize + pixelDataSize + andMaskSize;

  // ICO header: 6 bytes
  // ICO entry: 16 bytes
  const headerSize = 6 + 16;
  const fileSize = headerSize + bmpSize;

  const buffer = new ArrayBuffer(fileSize);
  const view = new DataView(buffer);

  // ICO header
  view.setUint16(0, 0, true); // reserved
  view.setUint16(2, 1, true); // type: icon
  view.setUint16(4, 1, true); // count: 1

  // ICO entry
  view.setUint8(6, size >= 256 ? 0 : size);  // width
  view.setUint8(7, size >= 256 ? 0 : size);  // height
  view.setUint8(8, 0);  // color count
  view.setUint8(9, 0);  // reserved
  view.setUint16(10, 1, true); // planes
  view.setUint16(12, 32, true); // bits per pixel
  view.setUint32(14, bmpSize, true); // size of bmp data
  view.setUint32(18, headerSize, true); // offset

  // BMP info header
  let offset = headerSize;
  view.setUint32(offset, bmpInfoHeaderSize, true); offset += 4;
  view.setInt32(offset, size, true); offset += 4;
  view.setInt32(offset, size * 2, true); offset += 4; // height is doubled for ICO
  view.setUint16(offset, 1, true); offset += 2; // planes
  view.setUint16(offset, 32, true); offset += 2; // bits per pixel
  view.setUint32(offset, 0, true); offset += 4; // compression
  view.setUint32(offset, pixelDataSize + andMaskSize, true); offset += 4;
  view.setInt32(offset, 0, true); offset += 4; // x ppi
  view.setInt32(offset, 0, true); offset += 4; // y ppi
  view.setUint32(offset, 0, true); offset += 4; // colors used
  view.setUint32(offset, 0, true); offset += 4; // important colors

  // Pixel data (bottom-up, BGRA)
  for (let y = size - 1; y >= 0; y--) {
    for (let x = 0; x < size; x++) {
      const srcIdx = (y * size + x) * 4;
      view.setUint8(offset++, pixels[srcIdx + 2]); // B
      view.setUint8(offset++, pixels[srcIdx + 1]); // G
      view.setUint8(offset++, pixels[srcIdx + 0]); // R
      view.setUint8(offset++, pixels[srcIdx + 3]); // A
    }
  }

  // AND mask (all zeros = fully opaque, alpha channel handles transparency)
  for (let i = 0; i < andMaskSize; i++) {
    view.setUint8(offset++, 0);
  }

  return new Blob([buffer], { type: 'image/x-icon' });
}

export async function convertImage(dataUrl, formatConfig) {
  const { id, size, type } = formatConfig;
  const canvas = await resizeImage(dataUrl, size);

  let blob;
  let preview;
  let fileName;

  if (type === 'ico') {
    blob = canvasToIcoBlob(canvas);
    fileName = `favicon-${size}x${size}.ico`;
    preview = canvas.toDataURL('image/png');
  } else if (type === 'png') {
    blob = await canvasToBlob(canvas, 'image/png');
    fileName = `icon-${size}x${size}.png`;
    preview = canvas.toDataURL('image/png');
  } else if (type === 'jpg') {
    // Fill transparent areas with white for JPG
    const jpgCanvas = document.createElement('canvas');
    jpgCanvas.width = size;
    jpgCanvas.height = size;
    const ctx = jpgCanvas.getContext('2d');
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, size, size);
    ctx.drawImage(canvas, 0, 0);
    blob = await canvasToBlob(jpgCanvas, 'image/jpeg', 0.92);
    fileName = `icon-${size}x${size}.jpg`;
    preview = jpgCanvas.toDataURL('image/jpeg');
  } else if (type === 'webp') {
    blob = await canvasToBlob(canvas, 'image/webp', 0.92);
    fileName = `icon-${size}x${size}.webp`;
    preview = canvas.toDataURL('image/webp');
  } else if (type === 'bmp') {
    // BMP via canvas (most browsers support it)
    blob = await canvasToBlob(canvas, 'image/bmp') || await canvasToBlob(canvas, 'image/png');
    fileName = `icon-${size}x${size}.bmp`;
    preview = canvas.toDataURL('image/png');
  }

  return {
    id,
    name: formatConfig.name,
    fileName,
    size,
    type,
    blob,
    preview
  };
}

export function downloadBlob(blob, fileName) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}