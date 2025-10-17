// Add missing food items from PDF to JSON
const fs = require('fs');
const path = require('path');

const foodMenuPath = path.join(__dirname, '../src/data/menus/food.json');
const foodMenu = require(foodMenuPath);

console.log('🔧 Adding missing food items to menu...\n');

// Missing items organized by category with proper details
const missingItems = {
  'Appetizers & Starters': [
    {
      id: 'food-app-018',
      name: 'Silken Tofu Tempura Tacos Bao',
      description: 'Sriracha spicy mayo, Roasted chili sauce teriyaki sauce',
      price: 499,
      category: 'appetizers',
      dietary: ['veg'],
      isAvailable: true
    },
    {
      id: 'food-app-019',
      name: 'Crispy Togarashi Fried Corn Kernels',
      description: 'Japanese shichimi spice crispy corn chili oil',
      price: 499,
      category: 'appetizers',
      dietary: ['veg'],
      isAvailable: true
    },
    {
      id: 'food-app-020',
      name: 'Hunan Chilli Tofu',
      description: 'Sliced Silken Tofu, cottage cheese celery and burnt chili',
      price: 699,
      category: 'appetizers',
      dietary: ['veg'],
      isAvailable: true
    },
    {
      id: 'food-app-021',
      name: 'Malai Lahsuni Soya Chap',
      description: 'Yogurt, creamy, garlic, Indian spice hari chutney',
      price: 599,
      category: 'appetizers',
      dietary: ['veg'],
      isAvailable: true
    },
    {
      id: 'food-app-022',
      name: 'Mango Makai Chonda Ki Tiki',
      description: 'Crispy fried makai ki tiki served with dip',
      price: 499,
      category: 'appetizers',
      dietary: ['veg'],
      isAvailable: true
    },
    {
      id: 'food-app-023',
      name: 'Spinach Ricotta Vol-au-vent',
      description: 'Crispy puff creamy spinach served with ricotta herb cheese',
      price: 499,
      category: 'appetizers',
      dietary: ['veg'],
      isAvailable: true
    },
    {
      id: 'food-app-024',
      name: 'Corn and Truffle Mushroom Crispy Ravioli',
      description: 'Crispy fried ravioli creamy spinach served with anticuchera sauce',
      price: 599,
      category: 'appetizers',
      dietary: ['veg'],
      isAvailable: true
    },
    {
      id: 'food-app-025',
      name: 'Sumac Spice Crispy Fried Fish',
      description: 'Avocado puree, sumac spice, ponzu mayo chimichuri',
      price: 899,
      category: 'appetizers',
      dietary: ['non-veg'],
      isAvailable: true
    },
    {
      id: 'food-app-026',
      name: 'Bharwan Angara Murgh Tikka',
      description: 'Marinated Stuffed chicken Breast in Indian spice',
      price: 699,
      category: 'appetizers',
      dietary: ['non-veg'],
      isAvailable: true
    },
    {
      id: 'food-app-027',
      name: 'Dry Nuts Gilafi Mutton Seekh Kebab',
      description: 'Indian spiced minced lamb with mint chutney',
      price: 799,
      category: 'appetizers',
      dietary: ['non-veg'],
      isAvailable: true
    },
    {
      id: 'food-app-028',
      name: 'Nawabi Tangdi Kebab',
      description: 'Stuffed chicken drumsticks leg, served with Dhaniya pudina ki chutney',
      price: 799,
      category: 'appetizers',
      dietary: ['non-veg'],
      isAvailable: true
    },
    {
      id: 'food-app-029',
      name: 'Bhopali Murgh Tikka Mirza',
      description: 'Marinated boneless chicken in Indian spice',
      price: 699,
      category: 'appetizers',
      dietary: ['non-veg'],
      isAvailable: true
    },
    {
      id: 'food-app-030',
      name: 'Schezwan King Prawns',
      description: "RCP crisp prawns' chef interactive on flavored",
      price: 999,
      category: 'appetizers',
      dietary: ['non-veg'],
      isAvailable: true
    },
    {
      id: 'food-app-031',
      name: 'Tandoori Fish Tikka',
      description: 'Murrel fish Indian spice served with green chutney',
      price: 899,
      category: 'appetizers',
      dietary: ['non-veg'],
      isAvailable: true
    },
    {
      id: 'food-app-032',
      name: 'Amante Special Tandoori Bater (Quail)',
      description: "Garlic flavor tandoori quail's tikka served with garlic yogurt green chutney",
      price: 799,
      category: 'appetizers',
      dietary: ['non-veg'],
      isAvailable: true
    },
    {
      id: 'food-app-033',
      name: 'Amante Special Mutton Galouti Kebab',
      description: 'Mutton mince indian spicy smoky flavored served with ulta tawa paratha',
      price: 999,
      category: 'appetizers',
      dietary: ['non-veg'],
      isAvailable: true
    }
  ],

  'Salads': [
    {
      id: 'food-salad-006',
      name: 'Mélange of Nuts Mix Fruits Chat',
      description: 'Orange segments, Caramelized cashew nut & nuts, fresh mint, iceberg lettuce',
      price: 799,
      category: 'salads',
      dietary: ['veg'],
      isAvailable: true
    },
    {
      id: 'food-salad-007',
      name: 'Nachos King Founded Platter',
      description: 'Avocado salsa, tomato salsa crispy nachos, sour cream, Dijon mustard mayo',
      price: 699,
      category: 'salads',
      dietary: ['veg'],
      isAvailable: true
    },
    {
      id: 'food-salad-008',
      name: 'Healthy Garden Green Sprout Salad',
      description: 'Mix sprout flax seed and pumpkin seed, version olive oil with caramelized walnuts',
      price: 699,
      category: 'salads',
      dietary: ['veg'],
      isAvailable: true
    },
    {
      id: 'food-salad-009',
      name: 'Chef Interactive Greek Salad',
      description: 'Fresh garden green capsicum, feta, onion, cucumber, Cherry tomato',
      price: 599,
      category: 'salads',
      dietary: ['veg'],
      isAvailable: true
    },
    {
      id: 'food-salad-010',
      name: 'Indian Garden Green Salad',
      description: 'Seasonal local vegetable salad',
      price: 299,
      category: 'salads',
      dietary: ['veg'],
      isAvailable: true
    }
  ],

  'Soups, Broth & Ramen': [
    {
      id: 'food-soup-007',
      name: 'Wild Mushroom Quinoa Soup',
      description: 'Mushroom, quinoa and Broth',
      price: 499,
      category: 'soups',
      dietary: ['veg'],
      isAvailable: true
    },
    {
      id: 'food-soup-008',
      name: 'Tomato Dhaniya Ka Shorba',
      description: 'Vegetable stock tomato coriander Indian spice broth',
      price: 399,
      category: 'soups',
      dietary: ['veg'],
      isAvailable: true
    },
    {
      id: 'food-soup-009',
      name: 'Hong Kong Hot and Sour Soup',
      description: 'Vegetable stock bamboo shoot coriander scallion and Asian bread',
      price: 399,
      category: 'soups',
      dietary: ['veg'],
      isAvailable: true
    },
    {
      id: 'food-soup-010',
      name: 'Hungarian Mushroom Soup',
      description: 'Hungarian style cream of Mushroom soup',
      price: 599,
      category: 'soups',
      dietary: ['veg'],
      isAvailable: true
    },
    {
      id: 'food-soup-011',
      name: 'Chicken Shio Ramen',
      description: 'Spiced chicken broth, panko crumbed chicken, marinated eggs, bamboo shoots, bok choy',
      price: 599,
      category: 'soups',
      dietary: ['non-veg'],
      isAvailable: true
    },
    {
      id: 'food-soup-012',
      name: 'Smoked Chicken Tomato and Almond Soup',
      description: 'Tomato, basil, smoked chicken, Almond Flake',
      price: 499,
      category: 'soups',
      dietary: ['non-veg'],
      isAvailable: true
    },
    {
      id: 'food-soup-013',
      name: 'Thai Signature Tom Yum Soup',
      description: 'Thai herb, basil, spice signature broth (Veg/Chicken/Prawns)',
      price: 499,
      category: 'soups',
      dietary: ['veg'],
      isAvailable: true
    },
    {
      id: 'food-soup-014',
      name: 'Mutton Yakini Shorba',
      description: 'Bhopal mutton Indian spice shorba, Almond Flake',
      price: 499,
      category: 'soups',
      dietary: ['non-veg'],
      isAvailable: true
    },
    {
      id: 'food-soup-015',
      name: 'Badami Murgh Yakini Shorba',
      description: 'Bhopal murgh Indian spice shorba, Almond Flake',
      price: 499,
      category: 'soups',
      dietary: ['non-veg'],
      isAvailable: true
    },
    {
      id: 'food-soup-016',
      name: 'Burmese Khowsuey',
      description: 'Burmese traditional coconut creamy soup serve with noodle and rice',
      price: 499,
      category: 'soups',
      dietary: ['non-veg'],
      isAvailable: true
    }
  ],

  'Sushi': [
    {
      id: 'food-sushi-005',
      name: 'Vegetable Tempura Uramaki',
      description: 'Vegetable & king mushroom tempura, teriyaki sauce, Cream cheese',
      price: 999,
      category: 'sushi',
      dietary: ['veg'],
      isAvailable: true
    },
    {
      id: 'food-sushi-006',
      name: 'Pickled Wild Mushroom and Tofu Roll',
      description: 'Pickled mushroom, teriyaki glaze tofu, soy sauce, Cream cheese, gari',
      price: 999,
      category: 'sushi',
      dietary: ['veg'],
      isAvailable: true
    },
    {
      id: 'food-sushi-007',
      name: 'Shrimp Tempura Crispy Uramaki',
      description: 'Tempura fried prawns, cucumber, asparagus, avocado, Cream cheese',
      price: 1299,
      category: 'sushi',
      dietary: ['non-veg'],
      isAvailable: true
    },
    {
      id: 'food-sushi-008',
      name: 'Sushi Fish Tempura Rolls',
      description: 'Tempura fish, avocado, pickled cucumber, wasabi tobiko',
      price: 1299,
      category: 'sushi',
      dietary: ['non-veg'],
      isAvailable: true
    }
  ],

  'Burgers & Sandwiches': [
    {
      id: 'food-burger-007',
      name: 'Amante Chef Special Vegetable Grilled Sandwich',
      description: 'Grilled vegetable lettuce tomato cucumber with French fries and mustard sauce',
      price: 499,
      category: 'burgers',
      dietary: ['veg'],
      isAvailable: true
    },
    {
      id: 'food-burger-008',
      name: 'Amante Chef Special Chicken Grilled Sandwich',
      description: 'Grilled vegetable lettuce chicken with French fries and mustard sauce',
      price: 599,
      category: 'burgers',
      dietary: ['non-veg'],
      isAvailable: true
    }
  ],

  'Pizza': [
    {
      id: 'food-pizza-006',
      name: 'Pizza Latin Aioli & Quattro Fromage',
      description: 'Grilled seasonal vegetable olives, ricotta, tomato sauce, basil, mozzarella',
      price: 999,
      category: 'pizza',
      dietary: ['veg'],
      isAvailable: true
    },
    {
      id: 'food-pizza-007',
      name: 'Amante Special Interactive Garden Green Pizza',
      description: 'Crispy kale with harissa and sundried tomatoes on a tomato and herb base, topped with pesto aioli',
      price: 899,
      category: 'pizza',
      dietary: ['veg'],
      isAvailable: true
    },
    {
      id: 'food-pizza-008',
      name: 'Pizza Pollo Indiana',
      description: 'Indian Spiced Chicken, cheese, tomato, bell peppers, onion',
      price: 899,
      category: 'pizza',
      dietary: ['non-veg'],
      isAvailable: true
    }
  ],

  'Indian Main Course': [
    {
      id: 'food-indian-009',
      name: 'Faldaari Kofta Curry',
      description: 'Cottage cheese, dry fruits fresh fruits with creamy cashew gravy',
      price: 599,
      category: 'indian',
      dietary: ['veg'],
      isAvailable: true
    },
    {
      id: 'food-indian-010',
      name: 'Amante Gunchaw Subzi',
      description: 'Minced cauliflower with vilayeti subzi, green chili coriander',
      price: 499,
      category: 'indian',
      dietary: ['veg'],
      isAvailable: true
    },
    {
      id: 'food-indian-011',
      name: "Chefs' Special Vegetable Korma",
      description: 'Seasonal local vegetable potato, green peas',
      price: 599,
      category: 'indian',
      dietary: ['veg'],
      isAvailable: true
    },
    {
      id: 'food-indian-012',
      name: 'Lehsuni Bhuna Palak',
      description: 'Minced spinach with garlic tomato and chili',
      price: 599,
      category: 'indian',
      dietary: ['veg'],
      isAvailable: true
    },
    {
      id: 'food-indian-013',
      name: 'Subz Nizami Handi',
      description: 'Mix seasonal local vegetable spinach Indian spice',
      price: 699,
      category: 'indian',
      dietary: ['veg'],
      isAvailable: true
    },
    {
      id: 'food-indian-014',
      name: 'Bhopali Mutton Nihari',
      description: 'Bhopal mutton Nali Amante chef special rich gravy',
      price: 999,
      category: 'indian',
      dietary: ['non-veg'],
      isAvailable: true
    },
    {
      id: 'food-indian-015',
      name: 'Mutton Rogan Josh',
      description: 'Bhopali mutton Amante chef special rogan josh',
      price: 999,
      category: 'indian',
      dietary: ['non-veg'],
      isAvailable: true
    },
    {
      id: 'food-indian-016',
      name: 'Bhopali Mutton Rezala',
      description: 'Bhupali mutton Amante chef special rich coriander gravy',
      price: 1099,
      category: 'indian',
      dietary: ['non-veg'],
      isAvailable: true
    },
    {
      id: 'food-indian-017',
      name: 'Chef Special Chicken Tikka Keema Masala',
      description: 'Amante chef special Bhopali minced chicken, Indian spice',
      price: 899,
      category: 'indian',
      dietary: ['non-veg'],
      isAvailable: true
    },
    {
      id: 'food-indian-018',
      name: 'Kacchi Mirchi Ka Murgh',
      description: 'Boneless chicken tempered with chilies, coriander seeds and cooked with fresh tomato',
      price: 799,
      category: 'indian',
      dietary: ['non-veg'],
      isAvailable: true
    },
    {
      id: 'food-indian-019',
      name: 'Chef Special Bhopali Kadak Nath',
      description: 'KadakNath chicken chef special Indian spices, cooked with chop base gravy',
      price: 1499,
      category: 'indian',
      dietary: ['non-veg'],
      isAvailable: true
    },
    {
      id: 'food-indian-020',
      name: 'Chef Special Bhopali Bater',
      description: 'Slow cook Quail in chef choice spices',
      price: 999,
      category: 'indian',
      dietary: ['non-veg'],
      isAvailable: true
    },
    {
      id: 'food-indian-021',
      name: 'Chef Interactive Flavored Grilled Bhupali Lamb Chop',
      description: 'Bhupali mutton chop chef special aroma sauce',
      price: 1499,
      category: 'indian',
      dietary: ['non-veg'],
      isAvailable: true
    }
  ],

  'Rice, Pulao & Biryani': [
    {
      id: 'food-rice-007',
      name: 'Hyderabadi Chicken Dum Biryani',
      description: 'Hyderabadi style chicken biryani',
      price: 799,
      category: 'rice',
      dietary: ['non-veg'],
      isAvailable: true
    },
    {
      id: 'food-rice-008',
      name: 'Hyderabadi Mutton Dum Biryani',
      description: 'Hyderabadi style mutton biryani',
      price: 999,
      category: 'rice',
      dietary: ['non-veg'],
      isAvailable: true
    },
    {
      id: 'food-rice-009',
      name: 'Steamed Rice, Jeera Rice, Curd Rice',
      description: 'Choice of steamed, jeera or curd rice',
      price: 499,
      category: 'rice',
      dietary: ['veg'],
      isAvailable: true
    }
  ],

  'Hot Clay Pot & Tandoor': [
    {
      id: 'food-bread-007',
      name: 'Lachha Paratha',
      description: 'Layered whole wheat flatbread (pudina, chili garlic options available)',
      price: 110,
      category: 'breads',
      dietary: ['veg'],
      isAvailable: true
    }
  ],

  'Pasta, Ravioli & Risotto': [
    {
      id: 'food-pasta-004',
      name: 'Amante Classic Vegetable Lasagna',
      description: 'Homemade lasagna pasta, asparagus, broccoli, zucchini cheese sauce',
      price: 899,
      category: 'pasta',
      dietary: ['veg'],
      isAvailable: true
    },
    {
      id: 'food-pasta-005',
      name: 'Grilled Mascarpone Polenta with Roasted Pine Nuts',
      description: 'Seared polenta cakes, creamy tomato, white balsamic, roasted bell pepper coulis',
      price: 699,
      category: 'pasta',
      dietary: ['veg'],
      isAvailable: true
    },
    {
      id: 'food-pasta-006',
      name: 'Japanese Curry Bowl – Vegetarian Donburi',
      description: 'Teppanyaki style vegetables, mushroom, bamboo shoots, fried rice and pumpkin crackers',
      price: 899,
      category: 'pasta',
      dietary: ['veg'],
      isAvailable: true
    }
  ],

  'Grills & Mains': [
    {
      id: 'food-grill-006',
      name: 'Grilled Moroccan Lamb Chop',
      description: 'Grilled Lamb chop, red wine jus, Truffle mash, Huancaina, Roast vegetables',
      price: 1499,
      category: 'grills',
      dietary: ['non-veg'],
      isAvailable: true
    },
    {
      id: 'food-grill-007',
      name: 'Lemon & Thyme Chicken Milanese',
      description: 'Crispy breaded chicken cutlet, lemon butter sauce, lemon wedge, light mesclun and cherry tomato salad',
      price: 799,
      category: 'grills',
      dietary: ['non-veg'],
      isAvailable: true
    },
    {
      id: 'food-grill-008',
      name: 'Japanese Curry Bowl – Chicken Donburi',
      description: 'Teppanyaki style chicken, vegetables, mushroom, bamboo shoots, fried rice and pumpkin crackers',
      price: 799,
      category: 'grills',
      dietary: ['non-veg'],
      isAvailable: true
    }
  ]
};

