// src/App.jsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Toaster } from 'sonner';

// Ensure these paths are correct for your project structure
import { AuthProvider } from './Pages/Component/context/AuthContext';
import ProtectedRoute from './Pages/SinglePages/ProtectedRoute';
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
import MyOrdersPage from './Pages/Component/Order/AllOrders';
import Preloader from './Pages/Component/Preloader/Preloader';
import Login from './Pages/Component/Login/Login';
import OrderConfirmationPage from './Pages/Component/Order/ConfirmOrder';
import ChatIcon from './Pages/Component/Chat/ChatIcon';
import ChatModal from './Pages/SinglePages/AiAssistant';

// --- NEW POLICY PAGE IMPORTS ---
import ReturnPolicy from './Pages/SinglePages/ReturnPolicy';
import ShippingPolicy from './Pages/SinglePages/ShippingPolicy';
// --- END NEW POLICY PAGE IMPORTS ---

import './fonts.css';


function App() {
  const [loading, setLoading] = useState(true);
  const [isChatOpen, setIsChatOpen] = useState(false);

  useEffect(() => {
    const handleBeforeUnload = () => {
      window.sessionStorage.setItem('isReloading', 'true');
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    const isReloading = window.sessionStorage.getItem('isReloading') === 'true';
    if (isReloading) {
      setLoading(true);
      window.sessionStorage.removeItem('isReloading');
      const timer = setTimeout(() => { if (loading) setLoading(false); }, 800);
      return () => { window.removeEventListener('beforeunload', handleBeforeUnload); clearTimeout(timer); };
    } else {
      const timer = setTimeout(() => { if (loading) setLoading(false); }, 1500);
      return () => { window.removeEventListener('beforeunload', handleBeforeUnload); clearTimeout(timer); };
    }
  }, []); // Removed `loading` from dependency array as it causes re-trigger


  const siteUrl = 'https://www.innovationremedies.com';
  const siteName = "Innovation Remedies";
  const defaultDescription = `${siteName} is a leading provider of high-quality veterinary products and animal health solutions across India. Discover our innovative range for optimal animal wellness and care.`;
  const defaultOgImage = `${siteUrl}/logo.png`; // Ensure logo.png is in your public folder or adjust path

  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": siteName,
    "alternateName": "Innovation Remedies Life Science Pvt. Ltd.",
    "url": siteUrl,
    "logo": defaultOgImage,
    "description": `Pioneering animal health, ${siteName} offers a comprehensive range of veterinary products and supplements to customers throughout India.`,
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+919057246900",
      "contactType": "Customer Service",
      "areaServed": "IN",
      "availableLanguage": ["en", "hi"]
    },
    "address": {
        "@type": "PostalAddress",
        "streetAddress": "638/101, Ganga Nagar",
        "addressLocality": "Meerut",
        "addressRegion": "Uttar Pradesh",
        "postalCode": "250001",
        "addressCountry": "IN"
    },
    "sameAs": [
       "https://www.facebook.com/profile.php?id=61575431486434",
       // Add other social media links here
    ]
  };

  const mainNavLinksForSchema = [
    { name: 'Home', url: `${siteUrl}/` },
    { name: 'Our Products', url: `${siteUrl}/products` },
    { name: 'Information Hub', url: `${siteUrl}/store` },
    { name: 'About Innovation Remedies', url: `${siteUrl}/about` },
    { name: 'Contact Us', url: `${siteUrl}/contact` },
    { name: 'Return Policy', url: `${siteUrl}/return-policy` },
    { name: 'Shipping Policy', url: `${siteUrl}/shipping-policy` },
  ];

  const siteNavigationJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Main Website Navigation",
    "description": `Key navigation links for ${siteName}, serving animal health needs across India.`,
    "itemListElement": mainNavLinksForSchema.map((link, index) => ({
      "@type": "SiteNavigationElement",
      "position": index + 1,
      "name": link.name,
      "url": link.url
    }))
  };

  return (
    <HelmetProvider>
      <Helmet
        titleTemplate={`%s | ${siteName}`}
        defaultTitle={`${siteName} - Veterinary Solutions & Animal Health Products India`}
      >
        <html lang="en-IN" />
        <meta name="description" content={defaultDescription} />
        <meta name="keywords" content={`${siteName}, veterinary products India, animal health India, pet care India, livestock supplements India, animal wellness solutions, veterinary medicine online India, animal pharmaceuticals`} />
        
        <meta property="og:title" content={`${siteName} - Veterinary Solutions & Animal Health Products India`} />
        <meta property="og:description" content={defaultDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={siteUrl} />
        <meta property="og:site_name" content={siteName} />
        <meta property="og:image" content={defaultOgImage} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:locale" content="en_IN" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${siteName} - Veterinary Solutions & Animal Health Products India`} />
        <meta name="twitter:description" content={defaultDescription} />
        <meta name="twitter:image" content={defaultOgImage} />

        <script type="application/ld+json">
          {JSON.stringify(organizationJsonLd, null, 2)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(siteNavigationJsonLd, null, 2)}
        </script>
      </Helmet>

      <AuthProvider>
        <Toaster position="top-right" richColors closeButton />
        {loading && <Preloader setLoading={setLoading} />}
        {!loading && (
          <Router>
            <ScrollToTop />
            <Header />
            <main className="pt-16 md:pt-16 min-h-screen"> {/* Ensure adequate padding for fixed header */}
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<ListProducts />} />
                <Route path="/login" element={<Login />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/store" element={<Store />} />
                <Route path="/product/:id" element={<ProductDetailPage />} />

                <Route path="/return-policy" element={<ReturnPolicy />} />
                <Route path="/shipping-policy" element={<ShippingPolicy />} />

                <Route element={<ProtectedRoute />}>
                  <Route path="/order-confirmation/:orderId" element={<OrderConfirmationPage />} />
                  <Route path="/admin/orders" element={<AdminManageOrder />} />
                  <Route path="/cart" element={<MyOrdersPage />} /> {/* Assuming cart shows orders or similar */}
                  <Route path="/orders" element={<MyOrdersPage />} />
                  <Route path="/orders/:orderId" element={<OrderDetailsPage />} />
                </Route>

                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer /> 
            <ChatIcon onClick={() => setIsChatOpen(true)} />
            <ChatModal isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
          </Router>
        )}
      </AuthProvider>
    </HelmetProvider>
  );
}

export default App;