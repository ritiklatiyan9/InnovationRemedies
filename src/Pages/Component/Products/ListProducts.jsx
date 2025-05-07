import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button'; // Assuming Shadcn UI
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
  ShoppingCart,
  ChevronLeft,
  ChevronRight,
  Sparkles, // For a touch of "premium"
} from 'lucide-react';

// Image imports (ensure paths are correct)
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
import logo from '../../../assets/Images/logo.png';

const productsData = [
  { id: 'r3-vet-ultra-bonus', name: 'R3-Vet : Ultra Bonus (1 pcs)', description: 'Premium veterinary supplement for animal health.', price: 142.00, imageUrl: R3, imageFileName: 'R3.png', gradientFrom: 'from-pink-100', gradientTo: 'to-pink-50', minQuantity: 5 },
  { id: 'mood-pills', name: 'AYNGROW (1 pcs)', description: 'Vitamin boost for animal wellness and mood.', price: 142.00, imageUrl: nine, imageFileName: 'nine.png', gradientFrom: 'from-purple-100', gradientTo: 'to-purple-50', minQuantity: 10 },
  { id: 'uti-dont-think-so', name: 'Badda-H (1 pcs)', description: 'Supports urinary tract and digestive health in animals.', price: 142.00, imageUrl: eight, imageFileName: 'eight.png', gradientFrom: 'from-indigo-100', gradientTo: 'to-indigo-50', minQuantity: 5 },
  { id: 'bye-bye-bloat', name: 'CalfShakti Advanced (1 pcs)', description: 'Enhances muscle development and reduces bloat in calves.', price: 412.00, imageUrl: thirteen, imageFileName: 'thirteen.png', gradientFrom: 'from-sky-100', gradientTo: 'to-sky-50', minQuantity: 10 },
  { id: 'good-girl-probiotic', name: 'IRL Innoliv-DS (1 pcs)', description: 'Advanced liver support supplement for animal vitality.', price: 412.00, imageUrl: fourteen, imageFileName: 'fourteen.png', gradientFrom: 'from-teal-100', gradientTo: 'to-teal-50', minQuantity: 5 },
  { id: 'perfect-condition-vitamin', name: 'IRL Innoworm-XL (1 pcs)', description: 'Effective parasite control for healthier livestock.', price: 412.00, imageUrl: fifteen, imageFileName: 'fifteen.png', gradientFrom: 'from-green-100', gradientTo: 'to-green-50', minQuantity: 10 },
  { id: 'weight-booster', name: 'IRL Innoworm Suspension', description: 'Nutritional supplement for healthy weight gain and growth.', price: 314.95, imageUrl: sixteen, imageFileName: 'sixteen.png', gradientFrom: 'from-amber-100', gradientTo: 'to-amber-50', minQuantity: 5 },
  { id: 'makkhi-soap', name: 'IRL Makkhi Soap', description: 'Herbal insect repellent soap for animal hygiene and comfort.', price: 719.95, imageUrl: seventeen, imageFileName: 'seventeen.png', gradientFrom: 'from-blue-100', gradientTo: 'to-blue-50', minQuantity: 10 },
  { id: 'makkhi-liquid', name: 'Makkhi Concentrated Liquid', description: 'Potent concentrated liquid formula for effective pest control.', price: 719.95, imageUrl: eighteen, imageFileName: 'eighteen.png', gradientFrom: 'from-cyan-100', gradientTo: 'to-cyan-50', minQuantity: 5 },
  { id: 'makkhi-injection', name: 'Makkhi Injection', description: 'Fast-acting injectable solution for comprehensive parasite control.', price: 179.95, imageUrl: nineteen, imageFileName: 'nineteen.png', gradientFrom: 'from-violet-100', gradientTo: 'to-violet-50', minQuantity: 10 },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.07, delayChildren: 0.2 } },
};

const itemVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 80, damping: 12 } },
};

const DEFAULT_GRADIENT_FROM = 'from-slate-100';
const DEFAULT_GRADIENT_TO = 'to-slate-50';

