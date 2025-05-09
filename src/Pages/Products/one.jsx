import React, { useState, useEffect } from 'react';
// Icons from lucide-react
import {
  Menu,
  ChevronDown,
  ArrowRight,
  Play,
  Box,
  Settings2,
  Leaf,
  ChevronRight,
  X, // For mobile menu close
  CheckCircle // Example icon for features
} from 'lucide-react';

import makki from '../../assets/Images/makki.jpg'; // Ensure this path is correct

// --- Placeholder Images (REPLACE THESE!) ---
// const heroBgImage = '/placeholder-modern-farm-hero.jpg';
// const logoImage = '/your-logo-light.svg';
// const logoDarkImage = '/your-logo-dark.svg';
// const ingredientsVisual = '/placeholder-natural-ingredients.jpg';

// --- Reusable Pill Component (Modernized Variants) ---
// This component is already well-structured for responsiveness through its variants.
// No major changes needed here unless specific responsive behavior for the pill itself is required.
const Pill = ({ children, as: Component = 'button', href = '#', variant = 'default', icon: Icon, iconPosition = 'right', className = '', ...props }) => {
    const baseClasses = `inline-flex items-center justify-center gap-1.5 px-4 py-1.5 rounded-full border text-xs font-medium transition-all duration-300 ease-in-out whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-green-500 focus-visible:ring-offset-white dark:focus-visible:ring-offset-slate-900`;
    let variantClasses = '';
    switch (variant) {
        case 'highlight': variantClasses = 'bg-green-600 text-white border-transparent hover:bg-green-700 shadow-md hover:shadow-lg transform hover:-translate-y-0.5'; break;
        case 'hero-primary': variantClasses = 'bg-green-600 text-white border-transparent text-sm px-6 py-2.5 hover:bg-green-700 shadow-lg hover:shadow-xl transform hover:-translate-y-1'; break;
        case 'hero-secondary': variantClasses = 'bg-white/20 backdrop-blur-sm border-white/30 text-white hover:bg-white/30 hover:border-white/40 text-sm px-6 py-2.5 shadow-lg hover:shadow-xl transform hover:-translate-y-1'; break;
        case 'nav-link-light': variantClasses = 'bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 hover:border-white/30'; break;
        case 'nav-link-dark': variantClasses = 'bg-transparent border-transparent text-gray-500 hover:text-green-600 hover:bg-green-50 dark:text-gray-400 dark:hover:text-white dark:hover:bg-slate-700'; break;
        case 'feature': variantClasses = 'bg-green-50 text-green-700 border border-green-100 dark:bg-green-900/30 dark:text-green-300 dark:border-green-800/50'; break;
        case 'feature-active': variantClasses = 'bg-green-600 text-white border border-transparent shadow-sm'; break;
        case 'card-tag': variantClasses = 'bg-emerald-100 text-emerald-800 border-transparent font-medium'; break;
        case 'dark': variantClasses = 'bg-slate-700 border-slate-600 text-slate-300 hover:bg-slate-600 hover:border-slate-500'; break;
        case 'dark-active': variantClasses = 'bg-green-600/80 border-green-500/70 text-white hover:bg-green-600'; break;
        case 'read-more': variantClasses = `border-gray-300 text-gray-600 hover:border-gray-900 hover:text-gray-900 dark:border-slate-600 dark:text-slate-400 dark:hover:border-slate-300 dark:hover:text-slate-200 group`; break;
        case 'icon-only-light': variantClasses = `w-10 h-10 p-0 justify-center bg-white/80 backdrop-blur-sm text-gray-800 border border-transparent hover:bg-white shadow-md rounded-full`; break;
        case 'icon-only-dark': variantClasses = `w-10 h-10 p-0 justify-center bg-slate-700/80 backdrop-blur-sm text-white border border-transparent hover:bg-slate-600 shadow-md rounded-full`; break;
        default: variantClasses = 'bg-white border-gray-300 text-gray-700 hover:border-gray-500 hover:bg-gray-50 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-700 dark:hover:border-slate-600 shadow-sm';
    }
    return (
        <Component href={Component === 'a' ? href : undefined} className={`${baseClasses} ${variantClasses} ${className}`} {...props}>
            {Icon && iconPosition === 'left' && <Icon size={16} className={variant.includes('icon-only') ? '' : '-ml-0.5'} />}
            <span className={variant.includes('icon-only') ? 'sr-only' : ''}>{children}</span>
            {Icon && iconPosition === 'right' && <Icon size={16} className={variant.includes('icon-only') ? '' : '-mr-0.5'} />}
            {variant === 'read-more' && (
                <span className={`ml-2 w-6 h-6 rounded-full bg-gray-100 dark:bg-slate-700 border border-gray-300 dark:border-slate-600 flex items-center justify-center group-hover:bg-green-600 group-hover:text-white group-hover:border-green-600 transition-colors duration-300`}>
                    <ArrowRight size={12} />
                </span>
            )}
        </Component>
    );
};


