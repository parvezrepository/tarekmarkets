import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';

// Layout Components
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import CartDrawer from './components/cart/CartDrawer';
import WhatsAppButton from './components/shared/WhatsAppButton';
import AdminLayout from './components/admin/AdminLayout';
import ProtectedRoute from './components/admin/ProtectedRoute';
import SmoothScroll from './components/shared/SmoothScroll';

// Frontend Pages
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetails from './pages/ProductDetails';
import Checkout from './pages/Checkout';
import Confirmation from './pages/Confirmation';

// Admin Pages
import Login from './pages/admin/Login';
import Dashboard from './pages/admin/Dashboard';
import Products from './pages/admin/Products';
import Orders from './pages/admin/Orders';
import Customers from './pages/admin/Customers';
import Payments from './pages/admin/Payments';
import Delivery from './pages/admin/Delivery';
import Settings from './pages/admin/Settings';

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const AppContent = () => {
  const location = useLocation();
  const isAdminPath = location.pathname.startsWith('/admin');

  return (
    <SmoothScroll>
      <div className={`flex flex-col min-h-screen transition-colors duration-500 ${
        isAdminPath 
          ? 'bg-[#020617]' 
          : 'bg-white dark:bg-[#020617]'
      } text-text-main selection:bg-accent-cyan selection:text-primary-dark`}>
        <ScrollToTop />
        
        {!isAdminPath && <Header />}
        {!isAdminPath && <CartDrawer />}
        
        <main className="flex-grow">
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              {/* Frontend Routes - Sales Focused */}
              <Route path="/" element={<Home />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/product/:id" element={<ProductDetails />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/confirmation" element={<Confirmation />} />

              {/* Admin Login */}
              <Route path="/admin/login" element={<Login />} />

              {/* Admin Routes - Protected */}
              <Route 
                path="/admin/*" 
                element={
                  <ProtectedRoute>
                    <AdminLayout>
                      <Routes>
                        <Route path="dashboard" element={<Dashboard />} />
                        <Route path="products" element={<Products />} />
                        <Route path="orders" element={<Orders />} />
                        <Route path="customers" element={<Customers />} />
                        <Route path="settings" element={<Settings />} />
                        <Route path="*" element={<Navigate to="dashboard" replace />} />
                      </Routes>
                    </AdminLayout>
                  </ProtectedRoute>
                } 
              />
              
              {/* Fallback to Home */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </AnimatePresence>
        </main>

        {!isAdminPath && <Footer />}
        {!isAdminPath && <WhatsAppButton />}
      </div>
    </SmoothScroll>
  );
};

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <CartProvider>
          <Router>
            <AppContent />
          </Router>
        </CartProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
