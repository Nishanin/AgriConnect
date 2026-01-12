import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Calendar, Sprout, Droplets, Sun, Cloud,
  Clock, AlertTriangle, CheckCircle, Plus,
  Edit, Trash2, Bell, Eye, ChevronLeft, ChevronRight
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Textarea } from './ui/textarea';

export default function CropCalendar({ language }) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState('timeline');
  const [selectedCrop, setSelectedCrop] = useState('all');
  const [isAddEventOpen, setIsAddEventOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    crop: '',
    type: '',
    date: '',
    time: '',
    priority: 'medium',
    notes: '',
    weatherDependent: false
  });

  const translations = {
    en: {
      cropCalendar: 'Crop Calendar',
      monthView: 'Month View',
      timelineView: 'Timeline View',
      addEvent: 'Add Event',
      allCrops: 'All Crops',
      wheat: 'Wheat',
      tomato: 'Tomato',
      rice: 'Rice',
      sowing: 'Sowing',
      irrigation: 'Irrigation',
      fertilization: 'Fertilization',
      pestControl: 'Pest Control',
      harvesting: 'Harvesting',
      plowing: 'Plowing',
      today: 'Today',
      upcoming: 'Upcoming',
      completed: 'Completed',
      overdue: 'Overdue',
      highPriority: 'High Priority',
      mediumPriority: 'Medium Priority',
      lowPriority: 'Low Priority',
      weatherBased: 'Weather Based',
      scheduled: 'Scheduled',
      reminder: 'Reminder',
      edit: 'Edit',
      delete: 'Delete',
      markComplete: 'Mark Complete',
      setReminder: 'Set Reminder',
      eventTitle: 'Event Title',
      crop: 'Crop',
      eventType: 'Event Type',
      date: 'Date',
      time: 'Time',
      notes: 'Notes',
      priority: 'Priority',
      save: 'Save',
      cancel: 'Cancel',
      weatherWarning: 'Weather Warning',
      rainExpected: 'Rain expected, postpone irrigation',
      hotWeather: 'Hot weather alert, increase watering',
      nextWeek: 'Next Week',
      thisMonth: 'This Month',
      progress: 'Progress',
      daysLeft: 'days left',
      completed_: 'Completed',
    },
    hi: {
      cropCalendar: 'फसल कैलेंडर',
      monthView: 'मासिक दृश्य',
      timelineView: 'समयरेखा दृश्य',
      addEvent: 'घटना जोड़ें',
      allCrops: 'सभी फसलें',
      wheat: 'गेहूं',
      tomato: 'टमाटर',
      rice: 'चावल',
      sowing: 'बुआई',
      irrigation: 'सिंचाई',
      fertilization: 'उर्वरकीकरण',
      pestControl: 'कीट नियंत्रण',
      harvesting: 'कटाई',
      plowing: 'जुताई',
      today: 'आज',
      upcoming: 'आगामी',
      completed: 'पूर्ण',
      overdue: 'विलंबित',
      highPriority: 'उच्च प्राथमिकता',
      mediumPriority: 'मध्यम प्राथमिकता',
      lowPriority: 'कम प्राथमिकता',
      weatherBased: 'मौसम आधारित',
      scheduled: 'निर्धारित',
      reminder: 'अनुस्मारक',
      edit: 'संपादित करें',
      delete: 'हटाएं',
      markComplete: 'पूर्ण के रूप में चिह्नित करें',
      setReminder: 'अनुस्मारक सेट करें',
      eventTitle: 'घटना शीर्षक',
      crop: 'फसल',
      eventType: 'घटना प्रकार',
      date: 'तारीख',
      time: 'समय',
      notes: 'टिप्पणियां',
      priority: 'प्राथमिकता',
      save: 'सेव करें',
      cancel: 'रद्द करें',
      weatherWarning: 'मौसम चेतावनी',
      rainExpected: 'बारिश की उम्मीद, सिंचाई स्थगित करें',
      hotWeather: 'गर्म मौसम अलर्ट, पानी देना बढ़ाएं',
      nextWeek: 'अगला सप्ताह',
      thisMonth: 'इस महीने',
      progress: 'प्रगति',
      daysLeft: 'दिन शेष',
      completed_: 'पूर्ण',
    }
  };

  const t = (key) => translations[language][key] || translations.en[key] || key;

  const crops = [
    { id: 'all', name: t('allCrops'), color: 'gray' },
    { id: 'wheat', name: t('wheat'), color: 'amber' },
    { id: 'tomato', name: t('tomato'), color: 'red' },
    { id: 'rice', name: t('rice'), color: 'green' },
  ];

  const eventTypes = [
    { id: 'sowing', name: t('sowing'), icon: Sprout, color: 'green' },
    { id: 'irrigation', name: t('irrigation'), icon: Droplets, color: 'blue' },
    { id: 'fertilization', name: t('fertilization'), icon: Sun, color: 'yellow' },
    { id: 'pest-control', name: t('pestControl'), icon: AlertTriangle, color: 'red' },
    { id: 'harvesting', name: t('harvesting'), icon: CheckCircle, color: 'orange' },
  ];

  const [calendarEvents, setCalendarEvents] = useState([
    {
      id: 1,
      title: 'Wheat Irrigation',
      crop: 'wheat',
      type: 'irrigation',
      date: new Date(2024, 11, 15),
      time: '06:00',
      priority: 'high',
      status: 'upcoming',
      notes: 'Water the wheat field thoroughly due to dry weather',
      weatherDependent: true,
      progress: 0
    },
    {
      id: 2,
      title: 'Tomato Fertilization',
      crop: 'tomato',
      type: 'fertilization',
      date: new Date(2024, 11, 12),
      time: '08:00',
      priority: 'medium',
      status: 'completed',
      notes: 'Apply NPK fertilizer to tomato plants',
      weatherDependent: false,
      progress: 100
    },
    {
      id: 3,
      title: 'Rice Pest Control',
      crop: 'rice',
      type: 'pest-control',
      date: new Date(2024, 11, 18),
      time: '07:00',
      priority: 'high',
      status: 'upcoming',
      notes: 'Spray for brown plant hopper control',
      weatherDependent: true,
      progress: 0
    },
    {
      id: 4,
      title: 'Wheat Harvesting',
      crop: 'wheat',
      type: 'harvesting',
      date: new Date(2024, 11, 25),
      time: '05:00',
      priority: 'high',
      status: 'upcoming',
      notes: 'Harvest wheat crop - weather conditions optimal',
      weatherDependent: true,
      progress: 0
    },
  ]);

  // Add new event
  const handleAddEvent = () => {
    if (!formData.title || !formData.crop || !formData.type || !formData.date || !formData.time) {
      alert('Please fill in all required fields');
      return;
    }

    const newEvent = {
      id: Date.now(),
      title: formData.title,
      crop: formData.crop,
      type: formData.type,
      date: new Date(formData.date),
      time: formData.time,
      priority: formData.priority,
      status: 'upcoming',
      notes: formData.notes,
      weatherDependent: formData.weatherDependent,
      progress: 0
    };

    setCalendarEvents([...calendarEvents, newEvent]);
    setIsAddEventOpen(false);
    resetForm();
  };

  // Edit event
  const handleEditEvent = (event) => {
    setEditingEvent(event);
    setFormData({
      title: event.title,
      crop: event.crop,
      type: event.type,
      date: event.date.toISOString().split('T')[0],
      time: event.time,
      priority: event.priority,
      notes: event.notes,
      weatherDependent: event.weatherDependent
    });
    setIsAddEventOpen(true);
  };

  // Update event
  const handleUpdateEvent = () => {
    if (!formData.title || !formData.crop || !formData.type || !formData.date || !formData.time) {
      alert('Please fill in all required fields');
      return;
    }

    const updatedEvents = calendarEvents.map(event =>
      event.id === editingEvent.id
        ? {
            ...event,
            title: formData.title,
            crop: formData.crop,
            type: formData.type,
            date: new Date(formData.date),
            time: formData.time,
            priority: formData.priority,
            notes: formData.notes,
            weatherDependent: formData.weatherDependent
          }
        : event
    );

    setCalendarEvents(updatedEvents);
    setIsAddEventOpen(false);
    setEditingEvent(null);
    resetForm();
  };

  // Delete event
  const handleDeleteEvent = (eventId) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      setCalendarEvents(calendarEvents.filter(event => event.id !== eventId));
    }
  };

  // Mark event as complete
  const handleCompleteEvent = (eventId) => {
    const updatedEvents = calendarEvents.map(event =>
      event.id === eventId
        ? { ...event, status: 'completed', progress: 100 }
        : event
    );
    setCalendarEvents(updatedEvents);
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      title: '',
      crop: '',
      type: '',
      date: '',
      time: '',
      priority: 'medium',
      notes: '',
      weatherDependent: false
    });
  };

  // Handle form input changes
  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const upcomingTasks = calendarEvents.filter(event => event.status === 'upcoming');
  const todayTasks = calendarEvents.filter(event =>
    event.date.toDateString() === new Date().toDateString()
  );

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-50';
      case 'medium': return 'text-yellow-600 bg-yellow-50';
      case 'low': return 'text-green-600 bg-green-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-50';
      case 'upcoming': return 'text-blue-600 bg-blue-50';
      case 'overdue': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getCropColor = (crop) => {
    const cropData = crops.find(c => c.id === crop);
    return cropData?.color || 'gray';
  };

  const TimelineEvent = ({ event, index }) => {
    const eventTypeData = eventTypes.find(et => et.id === event.type);
    const Icon = eventTypeData?.icon || Clock;

    return (
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: index * 0.1 }}
        className="relative pl-8"
      >
        {/* Timeline line */}
        <div className="absolute left-4 top-8 bottom-0 w-0.5 bg-gray-200" />

        {/* Timeline dot */}
        <div className={`absolute left-2 top-2 w-4 h-4 rounded-full bg-${getCropColor(event.crop)}-500 border-2 border-white shadow-md`} />

        <Card className={`mb-4 ml-4 border-l-4 border-l-${getCropColor(event.crop)}-500 hover:shadow-lg transition-shadow`}>
          <CardContent className="p-4">
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center space-x-2">
                <Icon className={`w-5 h-5 text-${eventTypeData?.color}-600`} />
                <h4 className="font-semibold text-gray-800">{event.title}</h4>
              </div>
              <div className="flex space-x-1">
                <Button size="sm" variant="ghost" className="w-8 h-8 p-0" onClick={() => handleEditEvent(event)}>
                  <Edit className="w-4 h-4" />
                </Button>
                <Button size="sm" variant="ghost" className="w-8 h-8 p-0" onClick={() => handleDeleteEvent(event.id)}>
                  <Trash2 className="w-4 h-4 text-red-600" />
                </Button>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-3">
              <Badge className={`bg-${getCropColor(event.crop)}-100 text-${getCropColor(event.crop)}-700`}>
                {crops.find(c => c.id === event.crop)?.name}
              </Badge>
              <Badge className={getPriorityColor(event.priority)}>
                {t(event.priority + 'Priority')}
              </Badge>
              <Badge className={getStatusColor(event.status)}>
                {t(event.status)}
              </Badge>
              {event.weatherDependent && (
                <Badge className="bg-blue-100 text-blue-700">
                  {t('weatherBased')}
                </Badge>
              )}
            </div>

            <div className="text-sm text-gray-600 mb-3">
              <p className="flex items-center mb-1">
                <Calendar className="w-4 h-4 mr-2" />
                {event.date.toLocaleDateString()} at {event.time}
              </p>
              <p>{event.notes}</p>
            </div>

            {event.status !== 'completed' && (
              <div className="flex items-center space-x-2">
                <Button size="sm" className="bg-green-600 hover:bg-green-700" onClick={() => handleCompleteEvent(event.id)}>
                  <CheckCircle className="w-4 h-4 mr-1" />
                  {t('markComplete')}
                </Button>
                <Button size="sm" variant="outline">
                  <Bell className="w-4 h-4 mr-1" />
                  {t('setReminder')}
                </Button>
              </div>
            )}

            {event.progress > 0 && (
              <div className="mt-3">
                <div className="flex justify-between text-sm mb-1">
                  <span>{t('progress')}</span>
                  <span>{event.progress}%</span>
                </div>
                <Progress value={event.progress} className="h-2" />
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    );
  };

  const AddEventModal = () => (
    <Dialog open={isAddEventOpen} onOpenChange={(open) => {
      setIsAddEventOpen(open);
      if (!open) {
        setEditingEvent(null);
        resetForm();
      }
    }}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <Plus className="w-6 h-6 mr-2 text-green-600" />
            {editingEvent ? 'Edit Event' : t('addEvent')}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="eventTitle">{t('eventTitle')}</Label>
              <Input 
                id="eventTitle" 
                placeholder="e.g., Wheat Irrigation" 
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="crop">{t('crop')}</Label>
              <Select value={formData.crop} onValueChange={(value) => handleInputChange('crop', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select crop" />
                </SelectTrigger>
                <SelectContent>
                  {crops.slice(1).map(crop => (
                    <SelectItem key={crop.id} value={crop.id}>{crop.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="eventType">{t('eventType')}</Label>
              <Select value={formData.type} onValueChange={(value) => handleInputChange('type', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  {eventTypes.map(type => (
                    <SelectItem key={type.id} value={type.id}>{type.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="priority">{t('priority')}</Label>
              <Select value={formData.priority} onValueChange={(value) => handleInputChange('priority', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="high">{t('highPriority')}</SelectItem>
                  <SelectItem value="medium">{t('mediumPriority')}</SelectItem>
                  <SelectItem value="low">{t('lowPriority')}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="date">{t('date')}</Label>
              <Input 
                id="date" 
                type="date" 
                value={formData.date}
                onChange={(e) => handleInputChange('date', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="time">{t('time')}</Label>
              <Input 
                id="time" 
                type="time" 
                value={formData.time}
                onChange={(e) => handleInputChange('time', e.target.value)}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="notes">{t('notes')}</Label>
            <Textarea
              id="notes"
              placeholder="Additional notes about this task"
              rows={3}
              value={formData.notes}
              onChange={(e) => handleInputChange('notes', e.target.value)}
            />
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="weatherDependent"
              checked={formData.weatherDependent}
              onChange={(e) => handleInputChange('weatherDependent', e.target.checked)}
              className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
            />
            <Label htmlFor="weatherDependent" className="cursor-pointer">
              {t('weatherBased')}
            </Label>
          </div>

          <div className="flex justify-end space-x-3">
            <Button variant="outline" onClick={() => {
              setIsAddEventOpen(false);
              setEditingEvent(null);
              resetForm();
            }}>
              {t('cancel')}
            </Button>
            <Button 
              className="bg-gradient-to-r from-green-500 to-emerald-500"
              onClick={editingEvent ? handleUpdateEvent : handleAddEvent}
            >
              {t('save')}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 p-4 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col lg:flex-row items-center justify-between space-y-4 lg:space-y-0"
        >
          <div>
            <h1 className="text-3xl font-bold text-gray-800 flex items-center">
              <Calendar className="w-8 h-8 mr-3 text-green-600" />
              {t('cropCalendar')}
            </h1>
            <p className="text-gray-600 mt-1">Plan and track your farming activities</p>
          </div>

          <div className="flex items-center space-x-3">
            <div className="flex space-x-2">
              {crops.map((crop) => (
                <Button
                  key={crop.id}
                  variant={selectedCrop === crop.id ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedCrop(crop.id)}
                  className={selectedCrop === crop.id ? `bg-${crop.color}-600 hover:bg-${crop.color}-700` : ''}
                >
                  {crop.name}
                </Button>
              ))}
            </div>

            <Button
              onClick={() => setIsAddEventOpen(true)}
              className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
            >
              <Plus className="w-4 h-4 mr-2" />
              {t('addEvent')}
            </Button>
          </div>
        </motion.div>

        {/* Weather Alert */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="p-4 bg-gradient-to-r from-blue-50 to-cyan-50 border-l-4 border-l-blue-500">
            <div className="flex items-center space-x-3">
              <Cloud className="w-6 h-6 text-blue-600" />
              <div>
                <h3 className="font-semibold text-blue-800">{t('weatherWarning')}</h3>
                <p className="text-blue-700">{t('rainExpected')}</p>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Today's Tasks & Upcoming */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="p-6 bg-white/80 backdrop-blur-lg border-0 shadow-xl">
              <CardHeader className="px-0 pt-0">
                <CardTitle className="flex items-center">
                  <Clock className="w-6 h-6 mr-2 text-orange-600" />
                  {t('today')} ({todayTasks.length})
                </CardTitle>
              </CardHeader>
              <CardContent className="px-0">
                {todayTasks.length > 0 ? (
                  <div className="space-y-3">
                    {todayTasks.map((task, index) => {
                      const eventTypeData = eventTypes.find(et => et.id === task.type);
                      const Icon = eventTypeData?.icon || Clock;

                      return (
                        <motion.div
                          key={task.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="p-3 bg-orange-50 rounded-lg border-l-4 border-l-orange-500"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <Icon className={`w-5 h-5 text-${eventTypeData?.color}-600`} />
                              <div>
                                <h4 className="font-medium text-gray-800">{task.title}</h4>
                                <p className="text-sm text-gray-600">{task.time}</p>
                              </div>
                            </div>
                            <Badge className={getPriorityColor(task.priority)}>
                              {t(task.priority + 'Priority')}
                            </Badge>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <CheckCircle className="w-12 h-12 mx-auto text-gray-300 mb-3" />
                    <p className="text-gray-500">No tasks scheduled for today</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="p-6 bg-white/80 backdrop-blur-lg border-0 shadow-xl">
              <CardHeader className="px-0 pt-0">
                <CardTitle className="flex items-center">
                  <AlertTriangle className="w-6 h-6 mr-2 text-blue-600" />
                  {t('upcoming')} ({upcomingTasks.length})
                </CardTitle>
              </CardHeader>
              <CardContent className="px-0">
                <div className="space-y-3">
                  {upcomingTasks.slice(0, 4).map((task, index) => {
                    const daysUntil = Math.ceil((task.date.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));

                    return (
                      <motion.div
                        key={task.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="p-3 bg-blue-50 rounded-lg"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium text-gray-800">{task.title}</h4>
                            <p className="text-sm text-gray-600">
                              {task.date.toLocaleDateString()} • {daysUntil} {t('daysLeft')}
                            </p>
                          </div>
                          <Badge className={`bg-${getCropColor(task.crop)}-100 text-${getCropColor(task.crop)}-700`}>
                            {crops.find(c => c.id === task.crop)?.name}
                          </Badge>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Timeline View */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="p-6 bg-white/80 backdrop-blur-lg border-0 shadow-xl">
            <CardHeader className="px-0 pt-0">
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center">
                  <Eye className="w-6 h-6 mr-2 text-purple-600" />
                  {t('timelineView')}
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  <span className="text-sm font-medium px-3">
                    {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                  </span>
                  <Button variant="outline" size="sm">
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="px-0">
              <div className="relative">
                {calendarEvents
                  .filter(event => selectedCrop === 'all' || event.crop === selectedCrop)
                  .sort((a, b) => a.date.getTime() - b.date.getTime())
                  .map((event, index) => (
                    <TimelineEvent key={event.id} event={event} index={index} />
                  ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <AddEventModal />
      </div>
    </div>
  );
}