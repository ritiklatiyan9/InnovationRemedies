// src/pages/ProductDetailPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import WeightBoostImage from '../../../assets/Images/one.jpg';
import R3Image from '../../../assets/Images/R3.png';

// --- Sample Images (adjust paths/imports as necessary) ---
const PlaceholderMoodImage = '/placeholder-mood.png';
const PlaceholderUtiImage = '/placeholder-uti.png';
const PlaceholderBloatImage = '/placeholder-bloat.png';
const PlaceholderProbioticImage = '/placeholder-probiotic.png';
const PlaceholderVitaminImage = '/placeholder-vitamin.png';
const PlaceholderWellnessImage = '/placeholder-wellness.png';

// --- Enhanced Colorful Icons ---
import { 
  ArrowLeft, 
  Minus, 
  Plus, 
  ShoppingCart, 
  Star, 
  Heart, 
  Truck, 
  Clock, 
  Award, 
  Shield, 
  Package,
  Leaf,
  Droplet,
  Pill,
  Sparkles,
  BadgeCheck,
  RefreshCw
} from 'lucide-react';

// --- EXPANDED Mock Product Data (Keep as is) ---
const products = {
  'weight-booster': {
    id: 'weight-booster',
    name: 'WeightBoost: Nutritional Mix',
    description: 'A specially formulated nutritional supplement designed to support healthy weight gain, muscle development, and overall vitality in underweight or recovering animals. Contains essential vitamins, minerals, and high-quality protein.',
    price: 34.95,
    imageUrl: WeightBoostImage,
    category: 'Nutritional Supplements',
    rating: 4.7,
    reviews: 85,
    tags: ['Premium', 'Vet Approved', 'Natural'],
    highlights: [
      { icon: 'Award', text: 'Premium Formula' },
      { icon: 'Shield', text: 'Vet Approved' },
      { icon: 'Leaf', text: 'All Natural Ingredients' }
    ]
  },
  'wellness-exam': {
    id: 'wellness-exam',
    name: 'Proactive Wellness Exams',
    description: 'Regular checkups to ensure your pet stays healthy year-round. Our comprehensive wellness exams include vital sign monitoring, physical assessment, and preventative care recommendations tailored to your pet\'s needs.',
    price: 79.95,
    imageUrl: PlaceholderWellnessImage,
    category: 'Veterinary Services',
    rating: 4.9,
    reviews: 120,
    tags: ['Essential', 'Preventative', 'Professional'],
    highlights: [
      { icon: 'Clock', text: '30-45 Minute Session' },
      { icon: 'BadgeCheck', text: 'Professional Assessment' },
      { icon: 'RefreshCw', text: 'Regular Monitoring' }
    ]
  },
  'r3-vet-ultra-bonus': {
    id: 'r3-vet-ultra-bonus',
    name: 'R3-Vet : Ultra Bonus (60 pcs)',
    description: 'Limited fruity collection supplement for pets.',
    price: 42.00,
    imageUrl: R3Image,
    category: 'Supplements',
    rating: 4.5,
    reviews: 30,
    tags: ['Limited Edition', 'Fruity', 'Bonus Size'],
    highlights: [
      { icon: 'Sparkles', text: 'Limited Edition' },
      { icon: 'Package', text: 'Bonus Size (60 pcs)' },
      { icon: 'Pill', text: 'Easy Administration' }
    ]
  },
  'mood-pills': {
    id: 'mood-pills',
    name: 'Capsules #Mood Pills (60 pcs)',
    description: 'Capsules designed to support pet mood.',
    price: 42.00,
    imageUrl: PlaceholderMoodImage,
    category: 'Supplements',
    rating: 4.3,
    reviews: 25,
    tags: ['Mood Support', 'Daily Use', 'Calming'],
    highlights: [
      { icon: 'Heart', text: 'Mood Support' },
      { icon: 'Pill', text: 'Daily Supplement' },
      { icon: 'Droplet', text: 'Easy to Administer' }
    ]
  },
  'uti-dont-think-so': {
    id: 'uti-dont-think-so',
    name: "Capsules Uti Don't Think So (60 pcs)",
    description: 'Capsules for urinary tract health support.',
    price: 42.00,
    imageUrl: PlaceholderUtiImage,
    category: 'Supplements',
    rating: 4.6,
    reviews: 40,
    tags: ['Urinary Health', 'Preventative', 'Support'],
    highlights: [
      { icon: 'Shield', text: 'Urinary Health' },
      { icon: 'Droplet', text: 'Hydration Support' },
      { icon: 'Pill', text: '60 Easy Capsules' }
    ]
  },
  'bye-bye-bloat': {
    id: 'bye-bye-bloat',
    name: 'Capsules Bye Bye Bloat (60 pcs)',
    description: 'Capsules to help reduce bloating.',
    price: 42.00,
    imageUrl: PlaceholderBloatImage,
    category: 'Supplements',
    rating: 4.4,
    reviews: 35,
    tags: ['Digestive Health', 'Comfort', 'Anti-Bloat'],
    highlights: [
      { icon: 'RefreshCw', text: 'Digestive Support' },
      { icon: 'Pill', text: 'Regular Use' },
      { icon: 'Leaf', text: 'Natural Ingredients' }
    ]
  },
  'good-girl-probiotic': {
    id: 'good-girl-probiotic',
    name: 'Capsules Good Girl Probiotic (60 pcs)',
    description: 'Probiotic capsules for gut health.',
    price: 42.00,
    imageUrl: PlaceholderProbioticImage,
    category: 'Supplements',
    rating: 4.8,
    reviews: 55,
    tags: ['Gut Health', 'Probiotic', 'Digestion'],
    highlights: [
      { icon: 'Shield', text: 'Gut Protection' },
      { icon: 'Leaf', text: 'Natural Probiotics' },
      { icon: 'Sparkles', text: 'Improved Digestion' }
    ]
  },
  'perfect-condition-vitamin': {
    id: 'perfect-condition-vitamin',
    name: 'Capsules Perfect Condition Vita... (60 pcs)',
    description: 'Vitamin capsules for overall pet condition.',
    price: 42.00,
    imageUrl: PlaceholderVitaminImage,
    category: 'Supplements',
    rating: 4.7,
    reviews: 48,
    tags: ['Vitamins', 'Overall Health', 'Nutrition'],
    highlights: [
      { icon: 'Award', text: 'Complete Formula' },
      { icon: 'Sparkles', text: 'Coat & Skin Health' },
      { icon: 'BadgeCheck', text: 'Essential Vitamins' }
    ]
  },
};

