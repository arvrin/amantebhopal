// Morphed Heart-Shaped QR Code Generator
// Strategy: Transform/warp the QR code itself into a heart shape
// Uses pixel mapping to morph square QR into heart outline
// Run: node scripts/generate-morphed-heart-qr.js

const QRCode = require('qrcode');
const { createCanvas, loadImage } = require('canvas');
const fs = require('fs');
const path = require('path');

const MENU_URL = 'https://amante-coming-soon-4jdpv85ml-aaryavars-projects.vercel.app/menu';
const OUTPUT_DIR = path.join(__dirname, '../public/qr-codes');
const OUTPUT_FILE = 'menu-heart-qr-morphed.png';
const SIZE = 1400;
const AMANTE_RED = '#8B1538';

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

async function generateMorphedHeartQR() {
  console.log('💝 Creating MORPHED heart-shaped QR code...\n');

  try {
    // Generate square QR code
    const qrDataUrl = await QRCode.toDataURL(MENU_URL, {
      errorCorrectionLevel: 'H',
      type: 'image/png',
      width: 1000,
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

    // Load QR image
    const qrImage = await loadImage(qrDataUrl);

    // Create temporary canvas for QR
    const qrCanvas = createCanvas(1000, 1000);
    const qrCtx = qrCanvas.getContext('2d');
    qrCtx.drawImage(qrImage, 0, 0, 1000, 1000);
    const qrImageData = qrCtx.getImageData(0, 0, 1000, 1000);

    const centerX = SIZE / 2;
    const centerY = SIZE / 2;
    const scale = 30;

    // Heart path calculation function
    function getHeartPoint(t) {
      const x = scale * 16 * Math.pow(Math.sin(t), 3);
      const y = -scale * (13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
      return { x: centerX + x, y: centerY + y };
    }

    // Check if point is inside heart
    function isInsideHeart(px, py) {
      const dx = px - centerX;
      const dy = py - centerY;

      // Convert to heart coordinates
      const angle = Math.atan2(dy, dx);
      const heartPoint = getHeartPoint(angle);
      const heartDist = Math.sqrt(Math.pow(heartPoint.x - centerX, 2) + Math.pow(heartPoint.y - centerY, 2));
      const pointDist = Math.sqrt(dx * dx + dy * dy);

      return pointDist <= heartDist * 0.95;
    }

    // Map square QR to heart shape
    // We'll use a polar coordinate transformation
    const heartImageData = ctx.createImageData(SIZE, SIZE);

    for (let y = 0; y < SIZE; y++) {
      for (let x = 0; x < SIZE; x++) {
        const idx = (y * SIZE + x) * 4;

        if (isInsideHeart(x, y)) {
          // Map this heart point back to square QR coordinate
          const dx = x - centerX;
          const dy = y - centerY;

          // Get angle and distance from center
          const angle = Math.atan2(dy, dx);
          const heartPoint = getHeartPoint(angle);
          const maxHeartDist = Math.sqrt(Math.pow(heartPoint.x - centerX, 2) + Math.pow(heartPoint.y - centerY, 2));
          const currentDist = Math.sqrt(dx * dx + dy * dy);

          // Normalize to 0-1 range
          const normalizedDist = currentDist / maxHeartDist;

          // Map to QR coordinates (square)
          const qrX = Math.floor(500 + normalizedDist * 450 * Math.cos(angle));
          const qrY = Math.floor(500 + normalizedDist * 450 * Math.sin(angle));

          if (qrX >= 0 && qrX < 1000 && qrY >= 0 && qrY < 1000) {
            const qrIdx = (qrY * 1000 + qrX) * 4;
            heartImageData.data[idx] = qrImageData.data[qrIdx];         // R
            heartImageData.data[idx + 1] = qrImageData.data[qrIdx + 1]; // G
            heartImageData.data[idx + 2] = qrImageData.data[qrIdx + 2]; // B
            heartImageData.data[idx + 3] = 255;                         // A
          } else {
            // White
            heartImageData.data[idx] = 255;
            heartImageData.data[idx + 1] = 255;
            heartImageData.data[idx + 2] = 255;
            heartImageData.data[idx + 3] = 255;
          }
        } else {
          // Transparent/background
          heartImageData.data[idx] = 255;
          heartImageData.data[idx + 1] = 245;
          heartImageData.data[idx + 2] = 240;
          heartImageData.data[idx + 3] = 0;
        }
      }
    }

    // Put the morphed image
    ctx.putImageData(heartImageData, 0, 0);

    // Draw heart border
    function createHeartPath(scale, offsetY = 0) {
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

    ctx.save();
    createHeartPath(30);
    ctx.strokeStyle = AMANTE_RED;
    ctx.lineWidth = 16;
    ctx.stroke();
    ctx.restore();

    // Branding
    ctx.fillStyle = AMANTE_RED;
    ctx.font = 'italic 30px serif';
    ctx.textAlign = 'center';
    ctx.fillText('Scan to view our menu', centerX, SIZE - 90);

    ctx.font = 'bold 38px serif';
    ctx.fillText('AMANTE', centerX, SIZE - 45);

    // Save
    const outputPath = path.join(OUTPUT_DIR, OUTPUT_FILE);
    const buffer = canvas.toBuffer('image/png');
    fs.writeFileSync(outputPath, buffer);

    console.log('✅ Morphed heart-shaped QR created!');
    console.log(`📁 Saved to: ${outputPath}`);
    console.log(`🔗 Links to: ${MENU_URL}`);
    console.log(`📐 Size: ${SIZE}×${SIZE}px`);
    console.log(`🎨 Color: ${AMANTE_RED}`);
    console.log(`\n💝 QR code is MORPHED into heart shape!`);
    console.log(`🔄 Using polar coordinate transformation`);
    console.log(`🛡️  HIGH error correction (30%)`);
    console.log(`⚠️  Morphing may affect scanability - test carefully!\n`);

  } catch (error) {
    console.error('❌ Error:', error.message);
    console.error(error.stack);
    process.exit(1);
  }
}

generateMorphedHeartQR();
