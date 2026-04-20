import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useInView,
  useReducedMotion,
  LayoutGroup,
} from 'framer-motion';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  ChevronLeft,
  ChevronRight,
  Clock,
  ArrowUpRight,
  ArrowDown,
  Star,
} from 'lucide-react';

/* --------------------------- Font + motion tokens ------------------------- */
const BRAND = {
  fontFamily: "Moonhouse, 'Neue Montreal Regular', sans-serif",
};
const DISPLAY = {
  fontFamily:
    "'Neue Montreal Regular', 'SF Pro Text Semibold', 'Inter', system-ui, sans-serif",
  fontWeight: 600,
};
const BODY = {
  fontFamily:
    "'Neue Montreal Regular', 'SF Pro Text Regular', system-ui, sans-serif",
};
const MONO = {
  fontFamily: "'SF Pro Text Regular', ui-monospace, monospace",
  letterSpacing: '0.2em',
};
const EASE_OUT = [0.22, 1, 0.36, 1];

/* ------------------------------- LazyImage ------------------------------- */
// Optimized image: uses IntersectionObserver via rootMargin for pre-buffering,
// colored placeholder shimmers until load, fades in smoothly.
function LazyImage({ src, alt, className = '', placeholder = '#f1f5f9' }) {
  const imgRef = useRef(null);
  const [loaded, setLoaded] = useState(false);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = imgRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
            observer.disconnect();
          }
        });
      },
      { rootMargin: '200px 0px' } // start loading 200px before entering viewport
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={imgRef}
      className="relative w-full h-full"
      style={{ backgroundColor: placeholder }}
    >
      {!loaded && (
        <motion.div
          aria-hidden
          className="absolute inset-0"
          style={{ backgroundColor: placeholder }}
          animate={{ opacity: [0.6, 0.95, 0.6] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
        />
      )}
      {inView && (
        <motion.img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          onLoad={() => setLoaded(true)}
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: loaded ? 1 : 0, scale: loaded ? 1 : 1.04 }}
          transition={{ duration: 0.6, ease: EASE_OUT }}
          className={className}
          style={{ willChange: 'transform, opacity' }}
        />
      )}
    </div>
  );
}

/* ------------------------- Gradient → accent helper ---------------------- */
// Maps Tailwind gradient class to a hex-ish accent for per-product theming.
const GRADIENT_TO_ACCENT = {
  'from-blue-100': '#dbeafe',
  'from-sky-100': '#e0f2fe',
  'from-emerald-100': '#d1fae5',
  'from-amber-100': '#fef3c7',
  'from-rose-100': '#ffe4e6',
  'from-violet-100': '#ede9fe',
  'from-pink-100': '#fce7f3',
  'from-green-100': '#dcfce7',
  'from-orange-100': '#ffedd5',
  'from-teal-100': '#ccfbf1',
  'from-indigo-100': '#e0e7ff',
  'from-slate-100': '#f1f5f9',
  'from-cyan-100': '#cffafe',
  'from-yellow-100': '#fef9c3',
  'from-red-100': '#fee2e2',
  'from-lime-100': '#ecfccb',
  'from-fuchsia-100': '#fae8ff',
};
function accentForGradient(g) {
  return GRADIENT_TO_ACCENT[g] || '#f1f5f9';
}

// Import all images (assuming these paths are correct)
import R3 from '../../../assets/Images/R3.png';
import reskit from '../../../assets/Images/newresolutionkit.png';
import twentyone from '../../../assets/Images/twentyone.png';
import nine from '../../../assets/Images/nine.png';
import innoceftazo from '../../../assets/Images/innocaeftazo.png';
import eight from '../../../assets/Images/eight.png';
import thirteen from '../../../assets/Images/thirteen.png';
import innolactbolus from '../../../assets/Images/innolactbolus.png';
import fourteen from '../../../assets/Images/fourteen.png';
import fifteen from '../../../assets/Images/fifteen.png';
import calfshaktiml  from '../../../assets/Images/calfshaktiml.png';
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
import advcalf from '../../../assets/Images/advcalf.png';
import ui from '../../../assets/Images/ui.png';
import fiveltr from '../../../assets/Images/fiveltr.png';
import racer from '../../../assets/Images/new/racer.png'
import gly from '../../../assets/Video/gly.png';
import wui from '../../../assets/Images/wui.png';
import innolactnew from '../../../assets/Images/new/innolactnew.png';
import fourtybolus from '../../../assets/Images/fourtybolus.png';
import tryu from '../../../assets/Images/tryu.png';
import icj from '../../../assets/Images/ict.jpg';
import innolactten from '../../../assets/Images/new/innolactten.png';
import innolacttwenty from '../../../assets/Images/new/innolacttwenty.png';
import innolact from '../../../assets/Images/new/innolact.png';
import innolactfive from '../../../assets/Images/new/innolactfive.png';
import innolactwhite from '../../../assets/Images/new/innolactwhite.png';
import whitebox from '../../../assets/Images/new/whitebox.png'


