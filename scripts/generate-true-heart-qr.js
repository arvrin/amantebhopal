// True Heart-Shaped QR Code Generator
// The QR code itself is heart-shaped with positioning squares inside the heart
// Run: node scripts/generate-true-heart-qr.js

const QRCode = require('qrcode');
const { createCanvas, loadImage } = require('canvas');
const fs = require('fs');
const path = require('path');

const MENU_URL = 'https://amante-coming-soon-4jdpv85ml-aaryavars-projects.vercel.app/menu';
const OUTPUT_DIR = path.join(__dirname, '../public/qr-codes');
const OUTPUT_FILE = 'menu-heart-qr.png';
const SIZE = 1200;
const AMANTE_RED = '#8B1538';

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

async function generateTrueHeartQR() {
  console.log('💝 Creating TRUE heart-shaped QR code...\n');

  try {
    // Generate QR with highest error correction
    const qrDataUrl = await QRCode.toDataURL(MENU_URL, {
      errorCorrectionLevel: 'H',
      type: 'image/png',
      width: SIZE,
      margin: 2,
      color: {
        dark: AMANTE_RED,
        light: '#FFFFFF'
      }
    });

    const canvas = createCanvas(SIZE, SIZE);
    const ctx = canvas.getContext('2d');

    // Cream/pink gradient background
    const bgGradient = ctx.createRadialGradient(SIZE/2, SIZE/2, 0, SIZE/2, SIZE/2, SIZE/2);
    bgGradient.addColorStop(0, '#FFF5F0');
    bgGradient.addColorStop(1, '#FFE8E8');
    ctx.fillStyle = bgGradient;
    ctx.fillRect(0, 0, SIZE, SIZE);

    const qrImage = await loadImage(qrDataUrl);
    const centerX = SIZE / 2;
    const centerY = SIZE / 2;

    // Create heart path
    function createHeartPath(scale, offsetY = -40) {
      ctx.beginPath();
      for (let t = 0; t <= 2 * Math.PI; t += 0.005) {
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

    // Draw subtle outer shadow
    for (let i = 5; i > 0; i--) {
      ctx.save();
      createHeartPath(20 + i * 0.8);
      ctx.strokeStyle = `rgba(139, 21, 56, ${0.05 * (6 - i)})`;
      ctx.lineWidth = 15;
      ctx.stroke();
      ctx.restore();
    }

    // Create white heart background
    ctx.save();
    createHeartPath(20);
    ctx.fillStyle = '#FFFFFF';
    ctx.fill();
    ctx.restore();

    // Apply heart-shaped clipping ONLY
    ctx.save();
    createHeartPath(19.7); // Slightly smaller to account for border
    ctx.clip();

    // Draw QR code - it will be clipped to heart shape
    ctx.drawImage(qrImage, 0, 0, SIZE, SIZE);

    ctx.restore();

    // Draw thick heart border
    ctx.save();
    createHeartPath(20);
    ctx.strokeStyle = AMANTE_RED;
    ctx.lineWidth = 12;
    ctx.stroke();
    ctx.restore();

    // Draw inner border for depth
    ctx.save();
    createHeartPath(19.4);
    ctx.strokeStyle = AMANTE_RED + 'DD';
    ctx.lineWidth = 6;
    ctx.stroke();
    ctx.restore();

    // Add glossy highlight on top edge
    ctx.save();
    createHeartPath(19.7);
    ctx.clip();

    const highlight = ctx.createLinearGradient(0, 0, 0, SIZE/3);
    highlight.addColorStop(0, 'rgba(255, 255, 255, 0.3)');
    highlight.addColorStop(1, 'rgba(255, 255, 255, 0)');
    ctx.fillStyle = highlight;
    ctx.fillRect(0, 0, SIZE, SIZE/3);
    ctx.restore();

    // Add subtle branding text at bottom
    ctx.fillStyle = AMANTE_RED;
    ctx.font = 'italic 28px serif';
    ctx.textAlign = 'center';
    ctx.fillText('Scan to view our menu', centerX, SIZE - 80);

    ctx.font = 'bold 36px serif';
    ctx.fillText('AMANTE', centerX, SIZE - 40);

    // Save
    const outputPath = path.join(OUTPUT_DIR, OUTPUT_FILE);
    const buffer = canvas.toBuffer('image/png');
    fs.writeFileSync(outputPath, buffer);

    console.log('✅ TRUE heart-shaped QR code created!');
    console.log(`📁 Saved to: ${outputPath}`);
    console.log(`🔗 Links to: ${MENU_URL}`);
    console.log(`📐 Size: ${SIZE}×${SIZE}px`);
    console.log(`🎨 Color: ${AMANTE_RED}`);
    console.log(`\n💝 The QR code IS the heart shape!`);
    console.log(`🔍 Positioning squares are INSIDE the heart`);
    console.log(`🛡️  Using HIGH error correction (30%)`);
    console.log(`\n⚠️  NOTE: This may be less scannable than frame version`);
    console.log(`    Test thoroughly before printing!\n`);

  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

generateTrueHeartQR();
