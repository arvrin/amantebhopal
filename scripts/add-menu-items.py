#!/usr/bin/env python3
import json
import os

# Paths
script_dir = os.path.dirname(os.path.abspath(__file__))
project_dir = os.path.dirname(script_dir)
menu_path = os.path.join(project_dir, "src/data/menus/food.json")

# Read current menu
with open(menu_path, 'r') as f:
    menu = json.load(f)

# Find the last item ID number for each category
def get_next_id(category_id):
    max_id = 0
    for cat in menu['categories']:
        if cat['id'] == category_id:
            for item in cat['items']:
                # Extract number from ID like "food-app-001"
                parts = item['id'].split('-')
                if len(parts) >= 3:
                    try:
                        num = int(parts[2])
                        max_id = max(max_id, num)
                    except:
                        pass
    return max_id + 1

# New items to add
new_starters = [
    {
        "name": "Crispy Chilli Baby Corn",
        "description": "Crispy baby corn tossed in spicy chili sauce",
        "price": 499,
        "dietary": ["veg"]
    },
    {
        "name": "Paneer Peshawari Tikka",
        "description": "Marinated stuffed cottage cheese with Indian spices",
        "price": 599,
        "dietary": ["veg"]
    },
    {
        "name": "Hunan Chilli Tofu",
        "description": "Sliced silken tofu, celery and burnt chili",
        "price": 699,
        "dietary": ["veg"]
    },
    {
        "name": "Hunan Chilli Cottage Cheese",
        "description": "Sliced cottage cheese, celery and burnt chili",
        "price": 599,
        "dietary": ["veg"]
    },
    {
        "name": "Soya Chaap Achari",
        "description": "Yogurt, creamy, garlic, Indian spice with tangy pickle flavor",
        "price": 599,
        "dietary": ["veg"]
    },
    {
        "name": "Soya Chaap Malai",
        "description": "Creamy yogurt and garlic marinated soya chaap with hari chutney",
        "price": 599,
        "dietary": ["veg"]
    },
    {
        "name": "Bhutte De Kebab",
        "description": "Crispy fried corn patties served with dip",
        "price": 499,
        "dietary": ["veg"]
    },
    {
        "name": "Lukhnawi Mutton Galouti Kebab",
        "description": "Mutton mince with Indian spices, smoky flavored, served with warqi paratha",
        "price": 999,
        "dietary": ["non-veg"]
    },
    {
        "name": "Mushroom Cream Cheese Dimsum",
        "description": "Delicate dumplings filled with mushroom and cream cheese",
        "price": 699,
        "dietary": ["veg"]
    }
]

new_mains = [
    {
        "name": "Vilayti Subzi",
        "description": "Minced cauliflower with exotic vegetables, green chili and coriander",
        "price": 499,
        "dietary": ["veg"]
    },
    {
        "name": "Aloo Gobhi Adrak",
        "description": "Mixed seasonal local vegetables with spinach and Indian spices",
        "price": 699,
        "dietary": ["veg"]
    },
    {
        "name": "Paneer Lababdar",
        "description": "Rich cottage cheese curry in creamy tomato gravy",
        "price": 699,
        "dietary": ["veg"]
    },
    {
        "name": "Shahi Paneer",
        "description": "Cottage cheese in rich, creamy cashew and tomato gravy",
        "price": 699,
        "dietary": ["veg"]
    },
    {
        "name": "Paneer Butter Masala",
        "description": "Cottage cheese in smooth butter tomato sauce",
        "price": 699,
        "dietary": ["veg"]
    },
    {
        "name": "Paneer Tikka Masala",
        "description": "Grilled cottage cheese in spiced tomato curry",
        "price": 699,
        "dietary": ["veg"]
    },
    {
        "name": "Lehsuni Palak Paneer",
        "description": "Cottage cheese in garlic-flavored spinach gravy",
        "price": 699,
        "dietary": ["veg"]
    },
    {
        "name": "Chef Special Laal Maas",
        "description": "Authentic Rajasthani mutton with Indian spices",
        "price": 1099,
        "dietary": ["non-veg"],
        "isChefSpecial": True
    },
    {
        "name": "Home Style Curry Chicken",
        "description": "Boneless chicken tempered with chilies, coriander seeds and cooked with fresh tomato",
        "price": 699,
        "dietary": ["non-veg"]
    },
    {
        "name": "Home Style Curry Egg",
        "description": "Eggs tempered with chilies, coriander seeds and cooked with fresh tomato",
        "price": 499,
        "dietary": ["non-veg"]
    },
    {
        "name": "Wild Mushroom Risotto",
        "description": "Creamy arborio rice with mushrooms, parmesan and cream",
        "price": 799,
        "dietary": ["veg"]
    },
    {
        "name": "Grilled Chicken with Baby Potato",
        "description": "Tender grilled chicken served with roasted baby potatoes",
        "price": 799,
        "dietary": ["non-veg"]
    }
]

new_breads = [
    {
        "name": "Naan",
        "description": "Classic Indian flatbread baked in tandoor",
        "price": 79,
        "dietary": ["veg"]
    },
    {
        "name": "Garlic Naan",
        "description": "Naan topped with fresh garlic and butter",
        "price": 79,
        "dietary": ["veg"]
    },
    {
        "name": "Butter Naan",
        "description": "Soft naan brushed with butter",
        "price": 79,
        "dietary": ["veg"]
    },
    {
        "name": "Missi Roti",
        "description": "Traditional Indian flatbread made with gram flour and spices",
        "price": 79,
        "dietary": ["veg"]
    }
]

# Add items to appropriate categories
for cat in menu['categories']:
    if cat['id'] == 'appetizers':
        start_id = get_next_id('appetizers')
        for i, item in enumerate(new_starters):
            new_item = {
                "id": f"food-app-{str(start_id + i).zfill(3)}",
                "name": item["name"],
                "description": item["description"],
                "price": item["price"],
                "category": "appetizers",
                "dietary": item["dietary"],
                "isAvailable": True
            }
            if "isChefSpecial" in item:
                new_item["isChefSpecial"] = item["isChefSpecial"]
            cat['items'].append(new_item)
        print(f"✅ Added {len(new_starters)} starters")

    elif cat['id'] == 'mains':
        start_id = get_next_id('mains')
        for i, item in enumerate(new_mains):
            new_item = {
                "id": f"food-main-{str(start_id + i).zfill(3)}",
                "name": item["name"],
                "description": item["description"],
                "price": item["price"],
                "category": "mains",
                "dietary": item["dietary"],
                "isAvailable": True
            }
            if "isChefSpecial" in item:
                new_item["isChefSpecial"] = item["isChefSpecial"]
            cat['items'].append(new_item)
        print(f"✅ Added {len(new_mains)} main courses")

    elif cat['id'] == 'breads':
        start_id = get_next_id('breads')
        for i, item in enumerate(new_breads):
            new_item = {
                "id": f"food-bread-{str(start_id + i).zfill(3)}",
                "name": item["name"],
                "description": item["description"],
                "price": item["price"],
                "category": "breads",
                "dietary": item["dietary"],
                "isAvailable": True
            }
            cat['items'].append(new_item)
        print(f"✅ Added {len(new_breads)} breads")

# Write updated menu
with open(menu_path, 'w') as f:
    json.dump(menu, f, indent=2, ensure_ascii=False)

print(f"\n✅ Menu updated successfully!")
print(f"📄 Location: {menu_path}")
print(f"📊 Total new items: {len(new_starters) + len(new_mains) + len(new_breads)}")