// Original productsData (IDs should ideally be unique for all entries)
export const productsData = [
  // 1. Resolution kit - 549
  {
    id: 'resolution-kit',
    name: ' Resolution™ Kit',
    brand: 'Innovation Remedies',
    category: 'Veterinary Care',
    subcategory: 'Diagnostic Kits',
    description: 'Complete resolution kit for veterinary care',
    longDescription: 'Our Resolution Kit offers a comprehensive solution for various veterinary care needs. It includes essential components to aid in quick diagnosis and effective treatment, ensuring animal well-being. Ideal for field veterinarians and clinics.',
    metaDescription: 'Buy Resolution Kit for veterinary care at ₹450 (MRP ₹549). Complete diagnostic solution for animal health. Essential for field veterinarians & clinics. Innovation Remedies India.',
    keywords: ['resolution kit', 'veterinary diagnostic kit', 'animal health kit', 'veterinary care equipment', 'field veterinary kit', 'innovation remedies resolution kit'],
    price: 450.00,
    MRP:549.00,
    currency: 'INR',
    imageUrl: reskit,
    imageFileName: 'resolution.png',
    imageAlt: 'Resolution Kit - Complete Veterinary Diagnostic Solution by Innovation Remedies',
    gradientFrom: 'from-blue-100',
    gradientTo: 'to-blue-50',
    minQuantity: 1,
    rating: 4.7,
    reviewCount: 156,
    stock: 25,
    inStock: true,
    sku: 'IR-RES-KIT-001',
    gtin: '8901234567890',
    features: ['Comprehensive care', 'Veterinary grade', 'Easy to use'],
    benefits: ['Quick diagnosis capability', 'Field-ready portable design', 'All-in-one solution'],
    applications: ['Field veterinary practice', 'Animal clinics', 'Emergency care'],
    packSize: '1 Kit',
    manufacturer: 'Innovation Remedies Pvt Ltd',
    countryOfOrigin: 'India',
  },

  // 2. Innolact Adj Super (Original probably 5L, though name doesn't specify)
  {
    id: 'innolact-ad3-5ltr', // Made ID unique
    name: 'Innolact® AD3 (5 Ltr.)', // Added pack size to name for clarity
    brand: 'Innovation Remedies',
    category: 'Lactation Supplements',
    subcategory: 'Dairy Animal Nutrition',
    description: 'Advanced lactation supplement for dairy animals (5 Liters)',
    longDescription: 'Innolact AD3 (5 Liters) is an advanced lactation supplement specifically formulated for dairy animals. It enhances milk production, improves milk quality, and supports the overall health of lactating animals. Contains vital vitamins and minerals.',
    metaDescription: 'Innolact AD3 (5 Liters) - Advanced lactation supplement for dairy animals. Boost milk production & quality. Vitamin AD3 enriched formula by Innovation Remedies.',
    keywords: ['innolact ad3 5l', 'lactation supplement', 'dairy supplement', 'milk production booster', 'vitamin ad3 for cattle', 'innovation remedies innolact'],
    MRP: 750.00,
    price:500.00,
    currency: 'INR',
    imageUrl: twotwo,
    imageFileName: 'innolact_ad3_5ltr.png',
    imageAlt: 'Innolact AD3 5 Liters - Premium Lactation Supplement for Dairy Animals',
    gradientFrom: 'from-purple-100',
    gradientTo: 'to-purple-50',
    minQuantity: 1,
    rating: 4.5,
    reviewCount: 89,
    stock: 30,
    inStock: true,
    sku: 'IR-INNO-AD3-5L-002', // Made SKU unique
    gtin: '8901234567891', // Assuming GTIN might be shared for product line or needs to be unique
    features: ['Boosts milk yield', 'Enhances milk quality', 'Supports udder health'],
    benefits: ['Increases daily milk production', 'Improves fat percentage in milk', 'Maintains animal health during lactation'],
    applications: ['Dairy cattle', 'Buffaloes', 'Lactating animals'],
    packSize: '5 Liters',
    manufacturer: 'Innovation Remedies Pvt Ltd',
    countryOfOrigin: 'India',
  },
  {
    id: 'innolact-ad3-super-10ltr', // Made ID unique
    name: 'Innolact®  AD3 Super (10 Ltr.)',
    brand: 'Innovation Remedies',
    category: 'Lactation Supplements',
    subcategory: 'Dairy Animal Nutrition',
    description: 'Advanced lactation supplement for dairy animals (10 Liters)',
    longDescription: 'Innolact AD3 Super (10 Liters) is an advanced lactation supplement formulated for dairy animals. It enhances milk production, improves milk quality, and supports overall health. Contains vital vitamins and minerals.',
    metaDescription: 'Innolact AD3 Super (10 Liters) - Boost milk production & quality. Vitamin AD3 enriched formula by Innovation Remedies.',
    keywords: ['innolact ad3 super 10l', 'lactation supplement', 'dairy supplement', 'milk production booster', 'innovation remedies innolact'],
    MRP: 2700.00, // Corrected from mrp
    price:1800.00,
    currency: 'INR',
    imageUrl: innolactten, // Assuming same image for product line
    imageFileName: 'innolact_ad3_super_10ltr.png',
    imageAlt: 'Innolact AD3 Super 10 Liters - Premium Lactation Supplement',
    gradientFrom: 'from-purple-100',
    gradientTo: 'to-purple-50',
    minQuantity: 1,
    rating: 4.5,
    reviewCount: 89,
    stock: 30,
    inStock: true,
    sku: 'IR-INNO-AD3-10L-002A', // Made SKU unique
    gtin: '8901234567891A', // Made GTIN unique example
    features: ['Boosts milk yield', 'Enhanced milk quality', 'Supports udder health', 'Economical 10L pack'],
    benefits: ['Increased daily milk production', 'Improved milk fat', 'Maintains health during lactation'],
    applications: ['Dairy cattle', 'Buffaloes', 'Large dairy farms'],
    packSize: '10 Liters', // Corrected packSize
    manufacturer: 'Innovation Remedies Pvt Ltd',
    countryOfOrigin: 'India',
  },
   {
    id: 'innolact-ad3-super-5ltr', // Made ID unique
    name: 'Innolact®  AD3 Super (5Ltr.)',
    brand: 'Innovation Remedies',
    category: 'Lactation Supplements',
    subcategory: 'Dairy Animal Nutrition',
    description: 'Advanced lactation supplement for dairy animals (5 Liters)',
    longDescription: 'Innolact AD3 Super (5 Liters) is an advanced lactation supplement formulated for dairy animals. It enhances milk production, improves milk quality, and supports overall health. Contains vital vitamins and minerals.',
    metaDescription: 'Innolact AD3 Super ( 5 Liters) - Boost milk production & quality. Vitamin AD3 enriched formula by Innovation Remedies.',
    keywords: ['innolact ad3 super 5l', 'lactation supplement', 'dairy supplement', 'milk production booster', 'innovation remedies innolact'],
    MRP: 1400.00, // Corrected from mrp
    price:950.00,
    currency: 'INR',
    imageUrl: innolactnew, // Assuming same image for product line
    imageFileName: 'innolact_ad3_super_5ltr.png',
    imageAlt: 'Innolact AD3 Super 5 Liters - Premium Lactation Supplement',
    gradientFrom: 'from-purple-100',
    gradientTo: 'to-purple-50',
    minQuantity: 1,
    rating: 4.5,
    reviewCount: 89,
    stock: 30,
    inStock: true,
    sku: 'IR-INNO-AD3-10L-002A', // Made SKU unique
    gtin: '8901234567891A', // Made GTIN unique example
    features: ['Boosts milk yield', 'Enhanced milk quality', 'Supports udder health', 'Economical 10L pack'],
    benefits: ['Increased daily milk production', 'Improved milk fat', 'Maintains health during lactation'],
    applications: ['Dairy cattle', 'Buffaloes', 'Large dairy farms'],
    packSize: '10 Liters', // Corrected packSize
    manufacturer: 'Innovation Remedies Pvt Ltd',
    countryOfOrigin: 'India',
  },
  {
    id: 'innolact-ad3-super-20ltr', // Made ID unique
    name: 'Innolact®  AD3 Super (20 Ltr.)',
    brand: 'Innovation Remedies',
    category: 'Lactation Supplements',
    subcategory: 'Dairy Animal Nutrition',
    description: 'Advanced lactation supplement for dairy animals (20 Liters)',
    longDescription: 'Innolact AD3 Super (20 Liters) is a high-performance lactation supplement for dairy animals, designed to maximize milk production and quality. Contains essential vitamins and minerals for optimal animal health.',
    metaDescription: 'Innolact AD3 Super (20 Liters) - Maximize milk yield with this advanced supplement. Innovation Remedies.',
    keywords: ['innolact ad3 super 20l', 'bulk lactation supplement', 'dairy nutrition', 'innovation remedies'],
    MRP: 4900.00,
    price:3000.00,
    currency: 'INR',
    imageUrl: innolacttwenty, // Assuming same image for product line
    imageFileName: 'innolact_ad3_super_20ltr.png',
    imageAlt: 'Innolact AD3 Super 20 Liters - Bulk Lactation Supplement',
    gradientFrom: 'from-purple-100',
    gradientTo: 'to-purple-50',
    minQuantity: 1,
    rating: 4.5,
    reviewCount: 89,
    stock: 30,
    inStock: true,
    sku: 'IR-INNO-AD3-20L-002B', // Made SKU unique
    gtin: '8901234567891B', // Made GTIN unique example
    features: ['High milk yield boost', 'Superior milk quality', 'Supports udder health', 'Large 20L pack'],
    benefits: ['Significant increase in milk production', 'Enhanced milk richness', 'Long-term animal wellness'],
    applications: ['High-yielding dairy cattle', 'Large-scale dairy operations', 'Buffaloes'],
    packSize: '20 Liters', // Corrected packSize
    manufacturer: 'Innovation Remedies Pvt Ltd',
    countryOfOrigin: 'India',
  },

  // 3. Innolact gold
  {
    id: 'innolact-gold-5ltr', // Made ID unique
    name: 'Innolact® AD3 Gold (5 Ltr.)', // Added pack size to name for clarity
    brand: 'Innovation Remedies',
    category: 'Lactation Supplements',
    subcategory: 'Premium Dairy Nutrition',
    description: 'Premium gold formula for enhanced lactation (5 Liters)',
    longDescription: 'Innolact AD3 Gold (5 Liters) is our premium formula for superior lactation support. It includes chelated minerals and high-potency vitamins to maximize milk production and maintain animal health during peak lactation periods.',
    metaDescription: 'Innolact AD3 Gold (5 Liters) - Premium lactation formula with chelated minerals. Maximum milk production for dairy animals. Innovation Remedies premium range.',
    keywords: ['innolact gold 5l', 'premium lactation supplement', 'chelated minerals cattle', 'peak lactation support', 'innovation remedies gold', 'dairy gold supplement'],
    MRP: 1350.00,
    price:600.00,
    currency: 'INR',
    imageUrl: twothree,
    imageFileName: 'innolact_gold_5ltr.png',
    imageAlt: 'Innolact AD3 Gold 5 Liters - Premium Chelated Mineral Formula',
    gradientFrom: 'from-amber-100',
    gradientTo: 'to-amber-50',
    minQuantity: 1,
    rating: 4.8,
    reviewCount: 112,
    stock: 15,
    inStock: true,
    sku: 'IR-INNO-GOLD-5L-003', // Made SKU unique
    gtin: '8901234567892',
    features: ['Premium formulation', 'Maximized milk production', 'With chelated minerals'],
    benefits: ['Superior bioavailability', 'Peak lactation support', 'Enhanced mineral absorption'],
    applications: ['High-yielding dairy cattle', 'Premium dairy farms', 'Peak lactation period'],
    packSize: '5 Liters',
    manufacturer: 'Innovation Remedies Pvt Ltd',
    countryOfOrigin: 'India',
  },
  {
    id: 'innolact-gold-10ltr', // Made ID unique
    name: 'Innolact® AD3 Gold (10 Ltr.)',
    brand: 'Innovation Remedies',
    category: 'Lactation Supplements',
    subcategory: 'Premium Dairy Nutrition',
    description: 'Premium gold formula for enhanced lactation (10 Liters)',
    longDescription: 'Innolact AD3 Gold (10 Liters) offers superior lactation support with chelated minerals and high-potency vitamins. Designed to maximize milk production and maintain animal health during peak periods. Economical 10 Liter pack.',
    metaDescription: 'Innolact AD3 Gold (10 Liters) - Chelated minerals for maximum milk production. Innovation Remedies premium range.',
    keywords: ['innolact gold 10l', 'premium lactation supplement', 'chelated minerals cattle', 'innovation remedies gold'],
    MRP: 2400.00, // Corrected from mrp
    price:1500.00,
    currency: 'INR',
    imageUrl: whitebox, // Assuming same image for product line
    imageFileName: 'innolact_gold_10ltr.png',
    imageAlt: 'Innolact AD3 Gold 10 Liters - Chelated Mineral Formula',
    gradientFrom: 'from-amber-100',
    gradientTo: 'to-amber-50',
    minQuantity: 1,
    rating: 4.8,
    reviewCount: 112,
    stock: 15,
    inStock: true,
    sku: 'IR-INNO-GOLD-10L-003A', // Made SKU unique
    gtin: '8901234567892A', // Made GTIN unique example
    features: ['Premium formulation', 'Maximized milk production', 'Chelated minerals', '10L pack'],
    benefits: ['Superior bioavailability', 'Peak lactation support', 'Enhanced mineral absorption', 'Cost-effective'],
    applications: ['High-yielding dairy cattle', 'Premium dairy farms', 'Extended use'],
    packSize: '10 Liters', // Corrected packSize
    manufacturer: 'Innovation Remedies Pvt Ltd',
    countryOfOrigin: 'India',
  },
  {
    id: 'innolact-gold-20ltr', // Made ID unique
    name: 'Innolact® AD3 Gold (20 Ltr.)',
    brand: 'Innovation Remedies',
    category: 'Lactation Supplements',
    subcategory: 'Premium Dairy Nutrition',
    description: 'Premium gold formula for enhanced lactation (20 Liters)',
    longDescription: 'Our Innolact AD3 Gold (20 Liters) is the ultimate premium formula for superior lactation support in large herds. Features chelated minerals and high-potency vitamins to maximize milk production and animal health during peak lactation.',
    metaDescription: 'Innolact AD3 Gold (20 Liters) - Bulk premium lactation formula with chelated minerals. Innovation Remedies.',
    keywords: ['innolact gold 20l', 'bulk premium lactation', 'chelated minerals dairy', 'innovation remedies'],
    MRP: 4500.00, // Corrected from mrp
    price:2500.00,
    currency: 'INR',
    imageUrl: innolactwhite, // Assuming same image for product line
    imageFileName: 'innolact_gold_20ltr.png',
    imageAlt: 'Innolact AD3 Gold 20 Liters - Bulk Chelated Mineral Formula',
    gradientFrom: 'from-amber-100',
    gradientTo: 'to-amber-50',
    minQuantity: 1,
    rating: 4.8,
    reviewCount: 112,
    stock: 15,
    inStock: true,
    sku: 'IR-INNO-GOLD-20L-003B', // Made SKU unique
    gtin: '8901234567892B', // Made GTIN unique example
    features: ['Top-tier formulation', 'Maximum milk output', 'With chelated minerals', 'Large 20L pack'],
    benefits: ['Highest bioavailability', 'Sustained peak lactation', 'Optimal mineral uptake', 'Best value for large farms'],
    applications: ['Elite dairy cattle herds', 'Large commercial dairy farms', 'Peak lactation management'],
    packSize: '20 Liters', // Corrected packSize
    manufacturer: 'Innovation Remedies Pvt Ltd',
    countryOfOrigin: 'India',
  },

  // 4. Innolact Gel Advance
  {
    id: 'innolact-gel-advance-1ltr', // Clarified ID for 1 Liter version
    name: 'Innolact® Gel Advance (1 Ltr.)', // Added pack size for clarity
    brand: 'Innovation Remedies',
    category: 'Lactation Supplements',
    subcategory: 'Gel Formulations',
    description: 'Sulfur-enhanced lactation supplement gel (1 Liter)',
    longDescription: 'Innolact Gel Advance (1 Liter) is a unique sulfur-enhanced supplement designed to support lactation and improve metabolic functions in dairy animals. The gel form ensures easy administration and quick absorption.',
    metaDescription: 'Innolact Gel Advance (1 Liter) ₹900 (MRP ₹1400) - Sulfur-enhanced gel supplement for dairy animals. Innovation Remedies.',
    keywords: ['innolact gel 1l', 'sulfur supplement cattle', 'gel lactation supplement', 'metabolic support dairy', 'innovation remedies gel'],
    MRP: 700.00,
    price: 400.00,
    currency: 'INR',
    imageUrl: innolactfive,
    imageFileName: 'innolact_gel_advance_1ltr.png',
    imageAlt: 'Innolact Gel Advance 1 Liter - Sulfur-Enhanced Gel Supplement',
    gradientFrom: 'from-yellow-100',
    gradientTo: 'to-yellow-50',
    minQuantity: 1,
    rating: 4.6,
    reviewCount: 78,
    stock: 22,
    inStock: true,
    sku: 'IR-INNO-GEL-1L-004', // Clarified SKU
    gtin: '8901234567893',
    features: ['Sulfur-enhanced', 'Easy gel administration', 'Supports metabolic health'],
    benefits: ['Improves protein synthesis', 'Better nutrient utilization', 'Quick absorption formula'],
    applications: ['All dairy animals', 'Metabolic disorders', 'Lactation support'],
    packSize: '1 Liter',
    manufacturer: 'Innovation Remedies Pvt Ltd',
    countryOfOrigin: 'India',
  },

  // 5. Innolact gel Advance 500gm
  {
    id: 'innolact-gel-advance-500gm', // Changed ID slightly for consistency
    name: 'Innolact® Gel Advance 500gm',
    brand: 'Innovation Remedies',
    category: 'Lactation Supplements',
    subcategory: 'Gel Formulations',
    description: 'Advanced gel formula for lactation support (500gm)',
    longDescription: 'This 500gm pack of Innolact Gel Advance provides a convenient supply of our advanced gel formula for consistent lactation support. Ideal for managing multiple animals or for extended use.',
    metaDescription: 'Innolact Gel Advance 500gm pack ₹250 (MRP ₹380). Cost-effective lactation gel supplement. Innovation Remedies.',
    keywords: ['innolact gel 500gm', 'bulk lactation gel', 'dairy farm supplement', 'cost effective dairy gel', 'innovation remedies 500gm'],
    MRP: 380.00,
    price:250.00,
    currency: 'INR',
    imageUrl: innolactfive,
    imageFileName: 'innolact_gel_advance_500gm.png',
    imageAlt: 'Innolact Gel Advance 500gm - Economy Pack Lactation Gel Supplement',
    gradientFrom: 'from-teal-100',
    gradientTo: 'to-teal-50',
    minQuantity: 5,
    rating: 4.9,
    reviewCount: 135,
    stock: 40,
    inStock: true,
    sku: 'IR-INNO-GEL500GM-005', // Clarified SKU
    gtin: '8901234567894',
    features: ['Advanced gel formula', 'Cost-effective 500gm pack', 'Quick absorption'],
    benefits: ['Bulk packaging savings', 'Extended supply', 'Consistent quality'],
    applications: ['Multi-animal farms', 'Regular supplementation', 'Dairy cooperatives'],
    packSize: '500 grams',
    manufacturer: 'Innovation Remedies Pvt Ltd',
    countryOfOrigin: 'India',
  },

  {
    id: 'innolact-gel-advance-300gm', // Changed ID slightly for consistency
    name: 'Innolact® Gel Advance 300gm',
    brand: 'Innovation Remedies',
    category: 'Lactation Supplements',
    subcategory: 'Gel Formulations',
    description: 'Advanced gel formula for lactation support (500gm)',
    longDescription: 'This 500gm pack of Innolact Gel Advance provides a convenient supply of our advanced gel formula for consistent lactation support. Ideal for managing multiple animals or for extended use.',
    metaDescription: 'Innolact Gel Advance 500gm pack ₹250 (MRP ₹380). Cost-effective lactation gel supplement. Innovation Remedies.',
    keywords: ['innolact gel 500gm', 'bulk lactation gel', 'dairy farm supplement', 'cost effective dairy gel', 'innovation remedies 500gm'],
    MRP: 280.00,
    price:180.00,
    currency: 'INR',
    imageUrl: innolact,
    imageFileName: 'innolact_gel_advance_500gm.png',
    imageAlt: 'Innolact Gel Advance 300gm - Economy Pack Lactation Gel Supplement',
    gradientFrom: 'from-teal-100',
    gradientTo: 'to-teal-50',
    minQuantity: 5,
    rating: 4.9,
    reviewCount: 135,
    stock: 40,
    inStock: true,
    sku: 'IR-INNO-GEL500GM-005', // Clarified SKU
    gtin: '8901234567894',
    features: ['Advanced gel formula', 'Cost-effective 500gm pack', 'Quick absorption'],
    benefits: ['Bulk packaging savings', 'Extended supply', 'Consistent quality'],
    applications: ['Multi-animal farms', 'Regular supplementation', 'Dairy cooperatives'],
    packSize: '500 grams',
    manufacturer: 'Innovation Remedies Pvt Ltd',
    countryOfOrigin: 'India',
  },

  // 7. Innolact bolus 40 bolus
  {
    id: 'innolact-bolus-40',
    name: 'Innolact® Bolus (40 Bolus)', // Added brackets for consistency
    brand: 'Innovation Remedies',
    category: 'Lactation Supplements',
    subcategory: 'Bolus Formulations',
    description: 'Lactation support in convenient bolus form (40 Bolus)',
    longDescription: 'Innolact Bolus offers lactation support in a convenient and easy-to-administer bolus form. Each bolus is packed with essential nutrients to aid milk production and animal health. Pack of 40.',
    metaDescription: 'Innolact Bolus pack of 40 at ₹350 (MRP ₹449). Convenient bolus form lactation supplement. Innovation Remedies.',
    keywords: ['innolact bolus', 'lactation bolus', 'dairy bolus supplement', 'bolus pack 40', 'sustained release bolus', 'innovation remedies bolus'],
    MRP: 449.00,
    price: 350.00,
    currency: 'INR',
    imageUrl: innolactbolus,
    imageFileName: 'innolact_bolus_40.png',
    imageAlt: 'Innolact Bolus - Pack of 40 Sustained Release Lactation Boluses',
    gradientFrom: 'from-indigo-100',
    gradientTo: 'to-indigo-50',
    minQuantity: 1,
    rating: 4.6,
    reviewCount: 68,
    stock: 50,
    inStock: true,
    sku: 'IR-INNO-BOL40-006',
    gtin: '8901234567895',
    features: ['Convenient bolus form', 'Sustained release', 'Pack of 40'],
    benefits: ['Easy administration', 'Long-lasting effect', 'No daily dosing needed'],
    applications: ['Large ruminants', 'Dairy cattle', 'Buffaloes'],
    packSize: '40 Boluses',
    manufacturer: 'Innovation Remedies Pvt Ltd',
    countryOfOrigin: 'India',
  },

  // 8. Calfshakti
  {
    id: 'calfshakti-1ltr', // Made ID unique
    name: 'IRL™ CalfShakti (1Ltr)',
    brand: 'Innovation Remedies',
    category: 'Calf Nutrition',
    subcategory: 'Growth Supplements',
    description: 'Enhanced nutrition for calves (1 Liter)',
    longDescription: 'CalfShakti (1Ltr) provides enhanced nutrition crucial for the healthy growth and development of calves. It supports immune function and helps in achieving optimal weight gain.',
    metaDescription: 'CalfShakti 1 Liter ₹550 (MRP ₹750) - Premium calf nutrition supplement. Boost immunity & growth. Innovation Remedies.',
    keywords: ['calfshakti 1l', 'calf supplement', 'calf nutrition', 'calf growth booster', 'young calf care', 'innovation remedies calfshakti'],
    MRP: 750.00,
    price:550.00,
    currency: 'INR',
    imageUrl: thirteen,
    imageFileName: 'calfshakti_1ltr.png',
    imageAlt: 'CalfShakti 1 Liter - Complete Nutrition Supplement for Healthy Calf Growth',
    gradientFrom: 'from-sky-100',
    gradientTo: 'to-sky-50',
    minQuantity: 2,
    rating: 4.8,
    reviewCount: 105,
    stock: 18,
    inStock: true,
    sku: 'IR-CALF-1L-007',
    gtin: '8901234567896',
    features: ['Supports calf growth', 'Boosts immunity', '1 Liter pack'],
    benefits: ['Optimal weight gain', 'Strong immune system', 'Healthy development'],
    applications: ['Young calves', 'Post-weaning nutrition', 'Growth phase support'],
    packSize: '1 Liter',
    manufacturer: 'Innovation Remedies Pvt Ltd',
    countryOfOrigin: 'India',
  },
  {
    id: 'calfshakti-200ml', // Made ID unique
    name: 'IRL™ CalfShakti (200ml)',
    brand: 'Innovation Remedies',
    category: 'Calf Nutrition',
    subcategory: 'Growth Supplements',
    description: 'Enhanced nutrition for calves (200ml)',
    longDescription: 'CalfShakti (200ml) provides essential nutrition for young calves, supporting healthy growth, development, and immune function. Convenient smaller pack size.',
    metaDescription: 'CalfShakti 200ml - Nutrition supplement for young calves. Boost immunity & growth. Innovation Remedies.',
    keywords: ['calfshakti 200ml', 'calf supplement', 'small calf nutrition', 'calf growth booster', 'innovation remedies calfshakti'],
    MRP: 180.00, // Adjusted MRP to be more logical for 200ml vs 1L, original was 750
    price:150.00, // Adjusted price to be more logical, original was 550
    currency: 'INR',
    imageUrl: calfshaktiml,
    imageFileName: 'calfshakti_200ml.png',
    imageAlt: 'CalfShakti 200ml - Nutrition Supplement for Healthy Calf Growth',
    gradientFrom: 'from-sky-100',
    gradientTo: 'to-sky-50',
    minQuantity: 2, // Min quantity might differ for smaller pack
    rating: 4.8,
    reviewCount: 105, // Review count might be for product line
    stock: 18,
    inStock: true,
    sku: 'IR-CALF-200ML-007A', // Made SKU unique
    gtin: '8901234567896A', // Made GTIN unique
    features: ['Supports calf growth', 'Boosts immunity', 'Convenient 200ml pack'],
    benefits: ['Optimal weight gain', 'Strong immune system', 'Healthy development', 'Easy for small doses'],
    applications: ['Young calves', 'Individual calf dosing', 'Starter nutrition'],
    packSize: '200 ml', // Corrected packSize
    manufacturer: 'Innovation Remedies Pvt Ltd',
    countryOfOrigin: 'India',
  },

  // 9. Calfshakti 500ml
  {
    id: 'calfshakti-500ml',
    name: 'IRL™ CalfShakti (500ml)', // Added brackets for consistency
    brand: 'Innovation Remedies',
    category: 'Calf Nutrition',
    subcategory: 'Growth Supplements',
    description: 'Nutrition supplement for young calves (500ml)',
    longDescription: 'The 500ml pack of CalfShakti offers a targeted nutrition supplement for young calves, promoting vitality and healthy development during their critical early stages.',
    metaDescription: 'CalfShakti 500ml ₹330 (MRP ₹419) - Essential nutrition for young calves. Innovation Remedies calf care range.',
    keywords: ['calfshakti 500ml', 'small calf supplement', 'young calf nutrition', 'calf starter supplement', 'calf vitality booster', 'innovation remedies 500ml'],
    MRP: 419.00,
    price:330.00,
    currency: 'INR',
    imageUrl: advcalf,
    imageFileName: 'calfshakti_500ml.png',
    imageAlt: 'CalfShakti 500ml - Starter Pack Nutrition Supplement for Young Calves',
    gradientFrom: 'from-cyan-100',
    gradientTo: 'to-cyan-50',
    minQuantity: 5,
    rating: 4.7,
    reviewCount: 87,
    stock: 25,
    inStock: true,
    sku: 'IR-CALF-500ML-008',
    gtin: '8901234567897',
    features: ['For young calves', 'Promotes vitality', 'Convenient 500ml size'],
    benefits: ['Early stage nutrition', 'Builds strong foundation', 'Easy to administer'],
    applications: ['Newborn calves', 'Pre-weaning phase', 'Small farms'],
    packSize: '500 ml',
    manufacturer: 'Innovation Remedies Pvt Ltd',
    countryOfOrigin: 'India',
  },

  // 10. Badda H
  {
    id: 'badda-h-1ltr', // Made ID unique
    name: 'Badda H™ (1Ltr)',
    brand: 'Innovation Remedies',
    category: 'Health Supplements',
    subcategory: 'Urinary & Digestive Care',
    description: 'Supports urinary tract and digestive health in animals (1 Liter)',
    longDescription: 'Badda H (1Ltr) is formulated to support and maintain urinary tract and digestive health in animals. It aids in preventing common issues and promotes overall systemic balance.',
    metaDescription: 'Badda H 1 Liter ₹1200 (MRP ₹1650) - Urinary tract & digestive health supplement for animals. Innovation Remedies.',
    keywords: ['badda h 1l', 'urinary health animals', 'digestive health supplement', 'systemic balance animals', 'innovation remedies badda'],
    MRP: 1562.00,
    price : 1100.00,
    currency: 'INR',
    imageUrl: eight,
    imageFileName: 'badda_h_1ltr.png',
    imageAlt: 'Badda H 1 Liter - Urinary Tract and Digestive Health Support for Animals',
    gradientFrom: 'from-indigo-100',
    gradientTo: 'to-indigo-50',
    minQuantity: 1,
    rating: 4.8,
    reviewCount: 112,
    stock: 12,
    inStock: true,
    sku: 'IR-BADDA-1L-009',
    gtin: '8901234567898',
    features: ['Urinary tract support', 'Digestive health aid', 'Systemic balance'],
    benefits: ['Prevents UTI issues', 'Improves digestion', 'Overall health maintenance'],
    applications: ['All livestock', 'Preventive care', 'Treatment support'],
    packSize: '1 Liter',
    manufacturer: 'Innovation Remedies Pvt Ltd',
    countryOfOrigin: 'India',
  },
  {
    id: 'badda-h-250ml', // Made ID unique
    name: 'Badda H™ (250 ml)',
    brand: 'Innovation Remedies',
    category: 'Health Supplements',
    subcategory: 'Urinary & Digestive Care',
    description: 'Supports urinary tract and digestive health (250ml)',
    longDescription: 'Badda H (250ml) is formulated to support urinary tract and digestive health in animals. Aids in preventing common issues and promotes systemic balance. Convenient 250ml pack.',
    metaDescription: 'Badda H 250ml - Urinary & digestive health for animals. Innovation Remedies.',
    keywords: ['badda h 250ml', 'animal urinary health', 'animal digestive care', 'innovation remedies'],
    MRP: 428.00, // Corrected from mrp
    price : 350.00,
    currency: 'INR',
    imageUrl: tryu,
    imageFileName: 'badda_h_250ml.png',
    imageAlt: 'Badda H 250ml - Urinary Tract and Digestive Health Support',
    gradientFrom: 'from-indigo-100',
    gradientTo: 'to-indigo-50',
    minQuantity: 1,
    rating: 4.8, // Rating likely for product line
    reviewCount: 112, // Review count likely for product line
    stock: 12,
    inStock: true,
    sku: 'IR-BADDA-250ML-009A', // Made SKU unique
    gtin: '8901234567898A', // Made GTIN unique
    features: ['Urinary tract support', 'Digestive health aid', 'Systemic balance', '250ml pack'],
    benefits: ['Prevents UTI issues', 'Improves digestion', 'Overall health maintenance', 'Easy for smaller doses'],
    applications: ['All livestock', 'Preventive care', 'Individual animal treatment'],
    packSize: '250 ml', // Corrected packSize
    manufacturer: 'Innovation Remedies Pvt Ltd',
    countryOfOrigin: 'India',
  },

  // 11. Racer kit
  {
    id: 'racer-kit',
    name: 'IRL™ Racer ( 1Ltr. )',
    brand: 'Innovation Remedies',
    category: 'Performance Enhancement',
    subcategory: 'Racing Animal Care',
    description: 'Performance enhancement  for racing animals',
    longDescription: 'The IRL™ Racer  is a specialized performance enhancement solution for racing animals. It is designed to optimize energy, stamina, and recovery for peak competitive performance.',
    metaDescription: 'IRL™ Racer Kit ₹1100 (MRP ₹1690) - Performance enhancement for racing animals. Innovation Remedies.',
    keywords: ['racer kit', 'racing animal supplement', 'performance enhancement animals', 'racing horse supplement', 'stamina booster animals', 'innovation remedies racer'],
    MRP:860.00,
    price:600.00,
    currency: 'INR',
    imageUrl: racer,
    imageFileName: 'racer_kit.png',
    imageAlt: 'IRL Racer Kit - Professional Performance Enhancement Kit for Racing Animals',
    gradientFrom: 'from-red-100',
    gradientTo: 'to-red-50',
    minQuantity: 1,
    rating: 4.9,
    reviewCount: 93,
    stock: 5,
    inStock: true,
    sku: 'IR-RACER-KIT-010',
    gtin: '8901234567899',
    features: ['Performance enhancement', 'Optimizes energy & stamina', 'Supports recovery'],
    benefits: ['Peak performance', 'Faster recovery times', 'Competitive edge'],
    applications: ['Racing horses', 'Competition animals', 'High-performance sports'],
    packSize: '1 Kit',
    manufacturer: 'Innovation Remedies Pvt Ltd',
    countryOfOrigin: 'India',
  },

  // 12. Innoliv DS
  {
    id: 'innoliv-ds-1ltr', // Made ID unique
    name: 'IRL™ Innoliv DS (1Ltr)',
    brand: 'Innovation Remedies',
    category: 'Liver Care',
    subcategory: 'Hepatic Supplements',
    description: 'Advanced liver support supplement for animal vitality (1 Liter)',
    longDescription: 'Innoliv DS (1Ltr) is an advanced liver support supplement that promotes detoxification and enhances overall animal vitality. Essential for maintaining liver health and function.',
    metaDescription: 'Innoliv DS 1 Liter ₹250 (MRP ₹325) - Advanced liver support for animals. Innovation Remedies hepatic care.',
    keywords: ['innoliv ds 1l', 'liver support animals', 'hepatic supplement', 'detoxification animals', 'liver care veterinary', 'innovation remedies innoliv'],
    MRP: 325.00, // Corrected from mrp
    price:250.00,
    currency: 'INR',
    imageUrl: fourteen,
    imageFileName: 'innoliv_ds_1ltr.png',
    imageAlt: 'Innoliv DS 1 Liter - Advanced Liver Support and Detoxification Supplement',
    gradientFrom: 'from-teal-100',
    gradientTo: 'to-teal-50',
    minQuantity: 5, // This was 5, seems high for 1L, but keeping as per original
    rating: 4.9,
    reviewCount: 135,
    stock: 35,
    inStock: true,
    sku: 'IR-INNO-LIV-1L-011', // Clarified SKU
    gtin: '8901234567900',
    features: ['Advanced liver support', 'Promotes detoxification', 'Enhances vitality'],
    benefits: ['Liver protection', 'Toxin elimination', 'Improved metabolism'],
    applications: ['All animals', 'Post-medication care', 'Preventive hepatic care'],
    packSize: '1 Liter',
    manufacturer: 'Innovation Remedies Pvt Ltd',
    countryOfOrigin: 'India',
  },
  {
  id: 'innoliv-ds-5ltr', // Made ID unique
  name: 'IRL™ Innoliv DS (5Ltr)',
  brand: 'Innovation Remedies',
  category: 'Liver Care',
  subcategory: 'Hepatic Supplements',
  description: 'Advanced liver support supplement for animal vitality (5 Liters)',
  longDescription: 'Innoliv DS (5Ltr) is an advanced liver support supplement that promotes detoxification and enhances overall animal vitality. Essential for maintaining liver health and function. Economical 5 Liter pack.',
  metaDescription: 'Innoliv DS 5 Liter ₹650 (MRP ₹1250) - Advanced liver support for animals. Innovation Remedies hepatic care products.',
  keywords: ['innoliv ds 5l', 'liver support animals', 'hepatic supplement', 'detoxification animals', 'liver care veterinary', 'innovation remedies innoliv'],
  price: 700.00,
  MRP: 1250.00, // Corrected from mrp
  discount: 48,  // 48% discount
  discountAmount: 600.00,  // ₹600 off
  currency: 'INR',
  imageUrl: fiveltr,
  imageFileName: 'innoliv_ds_5ltr.png',
  imageAlt: 'Innoliv DS 5 Liter - Advanced Liver Support and Detoxification Supplement',
  gradientFrom: 'from-teal-100',
  gradientTo: 'to-teal-50',
  minQuantity: 1, // Adjusted minQuantity for larger pack
  rating: 4.9,
  reviewCount: 135,
  stock: 35,
  inStock: true,
  sku: 'IR-INNO-LIV-5L-011A', // Made SKU unique
  gtin: '8901234567900A', // Made GTIN unique
  features: ['Advanced liver support', 'Promotes detoxification', 'Enhances vitality', '5L economy pack'],
  benefits: ['Liver protection', 'Toxin elimination', 'Improved metabolism', 'Cost-effective for herds'],
  applications: ['All animals', 'Post-medication care', 'Preventive hepatic care', 'Large animal groups'],
  packSize: '5 Liters', // Corrected packSize
  manufacturer: 'Innovation Remedies Pvt Ltd',
  countryOfOrigin: 'India',
} , 

  // 14. Urocoenta Advance
  {
    id: 'urocoenta-advance-1l', // Added packsize to id for clarity
    name: 'Urocenta® Advance (1Ltr)', // Added packsize to name for clarity
    brand: 'Innovation Remedies',
    category: 'Urinary Care',
    subcategory: 'Kidney Health',
    description: 'Advanced urinary health supplement (1L)',
    longDescription: 'Urocoenta Advance (1l) is a cutting-edge supplement for maintaining urinary health in animals. It helps prevent urinary issues and supports healthy kidney function.',
    metaDescription: 'Urocoenta Advance 1l ₹210 (MRP ₹300) - Advanced urinary health supplement. Innovation Remedies.',
    keywords: ['urocoenta advance', 'urinary health supplement', 'kidney support animals', 'uti prevention animals', 'innovation remedies urocoenta'],
    MRP: 300.00, // Corrected from mrp
    price:210.00,
    currency: 'INR',
    imageUrl: three,
    imageFileName: 'urocoenta_advance_500ml.png',
    imageAlt: 'Urocoenta Advance 500ml - Advanced Urinary and Kidney Health Supplement',
    gradientFrom: 'from-blue-100',
    gradientTo: 'to-blue-50',
    minQuantity: 5, // This was 5
    rating: 4.6,
    reviewCount: 95,
    stock: 28,
    inStock: true,
    sku: 'IR-URO-ADV-500ML-012', // Clarified SKU
    gtin: '8901234567901',
    features: ['Advanced urinary health', 'Supports kidney function', 'Preventative care'],
    benefits: ['UTI prevention', 'Kidney stone prevention', 'Maintains pH balance'],
    applications: ['All livestock', 'Preventive care', 'Kidney support'],
    packSize: '500 ml',
    manufacturer: 'Innovation Remedies Pvt Ltd',
    countryOfOrigin: 'India',
  },

  // 15. Glucodyna
  {
    id: 'glucodyna-1ltr', // Clarified ID
    name: 'Glucodyna™ (1Ltr)',
    brand: 'Innovation Remedies',
    category: 'Energy Supplements',
    subcategory: 'Glucose Support',
    description: 'Energy and glucose supplement for animals (1 Liter)',
    longDescription: 'Glucodyna (1Ltr) is a vital energy and glucose supplement for animals, particularly useful during periods of stress, recovery, or high energy demand. Helps maintain blood glucose levels.',
    metaDescription: 'Glucodyna 1 Liter ₹600 (MRP ₹750) - Instant energy & glucose supplement for animals. Innovation Remedies.',
    keywords: ['glucodyna 1l', 'glucose supplement animals', 'energy booster animals', 'stress recovery animals', 'innovation remedies glucodyna'],
    MRP: 800.00,
    price:650.00,
    currency: 'INR',
    imageUrl: tenn,
    imageFileName: 'glucodyna_1ltr.png',
    imageAlt: 'Glucodyna 1 Liter - Instant Energy and Glucose Support for Animals',
    gradientFrom: 'from-pink-100',
    gradientTo: 'to-pink-50',
    minQuantity: 1,
    rating: 4.8,
    reviewCount: 110,
    stock: 10,
    inStock: true,
    sku: 'IR-GLUCO-1L-013',
    gtin: '8901234567902',
    features: ['Instant energy source', 'Maintains glucose levels', 'Aids recovery'],
    benefits: ['Quick energy boost', 'Prevents hypoglycemia', 'Stress management'],
    applications: ['Post-surgery recovery', 'High stress periods', 'Energy deficiency'],
    packSize: '1 Liter',
    manufacturer: 'Innovation Remedies Pvt Ltd',
    countryOfOrigin: 'India',
  },

  // 16. R3 Vet Bolus
  {
    id: 'r3-vet-bolus-10', // Clarified ID
    name: 'R3 Vet Bolus (10 Bolus)', // Added packsize for clarity
    brand: 'Innovation Remedies',
    category: 'General Health',
    subcategory: 'Multi-Purpose Supplements',
    description: 'Premium veterinary supplement for animal health (10 Bolus)',
    longDescription: 'R3 Vet Bolus (10 Bolus) is a premium multi-purpose veterinary supplement designed to support overall animal health and well-being. Convenient bolus form for easy administration.',
    metaDescription: 'R3 Vet Bolus (10 Bolus) ₹300 (MRP ₹400) - Premium multi-purpose veterinary supplement. Innovation Remedies.',
    keywords: ['r3 vet bolus', 'veterinary bolus', 'multi purpose supplement', 'animal health bolus', 'innovation remedies r3'],
    MRP: 400.00,
    price:300.00,
    currency: 'INR',
    imageUrl: R3,
    imageFileName: 'r3_vet_bolus_10.png',
    imageAlt: 'R3 Vet Bolus (10 Bolus) - Premium Multi-Purpose Veterinary Health Supplement',
    gradientFrom: 'from-pink-100',
    gradientTo: 'to-pink-50',
    minQuantity: 10, // This was 10, seems like it's for a box of 10, so 1 box is min
    rating: 4.7,
    reviewCount: 156,
    stock: 60,
    inStock: true,
    sku: 'IR-R3-BOL10-014', // Clarified SKU
    gtin: '8901234567903',
    features: ['Premium supplement', 'Overall animal health', 'Convenient bolus', 'Pack of 10'],
    benefits: ['Complete nutrition', 'Easy administration', 'Long shelf life'],
    applications: ['All animals', 'Routine supplementation', 'Health maintenance'],
    packSize: '10 Boluses',
    manufacturer: 'Innovation Remedies Pvt Ltd',
    countryOfOrigin: 'India',
  },

  // 17. Innoworm XL 100ml
  {
    id: 'innoworm-xl-100ml',
    name: 'IRL™ Innoworm XL (100ml)', // Added brackets
    brand: 'Innovation Remedies',
    category: 'Parasite Control',
    subcategory: 'Dewormers',
    description: 'Effective parasite control for healthier livestock (100ml)',
    longDescription: 'Innoworm XL (100ml) provides effective and broad-spectrum parasite control for healthier livestock. Helps improve growth rates and overall animal productivity by managing worm infestations.',
    metaDescription: 'Innoworm XL 100ml ₹120 (MRP ₹150) - Broad-spectrum dewormer for livestock. Innovation Remedies.',
    keywords: ['innoworm xl 100ml', 'dewormer livestock', 'parasite control animals', 'worm medicine animals', 'innovation remedies innoworm'],
    MRP: 150.00,
    price:120.00,
    currency: 'INR',
    imageUrl: fifteen,
    imageFileName: 'innoworm_xl_100ml.png',
    imageAlt: 'Innoworm XL 100ml - Broad-Spectrum Dewormer for Livestock',
    gradientFrom: 'from-green-100',
    gradientTo: 'to-green-50',
    minQuantity: 10,
    rating: 4.7,
    reviewCount: 91,
    stock: 45,
    inStock: true,
    sku: 'IR-WORM-XL100-015',
    gtin: '8901234567904',
    features: ['Broad-spectrum dewormer', 'For healthier livestock', '100ml pack'],
    benefits: ['Controls all worms', 'Improves weight gain', 'Better feed conversion'],
    applications: ['Cattle deworming', 'Sheep & goats', 'Regular parasite control'],
    packSize: '100 ml',
    manufacturer: 'Innovation Remedies Pvt Ltd',
    countryOfOrigin: 'India',
  },

  // 18. Innoworm 30ml
  {
    id: 'innoworm-30ml',
    name: 'IRL™ Innoworm (30ml)', // Added brackets
    brand: 'Innovation Remedies',
    category: 'Parasite Control',
    subcategory: 'Dewormers', // Description says "Nutritional supplement", but category is "Parasite Control"
    description: 'Palatable dewormer for young animals (30ml)', // Corrected description to match category
    longDescription: 'Innoworm 30ml is a palatable dewormer formulated for young or recovering animals. Its palatable formula ensures easy acceptance while effectively controlling parasites.', // Adjusted
    metaDescription: 'Innoworm 30ml ₹30 (MRP ₹45) - Dewormer for young animals. Palatable formula by Innovation Remedies.',
    keywords: ['innoworm 30ml', 'small animal dewormer', 'young animal parasite control', 'palatable dewormer', 'innovation remedies 30ml'],
    MRP: 45.00,
    price:30.00,
    currency: 'INR',
    imageUrl: sixteen,
    imageFileName: 'innoworm_30ml.png',
    imageAlt: 'Innoworm 30ml - Palatable Dewormer for Young and Small Animals',
    gradientFrom: 'from-amber-100',
    gradientTo: 'to-amber-50',
    minQuantity: 30,
    rating: 4.6,
    reviewCount: 68,
    stock: 0, // Stock is 0 but inStock is true - potential inconsistency. Will keep as is from original data.
    inStock: true,
    sku: 'IR-WORM-30ML-016',
    gtin: '8901234567905',
    features: ['Palatable formula', 'Gentle dewormer', 'For young animals', '30ml pack'],
    benefits: ['Easy acceptance', 'Effective parasite control', 'Supports healthy growth post-deworming'],
    applications: ['Young animals', 'Small animals', 'Post-weaning deworming'],
    packSize: '30 ml',
    manufacturer: 'Innovation Remedies Pvt Ltd',
    countryOfOrigin: 'India',
  },

  // 19. Weight boost 3kg
  {
    id: 'weight-boost-3kg',
    name: 'Weight Boost (3kg)', // Added brackets
    brand: 'Innovation Remedies',
    category: 'Nutritional Supplements',
    subcategory: 'Weight Gain',
    description: 'Weight gain supplement for livestock (3kg)',
    longDescription: 'Weight Boost (3kg) is a high-calorie supplement designed to promote significant weight gain in livestock. Ideal for animals needing to build mass or recover condition.',
    metaDescription: 'Weight Boost 3kg ₹800 (MRP ₹1250) - High-calorie weight gain supplement for livestock. Innovation Remedies.',
    keywords: ['weight boost 3kg', 'weight gain supplement', 'livestock mass gainer', 'high calorie feed', 'innovation remedies weight boost'],
    MRP: 1250.00,
    price : 800.00,
    currency: 'INR',
    imageUrl: wui,
    imageFileName: 'weight_boost_3kg.png',
    imageAlt: 'Weight Boost 3kg - High-Calorie Weight Gain Supplement for Livestock',
    gradientFrom: 'from-purple-100',
    gradientTo: 'to-purple-50',
    minQuantity: 1,
    rating: 4.9,
    reviewCount: 120,
    stock: 8,
    inStock: true,
    sku: 'IR-WEIGHT-3KG-017',
    gtin: '8901234567906',
    features: ['High-calorie formula', 'Promotes mass gain', '3kg economy pack'],
    benefits: ['Rapid weight gain', 'Improved body condition', 'Better market value'],
    applications: ['Underweight animals', 'Pre-market preparation', 'Recovery feeding'],
    packSize: '3 kg',
    manufacturer: 'Innovation Remedies Pvt Ltd',
    countryOfOrigin: 'India',
  },

  // 22. Makkhi Soap 75gm
  {
    id: 'makkhi-soap-75gm',
    name: 'IRL™ Makkhi Soap (75gm)', // Added brackets
    brand: 'Innovation Remedies',
    category: 'Animal Hygiene',
    subcategory: 'Insect Repellents',
    description: 'Herbal insect repellent soap for animal hygiene (75gm)',
    longDescription: 'Makkhi Soap (75gm) is a herbal insect repellent soap that ensures animal hygiene and comfort. It effectively repels flies and other ectoparasites while being gentle on the skin.',
    metaDescription: 'Makkhi Soap 75gm ₹60 (MRP ₹120) - Herbal insect repellent soap for animals. Innovation Remedies.',
    keywords: ['makkhi soap', 'insect repellent soap', 'fly repellent animals', 'herbal animal soap', 'innovation remedies makkhi'],
    price: 60.00,
    MRP:120.00,
    currency: 'INR',
    imageUrl: seventeen,
    imageFileName: 'makkhi_soap_75gm.png',
    imageAlt: 'Makkhi Soap 75gm - Herbal Insect Repellent Soap for Animal Hygiene',
    gradientFrom: 'from-blue-100',
    gradientTo: 'to-blue-50',
    minQuantity: 20,
    rating: 4.8,
    reviewCount: 105,
    stock: 70,
    inStock: true,
    sku: 'IR-MAKKHI-SOAP-018',
    gtin: '8901234567907',
    features: ['Herbal insect repellent', 'Gentle on skin', 'Promotes hygiene'],
    benefits: ['Natural fly control', 'Skin conditioning', 'Pleasant fragrance'],
    applications: ['Daily animal bathing', 'Fly season protection', 'Skin care routine'],
    packSize: '75 grams',
    manufacturer: 'Innovation Remedies Pvt Ltd',
    countryOfOrigin: 'India',
  },

  // 23. Makkhi 15ml
  {
    id: 'makkhi-liquid-15ml', // Made ID more specific
    name: 'IRL™ Makkhi Liquid (15ml)', // Added "Liquid" and brackets
    brand: 'Innovation Remedies',
    category: 'Pest Control',
    subcategory: 'Concentrated Solutions',
    description: 'Potent concentrated liquid for pest control (15ml)',
    longDescription: 'Makkhi Liquid (15ml) is a potent, concentrated liquid formula for effective control of flies and other pests. Its concentrated nature ensures efficacy even with small doses.',
    metaDescription: 'Makkhi Liquid 15ml ₹60 (MRP ₹85.90) - Concentrated fly & pest control liquid. Innovation Remedies.',
    keywords: ['makkhi liquid 15ml', 'concentrated pest control', 'fly control liquid', 'pest repellent concentrate', 'innovation remedies makkhi'],
    MRP: 85.90,
    price: 60.00,
    currency: 'INR',
    imageUrl: ui,
    imageFileName: 'makkhi_liquid_15ml.png',
    imageAlt: 'Makkhi Liquid 15ml - Potent Concentrated Pest Control Formula',
    gradientFrom: 'from-cyan-100',
    gradientTo: 'to-cyan-50',
    minQuantity: 10,
    rating: 4.7,
    reviewCount: 87,
    stock: 55,
    inStock: true,
    sku: 'IR-MAKKHI-LIQ15ML-019', // Clarified SKU
    gtin: '8901234567908',
    features: ['Potent concentrate', 'Effective pest control', 'Economical 15ml pack'],
    benefits: ['Long-lasting effect', 'Cost-effective solution', 'Multiple pest control'],
    applications: ['Stable pest control', 'Fly prevention', 'Area treatment'],
    packSize: '15 ml',
    manufacturer: 'Innovation Remedies Pvt Ltd',
    countryOfOrigin: 'India',
  },

  // 24. Makkhi 6ml
  {
    id: 'makkhi-liquid-6ml', // Made ID specific
    name: 'IRL™ Makkhi Liquid (6ml)', // Added "Liquid" and brackets
    brand: 'Innovation Remedies',
    category: 'Pest Control',
    subcategory: 'Quick Solutions',
    description: 'Fast-acting liquid solution for pest control (6ml)',
    longDescription: 'This Makkhi Liquid (6ml) pack offers a fast-acting liquid solution for quick pest control. Ideal for spot treatments or smaller applications where immediate action is needed.',
    metaDescription: 'Makkhi Liquid 6ml ₹30 (MRP ₹54.90) - Fast-acting pest control solution. Innovation Remedies.',
    keywords: ['makkhi liquid 6ml', 'fast acting pest control', 'quick fly control', 'spot treatment pest', 'innovation remedies makkhi'],
    MRP: 54.90,
    price:30.00,
    currency: 'INR',
    imageUrl: nineteen,
    imageFileName: 'makkhi_liquid_6ml.png',
    imageAlt: 'Makkhi Liquid 6ml - Fast-Acting Pest Control for Spot Treatment',
    gradientFrom: 'from-violet-100',
    gradientTo: 'to-violet-50',
    minQuantity: 30,
    rating: 4.9,
    reviewCount: 93,
    stock: 100,
    inStock: true,
    sku: 'IR-MAKKHI-LIQ6ML-020', // Clarified SKU
    gtin: '8901234567909',
    features: ['Fast-acting solution', 'Quick pest knockdown', 'Convenient 6ml size'],
    benefits: ['Immediate results', 'Easy spot application', 'Trial size available'],
    applications: ['Emergency pest control', 'Small area treatment', 'Quick intervention'],
    packSize: '6 ml',
    manufacturer: 'Innovation Remedies Pvt Ltd',
    countryOfOrigin: 'India',
  },
  // Corrected AYNGROW and RS 21 products
   {
    id: 'ayngrow-bolus-20', // Unique ID
    name: 'AYNGROW Bolus (20 Bolus)',
    brand: 'Innovation Remedies',
    category: 'Nutritional Supplements', // Corrected category
    subcategory: 'Vitamin & Mineral Bolus', // Corrected subcategory
    description: 'Multivitamin and mineral bolus for livestock (20 Bolus)',
    longDescription: 'AYNGROW Bolus (20 Bolus) is a comprehensive multivitamin and mineral supplement for livestock, promoting overall health, growth, and productivity. Easy to administer bolus form.',
    metaDescription: 'AYNGROW Bolus (20 Bolus) ₹650 (MRP ₹900) - Multivitamin & mineral supplement for livestock health. Innovation Remedies.',
    keywords: ['ayngrow bolus', 'multivitamin bolus', 'mineral supplement livestock', 'animal health bolus', 'innovation remedies ayngrow'],
    MRP: 900.00,
    price:650.00,
    currency: 'INR',
    imageUrl: twentyone, // Original imageUrl for this item
    imageFileName: 'ayngrow_bolus_20.png', // Corrected
    imageAlt: 'AYNGROW Bolus (20 Bolus) - Multivitamin and Mineral Supplement', // Corrected
    gradientFrom: 'from-green-100', // Adjusted gradient
    gradientTo: 'to-green-50',   // Adjusted gradient
    minQuantity: 1, // Min quantity likely 1 pack
    rating: 4.9, // Assuming rating from original placeholder
    reviewCount: 93, // Assuming review count from original placeholder
    stock: 100,
    inStock: true,
    sku: 'IR-AYNGROW-BOL20-021', // Unique SKU
    gtin: '8901234567910', // Example new GTIN
    features: ['Rich in multivitamins', 'Essential minerals', 'Promotes growth', 'Boosts immunity', 'Pack of 20 Bolus'],
    benefits: ['Improved animal health', 'Better feed conversion', 'Enhanced productivity', 'Stress reduction'],
    applications: ['Cattle', 'Buffaloes', 'Sheep', 'Goats', 'Growth promotion', 'Health maintenance'],
    packSize: '20 Boluses', // Corrected
    manufacturer: 'Innovation Remedies Pvt Ltd',
    countryOfOrigin: 'India',
  },
  {
    id: 'ayngrow-bolus-40', // Unique ID
    name: 'AYNGROW Bolus (40 Bolus)',
    brand: 'Innovation Remedies',
    category: 'Nutritional Supplements', // Corrected category
    subcategory: 'Vitamin & Mineral Bolus', // Corrected subcategory
    description: 'Multivitamin and mineral bolus for livestock (40 Bolus)',
    longDescription: 'AYNGROW Bolus (40 Bolus) provides a larger pack of comprehensive multivitamin and mineral supplement for livestock. Supports overall health, growth, and productivity. Convenient bolus form.',
    metaDescription: 'AYNGROW Bolus (40 Bolus) ₹1050 (MRP ₹1550) - Bulk multivitamin & mineral supplement for livestock. Innovation Remedies.',
    keywords: ['ayngrow bolus 40', 'bulk multivitamin bolus', 'livestock mineral supplement', 'animal wellness', 'innovation remedies ayngrow'],
    MRP: 1550.00, // Corrected from mrp
    price:1050.00,
    currency: 'INR',
    imageUrl: fourtybolus, // Original imageUrl for this item
    imageFileName: 'ayngrow_bolus_40.png', // Corrected
    imageAlt: 'AYNGROW Bolus (40 Bolus) - Bulk Multivitamin and Mineral Supplement', // Corrected
    gradientFrom: 'from-green-100', // Adjusted gradient
    gradientTo: 'to-teal-50',    // Adjusted gradient
    minQuantity: 1, // Min quantity likely 1 pack
    rating: 4.9,
    reviewCount: 93,
    stock: 100,
    inStock: true,
    sku: 'IR-AYNGROW-BOL40-022', // Unique SKU
    gtin: '8901234567911', // Example new GTIN
    features: ['Comprehensive multivitamins', 'Key minerals', 'Supports robust growth', 'Strengthens immunity', 'Economy pack of 40 Bolus'],
    benefits: ['Enhanced animal vitality', 'Improved feed efficiency', 'Boosted reproductive health', 'Cost-effective for herds'],
    applications: ['Dairy cattle', 'Beef cattle', 'Large ruminants', 'Breeding stock', 'Overall herd health programs'],
    packSize: '40 Boluses', // Corrected
    manufacturer: 'Innovation Remedies Pvt Ltd',
    countryOfOrigin: 'India',
  },
  {
    id: 'rs21-solution-210ml', // Unique ID
    name: 'RS 21 Solution (210 ml)', // Added "Solution" for clarity
    brand: 'Innovation Remedies',
    category: 'Reproductive Health', // Corrected category
    subcategory: 'Fertility Solutions', // Corrected subcategory
    description: 'Repeat Breeding and Infertility Solution (210 ml)',
    longDescription: 'RS 21 Solution (210 ml) is specially formulated to address issues of repeat breeding and infertility in livestock. It helps optimize reproductive health and improve conception rates.',
    metaDescription: 'RS 21 Solution (210 ml) ₹350 (MRP ₹415) - For repeat breeding & infertility in livestock. Innovation Remedies.',
    keywords: ['rs21 solution', 'repeat breeding solution', 'livestock infertility', 'animal fertility supplement', 'innovation remedies rs21'],
    MRP: 415.00, // Corrected from mrp
    price:350.00,
    currency: 'INR',
    imageUrl: gly, // Using 'twentyone' image for RS21, as 'fourtybolus' was for AYNGROW.
    imageFileName: 'rs21_solution_210ml.png', // Corrected
    imageAlt: 'RS 21 Solution (210 ml) - Repeat Breeding and Infertility Solution', // Corrected
    gradientFrom: 'from-rose-100', // Adjusted gradient
    gradientTo: 'to-pink-50',      // Adjusted gradient
    minQuantity: 1, // Min quantity likely 1 bottle
    rating: 4.9, // Assuming rating
    reviewCount: 93, // Assuming review count
    stock: 100,
    inStock: true,
    sku: 'IR-RS21-SOL210ML-023', // Unique SKU
    gtin: '8901234567912', // Example new GTIN
    features: ['Addresses repeat breeding', 'Supports fertility', 'Optimizes reproductive cycle', 'Liquid solution 210ml'],
    benefits: ['Improved conception rates', 'Reduced inter-calving period', 'Enhanced reproductive efficiency', 'Supports hormonal balance'],
    applications: ['Cows', 'Buffaloes', 'Heifers with reproductive issues', 'Animals with history of repeat breeding'],
    packSize: '210 ml', // Corrected
    manufacturer: 'Innovation Remedies Pvt Ltd',
    countryOfOrigin: 'India',
  },
  // The Innocef Tazo 4.5gm was commented out in the original, so I'm keeping it commented.
  // If you need it, it should also be reviewed for similar consistency.
  // {
  //   id: 'innocef-tazo-4.5gm',
  //   name: 'Innocef Tazo 4.5gm',
  //   brand: 'Innovation Remedies',
  //   category: 'Antibiotics',
  //   subcategory: 'Injectable Antibiotics',
  //   description: 'Advanced injectable antibiotic (Ceftriaxone & Tazobactam)',
  //   longDescription: 'Innocef Tazo 4.5gm is an advanced injectable antibiotic combination (Ceftriaxone & Tazobactam) for treating severe bacterial infections in animals. Provides broad-spectrum coverage.',
  //   metaDescription: 'Innocef Tazo 4.5gm ₹415 - Injectable antibiotic for severe infections. Innovation Remedies.',
  //   keywords: ['innocef tazo', 'ceftriaxone tazobactam', 'injectable antibiotic', 'veterinary antibiotic', 'innovation remedies antibiotic'],
  //   price: 415.00, // Assuming no MRP given or MRP is same as price
  //   MRP: 415.00, // Added MRP for consistency, assuming it's same as price if no discount.
  //   currency: 'INR',
  //   imageUrl: innoceftazo,
  //   imageFileName: 'innocef_tazo_4.5gm.png',
  //   imageAlt: 'Innocef Tazo 4.5gm - Advanced Injectable Antibiotic',
  //   gradientFrom: 'from-emerald-100',
  //   gradientTo: 'to-emerald-50',
  //   minQuantity: 10,
  //   rating: 4.8,
  //   reviewCount: 85,
  //   stock: 20,
  //   inStock: true,
  //   sku: 'IR-INNO-TAZO-4.5GM-024', // Example SKU
  //   gtin: '8901234567913', // Example GTIN
  //   features: ['Injectable antibiotic', 'Ceftriaxone & Tazobactam', 'Treats severe infections', '4.5gm vial'],
  //   benefits: ['Broad-spectrum action', 'Rapid recovery', 'Hospital-grade treatment'],
  //   applications: ['Severe bacterial infections', 'Post-surgical prophylaxis', 'Resistant infections'],
  //   packSize: '4.5 grams',
  //   manufacturer: 'Innovation Remedies Pvt Ltd',
  //   countryOfOrigin: 'India',
  // }
];
// Helper function to process product data (normalize MRP, calculate discounts, add timers)
const processProductDataArray = (initialData) => {
  const today = new Date();
  
  // Fixed product IDs that will always have countdown timers (products with good discounts)
  const productIdsForTimer = [
    'resolution-kit',           // Resolution Kit - 18% off
    'innolact-ad3-5ltr',       // Innolact AD3 5L - 33% off  
    'innolact-gold-5ltr',      // Innolact Gold 5L - 56% off
    'calfshakti-1ltr',         // CalfShakti 1L - 27% off
    'innolact-gel-advance-500gm', // Innolact Gel 500gm - 34% off
    'innoliv-ds-5ltr',         // Innoliv DS 5L - 48% off (biggest discount)
    'weight-boost-3kg'         // Weight Boost 3kg - 36% off
  ];

  return initialData.map((product) => {
    const processed = { ...product };

    // Normalize MRP (handle 'mrp' if 'MRP' is not present or not a number)
    if (typeof processed.mrp === 'number' && (typeof processed.MRP !== 'number' || isNaN(processed.MRP))) {
      processed.MRP = processed.mrp;
    }
    delete processed.mrp; // remove the lowercase version

    // Ensure MRP and price are numbers for calculation
    const priceNum = Number(processed.price);
    const mrpNum = Number(processed.MRP);

    processed.discountPercentage = 0;
    processed.discountAmount = 0;

    if (!isNaN(priceNum) && !isNaN(mrpNum) && mrpNum > priceNum) {
      // Use existing discount fields if they are valid numbers, otherwise calculate
      if (typeof processed.discount === 'number' && !isNaN(processed.discount)) {
        processed.discountPercentage = processed.discount;
      } else {
        processed.discountPercentage = Math.round(((mrpNum - priceNum) / mrpNum) * 100);
      }

      if (typeof processed.discountAmount === 'number' && !isNaN(processed.discountAmount)) {
        // Use existing discountAmount
      } else {
        processed.discountAmount = mrpNum - priceNum;
      }
    }
    
    // Ensure discountPercentage is a number, default to 0 if not.
    if (typeof processed.discountPercentage !== 'number' || isNaN(processed.discountPercentage)) {
        processed.discountPercentage = 0;
    }
    if (typeof processed.discountAmount !== 'number' || isNaN(processed.discountAmount)) {
        processed.discountAmount = 0;
    }

    // Add discountEndDate for specific products that have a discount
    if (processed.discountPercentage > 0 && productIdsForTimer.includes(processed.id) && processed.inStock) {
      // Create different end times for each product to make them feel authentic
      const productIndex = productIdsForTimer.indexOf(processed.id);
      const baseDays = 2 + (productIndex % 4); // 2-5 days based on product position
      const baseHours = 14 + (productIndex * 2) % 10; // Different hours for each product
      
      const endDate = new Date(today);
      endDate.setDate(today.getDate() + baseDays);
      endDate.setHours(baseHours, (productIndex * 7) % 60, (productIndex * 13) % 60, 999);
      processed.discountEndDate = endDate.toISOString();
    }

    return processed;
  });
};

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

