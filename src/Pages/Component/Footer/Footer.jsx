// src/components/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom'; // Or use <a> tags if not using React Router
import { Linkedin, Twitter, Instagram, Mail, MapPin, Phone } from 'lucide-react';
import logo from '../../../assets/Images/logo.png'; // Adjust the path to your logo image

// If you have a logo, uncomment and adjust the path
// import Logo from '../assets/images/innovation-remedies-logo.png';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-b from-white to-gray-50 border-t border-gray-100">
      <div className="container mx-auto px-6 py-16"> {/* Increased vertical padding */}
        {/* Top Section with main content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 mb-12"> {/* Increased gap and bottom margin */}

          {/* Brand Column */}
          <div className="flex flex-col">
            <div className="mb-6"> {/* Increased bottom margin */}
              {/* Logo Placeholder */}
              {/* <img src={Logo} alt="Innovation Remedies" className="h-12 w-auto mb-4" /> */}
              <h3 className="text-2xl font-bold mb-4"> {/* Larger heading */}
                <img src={logo} className="h-24 w-auto mb-4" alt="" />
                <span className="bg-gradient-to-r from-purple-600 via-blue-500 to-emerald-500 bg-clip-text text-transparent">
                  Innovation Remedies
                </span>
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed max-w-xs"> {/* Added max-width */}
                Dedicated to enhancing animal health and wellbeing through innovative products and solutions.
              </p>
            </div>

            {/* Social Media Icons */}
            <div className="flex space-x-3"> {/* Slightly reduced space for visual density */}
              <a
                href="#" // Replace with actual LinkedIn URL
                aria-label="LinkedIn"
                className="w-9 h-9 rounded-full bg-gray-100 hover:bg-emerald-50 flex items-center justify-center text-gray-500 hover:text-emerald-600 transition-all duration-200 ease-in-out"
              >
                <Linkedin size={18} /> {/* Slightly larger icon */}
              </a>
              <a
                href="#" // Replace with actual Twitter URL
                aria-label="Twitter"
                className="w-9 h-9 rounded-full bg-gray-100 hover:bg-emerald-50 flex items-center justify-center text-gray-500 hover:text-emerald-600 transition-all duration-200 ease-in-out"
              >
                <Twitter size={18} />
              </a>
              <a
                href="#" // Replace with actual Instagram URL
                aria-label="Instagram"
                className="w-9 h-9 rounded-full bg-gray-100 hover:bg-emerald-50 flex items-center justify-center text-gray-500 hover:text-emerald-600 transition-all duration-200 ease-in-out"
              >
                <Instagram size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links Column */}
          <div>
            <h4 className="text-base font-semibold text-gray-900 mb-5">Quick Links</h4> {/* Darker heading, increased margin */}
            <ul className="space-y-2.5"> {/* Slightly increased spacing */}
              <li>
                <Link to="/about" className="text-gray-600 hover:text-emerald-600 transition-colors duration-200 ease-in-out text-sm flex items-center group">
                  <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full mr-2.5 transition-transform duration-200 ease-in-out group-hover:translate-x-0.5"></span> {/* Subtle hover effect */}
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-gray-600 hover:text-emerald-600 transition-colors duration-200 ease-in-out text-sm flex items-center group">
                  <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full mr-2.5 transition-transform duration-200 ease-in-out group-hover:translate-x-0.5"></span>
                  Our Products
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-600 hover:text-emerald-600 transition-colors duration-200 ease-in-out text-sm flex items-center group">
                  <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full mr-2.5 transition-transform duration-200 ease-in-out group-hover:translate-x-0.5"></span>
                  Services
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-gray-600 hover:text-emerald-600 transition-colors duration-200 ease-in-out text-sm flex items-center group">
                  <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full mr-2.5 transition-transform duration-200 ease-in-out group-hover:translate-x-0.5"></span>
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/careers" className="text-gray-600 hover:text-emerald-600 transition-colors duration-200 ease-in-out text-sm flex items-center group">
                  <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full mr-2.5 transition-transform duration-200 ease-in-out group-hover:translate-x-0.5"></span>
                  Careers
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Column */}
          <div>
            <h4 className="text-base font-semibold text-gray-900 mb-5">Legal</h4>
            <ul className="space-y-2.5">
              <li>
                <Link to="/privacy" className="text-gray-600 hover:text-emerald-600 transition-colors duration-200 ease-in-out text-sm flex items-center group">
                  <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-2.5 transition-transform duration-200 ease-in-out group-hover:translate-x-0.5"></span>
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-600 hover:text-emerald-600 transition-colors duration-200 ease-in-out text-sm flex items-center group">
                  <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-2.5 transition-transform duration-200 ease-in-out group-hover:translate-x-0.5"></span>
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/disclaimer" className="text-gray-600 hover:text-emerald-600 transition-colors duration-200 ease-in-out text-sm flex items-center group">
                  <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-2.5 transition-transform duration-200 ease-in-out group-hover:translate-x-0.5"></span>
                  Disclaimer
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-600 hover:text-emerald-600 transition-colors duration-200 ease-in-out text-sm flex items-center group">
                  <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-2.5 transition-transform duration-200 ease-in-out group-hover:translate-x-0.5"></span>
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h4 className="text-base font-semibold text-gray-900 mb-5">Contact Us</h4>
            <ul className="space-y-3.5"> {/* Slightly increased spacing */}
              <li className="flex items-start">
                <MapPin size={18} className="text-emerald-500 mt-0.5 mr-2.5 flex-shrink-0" /> {/* Increased icon size and margin */}
                <span className="text-gray-600 text-sm leading-snug"> {/* Added leading-snug for tight lines */}
                  Sharadhapuri Phase 1  , <br/>Near Kankar Khera Bypass , Meerut
                </span>
              </li>
              <li className="flex items-center">
                <Phone size={18} className="text-emerald-500 mr-2.5 flex-shrink-0" />
                <a href="tel:+15551234567" className="text-gray-600 hover:text-emerald-600 transition-colors duration-200 ease-in-out text-sm">
                  +1 (555) 123-4567
                </a>
              </li>
              <li className="flex items-center">
                <Mail size={18} className="text-emerald-500 mr-2.5 flex-shrink-0" />
                <a href="mailto:info@innovationremedies.com" className="text-gray-600 hover:text-emerald-600 transition-colors duration-200 ease-in-out text-sm break-all"> {/* Added break-all for long emails */}
                  info@innovationremedies.com
                </a>
              </li>
            </ul>

            {/* Newsletter Signup - Optional */}
            <div className="mt-8"> {/* Increased top margin */}
              <h5 className="text-sm font-medium text-gray-800 mb-2">Subscribe to our newsletter</h5>
              <form className="flex mt-2">
                <label htmlFor="footer-email" className="sr-only">Email address</label> {/* Accessibility */}
                <input
                  id="footer-email"
                  type="email"
                  required // Basic validation
                  placeholder="Your email address"
                  className="px-3 py-2 text-sm bg-white border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-emerald-400 focus:border-emerald-400 flex-grow placeholder-gray-400 transition-shadow duration-200 ease-in-out" // Added placeholder color, improved focus
                />
                <button
                  type="submit"
                  className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 text-sm font-medium rounded-r-md transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-emerald-500" // Improved focus, added font-medium
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 pt-8"> {/* Increased padding top */}
          <div className="flex flex-col md:flex-row justify-between items-center">
            {/* Copyright */}
            <p className="text-sm text-gray-500 text-center md:text-left mb-4 md:mb-0">
              © {currentYear} <span className="font-medium text-gray-700">Innovation Remedies</span>. All rights reserved.
            </p>

            {/* Optional: Keep or remove based on need */}
           
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;