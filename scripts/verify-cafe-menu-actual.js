// Verify Cafe Menu - Compare actual PDF items with JSON
const cafeMenu = require('../src/data/menus/cafe.json');

console.log('🔍 CAFE MENU VERIFICATION (COFEE MENU FINAL_.pdf)\n');
console.log('='.repeat(80) + '\n');

// Items from actual COFEE MENU FINAL_.pdf
const pdfItems = {
  'Hot Coffee': [
    { name: 'Espresso', price: 149, description: '40 ml' },
    { name: 'Doppio', price: 179, description: '80 ml' },
    { name: 'Macchiato', price: 169, description: 'Espresso with a dash of milk' },
    { name: 'Americano', price: 179, description: 'Espresso with hot water' },
    { name: 'Cappuccino', price: 199, description: 'Espresso with steamed milk and foam' },
    { name: 'Flat White', price: 199, description: 'Espresso with steamed milk' },
    { name: 'Piccolo (Cortado)', price: 189, description: 'Small latte' },
    { name: 'Café Latte', price: 199, description: 'Espresso with steamed milk' },
    { name: 'Dark Mocha', price: 219, description: 'Espresso with chocolate and milk' },
    { name: 'Hot Chocolate', price: 219, description: 'Rich hot chocolate' },
    { name: 'Affogato Chocolate', price: 239, description: 'Espresso with chocolate ice cream' },
    { name: 'Nutella Café', price: 249, description: 'Espresso with Nutella' }
  ],

  'Iced Coffee': [
    { name: 'Iced Americano', price: 199, description: 'Cold Americano' },
    { name: 'Iced Flat White', price: 199, description: 'Cold flat white' },
    { name: 'Iced Latte', price: 199, description: 'Cold latte' },
    { name: 'Iced Mocha', price: 229, description: 'Cold mocha' },
    { name: 'Iced Amante House Brew', price: 199, description: 'Special house cold brew' },
    { name: 'Tonic Water Espresso', price: 249, description: 'Espresso with tonic water' },
    { name: 'Tropical Iced Americano', price: 249, description: 'Iced Americano with tropical flavors' }
  ],

  'Flavoured Coffee': [
    { name: 'Vanilla Cappuccino/Latte', price: 219, description: 'Vanilla flavored (Hot/Iced)' },
    { name: 'Irish Cappuccino/Latte', price: 219, description: 'Irish flavored (Hot/Iced)' },
    { name: 'Hazelnut Cappuccino/Latte', price: 219, description: 'Hazelnut flavored (Hot/Iced)' },
    { name: 'Pumpkin Cappuccino/Latte', price: 219, description: 'Pumpkin flavored (Hot/Iced)' },
    { name: 'Caramel Cappuccino/Latte', price: 219, description: 'Caramel flavored (Hot/Iced)' },
    { name: 'Lavender Cappuccino/Latte', price: 219, description: 'Lavender flavored (Hot/Iced)' }
  ],

  'Specials': [
    { name: 'Affogato Coffee', price: 259, description: 'Espresso with vanilla ice cream' },
    { name: 'Pistachio Affogato', price: 279, description: 'Espresso with pistachio ice cream' }
  ],

  'Frappés': [
    { name: 'Café Frappé', price: 269, description: 'Classic coffee frappé' },
    { name: 'Salted Caramel Frappé', price: 299, description: 'Salted caramel blended coffee' },
    { name: 'Matcha Frappé', price: 309, description: 'Matcha green tea frappé' },
    { name: 'Vanilla Frappé', price: 289, description: 'Vanilla blended coffee' },
    { name: 'Hazelnut Frappé', price: 299, description: 'Hazelnut blended coffee' },
    { name: 'Pumpkin Frappé', price: 309, description: 'Pumpkin spice frappé' },
    { name: 'Irish Frappé', price: 299, description: 'Irish cream frappé' }
  ],

  'Shakes': [
    { name: 'Vanilla Shake', price: 279, description: 'Classic vanilla milkshake' },
    { name: 'Mango Shake', price: 289, description: 'Fresh mango milkshake' },
    { name: 'Oreo Shake', price: 329, description: 'Oreo cookie milkshake' },
    { name: 'KitKat Shake', price: 329, description: 'KitKat chocolate milkshake' },
    { name: 'Lotus Biscoff Shake', price: 339, description: 'Lotus Biscoff milkshake' },
    { name: 'Ferrero Rocher Shake', price: 339, description: 'Ferrero Rocher milkshake' },
    { name: 'Brownie Shake', price: 299, description: 'Chocolate brownie milkshake' },
    { name: 'Pumpkin Shake', price: 339, description: 'Pumpkin spice milkshake' },
    { name: 'Pistachio Shake', price: 339, description: 'Pistachio milkshake' }
  ],

  'Add-ons & Options': [
    { name: 'Extra Espresso Shot', price: 59, description: 'Add extra espresso shot' },
    { name: 'Alternative Milk', price: 70, description: 'Oat Milk / Soy Milk / Almond Milk / Coconut Milk' }
  ]
};

// Flatten all JSON items
const jsonItems = new Map();
cafeMenu.categories.forEach(category => {
  category.items.forEach(item => {
    // Normalize name for matching
    const normalizedName = item.name.toUpperCase().trim();
    jsonItems.set(normalizedName, {
      category: category.name,
      price: item.price,
      description: item.description,
      originalName: item.name
    });
  });
});

// Also create variations for common name differences
jsonItems.forEach((value, key) => {
  // Add version without special characters
  const simplified = key.replace(/[^A-Z0-9\s]/g, '').replace(/\s+/g, ' ').trim();
  if (simplified !== key && !jsonItems.has(simplified)) {
    jsonItems.set(simplified, value);
  }
});

console.log('📊 VERIFICATION RESULTS:\n');

let totalPdfItems = 0;
let totalFound = 0;
let totalMissing = 0;
const missingItems = [];
const foundItems = [];

Object.entries(pdfItems).forEach(([category, items]) => {
  console.log(`\n📁 ${category}:`);
  console.log('-'.repeat(80));

  const categoryMissing = [];
  items.forEach(pdfItem => {
    totalPdfItems++;
    const upperName = pdfItem.name.toUpperCase().trim();
    const simplifiedName = upperName.replace(/[^A-Z0-9\s]/g, '').replace(/\s+/g, ' ').trim();

    if (jsonItems.has(upperName) || jsonItems.has(simplifiedName)) {
      totalFound++;
      const jsonData = jsonItems.get(upperName) || jsonItems.get(simplifiedName);
      const priceMatch = jsonData.price === pdfItem.price ? '✓' : `⚠️ (PDF: ₹${pdfItem.price}, JSON: ₹${jsonData.price})`;
      console.log(`✅ ${pdfItem.name} - ${priceMatch} (${jsonData.category})`);
      foundItems.push(pdfItem.name);
    } else {
      totalMissing++;
      categoryMissing.push(pdfItem);
      console.log(`❌ MISSING: ${pdfItem.name} - ₹${pdfItem.price}`);
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
    console.log(`\n${category} (${items.length} items):`);
    items.forEach(item => {
      console.log(`  - ${item.name} - ₹${item.price}`);
    });
  });
}

console.log('\n' + '='.repeat(80));
console.log(`\n📋 PDF contains ${Object.keys(pdfItems).length} categories with ${totalPdfItems} total items`);
console.log(`📋 JSON contains ${cafeMenu.categories.length} categories with ${jsonItems.size} total items\n`);
