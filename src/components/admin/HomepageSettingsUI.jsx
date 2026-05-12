import React from 'react';
import { Eye, EyeOff, LayoutTemplate } from 'lucide-react';

const sizeOptions = [
  { label: 'Small', value: 'text-xs md:text-sm' },
  { label: 'Medium', value: 'text-lg md:text-xl' },
  { label: 'Large', value: 'text-3xl md:text-4xl' },
  { label: 'Extra Large', value: 'text-5xl md:text-6xl' },
  { label: 'Base/Normal', value: 'text-base' },
  { label: 'Tiny', value: 'text-[10px]' },
];

const HpSettingField = ({ title, fieldName, settings, setSettings }) => {
  const data = settings.homepage_settings?.[fieldName] || { text: '', show: true, size: '' };

  const updateField = (key, val) => {
    setSettings({
      ...settings,
      homepage_settings: {
        ...settings.homepage_settings,
        [fieldName]: { ...data, [key]: val }
      }
    });
  };

  return (
    <div className="p-4 border border-slate-100 bg-white space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-xs font-black uppercase tracking-widest text-slate-800">{title}</span>
        <button 
          onClick={() => updateField('show', !data.show)}
          className={`p-1.5 rounded transition-all ${data.show ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}
          title={data.show ? 'Visible' : 'Hidden'}
        >
          {data.show ? <Eye size={14} /> : <EyeOff size={14} />}
        </button>
      </div>
      
      <div className="space-y-2">
        <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Text Content</label>
        <textarea 
          value={data.text}
          onChange={(e) => updateField('text', e.target.value)}
          className="w-full bg-slate-50 border border-slate-100 px-3 py-2 text-xs font-bold outline-none focus:border-black transition-all text-black resize-none"
          rows="2"
        />
      </div>

      <div className="space-y-2">
        <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Text Size</label>
        <select 
          value={data.size}
          onChange={(e) => updateField('size', e.target.value)}
          className="w-full bg-slate-50 border border-slate-100 px-3 py-2 text-xs font-bold outline-none focus:border-black transition-all text-black"
        >
          <option value="{data.size}">Current Size</option>
          {sizeOptions.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

export const HomepageSettingsUI = ({ settings, setSettings }) => {
  const hp = settings.homepage_settings || {};

  return (
    <section className="bg-white border border-slate-200 shadow-sm overflow-hidden">
      <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <LayoutTemplate size={20} className="text-violet-600" />
          <h3 className="font-black text-black uppercase tracking-widest text-xs">Homepage Text Settings</h3>
        </div>
      </div>

      <div className="p-6 border-b border-slate-100 bg-white">
        <h4 className="font-black text-xs uppercase tracking-widest text-slate-800 mb-4">Section Visibility</h4>
        <div className="flex flex-wrap gap-4">
          <button 
            onClick={() => setSettings({...settings, homepage_settings: {...hp, show_proof_section: hp.show_proof_section !== false ? false : true}})}
            className={`flex items-center space-x-2 px-4 py-2 border text-xs font-black uppercase tracking-widest transition-all ${hp.show_proof_section !== false ? 'border-green-200 bg-green-50 text-green-700' : 'border-slate-200 bg-slate-50 text-slate-500 hover:bg-slate-100'}`}
          >
            {hp.show_proof_section !== false ? <Eye size={14} /> : <EyeOff size={14} />}
            <span>Proof Gallery Section</span>
          </button>
          <button 
            onClick={() => setSettings({...settings, homepage_settings: {...hp, show_faq_section: hp.show_faq_section !== false ? false : true}})}
            className={`flex items-center space-x-2 px-4 py-2 border text-xs font-black uppercase tracking-widest transition-all ${hp.show_faq_section !== false ? 'border-green-200 bg-green-50 text-green-700' : 'border-slate-200 bg-slate-50 text-slate-500 hover:bg-slate-100'}`}
          >
            {hp.show_faq_section !== false ? <Eye size={14} /> : <EyeOff size={14} />}
            <span>FAQ & Support Section</span>
          </button>
          <button 
            onClick={() => setSettings({...settings, homepage_settings: {...hp, hide_full_price: hp.hide_full_price !== true ? true : false}})}
            className={`flex items-center space-x-2 px-4 py-2 border text-xs font-black uppercase tracking-widest transition-all ${hp.hide_full_price !== true ? 'border-green-200 bg-green-50 text-green-700' : 'border-slate-200 bg-slate-50 text-slate-500 hover:bg-slate-100'}`}
          >
            {hp.hide_full_price !== true ? <Eye size={14} /> : <EyeOff size={14} />}
            <span>Old Price Visibility</span>
          </button>
          <button 
            onClick={() => setSettings({...settings, homepage_settings: {...hp, hide_main_price: hp.hide_main_price === true ? false : true}})}
            className={`flex items-center space-x-2 px-4 py-2 border text-xs font-black uppercase tracking-widest transition-all ${hp.hide_main_price !== true ? 'border-green-200 bg-green-50 text-green-700' : 'border-slate-200 bg-slate-50 text-slate-500 hover:bg-slate-100'}`}
          >
            {hp.hide_main_price !== true ? <Eye size={14} /> : <EyeOff size={14} />}
            <span>Main Price Visibility</span>
          </button>
        </div>
      </div>

      <div className="p-6 border-b border-slate-100 bg-slate-50/20">
        <div className="max-w-xs space-y-3">
          <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Global Discount Amount (BDT)</label>
          <div className="flex items-center space-x-3">
            <input 
              type="number" 
              value={hp.global_discount_amount || 500}
              onChange={(e) => setSettings({...settings, homepage_settings: {...hp, global_discount_amount: parseInt(e.target.value) || 0}})}
              className="w-full bg-white border border-slate-200 px-4 py-2.5 text-xs font-black outline-none focus:border-black transition-all text-black" 
              placeholder="500"
            />
            <span className="text-[10px] font-bold text-slate-400 whitespace-nowrap">Added to Base Price</span>
          </div>
          <p className="text-[9px] text-slate-400 font-medium italic">This amount will be added to the product price to show the "original" strike-through price.</p>
        </div>
      </div>

      <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 bg-slate-50/30">
        <HpSettingField title="Hero Badge" fieldName="hero_badge" settings={settings} setSettings={setSettings} />
        <HpSettingField title="Hero Title" fieldName="hero_title" settings={settings} setSettings={setSettings} />
        <HpSettingField title="Hero Subtitle" fieldName="hero_subtitle" settings={settings} setSettings={setSettings} />
        <HpSettingField title="Hero Button 1" fieldName="hero_btn1" settings={settings} setSettings={setSettings} />
        <HpSettingField title="Hero Button 2" fieldName="hero_btn2" settings={settings} setSettings={setSettings} />
        
        <HpSettingField title="Popular Badge" fieldName="popular_badge" settings={settings} setSettings={setSettings} />
        <HpSettingField title="Popular Title" fieldName="popular_title" settings={settings} setSettings={setSettings} />
        
        <HpSettingField title="Proof Badge" fieldName="proof_badge" settings={settings} setSettings={setSettings} />
        <HpSettingField title="Proof Title" fieldName="proof_title" settings={settings} setSettings={setSettings} />
        
        <HpSettingField title="FAQ Badge" fieldName="faq_badge" settings={settings} setSettings={setSettings} />
        <HpSettingField title="FAQ Title" fieldName="faq_title" settings={settings} setSettings={setSettings} />
        
        <HpSettingField title="CTA Title" fieldName="cta_title" settings={settings} setSettings={setSettings} />
        <HpSettingField title="CTA Button" fieldName="cta_btn" settings={settings} setSettings={setSettings} />
        
        <HpSettingField title="Footer Text" fieldName="footer_text" settings={settings} setSettings={setSettings} />
        <HpSettingField title="Footer Copyright" fieldName="footer_copyright" settings={settings} setSettings={setSettings} />
        
        <HpSettingField title="Product Offer Label" fieldName="product_offer" settings={settings} setSettings={setSettings} />
      </div>
    </section>
  );
};
