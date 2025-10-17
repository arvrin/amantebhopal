// Verify Food Menu - Compare actual PDF items with JSON
const foodMenu = require('../src/data/menus/food.json');

console.log('🔍 FOOD MENU VERIFICATION (Food Final menu_2025.pdf)\n');
console.log('='.repeat(80) + '\n');

// Items from actual Food Final menu_2025.pdf
const pdfItems = {
  'Vegetable and Silken Tofu Appetizers': [
    { name: 'Yasai Yakitori', price: 549, dietary: 'veg' },
    { name: 'Crispy lotus stem plum chili sauce', price: 549, dietary: 'veg' },
    { name: 'Silken tofu tempura tacosbao', price: 499, dietary: 'veg' },
    { name: 'Vegetable togarashi Tempura', price: 549, dietary: 'veg' },
    { name: 'Bharwan paneer tikka', price: 599, dietary: 'veg' },
    { name: 'Peri Peri Truffle Fries', price: 299, dietary: 'veg' },
    { name: 'Truffle mushroom bruschetta', price: 599, dietary: 'veg' },
    { name: 'Thai Glass noodle vegetable spring roll', price: 599, dietary: 'veg' },
    { name: 'Hunan Chilli crispy corn kernels', price: 499, dietary: 'veg' },
    { name: 'Crispy togarashi fried corn kernels', price: 499, dietary: 'veg' },
    { name: 'Hunan ChilliTofu, cottage cheese', price: 699, dietary: 'veg' },
    { name: 'Malai Lahsuni soya chap', price: 599, dietary: 'veg' },
    { name: 'Mango MakaiChonda ki tiki', price: 499, dietary: 'veg' },
    { name: 'Mushroom Galouti kebab', price: 699, dietary: 'veg' },
    { name: 'Spinach ricotta vol-au-vent', price: 499, dietary: 'veg' },
    { name: 'Corn and truffle mushroom crispy ravioli', price: 599, dietary: 'veg' }
  ],

  'Non-Veg Appetizers': [
    { name: 'Shrimp tempura', price: 799, dietary: 'non-veg' },
    { name: 'Chicken teriyaki Skewers', price: 599, dietary: 'non-veg' },
    { name: 'Sumac spice crispy fried fish', price: 899, dietary: 'non-veg' },
    { name: 'Chicken lollipop', price: 699, dietary: 'non-veg' },
    { name: 'Bharwan Angara murghtikka', price: 699, dietary: 'non-veg' },
    { name: 'Dry nutsGilafi Mutton seekh kebab', price: 799, dietary: 'non-veg' },
    { name: 'Lehsuni Malai Murg Tikka', price: 599, dietary: 'non-veg' },
    { name: 'Nawabi Tangdi kebab', price: 799, dietary: 'non-veg' },
    { name: 'Bhopalimurgh tikka mirza', price: 699, dietary: 'non-veg' },
    { name: 'Schezwanking prawns', price: 999, dietary: 'non-veg' },
    { name: 'Tandoori Fish tikka', price: 899, dietary: 'non-veg' },
    { name: 'Amante special KadakNath tandoori', price: 1499, dietary: 'non-veg' },
    { name: 'Amante special tandoori bater (Quail)', price: 799, dietary: 'non-veg' },
    { name: 'Amante special Mutton GaloutiKebab', price: 999, dietary: 'non-veg' }
  ],

  'Dim Sums, Bao and Gyoza': [
    { name: 'Vegetable edamame asparagus Gyoza', price: 699, dietary: 'veg' },
    { name: 'Wild mushroom asparagus crystal dumpling', price: 699, dietary: 'veg' },
    { name: 'Prawn and water chestnut Hargao', price: 799, dietary: 'non-veg' },
    { name: 'Pickled celery Ginger Chicken Gyoza', price: 699, dietary: 'non-veg' },
    { name: 'Katsu hoi sin chicken Bao Wagamama', price: 799, dietary: 'non-veg' }
  ],

  'Salads': [
    { name: 'Bamboo shoots Avocado Salad', price: 599, dietary: 'veg' },
    { name: 'Thai Grilled chicken salad', price: 799, dietary: 'non-veg' },
    { name: 'Mélange of nuts mix fruits chat', price: 799, dietary: 'veg' },
    { name: 'Lebanese Mezze Platter', price: 899, dietary: 'veg' },
    { name: 'Nachos king founded Platter', price: 699, dietary: 'veg' },
    { name: 'Classic Caesar Salad', price: 699, dietary: 'veg' },
    { name: 'Healthy garden green sprout Salad with caramelized walnuts', price: 699, dietary: 'veg' },
    { name: 'Chef interactive Greek Salad veg', price: 599, dietary: 'veg' },
    { name: 'Indian garden green salad', price: 299, dietary: 'veg' }
  ],

  'Soups, Broth and Ramen': [
    { name: 'Cream of tomato soup', price: 399, dietary: 'veg' },
    { name: 'Vegetable Ramen', price: 599, dietary: 'veg' },
    { name: 'WildMushroom quinoa Soup', price: 499, dietary: 'veg' },
    { name: 'Tomato Dhaniya ka shorba', price: 399, dietary: 'veg' },
    { name: 'Hong Kong hot and sour soup', price: 399, dietary: 'veg' },
    { name: 'Hungarian Mushroom Soup', price: 599, dietary: 'veg' },
    { name: 'Chicken Shio Rameen', price: 599, dietary: 'non-veg' },
    { name: 'Smoked chicken Tomato and Almond soup', price: 499, dietary: 'non-veg' },
    { name: 'Thai signature tom yumsoup', price: 499, dietary: 'veg' },
    { name: 'Mutton Yakini shorba', price: 499, dietary: 'non-veg' },
    { name: 'Badami murgh Yakini shorba', price: 499, dietary: 'non-veg' },
    { name: 'Burmese khowsuey', price: 499, dietary: 'non-veg' }
  ],

  'Sushi': [
    { name: 'Amante Midori Roll', price: 899, dietary: 'veg' },
    { name: 'Crisp Amante uramaki', price: 1199, dietary: 'veg' },
    { name: 'Vegetable tempura uramaki', price: 999, dietary: 'veg' },
    { name: 'Pickled wild mushroom and tofu roll', price: 999, dietary: 'veg' },
    { name: 'Shrimp tempura crispyuramaki', price: 1299, dietary: 'non-veg' },
    { name: 'Grilled chicken avocado spicy roll', price: 1099, dietary: 'non-veg' },
    { name: 'Sushi fish tempurarolls', price: 1299, dietary: 'non-veg' }
  ],

  'Burgers and Sandwiches': [
    { name: 'Amante special vegetable burger', price: 499, dietary: 'veg' },
    { name: 'Amante special chicken burger', price: 599, dietary: 'non-veg' },
    { name: 'Amante chef special chicken club sandwich', price: 699, dietary: 'non-veg' },
    { name: 'Amante chef special vegetable club sandwich', price: 599, dietary: 'veg' },
    { name: 'Amante chef special vegetable grilledsandwich', price: 499, dietary: 'veg' },
    { name: 'Amante chef special chickengrilledsandwich', price: 599, dietary: 'non-veg' }
  ],

  'Pizza': [
    { name: 'Classic Burrata pizza', price: 699, dietary: 'veg' },
    { name: 'Pizza Latin aioli & Quattro fromage', price: 999, dietary: 'veg' },
    { name: 'Classic margarita pizza', price: 899, dietary: 'veg' },
    { name: 'Amante special interactivegarden green pizza', price: 899, dietary: 'veg' },
    { name: 'Pizza paneer tikka', price: 999, dietary: 'veg' },
    { name: 'Pizza grilled chicken Divola', price: 1099, dietary: 'non-veg' },
    { name: 'PizzaPollo Indiana', price: 899, dietary: 'non-veg' },
    { name: 'Lamb pepperoni pizza', price: 1399, dietary: 'non-veg' }
  ],

  'Indian Main Course': [
    { name: 'Faldaari kofta cury', price: 599, dietary: 'veg' },
    { name: 'Amante Gunchawsubzi', price: 499, dietary: 'veg' },
    { name: "chefs' special vegetable korma", price: 599, dietary: 'veg' },
    { name: 'Amante chef interactive kaju makhana curry', price: 699, dietary: 'veg' },
    { name: 'Lehsuni bhuna palak', price: 599, dietary: 'veg' },
    { name: 'SubzNizami handi', price: 699, dietary: 'veg' },
    { name: 'Paneer makhani', price: 699, dietary: 'veg' },
    { name: 'Dal double tadka', price: 599, dietary: 'veg' },
    { name: 'Amante Chef special dal makhani', price: 699, dietary: 'veg' },
    { name: 'BhopaliMutton nihari', price: 999, dietary: 'non-veg' },
    { name: 'Mutton rogan josh', price: 999, dietary: 'non-veg' },
    { name: 'Bhopali mutton rezala', price: 1099, dietary: 'non-veg' },
    { name: 'chef special Butter chicken', price: 699, dietary: 'non-veg' },
    { name: 'Chef Special Chicken Tikka Keema Masala', price: 899, dietary: 'non-veg' },
    { name: 'Kacchi mirchi ka murgh', price: 799, dietary: 'non-veg' },
    { name: 'Chef special BhopaliKadak Nath', price: 1499, dietary: 'non-veg' },
    { name: 'Chef special bhopali Bater', price: 999, dietary: 'non-veg' },
    { name: 'Chef interactive flavored grilled Bhupali lamb chop', price: 1499, dietary: 'non-veg' }
  ],

  'Rice, Pulao and Biryani': [
    { name: 'Vegetable tawa pulao', price: 499, dietary: 'veg' },
    { name: 'Dum pukht vegetable pulao', price: 599, dietary: 'veg' },
    { name: 'Hyderabadi chickendum biriyani', price: 799, dietary: 'non-veg' },
    { name: 'Hyderabadimutton dum biriyani', price: 999, dietary: 'non-veg' },
    { name: 'Amante Chef Signature pulao', price: 699, dietary: 'veg' },
    { name: 'Burnt garlic chicken fried rice', price: 599, dietary: 'non-veg' },
    { name: 'Stemmed rice, jeera rice, curd rice', price: 499, dietary: 'veg' }
  ],

  'Hot Clay Pot and Tandoor': [
    { name: 'Khamiri garlic naan', price: 99, dietary: 'veg' },
    { name: 'missi roti', price: 79, dietary: 'veg' },
    { name: 'Tandoori roti', price: 59, dietary: 'veg' },
    { name: 'Cheese chilli garlic naan', price: 119, dietary: 'veg' },
    { name: 'Lachhaparatha', price: 110, dietary: 'veg' },
    { name: 'Chef signature lachha garlic naan', price: 149, dietary: 'veg' }
  ],

  'Pasta, Ravioli and Risotto': [
    { name: 'Fettuccini Primavera with Basil pesto', price: 799, dietary: 'veg' },
    { name: 'Lemon Ricotta Ravioli', price: 699, dietary: 'veg' },
    { name: 'Amante classicvegetable lasagna', price: 899, dietary: 'veg' },
    { name: 'Wild mushroom risotto with porcini cream', price: 799, dietary: 'veg' },
    { name: 'Grilled mascarpone Polenta with Roasted Pinenuts', price: 699, dietary: 'veg' },
    { name: 'Japanese curry bowl – Vegetarian donburi', price: 899, dietary: 'veg' }
  ],

  'Grills & Mains': [
    { name: 'Amante peaking chicken', price: 4999, dietary: 'non-veg' },
    { name: 'Grilled Baby Chicken', price: 799, dietary: 'non-veg' },
    { name: 'GrilledMoroccan lamb Chop', price: 1499, dietary: 'non-veg' },
    { name: 'Lemon & Thyme Chicken Milanese', price: 799, dietary: 'non-veg' },
    { name: 'Chimichurri Red mural fish', price: 999, dietary: 'non-veg' },
    { name: 'Grilled king Prawns', price: 1199, dietary: 'non-veg' },
    { name: 'Japanese curry bowl – Chicken don buri', price: 799, dietary: 'non-veg' }
  ],

  'Noodle Bowls': [
    { name: 'Noodle bowlHakka /Chilli garlic', price: 599, dietary: 'veg' },
    { name: 'Udom noodle bowl', price: 699, dietary: 'veg' },
    { name: 'Soba noodle bowl', price: 699, dietary: 'veg' },
    { name: 'Pad Thai noodle bowl', price: 699, dietary: 'veg' },
    { name: 'Green/red Thaicurry bowl', price: 699, dietary: 'veg' }
  ],

  'Desserts': [
    { name: 'Single origin chocolateMarquis', price: 699, dietary: 'veg' },
    { name: 'Classic Tiramisu', price: 499, dietary: 'veg' },
    { name: "Joconde fresh fruits Dome Entremets'", price: 599, dietary: 'veg' },
    { name: 'Earl Grey Panna Cotta', price: 399, dietary: 'veg' },
    { name: 'Gelatoand chefchoice ice cream', price: 300, dietary: 'veg' },
    { name: 'Mawa bati', price: 599, dietary: 'veg' },
    { name: 'Akhrothalwa', price: 799, dietary: 'veg' },
    { name: 'Vaklaba', price: 499, dietary: 'veg' },
    { name: 'Amantekulfi faludaDelite', price: 499, dietary: 'veg' },
    { name: 'Classic pistachio shahi kunafa', price: 599, dietary: 'veg' },
    { name: 'Belgium Chocolate Mousse, toasted marshmallow, caramelized nuts', price: 659, dietary: 'veg' },
    { name: 'Mix fruits Cremieux', price: 399, dietary: 'veg' },
    { name: 'Baked Cheese Cake with Sour Cherry Compote', price: 449, dietary: 'veg' },
    { name: 'Classic Walnut Brownie with vanilla Ice cream', price: 599, dietary: 'veg' },
    { name: 'Apple Cinnamon Tart with Vanilla Ice Cream', price: 449, dietary: 'veg' },
    { name: 'Kesari Rasmalai', price: 449, dietary: 'veg' }
  ]
};

