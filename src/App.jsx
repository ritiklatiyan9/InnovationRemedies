import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Pages/Component/Header/Header';
import ProductDetailPage from './Pages/Component/Products/ProductsDetails';
import Home from './Pages/Component/Home/Home';
import NotFound from './Pages/SinglePages/NotFound';
import Footer from './Pages/Component/Footer/Footer';
import ListProducts from './Pages/Component/Products/ListProducts'
import Contact from './Pages/SinglePages/Contact';

function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        {/* Add padding-top to prevent content from being hidden under fixed header */}
        <main className="pt-16 min-h-screen">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/products" element={<ListProducts />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/product/:productId" element={<ProductDetailPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;