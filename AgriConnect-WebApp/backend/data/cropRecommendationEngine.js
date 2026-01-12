// Comprehensive Crop Database with Climate & Soil Requirements
const cropDatabase = {
  // SUMMER CROPS
  tomato: {
    name: 'Tomato',
    season: 'Summer/Monsoon',
    plantingMonths: [3, 4, 5, 9, 10],
    harvestMonths: [6, 7, 8, 12, 1],
    cycleLength: 90,
    climate: {
      tempMin: 20,
      tempMax: 30,
      rainMin: 600,
      rainMax: 1000,
      humidityMin: 50,
      humidityMax: 80,
    },
    soil: {
      type: ['Loamy', 'Sandy Loam'],
      pHMin: 6.0,
      pHMax: 7.0,
      drainageRequired: true,
      organicMatter: 'High',
    },
    water: {
      requirement: 'High',
      irrigationCycle: 'Every 2-3 days',
    },
    yield: '40-50 tons/hectare',
    profitability: 'Very High',
    practices: [
      'Use drip irrigation',
      'Stake plants for support',
      'Mulch to retain moisture',
      'Regular pruning for better air circulation',
      'Rotate crops annually',
    ],
    pestManagement: [
      'Install insect nets',
      'Use neem oil spray',
      'Yellow sticky traps for whiteflies',
      'Remove infected plants immediately',
    ],
    fertilizer: [
      { stage: 'Pre-planting', type: 'FYM', quantity: '25-30 t/ha' },
      { stage: 'Planting', type: 'NPK 12:32:16', quantity: '500 kg/ha' },
      { stage: 'Flowering', type: 'Urea', quantity: '250 kg/ha' },
      { stage: 'Fruiting', type: 'Potassium', quantity: '200 kg/ha' },
    ],
  },

  potato: {
    name: 'Potato',
    season: 'Winter/Rabi',
    plantingMonths: [9, 10, 11],
    harvestMonths: [1, 2, 3],
    cycleLength: 120,
    climate: {
      tempMin: 10,
      tempMax: 20,
      rainMin: 500,
      rainMax: 800,
      humidityMin: 60,
      humidityMax: 90,
    },
    soil: {
      type: ['Sandy Loam', 'Loam'],
      pHMin: 5.5,
      pHMax: 7.0,
      drainageRequired: true,
      organicMatter: 'Medium to High',
    },
    water: {
      requirement: 'Medium',
      irrigationCycle: 'Every 7-10 days',
    },
    yield: '20-25 tons/hectare',
    profitability: 'High',
    practices: [
      'Ridge and furrow method',
      'Use certified seed potatoes',
      'Earthing up during growth',
      'Mulching reduces disease',
      'Crop rotation for 2-3 years',
    ],
    pestManagement: [
      'Early blight management with fungicides',
      'Bordeaux mixture spray',
      'Remove infected tubers',
      'Store in cool, dry place',
    ],
    fertilizer: [
      { stage: 'Pre-planting', type: 'FYM', quantity: '20-25 t/ha' },
      { stage: 'Planting', type: 'NPK 10:26:26', quantity: '500 kg/ha' },
      { stage: 'Growth', type: 'Urea', quantity: '200 kg/ha' },
    ],
  },

  rice: {
    name: 'Rice',
    season: 'Monsoon/Kharif',
    plantingMonths: [5, 6, 7],
    harvestMonths: [9, 10, 11],
    cycleLength: 130,
    climate: {
      tempMin: 20,
      tempMax: 32,
      rainMin: 1200,
      rainMax: 2000,
      humidityMin: 70,
      humidityMax: 95,
    },
    soil: {
      type: ['Clay', 'Clayey Loam'],
      pHMin: 5.5,
      pHMax: 7.0,
      drainageRequired: false,
      organicMatter: 'Medium',
    },
    water: {
      requirement: 'Very High',
      irrigationCycle: 'Flooded irrigation',
    },
    yield: '50-60 quintals/hectare',
    profitability: 'High',
    practices: [
      'Puddling before planting',
      'Transplanting 30-40 days old seedlings',
      'Maintain water level at 5-10 cm',
      'Avoid waterlogging after heading',
    ],
    pestManagement: [
      'Use resistant varieties',
      'Clean fields of alternate hosts',
      'Yellow stem borer management',
      'Spray recommended insecticides',
    ],
    fertilizer: [
      { stage: 'Nursery', type: 'NPK 10:26:26', quantity: '25 kg/ha' },
      { stage: 'Main field', type: 'Urea', quantity: '100 kg/ha' },
      { stage: 'Tillering', type: 'Urea', quantity: '50 kg/ha' },
      { stage: 'Heading', type: 'Potassium', quantity: '40 kg/ha' },
    ],
  },

  wheat: {
    name: 'Wheat',
    season: 'Winter/Rabi',
    plantingMonths: [10, 11],
    harvestMonths: [3, 4],
    cycleLength: 150,
    climate: {
      tempMin: 10,
      tempMax: 25,
      rainMin: 300,
      rainMax: 600,
      humidityMin: 50,
      humidityMax: 70,
    },
    soil: {
      type: ['Loamy', 'Clayey Loam'],
      pHMin: 6.5,
      pHMax: 7.5,
      drainageRequired: true,
      organicMatter: 'Medium',
    },
    water: {
      requirement: 'Medium',
      irrigationCycle: 'Every 20-30 days',
    },
    yield: '45-50 quintals/hectare',
    profitability: 'High',
    practices: [
      'Well-prepared field without clods',
      'Line sowing for uniform growth',
      'Timely weeding (25-30 DAS)',
      'Irrigation at critical stages',
    ],
    pestManagement: [
      'Treat seed with fungicide',
      'Stem fly and armyworm management',
      'Monitor field regularly',
    ],
    fertilizer: [
      { stage: 'Pre-planting', type: 'FYM', quantity: '10-15 t/ha' },
      { stage: 'Sowing', type: 'NPK 12:32:16', quantity: '300 kg/ha' },
      { stage: 'Tillering', type: 'Urea', quantity: '200 kg/ha' },
    ],
  },

  sugarcane: {
    name: 'Sugarcane',
    season: 'Year-round',
    plantingMonths: [1, 2, 3, 10, 11, 12],
    harvestMonths: [12, 1, 2, 3, 4, 5],
    cycleLength: 365,
    climate: {
      tempMin: 15,
      tempMax: 30,
      rainMin: 1200,
      rainMax: 2500,
      humidityMin: 60,
      humidityMax: 85,
    },
    soil: {
      type: ['Deep Loamy', 'Alluvial'],
      pHMin: 5.5,
      pHMax: 7.5,
      drainageRequired: true,
      organicMatter: 'High',
    },
    water: {
      requirement: 'Very High',
      irrigationCycle: 'Every 10-15 days',
    },
    yield: '60-80 tons/hectare',
    profitability: 'Very High',
    practices: [
      'Trenching and planting',
      'Adequate organic matter',
      'Mulching for moisture conservation',
      'Regular intercultural operations',
    ],
    pestManagement: [
      'Borer management with parasitoids',
      'Disease-free seed material',
      'Ratoon management',
    ],
    fertilizer: [
      { stage: 'Pre-planting', type: 'FYM', quantity: '50 t/ha' },
      { stage: 'Planting', type: 'NPK 120:60:60', quantity: '1000 kg/ha' },
      { stage: 'Growth', type: 'Urea', quantity: '500 kg/ha' },
    ],
  },

  maize: {
    name: 'Maize',
    season: 'Kharif/Summer',
    plantingMonths: [4, 5, 6],
    harvestMonths: [8, 9, 10],
    cycleLength: 120,
    climate: {
      tempMin: 18,
      tempMax: 28,
      rainMin: 500,
      rainMax: 1200,
      humidityMin: 50,
      humidityMax: 80,
    },
    soil: {
      type: ['Sandy Loam', 'Loam'],
      pHMin: 6.0,
      pHMax: 7.5,
      drainageRequired: true,
      organicMatter: 'Medium',
    },
    water: {
      requirement: 'High',
      irrigationCycle: 'Every 20-25 days',
    },
    yield: '50-60 quintals/hectare',
    profitability: 'High',
    practices: [
      'Well-spaced plants (60 cm rows)',
      'Timely weeding (25-30 DAS)',
      'Interculture operations',
      'Stalk borer management',
    ],
    pestManagement: [
      'Use resistant varieties',
      'Pheromone traps for borers',
      'Neem oil spray for armyworms',
    ],
    fertilizer: [
      { stage: 'Pre-planting', type: 'FYM', quantity: '10-15 t/ha' },
      { stage: 'Sowing', type: 'NPK 80:40:20', quantity: '375 kg/ha' },
      { stage: 'Knee height', type: 'Urea', quantity: '150 kg/ha' },
    ],
  },

  cotton: {
    name: 'Cotton',
    season: 'Kharif',
    plantingMonths: [4, 5, 6],
    harvestMonths: [10, 11, 12],
    cycleLength: 180,
    climate: {
      tempMin: 18,
      tempMax: 30,
      rainMin: 600,
      rainMax: 1000,
      humidityMin: 40,
      humidityMax: 70,
    },
    soil: {
      type: ['Black Soil', 'Clayey Loam'],
      pHMin: 6.0,
      pHMax: 8.5,
      drainageRequired: true,
      organicMatter: 'Medium',
    },
    water: {
      requirement: 'High',
      irrigationCycle: 'Every 15-20 days',
    },
    yield: '15-20 quintals/hectare',
    profitability: 'Very High',
    practices: [
      'Spacing: 90 x 60 cm',
      'Pinching of terminal buds',
      'Defoliation before harvest',
      'Crop rotation essential',
    ],
    pestManagement: [
      'Integrated pest management',
      'Pheromone traps for bollworms',
      'Neem-based products',
      'Hand picking of infected bolls',
    ],
    fertilizer: [
      { stage: 'Pre-planting', type: 'FYM', quantity: '10 t/ha' },
      { stage: 'Sowing', type: 'NPK 60:30:30', quantity: '300 kg/ha' },
      { stage: 'Flowering', type: 'Urea', quantity: '200 kg/ha' },
    ],
  },

  onion: {
    name: 'Onion',
    season: 'Kharif/Rabi',
    plantingMonths: [6, 7, 8, 11],
    harvestMonths: [11, 12, 3, 4],
    cycleLength: 120,
    climate: {
      tempMin: 13,
      tempMax: 24,
      rainMin: 400,
      rainMax: 800,
      humidityMin: 50,
      humidityMax: 80,
    },
    soil: {
      type: ['Sandy Loam', 'Loam'],
      pHMin: 6.0,
      pHMax: 7.5,
      drainageRequired: true,
      organicMatter: 'High',
    },
    water: {
      requirement: 'Medium',
      irrigationCycle: 'Every 7-10 days',
    },
    yield: '25-30 tons/hectare',
    profitability: 'High',
    practices: [
      'Raised beds for better drainage',
      'Transplanting seedlings at 6-8 weeks',
      'Regular weeding',
      'Proper spacing (15 x 10 cm)',
    ],
    pestManagement: [
      'Thrips management with insecticides',
      'Downy mildew control',
      'Proper storage to prevent sprouting',
    ],
    fertilizer: [
      { stage: 'Pre-planting', type: 'FYM', quantity: '20-25 t/ha' },
      { stage: 'Transplanting', type: 'NPK 60:60:40', quantity: '300 kg/ha' },
      { stage: 'Bulb formation', type: 'Potassium', quantity: '100 kg/ha' },
    ],
  },

  mango: {
    name: 'Mango',
    season: 'Perennial (Summer harvest)',
    plantingMonths: [7, 8, 9],
    harvestMonths: [3, 4, 5],
    cycleLength: 'Multi-year',
    climate: {
      tempMin: 15,
      tempMax: 45,
      rainMin: 500,
      rainMax: 2250,
      humidityMin: 40,
      humidityMax: 90,
    },
    soil: {
      type: ['Deep Loam', 'Sandy Loam'],
      pHMin: 5.5,
      pHMax: 8.0,
      drainageRequired: true,
      organicMatter: 'Medium',
    },
    water: {
      requirement: 'Medium',
      irrigationCycle: 'Every 7-10 days in dry season',
    },
    yield: '10-20 tons/hectare',
    profitability: 'Very High',
    practices: [
      'Grafted varieties for early fruiting',
      'Canopy management and pruning',
      'Mulching at basin',
      'Drip irrigation in dry season',
    ],
    pestManagement: [
      'Flower and fruit drop management',
      'Fruit fly control with traps',
      'Anthracnose management',
    ],
    fertilizer: [
      { stage: 'Establishment', type: 'FYM', quantity: '50-60 kg/tree' },
      { stage: 'Bearing', type: 'NPK', quantity: '300-500 g/tree/year' },
    ],
  },

  coconut: {
    name: 'Coconut',
    season: 'Perennial (Tropical)',
    plantingMonths: [5, 6, 7, 8, 9],
    harvestMonths: [12, 1, 2, 3, 4, 5, 6],
    cycleLength: 'Multi-year',
    climate: {
      tempMin: 20,
      tempMax: 32,
      rainMin: 1400,
      rainMax: 2250,
      humidityMin: 70,
      humidityMax: 90,
    },
    soil: {
      type: ['Sandy Loam', 'Coastal Alluvial'],
      pHMin: 5.5,
      pHMax: 8.0,
      drainageRequired: true,
      organicMatter: 'High',
    },
    water: {
      requirement: 'High',
      irrigationCycle: 'Seasonal irrigation during dry months',
    },
    yield: '60-80 nuts/palm/year',
    profitability: 'Very High',
    practices: [
      'Spacing: 7.5 x 7.5 m',
      'Adequate drainage crucial',
      'Mulching and manuring annually',
      'Intercropping with spices possible',
    ],
    pestManagement: [
      'Rhinoceros beetle management',
      'Leaf spot and bud rot control',
      'Pheromone traps for insects',
    ],
    fertilizer: [
      { stage: 'Establishment', type: 'FYM', quantity: '60-80 kg/tree/year' },
      { stage: 'Bearing', type: 'Potassium', quantity: '400-600 g/tree/year' },
    ],
  },

  spices: {
    name: 'Turmeric',
    season: 'Kharif/Summer',
    plantingMonths: [4, 5, 6, 7],
    harvestMonths: [12, 1, 2],
    cycleLength: 210,
    climate: {
      tempMin: 20,
      tempMax: 32,
      rainMin: 1400,
      rainMax: 2250,
      humidityMin: 70,
      humidityMax: 90,
    },
    soil: {
      type: ['Loam', 'Sandy Loam'],
      pHMin: 5.5,
      pHMax: 7.5,
      drainageRequired: true,
      organicMatter: 'High',
    },
    water: {
      requirement: 'High',
      irrigationCycle: 'Regular irrigation',
    },
    yield: '20-25 tons/hectare (fresh)',
    profitability: 'Very High',
    practices: [
      'Raised beds for drainage',
      'Mulching essential',
      'Shade beneficial in hot regions',
      'Crop rotation important',
    ],
    pestManagement: [
      'Leaf blotch management',
      'Rhizome rot prevention with fungicides',
      'Proper drying and storage',
    ],
    fertilizer: [
      { stage: 'Pre-planting', type: 'FYM', quantity: '40-50 t/ha' },
      { stage: 'Planting', type: 'NPK 40:60:40', quantity: '200 kg/ha' },
    ],
  },
};

