import React from 'react';
import { motion } from 'framer-motion';
import { Mail, MessageSquare, MapPin, Send, MessageCircle, Clock, ExternalLink } from 'lucide-react';

const Contact = () => {
  return (
    <div className="pt-32 pb-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-20 max-w-2xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-extrabold font-heading mb-6">Get in <span className="text-accent-cyan">Touch</span></h1>
          <p className="text-text-muted text-lg">
            Have a question about a product or need help with installation? Our team is available 24/7 to assist you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-6xl mx-auto">
          {/* Contact Info Sidebar */}
          <div className="lg:col-span-4 space-y-8">
            <div className="glass-card p-8 rounded-3xl space-y-8 h-full">
              <h3 className="text-xl font-bold font-heading">Contact Information</h3>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4 group">
                  <div className="p-3 bg-accent-cyan/10 rounded-2xl text-accent-cyan group-hover:bg-accent-cyan group-hover:text-primary-dark transition-all">
                    <Mail size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-white mb-1">Email Us</h4>
                    <p className="text-sm text-text-muted">support@digimart.com</p>
                    <p className="text-sm text-text-muted">sales@digimart.com</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 group">
                  <div className="p-3 bg-accent-gold/10 rounded-2xl text-accent-gold group-hover:bg-accent-gold group-hover:text-primary-dark transition-all">
                    <MessageCircle size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-white mb-1">WhatsApp Chat</h4>
                    <p className="text-sm text-text-muted">+880 1700-000000</p>
                    <a href="#" className="text-xs text-accent-cyan flex items-center space-x-1 mt-1 hover:underline">
                      <span>Chat Now</span>
                      <ExternalLink size={10} />
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4 group">
                  <div className="p-3 bg-accent-cyan/10 rounded-2xl text-accent-cyan group-hover:bg-accent-cyan group-hover:text-primary-dark transition-all">
                    <Clock size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-white mb-1">Working Hours</h4>
                    <p className="text-sm text-text-muted">Mon - Sat: 9AM - 10PM</p>
                    <p className="text-sm text-text-muted">Sun: Only Critical Support</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 group">
                  <div className="p-3 bg-white/5 rounded-2xl text-text-muted group-hover:bg-white/10 transition-all">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-white mb-1">Office Location</h4>
                    <p className="text-sm text-text-muted">Gulshan Tower, Level 4, Gulshan-1, Dhaka 1212</p>
                  </div>
                </div>
              </div>

              {/* Socials */}
              <div className="pt-8 border-t border-white/5">
                <h4 className="text-sm font-bold mb-4 uppercase tracking-widest text-text-muted">Follow Us</h4>
                <div className="flex space-x-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center hover:border-accent-cyan transition-all cursor-pointer">
                      <div className="w-2 h-2 rounded-full bg-accent-cyan" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-8">
            <div className="glass-card p-10 rounded-3xl">
              <h3 className="text-2xl font-bold font-heading mb-8">Send us a Message</h3>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-text-muted">Full Name</label>
                    <input
                      type="text"
                      placeholder="Your name"
                      className="w-full px-6 py-4 rounded-xl bg-primary-dark/50 border border-white/5 focus:border-accent-cyan outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-text-muted">Email Address</label>
                    <input
                      type="email"
                      placeholder="Your email"
                      className="w-full px-6 py-4 rounded-xl bg-primary-dark/50 border border-white/5 focus:border-accent-cyan outline-none transition-all"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-text-muted">Subject</label>
                  <select className="w-full px-6 py-4 rounded-xl bg-primary-dark/50 border border-white/5 focus:border-accent-cyan outline-none transition-all appearance-none">
                    <option>Product Inquiry</option>
                    <option>Technical Support</option>
                    <option>Billing Question</option>
                    <option>Partnership</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-text-muted">Your Message</label>
                  <textarea
                    rows="5"
                    placeholder="How can we help you?"
                    className="w-full px-6 py-4 rounded-xl bg-primary-dark/50 border border-white/5 focus:border-accent-cyan outline-none transition-all resize-none"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full py-5 bg-accent-cyan text-primary-dark font-bold rounded-2xl flex items-center justify-center space-x-3 cyan-glow hover:bg-white transition-all text-lg"
                >
                  <Send size={20} />
                  <span>Send Message</span>
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Support Banner */}
        <div className="mt-20 glass-card p-12 rounded-[3rem] text-center border-accent-gold/20 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent-gold/5 blur-[100px] rounded-full -mr-32 -mt-32" />
          <div className="relative z-10">
            <h3 className="text-2xl md:text-3xl font-bold font-heading mb-4">Fastest Support via Telegram</h3>
            <p className="text-text-muted mb-8 max-w-lg mx-auto">For instant help with trading setup or licensing issues, join our Telegram support channel.</p>
            <button className="px-10 py-4 bg-[#0088cc] text-white font-bold rounded-xl flex items-center justify-center space-x-3 mx-auto hover:brightness-110 transition-all shadow-lg shadow-[#0088cc]/20">
              <MessageSquare size={20} />
              <span>Join Telegram Group</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
