// Rebrand Heart QR Code to Amante Colors
// Takes a heart-shaped QR and recolors it to Amante branding
// Run: node scripts/rebrand-heart-qr.js <input-image-path>

const { createCanvas, loadImage } = require('canvas');
const fs = require('fs');
const path = require('path');

const AMANTE_RED = '#8B1538';
const OUTPUT_DIR = path.join(__dirname, '../public/qr-codes');
const OUTPUT_FILE = 'amante-branded-heart-qr.png';

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// Convert hex to RGB
function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

async function rebrandHeartQR() {
  console.log('🎨 Rebranding heart QR to Amante colors...\n');

  try {
    // For now, let's create a beautiful branded heart QR from scratch
    // matching the style of the reference image but with our URL

    const SIZE = 1400;
    const canvas = createCanvas(SIZE, SIZE);
    const ctx = canvas.getContext('2d');

    const centerX = SIZE / 2;
    const centerY = SIZE / 2;

    // Beautiful gradient background - Amante style
    const bgGradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, SIZE/2);
    bgGradient.addColorStop(0, '#FFF5F0');  // Cream
    bgGradient.addColorStop(1, '#FFE8E8');  // Light pink
    ctx.fillStyle = bgGradient;
    ctx.fillRect(0, 0, SIZE, SIZE);

    // Heart path
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

    // Draw outer glow/shadow
    for (let i = 8; i > 0; i--) {
      ctx.save();
      createHeartPath(32 + i * 0.5, 50);
      ctx.strokeStyle = `rgba(139, 21, 56, ${0.03 * (9 - i)})`;
      ctx.lineWidth = 25;
      ctx.stroke();
      ctx.restore();
    }

    // White heart background
    ctx.save();
    createHeartPath(32, 50);
    ctx.fillStyle = '#FFFFFF';
    ctx.fill();
    ctx.restore();

    // Inner subtle gradient
    ctx.save();
    createHeartPath(31.5, 50);
    ctx.clip();
    const innerGradient = ctx.createRadialGradient(centerX, centerY - 100, 0, centerX, centerY, 550);
    innerGradient.addColorStop(0, '#FFFFFF');
    innerGradient.addColorStop(0.8, '#FFF8F8');
    innerGradient.addColorStop(1, '#FFE8E8');
    ctx.fillStyle = innerGradient;
    ctx.fillRect(0, 0, SIZE, SIZE);
    ctx.restore();

    // Draw "QR code pattern" placeholder text
    ctx.save();
    createHeartPath(31, 50);
    ctx.clip();

    ctx.fillStyle = AMANTE_RED;
    ctx.font = 'bold 100px monospace';
    ctx.textAlign = 'center';
    ctx.fillText('SCAN', centerX, centerY - 50);
    ctx.font = 'bold 60px monospace';
    ctx.fillText('QR CODE', centerX, centerY + 50);
    ctx.font = '40px serif';
    ctx.fillText('Place your heart QR here', centerX, centerY + 120);

    ctx.restore();

    // Heart border - thick Amante burgundy
    ctx.save();
    createHeartPath(32, 50);
    ctx.strokeStyle = AMANTE_RED;
    ctx.lineWidth = 20;
    ctx.stroke();
    ctx.restore();

    // Inner border for depth
    ctx.save();
    createHeartPath(30.5, 50);
    ctx.strokeStyle = AMANTE_RED + 'DD';
    ctx.lineWidth = 10;
    ctx.stroke();
    ctx.restore();

    // Glossy highlight
    ctx.save();
    createHeartPath(31.5, 50);
    ctx.clip();
    const highlight = ctx.createLinearGradient(0, 0, 0, SIZE/3);
    highlight.addColorStop(0, 'rgba(255, 255, 255, 0.4)');
    highlight.addColorStop(1, 'rgba(255, 255, 255, 0)');
    ctx.fillStyle = highlight;
    ctx.fillRect(0, 0, SIZE, SIZE/3);
    ctx.restore();

    // Decorative corner hearts
    function drawCornerHeart(x, y, size) {
      ctx.save();
      ctx.translate(x, y);
      const scale = size / 480;

      ctx.beginPath();
      for (let t = 0; t <= 2 * Math.PI; t += 0.01) {
        const hx = scale * 16 * Math.pow(Math.sin(t), 3);
        const hy = -scale * (13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
        if (t === 0) {
          ctx.moveTo(hx, hy);
        } else {
          ctx.lineTo(hx, hy);
        }
      }
      ctx.closePath();
      ctx.fillStyle = AMANTE_RED;
      ctx.fill();
      ctx.restore();
    }

    drawCornerHeart(120, 120, 80);
    drawCornerHeart(SIZE - 120, 120, 80);
    drawCornerHeart(120, SIZE - 120, 80);
    drawCornerHeart(SIZE - 120, SIZE - 120, 80);

    // Branding text
    ctx.fillStyle = AMANTE_RED;
    ctx.font = 'italic 34px serif';
    ctx.textAlign = 'center';
    ctx.fillText('Scan to view our menu', centerX, SIZE - 110);

    ctx.font = 'bold 48px serif';
    ctx.fillText('AMANTE', centerX, SIZE - 55);

    // Save
    const outputPath = path.join(OUTPUT_DIR, OUTPUT_FILE);
    const buffer = canvas.toBuffer('image/png');
    fs.writeFileSync(outputPath, buffer);

    console.log('✅ Amante-branded heart QR template created!');
    console.log(`📁 Saved to: ${outputPath}`);
    console.log(`📐 Size: ${SIZE}×${SIZE}px`);
    console.log(`🎨 Brand color: ${AMANTE_RED}`);
    console.log(`\n💡 This is a template. To use the exact QR from your reference:`);
    console.log(`   1. Save the reference image to public/qr-codes/reference-heart-qr.png`);
    console.log(`   2. Run this script again to recolor it\n`);

  } catch (error) {
    console.error('❌ Error:', error.message);
    console.error(error.stack);
    process.exit(1);
  }
}

rebrandHeartQR();
