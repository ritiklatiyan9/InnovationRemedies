// src/App.jsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Toaster } from 'sonner';

// Component imports
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

// Policy pages
import ReturnPolicy from './Pages/SinglePages/ReturnPolicy';
import ShippingPolicy from './Pages/SinglePages/ShippingPolicy';
// import CookieConsent from './Pages/SinglePages/Cookie';


import './fonts.css';

// Helper functions for SEO
function getPageDescription(url, siteUrl) {
  const descriptions = {
    [`${siteUrl}/`]: "Homepage for India's leading veterinary products supplier",
    [`${siteUrl}/products`]: "Browse our complete catalog of veterinary products and animal health solutions",
    [`${siteUrl}/store`]: "Access valuable resources and guides for animal health management",
    [`${siteUrl}/about`]: "Discover our mission, values, and commitment to animal wellness",
    [`${siteUrl}/contact`]: "Connect with our customer support team for product inquiries",
    [`${siteUrl}/return-policy`]: "Review our hassle-free return and refund policies",
    [`${siteUrl}/shipping-policy`]: "Learn about our pan-India shipping services",
    [`${siteUrl}/faqs`]: "Find answers to frequently asked questions about our products and services",
    [`${siteUrl}/privacy-policy`]: "Understanding our commitment to protecting your privacy",
    [`${siteUrl}/terms`]: "Terms and conditions for using our services"
  };
  return descriptions[url] || "";
}

function getPageImage(url, siteUrl, defaultOgImage) {
  const images = {
    [`${siteUrl}/`]: `${siteUrl}/images/home-banner.jpg`,
    [`${siteUrl}/products`]: `${siteUrl}/images/products-banner.jpg`,
    [`${siteUrl}/about`]: `${siteUrl}/images/about-banner.jpg`,
    [`${siteUrl}/contact`]: `${siteUrl}/images/contact-banner.jpg`,
    [`${siteUrl}/store`]: `${siteUrl}/images/store-banner.jpg`,
  };
  return images[url] || defaultOgImage;
}

// Breadcrumb Component
const BreadcrumbSchema = ({ items }) => {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  };
  
  return (
    <script type="application/ld+json">
      {JSON.stringify(breadcrumbJsonLd)}
    </script>
  );
};

