import React, { useState } from 'react';
import { Plus, Minus, ShoppingCart, Eye, Heart, Gift, Calendar, MapPin, Star } from 'lucide-react';

const FlowerBoxBuilder = () => {
  const [boxSize, setBoxSize] = useState('25');
  const [selectedFlowers, setSelectedFlowers] = useState({});
  const [totalFlowers, setTotalFlowers] = useState(0);
  const [boxStyle, setBoxStyle] = useState('classic');

  const [addOns, setAddOns] = useState({});
  const [deliveryDate, setDeliveryDate] = useState('');
  const [personalMessage, setPersonalMessage] = useState('');
  const [isGift, setIsGift] = useState(false);

  const flowerTypes = [
    { id: 1, name: 'Red Roses', color: '#dc2626', price: 3.50, image: '🌹', availability: 'in-stock', rating: 4.9 },
    { id: 2, name: 'White Roses', color: '#ffffff', price: 3.50, image: '🤍', availability: 'in-stock', rating: 4.8 },
    { id: 3, name: 'Pink Roses', color: '#ec4899', price: 3.50, image: '🌸', availability: 'limited', rating: 4.9 },
    { id: 4, name: 'Yellow Tulips', color: '#fbbf24', price: 2.80, image: '🌷', availability: 'in-stock', rating: 4.7 },
    { id: 5, name: 'Purple Tulips', color: '#8b5cf6', price: 2.80, image: '💜', availability: 'in-stock', rating: 4.6 },
    { id: 6, name: 'White Lilies', color: '#f8fafc', price: 4.20, image: '🪷', availability: 'in-stock', rating: 4.8 },
    { id: 7, name: 'Sunflowers', color: '#facc15', price: 3.20, image: '🌻', availability: 'in-stock', rating: 4.9 },
    { id: 8, name: 'Baby\'s Breath', color: '#f1f5f9', price: 2.50, image: '🤍', availability: 'in-stock', rating: 4.5 },
    { id: 9, name: 'Orange Marigolds', color: '#f97316', price: 2.20, image: '🧡', availability: 'seasonal', rating: 4.4 },
    { id: 10, name: 'Lavender', color: '#a855f7', price: 3.80, image: '💜', availability: 'limited', rating: 4.7 }
  ];

  const boxSizes = [
    { value: '25', label: '25 Flowers', price: 45, description: 'Perfect for small spaces' },
    { value: '50', label: '50 Flowers', price: 85, description: 'Most popular choice' },
    { value: '100', label: '100 Flowers', price: 160, description: 'Grand gesture' },
    { value: 'custom', label: 'Custom Size', price: 0, description: 'Tell us your needs' }
  ];

  const boxStyles = [
    { id: 'classic', name: 'Classic Round Box', price: 0, image: '📦' },
    { id: 'heart', name: 'Heart-Shaped Box', price: 15, image: '💝' },
    { id: 'rectangle', name: 'Elegant Rectangle', price: 8, image: '📋' },
    { id: 'vintage', name: 'Vintage Wooden Box', price: 25, image: '🎁' }
  ];



  const addOnOptions = [
    { id: 'chocolates', name: 'Premium Chocolates', price: 18, image: '🍫' },
    { id: 'teddy', name: 'Cute Teddy Bear', price: 25, image: '🧸' },
    { id: 'balloon', name: 'Helium Balloon', price: 8, image: '🎈' },
    { id: 'candle', name: 'Scented Candle', price: 15, image: '🕯️' },
    { id: 'wine', name: 'Bottle of Wine', price: 35, image: '🍷' },
    { id: 'card', name: 'Greeting Card', price: 5, image: '💌' },
    { id: 'vase', name: 'Ceramic Vase', price: 22, image: '🏺' }
  ];

  const updateFlowerCount = (flowerId, change) => {
    const newCount = Math.max(0, (selectedFlowers[flowerId] || 0) + change);
    const newTotal = totalFlowers - (selectedFlowers[flowerId] || 0) + newCount;
    
    if (boxSize === 'custom' || newTotal <= parseInt(boxSize)) {
      setSelectedFlowers(prev => ({
        ...prev,
        [flowerId]: newCount
      }));
      setTotalFlowers(newTotal);
    }
  };

  const toggleAddOn = (addOnId) => {
    setAddOns(prev => ({
      ...prev,
      [addOnId]: !prev[addOnId]
    }));
  };

  const calculatePrice = () => {
    const basePrice = boxSizes.find(size => size.value === boxSize)?.price || 0;
    const flowerPrice = Object.entries(selectedFlowers).reduce((total, [flowerId, count]) => {
      const flower = flowerTypes.find(f => f.id === parseInt(flowerId));
      return total + (flower?.price || 0) * count;
    }, 0);
    const boxStylePrice = boxStyles.find(style => style.id === boxStyle)?.price || 0;
    const addOnPrice = Object.entries(addOns).reduce((total, [addOnId, selected]) => {
      if (selected) {
        const addOn = addOnOptions.find(a => a.id === addOnId);
        return total + (addOn?.price || 0);
      }
      return total;
    }, 0);
    
    return basePrice + flowerPrice + boxStylePrice + addOnPrice;
  };

  const remainingSlots = boxSize === 'custom' ? '∞' : parseInt(boxSize) - totalFlowers;

  const getAvailabilityColor = (availability) => {
    switch(availability) {
      case 'in-stock': return 'text-green-600';
      case 'limited': return 'text-yellow-600';
      case 'seasonal': return 'text-orange-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-pink-500 to-purple-600 text-white p-6">
          <h1 className="text-3xl font-bold mb-2">Create Your Perfect Flower Box</h1>
          <p className="text-pink-100">Design a personalized arrangement for any occasion</p>
        </div>

        <div className="grid xl:grid-cols-4 gap-6 p-6">
          {/* Left Panel - Configuration */}
          <div className="xl:col-span-1 space-y-6">
            {/* Box Size */}
            <div>
              <h3 className="text-lg font-semibold mb-3 text-gray-800">Box Size</h3>
              <div className="space-y-2">
                {boxSizes.map((size) => (
                  <label key={size.value} className="relative flex items-center space-x-2 cursor-pointer bg-gray-100 p-2 rounded-md hover:bg-gray-200 transition-colors">
                    {/* Free Delivery Badge */}
                    {(size.value === '50' || size.value === '100') && (
                      <div className="absolute -top-1 -right-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg transform rotate-3 z-10 shake-animation">
                        🚚 FREE DELIVERY
                      </div>
                    )}
                    <input
                      type="radio"
                      name="boxSize"
                      value={size.value}
                      checked={boxSize === size.value}
                      onChange={(e) => {
                        setBoxSize(e.target.value);
                        if (e.target.value !== 'custom') {
                          setSelectedFlowers({});
                          setTotalFlowers(0);
                        }
                      }}
                      className="w-4 h-4 text-pink-600"
                    />
                    <div className="flex-1">
                      <div className="font-medium text-sm">{size.label}</div>
                      <div className="text-xs text-gray-500">{size.description}</div>
                      {size.price > 0 && <div className="text-xs text-gray-600">${size.price}</div>}
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Box Style */}
            <div>
              <h3 className="text-lg font-semibold mb-3 text-gray-800">Box Style</h3>
              <div className="grid grid-cols-2 gap-2">
                {boxStyles.map((style) => (
                  <button
                    key={style.id}
                    onClick={() => setBoxStyle(style.id)}
                    className={`p-3 border-2 rounded-lg text-center transition-all ${
                      boxStyle === style.id
                        ? 'border-pink-500 bg-pink-50'
                        : 'border-gray-200 hover:border-pink-300'
                    }`}
                  >
                    <div className="text-2xl mb-1">{style.image}</div>
                    <div className="text-xs font-medium">{style.name}</div>
                    {style.price > 0 && <div className="text-xs text-gray-600">+${style.price}</div>}
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Center Panel - Flower Selection */}
          <div className="xl:col-span-2">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">Select Your Flowers</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-h-96 overflow-y-auto">
              {flowerTypes.map((flower) => (
                <div key={flower.id} className="bg-white border-2 border-gray-200 rounded-xl p-3 hover:border-pink-300 transition-all duration-200 hover:shadow-lg">
                  <div className="text-center mb-3">
                    <div className="text-3xl mb-1">{flower.image}</div>
                    <h4 className="font-medium text-sm text-gray-800">{flower.name}</h4>
                    <p className="text-xs text-gray-600">${flower.price} each</p>
                    <div className="flex items-center justify-center space-x-1 mt-1">
                      <Star size={12} className="fill-yellow-400 text-yellow-400" />
                      <span className="text-xs text-gray-600">{flower.rating}</span>
                    </div>
                    <p className={`text-xs ${getAvailabilityColor(flower.availability)}`}>
                      {flower.availability.replace('-', ' ').toUpperCase()}
                    </p>
                  </div>
                  
                  <div className="flex items-center justify-center space-x-2">
                    <button
                      onClick={() => updateFlowerCount(flower.id, -1)}
                      disabled={!selectedFlowers[flower.id]}
                      className="w-7 h-7 rounded-full bg-gray-200 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transition-colors"
                    >
                      <Minus size={14} />
                    </button>
                    
                    <span className="w-6 text-center font-medium text-sm">
                      {selectedFlowers[flower.id] || 0}
                    </span>
                    
                    <button
                      onClick={() => updateFlowerCount(flower.id, 1)}
                      disabled={boxSize !== 'custom' && remainingSlots <= 0}
                      className="w-7 h-7 rounded-full bg-pink-500 hover:bg-pink-600 disabled:opacity-50 disabled:cursor-not-allowed text-white flex items-center justify-center transition-colors"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Add-ons */}
            <div className="mt-6">
              <h3 className="text-xl font-semibold mb-4 text-gray-800">Add-ons & Extras</h3>
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
                {addOnOptions.map((addOn) => (
                  <button
                    key={addOn.id}
                    onClick={() => toggleAddOn(addOn.id)}
                    className={`p-3 border-2 rounded-lg text-center transition-all ${
                      addOns[addOn.id]
                        ? 'border-pink-500 bg-pink-50'
                        : 'border-gray-200 hover:border-pink-300'
                    }`}
                  >
                    <div className="text-2xl mb-1">{addOn.image}</div>
                    <div className="text-sm font-medium">{addOn.name}</div>
                    <div className="text-xs text-gray-600">+${addOn.price}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Panel - Summary & Options */}
          <div className="xl:col-span-1 space-y-6">
            {/* Progress */}
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">Progress</span>
                <span className="text-sm text-gray-600">
                  {totalFlowers}/{boxSize === 'custom' ? '∞' : boxSize} flowers
                </span>
              </div>
              {boxSize !== 'custom' && (
                <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
                  <div 
                    className="bg-gradient-to-r from-pink-500 to-purple-600 h-3 rounded-full transition-all duration-300"
                    style={{ width: `${(totalFlowers / parseInt(boxSize)) * 100}%` }}
                  ></div>
                </div>
              )}
              <p className="text-sm text-gray-600">
                {boxSize === 'custom' 
                  ? 'No limit on custom boxes' 
                  : remainingSlots > 0 
                    ? `${remainingSlots} slots remaining` 
                    : 'Box is full!'
                }
              </p>
            </div>

            {/* Gift Options */}
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-4">
              <label className="flex items-center space-x-2 cursor-pointer mb-3">
                <input
                  type="checkbox"
                  checked={isGift}
                  onChange={(e) => setIsGift(e.target.checked)}
                  className="w-4 h-4 text-pink-600"
                />
                <Gift size={18} className="text-pink-600" />
                <span className="font-medium">This is a gift</span>
              </label>
              
              {isGift && (
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium mb-1">Personal Message</label>
                    <textarea
                      value={personalMessage}
                      onChange={(e) => setPersonalMessage(e.target.value)}
                      placeholder="Add a heartfelt message..."
                      className="w-full p-2 border border-gray-300 rounded text-sm resize-none"
                      rows="3"
                      maxLength="200"
                    />
                    <p className="text-xs text-gray-500 mt-1">{personalMessage.length}/200</p>
                  </div>
                </div>
              )}
            </div>

            {/* Delivery Options */}
            <div>
              <h4 className="font-semibold mb-3 flex items-center space-x-2">
                <Calendar size={18} />
                <span>Delivery Date</span>
              </h4>
              <input
                type="date"
                value={deliveryDate}
                onChange={(e) => setDeliveryDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-pink-500"
              />
              <p className="text-xs text-gray-500 mt-1">Same-day delivery available before 2 PM</p>
            </div>

            {/* Summary */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-semibold mb-3">Order Summary</h4>
              <div className="space-y-1 text-sm max-h-40 overflow-y-auto">
                {/* Flowers */}
                {Object.entries(selectedFlowers).map(([flowerId, count]) => {
                  if (count === 0) return null;
                  const flower = flowerTypes.find(f => f.id === parseInt(flowerId));
                  return (
                    <div key={flowerId} className="flex justify-between">
                      <span>{flower?.name} ({count}×)</span>
                      <span>${(flower?.price * count).toFixed(2)}</span>
                    </div>
                  );
                })}
                
                {/* Box & Style */}
                <div className="flex justify-between">
                  <span>Box ({boxSizes.find(s => s.value === boxSize)?.label})</span>
                  <span>${boxSizes.find(s => s.value === boxSize)?.price || 0}</span>
                </div>
                
                {boxStyles.find(s => s.id === boxStyle)?.price > 0 && (
                  <div className="flex justify-between">
                    <span>{boxStyles.find(s => s.id === boxStyle)?.name}</span>
                    <span>+${boxStyles.find(s => s.id === boxStyle)?.price}</span>
                  </div>
                )}
                
                {/* Add-ons */}
                {Object.entries(addOns).map(([addOnId, selected]) => {
                  if (!selected) return null;
                  const addOn = addOnOptions.find(a => a.id === addOnId);
                  return (
                    <div key={addOnId} className="flex justify-between">
                      <span>{addOn?.name}</span>
                      <span>+${addOn?.price}</span>
                    </div>
                  );
                })}
              </div>
              
              <div className="border-t pt-3 mt-3">
                <div className="flex justify-between font-bold text-lg">
                  <span>Total:</span>
                  <span className="text-pink-600">${calculatePrice().toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <button className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white py-3 px-4 rounded-lg font-medium hover:from-pink-600 hover:to-purple-700 transition-all duration-200 flex items-center justify-center space-x-2">
                <ShoppingCart size={18} />
                <span>Add to Cart - ${calculatePrice().toFixed(2)}</span>
              </button>
              
              <div className="grid grid-cols-2 gap-2">
                <button className="bg-gray-200 text-gray-700 py-2 px-4 rounded-lg text-sm font-medium hover:bg-gray-300 transition-colors flex items-center justify-center space-x-1">
                  <Eye size={16} />
                  <span>Preview</span>
                </button>
                
                <button className="bg-gray-200 text-gray-700 py-2 px-4 rounded-lg text-sm font-medium hover:bg-gray-300 transition-colors flex items-center justify-center space-x-1">
                  <Heart size={16} />
                  <span>Save</span>
                </button>
              </div>
            </div>
          </div>
        </div>
    </div>
    
  );
};

export default FlowerBoxBuilder;