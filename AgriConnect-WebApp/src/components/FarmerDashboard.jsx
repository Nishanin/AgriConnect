import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Sun,
  Cloud,
  Droplets,
  Wind,
  TrendingUp,
  TrendingDown,
  Sprout,
  Bug,
  Calendar,
  FileText,
  ShoppingCart,
  Bell,
  Thermometer,
  Eye,
  AlertTriangle,
  CheckCircle,
  IndianRupee,
  Package,
  Clock,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export default function FarmerDashboard({ user, language }) {
  const [weatherData, setWeatherData] = useState({
    temperature: 28,
    condition: "Sunny",
    humidity: 65,
    windSpeed: 12,
    visibility: 10,
    icon: Sun,
  });

  const [statsData, setStatsData] = useState({
    earnings: 45230,
    earningsChange: 12,
    orders: 7,
    ordersChange: 3,
    soilMoisture: 75,
    soilStatus: "Optimal"
  });

  const [lastUpdated, setLastUpdated] = useState(new Date());

  const translations = {
    en: {
      goodMorning: "Good Morning",
      goodAfternoon: "Good Afternoon",
      goodEvening: "Good Evening",
      todayWeather: "Today's Weather",
      humidity: "Humidity",
      windSpeed: "Wind Speed",
      visibility: "Visibility",
      quickActions: "Quick Actions",
      marketplace: "Marketplace",
      smartFarming: "Smart Farming",
      diseaseCheck: "Disease Check",
      cropCalendar: "Crop Calendar",
      schemes: "Government Schemes",
      recentActivity: "Recent Activity",
      notifications: "Notifications",
      cropInsights: "Crop Insights",
      earnings: "Monthly Earnings",
      pendingOrders: "Pending Orders",
      weatherAlerts: "Weather Alerts",
      soilMoisture: "Soil Moisture",
      optimal: "Optimal",
      lowMoisture: "Low moisture detected in Field A",
      pestAlert: "Pest alert in tomato crop",
      harvestTime: "Wheat ready for harvest",
      schemeDeadline: "PM-KISAN deadline approaching",
      newOrder: "New order: 50kg tomatoes",
      temperature: "Temperature",
      celsius: "°C",
      percent: "%",
      kmh: "km/h",
      km: "km",
      rs: "₹",
      viewAll: "View All",
      uploadCrop: "Upload Crop",
      checkDisease: "Check Disease",
      viewCalendar: "View Calendar",
      browseSchemes: "Browse Schemes",
    },
    hi: {
      goodMorning: "सुप्रभात",
      goodAfternoon: "नमस्कार",
      goodEvening: "शुभ संध्या",
      todayWeather: "आज का मौसम",
      humidity: "आर्द्रता",
      windSpeed: "हवा की गति",
      visibility: "दृश्यता",
      quickActions: "त्वरित कार्य",
      marketplace: "बाज़ार",
      smartFarming: "स्मार्ट कृषि",
      diseaseCheck: "रोग जांच",
      cropCalendar: "फसल कैलेंडर",
      schemes: "सरकारी योजनाएं",
      recentActivity: "हाल की गतिविधि",
      notifications: "सूचनाएं",
      cropInsights: "फसल अंतर्दृष्टि",
      earnings: "मासिक आय",
      pendingOrders: "लंबित ऑर्डर",
      weatherAlerts: "मौसम चेतावनी",
      soilMoisture: "मिट्टी की नमी",
      optimal: "अनुकूल",
      lowMoisture: "फील्ड A में कम नमी",
      pestAlert: "टमाटर में कीट चेतावनी",
      harvestTime: "गेहूं कटाई के लिए तैयार",
      schemeDeadline: "PM-KISAN समय सीमा नजदीक",
      newOrder: "नया ऑर्डर: 50kg टमाटर",
      temperature: "तापमान",
      celsius: "°से",
      percent: "%",
      kmh: "किमी/घं",
      km: "किमी",
      rs: "₹",
      viewAll: "सभी देखें",
      uploadCrop: "फसल अपलोड करें",
      checkDisease: "रोग जांचें",
      viewCalendar: "कैलेंडर देखें",
      browseSchemes: "योजनाएं देखें",
    },
  };

  const t = (key) => translations[language][key] || translations.en[key] || key;

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return t("goodMorning");
    if (hour < 17) return t("goodAfternoon");
    return t("goodEvening");
  };

  // Fetch live weather data
  const fetchWeatherData = async () => {
    try {
      // Simulate weather fluctuations
      const tempVariation = (Math.random() - 0.5) * 2;
      const humidityVariation = Math.floor((Math.random() - 0.5) * 5);
      const windVariation = (Math.random() - 0.5) * 2;
      
      setWeatherData(prev => ({
        ...prev,
        temperature: Math.round((28 + tempVariation) * 10) / 10,
        humidity: Math.max(60, Math.min(70, prev.humidity + humidityVariation)),
        windSpeed: Math.round((12 + windVariation) * 10) / 10,
      }));
      setLastUpdated(new Date());
    } catch (error) {
      console.error('Error fetching weather:', error);
    }
  };

  // Simulate live stats updates
  const updateStats = () => {
    setStatsData(prev => {
      const earningsChange = Math.floor(Math.random() * 200) - 100;
      const ordersChange = Math.random() > 0.7 ? (Math.random() > 0.5 ? 1 : -1) : 0;
      const moistureChange = Math.floor((Math.random() - 0.5) * 3);
      
      const newEarnings = prev.earnings + earningsChange;
      const newOrders = Math.max(0, prev.orders + ordersChange);
      const newMoisture = Math.max(65, Math.min(85, prev.soilMoisture + moistureChange));
      
      return {
        earnings: newEarnings,
        earningsChange: Math.round(((newEarnings - 45230) / 45230) * 100),
        orders: newOrders,
        ordersChange: newOrders - 7,
        soilMoisture: newMoisture,
        soilStatus: newMoisture > 70 ? "Optimal" : newMoisture > 60 ? "Good" : "Low"
      };
    });
  };

  // Initial fetch and auto-update
  useEffect(() => {
    fetchWeatherData();
    updateStats();
    
    // Update weather every 45 seconds
    const weatherInterval = setInterval(fetchWeatherData, 45000);
    
    // Update stats every 30 seconds
    const statsInterval = setInterval(updateStats, 30000);
    
    return () => {
      clearInterval(weatherInterval);
      clearInterval(statsInterval);
    };
  }, []);

  const quickActions = [
    {
      id: "marketplace",
      title: t("marketplace"),
      description: t("uploadCrop"),
      icon: ShoppingCart,
      color: "from-green-500 to-emerald-500",
      bgColor: "bg-green-50",
    },
    {
      id: "smart-farming",
      title: t("smartFarming"),
      description: "Get insights",
      icon: Sprout,
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-50",
    },
    {
      id: "disease-management",
      title: t("diseaseCheck"),
      description: t("checkDisease"),
      icon: Bug,
      color: "from-red-500 to-orange-500",
      bgColor: "bg-red-50",
    },
    {
      id: "crop-calendar",
      title: t("cropCalendar"),
      description: t("viewCalendar"),
      icon: Calendar,
      color: "from-purple-500 to-pink-500",
      bgColor: "bg-purple-50",
    },
    {
      id: "schemes",
      title: t("schemes"),
      description: t("browseSchemes"),
      icon: FileText,
      color: "from-amber-500 to-yellow-500",
      bgColor: "bg-amber-50",
    },
  ];

  const notifications = [
    {
      id: 1,
      message: t("lowMoisture"),
      type: "warning",
      icon: AlertTriangle,
      time: "2h ago",
      color: "text-amber-600 bg-amber-50",
    },
    {
      id: 2,
      message: t("pestAlert"),
      type: "error",
      icon: Bug,
      time: "4h ago",
      color: "text-red-600 bg-red-50",
    },
    {
      id: 3,
      message: t("harvestTime"),
      type: "success",
      icon: CheckCircle,
      time: "6h ago",
      color: "text-green-600 bg-green-50",
    },
    {
      id: 4,
      message: t("newOrder"),
      type: "info",
      icon: Package,
      time: "1d ago",
      color: "text-blue-600 bg-blue-50",
    },
  ];

  const statsCards = [
    {
      title: t("earnings"),
      value: `₹${statsData.earnings.toLocaleString()}`,
      change: `${statsData.earningsChange > 0 ? '+' : ''}${statsData.earningsChange}%`,
      trend: statsData.earningsChange > 0 ? "up" : statsData.earningsChange < 0 ? "down" : "stable",
      icon: IndianRupee,
      color: "text-green-600",
    },
    {
      title: t("pendingOrders"),
      value: statsData.orders.toString(),
      change: `${statsData.ordersChange > 0 ? '+' : ''}${statsData.ordersChange}`,
      trend: statsData.ordersChange > 0 ? "up" : statsData.ordersChange < 0 ? "down" : "stable",
      icon: Package,
      color: "text-blue-600",
    },
    {
      title: t("soilMoisture"),
      value: `${statsData.soilMoisture}%`,
      change: statsData.soilStatus,
      trend: statsData.soilMoisture > 70 ? "stable" : "down",
      icon: Droplets,
      color: "text-cyan-600",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 p-4 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 p-8 text-white"
        >
          <div className="absolute inset-0 opacity-20">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1683248892987-7b6181dfd718?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBmYXJtaW5nJTIwYWdyaWN1bHR1cmUlMjB0ZWNobm9sb2d5fGVufDF8fHx8MTc1NzU3NTUwN3ww&ixlib=rb-4.1.0&q=80&w=1080"
              alt="Farm background"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between">
            <div className="flex items-center space-x-6 mb-6 lg:mb-0">
              <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-white/30">
                <ImageWithFallback
                  src={user.avatar}
                  alt={user.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h1 className="text-3xl lg:text-4xl font-bold">
                  {getGreeting()}, {user.name}!<span className="ml-2">🌞</span>
                </h1>
                <p className="text-xl opacity-90 mt-1">{user.location}</p>
              </div>
            </div>

            {/* Weather Widget */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white/20 backdrop-blur-lg rounded-2xl p-6 min-w-[300px]"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">{t("todayWeather")}</h3>
                <weatherData.icon className="w-8 h-8" />
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={weatherData.temperature}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.3 }}
                      className="text-3xl font-bold"
                    >
                      {weatherData.temperature}
                      {t("celsius")}
                    </motion.span>
                  </AnimatePresence>
                  <span className="opacity-90">{weatherData.condition}</span>
                </div>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div className="text-center">
                    <Droplets className="w-4 h-4 mx-auto mb-1" />
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={weatherData.humidity}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.3 }}
                      >
                        {weatherData.humidity}
                        {t("percent")}
                      </motion.div>
                    </AnimatePresence>
                    <div className="opacity-70 text-xs">{t("humidity")}</div>
                  </div>
                  <div className="text-center">
                    <Wind className="w-4 h-4 mx-auto mb-1" />
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={weatherData.windSpeed}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.3 }}
                      >
                        {weatherData.windSpeed} {t("kmh")}
                      </motion.div>
                    </AnimatePresence>
                    <div className="opacity-70 text-xs">{t("windSpeed")}</div>
                  </div>
                  <div className="text-center">
                    <Eye className="w-4 h-4 mx-auto mb-1" />
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={weatherData.visibility}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.3 }}
                      >
                        {weatherData.visibility} {t("km")}
                      </motion.div>
                    </AnimatePresence>
                    <div className="opacity-70 text-xs">{t("visibility")}</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-800">Live Dashboard</h2>
            <div className="flex items-center space-x-2">
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-2 h-2 bg-green-500 rounded-full"
              />
              <span className="text-sm text-gray-600">
                Updated {new Date(lastUpdated).toLocaleTimeString()}
              </span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {statsCards.map((stat, index) => (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-6 bg-white/80 backdrop-blur-lg border-0 shadow-xl relative overflow-hidden">
                  <motion.div
                    key={stat.value}
                    initial={{ opacity: 0.5 }}
                    animate={{ opacity: 1 }}
                    className="absolute top-0 right-0 w-2 h-2 bg-green-500 rounded-full m-2"
                    transition={{ duration: 0.3 }}
                  />
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
                    <AnimatePresence mode="wait">
                      <motion.p
                        key={stat.value}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.3 }}
                        className="text-2xl font-bold text-gray-900"
                      >
                        {stat.value}
                      </motion.p>
                    </AnimatePresence>
                    <div className="flex items-center mt-2">
                      {stat.trend === "up" ? (
                        <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                      ) : stat.trend === "down" ? (
                        <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
                      ) : null}
                      <span
                        className={`text-sm ${
                          stat.trend === "up"
                            ? "text-green-600"
                            : stat.trend === "down"
                            ? "text-red-600"
                            : "text-gray-600"
                        }`}
                      >
                        {stat.change}
                      </span>
                    </div>
                  </div>
                  <div
                    className={`p-3 rounded-full ${stat.color
                      .replace("text-", "bg-")
                      .replace("-600", "-100")}`}
                  >
                    <stat.icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
          </div>
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="p-6 bg-white/80 backdrop-blur-lg border-0 shadow-xl">
            <CardHeader className="px-0 pt-0">
              <CardTitle className="flex items-center">
                <Sprout className="w-6 h-6 mr-2 text-green-600" />
                {t("quickActions")}
              </CardTitle>
            </CardHeader>
            <CardContent className="px-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                {quickActions.map((action, index) => (
                  <motion.div
                    key={action.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    whileHover={{ scale: 1.05, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    className="cursor-pointer"
                  >
                    <Card
                      className={`p-4 ${action.bgColor} border-0 shadow-lg hover:shadow-xl transition-all duration-300`}
                    >
                      <div className="text-center space-y-3">
                        <div
                          className={`w-12 h-12 mx-auto rounded-full bg-gradient-to-r ${action.color} flex items-center justify-center`}
                        >
                          <action.icon className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-800">
                            {action.title}
                          </h4>
                          <p className="text-sm text-gray-600 mt-1">
                            {action.description}
                          </p>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Notifications & Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card className="p-6 bg-white/80 backdrop-blur-lg border-0 shadow-xl h-full">
              <CardHeader className="px-0 pt-0">
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Bell className="w-6 h-6 mr-2 text-blue-600" />
                    {t("notifications")}
                  </div>
                  <Badge variant="secondary">4</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="px-0">
                <div className="space-y-3">
                  {notifications.map((notification, index) => (
                    <motion.div
                      key={notification.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 + index * 0.1 }}
                      className={`p-3 rounded-lg ${notification.color} border-l-4 border-current`}
                    >
                      <div className="flex items-start space-x-3">
                        <notification.icon className="w-5 h-5 mt-0.5" />
                        <div className="flex-1">
                          <p className="text-sm font-medium">
                            {notification.message}
                          </p>
                          <p className="text-xs opacity-70 mt-1">
                            {notification.time}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
                <Button variant="outline" className="w-full mt-4">
                  {t("viewAll")}
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card className="p-6 bg-white/80 backdrop-blur-lg border-0 shadow-xl h-full">
              <CardHeader className="px-0 pt-0">
                <CardTitle className="flex items-center">
                  <Clock className="w-6 h-6 mr-2 text-purple-600" />
                  {t("cropInsights")}
                </CardTitle>
              </CardHeader>
              <CardContent className="px-0">
                <div className="space-y-4">
                  <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">Wheat Crop</span>
                      <Badge className="bg-green-100 text-green-700">
                        Ready
                      </Badge>
                    </div>
                    <Progress value={95} className="h-2 mb-2" />
                    <p className="text-sm text-gray-600">
                      95% growth completed
                    </p>
                  </div>

                  <div className="p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">Tomato Crop</span>
                      <Badge className="bg-blue-100 text-blue-700">
                        Growing
                      </Badge>
                    </div>
                    <Progress value={68} className="h-2 mb-2" />
                    <p className="text-sm text-gray-600">
                      68% growth completed
                    </p>
                  </div>

                  <div className="p-4 bg-gradient-to-r from-amber-50 to-yellow-50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">Rice Crop</span>
                      <Badge className="bg-amber-100 text-amber-700">
                        Planning
                      </Badge>
                    </div>
                    <Progress value={15} className="h-2 mb-2" />
                    <p className="text-sm text-gray-600">
                      15% preparation completed
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