// Icon component map for dynamic rendering
const IconMap = {
  ArrowLeft: ArrowLeft,
  Minus: Minus,
  Plus: Plus,
  ShoppingCart: ShoppingCart,
  Star: Star,
  Heart: Heart,
  Truck: Truck,
  Clock: Clock,
  Award: Award,
  Shield: Shield,
  Package: Package,
  Leaf: Leaf,
  Droplet: Droplet,
  Pill: Pill,
  Sparkles: Sparkles,
  BadgeCheck: BadgeCheck,
  RefreshCw: RefreshCw
};

// Icon Color Map
const IconColorMap = {
  Heart: "#f87171", // red
  Truck: "#60a5fa", // blue
  Clock: "#a78bfa", // purple
  Award: "#fbbf24", // yellow
  Shield: "#34d399", // emerald
  Package: "#f97316", // orange
  Leaf: "#22c55e", // green
  Droplet: "#38bdf8", // sky blue
  Pill: "#ec4899", // pink
  Sparkles: "#facc15", // yellow
  BadgeCheck: "#10b981", // green
  RefreshCw: "#7c3aed", // purple
  Star: "#f59e0b", // amber
  ShoppingCart: "#3b82f6", // blue
};

// --- Helper to render stars ---
function renderStars(rating) {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
  const stars = [];

  for (let i = 0; i < fullStars; i++) {
    stars.push(<Star key={`full-${i}`} className="w-5 h-5 fill-amber-400 text-amber-400" />);
  }
  if (halfStar) {
    // Custom half-star representation
    stars.push(
      <div key="half" className="relative w-5 h-5">
        <Star className="absolute w-5 h-5 fill-gray-300 text-gray-300" />
        <div className="absolute w-2.5 h-5 overflow-hidden">
          <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
        </div>
      </div>
    );
  }
  for (let i = 0; i < emptyStars; i++) {
    stars.push(<Star key={`empty-${i}`} className="w-5 h-5 fill-gray-300 text-gray-300" />);
  }
  return stars;
}

