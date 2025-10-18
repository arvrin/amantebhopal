// Remove specified items from food menu
const fs = require('fs');
const path = require('path');

const foodMenuPath = path.join(__dirname, '../src/data/menus/food.json');
const foodMenu = require(foodMenuPath);

console.log('🗑️  Removing specified items from food menu...\n');

// Items to remove (case-insensitive matching)
const itemsToRemove = [
  'Mushroom Galouti Kebab',
  'Amante Special KadakNath Tandoori',
  'Amante Special Mutton Galouti Kebab',
  'Smoked Chicken Tomato and Almond Soup',
  'Mutton Yakini Shorba',
  'Vegetable Tempura Uramaki',
  'Pickled Wild Mushroom and Tofu Roll',
  'Amante Special Interactive Garden Green Pizza',
  'Lamb Pepperoni Pizza',
  'Bhopali Mutton Rezala',
  'Chef Interactive Flavored Grilled Bhupali Lamb Chop',
  'Lemon Ricotta Ravioli',
  'Grilled Mascarpone Polenta with Roasted Pine Nuts',
  'Amante Peaking Chicken',
  'Amante Kulfi Faluda Delite',
  'Belgium Chocolate Mousse'
];

let totalRemoved = 0;
const removedItems = [];

// Process each category
foodMenu.categories.forEach(category => {
  const originalLength = category.items.length;

  category.items = category.items.filter(item => {
    const shouldRemove = itemsToRemove.some(removeItem =>
      item.name.toLowerCase() === removeItem.toLowerCase()
    );

    if (shouldRemove) {
      removedItems.push({
        name: item.name,
        category: category.name,
        id: item.id,
        price: item.price
      });
      return false; // Remove item
    }
    return true; // Keep item
  });

  const removed = originalLength - category.items.length;
  if (removed > 0) {
    console.log(`✅ Removed ${removed} item(s) from "${category.name}"`);
    totalRemoved += removed;
  }
});

// Also check for items containing "Grilled Murrel Fish" in description
foodMenu.categories.forEach(category => {
  category.items = category.items.filter(item => {
    const hasMurrelFish = item.description &&
      item.description.toLowerCase().includes('murrel fish');

    if (hasMurrelFish) {
      removedItems.push({
        name: item.name,
        category: category.name,
        id: item.id,
        price: item.price,
        note: 'Contains murrel fish in description'
      });
      totalRemoved++;
      console.log(`✅ Removed "${item.name}" (murrel fish item) from "${category.name}"`);
      return false;
    }
    return true;
  });
});

// Save updated menu
fs.writeFileSync(foodMenuPath, JSON.stringify(foodMenu, null, 2));

console.log('\n' + '='.repeat(80));
console.log(`\n✅ Successfully removed ${totalRemoved} items from food menu!`);
console.log(`\n📁 Updated file: ${foodMenuPath}\n`);

// Print removed items summary
console.log('📋 REMOVED ITEMS SUMMARY:');
console.log('='.repeat(80));
removedItems.forEach((item, index) => {
  console.log(`${index + 1}. ${item.name} (₹${item.price}) - ${item.category}`);
  if (item.note) console.log(`   Note: ${item.note}`);
});

console.log('\n❌ ITEMS NOT FOUND (already removed or not in menu):');
const notFound = itemsToRemove.filter(removeItem =>
  !removedItems.some(removed =>
    removed.name.toLowerCase() === removeItem.toLowerCase()
  )
);
notFound.forEach((item, index) => {
  console.log(`${index + 1}. ${item}`);
});

console.log('\n');
