
import React, { useState, useEffect, useRef } from 'react';
import { 
  ChefHat, 
  Flame, 
  Utensils, 
  Soup, 
  Leaf, 
  Pizza, 
  Globe2
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
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    setImageError(false);
    setIsLoaded(false);
    setRetryCount(0);
    
    if (imageUrl && imageUrl.trim() !== "") {
      setResolvedSrc(imageUrl);
    } else if (dishId) {
      const path = `images/dishes/${dishId}.png`;
      setResolvedSrc(path);
    } else {
      setResolvedSrc(null);
    }
  }, [imageUrl, dishId]);

  useEffect(() => {
    if (imgRef.current && imgRef.current.complete) {
      setIsLoaded(true);
    }
  }, [resolvedSrc]);

  const handleImageError = () => {
    if (!dishId || imageUrl) {
      setImageError(true);
      return;
    }

    if (retryCount === 0) { 
      setResolvedSrc(`images/dishes/${dishId}.jpg`); 
      setRetryCount(1); 
    } else if (retryCount === 1) { 
      setResolvedSrc(`images/dishes/${dishId}.jpeg`); 
      setRetryCount(2); 
    } else { 
      setImageError(true); 
    }
  };

  const getVisualConfig = (cat: DishCategory) => {
    switch (cat) {
      case 'stew': return { bg: 'bg-emerald-100', text: 'text-emerald-600', icon: Leaf };
      case 'polo': return { bg: 'bg-amber-100', text: 'text-amber-600', icon: Utensils };
      case 'kabab': return { bg: 'bg-rose-100', text: 'text-rose-600', icon: Flame };
      case 'ash': return { bg: 'bg-lime-100', text: 'text-lime-600', icon: Soup };
      case 'soup': return { bg: 'bg-orange-100', text: 'text-orange-600', icon: Soup };
      case 'khorak': return { bg: 'bg-yellow-100', text: 'text-yellow-600', icon: ChefHat };
      case 'fastfood': return { bg: 'bg-pink-100', text: 'text-pink-600', icon: Pizza };
      case 'international': return { bg: 'bg-indigo-100', text: 'text-indigo-600', icon: Globe2 };
      default: return { bg: 'bg-gray-100', text: 'text-gray-600', icon: ChefHat };
    }
  };

  const config = getVisualConfig(category);
  const Icon = config.icon;

  return (
    <div className={`relative overflow-hidden flex items-center justify-center ${config.bg} ${className}`}>
      {/* حذف لایه‌های کدر کننده برای شفافیت حداکثری تصاویر */}
      
      {(!resolvedSrc || imageError || !isLoaded) && (
        <div className="absolute inset-0 flex items-center justify-center z-10 transition-opacity duration-300">
          <Icon size={iconSize} className={`${config.text} opacity-30`} strokeWidth={1.5} />
        </div>
      )}
      
      {resolvedSrc && !imageError && (
        <img 
          ref={imgRef}
          src={resolvedSrc} 
          alt="Dish" 
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 z-20 ${isLoaded ? 'opacity-100' : 'opacity-0'}`} 
          onLoad={() => setIsLoaded(true)} 
          onError={handleImageError} 
          loading="eager"
        />
      )}
      {/* حذف لایه bg-black/10 که باعث تیره شدن عکس می‌شد */}
    </div>
  );
};

export default DishVisual;
