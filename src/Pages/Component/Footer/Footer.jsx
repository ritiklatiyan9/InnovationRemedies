// src/components/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import {
  Linkedin,
  Twitter,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Send,
  ArrowRight // For link hover effect
} from 'lucide-react';
import logo from '../../../assets/Images/logo.png'; // Ensure this path is correct

// Assuming Oregon LDO is loaded via CSS @font-face or a global stylesheet
const customFontFamily = "Oregon LDO, sans-serif";

function Footer() {
  const currentYear = new Date().getFullYear();

  const linkStyle = "text-slate-600 hover:text-emerald-700 transition-colors duration-300 group text-sm";
  const iconLinkStyle = "inline-flex items-center " + linkStyle;

  return (
    <footer
      className="bg-slate-100 border-t border-slate-200 text-slate-700"
      style={{ fontFamily: "system-ui, sans-serif" }} // Fallback system font for body
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">

        {/* Top Section: Brand, Tagline, Social */}
        <div className="py-12 md:py-16 text-center md:text-left border-b border-slate-200">
          <div className="md:flex md:items-center md:justify-between">
            <div className="mb-8 md:mb-0">
              <Link to="/" className="inline-block mb-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 rounded-sm">
                <img
                  src={logo}
                  className="h-16 w-auto mx-auto md:mx-0"
                  alt="Innovation Remedies Logo"
                />
              </Link>
              <h2
                className="text-2xl md:text-3xl text-slate-800"
                style={{ fontFamily: customFontFamily, fontWeight: 'normal' }}
              >
                Innovation Remedies Life Science Pvt. Ltd.
              </h2>
              <p className="mt-1 text-sm text-slate-500 max-w-md mx-auto md:mx-0">
                Enhancing animal health through innovative solutions, dedicated to quality and care.
              </p>
            </div>

            <div className="flex justify-center md:justify-start space-x-3">
              {[
               
              ].map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-10 h-10 rounded-lg bg-white hover:bg-emerald-500 text-slate-500 hover:text-white flex items-center justify-center transition-all duration-300 shadow-sm hover:shadow-md border border-slate-200 transform hover:scale-105"
                >
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Middle Section: Links & Contact */}
        <div className="py-10 md:py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          <div>
            <h3
              className="text-lg text-slate-800 mb-4"
              style={{ fontFamily: customFontFamily, fontWeight: 'normal' }}
            >
              Quick Links
            </h3>
            <ul className="space-y-2.5">
              <li><Link to="/about" className={linkStyle}>About Us</Link></li>
              <li><Link to="/products" className={linkStyle}>Our Products</Link></li>
              <li><Link to="/store" className={linkStyle}>Information Hub</Link></li>
              <li><Link to="/contact" className={linkStyle}>Contact</Link></li>
            </ul>
          </div>

          <div>
            <h3
              className="text-lg text-slate-800 mb-4"
              style={{ fontFamily: customFontFamily, fontWeight: 'normal' }}
            >
              Contact Us
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin size={18} className="text-emerald-600 mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-slate-600 leading-relaxed">
                  638/101, Ganga Nagar, Meerut, Uttar Pradesh 250001
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
          <div className="sm:col-span-2 lg:col-span-1 bg-white p-6 rounded-xl shadow-lg border border-emerald-200">
            <h3
              className="text-xl text-emerald-700 mb-3 text-center"
              style={{ fontFamily: customFontFamily, fontWeight: 'normal' }}
            >
              Stay Updated
            </h3>
            <p className="text-sm text-slate-500 mb-4 text-center">
              Get the latest news and special offers directly to your inbox.
            </p>
            <form className="flex flex-col space-y-3">
              <label htmlFor="footer-email-alt" className="sr-only">Email for newsletter</label>
              <input
                id="footer-email-alt"
                type="email"
                required
                placeholder="Enter your email address"
                className="px-4 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 placeholder-slate-400"
              />
              <button
                type="submit"
                className="bg-emerald-600 hover:bg-emerald-700 text-white py-2.5 px-4 rounded-md text-sm font-medium transition-colors duration-300 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 group"
              >
                Subscribe <Send size={16} className="ml-2 transform group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </form>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="py-8 border-t border-slate-200 text-center">
          <p className="text-xs text-slate-500">
            © {currentYear} <Link to="/" className="font-medium text-emerald-700 hover:underline">Innovation Remedies Life Science Pvt. Ltd.</Link>. All Rights Reserved.
          </p>
          <p className="text-xs text-slate-400 mt-1">
            Designed with care.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;