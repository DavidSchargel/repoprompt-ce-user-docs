const assert = require('node:assert/strict');
const crypto = require('node:crypto');
const fs = require('node:fs');
const path = require('node:path');
const sharp = require('sharp');

const root = path.join(__dirname, '..');
const directory = path.join(root, 'source-assets/documentation-screenshots');
const manifest = require(path.join(directory, 'restoration-manifest.json'));

(async () => {
  let verified = 0;
  for (const entry of manifest) {
    const source = fs.readFileSync(path.join(directory, entry.source));
    assert.equal(crypto.createHash('sha256').update(source).digest('hex'), entry.sha256, entry.source);
    const destination = path.join(root, entry.destination);
    const metadata = await sharp(destination).metadata();
    assert.equal(metadata.width, entry.restored.width, entry.destination);
    assert.equal(metadata.height, entry.restored.height, entry.destination);
    let expected = sharp(source);
    if (entry.crop) expected = expected.extract(entry.crop);
    const actualPixels = await sharp(destination).ensureAlpha().raw().toBuffer();
    const expectedPixels = await expected.ensureAlpha().raw().toBuffer();
    assert.ok(actualPixels.equals(expectedPixels), `Pixels differ from the native source/crop: ${entry.destination}`);
    verified++;
  }

  const settingsManifest = JSON.parse(fs.readFileSync(path.join(directory, '2026-10-04-settings-manifest.json'), 'utf8'));
  for (const capture of settingsManifest.captures) {
    const sourcePath = path.join(directory, capture.source);
    const source = fs.readFileSync(sourcePath);
    assert.equal(crypto.createHash('sha256').update(source).digest('hex'), capture.archivedSha256, capture.source);
    const sourceMetadata = await sharp(source).metadata();
    assert.equal(sourceMetadata.width, capture.original.width, capture.source);
    assert.equal(sourceMetadata.height, capture.original.height, capture.source);

    for (const mapping of capture.mappings) {
      const destination = path.join(root, mapping.destination);
      const metadata = await sharp(destination).metadata();
      assert.equal(metadata.width, mapping.restored.width, mapping.destination);
      assert.equal(metadata.height, mapping.restored.height, mapping.destination);
      let expected = sharp(source);
      if (mapping.crop) expected = expected.extract(mapping.crop);
      const redactions = (mapping.destinationRedactions || []).filter(redaction => redaction.rect);
      for (const redaction of redactions) {
        const { left, top, width, height } = redaction.rect;
        const overlay = Buffer.from(`<svg width="${width}" height="${height}"><rect width="100%" height="100%" fill="#fff"/></svg>`);
        expected = expected.composite([{ input: overlay, left, top }]);
      }
      const actualPixels = await sharp(destination).ensureAlpha().raw().toBuffer();
      const expectedPixels = await expected.ensureAlpha().raw().toBuffer();
      assert.ok(actualPixels.equals(expectedPixels), `Pixels differ from the documented source/crop: ${mapping.destination}`);
      verified++;
    }
  }
  console.log(`Verified ${verified} restored screenshots: source hashes, dimensions, privacy-preserving crops, and pixels.`);
})().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
