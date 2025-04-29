// src/components/TopSellingSection.jsx (or your preferred path)
import React from 'react';
import { Button } from '@/components/ui/button'; // Adjust path if needed
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
import Calfshakti from '../../../assets/Images/thirteen.png';
import One from '../../../assets/Images/one.png';
import R3 from '../../../assets/Images/R3.png';
import MakkiInjection from '../../../assets/Images/nineteen.png';

const TopSellingSection = () => {
  // Placeholder image data - replace with your actual images
  const products = [
    { id: 1, src: Calfshakti, alt: 'Girl in orange dress jumping', heightClass: 'h-[450px]' },
    { id: 2, src: One, alt: 'Person in yellow hoodie stretching', heightClass: 'h-[550px]' },
    { id: 3, src: R3, alt: 'Hand holding a water bottle', heightClass: 'h-[400px]' },
    { id: 4, src: MakkiInjection, alt: 'Yellow baseball cap', heightClass: 'h-[450px]', hasIcon: true },
  ];

  return (
    <div className="bg-white font-sans py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Top Section: Header, Text, Buttons */}
        <div className="flex flex-col md:flex-row justify-between items-start mb-12">
          {/* Left Side */}
          <div className="mb-8 md:mb-0">
            <Button
              variant="secondary"
              className="bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-full px-4 py-1 text-sm font-medium h-auto mb-4"
            >
              See More product
            </Button>
            <h1 className="text-4xl sm:text-5xl font-bold text-black leading-tight">
              Top-Selling Product <br />
              of the year Collection
            </h1>
          </div>

          {/* Right Side */}
          <div className="flex flex-col items-start md:items-end">
            <p className="text-gray-600 text-sm sm:text-base max-w-xs mb-6 text-left md:text-right">
              We do not divide our collections to seasons we create new models every week, and we in a few items
            </p>
            <div className="flex flex-col items-start md:items-end w-full">
              <Button
                variant="outline"
                className="rounded-full px-6 py-2 border-gray-300 hover:bg-gray-50 text-black mb-4"
              >
                Shop Now
              </Button>
              <div className="flex space-x-2">
                <Button variant="outline" size="icon" className="rounded-full border-gray-300 h-9 w-9">
                  <ArrowLeft className="h-4 w-4 text-gray-600" />
                </Button>
                <Button variant="outline" size="icon" className="rounded-full border-gray-300 h-9 w-9">
                  <ArrowRight className="h-4 w-4 text-gray-600" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section: Product Image Grid */}
        {/* Added overflow-x-auto and padding-bottom for better scrolling experience */}
        <div className="flex space-x-4 md:space-x-6 items-end -mb-8 overflow-x-auto pb-8">
          {products.map((product) => (
            <div
              key={product.id}
              // Add 'group' class here for hover effects on children
              className={`group relative rounded-xl overflow-hidden shadow-md flex-shrink-0 w-[280px] sm:w-[300px] ${product.heightClass} bg-gray-200 cursor-pointer`} // Added cursor-pointer
            >
              <img
                src={product.src}
                alt={product.alt}
                // Add transition to image for potential zoom effect (optional)
                className="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105" // Optional: slight zoom on hover
              />

              {/* --- Hover Overlay & Button --- */}
              {/* Optional: Add a semi-transparent overlay that appears on hover */}
              <div
                className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out"
                aria-hidden="true" // Hide from screen readers
              ></div>

              {/* Shop Now Button - Appears on hover */}
              <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-10 w-[calc(100%-40px)] flex justify-center"> {/* Centering container */}
                 <Button
                    variant="default" // Use primary button style or adjust as needed
                    // Hidden by default, fades in on hover
                    className="opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out transform translate-y-2 group-hover:translate-y-0 px-5 py-2.5 text-sm rounded-lg" // Added subtle translate effect
                 >
                    Shop Now
                 </Button>
              </div>
              {/* --- End Hover Overlay & Button --- */}


              {/* Existing Icon Button (conditionally rendered) */}
              {product.hasIcon && (
                 // Keep this button visible or apply hover effect as needed
                 // Added z-10 to ensure it's above potential overlays
                 <div className="absolute bottom-4 right-4 z-10">
                    <Button
                      variant="secondary"
                      size="icon"
                      className="rounded-full bg-white/70 hover:bg-white/90 backdrop-blur-sm h-10 w-10 shadow-md"
                    >
                      <ArrowUpRight className="h-5 w-5 text-black" />
                    </Button>
                 </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopSellingSection;