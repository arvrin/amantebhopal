// Verify Food Menu - Compare PDF items with JSON
const foodMenu = require('../src/data/menus/food.json');

console.log('🔍 FOOD MENU VERIFICATION\n');
console.log('='.repeat(80) + '\n');

// Items from PDF that should be in JSON (based on Food Final menu_2025.pdf)
const pdfItems = {
  'Appetizers & Starters': [
    // Asian Appetizers
    'Yasai Yakitori',
    'Crispy Lotus Stem Plum Chili Sauce',
    'Silken Tofu Tempura Tacos Bao',
    'Vegetable Togarashi Tempura',
    'Grilled Peri Peri Paneer',
    'Fried Cottage Cheese in Black Pepper',
    'Teriyaki Glazed Chicken',
    'Chicken Yakitori',
    'Chicken Tempura Tacos Bao',
    'Sweet & Sour Chicken',
    'Chicken Lollipop Dry',
    'Kung Pao Chicken',
    'Korean Fried Chicken',
    'Crispy Chilli Fish',
    'Fish Tempura Tacos Bao',
    'Thai Golden Prawns',
    'Grilled Thai Prawns',

    // Indian Appetizers
    'Paneer Kurkure',
    'Mushroom Galauti Kebab',
    'Hara Bhara Kebab',
    'Paneer Tikka',
    'Achari Paneer Tikka',
    'Veg Seekh Kebab',
    'Stuffed Tandoori Mushroom',
    'Bharwan Tandoori Aloo',
    'Chicken Tikka',
    'Chicken Malai Tikka',
    'Chicken Hariyali Tikka',
    'Achari Chicken Tikka',
    'Chicken Seekh Kebab',
    'Tangri Kebab',
    'Mutton Seekh Kebab',
    'Mutton Gilafi Seekh',
    'Fish Tikka',
    'Tandoori Fish Tikka',
    'Prawn Tikka',
    'Tandoori Prawn',

    // Continental Appetizers
    'Classic Buffalo Wings',
    'Honey Chilli Potato',
    'Jalapeno Cheese Poppers',
    'Cheese Garlic Bread',
    'Onion Rings',
    'Garlic Bread',
    'Nachos with Cheese Sauce',
    'Fish N Chips',
    'Cajun Spiced Chicken',
    'Chicken Cheese Garlic Bread',
    'Chicken Popcorn',
    'Peri Peri Chicken Wings'
  ],

  'Soups': [
    'Tom Yum Soup',
    'Lemon Coriander Soup',
    'Hot & Sour Soup',
    'Cream of Tomato Soup',
    'Cream of Mushroom Soup',
    'Sweet Corn Soup',
    'Manchow Soup',
    'Chicken Clear Soup',
    'Chicken Hot & Sour Soup',
    'Chicken Manchow Soup',
    'Chicken Sweet Corn Soup',
    'Chicken Lemon Coriander'
  ],

  'Salads': [
    'Garden Fresh Salad',
    'Greek Salad',
    'Caesar Salad',
    'Chicken Caesar Salad',
    'Asian Grilled Chicken Salad'
  ],

  'Main Course - Asian': [
    'Steamed Rice',
    'Veg Fried Rice',
    'Hakka Noodles',
    'Chilli Garlic Noodles',
    'Singapore Noodles',
    'Thai Red Curry',
    'Thai Green Curry',
    'American Chopsuey',
    'Egg Fried Rice',
    'Chicken Fried Rice',
    'Chicken Hakka Noodles',
    'Chicken Chilli Garlic Noodles',
    'Chicken Singapore Noodles',
    'Chicken Thai Red Curry',
    'Chicken Thai Green Curry',
    'Chicken American Chopsuey'
  ],

  'Main Course - Indian': [
    'Dal Tadka',
    'Dal Makhani',
    'Paneer Butter Masala',
    'Kadhai Paneer',
    'Palak Paneer',
    'Paneer Lababdar',
    'Paneer Tikka Masala',
    'Mushroom Masala',
    'Veg Kolhapuri',
    'Mix Veg Curry',
    'Malai Kofta',
    'Butter Chicken',
    'Chicken Tikka Masala',
    'Chicken Curry',
    'Kadhai Chicken',
    'Chicken Lababdar',
    'Chicken Kolhapuri',
    'Mutton Rogan Josh',
    'Mutton Curry',
    'Mutton Keema'
  ],

  'Breads': [
    'Tandoori Roti',
    'Butter Roti',
    'Missi Roti',
    'Plain Naan',
    'Butter Naan',
    'Garlic Naan',
    'Cheese Naan',
    'Stuffed Kulcha',
    'Laccha Paratha',
    'Pudina Paratha'
  ],

  'Biryani & Rice': [
    'Veg Biryani',
    'Paneer Biryani',
    'Chicken Biryani',
    'Mutton Biryani',
    'Jeera Rice',
    'Plain Rice'
  ],

  'Pizza': [
    'Margherita Pizza',
    'Farm Fresh Pizza',
    'Peppy Paneer Pizza',
    'Mexican Wave Pizza',
    'Chicken Tikka Pizza',
    'Chicken Supreme Pizza',
    'Peri Peri Chicken Pizza',
    'BBQ Chicken Pizza'
  ],

  'Pasta': [
    'Penne Arrabiata',
    'Penne Pink Sauce',
    'Penne Alfredo',
    'Mac N Cheese',
    'Pesto Pasta',
    'Aglio Olio',
    'Chicken Penne Arrabiata',
    'Chicken Penne Pink Sauce',
    'Chicken Penne Alfredo',
    'Chicken Pesto Pasta',
    'Chicken Aglio Olio'
  ],

  'Burgers & Sandwiches': [
    'Classic Veg Burger',
    'Paneer Tikka Burger',
    'Mushroom Burger',
    'Mexican Veg Burger',
    'Veg Club Sandwich',
    'Grilled Veg Sandwich',
    'Classic Chicken Burger',
    'Peri Peri Chicken Burger',
    'BBQ Chicken Burger',
    'Chicken Club Sandwich',
    'Grilled Chicken Sandwich'
  ],

  'Desserts': [
    'Gulab Jamun',
    'Rasgulla',
    'Brownie with Ice Cream',
    'Chocolate Mousse',
    'Tiramisu',
    'Cheesecake',
    'Ice Cream (Per Scoop)'
  ]
};

// Flatten all JSON items
const jsonItems = new Map();
foodMenu.categories.forEach(category => {
  category.items.forEach(item => {
    jsonItems.set(item.name.toUpperCase(), {
      category: category.name,
      price: item.price,
      description: item.description,
      dietary: item.dietary
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
      const dietaryIcon = jsonData.dietary?.includes('veg') && !jsonData.dietary?.includes('non-veg') ? '🟢' :
                          jsonData.dietary?.includes('non-veg') ? '🔴' : '⚪';
      console.log(`✅ ${itemName} - ₹${jsonData.price} ${dietaryIcon} (${jsonData.category})`);
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
console.log(`\n📋 JSON contains ${foodMenu.categories.length} categories with ${jsonItems.size} total items\n`);