// DiscountTimer Component
function DiscountTimer({ endDateString }) {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(endDateString));

  useEffect(() => {
    if (!endDateString || new Date(endDateString) <= new Date()) {
      setTimeLeft({}); // Clear time if offer expired
      return;
    }

    const timerId = setInterval(() => {
      const newTimeLeft = calculateTimeLeft(endDateString);
      if (Object.keys(newTimeLeft).length === 0) {
        clearInterval(timerId);
      }
      setTimeLeft(newTimeLeft);
    }, 1000);

    return () => clearInterval(timerId);
  }, [endDateString]);

  function calculateTimeLeft(end) {
    const difference = +new Date(end) - +new Date();
    let timeLeftOutput = {};

    if (difference > 0) {
      timeLeftOutput = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return timeLeftOutput;
  }

  if (Object.keys(timeLeft).length === 0) {
    return null; // Or <p className="text-xs text-red-500">Offer expired</p>
  }

  return (
    <div className="mt-1 text-xs text-red-600 font-semibold bg-red-100 p-1.5 rounded-md flex items-center shadow-sm">
      <Clock size={14} className="mr-1.5 flex-shrink-0 text-red-500" />
      <span className="truncate">
        Offer ends in: {timeLeft.days > 0 && `${timeLeft.days}d `}
        {`${String(timeLeft.hours).padStart(2, '0')}h `}
        {`${String(timeLeft.minutes).padStart(2, '0')}m `}
        {`${String(timeLeft.seconds).padStart(2, '0')}s`}
      </span>
    </div>
  );
}

