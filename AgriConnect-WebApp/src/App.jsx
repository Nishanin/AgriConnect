import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "./auth-context.jsx";
import {
  UserCheck,
  Users,
  Sprout,
  ShoppingCart,
  Calendar,
  MessageCircle,
  Phone,
  Mail,
  Globe,
} from "lucide-react";
import { Button } from "./components/ui/button";
import { Card } from "./components/ui/card";
import { Input } from "./components/ui/input";
import { Label } from "./components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";
import { Badge } from "./components/ui/badge";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";

// Import components
import LoginPage from "./components/LoginPage";
import FarmerDashboard from "./components/FarmerDashboard";
import BuyerDashboard from "./components/BuyerDashboard";
import Marketplace from "./components/Marketplace";
import SmartFarming from "./components/SmartFarming";
import DiseaseManagement from "./components/DiseaseManagement";
import CropCalendar from "./components/CropCalendar";
import CropRecommendation from "./components/CropRecommendation";
import GovernmentSchemes from "./components/GovernmentSchemes";
import ChatBot from "./components/ChatBot";
import Navigation from "./components/Navigation";
import Profile from "./components/Profile";
import Payments from "./components/Payments";
import Logistics from "./components/Logistics";
import DiseaseDetection from "./components/DiseaseDetection";

export default function App() {
  const { user, logout } = useAuth();
  const [currentPage, setCurrentPage] = useState("dashboard");
  const [language, setLanguage] = useState("en");
  const [isChatBotOpen, setIsChatBotOpen] = useState(false);

  // Language translations
  const translations = {
    en: {
      welcome: "Welcome to AgriConnect",
      subtitle: "Your Digital Farming Partner",
      farmer: "Farmer",
      buyer: "Buyer/Retailer",
      dashboard: "Dashboard",
      marketplace: "Marketplace",
      smartFarming: "Smart Farming",
      diseaseManagement: "Disease Management",
      cropCalendar: "Crop Calendar",
      schemes: "Government Schemes",
      orders: "Orders",
      payments: "Payments",
      logistics: "Logistics",
    },
    hi: {
      welcome: "एग्रीकनेक्ट में आपका स्वागत है",
      subtitle: "आपका डिजिटल कृषि साझीदार",
      farmer: "किसान",
      buyer: "खरीदार/व्यापारी",
      dashboard: "डैशबोर्ड",
      marketplace: "बाज़ार",
      smartFarming: "स्मार्ट कृषि",
      diseaseManagement: "रोग प्रबंधन",
      cropCalendar: "फसल कैलेंडर",
      schemes: "सरकारी योजनाएं",
      orders: "ऑर्डर",
      payments: "भुगतान",
      logistics: "लॉजिस्टिक्स",
    },
  };

  const t = (key) => translations[language][key] || translations.en[key] || key;

  const handleLogout = () => {
    logout();
    setCurrentPage("dashboard");
  };

  const renderCurrentPage = () => {
    if (!user) {
      return <LoginPage language={language} setLanguage={setLanguage} />;
    }

    switch (currentPage) {
      case "dashboard":
        return user.role === "farmer" ? (
          <FarmerDashboard user={user} language={language} />
        ) : (
          <BuyerDashboard user={user} language={language} />
        );
      case "marketplace":
        return <Marketplace userRole={user.role} language={language} />;
      case "smart-farming":
        return user.role === "farmer" ? (
          <SmartFarming language={language} />
        ) : null;
      case "disease-management":
        return user.role === "farmer" ? (
          <DiseaseManagement language={language} />
        ) : null;
      case "crop-calendar":
        return user.role === "farmer" ? (
          <CropCalendar language={language} />
        ) : null;
      case "crop-recommendation":
        return user.role === "farmer" ? (
          <CropRecommendation language={language} />
        ) : null;
      case "disease-detection":
        return user.role === "farmer" ? (
          <DiseaseDetection language={language} />
        ) : null;
      case "schemes":
        return user.role === "farmer" ? (
          <GovernmentSchemes language={language} />
        ) : null;
      case "profile":
        return <Profile user={user} language={language} userRole={user.role} />;
      case "payments":
        return <Payments user={user} language={language} />;
      case "logistics":
        return <Logistics user={user} language={language} />;
      case "orders":
        return user.role === "buyer" ? (
          <BuyerDashboard user={user} language={language} />
        ) : (
          <FarmerDashboard user={user} language={language} />
        );
      case "cart":
        return user.role === "buyer" ? (
          <BuyerDashboard user={user} language={language} />
        ) : null;
      default:
        return user.role === "farmer" ? (
          <FarmerDashboard user={user} language={language} />
        ) : (
          <BuyerDashboard user={user} language={language} />
        );
    }
  };

  // Effect to set initial page on auth state change
  useEffect(() => {
    if (user) {
      setCurrentPage("dashboard");
    }
  }, [user]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 dark:from-gray-900 dark:via-green-900 dark:to-emerald-900">
      {/* Background Pattern */}
      <div className="fixed inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23059669' fill-opacity='0.4'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10">
        {user && (
          <Navigation
            user={user || {}}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
            onLogout={handleLogout}
            language={language}
            onLanguageChange={setLanguage}
          />
        )}

        <main className={`${user ? "pt-0.5" : ""} min-h-screen`}>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage + (user?.id || "no-user")}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {renderCurrentPage()}
            </motion.div>
          </AnimatePresence>
        </main>

        {/* ChatBot */}
        {user && (
          <ChatBot
            isOpen={isChatBotOpen}
            onToggle={() => setIsChatBotOpen(!isChatBotOpen)}
            userRole={user.role}
            language={language}
          />
        )}
      </div>
    </div>
  );
}