function ProductCard({ id, name, description, price, imageUrl, gradientFrom = DEFAULT_GRADIENT_FROM, gradientTo = DEFAULT_GRADIENT_TO, minQuantity }) {
  const navigate = useNavigate();
  
  const gradientClasses = `bg-gradient-to-br ${gradientFrom} ${gradientTo}`;
  
  const handleCardClick = () => navigate(`/product/${id}`);
  const imgSrc = typeof imageUrl === 'string' ? imageUrl : imageUrl.src;

  return (
    <motion.div variants={itemVariants} className="h-full flex flex-col">
      <Card
        role="button"
        tabIndex={0}
        onClick={handleCardClick}
        onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && handleCardClick()}
        className={`group w-full overflow-hidden rounded-2xl border-none shadow-lg hover:shadow-2xl transition-all duration-300 ease-out flex flex-col cursor-pointer ${gradientClasses}`}
      >
        <div className="relative aspect-square flex items-center justify-center p-4 sm:p-6 overflow-hidden">
          <motion.img
            src={imgSrc}
            alt={`${name} - Animal Health Product`}
            className="object-contain w-full h-full max-h-[180px] sm:max-h-[220px] drop-shadow-xl transition-transform duration-300 ease-out group-hover:scale-110"
            loading="lazy"
            // layoutId={`product-image-${id}`} // For shared element transitions
          />
        </div>
        <CardContent className="p-5 pt-3 bg-white/70 backdrop-blur-sm rounded-b-2xl flex flex-col flex-grow text-left space-y-2.5">
          <h3 className="text-md sm:text-lg font-bold text-slate-800 leading-tight group-hover:text-sky-600 transition-colors" title={name}>
            {name}
          </h3>
          {description && (
            <p className="text-xs sm:text-sm text-slate-600 line-clamp-2 min-h-[40px]">
              {description}
            </p>
          )}
          <div className="pt-1 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-1">
            <div>
              <p className="text-sm sm:text-base font-semibold text-slate-900">
                ₹{price.toFixed(2)}
              </p>
              <p className="text-xs text-slate-500 mt-0.5">
                Min. {minQuantity} units
              </p>
            </div>
            <Button
              onClick={e => { e.stopPropagation(); handleCardClick(); }}
              variant="default"
              size="sm"
              className="w-full sm:w-auto mt-2 sm:mt-0 rounded-lg text-xs sm:text-sm bg-sky-500 hover:bg-sky-600 text-white shadow-md hover:shadow-lg transition-all duration-200"
            >
              <ShoppingCart size={16} className="mr-1.5" />
              Details
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

function ListProducts() {
  const domain = "https://www.innovationremedies.com";
  const canonicalUrl = `${domain}/products`;
  
  const ogImageSrc = typeof logo === 'string' ? logo : (logo && logo.src);
  const ogImageUrl = ogImageSrc ? `${domain}${ogImageSrc.startsWith('/') ? '' : '/'}${ogImageSrc}` : `${domain}/placeholder-logo.png`;

  const productsForSeo = productsData.map(product => ({
    ...product,
    resolvedImageUrl: `${domain}/assets/Images/${product.imageFileName}`, // Adjust if your asset path differs
  }));

  return (
    <div className="bg-slate-50 min-h-screen font-sans text-slate-800">
      <Helmet>
        <title>Animal Health Solutions | Innovation Remedies</title>
        <meta name="description" content="Discover top-tier veterinary products and supplements from Innovation Remedies. Serving Meerut & Delhi NCR for optimal animal health and performance."/>
        {/* ... other meta tags from previous version ... */}
        <link rel="canonical" href={canonicalUrl} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Animal Health Solutions | Innovation Remedies" />
        <meta property="og:description" content="Discover top-tier veterinary products and supplements from Innovation Remedies. Serving Meerut & Delhi NCR for optimal animal health and performance." />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content={ogImageUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Innovation Remedies" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Animal Health Solutions | Innovation Remedies" />
        <meta name="twitter:description" content="Discover top-tier veterinary products and supplements from Innovation Remedies. Serving Meerut & Delhi NCR for optimal animal health and performance." />
        <meta name="twitter:image" content={ogImageUrl} />
        <meta name="twitter:site" content="@YourTwitterHandle" />
        <meta name="geo.region" content="IN-UP" />
        <meta name="geo.placename" content="Meerut" />
        <meta name="geo.position" content="28.9803;77.7039" />
        <meta name="ICBM" content="28.9803, 77.7039" />
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "WebPage",
              "name": "Animal Health Products",
              "description": "Innovation Remedies offers premium veterinary products for animal health, immunity, and wellness in Meerut, Delhi NCR.",
              "url": "${canonicalUrl}",
              "breadcrumb": {
                "@type": "BreadcrumbList",
                "itemListElement": [
                  { "@type": "ListItem", "position": 1, "name": "Home", "item": "${domain}" },
                  { "@type": "ListItem", "position": 2, "name": "Products", "item": "${canonicalUrl}" }
                ]
              }
            }
          `}
        </script>
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "name": "Innovation Remedies",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "123 Health Lane", "addressLocality": "Meerut",
                "addressRegion": "Uttar Pradesh", "postalCode": "250001", "addressCountry": "IN"
              },
              "telephone": "+91-1234567890",
              "email": "info@innovationremedies.com",
              "url": "${domain}",
              "image": "${ogImageUrl}",
              "sameAs": ["https://www.facebook.com/yourpage", "https://www.instagram.com/yourpage"],
              "openingHours": "Mo-Su 09:00-18:00",
              "description": "Innovation Remedies provides advanced veterinary solutions for animal health, wellness, and activity across Meerut, Delhi NCR."
            }
          `}
        </script>
        {productsForSeo.map(product => (
          <script key={product.id} type="application/ld+json">
            {`
              {
                "@context": "https://schema.org",
                "@type": "Product",
                "name": "${product.name.replace(/"/g, '\\"')}",
                "description": "${product.description.replace(/"/g, '\\"')}",
                "image": "${product.resolvedImageUrl}",
                "sku": "${product.id}",
                "mpn": "${product.id}",
                "brand": { "@type": "Brand", "name": "Innovation Remedies" },
                "offers": {
                  "@type": "Offer",
                  "priceCurrency": "INR",
                  "price": "${product.price.toFixed(2)}",
                  "availability": "https://schema.org/InStock",
                  "url": "${domain}/product/${product.id}",
                  "seller": { "@type": "Organization", "name": "Innovation Remedies" }
                }
              }
            `}
          </script>
        ))}
      </Helmet>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
       

        <div className="sticky top-0 z-10 py-4 bg-slate-50/80 backdrop-blur-md mb-8 rounded-xl shadow-sm">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 px-4">
            <div className="flex flex-wrap gap-2 items-center">
              <Button variant="outline" size="sm" className="rounded-full text-xs sm:text-sm border-slate-300 text-slate-700 hover:bg-slate-100 hover:border-slate-400">
                <Vegan className="mr-1.5 h-4 w-4 text-green-500" /> Vegan
              </Button>
              <Button variant="outline" size="sm" className="rounded-full text-xs sm:text-sm border-slate-300 text-slate-700 hover:bg-slate-100 hover:border-slate-400">
                <Flower2 className="mr-1.5 h-4 w-4 text-pink-500" /> Organic
              </Button>
              <Button variant="outline" size="icon" className="rounded-full h-9 w-9 border-slate-300 text-slate-700 hover:bg-slate-100 hover:border-slate-400">
                <Filter className="h-4 w-4" /><span className="sr-only">Filters</span>
              </Button>
            </div>
            <div className="w-full sm:w-auto sm:min-w-[180px]">
              <Select defaultValue="relevance">
                <SelectTrigger className="w-full rounded-lg h-10 text-xs sm:text-sm border-slate-300 text-slate-700 focus:ring-sky-500 focus:border-sky-500">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="relevance" className="text-xs sm:text-sm">Relevance</SelectItem>
                  <SelectItem value="price-asc" className="text-xs sm:text-sm">Price: Low to High</SelectItem>
                  <SelectItem value="price-desc" className="text-xs sm:text-sm">Price: High to Low</SelectItem>
                  <SelectItem value="name-asc" className="text-xs sm:text-sm">Name: A–Z</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {productsData.map(p => (
            <ProductCard key={p.id} {...p} />
          ))}
        </motion.div>

        <div className="flex justify-center mt-12 sm:mt-16 space-x-3">
          <Button variant="outline" size="default" className="rounded-lg text-slate-700 border-slate-300 hover:border-slate-400 hover:bg-slate-100 px-6">
            <ChevronLeft className="mr-2 h-4 w-4" /> Prev
          </Button>
          <Button variant="default" size="default" className="rounded-lg bg-sky-500 hover:bg-sky-600 text-white shadow-md hover:shadow-lg px-6">
            Next <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>

        <section className="mt-20 sm:mt-28 border-t border-slate-200 pt-12 sm:pt-16">
          <div className="max-w-3xl mx-auto text-center">
            <Sparkles className="mx-auto h-12 w-12 text-amber-400 mb-4" />
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight mb-6">
              Dedicated to Animal Wellness
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed">
              At Innovation Remedies, we're committed to advancing animal health through scientifically-backed veterinary solutions. Our products are trusted by professionals in Meerut, Delhi NCR, and beyond.
            </p>
            <Button size="lg" className="mt-8 bg-green-500 hover:bg-green-600 text-white rounded-lg shadow-lg">
              Learn More About Us
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
}

export default ListProducts;