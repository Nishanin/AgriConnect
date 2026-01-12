import express from 'express';
import CropRecommendation from '../models/CropRecommendation.js';
import { getRecommendations, getCropDetails, analyzeSoil } from '../data/cropRecommendationEngine.js';

const router = express.Router();

// POST /api/crop-recommendation/analyze
// Analyze location, climate, soil, and resources to recommend crops
router.post('/analyze', async (req, res) => {
  try {
    const {
      location,
      climate,
      soil,
      resources,
      userId
    } = req.body;

    // Validate required fields
    if (!location || !climate || !soil) {
      return res.status(400).json({
        success: false,
        message: 'Location, climate, and soil information are required'
      });
    }

    // Get crop recommendations based on user inputs
    const recommendations = getRecommendations({
      climate,
      soil,
      resources: resources || {
        waterAvailability: 'medium',
        irrigationSystem: false,
        farmSize: 'small',
        budget: 'medium',
        labor: 'medium',
        equipment: []
      }
    });

    // Sort recommendations by suitability score
    const sortedRecommendations = recommendations.sort((a, b) => b.suitabilityScore - a.suitabilityScore);

    // Take top 10 recommendations
    const topRecommendations = sortedRecommendations.slice(0, 10);

    // Save to database if userId provided
    let savedRecommendation = null;
    if (userId) {
      savedRecommendation = new CropRecommendation({
        userId,
        location,
        climate,
        soil,
        resources: resources || {},
        recommendations: topRecommendations.map(rec => ({
          cropName: rec.name,
          suitabilityScore: rec.suitabilityScore,
          reasons: rec.reasons,
          warnings: rec.warnings
        })),
        createdAt: new Date()
      });
      await savedRecommendation.save();
    }

    res.json({
      success: true,
      location,
      climate,
      soil,
      resources,
      recommendations: topRecommendations,
      analysisDate: new Date(),
      recommendationId: savedRecommendation ? savedRecommendation._id : null
    });

  } catch (error) {
    console.error('[crop-recommendation] Error analyzing crop recommendations:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to analyze crop recommendations',
      error: error.message
    });
  }
});

// GET /api/crop-recommendation/crop/:cropName
// Get detailed information about a specific crop
router.get('/crop/:cropName', (req, res) => {
  try {
    const { cropName } = req.params;
    
    const cropDetails = getCropDetails(cropName);
    
    if (!cropDetails) {
      return res.status(404).json({
        success: false,
        message: `Crop '${cropName}' not found in database`
      });
    }

    res.json({
      success: true,
      crop: cropDetails
    });

  } catch (error) {
    console.error('[crop-recommendation] Error fetching crop details:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch crop details',
      error: error.message
    });
  }
});

// POST /api/crop-recommendation/soil-analysis
// Analyze soil and get suitable crops
router.post('/soil-analysis', (req, res) => {
  try {
    const { soil } = req.body;

    if (!soil || !soil.type) {
      return res.status(400).json({
        success: false,
        message: 'Soil type information is required'
      });
    }

    const soilAnalysis = analyzeSoil(soil);

    res.json({
      success: true,
      soilAnalysis
    });

  } catch (error) {
    console.error('[crop-recommendation] Error analyzing soil:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to analyze soil',
      error: error.message
    });
  }
});

// GET /api/crop-recommendation/history/:userId
// Get user's past crop recommendations
router.get('/history/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const { limit = 10 } = req.query;

    const history = await CropRecommendation.find({ userId })
      .sort({ createdAt: -1 })
      .limit(parseInt(limit));

    res.json({
      success: true,
      history,
      count: history.length
    });

  } catch (error) {
    console.error('[crop-recommendation] Error fetching history:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch recommendation history',
      error: error.message
    });
  }
});

// GET /api/crop-recommendation/seasons
// Get crop recommendations by season
router.get('/seasons', (req, res) => {
  try {
    const { season, climate } = req.query;

    if (!season) {
      return res.status(400).json({
        success: false,
        message: 'Season parameter is required'
      });
    }

    const seasonalRecommendations = getRecommendations({
      climate: climate ? JSON.parse(climate) : { season },
      soil: { type: 'loamy' }, // Default soil
      resources: {}
    });

    res.json({
      success: true,
      season,
      recommendations: seasonalRecommendations.slice(0, 10)
    });

  } catch (error) {
    console.error('[crop-recommendation] Error fetching seasonal recommendations:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch seasonal recommendations',
      error: error.message
    });
  }
});

export default router;
