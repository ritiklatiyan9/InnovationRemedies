// src/Pages/Component/Header/Header.jsx
import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Home, ShoppingBag, Book, Users, Mail, Menu, LogOut, User, ChevronRight, Settings, ShoppingBagIcon, Package } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetFooter } from '@/components/ui/sheet';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { useAuth } from '../context/AuthContext'; // Adjust path if necessary
import { toast } from 'react-hot-toast';
import Logo from '../../../assets/Images/logo.png'; // Ensure this path is correct
import { cn } from '@/lib/utils'; // Adjust path if necessary

// --- Configuration ---
const navItems = [
  { to: '/', label: 'Home', icon: Home, color: 'text-rose-500' },
  { to: '/products', label: 'Products', icon: ShoppingBag, color: 'text-blue-500' },
  { to: '/store', label: 'Information', icon: Book, color: 'text-emerald-500' },
  { to: '/about', label: 'About Us', icon: Users, color: 'text-amber-500' },
  { to: '/contact', label: 'Contact', icon: Mail, color: 'text-indigo-500' }, 
  { to: '/cart', label: 'MyCart', icon: ShoppingBagIcon, color: 'text-indigo-500' }, 
];

// Admin-specific navigation item
const adminNavItem = { 
  to: '/admin/orders', 
  label: 'Manage Orders', 
  icon: Package, 
  color: 'text-purple-500',
  adminOnly: true
};

// --- Helper Function ---
const getUserInitials = (user) => {
  if (!user) return 'GU'; // Guest User
  if (user.username) {
    const names = user.username.split(' ');
    if (names.length > 1) {
      return (names[0][0] + names[names.length - 1][0]).toUpperCase();
    }
    return names[0].substring(0, 2).toUpperCase();
  }
  if (user.mobile && user.mobile.length >= 2) {
    return user.mobile.substring(0, 2).toUpperCase();
  }
  return 'U'; // Default User
};

