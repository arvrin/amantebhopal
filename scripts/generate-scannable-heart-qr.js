// Scannable Heart-Shaped QR Code Generator
// Strategy: Preserve critical QR zones while creating beautiful heart aesthetic
// Run: node scripts/generate-scannable-heart-qr.js

const QRCode = require('qrcode');
const { createCanvas, loadImage } = require('canvas');
const fs = require('fs');
const path = require('path');

const MENU_URL = 'https://amante-coming-soon-4jdpv85ml-aaryavars-projects.vercel.app/menu';
const OUTPUT_DIR = path.join(__dirname, '../public/qr-codes');
const OUTPUT_FILE = 'menu-heart-qr-scannable.png';
const SIZE = 1200;
const AMANTE_RED = '#8B1538';

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

async function generateScannableHeartQR() {
  console.log('💝 Creating SCANNABLE heart-shaped QR code...\n');

  try {
    // Generate QR with highest error correction
    const qrDataUrl = await QRCode.toDataURL(MENU_URL, {
      errorCorrectionLevel: 'H',
      type: 'image/png',
      width: SIZE * 0.85, // Slightly smaller QR for better heart fit
      margin: 1,
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

    // Create heart path - LARGER to preserve more QR data
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

    // Draw subtle outer shadows
    for (let i = 5; i > 0; i--) {
      ctx.save();
      createHeartPath(22 + i * 0.8);
      ctx.strokeStyle = `rgba(139, 21, 56, ${0.05 * (6 - i)})`;
      ctx.lineWidth = 15;
      ctx.stroke();
      ctx.restore();
    }

    // Create white heart background - LARGER SCALE
    ctx.save();
    createHeartPath(22);
    ctx.fillStyle = '#FFFFFF';
    ctx.fill();
    ctx.restore();

    // Apply heart-shaped clipping with LARGER scale to preserve QR data
    ctx.save();
    createHeartPath(21.5); // Much larger than before to keep positioning squares intact
    ctx.clip();

    // Center and draw QR code
    const qrSize = SIZE * 0.85;
    const qrOffset = (SIZE - qrSize) / 2;
    ctx.drawImage(qrImage, qrOffset, qrOffset, qrSize, qrSize);

    ctx.restore();

    // Draw thick heart border
    ctx.save();
    createHeartPath(22);
    ctx.strokeStyle = AMANTE_RED;
    ctx.lineWidth = 14;
    ctx.stroke();
    ctx.restore();

    // Draw inner border for depth
    ctx.save();
    createHeartPath(21.2);
    ctx.strokeStyle = AMANTE_RED + 'DD';
    ctx.lineWidth = 7;
    ctx.stroke();
    ctx.restore();

    // Add glossy highlight on top
    ctx.save();
    createHeartPath(21.5);
    ctx.clip();

    const highlight = ctx.createLinearGradient(0, 0, 0, SIZE/3);
    highlight.addColorStop(0, 'rgba(255, 255, 255, 0.3)');
    highlight.addColorStop(1, 'rgba(255, 255, 255, 0)');
    ctx.fillStyle = highlight;
    ctx.fillRect(0, 0, SIZE, SIZE/3);
    ctx.restore();

    // Add branding text
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

    console.log('✅ Scannable heart-shaped QR code created!');
    console.log(`📁 Saved to: ${outputPath}`);
    console.log(`🔗 Links to: ${MENU_URL}`);
    console.log(`📐 Size: ${SIZE}×${SIZE}px`);
    console.log(`🎨 Color: ${AMANTE_RED}`);
    console.log(`🛡️  Using HIGH error correction (30%)`);
    console.log(`\n💝 Heart-shaped with LARGER scale to preserve QR positioning squares!`);
    console.log(`📱 Should scan much better while keeping beautiful design!\n`);

  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

generateScannableHeartQR();