// Add new Noodle Bowls category
const noodleBowlsCategory = {
  id: 'noodle-bowls',
  name: 'Noodle Bowls',
  description: 'Asian noodle bowls with your choice of protein',
  displayOrder: 14,
  items: [
    {
      id: 'food-noodle-001',
      name: 'Hakka Noodle Bowl',
      description: 'Asian vegetable, wild mushroom (Veg/Chicken/Prawns)',
      price: 599,
      category: 'noodles',
      dietary: ['veg'],
      isAvailable: true
    },
    {
      id: 'food-noodle-002',
      name: 'Udon Noodle Bowl',
      description: 'Tofu steak and Asian vegetable, wild mushroom (Veg/Chicken/Prawns)',
      price: 699,
      category: 'noodles',
      dietary: ['veg'],
      isAvailable: true
    },
    {
      id: 'food-noodle-003',
      name: 'Soba Noodle Bowl',
      description: 'Tofu steak and Asian vegetable, wild mushroom (Veg/Chicken/Prawns)',
      price: 699,
      category: 'noodles',
      dietary: ['veg'],
      isAvailable: true
    },
    {
      id: 'food-noodle-004',
      name: 'Pad Thai Noodle Bowl',
      description: 'Rice stick noodle, vegetable, peanut, beans sprout (Veg/Chicken/Prawns)',
      price: 699,
      category: 'noodles',
      dietary: ['veg'],
      isAvailable: true
    },
    {
      id: 'food-noodle-005',
      name: 'Green/Red Thai Curry Bowl',
      description: 'Asian Farm green vegetable, wild mushroom (Veg/Chicken/Prawns) Served with jasmine rice',
      price: 699,
      category: 'noodles',
      dietary: ['veg'],
      isAvailable: true
    }
  ]
};

