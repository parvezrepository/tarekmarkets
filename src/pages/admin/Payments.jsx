import React from 'react';
import { transactions } from '../../data/adminData';
import { CreditCard, Search, Download, CheckCircle2, Clock } from 'lucide-react';

const Payments = () => {
  return (
    <div className="space-y-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black font-heading text-black uppercase tracking-tighter">Settlements</h1>
          <p className="text-slate-500 font-medium mt-2">Monitor all incoming payments and gateway status.</p>
        </div>
        <button className="flex items-center space-x-3 bg-black text-white px-8 py-4 font-black uppercase tracking-widest text-sm hover:bg-zinc-800 transition-all shadow-xl shadow-slate-200">
          <Download size={18} />
          <span>Financial Report</span>
        </button>
      </div>

      <div className="bg-white border border-slate-200 shadow-xl shadow-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-400 text-[10px] uppercase tracking-widest font-black">
                <th className="px-8 py-6">Transaction ID</th>
                <th className="px-8 py-6">Customer</th>
                <th className="px-8 py-6">Amount</th>
                <th className="px-8 py-6">Gateway</th>
                <th className="px-8 py-6">Status</th>
                <th className="px-8 py-6">Timestamp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {transactions.map((txn) => (
                <tr key={txn.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-8 py-6">
                    <span className="text-xs font-black text-black bg-slate-100 px-3 py-1.5">{txn.id}</span>
                  </td>
                  <td className="px-8 py-6">
                    <div className="font-black text-black text-sm uppercase tracking-tight">{txn.customer}</div>
                  </td>
                  <td className="px-8 py-6 font-black text-black tracking-tighter text-lg">৳{txn.amount}</td>
                  <td className="px-8 py-6">
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">{txn.method}</span>
                  </td>
                  <td className="px-8 py-6">
                    {txn.status === 'Success' ? (
                      <div className="inline-flex items-center space-x-2 text-emerald-600 bg-emerald-50 px-3 py-1 text-[10px] font-black uppercase tracking-widest border border-emerald-100">
                        <CheckCircle2 size={12} />
                        <span>Success</span>
                      </div>
                    ) : (
                      <div className="inline-flex items-center space-x-2 text-amber-600 bg-amber-50 px-3 py-1 text-[10px] font-black uppercase tracking-widest border border-amber-100">
                        <Clock size={12} />
                        <span>Pending</span>
                      </div>
                    )}
                  </td>
                  <td className="px-8 py-6 text-xs text-slate-400 font-bold uppercase tracking-wider">{txn.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Payments;
