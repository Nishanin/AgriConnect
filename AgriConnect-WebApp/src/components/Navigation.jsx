import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  ShoppingCart,
  Sprout,
  Bug,
  Calendar,
  FileText,
  Package,
  CreditCard,
  Truck,
  LogOut,
  Menu,
  X,
  Globe,
  Bell,
  Settings,
  User,
  MapPin,
  Leaf, // ← ADD THIS LINE
} from "lucide-react";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Separator } from "./ui/separator";
import GlobalSearch from "./GlobalSearch";

export default function Navigation({
  user = {},
  currentPage = "dashboard",
  onPageChange = () => {},
  onLogout = () => {},
  language = "en",
  onLanguageChange = () => {},
}) {
  const [isAllMenuOpen, setIsAllMenuOpen] = useState(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);

  // Determine navbar gradient based on user role
  const navbarGradient = user?.role === "farmer" 
    ? "bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600"
    : "bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600";

  const translations = {
    en: {
      dashboard: "Dashboard",
      marketplace: "Marketplace",
      smartFarming: "Smart Farming",
      diseaseManagement: "Disease Management",
      cropCalendar: "Crop Calendar",
      cropRecommendation: "Crop Recommendation",
      schemes: "Government Schemes",
      orders: "Orders",
      payments: "Payments",
      logistics: "Logistics",
      profile: "Profile",
      settings: "Settings",
      logout: "Logout",
      notifications: "Notifications",
      search: "Search crops, farmers, locations...",
      account: "Account & Lists",
      cart: "Cart",
      allCategories: "All Categories",
      deliverTo: "Deliver to",
      navigation: "Navigation",
      quickAccess: "Quick Access",
    },
    hi: {
      dashboard: "डैशबोर्ड",
      marketplace: "बाज़ार",
      smartFarming: "स्मार्ट कृषि",
      diseaseManagement: "रोग प्रबंधन",
      cropCalendar: "फसल कैलेंडर",
      cropRecommendation: "फसल सिफारिश",
      schemes: "सरकारी योजनाएं",
      orders: "ऑर्डर",
      payments: "भुगतान",
      logistics: "लॉजिस्टिक्स",
      profile: "प्रोफाइल",
      settings: "सेटिंग्स",
      logout: "लॉग आउट",
      notifications: "सूचनाएं",
      search: "फसल, किसान, स्थान खोजें...",
      account: "खाता और सूचियां",
      cart: "कार्ट",
      allCategories: "सभी श्रेणियां",
      deliverTo: "डिलीवर करें",
      navigation: "नेविगेशन",
      quickAccess: "त्वरित पहुंच",
    },
  };

  const t = (key) => translations[language]?.[key] || translations.en[key] || key;

  const allCategoriesItems =
    user?.role === "farmer"
      ? [
          { id: "dashboard", label: t("dashboard"), icon: Home },
          { id: "smart-farming", label: t("smartFarming"), icon: Sprout },
          { id: "disease-management", label: t("diseaseManagement"), icon: Bug },
          { id: "crop-calendar", label: t("cropCalendar"), icon: Calendar },
          { id: "crop-recommendation", label: t("cropRecommendation"), icon: Sprout },
          { id: "schemes", label: t("schemes"), icon: FileText },
          { id: "disease-detection", label: "Disease Detection", icon: Leaf },
        ]
      : [
          { id: "dashboard", label: t("dashboard"), icon: Home },
          { id: "marketplace", label: t("marketplace"), icon: ShoppingCart },
          { id: "orders", label: t("orders"), icon: Package },
          { id: "payments", label: t("payments"), icon: CreditCard },
          { id: "logistics", label: t("logistics"), icon: Truck },
        ];

  const secondaryNavItems =
    user?.role === "farmer"
      ? [
          { id: "dashboard", label: t("dashboard"), icon: Home },
          { id: "smart-farming", label: t("smartFarming"), icon: Sprout },
          { id: "disease-management", label: t("diseaseManagement"), icon: Bug },
          { id: "crop-calendar", label: t("cropCalendar"), icon: Calendar },
          { id: "crop-recommendation", label: t("cropRecommendation"), icon: Sprout },
          { id: "schemes", label: t("schemes"), icon: FileText },
          { id: "disease-detection", label: "Disease Detection", icon: Leaf },
        ]
      : [
          { id: "dashboard", label: t("dashboard"), icon: Home },
          { id: "marketplace", label: t("marketplace"), icon: ShoppingCart },
          { id: "orders", label: t("orders"), icon: Package },
          { id: "payments", label: t("payments"), icon: CreditCard },
          { id: "logistics", label: t("logistics"), icon: Truck },
        ];

  return (
    <>
      {/* Main Navigation Bar - Dynamic Color Based on Role */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`sticky top-0 left-0 right-0 z-40 ${navbarGradient} shadow-lg`}
      >
        <div className="w-full">
          <div className="flex items-center justify-between h-14 gap-0">
            {/* Left Section: Logo + Name + Location + Search */}
            <div className="flex items-center gap-0 flex-1 min-w-0 h-full">
              {/* Logo + AgriConnect Name */}
              <motion.div
                className="flex items-center gap-2 cursor-pointer flex-shrink-0 px-4 h-full hover:bg-white/10 transition-all"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onPageChange("dashboard")}
              >
                <div className="w-8 h-8 rounded bg-white flex items-center justify-center shadow-sm">
                  <Sprout className="w-5 h-5 text-green-600" />
                </div>
                <span className="text-base font-bold text-white whitespace-nowrap">
                  AgriConnect
                </span>
              </motion.div>

              {/* Divider */}
              <div className="w-px h-8 bg-white/30"></div>

              {/* Location Selector */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-1 px-4 h-full text-white hover:bg-white/10 transition-all flex-shrink-0"
              >
                <MapPin className="w-4 h-4 text-white" />
                <div className="text-left">
                  <div className="text-xs text-white/90 font-medium">{t("deliverTo")}</div>
                  <div className="text-xs font-bold text-white">
                    {user?.location || "Pune,Maharashtra"}
                  </div>
                </div>
              </motion.button>

              {/* Divider */}
              <div className="w-px h-8 bg-white/30"></div>

              {/* Search Bar Container */}
              <div className="flex items-center gap-0 flex-1 min-w-0 h-full px-4">
                {/* Search Bar */}
                <div className="flex-1 min-w-0">
                  <GlobalSearch
                    language={language}
                    userRole={user.role}
                    placeholder={t("search")}
                    onResultClick={(result) => {
                      if (result.type === "crop" || result.type === "search") {
                        onPageChange("marketplace");
                      }
                    }}
                    onCategoriesClick={() => setIsCategoriesOpen(!isAllMenuOpen)}
                  />
                </div>
              </div>
            </div>

            {/* Right Section: Language + Notifications + Orders + User Menu */}
            <div className="flex items-center gap-0 flex-shrink-0 h-full">
              {/* Language Switcher */}
              <Select value={language} onValueChange={onLanguageChange}>
                <SelectTrigger className="w-14 border-0 h-full rounded-none hover:bg-white/10 text-xs font-semibold text-white bg-transparent px-2">
                  <Globe className="w-3.5 h-3.5 text-white mr-1" />
                  <span>{language.toUpperCase()}</span>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="hi">हिंदी</SelectItem>
                </SelectContent>
              </Select>

              {/* Notifications */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="relative p-3 hover:bg-white/10 rounded-none transition-all h-full flex items-center"
              >
                <Bell className="w-5 h-5 text-white" />
                <Badge className="absolute top-2 right-2 w-4 h-4 flex items-center justify-center p-0 bg-red-500 text-white text-xs rounded-full">
                  3
                </Badge>
              </motion.button>

              {/* Orders */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onPageChange("orders")}
                className="relative p-3 hover:bg-white/10 rounded-none transition-all h-full flex items-center"
              >
                <Package className="w-5 h-5 text-white" />
              </motion.button>

              {/* User Menu Dropdown */}
              <Popover>
                <PopoverTrigger asChild>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center gap-2 px-3 h-full hover:bg-white/10 rounded-none transition-all"
                  >
                    <div className="hidden lg:block text-right">
                      <div className="text-xs text-white/90 font-medium">
                        Hello, <span className="font-bold">{user?.username?.split(" ")[0] || "User"}</span>
                      </div>
                      <div className="text-xs font-semibold text-white">
                        {t("account")}
                      </div>
                    </div>
                    <Avatar className="w-7 h-7 border border-white">
                      <AvatarImage src={user?.avatar} />
                      <AvatarFallback className="bg-white text-green-600 text-xs font-semibold">
                        {user?.username ? user.username.charAt(0) : "U"}
                      </AvatarFallback>
                    </Avatar>
                  </motion.button>
                </PopoverTrigger>
                <PopoverContent className="w-56" align="end" sideOffset={12}>
                  <div className="space-y-2">
                    <div className="px-2 py-2">
                      <p className="text-sm font-semibold text-gray-900">
                        {user?.username || "User"}
                      </p>
                      <p className="text-xs text-gray-500 capitalize">
                        {user?.role || "user"}
                      </p>
                    </div>
                    <Separator />
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-sm"
                      size="sm"
                      onClick={() => onPageChange("profile")}
                    >
                      <User className="w-4 h-4 mr-2" />
                      {t("profile")}
                    </Button>
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-sm"
                      size="sm"
                      onClick={() => onPageChange("orders")}
                    >
                      <Package className="w-4 h-4 mr-2" />
                      {t("orders")}
                    </Button>
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-sm"
                      size="sm"
                      onClick={() => onPageChange("marketplace")}
                    >
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      {t("marketplace")}
                    </Button>
                    <Separator />
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-sm"
                      size="sm"
                    >
                      <Settings className="w-4 h-4 mr-2" />
                      {t("settings")}
                    </Button>
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-sm text-red-600 hover:text-red-700 hover:bg-red-50"
                      size="sm"
                      onClick={onLogout}
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      {t("logout")}
                    </Button>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Secondary Navigation Bar - Dark Gray */}
      <div className="sticky top-14 left-0 right-0 z-40 bg-gray-800 shadow-md">
        <div className="max-w-[1920px] mx-auto px-4 lg:px-8">
          <div className="flex items-center h-12 gap-6">
            {/* All Button - Opens Sidebar */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsAllMenuOpen(!isAllMenuOpen)}
              className="flex items-center gap-2 text-white hover:text-gray-300 transition-colors py-2"
            >
              <Menu className="w-5 h-5" />
              <span className="font-semibold text-sm">All</span>
            </motion.button>

            {/* Dashboard Link */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onPageChange("dashboard")}
              className={`text-sm font-medium transition-colors py-2 ${
                currentPage === "dashboard"
                  ? "text-white border-b-2 border-white"
                  : "text-gray-300 hover:text-white"
              }`}
            >
              Dashboard
            </motion.button>

            {/* Marketplace Link */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onPageChange("marketplace")}
              className={`text-sm font-medium transition-colors py-2 ${
                currentPage === "marketplace"
                  ? "text-white border-b-2 border-white"
                  : "text-gray-300 hover:text-white"
              }`}
            >
              Marketplace
            </motion.button>
          </div>
        </div>
      </div>

      {/* Search Bar for Mobile */}
      <div className="md:hidden bg-white border-b border-gray-200 px-4 py-3">
        <GlobalSearch
          language={language}
          userRole={user.role}
          placeholder={t("search")}
          onResultClick={(result) => {
            if (result.type === "crop" || result.type === "search") {
              onPageChange("marketplace");
            }
          }}
          onCategoriesClick={() => setIsCategoriesOpen(!isAllMenuOpen)}
        />
      </div>

      {/* Sidebar Overlay - PORTAL */}
      {isAllMenuOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-[999]"
            onClick={() => setIsAllMenuOpen(false)}
            style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0 }}
          />
          <div
            className="fixed top-0 left-0 bottom-0 w-96 bg-white shadow-2xl overflow-y-auto"
            style={{ position: "fixed", zIndex: 9999, top: 0, left: 0, bottom: 0, width: "384px" }}
          >
            {/* User Card */}
            <div className="bg-white border-b border-gray-200 p-6">
              <div className="flex items-center gap-4 mb-4">
                <Avatar className="w-12 h-12 border-2 border-green-200">
                  <AvatarImage src={user?.avatar} />
                  <AvatarFallback className="bg-gradient-to-br from-green-500 to-emerald-600 text-white font-semibold">
                    {user?.username ? user.username.charAt(0) : "U"}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold text-gray-900 text-lg">
                    Hello, {user?.username?.split(" ")[0] || "User"}
                  </p>
                  <p className="text-sm text-gray-600 capitalize">
                    {user?.role || "user"}
                  </p>
                </div>
              </div>
            </div>

            {/* Navigation Section */}
            <div className="p-6">
              <h3 className="font-semibold text-gray-900 text-base mb-4">
                {t("navigation")}
              </h3>
              <div className="space-y-2">
                {allCategoriesItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <motion.button
                      key={item.id}
                      whileHover={{ scale: 1.02, x: 4 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        onPageChange(item.id);
                        setIsAllMenuOpen(false);
                      }}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                        currentPage === item.id
                          ? "bg-green-500 text-white shadow-md"
                          : "text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-medium text-sm">{item.label}</span>
                    </motion.button>
                  );
                })}
              </div>
            </div>

            <Separator className="my-2" />

            {/* Quick Access Section */}
            <div className="p-6">
              <h3 className="font-semibold text-gray-900 text-base mb-4">
                {t("quickAccess")}
              </h3>
              <div className="space-y-2">
                <motion.button
                  whileHover={{ scale: 1.02, x: 4 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    onPageChange("profile");
                    setIsAllMenuOpen(false);
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 rounded-lg hover:bg-gray-50 transition-all"
                >
                  <User className="w-5 h-5" />
                  <span className="font-medium text-sm">{t("profile")}</span>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02, x: 4 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 rounded-lg hover:bg-gray-50 transition-all"
                >
                  <Settings className="w-5 h-5" />
                  <span className="font-medium text-sm">{t("settings")}</span>
                </motion.button>
              </div>
            </div>

            <Separator className="my-2" />

            {/* Logout */}
            <div className="p-6">
              <motion.button
                whileHover={{ scale: 1.02, x: 4 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  onLogout();
                  setIsAllMenuOpen(false);
                }}
                className="w-full flex items-center gap-3 px-4 py-3 text-red-600 rounded-lg hover:bg-red-50 transition-all"
              >
                <LogOut className="w-5 h-5" />
                <span className="font-semibold text-sm">{t("logout")}</span>
              </motion.button>
            </div>
          </div>
        </>
      )}
    </>
  );
}
