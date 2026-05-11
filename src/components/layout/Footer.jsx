import React from 'react';
import { Link } from 'react-router-dom';
import { Cpu, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

const Footer = () => {
  // সোশ্যাল মিডিয়া লিঙ্কগুলো এখানে পরিবর্তন করুন
  const socialLinks = [
    { Icon: Facebook, url: "https://facebook.com/your-page" }, // আপনার ফেসবুক লিঙ্ক দিন
    { Icon: Twitter, url: "https://twitter.com/your-profile" }, // আপনার টুইটার লিঙ্ক দিন
    { Icon: Instagram, url: "https://instagram.com/your-profile" }, // আপনার ইন্সটাগ্রাম লিঙ্ক দিন
    { Icon: Youtube, url: "https://youtube.com/your-channel" }, // আপনার ইউটিউব লিঙ্ক দিন
  ];

  return (
    <footer className="bg-[#020617] border-t border-slate-800 pt-20 pb-10">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between mb-16 gap-8">
          {/* Logo & Sales Focus */}
          <div className="text-center md:text-left space-y-4">
            <Link to="/" className="flex items-center justify-center md:justify-start space-x-3">
              <div className="w-10 h-10 bg-accent-cyan rounded-xl flex items-center justify-center">
                <Cpu className="text-primary-dark" size={24} />
              </div>
              <span className="text-2xl font-bold font-heading text-white">
                Trade<span className="text-accent-cyan">Kit</span>
              </span>
            </Link>
            <p className="text-slate-500 max-w-sm font-medium">
              Your premium destination for trading automation and digital assets.
            </p>
          </div>

          {/* Quick Shop Links - এখানে to="/" এর জায়গায় আপনার পেজের পাথ দিন */}
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-4">
            <Link to="/privacy-policy" className="text-sm font-bold text-slate-400 hover:text-white uppercase tracking-widest transition-colors">Privacy Policy</Link>
            <Link to="/terms-of-service" className="text-sm font-bold text-slate-400 hover:text-white uppercase tracking-widest transition-colors">Terms of Service</Link>
            <Link to="/affiliate-program" className="text-sm font-bold text-slate-400 hover:text-white uppercase tracking-widest transition-colors">Affiliate Program</Link>
          </div>

          {/* Social Presence */}
          <div className="flex items-center space-x-4">
            {socialLinks.map((social, idx) => (
              <a 
                key={idx} 
                href={social.url} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-12 h-12 bg-slate-900 border border-slate-800 rounded-2xl flex items-center justify-center text-slate-400 hover:bg-accent-cyan hover:text-primary-dark hover:border-accent-cyan transition-all duration-300"
              >
                <social.Icon size={20} />
              </a>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-10 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">
            © 2026 TradeKit. All rights reserved.
          </p>
          <div className="flex items-center space-x-8 text-[10px] font-black uppercase tracking-[0.2em] text-slate-600">
            <Link to="/privacy-policy" className="hover:text-accent-cyan transition-colors">Privacy</Link>
            <Link to="/terms-of-service" className="hover:text-accent-cyan transition-colors">Terms</Link>
            <Link to="/support" className="hover:text-accent-cyan transition-colors">Support</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
