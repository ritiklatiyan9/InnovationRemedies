// src/components/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import {
  Linkedin,
  Twitter,
  Instagram,
  Facebook, // Added for example
  Youtube,  // Added for example
  Mail,
  MapPin,
  Phone,
  Send,
  ArrowRight,
  Sparkles // For "Designed with vibrancy"
} from 'lucide-react';
import logo from '../../../assets/Images/logo.png'; // Ensure this path is correct

// Assuming Oregon LDO is loaded via CSS @font-face or a global stylesheet
const customFontFamily = "Oregon LDO, sans-serif";

function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { href: "https://linkedin.com", label: "LinkedIn", Icon: Linkedin },
    { href: "https://twitter.com", label: "Twitter", Icon: Twitter },
    { href: "https://instagram.com", label: "Instagram", Icon: Instagram },
    { href: "https://facebook.com", label: "Facebook", Icon: Facebook },
    { href: "https://youtube.com", label: "YouTube", Icon: Youtube },
  ];

  const linkStyle = "text-gray-600 hover:text-emerald-600 transition-colors duration-300 group text-sm flex items-center";
  const iconLinkStyle = "inline-flex items-center text-gray-600 hover:text-emerald-600 transition-colors duration-300 text-sm";

  return (
    <footer
      className="bg-gray-50 border-t border-gray-200 text-gray-700" // Lighter background
      style={{ fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif" }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">

        {/* Top Section: Brand, Tagline, Social */}
        <div className="py-12 md:py-16 text-center md:text-left border-b border-gray-200">
          <div className="md:flex md:items-center md:justify-between">
            <div className="mb-10 md:mb-0">
              <Link to="/" className="inline-block mb-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 rounded-sm">
                <img
                  src={logo}
                  className="h-14 sm:h-16 w-auto mx-auto md:mx-0" // Slightly adjusted size
                  alt="Innovation Remedies Logo"
                />
              </Link>
              <h2
                className="text-2xl md:text-3xl text-gray-800 tracking-tight" // Slightly tighter tracking for custom font
                style={{ fontFamily: customFontFamily, fontWeight: 'normal' }}
              >
                Innovation Remedies Life Science Pvt. Ltd.
              </h2>
              <p className="mt-2 text-sm text-gray-500 max-w-md mx-auto md:mx-0">
                Enhancing animal health through innovative solutions, dedicated to quality and care.
              </p>
            </div>

            <div className="flex justify-center md:justify-end space-x-3">
              {socialLinks.map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-10 h-10 rounded-full bg-emerald-50 hover:bg-emerald-100 text-emerald-600 flex items-center justify-center transition-all duration-300 transform hover:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
                >
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Middle Section: Links & Contact */}
        <div className="py-10 md:py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Quick Links */}
          <div className="lg:col-span-1">
            <h3
              className="text-lg text-emerald-700 mb-5" // Branded heading
              style={{ fontFamily: customFontFamily, fontWeight: 'normal' }}
            >
              Explore
            </h3>
            <ul className="space-y-3">
              <li><Link to="/about" className={linkStyle}>About Us <ArrowRight size={14} className="ml-auto opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300 text-emerald-500" /></Link></li>
              <li><Link to="/products" className={linkStyle}>Our Products <ArrowRight size={14} className="ml-auto opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300 text-emerald-500" /></Link></li>
              <li><Link to="/store" className={linkStyle}>Information Hub <ArrowRight size={14} className="ml-auto opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300 text-emerald-500" /></Link></li>
              <li><Link to="/contact" className={linkStyle}>Contact Us <ArrowRight size={14} className="ml-auto opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300 text-emerald-500" /></Link></li>
               <li><Link to="/privacy-policy" className={linkStyle}>Privacy Policy <ArrowRight size={14} className="ml-auto opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300 text-emerald-500" /></Link></li>

            </ul>
          </div>

          {/* Contact Us */}
          <div className="lg:col-span-1">
            <h3
              className="text-lg text-emerald-700 mb-5"
              style={{ fontFamily: customFontFamily, fontWeight: 'normal' }}
            >
              Get In Touch
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin size={18} className="text-emerald-600 mr-3 mt-1 flex-shrink-0" />
                <span className="text-sm text-gray-600 leading-relaxed">
                  B-Block , Baba Colony , Burari , North Delhi - 110084
                </span>
              </li>
              <li>
                <a href="tel:+919412702900" className={iconLinkStyle}>
                  <Phone size={16} className="text-emerald-600 mr-3 flex-shrink-0" />
                  +91 9412702900
                </a>
              </li>
              <li>
                <a href="mailto:innovationremedies@gmail.com" className={iconLinkStyle}>
                  <Mail size={16} className="text-emerald-600 mr-3 flex-shrink-0" />
                  innovationremedies@gmail.com
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter Section - More Prominent */}
          <div className="sm:col-span-2 lg:col-span-2 bg-white p-6 sm:p-8 rounded-xl shadow-lg border border-emerald-100">
            <h3
              className="text-xl text-emerald-700 mb-3 text-center"
              style={{ fontFamily: customFontFamily, fontWeight: 'normal' }}
            >
              Subscribe to Our Newsletter
            </h3>
            <p className="text-sm text-gray-500 mb-5 text-center max-w-sm mx-auto">
              Stay updated with our latest innovations, product launches, and special offers.
            </p>
            <form className="flex flex-col sm:flex-row sm:space-x-2 space-y-3 sm:space-y-0 max-w-md mx-auto">
              <label htmlFor="footer-email-alt" className="sr-only">Email for newsletter</label>
              <input
                id="footer-email-alt"
                type="email"
                required
                placeholder="your.email@example.com"
                className="flex-grow px-4 py-2.5 text-sm bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 placeholder-gray-400"
              />
              <button
                type="submit"
                className="bg-emerald-600 hover:bg-emerald-700 text-white py-2.5 px-5 rounded-md text-sm font-medium transition-colors duration-300 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 group whitespace-nowrap"
              >
                Subscribe <Send size={16} className="ml-2 transform group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </form>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="py-8 border-t border-gray-200 text-center">
          <p className="text-xs text-gray-500">
            © {currentYear} <Link to="/" className="font-medium text-emerald-600 hover:text-emerald-700 hover:underline">Innovation Remedies Life Science Pvt. Ltd.</Link> All Rights Reserved.
          </p>
          <p className="text-xs text-slate-400 mt-1"> <a href="https://wa.me/+919760302690" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline" > Contact Developer </a> &nbsp;| Designed by ByteMatrix </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;