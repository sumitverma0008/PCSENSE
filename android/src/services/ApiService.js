import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_BASE_URL = 'https://pcsense.vercel.app';
const CACHE_KEY = 'components_cache';
const CACHE_TIMESTAMP_KEY = 'cache_timestamp';
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours

class ApiService {
  // Fetch components with caching
  async getComponents(forceRefresh = false) {
    try {
      // Check cache first
      if (!forceRefresh) {
        const cached = await this.getCachedData();
        if (cached) {
          return cached;
        }
      }

      // Fetch from API
      const response = await axios.get(`${API_BASE_URL}/data/components.json`, {
        timeout: 10000,
      });

      // Cache the data
      await this.cacheData(response.data);
      
      return response.data;
    } catch (error) {
      console.error('API Error:', error);
      
      // Fallback to cache on error
      const cached = await this.getCachedData();
      if (cached) {
        return cached;
      }
      
      throw error;
    }
  }

  // Get cached data
  async getCachedData() {
    try {
      const timestamp = await AsyncStorage.getItem(CACHE_TIMESTAMP_KEY);
      const now = Date.now();

      if (timestamp && now - parseInt(timestamp, 10) < CACHE_DURATION) {
        const cached = await AsyncStorage.getItem(CACHE_KEY);
        if (cached) {
          return JSON.parse(cached);
        }
      }
    } catch (error) {
      console.error('Cache read error:', error);
    }
    return null;
  }

  // Cache data
  async cacheData(data) {
    try {
      await AsyncStorage.setItem(CACHE_KEY, JSON.stringify(data));
      await AsyncStorage.setItem(CACHE_TIMESTAMP_KEY, Date.now().toString());
    } catch (error) {
      console.error('Cache write error:', error);
    }
  }

  // Clear cache
  async clearCache() {
    try {
      await AsyncStorage.removeItem(CACHE_KEY);
      await AsyncStorage.removeItem(CACHE_TIMESTAMP_KEY);
    } catch (error) {
      console.error('Cache clear error:', error);
    }
  }

  // Generate laptop recommendations
  async getLaptopRecommendations(budget, usage, preferences) {
    const data = await this.getComponents();
    const laptops = data.laptops || [];

    // Filter and score laptops
    const scored = laptops
      .filter(laptop => laptop.price <= budget * 1.05)
      .map(laptop => ({
        ...laptop,
        score: this.calculateLaptopScore(laptop, budget, usage),
      }))
      .sort((a, b) => b.score - a.score);

    return scored.slice(0, 3);
  }

  // Generate desktop PC build
  async getDesktopBuild(budget, usage, preferences) {
    const data = await this.getComponents();
    
    // Smart budget allocation based on usage
    const allocation = this.getBudgetAllocation(budget, usage);
    
    // Select components
    const cpu = this.selectComponent(data.cpus, allocation.cpu, preferences.cpu);
    const gpu = this.selectComponent(data.gpus, allocation.gpu, preferences.gpu);
    const mobo = this.selectMotherboard(data.mobos, cpu, allocation.mobo);
    const ram = this.selectComponent(data.ram, allocation.ram);
    const storage = this.selectComponent(data.storage, allocation.storage);
    const psu = this.selectPSU(data.psu, cpu, gpu, allocation.psu);
    const pcCase = this.selectComponent(data.case, allocation.case);

    return {
      cpu,
      gpu,
      motherboard: mobo,
      ram,
      storage,
      psu,
      case: pcCase,
      totalPrice: cpu.price + gpu.price + mobo.price + ram.price + storage.price + psu.price + pcCase.price,
      usage,
      budget,
    };
  }

  // Calculate laptop score
  calculateLaptopScore(laptop, budget, usage) {
    let score = 0;

    // Budget efficiency
    const budgetUtilization = laptop.price / budget;
    if (budgetUtilization >= 0.85 && budgetUtilization <= 1.0) score += 25;
    else if (budgetUtilization >= 0.7) score += 15;

    // Usage-based scoring
    if (usage === 'gaming') {
      if (laptop.type === 'gaming') score += 30;
      if (laptop.spec?.includes('RTX') || laptop.spec?.includes('RX')) score += 20;
    } else if (usage === 'content') {
      if (laptop.spec?.includes('OLED')) score += 20;
      if (laptop.spec?.includes('16GB') || laptop.spec?.includes('32GB')) score += 25;
    } else if (usage === 'coding') {
      if (laptop.spec?.includes('16GB')) score += 25;
      if (laptop.spec?.includes('SSD')) score += 15;
    }

    return score;
  }

  // Budget allocation for desktop
  getBudgetAllocation(budget, usage) {
    if (budget <= 20000) {
      return {cpu: 0.6, gpu: 0, mobo: 0.15, ram: 0.1, storage: 0.08, psu: 0.04, case: 0.03};
    } else if (budget <= 45000) {
      return {cpu: 0.5, gpu: 0, mobo: 0.2, ram: 0.12, storage: 0.1, psu: 0.05, case: 0.03};
    } else if (usage === 'gaming') {
      return {cpu: 0.2, gpu: 0.45, mobo: 0.12, ram: 0.08, storage: 0.08, psu: 0.05, case: 0.02};
    } else {
      return {cpu: 0.3, gpu: 0.25, mobo: 0.15, ram: 0.12, storage: 0.1, psu: 0.05, case: 0.03};
    }
  }

  // Select component by budget
  selectComponent(components, budgetPercent, brandPreference = null) {
    const targetPrice = budgetPercent;
    let filtered = components;

    if (brandPreference) {
      filtered = components.filter(c => 
        c.brand?.toLowerCase().includes(brandPreference.toLowerCase())
      );
      if (filtered.length === 0) filtered = components;
    }

    filtered.sort((a, b) => Math.abs(a.price - targetPrice) - Math.abs(b.price - targetPrice));
    return filtered[0] || components[0];
  }

  // Select motherboard based on CPU socket
  selectMotherboard(mobos, cpu, budgetPercent) {
    const compatible = mobos.filter(mobo => mobo.socket === cpu.socket);
    if (compatible.length === 0) return mobos[0];

    compatible.sort((a, b) => Math.abs(a.price - budgetPercent) - Math.abs(b.price - budgetPercent));
    return compatible[0];
  }

  // Select PSU based on power requirements
  selectPSU(psus, cpu, gpu, budgetPercent) {
    const cpuTDP = this.extractTDP(cpu.spec) || 65;
    const gpuTDP = gpu ? this.extractTDP(gpu.spec) || 150 : 0;
    const requiredWattage = Math.ceil((cpuTDP + gpuTDP + 100) * 1.2);

    const suitable = psus.filter(psu => {
      const wattage = parseInt(psu.name.match(/(\d+)W/)?.[1] || '0', 10);
      return wattage >= requiredWattage;
    });

    if (suitable.length === 0) return psus[0];
    suitable.sort((a, b) => Math.abs(a.price - budgetPercent) - Math.abs(b.price - budgetPercent));
    return suitable[0];
  }

  // Extract TDP from spec string
  extractTDP(spec) {
    const match = spec?.match(/(\d+)W\s*TDP/i);
    return match ? parseInt(match[1], 10) : null;
  }

  // Format Indian Rupee
  formatINR(amount) {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  }
}

export default new ApiService();
