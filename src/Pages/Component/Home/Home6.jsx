// src/components/TopSellingSection.jsx
import React, { useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
import Calfshakti from '../../../assets/Images/seventeen.png';
import One from '../../../assets/Images/one.png';
import R3 from '../../../assets/Images/two.png';
import MakkiInjection from '../../../assets/Images/sixteen.png';

const products = [
  { id: 1, src: Calfshakti, alt: 'Girl in orange dress jumping' },
  { id: 2, src: One, alt: 'Person in yellow hoodie stretching' },
  { id: 3, src: R3, alt: 'Hand holding a water bottle' },
  { id: 4, src: MakkiInjection, alt: 'Yellow baseball cap', hasIcon: true },
];

export default function TopSellingSection() {
  const carouselRef = useRef(null);

  // Auto-scroll every 4s
  useEffect(() => {
    const el = carouselRef.current;
    if (!el) return;
    let idx = 0;
    const max = products.length;
    const scroll = () => {
      idx = (idx + 1) % max;
      const gap = parseInt(getComputedStyle(el).columnGap, 10) || 16;
      const cardWidth = el.children[0].clientWidth + gap;
      el.scrollTo({ left: idx * cardWidth, behavior: 'smooth' });
    };
    const iv = setInterval(scroll, 4000);
    return () => clearInterval(iv);
  }, []);

  return (
    <section className="bg-white text-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <div className="md:flex md:justify-between md:items-center">
          <div>
            <p className="inline-block bg-blue-100 text-blue-600 rounded-full px-3 py-1 text-sm font-medium mb-4">
              New Arrivals
            </p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight">
              Top-Selling Products<br />of the Year
            </h2>
            <p className="mt-4 text-gray-600 max-w-md">
              We release fresh designs every week—no seasons, just the very best.
            </p>
          </div>
          <div className="mt-6 flex flex-col space-y-3 items-stretch sm:flex-row sm:space-y-0 sm:space-x-3 sm:items-center">
            <Button variant="default" className="px-6 py-2.5 rounded-full">
              Shop Now
            </Button>
            <Button variant="outline" className="px-6 py-2.5 rounded-full">
              See All
            </Button>
          </div>
        </div>

        {/* Carousel */}
        <div className="relative">
          {/* Prev/Next controls (hidden on xs) */}
          <button
            onClick={() => {
              const el = carouselRef.current;
              if (el) el.scrollBy({ left: -(el.children[0].clientWidth + 16), behavior: 'smooth' });
            }}
            className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow z-10"
            aria-label="Previous"
          >
            <ArrowLeft className="h-5 w-5 text-gray-700" />
          </button>
          <button
            onClick={() => {
              const el = carouselRef.current;
              if (el) el.scrollBy({ left: el.children[0].clientWidth + 16, behavior: 'smooth' });
            }}
            className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow z-10"
            aria-label="Next"
          >
            <ArrowRight className="h-5 w-5 text-gray-700" />
          </button>

          <div
            ref={carouselRef}
            className="flex overflow-x-auto scroll-smooth snap-x snap-mandatory gap-4 px-2 pb-4 scrollbar-none"
          >
            {products.map((product) => (
              <div
                key={product.id}
                className="
                  relative flex-shrink-0 
                  w-3/4           sm:w-64      md:w-72    lg:w-80
                  h-64           sm:h-80      md:h-[400px]
                  rounded-xl transition-shadow duration-300 snap-start group
                "
              >
                <img
                  src={product.src}
                  alt={product.alt}
                  className="max-w-md h-full object-cover p-4 sm:p-8"
                />

                {/* Icon button */}
                {product.hasIcon && (
                  <Button
                    variant="secondary"
                    size="icon"
                    className="absolute bottom-3 right-3 backdrop-blur-sm"
                  >
                    <ArrowUpRight className="h-5 w-5 text-gray-800" />
                  </Button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
