#!/usr/bin/env python3
"""
Script to enhance menu JSON files with additional metadata for the new menu experience.
Adds: cuisine, subcuisine, localDescription, similarTo, tags, etc.
"""

import json
import copy

# Define cuisine mappings and local descriptions
CUISINE_MAPPINGS = {
    # Food menu cuisine mappings
    "appetizers": {
        "default_cuisine": "fusion",
        "items": {
            "Yasai Yakitori": {"cuisine": "asian", "subcuisine": "japanese", "localDescription": "Like tandoori vegetables but with sweet-savory Japanese sauce", "tags": ["popular", "mild"]},
            "Crispy Lotus Stem Plum Chili Sauce": {"cuisine": "asian", "subcuisine": "chinese", "localDescription": "Crispy fried lotus stem like pakoras, tossed in tangy Chinese sauce", "tags": ["popular"]},
            "Silken Tofu Tempura Tacos Bao": {"cuisine": "asian", "subcuisine": "fusion", "localDescription": "Soft steamed bun with crispy tofu - like a Chinese pav", "tags": []},
            "Vegetable Togarashi Tempura": {"cuisine": "asian", "subcuisine": "japanese", "localDescription": "Japanese style vegetable pakoras with spicy seasoning", "tags": []},
            "Bharwan Paneer Tikka": {"cuisine": "indian", "subcuisine": "north-indian", "localDescription": "", "tags": ["popular"]},
            "Peri Peri Truffle Fries": {"cuisine": "continental", "subcuisine": "fusion", "localDescription": "Spicy French fries with truffle flavor", "tags": ["popular", "mild"]},
            "Truffle Mushroom Bruschetta": {"cuisine": "continental", "subcuisine": "italian", "localDescription": "Crispy bread topped with mushroom - Italian style toast", "tags": []},
            "Thai Glass Noodle Vegetable Spring Roll": {"cuisine": "asian", "subcuisine": "thai", "localDescription": "Crispy rolls filled with noodles and vegetables", "tags": []},
            "Hunan Chilli Crispy Corn Kernels": {"cuisine": "asian", "subcuisine": "chinese", "localDescription": "Spicy corn kernels - like masala corn but Chinese style", "tags": ["spicy", "popular"]},
            "Shrimp Tempura": {"cuisine": "asian", "subcuisine": "japanese", "localDescription": "Crispy fried prawns Japanese style", "tags": []},
            "Chicken Teriyaki Skewers": {"cuisine": "asian", "subcuisine": "japanese", "localDescription": "Grilled chicken on sticks with sweet sauce", "tags": []},
            "Chicken Lollipop": {"cuisine": "asian", "subcuisine": "chinese", "localDescription": "Popular Chinese chicken starter", "tags": ["popular"]},
            "Bharwan Angara Murgh Tikka": {"cuisine": "indian", "subcuisine": "north-indian", "localDescription": "", "tags": ["spicy"]},
            "Lehsuni Malai Murg Tikka": {"cuisine": "indian", "subcuisine": "north-indian", "localDescription": "", "tags": ["popular"]},
           "Crispy Togarashi Fried Corn Kernels": {"cuisine": "asian", "subcuisine": "japanese", "localDescription": "Japanese spiced crispy corn", "tags": []},
            "Hunan Chilli Tofu": {"cuisine": "asian", "subcuisine": "chinese", "localDescription": "Like Chilli Paneer but with tofu (softer texture)", "similarTo": "Chilli Paneer", "tags": []},
            "Hunan Chilli Cottage Cheese": {"cuisine": "asian", "subcuisine": "chinese", "localDescription": "Chinese style spicy paneer", "similarTo": "Chilli Paneer", "tags": ["popular", "spicy"]},
            "Soya Chaap Achari": {"cuisine": "indian", "subcuisine": "north-indian", "localDescription": "", "tags": []},
            "Soya Chaap Malai": {"cuisine": "indian", "subcuisine": "north-indian", "localDescription": "", "tags": []},
            "Bhutte De Kebab": {"cuisine": "indian", "subcuisine": "north-indian", "localDescription": "", "tags": []},
            "Lukhnawi Mutton Galouti Kebab": {"cuisine": "indian", "subcuisine": "north-indian", "localDescription": "", "tags": ["premium"]},
            "Mushroom Cream Cheese Dimsum": {"cuisine": "asian", "subcuisine": "chinese", "localDescription": "Steamed dumplings with mushroom filling", "tags": []},
            "Veg Galouti Kebab": {"cuisine": "indian", "subcuisine": "north-indian", "localDescription": "Melt-in-mouth vegetarian kebab", "tags": ["new"]},
            "Spinach Ricotta Vol-au-vent": {"cuisine": "continental", "subcuisine": "french", "localDescription": "Crispy puff pastry with spinach filling", "tags": []},
            "Corn and Truffle Mushroom Crispy Ravioli": {"cuisine": "continental", "subcuisine": "italian", "localDescription": "Fried pasta pockets with corn and mushroom", "tags": []},
            "Sumac Spice Crispy Fried Fish": {"cuisine": "continental", "subcuisine": "mediterranean", "localDescription": "Crispy fried fish with special spices", "tags": []},
            "Dry Nuts Gilafi Mutton Seekh Kebab": {"cuisine": "indian", "subcuisine": "north-indian", "localDescription": "", "tags": []},
            "Nawabi Tangdi Kebab": {"cuisine": "indian", "subcuisine": "north-indian", "localDescription": "", "tags": []},
            "Bhopali Murgh Tikka Mirza": {"cuisine": "indian", "subcuisine": "north-indian", "localDescription": "", "tags": []},
            "Schezwan King Prawns": {"cuisine": "asian", "subcuisine": "chinese", "localDescription": "Spicy Chinese style prawns", "tags": ["premium", "spicy"]},
            "Amante Special Tandoori Bater (Quail)": {"cuisine": "indian", "subcuisine": "north-indian", "localDescription": "", "tags": ["premium"]},
            "Crispy Chilli Baby Corn": {"cuisine": "asian", "subcuisine": "chinese", "localDescription": "Crispy baby corn in spicy sauce", "tags": []},
            "Paneer Peshawari Tikka": {"cuisine": "indian", "subcuisine": "north-indian", "localDescription": "", "tags": []},
        }
    },
   "indian-mains": {
        "default_cuisine": "indian",
        "subcuisine": "north-indian"
    },
    "rice-biryani": {
        "default_cuisine": "indian",
        "subcuisine": "north-indian"
    },
    "breads": {
        "default_cuisine": "indian",
        "subcuisine": "north-indian"
    },
    "dim-sums": {
        "default_cuisine": "asian",
        "subcuisine": "chinese",
        "localDescription": "Asian dumplings - like momos"
    },
    "salads": {
        "default_cuisine": "continental",
        "subcuisine": "mediterranean"
    },
    "soups": {
        "default_cuisine": "fusion"
    },
    "sushi": {
        "default_cuisine": "asian",
        "subcuisine": "japanese",
        "localDescription": "Japanese rice rolls wrapped in seaweed"
    },
    "burgers-sandwiches": {
        "default_cuisine": "continental",
        "subcuisine": "american"
    },
    "pizza": {
        "default_cuisine": "continental",
        "subcuisine": "italian"
    },
    "pasta": {
        "default_cuisine": "continental",
        "subcuisine": "italian"
    },
    "grills": {
        "default_cuisine": "continental",
        "subcuisine": "international"
    },
    "noodles": {
        "default_cuisine": "asian",
        "subcuisine": "pan-asian"
    },
    "desserts": {
        "default_cuisine": "fusion"
    }
}

