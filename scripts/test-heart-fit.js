// Test Heart Fit Over QR Positioning Squares
// This shows if the heart shape properly contains all positioning squares
// Run: node scripts/test-heart-fit.js

const QRCode = require('qrcode');
const { createCanvas, loadImage } = require('canvas');
const fs = require('fs');
const path = require('path');

const MENU_URL = 'https://amante-coming-soon-4jdpv85ml-aaryavars-projects.vercel.app/menu';
const OUTPUT_DIR = path.join(__dirname, '../public/qr-codes');
const AMANTE_RED = '#8B1538';

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

async function testHeartFit() {
  console.log('💝 Testing heart fit over positioning squares...\n');

  try {
    const SIZE = 1400;

    // Generate QR code
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

    // White background
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, SIZE, SIZE);

    const centerX = SIZE / 2;
    const centerY = SIZE / 2;

    // Draw QR code centered
    const qrImage = await loadImage(qrDataUrl);
    const qrSize = 1000;
    const qrX = (SIZE - qrSize) / 2;
    const qrY = (SIZE - qrSize) / 2;
    ctx.drawImage(qrImage, qrX, qrY, qrSize, qrSize);

    // Mark positioning squares with green overlay
    ctx.fillStyle = 'rgba(0, 255, 0, 0.4)';
    const squareSize = 150;

    // Top-left
    ctx.fillRect(qrX, qrY, squareSize, squareSize);
    // Top-right
    ctx.fillRect(qrX + qrSize - squareSize, qrY, squareSize, squareSize);
    // Bottom-left
    ctx.fillRect(qrX, qrY + qrSize - squareSize, squareSize, squareSize);

    // Heart function
    function createHeartPath(scale, offsetY = 0) {
      ctx.beginPath();
      for (let t = 0; t <= 2 * Math.PI; t += 0.01) {
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

    // Try different heart configurations
    const tests = [
      { scale: 25, offsetY: 0, name: 'Scale 25, Offset 0' },
      { scale: 28, offsetY: -30, name: 'Scale 28, Offset -30' },
      { scale: 30, offsetY: -50, name: 'Scale 30, Offset -50' },
      { scale: 32, offsetY: 50, name: 'Scale 32, Offset +50 (down)' },
    ];

    // Test the one that seems most promising
    const testConfig = tests[3]; // Scale 32, shifted down

    // Draw heart border in RED (semi-transparent)
    ctx.save();
    createHeartPath(testConfig.scale, testConfig.offsetY);
    ctx.strokeStyle = 'rgba(255, 0, 0, 0.6)';
    ctx.lineWidth = 20;
    ctx.stroke();
    ctx.restore();

    // Add labels
    ctx.fillStyle = '#000000';
    ctx.font = 'bold 24px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('GREEN = Positioning Squares (MUST be inside RED heart)', centerX, 50);
    ctx.fillText(`Heart: ${testConfig.name}`, centerX, 90);

    ctx.font = 'bold 16px Arial';
    ctx.fillText('Top-Left Square', qrX + 75, qrY + squareSize + 25);
    ctx.fillText('Top-Right Square', qrX + qrSize - 75, qrY + squareSize + 25);
    ctx.fillText('Bottom-Left Square', qrX + 75, qrY + qrSize - squareSize - 10);

    // Save
    const outputPath = path.join(OUTPUT_DIR, 'heart-fit-test.png');
    const buffer = canvas.toBuffer('image/png');
    fs.writeFileSync(outputPath, buffer);

    console.log('✅ Heart fit test created!');
    console.log(`📁 Saved to: ${outputPath}`);
    console.log(`\n📊 Test configuration: ${testConfig.name}`);
    console.log(`🟢 Green areas = positioning squares (MUST be inside heart)`);
    console.log(`🔴 Red border = heart shape`);
    console.log(`\n❓ Check if ALL green squares are INSIDE the red heart border!`);
    console.log(`   If yes, this configuration will work for scanning.\n`);

  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

testHeartFit();
