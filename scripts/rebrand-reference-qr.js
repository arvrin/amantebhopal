// Rebrand Reference Heart QR Code
// Takes the reference heart QR, recolors to Amante burgundy, adds logo and text
// Run: node scripts/rebrand-reference-qr.js

const { createCanvas, loadImage } = require('canvas');
const fs = require('fs');
const path = require('path');

const AMANTE_RED = '#8B1538';
const OUTPUT_DIR = path.join(__dirname, '../public/qr-codes');
const OUTPUT_FILE = 'amante-final-qr.png';

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

async function rebrandReferenceQR() {
  console.log('🎨 Rebranding reference QR to Amante style...\n');

  try {
    // The reference image you shared - let's recreate it with Amante branding
    const FINAL_SIZE = 1600;
    const canvas = createCanvas(FINAL_SIZE, FINAL_SIZE);
    const ctx = canvas.getContext('2d');

    // White background
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, FINAL_SIZE, FINAL_SIZE);

    const centerX = FINAL_SIZE / 2;

    // Load Amante logo
    const logoPath = path.join(__dirname, '../public/assets/logos/Primary Logo/PNG/Red Logo.png');
    let logo;
    try {
      logo = await loadImage(logoPath);
    } catch (err) {
      console.log('⚠️  Logo not found, will add text instead');
    }

    // Add logo at top (if available)
    const logoHeight = 120;
    const topMargin = 80;

    if (logo) {
      const logoAspect = logo.width / logo.height;
      const logoWidth = logoHeight * logoAspect;
      ctx.drawImage(logo, centerX - logoWidth/2, topMargin, logoWidth, logoHeight);
    } else {
      // Fallback to text
      ctx.fillStyle = AMANTE_RED;
      ctx.font = 'bold 60px serif';
      ctx.textAlign = 'center';
      ctx.fillText('AMANTE', centerX, topMargin + 60);
    }

    // Heart QR code area
    const qrY = topMargin + logoHeight + 100;
    const qrSize = 900;

    // Draw heart-shaped QR area
    const qrCenterY = qrY + qrSize/2;

    function createHeartPath(centerY, scale) {
      ctx.beginPath();
      for (let t = 0; t <= 2 * Math.PI; t += 0.003) {
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

    // Create a placeholder QR pattern in heart shape
    // (In real use, you would load the actual QR code image and recolor it)

    // White heart background
    ctx.save();
    createHeartPath(qrCenterY, 18);
    ctx.fillStyle = '#FFFFFF';
    ctx.fill();
    ctx.restore();

    // Draw QR-like pattern
    ctx.save();
    createHeartPath(qrCenterY, 17.5);
    ctx.clip();

    // Generate a QR-like pattern
    const moduleSize = 15;
    const modules = Math.floor(qrSize / moduleSize);

    for (let y = 0; y < modules; y++) {
      for (let x = 0; x < modules; x++) {
        // Random pattern (in real version, this would be actual QR data)
        if (Math.random() > 0.5) {
          const px = centerX - qrSize/2 + x * moduleSize;
          const py = qrCenterY - qrSize/2 + y * moduleSize;
          ctx.fillStyle = AMANTE_RED;
          ctx.fillRect(px, py, moduleSize - 1, moduleSize - 1);
        }
      }
    }

    // Draw heart positioning markers
    function drawHeartMarker(x, y, size) {
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

      // White center
      ctx.beginPath();
      for (let t = 0; t <= 2 * Math.PI; t += 0.01) {
        const hx = (scale * 0.4) * 16 * Math.pow(Math.sin(t), 3);
        const hy = -(scale * 0.4) * (13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
        if (t === 0) {
          ctx.moveTo(hx, hy);
        } else {
          ctx.lineTo(hx, hy);
        }
      }
      ctx.closePath();
      ctx.fillStyle = '#FFFFFF';
      ctx.fill();

      ctx.restore();
    }

    const markerSize = 100;
    const markerOffset = 150;

    // Top-left heart marker
    drawHeartMarker(centerX - qrSize/2 + markerOffset, qrCenterY - qrSize/2 + markerOffset, markerSize);

    // Top-right heart marker
    drawHeartMarker(centerX + qrSize/2 - markerOffset, qrCenterY - qrSize/2 + markerOffset, markerSize);

    // Bottom-left heart marker
    drawHeartMarker(centerX - qrSize/2 + markerOffset, qrCenterY + qrSize/2 - markerOffset, markerSize);

    ctx.restore();

    // Heart border
    ctx.save();
    createHeartPath(qrCenterY, 18);
    ctx.strokeStyle = AMANTE_RED;
    ctx.lineWidth = 18;
    ctx.stroke();
    ctx.restore();

    // "SCAN ME" text at bottom
    const textY = qrY + qrSize + 150;
    ctx.fillStyle = AMANTE_RED;
    ctx.font = 'bold 80px serif';
    ctx.textAlign = 'center';
    ctx.fillText('SCAN ME', centerX, textY);

    // Save
    const outputPath = path.join(OUTPUT_DIR, OUTPUT_FILE);
    const buffer = canvas.toBuffer('image/png');
    fs.writeFileSync(outputPath, buffer);

    console.log('✅ Amante-branded QR code created!');
    console.log(`📁 Saved to: ${outputPath}`);
    console.log(`📐 Size: ${FINAL_SIZE}×${FINAL_SIZE}px`);
    console.log(`🎨 Brand color: ${AMANTE_RED}`);
    console.log(`\n📋 Layout:`);
    console.log(`   - Amante logo at top`);
    console.log(`   - Heart-shaped QR code in middle`);
    console.log(`   - "SCAN ME" text at bottom`);
    console.log(`\n⚠️  NOTE: This is a template with random QR pattern`);
    console.log(`   To use your actual QR code, save it as 'reference-qr.png'`);
    console.log(`   in the public/qr-codes folder and I'll recolor it!\n`);

  } catch (error) {
    console.error('❌ Error:', error.message);
    console.error(error.stack);
    process.exit(1);
  }
}

rebrandReferenceQR();
