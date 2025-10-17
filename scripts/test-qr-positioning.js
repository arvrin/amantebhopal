// QR Code Positioning Square Test
// This creates a diagnostic version showing where the positioning squares are
// Run: node scripts/test-qr-positioning.js

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

async function testQRPositioning() {
  console.log('🔍 Testing QR code positioning squares...\n');

  try {
    // Generate a basic QR code first
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

    const canvas = createCanvas(1000, 1000);
    const ctx = canvas.getContext('2d');

    // Draw white background
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, 1000, 1000);

    // Draw the QR code
    const qrImage = await loadImage(qrDataUrl);
    ctx.drawImage(qrImage, 0, 0, 1000, 1000);

    // QR positioning squares are typically:
    // - Top-left: 0-15% of width/height
    // - Top-right: 85-100% of width, 0-15% of height
    // - Bottom-left: 0-15% of width, 85-100% of height

    // For a 1000px QR with margin=2, the actual QR module area is roughly:
    // The positioning squares are in the first 7 modules and last 7 modules
    // With typical 29-33 modules for this URL, positioning squares are roughly:
    // Each square is about 7x7 modules out of ~29-33 total modules

    // Let's estimate: positioning squares occupy about 20-25% from edges
    const squareSize = 150; // Approximate size of positioning square area

    // Draw semi-transparent overlays to show positioning square locations
    ctx.fillStyle = 'rgba(0, 255, 0, 0.3)'; // Green overlay

    // Top-left positioning square
    ctx.fillRect(0, 0, squareSize, squareSize);

    // Top-right positioning square
    ctx.fillRect(1000 - squareSize, 0, squareSize, squareSize);

    // Bottom-left positioning square
    ctx.fillRect(0, 1000 - squareSize, squareSize, squareSize);

    // Draw text labels
    ctx.fillStyle = '#FF0000';
    ctx.font = 'bold 20px Arial';
    ctx.fillText('TOP-LEFT', 10, 170);
    ctx.fillText('TOP-RIGHT', 1000 - 140, 170);
    ctx.fillText('BOTTOM-LEFT', 10, 1000 - 10);

    // Save diagnostic image
    const outputPath = path.join(OUTPUT_DIR, 'qr-diagnostic.png');
    const buffer = canvas.toBuffer('image/png');
    fs.writeFileSync(outputPath, buffer);

    console.log('✅ Diagnostic QR created!');
    console.log(`📁 Saved to: ${outputPath}`);
    console.log(`\n📊 Positioning square locations (approximate):`);
    console.log(`   Top-left: (0, 0) to (${squareSize}, ${squareSize})`);
    console.log(`   Top-right: (${1000-squareSize}, 0) to (1000, ${squareSize})`);
    console.log(`   Bottom-left: (0, ${1000-squareSize}) to (${squareSize}, 1000)`);
    console.log(`\n💡 Green overlays show where positioning squares are located`);
    console.log(`   These areas MUST be inside the heart shape for scanning to work!\n`);

  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

testQRPositioning();