# Bar menu - simpler structure
BAR_TYPES = {
    "signature-cocktails": {"type": "cocktails", "tags": ["signature"]},
    "classic-cocktails": {"type": "cocktails", "tags": ["classic"]},
    "liit": {"type": "cocktails", "tags": ["party", "strong"]},
    "mocktails": {"type": "mocktails", "tags": ["non-alcoholic"]},
    "whisky": {"type": "whisky", "tags": ["spirits"]},
    "single-malt": {"type": "whisky", "tags": ["spirits", "premium"]},
    "bourbon": {"type": "whisky", "tags": ["spirits"]},
    "vodka": {"type": "vodka", "tags": ["spirits"]},
    "tequila": {"type": "tequila", "tags": ["spirits"]},
    "gin": {"type": "gin", "tags": ["spirits"]},
    "rum": {"type": "rum", "tags": ["spirits"]},
    "brandy": {"type": "brandy", "tags": ["spirits"]},
    "liqueurs": {"type": "liqueurs", "tags": ["spirits"]},
    "wines": {"type": "wine", "tags": []},
    "champagne": {"type": "champagne", "tags": ["celebration"]},
    "beers": {"type": "beer", "tags": []},
    "shots": {"type": "shots", "tags": ["party"]},
}

# Cafe menu - simpler structure
CAFE_TYPES = {
    "hot-coffee": {"type": "coffee", "temperature": "hot", "tags": []},
    "iced-coffee": {"type": "coffee", "temperature": "cold", "tags": ["iced"]},
    "flavoured-coffee": {"type": "coffee", "temperature": "both", "tags": ["flavored"]},
    "frappes": {"type": "coffee", "temperature": "cold", "tags": ["blended"]},
    "shakes": {"type": "shakes", "temperature": "cold", "tags": []},
    "specials": {"type": "coffee", "temperature": "both", "tags": ["signature"]},
    "add-ons": {"type": "add-ons", "temperature": "n/a", "tags": []},
}

