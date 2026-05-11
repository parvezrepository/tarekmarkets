import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Users, Trophy, Target, Cpu, CheckCircle2 } from 'lucide-react';

const About = () => {
  const values = [
    { icon: ShieldCheck, title: "Unmatched Reliability", desc: "Our tools are rigorously tested in real market conditions before release." },
    { icon: Users, title: "Customer Centric", desc: "We provide personalized support to ensure every user succeeds." },
    { icon: Trophy, title: "Premium Quality", desc: "Clean code and high-performance algorithms are our core standards." }
  ];

  return (
    <div className="pt-32 pb-20 bg-white">
      <div className="container mx-auto px-6">
        {/* Hero Section */}
        <div className="text-center mb-24 max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-20 h-20 bg-violet-50 rounded-3xl flex items-center justify-center mx-auto mb-8 text-violet-600 border border-violet-100"
          >
            <Target size={40} />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-7xl font-black font-heading text-black uppercase tracking-tighter mb-8"
          >
            Mission: <br /><span className="text-violet-600">Pure Automation</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-slate-500 text-lg font-medium"
          >
            TradeKit was founded by a team of professional traders and software engineers who were tired of low-quality indicators and broken scripts. We decided to build a platform that only hosts the best-in-class digital tools.
          </motion.p>
        </div>

        {/* Content Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-32">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="text-3xl md:text-5xl font-black font-heading text-black uppercase tracking-tighter leading-tight">
              Empowering Global Users with Next-Gen Software
            </h2>
            <p className="text-slate-500 leading-relaxed text-lg font-medium">
              At TradeKit, we don't just sell software; we provide solutions that save time and increase profitability. From complex MT4 Expert Advisors to simple productivity scripts, every product goes through a strict 3-stage validation process.
            </p>
            <ul className="space-y-4">
              {['Market-tested strategies', 'Optimized for low-latency', '24/7 Global support network', 'Free lifetime updates'].map((item) => (
                <li key={item} className="flex items-center space-x-3 font-bold text-black">
                  <CheckCircle2 size={20} className="text-violet-600" />
                  <span className="text-sm uppercase tracking-wider">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-square bg-slate-50 border-2 border-slate-100 overflow-hidden relative z-10">
              <img 
                src="https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80&w=1000" 
                alt="Team Work" 
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" 
              />
            </div>
            {/* Glow Backgrounds */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-violet-100/50 blur-[80px] -mr-32 -mt-32 rounded-full" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-slate-100/50 blur-[80px] -ml-32 -mb-32 rounded-full" />
            
            {/* Stats Badge */}
            <div className="absolute bottom-12 -right-6 z-20 bg-black p-8 shadow-2xl">
              <div className="text-4xl font-black text-white font-heading tracking-tighter">98.5%</div>
              <div className="text-[8px] text-slate-400 uppercase tracking-widest font-black mt-2">Accuracy Rate</div>
            </div>
          </motion.div>
        </div>

        {/* Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {values.map((v, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-slate-50 p-12 border border-slate-200 space-y-6 hover:border-violet-500 transition-all group text-center"
            >
              <div className="w-16 h-16 bg-white border border-slate-200 rounded-2xl flex items-center justify-center mx-auto text-black group-hover:bg-black group-hover:text-white transition-all duration-500">
                <v.icon size={32} />
              </div>
              <h3 className="text-xl font-black font-heading text-black uppercase tracking-tighter">{v.title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed font-medium">{v.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Trust Badges Bar */}
        <div className="mt-32 py-12 border-t border-slate-100 flex flex-wrap justify-center items-center gap-16 opacity-30">
          <div className="flex items-center space-x-2 grayscale">
            <Cpu size={24} /> <span className="font-black tracking-tighter text-2xl">TECHFORCE</span>
          </div>
          <div className="flex items-center space-x-2 grayscale">
            <ShieldCheck size={24} /> <span className="font-black tracking-tighter text-2xl">SECUREX</span>
          </div>
          <div className="flex items-center space-x-2 grayscale">
            <Trophy size={24} /> <span className="font-black tracking-tighter text-2xl">TOPVEND</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
