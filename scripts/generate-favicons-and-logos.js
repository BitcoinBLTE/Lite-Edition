import fs from 'fs';
import { execSync } from 'child_process';

const officialLogoPath = 'public/assets/aistudio/IMG-20261020-WA0000_b0a88430.jpg';

async function run() {
  console.log('Generating crisp multi-format favicons from the official website logo...');

  if (fs.existsSync(officialLogoPath)) {
    // 1. Generate high quality PNG and ICO favicons from the official website logo
    execSync(`convert "${officialLogoPath}" -resize 512x512 public/bitcoin-lite-logo.png`);
    execSync(`convert "${officialLogoPath}" -resize 192x192 public/apple-touch-icon.png`);
    execSync(`convert "${officialLogoPath}" -resize 64x64 public/favicon.png`);
    execSync(`convert "${officialLogoPath}" -resize 32x32 public/favicon-32x32.png`);
    execSync(`convert "${officialLogoPath}" -resize 32x32 public/favicon.ico`);

    // Ensure src/assets/images directory exists and copy logo
    fs.mkdirSync('src/assets/images', { recursive: true });
    fs.copyFileSync('public/bitcoin-lite-logo.png', 'src/assets/images/bitcoin_lite_logo.png');

    // 2. Generate SVG favicon wrapping the official logo with circular styling
    const logoBase64 = fs.readFileSync(officialLogoPath).toString('base64');
    const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <defs>
    <clipPath id="coinClip">
      <circle cx="256" cy="256" r="256" />
    </clipPath>
  </defs>
  <image href="data:image/jpeg;base64,${logoBase64}" width="512" height="512" clip-path="url(#coinClip)" preserveAspectRatio="xMidYMid slice" />
</svg>`;

    fs.writeFileSync('public/favicon.svg', svgContent);
    fs.writeFileSync('public/bitcoin-lite-logo.svg', svgContent);
    fs.writeFileSync('src/assets/images/bitcoin_lite_logo.svg', svgContent);

    console.log('Successfully generated website logo favicons: favicon.ico, favicon.png, favicon.svg, apple-touch-icon.png!');
  } else {
    console.warn('Official logo file not found at:', officialLogoPath);
  }
}

run().catch(console.error);
