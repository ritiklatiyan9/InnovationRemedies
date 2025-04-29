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

// Assuming 'eleven.jpg' is the image for R3-Vet Ultra Bolus
import eleven from '../../assets/Images/eleven.jpg'; // Make sure this path is correct

// --- Placeholder Images (Keep if needed, or remove if not used) ---
// const heroBgImage = '/placeholder-modern-farm-hero.jpg';
// const logoImage = '/your-logo-light.svg';
// const logoDarkImage = '/your-logo-dark.svg';
// const ingredientsVisual = '/placeholder-natural-ingredients.jpg';

// --- Reusable Pill Component (Modernized Variants) ---
const Pill = ({ children, as: Component = 'button', href = '#', variant = 'default', icon: Icon, iconPosition = 'right', className = '', ...props }) => {
    const baseClasses = `inline-flex items-center justify-center gap-1.5 px-4 py-1.5 rounded-full border text-xs font-medium transition-all duration-300 ease-in-out whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-green-500 focus-visible:ring-offset-white dark:focus-visible:ring-offset-slate-900`;
    let variantClasses = '';
    switch (variant) {
        // Primary Actions / Highlights
        case 'highlight': variantClasses = 'bg-green-600 text-white border-transparent hover:bg-green-700 shadow-md hover:shadow-lg transform hover:-translate-y-0.5'; break;
        case 'hero-primary': variantClasses = 'bg-green-600 text-white border-transparent text-sm px-6 py-2.5 hover:bg-green-700 shadow-lg hover:shadow-xl transform hover:-translate-y-1'; break; // Larger CTA
        case 'hero-secondary': variantClasses = 'bg-white/20 backdrop-blur-sm border-white/30 text-white hover:bg-white/30 hover:border-white/40 text-sm px-6 py-2.5 shadow-lg hover:shadow-xl transform hover:-translate-y-1'; break; // Larger CTA

        // Navigation & Info
        case 'nav-link-light': variantClasses = 'bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 hover:border-white/30'; break;
        case 'nav-link-dark': variantClasses = 'bg-transparent border-transparent text-gray-500 hover:text-green-600 hover:bg-green-50 dark:text-gray-400 dark:hover:text-white dark:hover:bg-slate-700'; break;
        case 'feature': variantClasses = 'bg-green-50 text-green-700 border border-green-100 dark:bg-green-900/30 dark:text-green-300 dark:border-green-800/50'; break;
        case 'feature-active': variantClasses = 'bg-green-600 text-white border border-transparent shadow-sm'; break;

        // Card Specific & Dark Variants
        case 'card-tag': variantClasses = 'bg-emerald-100 text-emerald-800 border-transparent font-medium'; break; // Brighter tag for cards
        case 'dark': variantClasses = 'bg-slate-700 border-slate-600 text-slate-300 hover:bg-slate-600 hover:border-slate-500'; break;
        case 'dark-active': variantClasses = 'bg-green-600/80 border-green-500/70 text-white hover:bg-green-600'; break;

        // Utility & Links
        case 'read-more': variantClasses = `border-gray-300 text-gray-600 hover:border-gray-900 hover:text-gray-900 dark:border-slate-600 dark:text-slate-400 dark:hover:border-slate-300 dark:hover:text-slate-200 group`; break;
        case 'icon-only-light': variantClasses = `w-10 h-10 p-0 justify-center bg-white/80 backdrop-blur-sm text-gray-800 border border-transparent hover:bg-white shadow-md rounded-full`; break;
        case 'icon-only-dark': variantClasses = `w-10 h-10 p-0 justify-center bg-slate-700/80 backdrop-blur-sm text-white border border-transparent hover:bg-slate-600 shadow-md rounded-full`; break;

        default: variantClasses = 'bg-white border-gray-300 text-gray-700 hover:border-gray-500 hover:bg-gray-50 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-700 dark:hover:border-slate-600 shadow-sm'; // Default improved
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
  const [isHeaderScrolled, setIsHeaderScrolled] = useState(false);

  // Handle header style on scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsHeaderScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const colors = {
    background: 'bg-white dark:bg-slate-900',
    textPrimary: 'text-slate-900 dark:text-slate-100',
    textSecondary: 'text-slate-600 dark:text-slate-400',
    textHero: 'text-white',
    accent: 'text-green-500',
    cardBgLight: 'bg-white',
    cardBgDark: 'bg-slate-800', // Slightly lighter than main dark bg
  };

  return (
    <div className={`${colors.background} ${colors.textPrimary} font-['Inter',_sans-serif] antialiased`}> {/* Added modern font */}

      {/* Mobile Menu Overlay (Keep or remove based on full page structure) */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-slate-900/95 backdrop-blur-xl z-[49] md:hidden flex flex-col items-center justify-center p-8 space-y-6">
           <a href="#about" className="text-2xl font-medium text-white hover:text-green-400 transition-colors" onClick={() => setIsMobileMenuOpen(false)}>About</a>
           <a href="#tech" className="text-2xl font-medium text-white hover:text-green-400 transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Technology</a>
           <a href="#products" className="text-2xl font-medium text-white hover:text-green-400 transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Products</a>
           <a href="#sustainability" className="text-2xl font-medium text-white hover:text-green-400 transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Sustainability</a>
           <Pill as="a" href="#contact" variant="highlight" className="mt-4" onClick={() => setIsMobileMenuOpen(false)}>
              Contact Us
           </Pill>
           <button
            className="absolute top-5 right-5 p-2 text-slate-400 hover:text-white"
            aria-label="Close menu"
            onClick={() => setIsMobileMenuOpen(false)}
           >
             <X size={28} />
           </button>
        </div>
      )}

      {/* Header (Keep or remove based on full page structure) */}
      {/* Placeholder for Header component - adapt as needed */}
      {/* <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${isHeaderScrolled ? 'bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm shadow-md' : 'bg-transparent'}`}>
         <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <img src={isHeaderScrolled ? logoDarkImage : logoImage} alt="Logo" className="h-8"/>
            <nav className="hidden md:flex items-center gap-1">
              <Pill as="a" href="#about" variant={isHeaderScrolled ? 'nav-link-dark' : 'nav-link-light'}>About</Pill>
              <Pill as="a" href="#tech" variant={isHeaderScrolled ? 'nav-link-dark' : 'nav-link-light'}>Technology</Pill>
              <Pill as="a" href="#products" variant={isHeaderScrolled ? 'nav-link-dark' : 'nav-link-light'}>Products</Pill>
              <Pill as="a" href="#sustainability" variant={isHeaderScrolled ? 'nav-link-dark' : 'nav-link-light'}>Sustainability</Pill>
            </nav>
            <div className="hidden md:block">
               <Pill as="a" href="#contact" variant="highlight">Contact</Pill>
            </div>
            <button className="md:hidden text-white" onClick={() => setIsMobileMenuOpen(true)}>
               <Menu size={24}/>
            </button>
         </div>
      </header> */}

      {/* --- Section: R3-Vet Ultra Bolus Details --- */}
      <section id="r3vet-details" className="py-24 md:py-32 overflow-hidden"> {/* Changed ID for clarity */}
         <div className="container mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 items-center">
          {/* Content Column */}
          <div className="md:col-span-6 lg:col-span-6 order-2 md:order-1">
            <Pill variant="feature-active" className="mb-4">
               आर3-वेट (R3-Vet) अल्ट्रा बोलस (ULTRA BOLUS)
            </Pill>
            <h2 className="text-4xl md:text-5xl font-bold mb-5 leading-tight">
              भूख, ऊर्जा और तंत्रिका स्वास्थ्य के लिए: <span className={colors.accent}>R3-Vet Ultra Bolus</span>
            </h2>
            <div className="flex items-center gap-3 mb-6">
              <span className="text-lg font-semibold">उपलब्ध पैक:</span>
              <span className="text-lg">1 × 1 बोलस</span>
            </div>
            {/* <p className={`${colors.textSecondary} text-lg leading-relaxed mb-8`}>
              R3-Vet Ultra Bolus एक उन्नत फॉर्मूलेशन है जो पशुओं में भूख की कमी, कमजोरी और तंत्रिका संबंधी विकारों को संबोधित करता है, जिससे समग्र स्वास्थ्य और उत्पादकता में सुधार होता है।
            </p> */}

            {/* Composition Section */}
            <h3 className="text-xl font-semibold mb-3">प्रत्येक अनकोटेड बोलस में शामिल है:</h3>
            <div className="space-y-3 mb-6">
                <div className="flex items-start gap-3"> {/* Use items-start for potentially long lines */}
                    <CheckCircle size={20} className="text-green-500 flex-shrink-0 mt-1"/>
                    <span className={colors.textSecondary}>साइप्रोहेप्टाडिन एचसीएल (Cyproheptadine HCl) 25 मि.ग्रा.</span>
                </div>
                <div className="flex items-start gap-3">
                    <CheckCircle size={20} className="text-green-500 flex-shrink-0 mt-1"/>
                    <span className={colors.textSecondary}>लाइव यीस्ट कल्चर (Live Yeast Culture) 4 मि.ग्रा.</span>
                </div>
                <div className="flex items-start gap-3">
                    <CheckCircle size={20} className="text-green-500 flex-shrink-0 mt-1"/>
                    <span className={colors.textSecondary}>लाइव लैक्टोबैसिलस स्पोरोजेन्स (Live Lactobacillus Sporogenes) 40 मिलियन</span>
                </div>
                <div className="flex items-start gap-3">
                    <CheckCircle size={20} className="text-green-500 flex-shrink-0 mt-1"/>
                    <span className={colors.textSecondary}>थायमिन एचसीएल (बी1) (Thiamine HCl (B1)) 250 मि.ग्रा.</span>
                </div>
                <div className="flex items-start gap-3">
                    <CheckCircle size={20} className="text-green-500 flex-shrink-0 mt-1"/>
                    <span className={colors.textSecondary}>पाइरिडॉक्सिन एचसीएल (बी6) (Pyridoxine HCl (B6)) 250 मि.ग्रा.</span>
                </div>
                <div className="flex items-start gap-3">
                    <CheckCircle size={20} className="text-green-500 flex-shrink-0 mt-1"/>
                    <span className={colors.textSecondary}>मेथिलकोबालामिन (Methylcobalamin) 2500 माइक्रोग्राम</span>
                </div>
                <div className="flex items-start gap-3">
                    <CheckCircle size={20} className="text-green-500 flex-shrink-0 mt-1"/>
                    <span className={colors.textSecondary}>अन्य सहायक तत्व (Excipients) q.s.</span>
                </div>
            </div>

            {/* Indications Section */}
            <h3 className="text-xl font-semibold mb-3">R3-Vet Ultra Bolus के संकेत (Indications):</h3>
            <div className="space-y-3 mb-6">
                <div className="flex items-start gap-3">
                    <CheckCircle size={20} className="text-green-500 flex-shrink-0 mt-1"/>
                    <span className={colors.textSecondary}>भूख न लगना (Anorexia)</span>
                </div>
                <div className="flex items-start gap-3">
                    <CheckCircle size={20} className="text-green-500 flex-shrink-0 mt-1"/>
                    <span className={colors.textSecondary}>यकृत विकार (Liver Disorder)</span>
                </div>
                <div className="flex items-start gap-3">
                    <CheckCircle size={20} className="text-green-500 flex-shrink-0 mt-1"/>
                    <span className={colors.textSecondary}>एनीमिया और रोगोपचार अवधि (Anaemia & Convalescence Period)</span>
                </div>
                <div className="flex items-start gap-3">
                    <CheckCircle size={20} className="text-green-500 flex-shrink-0 mt-1"/>
                    <span className={colors.textSecondary}>एंटीबायोटिक/एंथेलमिंटिक थेरेपी के साथ सहायक के रूप में (Adjuvant to antibiotic/anthelmintic therapy)</span>
                </div>
                <div className="flex items-start gap-3">
                    <CheckCircle size={20} className="text-green-500 flex-shrink-0 mt-1"/>
                    <span className={colors.textSecondary}>तंत्रिका विकार (Nervine Disorder)</span>
                </div>
            </div>

            {/* Dosage Section */}
            <h3 className="text-xl font-semibold mb-3">खुराक (Dosage):</h3>
            <div className="space-y-3 mb-8">
                <div className="flex items-start gap-3">
                    <CheckCircle size={20} className="text-green-500 flex-shrink-0 mt-1"/>
                    <span className={colors.textSecondary}>बड़े पशु में (Large Animals): 1 बोलस दिन में दो बार, दो दिन के लिए</span>
                </div>
                <div className="flex items-start gap-3">
                    <CheckCircle size={20} className="text-green-500 flex-shrink-0 mt-1"/>
                    <span className={colors.textSecondary}>छोटे पशु में (Small Animals): 1/2 बोलस दिन में दो बार, दो दिन के लिए</span>
                </div>
            </div>
             <Pill as="a" href="#contact" variant="read-more"> {/* Changed href to #contact assuming it leads to contact info */}
                संपर्क करें
             </Pill>
          </div>
          {/* Image Column */}
          <div className="md:col-span-6 lg:col-span-6 order-1 md:order-2">
             <div className="relative rounded-2xl w-full h-96  overflow-hidden p-2 aspect-square md:aspect-[5/6] shadow-2xl group"> {/* Adjusted aspect ratio */}
                 <img
                    src={eleven} // Use the imported image variable
                    alt="R3-Vet Ultra Bolus veterinary product" // Updated alt text
                    className="w-full h-96 object-cover transition-transform duration-500 ease-in-out group-hover:scale-105" // Ensure h-full
                  />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent flex items-end p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                     {/* Optional: Keep Play button if there's a video link */}
                     {/* <Pill variant="icon-only-light" as="button" className="backdrop-blur-md">
                         <Play size={20} className="ml-0.5" />
                     </Pill> */}
                 </div>
             </div>
          </div>
        </div>
      </section>

      {/* Placeholder for other sections if needed */}
      {/* <section id="about" className="py-16">...</section> */}
      {/* <section id="products" className="py-16">...</section> */}
      {/* <section id="sustainability" className="py-16">...</section> */}
      {/* <footer className="py-8">...</footer> */}

    </div>
  );
}

export default EcoharvestStylePageModern;