// SEO Component for individual routes
const SEO = ({ title, description, path }) => {
  const location = useLocation();
  const siteUrl = 'https://www.innovationremedies.com';
  const fullUrl = `${siteUrl}${location.pathname}`;
  
  return (
    <Helmet>
      {title && <title>{title}</title>}
      {description && <meta name="description" content={description} />}
      <link rel="canonical" href={fullUrl} />
      <meta property="og:url" content={fullUrl} />
      {title && <meta property="og:title" content={title} />}
      {description && <meta property="og:description" content={description} />}
    </Helmet>
  );
};

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
  }, []);

  const siteUrl = 'https://www.innovationremedies.com';
  const siteName = "Innovation Remedies";
  const defaultDescription = `${siteName} is a leading provider of high-quality veterinary products and animal health solutions across India. Discover our innovative range for optimal animal wellness and care.`;
  const defaultOgImage = `${siteUrl}/logo.png`;

  // Enhanced organization schema with sitelinks
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": siteName,
    "alternateName": "Innovation Remedies Life Science Pvt. Ltd.",
    "url": siteUrl,
    "logo": defaultOgImage,
    "description": `Pioneering animal health, ${siteName} offers a comprehensive range of veterinary products and supplements to customers throughout India.`,
    "foundingDate": "2020",
    "founders": [
      {
        "@type": "Person",
        "name": "Founder Name" // Replace with actual founder name
      }
    ],
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
    ],
    "potentialAction": [
      {
        "@type": "ViewAction",
        "name": "View Products",
        "target": `${siteUrl}/products`
      },
      {
        "@type": "ContactAction",
        "name": "Contact Us",
        "target": `${siteUrl}/contact`
      },
      {
        "@type": "AboutAction",
        "name": "About Us",
        "target": `${siteUrl}/about`
      },
      {
        "@type": "ViewAction",
        "name": "Information Hub",
        "target": `${siteUrl}/store`
      }
    ]
  };

  const mainNavLinksForSchema = [
    { name: 'Home', url: `${siteUrl}/` },
    { name: 'Our Products', url: `${siteUrl}/products` },
    { name: 'Information Hub', url: `${siteUrl}/store` },
    { name: 'About Us', url: `${siteUrl}/about` },
    { name: 'Contact Us', url: `${siteUrl}/contact` },
    { name: 'Return Policy', url: `${siteUrl}/return-policy` },
    { name: 'Shipping Policy', url: `${siteUrl}/shipping-policy` },
    { name: 'FAQs', url: `${siteUrl}/faqs` },
  ];

  // Enhanced site navigation schema
  const siteNavigationJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Main Website Navigation",
    "description": `Key navigation links for ${siteName}, serving animal health needs across India.`,
    "itemListElement": mainNavLinksForSchema.map((link, index) => ({
      "@type": "SiteNavigationElement",
      "position": index + 1,
      "name": link.name,
      "description": getPageDescription(link.url, siteUrl),
      "url": link.url,
      "image": getPageImage(link.url, siteUrl, defaultOgImage)
    }))
  };

  // Enhanced website schema with explicit sitelinks
  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "url": siteUrl,
    "name": siteName,
    "alternateName": "Innovation Remedies - Veterinary Products India",
    "description": defaultDescription,
    "publisher": {
      "@type": "Organization",
      "name": siteName,
      "logo": {
        "@type": "ImageObject",
        "url": defaultOgImage
      }
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${siteUrl}/search?q={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    },
    "hasPart": [
      {
        "@type": "WebPage",
        "name": "Products",
        "url": `${siteUrl}/products`,
        "description": "Explore our comprehensive range of veterinary products"
      },
      {
        "@type": "WebPage",
        "name": "About Us",
        "url": `${siteUrl}/about`,
        "description": "Learn about Innovation Remedies"
      },
      {
        "@type": "WebPage",
        "name": "Contact",
        "url": `${siteUrl}/contact`,
        "description": "Get in touch with our expert team"
      },
      {
        "@type": "WebPage",
        "name": "Information Hub",
        "url": `${siteUrl}/store`,
        "description": "Animal health resources and guides"
      },
      {
        "@type": "WebPage",
        "name": "FAQs",
        "url": `${siteUrl}/faqs`,
        "description": "Frequently asked questions about our products"
      }
    ]
  };

  // LocalBusiness schema for better local SEO
  const localBusinessJsonLd = {
    "@context": "https://schema.org",
    "@type": "VeterinaryService",
    "name": siteName,
    "image": defaultOgImage,
    "url": siteUrl,
    "telephone": "+919057246900",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "638/101, Ganga Nagar",
      "addressLocality": "Meerut",
      "addressRegion": "Uttar Pradesh",
      "postalCode": "250001",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 28.9845,
      "longitude": 77.7064
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
      ],
      "opens": "09:00",
      "closes": "18:00"
    },
    "priceRange": "$$",
    "serviceType": "Veterinary Products and Supplies",
    "areaServed": {
      "@type": "Country",
      "name": "India"
    }
  };

  return (
    <HelmetProvider>
      <Helmet
        titleTemplate={`%s | ${siteName}`}
        defaultTitle={`${siteName} - Premium Veterinary Products & Animal Health Solutions India`}
      >
        <html lang="en-IN" />
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        
        <link rel="canonical" href={siteUrl} />
        
        {/* Primary Meta Tags */}
        <meta name="description" content={defaultDescription} />
        <meta name="keywords" content={`${siteName}, veterinary products India, animal health India, pet care India, livestock supplements India, animal wellness solutions, veterinary medicine online India, animal pharmaceuticals`} />
        <meta name="author" content={siteName} />
        
        {/* Robots meta tags */}
        <meta name="robots" content="index, follow" />
        <meta name="googlebot" content="index, follow" />
        
        {/* Open Graph Meta Tags */}
        <meta property="og:title" content={`${siteName} - Premium Veterinary Products & Animal Health Solutions India`} />
        <meta property="og:description" content={defaultDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={siteUrl} />
        <meta property="og:site_name" content={siteName} />
        <meta property="og:image" content={defaultOgImage} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:locale" content="en_IN" />

        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${siteName} - Premium Veterinary Products & Animal Health Solutions India`} />
        <meta name="twitter:description" content={defaultDescription} />
        <meta name="twitter:image" content={defaultOgImage} />
        <meta name="twitter:site" content="@innovationremedies" />

        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(organizationJsonLd, null, 2)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(siteNavigationJsonLd, null, 2)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(websiteJsonLd, null, 2)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(localBusinessJsonLd, null, 2)}
        </script>
      </Helmet>

      <AuthProvider>
        <Toaster position="top-right" richColors closeButton />
        {loading && <Preloader setLoading={setLoading} />}
        {!loading && (
          <Router>
            <ScrollToTop />
            <Header />
            <main className=" min-h-screen">
              <Routes>
                <Route 
                  path="/" 
                  element={
                    <>
                      <SEO 
                        title="Home - Premium Veterinary Products & Animal Health Solutions"
                        description="Innovation Remedies offers premium veterinary products, animal health supplements, and livestock care solutions across India. Quality assured animal wellness products."
                      />
                      <Home />
                    </>
                  } 
                />
                <Route 
                  path="/products" 
                  element={
                    <>
                      <SEO 
                        title="Products - Veterinary Medicines & Animal Supplements"
                        description="Explore our comprehensive range of veterinary products, animal health supplements, and livestock care solutions. Quality medicines for pets and farm animals."
                      />
                      <ListProducts />
                    </>
                  } 
                />
                <Route 
                  path="/login" 
                  element={<Login />} 
                />
                <Route 
                  path="/about" 
                  element={
                    <>
                      <SEO 
                        title="About Us - Leading Veterinary Products Company"
                        description="Learn about Innovation Remedies, a pioneering veterinary products company committed to animal health and wellness across India. Our mission, vision, and values."
                      />
                      <About />
                    </>
                  } 
                />
                <Route 
                  path="/contact" 
                  element={
                    <>
                      <SEO 
                        title="Contact Us - Get in Touch with Our Expert Team"
                        description="Contact Innovation Remedies for quality veterinary products and animal health solutions. Reach our expert support team for product inquiries and assistance."
                      />
                      <Contact />
                    </>
                  } 
                />
                <Route 
                  path="/store" 
                  element={
                    <>
                      <SEO 
                        title="Information Hub - Animal Health Resources & Guides"
                        description="Access valuable resources, guides, and information about animal health, veterinary care, and best practices for pet and livestock management."
                      />
                      <Store />
                    </>
                  } 
                />
                <Route 
                  path="/product/:id" 
                  element={<ProductDetailPage />} 
                />
                <Route 
                  path="/return-policy" 
                  element={
                    <>
                      <SEO 
                        title="Return Policy - Easy Returns & Refunds"
                        description="Read our return policy for veterinary products. Innovation Remedies ensures customer satisfaction with hassle-free returns and refunds on eligible products."
                      />
                      <ReturnPolicy />
                    </>
                  } 
                />
                <Route 
                  path="/shipping-policy" 
                  element={
                    <>
                      <SEO 
                        title="Shipping Policy - Pan-India Delivery"
                        description="Learn about our shipping policy. Innovation Remedies delivers veterinary products across India with fast, reliable, and secure shipping services."
                      />
                      <ShippingPolicy />
                    </>
                  } 
                />
            

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
               {/* <CookieConsent />  */}
          </Router>
        )}
      </AuthProvider>
    </HelmetProvider>
  );
}

export default App;