// Flatten all JSON items
const jsonItems = new Map();
foodMenu.categories.forEach(category => {
  category.items.forEach(item => {
    // Normalize name for matching
    const normalizedName = item.name.toUpperCase().trim();
    jsonItems.set(normalizedName, {
      category: category.name,
      price: item.price,
      description: item.description,
      dietary: item.dietary,
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
      const dietaryIcon = pdfItem.dietary === 'veg' ? '🟢' : '🔴';
      const priceMatch = jsonData.price === pdfItem.price ? '✓' : `⚠️ (PDF: ₹${pdfItem.price}, JSON: ₹${jsonData.price})`;
      console.log(`✅ ${pdfItem.name} - ${priceMatch} ${dietaryIcon} (${jsonData.category})`);
      foundItems.push(pdfItem.name);
    } else {
      totalMissing++;
      categoryMissing.push(pdfItem);
      const dietaryIcon = pdfItem.dietary === 'veg' ? '🟢' : '🔴';
      console.log(`❌ MISSING: ${pdfItem.name} - ₹${pdfItem.price} ${dietaryIcon}`);
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
      const dietaryIcon = item.dietary === 'veg' ? '🟢' : '🔴';
      console.log(`  - ${item.name} - ₹${item.price} ${dietaryIcon}`);
    });
  });
}

console.log('\n' + '='.repeat(80));
console.log(`\n📋 PDF contains ${Object.keys(pdfItems).length} categories with ${totalPdfItems} total items`);
console.log(`📋 JSON contains ${foodMenu.categories.length} categories with ${jsonItems.size} total items\n`);
