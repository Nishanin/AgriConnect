import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sprout, MapPin, Thermometer, Droplets, DollarSign, Users, Tractor, Calendar, AlertCircle, CheckCircle, TrendingUp, Sun, Cloud, CloudRain } from 'lucide-react';
import { getCropRecommendations, getRecommendationHistory } from '../api';

const CropRecommendation = () => {
  const [activeTab, setActiveTab] = useState('analyzer');
  const [loading, setLoading] = useState(false);
  const [recommendations, setRecommendations] = useState(null);
  const [history, setHistory] = useState([]);
  const [locationLoading, setLocationLoading] = useState(false);
  const [weatherLoading, setWeatherLoading] = useState(false);
  
  // Determine current season based on month
  const getCurrentSeason = () => {
    const month = new Date().getMonth() + 1; // 1-12
    if (month >= 6 && month <= 10) return 'kharif'; // Monsoon: Jun-Oct
    if (month >= 11 || month <= 3) return 'rabi'; // Winter: Nov-Mar
    return 'zaid'; // Summer: Mar-Jun
  };

  // Get typical climate data for current season
  const getSeasonalClimateData = (season) => {
    const climateData = {
      kharif: { avgTemp: '28', rainfall: '800', humidity: '75' },
      rabi: { avgTemp: '20', rainfall: '150', humidity: '55' },
      zaid: { avgTemp: '32', rainfall: '100', humidity: '45' }
    };
    return climateData[season] || climateData.kharif;
  };

  const currentSeason = getCurrentSeason();
  const seasonalClimate = getSeasonalClimateData(currentSeason);
  
  const [formData, setFormData] = useState({
    location: {
      state: '',
      district: '',
      latitude: '',
      longitude: ''
    },
    climate: {
      season: currentSeason,
      avgTemp: seasonalClimate.avgTemp,
      rainfall: seasonalClimate.rainfall,
      humidity: seasonalClimate.humidity
    },
    soil: {
      type: 'loamy',
      ph: '',
      nitrogen: 'medium',
      phosphorus: 'medium',
      potassium: 'medium',
      organicMatter: 'medium'
    },
    resources: {
      waterAvailability: 'medium',
      irrigationSystem: false,
      farmSize: 'small',
      budget: 'medium',
      labor: 'medium',
      equipment: []
    }
  });

  useEffect(() => {
    loadHistory();
    // Auto-detect location on component mount
    detectLocation();
  }, []);

  const detectLocation = async () => {
    setLocationLoading(true);
    try {
      if (!navigator.geolocation) {
        throw new Error('Geolocation is not supported by your browser');
      }

      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          
          // Update location in form
          setFormData(prev => ({
            ...prev,
            location: {
              ...prev.location,
              latitude: latitude.toFixed(6),
              longitude: longitude.toFixed(6)
            }
          }));

          // Fetch location details using reverse geocoding
          await fetchLocationDetails(latitude, longitude);
          
          // Fetch weather data
          await fetchWeatherData(latitude, longitude);
          
          setLocationLoading(false);
        },
        (error) => {
          console.error('Geolocation error:', error);
          setLocationLoading(false);
          // Silently fail - user can enter manually
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0
        }
      );
    } catch (error) {
      console.error('Location detection failed:', error);
      setLocationLoading(false);
    }
  };

  const fetchLocationDetails = async (lat, lon) => {
    try {
      // Using OpenStreetMap Nominatim for reverse geocoding (free, no API key needed)
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=10&addressdetails=1`,
        {
          headers: {
            'User-Agent': 'AgriConnect-WebApp'
          }
        }
      );
      
      if (response.ok) {
        const data = await response.json();
        const address = data.address || {};
        
        setFormData(prev => ({
          ...prev,
          location: {
            ...prev.location,
            state: address.state || address.region || '',
            district: address.county || address.state_district || address.city || ''
          }
        }));
      }
    } catch (error) {
      console.error('Failed to fetch location details:', error);
    }
  };

  const fetchWeatherData = async (lat, lon) => {
    setWeatherLoading(true);
    try {
      // Using Open-Meteo API (free, no API key needed)
      const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,precipitation&daily=precipitation_sum&timezone=auto`
      );
      
      if (response.ok) {
        const data = await response.json();
        
        // Calculate average rainfall from past data
        const avgRainfall = data.daily?.precipitation_sum 
          ? Math.round(data.daily.precipitation_sum.reduce((a, b) => a + b, 0) / data.daily.precipitation_sum.length * 30)
          : seasonalClimate.rainfall;
        
        setFormData(prev => ({
          ...prev,
          climate: {
            ...prev.climate,
            avgTemp: Math.round(data.current?.temperature_2m || seasonalClimate.avgTemp).toString(),
            humidity: Math.round(data.current?.relative_humidity_2m || seasonalClimate.humidity).toString(),
            rainfall: avgRainfall.toString()
          }
        }));
      }
    } catch (error) {
      console.error('Failed to fetch weather data:', error);
    } finally {
      setWeatherLoading(false);
    }
  };

  const loadHistory = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      if (user._id) {
        const data = await getRecommendationHistory(user._id, 5);
        setHistory(data.history || []);
      }
    } catch (err) {
      console.error('Failed to load history:', err);
    }
  };

  const handleInputChange = (section, field, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleAnalyze = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      const data = await getCropRecommendations({
        ...formData,
        userId: user._id
      });
      
      setRecommendations(data);
      setActiveTab('results');
      loadHistory();
    } catch (err) {
      console.error('Analysis failed:', err);
      alert('Failed to get crop recommendations: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const getSeasonIcon = (season) => {
    const icons = {
      kharif: <CloudRain className="w-4 h-4" />,
      rabi: <Sun className="w-4 h-4" />,
      zaid: <Cloud className="w-4 h-4" />
    };
    return icons[season] || <Sun className="w-4 h-4" />;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center gap-3 mb-3">
            <Sprout className="w-12 h-12 text-green-600" />
            <h1 className="text-4xl font-bold text-gray-900">Crop Recommendation System</h1>
          </div>
          <p className="text-gray-700 text-lg">
            Get personalized crop recommendations based on your location, climate, soil, and resources
          </p>
        </motion.div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8 justify-center">
          {['analyzer', 'results', 'history'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                activeTab === tab
                  ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg shadow-green-500/50'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
              }`}
            >
              {tab === 'analyzer' && '🌱 Analyzer'}
              {tab === 'results' && '📊 Results'}
              {tab === 'history' && '📜 History'}
            </button>
          ))}
        </div>

        {/* Analyzer Tab */}
        {activeTab === 'analyzer' && (
          <motion.form
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onSubmit={handleAnalyze}
            className="space-y-6"
          >
            {/* Location Section */}
            <div className="bg-white/90 backdrop-blur-xl rounded-2xl p-6 border border-gray-200 shadow-md">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <MapPin className="w-6 h-6 text-blue-600" />
                  <h2 className="text-2xl font-bold text-gray-900">Location Details</h2>
                </div>
                <button
                  type="button"
                  onClick={detectLocation}
                  disabled={locationLoading}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 text-sm flex items-center gap-2"
                >
                  {locationLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      Detecting...
                    </>
                  ) : (
                    <>
                      <MapPin className="w-4 h-4" />
                      Auto-Detect Location
                    </>
                  )}
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="State"
                  value={formData.location.state}
                  onChange={(e) => handleInputChange('location', 'state', e.target.value)}
                  className="bg-white border border-gray-300 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-500"
                  required
                />
                <input
                  type="text"
                  placeholder="District"
                  value={formData.location.district}
                  onChange={(e) => handleInputChange('location', 'district', e.target.value)}
                  className="bg-white border border-gray-300 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-500"
                  required
                />
                <input
                  type="text"
                  placeholder="Latitude (auto-detected)"
                  value={formData.location.latitude}
                  onChange={(e) => handleInputChange('location', 'latitude', e.target.value)}
                  className="bg-gray-50 border border-gray-300 rounded-xl px-4 py-3 text-gray-700 placeholder-gray-500"
                  readOnly
                />
                <input
                  type="text"
                  placeholder="Longitude (auto-detected)"
                  value={formData.location.longitude}
                  onChange={(e) => handleInputChange('location', 'longitude', e.target.value)}
                  className="bg-gray-50 border border-gray-300 rounded-xl px-4 py-3 text-gray-700 placeholder-gray-500"
                  readOnly
                />
              </div>
              {formData.location.latitude && formData.location.longitude && (
                <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-lg text-sm text-green-700 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  Location detected: {formData.location.state}, {formData.location.district} ({formData.location.latitude}, {formData.location.longitude})
                </div>
              )}
            </div>

            {/* Climate Section */}
            <div className="bg-white/90 backdrop-blur-xl rounded-2xl p-6 border border-gray-200 shadow-md">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <Thermometer className="w-6 h-6 text-orange-600" />
                  <h2 className="text-2xl font-bold text-gray-900">Climate Conditions</h2>
                </div>
                {weatherLoading && (
                  <div className="flex items-center gap-2 text-sm text-blue-600">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                    Fetching live weather...
                  </div>
                )}
                {formData.location.latitude && !weatherLoading && (
                  <button
                    type="button"
                    onClick={() => fetchWeatherData(parseFloat(formData.location.latitude), parseFloat(formData.location.longitude))}
                    className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors text-sm flex items-center gap-2"
                  >
                    <Cloud className="w-4 h-4" />
                    Refresh Weather
                  </button>
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <select
                  value={formData.climate.season}
                  onChange={(e) => handleInputChange('climate', 'season', e.target.value)}
                  className="bg-white border border-gray-300 rounded-xl px-4 py-3 text-gray-900"
                >
                  <option value="kharif">Kharif (Monsoon - Jun-Oct)</option>
                  <option value="rabi">Rabi (Winter - Nov-Mar)</option>
                  <option value="zaid">Zaid (Summer - Mar-Jun)</option>
                </select>
                <input
                  type="number"
                  placeholder="Average Temperature (°C)"
                  value={formData.climate.avgTemp}
                  onChange={(e) => handleInputChange('climate', 'avgTemp', e.target.value)}
                  className="bg-white border border-gray-300 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-500"
                />
                <input
                  type="number"
                  placeholder="Annual Rainfall (mm)"
                  value={formData.climate.rainfall}
                  onChange={(e) => handleInputChange('climate', 'rainfall', e.target.value)}
                  className="bg-white border border-gray-300 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-500"
                />
                <input
                  type="number"
                  placeholder="Humidity (%)"
                  value={formData.climate.humidity}
                  onChange={(e) => handleInputChange('climate', 'humidity', e.target.value)}
                  className="bg-white border border-gray-300 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-500"
                />
              </div>
            </div>

            {/* Soil Section */}
            <div className="bg-white/90 backdrop-blur-xl rounded-2xl p-6 border border-gray-200 shadow-md">
              <div className="flex items-center gap-3 mb-4">
                <Droplets className="w-6 h-6 text-cyan-600" />
                <h2 className="text-2xl font-bold text-gray-900">Soil Properties</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <select
                  value={formData.soil.type}
                  onChange={(e) => handleInputChange('soil', 'type', e.target.value)}
                  className="bg-white border border-gray-300 rounded-xl px-4 py-3 text-gray-900"
                >
                  <option value="clayey">Clayey Soil</option>
                  <option value="sandy">Sandy Soil</option>
                  <option value="loamy">Loamy Soil</option>
                  <option value="black">Black Soil</option>
                  <option value="red">Red Soil</option>
                  <option value="alluvial">Alluvial Soil</option>
                </select>
                <input
                  type="number"
                  step="0.1"
                  placeholder="Soil pH (5.5-8.5)"
                  value={formData.soil.ph}
                  onChange={(e) => handleInputChange('soil', 'ph', e.target.value)}
                  className="bg-white border border-gray-300 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-500"
                />
                {['nitrogen', 'phosphorus', 'potassium', 'organicMatter'].map((nutrient) => (
                  <select
                    key={nutrient}
                    value={formData.soil[nutrient]}
                    onChange={(e) => handleInputChange('soil', nutrient, e.target.value)}
                    className="bg-white border border-gray-300 rounded-xl px-4 py-3 text-gray-900 capitalize"
                  >
                    <option value="low">{nutrient.replace(/([A-Z])/g, ' $1')} - Low</option>
                    <option value="medium">{nutrient.replace(/([A-Z])/g, ' $1')} - Medium</option>
                    <option value="high">{nutrient.replace(/([A-Z])/g, ' $1')} - High</option>
                  </select>
                ))}
              </div>
            </div>

            {/* Resources Section */}
            <div className="bg-white/90 backdrop-blur-xl rounded-2xl p-6 border border-gray-200 shadow-md">
              <div className="flex items-center gap-3 mb-4">
                <Tractor className="w-6 h-6 text-yellow-600" />
                <h2 className="text-2xl font-bold text-gray-900">Available Resources</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <select
                  value={formData.resources.waterAvailability}
                  onChange={(e) => handleInputChange('resources', 'waterAvailability', e.target.value)}
                  className="bg-white border border-gray-300 rounded-xl px-4 py-3 text-gray-900"
                >
                  <option value="low">Water Availability - Low</option>
                  <option value="medium">Water Availability - Medium</option>
                  <option value="high">Water Availability - High</option>
                </select>
                <select
                  value={formData.resources.farmSize}
                  onChange={(e) => handleInputChange('resources', 'farmSize', e.target.value)}
                  className="bg-white border border-gray-300 rounded-xl px-4 py-3 text-gray-900"
                >
                  <option value="small">Farm Size - Small (&lt;2 acres)</option>
                  <option value="medium">Farm Size - Medium (2-10 acres)</option>
                  <option value="large">Farm Size - Large (&gt;10 acres)</option>
                </select>
                <select
                  value={formData.resources.budget}
                  onChange={(e) => handleInputChange('resources', 'budget', e.target.value)}
                  className="bg-white border border-gray-300 rounded-xl px-4 py-3 text-gray-900"
                >
                  <option value="low">Budget - Low</option>
                  <option value="medium">Budget - Medium</option>
                  <option value="high">Budget - High</option>
                </select>
                <label className="flex items-center gap-3 bg-white border border-gray-300 rounded-xl px-4 py-3 text-gray-900 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.resources.irrigationSystem}
                    onChange={(e) => handleInputChange('resources', 'irrigationSystem', e.target.checked)}
                    className="w-5 h-5"
                  />
                  <span>Irrigation System Available</span>
                </label>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-4 rounded-xl font-bold text-lg shadow-lg shadow-green-500/50 hover:shadow-green-500/70 transition-all disabled:opacity-50"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  Analyzing...
                </span>
              ) : (
                '🌾 Get Crop Recommendations'
              )}
            </button>
          </motion.form>
        )}

        {/* Results Tab */}
        {activeTab === 'results' && recommendations && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            {recommendations.recommendations.map((rec, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/90 backdrop-blur-xl rounded-2xl p-6 border border-gray-200 shadow-lg"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center text-2xl font-bold text-white">
                      #{index + 1}
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">{rec.name}</h3>
                      <p className="text-gray-600">{rec.scientificName}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-green-400">{rec.suitabilityScore}%</div>
                    <div className="text-slate-400 text-sm">Suitability</div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                  <div className="bg-gray-50 rounded-xl p-3 border border-gray-200">
                    <div className="text-gray-600 text-sm mb-1">Season</div>
                    <div className="text-gray-900 font-semibold flex items-center gap-2">
                      {getSeasonIcon(rec.season)}
                      {rec.season.charAt(0).toUpperCase() + rec.season.slice(1)}
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-3 border border-gray-200">
                    <div className="text-gray-600 text-sm mb-1">Growth Duration</div>
                    <div className="text-gray-900 font-semibold">{rec.growthDuration}</div>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-3 border border-gray-200">
                    <div className="text-gray-600 text-sm mb-1">Yield Potential</div>
                    <div className="text-gray-900 font-semibold">{rec.yieldPotential}</div>
                  </div>
                </div>

                {rec.reasons && rec.reasons.length > 0 && (
                  <div className="mb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <h4 className="text-lg font-semibold text-gray-900">Why This Crop?</h4>
                    </div>
                    <ul className="space-y-1">
                      {rec.reasons.map((reason, i) => (
                        <li key={i} className="text-gray-700 flex items-start gap-2">
                          <span className="text-green-400 mt-1">✓</span>
                          {reason}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {rec.warnings && rec.warnings.length > 0 && (
                  <div className="mb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <AlertCircle className="w-5 h-5 text-yellow-600" />
                      <h4 className="text-lg font-semibold text-gray-900">Important Considerations</h4>
                    </div>
                    <ul className="space-y-1">
                      {rec.warnings.map((warning, i) => (
                        <li key={i} className="text-gray-700 flex items-start gap-2">
                          <span className="text-yellow-400 mt-1">⚠</span>
                          {warning}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {rec.cultivationTips && (
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="w-5 h-5 text-blue-600" />
                      <h4 className="text-lg font-semibold text-gray-900">Cultivation Tips</h4>
                    </div>
                    <p className="text-gray-700">{rec.cultivationTips}</p>
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        )}

        {activeTab === 'results' && !recommendations && (
          <div className="text-center py-12">
            <Sprout className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 text-lg">No recommendations yet. Analyze your farm conditions first!</p>
          </div>
        )}

        {/* History Tab */}
        {activeTab === 'history' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-4"
          >
            {history.length > 0 ? (
              history.map((item, index) => (
                <div
                  key={index}
                  className="bg-white/90 backdrop-blur-xl rounded-2xl p-6 border border-gray-200 shadow-md"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{item.location.state}, {item.location.district}</h3>
                      <p className="text-gray-600">{new Date(item.createdAt).toLocaleDateString()}</p>
                    </div>
                    <div className="bg-blue-500/20 text-blue-400 px-3 py-1 rounded-lg text-sm">
                      {item.climate.season}
                    </div>
                  </div>
                  <div className="text-gray-700">
                    Top recommendations: {item.recommendations.slice(0, 3).map(r => r.cropName).join(', ')}
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12">
                <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 text-lg">No recommendation history yet</p>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default CropRecommendation;
