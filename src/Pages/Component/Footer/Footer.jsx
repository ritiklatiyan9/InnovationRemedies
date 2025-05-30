import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Linkedin,
  Twitter,
  Instagram,
  Facebook,
  Youtube,
  Mail,
  MapPin,
  Phone,
  Send,
  ArrowRight,
  Heart
} from 'lucide-react';
import logo from '../../../assets/Images/logo.png'; // <<< ENSURE LOGO IS VISIBLE ON LIGHT BG

// Assuming Oregon LDO is loaded via CSS @font-face or a global stylesheet
const customFontFamily = "Oregon LDO, sans-serif";
const baseFontFamily = "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif";

function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { href: "https://linkedin.com", label: "LinkedIn", Icon: Linkedin },
    { href: "https://twitter.com", label: "Twitter", Icon: Twitter },
    { href: "https://instagram.com", label: "Instagram", Icon: Instagram },
    { href: "https://facebook.com", label: "Facebook", Icon: Facebook },
    { href: "https://youtube.com", label: "YouTube", Icon: Youtube },
  ];

  // Adjusted styles for light theme
  const linkStyle = "text-slate-600 hover:text-cyan-600 transition-colors duration-300 group text-base flex items-center font-medium";
  const iconLinkStyle = "inline-flex items-center text-slate-600 hover:text-cyan-600 transition-colors duration-300 text-base font-medium";

  const socialIconVariants = {
    hover: {
      scale: 1.15,
      rotate: 8,
      backgroundColor: "rgba(100, 220, 240, 0.15)", // Lighter cyan tint
      borderColor: "rgba(6, 182, 212, 0.7)", // Cyan border
      transition: { type: 'spring', stiffness: 300 },
    },
    tap: {
      scale: 0.95,
    }
  };

  return (
    <footer
      className="relative overflow-hidden text-slate-700 border-t border-slate-200 bg-white" // Main light background
      style={{ fontFamily: baseFontFamily }}
    >
      {/* Light Themed Gradient Background Overlay - very subtle */}
      <div className="absolute inset-0 opacity-10 ">
        <div className="absolute inset-0 bg-gradient-to-br from-sky-100/50 via-pink-100/50 to-blue-100/50"></div>
      </div>
      
      {/* Decorative gradient orbs - adjusted for light theme */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-teal-300/20 via-cyan-300/15 to-transparent rounded-full blur-3xl animate-pulse-slow opacity-70"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-br from-purple-300/20 via-indigo-300/15 to-transparent rounded-full blur-3xl animate-pulse-slower opacity-60"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-br from-sky-400/20 to-transparent rounded-full blur-3xl opacity-50 animate-pulse-slowest"></div>

      <div className="container mx-auto px-6 sm:px-8 lg:px-12 relative z-10">

        {/* Top Section: Brand, Tagline, Social */}
        <div className="py-16 md:py-20 text-center md:text-left border-b border-slate-200/70">
          <div className="md:flex md:items-center md:justify-between">
            <div className="mb-12 md:mb-0">
              <Link to="/" className="inline-block mb-6 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 rounded-sm">
                <motion.img
                  src={logo}
                  className="h-16 sm:h-20 w-auto mx-auto md:mx-0 filter drop-shadow-[0_2px_3px_rgba(0,150,200,0.15)]" // Subtle shadow for light bg
                  alt="Innovation Remedies Logo"
                  whileHover={{ scale: 1.05, filter: "drop-shadow(0 3px 5px rgba(0,180,220,0.2))" }}
                  transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                />
              </Link>
              <h2
                className="text-3xl md:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-teal-500 via-cyan-600 to-sky-600 tracking-tight mb-3"
                style={{ fontFamily: customFontFamily, fontWeight: 'normal' }}
              >
                Innovation Remedies Life Science Pvt. Ltd.
              </h2>
              <p className="mt-3 text-lg text-slate-600 max-w-md mx-auto md:mx-0 font-medium">
                Enhancing animal health through innovative solutions
              </p>
            </div>

            <div className="flex justify-center md:justify-end space-x-3 sm:space-x-4">
              {socialLinks.map(({ href, label, Icon }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/80 text-cyan-600 flex items-center justify-center transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 shadow-lg backdrop-blur-sm border border-slate-300 hover:border-cyan-500"
                  variants={socialIconVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  <Icon size={20} strokeWidth={1.75} />
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* Middle Section: Links & Contact */}
        <div className="py-14 md:py-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 xl:gap-16">
          {/* Quick Links */}
          <div className="lg:col-span-1">
            <h3
              className="text-xl text-cyan-600 mb-6 font-semibold"
              style={{ fontFamily: customFontFamily }}
            >
              Explore
            </h3>
            <ul className="space-y-4">
              <li><Link to="/about" className={linkStyle}>About Us <ArrowRight size={18} className="ml-auto opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300 text-cyan-500" /></Link></li>
              <li><Link to="/products" className={linkStyle}>Our Products <ArrowRight size={18} className="ml-auto opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300 text-cyan-500" /></Link></li>
              <li><Link to="/store" className={linkStyle}>Information Hub <ArrowRight size={18} className="ml-auto opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300 text-cyan-500" /></Link></li>
              <li><Link to="/contact" className={linkStyle}>Contact Us <ArrowRight size={18} className="ml-auto opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300 text-cyan-500" /></Link></li>
              <li><Link to="/privacy-policy" className={linkStyle}>Privacy Policy <ArrowRight size={18} className="ml-auto opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300 text-cyan-500" /></Link></li>
            </ul>
          </div>

          {/* Contact Us */}
          <div className="lg:col-span-1">
            <h3
              className="text-xl text-cyan-600 mb-6 font-semibold"
              style={{ fontFamily: customFontFamily }}
            >
              Get In Touch
            </h3>
            <ul className="space-y-5">
              <li className="flex items-start">
                <MapPin size={22} className="text-cyan-500 mr-3 mt-1 flex-shrink-0" />
                <span className="text-base text-slate-600 leading-relaxed">
                  B-Block, Baba Colony, Burari, North Delhi - 110084
                </span>
              </li>
              <li>
                <a href="tel:+919412702900" className={iconLinkStyle}>
                  <Phone size={20} className="text-cyan-500 mr-3 flex-shrink-0" />
                  +91 9412702900
                </a>
              </li>
              <li>
                <a href="mailto:innovationremedies@gmail.com" className={iconLinkStyle}>
                  <Mail size={20} className="text-cyan-500 mr-3 flex-shrink-0" />
                  innovationremedies@gmail.com
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter Section - More Prominent */}
          <div className="sm:col-span-2 lg:col-span-2 bg-gradient-to-br from-sky-50/70 via-teal-50/50 to-purple-50/50 backdrop-blur-md p-8 sm:p-10 rounded-2xl shadow-xl border border-sky-200/80 ring-1 ring-sky-200/50">
            <h3
              className="text-2xl text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-cyan-600 mb-4 text-center font-semibold"
              style={{ fontFamily: customFontFamily }}
            >
              Subscribe to Our Newsletter
            </h3>
            <p className="text-base text-slate-500 mb-6 text-center max-w-lg mx-auto">
              Stay updated with our latest innovations, product launches, and special offers.
            </p>
            <form className="flex flex-col sm:flex-row sm:space-x-3 space-y-4 sm:space-y-0 max-w-lg mx-auto">
              <label htmlFor="footer-email-alt" className="sr-only">Email for newsletter</label>
              <motion.input
                id="footer-email-alt"
                type="email"
                required
                placeholder="your.email@example.com"
                className="flex-grow px-5 py-3.5 text-base bg-white/80 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all duration-200 placeholder-slate-400 text-slate-800 shadow-md backdrop-blur-sm"
                whileFocus={{ scale: 1.02, boxShadow: "0 0 0 2px rgba(34, 211, 238, 0.3)" }} // Lighter cyan focus shadow
              />
              <motion.button
                type="submit"
                className="bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 text-white py-3.5 px-6 rounded-lg text-base font-semibold transition-all duration-300 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-sky-50 focus:ring-cyan-500 group shadow-lg whitespace-nowrap"
                whileHover={{ scale: 1.03, boxShadow: "0px 8px 20px rgba(20, 184, 166, 0.25)" }} // Lighter Teal/Cyan shadow
                whileTap={{ scale: 0.98 }}
              >
                Subscribe <Send size={18} className="ml-2 transform group-hover:translate-x-1 transition-transform duration-300" />
              </motion.button>
            </form>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="py-10 border-t border-slate-200/70 text-center">
          <p className="text-base text-slate-500">
            © {currentYear} <Link to="/" className="font-medium text-cyan-600 hover:text-cyan-700 hover:underline">Innovation Remedies Life Science Pvt. Ltd.</Link> All Rights Reserved.
          </p>
          <p className="text-sm text-slate-400 mt-3 flex items-center justify-center">
            <a href="https://wa.me/+919760302690" target="_blank" rel="noopener noreferrer" className="text-cyan-600 hover:text-cyan-700 hover:underline flex items-center">
              Made with <Heart size={16} className="mx-1.5 text-rose-500 inline" fill="currentColor" /> by ByteMatrix
            </a>
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes gradient-shift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animated-gradient {
          background-size: 200% 200%;
          animation: gradient-shift 15s ease infinite;
        }

        /* Subtle pulse animations for orbs */
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.7; transform: scale(1); } /* Adjusted opacity for light theme */
          50% { opacity: 0.5; transform: scale(1.05); }
        }
        .animate-pulse-slow {
          animation: pulse-slow 12s infinite ease-in-out;
        }
        @keyframes pulse-slower {
          0%, 100% { opacity: 0.6; transform: scale(1); } /* Adjusted opacity */
          50% { opacity: 0.4; transform: scale(1.03); }
        }
        .animate-pulse-slower {
          animation: pulse-slower 15s infinite ease-in-out;
        }
        @keyframes pulse-slowest {
          0%, 100% { opacity: 0.5; transform: scale(1); } /* Adjusted opacity */
          50% { opacity: 0.35; transform: scale(1.02); }
        }
        .animate-pulse-slowest {
          animation: pulse-slowest 18s infinite ease-in-out;
        }
      `}</style>
    </footer>
  );
}

export default Footer;