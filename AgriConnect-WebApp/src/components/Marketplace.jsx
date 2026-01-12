import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import {
  Search, Filter, Grid, List, MapPin, Star, Heart,
  ShoppingCart, Upload, Camera, Plus, Clock, TrendingUp,
  Package, IndianRupee, Eye, Edit, Trash2, Phone, Users,
  Mail, Globe, UserCheck, X, Layers, ArrowUpDown, Truck,
  Shield, CheckCircle2, Award, Zap
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from './ui/dialog';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Separator } from './ui/separator';
import { Slider } from './ui/slider';
import { ImageWithFallback } from './figma/ImageWithFallback';

export default function Marketplace({ userRole, language }) {
  const [viewMode, setViewMode] = useState('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('latest');
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [contactType, setContactType] = useState('buyer');
  const [selectedCrop, setSelectedCrop] = useState('tomatoes');
  const [quickViewItem, setQuickViewItem] = useState(null);
  const [compareList, setCompareList] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [priceData, setPriceData] = useState({
    avgPrice: '₹42',
    minPrice: '₹38',
    maxPrice: '₹48',
    demandLevel: 'High',
    trend: '+15%',
    trendPositive: true
  });
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [bulkOrderOpen, setBulkOrderOpen] = useState(false);
  const [bulkOrderItem, setBulkOrderItem] = useState(null);

  const translations = {
    en: {
      marketplace: 'Marketplace',
      searchPlaceholder: 'Search for crops, vegetables, fruits...',
      categories: 'Categories',
      all: 'All',
      vegetables: 'Vegetables',
      fruits: 'Fruits',
      grains: 'Grains',
      spices: 'Spices',
      sortBy: 'Sort By',
      latest: 'Latest',
      priceAsc: 'Price: Low to High',
      priceDesc: 'Price: High to Low',
      rating: 'Rating',
      uploadCrop: 'Upload Crop',
      myCrops: 'My Crops',
      buyNow: 'Buy Now',
      addToCart: 'Add to Cart',
      contactFarmer: 'Contact Farmer',
      viewDetails: 'View Details',
      perKg: 'per kg',
      organic: 'Organic',
      fresh: 'Fresh',
      premium: 'Premium',
      cropName: 'Crop Name',
      description: 'Description',
      price: 'Price per kg',
      quantity: 'Available Quantity',
      category: 'Category',
      uploadImages: 'Upload Images',
      submit: 'Submit',
      cancel: 'Cancel',
      edit: 'Edit',
      delete: 'Delete',
      sold: 'Sold',
      available: 'Available',
      location: 'Location',
      farmer: 'Farmer',
      harvest: 'Harvest Date',
      marketPrice: 'Market Price',
      yourPrice: 'Your Price',
      profit: 'Profit Margin',
      recommendedPrice: 'Recommended Price',
      priceAnalysis: 'Price Analysis',
      avgMarketPrice: 'Avg Market Price',
      minPrice: 'Min Price',
      maxPrice: 'Max Price',
      demandLevel: 'Demand Level',
      high: 'High',
      medium: 'Medium',
      low: 'Low',
      sellNow: 'Sell Now',
      listCrop: 'List My Crop',
      contactBuyer: 'Contact Buyer',
      contactAuthority: 'Contact Authority',
      viewBuyers: 'View Buyers',
      interestedBuyers: 'interested buyers',
      priceRange: 'Price Range',
      location: 'Location',
      allLocations: 'All Locations',
      bulkOrder: 'Request Bulk Order',
      quickView: 'Quick View',
      compareProducts: 'Compare Products',
      comparing: 'Comparing',
      clearComparison: 'Clear All',
      viewComparison: 'View Comparison',
      minOrder: 'Min Order',
      deliveryTime: 'Delivery Time',
      certifications: 'Certifications',
      requestQuote: 'Request Quote',
      quantityNeeded: 'Quantity Needed',
      deliveryDate: 'Preferred Delivery',
      additionalNotes: 'Additional Notes',
      priceComparison: 'Price Comparison',
      regionalPrices: 'Regional Prices',
      yourPrice: 'Your Price',
      marketAvg: 'Market Avg',
      profitMargin: 'Profit Margin',
    },
    hi: {
      marketplace: 'बाज़ार',
      searchPlaceholder: 'फसल, सब्जियां, फल खोजें...',
      categories: 'श्रेणियां',
      all: 'सभी',
      vegetables: 'सब्जियां',
      fruits: 'फल',
      grains: 'अनाज',
      spices: 'मसाले',
      sortBy: 'क्रमबद्ध करें',
      latest: 'नवीनतम',
      priceAsc: 'मूल्य: कम से ज्यादा',
      priceDesc: 'मूल्य: ज्यादा से कम',
      rating: 'रेटिंग',
      uploadCrop: 'फसल अपलोड करें',
      myCrops: 'मेरी फसलें',
      buyNow: 'अभी खरीदें',
      addToCart: 'कार्ट में डालें',
      contactFarmer: 'किसान से संपर्क करें',
      viewDetails: 'विवरण देखें',
      perKg: 'प्रति किलो',
      organic: 'जैविक',
      fresh: 'ताजा',
      premium: 'प्रीमियम',
      cropName: 'फसल का नाम',
      description: 'विवरण',
      price: 'प्रति किलो मूल्य',
      quantity: 'उपलब्ध मात्रा',
      category: 'श्रेणी',
      uploadImages: 'तस्वीरें अपलोड करें',
      submit: 'जमा करें',
      cancel: 'रद्द करें',
      edit: 'संपादित करें',
      delete: 'हटाएं',
      sold: 'बेचा गया',
      available: 'उपलब्ध',
      location: 'स्थान',
      farmer: 'किसान',
      harvest: 'कटाई की तारीख',
      contactBuyer: 'खरीदार से संपर्क करें',
      contactAuthority: 'प्राधिकरण से संपर्क करें',
      viewBuyers: 'खरीदार देखें',
      interestedBuyers: 'इच्छुक खरीदार',
    }
  };

  const t = (key) => translations[language][key] || translations.en[key] || key;

  // Fetch live market prices
  const fetchMarketPrices = async (crop = 'tomatoes') => {
    try {
      const response = await fetch(`http://localhost:5001/api/market-prices/${crop}`);
      if (response.ok) {
        const data = await response.json();
        setPriceData({
          avgPrice: data.avgPrice,
          minPrice: data.minPrice,
          maxPrice: data.maxPrice,
          demandLevel: data.demandLevel,
          trend: data.trend,
          trendPositive: data.trendPositive
        });
        setLastUpdated(new Date());
      }
    } catch (error) {
      console.error('Error fetching market prices:', error);
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

  const categories = [
    { id: 'all', label: t('all') },
    { id: 'vegetables', label: t('vegetables') },
    { id: 'fruits', label: t('fruits') },
    { id: 'grains', label: t('grains') },
    { id: 'spices', label: t('spices') },
  ];

  const marketplaceItems = [
    {
      id: 1,
      name: 'Organic Tomatoes',
      farmer: 'Ramesh Kumar',
      location: 'Maharashtra',
      price: 45,
      originalPrice: 50,
      rating: 4.8,
      reviews: 24,
      category: 'vegetables',
      quantity: '500 kg',
      harvestDate: '2 days ago',
      image: 'https://images.unsplash.com/photo-1690293319115-7c444db81c7d?w=400&h=400&fit=crop',
      badges: ['Organic', 'Fresh'],
      description: 'Fresh organic tomatoes directly from farm. No pesticides used.',
      isMine: userRole === 'farmer' && Math.random() > 0.5,
      trending: true,
      demandLevel: 'High',
      viewsLast24h: 234,
      interestedBuyers: 15
    },
    {
      id: 2,
      name: 'Premium Wheat',
      farmer: 'Sunita Devi',
      location: 'Punjab',
      price: 28,
      rating: 4.9,
      reviews: 18,
      category: 'grains',
      quantity: '1000 kg',
      harvestDate: '1 week ago',
      image: 'https://images.unsplash.com/photo-1683248892987-7b6181dfd718?w=400&h=400&fit=crop',
      badges: ['Premium', 'Certified'],
      description: 'High quality wheat grains, perfect for flour making.',
      isMine: userRole === 'farmer' && Math.random() > 0.5,
      trending: false,
      demandLevel: 'Medium',
      viewsLast24h: 156,
      interestedBuyers: 8
    },
    {
      id: 3,
      name: 'Fresh Red Onions',
      farmer: 'Vikram Singh',
      location: 'Haryana',
      price: 35,
      originalPrice: 40,
      rating: 4.7,
      reviews: 31,
      category: 'vegetables',
      quantity: '750 kg',
      harvestDate: '3 days ago',
      image: 'https://images.unsplash.com/photo-1690293319115-7c444db81c7d?w=400&h=400&fit=crop',
      badges: ['Fresh', 'Local'],
      description: 'Fresh red onions with long shelf life.',
      isMine: userRole === 'farmer' && Math.random() > 0.5,
      trending: true,
      demandLevel: 'High',
      viewsLast24h: 198,
      interestedBuyers: 12
    },
  ];

  const mycrops = marketplaceItems.filter(item => item.isMine);

  const ProductCard = ({ item, isListView = false }) => (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: isListView ? 1.01 : 1.02, y: -2 }}
      className="group cursor-pointer"
    >
      <Card className={`overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 bg-white ${isListView ? 'flex' : ''}`}>
        <div className={`relative ${isListView ? 'w-48' : ''} overflow-hidden`}>
          <ImageWithFallback
            src={item.image}
            alt={item.name}
            className={`object-cover ${isListView ? 'w-full h-32' : 'w-full h-48'} transition-transform duration-300 group-hover:scale-110`}
          />
          {/* Availability Badge */}
          <Badge className="absolute top-2 left-2 bg-blue-600 text-white text-xs font-semibold shadow-lg">
            {item.quantity} Available
          </Badge>
          
          {/* Trending Badge */}
          {item.trending && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="absolute top-2 right-2"
            >
              <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-bold flex items-center gap-1 shadow-lg">
                <TrendingUp className="w-3 h-3" />
                Trending
              </Badge>
            </motion.div>
          )}

          {/* Quick Action Buttons - Show on Hover */}
          <motion.div 
            className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2"
          >
            <Button 
              size="sm" 
              onClick={() => setQuickViewItem(item)}
              className="bg-white text-gray-900 hover:bg-gray-100 shadow-lg"
            >
              <Eye className="w-4 h-4 mr-1" />
              Quick View
            </Button>
            <Button 
              size="sm" 
              onClick={() => setWishlist(prev => prev.includes(item.id) ? prev.filter(id => id !== item.id) : [...prev, item.id])}
              variant="secondary"
              className="bg-white hover:bg-gray-100 shadow-lg"
            >
              <Heart className={`w-4 h-4 ${wishlist.includes(item.id) ? 'fill-red-500 text-red-500' : ''}`} />
            </Button>
          </motion.div>

          {item.isMine && (
            <div className="absolute top-2 right-2 flex space-x-1">
              <Button size="sm" variant="secondary" className="w-7 h-7 p-0 bg-white/90 hover:bg-white">
                <Edit className="w-3 h-3" />
              </Button>
              <Button size="sm" variant="secondary" className="w-7 h-7 p-0 bg-white/90 hover:bg-white">
                <Trash2 className="w-3 h-3" />
              </Button>
            </div>
          )}
        </div>

        <div className={`p-4 ${isListView ? 'flex-1' : ''} space-y-3`}>
          {/* Product Name and Badges */}
          <div>
            <div className="flex items-start justify-between mb-2">
              <h3 className="font-bold text-lg text-gray-900">{item.name}</h3>
              {/* Live Demand Indicator */}
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Badge className={`${
                  item.demandLevel === 'High' ? 'bg-red-100 text-red-700' :
                  item.demandLevel === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-green-100 text-green-700'
                } text-xs font-semibold`}>
                  🔥 {item.demandLevel} Demand
                </Badge>
              </motion.div>
            </div>
            
            {/* Farmer Info */}
            <div className="flex items-center text-sm text-gray-600 mb-2">
              <MapPin className="w-3 h-3 mr-1" />
              <span className="font-medium">{item.farmer}</span>
              <span className="mx-2">•</span>
              <span>{item.location}</span>
            </div>

            {/* Rating and Reviews */}
            <div className="flex items-center gap-2 mb-2">
              <div className="flex items-center">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
                <span className="text-sm font-semibold text-gray-900">{item.rating}</span>
              </div>
              <span className="text-sm text-gray-500">({item.reviews} reviews)</span>
              <Clock className="w-3 h-3 text-gray-400 ml-2" />
              <span className="text-xs text-gray-500">{item.harvestDate}</span>
            </div>
          </div>

          {/* Description */}
          <p className="text-sm text-gray-700 leading-relaxed">{item.description}</p>

          {/* Live Activity Stats - For Buyers */}
          {userRole === 'buyer' && (
            <div className="flex items-center gap-4 p-2 bg-blue-50 rounded-lg">
              <div className="flex items-center text-xs text-gray-700">
                <Eye className="w-3 h-3 mr-1 text-blue-600" />
                <span className="font-semibold">{item.viewsLast24h}</span>
                <span className="ml-1">views today</span>
              </div>
              <div className="flex items-center text-xs text-gray-700">
                <Users className="w-3 h-3 mr-1 text-green-600" />
                <span className="font-semibold text-green-700">{item.interestedBuyers}</span>
                <span className="ml-1">buyers interested</span>
              </div>
            </div>
          )}

          {/* Price Section */}
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-lg font-bold text-green-600">₹{item.price}</span>
                {item.originalPrice && (
                  <span className="text-sm text-gray-400 line-through">₹{item.originalPrice}</span>
                )}
                <span className="text-sm text-gray-500">{t('perKg')}</span>
              </div>
              {/* Market Price Info for Farmers */}
              {userRole === 'farmer' && (
                <div className="flex items-center space-x-2 mt-1">
                  <span className="text-xs text-gray-600">Market Price: ₹{item.price + 3}</span>
                  <Badge className="text-xs bg-green-100 text-green-700 border-green-200">
                    Good to sell
                  </Badge>
                </div>
              )}
            </div>

            {/* Profit Margin for own crops */}
            {item.isMine && userRole === 'farmer' && (
              <Badge className="bg-green-100 text-green-700 text-xs">
                +15% Profit Margin
              </Badge>
            )}
          </div>

          {/* Views and Buyers Info for own crops */}
          {item.isMine && userRole === 'farmer' && (
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <div className="flex items-center">
                <Eye className="w-4 h-4 mr-1" />
                <span>Views: 234 • 1K</span>
              </div>
              <span className="text-green-600">12 interested buyers</span>
            </div>
          )}

          {/* Action Buttons */}
          <div className="pt-2 space-y-2">
            {!item.isMine && userRole === 'buyer' && (
              <>
                <div className="flex space-x-2">
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="flex-1 hover:bg-gray-50 border-gray-300"
                  >
                    <ShoppingCart className="w-4 h-4 mr-1" />
                    {t('addToCart')}
                  </Button>
                  <Button 
                    size="sm" 
                    className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-md"
                  >
                    {t('buyNow')}
                  </Button>
                </div>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setCompareList(prev => prev.includes(item.id) ? prev.filter(id => id !== item.id) : [...prev, item.id])}
                  className={`w-full text-xs ${compareList.includes(item.id) ? 'bg-blue-50 text-blue-700' : 'text-gray-600'}`}
                >
                  {compareList.includes(item.id) ? '✓ Added to Compare' : '+ Add to Compare'}
                </Button>
              </>
            )}

            {userRole === 'farmer' && !item.isMine && (
              <Button
                size="sm"
                className="w-full bg-gradient-to-r from-blue-500 to-teal-500"
                onClick={() => {
                  setContactType('buyer');
                  setContactModalOpen(true);
                }}
              >
                {t('contactBuyer')}
              </Button>
            )}

            {item.isMine && userRole === 'farmer' && (
              <div className="flex space-x-2">
                <Button size="sm" variant="outline" className="flex-1">
                  <Eye className="w-4 h-4 mr-1" />
                  {t('viewBuyers')}
                </Button>
                <Button
                  size="sm"
                  className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500"
                  onClick={() => {
                    setContactType('buyer');
                    setContactModalOpen(true);
                  }}
                >
                  Contact Buyer
                </Button>
              </div>
            )}
          </div>
        </div>
      </Card>
    </motion.div>
  );

  const ContactModal = () => (
    <Dialog open={contactModalOpen} onOpenChange={setContactModalOpen}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <Phone className="w-6 h-6 mr-2 text-blue-600" />
            {contactType === 'buyer' ? 'Contact Buyers & Retailers' : 'Contact Government Procurement Agencies'}
          </DialogTitle>
          <DialogDescription>
            {contactType === 'buyer'
              ? 'Connect with verified buyers and retailers interested in purchasing your crops.'
              : 'Get in touch with government procurement agencies for selling your produce at MSP rates.'}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {contactType === 'buyer' ? (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="p-4 hover:shadow-lg transition-shadow">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <Users className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold">AgriMart Retailers</h4>
                      <p className="text-sm text-gray-600">Bulk vegetable buyers</p>
                    </div>
                  </div>
                  <Separator className="my-3" />
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center">
                      <Phone className="w-4 h-4 mr-2 text-gray-500" />
                      <span>+91 98765 43210</span>
                    </div>
                    <div className="flex items-center">
                      <Mail className="w-4 h-4 mr-2 text-gray-500" />
                      <span>procurement@agrimart.com</span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-2 text-gray-500" />
                      <span>Mumbai, Maharashtra</span>
                    </div>
                  </div>
                  <Button className="w-full mt-3 bg-blue-600 hover:bg-blue-700">
                    Contact Now
                  </Button>
                </Card>

                <Card className="p-4 hover:shadow-lg transition-shadow">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                      <ShoppingCart className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold">FreshDirect Buyers</h4>
                      <p className="text-sm text-gray-600">Direct-to-consumer platform</p>
                    </div>
                  </div>
                  <Separator className="my-3" />
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center">
                      <Phone className="w-4 h-4 mr-2 text-gray-500" />
                      <span>+91 87654 32109</span>
                    </div>
                    <div className="flex items-center">
                      <Mail className="w-4 h-4 mr-2 text-gray-500" />
                      <span>farmers@freshdirect.in</span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-2 text-gray-500" />
                      <span>Delhi NCR</span>
                    </div>
                  </div>
                  <Button className="w-full mt-3 bg-green-600 hover:bg-green-700">
                    Contact Now
                  </Button>
                </Card>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
                <Card className="p-4 hover:shadow-lg transition-shadow">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                      <Globe className="w-6 h-6 text-orange-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold">Food Corporation of India (FCI)</h4>
                      <p className="text-sm text-gray-600">Government procurement agency</p>
                    </div>
                  </div>
                  <Separator className="my-3" />
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center">
                      <Phone className="w-4 h-4 mr-2 text-gray-500" />
                      <span>1800-180-1551 (Toll Free)</span>
                    </div>
                    <div className="flex items-center">
                      <Mail className="w-4 h-4 mr-2 text-gray-500" />
                      <span>procurement@fci.gov.in</span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-2 text-gray-500" />
                      <span>Regional Offices Available</span>
                    </div>
                  </div>
                  <Button className="w-full mt-3 bg-orange-600 hover:bg-orange-700">
                    Contact Regional Office
                  </Button>
                </Card>

                <Card className="p-4 hover:shadow-lg transition-shadow">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                      <UserCheck className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold">National Agricultural Marketing</h4>
                      <p className="text-sm text-gray-600">NAM e-platform for farmers</p>
                    </div>
                  </div>
                  <Separator className="my-3" />
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center">
                      <Phone className="w-4 h-4 mr-2 text-gray-500" />
                      <span>1800-270-0224</span>
                    </div>
                    <div className="flex items-center">
                      <Mail className="w-4 h-4 mr-2 text-gray-500" />
                      <span>support@enam.gov.in</span>
                    </div>
                    <div className="flex items-center">
                      <Globe className="w-4 h-4 mr-2 text-gray-500" />
                      <span>www.enam.gov.in</span>
                    </div>
                  </div>
                  <Button className="w-full mt-3 bg-purple-600 hover:bg-purple-700">
                    Visit e-NAM Portal
                  </Button>
                </Card>
              </div>
            </div>
          )}

          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-medium text-blue-700 mb-2">💡 Selling Tips</h4>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Ensure your crops meet quality standards</li>
              <li>• Have proper documentation and certificates ready</li>
              <li>• Negotiate fair prices based on market rates</li>
              <li>• Consider transportation and logistics costs</li>
            </ul>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );

  const UploadCropModal = () => (
    <Dialog open={isUploadOpen} onOpenChange={setIsUploadOpen}>
      <DialogContent className="max-w-3xl max-h-[95vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <Upload className="w-6 h-6 mr-2 text-green-600" />
            {t('uploadCrop')}
          </DialogTitle>
          <DialogDescription>
            Upload your crop details to connect with potential buyers and get the best market prices.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Recommended Price Section */}
          <Card className="bg-green-50 border-green-200">
            <CardContent className="p-4">
              <h4 className="font-medium text-green-700 mb-2">{t('recommendedPrice')}</h4>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">{t('avgMarketPrice')}: </span>
                  <span className="font-medium">₹42/kg</span>
                </div>
                <div>
                  <span className="text-gray-600">{t('demandLevel')}: </span>
                  <span className="font-medium text-green-600">{t('high')}</span>
                </div>
                <div>
                  <span className="text-gray-600">Suggested: </span>
                  <span className="font-medium text-green-700">₹45-48/kg</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="cropName">{t('cropName')}</Label>
              <Input id="cropName" placeholder="e.g., Organic Tomatoes" />
            </div>
            <div>
              <Label htmlFor="category">{t('category')}</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.slice(1).map(cat => (
                    <SelectItem key={cat.id} value={cat.id}>{cat.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="description">{t('description')}</Label>
            <Textarea
              id="description"
              placeholder="Describe your crop quality, farming methods, organic certification, etc."
              rows={3}
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <Label htmlFor="price">{t('price')}</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">₹</span>
                <Input id="price" type="number" placeholder="45" className="pl-8" />
              </div>
              <p className="text-xs text-gray-500 mt-1">Per kg</p>
            </div>
            <div>
              <Label htmlFor="quantity">{t('quantity')}</Label>
              <Input id="quantity" type="number" placeholder="500" />
              <p className="text-xs text-gray-500 mt-1">in kg</p>
            </div>
            <div>
              <Label htmlFor="harvestDate">Harvest Date</Label>
              <Input id="harvestDate" type="date" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="location">Farm Location</Label>
              <Input id="location" placeholder="Village, District, State" />
            </div>
            <div>
              <Label htmlFor="delivery">Delivery Options</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select delivery option" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pickup">Farm Pickup</SelectItem>
                  <SelectItem value="local">Local Delivery (50km)</SelectItem>
                  <SelectItem value="regional">Regional Delivery</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label>Quality Certifications</Label>
            <div className="flex flex-wrap gap-2 mt-2">
              {['Organic', 'Pesticide-Free', 'Non-GMO', 'Fresh', 'Premium'].map(cert => (
                <Badge
                  key={cert}
                  variant="outline"
                  className="cursor-pointer hover:bg-green-50 hover:border-green-300"
                >
                  {cert}
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <Label>{t('uploadImages')}</Label>
            <div className="mt-2 border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-green-400 transition-colors cursor-pointer">
              <Camera className="w-12 h-12 mx-auto text-gray-400 mb-4" />
              <p className="text-gray-600 mb-2">Click to upload or drag and drop</p>
              <p className="text-sm text-gray-500">PNG, JPG, GIF up to 10MB • Max 5 images</p>
              <Button variant="outline" size="sm" className="mt-3">
                Browse Files
              </Button>
            </div>
          </div>

          {/* Price Preview */}
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-4">
              <h4 className="font-medium text-blue-700 mb-2">Price Breakdown</h4>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span>Your Price (per kg):</span>
                  <span className="font-medium">₹45</span>
                </div>
                <div className="flex justify-between">
                  <span>Platform Fee (2%):</span>
                  <span>₹0.90</span>
                </div>
                <div className="flex justify-between">
                  <span>Payment Gateway (1.5%):</span>
                  <span>₹0.68</span>
                </div>
                <Separator className="my-2" />
                <div className="flex justify-between font-medium">
                  <span>You'll receive:</span>
                  <span className="text-green-600">₹43.42 per kg</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end space-x-3">
            <Button variant="outline" onClick={() => setIsUploadOpen(false)}>
              {t('cancel')}
            </Button>
            <Button className="bg-gradient-to-r from-green-500 to-emerald-500">
              <Upload className="w-4 h-4 mr-2" />
              {t('listCrop')}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100 p-4 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col lg:flex-row items-center justify-between space-y-4 lg:space-y-0"
        >
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 flex items-center">
              <ShoppingCart className="w-9 h-9 mr-3 text-blue-600" />
              {t('marketplace')}
            </h1>
            <p className="text-gray-600 mt-2 text-sm lg:text-base">
              {userRole === 'farmer'
                ? 'Sell your crops to buyers, retailers, and government procurement agencies'
                : 'Find fresh produce directly from farmers across India'
              }
            </p>
          </div>

          {userRole === 'farmer' && (
            <div className="flex space-x-3">
              <Button
                onClick={() => setIsUploadOpen(true)}
                className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white shadow-lg"
              >
                <Plus className="w-4 h-4 mr-2" />
                {t('uploadCrop')}
              </Button>
            </div>
          )}
        </motion.div>

        {/* Price Analysis for Farmers */}
        {userRole === 'farmer' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center text-green-700">
                    <TrendingUp className="w-5 h-5 mr-2" />
                    {t('priceAnalysis')}
                  </CardTitle>
                  <div className="flex items-center gap-3">
                    <select
                      value={selectedCrop}
                      onChange={(e) => setSelectedCrop(e.target.value)}
                      className="bg-white border border-green-300 text-green-700 font-semibold px-3 py-1.5 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500/30 cursor-pointer"
                    >
                      <option value="tomatoes">Tomatoes</option>
                      <option value="onions">Onions</option>
                      <option value="potatoes">Potatoes</option>
                      <option value="wheat">Wheat</option>
                      <option value="rice">Rice</option>
                      <option value="corn">Corn</option>
                      <option value="green-chillies">Green Chillies</option>
                      <option value="cabbage">Cabbage</option>
                      <option value="cauliflower">Cauliflower</option>
                      <option value="carrots">Carrots</option>
                    </select>
                    <span className="text-xs text-gray-500">Updated {lastUpdated.toLocaleTimeString()}</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <motion.div 
                    key={priceData.avgPrice}
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-center p-4 bg-white rounded-lg shadow-sm"
                  >
                    <div className="text-2xl font-bold text-green-600">{priceData.avgPrice}</div>
                    <div className="text-sm text-gray-600">{t('avgMarketPrice')}</div>
                    <div className="text-xs text-gray-500 capitalize">{selectedCrop.replace('-', ' ')}</div>
                  </motion.div>
                  <motion.div 
                    key={priceData.minPrice}
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="text-center p-4 bg-white rounded-lg shadow-sm"
                  >
                    <div className="text-2xl font-bold text-blue-600">{priceData.minPrice}</div>
                    <div className="text-sm text-gray-600">{t('minPrice')}</div>
                    <div className="text-xs text-gray-500">Today</div>
                  </motion.div>
                  <motion.div 
                    key={priceData.demandLevel}
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-center p-4 bg-white rounded-lg shadow-sm"
                  >
                    <div className="text-2xl font-bold text-orange-600">{priceData.demandLevel}</div>
                    <div className="text-sm text-gray-600">{t('demandLevel')}</div>
                    <div className="text-xs text-gray-500">{priceData.trendPositive ? '⬆️' : '⬇️'} {priceData.trend}</div>
                  </motion.div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="p-4 bg-white/90 backdrop-blur-sm border border-gray-200 shadow-sm">
            <div className="flex flex-col lg:flex-row items-center space-y-3 lg:space-y-0 lg:space-x-4">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 z-10" />
                <Input
                  placeholder={t('searchPlaceholder')}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 h-9 border-gray-300 focus:border-green-500 focus:ring-green-500"
                />
              </div>

              <div className="flex items-center space-x-3 flex-wrap gap-y-3">
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-36 h-9 border-gray-300">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(cat => (
                      <SelectItem key={cat.id} value={cat.id}>{cat.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                  <SelectTrigger className="w-36 h-9 border-gray-300">
                    <SelectValue placeholder={t('location')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{t('allLocations')}</SelectItem>
                    <SelectItem value="maharashtra">Maharashtra</SelectItem>
                    <SelectItem value="punjab">Punjab</SelectItem>
                    <SelectItem value="haryana">Haryana</SelectItem>
                    <SelectItem value="up">Uttar Pradesh</SelectItem>
                    <SelectItem value="mp">Madhya Pradesh</SelectItem>
                  </SelectContent>
                </Select>

                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm" className="h-9">
                      <Filter className="w-4 h-4 mr-2" />
                      {t('priceRange')}
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-md">
                    <DialogHeader>
                      <DialogTitle>Filter by Price Range</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-6 py-4">
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-sm font-medium">₹{priceRange[0]}</span>
                          <span className="text-sm text-gray-500">to</span>
                          <span className="text-sm font-medium">₹{priceRange[1]}</span>
                          <span className="text-xs text-gray-500">per kg</span>
                        </div>
                        <Slider
                          value={priceRange}
                          onValueChange={setPriceRange}
                          max={100}
                          min={0}
                          step={1}
                          className="w-full"
                        />
                      </div>
                      <div className="flex justify-end space-x-2">
                        <Button variant="outline" onClick={() => setPriceRange([0, 100])}>Reset</Button>
                        <Button>Apply Filter</Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>

                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-44 h-9 border-gray-300">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="latest">{t('latest')}</SelectItem>
                    <SelectItem value="price-asc">{t('priceAsc')}</SelectItem>
                    <SelectItem value="price-desc">{t('priceDesc')}</SelectItem>
                    <SelectItem value="rating">{t('rating')}</SelectItem>
                    <SelectItem value="demand">High Demand</SelectItem>
                  </SelectContent>
                </Select>

                <div className="flex border border-gray-300 rounded-md">
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('grid')}
                    className="rounded-r-none h-9"
                  >
                    <Grid className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('list')}
                    className="rounded-l-none h-9"
                  >
                    <List className="w-4 h-4" />
                  </Button>
                </div>

                {compareList.length > 0 && (
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm" className="h-9 bg-blue-50 border-blue-300 text-blue-700 hover:bg-blue-100">
                        <Layers className="w-4 h-4 mr-2" />
                        {t('comparing')} ({compareList.length})
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
                      <DialogHeader>
                        <div className="flex items-center justify-between">
                          <DialogTitle className="flex items-center">
                            <Layers className="w-5 h-5 mr-2 text-blue-600" />
                            {t('compareProducts')}
                          </DialogTitle>
                          <Button variant="ghost" size="sm" onClick={() => setCompareList([])}>
                            {t('clearComparison')}
                          </Button>
                        </div>
                      </DialogHeader>
                      <ComparisonTable items={marketplaceItems.filter(item => compareList.includes(item.id))} />
                    </DialogContent>
                  </Dialog>
                )}
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Content */}
        {userRole === 'farmer' ? (
          <Tabs defaultValue="marketplace" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="marketplace">{t('marketplace')}</TabsTrigger>
              <TabsTrigger value="mycrops" className="relative">
                {t('myCrops')}
                {mycrops.length > 0 && (
                  <Badge className="ml-2 w-5 h-5 p-0 bg-green-500">{mycrops.length}</Badge>
                )}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="marketplace" className="mt-6">
              <div className={viewMode === 'grid'
                ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
                : 'space-y-4'
              }>
                {marketplaceItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <ProductCard item={item} isListView={viewMode === 'list'} />
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="mycrops" className="mt-6">
              <div className={viewMode === 'grid'
                ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
                : 'space-y-4'
              }>
                {mycrops.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <ProductCard item={item} isListView={viewMode === 'list'} />
                  </motion.div>
                ))}
              </div>

              {mycrops.length === 0 && (
                <div className="text-center py-12">
                  <Package className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                  <h3 className="text-xl font-semibold text-gray-600 mb-2">No crops uploaded yet</h3>
                  <p className="text-gray-500 mb-4">Start selling by uploading your first crop</p>
                  <Button
                    onClick={() => setIsUploadOpen(true)}
                    className="bg-gradient-to-r from-green-500 to-emerald-500"
                  >
                    {t('uploadCrop')}
                  </Button>
                </div>
              )}
            </TabsContent>
          </Tabs>
        ) : (
          <div className={viewMode === 'grid'
            ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
            : 'space-y-4'
          }>
            {marketplaceItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <ProductCard item={item} isListView={viewMode === 'list'} />
              </motion.div>
            ))}
          </div>
        )}

        <UploadCropModal />
        <ContactModal />
        <QuickViewModal />
        <BulkOrderModal />
      </div>
    </div>
  );

  function ComparisonTable({ items }) {
    if (items.length === 0) {
      return (
        <div className="text-center py-8 text-gray-500">
          <Layers className="w-12 h-12 mx-auto mb-3 text-gray-300" />
          <p>No products selected for comparison</p>
        </div>
      );
    }

    return (
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-50">
              <th className="text-left p-3 font-semibold border-b">Feature</th>
              {items.map(item => (
                <th key={item.id} className="text-left p-3 border-b min-w-[200px]">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold">{item.name}</span>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => setCompareList(prev => prev.filter(id => id !== item.id))}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-3 font-medium border-b bg-gray-50">Image</td>
              {items.map(item => (
                <td key={item.id} className="p-3 border-b">
                  <img src={item.image} alt={item.name} className="w-full h-32 object-cover rounded" />
                </td>
              ))}
            </tr>
            <tr>
              <td className="p-3 font-medium border-b bg-gray-50">Price</td>
              {items.map(item => (
                <td key={item.id} className="p-3 border-b">
                  <span className="text-lg font-bold text-green-600">₹{item.price}/kg</span>
                  {item.originalPrice && (
                    <span className="block text-sm text-gray-400 line-through">₹{item.originalPrice}</span>
                  )}
                </td>
              ))}
            </tr>
            <tr>
              <td className="p-3 font-medium border-b bg-gray-50">Rating</td>
              {items.map(item => (
                <td key={item.id} className="p-3 border-b">
                  <div className="flex items-center">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
                    <span className="font-semibold">{item.rating}</span>
                    <span className="text-sm text-gray-500 ml-1">({item.reviews})</span>
                  </div>
                </td>
              ))}
            </tr>
            <tr>
              <td className="p-3 font-medium border-b bg-gray-50">Farmer</td>
              {items.map(item => (
                <td key={item.id} className="p-3 border-b">{item.farmer}</td>
              ))}
            </tr>
            <tr>
              <td className="p-3 font-medium border-b bg-gray-50">Location</td>
              {items.map(item => (
                <td key={item.id} className="p-3 border-b">{item.location}</td>
              ))}
            </tr>
            <tr>
              <td className="p-3 font-medium border-b bg-gray-50">Available Quantity</td>
              {items.map(item => (
                <td key={item.id} className="p-3 border-b">{item.quantity}</td>
              ))}
            </tr>
            <tr>
              <td className="p-3 font-medium border-b bg-gray-50">Demand Level</td>
              {items.map(item => (
                <td key={item.id} className="p-3 border-b">
                  <Badge className={`${
                    item.demandLevel === 'High' ? 'bg-red-100 text-red-700' :
                    item.demandLevel === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-green-100 text-green-700'
                  }`}>
                    {item.demandLevel}
                  </Badge>
                </td>
              ))}
            </tr>
            <tr>
              <td className="p-3 font-medium border-b bg-gray-50">Harvest Date</td>
              {items.map(item => (
                <td key={item.id} className="p-3 border-b">{item.harvestDate}</td>
              ))}
            </tr>
            <tr>
              <td className="p-3 font-medium border-b bg-gray-50">Badges</td>
              {items.map(item => (
                <td key={item.id} className="p-3 border-b">
                  <div className="flex flex-wrap gap-1">
                    {item.badges.map(badge => (
                      <Badge key={badge} variant="outline" className="text-xs">{badge}</Badge>
                    ))}
                  </div>
                </td>
              ))}
            </tr>
            <tr>
              <td className="p-3 font-medium border-b bg-gray-50">Action</td>
              {items.map(item => (
                <td key={item.id} className="p-3 border-b">
                  <Button className="w-full bg-green-600 hover:bg-green-700">
                    {t('buyNow')}
                  </Button>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    );
  }

  function QuickViewModal() {
    if (!quickViewItem) return null;

    const regionalPrices = [
      { region: 'Maharashtra', price: quickViewItem.price, trend: '+3%' },
      { region: 'Punjab', price: quickViewItem.price - 2, trend: '+1%' },
      { region: 'Delhi NCR', price: quickViewItem.price + 3, trend: '+5%' },
      { region: 'Gujarat', price: quickViewItem.price - 1, trend: '+2%' },
    ];

    return (
      <Dialog open={!!quickViewItem} onOpenChange={() => setQuickViewItem(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl flex items-center gap-2">
              <Zap className="w-6 h-6 text-yellow-500" />
              {quickViewItem.name}
            </DialogTitle>
          </DialogHeader>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <img
                src={quickViewItem.image}
                alt={quickViewItem.name}
                className="w-full h-64 object-cover rounded-lg shadow-md mb-4"
              />
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-3xl font-bold text-green-600">₹{quickViewItem.price}</div>
                    <div className="text-sm text-gray-500">per kg</div>
                  </div>
                  {quickViewItem.originalPrice && (
                    <Badge className="bg-red-100 text-red-700">
                      Save ₹{quickViewItem.originalPrice - quickViewItem.price}
                    </Badge>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  <span className="text-lg font-semibold">{quickViewItem.rating}</span>
                  <span className="text-gray-500">({quickViewItem.reviews} reviews)</span>
                </div>

                <Separator />

                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-gray-500" />
                    <span className="font-medium">{quickViewItem.farmer}</span>
                    <span className="text-gray-500">• {quickViewItem.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Package className="w-4 h-4 text-gray-500" />
                    <span>{quickViewItem.quantity} available</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-gray-500" />
                    <span>Harvested {quickViewItem.harvestDate}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-gray-500" />
                    <Badge className={`${
                      quickViewItem.demandLevel === 'High' ? 'bg-red-100 text-red-700' :
                      'bg-yellow-100 text-yellow-700'
                    }`}>
                      {quickViewItem.demandLevel} Demand
                    </Badge>
                  </div>
                </div>

                <Separator />

                <div className="flex flex-wrap gap-2">
                  {quickViewItem.badges.map(badge => (
                    <Badge key={badge} variant="outline" className="bg-green-50 border-green-300 text-green-700">
                      <CheckCircle2 className="w-3 h-3 mr-1" />
                      {badge}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <Card className="bg-blue-50 border-blue-200">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <ArrowUpDown className="w-5 h-5 text-blue-600" />
                    {t('priceComparison')}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="p-3 bg-white rounded-lg">
                      <div className="text-gray-600 mb-1">{t('yourPrice')}</div>
                      <div className="text-xl font-bold text-green-600">₹{quickViewItem.price}</div>
                    </div>
                    <div className="p-3 bg-white rounded-lg">
                      <div className="text-gray-600 mb-1">{t('marketAvg')}</div>
                      <div className="text-xl font-bold text-blue-600">₹{quickViewItem.price + 3}</div>
                    </div>
                  </div>
                  <div className="p-3 bg-green-100 rounded-lg text-center">
                    <div className="text-sm text-green-700 mb-1">{t('profitMargin')}</div>
                    <div className="text-2xl font-bold text-green-700">+12%</div>
                    <div className="text-xs text-green-600">Better than market average</div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-orange-600" />
                    {t('regionalPrices')}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {regionalPrices.map(region => (
                      <div key={region.region} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                        <span className="text-sm font-medium">{region.region}</span>
                        <div className="flex items-center gap-2">
                          <span className="font-bold">₹{region.price}</span>
                          <Badge variant="outline" className="text-xs">{region.trend}</Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-orange-50 border-orange-200">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Shield className="w-5 h-5 text-orange-600" />
                    Quality Assurance
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-600" />
                      <span>Verified Farmer</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-600" />
                      <span>Quality Checked</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-600" />
                      <span>Direct from Farm</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Award className="w-4 h-4 text-yellow-600" />
                      <span>Top Rated Seller</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="space-y-2">
                <Button className="w-full h-12 bg-green-600 hover:bg-green-700 text-lg font-semibold">
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  {t('buyNow')}
                </Button>
                <Button
                  variant="outline"
                  className="w-full h-12 border-blue-300 text-blue-700 hover:bg-blue-50"
                  onClick={() => {
                    setBulkOrderItem(quickViewItem);
                    setBulkOrderOpen(true);
                    setQuickViewItem(null);
                  }}
                >
                  <Truck className="w-5 h-5 mr-2" />
                  {t('bulkOrder')}
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  function BulkOrderModal() {
    return (
      <Dialog open={bulkOrderOpen} onOpenChange={setBulkOrderOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Truck className="w-6 h-6 text-blue-600" />
              {t('bulkOrder')} - {bulkOrderItem?.name}
            </DialogTitle>
            <DialogDescription>
              Request a bulk order with custom pricing and delivery terms. Minimum order: 100 kg
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="p-4">
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <div className="text-gray-600">Current Price</div>
                    <div className="text-xl font-bold text-blue-700">₹{bulkOrderItem?.price}/kg</div>
                  </div>
                  <div>
                    <div className="text-gray-600">Bulk Discount</div>
                    <div className="text-xl font-bold text-green-600">Up to 15%</div>
                  </div>
                  <div>
                    <div className="text-gray-600">{t('minOrder')}</div>
                    <div className="text-xl font-bold text-orange-600">100 kg</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-4">
              <div>
                <Label htmlFor="bulkQuantity">{t('quantityNeeded')} (kg)</Label>
                <Input
                  id="bulkQuantity"
                  type="number"
                  placeholder="e.g., 500"
                  min="100"
                />
                <p className="text-xs text-gray-500 mt-1">Minimum order: 100 kg</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="deliveryDate">{t('deliveryDate')}</Label>
                  <Input id="deliveryDate" type="date" />
                </div>
                <div>
                  <Label htmlFor="deliveryLocation">Delivery Location</Label>
                  <Input id="deliveryLocation" placeholder="City, State" />
                </div>
              </div>

              <div>
                <Label htmlFor="bulkNotes">{t('additionalNotes')}</Label>
                <Textarea
                  id="bulkNotes"
                  placeholder="Special requirements, quality specifications, payment terms, etc."
                  rows={3}
                />
              </div>

              <Card className="bg-green-50 border-green-200">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 text-sm text-green-700 mb-2">
                    <Shield className="w-4 h-4" />
                    <span className="font-semibold">Bulk Order Benefits</span>
                  </div>
                  <ul className="text-sm text-green-700 space-y-1">
                    <li>• Volume-based pricing discounts</li>
                    <li>• Flexible payment terms</li>
                    <li>• Priority delivery scheduling</li>
                    <li>• Direct farmer communication</li>
                    <li>• Quality assurance guarantee</li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            <div className="flex justify-end space-x-3">
              <Button variant="outline" onClick={() => setBulkOrderOpen(false)}>
                Cancel
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <CheckCircle2 className="w-4 h-4 mr-2" />
                {t('requestQuote')}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }
}