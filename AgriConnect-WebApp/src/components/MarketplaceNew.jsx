import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Search, MapPin, Globe, User, ShoppingCart, LayoutDashboard,
  Upload, TrendingUp, TrendingDown, Eye, Users, Package,
  Filter, ChevronDown, Star, Phone, MessageSquare, ExternalLink,
  Sparkles, Activity, BarChart3, Calendar, DollarSign, Leaf
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

export default function MarketplaceNew({ language = 'en' }) {
  const [activeTab, setActiveTab] = useState('marketplace');
  const [selectedCrop, setSelectedCrop] = useState('tomatoes');
  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState('all');
  const [sortBy, setSortBy] = useState('latest');
  const [isLoading, setIsLoading] = useState(false);
  const [priceAnalysis, setPriceAnalysis] = useState({
    avgPrice: '₹48',
    minPrice: '₹45',
    maxPrice: '₹52',
    demandLevel: 'High',
    trend: '+15%',
    trendPositive: true,
    crop: 'Tomatoes'
  });
  const [lastUpdated, setLastUpdated] = useState(new Date());

  const translations = {
    en: {
      deliverTo: 'Deliver to',
      searchPlaceholder: 'Search crops, farmers, locations...',
      hello: 'Hello',
      account: 'Account & Lists',
      orders: 'Orders',
      marketplace: 'Marketplace',
      dashboard: 'Dashboard',
      subtitle: 'Sell your crops directly to verified buyers, retailers, and government agencies.',
      uploadCrop: 'Upload Crop',
      viewMyCrops: 'View My Crops',
      avgPrice: 'Avg Market Price',
      minPrice: 'Min Price (Today)',
      maxPrice: 'Max Price (This week)',
      demandLevel: 'Demand Level',
      searchCrops: 'Search for crops, vegetables, fruits...',
      allCategories: 'All Categories',
      latest: 'Latest',
      myCrops: 'My Crops',
      available: 'Available',
      quantity: 'Quantity',
      yourPrice: 'Your Price',
      marketPrice: 'Market Price',
      goodToSell: 'Good to sell',
      profitMargin: 'Profit Margin',
      views: 'Views',
      impressions: 'Impressions',
      interestedBuyers: 'Interested Buyers',
      contactBuyer: 'Contact Buyer',
      viewBuyers: 'View Buyers',
      noCrops: 'No crops uploaded yet',
      noCropsDesc: 'Start by uploading your first crop listing',
      high: 'High',
      medium: 'Medium',
      low: 'Low',
    },
    hi: {
      deliverTo: 'डिलीवर करें',
      searchPlaceholder: 'फसल, किसान, स्थान खोजें...',
      hello: 'नमस्ते',
      account: 'खाता और सूचियाँ',
      orders: 'ऑर्डर',
      marketplace: 'बाज़ार',
      dashboard: 'डैशबोर्ड',
      subtitle: 'अपनी फसलें सीधे सत्यापित खरीदारों, खुदरा विक्रेताओं और सरकारी एजेंसियों को बेचें।',
      uploadCrop: 'फसल अपलोड करें',
      viewMyCrops: 'मेरी फसलें देखें',
      avgPrice: 'औसत बाज़ार मूल्य',
      minPrice: 'न्यूनतम मूल्य (आज)',
      maxPrice: 'अधिकतम मूल्य (इस सप्ताह)',
      demandLevel: 'मांग स्तर',
      searchCrops: 'फसलें, सब्जियाँ, फल खोजें...',
      allCategories: 'सभी श्रेणियाँ',
      latest: 'नवीनतम',
      myCrops: 'मेरी फसलें',
      available: 'उपलब्ध',
      quantity: 'मात्रा',
      yourPrice: 'आपका मूल्य',
      marketPrice: 'बाज़ार मूल्य',
      goodToSell: 'बेचने के लिए अच्छा',
      profitMargin: 'लाभ मार्जिन',
      views: 'दृश्य',
      impressions: 'प्रभाव',
      interestedBuyers: 'इच्छुक खरीदार',
      contactBuyer: 'खरीदार से संपर्क करें',
      viewBuyers: 'खरीदार देखें',
      noCrops: 'अभी तक कोई फसल अपलोड नहीं की गई',
      noCropsDesc: 'अपनी पहली फसल सूची अपलोड करके शुरू करें',
      high: 'उच्च',
      medium: 'मध्यम',
      low: 'कम',
    }
  };

  const t = (key) => translations[language][key] || translations.en[key] || key;

  // Fetch live market prices
  const fetchMarketPrices = async (crop = 'tomatoes') => {
    try {
      const response = await fetch(`http://localhost:5000/api/market-prices/${crop}`);
      if (response.ok) {
        const data = await response.json();
        setPriceAnalysis({
          avgPrice: data.avgPrice,
          minPrice: data.minPrice,
          maxPrice: data.maxPrice,
          demandLevel: data.demandLevel,
          trend: data.trend,
          trendPositive: data.trendPositive,
          crop: data.crop
        });
        setLastUpdated(new Date());
      }
    } catch (error) {
      console.error('Error fetching market prices:', error);
      // Keep existing data if fetch fails
    }
  };

  // Fetch prices on mount and when selected crop changes
  useEffect(() => {
    fetchMarketPrices(selectedCrop);
    
    // Auto-refresh prices every 30 seconds
    const interval = setInterval(() => {
      fetchMarketPrices(selectedCrop);
    }, 30000);

    return () => clearInterval(interval);
  }, [selectedCrop]);

  const priceAnalysisData = priceAnalysis;

  const cropListings = [
    {
      id: 1,
      title: 'Organic Tomatoes',
      status: 'available',
      quantity: '500 kg',
      description: 'Fresh, organic tomatoes harvested this morning. Premium quality, pesticide-free.',
      yourPrice: '₹45–₹50',
      marketPrice: '₹48',
      pricePerKg: true,
      profitMargin: '+15%',
      profitPositive: true,
      badge: 'Good to sell',
      badgeColor: 'green',
      views: 234,
      impressions: '1.2K',
      interestedBuyers: 12,
      verified: true,
      location: 'Pune, Maharashtra',
      postedDate: '2 hours ago'
    },
    {
      id: 2,
      title: 'Fresh Green Chillies',
      status: 'available',
      quantity: '250 kg',
      description: 'Hot and fresh green chillies. Perfect for retail and restaurant supply.',
      yourPrice: '₹80–₹90',
      marketPrice: '₹85',
      pricePerKg: true,
      profitMargin: '+8%',
      profitPositive: true,
      badge: 'Good to sell',
      badgeColor: 'green',
      views: 156,
      impressions: '890',
      interestedBuyers: 8,
      verified: true,
      location: 'Pune, Maharashtra',
      postedDate: '5 hours ago'
    },
    {
      id: 3,
      title: 'Organic Wheat',
      status: 'available',
      quantity: '2000 kg',
      description: 'Certified organic wheat. Suitable for government procurement and bulk buyers.',
      yourPrice: '₹25–₹28',
      marketPrice: '₹26',
      pricePerKg: true,
      profitMargin: '+5%',
      profitPositive: true,
      badge: 'Fair price',
      badgeColor: 'blue',
      views: 445,
      impressions: '2.1K',
      interestedBuyers: 18,
      verified: true,
      location: 'Pune, Maharashtra',
      postedDate: '1 day ago'
    },
    {
      id: 4,
      title: 'Fresh Onions',
      status: 'available',
      quantity: '800 kg',
      description: 'Grade A onions, ideal for wholesale and retail distribution.',
      yourPrice: '₹35–₹40',
      marketPrice: '₹38',
      pricePerKg: true,
      profitMargin: '+3%',
      profitPositive: true,
      badge: 'Fair price',
      badgeColor: 'blue',
      views: 312,
      impressions: '1.5K',
      interestedBuyers: 15,
      verified: false,
      location: 'Pune, Maharashtra',
      postedDate: '1 day ago'
    },
  ];

  const myCropsListings = [
    {
      id: 1,
      title: 'Organic Tomatoes',
      status: 'active',
      quantity: '500 kg',
      description: 'Fresh, organic tomatoes harvested this morning.',
      yourPrice: '₹45–₹50',
      marketPrice: '₹48',
      pricePerKg: true,
      views: 234,
      impressions: '1.2K',
      interestedBuyers: 12,
      postedDate: '2 hours ago'
    },
  ];

  const categories = [
    { value: 'all', label: t('allCategories') },
    { value: 'vegetables', label: 'Vegetables' },
    { value: 'fruits', label: 'Fruits' },
    { value: 'grains', label: 'Grains' },
    { value: 'pulses', label: 'Pulses' },
    { value: 'spices', label: 'Spices' },
  ];

  const sortOptions = [
    { value: 'latest', label: t('latest') },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'popular', label: 'Most Popular' },
  ];

  const LoadingSkeleton = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <Card key={i} className="overflow-hidden animate-pulse">
          <CardContent className="p-6">
            <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-full mb-4"></div>
            <div className="h-20 bg-gray-200 rounded mb-4"></div>
            <div className="flex gap-2">
              <div className="h-10 bg-gray-200 rounded flex-1"></div>
              <div className="h-10 bg-gray-200 rounded flex-1"></div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  const EmptyState = () => (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center py-20"
    >
      <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full mb-6">
        <Package className="w-10 h-10 text-green-600" />
      </div>
      <h3 className="text-2xl font-bold text-gray-900 mb-2">{t('noCrops')}</h3>
      <p className="text-gray-600 mb-6">{t('noCropsDesc')}</p>
      <Button className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-lg shadow-green-500/30">
        <Upload className="w-4 h-4 mr-2" />
        {t('uploadCrop')}
      </Button>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-green-50/30 to-emerald-50/20">
      {/* Top Navigation Bar */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-lg border-b border-gray-200 shadow-sm">
        <div className="max-w-[1600px] mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-8">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-2 cursor-pointer"
              >
                <div className="w-9 h-9 bg-gradient-to-br from-green-600 to-emerald-600 rounded-lg flex items-center justify-center shadow-lg shadow-green-500/30">
                  <Leaf className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-black bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                  AgriConnect
                </span>
              </motion.div>

              {/* Delivery Location Pill */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-gray-50 to-white border border-gray-200 rounded-full cursor-pointer hover:border-green-300 hover:shadow-md transition-all duration-300"
              >
                <MapPin className="w-4 h-4 text-green-600" />
                <div className="text-xs">
                  <div className="text-gray-500 font-medium">{t('deliverTo')}</div>
                  <div className="font-bold text-gray-900">PUNE</div>
                </div>
              </motion.div>
            </div>

            {/* Global Search Bar */}
            <div className="hidden lg:flex flex-1 max-w-2xl mx-8">
              <div className="relative w-full group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-hover:text-green-600 transition-colors duration-300" />
                <input
                  type="text"
                  placeholder={t('searchPlaceholder')}
                  className="w-full pl-12 pr-4 py-2.5 bg-gradient-to-r from-gray-50 to-white border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-green-500/30 focus:border-green-400 hover:border-green-300 transition-all duration-300 shadow-sm hover:shadow-md"
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  <Sparkles className="w-4 h-4 text-green-500" />
                </div>
              </div>
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-6">
              {/* Language Selector */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="hidden md:flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-gray-50 to-white border border-gray-200 rounded-lg hover:border-green-300 hover:shadow-md transition-all duration-300 text-sm font-semibold"
              >
                <Globe className="w-4 h-4 text-green-600" />
                <span className="text-gray-900">EN</span>
                <ChevronDown className="w-3 h-3 text-gray-500" />
              </motion.button>

              {/* Account Area */}
              <div className="hidden lg:flex items-center gap-4 pl-4 border-l border-gray-200">
                <div className="cursor-pointer group">
                  <div className="text-xs text-gray-600 group-hover:text-green-600 transition-colors">
                    {t('hello')}, <span className="font-bold text-gray-900">Piyush</span>
                  </div>
                  <div className="text-sm font-bold text-gray-900 group-hover:text-green-600 transition-colors flex items-center gap-1">
                    {t('account')}
                    <ChevronDown className="w-3 h-3" />
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  className="cursor-pointer text-sm font-bold text-gray-900 hover:text-green-600 transition-colors"
                >
                  {t('orders')}
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  className="px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white text-sm font-bold rounded-lg shadow-lg shadow-green-500/30 hover:shadow-xl hover:shadow-green-500/40 transition-all duration-300"
                >
                  {t('marketplace')}
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  className="p-2 hover:bg-green-50 rounded-lg transition-all duration-300"
                >
                  <LayoutDashboard className="w-5 h-5 text-gray-700 hover:text-green-600" />
                </motion.button>
              </div>

              {/* Mobile Menu Icon */}
              <button className="lg:hidden p-2 hover:bg-gray-100 rounded-lg">
                <User className="w-5 h-5 text-gray-700" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero / Sub-header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 text-white shadow-xl"
      >
        <div className="max-w-[1600px] mx-auto px-6 py-10">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <h1 className="text-4xl font-black">{t('marketplace')}</h1>
                <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm">
                  AI-Powered
                </Badge>
              </div>
              <p className="text-green-50 text-lg max-w-2xl">
                {t('subtitle')}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button className="bg-white text-green-600 hover:bg-green-50 font-bold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                <Upload className="w-4 h-4 mr-2" />
                {t('uploadCrop')}
              </Button>
              <button className="text-white hover:text-green-50 font-semibold underline underline-offset-4 transition-colors">
                {t('viewMyCrops')} →
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Main Content Area */}
      <div className="max-w-[1600px] mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Price Analysis Panel */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <Card className="bg-white border border-gray-200 hover:shadow-xl transition-all duration-300 overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500"></div>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg font-bold flex items-center justify-between">
                    <span className="bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                      Price Analysis
                    </span>
                    <Activity className="w-5 h-5 text-green-600" />
                  </CardTitle>
                  <div className="mt-2 flex items-center justify-between">
                    <Badge className="bg-gradient-to-r from-green-50 to-emerald-50 text-green-700 border border-green-300 font-bold">
                      {priceAnalysisData.crop}
                    </Badge>
                    <span className="text-xs text-gray-500">
                      Updated {lastUpdated.toLocaleTimeString()}
                    </span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Avg Market Price */}
                  <div className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-200">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold text-gray-600 uppercase tracking-wide">
                        {t('avgPrice')}
                      </span>
                      {priceAnalysisData.trendPositive ? (
                        <Badge className="bg-green-100 text-green-700 border-green-300 text-xs font-bold">
                          <TrendingUp className="w-3 h-3 mr-1" />
                          {priceAnalysisData.trend}
                        </Badge>
                      ) : (
                        <Badge className="bg-red-100 text-red-700 border-red-300 text-xs font-bold">
                          <TrendingDown className="w-3 h-3 mr-1" />
                          {priceAnalysisData.trend}
                        </Badge>
                      )}
                    </div>
                    <div className="text-3xl font-black bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                      {priceAnalysisData.avgPrice}
                      <span className="text-sm font-semibold text-gray-600">/kg</span>
                    </div>
                  </div>

                  {/* Min Price */}
                  <div className="p-3 bg-gradient-to-r from-gray-50 to-white rounded-lg border border-gray-200">
                    <div className="text-xs font-bold text-gray-600 uppercase tracking-wide mb-1">
                      {t('minPrice')}
                    </div>
                    <div className="text-2xl font-black text-gray-900">
                      {priceAnalysisData.minPrice}
                      <span className="text-xs font-semibold text-gray-600">/kg</span>
                    </div>
                  </div>

                  {/* Max Price */}
                  <div className="p-3 bg-gradient-to-r from-gray-50 to-white rounded-lg border border-gray-200">
                    <div className="text-xs font-bold text-gray-600 uppercase tracking-wide mb-1">
                      {t('maxPrice')}
                    </div>
                    <div className="text-2xl font-black text-gray-900">
                      {priceAnalysisData.maxPrice}
                      <span className="text-xs font-semibold text-gray-600">/kg</span>
                    </div>
                  </div>

                  {/* Demand Level */}
                  <div className="p-4 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl border border-blue-200">
                    <div className="text-xs font-bold text-gray-600 uppercase tracking-wide mb-2">
                      {t('demandLevel')}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-black bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                        {priceAnalysisData.demandLevel}
                      </span>
                      <div className="flex gap-1">
                        <div className={`w-2 h-8 rounded-full ${priceAnalysisData.demandLevel === 'High' || priceAnalysisData.demandLevel === 'Medium' || priceAnalysisData.demandLevel === 'Low' ? 'bg-green-500' : 'bg-gray-200'}`}></div>
                        <div className={`w-2 h-8 rounded-full ${priceAnalysisData.demandLevel === 'High' || priceAnalysisData.demandLevel === 'Medium' ? 'bg-green-500' : 'bg-gray-200'}`}></div>
                        <div className={`w-2 h-8 rounded-full ${priceAnalysisData.demandLevel === 'High' ? 'bg-green-500' : 'bg-gray-200'}`}></div>
                        <div className="w-2 h-8 bg-gray-200 rounded-full"></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Quick Stats Card */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 hover:shadow-lg transition-all duration-300">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-bold text-gray-700">Quick Stats</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-600 font-medium">Active Listings</span>
                    <span className="text-lg font-black text-green-600">24</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-600 font-medium">Total Views</span>
                    <span className="text-lg font-black text-blue-600">1,547</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-600 font-medium">Pending Orders</span>
                    <span className="text-lg font-black text-orange-600">3</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Filter Toolbar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm"
            >
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                {/* Search Input */}
                <div className="md:col-span-6 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder={t('searchCrops')}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500/30 focus:border-green-400 transition-all duration-300"
                  />
                </div>

                {/* Category Dropdown */}
                <div className="md:col-span-3 relative">
                  <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full pl-10 pr-8 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500/30 focus:border-green-400 appearance-none cursor-pointer transition-all duration-300"
                  >
                    {categories.map((cat) => (
                      <option key={cat.value} value={cat.value}>
                        {cat.label}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>

                {/* Sort Dropdown */}
                <div className="md:col-span-3 relative">
                  <BarChart3 className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full pl-10 pr-8 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500/30 focus:border-green-400 appearance-none cursor-pointer transition-all duration-300"
                  >
                    {sortOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>
            </motion.div>

            {/* Tabs Section */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-white border border-gray-200 p-1 rounded-xl shadow-sm">
                <TabsTrigger
                  value="marketplace"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-600 data-[state=active]:to-emerald-600 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:shadow-green-500/30 rounded-lg font-bold transition-all duration-300"
                >
                  {t('marketplace')}
                </TabsTrigger>
                <TabsTrigger
                  value="my-crops"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-600 data-[state=active]:to-emerald-600 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:shadow-green-500/30 rounded-lg font-bold transition-all duration-300"
                >
                  {t('myCrops')}
                </TabsTrigger>
              </TabsList>

              {/* Marketplace Tab Content */}
              <TabsContent value="marketplace" className="mt-6">
                <AnimatePresence mode="wait">
                  {isLoading ? (
                    <LoadingSkeleton />
                  ) : (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6"
                    >
                      {cropListings.map((crop, index) => (
                        <motion.div
                          key={crop.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          whileHover={{ y: -8, scale: 1.02 }}
                        >
                          <Card className="h-full bg-white border border-gray-200 hover:border-green-300 hover:shadow-2xl transition-all duration-300 overflow-hidden group">
                            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-green-500 to-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            <CardContent className="p-6">
                              {/* Header */}
                              <div className="flex items-start justify-between mb-4">
                                <div className="flex-1">
                                  <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-green-600 transition-colors">
                                    {crop.title}
                                  </h3>
                                  <div className="flex items-center gap-2 flex-wrap">
                                    <Badge className="bg-green-100 text-green-700 border-green-300 font-bold">
                                      {t('available')}
                                    </Badge>
                                    {crop.verified && (
                                      <Badge className="bg-blue-100 text-blue-700 border-blue-300 font-bold flex items-center gap-1">
                                        <Star className="w-3 h-3 fill-current" />
                                        Verified
                                      </Badge>
                                    )}
                                  </div>
                                </div>
                              </div>

                              {/* Quantity */}
                              <div className="mb-4">
                                <span className="text-sm font-bold text-gray-600">Quantity:</span>
                                <span className="ml-2 text-lg font-black text-gray-900">{crop.quantity}</span>
                              </div>

                              {/* Description */}
                              <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                                {crop.description}
                              </p>

                              {/* Pricing Section */}
                              <div className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-200 mb-4">
                                <div className="grid grid-cols-2 gap-3 mb-3">
                                  <div>
                                    <div className="text-xs font-bold text-gray-600 uppercase mb-1">
                                      {t('yourPrice')}
                                    </div>
                                    <div className="text-xl font-black text-green-600">
                                      {crop.yourPrice}
                                      <span className="text-xs text-gray-600">/kg</span>
                                    </div>
                                  </div>
                                  <div>
                                    <div className="text-xs font-bold text-gray-600 uppercase mb-1">
                                      {t('marketPrice')}
                                    </div>
                                    <div className="text-xl font-black text-gray-900">
                                      {crop.marketPrice}
                                      <span className="text-xs text-gray-600">/kg</span>
                                    </div>
                                  </div>
                                </div>
                                <div className="flex items-center gap-2 flex-wrap">
                                  <Badge className={`font-bold ${
                                    crop.badgeColor === 'green'
                                      ? 'bg-green-100 text-green-700 border-green-300'
                                      : 'bg-blue-100 text-blue-700 border-blue-300'
                                  }`}>
                                    {crop.badge}
                                  </Badge>
                                  {crop.profitMargin && (
                                    <Badge className="bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold shadow-md">
                                      <TrendingUp className="w-3 h-3 mr-1" />
                                      {crop.profitMargin} {t('profitMargin')}
                                    </Badge>
                                  )}
                                </div>
                              </div>

                              {/* Stats Row */}
                              <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-200">
                                <div className="flex items-center gap-1 text-gray-600">
                                  <Eye className="w-4 h-4" />
                                  <span className="text-xs font-semibold">{crop.views}</span>
                                </div>
                                <div className="flex items-center gap-1 text-gray-600">
                                  <Activity className="w-4 h-4" />
                                  <span className="text-xs font-semibold">{crop.impressions}</span>
                                </div>
                                <div className="flex items-center gap-1 text-green-600">
                                  <Users className="w-4 h-4" />
                                  <span className="text-xs font-bold">{crop.interestedBuyers} buyers</span>
                                </div>
                              </div>

                              {/* Action Buttons */}
                              <div className="flex gap-2">
                                <Button className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold shadow-lg shadow-green-500/30 hover:shadow-xl hover:shadow-green-500/40 transition-all duration-300">
                                  <Phone className="w-4 h-4 mr-2" />
                                  {t('contactBuyer')}
                                </Button>
                                <Button
                                  variant="outline"
                                  className="flex-1 border-2 border-green-600 text-green-600 hover:bg-green-50 font-bold transition-all duration-300"
                                >
                                  <ExternalLink className="w-4 h-4 mr-2" />
                                  {t('viewBuyers')}
                                </Button>
                              </div>

                              {/* Footer Info */}
                              <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
                                <div className="flex items-center gap-1">
                                  <MapPin className="w-3 h-3" />
                                  <span>{crop.location}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Calendar className="w-3 h-3" />
                                  <span>{crop.postedDate}</span>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </motion.div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </TabsContent>

              {/* My Crops Tab Content */}
              <TabsContent value="my-crops" className="mt-6">
                <AnimatePresence mode="wait">
                  {myCropsListings.length === 0 ? (
                    <EmptyState />
                  ) : (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6"
                    >
                      {myCropsListings.map((crop, index) => (
                        <motion.div
                          key={crop.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          whileHover={{ y: -8, scale: 1.02 }}
                        >
                          <Card className="h-full bg-white border border-gray-200 hover:border-green-300 hover:shadow-2xl transition-all duration-300 overflow-hidden group">
                            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-green-500 to-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            <CardContent className="p-6">
                              <div className="flex items-start justify-between mb-4">
                                <div className="flex-1">
                                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                                    {crop.title}
                                  </h3>
                                  <Badge className="bg-green-100 text-green-700 border-green-300 font-bold">
                                    Active
                                  </Badge>
                                </div>
                              </div>

                              <div className="mb-4">
                                <span className="text-sm font-bold text-gray-600">Quantity:</span>
                                <span className="ml-2 text-lg font-black text-gray-900">{crop.quantity}</span>
                              </div>

                              <p className="text-sm text-gray-600 mb-4">
                                {crop.description}
                              </p>

                              <div className="p-4 bg-gradient-to-br from-gray-50 to-white rounded-xl border border-gray-200 mb-4">
                                <div className="text-xs font-bold text-gray-600 uppercase mb-1">Your Price</div>
                                <div className="text-2xl font-black text-gray-900">
                                  {crop.yourPrice}
                                  <span className="text-xs text-gray-600">/kg</span>
                                </div>
                              </div>

                              <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-200">
                                <div className="flex items-center gap-1 text-gray-600">
                                  <Eye className="w-4 h-4" />
                                  <span className="text-xs font-semibold">{crop.views}</span>
                                </div>
                                <div className="flex items-center gap-1 text-gray-600">
                                  <Activity className="w-4 h-4" />
                                  <span className="text-xs font-semibold">{crop.impressions}</span>
                                </div>
                                <div className="flex items-center gap-1 text-green-600">
                                  <Users className="w-4 h-4" />
                                  <span className="text-xs font-bold">{crop.interestedBuyers} buyers</span>
                                </div>
                              </div>

                              <div className="flex gap-2">
                                <Button className="flex-1 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-bold shadow-lg shadow-blue-500/30 transition-all duration-300">
                                  Edit Listing
                                </Button>
                                <Button
                                  variant="outline"
                                  className="flex-1 border-2 border-gray-300 text-gray-700 hover:bg-gray-50 font-bold"
                                >
                                  View Details
                                </Button>
                              </div>

                              <div className="mt-4 pt-4 border-t border-gray-100 text-xs text-gray-500">
                                <div className="flex items-center gap-1">
                                  <Calendar className="w-3 h-3" />
                                  <span>Posted {crop.postedDate}</span>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </motion.div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}