// --- Component ---
export default function Header() {
  const { user, isAuthenticated, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const iconSize = "h-5 w-5"; // Consistent icon size
  
  // Check if user has admin role
  const isAdmin = user?.role === 'Admin';

  // Get all navigation items, including admin-specific items if user is an admin
  const getAllNavItems = () => {
    if (isAdmin) {
      return [...navItems, adminNavItem];
    }
    return navItems;
  };

  const handleLogout = async () => {
    try {
      // Assuming logout() is async; if not, remove await
      await logout(); // Make sure your logout function handles async correctly if needed
      toast.success('Logged out successfully');
      navigate('/');
      setIsMobileMenuOpen(false); // Close mobile menu on logout
    } catch (error) {
      toast.error(error?.message || 'Failed to logout'); // Show specific error message if available
      console.error("Logout error:", error);
    }
  };

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  // --- Render ---
  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border/40 shadow-sm">
      <div className="container mx-auto h-16 flex items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link to="/" className="flex-shrink-0" onClick={closeMobileMenu}>
          <img src={Logo} alt="App Logo" className="h-10 w-auto object-contain" />
        </Link>

        {/* Desktop Navigation */}
        <NavigationMenu className="hidden lg:flex flex-grow justify-center">
          <NavigationMenuList className="bg-muted/60 px-3 py-1.5 rounded-full shadow-inner border border-border/30">
            {getAllNavItems().map((item) => (
              <NavigationMenuItem key={item.to}>
                {/* Fix: Use regular NavigationMenuLink component with Link */}
                <Link to={item.to}>
                  <div className={cn(
                    navigationMenuTriggerStyle(),
                    "bg-transparent hover:bg-accent/70 data-[active]:bg-background data-[active]:shadow-sm text-sm h-9"
                  )}>
                    <item.icon aria-hidden="true" className={cn(iconSize, item.color, "mr-1.5")} />
                    {item.label}
                  </div>
                </Link>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        {/* Actions (User Menu / Login Button) & Mobile Menu Trigger */}
        <div className="flex items-center space-x-3">
          {/* User Menu or Login Button (Desktop) */}
          <div className="hidden lg:block">
            {isAuthenticated ? (
              <UserDropdown user={user} onLogout={handleLogout} />
            ) : (
              <Button asChild size="sm" className="rounded-full bg-primary hover:bg-primary/90">
                <Link to="/login">Login</Link>
              </Button>
            )}
          </div>

          {/* Mobile Menu Trigger */}
          <div className="lg:hidden">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full" aria-label="Open menu">
                  <Menu className="h-6 w-6 text-foreground/80" />
                </Button>
              </SheetTrigger>
              <MobileSheetContent
                isAuthenticated={isAuthenticated}
                user={user}
                onLogout={handleLogout}
                onClose={closeMobileMenu}
                isAdmin={isAdmin}
                navItems={getAllNavItems()}
              />
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}

// --- Sub Components ---

// User Dropdown (for Desktop)
function UserDropdown({ user, onLogout }) {
  const initials = getUserInitials(user);
  const isAdmin = user?.role === 'Admin';
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full p-0">
          <Avatar className="h-10 w-10 border-2 border-border/20">
             {/* Ensure AvatarImage src is handled correctly if user?.coverImage can be null/undefined */}
            <AvatarImage src={user?.coverImage || undefined} alt={user?.username || "User avatar"} />
            <AvatarFallback className="bg-gradient-to-br from-primary/70 to-primary/40 text-primary-foreground font-semibold">
              {initials}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {user?.username || "Welcome!"}
            </p>
            {user?.mobile && (
              <p className="text-xs leading-none text-muted-foreground">
                {user.mobile}
                {user.role && (
                  <span className={`ml-1 ${user.role === 'Admin' ? 'text-purple-500 font-semibold' : ''}`}>
                    • {user.role}
                  </span>
                )}
              </p>
            )}
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
           {/* Use Link component for navigation */}
           <Link to="/profile" className="cursor-pointer w-full flex items-center"> 
             <User className="mr-2 h-4 w-4" />
             <span>Profile</span>
           </Link>
        </DropdownMenuItem>
        
        {/* Admin-specific menu item */}
        {isAdmin && (
          <DropdownMenuItem asChild>
            <Link to="/admin/orders" className="cursor-pointer w-full flex items-center">
              <Package className="mr-2 h-4 w-4 text-purple-500" />
              <span>Manage Orders</span>
            </Link>
          </DropdownMenuItem>
        )}
        
        <DropdownMenuItem asChild disabled>
          {/* Disabled example */}
          <span className="cursor-not-allowed opacity-50 w-full flex items-center">
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
          </span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={onLogout} className="text-red-600 focus:text-red-600 focus:bg-red-50 cursor-pointer w-full flex items-center">
          <LogOut className="mr-2 h-4 w-4" />
          <span>Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

// Mobile Sheet Content
function MobileSheetContent({ isAuthenticated, user, onLogout, onClose, isAdmin, navItems }) {
  const iconSize = "h-5 w-5";
  const initials = getUserInitials(user);

  return (
    <SheetContent side="right" className="w-full max-w-xs sm:max-w-sm p-0 flex flex-col bg-gradient-to-b from-background via-background to-muted/30">
      <SheetHeader className="p-4 border-b border-border/30">
        <SheetTitle className="flex items-center gap-3 text-left">
          {isAuthenticated ? (
            <>
              <Avatar className="h-10 w-10 border">
                <AvatarImage src={user?.coverImage || undefined} alt="User avatar" />
                <AvatarFallback className="bg-gradient-to-br from-primary/70 to-primary/40 text-primary-foreground">
                    {initials}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium">{user?.username || "User"}</p>
                <p className="text-xs text-muted-foreground">
                  {user?.mobile || ""}
                  {user?.role && (
                    <span className={`ml-1 ${user?.role === 'Admin' ? 'text-purple-500 font-semibold' : ''}`}>
                      • {user.role}
                    </span>
                  )}
                </p>
              </div>
            </>
          ) : (
            <>
              <Avatar className="h-10 w-10 border bg-muted">
                  <AvatarFallback>
                      <User className="h-5 w-5 text-muted-foreground" />
                  </AvatarFallback>
              </Avatar>
              <p className="text-sm font-medium">Guest Menu</p>
            </>
          )}
        </SheetTitle>
      </SheetHeader>

      {/* Navigation Links */}
      <nav className="flex-grow p-4 overflow-y-auto">
        <div className="mb-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
          Navigation
        </div>
        <ul className="space-y-1.5">
          {navItems.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                onClick={onClose}
                className={({ isActive }) =>
                  cn(
                    "flex items-center justify-between p-2.5 rounded-md text-sm font-medium transition-colors duration-150 group w-full",
                    isActive
                      ? "bg-primary/10 shadow-sm text-primary"
                      : "text-foreground/80 hover:bg-muted/80 hover:text-foreground"
                  )
                }
              >
                {({ isActive }) => (
                  <>
                    {/* Icon and Label */}
                    <div className="flex items-center gap-3">
                       <item.icon aria-hidden="true" className={cn(
                         iconSize,
                         isActive ? item.color : "opacity-80 group-hover:opacity-100",
                         "transition-colors"
                       )} />
                      <span className={isActive ? "font-semibold" : ""}>{item.label}</span>
                    </div>

                    {/* Conditional Active Indicator */}
                    {isActive && (
                      <ChevronRight className={cn("h-4 w-4 opacity-70", item.color)} />
                    )}
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>

         {/* Account Section (if logged in) */}
         {isAuthenticated && (
             <>
                <div className="mt-6 mb-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                   Account
                </div>
                <ul className="space-y-1.5">
                    <li>
                       <NavLink
                         to="/profile"
                         onClick={onClose}
                         className={({ isActive }) =>
                            cn(
                             "flex items-center gap-3 p-2.5 rounded-md text-sm font-medium transition-colors duration-150 group w-full",
                             isActive
                               ? "bg-muted shadow-sm text-foreground font-semibold"
                               : "text-foreground/80 hover:bg-muted/80 hover:text-foreground"
                           )
                         }
                       >
                           <User className={cn(iconSize, "opacity-70 group-hover:opacity-100")} />
                           Profile
                       </NavLink>
                   </li>
                </ul>
             </>
         )}
      </nav>

      {/* Footer Actions (Login/Logout) */}
      <SheetFooter className="p-4 border-t border-border/30 bg-background/50 mt-auto">
        {isAuthenticated ? (
          <Button
            variant="ghost"
            onClick={() => {
              onLogout();
            }}
            className="w-full justify-start text-red-600 hover:bg-red-50 hover:text-red-600 gap-3"
          >
            <LogOut className="h-5 w-5" />
            Logout
          </Button>
        ) : (
          <Button asChild variant="default" className="w-full gap-3 bg-primary hover:bg-primary/90" onClick={onClose}>
            <Link to="/login">
              <User className="h-5 w-5" />
              Login / Sign Up
            </Link>
          </Button>
        )}
      </SheetFooter>
    </SheetContent>
  );
}