// Heart Position Squares QR Code Generator
// Strategy: Replace the 3 positioning squares with hearts, use heart-shaped outline
// Based on the reference design provided
// Run: node scripts/generate-heart-position-qr.js

const QRCode = require('qrcode');
const { createCanvas, loadImage } = require('canvas');
const fs = require('fs');
const path = require('path');

const MENU_URL = 'https://amante-coming-soon-4jdpv85ml-aaryavars-projects.vercel.app/menu';
const OUTPUT_DIR = path.join(__dirname, '../public/qr-codes');
const OUTPUT_FILE = 'menu-heart-qr-final.png';
const SIZE = 1400;
const AMANTE_RED = '#8B1538';

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

async function generateHeartPositionQR() {
  console.log('💝 Creating heart-styled QR with heart positioning squares...\n');

  try {
    // Generate QR code
    const qrDataUrl = await QRCode.toDataURL(MENU_URL, {
      errorCorrectionLevel: 'H',
      type: 'image/png',
      width: 1000,
      margin: 2,
      color: {
        dark: '#000000', // Generate as black first
        light: '#FFFFFF'
      }
    });

    const canvas = createCanvas(SIZE, SIZE);
    const ctx = canvas.getContext('2d');

    // Beautiful gradient background
    const bgGradient = ctx.createRadialGradient(SIZE/2, SIZE/2, 0, SIZE/2, SIZE/2, SIZE/2);
    bgGradient.addColorStop(0, '#FFF5F0');
    bgGradient.addColorStop(1, '#FFE8E8');
    ctx.fillStyle = bgGradient;
    ctx.fillRect(0, 0, SIZE, SIZE);

    const centerX = SIZE / 2;
    const centerY = SIZE / 2;

    // Load QR image
    const qrImage = await loadImage(qrDataUrl);

    // Draw QR centered
    const qrSize = 1000;
    const qrX = (SIZE - qrSize) / 2;
    const qrY = (SIZE - qrSize) / 2;

    // Create temporary canvas for QR manipulation
    const tempCanvas = createCanvas(qrSize, qrSize);
    const tempCtx = tempCanvas.getContext('2d');
    tempCtx.drawImage(qrImage, 0, 0, qrSize, qrSize);

    // Heart shape clipping path
    function createHeartPath(scale, offsetX = 0, offsetY = 0) {
      ctx.beginPath();
      for (let t = 0; t <= 2 * Math.PI; t += 0.003) {
        const x = scale * 16 * Math.pow(Math.sin(t), 3);
        const y = -scale * (13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
        if (t === 0) {
          ctx.moveTo(centerX + x + offsetX, centerY + y + offsetY);
        } else {
          ctx.lineTo(centerX + x + offsetX, centerY + y + offsetY);
        }
      }
      ctx.closePath();
    }

    // Draw small heart for positioning squares
    function drawSmallHeart(x, y, size) {
      ctx.save();
      ctx.translate(x, y);
      const scale = size / 480; // Normalized scale

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

    // White heart background
    ctx.save();
    createHeartPath(32, 0, 80);
    ctx.fillStyle = '#FFFFFF';
    ctx.fill();
    ctx.restore();

    // Clip to heart shape
    ctx.save();
    createHeartPath(31.5, 0, 80);
    ctx.clip();

    // Change QR color to burgundy and draw it
    const imageData = tempCtx.getImageData(0, 0, qrSize, qrSize);
    for (let i = 0; i < imageData.data.length; i += 4) {
      // If pixel is dark (QR module)
      if (imageData.data[i] < 128) {
        imageData.data[i] = 139;     // R
        imageData.data[i + 1] = 21;  // G
        imageData.data[i + 2] = 56;  // B
      }
    }
    tempCtx.putImageData(imageData, 0, 0);

    // Draw the burgundy QR code
    ctx.drawImage(tempCanvas, qrX, qrY + 80, qrSize, qrSize);

    ctx.restore();

    // Replace positioning squares with hearts
    // Positioning squares are approximately at 15% from edges on a 1000px QR
    const heartSize = 120;
    const offset = 80; // Offset from edges

    // Top-left heart
    drawSmallHeart(qrX + offset + heartSize/2, qrY + 80 + offset + heartSize/2, heartSize);

    // Top-right heart
    drawSmallHeart(qrX + qrSize - offset - heartSize/2, qrY + 80 + offset + heartSize/2, heartSize);

    // Bottom-left heart
    drawSmallHeart(qrX + offset + heartSize/2, qrY + 80 + qrSize - offset - heartSize/2, heartSize);

    // Draw heart border
    ctx.save();
    createHeartPath(32, 0, 80);
    ctx.strokeStyle = AMANTE_RED;
    ctx.lineWidth = 18;
    ctx.stroke();
    ctx.restore();

    // Inner border
    ctx.save();
    createHeartPath(31, 0, 80);
    ctx.strokeStyle = AMANTE_RED + 'DD';
    ctx.lineWidth = 9;
    ctx.stroke();
    ctx.restore();

    // Glossy highlight
    ctx.save();
    createHeartPath(31.5, 0, 80);
    ctx.clip();
    const highlight = ctx.createLinearGradient(0, 0, 0, SIZE/3);
    highlight.addColorStop(0, 'rgba(255, 255, 255, 0.3)');
    highlight.addColorStop(1, 'rgba(255, 255, 255, 0)');
    ctx.fillStyle = highlight;
    ctx.fillRect(0, 0, SIZE, SIZE/3);
    ctx.restore();

    // Branding
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

    console.log('✅ Heart-styled QR with heart positioning squares created!');
    console.log(`📁 Saved to: ${outputPath}`);
    console.log(`🔗 Links to: ${MENU_URL}`);
    console.log(`📐 Size: ${SIZE}×${SIZE}px`);
    console.log(`🎨 Color: ${AMANTE_RED}`);
    console.log(`\n💝 Positioning squares replaced with hearts!`);
    console.log(`💝 Heart-shaped outline`);
    console.log(`🛡️  HIGH error correction (30%)`);
    console.log(`📱 Beautiful design - ready for printing!\n`);

  } catch (error) {
    console.error('❌ Error:', error.message);
    console.error(error.stack);
    process.exit(1);
  }
}

generateHeartPositionQR();
