import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { 
  Home, 
  ShoppingBag, 
  ShoppingCart, 
  Users, 
  Mail, 
  Menu, 
  LogOut, 
  Settings, 
  ChevronRight, 
  Bell,
  User,
  Book
} from 'lucide-react';
// --- Make sure these paths are correct for your project structure ---
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

import useScrollDirection from '../../../hooks/useScrollDirection'; // Adjust path if necessary
import Logo from '../../../assets/Images/logo.png'; // Adjust path if necessary
import { Button } from '@/components/ui/button';
// --------------------------------------------------------------------

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { visible } = useScrollDirection(); // Custom hook to control visibility on scroll

  const navItems = [
    { to: '/', label: 'Home', icon: <Home />, color: '#f43f5e' }, // Rose/Pink
    { to: '/products', label: 'Products', icon: <ShoppingBag />, color: '#3b82f6' }, // Blue
    { to: '/store', label: 'Information', icon: <Book />, color: '#10b981' }, // Emerald/Green
    { to: '/about', label: 'About Us', icon: <Users />, color: '#f59e0b' }, // Amber
    { to: '/contact', label: 'Contact', icon: <Mail />, color: '#6366f1' } // Indigo
  ];

  const iconBaseClass = "h-5 w-5"; // Define base icon size

  return (
    <header
      className={`
        bg-sky-100/90 backdrop-blur-sm border border-zinc-300/50
        py-3 shadow-lg rounded-full
        mx-auto max-w-5xl my-3 fixed left-0 right-0 z-50
        transition-transform duration-300 ease-in-out
        ${visible ? 'translate-y-0 sm:translate-y-0' : '-translate-y-[150%]'} // Adjusted translate for full hide
        // Position slightly off-screen initially on mobile, align top on sm+
        ${visible ? '-top-0 sm:top-3' : '-top-[150%]'}
      `}
      style={{ top: visible ? '0.75rem' : '-150%' }} // Use style for smoother transition start point if needed
    >
      <div className="container mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Logo/Brand */}
        <Link to="/" className="flex items-center flex-shrink-0 mr-4">
          <img
            className="h-12 w-auto rounded-xl object-cover" // Adjusted height slightly
            src={Logo}
            alt="App Logo"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex flex-grow justify-center">
          <ul className="flex space-x-1 lg:space-x-2 bg-white/60 px-3 py-1.5 rounded-full shadow-inner border border-zinc-200/50">
            {navItems.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    `flex items-center gap-2 transition-all duration-200 ease-in-out px-3 py-1.5 lg:px-4 rounded-full text-sm font-medium ${
                      isActive
                        ? 'bg-white shadow-sm' // Active background
                        : 'text-gray-600 hover:text-gray-900 hover:bg-sky-50/50' // Inactive and hover
                    }`
                  }
                  // Apply active color via style prop (affects text and icon)
                  style={({ isActive }) => ({
                    color: isActive ? item.color : undefined,
                  })}
                >
                  {/* Clone icon to apply base size class */}
                  {React.cloneElement(item.icon, { className: iconBaseClass })}
                  <span>{item.label}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* User actions & Mobile Trigger */}
        <div className="flex items-center gap-2 flex-shrink-0 ml-4">
          {/* Profile picture for desktop */}
          <div className="hidden md:block">
          <Link to="/login" className="flex items-center flex-shrink-0 mr-4">
         <Button className='rounded-full bg-green-500 hover:bg-blue-500'>Login</Button>
          </Link>
          </div>

          {/* Mobile Navigation Trigger */}
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <button
                  className="p-2 focus:outline-none rounded-full hover:bg-sky-200/60 focus:bg-sky-200/80 transition-colors"
                  aria-label="Open menu"
                >
                  <Menu className="h-6 w-6 text-sky-600" />
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="w-72 sm:w-80 bg-gradient-to-b from-white to-sky-50 p-0 shadow-xl flex flex-col">
                {/* Mobile Menu Header */}
                <div className="p-5 border-b border-gray-100 flex items-center gap-4">
                  <img
                    src="https://i.pinimg.com/1200x/34/c3/33/34c3332cb8eb6c448bb4544cd7df4bcd.jpg" // Placeholder
                    alt="Profile"
                    className="h-14 w-14 rounded-full border-2 border-white object-cover shadow-md flex-shrink-0"
                  />
               
                </div>

                {/* Notification banner */}
              
                {/* Mobile Menu Navigation */}
                <nav className="px-4 py-3 overflow-y-auto flex-grow">
                  <div className="mb-2 ml-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Navigation
                  </div>
                  <ul className="space-y-1.5">
                    {navItems.map((item) => (
                      <li key={item.to}>
                        <NavLink
                          to={item.to}
                          className={({ isActive }) => `
                            flex items-center justify-between p-3 rounded-lg transition-all duration-200 ease-in-out group
                            ${isActive
                              ? 'font-semibold bg-white shadow-sm' // Enhanced active state
                              : 'text-gray-700 hover:bg-white/70 hover:text-gray-900' // Inactive and hover
                            }
                          `}
                          // Apply active color via style prop (affects text and icon)
                          style={({ isActive }) => ({
                            color: isActive ? item.color : undefined
                          })}
                          onClick={() => setIsOpen(false)} // Close sheet on click
                        >
                          <div className="flex items-center gap-3">
                            {/* Icon Wrapper - with gradient background when active */}
                            <div className={`
                              p-2 rounded-md transition-colors duration-200
                              ${({ isActive }) => isActive 
                                ? 'bg-gradient-to-br from-white to-gray-100' 
                                : 'bg-gray-100 group-hover:bg-gray-200'}
                            `}>
                              {/* Clone icon to apply base size class. Color is inherited. */}
                              {React.cloneElement(item.icon, { className: iconBaseClass })}
                            </div>
                            <span className="text-sm">{item.label}</span>
                          </div>
                          {/* Active indicator */}
                          {({ isActive }) => isActive && (
                            <div className="flex items-center gap-1">
                              <span className="h-2 w-2 rounded-full" style={{ backgroundColor: item.color }}></span>
                              <ChevronRight className="h-4 w-4 opacity-60" />
                            </div>
                          )}
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                  
                  {/* Account section */}
                  <div className="mt-6 mb-2 ml-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Account
                  </div>
                </nav>

                {/* Actions at the bottom */}
                <div className="p-4 border-t border-gray-100 flex-shrink-0 space-y-1 bg-white/50">
               <Link to="/login" className="flex items-center flex-shrink-0 mr-4">
               <button className="w-full text-left flex items-center gap-3 p-3 rounded-lg hover:bg-red-50 text-green-600 transition-colors duration-150 text-sm">
                   
                   <span>Login</span>
                 </button>
               </Link>
                 
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