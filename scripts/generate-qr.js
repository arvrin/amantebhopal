// QR Code Generation Script for Amante Menu
// Run: node scripts/generate-qr.js

const QRCode = require('qrcode');
const fs = require('fs');
const path = require('path');

// Create output directory
const outputDir = path.join(__dirname, '../public/qr-codes');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// QR Code Configuration
const config = {
  errorCorrectionLevel: 'H', // 30% error correction (can work even if partially damaged)
  type: 'image/png',
  margin: 2,
  color: {
    dark: '#8B1538',  // Amante burgundy red
    light: '#FFFFFF'
  }
};

// Production URL
const PRODUCTION_URL = 'https://amante-coming-soon-4jdpv85ml-aaryavars-projects.vercel.app';

// URLs to generate QR codes for
const urls = [
  {
    url: `${PRODUCTION_URL}/menu`,
    name: 'menu-main-production',
    size: 1000,
    description: 'Main Menu Landing Page (Production)'
  },
  {
    url: `${PRODUCTION_URL}/menu/food`,
    name: 'menu-food-production',
    size: 800,
    description: 'Direct to Food Menu (Production)'
  },
  {
    url: `${PRODUCTION_URL}/menu/bar`,
    name: 'menu-bar-production',
    size: 800,
    description: 'Direct to Bar Menu (Production)'
  },
  {
    url: `${PRODUCTION_URL}/menu/cafe`,
    name: 'menu-cafe-production',
    size: 800,
    description: 'Direct to Café Menu (Production)'
  }
];

// Generate QR codes
async function generateQRCodes() {
  console.log('🎨 Generating Amante QR Codes...\n');

  for (const item of urls) {
    try {
      const outputPath = path.join(outputDir, `${item.name}.png`);

      await QRCode.toFile(outputPath, item.url, {
        ...config,
        width: item.size
      });

      console.log(`✅ ${item.description}`);
      console.log(`   File: ${item.name}.png (${item.size}×${item.size}px)`);
      console.log(`   URL: ${item.url}\n`);
    } catch (err) {
      console.error(`❌ Error generating ${item.name}:`, err.message);
    }
  }

  // Generate localhost versions for testing
  console.log('🔧 Generating localhost versions for testing...\n');

  const localhostUrls = [
    {
      url: 'http://localhost:3001/menu',
      name: 'menu-main-localhost',
      size: 500
    }
  ];

  for (const item of localhostUrls) {
    try {
      const outputPath = path.join(outputDir, `${item.name}.png`);

      await QRCode.toFile(outputPath, item.url, {
        ...config,
        width: item.size
      });

      console.log(`✅ Localhost QR: ${item.name}.png`);
    } catch (err) {
      console.error(`❌ Error:`, err.message);
    }
  }

  console.log('\n✨ QR Code generation complete!');
  console.log(`📁 Files saved to: ${outputDir}`);
  console.log('\n📋 Next steps:');
  console.log('   1. Review QR codes in /public/qr-codes/');
  console.log('   2. Test scanning with your phone');
  console.log('   3. Print for table tents (minimum 2cm × 2cm)');
  console.log('   4. Update production URLs after deployment\n');
}

// Check if qrcode package is installed
try {
  require.resolve('qrcode');
  generateQRCodes();
} catch (e) {
  console.log('❌ qrcode package not found!');
  console.log('📦 Please install it first:');
  console.log('   npm install qrcode');
  console.log('\nThen run this script again.');
  process.exit(1);
}
