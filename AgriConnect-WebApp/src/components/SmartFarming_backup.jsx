import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Sprout, Droplets, Thermometer, Wind, Sun, Cloud,
  TrendingUp, TrendingDown, Activity, Zap, Gauge,
  MapPin, Calendar, AlertTriangle, CheckCircle,
  BarChart3, PieChart, LineChart, ChevronRight, Home, Sparkles
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
    { date: 'Today', fertilizer: 'NPK 10:26:26', amount: '50kg', status: 'pending' },
    { date: 'Next Week', fertilizer: 'Urea', amount: '30kg', status: 'scheduled' },
    { date: 'Next Month', fertilizer: 'Organic Compost', amount: '100kg', status: 'planned' },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'optimal': return 'bg-green-100 text-green-700 border-green-200';
      case 'low': return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'high': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'critical': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const currentField = fields.find(f => f.id === selectedField);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header Bar */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-[1600px] mx-auto px-6 py-5">
          <div className="flex items-center justify-between">
            {/* Left: Breadcrumb and Title */}
            <div>
              <div className="flex items-center text-sm text-gray-500 mb-3">
                <Home className="w-4 h-4 mr-1.5" />
                <span className="hover:text-gray-700 cursor-pointer transition-colors">Dashboard</span>
                <ChevronRight className="w-4 h-4 mx-1.5 text-gray-400" />
                <span className="hover:text-gray-700 cursor-pointer transition-colors">Fields</span>
                <ChevronRight className="w-4 h-4 mx-1.5 text-gray-400" />
                <span className="text-gray-900 font-medium">{currentField?.name}</span>
              </div>
              <h1 className="text-3xl font-bold text-gray-900">
                {currentField?.name}
              </h1>
            </div>

            {/* Right: Field Switcher Pills */}
            <div className="flex items-center gap-2">
              {fields.map((field) => (
                <button
                  key={field.id}
                  onClick={() => setSelectedField(field.id)}
                  className={`px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
                    selectedField === field.id
                      ? 'bg-green-600 text-white shadow-sm hover:bg-green-700'
                      : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 hover:border-gray-400'
                  }`}
                >
                  {field.name.split(' - ')[0]}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-[1600px] mx-auto px-6 py-6 space-y-6">
        {/* First Row: 3 Compact KPI Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-5"
        >
          {/* Card 1: Expected Yield */}
          <Card className="bg-white border border-gray-200 hover:shadow-lg transition-all duration-200">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-600 mb-2">Expected Yield</p>
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="text-4xl font-bold text-gray-900">85%</span>
                    <span className="text-sm text-gray-500">vs expected</span>
                  </div>
                </div>
                <div className="p-3 bg-green-50 rounded-xl">
                  <TrendingUp className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Card 2: Next Irrigation */}
          <Card className="bg-white border border-gray-200 hover:shadow-lg transition-all duration-200">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-600 mb-2">Next Irrigation</p>
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="text-4xl font-bold text-gray-900">2</span>
                    <span className="text-sm text-gray-500">days</span>
                  </div>
                </div>
                <div className="p-3 bg-blue-50 rounded-xl">
                  <Droplets className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Card 3: Overall Health + Pest Alert */}
          <Card className="bg-white border border-gray-200 hover:shadow-lg transition-all duration-200">
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-600 mb-2">Overall Health</p>
                    <span className="text-3xl font-bold text-green-600">Good</span>
                  </div>
                  <div className="p-2.5 bg-green-50 rounded-xl">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  </div>
                </div>
                <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">Pest Alert</span>
                  <Badge className="bg-green-50 text-green-700 border border-green-200 font-semibold px-3 py-1">
                    Low
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Two-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* LEFT COLUMN: Actions */}
          <div className="space-y-6">
            {/* Recommendations Card */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card className="bg-white border border-gray-200 hover:shadow-md transition-shadow">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg font-bold text-gray-900">
                    Recommendations
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {recommendations.map((rec) => (
                    <div
                      key={rec.id}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors"
                    >
                      <div className="flex-1 pr-4">
                        <div className="flex items-center space-x-2 mb-1">
                          <h4 className="font-semibold text-gray-900">{rec.title}</h4>
                          <Badge
                            className={`text-xs font-semibold ${
                              rec.priority === 'high'
                                ? 'bg-red-100 text-red-700 border-red-200'
                                : 'bg-amber-100 text-amber-700 border-amber-200'
                            }`}
                          >
                            {rec.priority === 'high' ? 'High Impact' : 'Medium Impact'}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600">{rec.description}</p>
                      </div>
                      <Button
                        size="sm"
                        className={`${
                          rec.priority === 'high'
                            ? 'bg-green-600 hover:bg-green-700'
                            : 'bg-blue-600 hover:bg-blue-700'
                        } text-white font-medium whitespace-nowrap`}
                      >
                        {rec.action}
                      </Button>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>

            {/* Fertilizer Schedule Card */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="bg-white border border-gray-200 hover:shadow-md transition-shadow">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg font-bold text-gray-900">
                    Fertilizer Schedule
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {fertilizerSchedule.map((schedule, index) => (
                      <div key={index} className="relative pl-8 pb-4 last:pb-0">
                        {/* Timeline Dot and Line */}
                        <div className="absolute left-0 top-0 bottom-0 flex flex-col items-center">
                          <div
                            className={`w-3 h-3 rounded-full border-2 ${
                              schedule.status === 'pending'
                                ? 'bg-red-500 border-red-600'
                                : schedule.status === 'scheduled'
                                ? 'bg-blue-500 border-blue-600'
                                : 'bg-gray-300 border-gray-400'
                            }`}
                          />
                          {index < fertilizerSchedule.length - 1 && (
                            <div className="w-0.5 flex-1 bg-gray-200 mt-1" />
                          )}
                        </div>

                        {/* Content */}
                        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-xs font-bold text-gray-500 uppercase tracking-wide">
                              {schedule.date}
                            </span>
                            <Badge
                              className={`text-xs font-semibold ${
                                schedule.status === 'pending'
                                  ? 'bg-red-100 text-red-700 border-red-200'
                                  : schedule.status === 'scheduled'
                                  ? 'bg-blue-100 text-blue-700 border-blue-200'
                                  : 'bg-gray-100 text-gray-700 border-gray-200'
                              }`}
                            >
                              {schedule.status.charAt(0).toUpperCase() + schedule.status.slice(1)}
                            </Badge>
                          </div>
                          <h4 className="font-semibold text-gray-900 mb-1">
                            {schedule.fertilizer}
                          </h4>
                          <p className="text-lg font-bold text-green-600">{schedule.amount}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* RIGHT COLUMN: Status */}
          <div className="space-y-6">
            {/* Soil Analysis Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card className="bg-white border border-gray-200 hover:shadow-md transition-shadow">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg font-bold text-gray-900">
                    Soil Analysis – {currentField?.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {/* Soil Moisture */}
                    <div className="flex items-center justify-between py-3 border-b border-gray-100">
                      <span className="font-medium text-gray-700">Soil Moisture</span>
                      <div className="flex items-center space-x-3">
                        <span className="text-xl font-bold text-gray-900">75%</span>
                        <Badge className={getStatusColor('optimal')}>Optimal</Badge>
                      </div>
                    </div>

                    {/* Soil pH */}
                    <div className="flex items-center justify-between py-3 border-b border-gray-100">
                      <span className="font-medium text-gray-700">Soil pH</span>
                      <div className="flex items-center space-x-3">
                        <span className="text-xl font-bold text-gray-900">6.8</span>
                        <Badge className={getStatusColor('optimal')}>Optimal</Badge>
                      </div>
                    </div>

                    {/* Nitrogen */}
                    <div className="flex items-center justify-between py-3 border-b border-gray-100">
                      <span className="font-medium text-gray-700">Nitrogen</span>
                      <div className="flex items-center space-x-3">
                        <span className="text-xl font-bold text-gray-900">45%</span>
                        <Badge className={getStatusColor('low')}>Low</Badge>
                      </div>
                    </div>

                    {/* Phosphorus */}
                    <div className="flex items-center justify-between py-3 border-b border-gray-100">
                      <span className="font-medium text-gray-700">Phosphorus</span>
                      <div className="flex items-center space-x-3">
                        <span className="text-xl font-bold text-gray-900">38%</span>
                        <Badge className={getStatusColor('optimal')}>Optimal</Badge>
                      </div>
                    </div>

                    {/* Potassium */}
                    <div className="flex items-center justify-between py-3 border-b border-gray-100">
                      <span className="font-medium text-gray-700">Potassium</span>
                      <div className="flex items-center space-x-3">
                        <span className="text-xl font-bold text-gray-900">65%</span>
                        <Badge className={getStatusColor('high')}>High</Badge>
                      </div>
                    </div>

                    {/* Overall Health */}
                    <div className="flex items-center justify-between py-3 pt-4">
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                        <span className="font-semibold text-gray-900">Overall Health</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div className="h-full bg-green-500 rounded-full" style={{ width: '78%' }} />
                        </div>
                        <span className="text-xl font-bold text-green-600">Good</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Weather Forecast Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="bg-white border border-gray-200 hover:shadow-md transition-shadow">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg font-bold text-gray-900">
                    Weather Forecast
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-4">
                    {/* Today */}
                    <div className="text-center p-4 bg-gray-50 rounded-lg border border-gray-200">
                      <p className="text-xs font-bold text-gray-500 uppercase mb-3">Today</p>
                      <Sun className="w-10 h-10 mx-auto text-yellow-500 mb-3" />
                      <p className="text-2xl font-bold text-gray-900 mb-1">28°C</p>
                      <p className="text-sm text-gray-600 mb-2">Sunny</p>
                      <div className="flex items-center justify-center space-x-1 text-xs text-gray-500">
                        <Droplets className="w-3 h-3 text-blue-500" />
                        <span className="font-medium">65%</span>
                      </div>
                    </div>

                    {/* Tomorrow */}
                    <div className="text-center p-4 bg-gray-50 rounded-lg border border-gray-200">
                      <p className="text-xs font-bold text-gray-500 uppercase mb-3">Tomorrow</p>
                      <Cloud className="w-10 h-10 mx-auto text-gray-400 mb-3" />
                      <p className="text-2xl font-bold text-gray-900 mb-1">26°C</p>
                      <p className="text-sm text-gray-600 mb-2">Cloudy</p>
                      <div className="flex items-center justify-center space-x-1 text-xs text-gray-500">
                        <Droplets className="w-3 h-3 text-blue-500" />
                        <span className="font-medium">70%</span>
                      </div>
                    </div>

                    {/* Day After */}
                    <div className="text-center p-4 bg-gray-50 rounded-lg border border-gray-200">
                      <p className="text-xs font-bold text-gray-500 uppercase mb-3">Day After</p>
                      <Cloud className="w-10 h-10 mx-auto text-blue-400 mb-3" />
                      <p className="text-2xl font-bold text-gray-900 mb-1">24°C</p>
                      <p className="text-sm text-gray-600 mb-2">Rainy</p>
                      <div className="flex items-center justify-center space-x-1 text-xs text-gray-500">
                        <Droplets className="w-3 h-3 text-blue-500" />
                        <span className="font-medium">85%</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}