// AI Price Monitoring System for PCSensei
// Automatically checks and updates component prices daily

const fs = require('fs').promises;
const path = require('path');

// Configuration
const CONFIG = {
    dataPath: path.join(__dirname, '..', 'shared', 'data', 'components.json'),
    logPath: path.join(__dirname, '..', 'shared', 'logs', 'price-updates.log'),
    checkInterval: 24 * 60 * 60 * 1000, // 24 hours
    priceVariation: {
        min: 0.95,  // -5% minimum
        max: 1.10   // +10% maximum
    },
    categories: ['laptops', 'cpus', 'gpus', 'mobos', 'ram', 'storage', 'psu', 'case']
};

// AI Price Prediction Engine
class AIPriceMonitor {
    constructor() {
        this.priceHistory = new Map();
        this.lastUpdate = null;
    }

    // Simulate AI price checking with market trends
    async fetchMarketPrice(item, category) {
        // In production, this would call real APIs like:
        // - Amazon Product API
        // - Flipkart API
        // - PriceAPI
        // - Google Shopping API
        
        // Simulated AI price prediction based on:
        // 1. Market trends
        // 2. Supply/demand
        // 3. Seasonal factors
        // 4. Competitor pricing
        
        const currentPrice = item.price;
        const marketFactors = this.calculateMarketFactors(category);
        const seasonalFactor = this.getSeasonalFactor();
        const demandFactor = this.getDemandFactor(category);
        
        // AI-calculated price adjustment
        const priceMultiplier = marketFactors * seasonalFactor * demandFactor;
        const newPrice = Math.round(currentPrice * priceMultiplier);
        
        // Ensure price stays within reasonable bounds
        const minPrice = Math.round(currentPrice * CONFIG.priceVariation.min);
        const maxPrice = Math.round(currentPrice * CONFIG.priceVariation.max);
        
        return Math.max(minPrice, Math.min(maxPrice, newPrice));
    }

    calculateMarketFactors(category) {
        // Simulate market trends for different categories
        const trends = {
            laptops: 0.98,   // Slight decrease due to competition
            cpus: 1.02,      // Slight increase due to demand
            gpus: 1.05,      // Higher demand for gaming/AI
            mobos: 0.99,     // Stable
            ram: 0.97,       // Oversupply
            storage: 0.95,   // SSD price drop
            psu: 1.01,       // Energy efficiency demand
            case: 0.98       // Stable/competitive
        };
        
        // Add random variation (-2% to +2%)
        const variation = 0.98 + (Math.random() * 0.04);
        return (trends[category] || 1.0) * variation;
    }

    getSeasonalFactor() {
        const month = new Date().getMonth();
        // Simulate seasonal pricing:
        // Nov-Dec (10-11): Higher prices (holiday season)
        // Jan-Feb (0-1): Sales/lower prices
        // Mar-Oct: Normal
        
        if (month >= 10) return 1.03;  // +3% holiday season
        if (month <= 1) return 0.97;   // -3% post-holiday sales
        return 1.0;
    }

    getDemandFactor(category) {
        // Simulate demand patterns
        const highDemand = ['gpus', 'cpus', 'laptops'];
        const mediumDemand = ['ram', 'storage', 'mobos'];
        const lowDemand = ['psu', 'case'];
        
        if (highDemand.includes(category)) {
            return 1.00 + (Math.random() * 0.03); // 0-3% increase
        } else if (mediumDemand.includes(category)) {
            return 0.99 + (Math.random() * 0.02); // -1% to +1%
        } else {
            return 0.98 + (Math.random() * 0.02); // -2% to 0%
        }
    }

    async loadDatabase() {
        try {
            const data = await fs.readFile(CONFIG.dataPath, 'utf8');
            return JSON.parse(data);
        } catch (error) {
            console.error('Failed to load database:', error);
            throw error;
        }
    }

    async saveDatabase(db) {
        try {
            await fs.writeFile(
                CONFIG.dataPath,
                JSON.stringify(db, null, 2),
                'utf8'
            );
            console.log('✅ Database updated successfully');
        } catch (error) {
            console.error('Failed to save database:', error);
            throw error;
        }
    }

    async logPriceUpdate(updates) {
        const timestamp = new Date().toISOString();
        const logEntry = {
            timestamp,
            totalUpdates: updates.length,
            updates: updates.map(u => ({
                category: u.category,
                id: u.id,
                name: u.name,
                oldPrice: u.oldPrice,
                newPrice: u.newPrice,
                change: u.change,
                changePercent: u.changePercent
            }))
        };

        try {
            // Ensure logs directory exists
            const logsDir = path.dirname(CONFIG.logPath);
            await fs.mkdir(logsDir, { recursive: true });
            
            const logLine = JSON.stringify(logEntry) + '\n';
            await fs.appendFile(CONFIG.logPath, logLine);
            
            // Also create a human-readable summary
            const summaryPath = path.join(logsDir, 'price-summary.txt');
            const summary = this.generateSummary(updates);
            await fs.writeFile(summaryPath, summary);
            
            console.log(`📝 Logged ${updates.length} price updates`);
        } catch (error) {
            console.error('Failed to write log:', error);
        }
    }

