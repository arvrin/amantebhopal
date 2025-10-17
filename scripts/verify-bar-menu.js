// Verify Bar Menu - Compare PDF items with JSON
const barMenu = require('../src/data/menus/bar.json');

console.log('🔍 BAR MENU VERIFICATION\n');
console.log('=' .repeat(80) + '\n');

// Items from PDF that should be in JSON
const pdfItems = {
  'Premium & Scotch Whisky': [
    'JW BLUE LABEL', 'ROYAL SALUTE 21Yr', 'JW GOLD LABEL', 'JW BLACK LABEL',
    'JW DOUBLE BLACK', 'JW BLONDE', 'BLACKDOG 8 YEARS', 'BLACK & WHITE',
    'DEWARS WHITE LABEL', 'JW RED LABEL', 'MONKEY SHOULDER', "BALLANTINE'S 7YRS",
    'CHIVAS REGAL 15YRS', 'CHIVAS REGAL 12YRS', "BALLANTINE'S 12YRS",
    "BALLANTINE'S FINEST", '100 PIPERS 8YRS', '100 PIPERS 12YRS',
    "TEACHER'S 50", "TEACHER'S HIGHLAND"
  ],
  'Single Malt Whisky': [
    'GLENFIDDICH 15YRS', 'GLENFIDDICH 12YRS', 'INDRI', 'BALVENIE',
    'THE GLENLIVET 15YRS', 'GLENMORANGE ORIGINAL', 'THE GLENLIVET 12YRS',
    'ABERLOUR 12YRS', 'TALISKER 10 YRS', 'LAGAVULIN 16YRS', 'MACALLAN',
    'PAUL JOHN NIRVANA', "GRANT'S", 'RAMPUR ASAVA', 'RAMPUR DOUBLE CASK',
    'SANGAM WORLD MALT', 'GODAWAN', 'SINGLETON 12 YRS'
  ],
  'American/Irish/Bourbon Whisky': [
    'TOKI', 'JIM BEAM', 'JAMESON'
  ],
  'Vodka': [
    'ROBERTO CAVALLI', 'GREY GOOSE', 'CIROC', 'ABSOLUT', 'BELVEDRE',
    'SAUSAGE TREE IRISH', 'MAGIC MOMENT', 'SMIRNOFF'
  ],
  'Tequila': [
    'PATRON SILVER', 'CAMINO', 'DONJULIO'
  ],
  'Gin': [
    'BOMBAY SAPPHIRE', 'NICOBAR', 'BEEFEATER', 'TANQUERAY', 'ROKU',
    'GREATER THAN', 'JAISALMER', 'HENDRICKS'
  ],
  'Rum': [
    'BACARDI WHITE', 'BACARDI LEMON', 'BACARDI BLACK', 'HAVANA', 'OLD MONK'
  ],
  'Brandy': [
    'HENNESSEY VS', 'MORPHEUS'
  ],
  'Wines': [
    "JACOB'S SHIRAZ", 'SULA CABERNET SHIRAZ', "JACOB'S CREEK", 'SULA CHENIN BLANC'
  ],
  'Liqueurs': [
    'KAHLUA', 'BAILEYS', 'JAGERMEISTER', 'APEROL', 'CAMPARI', 'MALIBU',
    'COINTREAU', 'FIREBALL', 'SAMBUCA'
  ],
  'Champagne': [
    'SULA SECO', 'MOET BRUT', 'MOET ROSE', 'GH MUMM', 'SULA BRUT'
  ],
  'Beers': [
    'KINGFISHER ULTRA', 'KINGFISHER PREMIUM', 'HEINEKEN', 'CORONA',
    'HOGARDEN', 'BUDWEISER', 'BREEZER CRANBEERY / JAMAICAN / BLACKBERRY'
  ],
  'Mocktails': [
    'VIRGIN MOJITO', 'BASIL WATERMELON ICED TEA', 'AMANTE BLACK MAGIC',
    'BLUE BUTTERFLY', 'MANGO DELIGHT', 'NATURES HEART', 'SAFFRON AROMA',
    'AMANTE CRANE', "AMANTE VALENTINE'S", 'AMANTE KIWI', 'LITCHI PASSION',
    'SWEET HEART', 'LEMON ICED TEA', 'FRESH LIME SODA', 'COLD PRESSED JUICE',
    'MASALA SODA'
  ],
  'Cocktails': [
    'BAR TENDER SPECIAL', 'BLOODY MARY', 'CAIPRIOSKA', 'COSMOPOLITAN',
    'CUBA LIBRE', 'GIMLET', 'GREEN APPLE MARTINI', 'GUAVA MARY',
    'HOT TODDY', 'RED WINE SANGRIA', 'WHISKY SOUR'
  ],
  'Shots': [
    'JAGERBOMB', 'GOLD BULLET', 'KAMIKAZE', 'KISS ME', 'TILL YOU DIE',
    'NIGHT STAND', 'THE TERMINATOR', 'LIQUID ACID', 'TEQUILLA GOLD'
  ],
  'Long Island Iced Tea': [
    'LIIT BRAIN HAMBRAGE', 'LIIT CLASSIC', 'LIIT ELECTRIC', 'LIIT CRANBERRY'
  ],
  'Amante Signature Cocktails': [
    'GIN SLING', 'FLORAL GOBLET', 'SUNSHINE GOBLET', 'FLORAL CRUSH',
    'AMANTE MINT LEMONADE', 'DETOX PUNCH', 'BERRY DILICIOUS', 'LOVE SUPREME',
    'KOKUMPOLITAN', 'KIWI BASIL SMASH', 'MEXICAN MARGARITA', 'YELLOW TONIC',
    'ORANGE BLOSSOM', 'JUNGLE BIRD', 'SPICY MAIDEN', 'SOUR STORY',
    'TROPICAL NECTAR', 'AMANTE OLD FASHION'
  ]
};

// Flatten all JSON items
const jsonItems = new Map();
barMenu.categories.forEach(category => {
  category.items.forEach(item => {
    jsonItems.set(item.name.toUpperCase(), {
      category: category.name,
      price: item.price,
      description: item.description
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
      console.log(`✅ ${itemName} - ₹${jsonData.price} (${jsonData.category})`);
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
console.log(`\n📋 JSON contains ${barMenu.categories.length} categories with ${jsonItems.size} total items\n`);
