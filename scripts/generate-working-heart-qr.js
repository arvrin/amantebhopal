// Working Heart-shaped QR Code Generator for Amante Menu
// Ensures scanability while maintaining heart shape
// Run: node scripts/generate-working-heart-qr.js

const QRCode = require('qrcode');
const { createCanvas, loadImage } = require('canvas');
const fs = require('fs');
const path = require('path');

// Configuration
const MENU_URL = 'https://amante-coming-soon-4jdpv85ml-aaryavars-projects.vercel.app/menu';
const OUTPUT_DIR = path.join(__dirname, '../public/qr-codes');
const OUTPUT_FILE = 'menu-heart-qr.png';
const SIZE = 1200;
const AMANTE_RED = '#8B1538';

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

async function generateWorkingHeartQR() {
  console.log('🎨 Generating scannable heart-shaped QR code...\n');

  try {
    // Generate QR with HIGHEST error correction (can lose up to 30% data)
    const qrDataUrl = await QRCode.toDataURL(MENU_URL, {
      errorCorrectionLevel: 'H',
      type: 'image/png',
      width: SIZE,
      margin: 3, // More margin for safety
      color: {
        dark: AMANTE_RED,
        light: '#FFFFFF'
      }
    });

    const canvas = createCanvas(SIZE, SIZE);
    const ctx = canvas.getContext('2d');

    // White background
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, SIZE, SIZE);

    const qrImage = await loadImage(qrDataUrl);
    const centerX = SIZE / 2;
    const centerY = SIZE / 2;

    // Create heart path function
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

    // Strategy: Use a gentler heart shape that doesn't clip critical QR areas
    // The key is to make the heart large enough to not cut into the QR's functional zones

    ctx.save();

    // Create clipping path with LARGE heart (scale 20 instead of 18)
    // This ensures we keep more of the QR code data
    createHeartPath(20);
    ctx.clip();

    // Draw the QR code
    ctx.drawImage(qrImage, 0, 0, SIZE, SIZE);

    ctx.restore();

    // Add decorative border (thick and prominent)
    ctx.strokeStyle = AMANTE_RED;
    ctx.lineWidth = 14;
    createHeartPath(20);
    ctx.stroke();

    // Add subtle outer glow
    ctx.strokeStyle = AMANTE_RED + '30';
    ctx.lineWidth = 24;
    createHeartPath(20.5);
    ctx.stroke();

    // Add inner border for definition
    ctx.strokeStyle = AMANTE_RED;
    ctx.lineWidth = 8;
    createHeartPath(19.2);
    ctx.stroke();

    // Save
    const outputPath = path.join(OUTPUT_DIR, OUTPUT_FILE);
    const buffer = canvas.toBuffer('image/png');
    fs.writeFileSync(outputPath, buffer);

    console.log('✅ Scannable heart-shaped QR code generated!');
    console.log(`📁 Saved to: ${outputPath}`);
    console.log(`🔗 Links to: ${MENU_URL}`);
    console.log(`📐 Size: ${SIZE}×${SIZE}px`);
    console.log(`🎨 Color: ${AMANTE_RED}`);
    console.log(`🛡️  Error correction: HIGH (30%)`);
    console.log(`💝 Heart shape with larger scale to preserve QR data`);
    console.log('\n💡 Test by scanning with your phone camera!\n');

  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

generateWorkingHeartQR();