// Additional desserts
const additionalDesserts = [
  {
    id: 'food-dessert-009',
    name: 'Single Origin Chocolate Marquis',
    description: '64% chocolate mousse with fresh cream',
    price: 699,
    category: 'desserts',
    dietary: ['veg'],
    isAvailable: true
  },
  {
    id: 'food-dessert-010',
    name: 'Gelato and Chef Choice Ice Cream',
    description: 'Chocolate, Saffron & Pista',
    price: 300,
    category: 'desserts',
    dietary: ['veg'],
    isAvailable: true
  },
  {
    id: 'food-dessert-011',
    name: 'Mawa Bati',
    description: 'Saffron & Pista, almond stuffed fried dip in syrup interactive desserts',
    price: 599,
    category: 'desserts',
    dietary: ['veg'],
    isAvailable: true
  },
  {
    id: 'food-dessert-012',
    name: 'Akhrot Halwa',
    description: 'Saffron & Pista, almond stuffed chef interactive desserts',
    price: 799,
    category: 'desserts',
    dietary: ['veg'],
    isAvailable: true
  },
  {
    id: 'food-dessert-013',
    name: 'Vaklaba',
    description: 'Traditional Indian sweet',
    price: 499,
    category: 'desserts',
    dietary: ['veg'],
    isAvailable: true
  },
  {
    id: 'food-dessert-014',
    name: 'Amante Kulfi Faluda Delite',
    description: 'Saffron & Pista, almond stuffed Faluda chef interactive desserts',
    price: 499,
    category: 'desserts',
    dietary: ['veg'],
    isAvailable: true
  },
  {
    id: 'food-dessert-015',
    name: 'Belgium Chocolate Mousse',
    description: 'Toasted marshmallow, caramelized nuts, served with choice of ice cream',
    price: 659,
    category: 'desserts',
    dietary: ['veg'],
    isAvailable: true
  },
  {
    id: 'food-dessert-016',
    name: 'Mix Fruits Cremieux',
    description: 'Fresh fruits, cream custard, Vanilla ice cream',
    price: 399,
    category: 'desserts',
    dietary: ['veg'],
    isAvailable: true
  },
  {
    id: 'food-dessert-017',
    name: 'Baked Cheese Cake with Sour Cherry Compote',
    description: 'Amante chef special desserts serve with choice of ice cream',
    price: 449,
    category: 'desserts',
    dietary: ['veg'],
    isAvailable: true
  },
  {
    id: 'food-dessert-018',
    name: 'Apple Cinnamon Tart with Vanilla Ice Cream',
    description: 'Amante chef special desserts serve with choice of ice cream',
    price: 449,
    category: 'desserts',
    dietary: ['veg'],
    isAvailable: true
  }
];

