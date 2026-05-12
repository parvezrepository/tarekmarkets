import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Star, Play, DollarSign } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { motion } from 'framer-motion';

const ProductCard = ({ product, onBuy, settings: externalSettings }) => {
  const [currency, setCurrency] = useState(() => localStorage.getItem('currency') || 'BDT');
  const [settings, setSettings] = useState(externalSettings || { usd_rate: 120, homepage_settings: {} });
  const [isLoaded, setIsLoaded] = useState(!!externalSettings && Object.keys(externalSettings).length > 0);

  useEffect(() => {
    const handleCurrencyChange = () => {
      setCurrency(localStorage.getItem('currency') || 'BDT');
    };
    window.addEventListener('currencyChange', handleCurrencyChange);

    const fetchSettings = async () => {
      if (externalSettings && Object.keys(externalSettings).length > 0) {
        setSettings(externalSettings);
        setIsLoaded(true);
        return;
      }

      // If we got null or empty settings from prop, we might need to fetch or wait
      if (externalSettings === null) {
          setIsLoaded(false);
          return;
      }

      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/settings`);
        const data = await response.json();
        if (data) {
          setSettings(data);
          setIsLoaded(true);
        }
      } catch (err) { 
        console.error(err);
        setIsLoaded(true); 
      }
    };
    fetchSettings();

    return () => window.removeEventListener('currencyChange', handleCurrencyChange);
  }, [externalSettings]);

  const formatPrice = (bdtPrice) => {
    const rate = parseFloat(settings.usd_rate) || 120;
    if (currency === 'USD') {
      return `$${(bdtPrice / rate).toFixed(2)}`;
    }
    return `৳${bdtPrice}`;
  };

  const hp = settings.homepage_settings || {};
  const offer = hp.product_offer || { text: 'Standard Price', show: true, size: 'text-[8px]' };

  return (
    <motion.div 
      whileHover={{ y: -8 }}
      className="group vibe-card flex flex-col h-full bg-[#0a0a0a] border border-white/5 relative overflow-hidden"
    >
      {/* Marketing Badge */}
      {product.badge && (
        <div className="absolute top-4 right-4 z-20">
          <span className={`
            ${product.badge === 'HOT' ? 'badge-hot' : ''}
            ${product.badge === 'NEW' ? 'badge-new' : ''}
            ${product.badge === 'SALE' ? 'badge-sale' : ''}
           shadow-sm`}>
            {product.badge}
          </span>
        </div>
      )}

      {/* Image Area */}
      <Link to={`/product/${product.id}`} className="aspect-[16/10] relative overflow-hidden bg-white/5 p-2">
        <div className="absolute inset-0 bg-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        
        <img 
          src={product.image || 'https://via.placeholder.com/800x500?text=Digital+Asset'} 
          alt={product.name} 
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 grayscale-[10%] group-hover:grayscale-0" 
        />

        {/* Demo Play Overlay */}
        {product.video_url && (
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 bg-black/40 backdrop-blur-[2px]">
            <div 
              className="w-14 h-14 bg-cyan-500 text-black flex items-center justify-center hover:bg-white transition-all transform scale-90 group-hover:scale-100 shadow-2xl"
              onClick={(e) => {
                e.preventDefault();
                window.open(product.video_url, '_blank');
              }}
            >
              <Play size={24} fill="currentColor" />
            </div>
          </div>
        )}
        
        <div className="absolute bottom-4 left-4">
          <span className="bg-black/90 text-white text-[8px] font-black px-3 py-1.5 uppercase tracking-widest">
            {product.category}
          </span>
        </div>
      </Link>

      {/* Info Area */}
      <div className="p-4 sm:p-6 flex flex-col flex-grow">
        <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
          <div className="flex items-center space-x-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={10} className={`${i < Math.floor(product.rating || 5) ? 'fill-cyan-500 text-cyan-500' : 'text-white/20'}`} />
            ))}
            <span className="text-[10px] font-bold text-slate-400 ml-1">({product.reviews || 0})</span>
          </div>
          <div className="flex items-center space-x-1 text-[8px] font-black text-emerald-600 uppercase tracking-widest">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>Live Inventory</span>
          </div>
        </div>

        <Link to={`/product/${product.id}`}>
          <h3 className="text-sm sm:text-base md:text-lg font-black text-white mb-2 leading-tight uppercase tracking-tighter group-hover:text-cyan-400 transition-colors">
            {product.name}
          </h3>
        </Link>
        
        <div 
          className="text-slate-400 text-[9px] sm:text-[10px] leading-relaxed mb-4 sm:mb-6 line-clamp-2 font-medium [&>p]:m-0"
          dangerouslySetInnerHTML={{ __html: product.description }}
        />
        
        <div className="flex flex-col space-y-4 mt-auto pt-4 sm:pt-5 border-t border-white/10">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              {offer.show !== false && (
                <span className={`font-black text-slate-400 uppercase tracking-widest block mb-1 ${offer.size || 'text-[8px]'}`}>
                  {offer.text || 'Standard Price'}
                </span>
              )}
              <div className="flex items-baseline space-x-1.5 sm:space-x-2 h-8">
                {isLoaded ? (
                  hp.hide_main_price !== true ? (
                    <>
                      <span className="text-xl sm:text-2xl font-black text-white tracking-tighter">{formatPrice(product.price)}</span>
                      {hp.hide_full_price !== true && (
                        <span className="text-[9px] sm:text-[10px] text-slate-500 line-through font-bold">
                          {product.old_price 
                            ? formatPrice(product.old_price) 
                            : formatPrice(product.price + (parseInt(hp.global_discount_amount) || 500))}
                        </span>
                      )}
                    </>
                  ) : (
                    <span className="text-[10px] font-black text-cyan-500 uppercase tracking-widest">Price on Inquiry</span>
                  )
                ) : (
                  <div className="w-24 h-6 bg-white/5 animate-pulse" />
                )}
              </div>
            </div>
            
            <button 
              onClick={(e) => {
                e.preventDefault();
                onBuy(product);
              }}
              className="flex-shrink-0 flex items-center space-x-1.5 sm:space-x-2 bg-white/5 hover:bg-cyan-500 text-white hover:text-black border border-white/10 hover:border-cyan-500 px-3 sm:px-4 py-1.5 sm:py-2 font-black uppercase tracking-widest text-[9px] sm:text-[10px] transition-all"
            >
              <span>Buy</span>
              <ShoppingCart size={12} className="w-3 h-3 sm:w-4 sm:h-4" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
