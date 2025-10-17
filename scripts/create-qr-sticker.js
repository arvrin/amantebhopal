// Create QR Code Sticker with Decorative Frame
// Adds a beautiful Amante-branded sticker frame around the QR code
// Run: node scripts/create-qr-sticker.js

const { createCanvas, loadImage } = require('canvas');
const fs = require('fs');
const path = require('path');

const AMANTE_RED = '#8B1538';
const AMANTE_GOLD = '#D4AF37';
const INPUT_QR = path.join(__dirname, '../qrchimpX1024 (2).png'); // NEW QR with brand color
const LOGO_PATH = path.join(__dirname, '../public/assets/logos/Primary Logo/PNG/Red Logo.png');
const OUTPUT_DIR = path.join(__dirname, '../public/qr-codes');
const OUTPUT_FILE = 'amante-qr-sticker.png';

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

async function createQRSticker() {
  console.log('🎨 Creating Amante QR sticker...\n');

  try {
    // Load the heart QR code
    const qrImage = await loadImage(INPUT_QR);
    const qrWidth = qrImage.width;
    const qrHeight = qrImage.height;

    // Sticker size
    const STICKER_SIZE = 1600;
    const canvas = createCanvas(STICKER_SIZE, STICKER_SIZE);
    const ctx = canvas.getContext('2d');

    const centerX = STICKER_SIZE / 2;
    const centerY = STICKER_SIZE / 2;

    // Create circular sticker background with gradient
    const bgGradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, STICKER_SIZE/2);
    bgGradient.addColorStop(0, '#FFFFFF');
    bgGradient.addColorStop(0.7, '#FFF8F5');
    bgGradient.addColorStop(1, '#FFE8E8');

    ctx.fillStyle = bgGradient;
    ctx.beginPath();
    ctx.arc(centerX, centerY, STICKER_SIZE/2, 0, Math.PI * 2);
    ctx.fill();

    // Draw outer decorative circles
    for (let i = 0; i < 3; i++) {
      ctx.beginPath();
      ctx.arc(centerX, centerY, STICKER_SIZE/2 - (i * 15), 0, Math.PI * 2);
      ctx.strokeStyle = i === 1 ? AMANTE_GOLD : AMANTE_RED;
      ctx.lineWidth = i === 1 ? 8 : 4;
      ctx.stroke();
    }

    // Add decorative corner elements (hearts in corners of circle)
    function drawDecorativeHeart(angle) {
      ctx.save();
      const distance = STICKER_SIZE/2 - 80;
      const x = centerX + Math.cos(angle) * distance;
      const y = centerY + Math.sin(angle) * distance;

      ctx.translate(x, y);
      ctx.rotate(angle + Math.PI/2);
      ctx.scale(0.03, 0.03);

      ctx.beginPath();
      for (let t = 0; t <= 2 * Math.PI; t += 0.01) {
        const hx = 16 * Math.pow(Math.sin(t), 3);
        const hy = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
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

    // Draw hearts at 4 positions around the circle
    for (let i = 0; i < 4; i++) {
      drawDecorativeHeart((Math.PI / 2) * i);
    }

    // Add Amante logo at top - MASSIVE SIZE (10x larger)
    let logo;
    try {
      logo = await loadImage(LOGO_PATH);
      const logoHeight = 350; // HUGE logo for prominence
      const logoAspect = logo.width / logo.height;
      const logoWidth = logoHeight * logoAspect;
      const logoY = 80;
      ctx.drawImage(logo, centerX - logoWidth/2, logoY, logoWidth, logoHeight);
    } catch (err) {
      console.log('⚠️  Logo not found');
    }

    // Draw QR code DIRECTLY - no processing, use exact image
    const qrSize = 750;
    const qrY = 500;
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(qrImage, centerX - qrSize/2, qrY, qrSize, qrSize);
    ctx.imageSmoothingEnabled = true;

    // Add "SCAN ME" text at bottom
    const textY = qrY + qrSize + 100;

    // Text background banner
    ctx.fillStyle = AMANTE_RED;
    ctx.beginPath();
    ctx.roundRect(centerX - 200, textY - 65, 400, 90, 45);
    ctx.fill();

    // Text
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 60px serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('SCAN ME', centerX, textY - 20);

    // Add small decorative text
    ctx.fillStyle = AMANTE_RED;
    ctx.font = 'italic 28px serif';
    ctx.fillText('View Our Menu', centerX, textY + 60);

    // Save
    const outputPath = path.join(OUTPUT_DIR, OUTPUT_FILE);
    const buffer = canvas.toBuffer('image/png');
    fs.writeFileSync(outputPath, buffer);

    console.log('✅ Amante QR sticker created!');
    console.log(`📁 Saved to: ${outputPath}`);
    console.log(`📐 Size: ${STICKER_SIZE}×${STICKER_SIZE}px (circular)`);
    console.log(`🎨 Colors: Burgundy (${AMANTE_RED}) & Gold (${AMANTE_GOLD})`);
    console.log(`\n🎨 Sticker features:`);
    console.log(`   ✓ Circular design with gradient background`);
    console.log(`   ✓ Decorative burgundy & gold borders`);
    console.log(`   ✓ Heart decorations at cardinal points`);
    console.log(`   ✓ Amante logo at top`);
    console.log(`   ✓ Burgundy heart QR code`);
    console.log(`   ✓ "SCAN ME" banner at bottom`);
    console.log(`\n💝 Perfect for printing as stickers!\n`);

  } catch (error) {
    console.error('❌ Error:', error.message);
    console.error(error.stack);
    process.exit(1);
  }
}

createQRSticker();
