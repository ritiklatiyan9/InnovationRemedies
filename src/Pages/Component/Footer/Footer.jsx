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
  Info,        // Icon for About Us
  Package,     // Icon for Products
  Cog,         // Icon for Services
  Shield,      // Icon for Privacy
  FileText,    // Icon for Terms
  HelpCircle,  // Icon for FAQ
  Send         // Icon for Newsletter button
} from 'lucide-react';
import logo from '../../../assets/Images/logo.png'; // Ensure this path is correct
const customStyle2 = {
  fontFamily: "Oregon LDO, sans-serif",
  fontWeight: "200",
};

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer 
      style={customStyle2} // Apply custom font style
      className="bg-slate-50 border-t border-slate-200 pt-16 pb-12" // Lighter bg, more padding
    >
      <div className="container mx-auto px-6">
        {/* Main content */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-10 mb-12"> {/* Added lg:grid-cols-4 for flexibility */}

          {/* Brand & Social Column */}
          <div className="lg:col-span-1"> {/* Adjusted span */}
            <img 
              src={logo} 
              className="h-14 w-auto mb-4" // Slightly smaller logo
              alt="Innovation Remedies" 
            />
            <h3 className="text-lg font-semibold mb-2 text-slate-800">
              Innovation Remedies
            </h3>
            <p className="text-slate-600 text-sm mb-5">
              Enhancing animal health through innovative solutions.
            </p>
            {/* Social Media Icons */}
            <div className="flex space-x-3">
              <a
                href="#" // Replace with actual links
                aria-label="LinkedIn"
                className="w-9 h-9 rounded-full bg-slate-100 hover:bg-emerald-100 flex items-center justify-center text-slate-500 hover:text-emerald-600 transition-all duration-300 transform hover:scale-110"
              >
                <Linkedin size={18} />
              </a>
              <a
                href="#" // Replace with actual links
                aria-label="Twitter"
                className="w-9 h-9 rounded-full bg-slate-100 hover:bg-emerald-100 flex items-center justify-center text-slate-500 hover:text-emerald-600 transition-all duration-300 transform hover:scale-110"
              >
                <Twitter size={18} />
              </a>
              <a
                href="#" // Replace with actual links
                aria-label="Instagram"
                className="w-9 h-9 rounded-full bg-slate-100 hover:bg-emerald-100 flex items-center justify-center text-slate-500 hover:text-emerald-600 transition-all duration-300 transform hover:scale-110"
              >
                <Instagram size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="lg:col-span-1"> {/* Adjusted span */}
            <h4 className="text-base font-semibold text-slate-800 mb-4">Explore</h4>
            <ul className="space-y-2.5">
              <li>
                <Link to="/about" className="text-slate-600 hover:text-emerald-600 text-sm flex items-center group transition-colors duration-200">
                  <Info size={16} className="mr-2 text-emerald-500 group-hover:text-emerald-700 transition-colors duration-200 flex-shrink-0" />
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-slate-600 hover:text-emerald-600 text-sm flex items-center group transition-colors duration-200">
                  <Package size={16} className="mr-2 text-emerald-500 group-hover:text-emerald-700 transition-colors duration-200 flex-shrink-0" />
                  Products
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-slate-600 hover:text-emerald-600 text-sm flex items-center group transition-colors duration-200">
                  <Cog size={16} className="mr-2 text-emerald-500 group-hover:text-emerald-700 transition-colors duration-200 flex-shrink-0" />
                  Services
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal & Help Column */}
          <div className="lg:col-span-1"> {/* Adjusted span */}
             <h4 className="text-base font-semibold text-slate-800 mb-4">Support</h4>
            <ul className="space-y-2.5">
              <li>
                <Link to="/privacy" className="text-slate-600 hover:text-emerald-600 text-sm flex items-center group transition-colors duration-200">
                  <Shield size={16} className="mr-2 text-blue-500 group-hover:text-blue-700 transition-colors duration-200 flex-shrink-0" />
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-slate-600 hover:text-emerald-600 text-sm flex items-center group transition-colors duration-200">
                  <FileText size={16} className="mr-2 text-blue-500 group-hover:text-blue-700 transition-colors duration-200 flex-shrink-0" />
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-slate-600 hover:text-emerald-600 text-sm flex items-center group transition-colors duration-200">
                  <HelpCircle size={16} className="mr-2 text-blue-500 group-hover:text-blue-700 transition-colors duration-200 flex-shrink-0" />
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Newsletter Column */}
          <div className="lg:col-span-1"> {/* Adjusted span */}
            <h4 className="text-base font-semibold text-slate-800 mb-4">Get in Touch</h4>
            <ul className="space-y-3 mb-5">
              <li className="flex items-start">
                <MapPin size={16} className="text-emerald-500 mt-0.5 mr-2.5 flex-shrink-0" />
                <span className="text-slate-600 text-sm">
                 638/101, Ganga Nagar, Meerut, Uttar Pradesh 250001
                </span>
              </li>
              <li className="flex items-center">
                <Phone size={16} className="text-emerald-500 mr-2.5 flex-shrink-0" />
                <a href="tel:+15551234567" className="text-slate-600 hover:text-emerald-600 text-sm transition-colors duration-200">
                +91 9412702900
                </a>
              </li>
              <li className="flex items-center">
                <Mail size={16} className="text-emerald-500 mr-2.5 flex-shrink-0" />
                <a href="mailto:info@innovationremedies.com" className="text-slate-600 hover:text-emerald-600 text-sm transition-colors duration-200">
                  innovationremedies@gmail.com
                </a>
              </li>
            </ul>

            {/* Enhanced Newsletter Signup */}
            <h5 className="text-sm font-medium text-slate-700 mb-2">Stay Updated</h5>
            <form className="flex items-center">
              <label htmlFor="footer-email" className="sr-only">Email for newsletter</label>
              <input
                id="footer-email"
                type="email"
                required
                placeholder="Your email"
                className="px-3 py-2 text-sm bg-white border border-slate-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 flex-grow transition-shadow duration-200"
              />
              <button
                type="submit"
                aria-label="Subscribe to newsletter"
                className="bg-emerald-500 hover:bg-emerald-600 text-white p-2.5 rounded-r-md transition-colors duration-200 flex-shrink-0 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-emerald-500" // Increased padding for better icon visibility
              >
                <Send size={18} /> 
              </button>
            </form>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-slate-200 pt-8 mt-8">
          <p className="text-sm text-slate-500 text-center">
            © {currentYear} <Link to="/" className="font-medium text-slate-700 hover:text-emerald-600 transition-colors duration-200">Innovation Remedies</Link>. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;