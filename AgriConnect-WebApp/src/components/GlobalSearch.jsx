import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, X, Clock, Crop, Users, MapPin } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';

export default function GlobalSearch({ 
  language, 
  userRole, 
  onResultClick,
  placeholder,
  onCategoriesClick 
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [recentSearches, setRecentSearches] = useState([
    'Organic tomatoes',
    'Wheat suppliers',
    'Fresh vegetables Mumbai',
    'Rice exporters'
  ]);
  const searchRef = useRef(null);

  const translations = {
    en: {
      search: 'Search crops, farmers, locations...',
      recentSearches: 'Recent Searches',
      suggestions: 'Suggestions',
      noResults: 'No results found',
      searchFor: 'Search for',
      crops: 'Crops',
      farmers: 'Farmers',
      locations: 'Locations',
      clearAll: 'Clear All'
    },
    hi: {
      search: 'फसल, किसान, स्थान खोजें...',
      recentSearches: 'हाल की खोजें',
      suggestions: 'सुझाव',
      noResults: 'कोई परिणाम नहीं मिला',
      searchFor: 'खोजें',
      crops: 'फसलें',
      farmers: 'किसान',
      locations: 'स्थान',
      clearAll: 'सभी साफ़ करें'
    }
  };

  const t = (key) => translations[language][key] || translations.en[key] || key;

  // Mock search suggestions
  const searchSuggestions = [
    { type: 'crop', name: 'Organic Tomatoes', category: 'vegetables', location: 'Maharashtra' },
    { type: 'crop', name: 'Basmati Rice', category: 'grains', location: 'Punjab' },
    { type: 'farmer', name: 'Ramesh Kumar', location: 'Gujarat', crops: ['Wheat', 'Cotton'] },
    { type: 'location', name: 'Pune, Maharashtra', farmers: 45, crops: 150 },
    { type: 'crop', name: 'Fresh Onions', category: 'vegetables', location: 'Karnataka' },
  ];

  const filteredSuggestions = searchQuery.length > 0 
    ? searchSuggestions.filter(item => 
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (query) => {
    if (query.trim()) {
      // Add to recent searches if not already present
      setRecentSearches(prev => {
        const updated = [query, ...prev.filter(s => s !== query)].slice(0, 5);
        return updated;
      });
      
      if (onResultClick) {
        onResultClick({ type: 'search', query });
      }
      
      setIsOpen(false);
      setSearchQuery('');
    }
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
  };

  const getIcon = (type) => {
    switch (type) {
      case 'crop':
        return <Crop className="w-4 h-4 text-green-600" />;
      case 'farmer':
        return <Users className="w-4 h-4 text-blue-600" />;
      case 'location':
        return <MapPin className="w-4 h-4 text-orange-600" />;
      default:
        return <Search className="w-4 h-4 text-gray-600" />;
    }
  };

  const getBadgeColor = (type) => {
    switch (type) {
      case 'crop':
        return 'bg-green-100 text-green-700';
      case 'farmer':
        return 'bg-blue-100 text-blue-700';
      case 'location':
        return 'bg-orange-100 text-orange-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div ref={searchRef} className="relative w-full max-w-2xl">
      <div className="flex bg-white rounded-lg overflow-hidden shadow-md border border-gray-200">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={(e) => {
            e.stopPropagation();
            setIsOpen(false); // Close search dropdown when categories is clicked
            if (onCategoriesClick) {
              onCategoriesClick();
            }
          }}
          className="bg-gray-50 text-gray-700 rounded-none border-r px-3 hover:bg-gray-100 text-xs h-10 font-medium"
        >
          <span>All Categories</span>
        </Button>
        <div className="flex-1 relative">
          <Input
            placeholder={placeholder || t('search')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setIsOpen(true)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSearch(searchQuery);
              }
            }}
            className="border-none rounded-none focus:ring-0 focus-visible:ring-0 h-10 text-sm"
          />
          {searchQuery && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSearchQuery('')}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 w-6 h-6 p-0 hover:bg-gray-100"
            >
              <X className="w-3 h-3" />
            </Button>
          )}
        </div>
        <Button 
          size="sm" 
          onClick={() => handleSearch(searchQuery)}
          className="bg-orange-500 hover:bg-orange-600 text-white rounded-none px-5 h-10"
        >
          <Search className="w-5 h-5" />
        </Button>
      </div>

      {/* Search Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 right-0 mt-2 z-50"
          >
            <Card className="shadow-lg border border-gray-200 bg-white max-h-96 overflow-y-auto">
              <div className="p-4">
                {/* Recent Searches */}
                {searchQuery.length === 0 && recentSearches.length > 0 && (
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-sm font-medium text-gray-700">{t('recentSearches')}</h4>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={clearRecentSearches}
                        className="text-xs text-gray-500 hover:text-gray-700"
                      >
                        {t('clearAll')}
                      </Button>
                    </div>
                    <div className="space-y-2">
                      {recentSearches.map((search, index) => (
                        <button
                          key={index}
                          onClick={() => handleSearch(search)}
                          className="flex items-center w-full p-2 text-left rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          <Clock className="w-4 h-4 text-gray-400 mr-3" />
                          <span className="text-sm text-gray-700">{search}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Search Suggestions */}
                {searchQuery.length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-3">{t('suggestions')}</h4>
                    {filteredSuggestions.length > 0 ? (
                      <div className="space-y-2">
                        {filteredSuggestions.map((suggestion, index) => (
                          <button
                            key={index}
                            onClick={() => {
                              if (onResultClick) {
                                onResultClick(suggestion);
                              }
                              handleSearch(suggestion.name);
                            }}
                            className="flex items-center w-full p-3 text-left rounded-lg hover:bg-gray-50 transition-colors border border-gray-100"
                          >
                            <div className="mr-3">
                              {getIcon(suggestion.type)}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center space-x-2">
                                <span className="text-sm font-medium text-gray-900">{suggestion.name}</span>
                                <Badge className={`text-xs ${getBadgeColor(suggestion.type)}`}>
                                  {suggestion.type}
                                </Badge>
                              </div>
                              <div className="text-xs text-gray-500 mt-1">
                                {suggestion.type === 'crop' && (
                                  <span>{suggestion.category} • {suggestion.location}</span>
                                )}
                                {suggestion.type === 'farmer' && (
                                  <span>{suggestion.location} • {suggestion.crops?.join(', ')}</span>
                                )}
                                {suggestion.type === 'location' && (
                                  <span>{suggestion.farmers} farmers • {suggestion.crops} crops</span>
                                )}
                              </div>
                            </div>
                          </button>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-6 text-gray-500">
                        <Search className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                        <p className="text-sm">{t('noResults')}</p>
                        <p className="text-xs mt-1">Try searching for crops, farmers, or locations</p>
                      </div>
                    )}
                  </div>
                )}

                {/* Quick Action Suggestion */}
                {searchQuery.length > 2 && filteredSuggestions.length === 0 && (
                  <div className="border-t pt-3 mt-3">
                    <button
                      onClick={() => handleSearch(searchQuery)}
                      className="flex items-center w-full p-2 text-left rounded-lg hover:bg-green-50 transition-colors"
                    >
                      <Search className="w-4 h-4 text-green-600 mr-3" />
                      <span className="text-sm text-green-700">
                        {t('searchFor')} "<span className="font-medium">{searchQuery}</span>"
                      </span>
                    </button>
                  </div>
                )}
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}