// Function to calculate crop suitability score
// Calculate suitability score for a crop based on conditions
function calculateSuitabilityScore(crop, climate, soil, resources) {
  let score = 0;
  let maxScore = 100;

  // Climate suitability (40 points)
  const climateScore = calculateClimateScore(crop.climate, climate);
  score += (climateScore / 100) * 40;

  // Soil suitability (30 points)
  const soilScore = calculateSoilScore(crop.soil, soil);
  score += (soilScore / 100) * 30;

  // Resource availability (20 points)
  const resourceScore = calculateResourceScore(crop, resources);
  score += (resourceScore / 100) * 20;

  // Water requirement match (10 points)
  const waterScore = calculateWaterScore(crop.water, resources);
  score += (waterScore / 100) * 10;

  return Math.round(score);
}

function calculateClimateScore(cropClimate, farmClimate) {
  let score = 100;

  // Safety checks
  if (!cropClimate || !farmClimate) {
    return 50; // Default middle score if data missing
  }

  // Temperature check
  if (farmClimate.avgTemp && cropClimate.tempMin && cropClimate.tempMax) {
    const temp = parseFloat(farmClimate.avgTemp);
    if (temp < cropClimate.tempMin || temp > cropClimate.tempMax) {
      score -= 30;
    }
  }

  // Rainfall check
  if (farmClimate.rainfall && cropClimate.rainMin && cropClimate.rainMax) {
    const rain = parseFloat(farmClimate.rainfall);
    if (rain < cropClimate.rainMin || rain > cropClimate.rainMax) {
      score -= 25;
    }
  } else if (farmClimate.annualRainfall && cropClimate.rainMin && cropClimate.rainMax) {
    const rain = parseFloat(farmClimate.annualRainfall);
    if (rain < cropClimate.rainMin || rain > cropClimate.rainMax) {
      score -= 25;
    }
  }

  // Humidity check (if available)
  if (farmClimate.humidity && cropClimate.humidityMin && cropClimate.humidityMax) {
    const humidity = parseFloat(farmClimate.humidity);
    if (humidity < cropClimate.humidityMin || humidity > cropClimate.humidityMax) {
      score -= 15;
    }
  }

  return Math.max(0, score);
}