function Stars({ rating }) {
  const full = Math.floor(rating);
  const frac = rating - full;
  return (
    <span className="inline-flex items-center gap-[2px]">
      {[0, 1, 2, 3, 4].map((i) => {
        const fill = i < full ? 1 : i === full ? frac : 0;
        return (
          <span key={i} className="relative inline-block w-[11px] h-[11px]">
            <Star size={11} className="absolute inset-0 text-neutral-300" fill="currentColor" />
            <span
              className="absolute inset-0 overflow-hidden text-neutral-900"
              style={{ width: `${fill * 100}%` }}
            >
              <Star size={11} fill="currentColor" />
            </span>
          </span>
        );
      })}
    </span>
  );
}

function ProductCard({
  id,
  name,
  brand,
  description,
  price,
  MRP,
  discountPercentage,
  discountAmount,
  discountEndDate,
  currency,
  imageUrl,
  imageAlt,
  gradientFrom = DEFAULT_GRADIENT_FROM,
  gradientTo = DEFAULT_GRADIENT_TO,
  minQuantity,
  rating,
  reviewCount,
  stock,
  inStock,
  sku,
  category,
}) {
  const navigate = useNavigate();
  const cardRef = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'end start'],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], [20, -30]);

  const handleCardClick = () => navigate(`/product/${id}`);
  const imgSrc = typeof imageUrl === 'string' ? imageUrl : imageUrl?.src;
  const accent = accentForGradient(gradientFrom);

  const productMicrodata = {};
  if (MRP && Number(MRP) > Number(price) && productMicrodata.offers) {
    productMicrodata.offers.priceSpecification = {
      '@type': 'PriceSpecification',
      price: Number(MRP).toFixed(2),
      priceCurrency: currency,
      valueAddedTaxIncluded: true,
      priceType: 'ListPrice',
    };
  }

  const nameStyle = {
    fontFamily:
      "system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
    fontWeight: 500,
    letterSpacing: '-0.01em',
  };

  return (
    <motion.article
      ref={cardRef}
      variants={itemVariants}
      whileHover={reduce ? {} : { y: -4 }}
      transition={{ duration: 0.4, ease: EASE_OUT }}
      className="group relative flex flex-col h-full cursor-pointer"
      itemScope
      itemType="https://schema.org/Product"
      role="button"
      tabIndex={0}
      onClick={handleCardClick}
      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && handleCardClick()}
      style={BODY}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productMicrodata) }}
      />

      {/* Image panel — soft accent tint, no border */}
      <div
        className="relative h-[280px] sm:h-[320px] overflow-hidden rounded-[1.25rem]"
        style={{
          background: `linear-gradient(160deg, ${accent} 0%, ${accent}60 55%, #ffffff 100%)`,
        }}
      >
        {/* Subtle radial accent */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none opacity-80 transition-opacity duration-700 group-hover:opacity-100"
          style={{
            background: `radial-gradient(circle at 50% 55%, ${accent} 0%, transparent 65%)`,
          }}
        />

        {/* Top row — category + discount */}
        <div className="absolute top-4 left-4 right-4 flex items-start justify-between z-10">
          <span
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[9px] uppercase bg-white/85 backdrop-blur-sm text-neutral-700"
            style={MONO}
          >
            {category || 'Veterinary'}
          </span>
          {discountPercentage > 0 && inStock ? (
            <span
              className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] tabular-nums bg-neutral-900 text-white"
              style={nameStyle}
            >
              −{discountPercentage}%
            </span>
          ) : null}
        </div>

        {/* Product image with parallax + lazy load */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center p-8"
          style={reduce ? {} : { y: imgY }}
        >
          <div className="relative w-full h-full transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.08]">
            <LazyImage
              src={imgSrc}
              alt={imageAlt || name}
              placeholder={accent}
              className="absolute inset-0 w-full h-full object-contain drop-shadow-[0_18px_22px_rgba(0,0,0,0.1)]"
            />
          </div>
        </motion.div>

        {/* Bottom-left arrow indicator — slides in on hover */}
        <div className="absolute bottom-4 right-4 z-10">
          <span className="flex items-center justify-center w-9 h-9 rounded-full bg-neutral-900 text-white opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]">
            <ArrowUpRight size={14} />
          </span>
        </div>

        {/* Out of stock overlay */}
        {!inStock && (
          <div className="absolute inset-0 bg-black/55 backdrop-blur-[1px] flex items-center justify-center z-20">
            <span
              className="text-white text-[10px] uppercase px-3 py-1.5 rounded-full border border-white/40"
              style={MONO}
            >
              Out of stock
            </span>
          </div>
        )}
      </div>

      {/* Content — no border, clean spacing */}
      <div className="flex flex-col flex-grow pt-4 gap-2">
        <h3
          className="text-[15px] md:text-base text-neutral-900 leading-snug line-clamp-2 min-h-[2.6rem] group-hover:text-neutral-600 transition-colors duration-300"
          style={nameStyle}
          itemProp="name"
          title={name}
        >
          {name}
        </h3>

        {description && (
          <p className="text-[12.5px] text-neutral-500 leading-relaxed line-clamp-2">
            {description}
          </p>
        )}

        {/* Rating */}
        {typeof rating === 'number' && reviewCount > 0 && (
          <div
            className="flex items-center gap-2 text-[11px] text-neutral-500 mt-1"
            itemProp="aggregateRating"
            itemScope
            itemType="https://schema.org/AggregateRating"
          >
            <Stars rating={rating} />
            <span className="tabular-nums">
              <span itemProp="ratingValue">{rating.toFixed(1)}</span>
              <span className="text-neutral-400"> · </span>
              <span itemProp="reviewCount">{reviewCount}</span>
            </span>
          </div>
        )}

        {/* Discount timer */}
        {discountEndDate && new Date(discountEndDate) > new Date() && inStock && (
          <div className="mt-1">
            <DiscountTimer endDateString={discountEndDate} />
          </div>
        )}

        {/* Price row — no CTA here (whole card is clickable) */}
        <div
          className="mt-auto pt-3 flex items-baseline gap-2"
          itemProp="offers"
          itemScope
          itemType="https://schema.org/Offer"
        >
          <link
            itemProp="url"
            href={`https://www.innovationremedies.com/product/${id}`}
          />
          <meta
            itemProp="availability"
            content={
              inStock
                ? 'https://schema.org/InStock'
                : 'https://schema.org/OutOfStock'
            }
          />
          <meta itemProp="priceCurrency" content={currency} />
          {Number(price) > 0 ? (
            <>
              <span
                className="text-lg tabular-nums text-neutral-900"
                style={nameStyle}
                itemProp="price"
                content={Number(price).toFixed(2)}
              >
                ₹{Number(price).toFixed(0)}
              </span>
              {MRP && Number(MRP) > Number(price) && (
                <span className="text-xs text-neutral-400 line-through tabular-nums">
                  ₹{Number(MRP).toFixed(0)}
                </span>
              )}
              <span className="ml-auto text-[10px] uppercase text-neutral-400" style={MONO}>
                Min {minQuantity}
              </span>
            </>
          ) : (
            <span className="text-sm text-neutral-900" style={nameStyle}>
              Price on request
            </span>
          )}
        </div>
      </div>
    </motion.article>
  );
}

