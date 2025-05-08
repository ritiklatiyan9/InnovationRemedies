// src/App.jsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Toaster } from 'sonner';

// ... (all your other imports: AuthProvider, ProtectedRoute, page components, etc.)
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
import './fonts.css';


function App() {
  const [loading, setLoading] = useState(true);
  const [isChatOpen, setIsChatOpen] = useState(false);

  // ... (your preloader useEffect)
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
  }, []);


  // --- SEO & Structured Data ---
  const siteUrl = 'https://www.innovationremedies.com'; // ENSURE THIS IS YOUR HTTPS DOMAIN
  const siteName = "Innovation Remedies";
  const defaultDescription = "Innovation Remedies offers high-quality veterinary products and solutions for the health and wellbeing of all animals. Explore our range for better care.";
  const defaultOgImage = `${siteUrl}/logo.png`;

  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": siteName,
    "url": siteUrl,
    "logo": defaultOgImage,
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+91-YOUR-ACTUAL-PHONE", // REPLACE
      "contactType": "Customer Service",
      "areaServed": "IN",
      "availableLanguage": ["en", "hi"]
    },
    "sameAs": [ /* YOUR SOCIAL LINKS */ ], // REPLACE
    "description": defaultDescription
  };

  const websiteSearchJsonLd = { // For Sitelinks Search Box (optional, requires search page)
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": siteName,
    "url": siteUrl,
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${siteUrl}/search?q={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    }
  };

  // THIS IS KEY FOR INFLUENCING SITELINKS
  const mainNavLinksForSchema = [
    { name: 'Home', url: `${siteUrl}/` },
    { name: 'Our Products', url: `${siteUrl}/products` }, // Slightly more descriptive name for schema
    { name: 'Information Hub', url: `${siteUrl}/store` }, // Using 'store' route
    { name: 'About Innovation Remedies', url: `${siteUrl}/about` },
    { name: 'Contact Us', url: `${siteUrl}/contact` },
    // Add other top-level pages you'd want as potential sitelinks
    // e.g., { name: 'Careers', url: `${siteUrl}/careers` }, if you have such a page
  ];

  const siteNavigationJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Main Website Navigation", // Can be descriptive
    "description": `Key navigation links for ${siteName}.`, // Optional description
    "itemListElement": mainNavLinksForSchema.map((link, index) => ({
      "@type": "SiteNavigationElement", // This tells Google it's a navigation link
      "position": index + 1,
      "name": link.name, // The text that would appear for the sitelink
      "url": link.url    // The URL the sitelink would point to
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
        <meta name="keywords" content="veterinary, animal health, pet care, livestock, innovation remedies, animal wellness, veterinary medicine, animal supplements, Meerut, Delhi NCR" />
        {/* ... (other meta tags: OG, Twitter - ensure URLs are HTTPS) ... */}
        <meta property="og:url" content={siteUrl} />
        <meta property="og:image" content={defaultOgImage} />
        <meta name="twitter:image" content={defaultOgImage} />


        {/* Structured Data Scripts */}
        <script type="application/ld+json">
          {JSON.stringify(organizationJsonLd, null, 2)}
        </script>
        {/* Only include websiteSearchJsonLd if you have a working site search at /search?q= */}
        {/* <script type="application/ld+json">
          {JSON.stringify(websiteSearchJsonLd, null, 2)}
        </script> */}
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
            <Header /> {/* Header component contains the visual navigation */}
            <main className="pt-16 md:pt-16 min-h-screen">
              <Routes>
                {/* Ensure each of these components has its own <Helmet> for page-specific SEO */}
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<ListProducts />} />
                <Route path="/login" element={<Login />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/store" element={<Store />} /> {/* Your 'Information' page */}
                <Route path="/product/:id" element={<ProductDetailPage />} />

                <Route element={<ProtectedRoute />}>
                  {/* ... protected routes ... */}
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