let addedCount = 0;

// Add items to existing categories
Object.entries(missingItems).forEach(([categoryName, items]) => {
  const category = foodMenu.categories.find(cat => cat.name === categoryName);
  if (category) {
    items.forEach(item => {
      // Check if item already exists
      const exists = category.items.some(existing =>
        existing.name.toUpperCase() === item.name.toUpperCase()
      );
      if (!exists) {
        category.items.push(item);
        console.log(`✅ Added: ${item.name} to ${categoryName}`);
        addedCount++;
      }
    });
  }
});

// Add Noodle Bowls category
const noodleCatExists = foodMenu.categories.some(cat => cat.name === 'Noodle Bowls');
if (!noodleCatExists) {
  foodMenu.categories.push(noodleBowlsCategory);
  console.log(`\n✅ Added new category: Noodle Bowls with ${noodleBowlsCategory.items.length} items`);
  addedCount += noodleBowlsCategory.items.length;
}

// Add additional desserts
const dessertsCategory = foodMenu.categories.find(cat => cat.name === 'Desserts');
if (dessertsCategory) {
  additionalDesserts.forEach(item => {
    const exists = dessertsCategory.items.some(existing =>
      existing.name.toUpperCase() === item.name.toUpperCase()
    );
    if (!exists) {
      dessertsCategory.items.push(item);
      console.log(`✅ Added: ${item.name} to Desserts`);
      addedCount++;
    }
  });
}

// Save updated menu
fs.writeFileSync(foodMenuPath, JSON.stringify(foodMenu, null, 2));

console.log('\n' + '='.repeat(80));
console.log(`\n✅ Successfully added ${addedCount} missing items!`);
console.log(`\n📁 Updated file: ${foodMenuPath}\n`);
