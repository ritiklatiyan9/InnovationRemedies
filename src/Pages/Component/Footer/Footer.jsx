// src/components/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion'; // Import motion
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
import logo from '../../../assets/Images/logo.png'; // Ensure this path is correct

// Assuming Oregon LDO is loaded via CSS @font-face or a global stylesheet
const customFontFamily = "Oregon LDO, sans-serif";
// Base font for general text, good for readability
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

  const linkStyle = "text-gray-600 hover:text-emerald-600 transition-colors duration-300 group text-base flex items-center font-medium";
  const iconLinkStyle = "inline-flex items-center text-gray-600 hover:text-emerald-600 transition-colors duration-300 text-base font-medium";

  const socialIconVariants = {
    hover: {
      scale: 1.15,
      rotate: 5,
      transition: { type: 'spring', stiffness: 300 },
    },
    tap: {
      scale: 0.95,
    }
  };

  return (
    <footer
      className="animated-gradient-background text-gray-700 border-t-2 border-emerald-200/70" // Apply animated gradient and subtle top border
      style={{ fontFamily: baseFontFamily }} // Base font for the footer
    >
      <div className="container mx-auto px-6 sm:px-8 lg:px-12">

        {/* Top Section: Brand, Tagline, Social */}
        <div className="py-16 md:py-20 text-center md:text-left border-b border-gray-200/80">
          <div className="md:flex md:items-center md:justify-between">
            <div className="mb-12 md:mb-0">
              <Link to="/" className="inline-block mb-6 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 rounded-sm">
                <motion.img
                  src={logo}
                  className="h-20 sm:h-24 w-auto mx-auto md:mx-0"
                  alt="Innovation Remedies Logo"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                />
              </Link>
              <h2
                className="text-3xl md:text-4xl text-emerald-700 tracking-tight mb-3"
                style={{ fontFamily: customFontFamily, fontWeight: 'normal' }}
              >
                Innovation Remedies Life Science Pvt. Ltd.
              </h2>
              <p className="mt-3 text-lg text-emerald-600/90 max-w-md mx-auto md:mx-0 font-medium">
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
                  className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/70 hover:bg-emerald-50 text-emerald-600 flex items-center justify-center transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 shadow-md backdrop-blur-sm"
                  variants={socialIconVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  <Icon size={22} strokeWidth={1.75} />
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
              className="text-xl text-emerald-700 mb-6 font-semibold"
              style={{ fontFamily: customFontFamily }}
            >
              Explore
            </h3>
            <ul className="space-y-4">
              <li><Link to="/about" className={linkStyle}>About Us <ArrowRight size={18} className="ml-auto opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300 text-emerald-500" /></Link></li>
              <li><Link to="/products" className={linkStyle}>Our Products <ArrowRight size={18} className="ml-auto opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300 text-emerald-500" /></Link></li>
              <li><Link to="/store" className={linkStyle}>Information Hub <ArrowRight size={18} className="ml-auto opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300 text-emerald-500" /></Link></li>
              <li><Link to="/contact" className={linkStyle}>Contact Us <ArrowRight size={18} className="ml-auto opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300 text-emerald-500" /></Link></li>
              <li><Link to="/privacy-policy" className={linkStyle}>Privacy Policy <ArrowRight size={18} className="ml-auto opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300 text-emerald-500" /></Link></li>
            </ul>
          </div>

          {/* Contact Us */}
          <div className="lg:col-span-1">
            <h3
              className="text-xl text-emerald-700 mb-6 font-semibold"
              style={{ fontFamily: customFontFamily }}
            >
              Get In Touch
            </h3>
            <ul className="space-y-5">
              <li className="flex items-start">
                <MapPin size={22} className="text-emerald-600 mr-3 mt-1 flex-shrink-0" />
                <span className="text-base text-gray-600 leading-relaxed">
                  B-Block, Baba Colony, Burari, North Delhi - 110084
                </span>
              </li>
              <li>
                <a href="tel:+919412702900" className={iconLinkStyle}>
                  <Phone size={20} className="text-emerald-600 mr-3 flex-shrink-0" />
                  +91 9412702900
                </a>
              </li>
              <li>
                <a href="mailto:innovationremedies@gmail.com" className={iconLinkStyle}>
                  <Mail size={20} className="text-emerald-600 mr-3 flex-shrink-0" />
                  innovationremedies@gmail.com
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter Section - More Prominent */}
          <div className="sm:col-span-2 lg:col-span-2 bg-white/80 backdrop-blur-md p-8 sm:p-10 rounded-2xl shadow-xl border border-emerald-200/60">
            <h3
              className="text-2xl text-emerald-700 mb-4 text-center font-semibold"
              style={{ fontFamily: customFontFamily }}
            >
              Subscribe to Our Newsletter
            </h3>
            <p className="text-base text-gray-500 mb-6 text-center max-w-lg mx-auto">
              Stay updated with our latest innovations, product launches, and special offers.
            </p>
            <form className="flex flex-col sm:flex-row sm:space-x-3 space-y-4 sm:space-y-0 max-w-lg mx-auto">
              <label htmlFor="footer-email-alt" className="sr-only">Email for newsletter</label>
              <motion.input
                id="footer-email-alt"
                type="email"
                required
                placeholder="your.email@example.com"
                className="flex-grow px-5 py-3.5 text-base bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 placeholder-gray-400 shadow-sm"
                whileFocus={{ scale: 1.02 }}
              />
              <motion.button
                type="submit"
                className="bg-emerald-600 hover:bg-emerald-700 text-white py-3.5 px-6 rounded-lg text-base font-medium transition-colors duration-300 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 group shadow-lg whitespace-nowrap"
                whileHover={{ scale: 1.03, boxShadow: "0px 5px 15px rgba(16, 185, 129, 0.4)" }}
                whileTap={{ scale: 0.98 }}
              >
                Subscribe <Send size={18} className="ml-2 transform group-hover:translate-x-1 transition-transform duration-300" />
              </motion.button>
            </form>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="py-10 border-t border-gray-200/80 text-center">
          <p className="text-base text-gray-600">
            © {currentYear} <Link to="/" className="font-medium text-emerald-600 hover:text-emerald-700 hover:underline">Innovation Remedies Life Science Pvt. Ltd.</Link> All Rights Reserved.
          </p>
          <p className="text-sm text-slate-500 mt-3 flex items-center justify-center">
            <a href="https://wa.me/+919760302690" target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:text-emerald-700 hover:underline flex items-center">
              Made with <Heart size={16} className="mx-1 text-rose-500 inline" fill="currentColor" /> by ByteMatrix
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;