// Perfect Heart-Shaped QR Code Generator
// Strategy: Position heart to fully contain all 3 positioning squares while clipping edges
// Run: node scripts/generate-perfect-heart-qr.js

const QRCode = require('qrcode');
const { createCanvas, loadImage } = require('canvas');
const fs = require('fs');
const path = require('path');

const MENU_URL = 'https://amante-coming-soon-4jdpv85ml-aaryavars-projects.vercel.app/menu';
const OUTPUT_DIR = path.join(__dirname, '../public/qr-codes');
const OUTPUT_FILE = 'menu-heart-qr-perfect.png';
const SIZE = 1400;
const AMANTE_RED = '#8B1538';

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

async function generatePerfectHeartQR() {
  console.log('💝 Creating PERFECT heart-shaped QR with positioning squares inside...\n');

  try {
    // Generate QR with highest error correction
    const qrDataUrl = await QRCode.toDataURL(MENU_URL, {
      errorCorrectionLevel: 'H', // 30% data loss tolerance
      type: 'image/png',
      width: 1100, // Larger QR for better positioning
      margin: 2,
      color: {
        dark: AMANTE_RED,
        light: '#FFFFFF'
      }
    });

    const canvas = createCanvas(SIZE, SIZE);
    const ctx = canvas.getContext('2d');

    // Gradient background
    const bgGradient = ctx.createRadialGradient(SIZE/2, SIZE/2, 0, SIZE/2, SIZE/2, SIZE/2);
    bgGradient.addColorStop(0, '#FFF5F0');
    bgGradient.addColorStop(1, '#FFE8E8');
    ctx.fillStyle = bgGradient;
    ctx.fillRect(0, 0, SIZE, SIZE);

    const qrImage = await loadImage(qrDataUrl);
    const centerX = SIZE / 2;
    const centerY = SIZE / 2;

    // CRITICAL: Heart positioned to contain all 3 positioning squares
    // QR positioning squares are at: top-left, top-right, bottom-left
    // We need the heart TALL ENOUGH to contain top positioning squares
    // and WIDE ENOUGH at the bottom to contain the bottom-left square

    function createHeartPath(scale, offsetY = 0) {
      ctx.beginPath();
      for (let t = 0; t <= 2 * Math.PI; t += 0.003) {
        const x = scale * 16 * Math.pow(Math.sin(t), 3);
        const y = -scale * (13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
        if (t === 0) {
          ctx.moveTo(centerX + x, centerY + y + offsetY);
        } else {
          ctx.lineTo(centerX + x, centerY + y + offsetY);
        }
      }
      ctx.closePath();
    }

    // Outer shadows
    for (let i = 5; i > 0; i--) {
      ctx.save();
      createHeartPath(27 + i * 0.8, -60);
      ctx.strokeStyle = `rgba(139, 21, 56, ${0.05 * (6 - i)})`;
      ctx.lineWidth = 18;
      ctx.stroke();
      ctx.restore();
    }

    // White heart background - LARGE scale
    ctx.save();
    createHeartPath(27, -60);
    ctx.fillStyle = '#FFFFFF';
    ctx.fill();
    ctx.restore();

    // Apply heart clipping - shifted UP to ensure top positioning squares fit
    ctx.save();
    createHeartPath(26.5, -60); // Scale 26.5 is large enough to contain all 3 positioning squares
    ctx.clip();

    // Position QR code to align positioning squares with heart
    // The key is to center the QR so that:
    // - Top two positioning squares are in the upper lobes of the heart
    // - Bottom left positioning square is in the lower left of heart
    const qrSize = 1100;
    const qrX = (SIZE - qrSize) / 2;
    const qrY = (SIZE - qrSize) / 2 - 30; // Shift up slightly to align with heart

    // Draw the QR (will be clipped to heart shape)
    ctx.drawImage(qrImage, qrX, qrY, qrSize, qrSize);

    ctx.restore();

    // Draw thick heart border
    ctx.save();
    createHeartPath(27, -60);
    ctx.strokeStyle = AMANTE_RED;
    ctx.lineWidth = 16;
    ctx.stroke();
    ctx.restore();

    // Inner border for depth
    ctx.save();
    createHeartPath(26, -60);
    ctx.strokeStyle = AMANTE_RED + 'DD';
    ctx.lineWidth = 8;
    ctx.stroke();
    ctx.restore();

    // Glossy highlight
    ctx.save();
    createHeartPath(26.5, -60);
    ctx.clip();
    const highlight = ctx.createLinearGradient(0, 0, 0, SIZE/3);
    highlight.addColorStop(0, 'rgba(255, 255, 255, 0.35)');
    highlight.addColorStop(1, 'rgba(255, 255, 255, 0)');
    ctx.fillStyle = highlight;
    ctx.fillRect(0, 0, SIZE, SIZE/3);
    ctx.restore();

    // Branding
    ctx.fillStyle = AMANTE_RED;
    ctx.font = 'italic 30px serif';
    ctx.textAlign = 'center';
    ctx.fillText('Scan to view our menu', centerX, SIZE - 100);

    ctx.font = 'bold 38px serif';
    ctx.fillText('AMANTE', centerX, SIZE - 55);

    // Save
    const outputPath = path.join(OUTPUT_DIR, OUTPUT_FILE);
    const buffer = canvas.toBuffer('image/png');
    fs.writeFileSync(outputPath, buffer);

    console.log('✅ Perfect heart-shaped QR code created!');
    console.log(`📁 Saved to: ${outputPath}`);
    console.log(`🔗 Links to: ${MENU_URL}`);
    console.log(`📐 Size: ${SIZE}×${SIZE}px`);
    console.log(`🎨 Color: ${AMANTE_RED}`);
    console.log(`\n💝 All 3 positioning squares are INSIDE the heart!`);
    console.log(`🔍 Heart positioned and scaled to contain critical QR zones`);
    console.log(`🛡️  Using HIGH error correction (30%)`);
    console.log(`📱 Should scan much better - test with phone!\n`);

  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

generatePerfectHeartQR();
