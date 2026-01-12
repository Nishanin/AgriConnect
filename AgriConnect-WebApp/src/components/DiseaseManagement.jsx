import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Camera, Upload, Scan, Bug, Leaf, AlertTriangle,
  CheckCircle, Clock, Eye, Download, Share2,
  Zap, Target, Shield, TrendingUp
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { analyzePestImage } from '../api';

export default function DiseaseManagement({ language }) {
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [error, setError] = useState(null);
  const [cropType, setCropType] = useState('Tomato');

  const translations = {
    en: {
      diseaseManagement: 'Disease & Pest Management',
      uploadPhoto: 'Upload Photo',
      takePhoto: 'Take Photo',
      scanResults: 'Scan Results',
      history: 'Scan History',
      dragDrop: 'Drag and drop an image here, or click to select',
      formats: 'Supports JPG, PNG, GIF up to 10MB',
      scanning: 'Analyzing image...',
      aiAnalysis: 'AI is examining your crop image',
      confidence: 'Confidence',
      disease: 'Disease',
      pest: 'Pest',
      healthy: 'Healthy',
      treatment: 'Treatment',
      prevention: 'Prevention',
      severity: 'Severity',
      high: 'High',
      medium: 'Medium',
      low: 'Low',
      apply: 'Apply Treatment',
      download: 'Download Report',
      share: 'Share',
      viewMore: 'View More',
      lateBlight: 'Late Blight',
      leafSpot: 'Leaf Spot',
      aphids: 'Aphids',
      whitefly: 'Whitefly',
      cropAffected: 'Crop Affected',
      detectedOn: 'Detected On',
      status: 'Status',
      treated: 'Treated',
      pending: 'Pending',
      monitoring: 'Monitoring',
      recommendations: 'Recommendations',
      sprayFungicide: 'Spray copper-based fungicide every 7-10 days',
      removeAffected: 'Remove affected leaves and destroy them',
      improveVentilation: 'Improve air circulation between plants',
      organicTreatment: 'Use neem oil spray for organic treatment',
      step1: 'Step 1: Immediate Action',
      step2: 'Step 2: Treatment',
      step3: 'Step 3: Prevention',
      commonDiseases: 'Common Diseases in Your Area',
      recentScans: 'Recent Scans',
      accuracy: 'Accuracy',
      cropType: 'Crop Type',
      modelUsed: 'Model',
      chemicalPlan: 'Recommended Pesticides',
      organicPlan: 'Organic & Biological Options',
      analysisError: 'Unable to analyze the image right now. Please try again.',
      retry: 'Retry',
      summary: 'Summary',
      crop: 'Crop',
      knowledgeBase: 'Agronomy Knowledge Base',
      dosage: 'Dosage',
      reEntry: 'Re-entry Interval'
    },
    hi: {
      diseaseManagement: 'रोग और कीट प्रबंधन',
      uploadPhoto: 'फोटो अपलोड करें',
      takePhoto: 'फोटो लें',
      scanResults: 'स्कैन परिणाम',
      history: 'स्कैन इतिहास',
      dragDrop: 'यहां एक छवि खींचें और छोड़ें, या चुनने के लिए क्लिक करें',
      formats: 'JPG, PNG, GIF को 10MB तक समर्थन करता है',
      scanning: 'छवि का विश्लेषण कर रहे हैं...',
      aiAnalysis: 'AI आपकी फसल की छवि की जांच कर रहा है',
      confidence: 'विश्वास',
      disease: 'रोग',
      pest: 'कीट',
      healthy: 'स्वस्थ',
      treatment: 'उपचार',
      prevention: 'रोकथाम',
      severity: 'गंभीरता',
      high: 'उच्च',
      medium: 'मध्यम',
      low: 'कम',
      apply: 'उपचार लागू करें',
      download: 'रिपोर्ट डाउनलोड करें',
      share: 'साझा करें',
      viewMore: 'और देखें',
      lateBlight: 'देर से झुलसा',
      leafSpot: 'पत्ती धब्बा',
      aphids: 'माहू',
      whitefly: 'सफेद मक्खी',
      cropAffected: 'प्रभावित फसल',
      detectedOn: 'पाया गया',
      status: 'स्थिति',
      treated: 'उपचारित',
      pending: 'लंबित',
      monitoring: 'निगरानी',
      recommendations: 'सिफारिशें',
      sprayFungicide: 'हर 7-10 दिन में तांबा आधारित फफूंदनाशक स्प्रे करें',
      removeAffected: 'प्रभावित पत्तियों को हटाएं और नष्ट करें',
      improveVentilation: 'पौधों के बीच हवा का संचार सुधारें',
      organicTreatment: 'जैविक उपचार के लिए नीम तेल स्प्रे का उपयोग करें',
      step1: 'चरण 1: तत्काल कार्रवाई',
      step2: 'चरण 2: उपचार',
      step3: 'चरण 3: रोकथाम',
      commonDiseases: 'आपके क्षेत्र में सामान्य रोग',
      recentScans: 'हाल के स्कैन',
      accuracy: 'सटीकता',
      cropType: 'फसल का प्रकार',
      modelUsed: 'मॉडल',
      chemicalPlan: 'अनुशंसित कीटनाशक',
      organicPlan: 'जैविक और जैविक विकल्प',
      analysisError: 'इस समय छवि का विश्लेषण नहीं हो सका। कृपया पुनः प्रयास करें।',
      retry: 'फिर से प्रयास करें',
      summary: 'सारांश',
      crop: 'फसल',
      knowledgeBase: 'एग्रोनॉमी नॉलेज बेस',
      dosage: 'मात्रा',
      reEntry: 'पुनः प्रवेश अंतराल'
    }
  };

  const t = (key) => translations[language][key] || translations.en[key] || key;

  const handleImageUpload = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const base64Image = e.target?.result;
      setUploadedImage(base64Image);
      startScanning(base64Image, { cropType });
    };
    reader.readAsDataURL(file);
  };

  const startScanning = async (imageData, options = {}) => {
    if (!imageData) return;
    setIsScanning(true);
    setScanResult(null);
    setError(null);

    try {
      const response = await analyzePestImage({
        imageBase64: imageData,
        cropType: options.cropType || cropType,
      });
      setScanResult(response);
      setScanHistory((prev) => {
        const entry = {
          id: Date.now(),
          date: new Date(response.timestamp || Date.now()).toLocaleString(),
          crop: response.crop || options.cropType || cropType,
          disease: response.disease,
          severity: response.severity,
          status: 'pending',
          confidence: response.confidence,
        };
        return [entry, ...prev].slice(0, 6);
      });
    } catch (err) {
      setError(err.message || t('analysisError'));
    } finally {
      setIsScanning(false);
    }
  };

  const [scanHistory, setScanHistory] = useState([
    {
      id: 1,
      date: '2 days ago',
      crop: 'Tomato',
      disease: 'Late Blight',
      severity: 'high',
      status: 'treated',
      confidence: 94
    },
    {
      id: 2,
      date: '1 week ago',
      crop: 'Wheat',
      disease: 'Leaf Spot',
      severity: 'medium',
      status: 'monitoring',
      confidence: 87
    },
    {
      id: 3,
      date: '2 weeks ago',
      crop: 'Tomato',
      disease: 'Aphids',
      severity: 'low',
      status: 'treated',
      confidence: 92
    },
  ]);

  const commonDiseases = [
    {
      name: 'Late Blight',
      crop: 'Tomato',
      frequency: 85,
      severity: 'high',
      season: 'Monsoon'
    },
    {
      name: 'Leaf Spot',
      crop: 'Wheat',
      frequency: 67,
      severity: 'medium',
      season: 'Winter'
    },
    {
      name: 'Aphids',
      crop: 'Various',
      frequency: 54,
      severity: 'low',
      season: 'Spring'
    },
  ];

  const cropOptions = ['Tomato', 'Wheat', 'Rice', 'Apple', 'Grapes', 'Capsicum', 'Cotton'];

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high': return 'text-red-600 bg-red-50';
      case 'medium': return 'text-yellow-600 bg-yellow-50';
      case 'low': return 'text-green-600 bg-green-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'treated': return 'text-green-600 bg-green-50';
      case 'pending': return 'text-red-600 bg-red-50';
      case 'monitoring': return 'text-blue-600 bg-blue-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 p-4 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h1 className="text-3xl font-bold text-gray-800 flex items-center justify-center">
            <Bug className="w-8 h-8 mr-3 text-red-600" />
            {t('diseaseManagement')}
          </h1>
          <p className="text-gray-600 mt-2">AI-powered disease detection and treatment recommendations</p>
        </motion.div>

        <Tabs defaultValue="scan" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="scan">AI Scanner</TabsTrigger>
            <TabsTrigger value="history">{t('history')}</TabsTrigger>
            <TabsTrigger value="common">{t('commonDiseases')}</TabsTrigger>
          </TabsList>

          <TabsContent value="scan" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Upload Section */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
              >
                <Card className="p-6 bg-white/80 backdrop-blur-lg border-0 shadow-xl">
                  <CardHeader className="px-0 pt-0">
                    <CardTitle className="flex items-center">
                      <Camera className="w-6 h-6 mr-2 text-blue-600" />
                      {t('uploadPhoto')}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="px-0">
                    <div className="space-y-4">
                      {!uploadedImage ? (
                        <div
                          className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-blue-400 transition-colors cursor-pointer"
                          onClick={() => document.getElementById('image-upload')?.click()}
                        >
                          <Upload className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                          <p className="text-gray-600 mb-2">{t('dragDrop')}</p>
                          <p className="text-sm text-gray-500">{t('formats')}</p>
                          <input
                            id="image-upload"
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) handleImageUpload(file);
                            }}
                          />
                        </div>
                      ) : (
                        <div className="relative">
                          <ImageWithFallback
                            src={uploadedImage}
                            alt="Uploaded crop"
                            className="w-full h-64 object-cover rounded-lg"
                          />
                          <Button
                            variant="secondary"
                            size="sm"
                            className="absolute top-3 right-3"
                            onClick={() => {
                              setUploadedImage(null);
                              setScanResult(null);
                              setIsScanning(false);
                            }}
                          >
                            <Upload className="w-4 h-4 mr-1" />
                            New Image
                          </Button>
                        </div>
                      )}

                      <div className="flex space-x-3">
                        <Button
                          className="flex-1 bg-gradient-to-r from-blue-500 to-cyan-500"
                          onClick={() => document.getElementById('image-upload')?.click()}
                        >
                          <Upload className="w-4 h-4 mr-2" />
                          {t('uploadPhoto')}
                        </Button>
                        <Button
                          variant="outline"
                          className="flex-1"
                          onClick={() => document.getElementById('image-upload')?.click()}
                        >
                          <Camera className="w-4 h-4 mr-2" />
                          {t('takePhoto')}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Results Section */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
              >
                <Card className="p-6 bg-white/80 backdrop-blur-lg border-0 shadow-xl">
                  <CardHeader className="px-0 pt-0">
                    <CardTitle className="flex items-center">
                      <Scan className="w-6 h-6 mr-2 text-green-600" />
                      {t('scanResults')}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="px-0">
                    <AnimatePresence mode="wait">
                      {isScanning ? (
                        <motion.div
                          key="scanning"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="text-center py-12"
                        >
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                            className="w-16 h-16 mx-auto mb-4"
                          >
                            <Zap className="w-16 h-16 text-blue-500" />
                          </motion.div>
                          <h3 className="text-lg font-semibold text-gray-800 mb-2">{t('scanning')}</h3>
                          <p className="text-gray-600">{t('aiAnalysis')}</p>
                          <Progress value={65} className="w-48 mx-auto mt-4" />
                        </motion.div>
                      ) : scanResult ? (
                        <motion.div
                          key="results"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="space-y-4"
                        >
                          <div className="flex items-center justify-between p-4 bg-gradient-to-r from-red-50 to-orange-50 rounded-lg">
                            <div className="flex items-center space-x-3">
                              <AlertTriangle className="w-8 h-8 text-red-600" />
                              <div>
                                <h3 className="text-lg font-semibold text-gray-800">{scanResult.disease}</h3>
                                <p className="text-sm text-gray-600">{scanResult.confidence}% {t('confidence')}</p>
                              </div>
                            </div>
                            <Badge className={getSeverityColor(scanResult.severity)}>
                              {t(scanResult.severity)} {t('severity')}
                            </Badge>
                          </div>

                          {scanResult.summary && (
                            <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                              <span className="font-semibold mr-1">{t('summary')}:</span>
                              {scanResult.summary}
                            </p>
                          )}

                          <div className="grid grid-cols-2 gap-4">
                            <div className="p-3 bg-gray-50 rounded-lg text-center">
                              <Target className="w-6 h-6 mx-auto text-gray-600 mb-1" />
                              <p className="text-sm text-gray-600">Affected Area</p>
                              <p className="text-xl font-bold text-gray-800">{scanResult.affected_area}%</p>
                            </div>
                            <div className="p-3 bg-gray-50 rounded-lg text-center">
                              <Shield className="w-6 h-6 mx-auto text-gray-600 mb-1" />
                              <p className="text-sm text-gray-600">{t('accuracy')}</p>
                              <p className="text-xl font-bold text-gray-800">{scanResult.confidence}%</p>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                            <div className="p-3 bg-white border rounded-lg">
                              <div className="font-semibold text-gray-700">{t('crop')}</div>
                              <div>{scanResult.crop || cropType}</div>
                            </div>
                            <div className="p-3 bg-white border rounded-lg">
                              <div className="font-semibold text-gray-700">{t('modelUsed')}</div>
                              <div className="truncate">{scanResult.model}</div>
                            </div>
                          </div>

                          <div className="flex space-x-2">
                            <Button size="sm" className="flex-1 bg-red-600 hover:bg-red-700">
                              <Target className="w-4 h-4 mr-1" />
                              {t('apply')}
                            </Button>
                            <Button size="sm" variant="outline">
                              <Download className="w-4 h-4 mr-1" />
                              {t('download')}
                            </Button>
                            <Button size="sm" variant="outline">
                              <Share2 className="w-4 h-4 mr-1" />
                              {t('share')}
                            </Button>
                          </div>
                        </motion.div>
                      ) : (
                        <motion.div
                          key="empty"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="text-center py-12"
                        >
                          <Leaf className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                          <p className="text-gray-500">Upload an image to start AI analysis</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                    {error && (
                      <div className="mt-4 p-4 border border-red-200 bg-red-50 rounded-lg text-sm text-red-700">
                        <div className="flex items-center mb-2">
                          <AlertTriangle className="w-4 h-4 mr-2" />
                          <span>{t('analysisError')}</span>
                        </div>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => startScanning(uploadedImage, { cropType })}
                          disabled={!uploadedImage || isScanning}
                        >
                          {t('retry')}
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Treatment Details */}
            {scanResult && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mt-6"
              >
                <Card className="p-6 bg-white/80 backdrop-blur-lg border-0 shadow-xl">
                  <CardHeader className="px-0 pt-0">
                    <CardTitle className="flex items-center">
                      <CheckCircle className="w-6 h-6 mr-2 text-green-600" />
                      {t('recommendations')}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="px-0">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="p-4 bg-gradient-to-r from-red-50 to-orange-50 rounded-lg">
                        <h4 className="font-semibold text-red-700 mb-3 flex items-center">
                          <Clock className="w-4 h-4 mr-2" />
                          {t('step1')}
                        </h4>
                        <ul className="space-y-2 text-sm">
                          {scanResult.treatment?.immediate?.map((step, index) => (
                            <li key={index} className="flex items-start">
                              <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-2 flex-shrink-0" />
                              {step}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg">
                        <h4 className="font-semibold text-blue-700 mb-3 flex items-center">
                          <Target className="w-4 h-4 mr-2" />
                          {t('step2')}
                        </h4>
                        <ul className="space-y-2 text-sm">
                          {scanResult.treatment?.treatment?.map((step, index) => (
                            <li key={index} className="flex items-start">
                              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-2 flex-shrink-0" />
                              {step}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg">
                        <h4 className="font-semibold text-green-700 mb-3 flex items-center">
                          <Shield className="w-4 h-4 mr-2" />
                          {t('step3')}
                        </h4>
                        <ul className="space-y-2 text-sm">
                          {scanResult.treatment?.prevention?.map((step, index) => (
                            <li key={index} className="flex items-start">
                              <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-2 flex-shrink-0" />
                              {step}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {scanResult?.pesticides?.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mt-6"
              >
                <Card className="p-6 bg-white/80 backdrop-blur-lg border-0 shadow-xl">
                  <CardHeader className="px-0 pt-0">
                    <CardTitle className="flex items-center">
                      <Shield className="w-6 h-6 mr-2 text-orange-600" />
                      {t('chemicalPlan')}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="px-0">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {scanResult.pesticides.map((item, index) => (
                        <div key={index} className="p-4 border rounded-lg bg-gradient-to-r from-white to-orange-50">
                          <h4 className="font-semibold text-gray-800">{item.name}</h4>
                          <p className="text-sm text-gray-600 mb-2">{item.type}</p>
                          <p className="text-sm text-gray-700"><span className="font-semibold">{t('dosage')}:</span> {item.dosage}</p>
                          {item.reEntryInterval && (
                            <p className="text-sm text-gray-700"><span className="font-semibold">{t('reEntry')}:</span> {item.reEntryInterval}</p>
                          )}
                        </div>
                      ))}
                    </div>
                    <p className="text-xs text-gray-500 mt-4">{t('knowledgeBase')}</p>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {scanResult?.organicAlternatives?.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-6"
              >
                <Card className="p-6 bg-white/80 backdrop-blur-lg border-0 shadow-xl">
                  <CardHeader className="px-0 pt-0">
                    <CardTitle className="flex items-center">
                      <Leaf className="w-6 h-6 mr-2 text-green-600" />
                      {t('organicPlan')}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="px-0">
                    <ul className="space-y-3 text-sm">
                      {scanResult.organicAlternatives.map((item, index) => (
                        <li key={index} className="p-3 bg-green-50 rounded-lg text-gray-700">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </TabsContent>

          <TabsContent value="history" className="mt-6">
            <Card className="p-6 bg-white/80 backdrop-blur-lg border-0 shadow-xl">
              <CardHeader className="px-0 pt-0">
                <CardTitle className="flex items-center">
                  <Clock className="w-6 h-6 mr-2 text-purple-600" />
                  {t('recentScans')}
                </CardTitle>
              </CardHeader>
              <CardContent className="px-0">
                <div className="space-y-4">
                  {scanHistory.map((scan, index) => (
                    <motion.div
                      key={scan.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                            <Leaf className="w-6 h-6 text-green-600" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-800">{scan.disease}</h4>
                            <p className="text-sm text-gray-600">{scan.crop} • {scan.date}</p>
                            <div className="flex items-center space-x-2 mt-1">
                              <Badge className={getSeverityColor(scan.severity)}>
                                {t(scan.severity)}
                              </Badge>
                              <Badge className={getStatusColor(scan.status)}>
                                {t(scan.status)}
                              </Badge>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-600">{t('confidence')}</p>
                          <p className="text-lg font-bold text-green-600">{scan.confidence}%</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="common" className="mt-6">
            <Card className="p-6 bg-white/80 backdrop-blur-lg border-0 shadow-xl">
              <CardHeader className="px-0 pt-0">
                <CardTitle className="flex items-center">
                  <TrendingUp className="w-6 h-6 mr-2 text-orange-600" />
                  {t('commonDiseases')}
                </CardTitle>
              </CardHeader>
              <CardContent className="px-0">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {commonDiseases.map((disease, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className="p-4 bg-gradient-to-r from-orange-50 to-red-50 rounded-lg"
                    >
                      <h4 className="font-semibold text-gray-800 mb-2">{disease.name}</h4>
                      <p className="text-sm text-gray-600 mb-3">{disease.crop} • {disease.season}</p>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Frequency</span>
                          <span>{disease.frequency}%</span>
                        </div>
                        <Progress value={disease.frequency} className="h-2" />
                        <Badge className={getSeverityColor(disease.severity)}>
                          {t(disease.severity)} {t('severity')}
                        </Badge>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}