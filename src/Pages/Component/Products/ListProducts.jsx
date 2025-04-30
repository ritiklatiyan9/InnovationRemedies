import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async'; // Import Helmet for SEO
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Filter,
  Vegan,
  Flower2,
  ShoppingCart
} from 'lucide-react';

import R3 from '../../../assets/Images/R3.png';
import nine from '../../../assets/Images/nine.png';
import eight from '../../../assets/Images/eight.png';
import thirteen from '../../../assets/Images/thirteen.png';
import fourteen from '../../../assets/Images/fourteen.png';
import fifteen from '../../../assets/Images/fifteen.png';
import sixteen from '../../../assets/Images/sixteen.png';
import seventeen from '../../../assets/Images/seventeen.png';
import eighteen from '../../../assets/Images/eighteen.png';
import nineteen from '../../../assets/Images/nineteen.png';
import logo from '../../../assets/Images/logo.png'; // Ensure this is hosted publicly

// Make sure to use the same product data in both files
const products = [
  { id: 'r3-vet-ultra-bonus',       name: 'R3-Vet : Ultra Bonus (1 pcs)',      description: 'Premium veterinary supplement for animal health', price: 142.00, imageUrl: R3,      gradientFrom: '#FFE0E6' },
  { id: 'mood-pills',               name: 'AYNGROW (1 pcs)',                 description: 'Vitamin boost for animal wellness', price: 142.00, imageUrl: nine,    gradientFrom: '#F8E0FF' },
  { id: 'uti-dont-think-so',        name: 'Badda-H (1 pcs)',                 description: 'Supports digestive health in animals', price: 142.00, imageUrl: eight,   gradientFrom: '#E6E6FA' },
  { id: 'bye-bye-bloat',            name: 'CalfShakti Advanced (1 pcs)',     description: 'Enhances muscle development in calves', price: 412.00, imageUrl: thirteen,gradientFrom: '#E0F2FF' },
  { id: 'good-girl-probiotic',      name: 'IRL Innoliv-DS (1 pcs)',         description: 'Liver support supplement for animals', price: 412.00, imageUrl: fourteen,gradientFrom: '#D9F7F0' },
  { id: 'perfect-condition-vitamin',name: 'IRL Innoworm-XL (1 pcs)',        description: 'Parasite control for livestock', price: 412.00, imageUrl: fifteen, gradientFrom: '#E0F8E0' },
  { id: 'weight-booster',           name: 'IRL Innoworm Suspension',        description: 'Nutritional supplement for healthy weight gain', price: 314.95, imageUrl: sixteen,gradientFrom: '#FFF0E0' },
  { id: 'makkhi-soap',              name: 'IRL Makkhi Soap',                description: 'Insect repellent soap for animal hygiene', price: 719.95, imageUrl: seventeen,gradientFrom: '#E0EFFF' },
  { id: 'makkhi-liquid',            name: 'Makkhi Concentrated Liquid',     description: 'Concentrated liquid formula for pest control', price: 719.95, imageUrl: eighteen,gradientFrom: '#E0EFFF' },
  { id: 'makkhi-injection',         name: 'Makkhi Injection',               description: 'Injectable solution for parasite control', price: 179.95, imageUrl: nineteen,gradientFrom: '#E0EFFF' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
};
const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0,  opacity: 1, transition: { type: 'spring', stiffness: 100 } },
};

const DEFAULT_GRADIENT_FROM = '#f0f4f7';

