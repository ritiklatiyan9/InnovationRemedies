import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Toaster } from 'react-hot-toast';

// Auth Context Provider
import { AuthProvider } from './Pages/Component/context/AuthContext';
import ProtectedRoute from './Pages/SinglePages/ProtectedRoute';

// Page & Component Imports
import ScrollToTop from './Pages/SinglePages/ScrollToTop';
import Header from './Pages/Component/Header/Header';
import ListProducts from './Pages/Component/Products/ListProducts';
import ProductDetailPage from './Pages/Component/Products/ProductsDetails';
import Home from './Pages/Component/Home/Home';
import NotFound from './Pages/SinglePages/NotFound';
import Footer from './Pages/Component/Footer/Footer';
import Contact from './Pages/SinglePages/Contact';
import Store from './Pages/Component/Store/Store';
import About from './Pages/Component/About/About';
import Preloader from './Pages/Component/Preloader/Preloader';
import Login from './Pages/Component/Login/Login';

// Chat Components
import ChatIcon from './Pages/Component/Chat/ChatIcon';
import ChatModal from './Pages/SinglePages/AiAssistant';

import './fonts.css';

function App() {
  const [loading, setLoading] = useState(true);
  const [isChatOpen, setIsChatOpen] = useState(false);

  // Handle page reload detection and preloader
  useEffect(() => {
    const handleBeforeUnload = () => {
      window.sessionStorage.setItem('isReloading', 'true');
    };
    
    window.addEventListener('beforeunload', handleBeforeUnload);

    const isReloading = window.sessionStorage.getItem('isReloading') === 'true';
    if (isReloading) {
      setLoading(true);
      window.sessionStorage.removeItem('isReloading');
    }

    const timer = setTimeout(() => {
      if (loading) setLoading(false);
    }, 1500);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      clearTimeout(timer);
    };
  }, []);

  // Navigation Links for JSON-LD
  const navLinks = [
    { name: 'Home', url: 'https://www.innovationremedies.com/' },
    { name: 'Products', url: 'https://www.innovationremedies.com/products' },
    { name: 'Store', url: 'https://www.innovationremedies.com/store' },
    { name: 'About', url: 'https://www.innovationremedies.com/about' },
    { name: 'Contact', url: 'https://www.innovationremedies.com/contact' },
    { name: 'Login', url: 'https://www.innovationremedies.com/login' },
  ];

  // JSON-LD for Sitelinks Navigation
  const navJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": navLinks.map((link, i) => ({
      "@type": "SiteNavigationElement",
      "position": i + 1,
      "name": link.name,
      "url": link.url
    }))
  };

  // JSON-LD for Site Search
  const searchJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "url": "https://www.innovationremedies.com/",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://www.innovationremedies.com/products?search={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <HelmetProvider>
      <Helmet
        titleTemplate="%s | Innovation Remedies"
        defaultTitle="Innovation Remedies - Better Care For Every Animal"
      >
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

        {/* JSON-LD for SearchBox */}
        <script type="application/ld+json">
          {JSON.stringify(searchJsonLd, null, 2)}
        </script>

        {/* JSON-LD for Sitelinks Navigation */}
        <script type="application/ld+json">
          {JSON.stringify(navJsonLd, null, 2)}
        </script>
      </Helmet>

      {/* Wrap entire app with AuthProvider */}
      <AuthProvider>
        {/* Toast notifications */}
        <Toaster position="top-right" />

        {/* Preloader */}
        {loading && <Preloader setLoading={setLoading} />}

        {/* Main Application */}
        {!loading && (
          <Router>
            <ScrollToTop />
            <Header />
            
            <main className="pt-16 min-h-screen">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<ListProducts />} />
                
                {/* Public routes */}
                <Route path="/login" element={<Login />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                
                {/* Protected routes */}
                <Route element={<ProtectedRoute />}>
                  <Route path="/product/:id" element={<ProductDetailPage />} />
                  <Route path="/store" element={<Store />} />
                  {/* Add other protected routes here */}
                </Route>
                
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            
            <Footer />
            
            {/* Floating Chat Components */}
            <ChatIcon onClick={() => setIsChatOpen(true)} isOpen={isChatOpen} />
            <ChatModal isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
          </Router>
        )}
      </AuthProvider>
    </HelmetProvider>
  );
}

export default App; 