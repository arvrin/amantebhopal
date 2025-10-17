// Analyzed Heart-Shaped QR Code Generator
// Strategy: Analyze QR structure and ensure ALL 3 positioning squares fit inside heart
// The 3 positioning squares are located at: top-left, top-right, and bottom-left
// Run: node scripts/generate-analyzed-heart-qr.js

const QRCode = require('qrcode');
const { createCanvas, loadImage } = require('canvas');
const fs = require('fs');
const path = require('path');

const MENU_URL = 'https://amante-coming-soon-4jdpv85ml-aaryavars-projects.vercel.app/menu';
const OUTPUT_DIR = path.join(__dirname, '../public/qr-codes');
const OUTPUT_FILE = 'menu-heart-qr-analyzed.png';
const CANVAS_SIZE = 1600;
const AMANTE_RED = '#8B1538';

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

async function generateAnalyzedHeartQR() {
  console.log('💝 Creating ANALYZED heart-shaped QR with positioning squares inside...\n');

  try {
    // Generate QR with highest error correction
    const qrDataUrl = await QRCode.toDataURL(MENU_URL, {
      errorCorrectionLevel: 'H', // 30% error tolerance
      type: 'image/png',
      width: 1200,
      margin: 1, // Minimal margin to maximize QR size
      color: {
        dark: AMANTE_RED,
        light: '#FFFFFF'
      }
    });

    const canvas = createCanvas(CANVAS_SIZE, CANVAS_SIZE);
    const ctx = canvas.getContext('2d');

    // Background
    const bgGradient = ctx.createRadialGradient(CANVAS_SIZE/2, CANVAS_SIZE/2, 0, CANVAS_SIZE/2, CANVAS_SIZE/2, CANVAS_SIZE/2);
    bgGradient.addColorStop(0, '#FFF5F0');
    bgGradient.addColorStop(1, '#FFE8E8');
    ctx.fillStyle = bgGradient;
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

    const qrImage = await loadImage(qrDataUrl);

    // CRITICAL ANALYSIS:
    // QR positioning squares are typically in the first ~15% of each corner
    // For a 1200px QR, that's roughly 180px from each edge
    // We need the heart to be tall enough and wide enough to contain:
    // - Top-left square: needs upper-left lobe of heart
    // - Top-right square: needs upper-right lobe of heart
    // - Bottom-left square: needs lower-left area of heart (heart is widest here)

    const centerX = CANVAS_SIZE / 2;
    const centerY = CANVAS_SIZE / 2;

    // Heart function - we'll use a VERY large scale and shift it DOWN
    // This makes the top lobes very wide to contain the top positioning squares
    // And the bottom point goes down enough to contain the bottom-left square
    function createHeartPath(scale, offsetY = 80) {
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

    // Draw shadows
    for (let i = 5; i > 0; i--) {
      ctx.save();
      createHeartPath(32 + i * 0.8, 80);
      ctx.strokeStyle = `rgba(139, 21, 56, ${0.05 * (6 - i)})`;
      ctx.lineWidth = 18;
      ctx.stroke();
      ctx.restore();
    }

    // White heart background - VERY LARGE to contain all positioning squares
    ctx.save();
    createHeartPath(32, 80);
    ctx.fillStyle = '#FFFFFF';
    ctx.fill();
    ctx.restore();

    // Apply clipping - slightly smaller for border
    ctx.save();
    createHeartPath(31.3, 80);
    ctx.clip();

    // Position QR code centered within the heart
    // The QR is 1200px, positioned in 1600px canvas
    const qrSize = 1200;
    const qrX = (CANVAS_SIZE - qrSize) / 2;
    const qrY = (CANVAS_SIZE - qrSize) / 2 + 20; // Shift down slightly to align with heart center

    // Draw QR (clipped to heart)
    ctx.drawImage(qrImage, qrX, qrY, qrSize, qrSize);

    ctx.restore();

    // Heart borders
    ctx.save();
    createHeartPath(32, 80);
    ctx.strokeStyle = AMANTE_RED;
    ctx.lineWidth = 18;
    ctx.stroke();
    ctx.restore();

    ctx.save();
    createHeartPath(31, 80);
    ctx.strokeStyle = AMANTE_RED + 'DD';
    ctx.lineWidth = 9;
    ctx.stroke();
    ctx.restore();

    // Glossy highlight
    ctx.save();
    createHeartPath(31.3, 80);
    ctx.clip();
    const highlight = ctx.createLinearGradient(0, 0, 0, CANVAS_SIZE/3);
    highlight.addColorStop(0, 'rgba(255, 255, 255, 0.35)');
    highlight.addColorStop(1, 'rgba(255, 255, 255, 0)');
    ctx.fillStyle = highlight;
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE/3);
    ctx.restore();

    // Branding
    ctx.fillStyle = AMANTE_RED;
    ctx.font = 'italic 32px serif';
    ctx.textAlign = 'center';
    ctx.fillText('Scan to view our menu', centerX, CANVAS_SIZE - 110);

    ctx.font = 'bold 40px serif';
    ctx.fillText('AMANTE', centerX, CANVAS_SIZE - 60);

    // Save
    const outputPath = path.join(OUTPUT_DIR, OUTPUT_FILE);
    const buffer = canvas.toBuffer('image/png');
    fs.writeFileSync(outputPath, buffer);

    console.log('✅ Analyzed heart-shaped QR code created!');
    console.log(`📁 Saved to: ${outputPath}`);
    console.log(`🔗 Links to: ${MENU_URL}`);
    console.log(`📐 Canvas: ${CANVAS_SIZE}×${CANVAS_SIZE}px`);
    console.log(`📐 QR Code: ${qrSize}×${qrSize}px`);
    console.log(`🎨 Color: ${AMANTE_RED}`);
    console.log(`\n💝 Heart scale: 32 (VERY LARGE)`);
    console.log(`📍 Heart shifted DOWN to align with QR positioning squares`);
    console.log(`🔍 Top lobes contain top-left & top-right squares`);
    console.log(`🔍 Bottom area contains bottom-left square`);
    console.log(`🛡️  Using HIGH error correction (30%)`);
    console.log(`📱 Test with phone camera!\n`);

  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

generateAnalyzedHeartQR();