function ProductCard({ id, name, description, price, imageUrl, gradientFrom = DEFAULT_GRADIENT_FROM }) {
  const navigate = useNavigate();
  const gradientStyle = {
    backgroundImage: `linear-gradient(to bottom, ${gradientFrom}, #F8F9FA)`,
  };
  
  // Navigate to the product details page with the correct id
  const handleCardClick = () => navigate(`/product/${id}`);

  return (
    <Card
      role="button"
      tabIndex={0}
      onClick={handleCardClick}
      onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && handleCardClick()}
      className="group w-full overflow-hidden rounded-lg border border-neutral-200 shadow-sm transition-shadow hover:shadow-md flex flex-col h-[350px] cursor-pointer"
      style={gradientStyle}
    >
      <div className="relative aspect-[4/4] md:aspect-[3/4] flex items-center justify-center p-4 sm:p-6 rounded-t-lg overflow-hidden">
        <img
          src={imageUrl}
          alt={`${name} - Animal Health Product`}
          className="object-contain w-full h-full max-h-[200px] sm:max-h-[240px] drop-shadow-md transition-transform duration-300 ease-out group-hover:scale-105"
          loading="lazy"
        />
      </div>
      <CardContent className="p-4 flex flex-col flex-grow text-left space-y-2">
        <h3 className="text-base font-semibold text-gray-800 leading-snug truncate" title={name}>
          {name}
        </h3>
        {description && (
          <p className="text-xs text-gray-500 line-clamp-2 flex-grow min-h-[2.5em]">
            {description}
          </p>
        )}
        <Button
          onClick={e => { e.stopPropagation(); handleCardClick(); }}
          variant="default"
          size="sm"
          className="w-full mt-auto bg-white hover:bg-gray-100 text-gray-800 border border-gray-300 shadow-sm"
        >
          <ShoppingCart size={16} className="mr-2" />
          Go to Details
        </Button>
      </CardContent>
    </Card>
  );
}

