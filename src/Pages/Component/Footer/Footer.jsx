// src/components/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom'; // Or use <a> tags
import { Linkedin, Twitter } from 'lucide-react'; // Keep icons minimal

// Optional: If you want a small logo/icon next to the name
// import RittenSimpleLogo from '../../../assets/Images/Innolact_icon_gray.png'; // Example: A subtle gray icon

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-200"> {/* Light background, subtle top border */}
      <div className="container mx-auto px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-6"> {/* Responsive layout, gap for spacing */}

          {/* Left Section: Copyright & Brand */}
          <div className="text-center sm:text-left">
            {/* Optional: Add logo here if desired */}
            {/* <img src={RittenSimpleLogo} alt="Ritten" className="inline-block h-5 w-auto mr-2 align-middle" /> */}
            <p className="text-sm text-gray-600">
              © {currentYear}{' '}
              {/* Make brand name slightly bolder */}
              <span className="font-medium text-gray-800">Innovation Remedies</span>.
              All rights reserved.
            </p>
          </div>

          {/* Right Section: Links & Minimal Socials */}
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6"> {/* Consistent gap */}
            {/* Essential Links */}
            <nav className="flex flex-wrap justify-center space-x-4 sm:space-x-5"> {/* Use flex-wrap for safety */}
              <Link to="/privacy" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                Terms of Service
              </Link>
              <Link to="/contact" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                Contact
              </Link>
            </nav>

            {/* Minimal Social Media Icons (Optional) */}
            <div className="flex space-x-4">
              <a
                href="#" // Replace with your actual LinkedIn URL
                aria-label="LinkedIn"
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <Linkedin size={20} /> {/* Clean, reasonably sized icons */}
              </a>
              <a
                href="#" // Replace with your actual Twitter/X URL
                aria-label="Twitter / X"
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <Twitter size={20} />
              </a>
              {/* Add only 1-2 more essential social links if absolutely needed */}
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
}

export default Footer;