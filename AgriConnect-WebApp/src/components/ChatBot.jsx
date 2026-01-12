import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  MessageCircle, X, Send, Mic, Camera, Sprout,
  ShoppingCart, Bug, Calendar, FileText, Package,
  User, Bot, Loader2
} from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback } from './ui/avatar';
import { sendChatbotMessage } from '../api';

export default function ChatBot({ isOpen, onToggle, userRole, language }) {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [soilMode, setSoilMode] = useState(false);
  const [soilParams, setSoilParams] = useState({
    pH: '',
    moisture: '',
    nitrogen: '',
    phosphorous: '',
    potassium: '',
    temperature: '',
    humidity: '',
    rainfall: ''
  });
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);

  const translations = {
    en: {
      chatAssistant: 'AI Farm Assistant',
      placeholder: 'Type or upload image...',
      send: 'Send',
      farmingAdvice: 'Crop Recommendation',
      marketPrices: 'Market Prices',
      weatherUpdate: 'Weather Update',
      schemeInfo: 'Scheme Info',
      diseaseDetection: 'Disease Detection',
      soilAnalysis: 'Soil Analysis',
      uploadImage: 'Upload Plant Image',
      orderSupport: 'Order Support',
      paymentHelp: 'Payment Help',
      productInfo: 'Product Info',
      typing: 'AI analyzing...',
      welcomeFarmer: 'Hello! I\'m your AI Farm Assistant powered by DialoGPT AI model. I can:\n\n🌾 Recommend crops based on soil parameters\n🔬 Detect plant diseases from images\n📊 Analyze soil conditions\n💰 Provide market insights\n💬 Answer your farming questions using AI\n\nHow can I help you today?',
      welcomeBuyer: 'Hello! I\'m AgriBot, your shopping assistant. I can help you find fresh produce, track orders, and connect with farmers. What would you like to know?',
      soilPrompt: 'Please provide your soil parameters:\n\nRequired: pH, Nitrogen, Phosphorous, Potassium\nOptional: Moisture, Temperature, Humidity, Rainfall\n\nI\'ll recommend the best crops for your conditions.',
      imagePrompt: 'Upload a clear image of the affected plant leaf or stem. I\'ll analyze it using ResNet AI model to detect diseases and provide treatment recommendations.',
      analyzingSoil: 'Analyzing soil parameters using XGBoost model...',
      analyzingImage: 'Analyzing plant image using ResNet model...',
      fertilizerAdvice: 'For your wheat crop, I recommend using NPK fertilizer (10:26:26) at 50kg per acre. Apply it during the tillering stage for best results.',
      todayPrice: 'Today\'s market prices:\n🌾 Wheat: ₹25-28/kg\n🍅 Tomatoes: ₹40-45/kg\n🧅 Onions: ₹35-38/kg',
      weatherToday: 'Today\'s weather: Sunny, 28°C. Perfect conditions for spraying pesticides. No rain expected for next 3 days.',
      pmKisan: 'PM-KISAN scheme provides ₹6,000 per year to farmer families. Next installment due in March 2024. You can apply online at pmkisan.gov.in',
    },
    hi: {
      chatAssistant: 'चैट सहायक',
      typePlaceholder: 'अपना प्रश्न लिखें...',
      send: 'भेजें',
      farmingAdvice: 'कृषि सलाह',
      marketPrices: 'बाज़ार मूल्य',
      weatherUpdate: 'मौसम अपडेट',
      schemeInfo: 'योजना जानकारी',
      orderSupport: 'ऑर्डर सहायता',
      paymentHelp: 'भुगतान सहायता',
      productInfo: 'उत्पाद जानकारी',
      typing: 'एग्रीबॉट टाइप कर रहा है...',
      welcomeFarmer: 'नमस्कार! मैं एग्रीबॉट हूं, आपका कृषि सहायक। मैं फसल सलाह, मौसम अपडेट, बाज़ार मूल्य और सरकारी योजनाओं में आपकी मदद कर सकता हूं। आज मैं आपकी कैसे सहायता कर सकता हूं?',
      welcomeBuyer: 'नमस्कार! मैं एग्रीबॉट हूं, आपका खरीदारी सहायक। मैं ताजी उपज खोजने, ऑर्डर ट्रैक करने और किसानों से जुड़ने में आपकी मदद कर सकता हूं। आप क्या जानना चाहते हैं?',
      fertilizerAdvice: 'आपकी गेहूं की फसल के लिए, मैं NPK उर्वरक (10:26:26) 50 किलो प्रति एकड़ की सिफारिश करता हूं। बेहतर परिणामों के लिए इसे कल्ले निकलने के समय डालें।',
      todayPrice: 'आज के बाज़ार भाव:\n🌾 गेहूं: ₹25-28/किलो\n🍅 टमाटर: ₹40-45/किलो\n🧅 प्याज: ₹35-38/किलो',
      weatherToday: 'आज का मौसम: धूप, 28°से। कीटनाशक छिड़काव के लिए उत्तम स्थितियां। अगले 3 दिन बारिश की संभावना नहीं।',
      pmKisan: 'PM-KISAN योजना किसान परिवारों को प्रति वर्ष ₹6,000 प्रदान करती है। अगली किस्त मार्च 2024 में। आप pmkisan.gov.in पर ऑनलाइन आवेदन कर सकते हैं।',
    }
  };

  const t = (key) => translations[language][key] || translations.en[key] || key;

  const farmerQuickReplies = [
    { id: 'crop-rec', text: t('farmingAdvice'), icon: Sprout },
    { id: 'disease', text: t('diseaseDetection'), icon: Bug },
    { id: 'soil', text: t('soilAnalysis'), icon: Calendar },
    { id: 'prices', text: t('marketPrices'), icon: ShoppingCart },
  ];

  const buyerQuickReplies = [
    { id: 'products', text: t('productInfo'), icon: Package },
    { id: 'orders', text: t('orderSupport'), icon: ShoppingCart },
    { id: 'payment', text: t('paymentHelp'), icon: FileText },
    { id: 'prices', text: t('marketPrices'), icon: ShoppingCart },
  ];

  const quickReplies = userRole === 'farmer' ? farmerQuickReplies : buyerQuickReplies;

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // Add welcome message
      const welcomeMessage = {
        id: Date.now().toString(),
        text: userRole === 'farmer' ? t('welcomeFarmer') : t('welcomeBuyer'),
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages([welcomeMessage]);
    }
  }, [isOpen, userRole, language]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Simulate XGBoost crop recommendation based on soil parameters
  const analyzeSoilParameters = (params) => {
    // Extract non-empty parameters
    const hasRequiredParams = params.pH && params.nitrogen && params.phosphorous && params.potassium;
    
    if (!hasRequiredParams) {
      return "⚠️ Missing required parameters. Please provide at least: pH, Nitrogen, Phosphorous, and Potassium levels.";
    }

    // Simulated XGBoost model logic (in production, call backend API)
    const pH = parseFloat(params.pH);
    const n = parseFloat(params.nitrogen);
    const p = parseFloat(params.phosphorous);
    const k = parseFloat(params.potassium);
    const temp = params.temperature ? parseFloat(params.temperature) : 25;
    const humidity = params.humidity ? parseFloat(params.humidity) : 60;
    const rainfall = params.rainfall ? parseFloat(params.rainfall) : 200;

    let recommendations = "🌾 **Crop Recommendations (XGBoost Analysis)**\n\n";
    
    // Simple rule-based simulation (replace with actual model API call)
    if (pH >= 6.0 && pH <= 7.5 && n >= 50 && k >= 40) {
      recommendations += "**1. Rice** ⭐⭐⭐⭐⭐\n";
      recommendations += "✓ Optimal pH range (6.0-7.5)\n";
      recommendations += "✓ Good nitrogen levels support growth\n";
      recommendations += "✓ Expected yield: 25-30 quintals/acre\n\n";
    }
    
    if (pH >= 6.5 && pH <= 7.5 && p >= 30 && k >= 35) {
      recommendations += "**2. Wheat** ⭐⭐⭐⭐\n";
      recommendations += "✓ Suitable pH for wheat cultivation\n";
      recommendations += "✓ Adequate phosphorous for root development\n";
      recommendations += "✓ Expected yield: 20-25 quintals/acre\n\n";
    }
    
    if (pH >= 5.5 && pH <= 6.5 && k >= 40) {
      recommendations += "**3. Maize (Corn)** ⭐⭐⭐⭐\n";
      recommendations += "✓ Optimal soil conditions\n";
      recommendations += "✓ High potassium supports grain filling\n";
      recommendations += "✓ Expected yield: 30-35 quintals/acre\n\n";
    }
    
    if (pH >= 6.0 && pH <= 7.0 && n >= 40) {
      recommendations += "**4. Cotton** ⭐⭐⭐\n";
      recommendations += "✓ Good pH balance\n";
      recommendations += "✓ Nitrogen supports vegetative growth\n";
      recommendations += "✓ Expected yield: 15-20 quintals/acre\n\n";
    }

    recommendations += "\n📋 **Next Steps:**\n";
    recommendations += "• Conduct soil testing every 6 months\n";
    recommendations += "• Add organic matter to improve soil health\n";
    recommendations += "• Consider crop rotation for sustainability\n";

    return recommendations;
  };

  // Simulate ResNet disease detection from image
  const analyzePlantImage = (imageData) => {
    // In production, send to backend ResNet API
    // Simulated disease detection results
    const diseases = [
      {
        name: "Early Blight",
        confidence: 94.5,
        symptoms: "Brown spots with concentric rings on older leaves",
        severity: "Moderate",
        treatment: {
          chemical: "Spray Mancozeb 75% WP @ 2.5g/liter every 7-10 days",
          organic: "Neem oil (5ml/liter) + Trichoderma (5g/liter) spray weekly",
          preventive: "Remove infected leaves, maintain plant spacing, avoid overhead irrigation"
        }
      },
      {
        name: "Leaf Spot",
        confidence: 87.3,
        symptoms: "Small circular spots on leaves with yellow halos",
        severity: "Low",
        treatment: {
          chemical: "Copper oxychloride 50% WP @ 3g/liter",
          organic: "Garlic extract spray (10ml/liter water)",
          preventive: "Improve air circulation, water at base, crop rotation"
        }
      }
    ];

    const primaryDisease = diseases[0];
    
    let response = `🔬 **Disease Detection Results (ResNet AI)**\n\n`;
    response += `**Detected: ${primaryDisease.name}**\n`;
    response += `Confidence: ${primaryDisease.confidence}%\n`;
    response += `Severity: ${primaryDisease.severity}\n\n`;
    
    response += `**Symptoms:**\n${primaryDisease.symptoms}\n\n`;
    
    response += `**Treatment Options:**\n\n`;
    response += `💊 **Chemical:**\n${primaryDisease.treatment.chemical}\n\n`;
    response += `🌿 **Organic:**\n${primaryDisease.treatment.organic}\n\n`;
    response += `🛡️ **Prevention:**\n${primaryDisease.treatment.preventive}\n\n`;
    
    response += `⚠️ **Important:** Apply treatments during early morning or evening. Wear protective equipment.`;
    
    return response;
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target.result);
        
        // Add user message with image
        const userMessage = {
          id: Date.now().toString(),
          text: '📷 Uploaded plant image for disease analysis',
          sender: 'user',
          timestamp: new Date(),
          hasImage: true,
        };
        
        setMessages(prev => [...prev, userMessage]);
        setIsTyping(true);
        
        // Simulate AI analysis
        setTimeout(() => {
          const analysisResult = analyzePlantImage(e.target.result);
          
          const botMessage = {
            id: (Date.now() + 1).toString(),
            text: analysisResult,
            sender: 'bot',
            timestamp: new Date(),
          };
          
          setMessages(prev => [...prev, botMessage]);
          setIsTyping(false);
          setUploadedImage(null);
        }, 2000);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSendMessage = async (text) => {
    if (!text.trim()) return;

    const userMessage = {
      id: Date.now().toString(),
      text,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Get user ID from localStorage
    let userId = null;
    try {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      userId = user.id || user._id || null;
    } catch (e) {
      console.error('Error getting user ID:', e);
    }

    // Check if message contains soil parameters (keep special handling for soil analysis)
    const soilKeywords = ['ph', 'nitrogen', 'phosphorous', 'potassium', 'soil', 'n=', 'p=', 'k='];
    const hasSoilData = soilKeywords.some(keyword => text.toLowerCase().includes(keyword));
    
    try {
      let botResponse = '';

      // Special handling for soil analysis with extracted parameters
      if (hasSoilData || text === t('soilAnalysis')) {
        const phMatch = text.match(/ph[:\s=]+([0-9.]+)/i);
        const nMatch = text.match(/n[:\s=]+([0-9.]+)/i);
        const pMatch = text.match(/p[:\s=]+([0-9.]+)/i);
        const kMatch = text.match(/k[:\s=]+([0-9.]+)/i);
        
        if (phMatch || nMatch || pMatch || kMatch) {
          // Use local soil analysis for structured data
          const params = {
            pH: phMatch ? phMatch[1] : '',
            nitrogen: nMatch ? nMatch[1] : '',
            phosphorous: pMatch ? pMatch[1] : '',
            potassium: kMatch ? kMatch[1] : '',
          };
          botResponse = analyzeSoilParameters(params);
        } else {
          // For general soil questions, use AI
          const response = await sendChatbotMessage(text, userId);
          botResponse = response.bot_response || t('soilPrompt');
        }
      } else {
        // Use AI chatbot for all other messages
        const response = await sendChatbotMessage(text, userId);
        botResponse = response.bot_response || 'I apologize, but I encountered an error. Please try again.';
      }

      const botMessage = {
        id: (Date.now() + 1).toString(),
        text: botResponse,
        sender: 'bot',
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error sending message to chatbot:', error);
      console.error('Error details:', error.message);
      
      // Show user-friendly error message
      let botResponse = `⚠️ I'm having trouble connecting to the AI service. Error: ${error.message}\n\n`;
      botResponse += 'Please ensure:\n';
      botResponse += '1. The backend server is running on port 8000\n';
      botResponse += '2. Check the browser console for more details\n';
      botResponse += '\nYou can try asking again, or contact support if the issue persists.';

      const botMessage = {
        id: (Date.now() + 1).toString(),
        text: botResponse,
        sender: 'bot',
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, botMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleQuickReply = (reply) => {
    handleSendMessage(reply.text);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSendMessage(inputText);
  };

  return (
    <>
      {/* Chat Button */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="fixed bottom-6 right-6 z-50"
      >
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={onToggle}
          className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full shadow-lg flex items-center justify-center text-white hover:shadow-xl transition-all duration-300"
        >
          {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
          {!isOpen && (
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full"
            />
          )}
        </motion.button>
      </motion.div>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, x: 50 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, y: 100, x: 50 }}
            className="fixed bottom-24 right-6 z-40 w-96 h-[500px] bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-4 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                    <Bot className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{t('chatAssistant')}</h3>
                    <p className="text-sm opacity-90">AgriBot • Online</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onToggle}
                  className="text-white hover:bg-white/20 w-8 h-8 p-0"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 p-4 h-80 overflow-y-auto space-y-4">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex items-start space-x-2 max-w-[80%] ${message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                    <Avatar className="w-8 h-8">
                      <AvatarFallback className={message.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-green-500 text-white'}>
                        {message.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                      </AvatarFallback>
                    </Avatar>
                    <div
                      className={`p-3 rounded-2xl ${
                        message.sender === 'user'
                          ? 'bg-blue-500 text-white rounded-br-sm'
                          : 'bg-gray-100 text-gray-800 rounded-bl-sm'
                      }`}
                    >
                      <p className="text-sm whitespace-pre-line">{message.text}</p>
                      <p className={`text-xs mt-1 ${message.sender === 'user' ? 'text-blue-100' : 'text-gray-500'}`}>
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}

              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="flex items-start space-x-2">
                    <Avatar className="w-8 h-8">
                      <AvatarFallback className="bg-green-500 text-white">
                        <Bot className="w-4 h-4" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="bg-gray-100 p-3 rounded-2xl rounded-bl-sm">
                      <div className="flex items-center space-x-1">
                        <Loader2 className="w-4 h-4 animate-spin text-gray-500" />
                        <span className="text-sm text-gray-500">{t('typing')}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Replies */}
            <div className="p-3 border-t bg-gray-50">
              <div className="flex flex-wrap gap-2 mb-3">
                {quickReplies.map((reply) => (
                  <motion.button
                    key={reply.id}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleQuickReply(reply)}
                    className="flex items-center space-x-1 px-3 py-1 bg-white border border-gray-200 rounded-full text-sm hover:bg-green-50 hover:border-green-300 transition-colors"
                  >
                    <reply.icon className="w-3 h-3" />
                    <span>{reply.text}</span>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Input */}
            <div className="p-4 border-t">
              <input
                type="file"
                ref={fileInputRef}
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
              <form onSubmit={handleSubmit} className="flex items-center space-x-2">
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  onClick={() => fileInputRef.current?.click()}
                  className="border-green-500 text-green-500 hover:bg-green-50"
                  title="Upload plant image for disease detection"
                >
                  <Camera className="w-4 h-4" />
                </Button>
                <Input
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder={t('placeholder')}
                  className="flex-1"
                />
                <Button
                  type="submit"
                  size="sm"
                  className="bg-green-500 hover:bg-green-600"
                  disabled={!inputText.trim()}
                >
                  <Send className="w-4 h-4" />
                </Button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}