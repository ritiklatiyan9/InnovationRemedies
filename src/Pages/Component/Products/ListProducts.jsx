// src/components/ProductListPageRefined.jsx
import React from 'react';
import { Link } from 'react-router-dom'; // <--- Import Link
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
  SlidersHorizontal,
  Vegan,
  Flower2,
  ShoppingCart
} from 'lucide-react';

import R3 from '../../../assets/Images/r3.png'; // Adjusted path assumption

// --- Sample Product Data with STRING SLUGS for ID ---
const products = [
    // Use slugs that match (or will match) keys in ProductDetailPage's data
    { id: 'r3-vet-ultra-bonus', name: 'R3-Vet : Ultra Bonus (60 pcs)', description: 'limited fruity collection', price: 42.00, imageUrl: R3, gradientFrom: '#FFE0E6' }, // Pinkish
    { id: 'mood-pills', name: 'Capsules #Mood Pills (60 pcs)', description: 'limited fruity collection', price: 42.00, imageUrl: '/placeholder-mood.png', gradientFrom: '#F8E0FF' }, // Lavender
    { id: 'uti-dont-think-so', name: "Capsules Uti Don't Think So (60 pcs)", description: 'limited fruity collection', price: 42.00, imageUrl: '/placeholder-uti.png', gradientFrom: '#E6E6FA' }, // Light Purple
    { id: 'bye-bye-bloat', name: 'Capsules Bye Bye Bloat (60 pcs)', description: 'limited fruity collection', price: 42.00, imageUrl: '/placeholder-bloat.png', gradientFrom: '#E0F2FF' }, // Light Blue
    { id: 'good-girl-probiotic', name: 'Capsules Good Girl Probiotic (60 pcs)', description: 'limited fruity collection', price: 42.00, imageUrl: '/placeholder-probiotic.png', gradientFrom: '#D9F7F0' }, // Mint Green
    { id: 'perfect-condition-vitamin', name: 'Capsules Perfect Condition Vita... (60 pcs)', description: 'limited fruity collection', price: 42.00, imageUrl: '/placeholder-vitamin.png', gradientFrom: '#E0F8E0' }, // Light Green
    // Add slugs for the existing detail page products if they should appear here
    { id: 'weight-booster', name: 'WeightBoost: Nutritional Mix', description: 'Nutritional supplement for healthy weight gain.', price: 34.95, imageUrl: '/placeholder-weightboost.png', gradientFrom: '#FFF0E0' }, // Light Orange/Peach (use correct image if available)
    { id: 'wellness-exam', name: 'Proactive Wellness Exams', description: 'Regular checkups for year-round health.', price: 79.95, imageUrl: '/placeholder-wellness.png', gradientFrom: '#E0EFFF' }, // Light Sky Blue (use correct image if available)

    // Added placeholder images for the last two products above, adjust as needed.
    // Make sure the imageUrls are valid or use imported images.
];

// --- Redesigned Product Card Component ---
const DEFAULT_GRADIENT_FROM = '#f0f4f7';

