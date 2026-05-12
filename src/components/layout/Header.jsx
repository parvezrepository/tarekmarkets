import React, { useState, useEffect } from 'react';
import { ShoppingCart, Menu, X, Cpu, ArrowRight, DollarSign, Moon, Sun } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useTheme } from '../../context/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';
import ContactModal from '../shared/ContactModal';
import CommunityModal from '../shared/CommunityModal';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isCommunityOpen, setIsCommunityOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const [currency, setCurrency] = useState(() => localStorage.getItem('currency') || 'BDT');
  const { toggleCart, cartCount } = useCart();
  const location = useLocation();
  const [settings, setSettings] = useState({
    announcement: '',
    whatsapp: '',
    telegram: ''
  });

  const toggleCurrency = () => {
    const newCurrency = currency === 'BDT' ? 'USD' : 'BDT';
    setCurrency(newCurrency);
    localStorage.setItem('currency', newCurrency);
    window.dispatchEvent(new Event('currencyChange')); 
  };

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);

    const fetchSettings = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/settings`);
        const data = await response.json();
        if (data && Object.keys(data).length > 0) {
          setSettings(data);
        }
      } catch (err) { console.error(err); }
    };
    fetchSettings();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Products', path: '/shop' },
  ];

  return (
    <>
      {settings.announcement && (
        <div className="announcement-bar py-3 px-6 text-center overflow-hidden relative">
          <div className="absolute inset-0 bg-violet-600/10 animate-pulse" />
          <div className="w-full whitespace-nowrap overflow-hidden">
            <p className={`text-[10px] font-black uppercase tracking-[0.2em] text-white relative z-10 inline-block px-4 ${settings.announcement.length > 50 ? 'animate-marquee' : ''}`}>
              {settings.announcement}
            </p>
          </div>
        </div>
      )}

      <nav className={`sticky top-0 w-full z-50 transition-all duration-700 ${
        isScrolled 
          ? 'bg-white/70 dark:bg-[#020617]/70 backdrop-blur-2xl border-b border-slate-200/50 dark:border-slate-800/50 shadow-2xl py-3' 
          : 'bg-white dark:bg-[#020617] py-6'
      }`}>
        <div className="container mx-auto px-6 flex items-center justify-between">
          <Link to="/" className="flex items-center group">
            <div className="w-8 h-8 bg-black dark:bg-white flex items-center justify-center mr-3 group-hover:rotate-12 transition-transform">
               <span className="text-white dark:text-black font-black text-xs">D</span>
            </div>
            <span className="text-2xl font-black font-heading tracking-tighter text-black dark:text-white uppercase">
              TradeKit
            </span>
          </Link>

          <div className="hidden lg:flex items-center space-x-12">
            <div className="flex items-center space-x-10">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`text-[11px] font-black uppercase tracking-widest transition-all hover:text-violet-600 relative group ${
                    location.pathname === link.path ? 'text-black dark:text-white' : 'text-slate-500 dark:text-slate-400'
                  }`}
                >
                  {link.name}
                  <span className={`absolute -bottom-2 left-0 h-0.5 bg-violet-600 transition-all duration-300 ${
                    location.pathname === link.path ? 'w-full' : 'w-0 group-hover:w-full'
                  }`} />
                </Link>
              ))}
              <button onClick={() => setIsContactOpen(true)} className="text-[11px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 hover:text-violet-600 transition-all relative group">
                Contact
                <span className="absolute -bottom-2 left-0 h-0.5 w-0 bg-violet-600 group-hover:w-full transition-all duration-300" />
              </button>
              <button onClick={() => setIsCommunityOpen(true)} className="text-[11px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 hover:text-violet-600 transition-all relative group">
                Community
                <span className="absolute -bottom-2 left-0 h-0.5 w-0 bg-violet-600 group-hover:w-full transition-all duration-300" />
              </button>
            </div>
            
            <div className="h-6 w-px bg-slate-100 dark:bg-slate-800 mx-2" />

            <div className="flex items-center space-x-6">
              {/* Theme Toggle */}
              <button 
                onClick={toggleTheme}
                className="p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 hover:border-black dark:hover:border-white transition-all group"
              >
                {theme === 'dark' ? (
                  <Sun size={16} className="text-amber-400 group-hover:rotate-90 transition-transform duration-500" />
                ) : (
                  <Moon size={16} className="text-slate-600 group-hover:-rotate-12 transition-transform" />
                )}
              </button>

              {/* Currency Toggle */}
              <button 
                onClick={toggleCurrency}
                className="flex items-center space-x-2 bg-slate-50 dark:bg-slate-800 px-4 py-2 border border-slate-100 dark:border-slate-700 group hover:border-black dark:hover:border-white transition-all"
              >
                <DollarSign size={14} className={currency === 'USD' ? 'text-violet-600' : 'text-slate-400'} />
                <span className="text-[10px] font-black uppercase tracking-widest text-black dark:text-white">{currency}</span>
              </button>

              <button 
                onClick={toggleCart}
                className="relative p-2 text-black dark:text-white hover:text-violet-600 transition-colors group"
              >
                <ShoppingCart size={20} className="group-hover:scale-110 transition-transform" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-violet-600 text-white text-[8px] font-black w-5 h-5 flex items-center justify-center border-2 border-white dark:border-[#020617] shadow-lg">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>

          <button className="lg:hidden text-black dark:text-white p-2 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="lg:hidden absolute top-full left-0 w-full bg-white dark:bg-[#020617] border-b border-slate-100 dark:border-slate-800 shadow-2xl overflow-hidden"
            >
              <div className="flex flex-col p-8 space-y-6">
                {navLinks.map((link) => (
                  <Link key={link.name} to={link.path} onClick={() => setIsOpen(false)} className="text-lg font-black uppercase tracking-tighter text-black dark:text-white flex items-center justify-between group">
                    <span>{link.name}</span>
                    <ArrowRight size={18} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                ))}
                <button onClick={() => { setIsOpen(false); setIsContactOpen(true); }} className="text-lg font-black uppercase tracking-tighter text-black dark:text-white flex items-center justify-between group">
                  <span>Contact</span>
                  <ArrowRight size={18} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
                <button onClick={() => { setIsOpen(false); setIsCommunityOpen(true); }} className="text-lg font-black uppercase tracking-tighter text-black dark:text-white flex items-center justify-between group">
                  <span>Community</span>
                  <ArrowRight size={18} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
                <div className="pt-8 border-t border-slate-50 dark:border-slate-800 flex flex-col space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <button onClick={toggleTheme} className="flex items-center justify-between w-full bg-slate-50 dark:bg-slate-800 p-5 font-black uppercase tracking-widest text-[10px] text-black dark:text-white">
                      <span>{theme === 'dark' ? 'Light' : 'Dark'}</span>
                      {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
                    </button>
                    <button onClick={toggleCurrency} className="flex items-center justify-between w-full bg-slate-50 dark:bg-slate-800 p-5 font-black uppercase tracking-widest text-[10px] text-black dark:text-white">
                      <span>{currency === 'BDT' ? 'USD' : 'BDT'}</span>
                      <DollarSign size={16} />
                    </button>
                  </div>
                  <button onClick={() => { setIsOpen(false); toggleCart(); }} className="flex items-center justify-between w-full bg-slate-50 dark:bg-slate-800 p-5 font-black uppercase tracking-widest text-[10px] text-black dark:text-white">
                    <div className="flex items-center space-x-3">
                      <ShoppingCart size={18} />
                      <span>Shopping Cart</span>
                    </div>
                    <span className="bg-black dark:bg-violet-600 text-white px-2 py-1">{cartCount}</span>
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} settings={settings} />
      <CommunityModal isOpen={isCommunityOpen} onClose={() => setIsCommunityOpen(false)} settings={settings} />
    </>
  );
};

export default Header;
