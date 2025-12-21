const fs = require('fs');
const path = require('path');

// Read the components database
const data = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'shared', 'data', 'components.json'), 'utf8'));

function generateShoppingLinks(name, category = '') {
    // Clean up the name for better search results
    let searchTerm = name.replace(/ \/ /g, ' ').replace(/\//g, ' ');
    
    // Add category context for better results
    const searchQuery = category ? `${searchTerm} ${category}` : searchTerm;
    
    return {
        amazon: `https://www.amazon.in/s?k=${encodeURIComponent(searchQuery)}`,
        flipkart: `https://www.flipkart.com/search?q=${encodeURIComponent(searchQuery)}`,
        reliance: `https://www.reliancedigital.in/search?q=${encodeURIComponent(searchQuery)}`,
        croma: `https://www.croma.com/search?q=${encodeURIComponent(searchQuery)}`,
        vijay: `https://www.vijayssales.com/search?q=${encodeURIComponent(searchQuery)}`,
        mdcomputers: `https://mdcomputers.in/index.php?route=product/search&search=${encodeURIComponent(searchQuery)}`
    };
}

// Add shopping links to all categories
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

let totalUpdated = 0;
let totalProducts = 0;

for (const [categoryKey, categoryName] of Object.entries(categories)) {
    if (data[categoryKey]) {
        for (const item of data[categoryKey]) {
            totalProducts++;
            
            // Generate all shopping links
            const links = generateShoppingLinks(item.name, categoryName);
            
            // Replace single buyLink with shopLinks object
            delete item.buyLink; // Remove old single link
            item.shopLinks = links;
            
            totalUpdated++;
            
            if (totalUpdated % 100 === 0) {
                console.log(`Processed ${totalUpdated} products...`);
            }
        }
    }
}

// Save the updated database
fs.writeFileSync('data/components.json', JSON.stringify(data, null, 2), 'utf8');

console.log(`\n✅ Successfully added multi-store links to ${totalUpdated} products!`);
console.log(`📦 Total products in database: ${totalProducts}`);
console.log(`🛒 Stores integrated: Amazon, Flipkart, Reliance Digital, Croma, Vijay Sales, MD Computers`);
