import React from 'react';
import { motion } from 'motion/react';
import {
  ShoppingCart, TrendingUp, Package, MapPin, Star,
  Clock, IndianRupee, Truck, CheckCircle, AlertCircle,
  Eye, Filter, Search, Heart
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { ImageWithFallback } from './figma/ImageWithFallback';

export default function BuyerDashboard({ user, language }) {
  const translations = {
    en: {
      welcome: 'Welcome back',
      freshProduce: 'Fresh Produce Available',
      totalOrders: 'Total Orders',
      pendingDeliveries: 'Pending Deliveries',
      totalSpent: 'Total Spent',
      featuredProducts: 'Featured Products',
      recentOrders: 'Recent Orders',
      topFarmers: 'Top Rated Farmers',
      searchPlaceholder: 'Search for fresh produce...',
      viewAll: 'View All',
      orderNow: 'Order Now',
      addToCart: 'Add to Cart',
      rating: 'Rating',
      perKg: 'per kg',
      organic: 'Organic',
      delivered: 'Delivered',
      pending: 'Pending',
      inTransit: 'In Transit',
      processing: 'Processing',
      orderTracking: 'Order Tracking',
      farmer: 'Farmer',
      location: 'Location',
      freshlyHarvested: 'Freshly Harvested',
      premium: 'Premium Quality',
      recommendations: 'Recommended for You',
    },
    hi: {
      welcome: 'वापसी पर स्वागत है',
      freshProduce: 'ताजी उपज उपलब्ध',
      totalOrders: 'कुल ऑर्डर',
      pendingDeliveries: 'लंबित डिलीवरी',
      totalSpent: 'कुल खर्च',
      featuredProducts: 'विशेष उत्पाद',
      recentOrders: 'हाल के ऑर्डर',
      topFarmers: 'शीर्ष रेटेड किसान',
      searchPlaceholder: 'ताजी उपज खोजें...',
      viewAll: 'सभी देखें',
      orderNow: 'अभी ऑर्डर करें',
      addToCart: 'कार्ट में डालें',
      rating: 'रेटिंग',
      perKg: 'प्रति किलो',
      organic: 'जैविक',
      delivered: 'डिलीवर हो गया',
      pending: 'लंबित',
      inTransit: 'रास्ते में',
      processing: 'प्रसंस्करण',
      orderTracking: 'ऑर्डर ट्रैकिंग',
      farmer: 'किसान',
      location: 'स्थान',
      freshlyHarvested: 'ताजा काटा गया',
      premium: 'प्रीमियम गुणवत्ता',
      recommendations: 'आपके लिए सुझाव',
    }
  };

  const t = (key) => translations[language][key] || translations.en[key] || key;

  const statsCards = [
    {
      title: t('totalOrders'),
      value: '24',
      change: '+3 this week',
      icon: ShoppingCart,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: t('pendingDeliveries'),
      value: '5',
      change: '2 arriving today',
      icon: Truck,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    },
    {
      title: t('totalSpent'),
      value: '₹12,450',
      change: 'This month',
      icon: IndianRupee,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
  ];

  const featuredProducts = [
    {
      id: 1,
      name: 'Organic Tomatoes',
      farmer: 'Ramesh Kumar',
      location: 'Maharashtra',
      price: 45,
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1690293319115-7c444db81c7d?w=300&h=300&fit=crop',
      badges: ['Organic', 'Fresh'],
      discount: 10
    },
    {
      id: 2,
      name: 'Fresh Wheat',
      farmer: 'Sunita Devi',
      location: 'Punjab',
      price: 28,
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1683248892987-7b6181dfd718?w=300&h=300&fit=crop',
      badges: ['Premium', 'Harvested'],
      discount: 0
    },
    {
      id: 3,
      name: 'Green Vegetables',
      farmer: 'Vikram Singh',
      location: 'Haryana',
      price: 35,
      rating: 4.7,
      image: 'https://images.unsplash.com/photo-1690293319115-7c444db81c7d?w=300&h=300&fit=crop',
      badges: ['Organic'],
      discount: 15
    },
  ];

  const recentOrders = [
    {
      id: '#ORD001',
      items: 'Tomatoes, Onions (5kg)',
      farmer: 'Ramesh Kumar',
      amount: 225,
      status: 'delivered',
      date: '2 days ago'
    },
    {
      id: '#ORD002',
      items: 'Wheat (10kg)',
      farmer: 'Sunita Devi',
      amount: 280,
      status: 'in-transit',
      date: '1 day ago'
    },
    {
      id: '#ORD003',
      items: 'Mixed Vegetables (3kg)',
      farmer: 'Vikram Singh',
      amount: 105,
      status: 'processing',
      date: 'Today'
    },
  ];

  const topFarmers = [
    {
      id: 1,
      name: 'Ramesh Kumar',
      location: 'Maharashtra',
      rating: 4.9,
      orders: 156,
      avatar: 'https://images.unsplash.com/photo-1618496899001-b58ebcbeef26?w=100&h=100&fit=crop&crop=face'
    },
    {
      id: 2,
      name: 'Sunita Devi',
      location: 'Punjab',
      rating: 4.8,
      orders: 142,
      avatar: 'https://images.unsplash.com/photo-1618496899001-b58ebcbeef26?w=100&h=100&fit=crop&crop=face'
    },
    {
      id: 3,
      name: 'Vikram Singh',
      location: 'Haryana',
      rating: 4.7,
      orders: 128,
      avatar: 'https://images.unsplash.com/photo-1618496899001-b58ebcbeef26?w=100&h=100&fit=crop&crop=face'
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'delivered':
        return 'text-green-600 bg-green-50';
      case 'in-transit':
        return 'text-blue-600 bg-blue-50';
      case 'processing':
        return 'text-orange-600 bg-orange-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'delivered':
        return t('delivered');
      case 'in-transit':
        return t('inTransit');
      case 'processing':
        return t('processing');
      default:
        return t('pending');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50 p-4 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600 p-8 text-white"
        >
          <div className="absolute inset-0 opacity-20">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1690293319115-7c444db81c7d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxmcmVzaCUyMHZlZ2V0YWJsZXMlMjBtYXJrZXQlMjBidXllcnxlbnwxfHx8fDE3NTc1NzU1MTF8MA&ixlib=rb-4.1.0&q=80&w=1080"
              alt="Fresh produce background"
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
                  {t('welcome')}, {user.name}!
                  <span className="ml-2">🛒</span>
                </h1>
                <p className="text-xl opacity-90 mt-1">{t('freshProduce')}</p>
              </div>
            </div>

            {/* Search Bar */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white/20 backdrop-blur-lg rounded-2xl p-4 min-w-[350px]"
            >
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/70" />
                <Input
                  placeholder={t('searchPlaceholder')}
                  className="pl-10 bg-white/20 border-white/30 text-white placeholder:text-white/70"
                />
                <Button size="sm" className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30">
                  <Filter className="w-4 h-4" />
                </Button>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {statsCards.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="p-6 bg-white/80 backdrop-blur-lg border-0 shadow-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    <p className="text-sm text-gray-500 mt-1">{stat.change}</p>
                  </div>
                  <div className={`p-3 rounded-full ${stat.bgColor}`}>
                    <stat.icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Featured Products */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="p-6 bg-white/80 backdrop-blur-lg border-0 shadow-xl">
            <CardHeader className="px-0 pt-0">
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center">
                  <Star className="w-6 h-6 mr-2 text-yellow-600" />
                  {t('featuredProducts')}
                </div>
                <Button variant="outline" size="sm">{t('viewAll')}</Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="px-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuredProducts.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="group cursor-pointer"
                  >
                    <Card className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                      <div className="relative">
                        <ImageWithFallback
                          src={product.image}
                          alt={product.name}
                          className="w-full h-48 object-cover"
                        />
                        {product.discount > 0 && (
                          <Badge className="absolute top-3 left-3 bg-red-500 text-white">
                            {product.discount}% OFF
                          </Badge>
                        )}
                        <Button
                          size="sm"
                          variant="secondary"
                          className="absolute top-3 right-3 w-8 h-8 p-0 bg-white/80 hover:bg-white/90"
                        >
                          <Heart className="w-4 h-4" />
                        </Button>
                      </div>
                      <div className="p-4">
                        <div className="flex flex-wrap gap-1 mb-2">
                          {product.badges.map((badge) => (
                            <Badge
                              key={badge}
                              variant="secondary"
                              className="text-xs bg-green-100 text-green-700"
                            >
                              {badge}
                            </Badge>
                          ))}
                        </div>
                        <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
                        <div className="text-sm text-gray-600 mb-3">
                          <p className="flex items-center">
                            <MapPin className="w-3 h-3 mr-1" />
                            {product.farmer}, {product.location}
                          </p>
                          <div className="flex items-center mt-1">
                            <Star className="w-3 h-3 mr-1 text-yellow-500 fill-current" />
                            <span>{product.rating}</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="text-2xl font-bold text-green-600">
                              ₹{product.price}
                            </span>
                            <span className="text-sm text-gray-500 ml-1">{t('perKg')}</span>
                          </div>
                          <Button size="sm" className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600">
                            {t('addToCart')}
                          </Button>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Recent Orders & Top Farmers */}
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
                    <Package className="w-6 h-6 mr-2 text-blue-600" />
                    {t('recentOrders')}
                  </div>
                  <Button variant="outline" size="sm">{t('viewAll')}</Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="px-0">
                <div className="space-y-4">
                  {recentOrders.map((order, index) => (
                    <motion.div
                      key={order.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 + index * 0.1 }}
                      className="p-4 bg-gray-50 rounded-lg"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">{order.id}</span>
                        <Badge className={getStatusColor(order.status)}>
                          {getStatusText(order.status)}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-1">{order.items}</p>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500">{order.farmer}</span>
                        <div className="flex items-center space-x-2">
                          <span className="font-semibold text-green-600">₹{order.amount}</span>
                          <span className="text-gray-400">•</span>
                          <span className="text-gray-500">{order.date}</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
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
                  <TrendingUp className="w-6 h-6 mr-2 text-yellow-600" />
                  {t('topFarmers')}
                </CardTitle>
              </CardHeader>
              <CardContent className="px-0">
                <div className="space-y-4">
                  {topFarmers.map((farmer, index) => (
                    <motion.div
                      key={farmer.id}
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 + index * 0.1 }}
                      className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                    >
                      <div className="w-12 h-12 rounded-full overflow-hidden">
                        <ImageWithFallback
                          src={farmer.avatar}
                          alt={farmer.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium">{farmer.name}</h4>
                        <p className="text-sm text-gray-600">{farmer.location}</p>
                        <div className="flex items-center mt-1">
                          <Star className="w-3 h-3 text-yellow-500 fill-current mr-1" />
                          <span className="text-sm">{farmer.rating}</span>
                          <span className="text-xs text-gray-400 ml-2">
                            {farmer.orders} orders
                          </span>
                        </div>
                      </div>
                      <Button size="sm" variant="outline">
                        <Eye className="w-4 h-4 mr-1" />
                        View
                      </Button>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}