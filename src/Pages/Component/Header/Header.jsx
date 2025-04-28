import React, { useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Heart, BarChart2, Activity, DollarSign, Settings, Menu, LogOut, Contact } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'; // Assuming this path is correct
import useScrollDirection from '../../../hooks/useScrollDirection'; // Import our custom hook
import Logo from '../../../assets/Images/banner.jpg'; // Adjust path if necessary
function Header() {
  const [isOpen, setIsOpen] = useState(false);
  // We don't need the separate isActive state, NavLink handles it
  // const location = useLocation();
  // const [isActive, setIsActive] = useState(location.pathname === '/');
  const { visible } = useScrollDirection(); // Use our custom hook
  const [isActive, setIsActive] = useState(false); // State to track active link

  const navItems = [
    {
      to: '/',
      label: 'Home',
      icon: <Heart className="h-5 w-5" />,
      color: '#f43f5e' // Rose/Pink
    },
    {
      to: '/products', // Renamed to match label
      label: 'Products',
      icon: <BarChart2 className="h-5 w-5" />,
      color: '#3b82f6' // Blue
    },
    {
      to: '/performance',
      label: 'Performance',
      icon: <Activity className="h-5 w-5" />,
      color: '#10b981' // Emerald/Green
    },
    {
      to: '/payout',
      label: 'Payout',
      icon: <DollarSign className="h-5 w-5" />,
      color: '#f59e0b' // Amber
    },
    {
      to: '/contact',
      label: 'Contact',
      icon: <Contact className="h-5 w-5" />,
      color: '#6366f1' // Indigo
    }
  ];

  return (
    <header
      className={`bg-rose-50 bg-opacity-90 backdrop-blur-sm py-4 shadow-sm rounded-full mx-auto max-w-4xl my-3 fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ${ // Changed bg-white to bg-rose-50
        visible ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <div className="container mx-auto px-4  flex items-center justify-between">
        {/* Logo/Brand */}
        <div className="text-md font-bold text-pink-500 flex items-center">
          <Link to="/" className="flex items-center">
            {/* Simple Heart Logo using divs */}
            <div className="mr-2 relative flex-shrink-0"> {/* Added flex-shrink-0 */}
             
            </div>
            <span className="hidden sm:inline-block ml-1 whitespace-nowrap"><img className='rounded-full h-16' src={Logo} alt="" /></span> {/* Added whitespace-nowrap */}
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:block">
          <ul className="flex space-x-2 lg:space-x-4">
            {navItems.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  // Use NavLink's isActive prop provided to the function
                  className={({ isActive }) =>
                    `flex items-center gap-2 transition-colors duration-200 px-3 py-2 lg:px-4 rounded-full ${
                      isActive
                        ? 'font-medium' // Base active style (color handled below)
                        : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100 hover:bg-opacity-50' // Subtle hover bg
                    }`
                  }
                  // Apply the specific item color when active using inline style
                  style={({ isActive }) => ({
                    color: isActive ? item.color : undefined,
                    // Optionally add a subtle background matching the color when active
                    // backgroundColor: isActive ? `${item.color}1A` : undefined // Adds ~10% opacity background of the active color
                  })}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* User actions & Mobile Trigger */}
        <div className="flex items-center gap-2 flex-shrink-0"> {/* Added flex-shrink-0 */}
          {/* Profile picture for desktop */}
          <div className="hidden md:block">
            <img
              src="https://i.pinimg.com/1200x/34/c3/33/34c3332cb8eb6c448bb4544cd7df4bcd.jpg"
              alt="Profile"
              className="h-9 w-9 rounded-full border-2 border-white object-cover" // Kept border white for contrast
              />
          </div>

          {/* Mobile Navigation Trigger */}
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <button
                  className="p-2 focus:outline-none rounded-full hover:bg-pink-100 focus:bg-pink-200 focus:bg-opacity-50 transition-colors" // Adjusted hover/focus
                  aria-label="Menu"
                >
                  <Menu className="h-6 w-6 text-pink-500" />
                </button>
              </SheetTrigger>
              {/* Ensure SheetContent doesn't clash with header bg */}
              <SheetContent side="right" className="w-72 sm:w-80 bg-white p-0 shadow-xl flex flex-col"> {/* Added flex flex-col */}
                {/* Mobile Menu Header */}
                <div className="p-6 border-b border-gray-100 flex items-center justify-between flex-shrink-0"> {/* Added flex-shrink-0 */}
                   <div className="text-lg font-semibold text-pink-500 flex items-center gap-2">
                     {/* Simple Heart Logo using divs (smaller) */}
                     <div className="h-6 w-6 relative transform rotate-[-45deg] flex-shrink-0"> {/* Added flex-shrink-0 */}
                        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-3 w-3 bg-pink-400 rounded-full"></div>
                        <div className="absolute bottom-0 left-0 transform -translate-x-1/2 translate-y-1/2 h-3 w-3 bg-pink-400 rounded-full"></div>
                        <div className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 h-3 w-3 bg-pink-400 rounded-full"></div>
                      </div>
                     <span className="whitespace-nowrap">Wellness Dashboard</span> {/* Added whitespace-nowrap */}
                  </div>
                   {/* Optional: Add profile pic inside mobile menu */}
                   <img
                     src="https://i.pinimg.com/1200x/34/c3/33/34c3332cb8eb6c448bb4544cd7df4bcd.jpg"
                     alt="Profile"
                     className="h-8 w-8 rounded-full border border-gray-200 object-cover flex-shrink-0" // Added flex-shrink-0
                   />
                </div>
                {/* Mobile Menu Navigation */}
                {/* Added overflow-y-auto and flex-grow for scrolling if content exceeds height */}
                <nav className="p-4 overflow-y-auto flex-grow">
                  <ul className="space-y-1">
                    {navItems.map((item) => (
                      <li key={item.to}>
                        <NavLink
                          to={item.to}
                          className={({ isActive }) => `flex items-center justify-between p-3 rounded-lg transition-all duration-200 ease-in-out group ${ // Added group for hover state on icon bg
                            isActive
                              ? 'font-medium bg-pink-50' // Keep existing active style
                              : 'hover:bg-gray-100 text-gray-700'
                          }`}
                          style={({ isActive }) => ({
                            color: isActive ? item.color : undefined
                          })}
                          onClick={() => setIsOpen(false)} // Close sheet on click
                        >
                          <div className="flex items-center gap-3">
                            {/* Icon wrapper for consistent styling */}
                            <div
                              className={`p-1.5 rounded-md transition-colors duration-200 ${
                                isActive ? 'bg-white shadow-sm' : 'bg-gray-100 group-hover:bg-gray-200' // Use group-hover
                              }`}
                              style={{ color: item.color }} // Icon color set here
                            >
                              {React.cloneElement(item.icon, { className: "h-5 w-5" })} {/* Ensure icon size */}
                            </div>
                            <span className="text-base">{item.label}</span>
                          </div>
                           {/* Optional: Add an indicator for active link */}
                           {/* {({ isActive }) => isActive && <span className="h-2 w-2 rounded-full" style={{ backgroundColor: item.color }}></span>} */}
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                </nav>
                  {/* Actions at the bottom */}
                  <div className="p-4 border-t border-gray-100 flex-shrink-0"> {/* Added flex-shrink-0 */}
                      <button className="w-full text-left flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 text-gray-700 transition-colors duration-150">
                          <Settings className="h-5 w-5 text-gray-500"/>
                          <span>Account Settings</span>
                      </button>
                       <button className="w-full text-left flex items-center gap-3 p-3 rounded-lg hover:bg-red-50 text-red-600 mt-1 transition-colors duration-150">
                           <LogOut className="h-5 w-5"/>
                           <span>Logout</span>
                       </button>
                  </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;