function ListProducts() {
  const domain = "https://www.innovationremedies.com";
  const canonicalUrl = `${domain}/products`;
  const currentDate = new Date().toISOString();
  
  const [sortBy, setSortBy] = useState('relevance');
  const [activeCategory, setActiveCategory] = useState('all');

  const processedProducts = processProductDataArray(productsData);

  // Distinct categories with counts
  const categories = React.useMemo(() => {
    const map = new Map();
    processedProducts.forEach((p) => {
      const c = p.category || 'Other';
      map.set(c, (map.get(c) || 0) + 1);
    });
    return [
      { key: 'all', label: 'All', count: processedProducts.length },
      ...Array.from(map.entries()).map(([label, count]) => ({
        key: label,
        label,
        count,
      })),
    ];
  }, [processedProducts]);

  const filteredProducts =
    activeCategory === 'all'
      ? processedProducts
      : processedProducts.filter((p) => p.category === activeCategory);

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-asc':
        return (a.price || 0) - (b.price || 0);
      case 'price-desc':
        return (b.price || 0) - (a.price || 0);
      case 'name-asc':
        return (a.name || '').localeCompare(b.name || '');
      case 'rating':
        const ratingDiff = (b.rating || 0) - (a.rating || 0);
        if (ratingDiff !== 0) return ratingDiff;
        return (b.reviewCount || 0) - (a.reviewCount || 0);
      case 'relevance':
      default:
        if (a.inStock !== b.inStock) return b.inStock ? -1 : 1;
        const discountDiff = (b.discountPercentage || 0) - (a.discountPercentage || 0);
        if (discountDiff !== 0) return discountDiff;
        return (b.reviewCount || 0) - (a.reviewCount || 0);
    }
  });

  const totalRating = processedProducts.reduce((acc, p) => acc + (p.rating || 0) * (p.reviewCount || 0), 0);
  const totalReviews = processedProducts.reduce((acc, p) => acc + (p.reviewCount || 0), 0);
  const averageRating = totalReviews > 0 ? (totalRating / totalReviews).toFixed(1) : 0;

    const metaDescription = `Shop from a wide range of high-quality veterinary products at Innovation Remedies. Find lactation supplements, dewormers, growth boosters, and more. Great deals & fast shipping across India. ${totalReviews > 0 ? `Average rating: ${averageRating}/5 from ${totalReviews} reviews.` : ''}`;
  const focusKeywords = ["veterinary products", "animal health supplements", "buy cattle medicine online", "innovation remedies products", "livestock supplements india"];

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${domain}/#organization`,
        "name": "Innovation Remedies Pvt Ltd",
        "url": domain,
        "logo": { "@type": "ImageObject", "url": `${domain}/logo.png`, "width": 600, "height": 60 },
         "contactPoint": [
          { "@type": "ContactPoint", "telephone": "+91-YOUR-PHONE-NUMBER", "contactType": "Customer Support" }
        ],
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Your Company Address",
          "addressLocality": "City",
          "addressRegion": "State",
          "postalCode": "PINCODE",
          "addressCountry": "IN"
        },
        "sameAs": [
          "https://www.facebook.com/yourprofile",
          "https://www.instagram.com/yourprofile"
          // Add other social media links
        ]
      },
      {
        "@type": "WebSite",
        "@id": `${domain}/#website`,
        "url": domain,
        "name": "Innovation Remedies - Veterinary Products",
        "publisher": { "@id": `${domain}/#organization` },
        "potentialAction": {
          "@type": "SearchAction",
          "target": `${domain}/search?q={search_term_string}`,
          "query-input": "required name=search_term_string"
        }
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${canonicalUrl}/#breadcrumb`,
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": domain },
          { "@type": "ListItem", "position": 2, "name": "Products", "item": canonicalUrl }
        ]
      },
      {
        "@type": "ItemList",
        "@id": `${canonicalUrl}/#productlist`,
        "name": "Innovation Remedies Veterinary Products",
        "description": "Complete range of veterinary medicines, supplements, and animal health products offered by Innovation Remedies.",
        "numberOfItems": processedProducts.length,
        "itemListElement": processedProducts.map((product, index) => {
          const offerSchema = {
            "@type": "Offer",
            "url": `${domain}/product/${product.id}`,
            "priceCurrency": product.currency,
            "price": product.price,
            "priceValidUntil": product.discountEndDate && new Date(product.discountEndDate) > new Date() 
                               ? new Date(product.discountEndDate).toISOString().split('T')[0] 
                               : new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            "availability": product.inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
            "seller": { "@id": `${domain}/#organization` },
            "itemCondition": "https://schema.org/NewCondition", // Assuming all products are new
             ...(product.MRP && Number(product.MRP) > Number(product.price) && {
              "priceSpecification": {
                "@type": "PriceSpecification",
                "price": Number(product.MRP).toFixed(2),
                "priceCurrency": product.currency,
                "valueAddedTaxIncluded": true, 
                "priceType": "ListPrice"
              }
            })
          };
          return {
            "@type": "ListItem",
            "position": index + 1,
            "item": {
              "@type": "Product",
              "@id": `${domain}/product/${product.id}`,
              "name": product.name,
              "description": product.longDescription || product.description,
              "image": product.imageUrl?.src || product.imageUrl,
              "brand": { "@type": "Brand", "name": product.brand },
              "manufacturer": { "@type": "Organization", "name": product.manufacturer },
              "category": product.category,
              "sku": product.sku,
              ...(product.gtin && {"gtin13": product.gtin}),
              "offers": offerSchema,
              ...(product.rating && product.reviewCount > 0 && {
                "aggregateRating": {
                  "@type": "AggregateRating",
                  "ratingValue": product.rating.toFixed(1),
                  "reviewCount": product.reviewCount
                }
              })
            }
          }
        })
      },
      {
        "@type": "CollectionPage",
        "@id": canonicalUrl,
        "url": canonicalUrl,
        "name": "All Veterinary Products - Innovation Remedies",
        "description": metaDescription,
        "inLanguage": "en-IN",
        "isPartOf": { "@id": `${domain}/#website` },
        "breadcrumb": { "@id": `${canonicalUrl}/#breadcrumb` },
        "mainEntity": { "@id": `${canonicalUrl}/#productlist`},
        "datePublished": "2023-01-01T08:00:00+05:30", // A general publish date for the page
        "dateModified": currentDate
      }
    ]
  };




  return (
    <HelmetProvider>
      <Helmet>
        <title>Veterinary Products Online - Best Deals | Innovation Remedies</title>
        <meta name="description" content={metaDescription} />
        <link rel="canonical" href={canonicalUrl} />
        <meta name="keywords" content={`veterinary medicines, animal supplements, cattle feed supplements, poultry products, livestock healthcare, ${focusKeywords.join(', ')}`} />
        <meta property="og:title" content="High-Quality Veterinary Products | Innovation Remedies" />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={`${domain}${logo}`} />
        <meta property="og:image:alt" content="Innovation Remedies Logo" />
        <meta property="og:site_name" content="Innovation Remedies" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Veterinary Products - Innovation Remedies" />
        <meta name="twitter:description" content={metaDescription} />
        <meta name="twitter:image" content={`${domain}${logo}`} />
        <script type="application/ld+json">
          {JSON.stringify(structuredData, null, 2)}
        </script>
      </Helmet>

      <div className="bg-white min-h-screen text-neutral-900" style={BODY}>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-neutral-900 text-white px-4 py-2 rounded z-50"
        >
          Skip to main content
        </a>
        {/* Compact page intro — replaces the giant dark hero */}
        <section className="relative pt-28 md:pt-32 pb-8 md:pb-12 bg-white">
          <div className="max-w-[1400px] mx-auto px-6 md:px-10">
            <nav
              aria-label="Breadcrumb"
              className="flex items-center gap-2 text-[11px] uppercase text-neutral-500 mb-8"
              style={MONO}
            >
              <Link to="/" className="hover:text-neutral-900 transition-colors">
                Home
              </Link>
              <ChevronRight size={12} className="opacity-50" />
              <span className="text-neutral-900">Products</span>
            </nav>
            <div className="grid md:grid-cols-12 gap-8 items-end">
              <div className="md:col-span-8">
                <p
                  className="text-[11px] uppercase text-emerald-700 mb-4"
                  style={MONO}
                >
                  — The complete catalogue
                </p>
                <h1
                  className="text-4xl md:text-5xl lg:text-6xl tracking-[-0.03em] leading-[1.02] text-neutral-900"
                  style={DISPLAY}
                >
                  Products —
                  <span className="italic font-light bg-gradient-to-r from-emerald-600 via-teal-600 to-blue-700 bg-clip-text text-transparent">
                    {' '}
                    {processedProducts.length} formulations.
                  </span>
                </h1>
              </div>
              <div className="md:col-span-4 md:text-right">
                <p className="text-sm text-neutral-600 leading-relaxed max-w-sm md:ml-auto">
                  Precision-engineered veterinary pharmaceuticals and
                  nutritional solutions. Browse, filter, and pick what works for
                  your animals.
                </p>
              </div>
            </div>
          </div>
        </section>

        <CategoryTabs
          categories={categories}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
          sortBy={sortBy}
          setSortBy={setSortBy}
          count={sortedProducts.length}
        />

        <main
          id="main-content"
          className="max-w-[1400px] mx-auto px-6 md:px-10 pb-24 pt-10"
        >
          <LayoutGroup>
            <motion.div
              layout
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12 md:gap-x-8 md:gap-y-14"
              transition={{ layout: { duration: 0.5, ease: EASE_OUT } }}
            >
              <AnimatePresence mode="popLayout">
                {sortedProducts.map((p) => (
                  <motion.div
                    key={p.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -20 }}
                    transition={{ duration: 0.45, ease: EASE_OUT }}
                  >
                    <ProductCard {...p} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </LayoutGroup>

          {/* Empty state */}
          {sortedProducts.length === 0 && (
            <div className="py-24 text-center">
              <p className="text-[11px] uppercase text-neutral-500 mb-4" style={MONO}>
                — Nothing here
              </p>
              <h3
                className="text-2xl md:text-3xl text-neutral-900 tracking-[-0.02em]"
                style={DISPLAY}
              >
                No products in this category.
              </h3>
              <button
                onClick={() => setActiveCategory('all')}
                className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-neutral-900 text-white text-sm hover:bg-neutral-800 transition-colors"
                style={DISPLAY}
              >
                View all products
              </button>
            </div>
          )}

          <nav
            aria-label="Pagination"
            className="flex items-center justify-center gap-3 mt-16 md:mt-20"
          >
            <button
              disabled
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-neutral-200 text-neutral-400 cursor-not-allowed text-sm"
              style={DISPLAY}
            >
              <ChevronLeft size={15} /> Previous
            </button>
            <span
              className="text-[11px] uppercase text-neutral-500 px-3"
              style={MONO}
            >
              Page 01
            </span>
            <button
              className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-neutral-900 text-white hover:bg-neutral-800 transition-colors text-sm"
              style={DISPLAY}
            >
              Next
              <ChevronRight
                size={15}
                className="transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1"
              />
            </button>
          </nav>
        </main>

        {/* Trust stats */}
        <TrustStats averageRating={averageRating} />

        {/* Why + FAQ (kept for SEO, restyled) */}
        <WhySection />
        <FAQSection />
      </div>
    </HelmetProvider>
  );
}

/* ---------------------------- Products Hero ------------------------------ */
function ProductsHero({ total, averageRating, categories = [] }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });
  const reduce = useReducedMotion();
  const titleY = useTransform(scrollYProgress, [0, 1], ['0%', '-25%']);
  const titleOp = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden text-white"
      style={{ backgroundColor: '#05070f' }}
    >
      {/* Gradient base */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(135deg, #05070f 0%, #080d20 45%, #050814 75%, #05070f 100%)',
        }}
      />
      {/* Ambient orbs */}
      <motion.div
        className="absolute w-[65vw] h-[65vw] rounded-full blur-3xl"
        style={{
          background:
            'radial-gradient(circle, rgba(59,89,200,0.38) 0%, transparent 65%)',
          top: '-25%',
          left: '-15%',
        }}
        animate={reduce ? {} : { x: [0, 30, 0], y: [0, 20, 0] }}
        transition={{ duration: 40, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute w-[70vw] h-[70vw] rounded-full blur-3xl"
        style={{
          background:
            'radial-gradient(circle, rgba(27,44,120,0.4) 0%, transparent 65%)',
          bottom: '-35%',
          right: '-15%',
        }}
        animate={reduce ? {} : { x: [0, -25, 0], y: [0, -20, 0] }}
        transition={{ duration: 50, repeat: Infinity, ease: 'easeInOut' }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20 pointer-events-none" />

      <motion.div
        style={reduce ? {} : { y: titleY, opacity: titleOp }}
        className="relative max-w-[1400px] mx-auto px-6 md:px-10 pt-32 md:pt-40 pb-24 md:pb-32"
      >
        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-2 text-[11px] uppercase text-white/60 mb-10"
          style={MONO}
        >
          <Link to="/" className="hover:text-white transition-colors">
            Home
          </Link>
          <ChevronRight size={12} className="opacity-50" />
          <span className="text-white">Products</span>
        </nav>

        <div className="grid md:grid-cols-12 gap-10 items-end">
          <div className="md:col-span-8">
            <p
              className="text-[11px] uppercase text-emerald-300/90 mb-6"
              style={MONO}
            >
              — The complete range
            </p>
            <h1
              className="leading-[0.88] tracking-[-0.04em] text-[16vw] md:text-[11vw] lg:text-[9.5vw]"
              style={BRAND}
            >
              <span className="bg-gradient-to-b from-white via-white to-white/60 bg-clip-text text-transparent">
                PRODUCTS
              </span>
            </h1>

            {/* Top categories — mini showcase */}
            {categories.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: EASE_OUT, delay: 0.35 }}
                className="mt-10 flex flex-wrap gap-2"
              >
                {categories.map((c, i) => (
                  <motion.a
                    key={c.key}
                    href="#main-content"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.5,
                      ease: EASE_OUT,
                      delay: 0.45 + i * 0.05,
                    }}
                    className="group inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/20 hover:border-white/50 hover:bg-white/5 text-[11px] uppercase text-white/80 transition-colors"
                    style={MONO}
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full bg-emerald-400 opacity-70 group-hover:opacity-100 transition-opacity"
                    />
                    {c.label}
                    <span className="text-white/40 tabular-nums">{c.count}</span>
                  </motion.a>
                ))}
              </motion.div>
            )}
          </div>
          <div className="md:col-span-4 flex flex-col items-start md:items-end gap-6">
            <p className="text-white/70 text-base leading-relaxed md:text-right max-w-xs">
              Precision-engineered veterinary pharmaceuticals and nutritional
              solutions. Browse the full catalogue.
            </p>
            <div
              className="grid grid-cols-2 gap-6 text-left md:text-right w-full"
              style={MONO}
            >
              <div>
                <div
                  className="text-2xl md:text-3xl text-white tabular-nums tracking-tight"
                  style={DISPLAY}
                >
                  {total}
                </div>
                <div className="text-[10px] uppercase text-white/50 mt-1">
                  Products
                </div>
              </div>
              <div>
                <div
                  className="text-2xl md:text-3xl text-white tabular-nums tracking-tight"
                  style={DISPLAY}
                >
                  {averageRating > 0
                    ? parseFloat(averageRating).toFixed(1)
                    : '5.0'}
                </div>
                <div className="text-[10px] uppercase text-white/50 mt-1">
                  Avg. rating
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll cue */}
        <div
          className="mt-20 flex items-center gap-3 text-[10px] uppercase text-white/50"
          style={MONO}
        >
          <span>Browse</span>
          <motion.span
            animate={reduce ? {} : { y: [0, 5, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ArrowDown size={12} />
          </motion.span>
        </div>
      </motion.div>
    </section>
  );
}

/* ----------------------------- Category tabs ----------------------------- */
function CategoryTabs({
  categories,
  activeCategory,
  setActiveCategory,
  sortBy,
  setSortBy,
  count,
}) {
  return (
    <div className="relative bg-white border-b border-neutral-200">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-4">
        {/* Top row — count + sort */}
        <div className="flex items-center justify-between gap-4 mb-3">
          <motion.span
            key={count}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: EASE_OUT }}
            className="text-[11px] uppercase text-neutral-500 tabular-nums"
            style={MONO}
          >
            — {count} {count === 1 ? 'product' : 'products'}
            {activeCategory !== 'all' && (
              <span className="ml-2 text-neutral-400">/ {activeCategory}</span>
            )}
          </motion.span>
          <div className="flex items-center gap-3">
            <span
              className="hidden sm:inline text-[11px] uppercase text-neutral-400"
              style={MONO}
            >
              Sort
            </span>
            <Select
              value={sortBy}
              onValueChange={(v) => setSortBy(v || 'relevance')}
            >
              <SelectTrigger
                className="min-w-[170px] rounded-full h-9 text-[11px] uppercase bg-neutral-100 border-transparent hover:border-neutral-300 transition-colors"
                style={MONO}
              >
                <SelectValue placeholder="Sort" />
              </SelectTrigger>
              <SelectContent className="rounded-xl">
                <SelectItem value="relevance" className="text-xs">
                  Relevance
                </SelectItem>
                <SelectItem value="price-asc" className="text-xs">
                  Price · Low to High
                </SelectItem>
                <SelectItem value="price-desc" className="text-xs">
                  Price · High to Low
                </SelectItem>
                <SelectItem value="name-asc" className="text-xs">
                  Name · A → Z
                </SelectItem>
                <SelectItem value="rating" className="text-xs">
                  Top rated
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Category chips — horizontal scroll */}
        <LayoutGroup id="category-tabs">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar -mx-1 px-1 pb-1">
            {categories.map((c) => {
              const isActive = activeCategory === c.key;
              return (
                <motion.button
                  key={c.key}
                  onClick={() => setActiveCategory(c.key)}
                  className={`relative shrink-0 inline-flex items-center gap-2 px-4 py-2 rounded-full text-[11px] uppercase transition-colors duration-300 ${
                    isActive
                      ? 'text-white'
                      : 'text-neutral-600 hover:text-neutral-900'
                  }`}
                  style={MONO}
                  whileTap={{ scale: 0.97 }}
                >
                  {isActive && (
                    <motion.span
                      layoutId="activeChip"
                      className="absolute inset-0 bg-neutral-900 rounded-full -z-10"
                      transition={{
                        type: 'spring',
                        stiffness: 400,
                        damping: 32,
                      }}
                    />
                  )}
                  <span className="relative whitespace-nowrap">{c.label}</span>
                  <span
                    className={`relative tabular-nums text-[10px] ${
                      isActive ? 'text-white/70' : 'text-neutral-400'
                    }`}
                  >
                    {c.count}
                  </span>
                </motion.button>
              );
            })}
          </div>
        </LayoutGroup>
      </div>

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}

