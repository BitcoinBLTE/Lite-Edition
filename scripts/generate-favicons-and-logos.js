import fs from 'fs';
import { execSync } from 'child_process';

const officialLogoPath = 'public/assets/aistudio/IMG-20261020-WA0000_b0a88430.jpg';

async function run() {
  console.log('Generating crisp multi-format favicons and falcon logos...');

  if (fs.existsSync(officialLogoPath)) {
    // 1. Generate full square 512x512 PNG
    execSync(`convert "${officialLogoPath}" -resize 512x512^ -gravity center -extent 512x512 public/falcon-logo.png`);
    execSync(`cp public/falcon-logo.png public/bitcoin-lite-logo.png`);

    // 2. Generate circular transparent 512x512 PNG
    execSync(`convert public/falcon-logo.png \\( +clone -alpha extract -draw "fill black polygon 0,0 0,512 512,512 512,0 fill white circle 256,256 256,0" \\) -alpha off -compose CopyOpacity -composite public/falcon-circle.png`);

    // 3. Generate multi-resolution favicons from the circular PNG
    execSync(`convert public/falcon-circle.png -resize 192x192 public/apple-touch-icon.png`);
    execSync(`convert public/falcon-circle.png -resize 64x64 public/favicon.png`);
    execSync(`convert public/falcon-circle.png -resize 32x32 public/favicon-32x32.png`);
    execSync(`convert public/falcon-circle.png -resize 32x32 public/favicon.ico`);

    // Ensure src/assets/images directory exists and copy logo
    fs.mkdirSync('src/assets/images', { recursive: true });
    fs.copyFileSync('public/falcon-circle.png', 'src/assets/images/bitcoin_lite_logo.png');

    // 4. Generate SVG favicon wrapping the circular logo
    const circlePngBase64 = fs.readFileSync('public/falcon-circle.png').toString('base64');
    const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <image href="data:image/png;base64,${circlePngBase64}" width="512" height="512" preserveAspectRatio="xMidYMid meet" />
</svg>`;

    fs.writeFileSync('public/favicon.svg', svgContent);
    fs.writeFileSync('public/bitcoin-lite-logo.svg', svgContent);
    fs.writeFileSync('src/assets/images/bitcoin_lite_logo.svg', svgContent);

    console.log('Successfully generated Falcon website logo & favicons: favicon.ico, favicon.png, favicon-32x32.png, favicon.svg, apple-touch-icon.png, falcon-circle.png!');
  } else {
    console.warn('Official logo file not found at:', officialLogoPath);
  }
}

run().catch(console.error);
