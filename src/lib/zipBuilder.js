// Simple ZIP file builder using raw bytes (no external dependency)
// Supports store method (no compression) which is fine for already-compressed images

function crc32(data) {
  const table = new Uint32Array(256);
  for (let i = 0; i < 256; i++) {
    let c = i;
    for (let j = 0; j < 8; j++) {
      c = (c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1);
    }
    table[i] = c;
  }

  let crc = 0xFFFFFFFF;
  for (let i = 0; i < data.length; i++) {
    crc = table[(crc ^ data[i]) & 0xFF] ^ (crc >>> 8);
  }
  return (crc ^ 0xFFFFFFFF) >>> 0;
}

function dateToDosDT(date) {
  const d = date || new Date();
  const dosDate = ((d.getFullYear() - 1980) << 9) | ((d.getMonth() + 1) << 5) | d.getDate();
  const dosTime = (d.getHours() << 11) | (d.getMinutes() << 5) | (d.getSeconds() >> 1);
  return { dosDate, dosTime };
}

export async function createZip(files) {
  // files: [{name: string, blob: Blob}]
  const entries = [];

  for (const file of files) {
    const arrayBuffer = await file.blob.arrayBuffer();
    const data = new Uint8Array(arrayBuffer);
    entries.push({
      name: file.name,
      data,
      crc: crc32(data),
      size: data.length,
    });
  }

  const { dosDate, dosTime } = dateToDosDT();

  // Calculate total size
  let totalSize = 0;
  for (const entry of entries) {
    totalSize += 30 + entry.name.length + entry.size; // local header + data
    totalSize += 46 + entry.name.length; // central directory entry
  }
  totalSize += 22; // end of central directory

  const buffer = new ArrayBuffer(totalSize);
  const view = new DataView(buffer);
  const uint8 = new Uint8Array(buffer);

  let offset = 0;
  const centralDirEntries = [];

  // Write local file headers + data
  for (const entry of entries) {
    const localHeaderOffset = offset;
    centralDirEntries.push({ entry, localHeaderOffset });

    const nameBytes = new TextEncoder().encode(entry.name);

    // Local file header
    view.setUint32(offset, 0x04034b50, true); offset += 4; // signature
    view.setUint16(offset, 20, true); offset += 2; // version needed
    view.setUint16(offset, 0, true); offset += 2; // flags
    view.setUint16(offset, 0, true); offset += 2; // compression: store
    view.setUint16(offset, dosTime, true); offset += 2;
    view.setUint16(offset, dosDate, true); offset += 2;
    view.setUint32(offset, entry.crc, true); offset += 4;
    view.setUint32(offset, entry.size, true); offset += 4; // compressed
    view.setUint32(offset, entry.size, true); offset += 4; // uncompressed
    view.setUint16(offset, nameBytes.length, true); offset += 2;
    view.setUint16(offset, 0, true); offset += 2; // extra field length

    uint8.set(nameBytes, offset); offset += nameBytes.length;
    uint8.set(entry.data, offset); offset += entry.size;
  }

  const centralDirOffset = offset;

  // Write central directory
  for (const { entry, localHeaderOffset } of centralDirEntries) {
    const nameBytes = new TextEncoder().encode(entry.name);

    view.setUint32(offset, 0x02014b50, true); offset += 4; // signature
    view.setUint16(offset, 20, true); offset += 2; // version made by
    view.setUint16(offset, 20, true); offset += 2; // version needed
    view.setUint16(offset, 0, true); offset += 2; // flags
    view.setUint16(offset, 0, true); offset += 2; // compression
    view.setUint16(offset, dosTime, true); offset += 2;
    view.setUint16(offset, dosDate, true); offset += 2;
    view.setUint32(offset, entry.crc, true); offset += 4;
    view.setUint32(offset, entry.size, true); offset += 4;
    view.setUint32(offset, entry.size, true); offset += 4;
    view.setUint16(offset, nameBytes.length, true); offset += 2;
    view.setUint16(offset, 0, true); offset += 2; // extra
    view.setUint16(offset, 0, true); offset += 2; // comment
    view.setUint16(offset, 0, true); offset += 2; // disk
    view.setUint16(offset, 0, true); offset += 2; // internal attrs
    view.setUint32(offset, 0, true); offset += 4; // external attrs
    view.setUint32(offset, localHeaderOffset, true); offset += 4;

    uint8.set(nameBytes, offset); offset += nameBytes.length;
  }

  const centralDirSize = offset - centralDirOffset;

  // End of central directory
  view.setUint32(offset, 0x06054b50, true); offset += 4;
  view.setUint16(offset, 0, true); offset += 2; // disk number
  view.setUint16(offset, 0, true); offset += 2; // start disk
  view.setUint16(offset, entries.length, true); offset += 2;
  view.setUint16(offset, entries.length, true); offset += 2;
  view.setUint32(offset, centralDirSize, true); offset += 4;
  view.setUint32(offset, centralDirOffset, true); offset += 4;
  view.setUint16(offset, 0, true); offset += 2; // comment length

  return new Blob([buffer], { type: 'application/zip' });
}