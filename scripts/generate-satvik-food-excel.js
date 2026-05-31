/**
 * Generate a well-formatted Excel workbook for the Amante Satvik FOOD menu.
 *
 * Scope: food only — Breakfast (food-breakfast.json) + Satvik Food (food-satvik.json).
 * Bar and Café menus are intentionally excluded.
 *
 * Output: Amante_Satvik_Food_Menu.xlsx
 *   - "Index" cover sheet summarising every category + item counts
 *   - One worksheet tab per category (prefixed "BF:" / "SV:" so they group)
 *   - All items included; an "Available" column flags anything not currently served.
 */

const fs = require('fs');
const path = require('path');
const ExcelJS = require('exceljs');

// ---- Brand palette (matches the /amantesatvik web theme) ----
const GREEN = 'FF2F5233'; // primary satvik green
const GREEN_DARK = 'FF233D26';
const GOLD = 'FFC9A227'; // saffron / gold accent
const GREEN_LIGHT = 'FFE7EEE8'; // soft banner / zebra fill
const GOLD_LIGHT = 'FFF6EFD6';
const WHITE = 'FFFFFFFF';
const GREY_BORDER = 'FFD9D9D9';
const TEXT_DARK = 'FF1A2E1D';

const SOURCES = [
  { file: 'food-breakfast.json', prefix: 'BF', label: 'Breakfast' },
  { file: 'food-satvik.json', prefix: 'SV', label: 'Satvik Food' },
];

const COLUMNS = [
  { header: '#', key: 'sno', width: 5 },
  { header: 'Item Name', key: 'name', width: 38 },
  { header: 'Description', key: 'description', width: 70 },
  { header: 'Price (₹)', key: 'price', width: 12 },
  { header: 'Diet', key: 'diet', width: 10 },
  { header: 'Spice', key: 'spice', width: 9 },
  { header: "Chef's Special", key: 'chef', width: 14 },
  { header: 'Recommended', key: 'recommended', width: 13 },
  { header: 'Available', key: 'available', width: 11 },
];

const thinBorder = {
  top: { style: 'thin', color: { argb: GREY_BORDER } },
  left: { style: 'thin', color: { argb: GREY_BORDER } },
  bottom: { style: 'thin', color: { argb: GREY_BORDER } },
  right: { style: 'thin', color: { argb: GREY_BORDER } },
};

function dietLabel(dietary = []) {
  if (dietary.includes('jain')) return 'Jain';
  if (dietary.includes('veg')) return 'Veg';
  return '';
}

function spiceLabel(level) {
  if (!level || level < 1) return '';
  return '🌶️'.repeat(level);
}

// Excel tab names: max 31 chars, must be unique, no : \ / ? * [ ]
function safeSheetName(name, used) {
  let base = name.replace(/[\\/?*\[\]:]/g, '').slice(0, 31);
  let candidate = base;
  let i = 2;
  while (used.has(candidate)) {
    const suffix = ` (${i})`;
    candidate = base.slice(0, 31 - suffix.length) + suffix;
    i++;
  }
  used.add(candidate);
  return candidate;
}

function styleCategorySheet(ws, source, category) {
  // Row 1: Sub-menu eyebrow + category title banner
  ws.mergeCells(1, 1, 1, COLUMNS.length);
  const titleCell = ws.getCell(1, 1);
  titleCell.value = `${source.label.toUpperCase()}  ·  ${category.name}`;
  titleCell.font = { name: 'Calibri', bold: true, size: 16, color: { argb: WHITE } };
  titleCell.alignment = { vertical: 'middle', horizontal: 'left', indent: 1 };
  titleCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: GREEN } };
  ws.getRow(1).height = 30;

  // Row 2: optional category note / sub-title
  ws.mergeCells(2, 1, 2, COLUMNS.length);
  const noteCell = ws.getCell(2, 1);
  noteCell.value = category.note
    ? category.note
    : `${category.items.length} item${category.items.length === 1 ? '' : 's'}  ·  Pure vegetarian`;
  noteCell.font = { name: 'Calibri', italic: true, size: 10, color: { argb: GREEN_DARK } };
  noteCell.alignment = { vertical: 'middle', horizontal: 'left', indent: 1 };
  noteCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: GOLD_LIGHT } };
  ws.getRow(2).height = 18;

  // Row 3: column headers
  const headerRow = ws.getRow(3);
  COLUMNS.forEach((col, idx) => {
    const cell = headerRow.getCell(idx + 1);
    cell.value = col.header;
    cell.font = { bold: true, size: 11, color: { argb: WHITE } };
    cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: GREEN_DARK } };
    cell.alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
    cell.border = thinBorder;
  });
  headerRow.height = 24;
}

