import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import {
  User, Edit3, Save, Camera, MapPin, Phone, Mail,
  Calendar, Award, Star, Shield, Verified, Upload,
  CreditCard, Bell, Lock, Globe, Eye, EyeOff
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Switch } from './ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Separator } from './ui/separator';
import { Progress } from './ui/progress';

export default function Profile({ user, language, userRole }) {
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('general');
  const [showPassword, setShowPassword] = useState(false);
  const [photoPreview, setPhotoPreview] = useState(null);
  const fileInputRef = React.useRef(null);

  const getDefaultBio = () =>
    user?.bio ||
    (userRole === 'farmer'
      ? 'Organic farmer passionate about sustainable agriculture.'
      : 'Buyer focusing on building reliable agri supply chains.');

  const getDisplayName = () =>
    user?.name ||
    user?.username ||
    (user?.email ? user.email.split('@')[0] : 'AgriConnect User');

  const getInitialProfileData = () => ({
    name: getDisplayName(),
    email: user?.email || '',
    phone: user?.phone && user.phone !== 'Not specified' ? user.phone : '',
    location: user?.location && user.location !== 'Not specified' ? user.location : '',
    bio: getDefaultBio(),
    farmSize: userRole === 'farmer' ? user?.farmSize || '' : null,
    crops: userRole === 'farmer' ? user?.crops || [] : null,
    companyName: userRole === 'buyer' ? user?.companyName || '' : null,
    businessType: userRole === 'buyer' ? user?.businessType || '' : null,
    avatar: user?.avatar || null,
  });

  const [profileData, setProfileData] = useState(getInitialProfileData);

  useEffect(() => {
    setProfileData(getInitialProfileData());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, userRole]);

  const translations = {
    en: {
      profile: 'Profile',
      editProfile: 'Edit Profile',
      saveChanges: 'Save Changes',
      cancel: 'Cancel',
      general: 'General',
      security: 'Security',
      notifications: 'Notifications',
      preferences: 'Preferences',
      personalInfo: 'Personal Information',
      contactInfo: 'Contact Information',
      farmDetails: 'Farm Details',
      businessDetails: 'Business Details',
      verificationStatus: 'Verification Status',
      accountSecurity: 'Account Security',
      notificationSettings: 'Notification Settings',
      languageRegion: 'Language & Region',
      fullName: 'Full Name',
      emailAddress: 'Email Address',
      phoneNumber: 'Phone Number',
      location: 'Location',
      bio: 'Bio',
      farmSize: 'Farm Size',
      primaryCrops: 'Primary Crops',
      companyName: 'Company Name',
      businessType: 'Business Type',
      joinedDate: 'Joined',
      verified: 'Verified',
      pending: 'Pending',
      changePassword: 'Change Password',
      currentPassword: 'Current Password',
      newPassword: 'New Password',
      confirmPassword: 'Confirm Password',
      twoFactor: 'Two-Factor Authentication',
      emailNotifications: 'Email Notifications',
      pushNotifications: 'Push Notifications',
      marketingEmails: 'Marketing Emails',
      orderUpdates: 'Order Updates',
      priceAlerts: 'Price Alerts',
      weatherAlerts: 'Weather Alerts',
      language: 'Language',
      timezone: 'Timezone',
      currency: 'Currency',
      profileCompletion: 'Profile Completion',
      uploadPhoto: 'Upload Photo',
      removePhoto: 'Remove Photo',
    },
    hi: {
      profile: 'प्रोफाइल',
      editProfile: 'प्रोफाइल संपादित करें',
      saveChanges: 'परिवर्तन सहेजें',
      cancel: 'रद्द करें',
      general: 'सामान्य',
      security: 'सुरक्षा',
      notifications: 'सूचनाएं',
      preferences: 'प्राथमिकताएं',
      personalInfo: 'व्यक्तिगत जानकारी',
      contactInfo: 'संपर्क जानकारी',
      farmDetails: 'खेत का विवरण',
      businessDetails: 'व्यापार विवरण',
      verificationStatus: 'सत्यापन स्थिति',
      accountSecurity: 'खाता सुरक्षा',
      notificationSettings: 'सूचना सेटिंग्स',
      languageRegion: 'भाषा और क्षेत्र',
      fullName: 'पूरा नाम',
      emailAddress: 'ईमेल पता',
      phoneNumber: 'फोन नंबर',
      location: 'स्थान',
      bio: 'बायो',
      farmSize: 'खेत का आकार',
      primaryCrops: 'मुख्य फसलें',
      companyName: 'कंपनी का नाम',
      businessType: 'व्यापार प्रकार',
      joinedDate: 'शामिल हुए',
      verified: 'सत्यापित',
      pending: 'लंबित',
      changePassword: 'पासवर्ड बदलें',
      currentPassword: 'वर्तमान पासवर्ड',
      newPassword: 'नया पासवर्ड',
      confirmPassword: 'पासवर्ड की पुष्टि करें',
      twoFactor: 'द्विकारक प्रमाणीकरण',
      emailNotifications: 'ईमेल सूचनाएं',
      pushNotifications: 'पुश सूचनाएं',
      marketingEmails: 'मार्केटिंग ईमेल',
      orderUpdates: 'ऑर्डर अपडेट',
      priceAlerts: 'मूल्य अलर्ट',
      weatherAlerts: 'मौसम अलर्ट',
      language: 'भाषा',
      timezone: 'समय क्षेत्र',
      currency: 'मुद्रा',
      profileCompletion: 'प्रोफाइल पूर्णता',
      uploadPhoto: 'फोटो अपलोड करें',
      removePhoto: 'फोटो हटाएं',
    }
  };

  const t = (key) => translations[language][key] || translations.en[key] || key;

  const calculateProfileCompletion = () => {
    const fields = ['name', 'email', 'phone', 'location', 'bio'];
    if (userRole === 'farmer') {
      fields.push('farmSize');
    } else {
      fields.push('companyName', 'businessType');
    }

    const completed = fields.filter(field => profileData[field] && profileData[field].trim() !== '').length;
    return Math.round((completed / fields.length) * 100);
  };

  const handleSave = () => {
    // Handle save logic here
    if (photoPreview) {
      setProfileData({ ...profileData, avatar: photoPreview });
    }
    setIsEditing(false);
    setPhotoPreview(null);
  };

  const handlePhotoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        alert('File size should be less than 5MB');
        return;
      }
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemovePhoto = () => {
    setPhotoPreview(null);
    setProfileData({ ...profileData, avatar: null });
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleCameraClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const ProfileHeader = () => (
    <Card className="mb-6">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6">
          {/* Avatar */}
          <div className="relative">
            <Avatar className="w-32 h-32 border-4 border-white shadow-lg">
              <AvatarImage src={photoPreview || profileData.avatar} />
              <AvatarFallback className="text-2xl bg-gradient-to-br from-blue-400 to-purple-500 text-white">
                {profileData.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            {isEditing && (
              <>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="hidden"
                />
                <Button
                  size="sm"
                  className="absolute bottom-0 right-0 rounded-full w-10 h-10 p-0 bg-blue-600 hover:bg-blue-700"
                  onClick={handleCameraClick}
                  type="button"
                >
                  <Camera className="w-4 h-4" />
                </Button>
              </>
            )}
          </div>

          {/* User Info */}
          <div className="flex-1 text-center md:text-left space-y-2">
            <div className="flex items-center justify-center md:justify-start space-x-2">
              <h1 className="text-2xl font-bold">{profileData.name}</h1>
              <Badge className="bg-green-100 text-green-700">
                <Verified className="w-3 h-3 mr-1" />
                {t('verified')}
              </Badge>
            </div>

            <div className="flex items-center justify-center md:justify-start space-x-4 text-gray-600">
              <div className="flex items-center">
                <MapPin className="w-4 h-4 mr-1" />
                <span>{profileData.location}</span>
              </div>
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-1" />
                <span>{t('joinedDate')}: Jan 2023</span>
              </div>
            </div>

            <p className="text-gray-600 max-w-2xl">{profileData.bio}</p>

            {/* Photo Upload Buttons - Show when editing */}
            {isEditing && (
              <div className="flex justify-center md:justify-start gap-2 mt-3">
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={handleCameraClick}
                  className="gap-2"
                >
                  <Upload className="w-4 h-4" />
                  {t('uploadPhoto')}
                </Button>
                {(photoPreview || profileData.avatar) && (
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={handleRemovePhoto}
                    className="gap-2 text-red-600 hover:text-red-700"
                  >
                    <User className="w-4 h-4" />
                    {t('removePhoto')}
                  </Button>
                )}
              </div>
            )}

            {/* Stats */}
            <div className="flex justify-center md:justify-start space-x-6 mt-4">
              <div className="text-center">
                <div className="text-xl font-bold text-green-600">4.8</div>
                <div className="text-sm text-gray-500">Rating</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-blue-600">156</div>
                <div className="text-sm text-gray-500">
                  {userRole === 'farmer' ? 'Sales' : 'Purchases'}
                </div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-purple-600">3.2k</div>
                <div className="text-sm text-gray-500">Reviews</div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col space-y-2">
            {!isEditing ? (
              <Button onClick={() => setIsEditing(true)}>
                <Edit3 className="w-4 h-4 mr-2" />
                {t('editProfile')}
              </Button>
            ) : (
              <div className="flex space-x-2">
                <Button onClick={handleSave}>
                  <Save className="w-4 h-4 mr-2" />
                  {t('saveChanges')}
                </Button>
                <Button variant="outline" onClick={() => setIsEditing(false)}>
                  {t('cancel')}
                </Button>
              </div>
            )}

            {/* Profile Completion */}
            <div className="w-48">
              <div className="flex justify-between text-sm mb-1">
                <span>{t('profileCompletion')}</span>
                <span>{calculateProfileCompletion()}%</span>
              </div>
              <Progress value={calculateProfileCompletion()} className="h-2" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const GeneralTab = () => (
    <div className="space-y-6">
      {/* Personal Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <User className="w-5 h-5 mr-2" />
            {t('personalInfo')}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">{t('fullName')}</Label>
              <Input
                id="name"
                value={profileData.name}
                onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                disabled={!isEditing}
              />
            </div>
            <div>
              <Label htmlFor="email">{t('emailAddress')}</Label>
              <Input
                id="email"
                type="email"
                value={profileData.email}
                onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                disabled={!isEditing}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="phone">{t('phoneNumber')}</Label>
              <Input
                id="phone"
                value={profileData.phone}
                onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                disabled={!isEditing}
              />
            </div>
            <div>
              <Label htmlFor="location">{t('location')}</Label>
              <Input
                id="location"
                value={profileData.location}
                onChange={(e) => setProfileData({ ...profileData, location: e.target.value })}
                disabled={!isEditing}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="bio">{t('bio')}</Label>
            <Textarea
              id="bio"
              value={profileData.bio}
              onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
              disabled={!isEditing}
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      {/* Role-specific Information */}
      {userRole === 'farmer' ? (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Award className="w-5 h-5 mr-2" />
              {t('farmDetails')}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="farmSize">{t('farmSize')}</Label>
                <Input
                  id="farmSize"
                  value={profileData.farmSize}
                  onChange={(e) => setProfileData({ ...profileData, farmSize: e.target.value })}
                  disabled={!isEditing}
                />
              </div>
              <div>
                <Label htmlFor="crops">{t('primaryCrops')}</Label>
                <Input
                  id="crops"
                  value={profileData.crops?.join(', ')}
                  onChange={(e) => setProfileData({ ...profileData, crops: e.target.value.split(', ') })}
                  disabled={!isEditing}
                  placeholder="Tomatoes, Wheat, Onions"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <CreditCard className="w-5 h-5 mr-2" />
              {t('businessDetails')}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="companyName">{t('companyName')}</Label>
                <Input
                  id="companyName"
                  value={profileData.companyName}
                  onChange={(e) => setProfileData({ ...profileData, companyName: e.target.value })}
                  disabled={!isEditing}
                />
              </div>
              <div>
                <Label htmlFor="businessType">{t('businessType')}</Label>
                <Select
                  value={profileData.businessType}
                  onValueChange={(value) => setProfileData({ ...profileData, businessType: value })}
                  disabled={!isEditing}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="retail">Retail Chain</SelectItem>
                    <SelectItem value="wholesale">Wholesale</SelectItem>
                    <SelectItem value="distributor">Distributor</SelectItem>
                    <SelectItem value="processor">Food Processor</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );

  const SecurityTab = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Lock className="w-5 h-5 mr-2" />
            {t('changePassword')}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="currentPassword">{t('currentPassword')}</Label>
            <div className="relative">
              <Input
                id="currentPassword"
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter current password"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </Button>
            </div>
          </div>
          <div>
            <Label htmlFor="newPassword">{t('newPassword')}</Label>
            <Input
              id="newPassword"
              type="password"
              placeholder="Enter new password"
            />
          </div>
          <div>
            <Label htmlFor="confirmPassword">{t('confirmPassword')}</Label>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="Confirm new password"
            />
          </div>
          <Button>Update Password</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Shield className="w-5 h-5 mr-2" />
            {t('twoFactor')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Two-Factor Authentication</h4>
              <p className="text-sm text-gray-500">Add an extra layer of security to your account</p>
            </div>
            <Switch />
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const NotificationsTab = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Bell className="w-5 h-5 mr-2" />
            {t('notificationSettings')}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">{t('emailNotifications')}</h4>
              <p className="text-sm text-gray-500">Receive notifications via email</p>
            </div>
            <Switch defaultChecked />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">{t('pushNotifications')}</h4>
              <p className="text-sm text-gray-500">Receive push notifications on your device</p>
            </div>
            <Switch defaultChecked />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">{t('orderUpdates')}</h4>
              <p className="text-sm text-gray-500">Get notified about order status changes</p>
            </div>
            <Switch defaultChecked />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">{t('priceAlerts')}</h4>
              <p className="text-sm text-gray-500">Receive alerts when prices change</p>
            </div>
            <Switch />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">{t('weatherAlerts')}</h4>
              <p className="text-sm text-gray-500">Get weather updates for your location</p>
            </div>
            <Switch defaultChecked />
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const PreferencesTab = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Globe className="w-5 h-5 mr-2" />
            {t('languageRegion')}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="language">{t('language')}</Label>
              <Select defaultValue="en">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="hi">हिंदी</SelectItem>
                  <SelectItem value="ta">தமிழ்</SelectItem>
                  <SelectItem value="bn">বাংলা</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="timezone">{t('timezone')}</Label>
              <Select defaultValue="asia/kolkata">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="asia/kolkata">Asia/Kolkata (IST)</SelectItem>
                  <SelectItem value="utc">UTC</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="currency">{t('currency')}</Label>
            <Select defaultValue="inr">
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="inr">INR (₹)</SelectItem>
                <SelectItem value="usd">USD ($)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 p-4 lg:p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <ProfileHeader />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="general">{t('general')}</TabsTrigger>
              <TabsTrigger value="security">{t('security')}</TabsTrigger>
              <TabsTrigger value="notifications">{t('notifications')}</TabsTrigger>
              <TabsTrigger value="preferences">{t('preferences')}</TabsTrigger>
            </TabsList>

            <TabsContent value="general" className="mt-6">
              <GeneralTab />
            </TabsContent>

            <TabsContent value="security" className="mt-6">
              <SecurityTab />
            </TabsContent>

            <TabsContent value="notifications" className="mt-6">
              <NotificationsTab />
            </TabsContent>

            <TabsContent value="preferences" className="mt-6">
              <PreferencesTab />
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
}