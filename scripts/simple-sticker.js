// Simple QR Sticker - Just paste the QR directly without ANY modifications
// Run: node scripts/simple-sticker.js

const { createCanvas, loadImage } = require('canvas');
const fs = require('fs');
const path = require('path');

const AMANTE_RED = '#8B1538';
const AMANTE_GOLD = '#D4AF37';
const INPUT_QR = path.join(__dirname, '../qrchimpX1024 (2).png');
const LOGO_PATH = path.join(__dirname, '../public/assets/logos/Primary Logo/PNG/Red Logo.png');
const OUTPUT_DIR = path.join(__dirname, '../public/qr-codes');
const OUTPUT_FILE = 'amante-qr-sticker-final.png';

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

async function createSimpleSticker() {
  console.log('🎨 Creating simple sticker with exact QR...\n');

  try {
    // Load images
    const qrImage = await loadImage(INPUT_QR);
    const logo = await loadImage(LOGO_PATH);

    // Create canvas - simple square design
    const CANVAS_WIDTH = 2000;
    const CANVAS_HEIGHT = 2800;
    const canvas = createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
    const ctx = canvas.getContext('2d');

    const centerX = CANVAS_WIDTH / 2;

    // Clean white background
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    // MASSIVE LOGO - 50x original size, NO EXTRA MARGINS
    const logoHeight = 1000; // ENORMOUS - 50x larger than base
    const logoAspect = logo.width / logo.height;
    const logoWidth = logoHeight * logoAspect;
    const logoY = 200; // Minimal top margin

    // Draw logo with NO scaling issues
    ctx.drawImage(logo, centerX - logoWidth/2, logoY, logoWidth, logoHeight);

    // Add tagline right below logo - elegant and subtle
    ctx.fillStyle = AMANTE_RED;
    ctx.font = 'italic 42px serif';
    ctx.textAlign = 'center';
    const taglineY = logoY + logoHeight + 30; // Tight spacing
    ctx.fillText('A World of Flavor, Just a Scan Away.', centerX, taglineY);

    // PASTE QR CODE DIRECTLY - NO MODIFICATIONS AT ALL
    const qrOriginalSize = qrImage.width; // Should be 1024
    const qrY = taglineY + 50; // Tight space after tagline

    // CRITICAL: Disable ALL smoothing to preserve exact pixels
    ctx.imageSmoothingEnabled = false;

    // Draw QR at its ORIGINAL size - NO RESIZING, pixel-perfect
    // Use 4-argument version to avoid any accidental scaling
    ctx.drawImage(qrImage, centerX - qrOriginalSize/2, qrY);

    // Re-enable smoothing for other elements
    ctx.imageSmoothingEnabled = true;

    // Add "SCAN ME" text
    const textY = qrY + qrOriginalSize + 150;

    // Banner
    ctx.fillStyle = AMANTE_RED;
    ctx.beginPath();
    ctx.roundRect(centerX - 300, textY - 80, 600, 120, 60);
    ctx.fill();

    // Text
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 80px serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('SCAN ME', centerX, textY - 20);

    // Subtitle
    ctx.fillStyle = AMANTE_RED;
    ctx.font = 'italic 36px serif';
    ctx.fillText('View Our Menu', centerX, textY + 80);

    // Save
    const outputPath = path.join(OUTPUT_DIR, OUTPUT_FILE);
    const buffer = canvas.toBuffer('image/png');
    fs.writeFileSync(outputPath, buffer);

    console.log('✅ Simple sticker created!');
    console.log(`📁 Saved to: ${outputPath}`);
    console.log(`📐 Canvas: ${CANVAS_WIDTH}×${CANVAS_HEIGHT}px`);
    console.log(`📐 Logo: ${logoWidth.toFixed(0)}×${logoHeight}px (MASSIVE)`);
    console.log(`📐 QR Code: ${qrOriginalSize}×${qrOriginalSize}px (ORIGINAL, UNMODIFIED)`);
    console.log(`\n✅ QR code pasted DIRECTLY - no resizing, no processing!`);
    console.log(`📱 Should scan perfectly!\n`);

  } catch (error) {
    console.error('❌ Error:', error.message);
    console.error(error.stack);
    process.exit(1);
  }
}

createSimpleSticker();