function writeItems(ws, items) {
  const startRow = 4;
  items.forEach((item, idx) => {
    const r = startRow + idx;
    const row = ws.getRow(r);
    row.getCell(1).value = idx + 1;
    row.getCell(2).value = item.name || '';
    row.getCell(3).value = item.description || '';
    row.getCell(4).value = typeof item.price === 'number' ? item.price : '';
    row.getCell(5).value = dietLabel(item.dietary);
    row.getCell(6).value = spiceLabel(item.spiceLevel);
    row.getCell(7).value = item.isChefSpecial ? 'Yes' : '';
    row.getCell(8).value = item.isRecommended ? 'Yes' : '';
    row.getCell(9).value = item.isAvailable === false ? 'No' : 'Yes';

    const zebra = idx % 2 === 1;
    row.eachCell({ includeEmpty: true }, (cell, col) => {
      cell.border = thinBorder;
      cell.font = cell.font || {};
      cell.font = { name: 'Calibri', size: 11, color: { argb: TEXT_DARK } };
      if (zebra) {
        cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: GREEN_LIGHT } };
      }
      if (col === 1) cell.alignment = { vertical: 'middle', horizontal: 'center' };
      else if (col === 2) cell.alignment = { vertical: 'middle', horizontal: 'left', wrapText: true };
      else if (col === 3) cell.alignment = { vertical: 'top', horizontal: 'left', wrapText: true };
      else if (col === 4) {
        cell.alignment = { vertical: 'middle', horizontal: 'right' };
        cell.numFmt = '₹#,##0';
      } else cell.alignment = { vertical: 'middle', horizontal: 'center' };
    });

    // Item name bold
    row.getCell(2).font = { name: 'Calibri', size: 11, bold: true, color: { argb: TEXT_DARK } };
    // Jain highlight on Diet cell
    if (dietLabel(item.dietary) === 'Jain') {
      row.getCell(5).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: GOLD } };
      row.getCell(5).font = { bold: true, size: 11, color: { argb: WHITE } };
    }
    // Chef special / recommended highlight
    if (item.isChefSpecial) {
      row.getCell(7).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: GREEN } };
      row.getCell(7).font = { bold: true, size: 11, color: { argb: WHITE } };
    }
    if (item.isRecommended) {
      row.getCell(8).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: GOLD_LIGHT } };
      row.getCell(8).font = { bold: true, size: 11, color: { argb: GREEN_DARK } };
    }
    // Unavailable items: grey + strikethrough name
    if (item.isAvailable === false) {
      row.getCell(9).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFF2DEDE' } };
      row.getCell(9).font = { bold: true, size: 11, color: { argb: 'FFB22222' } };
      row.getCell(2).font = { name: 'Calibri', size: 11, bold: true, italic: true, color: { argb: 'FF999999' }, strike: true };
    }
    row.height = 30;
  });

  // Freeze header + sub-header, enable autofilter on the data table
  ws.views = [{ state: 'frozen', ySplit: 3 }];
  ws.autoFilter = {
    from: { row: 3, column: 1 },
    to: { row: 3 + items.length, column: COLUMNS.length },
  };
  COLUMNS.forEach((col, idx) => {
    ws.getColumn(idx + 1).width = col.width;
  });
}

