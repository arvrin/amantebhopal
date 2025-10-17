// Add bottle prices to bar menu items
const fs = require('fs');
const path = require('path');

const barMenuPath = path.join(__dirname, '../src/data/menus/bar.json');
const barMenu = require(barMenuPath);

// Bottle prices from PDF (BOTTLE price, 30ML/90ML price already in JSON as 'price')
const bottlePrices = {
  // Premium & Scotch Whisky
  'JW BLUE LABEL': 26999,
  'ROYAL SALUTE 21YR': 24999,
  'JW GOLD LABEL': 12999,
  'JW BLACK LABEL': 8999,
  'JW DOUBLE BLACK': 11999,
  'JW BLONDE': 6999,
  'BLACKDOG 8 YEARS': 4999,
  'BLACK & WHITE': 5199,
  'DEWARS WHITE LABEL': 5199,
  'JW RED LABEL': 5199,
  'MONKEY SHOULDER': 9999,
  "BALLANTINE'S 7YRS": 6999,
  'CHIVAS REGAL 15YRS': 10999,
  'CHIVAS REGAL 12YRS': 8999,
  "BALLANTINE'S 12YRS": 7499,
  "BALLANTINE'S FINEST": 5999,
  '100 PIPERS 8YRS': 5999,
  '100 PIPERS 12YRS': 7499,
  "TEACHER'S 50": 7499,
  "TEACHER'S HIGHLAND": 4999,

  // Single Malt Whisky
  'GLENFIDDICH 15YRS': 14999,
  'GLENFIDDICH 12YRS': 10999,
  'INDRI': 9999,
  'BALVENIE': 15999,
  'THE GLENLIVET 15YRS': 14999,
  'GLENMORANGE ORIGINAL': 12999,
  'THE GLENLIVET 12YRS': 10999,
  'ABERLOUR 12YRS': 14999,
  'TALISKER 10 YRS': 9999,
  'LAGAVULIN 16YRS': 19999,
  'MACALLAN': 17999,
  'PAUL JOHN NIRVANA': 5999,
  "GRANT'S": 5499,
  'RAMPUR ASAVA': 15999,
  'RAMPUR DOUBLE CASK': 10999,
  'SANGAM WORLD MALT': 9999,
  'GODAWAN': 10999,
  'SINGLETON 12 YRS': 10999,

  // American/Irish/Bourbon Whisky
  'TOKI': 8999,
  'JIM BEAM': 5999,
  'JAMESON': 5999,

  // Vodka
  'ROBERTO CAVALLI': 15999,
  'GREY GOOSE': 9999,
  'CIROC': 9999,
  'ABSOLUT': 5999,
  'BELVEDRE': 9999,
  'SAUSAGE TREE IRISH': 10999,
  'MAGIC MOMENT': 3999,
  'SMIRNOFF': 4499,

  // Tequila
  'PATRON SILVER': 15999,
  'CAMINO': 6999,
  'DONJULIO': 15999,

  // Gin
  'BOMBAY SAPPHIRE': 5999,
  'NICOBAR': 5999,
  'BEEFEATER': 5999,
  'TANQUERAY': 5999,
  'ROKU': 9999,
  'GREATER THAN': 4999,
  'JAISALMER': 9999,
  'HENDRICKS': 9999,

  // Rum
  'BACARDI WHITE': 3999,
  'BACARDI LEMON': 3999,
  'BACARDI BLACK': 3999,
  'HAVANA': 4999,
  'OLD MONK': 3999,

  // Brandy
  'HENNESSEY VS': 10999,
  'MORPHEUS': 3999,

  // Liqueurs
  'KAHLUA': 4999,
  'BAILEYS': 5499,
  'JAGERMEISTER': 7999,
  'APEROL': 4999,
  'CAMPARI': 4999,
  'MALIBU': 4999,
  'COINTREAU': 4999,
  'FIREBALL': 3999,
  'SAMBUCA': 4999,

  // Wines (bottle prices)
  "JACOB'S SHIRAZ": 3999,
  'SULA CABERNET SHIRAZ': 3499,
  "JACOB'S CREEK": 3999,
  'SULA CHENIN BLANC': 3499,

  // Champagne (all are bottles, no serving price)
  // Already have bottle prices as main price

  // Beers
  'KINGFISHER ULTRA': 699, // 650ml bottle
  'KINGFISHER PREMIUM': 599, // only 650ml
  'HEINEKEN': 749, // 650ml bottle
  'CORONA': null, // only 330ml
  'HOGARDEN': null, // only 330ml
  'BUDWEISER': 749, // 650ml bottle
  'BREEZER': 349 // bottle price
};

console.log('🔧 Adding bottle prices to bar menu...\n');

let addedCount = 0;
let skippedCount = 0;

barMenu.categories.forEach(category => {
  category.items.forEach(item => {
    const itemName = item.name.toUpperCase();

    // Check if bottle price exists for this item
    if (bottlePrices.hasOwnProperty(itemName)) {
      const bottlePrice = bottlePrices[itemName];

      if (bottlePrice !== null) {
        item.bottlePrice = bottlePrice;
        console.log(`✅ Added bottle price to ${item.name}: ₹${bottlePrice}`);
        addedCount++;
      } else {
        console.log(`⏭️  Skipped ${item.name} (no bottle option)`);
        skippedCount++;
      }
    }
  });
});

// Save updated menu
fs.writeFileSync(barMenuPath, JSON.stringify(barMenu, null, 2));

console.log('\n' + '='.repeat(80));
console.log(`\n✅ Successfully added bottle prices!`);
console.log(`   Items updated: ${addedCount}`);
console.log(`   Items skipped: ${skippedCount}`);
console.log(`\n📁 Updated file: ${barMenuPath}\n`);
