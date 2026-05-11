import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate, Navigate } from 'react-router-dom';
import { ShieldCheck, CreditCard, Landmark, Wallet, CheckCircle2, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const Checkout = () => {
  const { cart, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState('bkash');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });

  if (cart.length === 0) {
    return <Navigate to="/shop" />;
  }

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate order processing
    const orderId = 'ORD-' + Math.random().toString(36).substr(2, 9).toUpperCase();
    setTimeout(() => {
      clearCart();
      navigate('/confirmation', { state: { orderId, email: formData.email } });
    }, 1500);
  };

  const paymentOptions = [
    { id: 'bkash', name: 'bKash', icon: Wallet, color: 'hover:border-[#D12053]' },
    { id: 'nagad', name: 'Nagad', icon: Wallet, color: 'hover:border-[#F7941D]' },
    { id: 'bank', name: 'Bank Transfer', icon: Landmark, color: 'hover:border-violet-600' },
    { id: 'card', name: 'Credit/Debit Card', icon: CreditCard, color: 'hover:border-black' },
  ];

  return (
    <div className="pt-32 pb-20 bg-white min-h-screen">
      <div className="container mx-auto px-6 max-w-6xl">
        <h1 className="text-4xl md:text-6xl font-black font-heading text-black uppercase tracking-tighter mb-16 text-center">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Form Area */}
          <div className="lg:col-span-7 space-y-12">
            <form id="checkout-form" onSubmit={handleSubmit} className="space-y-12">
              {/* Customer Info */}
              <div className="space-y-8">
                <h3 className="text-xl font-black font-heading text-black uppercase tracking-tighter flex items-center space-x-3">
                  <span className="w-8 h-8 bg-black text-white rounded-none flex items-center justify-center text-xs">01</span>
                  <span>Personal Details</span>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Full Name</label>
                    <input
                      required
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="John Doe"
                      className="w-full bg-slate-50 border border-slate-200 px-6 py-4 text-sm font-bold outline-none focus:border-black transition-all"
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Email Address</label>
                    <input
                      required
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="john@example.com"
                      className="w-full bg-slate-50 border border-slate-200 px-6 py-4 text-sm font-bold outline-none focus:border-black transition-all"
                    />
                  </div>
                  <div className="md:col-span-2 space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Phone Number</label>
                    <input
                      required
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+880 1XXX-XXXXXX"
                      className="w-full bg-slate-50 border border-slate-200 px-6 py-4 text-sm font-bold outline-none focus:border-black transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="space-y-8">
                <h3 className="text-xl font-black font-heading text-black uppercase tracking-tighter flex items-center space-x-3">
                  <span className="w-8 h-8 bg-black text-white rounded-none flex items-center justify-center text-xs">02</span>
                  <span>Payment Gateway</span>
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {paymentOptions.map((option) => (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => setPaymentMethod(option.id)}
                      className={`relative p-6 border-2 transition-all flex flex-col items-center justify-center space-y-4 ${
                        paymentMethod === option.id
                          ? 'border-black bg-slate-50 shadow-xl shadow-slate-200/50'
                          : 'border-slate-100 bg-white ' + option.color
                      }`}
                    >
                      <option.icon size={24} className={paymentMethod === option.id ? 'text-black' : 'text-slate-300'} />
                      <span className={`text-[10px] font-black uppercase tracking-widest text-center ${paymentMethod === option.id ? 'text-black' : 'text-slate-400'}`}>
                        {option.name}
                      </span>
                      {paymentMethod === option.id && (
                        <div className="absolute top-2 right-2 bg-black text-white p-0.5">
                          <CheckCircle2 size={12} />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
                
                <div className="p-6 bg-slate-50 border border-slate-100 border-l-4 border-l-violet-500">
                  <p className="text-sm text-slate-500 font-medium leading-relaxed">
                    {paymentMethod === 'bkash' && "You will be redirected to the bKash payment gateway to complete your transaction safely."}
                    {paymentMethod === 'nagad' && "Follow the Nagad instructions on the next screen to finish your payment."}
                    {paymentMethod === 'bank' && "Our bank details will be shared on the confirmation page for manual transfer."}
                    {paymentMethod === 'card' && "We support Visa, Mastercard, and American Express with 3D Secure protection."}
                  </p>
                </div>
              </div>
            </form>
          </div>

          {/* Sidebar Summary */}
          <div className="lg:col-span-5">
            <div className="bg-slate-50 border border-slate-200 p-10 sticky top-32 space-y-8">
              <h3 className="text-xl font-black font-heading text-black uppercase tracking-tighter">Order Summary</h3>
              
              <div className="space-y-6 max-h-60 overflow-y-auto pr-4 scrollbar-hide">
                {cart.map((item) => (
                  <div key={item.id} className="flex justify-between items-start gap-4">
                    <div className="flex-grow">
                      <h4 className="text-sm font-black text-black uppercase tracking-tight">{item.name}</h4>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Qty: {item.quantity}</p>
                    </div>
                    <span className="text-sm font-black text-black tracking-tighter">৳{item.price * item.quantity}</span>
                  </div>
                ))}
              </div>

              <div className="pt-8 border-t border-slate-200 space-y-4">
                <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-slate-400">
                  <span>Subtotal</span>
                  <span className="text-black">৳{cartTotal}</span>
                </div>
                <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-slate-400">
                  <span>Platform Fee</span>
                  <span className="text-violet-600">FREE</span>
                </div>
                <div className="flex justify-between items-center pt-6 border-t border-slate-200">
                  <span className="text-sm font-black uppercase tracking-widest text-black">Total Amount</span>
                  <span className="text-3xl font-black text-black tracking-tighter">৳{cartTotal}</span>
                </div>
              </div>

              <button
                form="checkout-form"
                type="submit"
                className="w-full bg-black text-white py-6 font-black uppercase tracking-widest text-sm hover:bg-zinc-800 transition-all shadow-2xl shadow-slate-300"
              >
                Confirm & Pay
              </button>

              <div className="flex items-center justify-center space-x-3 text-slate-400 text-[10px] font-black uppercase tracking-widest pt-4">
                <ShieldCheck size={16} />
                <span>SSL Secured Checkout</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
