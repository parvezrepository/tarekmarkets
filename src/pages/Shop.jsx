import React, { useState, useEffect } from 'react';
import ProductCard from '../components/product/ProductCard';
import { Search, SlidersHorizontal, ArrowUpDown, ChevronDown, CheckCircle2 } from 'lucide-react';
import BuyModal from '../components/shared/BuyModal';
import { motion, AnimatePresence } from 'framer-motion';
import { ProductCardSkeleton } from '../components/shared/Skeleton';

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('newest');
  const getInitialView = () => {
    const saved = localStorage.getItem('productViewSize');
    return saved === 'large' ? 'large' : 'small';
  };
  const [viewSize, setViewSize] = useState(getInitialView);

  const [categories, setCategories] = useState(['All', 'MT4 Indicators', 'Forex Robots', 'Trading Tools', 'Indicators']);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/products`);
        const data = await response.json();
        setProducts(data);
        setFilteredProducts(data);
      } catch (err) {
        console.error('Products fetch error:', err);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/settings`);
        const data = await response.json();
        if (data && data.categories) {
          setCategories(['All', ...data.categories]);
        }
      } catch (err) {
        console.error('Categories fetch error:', err);
      }
    };

    const init = async () => {
      setLoading(true);
      await Promise.all([fetchProducts(), fetchCategories()]);
      setLoading(false);
    };
    init();
  }, []);

  useEffect(() => {
    let result = products;

    // Filter by Search
    if (searchTerm) {
      result = result.filter(p => 
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (p.description && p.description.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Filter by Category
    if (selectedCategory !== 'All') {
      result = result.filter(p => p.category === selectedCategory);
    }

    // Sort
    result = [...result].sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      return b.id - a.id; // Newest
    });

    setFilteredProducts(result);
  }, [searchTerm, selectedCategory, sortBy, products]);

  useEffect(() => {
    localStorage.setItem('productViewSize', viewSize);
  }, [viewSize]);

  const getGridClass = () => {
    if (viewSize === 'large') return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10';
    return 'grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6';
  };

  const handleBuy = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Premium Shop Header */}
      <section className="bg-black py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-violet-600/5 blur-[100px]" />
        <div className="container mx-auto px-6 relative z-10 text-center">
          <div className="text-[10px] font-black text-violet-500 uppercase tracking-widest mb-4">Marketplace</div>
          <h1 className="text-4xl md:text-7xl font-black text-white uppercase tracking-tighter mb-8">Professional Assets</h1>
          
          {/* Advanced Search Bar */}
          <div className="max-w-2xl mx-auto relative group">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-violet-500 transition-colors" size={20} />
            <input 
              type="text" 
              placeholder="Search indicators, bots, filter by name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white/5 border border-white/10 px-16 py-6 text-white font-bold outline-none focus:border-violet-600 transition-all text-sm"
            />
            <div className="absolute right-6 top-1/2 -translate-y-1/2 text-[10px] font-black text-slate-500 uppercase tracking-widest hidden md:block">
              {filteredProducts.length} Results
            </div>
          </div>
        </div>
      </section>

      {/* Filter Bar */}
      <div className="sticky top-[80px] z-40 bg-white/80 backdrop-blur-xl border-b border-slate-100 py-4">
        <div className="container mx-auto px-6 flex flex-wrap items-center justify-between gap-6">
          <div className="flex items-center space-x-2 overflow-x-auto no-scrollbar pb-2 md:pb-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`whitespace-nowrap px-6 py-2.5 text-[10px] font-black uppercase tracking-widest transition-all ${
                  selectedCategory === cat 
                    ? 'bg-black text-white' 
                    : 'bg-slate-50 text-slate-400 hover:text-black'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-3 text-[10px] font-black uppercase tracking-widest text-slate-400">
               <ArrowUpDown size={14} />
               <span>Sort By:</span>
               <select 
                 value={sortBy}
                 onChange={(e) => setSortBy(e.target.value)}
                 className="bg-transparent text-black outline-none cursor-pointer border-b-2 border-black/10 focus:border-black transition-all pb-1"
               >
                 <option value="newest">Newest First</option>
                 <option value="price-low">Price: Low to High</option>
                 <option value="price-high">Price: High to Low</option>
               </select>
             </div>
             
             <div className="flex items-center space-x-2 border-l border-slate-200 pl-6 ml-2 hidden sm:flex">
               <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">View:</span>
               <div className="flex bg-slate-50 border border-slate-200 rounded overflow-hidden">
                 <button 
                   onClick={() => setViewSize('large')} 
                   className={`p-2 border-r border-slate-200 transition-all ${viewSize === 'large' ? 'bg-violet-600 text-white' : 'text-slate-400 hover:text-black hover:bg-slate-100'}`}
                   title="Large Size"
                 >
                   <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2"/></svg>
                 </button>
                 <button 
                   onClick={() => setViewSize('small')} 
                   className={`p-2 transition-all ${viewSize === 'small' ? 'bg-violet-600 text-white' : 'text-slate-400 hover:text-black hover:bg-slate-100'}`}
                   title="Small Size"
                 >
                   <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect width="4" height="4" x="3" y="3" rx="1"/><rect width="4" height="4" x="10" y="3" rx="1"/><rect width="4" height="4" x="17" y="3" rx="1"/><rect width="4" height="4" x="3" y="10" rx="1"/><rect width="4" height="4" x="10" y="10" rx="1"/><rect width="4" height="4" x="17" y="10" rx="1"/><rect width="4" height="4" x="3" y="17" rx="1"/><rect width="4" height="4" x="10" y="17" rx="1"/><rect width="4" height="4" x="17" y="17" rx="1"/></svg>
                 </button>
               </div>
             </div>
          </div>
        </div>
      </div>

      <section className="py-16">
        <div className="container mx-auto px-6">
          <AnimatePresence mode="popLayout">
            <motion.div 
              layout
              className={`grid ${getGridClass()}`}
            >
              {loading ? (
                [...Array(6)].map((_, i) => <ProductCardSkeleton key={i} />)
              ) : (
                filteredProducts.map((product) => (
                  <motion.div
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    key={product.id}
                  >
                    <ProductCard product={product} onBuy={handleBuy} />
                  </motion.div>
                ))
              )}
            </motion.div>
          </AnimatePresence>

          {filteredProducts.length === 0 && (
            <div className="text-center py-32 border-2 border-dashed border-slate-100">
              <div className="w-16 h-16 bg-slate-50 flex items-center justify-center mx-auto mb-6 text-slate-300">
                <Search size={32} />
              </div>
              <h3 className="text-xl font-black uppercase tracking-tighter text-slate-300">No matching assets found</h3>
              <button 
                onClick={() => { setSearchTerm(''); setSelectedCategory('All'); }}
                className="mt-6 text-[10px] font-black text-violet-600 uppercase tracking-widest hover:underline"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </section>

      <BuyModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} product={selectedProduct} />
    </div>
  );
};

export default Shop;