function calculateSoilScore(cropSoil, farmSoil) {
  let score = 100;

  // Safety checks
  if (!cropSoil || !farmSoil) {
    return 50; // Default middle score if data missing
  }

  // Soil type compatibility
  if (cropSoil.type && farmSoil.type) {
    const cropTypes = Array.isArray(cropSoil.type) ? cropSoil.type : [cropSoil.type];
    const farmType = farmSoil.type.toLowerCase();
    const isMatch = cropTypes.some(type => 
      farmType.includes(type.toLowerCase()) || type.toLowerCase().includes(farmType)
    );
    if (!isMatch) {
      score -= 25;
    }
  }

  // pH level check
  if (farmSoil.ph && cropSoil.pHMin && cropSoil.pHMax) {
    const ph = parseFloat(farmSoil.ph);
    if (ph < cropSoil.pHMin || ph > cropSoil.pHMax) {
      score -= 30;
    }
  }

  // Drainage requirement
  if (cropSoil.drainageRequired && farmSoil.drainage && farmSoil.drainage !== 'Good') {
    score -= 20;
  }

  // Organic matter
  if (cropSoil.organicMatter === 'High' && farmSoil.organicMatter) {
    const om = typeof farmSoil.organicMatter === 'number' ? farmSoil.organicMatter : 
               (farmSoil.organicMatter === 'high' ? 5 : farmSoil.organicMatter === 'medium' ? 3 : 1);
    if (om < 3) {
      score -= 15;
    }
  }

  return Math.max(0, score);
}

