import json
import urllib.parse

# Read the components database
with open('data/components.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

def generate_amazon_link(name, category=''):
    """Generate Amazon India search link for a product"""
    # Clean up the name for better search results
    search_term = name.replace(' / ', ' ').replace('/', ' ')
    # Add category context for better results
    if category:
        search_term = f"{search_term} {category}"
    encoded = urllib.parse.quote_plus(search_term)
    return f"https://www.amazon.in/s?k={encoded}"

# Add buy links to all categories
categories = {
    'laptops': 'laptop',
    'cpus': 'processor',
    'gpus': 'graphics card',
    'mobos': 'motherboard',
    'ram': 'RAM memory',
    'storage': 'SSD',
    'psu': 'power supply',
    'case': 'PC case'
}

total_added = 0
for category_key, category_name in categories.items():
    if category_key in data:
        for item in data[category_key]:
            if 'buyLink' not in item or not item.get('buyLink'):
                item['buyLink'] = generate_amazon_link(item['name'], category_name)
                total_added += 1
                print(f"Added link for {category_key}: {item['name'][:50]}...")

# Save the updated database
with open('data/components.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, indent=2, ensure_ascii=False)

print(f"\n✅ Successfully added {total_added} Amazon buy links!")
print(f"📦 Total products in database: {sum(len(data[cat]) for cat in categories.keys() if cat in data)}")
