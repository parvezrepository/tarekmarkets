import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Search, 
  MoreVertical, 
  Edit2, 
  Trash2, 
  Eye, 
  Filter,
  X,
  Upload,
  Check,
  Star,
  Loader2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { supabase } from '../../lib/supabase';
import { TableRowSkeleton } from '../../components/shared/Skeleton';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';

const Products = () => {
  const { getAuthHeader } = useAuth();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [uploading, setUploading] = useState(false);
  
  // Form State
  const initialForm = {
    name: '',
    category: 'MT4 Indicators',
    price: '',
    badge: '',
    description: '',
    image: 'https://images.unsplash.com/photo-1611974714658-66d1456070bd?auto=format&fit=crop&q=80&w=800',
    video_url: '',
    features: [] // Array of { icon: '', title: '', description: '' }
  };
  const [formData, setFormData] = useState(initialForm);
  const [extendedHtml, setExtendedHtml] = useState('');
  const [productTags, setProductTags] = useState('Professional Grade, Hyper-realistic, All Devices');

  const fetchProducts = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/products`);
      const data = await response.json();
      setProducts(data);
      setLoading(false);
    } catch (err) {
      console.error('Fetch error:', err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleEdit = (product) => {
    const htmlFeature = product.features?.find(f => f.is_html_details);
    setExtendedHtml(htmlFeature ? htmlFeature.content : '');

    const tagsFeature = product.features?.find(f => f.is_tags_list);
    setProductTags(tagsFeature ? tagsFeature.tags : 'Professional Grade, Hyper-realistic, All Devices');
    
    const cleanedFeatures = product.features?.filter(f => !f.is_html_details && !f.is_tags_list) || [];
    setFormData({ ...product, features: cleanedFeatures });
    
    setEditingId(product.id);
    setIsEditMode(true);
    setIsModalOpen(true);
  };

  const handleAdd = () => {
    setFormData(initialForm);
    setExtendedHtml('');
    setProductTags('Professional Grade, Hyper-realistic, All Devices');
    setIsEditMode(false);
    setEditingId(null);
    setIsModalOpen(true);
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `product-images/${fileName}`;

    try {
      const { error: uploadError } = await supabase.storage
        .from('products')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage
        .from('products')
        .getPublicUrl(filePath);

      setFormData({ ...formData, image: data.publicUrl });
      alert('Image uploaded successfully!');
    } catch (err) {
      console.error('Upload error:', err);
      alert('Error uploading image. Make sure you have created a "products" bucket in Supabase Storage and set it to public.');
    } finally {
      setUploading(false);
    }
  };

  const addFeature = () => {
    setFormData({
      ...formData,
      features: [...(formData.features || []), { icon: 'Zap', title: '', description: '' }]
    });
  };

  const removeFeature = (index) => {
    const newFeatures = [...formData.features];
    newFeatures.splice(index, 1);
    setFormData({ ...formData, features: newFeatures });
  };

  const updateFeature = (index, field, value) => {
    const newFeatures = [...formData.features];
    newFeatures[index][field] = value;
    setFormData({ ...formData, features: newFeatures });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const url = isEditMode 
      ? `${import.meta.env.VITE_API_URL}/products/${editingId}`
      : `${import.meta.env.VITE_API_URL}/products`;
    
    const method = isEditMode ? 'PUT' : 'POST';

    const payload = { ...formData };
    if (extendedHtml && extendedHtml.trim() !== '') {
      payload.features = [...(payload.features || []), { is_html_details: true, content: extendedHtml }];
    }
    if (productTags && productTags.trim() !== '') {
      payload.features = [...(payload.features || []), { is_tags_list: true, tags: productTags }];
    }
    
    delete payload.id;
    delete payload.created_at;
    delete payload.rating;

    try {
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          ...getAuthHeader()
        },
        body: JSON.stringify(payload)
      });
      
      if (response.ok) {
        setIsModalOpen(false);
        fetchProducts();
        setFormData(initialForm);
        alert('Product saved successfully!');
      } else {
        const errorData = await response.json();
        alert(`Error saving product: ${errorData.message || 'Unknown error'}`);
      }
    } catch (err) {
      console.error('Save error:', err);
      alert('Network error. Please check if the server is running.');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this asset?')) return;
    
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/products/${id}`, {
        method: 'DELETE',
        headers: getAuthHeader()
      });
      
      if (response.ok) {
        fetchProducts();
      }
    } catch (err) {
      console.error('Delete error:', err);
    }
  };

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const quillModules = {
    toolbar: [
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
      ['link'],
      ['clean']
    ],
  };

  const quillFormats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link'
  ];

  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black font-heading text-black dark:text-white uppercase tracking-tighter transition-colors">Inventory</h1>
          <p className="text-slate-500 font-medium mt-2">Manage your digital products and storefront pricing.</p>
        </div>
        <button 
          onClick={handleAdd}
          className="flex items-center justify-center space-x-3 bg-black dark:bg-white text-white dark:text-black px-8 py-4 font-black uppercase tracking-widest text-sm hover:opacity-90 transition-all shadow-xl shadow-slate-200 dark:shadow-none"
        >
          <Plus size={20} />
          <span>Add Product</span>
        </button>
      </div>

      {/* Toolbar */}
      <div className="bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 p-6 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
        <div className="relative w-full md:w-96">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search assets..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 px-12 py-3 text-sm font-bold outline-none focus:border-black dark:focus:border-white transition-all text-black dark:text-white"
          />
        </div>
        <div className="flex items-center space-x-4 w-full md:w-auto">
          <div className="flex items-center space-x-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-4 py-2.5">
            <Filter size={16} className="text-slate-400" />
            <select 
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-transparent outline-none cursor-pointer text-xs font-black uppercase tracking-widest text-black dark:text-white"
            >
              <option value="All">All Categories</option>
              <option value="MT4 Indicators">MT4 Indicators</option>
              <option value="Forex Robots">Forex Robots</option>
              <option value="Trading Tools">Trading Tools</option>
              <option value="Indicators">Indicators</option>
            </select>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-100 dark:shadow-none overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800 text-slate-400 text-[10px] uppercase tracking-widest font-black">
                <th className="px-8 py-6">Product Details</th>
                <th className="px-8 py-6">Category</th>
                <th className="px-8 py-6">Price</th>
                <th className="px-8 py-6">Media</th>
                <th className="px-8 py-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {loading ? (
                [...Array(5)].map((_, i) => <TableRowSkeleton key={i} />)
              ) : (
                filteredProducts.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors group">
                    <td className="px-8 py-6">
                      <div className="flex items-center space-x-4">
                        <div className="w-14 h-14 bg-black border border-slate-200 dark:border-slate-700 overflow-hidden flex-shrink-0 relative">
                          <img src={p.image} alt="" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                        </div>
                        <div>
                          <div className="font-black text-black dark:text-white text-sm uppercase tracking-tight group-hover:text-violet-600 transition-colors">{p.name}</div>
                          <div className="text-[10px] text-slate-400 font-bold mt-1 uppercase tracking-wider truncate w-40" dangerouslySetInnerHTML={{ __html: p.description }}></div>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex flex-col space-y-1">
                        <span className="bg-slate-100 dark:bg-slate-800 text-slate-400 px-3 py-1 text-[8px] font-black uppercase tracking-widest border border-slate-200 dark:border-slate-700 w-fit">
                          {p.category}
                        </span>
                        {p.badge && (
                          <span className={`text-[7px] font-black uppercase tracking-[0.2em] px-2 py-0.5 rounded-none border w-fit ${
                            p.badge === 'HOT' ? 'border-rose-200 text-rose-500' : 
                            p.badge === 'NEW' ? 'border-emerald-200 text-emerald-500' : 'border-violet-200 text-violet-500'
                          }`}>
                            {p.badge}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-8 py-6 font-black text-black dark:text-white tracking-tighter text-lg">৳{p.price}</td>
                    <td className="px-8 py-6">
                      <div className="flex flex-col space-y-2">
                         <div className="flex items-center space-x-1 text-black dark:text-white font-black text-[10px] uppercase">
                          <Star size={12} className="fill-black dark:fill-white" />
                          <span>{p.rating || 5.0}</span>
                        </div>
                        {p.video_url && (
                          <span className="bg-violet-600 text-white px-2 py-0.5 text-[7px] font-black uppercase tracking-widest w-fit">Demo Available</span>
                        )}
                      </div>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <div className="flex items-center justify-end space-x-3">
                        <button 
                          onClick={() => handleEdit(p)}
                          className="p-2.5 bg-slate-50 dark:bg-slate-800 text-slate-400 hover:text-black dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-700 transition-all"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button 
                          onClick={() => handleDelete(p.id)}
                          className="p-2.5 bg-slate-50 dark:bg-slate-800 text-slate-400 hover:text-red-500 hover:bg-red-50 transition-all"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Product Modal (Add/Edit) */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.form
              onSubmit={handleSave}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white dark:bg-slate-900 w-full max-w-3xl rounded-none relative z-10 shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-800"
            >
              <div className="p-8 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <h3 className="text-2xl font-black font-heading text-black dark:text-white uppercase tracking-tighter">
                  {isEditMode ? 'Edit Asset' : 'Add New Asset'}
                </h3>
                <button type="button" onClick={() => setIsModalOpen(false)} className="p-2 text-slate-400 hover:text-black dark:hover:text-white transition-all">
                  <X size={24} />
                </button>
              </div>
              <div className="p-10 space-y-8 max-h-[70vh] overflow-y-auto scrollbar-hide">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Asset Name</label>
                    <input 
                      type="text" 
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      placeholder="e.g. Gold Scalper EA" 
                      className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 px-6 py-4 text-sm font-bold outline-none focus:border-black dark:focus:border-white transition-all text-black dark:text-white" 
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Category</label>
                    <select 
                      value={formData.category}
                      onChange={(e) => setFormData({...formData, category: e.target.value})}
                      className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 px-6 py-4 text-sm font-bold outline-none focus:border-black dark:focus:border-white transition-all appearance-none cursor-pointer text-black dark:text-white"
                    >
                      <option>MT4 Indicators</option>
                      <option>Forex Robots</option>
                      <option>Trading Tools</option>
                      <option>Indicators</option>
                    </select>
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Marketing Badge</label>
                    <select 
                      value={formData.badge}
                      onChange={(e) => setFormData({...formData, badge: e.target.value})}
                      className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 px-6 py-4 text-sm font-bold outline-none focus:border-black dark:focus:border-white transition-all appearance-none cursor-pointer text-black dark:text-white"
                    >
                      <option value="">None</option>
                      <option value="HOT">HOT</option>
                      <option value="NEW">NEW</option>
                      <option value="SALE">SALE</option>
                    </select>
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Product Tags (Comma Separated)</label>
                    <input 
                      type="text" 
                      value={productTags}
                      onChange={(e) => setProductTags(e.target.value)}
                      placeholder="Professional Grade, Hyper-realistic" 
                      className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 px-6 py-4 text-sm font-bold outline-none focus:border-black dark:focus:border-white transition-all text-black dark:text-white" 
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Price (BDT)</label>
                    <input 
                      type="number" 
                      required
                      value={formData.price}
                      onChange={(e) => setFormData({...formData, price: e.target.value})}
                      placeholder="2500" 
                      className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 px-6 py-4 text-sm font-bold outline-none focus:border-black dark:focus:border-white transition-all text-black dark:text-white" 
                    />
                  </div>
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Marketing Description (Rich Text)</label>
                  <div className="quill-wrapper">
                    <ReactQuill 
                      theme="snow"
                      value={formData.description || ''}
                      onChange={(content) => setFormData({...formData, description: content})}
                      modules={quillModules}
                      formats={quillFormats}
                      className="bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 text-black dark:text-white"
                    />
                  </div>
                  <style>{`
                    .quill-wrapper .ql-toolbar { border-color: #f1f5f9; background: white; }
                    .dark .quill-wrapper .ql-toolbar { border-color: #1e293b; background: #0f172a; }
                    .quill-wrapper .ql-container { border-color: #f1f5f9; min-height: 150px; font-size: 14px; }
                    .dark .quill-wrapper .ql-container { border-color: #1e293b; }
                    .dark .ql-snow .ql-stroke { stroke: #94a3b8; }
                    .dark .ql-snow .ql-fill { fill: #94a3b8; }
                    .dark .ql-snow .ql-picker { color: #94a3b8; }
                    .dark .ql-editor { color: #f8fafc; }
                  `}</style>
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center justify-between">
                    <span>Extended Details (Raw HTML)</span>
                    <span className="text-[9px] text-cyan-500">Optional: For custom layout below features</span>
                  </label>
                  <textarea 
                    value={extendedHtml}
                    onChange={(e) => setExtendedHtml(e.target.value)}
                    placeholder="<p>Paste your custom HTML details here...</p>" 
                    rows="4"
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 px-6 py-4 text-sm font-bold outline-none focus:border-black dark:focus:border-white transition-all text-black dark:text-white font-mono" 
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Product Image (File or URL)</label>
                    <div className="flex flex-col space-y-4">
                      <div className="flex items-center space-x-4">
                        <label className="flex-grow cursor-pointer bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 px-6 py-4 text-xs font-bold text-slate-400 hover:border-black dark:hover:border-white transition-all flex items-center justify-center space-x-2">
                          <Upload size={16} />
                          <span>{uploading ? 'Uploading...' : 'Upload from PC'}</span>
                          <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} disabled={uploading} />
                        </label>
                      </div>
                      <input 
                        type="text" 
                        value={formData.image}
                        onChange={(e) => setFormData({...formData, image: e.target.value})}
                        placeholder="Or paste image URL here..."
                        className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 px-6 py-4 text-sm font-bold outline-none focus:border-black dark:focus:border-white transition-all text-black dark:text-white" 
                      />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Demo Link (YouTube/Telegram/GIF)</label>
                    <input 
                      type="text" 
                      value={formData.video_url}
                      onChange={(e) => setFormData({...formData, video_url: e.target.value})}
                      placeholder="e.g. https://youtube.com/watch?v=... or https://t.me/..." 
                      className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 px-6 py-4 text-sm font-bold outline-none focus:border-black dark:focus:border-white transition-all text-black dark:text-white" 
                    />
                  </div>
                </div>

                {/* Features Management Section */}
                <div className="space-y-6 pt-4 border-t border-slate-100 dark:border-slate-800">
                  <div className="flex items-center justify-between">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Detailed Features (Product Box Design)</label>
                    <button 
                      type="button" 
                      onClick={addFeature}
                      className="text-[9px] font-black uppercase tracking-widest bg-violet-600 text-white px-4 py-2 hover:bg-violet-700 transition-all"
                    >
                      + Add Feature
                    </button>
                  </div>
                  
                  <div className="space-y-4">
                    {formData.features?.map((feature, idx) => (
                      <div key={idx} className="p-6 bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700 space-y-4 relative group">
                        <button 
                          type="button" 
                          onClick={() => removeFeature(idx)}
                          className="absolute top-4 right-4 text-slate-400 hover:text-red-500 transition-all"
                        >
                          <X size={16} />
                        </button>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <label className="text-[8px] font-black uppercase tracking-widest text-slate-400">Icon Type</label>
                            <select 
                              value={feature.icon}
                              onChange={(e) => updateFeature(idx, 'icon', e.target.value)}
                              className="w-full bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-700 px-4 py-2 text-xs font-bold outline-none"
                            >
                              <option value="Zap">Zap (Flash)</option>
                              <option value="ShieldCheck">Shield (Security)</option>
                              <option value="Smartphone">Smartphone (Mobile)</option>
                              <option value="MessageCircle">Chat (Telegram)</option>
                              <option value="CheckCircle2">Check (Verified)</option>
                              <option value="Download">Download (Files)</option>
                              <option value="Package">Package (Product)</option>
                              <option value="Lock">Lock (Privacy)</option>
                              <option value="Edit2">Edit (Customizable)</option>
                            </select>
                          </div>
                          <div className="space-y-2">
                            <label className="text-[8px] font-black uppercase tracking-widest text-slate-400">Feature Title</label>
                            <input 
                              type="text" 
                              value={feature.title}
                              onChange={(e) => updateFeature(idx, 'title', e.target.value)}
                              placeholder="e.g. Real-time Analysis"
                              className="w-full bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-700 px-4 py-2 text-xs font-bold outline-none"
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <label className="text-[8px] font-black uppercase tracking-widest text-slate-400">Feature Description</label>
                          <textarea 
                            value={feature.description}
                            onChange={(e) => updateFeature(idx, 'description', e.target.value)}
                            placeholder="Briefly describe this feature..."
                            rows="2"
                            className="w-full bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-700 px-4 py-2 text-xs font-bold outline-none resize-none"
                          ></textarea>
                        </div>
                      </div>
                    ))}
                    {(!formData.features || formData.features.length === 0) && (
                      <div className="text-center py-10 border-2 border-dashed border-slate-100 dark:border-slate-800">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">No detailed features added yet.</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="p-8 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-100 dark:border-slate-800 flex items-center justify-end gap-6">
                <button type="button" onClick={() => setIsModalOpen(false)} className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-black dark:hover:text-white transition-all">Discard</button>
                <button type="submit" className="bg-black dark:bg-white text-white dark:text-black px-10 py-4 font-black uppercase tracking-widest text-sm hover:opacity-90 transition-all shadow-xl shadow-slate-200 dark:shadow-none">
                  {isEditMode ? 'Update Asset' : 'Save Asset'}
                </button>
              </div>
            </motion.form>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Products;
