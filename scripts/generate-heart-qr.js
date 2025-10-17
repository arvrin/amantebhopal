// Heart-shaped QR Code Generator for Amante Menu
// Run: node scripts/generate-heart-qr.js

const QRCode = require('qrcode');
const { createCanvas, loadImage } = require('canvas');
const fs = require('fs');
const path = require('path');

// Configuration
const MENU_URL = 'https://amante-coming-soon-4jdpv85ml-aaryavars-projects.vercel.app/menu';
const OUTPUT_DIR = path.join(__dirname, '../public/qr-codes');
const OUTPUT_FILE = 'menu-heart-qr.png';
const QR_SIZE = 1200;
const AMANTE_RED = '#8B1538';

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

async function generateHeartShapedQR() {
  console.log('🎨 Generating heart-shaped QR code for Amante Menu...\n');

  try {
    // Generate QR code as data URL
    const qrDataUrl = await QRCode.toDataURL(MENU_URL, {
      errorCorrectionLevel: 'H',
      type: 'image/png',
      width: QR_SIZE,
      margin: 2,
      color: {
        dark: AMANTE_RED,
        light: '#FFFFFF'
      }
    });

    // Create canvas
    const canvas = createCanvas(QR_SIZE, QR_SIZE);
    const ctx = canvas.getContext('2d');

    // Load QR code image
    const qrImage = await loadImage(qrDataUrl);

    // White background
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, QR_SIZE, QR_SIZE);

    const centerX = QR_SIZE / 2;
    const centerY = QR_SIZE / 2;

    // Create proper heart shape using mathematical curve
    function createHeartPath(scale) {
      ctx.beginPath();
      for (let t = 0; t <= 2 * Math.PI; t += 0.01) {
        const x = scale * 16 * Math.pow(Math.sin(t), 3);
        const y = -scale * (13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
        if (t === 0) {
          ctx.moveTo(centerX + x, centerY + y);
        } else {
          ctx.lineTo(centerX + x, centerY + y);
        }
      }
      ctx.closePath();
    }

    // Draw heart mask and clip QR code to it
    ctx.save();
    createHeartPath(18); // Bigger heart - scale factor 18
    ctx.clip();
    ctx.drawImage(qrImage, 0, 0, QR_SIZE, QR_SIZE);
    ctx.restore();

    // Add thick decorative border
    ctx.strokeStyle = AMANTE_RED;
    ctx.lineWidth = 12;
    createHeartPath(18);
    ctx.stroke();

    // Add inner glow effect
    ctx.strokeStyle = AMANTE_RED + '40'; // Semi-transparent
    ctx.lineWidth = 20;
    createHeartPath(17);
    ctx.stroke();

    // Save to file
    const outputPath = path.join(OUTPUT_DIR, OUTPUT_FILE);
    const buffer = canvas.toBuffer('image/png');
    fs.writeFileSync(outputPath, buffer);

    console.log('✅ Heart-shaped QR code generated successfully!');
    console.log(`📁 Saved to: ${outputPath}`);
    console.log(`🔗 Links to: ${MENU_URL}`);
    console.log(`📐 Size: ${QR_SIZE}×${QR_SIZE}px`);
    console.log(`🎨 Color: ${AMANTE_RED} (Amante Burgundy)\n`);
    console.log('💡 Tip: Test scanning with your phone camera!\n');

  } catch (error) {
    console.error('❌ Error generating heart-shaped QR code:', error.message);
    process.exit(1);
  }
}

// Run the generator
generateHeartShapedQR();
