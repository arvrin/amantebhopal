const fs = require('fs');
const ExcelJS = require('exceljs');

async function generateMenuExcel() {
  // Read all menu files
  const foodMenu = JSON.parse(fs.readFileSync('./src/data/menus/food.json', 'utf8'));
  const barMenu = JSON.parse(fs.readFileSync('./src/data/menus/bar.json', 'utf8'));
  const cafeMenu = JSON.parse(fs.readFileSync('./src/data/menus/cafe.json', 'utf8'));

  // Create workbook
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Complete Menu');

  // Define columns
  worksheet.columns = [
    { header: 'Menu Type', key: 'menuType', width: 15 },
    { header: 'Category', key: 'category', width: 30 },
    { header: 'Item ID', key: 'id', width: 20 },
    { header: 'Item Name', key: 'name', width: 40 },
    { header: 'Description', key: 'description', width: 60 },
    { header: 'Price (₹)', key: 'price', width: 12 },
    { header: 'Bottle Price (₹)', key: 'bottlePrice', width: 15 },
    { header: 'Dietary', key: 'dietary', width: 20 },
    { header: 'Spice Level', key: 'spiceLevel', width: 12 },
    { header: 'Recommended', key: 'isRecommended', width: 15 },
    { header: 'Chef Special', key: 'isChefSpecial', width: 15 },
    { header: 'Available', key: 'isAvailable', width: 12 }
  ];

  // Style header row
  const headerRow = worksheet.getRow(1);
  headerRow.font = { bold: true, color: { argb: 'FFFFFFFF' } };
  headerRow.fill = {
    type: 'pattern',
    pattern: 'solid',
    fgColor: { argb: 'FF8B1538' }
  };
  headerRow.alignment = { vertical: 'middle', horizontal: 'center' };
  headerRow.height = 25;

  // Function to add items from a menu
  function addMenuItems(menu, menuType) {
    menu.categories.forEach(category => {
      category.items.forEach(item => {
        worksheet.addRow({
          menuType: menuType,
          category: category.name,
          id: item.id,
          name: item.name,
          description: item.description || '',
          price: item.price,
          bottlePrice: item.bottlePrice || '',
          dietary: item.dietary ? item.dietary.join(', ') : '',
          spiceLevel: item.spiceLevel || '',
          isRecommended: item.isRecommended ? 'Yes' : '',
          isChefSpecial: item.isChefSpecial ? 'Yes' : '',
          isAvailable: item.isAvailable ? 'Yes' : 'No'
        });
      });
    });
  }

  // Add all menu items
  addMenuItems(foodMenu, 'Food');
  addMenuItems(barMenu, 'Bar');
  addMenuItems(cafeMenu, 'Cafe');

  // Apply borders and styling to all cells
  worksheet.eachRow((row, rowNumber) => {
    row.eachCell((cell) => {
      cell.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' }
      };

      if (rowNumber > 1) {
        cell.alignment = { vertical: 'middle', wrapText: true };
      }
    });
  });

  // Alternate row colors
  worksheet.eachRow((row, rowNumber) => {
    if (rowNumber > 1 && rowNumber % 2 === 0) {
      row.eachCell((cell) => {
        cell.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: 'FFF5F5F5' }
        };
      });
    }
  });

  // Add filters
  worksheet.autoFilter = {
    from: 'A1',
    to: 'L1'
  };

  // Freeze header row
  worksheet.views = [
    { state: 'frozen', ySplit: 1 }
  ];

  // Generate filename with date stamp
  const date = new Date();
  const dateStamp = date.toISOString().split('T')[0]; // YYYY-MM-DD format
  const filename = `Updated_Menu_${dateStamp}.xlsx`;

  // Save file
  await workbook.xlsx.writeFile(filename);

  console.log('\n✓ Excel file created successfully!');
  console.log('  Filename: ' + filename);
  console.log('\n  Statistics:');
  console.log('  - Total items: ' + (worksheet.rowCount - 1));
  console.log('  - Food items: ' + foodMenu.categories.reduce((sum, cat) => sum + cat.items.length, 0));
  console.log('  - Bar items: ' + barMenu.categories.reduce((sum, cat) => sum + cat.items.length, 0));
  console.log('  - Cafe items: ' + cafeMenu.categories.reduce((sum, cat) => sum + cat.items.length, 0));
}

generateMenuExcel().catch(console.error);
