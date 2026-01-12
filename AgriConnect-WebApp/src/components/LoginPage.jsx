import React, { useState } from "react";
import { useAuth } from "../auth-context.jsx";
import { motion } from "framer-motion";
import {
  UserCheck,
  Users,
  Sprout,
  Globe,
  Phone,
  Mail,
  Upload,
} from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export default function LoginPage({ onLogin, language, setLanguage }) {
  const [selectedRole, setSelectedRole] = useState(null);
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    location: "",
    document: null,
  });
  const { login, register, loading, error, user } = useAuth();

  const translations = {
    en: {
      welcome: "Welcome to AgriConnect",
      subtitle: "Your Digital Farming Partner",
      farmer: "Farmer",
      buyer: "Buyer/Retailer",
      selectRole: "Select Your Role",
      login: "Login",
      register: "Register",
      name: "Full Name",
      email: "Email Address",
      phone: "Phone Number",
      password: "Password",
      location: "Location",
      uploadDoc: "Upload ID Document",
      loginBtn: "Sign In",
      registerBtn: "Create Account",
      switchToRegister: "Don't have an account? Register",
      switchToLogin: "Already have an account? Login",
      farmingRevolution: "Join the Digital Farming Revolution",
      connectFarmers: "Connect directly with farmers for fresh produce",
      smartTech: "Smart technology for modern agriculture",
    },
    hi: {
      welcome: "एग्रीकनेक्ट में आपका स्वागत है",
      subtitle: "आपका डिजिटल कृषि साझीदार",
      farmer: "किसान",
      buyer: "खरीदार/व्यापारी",
      selectRole: "अपनी भूमिका चुनें",
      login: "लॉगिन",
      register: "पंजीकरण",
      name: "पूरा नाम",
      email: "ईमेल पता",
      phone: "फोन नंबर",
      password: "पासवर्ड",
      location: "स्थान",
      uploadDoc: "आईडी दस्तावेज़ अपलोड करें",
      loginBtn: "साइन इन करें",
      registerBtn: "खाता बनाएं",
      switchToRegister: "खाता नहीं है? पंजीकरण करें",
      switchToLogin: "पहले से खाता है? लॉगिन करें",
      farmingRevolution: "डिजिटल कृषि क्रांति में शामिल हों",
      connectFarmers: "ताज़ी उपज के लिए किसानों से सीधे जुड़ें",
      smartTech: "आधुनिक कृषि के लिए स्मार्ट तकनीक",
    },
  };

  const t = (key) => translations[language][key] || translations.en[key] || key;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedRole) return;
    if (isLogin) {
      await login({
        email: formData.email,
        password: formData.password,
        selectedRole: selectedRole,
      });
    } else {
      await register({
        username:
          formData.name ||
          (selectedRole === "farmer" ? "Ramesh Kumar" : "Grocery Store"),
        email: formData.email,
        password: formData.password,
        role: selectedRole,
        location: formData.location || "Not specified",
        phone: formData.phone || "Not specified",
      });
    }
  };

  const RoleCard = ({ role, icon: Icon, title, description, image }) => (
    <motion.div
      whileHover={{ scale: 1.02, y: -5 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => setSelectedRole(role)}
      className="cursor-pointer"
    >
      <Card
        className={`p-6 h-full backdrop-blur-lg bg-white/80 dark:bg-gray-800/80 border-2 transition-all duration-300 ${
          selectedRole === role
            ? "border-green-500 shadow-2xl shadow-green-500/25 ring-4 ring-green-500/20"
            : "border-gray-200 hover:border-green-300 hover:shadow-xl"
        }`}
      >
        <div className="text-center space-y-4">
          <div className="relative mx-auto w-20 h-20 rounded-full overflow-hidden">
            <ImageWithFallback
              src={image}
              alt={title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-green-600/20 to-transparent" />
          </div>
          <Icon
            className={`mx-auto w-8 h-8 ${
              selectedRole === role ? "text-green-600" : "text-gray-600"
            }`}
          />
          <div>
            <h3
              className={`font-semibold text-lg ${
                selectedRole === role ? "text-green-700" : "text-gray-800"
              }`}
            >
              {title}
            </h3>
            <p className="text-sm text-gray-600 mt-2">{description}</p>
          </div>
          {selectedRole === role && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="mx-auto w-6 h-6 bg-green-500 rounded-full flex items-center justify-center"
            >
              <UserCheck className="w-4 h-4 text-white" />
            </motion.div>
          )}
        </div>
      </Card>
    </motion.div>
  );

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Hero */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-green-600 via-emerald-600 to-teal-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute inset-0 opacity-30">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1683248892987-7b6181dfd718?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBmYXJtaW5nJTIwYWdyaWN1bHR1cmUlMjB0ZWNobm9sb2d5fGVufDF8fHx8MTc1NzU3NTUwN3ww&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Modern farming"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="relative z-10 flex flex-col justify-center items-center text-white p-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Sprout className="w-16 h-16 mx-auto mb-6" />
            <h1 className="text-5xl font-bold mb-4">{t("welcome")}</h1>
            <p className="text-xl mb-8 opacity-90">{t("subtitle")}</p>

            <div className="space-y-4 text-left">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-white rounded-full" />
                <span>{t("farmingRevolution")}</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-white rounded-full" />
                <span>{t("connectFarmers")}</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-white rounded-full" />
                <span>{t("smartTech")}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Right Side - Login/Register */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 lg:px-12">
        {/* Language Selector */}
        <div className="absolute top-6 right-6">
          <Select
            value={language}
            onValueChange={(value) => setLanguage(value)}
          >
            <SelectTrigger className="w-32">
              <Globe className="w-4 h-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="en">English</SelectItem>
              <SelectItem value="hi">हिंदी</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-md mx-auto w-full"
        >
          {/* Logo for mobile */}
          <div className="lg:hidden text-center mb-8">
            <Sprout className="w-12 h-12 mx-auto text-green-600 mb-4" />
            <h1 className="text-3xl font-bold text-gray-800">{t("welcome")}</h1>
            <p className="text-gray-600">{t("subtitle")}</p>
          </div>

          {!selectedRole ? (
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  {t("selectRole")}
                </h2>
                <p className="text-gray-600">
                  Choose how you'd like to use AgriConnect
                </p>
              </div>

              <div className="grid grid-cols-1 gap-4">
                <RoleCard
                  role="farmer"
                  icon={Sprout}
                  title={t("farmer")}
                  description="Sell crops, get farming insights, access schemes"
                  image="https://images.unsplash.com/photo-1618496899001-b58ebcbeef26?w=100&h=100&fit=crop&crop=face"
                />
                <RoleCard
                  role="buyer"
                  icon={Users}
                  title={t("buyer")}
                  description="Buy fresh produce directly from farmers"
                  image="https://images.unsplash.com/photo-1690293319115-7c444db81c7d?w=100&h=100&fit=crop"
                />
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="text-center">
                <Badge
                  variant="secondary"
                  className="mb-4 bg-green-100 text-green-700 hover:bg-green-200"
                >
                  {selectedRole === "farmer"
                    ? "👨‍🌾 " + t("farmer")
                    : "🏬 " + t("buyer")}
                </Badge>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedRole(null)}
                  className="text-gray-600 hover:text-gray-800"
                >
                  ← Change Role
                </Button>
              </div>

              <Tabs
                value={isLogin ? "login" : "register"}
                onValueChange={(v) => setIsLogin(v === "login")}
              >
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="login">{t("login")}</TabsTrigger>
                  <TabsTrigger value="register">{t("register")}</TabsTrigger>
                </TabsList>

                <TabsContent value="login" className="space-y-4">
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="email">{t("email")}</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        className="mt-1"
                        placeholder="your@email.com"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="password">{t("password")}</Label>
                      <Input
                        id="password"
                        type="password"
                        value={formData.password}
                        onChange={(e) =>
                          setFormData({ ...formData, password: e.target.value })
                        }
                        className="mt-1"
                        placeholder="••••••••"
                        required
                      />
                    </div>
                    {error && (
                      <div className="text-red-600 text-sm">{error}</div>
                    )}
                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                      disabled={loading}
                    >
                      {loading ? "Loading..." : t("loginBtn")}
                    </Button>
                  </form>
                </TabsContent>

                <TabsContent value="register" className="space-y-4">
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="name">{t("name")}</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        className="mt-1"
                        placeholder={
                          selectedRole === "farmer"
                            ? "Ramesh Kumar"
                            : "Your Business Name"
                        }
                        required
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label htmlFor="email">{t("email")}</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                          }
                          className="mt-1"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone">{t("phone")}</Label>
                        <Input
                          id="phone"
                          value={formData.phone}
                          onChange={(e) =>
                            setFormData({ ...formData, phone: e.target.value })
                          }
                          className="mt-1"
                          placeholder="+91 9876543210"
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="location">{t("location")}</Label>
                      <Input
                        id="location"
                        value={formData.location}
                        onChange={(e) =>
                          setFormData({ ...formData, location: e.target.value })
                        }
                        className="mt-1"
                        placeholder="City, State"
                      />
                    </div>
                    <div>
                      <Label htmlFor="password">{t("password")}</Label>
                      <Input
                        id="password"
                        type="password"
                        value={formData.password}
                        onChange={(e) =>
                          setFormData({ ...formData, password: e.target.value })
                        }
                        className="mt-1"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="document">
                        {t("uploadDoc")} (
                        {selectedRole === "farmer"
                          ? "Aadhaar"
                          : "Business License"}
                        )
                      </Label>
                      <div className="mt-1 border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-green-400 transition-colors">
                        <Upload className="w-6 h-6 mx-auto text-gray-400 mb-2" />
                        <p className="text-sm text-gray-600">
                          Click to upload or drag and drop
                        </p>
                      </div>
                    </div>
                    {error && (
                      <div className="text-red-600 text-sm">{error}</div>
                    )}
                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                      disabled={loading}
                    >
                      {loading ? "Loading..." : t("registerBtn")}
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
