import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';
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
  ShoppingCart,
  ChevronLeft,
  ChevronRight,
  Sparkles,
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
import logo from '../../../assets/Images/logo.png';
import twoone from '../../../assets/Images/twoone.png';
import twothree from '../../../assets/Images/twothree.png';
import twotwo from '../../../assets/Images/twotwo.png';
import twofour from '../../../assets/Images/twofour.png';
import twofive from '../../../assets/Images/twofive.png';
import twosix from '../../../assets/Images/twosix.png';
import calfshaktimini from '../../../assets/Images/calfshaktimini.jpg';
import sui from '../../../assets/Images/sui.png';
import three from '../../../assets/Images/three.png';
import tenn from '../../../assets/Images/tenn.png';
import wui from '../../../assets/Images/wui.jpg';
import icj from '../../../assets/Images/ict.jpg';

// Export productsData so it can be imported by ProductDetailPage.jsx
export const productsData = [
  // 1. Resolution kit - 549
  {
    id: 'resolution-kit',
    name: 'Resolution Kit',
    description: 'Complete resolution kit for veterinary care',
    longDescription: 'Our Resolution Kit offers a comprehensive solution for various veterinary care needs. It includes essential components to aid in quick diagnosis and effective treatment, ensuring animal well-being. Ideal for field veterinarians and clinics.',
    price: 549.00,
    imageUrl: twoone,
    imageFileName: 'resolution.png',
    gradientFrom: 'from-blue-100',
    gradientTo: 'to-blue-50',
    minQuantity: 1,
    rating: 4.7,
    reviewCount: 156,
    stock: 25, // Added stock
    features: ['Comprehensive care', 'Veterinary grade', 'Easy to use'], // Added features
  },

  // 2. Innolact Adj Super 5ut - 1490
  {
    id: 'innolact-adj-super-5ut',
    name: 'Innolact AD3',
    description: 'Advanced lactation supplement for dairy animals',
    longDescription: 'Innolact AD3 is an advanced lactation supplement specifically formulated for dairy animals. It enhances milk production, improves milk quality, and supports the overall health of lactating animals. Contains vital vitamins and minerals.',
    price: 1490.00,
    imageUrl: twotwo,
    imageFileName: 'nine.png',
    gradientFrom: 'from-purple-100',
    gradientTo: 'to-purple-50',
    minQuantity: 1,
    rating: 4.5,
    reviewCount: 89,
    stock: 30,
    features: ['Boosts milk yield', 'Enhances milk quality', 'Supports udder health'],
  },

  // 3. Innolact gold 5ut - 1350
  {
    id: 'innolact-gold-5ut',
    name: 'Innolact AD3 Gold',
    description: 'Premium gold formula for enhanced lactation',
    longDescription: 'Innolact AD3 Gold is our premium formula for superior lactation support. It includes chelated minerals and high-potency vitamins to maximize milk production and maintain animal health during peak lactation periods.',
    price: 1350.00,
    imageUrl: twothree,
    imageFileName: 'gold.png',
    gradientFrom: 'from-amber-100',
    gradientTo: 'to-amber-50',
    minQuantity: 1,
    rating: 4.8,
    reviewCount: 112,
    stock: 15,
    features: ['Premium formulation', 'Maximized milk production', 'With chelated minerals'],
  },

  // 4. Innolact sul - 800
  {
    id: 'innolact-Gel',
    name: 'Innolact Gel Advance',
    description: 'Sulfur-enhanced lactation supplement',
    longDescription: 'Innolact Gel Advance is a unique sulfur-enhanced supplement designed to support lactation and improve metabolic functions in dairy animals. The gel form ensures easy administration and quick absorption.',
    price: 800.00,
    imageUrl: twofive,
    imageFileName: 'sul.png',
    gradientFrom: 'from-yellow-100',
    gradientTo: 'to-yellow-50',
    minQuantity: 1,
    rating: 4.6,
    reviewCount: 78,
    stock: 22,
    features: ['Sulfur-enhanced', 'Easy gel administration', 'Supports metabolic health'],
  },

  // 5. Innolact gel Advance 500gm - 380
  {
    id: 'innolact-gel-advance-500',
    name: 'Innolact Gel Advance 500gm',
    description: 'Advanced gel formula for lactation support',
    longDescription: 'This 500gm pack of Innolact Gel Advance provides a convenient supply of our advanced gel formula for consistent lactation support. Ideal for managing multiple animals or for extended use.',
    price: 380.00,
    imageUrl: twofour,
    imageFileName: 'gel500.png',
    gradientFrom: 'from-teal-100',
    gradientTo: 'to-teal-50',
    minQuantity: 5,
    rating: 4.9,
    reviewCount: 135,
    stock: 40,
    features: ['Advanced gel formula', 'Cost-effective 500gm pack', 'Quick absorption'],
  },


  // 7. Innolact bolus 40 bolus - 449
  {
    id: 'innolact-bolus-40',
    name: 'Innolact Bolus 40 Bolus',
    description: 'Lactation support in convenient bolus form',
    longDescription: 'Innolact Bolus offers lactation support in a convenient and easy-to-administer bolus form. Each bolus is packed with essential nutrients to aid milk production and animal health. Pack of 40.',
    price: 449.00,
    imageUrl: twosix,
    imageFileName: 'bolus.png',
    gradientFrom: 'from-indigo-100',
    gradientTo: 'to-indigo-50',
    minQuantity: 1,
    rating: 4.6,
    reviewCount: 68,
    stock: 50,
    features: ['Convenient bolus form', 'Sustained release', 'Pack of 40'],
  },

  // 8. Calfshakti 1ut - 750
  {
    id: 'calfshakti', // Corrected ID: removed trailing space
    name: 'CalfShakti (1Ltr)',
    description: 'Enhanced nutrition for calves',
    longDescription: 'CalfShakti (1Ltr) provides enhanced nutrition crucial for the healthy growth and development of calves. It supports immune function and helps in achieving optimal weight gain.',
    price: 750.00,
    imageUrl: thirteen,
    imageFileName: 'thirteen.png',
    gradientFrom: 'from-sky-100',
    gradientTo: 'to-sky-50',
    minQuantity: 2,
    rating: 4.8,
    reviewCount: 105,
    stock: 18,
    features: ['Supports calf growth', 'Boosts immunity', '1 Liter pack'],
  },

  // 9. Calfshakti 500ml - 419
  {
    id: 'calfshakti-500ml',
    name: 'CalfShakti 500ml',
    description: 'Nutrition supplement for young calves',
    longDescription: 'The 500ml pack of CalfShakti offers a targeted nutrition supplement for young calves, promoting vitality and healthy development during their critical early stages.',
    price: 419.00,
    imageUrl: calfshaktimini,
    imageFileName: 'calf500.png',
    gradientFrom: 'from-cyan-100',
    gradientTo: 'to-cyan-50',
    minQuantity: 5,
    rating: 4.7,
    reviewCount: 87,
    stock: 25,
    features: ['For young calves', 'Promotes vitality', 'Convenient 500ml size'],
  },

  // 10. Badda H 1ut - 1650
  {
    id: 'badda-h-1ut',
    name: 'Badda H (1Ltr)',
    description: 'Supports urinary tract and digestive health in animals',
    longDescription: 'Badda H (1Ltr) is formulated to support and maintain urinary tract and digestive health in animals. It aids in preventing common issues and promotes overall systemic balance.',
    price: 1650.00,
    imageUrl: eight,
    imageFileName: 'eight.png',
    gradientFrom: 'from-indigo-100',
    gradientTo: 'to-indigo-50',
    minQuantity: 1,
    rating: 4.8,
    reviewCount: 112,
    stock: 12,
    features: ['Urinary tract support', 'Digestive health aid', 'Systemic balance'],
  },

  // 11. Racer kit - (price not specified)
  {
    id: 'racer-kit',
    name: 'Racer Kit',
    description: 'Performance enhancement kit for racing animals',
    longDescription: 'The Racer Kit is a specialized performance enhancement solution for racing animals. It is designed to optimize energy, stamina, and recovery for peak competitive performance. (Price on Request)',
    price: 0.00,
    imageUrl: sui,
    imageFileName: 'racer.png',
    gradientFrom: 'from-red-100',
    gradientTo: 'to-red-50',
    minQuantity: 1,
    rating: 4.9,
    reviewCount: 93,
    stock: 5,
    features: ['Performance enhancement', 'Optimizes energy & stamina', 'Supports recovery'],
  },

  // 12. Innoliv DS 1ut - 325
  {
    id: 'innoliv-ds-1ut',
    name: 'Innoliv DS (1Ltr)',
    description: 'Advanced liver support supplement for animal vitality',
    longDescription: 'Innoliv DS (1Ltr) is an advanced liver support supplement that promotes detoxification and enhances overall animal vitality. Essential for maintaining liver health and function.',
    price: 325.00,
    imageUrl: fourteen,
    imageFileName: 'fourteen.png',
    gradientFrom: 'from-teal-100',
    gradientTo: 'to-teal-50',
    minQuantity: 5,
    rating: 4.9,
    reviewCount: 135,
    stock: 35,
    features: ['Advanced liver support', 'Promotes detoxification', 'Enhances vitality'],
  },

  // 14. Urocoenta Advance - 380
  {
    id: 'urocoenta-advance',
    name: 'Urocoenta Advance',
    description: 'Advanced urinary health supplement',
    longDescription: 'Urocoenta Advance is a cutting-edge supplement for maintaining urinary health in animals. It helps prevent urinary issues and supports healthy kidney function.',
    price: 380.00,
    imageUrl: three,
    imageFileName: 'three.png',
    gradientFrom: 'from-blue-100',
    gradientTo: 'to-blue-50',
    minQuantity: 5,
    rating: 4.6,
    reviewCount: 95,
    stock: 28,
    features: ['Advanced urinary health', 'Supports kidney function', 'Preventative care'],
  },

  // 15. Glucodyna 1ut - 750
  {
    id: 'glucodyna-1ut',
    name: 'Glucodyna (1Ltr)',
    description: 'Energy and glucose supplement for animals',
    longDescription: 'Glucodyna (1Ltr) is a vital energy and glucose supplement for animals, particularly useful during periods of stress, recovery, or high energy demand. Helps maintain blood glucose levels.',
    price: 750.00,
    imageUrl: tenn,
    imageFileName: 'gluco.png',
    gradientFrom: 'from-pink-100',
    gradientTo: 'to-pink-50',
    minQuantity: 1,
    rating: 4.8,
    reviewCount: 110,
    stock: 10,
    features: ['Instant energy source', 'Maintains glucose levels', 'Aids recovery'],
  },

  // 16. R3 Vet Bolus - 250
  {
    id: 'r3-vet-bolus',
    name: 'R3 Vet Bolus',
    description: 'Premium veterinary supplement for animal health',
    longDescription: 'R3 Vet Bolus is a premium multi-purpose veterinary supplement designed to support overall animal health and well-being. Convenient bolus form for easy administration.',
    price: 250.00,
    imageUrl: R3,
    imageFileName: 'R3.png',
    gradientFrom: 'from-pink-100',
    gradientTo: 'to-pink-50',
    minQuantity: 10,
    rating: 4.7,
    reviewCount: 156,
    stock: 60,
    features: ['Premium supplement', 'Overall animal health', 'Convenient bolus'],
  },

  // 17. Innoworm XL 100ml - 150
  {
    id: 'innoworm-xl-100ml',
    name: 'Innoworm XL 100ml',
    description: 'Effective parasite control for healthier livestock',
    longDescription: 'Innoworm XL (100ml) provides effective and broad-spectrum parasite control for healthier livestock. Helps improve growth rates and overall animal productivity by managing worm infestations.',
    price: 150.00,
    imageUrl: fifteen,
    imageFileName: 'fifteen.png',
    gradientFrom: 'from-green-100',
    gradientTo: 'to-green-50',
    minQuantity: 10,
    rating: 4.7,
    reviewCount: 91,
    stock: 45,
    features: ['Broad-spectrum dewormer', 'For healthier livestock', '100ml pack'],
  },

  // 18. Innoworm 30ml - 45
  {
    id: 'innoworm-30ml',
    name: 'Innoworm 30ml',
    description: 'Nutritional supplement for healthy weight gain and growth',
    longDescription: 'Innoworm 30ml is a nutritional supplement formulated for healthy weight gain and growth in young or recovering animals. Its palatable formula ensures easy acceptance.',
    price: 45.00,
    imageUrl: sixteen,
    imageFileName: 'sixteen.png',
    gradientFrom: 'from-amber-100',
    gradientTo: 'to-amber-50',
    minQuantity: 30,
    rating: 4.6,
    reviewCount: 68,
    stock: 0, // Example out of stock
    features: ['Supports weight gain', 'Promotes growth', 'Palatable formula'],
  },

  // 19. Weight boost 3kg - 1250
  {
    id: 'weight-boost-3kg',
    name: 'Weight Boost 3kg',
    description: 'Weight gain supplement for livestock',
    longDescription: 'Weight Boost (3kg) is a high-calorie supplement designed to promote significant weight gain in livestock. Ideal for animals needing to build mass or recover condition.',
    price: 1250.00,
    imageUrl: wui,
    imageFileName: 'weight.png',
    gradientFrom: 'from-purple-100',
    gradientTo: 'to-purple-50',
    minQuantity: 1,
    rating: 4.9,
    reviewCount: 120,
    stock: 8,
    features: ['High-calorie formula', 'Promotes mass gain', '3kg economy pack'],
  },

  // 22. Makkhi Soap 75gm - 120
  {
    id: 'makkhi-soap-75gm',
    name: 'Makkhi Soap 75gm',
    description: 'Herbal insect repellent soap for animal hygiene and comfort',
    longDescription: 'Makkhi Soap (75gm) is a herbal insect repellent soap that ensures animal hygiene and comfort. It effectively repels flies and other ectoparasites while being gentle on the skin.',
    price: 120.00,
    imageUrl: seventeen,
    imageFileName: 'seventeen.png',
    gradientFrom: 'from-blue-100',
    gradientTo: 'to-blue-50',
    minQuantity: 20,
    rating: 4.8,
    reviewCount: 105,
    stock: 70,
    features: ['Herbal insect repellent', 'Gentle on skin', 'Promotes hygiene'],
  },

  // 23. Makkhi 15ml - 85.90
  {
    id: 'makkhi-15ml',
    name: 'Makkhi 15ml',
    description: 'Potent concentrated liquid formula for effective pest control',
    longDescription: 'Makkhi 15ml is a potent, concentrated liquid formula for effective control of flies and other pests. Its concentrated nature ensures efficacy even with small doses.',
    price: 85.90,
    imageUrl: eighteen,
    imageFileName: 'eighteen.png',
    gradientFrom: 'from-cyan-100',
    gradientTo: 'to-cyan-50',
    minQuantity: 10,
    rating: 4.7,
    reviewCount: 87,
    stock: 55,
    features: ['Potent concentrate', 'Effective pest control', 'Economical 15ml pack'],
  },

  // 24. Makkhi 6ml - 54.90
  {
    id: 'makkhi-6ml',
    name: 'Makkhi 6ml',
    description: 'Fast-acting liquid solution for pest control',
    longDescription: 'This Makkhi 6ml pack offers a fast-acting liquid solution for quick pest control. Ideal for spot treatments or smaller applications where immediate action is needed.',
    price: 54.90,
    imageUrl: nineteen,
    imageFileName: 'nineteen.png',
    gradientFrom: 'from-violet-100',
    gradientTo: 'to-violet-50',
    minQuantity: 30,
    rating: 4.9,
    reviewCount: 93,
    stock: 100,
    features: ['Fast-acting solution', 'Quick pest knockdown', 'Convenient 6ml size'],
  },

  // 25. Innocel Tag330 4.5gm - 415
  {
    id: 'innocel-tag330-4.5gm',
    name: 'Innocef Tazo 4.5gm',
    description: 'Advanced cellular supplement for animals',
    longDescription: 'Innocef Tazo 4.5gm is an advanced injectable antibiotic combination (Ceftriaxone & Tazobactam) for treating severe bacterial infections in animals. Provides broad-spectrum coverage.',
    price: 415.00,
    imageUrl: icj,
    imageFileName: 'innocel.png',
    gradientFrom: 'from-emerald-100',
    gradientTo: 'to-emerald-50',
    minQuantity: 10,
    rating: 4.8,
    reviewCount: 85,
    stock: 20,
    features: ['Injectable antibiotic', 'Ceftriaxone & Tazobactam', 'Treats severe infections'],
  }
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

function ProductCard({ id, name, description, price, imageUrl, gradientFrom = DEFAULT_GRADIENT_FROM, gradientTo = DEFAULT_GRADIENT_TO, minQuantity, rating, reviewCount }) {
  const navigate = useNavigate();

  const gradientClasses = `bg-gradient-to-br ${gradientFrom} ${gradientTo}`;

  const handleCardClick = () => navigate(`/product/${id}`);
  const imgSrc = typeof imageUrl === 'string' ? imageUrl : imageUrl?.src;

  return (
    <motion.div variants={itemVariants} className="h-full flex flex-col">
      <Card
        role="button"
        tabIndex={0}
        onClick={handleCardClick}
        onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && handleCardClick()}
        className={`group w-full overflow-hidden rounded-2xl border-none shadow-lg hover:shadow-2xl transition-all duration-300 ease-out flex flex-col cursor-pointer ${gradientClasses}`}
      >
        {/* MODIFIED: Image container with explicit responsive heights */}
        <div className="relative w-full h-[170px] sm:h-[200px] md:h-[220px] flex items-center justify-center p-2 sm:p-3 overflow-hidden">
          <motion.img
            src={imgSrc}
            alt={`${name} - Animal Health Product`}
            // MODIFIED: Image fills container, max-h removed, scale adjusted
            className="object-contain w-full h-full drop-shadow-xl transition-transform duration-300 ease-out group-hover:scale-105"
            loading="lazy"
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
          {typeof rating === 'number' && typeof reviewCount === 'number' && reviewCount > 0 && (
            <div className="flex items-center text-xs text-amber-600 mt-1">
              <Sparkles size={14} className="mr-1 fill-amber-400 text-amber-500" />
              {rating.toFixed(1)} ({reviewCount} reviews)
            </div>
          )}
          <div className="pt-1 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-1">
            <div>
              <p className="text-sm sm:text-base font-semibold text-slate-900">
                {price > 0 ? `₹${price.toFixed(2)}` : 'Price on Request'}
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
  const ogImageUrl = ogImageSrc
    ? `${domain}${ogImageSrc.startsWith('/') ? ogImageSrc : `/${ogImageSrc}`}`
    : `${domain}/default-logo.png`;

  const productsForSeo = productsData.map(product => {
    const imageFileName = product.imageFileName || 'default-product-image.png';
    let resolvedImageUrl;
    if (typeof product.imageUrl === 'string' && product.imageUrl.startsWith('http')) {
        resolvedImageUrl = product.imageUrl;
    } else {
        let tempPath = typeof product.imageUrl === 'string' ? product.imageUrl : (product.imageUrl?.src || `/assets/Images/${imageFileName}`);
        resolvedImageUrl = tempPath.startsWith('http') ? tempPath : `${domain}${tempPath.startsWith('/') ? tempPath : `/${tempPath}`}`;
    }

    return {
      ...product,
      resolvedImageUrl: resolvedImageUrl,
    };
  });

  const priceValidUntilDate = new Date();
  priceValidUntilDate.setFullYear(priceValidUntilDate.getFullYear() + 1);
  const priceValidUntilString = priceValidUntilDate.toISOString().split('T')[0];

  return (
    <HelmetProvider>
      <Helmet>
        <title>Animal Health Solutions | Innovation Remedies</title>
        <meta name="description" content="Discover top-tier veterinary products and supplements from Innovation Remedies. Serving Meerut & Delhi NCR for optimal animal health and performance."/>
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
        <meta name="geo.region" content="IN-UP" />
        <meta name="geo.placename" content="Meerut" />
        <meta name="geo.position" content="28.9803;77.7039" />
        <meta name="ICBM" content="28.9803, 77.7039" />

        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "WebPage",
              "name": "Animal Health Products Listing",
              "description": "Browse and discover Innovation Remedies' premium veterinary products for animal health, immunity, and wellness in Meerut, Delhi NCR.",
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
                "streetAddress": "Kila Parikshitgarh", "addressLocality": "Meerut",
                "addressRegion": "Uttar Pradesh", "postalCode": "250406", "addressCountry": "IN"
              },
              "telephone": "+91-9412702900",
              "email": "info@innovationremedies.com",
              "url": "${domain}",
              "image": "${ogImageUrl}",
              "priceRange": "₹₹",
              "sameAs": [
                "https://www.facebook.com/yourpage",
                "https://www.instagram.com/yourpage"
              ],
              "openingHours": "Mo-Su 09:00-18:00",
              "description": "Innovation Remedies provides advanced veterinary solutions for animal health, wellness, and activity across Meerut, Delhi NCR."
            }
          `}
        </script>

        {productsForSeo.map(product => {
          const productSchema = {
            "@context": "https://schema.org",
            "@type": "Product",
            "name": product.name.replace(/"/g, '\\"'),
            "description": product.description.replace(/"/g, '\\"'),
            "image": product.resolvedImageUrl,
            "sku": product.id,
            "mpn": product.id,
            "brand": {
              "@type": "Brand",
              "name": "Innovation Remedies"
            },
            "offers": {
              "@type": "Offer",
              "priceCurrency": "INR",
              "price": product.price.toFixed(2),
              "availability": product.stock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock", // Use stock info
              "url": `${domain}/product/${product.id}`,
              "seller": {
                "@type": "Organization",
                "name": "Innovation Remedies"
              },
              "priceValidUntil": priceValidUntilString,
              "hasMerchantReturnPolicy": {
                "@type": "MerchantReturnPolicy",
                "url": `${domain}/return-policy`,
                "returnPolicyCategory": "https://schema.org/MerchantReturnFiniteReturnWindow",
                "merchantReturnDays": 30,
                "returnMethod": "https://schema.org/ReturnByMail",
                "returnFees": "https://schema.org/FreeReturn"
              },
              "shippingDetails": {
                "@type": "OfferShippingDetails",
                "shippingRate": {
                  "@type": "MonetaryAmount",
                  "value": "50.00",
                  "currency": "INR"
                },
                "shippingDestination": {
                  "@type": "DefinedRegion",
                  "addressCountry": "IN"
                },
                "deliveryTime": {
                  "@type": "ShippingDeliveryTime",
                  "handlingTime": {
                    "@type": "QuantitativeValue",
                    "minValue": 0,
                    "maxValue": 1,
                    "unitCode": "DAY"
                  },
                  "transitTime": {
                    "@type": "QuantitativeValue",
                    "minValue": 3,
                    "maxValue": 7,
                    "unitCode": "DAY"
                  }
                }
              }
            }
          };

          if (product.rating && typeof product.rating === 'number' && product.reviewCount && typeof product.reviewCount === 'number' && product.reviewCount > 0) {
            productSchema.aggregateRating = {
              "@type": "AggregateRating",
              "ratingValue": product.rating.toFixed(1),
              "reviewCount": product.reviewCount
            };
          }

          return (
            <script key={product.id} type="application/ld+json">
              {JSON.stringify(productSchema, null, 2)}
            </script>
          );
        })}
      </Helmet>

      <div className="bg-slate-50 min-h-screen font-sans text-slate-800">
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
            // MODIFIED: Grid layout for responsive columns
            className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6 lg:grid-cols-4 lg:gap-8"
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
                At Innovation Remedies, we're committed to advancing animal health through scientifically-backed veterinary solutions. Our products are trusted by professionals in India .
              </p>
            </div>
          </section>
        </div>
      </div>
    </HelmetProvider>
  );
}

export default ListProducts;