function ProductCard({
  id, // <-- Receive the id (slug)
  name,
  description,
  price,
  imageUrl,
  gradientFrom = DEFAULT_GRADIENT_FROM,
}) {
  const gradientStyle = {
    backgroundImage: `linear-gradient(to bottom, ${gradientFrom}, #F8F9FA)`,
  };

  return (
    // Wrap the Card with Link
    <Link to={`/product/${id}`} className="block w-full h-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 rounded-lg"> {/* Added focus styles */}
      <Card
        className="group w-full overflow-hidden rounded-lg border border-neutral-200 shadow-sm transition-shadow hover:shadow-md flex flex-col h-[450px]"
        style={gradientStyle}
      >
        {/* Image Container */}
        <div
          className="relative aspect-[4/4] md:aspect-[3/4] flex items-center justify-center p-4 sm:p-6 rounded-t-lg overflow-hidden"
        >
          <img
            src={imageUrl}
            alt={name}
            className="object-contain w-full h-full max-h-[200px] sm:max-h-[240px] drop-shadow-md transition-transform duration-300 ease-out group-hover:scale-105"
          />
        </div>

        {/* Content Area */}
        <CardContent className="p-4 flex flex-col flex-grow text-left space-y-2">
          <h3 className="text-base font-semibold text-gray-800 leading-snug truncate" title={name}>
              {name}
          </h3>
          {description && (
            <p className="text-xs text-gray-500 line-clamp-2 flex-grow min-h-[2.5em]">
                {description}
            </p>
          )}
          <p className="text-lg font-bold text-gray-900 pt-1">
            ${price.toFixed(2)}
          </p>
          {/* Button: Prevent click event from bubbling up to the Link */}
          <Button
            variant="default"
            size="sm"
            className="w-full mt-auto bg-white hover:bg-gray-100 text-gray-800 border border-gray-300 shadow-sm"
           
          >
            <ShoppingCart size={16} className="mr-2" />
            Add to Cart
          </Button>
        </CardContent>
      </Card>
    </Link>
  );
}

// --- Animation Variants (Keep as is) ---
const containerVariants = { /* ... */ };
const itemVariants = { /* ... */ };


// --- Main Page Component (No changes needed here other than data source) ---
export function ProductListPageRefined() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 font-sans">
      {/* Top Bar: Filters and Sort */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8 space-y-4 sm:space-y-0">
        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-2 mt-6 justify-center sm:justify-start items-center">
          {/* ... filter buttons ... */}
           <Button variant="outline" size="sm" className="text-xs h-8 border-gray-200 text-gray-600 hover:bg-gray-50">
            <Vegan className="mr-1.5 h-3 w-3" /> VEGANS COLLECTION
          </Button>
          <Button variant="outline" size="sm" className="text-xs h-8 border-gray-200 text-gray-600 hover:bg-gray-50">
            <Flower2 className="mr-1.5 h-3 w-3" /> FLORAL COLLECTION
          </Button>
           <Button variant="outline" size="icon" className="h-8 w-8 border-gray-200 text-gray-600 hover:bg-gray-50">
             <Filter className="h-3.5 w-3.5" />
             <span className="sr-only">Filters</span>
          </Button>
        </div>

        {/* Sort Select Dropdown */}
        <div className="w-full sm:w-auto">
          <Select defaultValue="relevance">
            {/* ... select options ... */}
             <SelectTrigger className="w-full sm:w-[180px] h-9 text-xs border-gray-300 focus:ring-offset-0 focus:ring-transparent focus:border-gray-400 text-gray-600">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="relevance" className="text-xs">SORT BY: RELEVANCE</SelectItem>
              <SelectItem value="price-asc" className="text-xs">SORT BY: PRICE (LOW TO HIGH)</SelectItem>
              <SelectItem value="price-desc" className="text-xs">SORT BY: PRICE (HIGH TO LOW)</SelectItem>
              <SelectItem value="name-asc" className="text-xs">SORT BY: NAME (A-Z)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Product Grid */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {products.map((product) => (
          <motion.div
            key={product.id} // Use the string slug ID as key
            variants={itemVariants}
            className="flex" // Keep using flex if needed for layout within grid cell
          >
            {/* Pass the whole product object, including the new string id */}
            <ProductCard {...product} />
          </motion.div>
        ))}
      </motion.div>

      {/* Pagination */}
      <div className="flex justify-end mt-12 space-x-2">
        {/* ... pagination buttons ... */}
         <Button variant="outline" size="sm" className="text-xs h-8 border-gray-300 text-gray-500 hover:bg-gray-50 rounded-md">Previous</Button>
        <Button variant="outline" size="sm" className="text-xs h-8 border-gray-300 text-gray-500 hover:bg-gray-50 rounded-md">Next</Button>
      </div>
    </div>
  );
}

export default ProductListPageRefined;