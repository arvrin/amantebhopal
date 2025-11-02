const XLSX = require('xlsx');
const fs = require('fs');
const path = require('path');

// Read the updated Excel file
const excelPath = path.join(__dirname, '../Amante_Complete_Menu copy.xlsx');
const workbook = XLSX.readFile(excelPath);

// Read existing JSON menus
const foodMenu = JSON.parse(fs.readFileSync(path.join(__dirname, '../src/data/menus/food.json'), 'utf8'));
const barMenu = JSON.parse(fs.readFileSync(path.join(__dirname, '../src/data/menus/bar.json'), 'utf8'));
const cafeMenu = JSON.parse(fs.readFileSync(path.join(__dirname, '../src/data/menus/cafe.json'), 'utf8'));

// Create dictionaries for existing menus
function createMenuDict(menu) {
  const dict = {};
  menu.categories.forEach(category => {
    category.items.forEach(item => {
      const key = `${category.name}|${item.name}`;
      dict[key] = {
        price: item.price,
        bottlePrice: item.bottlePrice || null,
        description: item.description,
        category: category.name
      };
    });
  });
  return dict;
}

const existingMenus = {
  'Food Menu': createMenuDict(foodMenu),
  'Bar Menu': createMenuDict(barMenu),
  'Café Menu': createMenuDict(cafeMenu)
};

// Track all items from Excel to find removed items
const excelItems = {
  'Food Menu': new Set(),
  'Bar Menu': new Set(),
  'Café Menu': new Set()
};

// Process each sheet
const changes = {
  newItems: [],
  removedItems: [],
  priceChanges: [],
  bottlePriceChanges: [],
  descriptionChanges: []
};

['Food Menu', 'Bar Menu', 'Café Menu'].forEach(sheetName => {
  const worksheet = workbook.Sheets[sheetName];
  if (!worksheet) {
    console.log(`⚠️  Warning: Sheet "${sheetName}" not found in Excel file`);
    return;
  }

  const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
  const existingDict = existingMenus[sheetName];

  // Skip header row
  for (let i = 1; i < data.length; i++) {
    const row = data[i];
    if (!row[0] || !row[1]) continue; // Skip empty rows

    const category = row[0];
    const itemName = row[1];
    const description = row[2] || '';
    const price = parseInt(row[3]) || 0;
    const bottlePrice = row[4] ? parseInt(row[4]) : null;

    const key = `${category}|${itemName}`;
    excelItems[sheetName].add(key);

    const existing = existingDict[key];

    if (!existing) {
      // New item
      changes.newItems.push({
        menu: sheetName,
        category,
        name: itemName,
        description,
        price,
        bottlePrice
      });
    } else {
      // Check for price changes
      if (existing.price !== price) {
        changes.priceChanges.push({
          menu: sheetName,
          category,
          name: itemName,
          oldPrice: existing.price,
          newPrice: price,
          difference: price - existing.price
        });
      }

      // Check for bottle price changes
      if (existing.bottlePrice !== bottlePrice) {
        if (existing.bottlePrice === null && bottlePrice !== null) {
          changes.bottlePriceChanges.push({
            menu: sheetName,
            category,
            name: itemName,
            oldBottlePrice: 'N/A',
            newBottlePrice: bottlePrice,
            change: 'Added'
          });
        } else if (existing.bottlePrice !== null && bottlePrice === null) {
          changes.bottlePriceChanges.push({
            menu: sheetName,
            category,
            name: itemName,
            oldBottlePrice: existing.bottlePrice,
            newBottlePrice: 'N/A',
            change: 'Removed'
          });
        } else if (existing.bottlePrice !== bottlePrice) {
          changes.bottlePriceChanges.push({
            menu: sheetName,
            category,
            name: itemName,
            oldBottlePrice: existing.bottlePrice,
            newBottlePrice: bottlePrice,
            change: 'Modified',
            difference: bottlePrice - existing.bottlePrice
          });
        }
      }

      // Check for description changes
      if (existing.description !== description) {
        changes.descriptionChanges.push({
          menu: sheetName,
          category,
          name: itemName,
          oldDescription: existing.description,
          newDescription: description
        });
      }
    }
  }

  // Find removed items
  Object.keys(existingDict).forEach(key => {
    if (!excelItems[sheetName].has(key)) {
      const [category, name] = key.split('|');
      changes.removedItems.push({
        menu: sheetName,
        category,
        name,
        price: existingDict[key].price,
        bottlePrice: existingDict[key].bottlePrice
      });
    }
  });
});

