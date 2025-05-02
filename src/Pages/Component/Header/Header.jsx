 // src/Pages/Component/Header/Header.jsx
 import React, { useState } from 'react';
 import { Link, NavLink, useNavigate } from 'react-router-dom';
 import { Home, ShoppingBag, Book, Users, Mail, Menu, ChevronRight, LogOut, User } from 'lucide-react';
 import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
 import { 
   DropdownMenu, 
   DropdownMenuContent, 
   DropdownMenuItem, 
   DropdownMenuLabel, 
   DropdownMenuSeparator, 
   DropdownMenuTrigger 
 } from '@/components/ui/dropdown-menu';
 import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
 import { Button } from '@/components/ui/button';
 import { useAuth } from '../context/AuthContext';
 import { toast } from 'react-hot-toast';
 import Logo from '../../../assets/Images/logo.png';
 
 const navItems = [
   { to: '/',    label: 'Home',        icon: <Home />,         color: '#f43f5e' },
   { to: '/products', label: 'Products',    icon: <ShoppingBag />,  color: '#3b82f6' },
   { to: '/store',    label: 'Information', icon: <Book />,         color: '#10b981' },
   { to: '/about',    label: 'About Us',    icon: <Users />,        color: '#f59e0b' },
   { to: '/contact',  label: 'Contact',     icon: <Mail />,         color: '#6366f1' },
 ];
 
 export default function Header() {
   const { user, isAuthenticated, logout } = useAuth();
   const [isOpen, setIsOpen] = useState(false);
   const navigate = useNavigate();
   const iconClass = "h-5 w-5";
 
   // Get user initials for avatar fallback
   const getUserInitials = () => {
     if (!user) return 'GU'; // Guest User
     
     const mobile = user.mobile || '';
     if (mobile.length >= 2) return mobile.substring(0, 2).toUpperCase();
     return 'U'; // Default User
   };
 
   const handleLogout = async () => {
     try {
       await logout();
       toast.success('Logged out successfully');
       navigate('/');
     } catch (error) {
       toast.error('Failed to logout');
     }
   };
 
   return (
     <header className="fixed top-0 inset-x-0 z-50 bg-sky-100/90 backdrop-blur-sm border-b border-zinc-300/50 py-2 sm:py-3 shadow-lg">
       <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
         {/* Logo */}
         <Link to="/" className="flex-shrink-0">
           <img src={Logo} alt="App Logo" className="h-10 sm:h-12 w-auto rounded-xl object-cover" />
         </Link>
 
         {/* Desktop Nav */}
         <nav className="hidden md:flex flex-grow justify-center">
           <ul className="flex space-x-2 bg-white/60 px-3 py-1.5 rounded-full shadow-inner border border-zinc-200/50">
             {navItems.map(item => (
               <li key={item.to}>
                 <NavLink
                   to={item.to}
                   className={({ isActive }) =>
                     `flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium transition duration-200 ${
                       isActive
                         ? "bg-white shadow-sm"
                         : "text-gray-600 hover:text-gray-900 hover:bg-sky-50/50"
                     }`
                   }
                   style={({ isActive }) => ({ color: isActive ? item.color : undefined })}
                 >
                   {React.cloneElement(item.icon, { className: iconClass })}
                   <span>{item.label}</span>
                 </NavLink>
               </li>
             ))}
           </ul>
         </nav>
 
         {/* Actions & Mobile Menu */}
         <div className="flex items-center space-x-2">
           {/* User Menu or Login Button (desktop) */}
           <div className="hidden md:block">
             {isAuthenticated ? (
               <DropdownMenu>
                 <DropdownMenuTrigger asChild>
                   <Button variant="ghost" className="rounded-full p-0 h-10 w-10 overflow-hidden">
                     <Avatar className="h-10 w-10 border-2 border-white shadow-sm">
                       <AvatarImage src={user?.coverImage || ""} alt={user?.username || "User"} />
                       <AvatarFallback className="bg-gradient-to-br from-sky-400 to-blue-500 text-white">
                         {getUserInitials()}
                       </AvatarFallback>
                     </Avatar>
                   </Button>
                 </DropdownMenuTrigger>
                 <DropdownMenuContent align="end" className="w-56">
                   <DropdownMenuLabel>
                     <div className="flex flex-col space-y-1">
                       <p className="text-sm font-medium">
                         {user?.username || "User"}
                       </p>
                       <p className="text-xs text-gray-500">
                         {user?.mobile || ""}
                       </p>
                     </div>
                   </DropdownMenuLabel>
                   <DropdownMenuSeparator />
                   <DropdownMenuItem asChild>
                     <Link to="/profile" className="flex items-center cursor-pointer">
                       <User className="mr-2 h-4 w-4" />
                       <span>Profile</span>
                     </Link>
                   </DropdownMenuItem>
                   <DropdownMenuItem onClick={handleLogout} className="text-red-500 focus:text-red-500 cursor-pointer">
                     <LogOut className="mr-2 h-4 w-4" />
                     <span>Logout</span>
                   </DropdownMenuItem>
                 </DropdownMenuContent>
               </DropdownMenu>
             ) : (
               <Link to="/login">
                 <Button className="rounded-full bg-green-500 hover:bg-green-600">
                   Login
                 </Button>
               </Link>
             )}
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
 
               <SheetContent side="right" className="w-64 sm:w-72 bg-gradient-to-b from-white to-sky-50 shadow-xl flex flex-col">
                 {/* Profile header */}
                 <div className="p-5 border-b border-gray-100 flex items-center gap-4">
                   {isAuthenticated ? (
                     <>
                       <Avatar className="h-12 w-12 rounded-full border-2 border-white object-cover shadow-md">
                         <AvatarImage src={user?.coverImage || ""} alt="Profile" />
                         <AvatarFallback className="bg-gradient-to-br from-sky-400 to-blue-500 text-white">
                           {getUserInitials()}
                         </AvatarFallback>
                       </Avatar>
                       <div>
                         <p className="font-medium">{user?.username || "User"}</p>
                         <p className="text-xs text-gray-500">{user?.mobile || ""}</p>
                       </div>
                     </>
                   ) : (
                     <>
                       <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center">
                         <User className="h-6 w-6 text-gray-500" />
                       </div>
                       <p className="font-medium">Guest</p>
                     </>
                   )}
                 </div>
 
                 {/* Nav links */}
                 <nav className="px-4 py-3 overflow-y-auto flex-grow">
                   <div className="mb-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                     Navigation
                   </div>
                   <ul className="space-y-1.5">
                     {navItems.map(item => (
                       <li key={item.to}>
                         <NavLink
                           to={item.to}
                           onClick={() => setIsOpen(false)}
                           className={({ isActive }) =>
                             `flex items-center justify-between p-3 rounded-lg transition duration-200 ${
                               isActive
                                 ? "font-semibold bg-white shadow-sm"
                                 : "text-gray-700 hover:bg-white/70 hover:text-gray-900"
                             }`
                           }
                           style={({ isActive }) => ({ color: isActive ? item.color : undefined })}
                         >
                           <div className="flex items-center gap-3">
                             <div className="p-2 rounded-md bg-gray-100 group-hover:bg-gray-200 transition-colors">
                               {React.cloneElement(item.icon, { className: iconClass })}
                             </div>
                             <span className="text-sm">{item.label}</span>
                           </div>
                           {({ isActive }) =>
                             isActive && (
                               <div className="flex items-center gap-1">
                                 <span className="h-2 w-2 rounded-full" style={{ backgroundColor: item.color }} />
                                 <ChevronRight className="h-4 w-4 opacity-60" />
                               </div>
                             )
                           }
                         </NavLink>
                       </li>
                     ))}
                   </ul>
 
                   <div className="mt-6 mb-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                     Account
                   </div>
                 </nav>
 
                 {/* Bottom login/logout */}
                 <div className="p-4 border-t border-gray-100 bg-white/50">
                   {isAuthenticated ? (
                     <button 
                       onClick={() => {
                         handleLogout();
                         setIsOpen(false);
                       }}
                       className="w-full text-left flex items-center gap-3 p-3 rounded-lg hover:bg-red-50 text-red-600 text-sm transition"
                     >
                       <LogOut className="h-5 w-5" />
                       Logout
                     </button>
                   ) : (
                     <Link to="/login" onClick={() => setIsOpen(false)}>
                       <button className="w-full text-left flex items-center gap-3 p-3 rounded-lg hover:bg-green-50 text-green-600 text-sm transition">
                         <User className="h-5 w-5" />
                         Login
                       </button>
                     </Link>
                   )}
                 </div>
               </SheetContent>
             </Sheet>
           </div>
         </div>
       </div>
     </header>
   );
 } 