// Dynamic tag badge component with color variants
function TagBadge({ tag }) {
  // Random color assignment based on tag text for unique visual identity
  const colorVariants = {
    'Premium': 'bg-purple-100 text-purple-800 border-purple-200',
    'Vet Approved': 'bg-green-100 text-green-800 border-green-200',
    'Natural': 'bg-emerald-100 text-emerald-800 border-emerald-200',
    'Limited Edition': 'bg-amber-100 text-amber-800 border-amber-200',
    'Essential': 'bg-blue-100 text-blue-800 border-blue-200',
    'Daily Use': 'bg-cyan-100 text-cyan-800 border-cyan-200',
    'Mood Support': 'bg-pink-100 text-pink-800 border-pink-200',
    'Urinary Health': 'bg-indigo-100 text-indigo-800 border-indigo-200',
    'Digestive Health': 'bg-orange-100 text-orange-800 border-orange-200',
    'Gut Health': 'bg-teal-100 text-teal-800 border-teal-200',
    'Vitamins': 'bg-lime-100 text-lime-800 border-lime-200',
    // Default for any unspecified tags
    'default': 'bg-gray-100 text-gray-800 border-gray-200'
  };

  return (
    <span className={`inline-block px-2.5 py-1 text-xs font-medium rounded-full ${colorVariants[tag] || colorVariants['default']} shadow-sm`}>
      {tag}
    </span>
  );
}

