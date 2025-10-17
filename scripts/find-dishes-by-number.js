// Find dishes by serial number from food menu
const foodMenu = require('../src/data/menus/food.json');

const serialNumbers = [15, 28, 30, 52, 54, 56, 57, 60, 61, 62, 76, 81, 93, 96, 109, 112, 114, 116, 120, 125, 127, 129, 130, 134, 135, 136, 137, 139, 140];

console.log('🔍 Finding dishes by serial number...\n');
console.log('📋 Requested serial numbers:', serialNumbers.join(', '));
console.log('\n' + '='.repeat(80) + '\n');

// Flatten all items from all categories with serial numbers
let allItems = [];
let serialCounter = 1;

foodMenu.categories.forEach(category => {
  category.items.forEach(item => {
    allItems.push({
      serial: serialCounter,
      name: item.name,
      description: item.description,
      price: item.price,
      category: category.name,
      dietary: item.dietary,
      id: item.id
    });
    serialCounter++;
  });
});

console.log(`Total items in menu: ${allItems.length}\n`);

// Find requested items
const foundItems = serialNumbers.map(num => allItems.find(item => item.serial === num)).filter(Boolean);

console.log('✅ FOUND DISHES:\n');
foundItems.forEach(item => {
  console.log(`#${item.serial}: ${item.name}`);
  console.log(`   Category: ${item.category}`);
  console.log(`   Description: ${item.description}`);
  console.log(`   Price: ₹${item.price}`);
  console.log(`   Dietary: ${item.dietary.join(', ')}`);
  console.log('');
});

// Check which ones weren't found
const foundSerials = foundItems.map(i => i.serial);
const missingSerials = serialNumbers.filter(n => !foundSerials.includes(n));

if (missingSerials.length > 0) {
  console.log('⚠️  MISSING SERIAL NUMBERS:', missingSerials.join(', '));
  console.log(`   (Total items in menu: ${allItems.length})`);
}

console.log('\n' + '='.repeat(80));
console.log(`\n📊 Summary: Found ${foundItems.length}/${serialNumbers.length} dishes\n`);