// --- Main Page Component ---
export function EcoharvestStylePageModern() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  // const [isHeaderScrolled, setIsHeaderScrolled] = useState(false); // Not used in current snippet

  // useEffect(() => {
  //   const handleScroll = () => {
  //     setIsHeaderScrolled(window.scrollY > 50);
  //   };
  //   window.addEventListener('scroll', handleScroll);
  //   return () => window.removeEventListener('scroll', handleScroll);
  // }, []); // This useEffect is not strictly necessary if isHeaderScrolled isn't used for conditional styling in this specific snippet.

  const colors = {
    background: 'bg-white dark:bg-slate-900',
    textPrimary: 'text-slate-900 dark:text-slate-100',
    textSecondary: 'text-slate-600 dark:text-slate-400',
    // textHero: 'text-white', // Not used in current snippet
    accent: 'text-green-500 dark:text-green-400', // Added dark mode for accent
    // cardBgLight: 'bg-white', // Not used in current snippet
    // cardBgDark: 'bg-slate-800', // Not used in current snippet
  };

  return (
    <div className={`${colors.background} ${colors.textPrimary} font-['Inter',_sans-serif] antialiased min-h-screen`}> {/* Ensured Inter font and antialiasing */}

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-slate-900/95 backdrop-blur-xl z-[49] md:hidden flex flex-col items-center justify-center p-6 space-y-5 sm:space-y-6"> {/* Adjusted padding and spacing */}
           <a href="#about" className="text-xl sm:text-2xl font-medium text-white hover:text-green-400 transition-colors" onClick={() => setIsMobileMenuOpen(false)}>About</a>
           <a href="#tech" className="text-xl sm:text-2xl font-medium text-white hover:text-green-400 transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Technology</a>
           <a href="#products" className="text-xl sm:text-2xl font-medium text-white hover:text-green-400 transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Products</a>
           <a href="#sustainability" className="text-xl sm:text-2xl font-medium text-white hover:text-green-400 transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Sustainability</a>
           <Pill as="a" href="#contact" variant="highlight" className="mt-4 text-base sm:text-lg px-6 py-2.5" onClick={() => setIsMobileMenuOpen(false)}> {/* Adjusted Pill size for mobile menu */}
              Contact Us
           </Pill>
           <button
            className="absolute top-4 right-4 sm:top-5 sm:right-5 p-2 text-slate-400 hover:text-white" // Adjusted position
            aria-label="Close menu"
            onClick={() => setIsMobileMenuOpen(false)}
           >
             <X size={24} sm={28} /> {/* Slightly smaller icon for mobile */}
           </button>
        </div>
      )}

      {/* --- Section 2: Technology/Features (Makkhi Example) --- */}
      <section id="tech" className="py-16 sm:py-24 md:py-32 overflow-hidden"> {/* Adjusted vertical padding for different screen sizes */}
         <div className="container mx-auto px-4 sm:px-6 lg:px-8"> {/* Standard container padding */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 sm:gap-12 md:gap-16 items-center"> {/* Adjusted gap for responsiveness */}

              {/* Content Column */}
              <div className="md:col-span-7 lg:col-span-6 order-2 md:order-1 text-center md:text-left"> {/* Centered text on mobile, more span for text on md */}
                <Pill variant="feature-active" className="mb-3 sm:mb-4 inline-block"> {/* Ensured inline-block for centering if text-center is on parent */}
                   Botanical Pest Control
                </Pill>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-5 leading-tight">
                  Advanced Protection, Naturally Derived: <span className={colors.accent}>Makkhi</span>
                </h2>
                <p className={`${colors.textSecondary} text-base sm:text-lg leading-relaxed mb-6 sm:mb-8 max-w-xl mx-auto md:mx-0`}> {/* Max-width for readability, responsive text size */}
                अनुभव करें Makkhi की शक्ति, जिसे उन्नत वनस्पति विज्ञान के साथ विकसित किया गया है।
                हमारा पर्यावरण-अनुकूल मिश्रण मक्खियाँ और टिक जैसे कीटों के खिलाफ मजबूत सुरक्षा प्रदान करता है, पशु कल्याण को प्राथमिकता देते हुए किसी भी कठोर रसायनों से मुक्त है।
                यह प्रभावी, कोमल और टिकाऊ है।
                </p>
                
                <div className="space-y-3 mb-6 sm:mb-8 text-left max-w-md mx-auto md:mx-0"> {/* Centered on mobile, left-aligned on larger. Max-width for feature list. */}
                    <div className="flex items-start sm:items-center gap-2 sm:gap-3">
                        <CheckCircle size={18} sm={20} className="text-green-500 flex-shrink-0 mt-1 sm:mt-0"/>
                        <span className={`${colors.textSecondary} text-sm sm:text-base`}>मक्खियों, टिकों और सामान्य कीटों को दूर भगाता है।</span>
                    </div>
                     <div className="flex items-start sm:items-center gap-2 sm:gap-3">
                        <CheckCircle size={18} sm={20} className="text-green-500 flex-shrink-0 mt-1 sm:mt-0"/>
                        <span className={`${colors.textSecondary} text-sm sm:text-base`}>जानवरों की त्वचा और कोट के लिए गैर-चिढ़ाने वाला और सुरक्षित।</span>
                    </div>
                     <div className="flex items-start sm:items-center gap-2 sm:gap-3">
                        <CheckCircle size={18} sm={20} className="text-green-500 flex-shrink-0 mt-1 sm:mt-0"/>
                        <span className={`${colors.textSecondary} text-sm sm:text-base`}>Eco-friendly and biodegradable ingredients</span>
                    </div>
                </div>
                 <Pill as="a" href="#makkhi-details" variant="read-more" className="text-sm"> {/* Slightly smaller base text for read-more */}
                    Learn more about the science
                 </Pill>
              </div>

              {/* Image Column */}
              <div className="md:col-span-5 lg:col-span-6 order-1 md:order-2"> {/* Less span for image on md, can grow on lg */}
                 {/* Removed fixed h-96, relying on aspect ratio and column width */}
                 <div className="relative rounded-xl sm:rounded-2xl overflow-hidden aspect-square md:aspect-[4/5] lg:aspect-[5/6] shadow-xl sm:shadow-2xl group max-h-[400px] sm:max-h-[500px] md:max-h-none w-full max-w-md mx-auto md:max-w-none"> {/* Responsive aspect ratio, max-h for mobile, max-w for mobile image sizing */}
                     <img
                        src={makki}
                        alt="Makkhi Fly Repellent product"
                        className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
                        loading="lazy" // Added lazy loading
                      />
                     <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-4 sm:p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                         <Pill variant="icon-only-light" as="button" className="backdrop-blur-sm">
                             <Play size={18} sm={20} className="ml-0.5" /> {/* Responsive icon size */}
                         </Pill>
                     </div>
                 </div>
              </div>
            </div>
        </div>
      </section>
    </div>
  );
}

export default EcoharvestStylePageModern;