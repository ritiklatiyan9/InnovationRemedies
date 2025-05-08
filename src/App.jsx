// src/App.jsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Toaster } from 'sonner';

// Auth Context Provider
import { AuthProvider } from './Pages/Component/context/AuthContext';
import ProtectedRoute from './Pages/SinglePages/ProtectedRoute';

// Page & Component Imports
import ScrollToTop from './Pages/SinglePages/ScrollToTop';
import Header from './Pages/Component/Header/Header';
import ListProducts from './Pages/Component/Products/ListProducts';
import AdminManageOrder from './Pages/Component/Order/AdminManageOrder';
import ProductDetailPage from './Pages/Component/Products/ProductsDetails';
import Home from './Pages/Component/Home/Home';
import NotFound from './Pages/SinglePages/NotFound';
import Footer from './Pages/Component/Footer/Footer';
import OrderDetailsPage from './Pages/Component/Order/OrderDetails';
import Contact from './Pages/SinglePages/Contact'; // Ensure this component sets its own Helmet tags
import Store from './Pages/Component/Store/Store';     // Ensure this component sets its own Helmet tags
import About from './Pages/Component/About/About';     // Ensure this component sets its own Helmet tags
import MyOrdersPage from './Pages/Component/Order/AllOrders';
import Preloader from './Pages/Component/Preloader/Preloader';
import Login from './Pages/Component/Login/Login';     // Ensure this component sets its own Helmet tags
import OrderConfirmationPage from './Pages/Component/Order/ConfirmOrder';

// Chat Components
import ChatIcon from './Pages/Component/Chat/ChatIcon';
import ChatModal from './Pages/SinglePages/AiAssistant';

import './fonts.css';

function App() {
  const [loading, setLoading] = useState(true);
  const [isChatOpen, setIsChatOpen] = useState(false);

  // Preloader logic
  useEffect(() => {
    const handleBeforeUnload = () => {
      window.sessionStorage.setItem('isReloading', 'true');
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    const isReloading = window.sessionStorage.getItem('isReloading') === 'true';
    if (isReloading) {
      setLoading(true);
      window.sessionStorage.removeItem('isReloading');
      const timer = setTimeout(() => {
        if (loading) setLoading(false);
      }, 800);
      return () => {
        window.removeEventListener('beforeunload', handleBeforeUnload);
        clearTimeout(timer);
      };
    } else {
      const timer = setTimeout(() => {
        if (loading) setLoading(false);
      }, 1500);
      return () => {
        window.removeEventListener('beforeunload', handleBeforeUnload);
        clearTimeout(timer);
      };
    }
  }, []); // Removed loading dependency

  // --- SEO & Structured Data ---
  const siteUrl = 'https://www.innovationremedies.com'; // REPLACE WITH YOUR ACTUAL SITE URL
  const siteName = "Innovation Remedies";
  const defaultDescription = "Innovation Remedies offers high-quality veterinary products and solutions for the health and wellbeing of all animals. Explore our range for better care.";
  const defaultOgImage = `${siteUrl}/logo.png`; // Main OG image, ensure logo.png is in public

  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": siteName,
    "url": siteUrl,
    "logo": `${siteUrl}/logo.png`,
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+91-YOUR-PHONE-NUMBER", // REPLACE WITH YOUR ACTUAL PHONE NUMBER
      "contactType": "Customer Service",
      "areaServed": "IN", // Example: India. Use ISO 3166-1 alpha-2 country code(s)
      "availableLanguage": ["en"] // Example: English
    },
    "sameAs": [ // Add your social media profiles
      // "https://www.facebook.com/yourcompany",
      // "https://twitter.com/yourcompany",
      // "https://www.linkedin.com/company/yourcompany"
    ],
    "description": defaultDescription
  };

  // For Google Sitelinks Search Box
  // IMPORTANT: This requires you to have a search functionality on your site
  // at the URL specified in target.urlTemplate (e.g., /search?q={search_term_string}).
  // If you don't have this, you can comment out or remove this script block.
  const websiteSearchJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": siteName,
    "url": siteUrl,
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${siteUrl}/search?q={search_term_string}` // Adjust if your search URL is different
      },
      "query-input": "required name=search_term_string"
    }
  };

  // For Sitelinks (based on your main navigation)
  const mainNavLinksForSchema = [
    { name: 'Home', url: `${siteUrl}/` },
    { name: 'Products', url: `${siteUrl}/products` },
    { name: 'Information', url: `${siteUrl}/store` }, // Corresponds to 'Store' in your nav
    { name: 'About Us', url: `${siteUrl}/about` },
    { name: 'Contact Us', url: `${siteUrl}/contact` },
  ];

  const siteNavigationJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Main Navigation",
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
        defaultTitle={`${siteName} - Better Care For Every Animal`}
      >
        <html lang="en" />
        <meta name="description" content={defaultDescription} />
        <meta name="keywords" content="veterinary, animal health, pet care, livestock, innovation remedies, animal wellness, veterinary medicine, animal supplements" />
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={siteName} />
        <meta property="og:title" content={`${siteName} - Better Care For Every Animal`} /> {/* Default OG Title */}
        <meta property="og:description" content={defaultDescription} /> {/* Default OG Description */}
        <meta property="og:url" content={siteUrl} /> {/* Default OG URL (homepage) */}
        <meta property="og:image" content={defaultOgImage} />
        <meta property="og:image:width" content="1200" /> {/* Optional: Specify image dimensions */}
        <meta property="og:image:height" content="630" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${siteName} - Better Care For Every Animal`} /> {/* Default Twitter Title */}
        <meta name="twitter:description" content={defaultDescription} /> {/* Default Twitter Description */}
        <meta name="twitter:image" content={defaultOgImage} />
        {/* <meta name="twitter:site" content="@YourTwitterHandle"> */}{/* Optional: Your Twitter handle */}

        {/* Structured Data Scripts */}
        <script type="application/ld+json">
          {JSON.stringify(organizationJsonLd, null, 2)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(websiteSearchJsonLd, null, 2)}
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
            <main className="pt-16 md:pt-16 min-h-screen">
              <Routes>
                {/*
                  Each of these page components (Home, ListProducts, etc.)
                  MUST use <Helmet> to set its own specific:
                  - title
                  - meta description
                  - canonical URL
                  - page-specific OG tags
                  - page-specific structured data (e.g., Product, Article)
                  See Step 6 for an example with Home.jsx
                */}
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<ListProducts />} />
                <Route path="/login" element={<Login />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/store" element={<Store />} />
                <Route path="/product/:id" element={<ProductDetailPage />} />

                <Route element={<ProtectedRoute />}>
                  <Route path="/order-confirmation/:orderId" element={<OrderConfirmationPage />} />
                  <Route path="/admin/orders" element={<AdminManageOrder />} />
                  <Route path="/cart" element={<MyOrdersPage />} />
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