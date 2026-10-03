const fs = require('node:fs');
const path = require('node:path');
const {engines, packageManager} = require('../package.json');

function verifyVersions(nodeVersion = process.versions.node, userAgent = process.env.npm_config_user_agent) {
  const pnpmVersion = userAgent?.match(/^pnpm\/([^ ]+)(?: |$)/)?.[1];
  const nodePin = fs.readFileSync(path.join(__dirname, '../.node-version'), 'utf8').trim();
  if (!/^26\.\d+\.\d+$/.test(engines.node) || !/^12\.\d+\.\d+$/.test(engines.pnpm) ||
      nodePin !== engines.node || packageManager !== `pnpm@${engines.pnpm}`) {
    throw new Error('Toolchain pins must agree: exact Node 26.x and pnpm 12.x only.');
  }
  if (nodeVersion !== engines.node || pnpmVersion !== engines.pnpm) {
    throw new Error(`Use Node ${engines.node} and pnpm ${engines.pnpm}. Found Node ${nodeVersion}, pnpm ${pnpmVersion || 'unknown'}. Run this check with pnpm run verify:toolchain.`);
  }
  return pnpmVersion;
}

async function main() {
  const pnpmVersion = verifyVersions();
  if (process.argv.includes('--versions-only')) {
    console.log(`Toolchain versions OK: Node ${process.versions.node}, pnpm ${pnpmVersion}`);
    return;
  }
  let sharp;
  let swc;
  try {
    sharp = require('sharp');
    swc = require('@swc/core');
    await sharp({create: {width: 2, height: 2, channels: 3, background: {r: 0, g: 0, b: 0}}}).resize(1, 1).png().toBuffer();
    swc.transformSync('const ready = true;', {jsc: {parser: {syntax: 'ecmascript'}}});
  } catch (error) {
    throw new Error(`Native dependency check failed. Run pnpm run setup:native with the pinned toolchain.\n${error.message}`);
  }
  console.log(`Toolchain OK: Node ${process.versions.node}, pnpm ${pnpmVersion}, Sharp ${sharp.versions.sharp}, libvips ${sharp.versions.vips}, SWC ${swc.version}`);
}

if (require.main === module) {
  main().catch((error) => {
    console.error(error.message);
    process.exitCode = 1;
  });
}

module.exports = {verifyVersions};