    generateSummary(updates) {
        const timestamp = new Date().toLocaleString('en-IN');
        let summary = `PCSensei Price Update Summary\n`;
        summary += `Generated: ${timestamp}\n`;
        summary += `${'='.repeat(60)}\n\n`;
        
        const byCategory = {};
        updates.forEach(u => {
            if (!byCategory[u.category]) byCategory[u.category] = [];
            byCategory[u.category].push(u);
        });
        
        for (const [category, items] of Object.entries(byCategory)) {
            summary += `${category.toUpperCase()}\n${'-'.repeat(60)}\n`;
            items.forEach(item => {
                const arrow = item.change > 0 ? '↑' : '↓';
                summary += `  ${item.name}\n`;
                summary += `    Old: ₹${item.oldPrice.toLocaleString('en-IN')} → `;
                summary += `New: ₹${item.newPrice.toLocaleString('en-IN')} `;
                summary += `(${arrow} ${Math.abs(item.changePercent).toFixed(2)}%)\n\n`;
            });
        }
        
        const totalIncreases = updates.filter(u => u.change > 0).length;
        const totalDecreases = updates.filter(u => u.change < 0).length;
        
        summary += `\nSummary Statistics:\n`;
        summary += `  Total Updates: ${updates.length}\n`;
        summary += `  Price Increases: ${totalIncreases}\n`;
        summary += `  Price Decreases: ${totalDecreases}\n`;
        summary += `  No Change: ${updates.length - totalIncreases - totalDecreases}\n`;
        
        return summary;
    }

    async checkAndUpdatePrices() {
        console.log('🤖 AI Price Monitor started...');
        console.log(`📅 ${new Date().toLocaleString('en-IN')}`);
        
        try {
            const db = await this.loadDatabase();
            const updates = [];
            
            for (const category of CONFIG.categories) {
                console.log(`\n🔍 Checking ${category}...`);
                
                for (let i = 0; i < db[category].length; i++) {
                    const item = db[category][i];
                    const oldPrice = item.price;
                    
                    // Fetch new price from AI engine
                    const newPrice = await this.fetchMarketPrice(item, category);
                    
                    if (newPrice !== oldPrice) {
                        const change = newPrice - oldPrice;
                        const changePercent = ((change / oldPrice) * 100);
                        
                        updates.push({
                            category,
                            id: item.id,
                            name: item.name || item.id,
                            oldPrice,
                            newPrice,
                            change,
                            changePercent
                        });
                        
                        // Update the database
                        db[category][i].price = newPrice;
                        
                        const symbol = change > 0 ? '📈' : '📉';
                        console.log(`  ${symbol} ${item.name || item.id}: ₹${oldPrice.toLocaleString('en-IN')} → ₹${newPrice.toLocaleString('en-IN')} (${changePercent > 0 ? '+' : ''}${changePercent.toFixed(2)}%)`);
                    }
                }
            }
            
            if (updates.length > 0) {
                await this.saveDatabase(db);
                await this.logPriceUpdate(updates);
                
                console.log(`\n✅ Price check complete: ${updates.length} prices updated`);
            } else {
                console.log('\n✅ Price check complete: No changes needed');
            }
            
            this.lastUpdate = new Date();
            return updates;
            
        } catch (error) {
            console.error('❌ Price check failed:', error);
            throw error;
        }
    }

    startMonitoring() {
        console.log('🚀 Starting AI Price Monitoring Service');
        console.log(`⏰ Check interval: ${CONFIG.checkInterval / (1000 * 60 * 60)} hours`);
        
        // Run immediately on start
        this.checkAndUpdatePrices();
        
        // Schedule daily checks
        setInterval(() => {
            this.checkAndUpdatePrices();
        }, CONFIG.checkInterval);
        
        console.log('✅ Monitoring service started successfully');
    }

    // Manual trigger for testing
    async runManualCheck() {
        console.log('🔧 Manual price check triggered');
        return await this.checkAndUpdatePrices();
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AIPriceMonitor;
}

// Run as standalone script
if (require.main === module) {
    const monitor = new AIPriceMonitor();
    
    // Check command line arguments
    const args = process.argv.slice(2);
    
    if (args.includes('--once')) {
        // Run once and exit
        monitor.runManualCheck()
            .then(() => process.exit(0))
            .catch(err => {
                console.error('Failed:', err);
                process.exit(1);
            });
    } else {
        // Start continuous monitoring
        monitor.startMonitoring();
    }
}