function calculateResourceScore(crop, resources) {
  let score = 100;

  // Safety checks
  if (!crop || !resources) {
    return 50; // Default middle score if data missing
  }

  // Water availability
  if (crop.water.requirement === 'Very High' && resources.waterAvailability === 'Low') {
    score -= 40;
  } else if (crop.water.requirement === 'High' && resources.waterAvailability === 'Low') {
    score -= 20;
  }

  // Irrigation method match
  if (resources.irrigationMethods && resources.irrigationMethods.length === 0) {
    score -= 15;
  }

  // Labor availability
  if (resources.laborAvailability === 'Low' && crop.name !== 'Wheat' && crop.name !== 'Maize') {
    score -= 10;
  }

  // Fertilizer access
  if (resources.fertilizersAccess === 'Low') {
    score -= 10;
  }

  return Math.max(0, score);
}

function calculateWaterScore(cropWater, resources) {
  let score = 100;

  // Safety checks
  if (!cropWater || !resources) {
    return 50; // Default middle score if data missing
  }

  if (cropWater.requirement === 'Very High' && resources.waterAvailability === 'High') {
    score = 100;
  } else if (cropWater.requirement === 'High' && resources.waterAvailability === 'Medium') {
    score = 80;
  } else if (cropWater.requirement === 'Medium' && resources.waterAvailability === 'Low') {
    score = 70;
  } else if (cropWater.requirement === 'Very High' && resources.waterAvailability === 'Low') {
    score = 30;
  }

  return score;
}

