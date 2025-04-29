// src/components/TopSellingSection.jsx
import React, { useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
import Calfshakti from '../../../assets/Images/thirteen.png';
import One from '../../../assets/Images/one.png';
import R3 from '../../../assets/Images/R3.png';
import MakkiInjection from '../../../assets/Images/nineteen.png';

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
      const cardWidth = el.children[0].clientWidth + parseInt(getComputedStyle(el).columnGap);
      el.scrollTo({ left: idx * cardWidth, behavior: 'smooth' });
    };
    const iv = setInterval(scroll, 4000);
    return () => clearInterval(iv);
  }, []);

  return (
    <section className="bg-white text-gray-900 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <div className="md:flex md:justify-between md:items-center">
          <div>
            <p className="inline-block bg-blue-100 text-blue-600 rounded-full px-3 py-1 text-sm font-medium mb-4">
              New Arrivals
            </p>
            <h2 className="text-4xl font-extrabold leading-tight">
              Top-Selling Products<br />of the Year
            </h2>
            <p className="mt-4 text-gray-600 max-w-md">
              We release fresh designs every week—no seasons, just the very best.
            </p>
          </div>
          <div className="mt-6 md:mt-0 flex space-x-3">
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
          {/* Prev/Next controls */}
          <button
            onClick={() => {
              const el = carouselRef.current;
              if (el) el.scrollBy({ left: -el.children[0].clientWidth - 16, behavior: 'smooth' });
            }}
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow z-10"
            aria-label="Previous"
          >
            <ArrowLeft className="h-5 w-5 text-gray-700" />
          </button>
          <button
            onClick={() => {
              const el = carouselRef.current;
              if (el) el.scrollBy({ left: el.children[0].clientWidth + 16, behavior: 'smooth' });
            }}
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow z-10"
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
                className="relative flex-shrink-0 w-[260px] sm:w-[300px] h-[400px] bg-gray-50 rounded-xl shadow hover:shadow-lg transition-shadow duration-300 snap-start group"
              >
                <img
                  src={product.src}
                  alt={product.alt}
                  className="w-full h-full object-cover rounded-xl p-16"
                />

                {/* Icon button */}
                {product.hasIcon && (
                  <Button
                    variant="secondary"
                    size="icon"
                    className="absolute bottom-3 right-3 bg-white/80 hover:bg-white backdrop-blur-sm"
                  >
                    <ArrowUpRight className="h-5 w-5 text-gray-800" />
                  </Button>
                )}

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />

                {/* Shop Now on hover */}
                <Button
                  variant="default"
                  className="opacity-0 group-hover:opacity-100 transition-all duration-300 absolute bottom-5 left-1/2 -translate-x-1/2 px-5 py-2.5 rounded-lg"
                >
                  Shop Now
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
