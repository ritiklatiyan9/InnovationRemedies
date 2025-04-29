import React from 'react';
import { Button } from '@/components/ui/button'; // Assuming these paths are correct for your project setup
import { Card, CardContent } from '@/components/ui/card'; // Assuming these paths are correct
import { Users, Globe, Bell, Award, LightbulbIcon, GraduationCap, Layers, ArrowRight, ChevronRight } from 'lucide-react';

// Enhanced StatCard with icons and animations
// Note: Icon size adjusted for better scaling.
const StatCard = ({ value, label, icon: Icon }) => (
  <Card className="bg-gradient-to-br from-white to-gray-50 shadow-md rounded-lg text-center p-4 sm:p-6 transform transition-all duration-300 hover:scale-105 hover:shadow-lg border border-gray-100">
    <CardContent className="p-0 flex flex-col items-center justify-center h-full">
      <div className="mb-2 sm:mb-3">
        {/* Adjusted Icon Size */}
        <Icon size={24} className="text-green-500 sm:size-8" strokeWidth={1.5} />
      </div>
      <div className="text-2xl sm:text-3xl font-bold text-gray-800 mb-1">{value}</div>
      <p className="text-xs sm:text-sm text-gray-500">{label}</p>
    </CardContent>
  </Card>
);

// Animated Blob Component for backgrounds
const AnimatedBlob = ({ className, color }) => (
  <div className={`absolute rounded-full ${color} opacity-20 blur-3xl animate-blob ${className} hidden sm:block`}></div>
);