function buildIndexSheet(workbook, plan, totals) {
  const ws = workbook.addWorksheet('Index', {
    properties: { tabColor: { argb: GOLD } },
  });
  ws.columns = [
    { width: 6 },
    { width: 16 },
    { width: 40 },
    { width: 12 },
    { width: 14 },
  ];

  // Title block
  ws.mergeCells('A1:E1');
  const t = ws.getCell('A1');
  t.value = 'AMANTE  ·  SATVIK';
  t.font = { name: 'Georgia', bold: true, size: 24, color: { argb: WHITE } };
  t.alignment = { vertical: 'middle', horizontal: 'center' };
  t.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: GREEN } };
  ws.getRow(1).height = 46;

  ws.mergeCells('A2:E2');
  const s = ws.getCell('A2');
  s.value = 'Food Menu  ·  Shuddh, soulful & satvik  ·  100% Pure Vegetarian (Jain & Satvik)';
  s.font = { italic: true, size: 11, color: { argb: GREEN_DARK } };
  s.alignment = { vertical: 'middle', horizontal: 'center' };
  s.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: GOLD_LIGHT } };
  ws.getRow(2).height = 22;

  ws.mergeCells('A3:E3');
  const meta = ws.getCell('A3');
  meta.value = '1, Mahendra Business Square, Bawadia Kalan, Bhopal  ·  +91 98937 79100  ·  www.cafeamante.com';
  meta.font = { size: 9, color: { argb: 'FF666666' } };
  meta.alignment = { vertical: 'middle', horizontal: 'center' };
  ws.getRow(3).height = 16;

  ws.addRow([]);

  // Table header
  const headerRowIdx = 5;
  const headers = ['#', 'Section', 'Category', 'Items', 'Tab'];
  const hr = ws.getRow(headerRowIdx);
  headers.forEach((h, i) => {
    const c = hr.getCell(i + 1);
    c.value = h;
    c.font = { bold: true, color: { argb: WHITE }, size: 11 };
    c.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: GREEN_DARK } };
    c.alignment = { vertical: 'middle', horizontal: i === 2 ? 'left' : 'center' };
    c.border = thinBorder;
  });
  hr.height = 22;

  let r = headerRowIdx + 1;
  plan.forEach((entry, idx) => {
    const row = ws.getRow(r);
    row.getCell(1).value = idx + 1;
    row.getCell(2).value = entry.section;
    row.getCell(3).value = entry.category;
    row.getCell(4).value = entry.count;
    const link = row.getCell(5);
    link.value = { text: entry.sheetName, hyperlink: `#'${entry.sheetName}'!A1` };
    link.font = { color: { argb: GREEN }, underline: true, size: 11 };

    const zebra = idx % 2 === 1;
    row.eachCell({ includeEmpty: true }, (cell, col) => {
      cell.border = thinBorder;
      if (zebra && col !== 5) cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: GREEN_LIGHT } };
      if (col === 3) cell.alignment = { vertical: 'middle', horizontal: 'left' };
      else cell.alignment = { vertical: 'middle', horizontal: 'center' };
    });
    r++;
  });

  // Totals row
  const totalRow = ws.getRow(r);
  totalRow.getCell(2).value = 'TOTAL';
  totalRow.getCell(3).value = `${plan.length} categories`;
  totalRow.getCell(4).value = totals.items;
  totalRow.eachCell({ includeEmpty: true }, (cell) => {
    cell.font = { bold: true, color: { argb: WHITE } };
    cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: GREEN } };
    cell.alignment = { vertical: 'middle', horizontal: 'center' };
    cell.border = thinBorder;
  });
  totalRow.getCell(3).alignment = { vertical: 'middle', horizontal: 'left' };

  // Legend
  const legendIdx = r + 2;
  ws.mergeCells(legendIdx, 1, legendIdx, 5);
  const lg = ws.getCell(legendIdx, 1);
  lg.value = 'Legend:  Veg = pure vegetarian  ·  Jain = no onion/garlic/root veg  ·  🌶️ = spice level  ·  Prices in ₹, exclusive of taxes.';
  lg.font = { italic: true, size: 9, color: { argb: 'FF666666' } };
  lg.alignment = { vertical: 'middle', horizontal: 'left', wrapText: true };

  ws.views = [{ state: 'frozen', ySplit: headerRowIdx }];
}

async function main() {
  const dataDir = path.join(__dirname, '..', 'src', 'data', 'menus');
  const workbook = new ExcelJS.Workbook();
  workbook.creator = 'Amante Satvik';
  workbook.created = new Date();
  workbook.title = 'Amante Satvik – Food Menu';

  const used = new Set();
  const plan = [];
  const totals = { items: 0 };

  // First pass: build the plan so the Index can list everything up front.
  const loaded = SOURCES.map((src) => {
    const menu = JSON.parse(fs.readFileSync(path.join(dataDir, src.file), 'utf8'));
    const cats = (menu.categories || []).map((cat) => {
      const sheetName = safeSheetName(`${src.prefix} · ${cat.name}`, used);
      plan.push({ section: src.label, category: cat.name, count: cat.items.length, sheetName });
      totals.items += cat.items.length;
      return { cat, sheetName };
    });
    return { src, cats };
  });

  buildIndexSheet(workbook, plan, totals);

  // Second pass: one worksheet per category.
  loaded.forEach(({ src, cats }) => {
    cats.forEach(({ cat, sheetName }) => {
      const ws = workbook.addWorksheet(sheetName, {
        properties: { tabColor: { argb: src.prefix === 'BF' ? GOLD : GREEN } },
      });
      styleCategorySheet(ws, src, cat);
      writeItems(ws, cat.items);
    });
  });

  const outPath = path.join(__dirname, '..', 'Amante_Satvik_Food_Menu.xlsx');
  await workbook.xlsx.writeFile(outPath);
  console.log(`✅ Wrote ${outPath}`);
  console.log(`   Tabs: ${plan.length} categories + 1 Index`);
  console.log(`   Items: ${totals.items}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