function ProductDetailPage() {
  const { productId } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [wishlist, setWishlist] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedTab, setSelectedTab] = useState('details');

  const product = productId && products[productId] ? products[productId] : null;

  useEffect(() => {
    // Reset active image when product changes
    setActiveImageIndex(0);
    // Reset wishlist when product changes
    setWishlist(false);
    // Scroll to top when product changes
    window.scrollTo(0, 0);
  }, [productId]);

  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-white flex flex-col items-center justify-center p-6">
        <div className="text-red-500 mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 text-center">Product Not Found</h1>
        <p className="text-gray-600 mb-6 text-center max-w-md">We couldn't find a product with the ID: {productId}</p>
        <Button asChild variant="default" className="bg-emerald-600 hover:bg-emerald-700">
          <Link to="/products" className="flex items-center">
            <ArrowLeft className="mr-2 h-4 w-4" /> Browse All Products
          </Link>
        </Button>
      </div>
    );
  }

  const handleQuantityChange = (amount) => {
    setQuantity(prev => Math.max(1, prev + amount));
  };

  const handleInputChange = (e) => {
    const value = parseInt(e.target.value);
    setQuantity(Math.max(1, isNaN(value) ? 1 : value));
  };

  const toggleWishlist = () => {
    setWishlist(!wishlist);
  };

  // --- Enhanced "More Details" Styling ---
  const getMoreDetails = (product) => {
    // Common styling for details sections
    const detailSectionClass = "space-y-3 text-gray-700 text-sm leading-relaxed";
    const detailHeadingClass = "font-semibold text-gray-800";

    switch (product.id) {
      case 'weight-booster':
        return (
          <div className={detailSectionClass}>
            <p><strong className={detailHeadingClass}>Key Ingredients:</strong> High-quality protein blend, essential fatty acids (Omega 3 & 6), Vitamin A, D3, E, B-complex, Calcium, Phosphorus, Digestive Enzymes.</p>
            <p><strong className={detailHeadingClass}>Feeding Instructions:</strong> Mix recommended amount (based on pet's weight) with daily food. Consult vet for specific needs. Always provide fresh water.</p>
            <p><strong className={detailHeadingClass}>Benefits:</strong></p>
            <ul className="list-disc list-inside pl-4 space-y-1">
              <li>Promotes healthy weight gain</li>
              <li>Supports lean muscle mass</li>
              <li>Enhances coat condition</li>
              <li>Boosts energy levels</li>
              <li>Aids digestion</li>
            </ul>
            <p><strong className={detailHeadingClass}>Storage:</strong> Store in a cool, dry place away from direct sunlight.</p>
          </div>
        );
      case 'wellness-exam':
        return (
          <div className={detailSectionClass}>
            <p><strong className={detailHeadingClass}>Service Includes:</strong> Comprehensive physical exam, vital sign monitoring, preventative care consultation, basic health screening, personalized wellness recommendations.</p>
            <p><strong className={detailHeadingClass}>Duration:</strong> Approx. 30-45 minutes.</p>
            <p><strong className={detailHeadingClass}>Benefits:</strong></p>
            <ul className="list-disc list-inside pl-4 space-y-1">
              <li>Early detection of health issues</li>
              <li>Preventative care guidance</li>
              <li>Tailored nutrition & exercise advice</li>
              <li>Peace of mind for owners</li>
            </ul>
            <p><strong className={detailHeadingClass}>Recommendation:</strong> Annually for adults, twice annually for seniors or pets with chronic conditions.</p>
          </div>
        );
      case 'r3-vet-ultra-bonus':
      case 'mood-pills':
      case 'uti-dont-think-so':
      case 'bye-bye-bloat':
      case 'good-girl-probiotic':
      case 'perfect-condition-vitamin':
        return (
          <div className={detailSectionClass}>
            <p><strong className={detailHeadingClass}>Type:</strong> Pet Supplement Capsules ({product.name.includes('60 pcs') ? '60 count' : 'Standard size'}).</p>
            <p><strong className={detailHeadingClass}>Intended Use:</strong> {product.description} Refer to packaging for specifics.</p>
            <p><strong className={detailHeadingClass}>General Instructions:</strong> Follow dosage instructions on packaging or consult your veterinarian. Administer with food if needed.</p>
            <p><strong className={detailHeadingClass}>Storage:</strong> Store in a cool, dry place.</p>
          </div>
        );
      default:
        return <p className="text-gray-500 italic">Detailed information not available for this product.</p>;
    }
  }

  // Get random shipping time between 2-5 days
  const getShippingEstimate = () => {
    const min = 2;
    const max = 5;
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const shippingDays = getShippingEstimate();

  // Dynamic rendering of product highlight icons
  const renderHighlightIcon = (iconName) => {
    const IconComponent = IconMap[iconName];
    const color = IconColorMap[iconName] || "#000000";
    
    if (IconComponent) {
      return (
        <div className="p-2 rounded-full bg-white shadow-md">
          <IconComponent className="h-5 w-5" style={{ color: color }} />
        </div>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50/30 via-blue-50/20 to-white">
      {/* Header with enhanced design */}
      <div className="p-4 px-6 border-b border-gray-200 bg-white/90 backdrop-blur-sm sticky top-0 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Button variant="ghost" asChild className="text-gray-600 hover:text-emerald-600 hover:bg-emerald-50 px-3 py-2 rounded-lg transition-all duration-200">
            <Link to="/products">
              <ArrowLeft className="mr-2 h-4 w-4 text-emerald-600" />
              Back to Products
            </Link>
          </Button>
          {/* Cart Icon with indicator */}
          <div className="relative">
            <Button variant="ghost" className="text-gray-600 hover:text-emerald-600 hover:bg-emerald-50 px-3 py-2 rounded-lg transition-all duration-200">
              <ShoppingCart className="h-5 w-5 text-emerald-600" />
            </Button>
            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-emerald-600 text-xs font-bold text-white">0</span>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto p-6 md:p-8 lg:p-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-12 lg:gap-16">

          {/* Left Side - Enhanced Image Gallery */}
          <div className="space-y-4">
            <Card className="overflow-hidden border border-gray-100 rounded-2xl shadow-md group">
              <div className="relative">
                {/* Featured Image with animation */}
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-auto aspect-[4/3] object-cover transition-all duration-500 ease-in-out group-hover:scale-105"
                />
                
                {/* Wishlist Button */}
                <Button 
                  onClick={toggleWishlist} 
                  variant="ghost" 
                  size="icon" 
                  className={`absolute top-4 right-4 h-10 w-10 rounded-full ${wishlist ? 'bg-red-100' : 'bg-white/80'} backdrop-blur-sm shadow-md hover:scale-110 transition-all duration-300`}
                  aria-label={wishlist ? "Remove from wishlist" : "Add to wishlist"}
                >
                  <Heart 
                    className={`h-5 w-5 ${wishlist ? 'fill-red-500 text-red-500' : 'text-gray-500'}`} 
                  />
                </Button>
              </div>
            </Card>

            {/* Product Tags */}
            <div className="flex flex-wrap gap-2 mt-4">
              {product.tags && product.tags.map((tag, index) => (
                <TagBadge key={index} tag={tag} />
              ))}
            </div>
          </div>

          {/* Right Side - Enhanced Product Details */}
          <div className="flex flex-col pt-4 lg:pt-0 space-y-6">
            {/* Category Badge */}
            <Badge
              variant="outline"
              className="w-fit px-3 py-1 text-sm font-medium text-emerald-700 border-emerald-300 bg-emerald-50/80 shadow-sm"
            >
              {product.category}
            </Badge>

            {/* Product Name */}
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
              {product.name}
            </h1>

            {/* Rating and Reviews */}
            <div className="flex items-center space-x-3">
              <div className="flex items-center">
                {renderStars(product.rating)}
              </div>
              <span className="text-sm font-medium text-amber-600">
                {product.rating.toFixed(1)}
              </span>
              <span className="text-sm text-gray-500 hover:text-gray-700 cursor-pointer">
                ({product.reviews} reviews)
              </span>
            </div>

            {/* Short Description */}
            <p className="text-gray-600 text-base leading-relaxed">
              {product.description}
            </p>

            {/* Product Highlights */}
            <div className="grid grid-cols-3 gap-3 pt-2">
              {product.highlights && product.highlights.map((highlight, index) => (
                <div key={index} className="flex flex-col items-center p-3 rounded-xl bg-gray-50 border border-gray-100 shadow-sm">
                  {renderHighlightIcon(highlight.icon)}
                  <span className="mt-2 text-xs font-medium text-center text-gray-800">{highlight.text}</span>
                </div>
              ))}
            </div>

            {/* Price */}
            <div className="flex items-end space-x-3 pt-2">
              <p className="text-4xl font-extrabold text-gray-900">
                ${product.price.toFixed(2)}
              </p>
              <p className="text-lg text-gray-500 line-through pb-1">${(product.price * 1.2).toFixed(2)}</p>
              <p className="text-sm font-semibold text-emerald-600 pb-1">20% OFF</p>
            </div>

            {/* Shipping Info with Icon */}
            <div className="flex items-center space-x-2 pt-2 text-gray-600">
              <Truck className="h-5 w-5" style={{ color: IconColorMap.Truck }} />
              <span className="text-sm">Free shipping • Delivered in {shippingDays} days</span>
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center space-x-4 pt-3">
              <label htmlFor="quantity" className="text-base font-medium text-gray-800">Quantity:</label>
              <div className="flex items-center rounded-full border border-gray-300 overflow-hidden shadow-sm bg-white">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-10 w-10 rounded-none text-gray-600 hover:bg-gray-100 active:bg-gray-200 disabled:opacity-50"
                  onClick={() => handleQuantityChange(-1)}
                  disabled={quantity <= 1}
                  aria-label="Decrease quantity"
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <Input
                  id="quantity"
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  value={quantity}
                  onChange={handleInputChange}
                  className="h-10 w-14 text-center border-l border-r border-gray-300 focus-visible:ring-1 focus-visible:ring-offset-0 focus:outline-none focus:ring-emerald-500 text-base font-medium"
                  aria-live="polite"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-10 w-10 rounded-none text-gray-600 hover:bg-gray-100 active:bg-gray-200"
                  onClick={() => handleQuantityChange(1)}
                  aria-label="Increase quantity"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Enhanced Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-5">
              <Button 
                size="lg" 
                className="flex-1 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white rounded-full h-auto py-4 text-base font-semibold shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                <ShoppingCart className="mr-2 h-5 w-5 text-white transition-transform group-hover:scale-110" />
                Add to Cart
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="flex-1 rounded-full h-auto py-4 text-base font-semibold border-2 border-emerald-500 text-emerald-600 hover:bg-emerald-50 hover:text-emerald-700 hover:shadow-md active:bg-emerald-100 transition-all duration-200"
              >
                Buy Now
              </Button>
            </div>
          </div>
        </div>

        {/* Tabbed Content Section */}
        <div className="mt-16 md:mt-20 pt-6 border-t border-gray-200">
          <div className="flex border-b border-gray-200 mb-6">
            <button
              onClick={() => setSelectedTab('details')}
              className={`py-3 px-4 font-medium text-sm transition-colors duration-200 ${
                selectedTab === 'details'
                  ? 'text-emerald-600 border-b-2 border-emerald-500'
                  : 'text-gray-600 hover:text-emerald-500'
              }`}
            >
              Product Details
            </button>
            <button
              onClick={() => setSelectedTab('reviews')}
              className={`py-3 px-4 font-medium text-sm transition-colors duration-200 ${
                selectedTab === 'reviews'
                  ? 'text-emerald-600 border-b-2 border-emerald-500'
                  : 'text-gray-600 hover:text-emerald-500'
              }`}
            >
              Reviews ({product.reviews})
            </button>
            <button
              onClick={() => setSelectedTab('shipping')}
              className={`py-3 px-4 font-medium text-sm transition-colors duration-200 ${
                selectedTab === 'shipping'
                  ? 'text-emerald-600 border-b-2 border-emerald-500'
                  : 'text-gray-600 hover:text-emerald-500'
              }`}
            >
              Shipping & Returns
            </button>
          </div>

          {/* Tab Content */}
          <div className="prose prose-sm sm:prose-base max-w-none text-gray-700">
            {selectedTab === 'details' && getMoreDetails(product)}
            {selectedTab === 'reviews' && (
              <div className="flex flex-col space-y-4">
                <p className="text-gray-600">Customer reviews will appear here.</p>
              </div>
            )}
            {selectedTab === 'shipping' && (
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Truck className="h-5 w-5 mt-1" style={{ color: IconColorMap.Truck }} />
                  <div>
                    <h3 className="font-semibold text-gray-800">Free Standard Shipping</h3>
                    <p className="text-gray-600">Orders over $35 qualify for free shipping.</p>
                    <p className="text-gray-600">Estimated delivery: {shippingDays}-{shippingDays + 2} business days</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <RefreshCw className="h-5 w-5 mt-1" style={{ color: IconColorMap.RefreshCw }} />
                  <div>
                    <h3 className="font-semibold text-gray-800">Easy Returns</h3>
                    <p className="text-gray-600">Return unopened items within 30 days for a full refund.</p>
                    <p className="text-gray-600">See our <span className="text-emerald-600 cursor-pointer hover:underline">return policy</span> for more details.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Shield className="h-5 w-5 mt-1" style={{ color: IconColorMap.Shield }} />
                  <div>
                    <h3 className="font-semibold text-gray-800">Satisfaction Guarantee</h3>
                    <p className="text-gray-600">We stand behind our products 100%. Not satisfied? Contact us and we'll make it right.</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Products Section */}
        <div className="mt-16 md:mt-20 pt-10 border-t border-gray-200">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">
            You Might Also Like
          </h2>
          
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Related product cards - show up to 4 products that aren't the current one */}
            {Object.values(products)
              .filter(p => p.id !== product.id)
              .slice(0, 4)
              .map((relatedProduct) => (
                <Link key={relatedProduct.id} to={`/products/${relatedProduct.id}`}>
                  <Card className="overflow-hidden h-full hover:shadow-md transition-shadow duration-300 border border-gray-100">
                    <div className="relative">
                      <img 
                        src={relatedProduct.imageUrl} 
                        alt={relatedProduct.name}
                        className="w-full aspect-square object-cover"
                      />
                      <Badge className="absolute top-2 right-2 bg-emerald-500 text-white border-0">
                        ${relatedProduct.price.toFixed(2)}
                      </Badge>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-medium text-gray-900 truncate">{relatedProduct.name}</h3>
                      <div className="flex items-center mt-1 space-x-1">
                        <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                        <span className="text-sm text-gray-600">
                          {relatedProduct.rating.toFixed(1)} ({relatedProduct.reviews})
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))
            }
          </div>
        </div>

      
      
      </main>

     
    </div>
  );
}

export default ProductDetailPage;