// src/components/Header.jsx
import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { 
  Home, 
  ShoppingBag, 
  Book,
  Users, 
  Mail, 
  Menu, 
  ChevronRight,
} from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import Logo from '../../../assets/Images/logo.png';
import { Button } from '@/components/ui/button';

const navItems = [
  { to: '/', label: 'Home', icon: <Home />, color: '#f43f5e' },
  { to: '/products', label: 'Products', icon: <ShoppingBag />, color: '#3b82f6' },
  { to: '/store',    label: 'Information', icon: <Book />, color: '#10b981' },
  { to: '/about',    label: 'About Us', icon: <Users />, color: '#f59e0b' },
  { to: '/contact',  label: 'Contact', icon: <Mail />, color: '#6366f1' },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const iconBaseClass = "h-5 w-5";

  return (
    <header
      className="
        fixed top-0 inset-x-0 z-50
        bg-sky-100/90 backdrop-blur-sm border border-zinc-300/50
        py-3 shadow-lg
      "
    >
      <div className="container mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex-shrink-0 mr-4">
          <img
            src={Logo}
            alt="App Logo"
            className="h-12 w-auto rounded-xl object-cover"
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex flex-grow justify-center">
          <ul className="flex space-x-2 bg-white/60 px-3 py-1.5 rounded-full shadow-inner border border-zinc-200/50">
            {navItems.map(item => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    `flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium
                     transition-all duration-200 ease-in-out
                     ${isActive
                       ? 'bg-white shadow-sm'
                       : 'text-gray-600 hover:text-gray-900 hover:bg-sky-50/50'}`
                  }
                  style={({ isActive }) => ({
                    color: isActive ? item.color : undefined
                  })}
                >
                  {React.cloneElement(item.icon, { className: iconBaseClass })}
                  <span>{item.label}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* Actions & Mobile Menu Trigger */}
        <div className="flex items-center gap-2 ml-4">
          {/* Login (desktop) */}
          <div className="hidden md:block">
            <Link to="/login">
              <Button className="rounded-full bg-green-500 hover:bg-blue-500">
                Login
              </Button>
            </Link>
          </div>

          {/* Mobile menu */}
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <button
                  className="p-2 rounded-full hover:bg-sky-200/60 focus:outline-none"
                  aria-label="Open menu"
                >
                  <Menu className="h-6 w-6 text-sky-600" />
                </button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-72 sm:w-80 bg-gradient-to-b from-white to-sky-50 p-0 shadow-xl flex flex-col"
              >
                {/* Optional profile header */}
                <div className="p-5 border-b border-gray-100 flex items-center gap-4">
                  <img
                    src="https://i.pinimg.com/1200x/34/c3/33/34c3332cb8eb6c448bb4544cd7df4bcd.jpg"
                    alt="Profile"
                    className="h-14 w-14 rounded-full border-2 border-white object-cover shadow-md"
                  />
                </div>

                {/* Navigation */}
                <nav className="px-4 py-3 overflow-y-auto flex-grow">
                  <div className="mb-2 ml-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Navigation
                  </div>
                  <ul className="space-y-1.5">
                    {navItems.map(item => (
                      <li key={item.to}>
                        <NavLink
                          to={item.to}
                          onClick={() => setIsOpen(false)}
                          className={({ isActive }) =>
                            `flex items-center justify-between p-3 rounded-lg transition-all duration-200
                             ${isActive
                               ? 'font-semibold bg-white shadow-sm'
                               : 'text-gray-700 hover:bg-white/70 hover:text-gray-900'}`
                          }
                          style={({ isActive }) => ({
                            color: isActive ? item.color : undefined
                          })}
                        >
                          <div className="flex items-center gap-3">
                            <div className={`p-2 rounded-md bg-gray-100 group-hover:bg-gray-200 transition-colors`}>
                              {React.cloneElement(item.icon, { className: iconBaseClass })}
                            </div>
                            <span className="text-sm">{item.label}</span>
                          </div>
                          {({ isActive }) =>
                            isActive && (
                              <div className="flex items-center gap-1">
                                <span
                                  className="h-2 w-2 rounded-full"
                                  style={{ backgroundColor: item.color }}
                                />
                                <ChevronRight className="h-4 w-4 opacity-60" />
                              </div>
                            )
                          }
                        </NavLink>
                      </li>
                    ))}
                  </ul>

                  {/* Account section label */}
                  <div className="mt-6 mb-2 ml-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Account
                  </div>
                </nav>

                {/* Bottom actions */}
                <div className="p-4 border-t border-gray-100 bg-white/50">
                  <Link to="/login" onClick={() => setIsOpen(false)}>
                    <button className="w-full text-left flex items-center gap-3 p-3 rounded-lg hover:bg-red-50 text-green-600 transition-colors text-sm">
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