const AboutUsPage = () => {
  return (
    // Added min-h-screen to ensure content fills viewport height if short
    <div className="bg-white text-gray-800 font-sans overflow-hidden min-h-screen">

      {/* Hero Section with Animated Background */}
      <section className="py-16 sm:py-20 md:py-24 lg:py-32 relative overflow-hidden">
        {/* Animated gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-green-50 to-purple-50"></div>

        {/* Animated blobs - hidden on mobile */}
        <AnimatedBlob className="top-1/4 -left-40 w-96 h-96" color="bg-blue-300" />
        <AnimatedBlob className="top-1/3 right-0 w-80 h-80 animation-delay-2000" color="bg-green-300" />
        <AnimatedBlob className="bottom-0 right-1/4 w-64 h-64 animation-delay-4000" color="bg-purple-300" />

        <div className="container mx-auto px-4 sm:px-6 text-center relative z-10">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mt-4 mb-6 leading-tight">
            About Innovation Remedies
          </h1>
          {/* Adjusted Button Padding and Icon Size */}
          <Button
            variant="default"
            size="lg"
            className="bg-gradient-to-r from-green-400 to-green-500 hover:from-green-500 hover:to-green-600 text-white rounded-full px-6 sm:px-8 py-2 sm:py-3 text-sm sm:text-base font-semibold transition-all shadow-md hover:shadow-lg inline-flex items-center"
          >
            <span>Explore</span>
            {/* Adjusted Icon Size */}
            <ChevronRight size={16} className="ml-1 sm:ml-2" />
          </Button>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-4 h-4 sm:w-6 sm:h-6 rounded-full bg-yellow-300 opacity-50 animate-pulse"></div>
        <div className="absolute bottom-10 right-16 w-6 h-3 sm:w-8 sm:h-4 bg-red-300 opacity-60 rounded-sm transform rotate-12 animate-bounce"></div>

        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
      </section>

      {/* Shaping the Future Section */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-white via-gray-50 to-white"></div>
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 md:gap-12 lg:gap-16 items-center">
            {/* Left Text Content */}
            <div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 text-gray-900 leading-tight">
              "We are shaping the future of <span className='text-green-500'>Veterinary</span> medicine."
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4 sm:mb-6 text-sm sm:text-base">
              Gain insights into client attributes such as demographics, pet preferences, and social profiles across different continents and time zones, enabling you to design engagement campaigns that genuinely resonate with your veterinary audience.
              </p>
              <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
              Keep clients informed with personalized messages about the latest veterinary news, services, and events in their local time zones, making it easier than ever to build a community of pet owners who share your vision and values.
              </p>
            </div>

            {/* Right Stats Content */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4 md:gap-6">
              <StatCard value="25,000+" label="People Engaged Monthly" icon={Users} />
              <StatCard value="10,000+" label="User Interactions Daily" icon={Globe} />
              <StatCard value="1K+" label="Process Daily" icon={Bell} />
              <StatCard value="15+" label="Partners" icon={Award} />
            </div>
          </div>
        </div>
      </section>

      {/* Image Gallery Section */}
      <section className="py-12 sm:py-16 bg-gradient-to-r from-gray-50 via-white to-gray-50 relative">
        {/* Dotted pattern background with animation */}
        <div className="absolute inset-0 bg-dot-pattern opacity-20 z-0 animate-pulse"></div>

        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-10 text-center text-gray-900">Our Workspace</h2>

          {/* Enhanced gallery with subtle animations and shadows - FORCED SQUARE ASPECT RATIO */}
          {/* Applied aspect-square to the container div and object-cover h-full w-full to the img */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-4 items-center">
            <div className="aspect-square overflow-hidden rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105">
              <img src="https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTEyL3Jhd3BpeGVsb2ZmaWNlMTFfcGhvdG9fb2ZfYV9tYW5fd2l0aF93ZWxjb21pbmdfZ2VzdHVyZV9pc29sYXRlZF83OGYyYTY1My1mNTU1LTQ3NGQtYjA2Yi1lYzRkMWI0NTNiYjMucG5n.png"
                alt="Team member welcome"
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-110" />
            </div>
            <div className="aspect-square overflow-hidden rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105">
              <img src="https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDI0LTA4L3Jhd3BpeGVsX29mZmljZV8zMl9oYXBweV9wb3J0cmFpdF9idXNpbmVzc19tYW5fYW5kX3BvaW50aW5nX3RvX19lZWQ3ZGZhMC03MTc1LTQ5MjYtOGE2My0wODM1MDgzYzZiNDUtMi5wbmc.png"
                alt="Office space"
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-110" />
            </div>
            <div className="aspect-square overflow-hidden rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105">
              <img src="https://static.vecteezy.com/system/resources/previews/003/492/361/non_2x/laughing-man-talking-to-a-smartphone-and-looking-up-image-free-photo.jpg"
                alt="Collaboration"
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-110" />
            </div>
            <div className="aspect-square overflow-hidden rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105">
              <img src="https://static.vecteezy.com/system/resources/previews/026/408/660/non_2x/hipster-man-lifestyle-fashion-portrait-background-caucasian-isolated-modern-standing-t-shirt-white-model-student-smile-photo.jpg"
                alt="Desk setup"
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-110" />
            </div>
            <div className="aspect-square overflow-hidden rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105">
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCBrHnwLDueDQoR_DJvpgWIhuJVN2yZYrsNI-j2iTXwyQAlynm4csroT-Pgh8o6p_r0Wg&usqp=CAU"
                alt="Person working"
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-110" />
            </div>
          </div>
        </div>
      </section>

      {/* Why Join Us Section */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-tr from-white via-green-50 to-white"></div>

        {/* Animated blobs - hidden on mobile */}
        <AnimatedBlob className="bottom-1/4 -left-40 w-80 h-80" color="bg-green-200" />
        <AnimatedBlob className="top-1/3 right-0 w-64 h-64 animation-delay-3000" color="bg-blue-200" />

        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 md:gap-12 lg:gap-16 items-start"> {/* Changed items-center to items-start */}
            {/* Left Text Content */}
            <div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 text-gray-900 leading-tight">
                Why Join Us
              </h2>
              <p className="text-gray-600 leading-relaxed mb-3 sm:mb-4 text-sm sm:text-base">
                At Emplided, we take ownership and deliver results.
              </p>
              <p className="text-gray-600 leading-relaxed mb-6 sm:mb-8 text-sm sm:text-base">
                We prioritize quality work over politics and empty promises.
              </p>

              <Button
                variant="outline"
                className="group inline-flex items-center border-green-500 text-green-600 hover:bg-green-50 hover:text-green-700 rounded-lg text-sm sm:text-base px-4 py-2 transition-colors" // Added explicit padding
              >
                <span>View open positions</span>
                <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>

            {/* Right Benefits Content */}
            <div className="space-y-4 sm:space-y-6 md:space-y-8">
              {/* Benefit Card 1 */}
              <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm transition-all duration-300 hover:shadow-md border border-gray-100">
                <div className="flex items-start">
                  <div className="bg-blue-100 p-2 sm:p-3 rounded-full mr-3 sm:mr-4 flex-shrink-0"> {/* Added flex-shrink-0 */}
                    {/* Adjusted Icon Size */}
                    <LightbulbIcon size={20} className="text-blue-500" />
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-semibold mb-1 sm:mb-2 text-gray-800">Meaningful role</h3>
                    <p className="text-xs sm:text-sm text-gray-600">Make a significant impact in a dynamic environment.</p>
                  </div>
                </div>
              </div>

              {/* Benefit Card 2 */}
              <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm transition-all duration-300 hover:shadow-md border-l-4 border-green-500 border-t border-r border-b border-gray-100">
                <div className="flex items-start">
                  <div className="bg-green-100 p-2 sm:p-3 rounded-full mr-3 sm:mr-4 flex-shrink-0"> {/* Added flex-shrink-0 */}
                    {/* Adjusted Icon Size */}
                    <GraduationCap size={20} className="text-green-500" />
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-semibold mb-1 sm:mb-2 text-gray-800">Learn & Grow</h3>
                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                      Expand your skills with unlimited access to MOOC platforms, sponsored courses, and challenging problem-solving opportunities. At Emplided, we're invested in your growth.
                    </p>
                  </div>
                </div>
              </div>

              {/* Benefit Card 3 */}
              <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm transition-all duration-300 hover:shadow-md border border-gray-100">
                <div className="flex items-start">
                  <div className="bg-purple-100 p-2 sm:p-3 rounded-full mr-3 sm:mr-4 flex-shrink-0"> {/* Added flex-shrink-0 */}
                    {/* Adjusted Icon Size */}
                    <Layers size={20} className="text-purple-500" />
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-semibold mb-1 sm:mb-2 text-gray-800">Internet Scale, global impact</h3>
                    <p className="text-xs sm:text-sm text-gray-600">Work on products used by millions worldwide.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Add CSS animations */}
      {/* Using <style jsx> for component-scoped CSS */}
      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }

        .animate-blob {
          animation: blob 15s infinite alternate;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animation-delay-3000 {
          animation-delay: 3s;
        }

        .animation-delay-4000 {
          animation-delay: 4s;
        }

        /* Tailwind utility equivalent for grid pattern */
        .bg-grid-pattern {
          background-image: linear-gradient(to right, rgba(156, 163, 175, 0.1) 1px, transparent 1px), /* gray-400 with opacity */
                            linear-gradient(to bottom, rgba(156, 163, 175, 0.1) 1px, transparent 1px);
          background-size: 20px 20px; /* Adjust size as needed */
        }

        /* Tailwind utility equivalent for dot pattern */
        .bg-dot-pattern {
           background-image: radial-gradient(rgba(156, 163, 175, 0.2) 1.5px, transparent 1.5px); /* gray-400 with opacity */
           background-size: 20px 20px; /* Adjust size as needed */
        }

        /* Ensuring icons in benefit cards don't shrink */
        .flex-shrink-0 {
           flex-shrink: 0;
        }
      `}</style>
    </div>
  );
};

export default AboutUsPage;