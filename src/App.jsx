import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
import Preloader from './Pages/Component/Preloader/Preloader'; // Import the Preloader

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Force reloading of preloader when page is refreshed
    const handleBeforeUnload = () => {
      window.sessionStorage.setItem('isReloading', 'true');
    };
    
    window.addEventListener('beforeunload', handleBeforeUnload);
    
    const isReloading = window.sessionStorage.getItem('isReloading') === 'true';
    
    if (isReloading) {
      setLoading(true);
      window.sessionStorage.removeItem('isReloading');
    }
    
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);
  
  return (
    <>
      {loading && <Preloader setLoading={setLoading} />}
      
      <Router>
        {/* hook into every navigation */}
        <ScrollToTop />
        
        <Header />
        <main className="pt-16 min-h-screen">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<ListProducts />} />
            <Route path="/product/:id" element={<ProductDetailPage />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/store" element={<Store />} />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </Router>
    </>
  );
}

export default App;