function ListProducts() {
  const domain = "https://www.innovationremedies.com"; // Update with your actual domain
  const canonicalUrl = `${domain}/products`;
  const ogImageUrl = `${domain}${logo}`;

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 font-sans">

      {/* SEO Meta Tags */}
      <Helmet>
        {/* 🔍 SEO Basics */}
        <title>Animal Health Products | Innovation Remedies in Meerut, Delhi NCR</title>
        <meta
          name="description"
          content="Explore premium veterinary products by Innovation Remedies. Trusted animal health supplements in Meerut, Delhi NCR - Boost wellness, immunity & activity."
        />
        <meta
          name="keywords"
          content="animal health products Meerut, veterinary care Delhi NCR, livestock supplements, cattle health solutions, pet wellness products, animal immunity boosters"
        />

        {/* 🔗 Canonical URL */}
        <link rel="canonical" href={canonicalUrl} />

        {/* 📱 Mobile Optimization */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="robots" content="index, follow" />

        {/* 🌐 Open Graph (Social Media) */}
        <meta property="og:title" content="Animal Health Products | Innovation Remedies" />
        <meta property="og:description" content="Discover premium veterinary products for animal health, immunity, and wellness in Meerut, Delhi NCR." />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content={ogImageUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Innovation Remedies" />

        {/* 🐦 Twitter Cards */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Animal Health Products | Innovation Remedies" />
        <meta name="twitter:description" content="Discover premium veterinary products for animal health, immunity, and wellness in Meerut, Delhi NCR." />
        <meta name="twitter:image" content={ogImageUrl} />
        <meta name="twitter:site" content="@innovationremedies" />

        {/* 📍 Geolocation Targeting */}
        <meta name="geo.region" content="IN-UP" /> {/* Uttar Pradesh */}
        <meta name="geo.placename" content="Meerut" />
        <meta name="geo.position" content="28.9803;77.7039" /> {/* Coordinates for Meerut */}
        <meta name="ICBM" content="28.9803, 77.7039" />

        {/* 🧠 Schema Markup (Product & LocalBusiness) */}
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "WebPage",
              "name": "Animal Health Products",
              "description": "Innovation Remedies offers premium veterinary products for animal health, immunity, and wellness in Meerut, Delhi NCR.",
              "breadcrumb": {
                "@type": "BreadcrumbList",
                "itemListElement": [
                  {
                    "@type": "ListItem",
                    "position": 1,
                    "name": "Home",
                    "item": "${domain}"
                  },
                  {
                    "@type": "ListItem",
                    "position": 2,
                    "name": "Products",
                    "item": "${canonicalUrl}"
                  }
                ]
              }
            }
          `}
        </script>

        {/* 🧠 Schema Markup (LocalBusiness) */}
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "name": "Innovation Remedies",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "123 Health Lane",
                "addressLocality": "Meerut",
                "addressRegion": "Uttar Pradesh",
                "postalCode": "250001",
                "addressCountry": "IN"
              },
              "telephone": "+91-1234567890",
              "email": "info@innovationremedies.com",
              "url": "${domain}",
              "sameAs": [
                "https://www.facebook.com/innovationremedies",
                "https://www.instagram.com/innovationremedies"
              ],
              "openingHours": "Mo-Su 09:00-18:00",
              "description": "Innovation Remedies provides advanced veterinary solutions for animal health, wellness, and activity across Meerut, Delhi NCR."
            }
          `}
        </script>

        {/* 🧠 Schema Markup for Products */}
        {products.map(product => (
          <script key={product.id} type="application/ld+json">
            {`
              {
                "@context": "https://schema.org",
                "@type": "Product",
                "name": "${product.name}",
                "description": "${product.description}",
                "image": "${domain}${product.imageUrl}",
                "offers": {
                  "@type": "Offer",
                  "priceCurrency": "INR",
                  "price": ${product.price},
                  "availability": "https://schema.org/InStock"
                }
              }
            `}
          </script>
        ))}
      </Helmet>

      {/* Filters & Sort */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8 space-y-4 sm:space-y-0">
        <div className="flex flex-wrap gap-2 mt-6 justify-center sm:justify-start items-center">
          <Button variant="outline" size="sm" className="text-xs h-8 border-gray-200 text-gray-600 hover:bg-gray-50">
            <Vegan className="mr-1.5 h-3 w-3" /> VEGANS COLLECTION
          </Button>
          <Button variant="outline" size="sm" className="text-xs h-8 border-gray-200 text-gray-600 hover:bg-gray-50">
            <Flower2 className="mr-1.5 h-3 w-3" /> FLORAL COLLECTION
          </Button>
          <Button variant="outline" size="icon" className="h-8 w-8 border-gray-200 text-gray-600 hover:bg-gray-50">
            <Filter className="h-3.5 w-3.5" /><span className="sr-only">Filters</span>
          </Button>
        </div>
        <div className="w-full sm:w-auto">
          <Select defaultValue="relevance">
            <SelectTrigger className="w-full sm:w-[180px] h-9 text-xs border-gray-300 focus:ring-0 text-gray-600">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="relevance" className="text-xs">Relevance</SelectItem>
              <SelectItem value="price-asc" className="text-xs">Price: Low to High</SelectItem>
              <SelectItem value="price-desc" className="text-xs">Price: High to Low</SelectItem>
              <SelectItem value="name-asc" className="text-xs">Name: A–Z</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Product Grid */}
      <motion.div
        className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {products.map(p => (
          <motion.div key={p.id} variants={itemVariants} className="flex">
            <ProductCard {...p} />
          </motion.div>
        ))}
      </motion.div>

      {/* Pagination */}
      <div className="flex justify-end mt-12 space-x-2">
        <Button variant="outline" size="sm" className="text-xs h-8 border-gray-300 text-gray-500 hover:bg-gray-50 rounded-md">
          Previous
        </Button>
        <Button variant="outline" size="sm" className="text-xs h-8 border-gray-300 text-gray-500 hover:bg-gray-50 rounded-md">
          Next
        </Button>
      </div>

      {/* 👇 Local SEO Content Block */}
      <section className="mt-16 border-t pt-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Animal Health Products in Meerut & Delhi NCR</h2>
        <p className="text-gray-700 mb-4">
          Innovation Remedies is your trusted supplier of premium veterinary products in Meerut and Delhi NCR. We offer a wide range of animal health supplements designed to enhance immunity, wellness, and performance for livestock, pets, and working animals.
        </p>
        <p className="text-gray-700">
          From <strong>CalfShakti Advanced</strong> for muscle development to <strong>Makkhi Injection</strong> for parasite control, our products are formulated to meet the highest standards of quality and effectiveness. Serving farmers, veterinarians, and pet owners across Uttar Pradesh and National Capital Region.
        </p>
      </section>
    </div>
  );
}

export default ListProducts;