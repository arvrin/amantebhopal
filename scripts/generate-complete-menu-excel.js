const fs = require('fs');
const ExcelJS = require('exceljs');

async function generateCompleteMenuExcel() {
  // Read all menu files
  const foodMenu = JSON.parse(fs.readFileSync('./src/data/menus/food.json', 'utf8'));
  const barMenu = JSON.parse(fs.readFileSync('./src/data/menus/bar.json', 'utf8'));
  const cafeMenu = JSON.parse(fs.readFileSync('./src/data/menus/cafe.json', 'utf8'));

  // Create workbook
  const workbook = new ExcelJS.Workbook();

  // Define common column structure
  const commonColumns = [
    { header: 'Category', key: 'category', width: 30 },
    { header: 'Item Name', key: 'name', width: 45 },
    { header: 'Description', key: 'description', width: 65 },
    { header: 'Price (₹)', key: 'price', width: 12 },
    { header: 'Bottle Price (₹)', key: 'bottlePrice', width: 15 },
    { header: 'Dietary', key: 'dietary', width: 15 },
    { header: 'Spice Level', key: 'spiceLevel', width: 12 },
    { header: 'Chef Special', key: 'isChefSpecial', width: 12 },
    { header: 'Recommended', key: 'isRecommended', width: 12 },
    { header: 'Available', key: 'isAvailable', width: 10 },
    { header: 'Item ID', key: 'id', width: 20 }
  ];

  // Style header function
  function styleHeader(worksheet) {
    const headerRow = worksheet.getRow(1);
    headerRow.font = { bold: true, color: { argb: 'FFFFFFFF' }, size: 11 };
    headerRow.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FF8B1538' }
    };
    headerRow.alignment = { vertical: 'middle', horizontal: 'center' };
    headerRow.height = 30;
  }

  // Apply formatting function
  function applyFormatting(worksheet) {
    // Apply borders and styling to all cells
    worksheet.eachRow((row, rowNumber) => {
      row.eachCell((cell, colNumber) => {
        cell.border = {
          top: { style: 'thin', color: { argb: 'FFD3D3D3' } },
          left: { style: 'thin', color: { argb: 'FFD3D3D3' } },
          bottom: { style: 'thin', color: { argb: 'FFD3D3D3' } },
          right: { style: 'thin', color: { argb: 'FFD3D3D3' } }
        };

        if (rowNumber > 1) {
          // Data rows
          if (colNumber === 4 || colNumber === 5) {
            // Price columns - right align
            cell.alignment = { vertical: 'middle', horizontal: 'right' };
            cell.numFmt = '₹#,##0';
          } else if (colNumber === 3) {
            // Description - wrap text
            cell.alignment = { vertical: 'middle', wrapText: true };
          } else if (colNumber >= 6) {
            // Other columns - center align
            cell.alignment = { vertical: 'middle', horizontal: 'center' };
          } else {
            // Left align for name and category
            cell.alignment = { vertical: 'middle', horizontal: 'left' };
          }

          // Highlight Chef Special rows
          if (cell.value === 'Yes' && colNumber === 8) {
            row.getCell(8).fill = {
              type: 'pattern',
              pattern: 'solid',
              fgColor: { argb: 'FFFFEB3B' }
            };
            row.getCell(8).font = { bold: true, color: { argb: 'FF000000' } };
          }

          // Highlight Recommended rows
          if (cell.value === 'Yes' && colNumber === 9) {
            row.getCell(9).fill = {
              type: 'pattern',
              pattern: 'solid',
              fgColor: { argb: 'FF90EE90' }
            };
            row.getCell(9).font = { bold: true, color: { argb: 'FF000000' } };
          }

          // Highlight unavailable items
          if (cell.value === 'No' && colNumber === 10) {
            row.eachCell((c) => {
              c.font = { color: { argb: 'FFFF0000' }, italic: true };
            });
          }
        }
      });

      // Alternate row colors
      if (rowNumber > 1 && rowNumber % 2 === 0) {
        row.eachCell((cell, colNumber) => {
          if (colNumber !== 8 && colNumber !== 9) { // Don't override special highlights
            cell.fill = {
              type: 'pattern',
              pattern: 'solid',
              fgColor: { argb: 'FFF9F9F9' }
            };
          }
        });
      }
    });

    // Add filters
    worksheet.autoFilter = {
      from: 'A1',
      to: `K${worksheet.rowCount}`
    };

    // Freeze header row
    worksheet.views = [
      { state: 'frozen', ySplit: 1 }
    ];
  }

  // Function to add items to worksheet
  function addMenuItems(worksheet, categories) {
    let itemCount = 0;
    categories.forEach(category => {
      category.items.forEach(item => {
        worksheet.addRow({
          category: category.name,
          name: item.name,
          description: item.description || '',
          price: item.price || '',
          bottlePrice: item.bottlePrice || '',
          dietary: item.dietary ? (Array.isArray(item.dietary) ? item.dietary.join(', ') : item.dietary) : '',
          spiceLevel: item.spiceLevel || '',
          isChefSpecial: item.isChefSpecial ? 'Yes' : '',
          isRecommended: item.isRecommended ? 'Yes' : '',
          isAvailable: item.isAvailable !== false ? 'Yes' : 'No',
          id: item.id
        });
        itemCount++;
      });
    });
    return itemCount;
  }

  // Sheet 1: Food Menu
  console.log('\n📄 Creating Sheet 1: Food Menu...');
  const foodSheet = workbook.addWorksheet('Food Menu', {
    pageSetup: { paperSize: 9, orientation: 'landscape' }
  });
  foodSheet.columns = commonColumns;
  styleHeader(foodSheet);
  const foodCount = addMenuItems(foodSheet, foodMenu.categories);
  applyFormatting(foodSheet);
  console.log(`   ✓ Added ${foodCount} food items`);

  // Sheet 2: Bar Menu
  console.log('📄 Creating Sheet 2: Bar Menu...');
  const barSheet = workbook.addWorksheet('Bar Menu', {
    pageSetup: { paperSize: 9, orientation: 'landscape' }
  });
  barSheet.columns = commonColumns;
  styleHeader(barSheet);
  const barCount = addMenuItems(barSheet, barMenu.categories);
  applyFormatting(barSheet);
  console.log(`   ✓ Added ${barCount} bar items`);

  // Sheet 3: Cafe & Bakery Menu
  console.log('📄 Creating Sheet 3: Cafe & Bakery Menu...');
  const cafeSheet = workbook.addWorksheet('Cafe & Bakery Menu', {
    pageSetup: { paperSize: 9, orientation: 'landscape' }
  });
  cafeSheet.columns = commonColumns;
  styleHeader(cafeSheet);
  const cafeCount = addMenuItems(cafeSheet, cafeMenu.categories);
  applyFormatting(cafeSheet);
  console.log(`   ✓ Added ${cafeCount} cafe items`);

  // Sheet 4: Complete Overview
  console.log('📄 Creating Sheet 4: Complete Overview...');
  const overviewSheet = workbook.addWorksheet('Complete Overview', {
    pageSetup: { paperSize: 9, orientation: 'landscape' }
  });

  // Add Menu Type column for overview
  overviewSheet.columns = [
    { header: 'Menu Type', key: 'menuType', width: 15 },
    ...commonColumns
  ];

  const overviewHeaderRow = overviewSheet.getRow(1);
  overviewHeaderRow.font = { bold: true, color: { argb: 'FFFFFFFF' }, size: 11 };
  overviewHeaderRow.fill = {
    type: 'pattern',
    pattern: 'solid',
    fgColor: { argb: 'FF8B1538' }
  };
  overviewHeaderRow.alignment = { vertical: 'middle', horizontal: 'center' };
  overviewHeaderRow.height = 30;

  // Add all items with menu type
  let overviewCount = 0;

  foodMenu.categories.forEach(category => {
    category.items.forEach(item => {
      overviewSheet.addRow({
        menuType: 'Food',
        category: category.name,
        name: item.name,
        description: item.description || '',
        price: item.price || '',
        bottlePrice: item.bottlePrice || '',
        dietary: item.dietary ? (Array.isArray(item.dietary) ? item.dietary.join(', ') : item.dietary) : '',
        spiceLevel: item.spiceLevel || '',
        isChefSpecial: item.isChefSpecial ? 'Yes' : '',
        isRecommended: item.isRecommended ? 'Yes' : '',
        isAvailable: item.isAvailable !== false ? 'Yes' : 'No',
        id: item.id
      });
      overviewCount++;
    });
  });

  barMenu.categories.forEach(category => {
    category.items.forEach(item => {
      overviewSheet.addRow({
        menuType: 'Bar',
        category: category.name,
        name: item.name,
        description: item.description || '',
        price: item.price || '',
        bottlePrice: item.bottlePrice || '',
        dietary: item.dietary ? (Array.isArray(item.dietary) ? item.dietary.join(', ') : item.dietary) : '',
        spiceLevel: item.spiceLevel || '',
        isChefSpecial: item.isChefSpecial ? 'Yes' : '',
        isRecommended: item.isRecommended ? 'Yes' : '',
        isAvailable: item.isAvailable !== false ? 'Yes' : 'No',
        id: item.id
      });
      overviewCount++;
    });
  });

  cafeMenu.categories.forEach(category => {
    category.items.forEach(item => {
      overviewSheet.addRow({
        menuType: 'Cafe',
        category: category.name,
        name: item.name,
        description: item.description || '',
        price: item.price || '',
        bottlePrice: item.bottlePrice || '',
        dietary: item.dietary ? (Array.isArray(item.dietary) ? item.dietary.join(', ') : item.dietary) : '',
        spiceLevel: item.spiceLevel || '',
        isChefSpecial: item.isChefSpecial ? 'Yes' : '',
        isRecommended: item.isRecommended ? 'Yes' : '',
        isAvailable: item.isAvailable !== false ? 'Yes' : 'No',
        id: item.id
      });
      overviewCount++;
    });
  });

  // Apply formatting to overview sheet
  overviewSheet.eachRow((row, rowNumber) => {
    row.eachCell((cell, colNumber) => {
      cell.border = {
        top: { style: 'thin', color: { argb: 'FFD3D3D3' } },
        left: { style: 'thin', color: { argb: 'FFD3D3D3' } },
        bottom: { style: 'thin', color: { argb: 'FFD3D3D3' } },
        right: { style: 'thin', color: { argb: 'FFD3D3D3' } }
      };

      if (rowNumber > 1) {
        if (colNumber === 5 || colNumber === 6) {
          cell.alignment = { vertical: 'middle', horizontal: 'right' };
          cell.numFmt = '₹#,##0';
        } else if (colNumber === 4) {
          cell.alignment = { vertical: 'middle', wrapText: true };
        } else if (colNumber >= 7) {
          cell.alignment = { vertical: 'middle', horizontal: 'center' };
        } else {
          cell.alignment = { vertical: 'middle', horizontal: 'left' };
        }

        if (cell.value === 'Yes' && colNumber === 9) {
          row.getCell(9).fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'FFFFEB3B' }
          };
          row.getCell(9).font = { bold: true };
        }

        if (cell.value === 'Yes' && colNumber === 10) {
          row.getCell(10).fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'FF90EE90' }
          };
          row.getCell(10).font = { bold: true };
        }
      }
    });

    if (rowNumber > 1 && rowNumber % 2 === 0) {
      row.eachCell((cell, colNumber) => {
        if (colNumber !== 9 && colNumber !== 10) {
          cell.fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'FFF9F9F9' }
          };
        }
      });
    }
  });

  overviewSheet.autoFilter = {
    from: 'A1',
    to: `L${overviewSheet.rowCount}`
  };

  overviewSheet.views = [
    { state: 'frozen', ySplit: 1 }
  ];

  console.log(`   ✓ Added ${overviewCount} total items`);

  // Generate filename with date stamp
  const date = new Date();
  const dateStamp = date.toISOString().split('T')[0];
  const filename = `Amante_Complete_Menu_${dateStamp}.xlsx`;

  // Save file
  await workbook.xlsx.writeFile(filename);

  console.log('\n✅ Excel file created successfully!');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('📁 Filename:', filename);
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('\n📊 Summary Statistics:');
  console.log('  Sheet 1 - Food Menu:', foodCount, 'items');
  console.log('  Sheet 2 - Bar Menu:', barCount, 'items');
  console.log('  Sheet 3 - Cafe & Bakery:', cafeCount, 'items');
  console.log('  Sheet 4 - Complete Overview:', overviewCount, 'items');
  console.log('  ──────────────────────────────────────');
  console.log('  TOTAL ITEMS:', (foodCount + barCount + cafeCount), '✓');
  console.log('\n✨ All menu items included with:');
  console.log('  ✓ Auto-filters on all columns');
  console.log('  ✓ Frozen header rows');
  console.log('  ✓ Alternating row colors');
  console.log('  ✓ Price formatting (₹)');
  console.log('  ✓ Chef Special highlights (yellow)');
  console.log('  ✓ Recommended highlights (green)');
  console.log('  ✓ Print-ready layout');
  console.log('\n');
}

generateCompleteMenuExcel().catch(console.error);
