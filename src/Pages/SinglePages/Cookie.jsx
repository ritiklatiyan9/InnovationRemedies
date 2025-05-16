import React, { useState, useEffect } from 'react';

const CookieConsent = () => {
  const [visible, setVisible] = useState(false);
  const [animationClass, setAnimationClass] = useState('');

  useEffect(() => {
    // Check if user has already seen the cookie banner
    const cookieConsent = localStorage.getItem('cookieConsent');
    if (!cookieConsent) {
      // If not, show the banner after a short delay for better UX
      const timer = setTimeout(() => {
        setVisible(true);
        // Add the animation class after a tiny delay for the animation to work
        setTimeout(() => setAnimationClass('translate-y-0 opacity-100'), 50);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    // Start exit animation
    setAnimationClass('translate-y-8 opacity-0');
    setTimeout(() => {
      // Store preference in localStorage
      localStorage.setItem('cookieConsent', 'accepted');
      setVisible(false);
    }, 500); // Duration should match the CSS transition
  };

  const handleClose = () => {
    // Start exit animation
    setAnimationClass('translate-y-8 opacity-0');
    setTimeout(() => {
      // Just remember the banner was closed
      localStorage.setItem('cookieConsent', 'closed');
      setVisible(false);
    }, 500); // Duration should match the CSS transition
  };

  if (!visible) return null;

  return (
    <div className={`fixed bottom-4 left-1/2 transform -translate-x-1/2 w-11/12 max-w-4xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-2xl z-50 transition-all duration-500 ease-in-out translate-y-8 opacity-0 ${animationClass}`}>
      <div className="relative p-5">
        {/* Cookie Icon */}
        <div className="absolute -top-8 left-8 bg-blue-600 w-16 h-16 rounded-full flex items-center justify-center shadow-lg">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" viewBox="0 0 20 20" fill="currentColor">
            <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 100-12 6 6 0 000 12z" />
            <circle cx="8" cy="8" r="1" />
            <circle cx="12" cy="8" r="1" />
            <circle cx="8" cy="12" r="1" />
            <circle cx="12" cy="12" r="1" />
            <circle cx="10" cy="10" r="1" />
          </svg>
        </div>
        
        {/* Main Content */}
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mt-4">
          {/* Text Content */}
          <div className="flex ">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-1">We value your privacy</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
                <button
              onClick={handleClose}
              className="group bg-gray-100 ml-20 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-white p-2 rounded-full transition-colors"
              aria-label="Close cookie consent"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
              
            </p>
          </div>
          
          {/* Buttons */}
          <div className="flex items-center gap-3 shrink-0 self-end md:self-auto">
           
            
          </div>
        </div>

        {/* Optional: Privacy Link */}
        <div className="mt-3 text-right">
          <a href="/privacy-policy" className="text-xs text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 underline">
            Privacy Policy
          </a>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;