// Get recommended crops based on location and conditions
export function getRecommendedCrops(climate, soil, resources, limit = 10) {
  const recommendations = [];

  for (const cropKey in cropDatabase) {
    const crop = cropDatabase[cropKey];
    const score = calculateSuitabilityScore(crop, climate, soil, resources);

    // Generate reasons why this crop is suitable
    const reasons = [];
    const warnings = [];

    // Climate reasons
    if (climate && climate.avgTemp && crop.climate) {
      const temp = parseFloat(climate.avgTemp);
      if (temp >= crop.climate.tempMin && temp <= crop.climate.tempMax) {
        reasons.push(`Temperature range (${temp}°C) is ideal for ${crop.name}`);
      } else if (temp < crop.climate.tempMin) {
        warnings.push(`Temperature might be too low. Optimal range: ${crop.climate.tempMin}-${crop.climate.tempMax}°C`);
      } else if (temp > crop.climate.tempMax) {
        warnings.push(`Temperature might be too high. Optimal range: ${crop.climate.tempMin}-${crop.climate.tempMax}°C`);
      }
    }

    // Season match
    if (climate && climate.season && crop.season) {
      const seasonMatch = crop.season.toLowerCase().includes(climate.season.toLowerCase());
      if (seasonMatch) {
        reasons.push(`Best season for cultivation: ${crop.season}`);
      }
    }

    // Soil reasons
    if (soil && soil.type && crop.soil && crop.soil.type) {
      const soilTypes = Array.isArray(crop.soil.type) ? crop.soil.type : [crop.soil.type];
      const farmSoilType = soil.type || '';
      const isMatch = soilTypes.some(type => 
        farmSoilType.toLowerCase().includes(type.toLowerCase()) ||
        type.toLowerCase().includes(farmSoilType.toLowerCase())
      );
      if (isMatch) {
        reasons.push(`Well-suited for ${soil.type} soil`);
      }
    }

    // Water requirements
    if (resources && resources.waterAvailability && crop.water) {
      const waterMatch = resources.waterAvailability === crop.water.availability;
      if (waterMatch) {
        reasons.push(`Water requirements match available resources`);
      } else if (crop.water.availability === 'high' && resources.waterAvailability !== 'high') {
        warnings.push(`Requires high water availability. Consider irrigation systems.`);
      }
    }

    // Add general cultivation tip
    if (crop.description) {
      reasons.push(crop.description);
    }

    recommendations.push({
      name: crop.name,
      scientificName: crop.scientificName || '',
      season: crop.season || climate.season || 'kharif',
      growthDuration: `${crop.cycleLength} days` || 'N/A',
      yieldPotential: crop.yieldPotential || 'Medium',
      key: cropKey,
      suitabilityScore: Math.round(score),
      reasons: reasons.length > 0 ? reasons : ['Suitable for your region'],
      warnings: warnings,
      cultivationTips: crop.cultivationPractices ? crop.cultivationPractices[0] : null,
      ...crop,
    });
  }

  return recommendations.sort((a, b) => b.suitabilityScore - a.suitabilityScore).slice(0, limit);
}

