import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  FileText, IndianRupee, Calendar, User, MapPin,
  CheckCircle, Clock, AlertTriangle, Download,
  ExternalLink, Search, Filter, Eye, ArrowRight,
  Users, Sprout, Shield, TrendingUp
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Textarea } from './ui/textarea';

export default function GovernmentSchemes({ language }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedScheme, setSelectedScheme] = useState(null);
  const [isApplicationOpen, setIsApplicationOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [applicationData, setApplicationData] = useState({
    personal: {
      fullName: '',
      fatherName: '',
      dateOfBirth: '',
      aadharNumber: '',
      mobileNumber: '',
      address: '',
      pincode: ''
    },
    farm: {
      farmSize: '',
      irrigationSource: '',
      cropTypes: ''
    },
    bank: {
      accountNumber: '',
      ifscCode: '',
      bankName: '',
      branchName: ''
    },
    documents: {
      aadhar: null,
      landRecords: null,
      bankPassbook: null,
      photo: null
    }
  });
  const [currentTab, setCurrentTab] = useState('personal');
  const [appliedSchemes, setAppliedSchemes] = useState(() => {
    const saved = localStorage.getItem('appliedSchemes');
    return saved ? JSON.parse(saved) : [];
  });

  const translations = {
    en: {
      governmentSchemes: 'Government Schemes',
      searchSchemes: 'Search schemes...',
      categories: 'Categories',
      all: 'All Schemes',
      subsidy: 'Subsidy',
      insurance: 'Insurance',
      loan: 'Loan',
      training: 'Training',
      technology: 'Technology',
      available: 'Available',
      applied: 'Applied',
      approved: 'Approved',
      rejected: 'Rejected',
      myApplications: 'My Applications',
      applyNow: 'Apply Now',
      viewDetails: 'View Details',
      downloadForm: 'Download Form',
      eligibility: 'Eligibility',
      benefits: 'Benefits',
      documents: 'Required Documents',
      applicationProcess: 'Application Process',
      deadline: 'Deadline',
      amount: 'Amount',
      beneficiaries: 'Beneficiaries',
      status: 'Status',
      pmKisan: 'PM-KISAN',
      pmKisanDesc: 'Direct income support to farmer families',
      soilHealth: 'Soil Health Card',
      soilHealthDesc: 'Free soil testing and nutrient management',
      cropInsurance: 'Pradhan Mantri Fasal Bima Yojana',
      cropInsuranceDesc: 'Crop insurance for risk management',
      kccScheme: 'Kisan Credit Card',
      kccSchemeDesc: 'Credit facility for agricultural needs',
      organicFarming: 'National Mission on Sustainable Agriculture',
      organicFarmingDesc: 'Promoting organic and sustainable farming',
      eligible: 'Eligible',
      notEligible: 'Not Eligible',
      pending: 'Pending',
      underReview: 'Under Review',
      completed: 'Completed',
      apply: 'Apply',
      track: 'Track Application',
      applicationId: 'Application ID',
      submittedOn: 'Submitted On',
      lastUpdated: 'Last Updated',
      nextStep: 'Next Step',
      applicationForm: 'Application Form',
      personalDetails: 'Personal Details',
      farmDetails: 'Farm Details',
      bankDetails: 'Bank Details',
      uploadDocuments: 'Upload Documents',
      submit: 'Submit Application',
      cancel: 'Cancel',
      fullName: 'Full Name',
      fatherName: "Father's Name",
      dateOfBirth: 'Date of Birth',
      aadharNumber: 'Aadhar Number',
      mobileNumber: 'Mobile Number',
      address: 'Address',
      pincode: 'Pincode',
      farmSize: 'Farm Size (in acres)',
      cropTypes: 'Crop Types',
      irrigationSource: 'Irrigation Source',
      accountNumber: 'Account Number',
      ifscCode: 'IFSC Code',
      bankName: 'Bank Name',
      branchName: 'Branch Name',
    },
    hi: {
      governmentSchemes: 'सरकारी योजनाएं',
      searchSchemes: 'योजनाएं खोजें...',
      categories: 'श्रेणियां',
      all: 'सभी योजनाएं',
      subsidy: 'सब्सिडी',
      insurance: 'बीमा',
      loan: 'ऋण',
      training: 'प्रशिक्षण',
      technology: 'तकनीक',
      available: 'उपलब्ध',
      applied: 'आवेदन दिया',
      approved: 'स्वीकृत',
      rejected: 'अस्वीकृत',
      myApplications: 'मेरे आवेदन',
      applyNow: 'अभी आवेदन करें',
      viewDetails: 'विवरण देखें',
      downloadForm: 'फॉर्म डाउनलोड करें',
      eligibility: 'पात्रता',
      benefits: 'लाभ',
      documents: 'आवश्यक दस्तावेज',
      applicationProcess: 'आवेदन प्रक्रिया',
      deadline: 'अंतिम तिथि',
      amount: 'राशि',
      beneficiaries: 'लाभार्थी',
      status: 'स्थिति',
      pmKisan: 'PM-किसान',
      pmKisanDesc: 'किसान परिवारों को प्रत्यक्ष आय सहायता',
      soilHealth: 'मृदा स्वास्थ्य कार्ड',
      soilHealthDesc: 'मुफ्त मिट्टी परीक्षण और पोषक तत्व प्रबंधन',
      cropInsurance: 'प्रधानमंत्री फसल बीमा योजना',
      cropInsuranceDesc: 'जोखिम प्रबंधन के लिए फसल बीमा',
      kccScheme: 'किसान क्रेडिट कार्ड',
      kccSchemeDesc: 'कृषि आवश्यकताओं के लिए क्रेडिट सुविधा',
      organicFarming: 'सतत कृषि पर राष्ट्रीय मिशन',
      organicFarmingDesc: 'जैविक और टिकाऊ खेती को बढ़ावा देना',
      eligible: 'पात्र',
      notEligible: 'अपात्र',
      pending: 'लंबित',
      underReview: 'समीक्षाधीन',
      completed: 'पूर्ण',
      apply: 'आवेदन करें',
      track: 'आवेदन ट्रैक करें',
      applicationId: 'आवेदन ID',
      submittedOn: 'जमा किया गया',
      lastUpdated: 'अंतिम अपडेट',
      nextStep: 'अगला कदम',
      applicationForm: 'आवेदन फॉर्म',
      personalDetails: 'व्यक्तिगत विवरण',
      farmDetails: 'खेत विवरण',
      bankDetails: 'बैंक विवरण',
      uploadDocuments: 'दस्तावेज अपलोड करें',
      submit: 'आवेदन जमा करें',
      cancel: 'रद्द करें',
      fullName: 'पूरा नाम',
      fatherName: 'पिता का नाम',
      dateOfBirth: 'जन्म तिथि',
      aadharNumber: 'आधार नंबर',
      mobileNumber: 'मोबाइल नंबर',
      address: 'पता',
      pincode: 'पिनकोड',
      farmSize: 'खेत का आकार (एकड़ में)',
      cropTypes: 'फसल के प्रकार',
      irrigationSource: 'सिंचाई का स्रोत',
      accountNumber: 'खाता संख्या',
      ifscCode: 'IFSC कोड',
      bankName: 'बैंक का नाम',
      branchName: 'शाखा का नाम',
    }
  };

  const t = (key) => translations[language][key] || translations.en[key] || key;

  const categories = [
    { id: 'all', label: t('all'), icon: FileText },
    { id: 'subsidy', label: t('subsidy'), icon: IndianRupee },
    { id: 'insurance', label: t('insurance'), icon: Shield },
    { id: 'loan', label: t('loan'), icon: TrendingUp },
    { id: 'training', label: t('training'), icon: Users },
    { id: 'technology', label: t('technology'), icon: Sprout },
  ];

  const schemes = [
    {
      id: 1,
      name: t('pmKisan'),
      description: t('pmKisanDesc'),
      category: 'subsidy',
      amount: '₹6,000/year',
      deadline: '31st March 2024',
      beneficiaries: '12 Crore+',
      status: 'available',
      eligibility: [
        'Small and marginal farmers',
        'Land ownership records required',
        'Valid Aadhar card'
      ],
      benefits: [
        '₹2,000 per installment',
        '3 installments per year',
        'Direct bank transfer'
      ],
      documents: [
        'Aadhar Card',
        'Bank Account Details',
        'Land Records',
        'Passport Size Photo'
      ],
      applicationStatus: appliedSchemes.find(app => app.schemeId === 1)?.status || null,
      appliedDate: appliedSchemes.find(app => app.schemeId === 1)?.date || null,
      icon: IndianRupee,
      color: 'green'
    },
    {
      id: 2,
      name: t('soilHealth'),
      description: t('soilHealthDesc'),
      category: 'technology',
      amount: 'Free',
      deadline: 'Ongoing',
      beneficiaries: '18 Crore+',
      status: 'available',
      eligibility: [
        'All farmers',
        'Valid land records',
        'Soil samples required'
      ],
      benefits: [
        'Free soil testing',
        'Nutrient recommendations',
        'Fertilizer guidance'
      ],
      documents: [
        'Land Records',
        'Aadhar Card',
        'Application Form'
      ],
      applicationStatus: appliedSchemes.find(app => app.schemeId === 2)?.status || null,
      appliedDate: appliedSchemes.find(app => app.schemeId === 2)?.date || null,
      icon: Sprout,
      color: 'blue'
    },
    {
      id: 3,
      name: t('cropInsurance'),
      description: t('cropInsuranceDesc'),
      category: 'insurance',
      amount: 'Premium: 2% for Kharif',
      deadline: '15th July 2024',
      beneficiaries: '5.5 Crore+',
      status: 'available',
      eligibility: [
        'All farmers',
        'Crop cultivation proof',
        'Bank account required'
      ],
      benefits: [
        'Crop loss compensation',
        'Weather risk coverage',
        'Low premium rates'
      ],
      documents: [
        'Aadhar Card',
        'Bank Details',
        'Land Records',
        'Crop Details'
      ],
      applicationStatus: appliedSchemes.find(app => app.schemeId === 3)?.status || null,
      appliedDate: appliedSchemes.find(app => app.schemeId === 3)?.date || null,
      icon: Shield,
      color: 'orange'
    },
    {
      id: 4,
      name: t('kccScheme'),
      description: t('kccSchemeDesc'),
      category: 'loan',
      amount: 'Up to ₹3 Lakh',
      deadline: 'Ongoing',
      beneficiaries: '7 Crore+',
      status: 'available',
      eligibility: [
        'Farmers with cultivable land',
        'Good credit history',
        'Age: 18-75 years'
      ],
      benefits: [
        'Flexible credit limit',
        'Low interest rates',
        'No collateral required'
      ],
      documents: [
        'Aadhar Card',
        'Pan Card',
        'Land Documents',
        'Income Proof'
      ],
      applicationStatus: appliedSchemes.find(app => app.schemeId === 4)?.status || null,
      appliedDate: appliedSchemes.find(app => app.schemeId === 4)?.date || null,
      icon: TrendingUp,
      color: 'purple'
    },
  ];

  const handleInputChange = (section, field, value) => {
    setApplicationData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleFileUpload = (docType, file) => {
    setApplicationData(prev => ({
      ...prev,
      documents: {
        ...prev.documents,
        [docType]: file
      }
    }));
  };

  const validateForm = () => {
    const { personal, farm, bank } = applicationData;
    
    // Validate personal details
    if (!personal.fullName || !personal.aadharNumber || !personal.mobileNumber) {
      alert('Please fill all required personal details');
      setCurrentTab('personal');
      return false;
    }

    // Validate Aadhar number (12 digits)
    if (!/^\d{12}$/.test(personal.aadharNumber)) {
      alert('Please enter a valid 12-digit Aadhar number');
      setCurrentTab('personal');
      return false;
    }

    // Validate mobile number (10 digits)
    if (!/^\d{10}$/.test(personal.mobileNumber)) {
      alert('Please enter a valid 10-digit mobile number');
      setCurrentTab('personal');
      return false;
    }

    // Validate farm details
    if (!farm.farmSize || !farm.irrigationSource) {
      alert('Please fill all required farm details');
      setCurrentTab('farm');
      return false;
    }

    // Validate bank details
    if (!bank.accountNumber || !bank.ifscCode || !bank.bankName) {
      alert('Please fill all required bank details');
      setCurrentTab('bank');
      return false;
    }

    // Validate IFSC code format
    if (!/^[A-Z]{4}0[A-Z0-9]{6}$/.test(bank.ifscCode)) {
      alert('Please enter a valid IFSC code');
      setCurrentTab('bank');
      return false;
    }

    return true;
  };

  const handleSubmitApplication = async () => {
    if (!validateForm()) {
      return;
    }

    setSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      const newApplication = {
        schemeId: selectedScheme?.id || schemes[0].id,
        schemeName: selectedScheme?.name || schemes[0].name,
        status: 'applied',
        date: new Date().toISOString(),
        applicationId: `APP${Date.now()}`,
        data: applicationData
      };

      const updated = [...appliedSchemes, newApplication];
      setAppliedSchemes(updated);
      localStorage.setItem('appliedSchemes', JSON.stringify(updated));

      alert('Application submitted successfully! Application ID: ' + newApplication.applicationId);
      
      // Reset form
      setApplicationData({
        personal: {
          fullName: '',
          fatherName: '',
          dateOfBirth: '',
          aadharNumber: '',
          mobileNumber: '',
          address: '',
          pincode: ''
        },
        farm: {
          farmSize: '',
          irrigationSource: '',
          cropTypes: ''
        },
        bank: {
          accountNumber: '',
          ifscCode: '',
          bankName: '',
          branchName: ''
        },
        documents: {
          aadhar: null,
          landRecords: null,
          bankPassbook: null,
          photo: null
        }
      });
      setCurrentTab('personal');
      setIsApplicationOpen(false);
    } catch (error) {
      alert('Error submitting application. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'applied': return 'text-blue-600 bg-blue-50';
      case 'approved': return 'text-green-600 bg-green-50';
      case 'rejected': return 'text-red-600 bg-red-50';
      case 'pending': return 'text-yellow-600 bg-yellow-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const SchemeCard = ({ scheme, index }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ scale: 1.02, y: -5 }}
      className="group cursor-pointer"
    >
      <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
        <div className={`h-2 bg-gradient-to-r from-${scheme.color}-500 to-${scheme.color}-600`} />
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className={`w-12 h-12 rounded-lg bg-${scheme.color}-100 flex items-center justify-center`}>
                <scheme.icon className={`w-6 h-6 text-${scheme.color}-600`} />
              </div>
              <div>
                <h3 className="font-semibold text-lg text-gray-800">{scheme.name}</h3>
                <p className="text-sm text-gray-600">{scheme.description}</p>
              </div>
            </div>
            {scheme.applicationStatus && (
              <Badge className={getStatusColor(scheme.applicationStatus)}>
                {t(scheme.applicationStatus)}
              </Badge>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <p className="text-sm text-gray-600">{t('amount')}</p>
              <p className="font-semibold text-gray-800">{scheme.amount}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">{t('deadline')}</p>
              <p className="font-semibold text-gray-800">{scheme.deadline}</p>
            </div>
          </div>

          <div className="mb-4">
            <p className="text-sm text-gray-600 mb-1">{t('beneficiaries')}</p>
            <div className="flex items-center space-x-2">
              <Users className="w-4 h-4 text-gray-500" />
              <span className="font-semibold text-gray-800">{scheme.beneficiaries}</span>
            </div>
          </div>

          <div className="flex space-x-2">
            {!scheme.applicationStatus ? (
              <Button
                className={`flex-1 bg-gradient-to-r from-${scheme.color}-500 to-${scheme.color}-600 hover:from-${scheme.color}-600 hover:to-${scheme.color}-700`}
                onClick={() => setIsApplicationOpen(true)}
              >
                {t('applyNow')}
              </Button>
            ) : (
              <Button variant="outline" className="flex-1">
                {t('track')}
              </Button>
            )}
            <Button
              variant="outline"
              onClick={() => setSelectedScheme(scheme)}
            >
              <Eye className="w-4 h-4 mr-1" />
              {t('viewDetails')}
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );

  const SchemeDetailsModal = () => (
    <Dialog open={!!selectedScheme} onOpenChange={() => setSelectedScheme(null)}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        {selectedScheme && (
          <>
            <DialogHeader>
              <DialogTitle className="flex items-center">
                <selectedScheme.icon className={`w-6 h-6 mr-2 text-${selectedScheme.color}-600`} />
                {selectedScheme.name}
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-gray-50 rounded-lg text-center">
                  <IndianRupee className="w-6 h-6 mx-auto text-green-600 mb-2" />
                  <p className="text-sm text-gray-600">{t('amount')}</p>
                  <p className="font-semibold">{selectedScheme.amount}</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg text-center">
                  <Calendar className="w-6 h-6 mx-auto text-blue-600 mb-2" />
                  <p className="text-sm text-gray-600">{t('deadline')}</p>
                  <p className="font-semibold">{selectedScheme.deadline}</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg text-center">
                  <Users className="w-6 h-6 mx-auto text-purple-600 mb-2" />
                  <p className="text-sm text-gray-600">{t('beneficiaries')}</p>
                  <p className="font-semibold">{selectedScheme.beneficiaries}</p>
                </div>
              </div>

              <Tabs defaultValue="eligibility" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="eligibility">{t('eligibility')}</TabsTrigger>
                  <TabsTrigger value="benefits">{t('benefits')}</TabsTrigger>
                  <TabsTrigger value="documents">{t('documents')}</TabsTrigger>
                  <TabsTrigger value="process">{t('applicationProcess')}</TabsTrigger>
                </TabsList>

                <TabsContent value="eligibility" className="mt-4">
                  <ul className="space-y-2">
                    {selectedScheme.eligibility.map((item, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </TabsContent>

                <TabsContent value="benefits" className="mt-4">
                  <ul className="space-y-2">
                    {selectedScheme.benefits.map((item, index) => (
                      <li key={index} className="flex items-start">
                        <ArrowRight className="w-5 h-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </TabsContent>

                <TabsContent value="documents" className="mt-4">
                  <ul className="space-y-2">
                    {selectedScheme.documents.map((item, index) => (
                      <li key={index} className="flex items-start">
                        <FileText className="w-5 h-5 text-orange-600 mr-2 mt-0.5 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </TabsContent>

                <TabsContent value="process" className="mt-4">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                      <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold">1</div>
                      <span>Fill application form with required details</span>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                      <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold">2</div>
                      <span>Upload necessary documents</span>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                      <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold">3</div>
                      <span>Submit application online</span>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                      <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold">4</div>
                      <span>Track application status</span>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>

              <div className="flex space-x-3">
                {!selectedScheme.applicationStatus && (
                  <Button
                    className={`bg-gradient-to-r from-${selectedScheme.color}-500 to-${selectedScheme.color}-600`}
                    onClick={() => {
                      setSelectedScheme(null);
                      setIsApplicationOpen(true);
                    }}
                  >
                    {t('applyNow')}
                  </Button>
                )}
                <Button variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  {t('downloadForm')}
                </Button>
                <Button variant="outline">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Official Website
                </Button>
              </div>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );

  const ApplicationModal = () => (
    <Dialog open={isApplicationOpen} onOpenChange={setIsApplicationOpen}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <FileText className="w-6 h-6 mr-2 text-green-600" />
            {t('applicationForm')}
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="personal" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="personal">{t('personalDetails')}</TabsTrigger>
            <TabsTrigger value="farm">{t('farmDetails')}</TabsTrigger>
            <TabsTrigger value="bank">{t('bankDetails')}</TabsTrigger>
            <TabsTrigger value="documents">{t('uploadDocuments')}</TabsTrigger>
          </TabsList>

          <TabsContent value="personal" className="mt-6 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="fullName">{t('fullName')} *</Label>
                <Input 
                  id="fullName"
                  value={applicationData.personal.fullName}
                  onChange={(e) => handleInputChange('personal', 'fullName', e.target.value)}
                  placeholder="Enter your full name"
                />
              </div>
              <div>
                <Label htmlFor="fatherName">{t('fatherName')}</Label>
                <Input 
                  id="fatherName"
                  value={applicationData.personal.fatherName}
                  onChange={(e) => handleInputChange('personal', 'fatherName', e.target.value)}
                  placeholder="Enter father's name"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="dateOfBirth">{t('dateOfBirth')}</Label>
                <Input 
                  id="dateOfBirth" 
                  type="date"
                  value={applicationData.personal.dateOfBirth}
                  onChange={(e) => handleInputChange('personal', 'dateOfBirth', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="aadharNumber">{t('aadharNumber')} *</Label>
                <Input 
                  id="aadharNumber"
                  value={applicationData.personal.aadharNumber}
                  onChange={(e) => handleInputChange('personal', 'aadharNumber', e.target.value)}
                  placeholder="12-digit Aadhar number"
                  maxLength={12}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="mobileNumber">{t('mobileNumber')} *</Label>
                <Input 
                  id="mobileNumber"
                  value={applicationData.personal.mobileNumber}
                  onChange={(e) => handleInputChange('personal', 'mobileNumber', e.target.value)}
                  placeholder="10-digit mobile number"
                  maxLength={10}
                />
              </div>
              <div>
                <Label htmlFor="pincode">{t('pincode')}</Label>
                <Input 
                  id="pincode"
                  value={applicationData.personal.pincode}
                  onChange={(e) => handleInputChange('personal', 'pincode', e.target.value)}
                  placeholder="Enter pincode"
                  maxLength={6}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="address">{t('address')}</Label>
              <Textarea 
                id="address" 
                rows={3}
                value={applicationData.personal.address}
                onChange={(e) => handleInputChange('personal', 'address', e.target.value)}
                placeholder="Enter your address"
              />
            </div>
          </TabsContent>

          <TabsContent value="farm" className="mt-6 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="farmSize">{t('farmSize')} *</Label>
                <Input 
                  id="farmSize" 
                  type="number"
                  value={applicationData.farm.farmSize}
                  onChange={(e) => handleInputChange('farm', 'farmSize', e.target.value)}
                  placeholder="Enter farm size in acres"
                  min="0"
                  step="0.01"
                />
              </div>
              <div>
                <Label htmlFor="irrigationSource">{t('irrigationSource')} *</Label>
                <Select
                  value={applicationData.farm.irrigationSource}
                  onValueChange={(value) => handleInputChange('farm', 'irrigationSource', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select source" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="borewell">Borewell</SelectItem>
                    <SelectItem value="canal">Canal</SelectItem>
                    <SelectItem value="river">River</SelectItem>
                    <SelectItem value="rain">Rain Fed</SelectItem>
                    <SelectItem value="drip">Drip Irrigation</SelectItem>
                    <SelectItem value="pond">Pond/Tank</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label htmlFor="cropTypes">{t('cropTypes')}</Label>
              <Textarea 
                id="cropTypes" 
                rows={2} 
                placeholder="e.g., Wheat, Rice, Tomato"
                value={applicationData.farm.cropTypes}
                onChange={(e) => handleInputChange('farm', 'cropTypes', e.target.value)}
              />
            </div>
          </TabsContent>

          <TabsContent value="bank" className="mt-6 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="accountNumber">{t('accountNumber')} *</Label>
                <Input 
                  id="accountNumber"
                  value={applicationData.bank.accountNumber}
                  onChange={(e) => handleInputChange('bank', 'accountNumber', e.target.value)}
                  placeholder="Enter account number"
                />
              </div>
              <div>
                <Label htmlFor="ifscCode">{t('ifscCode')} *</Label>
                <Input 
                  id="ifscCode"
                  value={applicationData.bank.ifscCode}
                  onChange={(e) => handleInputChange('bank', 'ifscCode', e.target.value.toUpperCase())}
                  placeholder="e.g., SBIN0001234"
                  maxLength={11}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="bankName">{t('bankName')} *</Label>
                <Input 
                  id="bankName"
                  value={applicationData.bank.bankName}
                  onChange={(e) => handleInputChange('bank', 'bankName', e.target.value)}
                  placeholder="Enter bank name"
                />
              </div>
              <div>
                <Label htmlFor="branchName">{t('branchName')}</Label>
                <Input 
                  id="branchName"
                  value={applicationData.bank.branchName}
                  onChange={(e) => handleInputChange('bank', 'branchName', e.target.value)}
                  placeholder="Enter branch name"
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="documents" className="mt-6 space-y-4">
            <div className="space-y-4">
              {[
                { id: 'aadhar', label: 'Aadhar Card', required: true },
                { id: 'landRecords', label: 'Land Records', required: false },
                { id: 'bankPassbook', label: 'Bank Passbook', required: false },
                { id: 'photo', label: 'Passport Photo', required: false }
              ].map(doc => (
                <div key={doc.id} className="space-y-2">
                  <Label htmlFor={doc.id}>
                    {doc.label} {doc.required && <span className="text-red-500">*</span>}
                  </Label>
                  <div className="flex items-center gap-4">
                    <Input
                      id={doc.id}
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={(e) => handleFileUpload(doc.id, e.target.files[0])}
                      className="flex-1"
                    />
                    {applicationData.documents[doc.id] && (
                      <div className="flex items-center gap-2 text-green-600">
                        <CheckCircle className="w-5 h-5" />
                        <span className="text-sm">{applicationData.documents[doc.id].name}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
              <p className="text-sm text-gray-500">
                Accepted formats: PDF, JPG, PNG (Max 5MB per file)
              </p>
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end space-x-3 mt-6">
          <Button variant="outline" onClick={() => setIsApplicationOpen(false)}>
            {t('cancel')}
          </Button>
          <Button 
            className="bg-gradient-to-r from-green-500 to-emerald-500"
            onClick={handleSubmitApplication}
            disabled={submitting}
          >
            {submitting ? 'Submitting...' : t('submit')}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h1 className="text-3xl font-bold text-gray-800 flex items-center justify-center">
            <FileText className="w-8 h-8 mr-3 text-blue-600" />
            {t('governmentSchemes')}
          </h1>
          <p className="text-gray-600 mt-2">Discover and apply for government farming schemes</p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="p-6 bg-white/80 backdrop-blur-lg border-0 shadow-lg">
            <div className="flex flex-col lg:flex-row items-center space-y-4 lg:space-y-0 lg:space-x-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  placeholder={t('searchSchemes')}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              <div className="flex items-center space-x-3">
                {categories.map((category) => (
                  <Button
                    key={category.id}
                    variant={selectedCategory === category.id ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedCategory(category.id)}
                    className={selectedCategory === category.id ? 'bg-blue-600 hover:bg-blue-700' : ''}
                  >
                    <category.icon className="w-4 h-4 mr-1" />
                    {category.label}
                  </Button>
                ))}
              </div>
            </div>
          </Card>
        </motion.div>

        <Tabs defaultValue="available" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="available">{t('available')} ({schemes.length})</TabsTrigger>
            <TabsTrigger value="applications">{t('myApplications')} ({appliedSchemes.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="available" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {schemes
                .filter(scheme =>
                  (selectedCategory === 'all' || scheme.category === selectedCategory) &&
                  (searchTerm === '' || scheme.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                   scheme.description.toLowerCase().includes(searchTerm.toLowerCase()))
                )
                .map((scheme, index) => (
                  <SchemeCard key={scheme.id} scheme={scheme} index={index} />
                ))}
            </div>
          </TabsContent>

          <TabsContent value="applications" className="mt-6">
            <div className="space-y-4">
              {appliedSchemes.map((application, index) => (
                <motion.div
                  key={application.applicationId}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="p-6 bg-white/80 backdrop-blur-lg border-0 shadow-lg">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center">
                          <FileText className="w-6 h-6 text-green-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-800">{application.schemeName}</h4>
                          <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                            <span>{t('applicationId')}: {application.applicationId}</span>
                            <span>{t('submittedOn')}: {new Date(application.date).toLocaleDateString('en-IN', { 
                              day: 'numeric', 
                              month: 'short', 
                              year: 'numeric' 
                            })}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge className={getStatusColor(application.status)}>
                          {t(application.status)}
                        </Badge>
                      </div>
                    </div>

                    {application.status === 'applied' && (
                      <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                        <div className="flex justify-between text-sm mb-2">
                          <span>{t('progress')}</span>
                          <span>20%</span>
                        </div>
                        <Progress value={20} className="h-2" />
                        <p className="text-xs text-blue-600 mt-2">{t('nextStep')}: Document verification pending</p>
                      </div>
                    )}

                    {/* Application Details */}
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-gray-600">Applicant Name</p>
                          <p className="font-semibold">{application.data.personal.fullName}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Mobile Number</p>
                          <p className="font-semibold">{application.data.personal.mobileNumber}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Farm Size</p>
                          <p className="font-semibold">{application.data.farm.farmSize} acres</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Irrigation Source</p>
                          <p className="font-semibold">{application.data.farm.irrigationSource}</p>
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}

              {appliedSchemes.length === 0 && (
                <div className="text-center py-12">
                  <FileText className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                  <h3 className="text-xl font-semibold text-gray-600 mb-2">No applications yet</h3>
                  <p className="text-gray-500">Start applying for schemes to see them here</p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>

        <SchemeDetailsModal />
        <ApplicationModal />
      </div>
    </div>
  );
}