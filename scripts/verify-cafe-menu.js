// Verify Cafe Menu - Compare PDF items with JSON
const cafeMenu = require('../src/data/menus/cafe.json');

console.log('🔍 CAFE MENU VERIFICATION\n');
console.log('='.repeat(80) + '\n');

// Items from PDF that should be in JSON (based on COFEE MENU FINAL_.pdf)
const pdfItems = {
  'Espresso Based': [
    'Espresso',
    'Double Espresso',
    'Americano',
    'Cappuccino',
    'Cafe Latte',
    'Flat White',
    'Mocha',
    'Caramel Macchiato',
    'Hazelnut Latte',
    'Vanilla Latte',
    'Irish Coffee'
  ],

  'Cold Coffee': [
    'Iced Americano',
    'Iced Latte',
    'Iced Mocha',
    'Cold Coffee',
    'Cold Coffee with Ice Cream',
    'Frappe',
    'Chocolate Frappe',
    'Caramel Frappe'
  ],

  'Hot Chocolate & Tea': [
    'Hot Chocolate',
    'Classic Hot Chocolate',
    'Hazelnut Hot Chocolate',
    'English Breakfast Tea',
    'Green Tea',
    'Lemon Tea',
    'Ginger Tea',
    'Chamomile Tea',
    'Masala Chai'
  ],

  'Shakes & Smoothies': [
    'Chocolate Shake',
    'Vanilla Shake',
    'Strawberry Shake',
    'Oreo Shake',
    'Kitkat Shake',
    'Mango Smoothie',
    'Berry Smoothie',
    'Banana Smoothie',
    'Mixed Fruit Smoothie'
  ],

  'Fresh Juices': [
    'Orange Juice',
    'Apple Juice',
    'Pineapple Juice',
    'Watermelon Juice',
    'Mango Juice',
    'Mixed Fruit Juice'
  ],

  'Bakery Items': [
    'Croissant',
    'Chocolate Croissant',
    'Danish Pastry',
    'Muffin (Chocolate/Blueberry)',
    'Brownie',
    'Cookie',
    'Donut',
    'Sandwich (Veg/Chicken)'
  ],

  'Breakfast Specials': [
    'Classic Pancakes',
    'Chocolate Pancakes',
    'Belgian Waffle',
    'Fruit Waffle',
    'French Toast',
    'Eggs Benedict',
    'Scrambled Eggs',
    'Omelette',
    'Avocado Toast',
    'Breakfast Platter'
  ]
};

// Flatten all JSON items
const jsonItems = new Map();
cafeMenu.categories.forEach(category => {
  category.items.forEach(item => {
    jsonItems.set(item.name.toUpperCase(), {
      category: category.name,
      price: item.price,
      description: item.description,
      dietary: item.dietary
    });
  });
});

console.log('📊 VERIFICATION RESULTS:\n');

let totalPdfItems = 0;
let totalFound = 0;
let totalMissing = 0;
const missingItems = [];

Object.entries(pdfItems).forEach(([category, items]) => {
  console.log(`\n📁 ${category}:`);
  console.log('-'.repeat(80));

  const categoryMissing = [];
  items.forEach(itemName => {
    totalPdfItems++;
    const upperName = itemName.toUpperCase();

    if (jsonItems.has(upperName)) {
      totalFound++;
      const jsonData = jsonItems.get(upperName);
      const dietaryIcon = jsonData.dietary?.includes('veg') && !jsonData.dietary?.includes('non-veg') ? '🟢' :
                          jsonData.dietary?.includes('non-veg') ? '🔴' : '⚪';
      console.log(`✅ ${itemName} - ₹${jsonData.price} ${dietaryIcon} (${jsonData.category})`);
    } else {
      totalMissing++;
      categoryMissing.push(itemName);
      console.log(`❌ MISSING: ${itemName}`);
    }
  });

  if (categoryMissing.length > 0) {
    missingItems.push({ category, items: categoryMissing });
  }
});

console.log('\n' + '='.repeat(80));
console.log('\n📈 SUMMARY:');
console.log(`   Total items in PDF: ${totalPdfItems}`);
console.log(`   Found in JSON: ${totalFound} ✅`);
console.log(`   Missing from JSON: ${totalMissing} ❌`);
console.log(`   Coverage: ${((totalFound/totalPdfItems) * 100).toFixed(1)}%`);

if (missingItems.length > 0) {
  console.log('\n⚠️  MISSING ITEMS BY CATEGORY:\n');
  missingItems.forEach(({ category, items }) => {
    console.log(`\n${category}:`);
    items.forEach(item => console.log(`  - ${item}`));
  });
}

console.log('\n' + '='.repeat(80));
console.log(`\n📋 JSON contains ${cafeMenu.categories.length} categories with ${jsonItems.size} total items\n`);
