
import React, { useState, useEffect } from 'react';
import { 
  ChefHat, 
  Flame, 
  Utensils, 
  Soup, 
  Leaf, 
  Coffee, 
  Pizza, 
  Globe2,
  CircleDot,
  CloudSun
} from 'lucide-react';
import { DishCategory } from '../types';

interface DishVisualProps {
  category: DishCategory;
  className?: string;
  iconSize?: number;
  imageUrl?: string;
  dishId?: string;
}

const DishVisual: React.FC<DishVisualProps> = ({ category, className = "", iconSize = 48, imageUrl, dishId }) => {
  const [imageError, setImageError] = useState(false);
  const [resolvedSrc, setResolvedSrc] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    // Reset states when props change
    setImageError(false);
    setIsLoaded(false);
    setRetryCount(0);
    
    if (imageUrl) {
      setResolvedSrc(imageUrl);
    } else if (dishId) {
      // Default to png
      setResolvedSrc(`/images/dishes/${dishId}.png`);
    } else {
      setResolvedSrc(null);
    }
  }, [imageUrl, dishId]);

  const handleImageError = () => {
    if (!dishId || imageUrl) {
      setImageError(true);
      return;
    }

    // Fallback strategy for local images: PNG -> JPG -> JPEG -> Error
    if (retryCount === 0) {
      setResolvedSrc(`/images/dishes/${dishId}.jpg`);
      setRetryCount(1);
    } else if (retryCount === 1) {
       setResolvedSrc(`/images/dishes/${dishId}.jpeg`);
       setRetryCount(2);
    } else {
      setImageError(true);
    }
  };

  const getVisualConfig = (cat: DishCategory) => {
    switch (cat) {
      case 'stew': return { bg: 'bg-gradient-to-br from-emerald-600 to-teal-800', icon: Leaf, pattern: 'opacity-20' };
      case 'polo': return { bg: 'bg-gradient-to-br from-amber-400 to-orange-600', icon: Utensils, pattern: 'opacity-10' };
      case 'kabab': return { bg: 'bg-gradient-to-br from-red-600 to-rose-900', icon: Flame, pattern: 'opacity-20' };
      case 'ash': return { bg: 'bg-gradient-to-br from-lime-600 to-green-800', icon: Soup, pattern: 'opacity-20' };
      case 'soup': return { bg: 'bg-gradient-to-br from-orange-400 to-red-600', icon: Soup, pattern: 'opacity-20' };
      case 'kuku': return { bg: 'bg-gradient-to-br from-yellow-500 to-amber-700', icon: CircleDot, pattern: 'opacity-20' };
      case 'dolma': return { bg: 'bg-gradient-to-br from-fuchsia-600 to-purple-900', icon: CircleDot, pattern: 'opacity-20' };
      case 'local': return { bg: 'bg-gradient-to-br from-cyan-600 to-blue-900', icon: CloudSun, pattern: 'opacity-20' };
      case 'nani': return { bg: 'bg-gradient-to-br from-stone-500 to-stone-800', icon: ChefHat, pattern: 'opacity-20' };
      case 'fastfood': return { bg: 'bg-gradient-to-br from-pink-500 to-rose-700', icon: Pizza, pattern: 'opacity-20' };
      case 'dessert': return { bg: 'bg-gradient-to-br from-pink-300 to-pink-600', icon: Coffee, pattern: 'opacity-20' };
      case 'international': return { bg: 'bg-gradient-to-br from-indigo-500 to-violet-800', icon: Globe2, pattern: 'opacity-20' };
      default: return { bg: 'bg-gradient-to-br from-gray-500 to-gray-700', icon: ChefHat, pattern: 'opacity-10' };
    }
  };

  const config = getVisualConfig(category);
  const Icon = config.icon;

  return (
    <div className={`relative overflow-hidden flex items-center justify-center ${config.bg} ${className}`}>
      
      {/* Background Pattern & Icon (Always visible as fallback/background) */}
      <div className={`absolute inset-0 ${config.pattern} bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]`}></div>
      <div className="absolute inset-0 bg-white/5 backdrop-blur-[1px]"></div>
      
      {/* Fallback Icon */}
      <Icon 
        size={iconSize} 
        className={`text-white drop-shadow-lg relative z-10 transition-opacity duration-500 ${isLoaded ? 'opacity-0' : 'opacity-90'}`} 
        strokeWidth={1.5} 
      />

      {/* Actual Image (Loads on top) */}
      {resolvedSrc && !imageError && (
        <img 
          src={resolvedSrc} 
          alt="Dish" 
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 z-20 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
          onLoad={() => setIsLoaded(true)}
          onError={handleImageError}
          loading="lazy"
        />
      )}
      
      {/* Gradient Overlay for Text Readability */}
      <div className="absolute inset-0 bg-black/10 z-30 pointer-events-none"></div>
    </div>
  );
};

export default DishVisual;
