import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async'; // Import Helmet for SEO
import { FiFacebook, FiTwitter, FiLinkedin, FiDribbble } from 'react-icons/fi'; // Keep if used elsewhere, otherwise remove
import { FaChevronDown } from 'react-icons/fa';
import logo from '../../assets/Images/logo.png'; // Ensure this is hosted publicly

// Updated Placeholder for the complex left-side graphic
const ProfileGraphicPlaceholder = () => (
  <div className="flex-1 w-full overflow-hidden">
    <img
      src="https://www.stitchtools.com/assets/images/contact/contact-banner.jpg"
      alt="Happy customer graphic - Innovation Remedies Contact"
      className="h-full w-full object-cover"
    />
  </div>
);

// Country data with flags and codes
const countries = [
  { code: "IN", name: "India", flag: "🇮🇳" },
  { code: "AU", name: "Australia", flag: "🇦🇺" },
  { code: "US", name: "United States", flag: "🇺🇸" },
  { code: "GB", name: "United Kingdom", flag: "🇬🇧" },
];

const ContactPage = () => {
  // Form state
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [message, setMessage] = useState('');
  const [selectedCountry, setSelectedCountry] = useState("IN");

  const currentCountry = countries.find(country => country.code === selectedCountry) || countries[0];

  // 🌐 Domain Configuration
  const domain = "https://www.innovationremedies.com"; // Update with your actual domain
  const canonicalUrl = `${domain}/contact`;
  const ogImageUrl = `${domain}${logo}`; // Make sure logo path is correct if domain is prepended

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const countryName = currentCountry.name;
    const whatsappNumber = "918938963778"; // WhatsApp number without '+' or spaces

    const textMessage = `
New Inquiry from Innovation Remedies Contact Form:
--------------------------------------------------
First Name: ${firstName}
Last Name: ${lastName}
Mobile Number: ${mobileNumber}
Location: ${countryName} (${selectedCountry})
Message: ${message}
--------------------------------------------------
    `.trim(); // .trim() to remove leading/trailing whitespace from template literal

    const encodedMessage = encodeURIComponent(textMessage);
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

    window.open(whatsappUrl, '_blank');

    // Optional: Clear form after submission
    setFirstName('');
    setLastName('');
    setMobileNumber('');
    setMessage('');
    setSelectedCountry('IN');
  };


  return (
    <div className="flex min-h-screen bg-white">

      {/* SEO Meta Tags */}
      <Helmet>
        {/* 🔍 SEO Basics */}
        <title>Contact Innovation Remedies | Veterinary Solutions in India</title>
        <meta
          name="description"
          content="Get in touch with Innovation Remedies for advanced veterinary products in India. We respond within 24 hours."
        />
        <meta
          name="keywords"
          content="Innovation Remedies contact, veterinary care , pet wellness contact, vet supplies in Uttar Pradesh"
        />

        {/* 🔗 Canonical URL */}
        <link rel="canonical" href={canonicalUrl} />

        {/* 📱 Mobile Optimization */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="robots" content="index, follow" />

        {/* 🌐 Open Graph (Social Media) */}
        <meta property="og:title" content="Contact Innovation Remedies | Veterinary Solutions in India" />
        <meta property="og:description" content="Get in touch with Innovation Remedies for advanced veterinary products in India" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content={ogImageUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Innovation Remedies" />

        {/* 🐦 Twitter Cards */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Contact Innovation Remedies | Veterinary Solutions in India" />
        <meta name="twitter:description" content="Get in touch with Innovation Remedies for advanced veterinary products in India" />
        <meta name="twitter:image" content={ogImageUrl} />
        <meta name="twitter:site" content="@innovationremedies" />

        {/* 📍 Geolocation Targeting */}
        <meta name="geo.region" content="IN-UP" />
        <meta name="geo.placename" content="Meerut" />
        <meta name="geo.position" content="28.9803;77.7039" />
        <meta name="ICBM" content="28.9803, 77.7039" />

        {/* 🧠 Schema Markup (LocalBusiness) */}
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "name": "Innovation Remedies",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "ganga Nagar",
                "addressLocality": "Meerut",
                "addressRegion": "Uttar Pradesh",
                "postalCode": "250001",
                "addressCountry": "IN"
              },
              "email": "innovationremedies@gmail.com",
              "url": "${domain}",
              "sameAs": [
                "https://www.facebook.com/profile.php?id=61575431486434",
                "https://www.instagram.com/innovationremedies"
              ],
              "openingHours": "Mo-Su 09:00-18:00",
              "description": "Innovation Remedies provides advanced veterinary solutions for animal health, wellness, and activity across India."
            }
          `}
        </script>
      </Helmet>

      {/* Left Sidebar - Adjusted for full height image */}
      <div className="hidden lg:flex lg:flex-col w-[660px] bg-gray-50 border-r border-gray-200">
        <ProfileGraphicPlaceholder />
      </div>

      {/* Right Content Area (Form) */}
      <div className="flex-1 flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-20 xl:px-28">
        <div className="max-w-xl w-full space-y-8 mt-4 md:mt-10">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">
              We'd love to help
            </h2>
            <h2 className='mt-1 text-2xl text-gray-700'>हमें मदद करने में खुशी होगी।</h2>
            <p className="mt-2 text-base text-gray-600">
              Reach out and we'll get in touch within 24 hours.
            </p>
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleFormSubmit}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                  First name
                </label>
                <input
                  id="first-name"
                  name="first-name"
                  type="text"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                  placeholder="First name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">
                  Last name
                </label>
                <input
                  id="last-name"
                  name="last-name"
                  type="text"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                  placeholder="Last name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label htmlFor="number" className="block text-sm font-medium text-gray-700">
                Mobile Number
              </label>
              <input
                id="number"
                name="number"
                type="tel" // Changed to "tel" for better mobile UX
                required
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                placeholder="Mobile Number"
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6"> {/* Kept structure for consistency, though only one field here */}
              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                  Location
                </label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span role="img" aria-label={`${currentCountry.name} Flag`} className="text-lg">
                      {currentCountry.flag}
                    </span>
                  </div>
                  <select
                    id="location"
                    name="location"
                    className="appearance-none block w-full pl-10 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm rounded-lg bg-white"
                    value={selectedCountry}
                    onChange={(e) => setSelectedCountry(e.target.value)}
                  >
                    {countries.map(country => (
                      <option key={country.code} value={country.code}>
                        {country.name}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <FaChevronDown className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                required
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                placeholder="Leave us a message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition duration-150 ease-in-out"
              >
                Send message
              </button>
            </div>
          </form>

          <div className="text-sm text-gray-600 border-t pt-4 mt-4">
            <p><strong>Visit Us:</strong> B-Block , Baba Colony , Burari , North Delhi - 110084</p>
            <p><strong>Email:</strong> innovationremedies@gmail.com</p>
            <p><strong>Phone:</strong> +91-9412702900</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;