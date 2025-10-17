// Rebrand QRChimp Heart QR Code
// Recolors the heart QR to Amante burgundy, adds logo and "SCAN ME" text
// Run: node scripts/rebrand-qrchimp.js

const { createCanvas, loadImage } = require('canvas');
const fs = require('fs');
const path = require('path');

const AMANTE_RED = '#8B1538';
const INPUT_QR = path.join(__dirname, '../qrchimpX1024 (1).png');
const LOGO_PATH = path.join(__dirname, '../public/assets/logos/Primary Logo/PNG/Red Logo.png');
const OUTPUT_DIR = path.join(__dirname, '../public/qr-codes');
const OUTPUT_FILE = 'amante-menu-qr.png';

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

async function rebrandQRChimp() {
  console.log('🎨 Rebranding QRChimp heart QR to Amante...\n');

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
      const logoHeight = 200; // Increased from 140 to 200 for prominence
      const logoAspect = logo.width / logo.height;
      const logoWidth = logoHeight * logoAspect;
      const logoY = 40; // Reduced margin
      ctx.drawImage(logo, centerX - logoWidth/2, logoY, logoWidth, logoHeight);
    } catch (err) {
      console.log('⚠️  Logo not found, using text instead');
      ctx.fillStyle = AMANTE_RED;
      ctx.font = 'bold 70px serif';
      ctx.textAlign = 'center';
      ctx.fillText('AMANTE', centerX, 140);
    }

    // Process QR code to change colors from black to Amante burgundy
    const tempCanvas = createCanvas(qrWidth, qrHeight);
    const tempCtx = tempCanvas.getContext('2d');
    tempCtx.drawImage(qrImage, 0, 0);

    const imageData = tempCtx.getImageData(0, 0, qrWidth, qrHeight);
    const data = imageData.data;

    // Change all black/dark pixels to Amante burgundy
    // IMPORTANT: Keep it dark enough for scanning (burgundy is dark enough)
    for (let i = 0; i < data.length; i += 4) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      const a = data[i + 3];

      // Calculate luminance to determine if pixel is "dark" QR module
      const luminance = (0.299 * r + 0.587 * g + 0.114 * b);

      // If pixel is dark (QR code element) - threshold at 128
      if (luminance < 128 && a > 200) {
        data[i] = 139;     // R - Amante burgundy
        data[i + 1] = 21;  // G
        data[i + 2] = 56;  // B
        data[i + 3] = 255; // A (fully opaque)
      } else if (a > 200) {
        // Keep white areas pure white for maximum contrast
        data[i] = 255;
        data[i + 1] = 255;
        data[i + 2] = 255;
        data[i + 3] = 255;
      }
    }

    tempCtx.putImageData(imageData, 0, 0);

    // Draw recolored QR code
    const qrDisplaySize = 1100;
    const qrY = 280;
    ctx.drawImage(tempCanvas, centerX - qrDisplaySize/2, qrY, qrDisplaySize, qrDisplaySize);

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

    console.log('✅ Amante-branded menu QR code created!');
    console.log(`📁 Saved to: ${outputPath}`);
    console.log(`📐 Size: ${FINAL_WIDTH}×${FINAL_HEIGHT}px`);
    console.log(`🎨 Brand color: ${AMANTE_RED}`);
    console.log(`\n📋 Final layout:`);
    console.log(`   ✓ Amante logo at top`);
    console.log(`   ✓ Heart QR code (burgundy) in middle`);
    console.log(`   ✓ "SCAN ME" text at bottom`);
    console.log(`\n💝 Ready for printing and display!\n`);

  } catch (error) {
    console.error('❌ Error:', error.message);
    console.error(error.stack);
    process.exit(1);
  }
}

rebrandQRChimp();
