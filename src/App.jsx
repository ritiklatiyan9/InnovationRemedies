import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';
// Import Sonner Toaster
import { Toaster } from 'sonner'; // <--- IMPORT SONNER TOASTER

// Auth Context Provider
import { AuthProvider } from './Pages/Component/context/AuthContext'; // Adjust path if needed
import ProtectedRoute from './Pages/SinglePages/ProtectedRoute'; // Adjust path if needed

// Page & Component Imports (Adjust paths as needed)
import ScrollToTop from './Pages/SinglePages/ScrollToTop';
import Header from './Pages/Component/Header/Header';
import ListProducts from './Pages/Component/Products/ListProducts';
import AdminManageOrder from './Pages/Component/Order/AdminManageOrder';
import ProductDetailPage from './Pages/Component/Products/ProductsDetails';
import Home from './Pages/Component/Home/Home';
import NotFound from './Pages/SinglePages/NotFound';
import Footer from './Pages/Component/Footer/Footer';
import OrderDetailsPage from './Pages/Component/Order/OrderDetails';
import Contact from './Pages/SinglePages/Contact';
import Store from './Pages/Component/Store/Store';
import About from './Pages/Component/About/About';
import MyOrdersPage from './Pages/Component/Order/AllOrders'; // Adjust path if needed
import Preloader from './Pages/Component/Preloader/Preloader';
import Login from './Pages/Component/Login/Login';
import OrderConfirmationPage from './Pages/Component/Order/ConfirmOrder';

// Chat Components (Adjust paths as needed)
import ChatIcon from './Pages/Component/Chat/ChatIcon';
import ChatModal from './Pages/SinglePages/AiAssistant'; // Assuming this is the AI Assistant

import './fonts.css';

function App() {
  const [loading, setLoading] = useState(true);
  const [isChatOpen, setIsChatOpen] = useState(false);

  // Preloader logic (remains the same)
  useEffect(() => {
    const handleBeforeUnload = () => {
      window.sessionStorage.setItem('isReloading', 'true');
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    const isReloading = window.sessionStorage.getItem('isReloading') === 'true';
    if (isReloading) {
      setLoading(true);
      window.sessionStorage.removeItem('isReloading');
      // Shorten preloader time on reload if desired
       const timer = setTimeout(() => {
         if (loading) setLoading(false);
       }, 800); // Shorter time for reload
       return () => {
           window.removeEventListener('beforeunload', handleBeforeUnload);
           clearTimeout(timer);
       };
    } else {
        // Longer preloader for initial load
        const timer = setTimeout(() => {
            if (loading) setLoading(false);
        }, 1500); // Original longer time
         return () => {
             window.removeEventListener('beforeunload', handleBeforeUnload);
             clearTimeout(timer);
         };
    }


  }, []); // Removed loading dependency to avoid re-triggering timer unnecessarily


  // Navigation Links & JSON-LD (remain the same)
  const navLinks = [
    { name: 'Home', url: 'https://www.innovationremedies.com/' },
    { name: 'Products', url: 'https://www.innovationremedies.com/products' },
    { name: 'Store', url: 'https://www.innovationremedies.com/store' },
    { name: 'About', url: 'https://www.innovationremedies.com/about' },
    { name: 'Contact', url: 'https://www.innovationremedies.com/contact' },
    { name: 'Login', url: 'https://www.innovationremedies.com/login' },
  ];
  const navJsonLd = { /* ... */ };
  const searchJsonLd = { /* ... */ };

  return (
    <HelmetProvider>
      <Helmet
        titleTemplate="%s | Innovation Remedies"
        defaultTitle="Innovation Remedies - Better Care For Every Animal"
      >
        {/* Meta tags and JSON-LD scripts remain the same */}
        <meta
          name="description"
          content="Innovation Remedies offers high-quality veterinary products and solutions for the health and wellbeing of all animals. Explore our range for better care."
        />
        <meta
          name="keywords"
          content="veterinary, animal health, pet care, livestock, innovation remedies, animal wellness"
        />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Innovation Remedies" />

        <script type="application/ld+json">
          {JSON.stringify(searchJsonLd, null, 2)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(navJsonLd, null, 2)}
        </script>
      </Helmet>

      <AuthProvider>
        {/* Use Sonner Toaster - Replace react-hot-toast */}
        <Toaster position="top-right" richColors closeButton /> {/* <-- USE SONNER TOASTER */}

        {loading && <Preloader setLoading={setLoading} />}

        {!loading && (
          <Router>
            <ScrollToTop />
            <Header />

            <main className="pt-16 md:pt-16 min-h-screen"> {/* Adjusted padding */}
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<ListProducts />} />
                <Route path="/login" element={<Login />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/store" element={<Store />} />
                {/* Example using slug for product detail */}
                <Route path="/product/:id" element={<ProductDetailPage />} />
                {/* You could also use a slug: <Route path="/product/:slug" element={<ProductDetailPage />} /> */}
                {/* Ensure ProductDetailPage can handle finding by slug if you use that */}


                {/* Protected Routes */}
                <Route element={<ProtectedRoute />}>
                  {/* Ensure these components exist and paths are correct */}
                  <Route path="/order-confirmation/:orderId" element={<OrderConfirmationPage />} />
                  <Route path="/admin/orders" element={<AdminManageOrder />} />
                  <Route path="/cart" element={<MyOrdersPage />} />
                  <Route path="/orders" element={<MyOrdersPage />} />
                  <Route path="/orders/:orderId" element={<OrderDetailsPage />} />
                  {/* Add other protected routes like /my-orders, /profile etc. */}
                  {/* <Route path="/my-orders" element={<MyOrdersPage />} /> */}
                </Route>

                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>

            <Footer />

            {/* Floating Chat Components */}
            <ChatIcon onClick={() => setIsChatOpen(true)} /> {/* Removed isOpen prop if not needed */}
            <ChatModal isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
          </Router>
        )}
      </AuthProvider>
    </HelmetProvider>
  );
}

export default App;