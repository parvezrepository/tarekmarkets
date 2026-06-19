import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { products as productsData } from '../data/products';
import ProductCard from '../components/product/ProductCard';
import { ProductCardSkeleton } from '../components/shared/Skeleton';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  ShoppingBag, 
  Plus, 
  Minus, 
  MessageCircle, 
  Send, 
  Smartphone,
  ChevronRight,
  ShieldCheck,
  Zap,
  HelpCircle,
  X
} from 'lucide-react';
import BuyModal from '../components/shared/BuyModal';

import ContactModal from '../components/shared/ContactModal';
import CommunityModal from '../components/shared/CommunityModal';

const FAQItem = ({ faq, isOpen, toggle }) => (
  <div className="faq-item">
    <button onClick={toggle} className="faq-trigger group py-4">
      <span className="text-[11px] md:text-xs font-black uppercase tracking-wider group-hover:text-violet-600 transition-colors">{faq.question}</span>
      {isOpen ? <Minus size={14} className="text-violet-600" /> : <Plus size={14} className="text-slate-300 group-hover:text-black transition-colors" />}
    </button>
    <div className={`faq-content ${isOpen ? 'max-h-96 pb-6' : 'max-h-0'}`}>
      <p className="text-slate-500 font-medium text-[11px] leading-relaxed">
        {faq.answer}
      </p>
    </div>
  </div>
);

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [settings, setSettings] = useState({
    testimonials: [],
    faqs: [],
    whatsapp: '',
    telegram: '',
    home_product_count: 3,
    loaded: false,
    homepage_settings: {
      hero_badge: { text: 'TRADERVAULT', show: true },
      hero_title: { text: 'MASTER THE MARKETS', show: true },
      hero_subtitle: { text: 'Unlock professional-grade trading courses. Trusted by thousands.', show: true },
      hero_btn1: { text: 'EXPLORE MARKETPLACE', show: true },
      hero_btn2: { text: 'JOIN COMMUNITY', show: true }
    }
  });
  const getInitialView = () => {
    const saved = localStorage.getItem('productViewSize');
    return saved === 'large' ? 'large' : 'small';
  };
  const [viewSize, setViewSize] = useState(getInitialView);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isBuyModalOpen, setIsBuyModalOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isCommunityModalOpen, setIsCommunityModalOpen] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState(null);
  const [showNotification, setShowNotification] = useState(false);
  const [recentBuyer, setRecentBuyer] = useState('');
  const [recentProduct, setRecentProduct] = useState('');

  const buyers = [
    'Aarav Hasan', 'Aisha Rahman', 'Fahim Hasan', 'Nusrat Jahan', 'Rakibul Islam', 'Samiha Noor', 'Tanvir Ahmed', 'Mim Akter', 
    'Adnan Karim', 'Sadia Afrin', 'Mehedi Hasan', 'Zara Islam', 'Shadman Sakib', 'Tamanna Islam', 'Raihan Ahmed', 'Lamia Rahman', 
    'Akib Hossain', 'Priya Sultana', 'Farhan Ahmed', 'Tanjila Akter', 'Hasan Mahmud', 'Maliha Noor', 'Jisan Karim', 'Sharmin Sultana', 
    'Nafis Ahmed', 'Tanha Noor', 'Saif Rahman', 'Maria Sultana', 'Omar Faruk', 'Anika Tabassum', 'Rayhan Chowdhury', 'Rukaiya Rahman', 
    'Imran Hossain', 'Afsana Mimi', 'Siam Hasan', 'Habiba Noor', 'Mahadi Hasan', 'Sana Jahan', 'Ridwan Hasan', 'Faria Sultana', 
    'Arif Mahmud', 'Sumaiya Rahman', 'Towsif Karim', 'Nafisa Islam', 'Mahin Ahmed', 'Naima Jannat', 'Rakib Hasan', 'Afifa Noor', 
    'Rashed Karim', 'Bushra Jahan', 'Zayan Hossain', 'Israt Jahan', 'Samiul Islam', 'Noshin Tabassum', 'Shohan Ahmed', 'Raisa Islam', 
    'Minhaj Uddin', 'Jannatul Ferdous', 'Sabbir Ahmed', 'Alifa Tasnim', 'Tahmid Rahman', 'Safa Tasnim', 'Fardin Islam', 'Rima Akter', 
    'Asif Iqbal', 'Tasmia Rahman', 'Zubair Rahman', 'Ayesha Siddika', 'Nazmul Hasan', 'Tahsin Nawar', 'Miraj Hossain', 'Yasmin Akter', 
    'Fahad Rahman', 'Mehazabin Chowdhury', 'Arman Hossain', 'Mahrin Islam', 'Naim Islam', 'Fatema Tuz Zahra', 'Wasif Rahman', 'Dilruba Akter', 
    'Shihab Uddin', 'Samiha Noor', 'Parvez Ahmed', 'Rafia Jahan', 'Sajid Hasan', 'Humaira Islam', 'Yusuf Mahmud', 'Sadika Noor', 
    'Tamim Iqbal', 'Maisha Rahman', 'Fuad Karim', 'Sabrina Islam', 'Emon Hasan', 'Chandni Sultana', 'Mizanur Rahman', 'Faiza Karim', 
    'Ashikur Rahman', 'Lubaba Noor', 'Hridoy Hasan', 'Rumana Akter', 'Jubayer Rahman', 'Sayma Akter', 'Monir Hossain', 'Oyshee Rahman', 
    'Nayeem Hasan', 'Fariha Noor', 'Sohel Rana', 'Nadia Afrin', 'Sakib Al Hasan', 'Shefa Tasnim', 'Abu Sayeed', 'Samira Jahan', 
    'Iftekhar Ahmed', 'Kaniz Fatema', 'Badhon Ahmed', 'Elma Chowdhury', 'Mahmudul Hasan', 'Shanjida Akter', 'Rasel Ahmed', 'Tuba Jannat', 
    'Rifat Karim', 'Sanjida Rahman', 'Murad Karim', 'Adiba Noor', 'Kamrul Hasan', 'Sharika Noor', 'Nafiz Hossain', 'Sumona Akter', 
    'Labib Ahmed', 'Ayat Jannat', 'Alvi Rahman', 'Rahima Khatun', 'Belal Hossain', 'Neha Islam', 'Jamil Uddin', 'Hafsa Jahan', 
    'Aslam Uddin', 'Naureen Jahan', 'Munim Hasan', 'Borsha Akter', 'Ovi Hasan', 'Roksana Yasmin', 'Moinul Islam', 'Arpita Sultana', 
    'Sadiqur Rahman', 'Iffat Ara', 'Shawon Hasan', 'Dola Rahman', 'Morshed Alam', 'Mehjabin Noor', 'Salman Rahman', 'Tabassum Mim', 
    'Ahmed Rafi', 'Ritu Sultana', 'Atikur Rahman', 'Mahjabin Akter', 'Sharif Hossain', 'Juthi Akter', 'Afnan Rahman', 'Promi Akter', 
    'Habibur Rahman', 'Munira Sultana', 'Ishrak Ahmed', 'Nuzhat Tasnim', 'Jaber Alvi', 'Tasfia Rahman', 'Azmain Karim', 'Marium Islam', 
    'Anisur Rahman', 'Afreen Jahan', 'Mahfuz Rahman', 'Anjum Ara'
  ];
  
  const fallbackItems = ['Binary Trading Course', 'Forex Trading Course', 'Crypto Trading Course'];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/products`);
        const data = await response.json();
        if (data && data.length > 0 && !data.message) {
          setProducts(data);
        } else {
          setProducts(productsData);
        }
      } catch (err) { 
        console.error(err); 
        setProducts(productsData);
      }
    };

    const fetchSettings = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/settings`);
        const data = await response.json();
        if (data && Object.keys(data).length > 0) {
          setSettings({ ...data, loaded: true });
        } else {
          setSettings(prev => ({ ...prev, loaded: true }));
        }
      } catch (err) { 
        console.error(err); 
        setSettings(prev => ({ ...prev, loaded: true }));
      }
    };

    const init = async () => {
      setLoading(true);
      await Promise.all([fetchProducts(), fetchSettings()]);
      setLoading(false);
    };

    init();

    const interval = setInterval(() => {
      const randomBuyer = buyers[Math.floor(Math.random() * buyers.length)];
      setRecentBuyer(randomBuyer);
      
      // Use actual products if available, else fallback
      setProducts(prevProducts => {
        if (prevProducts.length > 0) {
          const randomProduct = prevProducts[Math.floor(Math.random() * prevProducts.length)];
          setRecentProduct(randomProduct.name);
        } else {
          setRecentProduct(fallbackItems[Math.floor(Math.random() * fallbackItems.length)]);
        }
        return prevProducts;
      });

      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 5000);
    }, 15000);
    return () => clearInterval(interval);
  }, []);

  const handleBuy = (product) => {
    setSelectedProduct(product);
    setIsBuyModalOpen(true);
  };

  // Duplicate testimonials for seamless loop
  const displayTestimonials = [...(settings.testimonials || []), ...(settings.testimonials || [])];

  useEffect(() => {
    localStorage.setItem('productViewSize', viewSize);
  }, [viewSize]);

  const getGridClass = () => {
    if (viewSize === 'large') return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8';
    return 'grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-6';
  };

  const hp = settings.homepage_settings || {};

  return (
    <div className="flex flex-col min-h-screen">
      {/* Vibe Hero Section */}
      <section className="pt-8 pb-8">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative bg-[#0a0a0a] rounded-none py-8 md:py-12 px-6 overflow-hidden text-center"
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[500px] aspect-square bg-violet-600/10 blur-[100px] rounded-full pointer-events-none" />
            
            <div className="relative z-10 max-w-4xl mx-auto">
              {hp.hero_badge?.show !== false && (
                <div className="inline-flex items-center space-x-2 bg-white/5 border border-white/10 px-4 py-1.5 rounded-none mb-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-violet-500 animate-ping" />
                  <span className={`font-black text-white uppercase tracking-[0.3em] ${hp.hero_badge?.size || 'text-[8px]'}`}>
                    {hp.hero_badge?.text || 'System Status: Operational'}
                  </span>
                </div>
              )}
              
              {hp.hero_title?.show !== false && (
                <h1 className={`font-black font-heading text-white leading-[1.1] mb-4 tracking-tighter uppercase ${hp.hero_title?.size || 'text-3xl sm:text-4xl md:text-5xl'}`}>
                  {hp.hero_title?.text || 'Master Trading.'}
                </h1>
              )}
              {hp.hero_subtitle?.show !== false && (
                <p className={`text-slate-400 font-medium mb-6 max-w-2xl mx-auto leading-relaxed ${hp.hero_subtitle?.size || 'text-sm md:text-base'}`}>
                  {hp.hero_subtitle?.text || 'Unlock professional-grade trading courses. Trusted by thousands.'}
                </p>
              )}
              
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                {hp.hero_btn1?.show !== false && (
                  <Link to="/shop" className={`bg-white text-black px-8 py-4 font-black uppercase tracking-widest hover:bg-violet-500 hover:text-white transition-all text-center ${hp.hero_btn1?.size || 'text-[10px] sm:text-[9px]'}`}>
                     {hp.hero_btn1?.text || 'Explore Courses'}
                  </Link>
                )}
                {hp.hero_btn2?.show !== false && (
                  <button 
                    onClick={() => setIsCommunityModalOpen(true)}
                    className={`bg-transparent border border-white/20 text-white px-8 py-4 font-black uppercase tracking-widest hover:border-violet-500 hover:bg-violet-600/10 transition-all text-center ${hp.hero_btn2?.size || 'text-[10px] sm:text-[9px]'}`}
                  >
                    {hp.hero_btn2?.text || 'Join Community'}
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Grid */}
      <section className="py-16 relative z-10">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 text-center md:text-left">
            <div>
              {hp.popular_badge?.show !== false && (
                <div className={`font-black text-violet-600 uppercase tracking-widest mb-2 flex items-center justify-center md:justify-start ${hp.popular_badge?.size || 'text-[9px]'}`}>
                   <div className="w-8 h-px bg-violet-600 mr-3" />
                   {hp.popular_badge?.text || 'Premium Courses'}
                </div>
              )}
              {hp.popular_title?.show !== false && (
                <h2 className={`font-black font-heading text-black dark:text-white uppercase tracking-tighter ${hp.popular_title?.size || 'text-3xl'}`}>
                  {hp.popular_title?.text || 'Most Popular Courses'}
                </h2>
              )}
            </div>
            
            <div className="flex items-center space-x-3 justify-center">
              <span className="text-[9px] font-black uppercase tracking-widest text-slate-500 hidden sm:block">View Size:</span>
              <div className="flex bg-[#0a0a0a] border border-white/10 rounded overflow-hidden shadow-xl">
                <button 
                  onClick={() => setViewSize('large')} 
                  className={`p-2 sm:px-4 border-r border-white/10 transition-all ${viewSize === 'large' ? 'bg-cyan-500 text-black' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
                  title="Large Size"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2"/></svg>
                </button>
                <button 
                  onClick={() => setViewSize('small')} 
                  className={`p-2 sm:px-4 transition-all ${viewSize === 'small' ? 'bg-cyan-500 text-black' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
                  title="Small Size"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect width="4" height="4" x="3" y="3" rx="1"/><rect width="4" height="4" x="10" y="3" rx="1"/><rect width="4" height="4" x="17" y="3" rx="1"/><rect width="4" height="4" x="3" y="10" rx="1"/><rect width="4" height="4" x="10" y="10" rx="1"/><rect width="4" height="4" x="17" y="10" rx="1"/><rect width="4" height="4" x="3" y="17" rx="1"/><rect width="4" height="4" x="10" y="17" rx="1"/><rect width="4" height="4" x="17" y="17" rx="1"/></svg>
                </button>
              </div>
            </div>
          </div>

          <div className={`grid ${getGridClass()} ${viewSize === 'large' ? 'mb-16' : ''}`}>
            {loading ? (
              [...Array(settings.home_product_count || 3)].map((_, i) => <ProductCardSkeleton key={i} />)
            ) : (
              <>
                {products.slice(0, settings.home_product_count || 3).map((product) => (
                  <ProductCard key={product.id} product={product} onBuy={handleBuy} settings={settings} />
                ))}

                {viewSize === 'small' && products.length > (settings.home_product_count || 3) && (
                  <Link 
                    to="/shop" 
                    className="group flex flex-col items-center justify-center h-full min-h-[250px] bg-[#0a0a0a] border border-cyan-500/30 hover:bg-cyan-500 hover:border-cyan-500 transition-all text-center p-6 shadow-xl shadow-cyan-500/5"
                  >
                    <div className="w-12 h-12 rounded-full bg-cyan-500/20 flex items-center justify-center mb-4 group-hover:bg-black transition-all">
                      <ArrowRight size={20} className="text-cyan-500 group-hover:text-cyan-400" />
                    </div>
                    <span className="text-[10px] md:text-xs font-black uppercase tracking-widest text-cyan-400 group-hover:text-black">Explore More</span>
                  </Link>
                )}
              </>
            )}
          </div>
          
          {viewSize === 'large' && products.length > (settings.home_product_count || 3) && (
            <div className="flex justify-center">
              <Link 
                to="/shop" 
                className="group flex items-center space-x-3 bg-[#0a0a0a] border border-cyan-500/30 px-10 py-5 font-black uppercase tracking-widest text-[11px] text-white hover:bg-cyan-500 hover:text-black hover:shadow-xl hover:shadow-cyan-500/20 transition-all"
              >
                <span>Show All Courses</span>
                <ArrowRight size={16} className="transform group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Combined Proof & FAQ Section */}
      {(hp.show_proof_section !== false || hp.show_faq_section !== false) && (
        <section className="py-24 border-y border-slate-100 dark:border-slate-800/50 bg-slate-50/50 dark:bg-slate-900/20">
          <div className="container mx-auto px-6">
            <div className={`grid grid-cols-1 ${hp.show_proof_section !== false && hp.show_faq_section !== false ? 'lg:grid-cols-2 gap-16' : ''} items-start`}>
              
              {/* Proof Gallery */}
              {hp.show_proof_section !== false && (
                <div className="overflow-hidden">
                  <div className="mb-10 text-center lg:text-left">
                    {hp.proof_badge?.show !== false && (
                      <div className={`font-black text-violet-600 uppercase tracking-widest mb-3 ${hp.proof_badge?.size || 'text-[10px]'}`}>{hp.proof_badge?.text || 'Live Performance'}</div>
                    )}
                    {hp.proof_title?.show !== false && (
                      <h2 className={`font-black uppercase tracking-tighter text-black dark:text-white ${hp.proof_title?.size || 'text-3xl'}`}>{hp.proof_title?.text || 'Verified Proof Gallery'}</h2>
                    )}
                  </div>
                  
                  <div className="relative">
                    <motion.div 
                      className="flex gap-4"
                      animate={{ x: ["0%", "-50%"] }}
                      transition={{ duration: 25, ease: "linear", repeat: Infinity }}
                    >
                      {displayTestimonials.map((t, i) => (
                        <div key={i} className="min-w-[280px] md:min-w-[320px] aspect-video bg-black overflow-hidden vibe-card">
                          <img src={t.image} alt="Proof" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" />
                        </div>
                      ))}
                    </motion.div>
                    {/* Gradient overlays for the carousel */}
                    <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-slate-50 dark:from-[#020617] to-transparent z-10" />
                    <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-slate-50 dark:from-[#020617] to-transparent z-10" />
                  </div>
                </div>
              )}

              {/* FAQ Section */}
              {hp.show_faq_section !== false && (
                <div>
                  <div className="mb-10 text-center lg:text-left">
                    {hp.faq_badge?.show !== false && (
                      <div className={`font-black text-violet-600 uppercase tracking-widest mb-3 ${hp.faq_badge?.size || 'text-[10px]'}`}>{hp.faq_badge?.text || 'Support Center'}</div>
                    )}
                    {hp.faq_title?.show !== false && (
                      <h2 className={`font-black uppercase tracking-tighter text-black dark:text-white ${hp.faq_title?.size || 'text-3xl'}`}>{hp.faq_title?.text || 'Common Inquiries'}</h2>
                    )}
                  </div>
                  
                  <div className="bg-white dark:bg-[#0a0a0a]/40 border border-slate-100 dark:border-slate-800 p-6 md:p-8 shadow-xl">
                    {settings.faqs?.length > 0 ? (
                      settings.faqs.slice(0, 6).map((faq, i) => (
                        <FAQItem 
                          key={i} 
                          faq={faq} 
                          isOpen={openFaqIndex === i} 
                          toggle={() => setOpenFaqIndex(openFaqIndex === i ? null : i)} 
                        />
                      ))
                    ) : (
                      <p className="text-center text-slate-400 font-black uppercase tracking-widest text-[10px] py-10">Updating Support Database...</p>
                    )}
                  </div>
                </div>
              )}

            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-24 bg-black dark:bg-[#0a0a0a] overflow-hidden relative">
        <div className="absolute inset-0 bg-violet-600/5 blur-[100px]" />
        <div className="container mx-auto px-6 text-center relative z-10">
          {hp.cta_title?.show !== false && (
            <h2 className={`font-black font-heading text-white mb-10 uppercase tracking-tighter max-w-4xl mx-auto leading-none ${hp.cta_title?.size || 'text-4xl md:text-6xl'}`}>
              {hp.cta_title?.text || 'Ready to scale your trading edge?'}
            </h2>
          )}
          {hp.cta_btn?.show !== false && (
            <button 
              onClick={() => setIsContactModalOpen(true)}
              className={`bg-violet-600 text-white px-14 py-6 font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all ${hp.cta_btn?.size || 'text-[10px]'}`}
            >
              {hp.cta_btn?.text || 'Get Instant Access'}
            </button>
          )}
        </div>
      </section>

      {/* Notification */}
      <AnimatePresence>
        {showNotification && (
          <motion.div 
            initial={{ opacity: 0, x: -100 }} 
            animate={{ opacity: 1, x: 0 }} 
            exit={{ opacity: 0, x: -100 }} 
            className="fixed bottom-4 left-4 sm:bottom-8 sm:left-8 z-[100] bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-3 sm:p-4 shadow-2xl flex items-center space-x-3 sm:space-x-4 max-w-[280px] sm:max-w-xs scale-90 sm:scale-100 origin-bottom-left"
          >
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-black dark:bg-violet-600 flex items-center justify-center flex-shrink-0">
              <ShoppingBag size={18} className="text-white" />
            </div>
            <div className="min-w-0">
              <div className="text-[9px] sm:text-[10px] font-black text-black dark:text-white uppercase tracking-tight">Recent Purchase</div>
              <div className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-400 font-medium truncate">
                <span className="font-black text-violet-600 dark:text-violet-400">{recentBuyer}</span> bought {recentProduct}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Modals */}
      {selectedProduct && (
        <BuyModal
          isOpen={isBuyModalOpen}
          onClose={() => setIsBuyModalOpen(false)}
          product={selectedProduct}
        />
      )}
      
      <ContactModal 
        isOpen={isContactModalOpen} 
        onClose={() => setIsContactModalOpen(false)} 
        settings={settings}
      />

      <CommunityModal 
        isOpen={isCommunityModalOpen} 
        onClose={() => setIsCommunityModalOpen(false)} 
        settings={settings}
      />
    </div>
  );
};

export default Home;
