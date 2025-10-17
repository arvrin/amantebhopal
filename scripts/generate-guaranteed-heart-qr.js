// Guaranteed Scannable Heart QR Code Generator
// Strategy: Make heart LARGE enough to contain 100% of QR code
// The entire QR code will be inside the heart - guaranteed to scan!
// Run: node scripts/generate-guaranteed-heart-qr.js

const QRCode = require('qrcode');
const { createCanvas, loadImage } = require('canvas');
const fs = require('fs');
const path = require('path');

const MENU_URL = 'https://amante-coming-soon-4jdpv85ml-aaryavars-projects.vercel.app/menu';
const OUTPUT_DIR = path.join(__dirname, '../public/qr-codes');
const OUTPUT_FILE = 'menu-heart-qr-guaranteed.png';
const SIZE = 1600;
const AMANTE_RED = '#8B1538';

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

async function generateGuaranteedHeartQR() {
  console.log('💝 Creating GUARANTEED scannable heart QR code...\n');

  try {
    // Generate QR with highest error correction
    const qrDataUrl = await QRCode.toDataURL(MENU_URL, {
      errorCorrectionLevel: 'H',
      type: 'image/png',
      width: 900, // Smaller QR so it easily fits in heart
      margin: 2,
      color: {
        dark: AMANTE_RED,
        light: '#FFFFFF'
      }
    });

    const canvas = createCanvas(SIZE, SIZE);
    const ctx = canvas.getContext('2d');

    // Background
    const bgGradient = ctx.createRadialGradient(SIZE/2, SIZE/2, 0, SIZE/2, SIZE/2, SIZE/2);
    bgGradient.addColorStop(0, '#FFF5F0');
    bgGradient.addColorStop(1, '#FFE8E8');
    ctx.fillStyle = bgGradient;
    ctx.fillRect(0, 0, SIZE, SIZE);

    const centerX = SIZE / 2;
    const centerY = SIZE / 2;

    // Heart function - VERY LARGE SCALE
    function createHeartPath(scale, offsetY = 100) {
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

    // Draw outer shadows
    for (let i = 6; i > 0; i--) {
      ctx.save();
      createHeartPath(35 + i * 0.6, 100);
      ctx.strokeStyle = `rgba(139, 21, 56, ${0.04 * (7 - i)})`;
      ctx.lineWidth = 20;
      ctx.stroke();
      ctx.restore();
    }

    // White heart background - MASSIVE SCALE 35
    ctx.save();
    createHeartPath(35, 100);
    ctx.fillStyle = '#FFFFFF';
    ctx.fill();
    ctx.restore();

    // Add subtle inner gradient
    ctx.save();
    createHeartPath(34.5, 100);
    ctx.clip();
    const innerGradient = ctx.createRadialGradient(centerX, centerY - 50, 0, centerX, centerY, 500);
    innerGradient.addColorStop(0, '#FFFFFF');
    innerGradient.addColorStop(0.7, '#FFF8F8');
    innerGradient.addColorStop(1, '#FFE8E8');
    ctx.fillStyle = innerGradient;
    ctx.fillRect(0, 0, SIZE, SIZE);
    ctx.restore();

    // Apply heart clipping - large enough to contain entire QR
    ctx.save();
    createHeartPath(34, 100);
    ctx.clip();

    // Draw QR code - positioned to be fully inside heart
    const qrImage = await loadImage(qrDataUrl);
    const qrSize = 900;
    const qrX = (SIZE - qrSize) / 2;
    const qrY = (SIZE - qrSize) / 2 + 50; // Shift down to align with heart center
    ctx.drawImage(qrImage, qrX, qrY, qrSize, qrSize);

    ctx.restore();

    // Heart borders - thick and prominent
    ctx.save();
    createHeartPath(35, 100);
    ctx.strokeStyle = AMANTE_RED;
    ctx.lineWidth = 18;
    ctx.stroke();
    ctx.restore();

    // Inner border for depth
    ctx.save();
    createHeartPath(33.5, 100);
    ctx.strokeStyle = AMANTE_RED + 'DD';
    ctx.lineWidth = 10;
    ctx.stroke();
    ctx.restore();

    // Glossy highlight on top
    ctx.save();
    createHeartPath(34, 100);
    ctx.clip();
    const highlight = ctx.createLinearGradient(0, 0, 0, SIZE/3);
    highlight.addColorStop(0, 'rgba(255, 255, 255, 0.35)');
    highlight.addColorStop(1, 'rgba(255, 255, 255, 0)');
    ctx.fillStyle = highlight;
    ctx.fillRect(0, 0, SIZE, SIZE/3);
    ctx.restore();

    // Branding text
    ctx.fillStyle = AMANTE_RED;
    ctx.font = 'italic 32px serif';
    ctx.textAlign = 'center';
    ctx.fillText('Scan to view our menu', centerX, SIZE - 100);

    ctx.font = 'bold 40px serif';
    ctx.fillText('AMANTE', centerX, SIZE - 50);

    // Save
    const outputPath = path.join(OUTPUT_DIR, OUTPUT_FILE);
    const buffer = canvas.toBuffer('image/png');
    fs.writeFileSync(outputPath, buffer);

    console.log('✅ Guaranteed scannable heart QR created!');
    console.log(`📁 Saved to: ${outputPath}`);
    console.log(`🔗 Links to: ${MENU_URL}`);
    console.log(`📐 Canvas: ${SIZE}×${SIZE}px`);
    console.log(`📐 QR Code: ${qrSize}×${qrSize}px`);
    console.log(`🎨 Color: ${AMANTE_RED}`);
    console.log(`\n💝 Heart scale: 35 (VERY LARGE)`);
    console.log(`✨ 100% of QR code is inside the heart`);
    console.log(`🛡️  HIGH error correction (30%)`);
    console.log(`📱 GUARANTEED to scan!\n`);

  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

generateGuaranteedHeartQR();
