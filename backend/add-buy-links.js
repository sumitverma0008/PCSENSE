const fs = require('fs');
const path = require('path');

// Read the components database
const data = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'shared', 'data', 'components.json'), 'utf8'));

function generateAmazonLink(name, category = '') {
    // Clean up the name for better search results
    let searchTerm = name.replace(/ \/ /g, ' ').replace(/\//g, ' ');
    // Add category context for better results
    if (category) {
        searchTerm = `${searchTerm} ${category}`;
    }
    const encoded = encodeURIComponent(searchTerm);
    return `https://www.amazon.in/s?k=${encoded}`;
}

// Add buy links to all categories
const categories = {
    'laptops': 'laptop',
    'cpus': 'processor',
    'gpus': 'graphics card',
    'mobos': 'motherboard',
    'ram': 'RAM memory',
    'storage': 'SSD',
    'psu': 'power supply',
    'case': 'PC case'
};

let totalAdded = 0;
let totalProducts = 0;

for (const [categoryKey, categoryName] of Object.entries(categories)) {
    if (data[categoryKey]) {
        for (const item of data[categoryKey]) {
            totalProducts++;
            if (!item.buyLink || item.buyLink === '') {
                item.buyLink = generateAmazonLink(item.name, categoryName);
                totalAdded++;
                console.log(`Added link for ${categoryKey}: ${item.name.substring(0, 50)}...`);
            }
        }
    }
}

// Save the updated database
fs.writeFileSync('data/components.json', JSON.stringify(data, null, 2), 'utf8');

console.log(`\n✅ Successfully added ${totalAdded} Amazon buy links!`);
console.log(`📦 Total products in database: ${totalProducts}`);
console.log(`🔗 Products with buy links: ${totalProducts}`);
