import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Sprout, Droplets, Thermometer, Wind, Sun, Cloud,
  TrendingUp, TrendingDown, Activity, Zap, Gauge,
  MapPin, Calendar, AlertTriangle, CheckCircle,
  BarChart3, PieChart, LineChart
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

export default function SmartFarming({ language }) {
  const [selectedField, setSelectedField] = useState('field-a');

  const translations = {
    en: {
      smartFarming: 'Smart Farming',
      soilAnalysis: 'Soil Analysis',
      weatherMonitoring: 'Weather Monitoring',
      cropRecommendations: 'Crop Recommendations',
      fertilizer: 'Fertilizer',
      irrigation: 'Irrigation',
      pestControl: 'Pest Control',
      fieldA: 'Field A - Wheat',
      fieldB: 'Field B - Tomatoes',
      fieldC: 'Field C - Rice',
      soilMoisture: 'Soil Moisture',
      soilPH: 'Soil pH',
      nitrogen: 'Nitrogen',
      phosphorus: 'Phosphorus',
      potassium: 'Potassium',
      temperature: 'Temperature',
      humidity: 'Humidity',
      optimal: 'Optimal',
      low: 'Low',
      high: 'High',
      critical: 'Critical',
      recommendations: 'Recommendations',
      applyFertilizer: 'Apply NPK fertilizer',
      waterCrop: 'Water the crop',
      checkPests: 'Check for pests',
      monitorWeather: 'Monitor weather',
      yield: 'Expected Yield',
      nextIrrigation: 'Next Irrigation',
      fertilizerSchedule: 'Fertilizer Schedule',
      pestAlert: 'Pest Alert',
      weatherForecast: 'Weather Forecast',
      today: 'Today',
      tomorrow: 'Tomorrow',
      dayAfter: 'Day After',
      viewDetails: 'View Details',
      applyNow: 'Apply Now',
      scheduleTask: 'Schedule Task',
    },
    hi: {
      smartFarming: 'स्मार्ट कृषि',
      soilAnalysis: 'मिट्टी विश्लेषण',
      weatherMonitoring: 'मौसम निगरानी',
      cropRecommendations: 'फसल सिफारिशें',
      fertilizer: 'उर्वरक',
      irrigation: 'सिंचाई',
      pestControl: 'कीट नियंत्रण',
      fieldA: 'खेत A - गेहूं',
      fieldB: 'खेत B - टमाटर',
      fieldC: 'खेत C - चावल',
      soilMoisture: 'मिट्टी की नमी',
      soilPH: 'मिट्टी का pH',
      nitrogen: 'नाइट्रोजन',
      phosphorus: 'फास्फोरस',
      potassium: 'पोटेशियम',
      temperature: 'तापमान',
      humidity: 'आर्द्रता',
      optimal: 'अनुकूल',
      low: 'कम',
      high: 'अधिक',
      critical: 'गंभीर',
      recommendations: 'सिफारिशें',
      applyFertilizer: 'NPK उर्वरक डालें',
      waterCrop: 'फसल को पानी दें',
      checkPests: 'कीटों की जांच करें',
      monitorWeather: 'मौसम की निगरानी करें',
      yield: 'अपेक्षित उत्पादन',
      nextIrrigation: 'अगली सिंचाई',
      fertilizerSchedule: 'उर्वरक कार्यक्रम',
      pestAlert: 'कीट चेतावनी',
      weatherForecast: 'मौसम पूर्वानुमान',
      today: 'आज',
      tomorrow: 'कल',
      dayAfter: 'परसों',
      viewDetails: 'विवरण देखें',
      applyNow: 'अभी लागू करें',
      scheduleTask: 'कार्य निर्धारित करें',
    }
  };

  const t = (key) => translations[language][key] || translations.en[key] || key;

  const fields = [
    { id: 'field-a', name: t('fieldA'), crop: 'Wheat', area: '5 acres', status: 'growing' },
    { id: 'field-b', name: t('fieldB'), crop: 'Tomatoes', area: '3 acres', status: 'flowering' },
    { id: 'field-c', name: t('fieldC'), crop: 'Rice', area: '7 acres', status: 'planted' },
  ];

  const soilData = {
    moisture: { value: 75, status: 'optimal', color: 'text-green-600' },
    ph: { value: 6.8, status: 'optimal', color: 'text-green-600' },
    nitrogen: { value: 45, status: 'low', color: 'text-yellow-600' },
    phosphorus: { value: 38, status: 'optimal', color: 'text-green-600' },
    potassium: { value: 65, status: 'high', color: 'text-blue-600' },
  };

  const weatherData = {
    today: { temp: 28, humidity: 65, condition: 'Sunny', icon: Sun },
    tomorrow: { temp: 26, humidity: 70, condition: 'Cloudy', icon: Cloud },
    dayAfter: { temp: 24, humidity: 85, condition: 'Rainy', icon: Cloud },
  };

  const recommendations = [
    {
      id: 1,
      title: t('applyFertilizer'),
      description: 'NPK fertilizer (10:26:26) at 50kg per acre',
      priority: 'high',
      icon: Sprout,
      color: 'text-red-600 bg-red-50',
      action: t('applyNow')
    },
    {
      id: 2,
      title: t('waterCrop'),
      description: 'Soil moisture dropping, irrigation needed',
      priority: 'medium',
      icon: Droplets,
      color: 'text-blue-600 bg-blue-50',
      action: t('scheduleTask')
    },
    {
      id: 3,
      title: t('checkPests'),
      description: 'Pest activity detected in nearby fields',
      priority: 'medium',
      icon: AlertTriangle,
      color: 'text-yellow-600 bg-yellow-50',
      action: t('viewDetails')
    },
  ];

  const fertilizerSchedule = [
    { 
      date: 'Dec 3, 2025', 
      day: 'Today',
      fertilizer: 'NPK 10:26:26', 
      amount: '50kg/acre', 
      status: 'pending',
      field: 'Field A - Wheat',
      time: '6:00 AM'
    },
    { 
      date: 'Dec 10, 2025', 
      day: 'Next Week',
      fertilizer: 'Urea', 
      amount: '30kg/acre', 
      status: 'scheduled',
      field: 'Field B - Tomatoes',
      time: '7:00 AM'
    },
    { 
      date: 'Jan 3, 2026', 
      day: 'Next Month',
      fertilizer: 'Organic Compost', 
      amount: '100kg/acre', 
      status: 'planned',
      field: 'Field C - Rice',
      time: '6:30 AM'
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'optimal': return 'text-green-600 bg-green-50';
      case 'low': return 'text-yellow-600 bg-yellow-50';
      case 'high': return 'text-blue-600 bg-blue-50';
      case 'critical': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const SoilMetric = ({ label, data }) => (
    <div className="p-4 bg-white rounded-xl border border-gray-200 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-semibold text-gray-600 uppercase tracking-wide">{label}</span>
        <Badge className={getStatusColor(data.status) + ' text-xs font-medium'}>
          {t(data.status)}
        </Badge>
      </div>
      <div className="text-3xl font-bold text-gray-900 mb-2">
        {data.value}{label === t('soilPH') ? '' : '%'}
      </div>
      <Progress
        value={data.value}
        className="h-2 mb-1"
      />
      <p className="text-xs text-gray-500 mt-1">Target: {label === t('soilPH') ? '6.5-7.5' : '60-80%'}</p>
    </div>
  );

  const WeatherCard = ({ day, data }) => (
    <div className="p-4 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl border border-blue-200 text-center hover:shadow-md transition-shadow">
      <p className="text-xs font-semibold text-gray-600 mb-2 uppercase tracking-wide">{day}</p>
      <data.icon className="w-10 h-10 mx-auto text-blue-500 mb-2" />
      <p className="text-2xl font-bold text-gray-900">{data.temp}°C</p>
      <p className="text-sm text-gray-700 font-medium mt-1">{data.condition}</p>
      <div className="flex items-center justify-center mt-3 pt-3 border-t border-blue-200">
        <Droplets className="w-4 h-4 text-blue-500 mr-1" />
        <span className="text-sm font-semibold text-gray-700">{data.humidity}%</span>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100 pt-0.5 px-4 pb-4 lg:px-8 lg:pb-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4"
        >
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 flex items-center">
              <Zap className="w-9 h-9 mr-3 text-green-600" />
              {t('smartFarming')}
            </h1>
            <p className="text-gray-600 mt-2 text-sm lg:text-base">AI-powered insights for modern agriculture</p>
          </div>

          <div className="flex flex-wrap gap-2">
            {fields.map((field) => (
              <Button
                key={field.id}
                variant={selectedField === field.id ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedField(field.id)}
                className={`transition-all ${selectedField === field.id ? 'bg-green-600 hover:bg-green-700 text-white shadow-md' : 'hover:bg-green-50'}`}
              >
                {field.name.split(' - ')[0]}
              </Button>
            ))}
          </div>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4"
        >
          <Card className="p-4 lg:p-5 bg-gradient-to-br from-green-500 to-emerald-600 text-white shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-green-100 text-xs lg:text-sm font-medium mb-1">{t('yield')}</p>
                <p className="text-3xl lg:text-4xl font-bold mb-1">85%</p>
                <p className="text-xs text-green-200">vs expected</p>
              </div>
              <BarChart3 className="w-8 h-8 lg:w-10 lg:h-10 text-green-200 opacity-80" />
            </div>
          </Card>

          <Card className="p-4 lg:p-5 bg-gradient-to-br from-blue-500 to-cyan-600 text-white shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-blue-100 text-xs lg:text-sm font-medium mb-1">{t('nextIrrigation')}</p>
                <p className="text-3xl lg:text-4xl font-bold mb-1">2 days</p>
                <p className="text-xs text-blue-200">Field A</p>
              </div>
              <Droplets className="w-8 h-8 lg:w-10 lg:h-10 text-blue-200 opacity-80" />
            </div>
          </Card>

          <Card className="p-4 lg:p-5 bg-gradient-to-br from-amber-500 to-orange-600 text-white shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-amber-100 text-xs lg:text-sm font-medium mb-1">{t('fertilizerSchedule')}</p>
                <p className="text-3xl lg:text-4xl font-bold mb-1">Today</p>
                <p className="text-xs text-amber-200">NPK required</p>
              </div>
              <Sprout className="w-8 h-8 lg:w-10 lg:h-10 text-amber-200 opacity-80" />
            </div>
          </Card>

          <Card className="p-4 lg:p-5 bg-gradient-to-br from-red-500 to-pink-600 text-white shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-red-100 text-xs lg:text-sm font-medium mb-1">{t('pestAlert')}</p>
                <p className="text-3xl lg:text-4xl font-bold mb-1">Low</p>
                <p className="text-xs text-red-200">Risk level</p>
              </div>
              <AlertTriangle className="w-8 h-8 lg:w-10 lg:h-10 text-red-200 opacity-80" />
            </div>
          </Card>
        </motion.div>

        {/* Soil Analysis Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="p-6 bg-white shadow-xl border border-gray-200">
            <CardHeader className="px-0 pt-0 pb-4">
              <CardTitle className="flex items-center text-xl">
                <Activity className="w-6 h-6 mr-2 text-green-600" />
                {t('soilAnalysis')} - {fields.find(f => f.id === selectedField)?.name}
              </CardTitle>
            </CardHeader>
            <CardContent className="px-0 pb-0">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                <SoilMetric label={t('soilMoisture')} data={soilData.moisture} />
                <SoilMetric label={t('soilPH')} data={soilData.ph} />
                <SoilMetric label={t('nitrogen')} data={soilData.nitrogen} />
                <SoilMetric label={t('phosphorus')} data={soilData.phosphorus} />
                <SoilMetric label={t('potassium')} data={soilData.potassium} />

                <div className="p-4 bg-gradient-to-br from-gray-50 to-slate-100 rounded-lg border border-gray-200">
                  <div className="flex items-center space-x-2 mb-2">
                    <Gauge className="w-5 h-5 text-gray-600" />
                    <span className="text-xs font-medium text-gray-600">Overall</span>
                  </div>
                  <div className="text-2xl font-bold text-green-600 mb-2">Good</div>
                  <Progress value={78} className="h-2" />
                  <p className="text-xs text-gray-500 mt-1">78% Health</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Weather and Recommendations Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Weather Forecast */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="p-6 bg-white shadow-xl border border-gray-200 h-full">
              <CardHeader className="px-0 pt-0 pb-4">
                <CardTitle className="flex items-center text-xl">
                  <Sun className="w-6 h-6 mr-2 text-yellow-600" />
                  {t('weatherForecast')}
                </CardTitle>
              </CardHeader>
              <CardContent className="px-0 pb-0">
                <div className="grid grid-cols-3 gap-3">
                  <WeatherCard day={t('today')} data={weatherData.today} />
                  <WeatherCard day={t('tomorrow')} data={weatherData.tomorrow} />
                  <WeatherCard day={t('dayAfter')} data={weatherData.dayAfter} />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Smart Recommendations */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="p-6 bg-white shadow-xl border border-gray-200 h-full">
              <CardHeader className="px-0 pt-0 pb-4">
                <CardTitle className="flex items-center justify-between text-xl">
                  <div className="flex items-center">
                    <CheckCircle className="w-6 h-6 mr-2 text-blue-600" />
                    {t('recommendations')}
                  </div>
                  <Badge className="bg-blue-100 text-blue-700">3 Active</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="px-0 pb-0">
                <div className="space-y-3">
                  {recommendations.map((rec, index) => (
                    <motion.div
                      key={rec.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 + index * 0.1 }}
                      className={`p-4 rounded-xl ${rec.color} border-l-4 border-current hover:shadow-md transition-shadow`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-3 flex-1">
                          <rec.icon className="w-5 h-5 mt-0.5 flex-shrink-0" />
                          <div className="flex-1">
                            <h4 className="font-semibold text-sm mb-1">{rec.title}</h4>
                            <p className="text-xs opacity-80">{rec.description}</p>
                          </div>
                        </div>
                        <Button
                          size="sm"
                          variant="outline"
                          className="ml-2 text-xs h-8 flex-shrink-0"
                        >
                          {rec.action}
                        </Button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Fertilizer Schedule */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="p-6 bg-white shadow-xl border border-gray-200">
            <CardHeader className="px-0 pt-0 pb-4">
              <CardTitle className="flex items-center justify-between flex-wrap gap-3">
                <div className="flex items-center">
                  <Calendar className="w-6 h-6 mr-2 text-purple-600" />
                  <span className="text-xl">{t('fertilizerSchedule')}</span>
                </div>
                <Button size="sm" className="bg-purple-600 hover:bg-purple-700 text-white">
                  <Sprout className="w-4 h-4 mr-2" />
                  Add Schedule
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="px-0 pb-0">
              <div className="space-y-4">
                {fertilizerSchedule.map((schedule, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className="p-5 bg-gradient-to-r from-purple-50 via-pink-50 to-purple-50 rounded-xl border border-purple-200 hover:shadow-lg transition-all"
                  >
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-2 mb-3">
                          <Badge
                            className={`${
                              schedule.status === 'pending' ? 'bg-red-500 text-white hover:bg-red-600' :
                              schedule.status === 'scheduled' ? 'bg-blue-500 text-white hover:bg-blue-600' :
                              'bg-gray-500 text-white hover:bg-gray-600'
                            } px-3 py-1`}
                          >
                            {schedule.status.toUpperCase()}
                          </Badge>
                          <span className="text-sm font-semibold text-gray-700">{schedule.day}</span>
                          <span className="text-xs text-gray-400">•</span>
                          <span className="text-sm text-gray-600">{schedule.date}</span>
                          <span className="text-xs text-gray-400">•</span>
                          <span className="text-sm text-gray-600">{schedule.time}</span>
                        </div>
                        
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                          <div>
                            <p className="text-xs text-gray-500 mb-1 font-medium">Fertilizer Type</p>
                            <p className="font-semibold text-gray-900">{schedule.fertilizer}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500 mb-1 font-medium">Amount</p>
                            <p className="font-bold text-purple-600 text-lg">{schedule.amount}</p>
                          </div>
                          <div className="col-span-2 md:col-span-1">
                            <p className="text-xs text-gray-500 mb-1 font-medium">Target Field</p>
                            <p className="font-semibold text-gray-900">{schedule.field}</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex lg:flex-col gap-2">
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="flex-1 lg:flex-none text-xs border-purple-300 hover:bg-purple-50 hover:border-purple-400"
                        >
                          Edit
                        </Button>
                        {schedule.status === 'pending' && (
                          <Button 
                            size="sm" 
                            className="flex-1 lg:flex-none text-xs bg-green-600 hover:bg-green-700 text-white"
                          >
                            Apply Now
                          </Button>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}