// Generate crop calendar
function generateCropCalendar(recommendedCrops) {
  const calendar = Array(12).fill(null).map((_, i) => ({
    month: i + 1,
    monthName: [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ][i],
    activities: [],
    crops: [],
  }));

  recommendedCrops.forEach((crop) => {
    crop.plantingMonths?.forEach((month) => {
      if (calendar[month - 1]) {
        calendar[month - 1].crops.push(`${crop.name} - Planting`);
        calendar[month - 1].activities.push(`Prepare field for ${crop.name}`);
      }
    });

    crop.harvestMonths?.forEach((month) => {
      if (calendar[month - 1]) {
        calendar[month - 1].crops.push(`${crop.name} - Harvest`);
        calendar[month - 1].activities.push(`Harvest ${crop.name}`);
      }
    });
  });

  return calendar;
}

// Export functions
export { 
  cropDatabase as default,
  calculateSuitabilityScore,
  getRecommendedCrops as getRecommendations,
  generateCropCalendar
};

// Helper function to get crop details
export function getCropDetails(cropName) {
  const normalizedName = cropName.toLowerCase().replace(/\s+/g, '');
  return cropDatabase[normalizedName] || null;
}

// Helper function to analyze soil
export function analyzeSoil(soil) {
  const recommendations = [];
  const suitableCrops = [];
  
  // Analyze pH
  if (soil.ph) {
    const ph = parseFloat(soil.ph);
    if (ph < 5.5) {
      recommendations.push('Soil is too acidic. Consider adding lime to increase pH.');
    } else if (ph > 8.5) {
      recommendations.push('Soil is too alkaline. Consider adding sulfur to decrease pH.');
    } else {
      recommendations.push('Soil pH is in a good range for most crops.');
    }
  }
  
  // Find crops suitable for this soil
  Object.entries(cropDatabase).forEach(([key, crop]) => {
    if (crop.soil && crop.soil.type) {
      const soilTypes = Array.isArray(crop.soil.type) ? crop.soil.type : [crop.soil.type];
      const normalizedFarmSoil = (soil.type || '').toLowerCase();
      
      const isMatch = soilTypes.some(type => 
        normalizedFarmSoil.includes(type.toLowerCase()) ||
        type.toLowerCase().includes(normalizedFarmSoil)
      );
      
      if (isMatch) {
        suitableCrops.push({
          name: crop.name,
          reason: `Grows well in ${soil.type} soil`
        });
      }
    }
  });
  
  return {
    soilType: soil.type,
    ph: soil.ph,
    recommendations,
    suitableCrops: suitableCrops.slice(0, 10)
  };
}