/* ------------------------------ Trust stats ------------------------------ */
function TrustStats({ averageRating }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const stats = [
    { label: 'Products', value: '50+' },
    { label: 'Happy customers', value: '50,000+' },
    {
      label: 'Avg. rating',
      value: averageRating > 0 ? parseFloat(averageRating).toFixed(1) : '5.0',
    },
    { label: 'Years experience', value: '14+' },
  ];
  return (
    <section
      ref={ref}
      className="relative bg-neutral-50 py-20 md:py-28 border-t border-neutral-200"
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <div className="max-w-2xl mb-14">
          <p className="text-[11px] uppercase text-neutral-500 mb-5" style={MONO}>
            — Trusted
          </p>
          <h2
            className="text-3xl md:text-5xl tracking-[-0.03em] leading-[1.05] text-neutral-900"
            style={DISPLAY}
          >
            Backed by veterinarians.
            <br />
            <span className="text-neutral-400">Proven on farms.</span>
          </h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.7,
                delay: i * 0.08,
                ease: EASE_OUT,
              }}
              className="border-t border-neutral-300 pt-5"
            >
              <div
                className="text-4xl md:text-6xl tracking-[-0.03em] tabular-nums text-neutral-900 leading-none"
                style={DISPLAY}
              >
                {s.value}
              </div>
              <div
                className="text-[11px] uppercase text-neutral-500 mt-3"
                style={MONO}
              >
                {s.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------ Why section ------------------------------ */
function WhySection() {
  return (
    <section className="relative bg-white py-20 md:py-28 border-t border-neutral-200">
      <div className="max-w-4xl mx-auto px-6 md:px-10">
        <p className="text-[11px] uppercase text-neutral-500 mb-5" style={MONO}>
          — Why Innovation Remedies
        </p>
        <h2
          className="text-3xl md:text-5xl tracking-[-0.03em] leading-[1.05] text-neutral-900 mb-8"
          style={DISPLAY}
        >
          A comprehensive range,
          <br />
          <span className="text-neutral-400">formulated with purpose.</span>
        </h2>
        <div className="prose prose-neutral max-w-none text-neutral-600">
          <ul className="grid sm:grid-cols-2 gap-4 list-none p-0">
            {[
              ['Lactation supplements', 'Innolact AD3, Innolact Gold, Gel — optimal milk production'],
              ['Growth supplements', 'CalfShakti, Weight Boost — healthy development'],
              ['Health supplements', 'Innoliv DS, Urocoenta, Badda H — liver, urinary, digestive'],
              ['Parasite control', 'Innoworm range — effective deworming'],
              ['Pest control', 'Makkhi — insect and fly protection'],
              ['Fertility & vitamins', 'AYNGROW Bolus, RS 21 — reproductive health'],
            ].map(([title, body]) => (
              <li
                key={title}
                className="flex items-start gap-3 p-5 rounded-2xl bg-neutral-50 border border-neutral-200"
              >
                <span
                  className="mt-2 w-1.5 h-1.5 rounded-full bg-neutral-900 shrink-0"
                />
                <div>
                  <div
                    className="text-sm text-neutral-900 mb-1"
                    style={DISPLAY}
                  >
                    {title}
                  </div>
                  <div className="text-xs text-neutral-500 leading-relaxed">
                    {body}
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <p className="mt-8 text-sm">
            All products manufactured in GMP-certified facilities, with rigorous
            quality testing to ensure safety and efficacy.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------ FAQ section ------------------------------ */
function FAQSection() {
  const faqs = [
    {
      q: 'What are the best lactation supplements for dairy cattle?',
      a: 'Innolact AD3 Gold with chelated minerals, Innolact AD3 for daily supplementation, and Innolact Gel Advance for easy administration. All formulated to boost milk production, improve quality, and support lactating animals.',
    },
    {
      q: 'How to order Innovation Remedies products in bulk?',
      a: 'Contact our sales team through the Contact page or call us directly. Special pricing and support is available for veterinary clinics, dairy farms, and distributors.',
    },
    {
      q: 'Are Innovation Remedies products safe for all types of livestock?',
      a: 'Most products are formulated for a broad range of livestock — cattle, buffaloes, sheep, goats. Applications and dosages are detailed on each product page. Always consult the label or a veterinarian for guidance specific to your animals.',
    },
  ];
  const [open, setOpen] = useState(0);
  return (
    <section
      className="relative bg-neutral-50 py-20 md:py-28 border-t border-neutral-200"
      itemScope
      itemType="https://schema.org/FAQPage"
    >
      <div className="max-w-4xl mx-auto px-6 md:px-10">
        <p className="text-[11px] uppercase text-neutral-500 mb-5" style={MONO}>
          — Frequently asked
        </p>
        <h2
          className="text-3xl md:text-5xl tracking-[-0.03em] leading-[1.05] text-neutral-900 mb-12"
          style={DISPLAY}
        >
          Questions, answered.
        </h2>
        <div className="divide-y divide-neutral-200 border-t border-b border-neutral-200">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <div
                key={i}
                itemScope
                itemProp="mainEntity"
                itemType="https://schema.org/Question"
              >
                <button
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  className="w-full flex items-center justify-between gap-6 py-6 md:py-7 text-left group"
                >
                  <h3
                    className="text-lg md:text-xl tracking-[-0.01em] text-neutral-900"
                    style={DISPLAY}
                    itemProp="name"
                  >
                    {f.q}
                  </h3>
                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.4, ease: EASE_OUT }}
                    className="shrink-0 w-9 h-9 rounded-full border border-neutral-300 flex items-center justify-center group-hover:border-neutral-900 transition-colors"
                  >
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      className="text-neutral-900"
                    >
                      <path
                        d="M6 1v10M1 6h10"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                    </svg>
                  </motion.span>
                </button>
                <motion.div
                  initial={false}
                  animate={{
                    height: isOpen ? 'auto' : 0,
                    opacity: isOpen ? 1 : 0,
                  }}
                  transition={{ duration: 0.4, ease: EASE_OUT }}
                  className="overflow-hidden"
                  itemScope
                  itemProp="acceptedAnswer"
                  itemType="https://schema.org/Answer"
                >
                  <p
                    className="text-sm md:text-base text-neutral-600 leading-relaxed pb-6 md:pb-7 max-w-2xl"
                    itemProp="text"
                  >
                    {f.a}
                  </p>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default ListProducts;