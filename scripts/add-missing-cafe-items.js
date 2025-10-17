// Add missing cafe items from PDF to JSON
const fs = require('fs');
const path = require('path');

const cafeMenuPath = path.join(__dirname, '../src/data/menus/cafe.json');
const cafeMenu = require(cafeMenuPath);

console.log('🔧 Adding missing cafe items to menu...\n');

// Find Hot Coffee category
const hotCoffeeCategory = cafeMenu.categories.find(cat => cat.name === 'Hot Coffee');

if (hotCoffeeCategory) {
  // Check if Piccolo already exists
  const piccoloExists = hotCoffeeCategory.items.some(item =>
    item.name.toUpperCase().includes('PICCOLO')
  );

  if (!piccoloExists) {
    // Find the position after Flat White to insert Piccolo
    const flatWhiteIndex = hotCoffeeCategory.items.findIndex(item =>
      item.name.toUpperCase().includes('FLAT WHITE')
    );

    const piccoloItem = {
      id: 'cafe-hot-007',
      name: 'Piccolo (Cortado)',
      description: 'Small latte, perfect balance of espresso and milk',
      price: 189,
      category: 'hot-coffee',
      dietary: ['veg'],
      isAvailable: true
    };

    // Insert after Flat White
    if (flatWhiteIndex !== -1) {
      hotCoffeeCategory.items.splice(flatWhiteIndex + 1, 0, piccoloItem);
    } else {
      hotCoffeeCategory.items.push(piccoloItem);
    }

    console.log('✅ Added: Piccolo (Cortado) - ₹189 to Hot Coffee');

    // Save updated menu
    fs.writeFileSync(cafeMenuPath, JSON.stringify(cafeMenu, null, 2));

    console.log('\n' + '='.repeat(80));
    console.log(`\n✅ Successfully added 1 missing item!`);
    console.log(`\n📁 Updated file: ${cafeMenuPath}\n`);
  } else {
    console.log('ℹ️  Piccolo (Cortado) already exists in the menu.\n');
  }
} else {
  console.log('❌ Hot Coffee category not found!\n');
}
