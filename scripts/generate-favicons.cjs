const fs = require('node:fs/promises');
const path = require('node:path');
const {createRequire} = require('node:module');
// Reuse the image processor already required by the site's image plugin.
const sharp = createRequire(require.resolve('@docusaurus/plugin-ideal-image'))('sharp');

const directory = path.join(__dirname, '..', 'static');
const source = path.join(directory, 'images/site/RepoPromptLogo_NoBG.png');
const background = '#ffffff';

async function icon(size, artworkSize = size, opaque = false) {
  const artwork = await sharp(source).resize(artworkSize, artworkSize, {fit: 'contain'}).png().toBuffer();
  return sharp({create: {
    width: size, height: size, channels: 4,
    background: opaque ? background : {r: 0, g: 0, b: 0, alpha: 0},
  }}).composite([{input: artwork, gravity: 'centre'}]).png().toBuffer();
}

async function main() {
  // ICO uses uncompressed 32-bit DIB frames for compatibility with older readers.
  const sizes = [16, 32, 48];
  const frames = [];
  for (const size of sizes) {
    const rgba = await sharp(await icon(size)).ensureAlpha().raw().toBuffer();
    const maskBytes = Math.ceil(size / 32) * 4 * size;
    const frame = Buffer.alloc(40 + rgba.length + maskBytes);
    frame.writeUInt32LE(40, 0);
    frame.writeInt32LE(size, 4);
    frame.writeInt32LE(size * 2, 8);
    frame.writeUInt16LE(1, 12);
    frame.writeUInt16LE(32, 14);
    frame.writeUInt32LE(rgba.length + maskBytes, 20);
    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        const input = (y * size + x) * 4;
        const output = 40 + ((size - y - 1) * size + x) * 4;
        frame[output] = rgba[input + 2];
        frame[output + 1] = rgba[input + 1];
        frame[output + 2] = rgba[input];
        frame[output + 3] = rgba[input + 3];
        if (rgba[input + 3] === 0) {
          const maskOffset = 40 + rgba.length + (size - y - 1) * Math.ceil(size / 32) * 4 + Math.floor(x / 8);
          frame[maskOffset] |= 0x80 >> (x % 8);
        }
      }
    }
    frames.push(frame);
  }
  const header = Buffer.alloc(6 + 16 * sizes.length);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(sizes.length, 4);
  let offset = header.length;
  frames.forEach((frame, index) => {
    const entry = 6 + index * 16;
    header[entry] = header[entry + 1] = sizes[index];
    header.writeUInt16LE(1, entry + 4);
    header.writeUInt16LE(32, entry + 6);
    header.writeUInt32LE(frame.length, entry + 8);
    header.writeUInt32LE(offset, entry + 12);
    offset += frame.length;
  });
  await fs.writeFile(path.join(directory, 'favicon.ico'), Buffer.concat([header, ...frames]));
  for (const [name, size, artworkSize, opaque] of [
    ['favicon-96x96.png', 96, 96, false],
    ['apple-touch-icon.png', 180, 160, true],
    ['icon-192.png', 192, 192, false],
    ['icon-512.png', 512, 512, false],
    // A centered 56% square fits entirely inside the maskable 80%-diameter safe circle.
    ['icon-maskable-512.png', 512, 286, true],
  ]) {
    await fs.writeFile(path.join(directory, name), await icon(size, artworkSize, opaque));
  }
  console.log('Generated favicons from RepoPromptLogo_NoBG.png');
}

main().catch((error) => { console.error(error); process.exitCode = 1; });
