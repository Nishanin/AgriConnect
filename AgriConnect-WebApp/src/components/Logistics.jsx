import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapContainer, TileLayer, Marker, Popup, Polyline, CircleMarker } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import '../styles/leaflet.css';
import { 
  MapPin, 
  Truck, 
  Package, 
  CheckCircle, 
  Clock, 
  Navigation as NavigationIcon,
  Phone,
  User,
  Calendar,
  TrendingUp,
  Activity,
  AlertCircle,
  ChevronRight,
  MapPinned,
  Route,
  Timer,
  Box
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

export default function Logistics({ user, language = 'en' }) {
  const [trackingView, setTrackingView] = useState('map');
  const [searchQuery, setSearchQuery] = useState('');

  // Translations
  const translations = {
    en: {
      logistics: "Logistics & Tracking",
      trackOrder: "Track Order",
      orderID: "Order ID",
      status: "Status",
      estimatedDelivery: "Estimated Delivery",
      currentLocation: "Current Location",
      driver: "Driver",
      contact: "Contact",
      viewMap: "View Map",
      timeline: "Timeline",
      activeShipments: "Active Shipments",
      delivered: "Delivered",
      inTransit: "In Transit",
      pending: "Pending",
      search: "Search by Order ID or Product",
      orderDetails: "Order Details",
      trackingNumber: "Tracking Number",
      carrier: "Carrier",
      origin: "Origin",
      destination: "Destination",
      distance: "Distance",
      estimatedTime: "Est. Time",
      contactDriver: "Contact Driver",
      viewRoute: "View Route",
      liveTracking: "Live Tracking",
      orderPlaced: "Order Placed",
      processing: "Processing",
      shipped: "Shipped",
      outForDelivery: "Out for Delivery",
      delivered: "Delivered"
    },
    hi: {
      logistics: "लॉजिस्टिक्स और ट्रैकिंग",
      trackOrder: "ऑर्डर ट्रैक करें",
      orderID: "ऑर्डर आईडी",
      status: "स्थिति",
      estimatedDelivery: "अनुमानित डिलीवरी",
      currentLocation: "वर्तमान स्थान",
      driver: "चालक",
      contact: "संपर्क",
      viewMap: "मानचित्र देखें",
      timeline: "समयरेखा",
      activeShipments: "सक्रिय शिपमेंट",
      delivered: "डिलीवर किया गया",
      inTransit: "यात्रा में",
      pending: "लंबित",
      search: "ऑर्डर आईडी या उत्पाद से खोजें",
      orderDetails: "ऑर्डर विवरण",
      trackingNumber: "ट्रैकिंग नंबर",
      carrier: "वाहक",
      origin: "उत्पत्ति",
      destination: "गंतव्य",
      distance: "दूरी",
      estimatedTime: "अनु. समय",
      contactDriver: "ड्राइवर से संपर्क करें",
      viewRoute: "मार्ग देखें",
      liveTracking: "लाइव ट्रैकिंग",
      orderPlaced: "ऑर्डर प्लेस किया गया",
      processing: "प्रोसेसिंग",
      shipped: "शिप किया गया",
      outForDelivery: "डिलीवरी के लिए निकला",
      delivered: "डिलीवर किया गया"
    }
  };

  const t = (key) => translations[language][key] || translations.en[key] || key;

  // Mock logistics data with coordinates for mapping
  const logisticsData = [
    {
      id: 'AG2025001',
      product: '🌾 Premium Basmati Rice',
      status: 'in-transit',
      trackingNumber: 'TRK789456123',
      carrier: 'AgriExpress Logistics',
      origin: { name: 'Amritsar, Punjab', lat: 31.6340, lng: 74.8723 },
      destination: { name: 'Delhi, NCR', lat: 28.7041, lng: 77.1025 },
      currentLocation: { name: 'Karnal, Haryana', lat: 29.6857, lng: 76.9905 },
      driver: {
        name: 'Rajesh Kumar',
        phone: '+91 98765 43210',
        rating: 4.8
      },
      estimatedDelivery: 'Dec 5, 2025, 2:00 PM',
      distance: '128 km',
      progress: 65,
      timeline: [
        { status: 'Order Placed', time: 'Dec 2, 10:30 AM', completed: true },
        { status: 'Processing', time: 'Dec 2, 2:15 PM', completed: true },
        { status: 'Shipped', time: 'Dec 3, 8:00 AM', completed: true },
        { status: 'Out for Delivery', time: 'Dec 4, 6:30 AM', completed: true, current: true },
        { status: 'Delivered', time: 'Expected: Dec 5, 2:00 PM', completed: false }
      ],
      route: [
        { lat: 31.6340, lng: 74.8723, name: 'Amritsar (Start)' },
        { lat: 30.9010, lng: 75.8573, name: 'Ludhiana' },
        { lat: 30.3398, lng: 76.3869, name: 'Chandigarh' },
        { lat: 29.6857, lng: 76.9905, name: 'Karnal (Current)' },
        { lat: 28.7041, lng: 77.1025, name: 'Delhi (Destination)' }
      ]
    },
    {
      id: 'AG2025002',
      product: '🥔 Fresh Potatoes',
      status: 'in-transit',
      trackingNumber: 'TRK789456124',
      carrier: 'FreshHaul Transport',
      origin: { name: 'Agra, UP', lat: 27.1767, lng: 78.0081 },
      destination: { name: 'Mumbai, MH', lat: 19.0760, lng: 72.8777 },
      currentLocation: { name: 'Vadodara, Gujarat', lat: 22.3072, lng: 73.1812 },
      driver: {
        name: 'Suresh Patil',
        phone: '+91 97654 32109',
        rating: 4.6
      },
      estimatedDelivery: 'Dec 6, 2025, 11:00 AM',
      distance: '456 km',
      progress: 48,
      timeline: [
        { status: 'Order Placed', time: 'Dec 1, 9:00 AM', completed: true },
        { status: 'Processing', time: 'Dec 1, 3:30 PM', completed: true },
        { status: 'Shipped', time: 'Dec 2, 7:00 AM', completed: true },
        { status: 'Out for Delivery', time: 'Dec 4, 5:00 AM', completed: true, current: true },
        { status: 'Delivered', time: 'Expected: Dec 6, 11:00 AM', completed: false }
      ],
      route: [
        { lat: 27.1767, lng: 78.0081, name: 'Agra (Start)' },
        { lat: 23.0225, lng: 72.5714, name: 'Ahmedabad' },
        { lat: 22.3072, lng: 73.1812, name: 'Vadodara (Current)' },
        { lat: 21.1702, lng: 72.8311, name: 'Surat' },
        { lat: 19.0760, lng: 72.8777, name: 'Mumbai (Destination)' }
      ]
    },
    {
      id: 'AG2025003',
      product: '🍅 Organic Tomatoes',
      status: 'pending',
      trackingNumber: 'TRK789456125',
      carrier: 'VeggieExpress',
      origin: { name: 'Nashik, MH', lat: 19.9975, lng: 73.7898 },
      destination: { name: 'Pune, MH', lat: 18.5204, lng: 73.8567 },
      currentLocation: { name: 'Nashik, MH', lat: 19.9975, lng: 73.7898 },
      driver: {
        name: 'Awaiting Assignment',
        phone: 'N/A',
        rating: 0
      },
      estimatedDelivery: 'Dec 7, 2025, 9:00 AM',
      distance: '210 km',
      progress: 0,
      timeline: [
        { status: 'Order Placed', time: 'Dec 4, 11:00 AM', completed: true, current: true },
        { status: 'Processing', time: 'Pending', completed: false },
        { status: 'Shipped', time: 'Pending', completed: false },
        { status: 'Out for Delivery', time: 'Pending', completed: false },
        { status: 'Delivered', time: 'Expected: Dec 7, 9:00 AM', completed: false }
      ],
      route: [
        { lat: 19.9975, lng: 73.7898, name: 'Nashik (Start)' },
        { lat: 18.5204, lng: 73.8567, name: 'Pune (Destination)' }
      ]
    }
  ];

  const stats = [
    { 
      label: t('activeShipments'), 
      value: '2', 
      icon: Truck, 
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600'
    },
    { 
      label: t('inTransit'), 
      value: '2', 
      icon: Route, 
      color: 'from-orange-500 to-amber-500',
      bgColor: 'bg-orange-50',
      textColor: 'text-orange-600'
    },
    { 
      label: t('delivered'), 
      value: '12', 
      icon: CheckCircle, 
      color: 'from-green-500 to-emerald-500',
      bgColor: 'bg-green-50',
      textColor: 'text-green-600'
    },
    { 
      label: t('pending'), 
      value: '1', 
      icon: Clock, 
      color: 'from-purple-500 to-pink-500',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-600'
    }
  ];

  const getStatusConfig = (status) => {
    const configs = {
      'pending': {
        label: t('pending'),
        color: 'bg-yellow-100 text-yellow-700 border-yellow-300',
        icon: Clock
      },
      'in-transit': {
        label: t('inTransit'),
        color: 'bg-blue-100 text-blue-700 border-blue-300',
        icon: Truck
      },
      'delivered': {
        label: t('delivered'),
        color: 'bg-green-100 text-green-700 border-green-300',
        icon: CheckCircle
      }
    };
    return configs[status] || configs.pending;
  };

  const filteredOrders = logisticsData.filter(order =>
    order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.product.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Set default selected order to the first in-transit order
  const [selectedOrder, setSelectedOrder] = useState(logisticsData[0]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50 pb-8">
      <div className="max-w-7xl mx-auto px-6 pt-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="border-2 shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <div className={`p-3 rounded-xl ${stat.bgColor}`}>
                      <stat.icon className={`h-6 w-6 ${stat.textColor}`} />
                    </div>
                    <div className={`text-3xl font-black bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                      {stat.value}
                    </div>
                  </div>
                  <p className="text-sm font-semibold text-gray-600">{stat.label}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Search Bar */}
        <Card className="mb-6 border-2 shadow-lg">
          <CardContent className="p-4">
            <Input
              placeholder={t('search')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-12 text-lg border-2"
            />
          </CardContent>
        </Card>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Orders List */}
          <div className="lg:col-span-1 space-y-4">
            <Card className="border-2 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-cyan-50 border-b-2">
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5 text-blue-600" />
                  {t('activeShipments')}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 space-y-3 max-h-[600px] overflow-y-auto">
                {filteredOrders.map((order) => (
                  <motion.div
                    key={order.id}
                    whileHover={{ scale: 1.02 }}
                    className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                      selectedOrder?.id === order.id
                        ? 'bg-gradient-to-r from-blue-50 to-cyan-50 border-blue-300 shadow-md'
                        : 'bg-white border-gray-200 hover:border-blue-200'
                    }`}
                    onClick={() => setSelectedOrder(order)}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="font-bold text-gray-900">{order.id}</p>
                        <p className="text-sm text-gray-600">{order.product}</p>
                      </div>
                      <Badge className={`${getStatusConfig(order.status).color} border gap-1.5`}>
                        {React.createElement(getStatusConfig(order.status).icon, { className: "h-3 w-3" })}
                        {getStatusConfig(order.status).label}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-600 mt-3">
                      <MapPin className="h-3 w-3" />
                      <span>{order.currentLocation.name}</span>
                    </div>
                    {order.status === 'in-transit' && (
                      <div className="mt-3">
                        <div className="flex items-center justify-between text-xs mb-1">
                          <span className="text-gray-600">Progress</span>
                          <span className="font-bold text-blue-600">{order.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full transition-all"
                            style={{ width: `${order.progress}%` }}
                          />
                        </div>
                      </div>
                    )}
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Map and Details */}
          <div className="lg:col-span-2 space-y-4">
            {selectedOrder ? (
              <>
                {/* Order Details - Compact Info Cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <Card className="border shadow-sm">
                    <CardContent className="p-3">
                      <p className="text-xs text-gray-500 mb-1">Tracking #</p>
                      <p className="font-bold text-sm font-mono truncate">{selectedOrder.trackingNumber}</p>
                    </CardContent>
                  </Card>
                  <Card className="border shadow-sm">
                    <CardContent className="p-3">
                      <p className="text-xs text-gray-500 mb-1">Carrier</p>
                      <p className="font-bold text-sm truncate">{selectedOrder.carrier}</p>
                    </CardContent>
                  </Card>
                  <Card className="border shadow-sm">
                    <CardContent className="p-3">
                      <p className="text-xs text-gray-500 mb-1">Distance</p>
                      <p className="font-bold text-sm">{selectedOrder.distance}</p>
                    </CardContent>
                  </Card>
                  <Card className="border shadow-sm">
                    <CardContent className="p-3">
                      <p className="text-xs text-gray-500 mb-1">ETA</p>
                      <p className="font-bold text-sm truncate">{selectedOrder.estimatedDelivery.split(',')[0]}</p>
                    </CardContent>
                  </Card>
                </div>

                {/* Map View */}
                <Card className="border-2 shadow-lg overflow-hidden">
                  <CardHeader className="bg-gradient-to-r from-blue-50 to-cyan-50 border-b-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center gap-2">
                        <MapPinned className="h-5 w-5 text-blue-600" />
                        {t('liveTracking')} - {selectedOrder.id}
                      </CardTitle>
                      <Tabs value={trackingView} onValueChange={setTrackingView}>
                        <TabsList>
                          <TabsTrigger value="map">{t('viewMap')}</TabsTrigger>
                          <TabsTrigger value="timeline">{t('timeline')}</TabsTrigger>
                        </TabsList>
                      </Tabs>
                    </div>
                  </CardHeader>
                  <CardContent className="p-0">
                    {trackingView === 'map' ? (
                      <div className="relative h-[500px] border-t-4 border-blue-500">
                        <MapContainer
                          center={[selectedOrder.currentLocation.lat, selectedOrder.currentLocation.lng]}
                          zoom={7}
                          style={{ height: '100%', width: '100%', zIndex: 1 }}
                          scrollWheelZoom={true}
                        >
                          <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                          />
                          
                          {/* Route line */}
                          <Polyline
                            positions={selectedOrder.route.map(point => [point.lat, point.lng])}
                            pathOptions={{
                              color: '#3B82F6',
                              weight: 4,
                              opacity: 0.7,
                              dashArray: '10, 10'
                            }}
                          />

                          {/* Route markers */}
                          {selectedOrder.route.map((point, idx) => {
                            const isCurrent = point.lat === selectedOrder.currentLocation.lat;
                            const isOrigin = idx === 0;
                            const isDestination = idx === selectedOrder.route.length - 1;
                            const isCompleted = idx < selectedOrder.route.findIndex(p => p.lat === selectedOrder.currentLocation.lat);

                            return (
                              <CircleMarker
                                key={idx}
                                center={[point.lat, point.lng]}
                                radius={isCurrent ? 12 : 8}
                                pathOptions={{
                                  color: 'white',
                                  fillColor: isCurrent ? '#10B981' : isOrigin ? '#F59E0B' : isDestination ? '#EF4444' : isCompleted ? '#3B82F6' : '#94A3B8',
                                  fillOpacity: 1,
                                  weight: 3
                                }}
                              >
                                <Popup>
                                  <div className="text-center">
                                    <div className="text-lg mb-1">
                                      {isOrigin ? '📦' : isDestination ? '🏁' : isCurrent ? '🚚' : '📍'}
                                    </div>
                                    <div className="font-bold text-gray-900">{point.name}</div>
                                    {isCurrent && (
                                      <div className="text-xs text-green-600 font-semibold mt-1">
                                        Current Location
                                      </div>
                                    )}
                                    {isOrigin && (
                                      <div className="text-xs text-orange-600 font-semibold mt-1">
                                        Origin
                                      </div>
                                    )}
                                    {isDestination && (
                                      <div className="text-xs text-red-600 font-semibold mt-1">
                                        Destination
                                      </div>
                                    )}
                                  </div>
                                </Popup>
                              </CircleMarker>
                            );
                          })}
                        </MapContainer>
                        
                        {/* Map Legend */}
                        <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm p-4 rounded-lg shadow-lg border-2 border-blue-200 z-[1000]">
                          <div className="space-y-2 text-sm">
                            <div className="flex items-center gap-2">
                              <div className="w-4 h-4 rounded-full bg-green-500 border-2 border-white"></div>
                              <span className="font-semibold">{t('currentLocation')}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="w-4 h-4 rounded-full bg-orange-500 border-2 border-white"></div>
                              <span>Origin</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="w-4 h-4 rounded-full bg-red-500 border-2 border-white"></div>
                              <span>Destination</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="w-4 h-4 rounded-full bg-blue-500 border-2 border-white"></div>
                              <span>Completed</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="w-4 h-4 rounded-full bg-gray-400 border-2 border-white"></div>
                              <span>Upcoming</span>
                            </div>
                          </div>
                        </div>

                        {/* Current Location Info Card */}
                        <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm p-4 rounded-lg shadow-lg border-2 border-green-200 z-[1000] max-w-xs">
                          <div className="flex items-center gap-2 mb-2">
                            <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
                            <span className="font-bold text-green-700 text-sm">{t('currentLocation')}</span>
                          </div>
                          <p className="text-lg font-black text-gray-900">{selectedOrder.currentLocation.name}</p>
                          <p className="text-sm text-gray-600 mt-1 flex items-center gap-1">
                            <Route className="h-3 w-3" />
                            {selectedOrder.distance} remaining
                          </p>
                          <div className="mt-3 pt-3 border-t border-gray-200">
                            <div className="flex items-center justify-between text-xs mb-1">
                              <span className="text-gray-600">Progress</span>
                              <span className="font-bold text-blue-600">{selectedOrder.progress}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full transition-all"
                                style={{ width: `${selectedOrder.progress}%` }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="p-6 space-y-4">
                        {selectedOrder.timeline.map((event, idx) => (
                          <div key={idx} className="flex gap-4">
                            <div className="flex flex-col items-center">
                              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                                event.completed ? 'bg-gradient-to-r from-blue-500 to-cyan-500' : 'bg-gray-300'
                              }`}>
                                {event.completed ? (
                                  <CheckCircle className="h-5 w-5 text-white" />
                                ) : (
                                  <Clock className="h-5 w-5 text-gray-500" />
                                )}
                              </div>
                              {idx < selectedOrder.timeline.length - 1 && (
                                <div className={`w-0.5 h-12 ${event.completed ? 'bg-blue-500' : 'bg-gray-300'}`}></div>
                              )}
                            </div>
                            <div className="flex-1 pb-8">
                              <div className="flex items-center gap-2 mb-1">
                                <h4 className={`font-bold ${event.current ? 'text-blue-600' : 'text-gray-900'}`}>
                                  {event.status}
                                </h4>
                                {event.current && (
                                  <Badge className="bg-blue-100 text-blue-700 border-blue-300">Current</Badge>
                                )}
                              </div>
                              <p className="text-sm text-gray-600">{event.time}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </>
            ) : (
              <Card className="border-2 shadow-lg">
                <CardContent className="p-20 text-center">
                  <MapPinned className="h-24 w-24 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    Select an order to track
                  </h3>
                  <p className="text-gray-600">
                    Choose an order from the list to view its live tracking details and route map
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
