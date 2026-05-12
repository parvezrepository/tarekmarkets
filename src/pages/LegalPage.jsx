import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Shield, FileText, Users, Loader2 } from 'lucide-react';

const LegalPage = ({ type }) => {
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/settings`);
        const data = await response.json();
        setSettings(data);
        setLoading(false);
      } catch (err) {
        console.error('Legal page fetch error:', err);
        setLoading(false);
      }
    };
    fetchSettings();
    window.scrollTo(0, 0);
  }, [type]);

  if (loading) return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center">
      <Loader2 className="animate-spin text-cyan-500" size={48} />
    </div>
  );

  const getPageConfig = () => {
    switch (type) {
      case 'privacy':
        return {
          title: 'Privacy Policy',
          icon: Shield,
          content: settings?.privacy_policy || 'Privacy policy content is currently being updated.'
        };
      case 'terms':
        return {
          title: 'Terms of Service',
          icon: FileText,
          content: settings?.terms_of_service || 'Terms of service content is currently being updated.'
        };
      case 'affiliate':
        return {
          title: 'Affiliate Program',
          icon: Users,
          content: settings?.affiliate_program || 'Affiliate program information is currently being updated.'
        };
      default:
        return { title: 'Legal', icon: Shield, content: '' };
    }
  };

  const config = getPageConfig();
  const Icon = config.icon;

  return (
    <div className="min-h-screen bg-[#020617] text-white pt-32 pb-20">
      <div className="container mx-auto px-6 max-w-4xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-12"
        >
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center mx-auto mb-6">
              <Icon className="text-cyan-500" size={32} />
            </div>
            <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter">{config.title}</h1>
            <p className="text-slate-500 text-xs font-black uppercase tracking-[0.3em]">Last Updated: {settings?.updated_at ? new Date(settings.updated_at).toLocaleDateString() : 'Recent'}</p>
          </div>

          <div className="bg-[#0a0a0a] border border-white/5 p-8 md:p-12 shadow-2xl">
            <div 
              className="prose prose-invert prose-cyan max-w-none prose-p:text-slate-300 prose-p:leading-relaxed prose-headings:font-black prose-headings:uppercase prose-headings:tracking-tight prose-headings:text-white"
              dangerouslySetInnerHTML={{ __html: config.content.replace(/\n/g, '<br/>') }}
            />
          </div>

          <div className="pt-10 text-center">
            <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest">
              TradeKit Official Marketplace • Security & Transparency First
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LegalPage;