def enhance_food_menu(menu_data):
    """Enhance food menu with cuisine and local context"""
    enhanced = copy.deepcopy(menu_data)

    for category in enhanced['categories']:
        cat_id = category['id']
        cat_mapping = CUISINE_MAPPINGS.get(cat_id, {})

        for item in category['items']:
            # Add base fields if not present
            if 'cuisine' not in item:
                item['cuisine'] = cat_mapping.get('default_cuisine', 'fusion')
            if 'tags' not in item:
                item['tags'] = []
            if 'localDescription' not in item:
                item['localDescription'] = ""
            if 'isJainFriendly' not in item:
                item['isJainFriendly'] = False

            # Check if veg and no onion/garlic keywords for Jain
            if 'veg' in item.get('dietary', []):
                name_lower = item['name'].lower()
                desc_lower = item.get('description', '').lower()
                if not any(word in name_lower or word in desc_lower for word in ['garlic', 'onion', 'lahsuni', 'pyaz']):
                    item['isJainFriendly'] = True

            # Add popular tag for recommended items
            if item.get('isRecommended'):
                if 'popular' not in item['tags']:
                    item['tags'].append('popular')

            # Add spicy tag for spicy items
            if item.get('spiceLevel', 0) >= 3:
                if 'spicy' not in item['tags']:
                    item['tags'].append('spicy')
            elif item.get('spiceLevel', 0) <= 1:
                if 'mild' not in item['tags']:
                    item['tags'].append('mild')

    return enhanced

def enhance_bar_menu(menu_data):
    """Enhance bar menu with drink types"""
    enhanced = copy.deepcopy(menu_data)

    for category in enhanced['categories']:
        cat_id = category['id']
        cat_mapping = BAR_TYPES.get(cat_id, {})

        for item in category['items']:
            if 'drinkType' not in item:
                item['drinkType'] = cat_mapping.get('type', 'other')
            if 'tags' not in item:
                item['tags'] = list(cat_mapping.get('tags', []))
            else:
                # Merge tags
                item['tags'] = list(set(item['tags'] + cat_mapping.get('tags', [])))

            # Add popular tag for recommended items
            if item.get('isRecommended'):
                if 'popular' not in item['tags']:
                    item['tags'].append('popular')

            # Add premium tag for expensive items
            if item.get('price', 0) >= 1000 or item.get('bottlePrice', 0) >= 15000:
                if 'premium' not in item['tags']:
                    item['tags'].append('premium')

    return enhanced

def enhance_cafe_menu(menu_data):
    """Enhance cafe menu with beverage types"""
    enhanced = copy.deepcopy(menu_data)

    for category in enhanced['categories']:
        cat_id = category['id']
        cat_mapping = CAFE_TYPES.get(cat_id, {})

        for item in category['items']:
            if 'beverageType' not in item:
                item['beverageType'] = cat_mapping.get('type', 'other')
            if 'temperature' not in item:
                item['temperature'] = cat_mapping.get('temperature', 'both')
            if 'tags' not in item:
                item['tags'] = list(cat_mapping.get('tags', []))
            else:
                # Merge tags
                item['tags'] = list(set(item['tags'] + cat_mapping.get('tags', [])))

            # Add popular tag for recommended items
            if item.get('isRecommended'):
                if 'popular' not in item['tags']:
                    item['tags'].append('popular')

    return enhanced

def main():
    print("Enhancing menu files...")

    # Enhance food menu
    print("\n1. Processing food menu...")
    with open('src/data/menus/food.json', 'r') as f:
        food_menu = json.load(f)
    enhanced_food = enhance_food_menu(food_menu)
    with open('src/data/menus/food-enhanced.json', 'w') as f:
        json.dump(enhanced_food, f, indent=2)
    print("   ✓ Created food-enhanced.json")

    # Enhance bar menu
    print("\n2. Processing bar menu...")
    with open('src/data/menus/bar.json', 'r') as f:
        bar_menu = json.load(f)
    enhanced_bar = enhance_bar_menu(bar_menu)
    with open('src/data/menus/bar-enhanced.json', 'w') as f:
        json.dump(enhanced_bar, f, indent=2)
    print("   ✓ Created bar-enhanced.json")

    # Enhance cafe menu
    print("\n3. Processing cafe menu...")
    with open('src/data/menus/cafe.json', 'r') as f:
        cafe_menu = json.load(f)
    enhanced_cafe = enhance_cafe_menu(cafe_menu)
    with open('src/data/menus/cafe-enhanced.json', 'w') as f:
        json.dump(enhanced_cafe, f, indent=2)
    print("   ✓ Created cafe-enhanced.json")

    print("\n✅ All menus enhanced successfully!")
    print("\nNext steps:")
    print("1. Review the enhanced JSON files")
    print("2. Add more localDescriptions for Asian/Continental items")
    print("3. Build the menunew UI components")

if __name__ == "__main__":
    main()