// Print results
console.log('\n' + '='.repeat(100));
console.log('📊 COMPREHENSIVE MENU COMPARISON REPORT');
console.log('='.repeat(100));

// New Items
if (changes.newItems.length > 0) {
  console.log('\n✨ NEW ITEMS ADDED (' + changes.newItems.length + '):\n');
  changes.newItems.forEach(item => {
    console.log(`📍 ${item.menu} > ${item.category}`);
    console.log(`   ✓ ${item.name} - ₹${item.price}${item.bottlePrice ? ` (Bottle: ₹${item.bottlePrice})` : ''}`);
    if (item.description) console.log(`   "${item.description}"`);
    console.log('');
  });
} else {
  console.log('\n✨ NEW ITEMS: None\n');
}

console.log('='.repeat(100));

// Removed Items
if (changes.removedItems.length > 0) {
  console.log('\n❌ ITEMS REMOVED (' + changes.removedItems.length + '):\n');
  changes.removedItems.forEach(item => {
    console.log(`📍 ${item.menu} > ${item.category}`);
    console.log(`   ✗ ${item.name} - ₹${item.price}${item.bottlePrice ? ` (Bottle: ₹${item.bottlePrice})` : ''}`);
    console.log('');
  });
} else {
  console.log('\n❌ REMOVED ITEMS: None\n');
}

console.log('='.repeat(100));

// Price Changes
if (changes.priceChanges.length > 0) {
  console.log('\n💰 PRICE CHANGES (' + changes.priceChanges.length + '):\n');
  changes.priceChanges.forEach(item => {
    const arrow = item.difference > 0 ? '⬆️' : '⬇️';
    const sign = item.difference > 0 ? '+' : '';
    console.log(`📍 ${item.menu} > ${item.category}`);
    console.log(`   ${arrow} ${item.name}`);
    console.log(`   ₹${item.oldPrice} → ₹${item.newPrice} (${sign}₹${item.difference})`);
    console.log('');
  });
} else {
  console.log('\n💰 PRICE CHANGES: None\n');
}

console.log('='.repeat(100));

// Bottle Price Changes
if (changes.bottlePriceChanges.length > 0) {
  console.log('\n🍾 BOTTLE PRICE CHANGES (' + changes.bottlePriceChanges.length + '):\n');
  changes.bottlePriceChanges.forEach(item => {
    let arrow = '🔄';
    if (item.change === 'Added') arrow = '✨';
    if (item.change === 'Removed') arrow = '❌';
    if (item.change === 'Modified' && item.difference > 0) arrow = '⬆️';
    if (item.change === 'Modified' && item.difference < 0) arrow = '⬇️';

    console.log(`📍 ${item.menu} > ${item.category}`);
    console.log(`   ${arrow} ${item.name}`);
    if (item.change === 'Modified') {
      const sign = item.difference > 0 ? '+' : '';
      console.log(`   ₹${item.oldBottlePrice} → ₹${item.newBottlePrice} (${sign}₹${item.difference})`);
    } else {
      console.log(`   ${item.oldBottlePrice} → ${item.newBottlePrice}`);
    }
    console.log('');
  });
} else {
  console.log('\n🍾 BOTTLE PRICE CHANGES: None\n');
}

console.log('='.repeat(100));

// Description Changes
if (changes.descriptionChanges.length > 0) {
  console.log('\n📝 DESCRIPTION CHANGES (' + changes.descriptionChanges.length + '):\n');
  changes.descriptionChanges.forEach(item => {
    console.log(`📍 ${item.menu} > ${item.category}`);
    console.log(`   📝 ${item.name}`);
    console.log(`   OLD: "${item.oldDescription}"`);
    console.log(`   NEW: "${item.newDescription}"`);
    console.log('');
  });
} else {
  console.log('\n📝 DESCRIPTION CHANGES: None\n');
}

console.log('='.repeat(100));

// Summary
console.log(`\n📈 SUMMARY:`);
console.log(`   ✨ New Items:              ${changes.newItems.length}`);
console.log(`   ❌ Removed Items:          ${changes.removedItems.length}`);
console.log(`   💰 Price Changes:          ${changes.priceChanges.length}`);
console.log(`   🍾 Bottle Price Changes:   ${changes.bottlePriceChanges.length}`);
console.log(`   📝 Description Changes:    ${changes.descriptionChanges.length}`);
console.log(`   ${'─'.repeat(40)}`);
console.log(`   📊 Total Changes:          ${changes.newItems.length + changes.removedItems.length + changes.priceChanges.length + changes.bottlePriceChanges.length + changes.descriptionChanges.length}`);
console.log('\n' + '='.repeat(100) + '\n');
