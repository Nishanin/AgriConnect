import mongoose from 'mongoose';

const cropRecommendationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  location: {
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
    address: { type: String },
    region: { type: String },
  },
  climateData: {
    temperature: {
      min: Number,
      max: Number,
      average: Number,
    },
    rainfall: {
      annual: Number,
      monsoon: Number,
      winter: Number,
      summer: Number,
    },
    humidity: {
      average: Number,
      range: {
        min: Number,
        max: Number,
      },
    },
    seasonalVariations: [
      {
        season: String,
        tempRange: { min: Number, max: Number },
        rainfallExpected: Number,
      },
    ],
  },
  soilData: {
    type: {
      name: String,
      description: String,
    },
    pH: Number,
    texture: String,
    drainage: String,
    nutrients: {
      nitrogen: String,
      phosphorus: String,
      potassium: String,
    },
    organic_matter: Number,
  },
  resources: {
    waterAvailability: String,
    irrigationMethods: [String],
    fertilizersAccess: String,
    pesticidesAccess: String,
    laborAvailability: String,
    landSize: Number,
  },
  recommendedCrops: [
    {
      cropName: String,
      suitabilityScore: Number,
      reasons: [String],
      season: String,
      plantingMonth: Number,
      harvestMonth: Number,
      cycleLength: Number,
      waterRequirement: String,
      soilRequirement: String,
      expectedYield: String,
      profitability: String,
      cultivationPractices: [String],
      pestManagement: [String],
      fertilizerSchedule: [
        {
          stage: String,
          fertilizer: String,
          quantity: String,
        },
      ],
    },
  ],
  cropCalendar: [
    {
      month: Number,
      monthName: String,
      activities: [String],
      crops: [String],
    },
  ],
  sustainabilityPractices: [String],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('CropRecommendation', cropRecommendationSchema);
