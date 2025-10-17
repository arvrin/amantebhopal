// Careful QR Rebranding - Preserves scannability
// Only changes color, preserves exact pixel patterns
// Run: node scripts/careful-rebrand-qr.js

const { createCanvas, loadImage } = require('canvas');
const fs = require('fs');
const path = require('path');

const AMANTE_RED = '#8B1538';
const INPUT_QR = path.join(__dirname, '../qrchimpX1024 (1).png');
const LOGO_PATH = path.join(__dirname, '../public/assets/logos/Primary Logo/PNG/Red Logo.png');
const OUTPUT_DIR = path.join(__dirname, '../public/qr-codes');
const OUTPUT_FILE = 'amante-menu-qr-v2.png';

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

async function carefulRebrand() {
  console.log('🎨 Carefully rebranding QR code...\n');

  try {
    // Load the heart QR code
    const qrImage = await loadImage(INPUT_QR);
    const qrWidth = qrImage.width;
    const qrHeight = qrImage.height;

    // Create canvas with extra space for logo and text
    const FINAL_WIDTH = 1400;
    const FINAL_HEIGHT = 1800;
    const canvas = createCanvas(FINAL_WIDTH, FINAL_HEIGHT);
    const ctx = canvas.getContext('2d');

    // White background
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, FINAL_WIDTH, FINAL_HEIGHT);

    const centerX = FINAL_WIDTH / 2;

    // Add Amante logo at top - PROMINENT SIZE
    let logo;
    try {
      logo = await loadImage(LOGO_PATH);
      const logoHeight = 200;
      const logoAspect = logo.width / logo.height;
      const logoWidth = logoHeight * logoAspect;
      const logoY = 40;
      ctx.drawImage(logo, centerX - logoWidth/2, logoY, logoWidth, logoHeight);
    } catch (err) {
      console.log('⚠️  Logo not found, using text instead');
      ctx.fillStyle = AMANTE_RED;
      ctx.font = 'bold 70px serif';
      ctx.textAlign = 'center';
      ctx.fillText('AMANTE', centerX, 140);
    }

    // Process QR code - VERY CAREFUL COLOR CHANGE
    const tempCanvas = createCanvas(qrWidth, qrHeight);
    const tempCtx = tempCanvas.getContext('2d');
    tempCtx.drawImage(qrImage, 0, 0);

    const imageData = tempCtx.getImageData(0, 0, qrWidth, qrHeight);
    const data = imageData.data;

    // VERY SIMPLE: Just swap black for burgundy, keep everything else the same
    for (let i = 0; i < data.length; i += 4) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      const a = data[i + 3];

      // Skip transparent pixels
      if (a < 200) continue;

      // Calculate brightness
      const brightness = (r + g + b) / 3;

      // If it's dark (less than 50% brightness), make it burgundy
      // Otherwise, make it pure white
      if (brightness < 128) {
        data[i] = 139;     // R
        data[i + 1] = 21;  // G
        data[i + 2] = 56;  // B
        // Keep original alpha
      } else {
        data[i] = 255;     // R
        data[i + 1] = 255; // G
        data[i + 2] = 255; // B
        // Keep original alpha
      }
    }

    tempCtx.putImageData(imageData, 0, 0);

    // Draw recolored QR code - maintain exact size
    const qrDisplaySize = 1100;
    const qrY = 280;

    // Use 'nearest neighbor' scaling to preserve sharp edges
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(tempCanvas, centerX - qrDisplaySize/2, qrY, qrDisplaySize, qrDisplaySize);
    ctx.imageSmoothingEnabled = true;

    // Add "SCAN ME" text at bottom
    const textY = qrY + qrDisplaySize + 120;
    ctx.fillStyle = AMANTE_RED;
    ctx.font = 'bold 90px serif';
    ctx.textAlign = 'center';
    ctx.fillText('SCAN ME', centerX, textY);

    // Save
    const outputPath = path.join(OUTPUT_DIR, OUTPUT_FILE);
    const buffer = canvas.toBuffer('image/png');
    fs.writeFileSync(outputPath, buffer);

    console.log('✅ Carefully rebranded QR code created!');
    console.log(`📁 Saved to: ${outputPath}`);
    console.log(`📐 Size: ${FINAL_WIDTH}×${FINAL_HEIGHT}px`);
    console.log(`🎨 Brand color: ${AMANTE_RED}`);
    console.log(`\n📋 Layout:`);
    console.log(`   ✓ Amante logo (prominent)`);
    console.log(`   ✓ Heart QR (burgundy, exact pattern preserved)`);
    console.log(`   ✓ "SCAN ME" text`);
    console.log(`\n🔍 Used nearest-neighbor scaling to preserve QR sharpness`);
    console.log(`📱 Test with your phone camera!\n`);

  } catch (error) {
    console.error('❌ Error:', error.message);
    console.error(error.stack);
    process.exit(1);
  }
}

carefulRebrand();
