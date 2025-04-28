import React from 'react';
import { FiFacebook, FiTwitter, FiLinkedin, FiDribbble } from 'react-icons/fi';
import { FaChevronDown } from 'react-icons/fa'; // For dropdown arrow

// Placeholder Logo component (replace with your actual logo)

// Updated Placeholder for the complex left-side graphic
const ProfileGraphicPlaceholder = () => (
  // This container will grow to fill available space and clip the image
  <div className="flex-1 w-full overflow-hidden">
    <img
      src="https://imageio.forbes.com/specials-images/imageserve/732357367/0x0.jpg?format=jpg&height=900&width=1600&fit=bounds"
      alt="Happy customer graphic" // Added descriptive alt text
      // Make image cover the container, maintain aspect ratio, potentially crop
      className="h-full w-full object-cover"
    />
  </div>
);


const ContactPage = () => {
  return (
    <div className="flex min-h-screen bg-white"> {/* Main container */}

      {/* Left Sidebar - Adjusted for full height image */}
      <div className="hidden lg:flex lg:flex-col w-[660px] bg-gray-50 border-r border-gray-200"> {/* Removed p-8 and justify-between */}
      

        {/* Placeholder now grows to fill remaining space */}
        <ProfileGraphicPlaceholder />

        {/* Optional: You could add content below the image here if needed */}
        {/* <div className="p-8 mt-auto"> Social Links or Footer Content </div> */}
      </div>

      {/* Right Content Area (Form) */}
      <div className="flex-1 flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-20 xl:px-28">
        <div className="max-w-xl w-full space-y-8"> {/* Max width container for the form */}
          <div>
            <h2 className="text-3xl font-bold text-gray-900">
              We'd love to help
            </h2>
            {/* Adjusted Hindi heading placement for better structure */}
            <h2 className='mt-1 text-2xl text-gray-700'>हमें मदद करने में खुशी होगी।</h2>
            <p className="mt-2 text-base text-gray-600">
              Reach out and we'll get in touch within 24 hours.
            </p>
          </div>

          <form className="mt-8 space-y-6" onSubmit={(e) => e.preventDefault()}> {/* Added basic onSubmit preventDefault */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                  First name
                </label>
                <div className="mt-1">
                  <input
                    id="first-name"
                    name="first-name"
                    type="text"
                    autoComplete="given-name"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                    placeholder="First name"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">
                  Last name
                </label>
                <div className="mt-1">
                  <input
                    id="last-name"
                    name="last-name"
                    type="text"
                    autoComplete="family-name"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                    placeholder="Last name"
                  />
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="number" className="block text-sm font-medium text-gray-700">
                Mobile Number
              </label>
              <div className="mt-1">
                <input
                  id="number"
                  name="number"
                  type="number"
                  
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                  placeholder="Mobile Number"
                />
              </div>
            </div>

             <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
               
                 <div>
                    <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                    Location
                    </label>
                    {/* Select with Flag - basic implementation */}
                    <div className="mt-1 relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                             {/* New Zealand Flag SVG or Emoji */}
                             <span role="img" aria-label="New Zealand Flag">🇳🇿</span>
                        </div>
                        <select
                            id="location"
                            name="location"
                            className="appearance-none block w-full pl-10 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm rounded-lg bg-white" // Added bg-white
                            defaultValue="IN"
                        >
                            <option value="IN">India</option>
                            <option value="AU">Australia</option>
                            <option value="US">United States</option>
                            <option value="GB">United Kingdom</option>
                            {/* Add other countries */}
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
              <div className="mt-1">
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                  placeholder="Leave us a message..."
                />
              </div>
            </div>

            <div className="flex items-center">
               <input
                id="agree-policy"
                name="agree-policy"
                type="checkbox"
                required // Often required for forms
                className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
              />
              <label htmlFor="agree-policy" className="ml-2 block text-sm text-gray-600">
                You agree to our friendly <a href="#" className="font-medium text-gray-700 underline hover:text-gray-900">privacy policy</a>.
              </label>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition duration-150 ease-in-out" // Added transition
              >
                Send message
              </button>
            </div>
          </form>

        </div>
      </div>
    </div>
  );
};

export default ContactPage;