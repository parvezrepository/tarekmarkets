import React from 'react';
import { deliveryStatus } from '../../data/adminData';
import { Send, CheckCircle2, DownloadCloud, Link as LinkIcon, ExternalLink } from 'lucide-react';

const Delivery = () => {
  return (
    <div className="space-y-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black font-heading text-black uppercase tracking-tighter">Delivery Queue</h1>
          <p className="text-slate-500 font-medium mt-2">Monitor and trigger digital product delivery links.</p>
        </div>
        <div className="flex items-center space-x-3 bg-slate-50 border border-slate-200 px-6 py-3">
          <div className="w-2 h-2 rounded-full bg-violet-600 animate-pulse"></div>
          <span className="text-[10px] font-black uppercase tracking-widest text-black">Live Monitor</span>
        </div>
      </div>

      <div className="bg-white border border-slate-200 shadow-xl shadow-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-400 text-[10px] uppercase tracking-widest font-black">
                <th className="px-8 py-6">Order ID</th>
                <th className="px-8 py-6">Customer / Product</th>
                <th className="px-8 py-6">Asset Link</th>
                <th className="px-8 py-6">Status</th>
                <th className="px-8 py-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {deliveryStatus.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-8 py-6">
                    <span className="text-xs font-black text-black bg-slate-100 px-3 py-1.5">{item.id}</span>
                  </td>
                  <td className="px-8 py-6">
                    <div className="font-black text-black text-sm uppercase tracking-tight">{item.product}</div>
                    <div className="text-[10px] text-slate-400 font-bold mt-1 uppercase tracking-wider">{item.email}</div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center space-x-2 text-violet-600 font-bold text-xs group-hover:text-black transition-colors">
                      <LinkIcon size={14} />
                      <span className="truncate w-32">{item.link}</span>
                      <ExternalLink size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    {item.sent ? (
                      <div className="inline-flex items-center space-x-2 text-emerald-600 bg-emerald-50 px-3 py-1 text-[10px] font-black uppercase tracking-widest border border-emerald-100">
                        <CheckCircle2 size={12} />
                        <span>Delivered</span>
                      </div>
                    ) : (
                      <div className="inline-flex items-center space-x-2 text-slate-400 bg-slate-50 px-3 py-1 text-[10px] font-black uppercase tracking-widest border border-slate-200">
                        <div className="w-1.5 h-1.5 rounded-full bg-slate-400"></div>
                        <span>Queued</span>
                      </div>
                    )}
                  </td>
                  <td className="px-8 py-6 text-right">
                    <button className={`px-5 py-2.5 text-[10px] font-black uppercase tracking-widest transition-all flex items-center space-x-2 ml-auto ${
                      item.sent 
                      ? 'bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200' 
                      : 'bg-black text-white hover:bg-zinc-800 shadow-lg shadow-slate-200'
                    }`}>
                      <Send size={14} />
                      <span>Send Link</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Delivery;
