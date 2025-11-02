const XLSX = require('xlsx');
const fs = require('fs');
const path = require('path');

// Read menu JSON files
const foodMenu = JSON.parse(fs.readFileSync(path.join(__dirname, '../src/data/menus/food.json'), 'utf8'));
const barMenu = JSON.parse(fs.readFileSync(path.join(__dirname, '../src/data/menus/bar.json'), 'utf8'));
const cafeMenu = JSON.parse(fs.readFileSync(path.join(__dirname, '../src/data/menus/cafe.json'), 'utf8'));

// Function to convert menu to worksheet data
function menuToSheetData(menu) {
  const data = [];

  // Add header row
  data.push(['Category', 'Item Name', 'Description', 'Price (₹)', 'Bottle Price (₹)', 'Dietary', 'Spice Level', 'Tags']);

  // Process each category
  menu.categories.forEach(category => {
    category.items.forEach(item => {
      const tags = [];
      if (item.isRecommended) tags.push('Recommended');
      if (item.isChefSpecial) tags.push("Chef's Special");
      if (item.isNew) tags.push('New');

      data.push([
        category.name,
        item.name,
        item.description,
        item.price,
        item.bottlePrice || '',
        item.dietary ? item.dietary.join(', ') : '',
        item.spiceLevel ? '🌶️'.repeat(item.spiceLevel) : '',
        tags.join(', ')
      ]);
    });
  });

  return data;
}

// Create workbook
const wb = XLSX.utils.book_new();

// Add Food Menu sheet
const foodData = menuToSheetData(foodMenu);
const foodSheet = XLSX.utils.aoa_to_sheet(foodData);
// Set column widths
foodSheet['!cols'] = [
  { wch: 25 }, // Category
  { wch: 35 }, // Item Name
  { wch: 50 }, // Description
  { wch: 12 }, // Price
  { wch: 15 }, // Bottle Price
  { wch: 15 }, // Dietary
  { wch: 12 }, // Spice Level
  { wch: 20 }  // Tags
];
XLSX.utils.book_append_sheet(wb, foodSheet, 'Food Menu');

// Add Bar Menu sheet
const barData = menuToSheetData(barMenu);
const barSheet = XLSX.utils.aoa_to_sheet(barData);
barSheet['!cols'] = [
  { wch: 30 }, // Category
  { wch: 35 }, // Item Name
  { wch: 50 }, // Description
  { wch: 12 }, // Price
  { wch: 15 }, // Bottle Price
  { wch: 15 }, // Dietary
  { wch: 12 }, // Spice Level
  { wch: 20 }  // Tags
];
XLSX.utils.book_append_sheet(wb, barSheet, 'Bar Menu');

// Add Café Menu sheet
const cafeData = menuToSheetData(cafeMenu);
const cafeSheet = XLSX.utils.aoa_to_sheet(cafeData);
cafeSheet['!cols'] = [
  { wch: 25 }, // Category
  { wch: 35 }, // Item Name
  { wch: 50 }, // Description
  { wch: 12 }, // Price
  { wch: 15 }, // Bottle Price
  { wch: 15 }, // Dietary
  { wch: 12 }, // Spice Level
  { wch: 20 }  // Tags
];
XLSX.utils.book_append_sheet(wb, cafeSheet, 'Café Menu');

// Write to file
const outputPath = path.join(__dirname, '../Amante_Complete_Menu.xlsx');
XLSX.writeFile(wb, outputPath);

console.log(`✅ Excel file created successfully: ${outputPath}`);
console.log(`📊 Food Menu: ${foodMenu.categories.reduce((sum, cat) => sum + cat.items.length, 0)} items`);
console.log(`🍸 Bar Menu: ${barMenu.categories.reduce((sum, cat) => sum + cat.items.length, 0)} items`);
console.log(`☕ Café Menu: ${cafeMenu.categories.reduce((sum, cat) => sum + cat.items.length, 0)} items`);
