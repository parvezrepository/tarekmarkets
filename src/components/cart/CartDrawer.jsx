import React from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const CartDrawer = () => {
  const { cart, removeFromCart, updateQuantity, cartTotal, isCartOpen, setIsCartOpen } = useCart();

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-surface z-[70] shadow-2xl border-l border-white/5 flex flex-col"
          >
            {/* Header */}
            <div className="p-6 border-b border-white/5 flex items-center justify-between">
              <h2 className="text-xl font-bold font-heading">Shopping Cart</h2>
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-2 hover:bg-white/5 rounded-full transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-grow overflow-y-auto p-6 space-y-6">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-text-muted space-y-4">
                  <ShoppingBag size={64} strokeWidth={1} />
                  <p>Your cart is empty</p>
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="text-accent-cyan hover:underline"
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                cart.map((item) => (
                  <div key={item.id} className="flex space-x-4 group">
                    <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 border border-white/5">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-grow space-y-1">
                      <h3 className="text-sm font-bold text-white leading-tight">{item.name}</h3>
                      <p className="text-xs text-text-muted">{item.category}</p>
                      <div className="flex items-center justify-between pt-2">
                        <div className="flex items-center space-x-3 bg-primary-dark/50 rounded-md p-1 border border-white/5">
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            className="p-1 hover:text-accent-cyan transition-colors"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="text-sm font-medium w-4 text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            className="p-1 hover:text-accent-cyan transition-colors"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                        <span className="text-sm font-bold text-accent-gold">৳{item.price * item.quantity}</span>
                      </div>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="p-1 text-text-muted hover:text-red-500 transition-colors self-start"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {cart.length > 0 && (
              <div className="p-6 border-t border-white/5 bg-primary-dark/30 space-y-4">
                <div className="flex justify-between items-center text-lg font-bold">
                  <span>Total</span>
                  <span className="text-accent-gold">৳{cartTotal}</span>
                </div>
                <p className="text-xs text-text-muted">Taxes and shipping calculated at checkout.</p>
                <Link
                  to="/checkout"
                  onClick={() => setIsCartOpen(false)}
                  className="w-full py-4 bg-accent-cyan text-primary-dark font-bold rounded-xl flex items-center justify-center space-x-2 hover:bg-white transition-all cyan-glow"
                >
                  <span>Proceed to Checkout</span>
                </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;
