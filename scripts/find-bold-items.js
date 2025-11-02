const XLSX = require('xlsx');
const path = require('path');

// Read the updated Excel file
const excelPath = path.join(__dirname, '../Amante_Complete_Menu copy.xlsx');
const workbook = XLSX.readFile(excelPath, { cellStyles: true });

console.log('\n' + '='.repeat(100));
console.log('🔍 SEARCHING FOR BOLD ITEMS IN EXCEL');
console.log('='.repeat(100) + '\n');

// Check Food Menu sheet
const foodSheet = workbook.Sheets['Food Menu'];
if (!foodSheet) {
  console.log('❌ Food Menu sheet not found');
  process.exit(1);
}

// Get the range of the sheet
const range = XLSX.utils.decode_range(foodSheet['!ref']);
const boldItems = [];

console.log('Analyzing Food Menu sheet...\n');

// Iterate through rows (skip header row)
for (let row = range.s.r + 1; row <= range.e.r; row++) {
  const cellAddress = XLSX.utils.encode_cell({ r: row, c: 1 }); // Column B (Item Name)
  const cell = foodSheet[cellAddress];

  if (cell && cell.v) {
    // Check if cell has formatting
    if (cell.s && cell.s.font && cell.s.font.bold) {
      const categoryCell = foodSheet[XLSX.utils.encode_cell({ r: row, c: 0 })];
      const descCell = foodSheet[XLSX.utils.encode_cell({ r: row, c: 2 })];
      const priceCell = foodSheet[XLSX.utils.encode_cell({ r: row, c: 3 })];

      boldItems.push({
        row: row + 1,
        category: categoryCell ? categoryCell.v : '',
        name: cell.v,
        description: descCell ? descCell.v : '',
        price: priceCell ? priceCell.v : ''
      });
    }
  }
}

if (boldItems.length > 0) {
  console.log(`✨ FOUND ${boldItems.length} BOLD ITEMS:\n`);
  boldItems.forEach((item, index) => {
    console.log(`${index + 1}. ${item.category} > ${item.name}`);
    console.log(`   Price: ₹${item.price}`);
    console.log(`   Description: ${item.description}`);
    console.log(`   (Row ${item.row} in Excel)`);
    console.log('');
  });
} else {
  console.log('ℹ️  No bold formatting detected in the Excel file.');
  console.log('\nNote: The Excel file may not have embedded style information,');
  console.log('or the formatting might not be preserved in the way XLSX library reads it.\n');
  console.log('Let me try an alternative approach...\n');
}

// Alternative: Let's just print all items from Food Menu to manually check
console.log('='.repeat(100));
console.log('📋 ALL ITEMS IN FOOD MENU (for manual verification):');
console.log('='.repeat(100) + '\n');

const data = XLSX.utils.sheet_to_json(foodSheet, { header: 1 });
let currentCategory = '';
let itemCount = 0;

for (let i = 1; i < data.length; i++) {
  const row = data[i];
  if (!row[0] || !row[1]) continue;

  const category = row[0];
  const itemName = row[1];
  const description = row[2] || '';
  const price = row[3] || '';

  if (category !== currentCategory) {
    currentCategory = category;
    console.log(`\n${'─'.repeat(80)}`);
    console.log(`📂 ${category.toUpperCase()}`);
    console.log('─'.repeat(80) + '\n');
  }

  itemCount++;
  console.log(`${itemCount}. ${itemName} - ₹${price}`);
  if (description) {
    console.log(`   "${description}"`);
  }
}

console.log('\n' + '='.repeat(100));
console.log(`\n📊 Total items in Food Menu: ${itemCount}\n`);
