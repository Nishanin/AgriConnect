import express from 'express';

const router = express.Router();

// Simulated market price data with realistic fluctuations
// In production, this would fetch from actual market APIs like AGMARKNET, government APIs, etc.
const baseMarketPrices = {
  tomatoes: { base: 48, volatility: 0.08 },
  onions: { base: 38, volatility: 0.1 },
  potatoes: { base: 25, volatility: 0.06 },
  wheat: { base: 26, volatility: 0.04 },
  rice: { base: 42, volatility: 0.05 },
  corn: { base: 28, volatility: 0.07 },
  'green-chillies': { base: 85, volatility: 0.12 },
  cabbage: { base: 18, volatility: 0.09 },
  cauliflower: { base: 32, volatility: 0.11 },
  carrots: { base: 35, volatility: 0.08 },
};

// Helper function to generate realistic price with fluctuation
const generatePrice = (basePrice, volatility, timeOffset = 0) => {
  const now = Date.now() + timeOffset;
  const hourCycle = Math.sin((now / (1000 * 60 * 60)) * Math.PI * 2); // Hourly cycle
  const dayCycle = Math.sin((now / (1000 * 60 * 60 * 24)) * Math.PI * 2); // Daily cycle
  const randomFluctuation = (Math.random() - 0.5) * 2; // -1 to 1
  
  const fluctuation = (hourCycle * 0.3 + dayCycle * 0.5 + randomFluctuation * 0.2) * volatility;
  const price = basePrice * (1 + fluctuation);
  
  return Math.round(price * 100) / 100; // Round to 2 decimal places
};

// Helper function to calculate demand level
const calculateDemandLevel = (currentPrice, basePrice) => {
  const priceRatio = currentPrice / basePrice;
  if (priceRatio > 1.08) return { level: 'High', trend: Math.round((priceRatio - 1) * 100) };
  if (priceRatio > 1.03) return { level: 'Medium', trend: Math.round((priceRatio - 1) * 100) };
  return { level: 'Low', trend: Math.round((priceRatio - 1) * 100) };
};

// GET /api/market-prices/:crop - Get current market prices for a crop
router.get('/:crop', (req, res) => {
  try {
    const { crop } = req.params;
    const cropKey = crop.toLowerCase().replace(/\s+/g, '-');
    
    const cropData = baseMarketPrices[cropKey];
    if (!cropData) {
      return res.status(404).json({ 
        error: 'Crop not found',
        message: `No market data available for ${crop}` 
      });
    }

    const currentPrice = generatePrice(cropData.base, cropData.volatility);
    const minPrice = generatePrice(cropData.base, cropData.volatility, -1000 * 60 * 60 * 2); // 2 hours ago
    const maxPrice = generatePrice(cropData.base, cropData.volatility, -1000 * 60 * 60 * 24 * 3); // 3 days ago
    
    const demand = calculateDemandLevel(currentPrice, cropData.base);
    
    const response = {
      crop: crop,
      avgPrice: `₹${Math.round(currentPrice)}`,
      minPrice: `₹${Math.round(minPrice)}`,
      maxPrice: `₹${Math.round(maxPrice)}`,
      demandLevel: demand.level,
      trend: `${demand.trend > 0 ? '+' : ''}${demand.trend}%`,
      trendPositive: demand.trend > 0,
      lastUpdated: new Date().toISOString(),
      pricePerKg: true,
    };

    res.json(response);
  } catch (error) {
    console.error('Error fetching market prices:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /api/market-prices - Get all market prices
router.get('/', (req, res) => {
  try {
    const allPrices = {};
    
    for (const [crop, data] of Object.entries(baseMarketPrices)) {
      const currentPrice = generatePrice(data.base, data.volatility);
      const minPrice = generatePrice(data.base, data.volatility, -1000 * 60 * 60 * 2);
      const maxPrice = generatePrice(data.base, data.volatility, -1000 * 60 * 60 * 24 * 3);
      const demand = calculateDemandLevel(currentPrice, data.base);
      
      allPrices[crop] = {
        avgPrice: `₹${Math.round(currentPrice)}`,
        minPrice: `₹${Math.round(minPrice)}`,
        maxPrice: `₹${Math.round(maxPrice)}`,
        demandLevel: demand.level,
        trend: `${demand.trend > 0 ? '+' : ''}${demand.trend}%`,
        trendPositive: demand.trend > 0,
      };
    }

    res.json({
      prices: allPrices,
      lastUpdated: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error fetching market prices:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /api/market-prices/:crop/history - Get price history for a crop
router.get('/:crop/history', (req, res) => {
  try {
    const { crop } = req.params;
    const { days = 7 } = req.query;
    const cropKey = crop.toLowerCase().replace(/\s+/g, '-');
    
    const cropData = baseMarketPrices[cropKey];
    if (!cropData) {
      return res.status(404).json({ 
        error: 'Crop not found',
        message: `No market data available for ${crop}` 
      });
    }

    const history = [];
    const now = Date.now();
    const daysCount = Math.min(parseInt(days), 30); // Max 30 days
    
    for (let i = daysCount - 1; i >= 0; i--) {
      const timeOffset = -1000 * 60 * 60 * 24 * i; // Days ago
      const price = generatePrice(cropData.base, cropData.volatility, timeOffset);
      const date = new Date(now + timeOffset);
      
      history.push({
        date: date.toISOString().split('T')[0],
        price: Math.round(price),
        formattedPrice: `₹${Math.round(price)}`,
      });
    }

    res.json({
      crop: crop,
      history: history,
      basePrice: cropData.base,
    });
  } catch (error) {
    console.error('Error fetching price history:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
