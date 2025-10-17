// Simple Heart-shaped QR Code Generator for Amante Menu
// Creates a scannable QR code with heart frame overlay
// Run: node scripts/generate-simple-heart-qr.js

const QRCode = require('qrcode');
const { createCanvas, loadImage } = require('canvas');
const fs = require('fs');
const path = require('path');

// Configuration
const MENU_URL = 'https://amante-coming-soon-4jdpv85ml-aaryavars-projects.vercel.app/menu';
const OUTPUT_DIR = path.join(__dirname, '../public/qr-codes');
const OUTPUT_FILE = 'menu-heart-qr.png';
const CANVAS_SIZE = 1200;
const QR_SIZE = 900; // Smaller QR inside larger canvas
const AMANTE_RED = '#8B1538';

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

async function generateHeartQR() {
  console.log('🎨 Generating heart-framed QR code for Amante Menu...\n');

  try {
    // Generate high error correction QR code
    const qrDataUrl = await QRCode.toDataURL(MENU_URL, {
      errorCorrectionLevel: 'H', // Highest error correction
      type: 'image/png',
      width: QR_SIZE,
      margin: 1,
      color: {
        dark: AMANTE_RED,
        light: '#FFFFFF'
      }
    });

    // Create canvas
    const canvas = createCanvas(CANVAS_SIZE, CANVAS_SIZE);
    const ctx = canvas.getContext('2d');

    // White background
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

    // Load and center the QR code
    const qrImage = await loadImage(qrDataUrl);
    const qrOffset = (CANVAS_SIZE - QR_SIZE) / 2;
    ctx.drawImage(qrImage, qrOffset, qrOffset, QR_SIZE, QR_SIZE);

    // Draw heart frame around QR code
    const centerX = CANVAS_SIZE / 2;
    const centerY = CANVAS_SIZE / 2;

    function drawHeart(scale, lineWidth, strokeStyle, fill = false) {
      ctx.save();
      ctx.translate(centerX, centerY - 80);
      ctx.scale(scale, scale);

      ctx.beginPath();
      for (let t = 0; t <= 2 * Math.PI; t += 0.01) {
        const x = 16 * Math.pow(Math.sin(t), 3);
        const y = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
        if (t === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.closePath();

      if (fill) {
        ctx.fillStyle = strokeStyle;
        ctx.fill();
      } else {
        ctx.strokeStyle = strokeStyle;
        ctx.lineWidth = lineWidth;
        ctx.stroke();
      }

      ctx.restore();
    }

    // Draw outer glow
    drawHeart(24, 30, AMANTE_RED + '20');

    // Draw main border
    drawHeart(23, 15, AMANTE_RED);

    // Draw inner highlight
    drawHeart(22, 8, '#FFFFFF');

    // Add decorative corners (optional - small hearts)
    const cornerSize = 0.15;
    const positions = [
      { x: 100, y: 100 },
      { x: CANVAS_SIZE - 100, y: 100 },
      { x: 100, y: CANVAS_SIZE - 100 },
      { x: CANVAS_SIZE - 100, y: CANVAS_SIZE - 100 }
    ];

    positions.forEach(pos => {
      ctx.save();
      ctx.translate(pos.x, pos.y);
      ctx.scale(cornerSize, cornerSize);

      ctx.beginPath();
      for (let t = 0; t <= 2 * Math.PI; t += 0.01) {
        const x = 16 * Math.pow(Math.sin(t), 3);
        const y = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
        if (t === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.closePath();
      ctx.fillStyle = AMANTE_RED;
      ctx.fill();

      ctx.restore();
    });

    // Save to file
    const outputPath = path.join(OUTPUT_DIR, OUTPUT_FILE);
    const buffer = canvas.toBuffer('image/png');
    fs.writeFileSync(outputPath, buffer);

    console.log('✅ Heart-framed QR code generated successfully!');
    console.log(`📁 Saved to: ${outputPath}`);
    console.log(`🔗 Links to: ${MENU_URL}`);
    console.log(`📐 Canvas size: ${CANVAS_SIZE}×${CANVAS_SIZE}px`);
    console.log(`📐 QR code size: ${QR_SIZE}×${QR_SIZE}px`);
    console.log(`🎨 Color: ${AMANTE_RED} (Amante Burgundy)`);
    console.log(`🛡️  Error correction: HIGH (30%)`);
    console.log('\n💡 This QR code has a heart frame but the QR itself is fully scannable!\n');

  } catch (error) {
    console.error('❌ Error generating QR code:', error.message);
    console.error(error.stack);
    process.exit(1);
  }
}

// Run the generator
generateHeartQR();
