import React, { Suspense, lazy } from 'react';
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

// Frontend Pages (Lazy Loaded for Speed)
const Home = lazy(() => import('./pages/Home'));
const Shop = lazy(() => import('./pages/Shop'));
const ProductDetails = lazy(() => import('./pages/ProductDetails'));
const Checkout = lazy(() => import('./pages/Checkout'));
const Confirmation = lazy(() => import('./pages/Confirmation'));
const LegalPage = lazy(() => import('./pages/LegalPage'));

// Admin Pages (Lazy Loaded for Speed)
const Login = lazy(() => import('./pages/admin/Login'));
const Dashboard = lazy(() => import('./pages/admin/Dashboard'));
const Products = lazy(() => import('./pages/admin/Products'));
const Orders = lazy(() => import('./pages/admin/Orders'));
const Customers = lazy(() => import('./pages/admin/Customers'));
const Payments = lazy(() => import('./pages/admin/Payments'));
const Delivery = lazy(() => import('./pages/admin/Delivery'));
const Settings = lazy(() => import('./pages/admin/Settings'));

// Loading Fallback
const PageLoader = () => (
  <div className="flex-grow flex items-center justify-center min-h-[60vh]">
    <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-violet-600"></div>
  </div>
);

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
      <div className={`flex flex-col min-h-screen transition-colors duration-500 bg-white dark:bg-[#020617] text-text-main selection:bg-accent-cyan selection:text-primary-dark`}>
        <ScrollToTop />
        
        {!isAdminPath && <Header />}
        {!isAdminPath && <CartDrawer />}
        
        <main className="flex-grow">
          <AnimatePresence mode="wait">
            <Suspense fallback={<PageLoader />}>
              <Routes location={location} key={location.pathname}>
                {/* Frontend Routes - Sales Focused */}
                <Route path="/" element={<Home />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/product/:id" element={<ProductDetails />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/confirmation" element={<Confirmation />} />
                <Route path="/privacy-policy" element={<LegalPage type="privacy" />} />
                <Route path="/terms-of-service" element={<LegalPage type="terms" />} />
                <Route path="/affiliate-program" element={<LegalPage type="affiliate" />} />

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
            </Suspense>
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
