import React, { useState, useEffect } from 'react';
import { 
  Globe, 
  CreditCard, 
  Bell, 
  Smartphone, 
  Save, 
  Shield, 
  Mail,
  Cpu,
  Megaphone,
  MessageSquare,
  Plus,
  Trash2,
  CheckCircle2,
  Loader2,
  HelpCircle,
  DollarSign,
  Layout
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { HomepageSettingsUI } from '../../components/admin/HomepageSettingsUI';

const Settings = () => {
  const { getAuthHeader } = useAuth();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  const [settings, setSettings] = useState({
    sitename: 'Tarek Markets',
    whatsapp: '+8801700000000',
    telegram: 'digimart_official',
    bkash: '01700-000000',
    nagad: '01700-000000',
    announcement: '🚀 Flash Sale: Get 20% Off on all MT4 Indicators! Use code DIGI20',
    facebook: '',
    twitter: '',
    instagram: '',
    youtube: '',
    telegram_channel: '',
    whatsapp_channel: '',
    home_product_count: 3,
    homepage_settings: {},
    categories: ['MT4 Indicators', 'Forex Robots', 'Trading Tools', 'Indicators'],
    testimonials: [
      { image: 'https://images.unsplash.com/photo-1611974714658-66d1456070bd?auto=format&fit=crop&q=80&w=800' },
      { image: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&q=80&w=800' }
    ]
  });

  const fetchSettings = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/settings`);
      const data = await response.json();
      if (data && Object.keys(data).length > 0) {
        setSettings(prev => ({ ...prev, ...data }));
      }
      setLoading(false);
    } catch (err) {
      console.error('Fetch error:', err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/settings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...getAuthHeader()
        },
        body: JSON.stringify(settings)
      });
      
      if (response.ok) {
        alert('Settings synced successfully!');
      } else {
        const errData = await response.json();
        alert(`Failed to sync settings: ${errData.message || 'Unknown error'}`);
      }
    } catch (err) {
      console.error('Save error:', err);
      alert('Network error while saving settings.');
    } finally {
      setSaving(false);
    }
  };

  const addTestimonial = () => {
    setSettings({
      ...settings,
      testimonials: [...settings.testimonials, { image: '' }]
    });
  };

  const removeTestimonial = (index) => {
    const updated = settings.testimonials.filter((_, i) => i !== index);
    setSettings({ ...settings, testimonials: updated });
  };

  const updateTestimonial = (index, val) => {
    const updated = [...settings.testimonials];
    updated[index].image = val;
    setSettings({ ...settings, testimonials: updated });
  };

  if (loading) return (
    <div className="h-[60vh] flex items-center justify-center">
      <Loader2 className="animate-spin text-violet-600" size={40} />
    </div>
  );

  return (
    <div className="space-y-12 max-w-5xl">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black font-heading text-black uppercase tracking-tighter">System Control</h1>
          <p className="text-slate-500 font-medium mt-2">Manage global configurations, announcements, and trust indicators.</p>
        </div>
        <button 
          onClick={handleSave}
          disabled={saving}
          className="flex items-center space-x-3 bg-black text-white px-10 py-4 font-black uppercase tracking-widest text-sm hover:bg-zinc-800 transition-all shadow-xl shadow-slate-200 disabled:opacity-50"
        >
          {saving ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
          <span>{saving ? 'Syncing...' : 'Sync Changes'}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-12">
        {/* Left Column */}
        <div className="xl:col-span-8 space-y-12">
          
          {/* Category Management */}
          <section className="bg-white border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Layout size={20} className="text-violet-600" />
                <h3 className="font-black text-black uppercase tracking-widest text-xs">Marketplace Categories</h3>
              </div>
              <div className="flex items-center space-x-2 text-[10px] font-black text-emerald-600 uppercase tracking-widest">
                <CheckCircle2 size={12} />
                <span>Dynamic Dropdowns</span>
              </div>
            </div>
            <div className="p-8 space-y-8">
              <div className="flex flex-col md:flex-row gap-4">
                <input 
                  type="text" 
                  id="new-category-input"
                  placeholder="New Category Name (e.g. Premium Indicators)"
                  className="flex-grow bg-slate-50 border border-slate-100 px-6 py-4 text-sm font-bold outline-none focus:border-black transition-all text-black"
                />
                <button 
                  onClick={() => {
                    const input = document.getElementById('new-category-input');
                    const val = input.value.trim();
                    if (val && !settings.categories?.includes(val)) {
                      setSettings({ ...settings, categories: [...(settings.categories || []), val] });
                      input.value = '';
                    }
                  }}
                  className="bg-black text-white px-8 py-4 font-black uppercase tracking-widest text-xs hover:bg-zinc-800 transition-all"
                >
                  Add Category
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {(settings.categories || ['MT4 Indicators', 'Forex Robots', 'Trading Tools', 'Indicators']).map((cat, i) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-slate-50 border border-slate-100 group">
                    <span className="text-xs font-black uppercase tracking-widest text-black">{cat}</span>
                    <button 
                      onClick={() => {
                        const updated = (settings.categories || ['MT4 Indicators', 'Forex Robots', 'Trading Tools', 'Indicators']).filter(c => c !== cat);
                        setSettings({ ...settings, categories: updated });
                      }}
                      className="p-2 text-slate-300 hover:text-red-500 transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
              <p className="text-[10px] text-slate-400 font-bold italic uppercase tracking-wider">Note: Changes will reflect in Product Add/Edit and Shop Filter dropdowns.</p>
            </div>
          </section>

          {/* Announcement Bar */}
          <section className="bg-white border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Megaphone size={20} className="text-violet-600" />
                <h3 className="font-black text-black uppercase tracking-widest text-xs">Site Announcement</h3>
              </div>
              <div className="flex items-center space-x-2 text-[10px] font-black text-emerald-600 uppercase tracking-widest">
                <CheckCircle2 size={12} />
                <span>Live on Storefront</span>
              </div>
            </div>
            <div className="p-8 space-y-4">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-300">Marquee Message</label>
              <textarea 
                value={settings.announcement}
                onChange={(e) => setSettings({...settings, announcement: e.target.value})}
                rows="2"
                className="w-full bg-slate-50 border border-slate-100 px-6 py-4 text-sm font-bold outline-none focus:border-black transition-all text-black resize-none"
              />
              <p className="text-[10px] text-slate-400 font-bold italic uppercase tracking-wider">This message appears at the very top of all pages.</p>
            </div>
          </section>

          <HomepageSettingsUI settings={settings} setSettings={setSettings} />

          {/* Testimonial Management - IMAGE TYPE */}
          <section className="bg-white border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <MessageSquare size={20} className="text-violet-600" />
                <h3 className="font-black text-black uppercase tracking-widest text-xs">Proof Gallery (Feedback)</h3>
              </div>
              <button 
                onClick={addTestimonial}
                className="text-[10px] font-black text-black uppercase tracking-widest flex items-center space-x-2 hover:text-violet-600"
              >
                <Plus size={14} />
                <span>Add Proof Image</span>
              </button>
            </div>
            <div className="p-8 space-y-6">
              {settings.testimonials?.map((t, i) => (
                <div key={i} className="flex items-center space-x-6 p-6 bg-slate-50 border border-slate-100 group">
                  <div className="w-24 h-24 bg-black overflow-hidden flex-shrink-0">
                    <img src={t.image} alt="" className="w-full h-full object-cover grayscale" />
                  </div>
                  <div className="flex-1 space-y-3">
                    <label className="text-[9px] font-black text-slate-500 dark:text-slate-300 uppercase tracking-widest">Image URL (Feedback Screenshot)</label>
                    <input 
                      type="text" 
                      value={t.image}
                      onChange={(e) => updateTestimonial(i, e.target.value)}
                      className="w-full bg-white border border-slate-200 px-4 py-3 text-xs font-bold outline-none focus:border-black transition-all text-black" 
                      placeholder="https://..."
                    />
                  </div>
                  <button 
                    onClick={() => removeTestimonial(i)}
                    className="p-2 text-slate-300 hover:text-red-500 transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          </section>



          {/* FAQ Management */}
          <section className="bg-white border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <HelpCircle size={20} className="text-violet-600" />
                <h3 className="font-black text-black uppercase tracking-widest text-xs">Knowledge Base (FAQ)</h3>
              </div>
              <button 
                onClick={() => setSettings({...settings, faqs: [...(settings.faqs || []), { question: '', answer: '' }]})}
                className="text-[10px] font-black text-black uppercase tracking-widest flex items-center space-x-2 hover:text-violet-600"
              >
                <Plus size={14} />
                <span>Add Question</span>
              </button>
            </div>
            <div className="p-8 space-y-8">
              {settings.faqs?.map((faq, i) => (
                <div key={i} className="space-y-4 p-6 bg-slate-50 border border-slate-100 relative group">
                  <button 
                    onClick={() => {
                      const updated = settings.faqs.filter((_, idx) => idx !== i);
                      setSettings({...settings, faqs: updated});
                    }}
                    className="absolute top-4 right-4 text-slate-300 hover:text-red-500 transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                  <div className="space-y-2">
                    <label className="text-[9px] font-black text-slate-500 dark:text-slate-300 uppercase tracking-widest">Question</label>
                    <input 
                      type="text" 
                      value={faq.question}
                      onChange={(e) => {
                        const updated = [...settings.faqs];
                        updated[i].question = e.target.value;
                        setSettings({...settings, faqs: updated});
                      }}
                      className="w-full bg-white border border-slate-200 px-4 py-3 text-xs font-bold outline-none focus:border-black transition-all text-black" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Answer</label>
                    <textarea 
                      value={faq.answer}
                      onChange={(e) => {
                        const updated = [...settings.faqs];
                        updated[i].answer = e.target.value;
                        setSettings({...settings, faqs: updated});
                      }}
                      rows="3"
                      className="w-full bg-white border border-slate-200 px-4 py-3 text-xs font-bold outline-none focus:border-black transition-all text-black resize-none" 
                    />
                  </div>
                </div>
              ))}
              {(!settings.faqs || settings.faqs.length === 0) && (
                <p className="text-center text-slate-400 font-bold uppercase tracking-widest text-[10px] py-10">No questions added yet.</p>
              )}
            </div>
          </section>

          {/* Payment Infrastructure & Global Rates */}
          <section className="bg-white border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex items-center space-x-3">
              <CreditCard size={20} className="text-violet-600" />
              <h3 className="font-black text-black uppercase tracking-widest text-xs">Payment Infrastructure</h3>
            </div>
            <div className="p-8 space-y-10">
              {/* Currency Rate */}
              <div className="p-6 bg-violet-50 border border-violet-100 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-violet-600 flex items-center justify-center text-white">
                    <DollarSign size={24} />
                  </div>
                  <div>
                    <div className="text-[10px] font-black text-violet-600 uppercase tracking-widest">Global Exchange Rate</div>
                    <div className="text-sm font-black text-black uppercase tracking-tighter">1 USD ($) = {settings.usd_rate} BDT (৳)</div>
                  </div>
                </div>
                <div className="w-full md:w-48">
                  <label className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1 block">Set BDT Value</label>
                  <input 
                    type="number" 
                    value={settings.usd_rate}
                    onChange={(e) => setSettings({...settings, usd_rate: parseFloat(e.target.value) || 0})}
                    className="w-full bg-white border border-violet-200 px-4 py-2.5 text-xs font-black outline-none focus:border-violet-600 transition-all text-black" 
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <label className="text-[10px] font-black text-black uppercase tracking-widest">bKash Gateway</label>
                    <span className="text-[9px] font-black text-emerald-500 uppercase tracking-widest">Active</span>
                  </div>
                  <input 
                    type="text" 
                    value={settings.bkash}
                    onChange={(e) => setSettings({...settings, bkash: e.target.value})}
                    className="w-full bg-slate-50 border border-slate-100 px-6 py-4 text-sm font-bold outline-none focus:border-black transition-all text-black" 
                  />
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <label className="text-[10px] font-black text-black uppercase tracking-widest">Nagad Gateway</label>
                    <span className="text-[9px] font-black text-emerald-500 uppercase tracking-widest">Active</span>
                  </div>
                  <input 
                    type="text" 
                    value={settings.nagad}
                    onChange={(e) => setSettings({...settings, nagad: e.target.value})}
                    className="w-full bg-slate-50 border border-slate-100 px-6 py-4 text-sm font-bold outline-none focus:border-black transition-all text-black" 
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Legal Pages Management */}
          <section className="bg-white border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex items-center space-x-3">
              <Shield size={20} className="text-violet-600" />
              <h3 className="font-black text-black uppercase tracking-widest text-xs">Legal Pages (Policy & Terms)</h3>
            </div>
            <div className="p-8 space-y-10">
              <div className="space-y-4">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Privacy Policy</label>
                <textarea 
                  value={settings.privacy_policy || ''}
                  onChange={(e) => setSettings({...settings, privacy_policy: e.target.value})}
                  rows="6"
                  className="w-full bg-slate-50 border border-slate-100 px-6 py-4 text-xs font-bold outline-none focus:border-black transition-all text-black resize-none"
                  placeholder="Enter Privacy Policy HTML or Text..."
                />
              </div>

              <div className="space-y-4">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Terms of Service</label>
                <textarea 
                  value={settings.terms_of_service || ''}
                  onChange={(e) => setSettings({...settings, terms_of_service: e.target.value})}
                  rows="6"
                  className="w-full bg-slate-50 border border-slate-100 px-6 py-4 text-xs font-bold outline-none focus:border-black transition-all text-black resize-none"
                  placeholder="Enter Terms of Service HTML or Text..."
                />
              </div>

              <div className="space-y-4">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Affiliate Program</label>
                <textarea 
                  value={settings.affiliate_program || ''}
                  onChange={(e) => setSettings({...settings, affiliate_program: e.target.value})}
                  rows="6"
                  className="w-full bg-slate-50 border border-slate-100 px-6 py-4 text-xs font-bold outline-none focus:border-black transition-all text-black resize-none"
                  placeholder="Enter Affiliate Program Information..."
                />
              </div>
              
              <p className="text-[10px] text-slate-400 font-bold italic uppercase tracking-wider">Note: You can use HTML tags for better formatting (e.g. &lt;h1&gt;, &lt;p&gt;, &lt;br&gt;).</p>
            </div>
          </section>
        </div>

        {/* Right Column */}
        <div className="xl:col-span-4 space-y-12">
          {/* General Configuration */}
          <section className="bg-white border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex items-center space-x-3">
              <Globe size={20} className="text-violet-600" />
              <h3 className="font-black text-black uppercase tracking-widest text-xs">Identity</h3>
            </div>
            <div className="p-8 space-y-8">
              <div className="space-y-4">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Store Label</label>
                <input 
                  type="text" 
                  value={settings.sitename || ''}
                  onChange={(e) => setSettings({...settings, sitename: e.target.value})}
                  className="w-full bg-slate-50 border border-slate-100 px-6 py-4 text-sm font-bold outline-none focus:border-black transition-all text-black" 
                />
              </div>
              <div className="space-y-4">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Primary Support (WhatsApp)</label>
                <div className="relative">
                  <Smartphone className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                  <input 
                    type="text" 
                    value={settings.whatsapp}
                    onChange={(e) => setSettings({...settings, whatsapp: e.target.value})}
                    className="w-full bg-slate-50 border border-slate-100 pl-14 pr-6 py-4 text-sm font-bold outline-none focus:border-black transition-all text-black" 
                  />
                </div>
              </div>
              <div className="space-y-4">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Telegram Direct Support (Username)</label>
                <div className="relative">
                  <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                  <input 
                    type="text" 
                    value={settings.telegram || ''}
                    onChange={(e) => setSettings({...settings, telegram: e.target.value})}
                    className="w-full bg-slate-50 border border-slate-100 pl-14 pr-6 py-4 text-sm font-bold outline-none focus:border-black transition-all text-black" 
                    placeholder="username"
                  />
                </div>
              </div>
              <div className="space-y-4">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Community Channel (Telegram)</label>
                <div className="relative">
                  <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                  <input 
                    type="text" 
                    value={settings.telegram_channel || ''}
                    onChange={(e) => setSettings({...settings, telegram_channel: e.target.value})}
                    className="w-full bg-slate-50 border border-slate-100 pl-14 pr-6 py-4 text-sm font-bold outline-none focus:border-black transition-all text-black" 
                    placeholder="https://t.me/your_channel"
                  />
                </div>
              </div>
              <div className="space-y-4">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Community Channel (WhatsApp)</label>
                <div className="relative">
                  <Smartphone className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                  <input 
                    type="text" 
                    value={settings.whatsapp_channel || ''}
                    onChange={(e) => setSettings({...settings, whatsapp_channel: e.target.value})}
                    className="w-full bg-slate-50 border border-slate-100 pl-14 pr-6 py-4 text-sm font-bold outline-none focus:border-black transition-all text-black" 
                    placeholder="https://whatsapp.com/channel/..."
                  />
                </div>
              </div>
              <div className="pt-8 border-t border-slate-50">
                <div className="w-24 h-24 bg-black flex items-center justify-center mb-6">
                  <span className="text-white font-black text-3xl">D</span>
                </div>
                <button className="w-full py-4 border-2 border-black text-black text-[10px] font-black uppercase tracking-widest hover:bg-black hover:text-white transition-all">
                  Update Branding
                </button>
              </div>
            </div>
          </section>

          {/* Social Links */}
          <section className="bg-white border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex items-center space-x-3">
              <Globe size={20} className="text-violet-600" />
              <h3 className="font-black text-black uppercase tracking-widest text-xs">Social Presence</h3>
            </div>
            <div className="p-8 space-y-4">
              <div className="space-y-2">
                <label className="text-[9px] font-black uppercase tracking-widest text-slate-400">Facebook URL</label>
                <input 
                  type="text" 
                  value={settings.facebook || ''}
                  onChange={(e) => setSettings({...settings, facebook: e.target.value})}
                  className="w-full bg-slate-50 border border-slate-100 px-4 py-3 text-xs font-bold outline-none focus:border-black transition-all text-black" 
                  placeholder="https://facebook.com/..."
                />
              </div>
              <div className="space-y-2">
                <label className="text-[9px] font-black uppercase tracking-widest text-slate-400">Twitter / X URL</label>
                <input 
                  type="text" 
                  value={settings.twitter || ''}
                  onChange={(e) => setSettings({...settings, twitter: e.target.value})}
                  className="w-full bg-slate-50 border border-slate-100 px-4 py-3 text-xs font-bold outline-none focus:border-black transition-all text-black" 
                  placeholder="https://twitter.com/..."
                />
              </div>
              <div className="space-y-2">
                <label className="text-[9px] font-black uppercase tracking-widest text-slate-400">Instagram URL</label>
                <input 
                  type="text" 
                  value={settings.instagram || ''}
                  onChange={(e) => setSettings({...settings, instagram: e.target.value})}
                  className="w-full bg-slate-50 border border-slate-100 px-4 py-3 text-xs font-bold outline-none focus:border-black transition-all text-black" 
                  placeholder="https://instagram.com/..."
                />
              </div>
              <div className="space-y-2">
                <label className="text-[9px] font-black uppercase tracking-widest text-slate-400">YouTube URL</label>
                <input 
                  type="text" 
                  value={settings.youtube || ''}
                  onChange={(e) => setSettings({...settings, youtube: e.target.value})}
                  className="w-full bg-slate-50 border border-slate-100 px-4 py-3 text-xs font-bold outline-none focus:border-black transition-all text-black" 
                  placeholder="https://youtube.com/..."
                />
              </div>
            </div>
          </section>

          {/* Notifications */}
          <section className="bg-white border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex items-center space-x-3">
              <Bell size={20} className="text-violet-600" />
              <h3 className="font-black text-black uppercase tracking-widest text-xs">Security</h3>
            </div>
            <div className="p-8 space-y-4">
               <div className="flex items-center justify-between p-4 bg-slate-50 border border-slate-100">
                  <div className="text-[10px] font-black uppercase tracking-tight">Admin 2FA</div>
                  <div className="w-10 h-5 bg-slate-200 rounded-full relative">
                    <div className="absolute left-1 top-1 w-3 h-3 bg-white rounded-full" />
                  </div>
               </div>
               <div className="flex items-center justify-between p-4 bg-slate-50 border border-slate-100">
                  <div className="text-[10px] font-black uppercase tracking-tight">Order Logs</div>
                  <div className="w-10 h-5 bg-black rounded-full relative">
                    <div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full" />
                  </div>
               </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Settings;
