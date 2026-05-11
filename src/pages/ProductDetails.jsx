import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ShoppingCart, 
  ArrowLeft, 
  Star, 
  CheckCircle2, 
  Zap, 
  ShieldCheck, 
  Download,
  AlertCircle,
  Clock,
  ArrowRight,
  Send,
  MessageCircle,
  Smartphone,
  Check,
  Package,
  Lock,
  Edit2,
  Monitor,
  Apple,
  Layout,
  Play
} from 'lucide-react';
import BuyModal from '../components/shared/BuyModal';
import { Loader2 } from 'lucide-react';

const IconMap = {
  Zap,
  ShieldCheck,
  Smartphone,
  MessageCircle,
  CheckCircle2,
  Download,
  Package,
  Lock,
  Edit2
};

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [settings, setSettings] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [prodRes, settingsRes] = await Promise.all([
          fetch(`${import.meta.env.VITE_API_URL}/products/${id}`),
          fetch(`${import.meta.env.VITE_API_URL}/settings`)
        ]);
        const prodData = await prodRes.json();
        const settingsData = await settingsRes.json();
        setProduct(prodData);
        setSettings(settingsData);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (loading) return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center">
      <Loader2 className="animate-spin text-cyan-500" size={48} />
    </div>
  );

  if (!product) {
    return (
      <div className="min-h-screen bg-[#020617] flex items-center justify-center p-6">
        <div className="text-center">
          <AlertCircle size={64} className="mx-auto text-rose-500 mb-6" />
          <h2 className="text-3xl font-black text-white mb-4 uppercase tracking-tighter">Product Not Found</h2>
          <Link to="/shop" className="text-cyan-500 font-black uppercase tracking-widest text-xs border-b-2 border-cyan-500 pb-1">Back to Store</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020617] text-white selection:bg-cyan-500 selection:text-black overflow-x-hidden">
      {/* Premium Header */}
      <nav className="fixed top-0 w-full z-50 bg-[#020617]/80 backdrop-blur-md border-b border-white/5 py-6 px-6 md:px-12 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-3 group">
          <div className="w-8 h-8 bg-cyan-500 flex items-center justify-center rotate-45 group-hover:rotate-0 transition-transform duration-500">
             <Zap size={16} className="text-black -rotate-45 group-hover:rotate-0 transition-transform duration-500" />
          </div>
          <span className="text-xl font-black font-heading tracking-tighter uppercase">TradeKit<span className="text-cyan-500">Pro</span></span>
        </Link>
        <Link to="/shop" className="flex items-center space-x-2 bg-white/5 hover:bg-white/10 px-6 py-2.5 transition-all text-[10px] font-black uppercase tracking-widest border border-white/10">
          <ArrowLeft size={14} />
          <span>Back to Store</span>
        </Link>
      </nav>

      <div className="pt-32 pb-20 container mx-auto px-6 max-w-6xl">
        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-32">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="relative"
          >
            <div className="absolute -inset-4 bg-cyan-500/20 blur-[80px] rounded-full" />
            <div className="relative aspect-square bg-[#0a0a0a] border border-white/10 p-8 shadow-2xl">
              <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-10"
          >
            <div>
              <h1 className="text-5xl md:text-7xl font-black font-heading leading-[1] mb-6 uppercase tracking-tighter text-white">
                {product.name}
              </h1>
              <div 
                className="text-slate-300 text-lg font-medium max-w-lg leading-relaxed prose prose-invert prose-sm"
                dangerouslySetInnerHTML={{ __html: product.description }}
              />
            </div>

            <div className="flex flex-wrap gap-3">
              {['Professional Grade', 'Hyper-realistic', 'All Devices'].map((tag) => (
                <span key={tag} className="px-5 py-2 bg-[#0a0a0a] border border-cyan-500/30 text-cyan-400 text-[9px] font-black uppercase tracking-widest rounded-full">
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap gap-4 pt-4 w-full">
              {(() => {
                const productUrl = typeof window !== 'undefined' ? window.location.href : '';
                const messageText = `Hello! I want to buy ${product.name} for ৳${product.price}.\n\nProduct Link: ${productUrl}`;
                const encodedMessage = encodeURIComponent(messageText);
                const waNumber = settings.whatsapp ? settings.whatsapp.replace(/[^0-9]/g, '') : '';
                const tgUsername = settings.telegram ? settings.telegram.replace('@', '') : '';
                
                const whatsappUrl = `https://wa.me/${waNumber}?text=${encodedMessage}`;
                const telegramUrl = `https://t.me/${tgUsername}?text=${encodedMessage}`;

                return (
                  <>
                    <a 
                      href={telegramUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 min-w-[140px] flex items-center justify-center space-x-3 bg-[#0088cc] px-6 py-5 font-black uppercase tracking-widest text-[11px] hover:shadow-xl hover:shadow-[#0088cc]/20 transition-all text-white"
                    >
                      <Send size={18} />
                      <span>Telegram</span>
                    </a>
                    <a 
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 min-w-[140px] flex items-center justify-center space-x-3 bg-[#25d366] px-6 py-5 font-black uppercase tracking-widest text-[11px] hover:shadow-xl hover:shadow-[#25d366]/20 transition-all text-white"
                    >
                      <MessageCircle size={18} />
                      <span>WhatsApp</span>
                    </a>
                  </>
                );
              })()}
              <button 
                onClick={() => setIsModalOpen(true)}
                className="w-full sm:flex-grow min-w-[200px] flex items-center justify-center space-x-3 bg-cyan-500 text-black px-8 py-5 font-black uppercase tracking-widest text-[11px] hover:bg-white transition-all shadow-xl shadow-cyan-500/20"
              >
                <ShoppingCart size={18} />
                <span>Get Access Now</span>
              </button>
            </div>
          </motion.div>
        </div>

        {/* Features Grid */}
        {product.features?.filter(f => !f.is_html_details)?.length > 0 && (
          <div className="space-y-16 mb-32">
            <div className="flex items-center space-x-6">
              <h2 className="text-3xl font-black uppercase tracking-tighter">Features</h2>
              <div className="h-px flex-grow bg-gradient-to-r from-cyan-500/50 to-transparent" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {product.features?.filter(f => !f.is_html_details).map((feature, idx) => {
                const Icon = IconMap[feature.icon] || Zap;
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="bg-[#0a0a0a] border border-white/5 p-8 group hover:border-cyan-500/50 transition-all duration-500"
                  >
                    <div className="w-12 h-12 bg-cyan-500/10 flex items-center justify-center mb-6 group-hover:bg-cyan-500 transition-all duration-500">
                      <Icon size={20} className="text-cyan-500 group-hover:text-black transition-all" />
                    </div>
                    <h3 className="text-sm font-black text-white uppercase tracking-tight mb-3 group-hover:text-cyan-500 transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-[11px] text-slate-300 font-medium leading-relaxed group-hover:text-slate-300 transition-colors">
                      {feature.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        )}

        {/* Extended Product Details HTML */}
        {product.features?.find(f => f.is_html_details)?.content && (
          <div className="mb-32 w-full">
            <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 md:p-8 max-h-[85vh] overflow-y-auto overflow-x-auto custom-scrollbar w-full">
              <div 
                className="prose prose-invert prose-cyan max-w-none w-full prose-img:rounded-xl prose-img:border prose-img:border-white/10 prose-headings:font-black prose-headings:uppercase prose-headings:tracking-tight prose-a:text-cyan-500 [&>*:first-child]:mt-0 [&>*:last-child]:mb-0"
                dangerouslySetInnerHTML={{ __html: product.features.find(f => f.is_html_details).content }} 
              />
            </div>
          </div>
        )}

        {/* Platforms Section */}
        <div className="bg-[#0a0a0a] border border-white/5 p-12 md:p-20 text-center space-y-16 relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />
          
          <h2 className="text-3xl font-black uppercase tracking-tighter relative z-10">Works On All Platforms</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 relative z-10">
            {[
              { label: 'iPhone', icon: Apple },
              { label: 'Mac', icon: Monitor },
              { label: 'Windows', icon: Layout },
              { label: 'Android', icon: Play },
            ].map((p) => (
              <div key={p.label} className="flex flex-col items-center space-y-4 group">
                <div className="w-16 h-16 bg-white/5 flex items-center justify-center group-hover:bg-cyan-500 group-hover:text-black transition-all duration-500">
                  <p.icon size={28} />
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 group-hover:text-white transition-colors">{p.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <BuyModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        product={product} 
      />
    </div>
  );
};

export default ProductDetails;
