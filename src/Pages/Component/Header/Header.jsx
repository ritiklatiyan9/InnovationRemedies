import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { Home, ShoppingBag, Book, Users, Mail, Menu, LogOut, User, 
         ChevronRight, Settings, ShoppingCart, Package, X } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetFooter } from '@/components/ui/sheet';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
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
import { Badge } from '@/components/ui/badge';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-hot-toast';
import BrandLogo from '../../../assets/Images/logo.png';
import { cn } from '@/lib/utils';

// --- Configuration ---
const navItems = [
  { to: '/', label: 'Home', icon: Home, color: 'text-rose-500', bgColor: 'bg-rose-100 dark:bg-rose-500/20' },
  { to: '/products', label: 'Products', icon: ShoppingBag, color: 'text-blue-500', bgColor: 'bg-blue-100 dark:bg-blue-500/20' },
  { to: '/store', label: 'Information', icon: Book, color: 'text-emerald-500', bgColor: 'bg-emerald-100 dark:bg-emerald-500/20' },
  { to: '/about', label: 'About Us', icon: Users, color: 'text-amber-500', bgColor: 'bg-amber-100 dark:bg-amber-500/20' },
  { to: '/contact', label: 'Contact', icon: Mail, color: 'text-indigo-500', bgColor: 'bg-indigo-100 dark:bg-indigo-500/20' },
  { to: '/cart', label: 'My Cart', icon: ShoppingCart, color: 'text-red-500', bgColor: 'bg-red-100 dark:bg-red-500/20' },
];

const adminNavItem = {
  to: '/admin/orders',
  label: 'Manage Orders',
  icon: Package,
  color: 'text-purple-500',
  bgColor: 'bg-purple-100 dark:bg-purple-500/20',
  adminOnly: true
};

// --- Helper Function ---
const getUserInitials = (user) => {
  if (!user) return 'GU';
  if (user.username) {
    const names = user.username.split(' ');
    if (names.length > 1) return (names[0][0] + names[names.length - 1][0]).toUpperCase();
    return names[0].substring(0, 2).toUpperCase();
  }
  if (user.mobile && user.mobile.length >= 2) return user.mobile.substring(0, 2).toUpperCase();
  return 'U';
};

// --- Component ---
export default function Header() {
  const { user, isAuthenticated, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const isAdmin = user?.role === 'Admin';
  
  // Cart items count (example)
  const cartItemsCount = 1;

  // Handle scroll behavior
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Set scrolled state for visual changes
      setIsScrolled(currentScrollY > 10);
      
      if (currentScrollY < 20) {
        // Always show header at the top of the page
        setIsVisible(true);
      } else if (currentScrollY < lastScrollY) {
        // Scrolling up - show header
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down and not at the top - hide header
        setIsVisible(false);
      }
      
      setLastScrollY(currentScrollY);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const getAllNavItems = () => {
    const baseNavItems = navItems.filter(item => !item.adminOnly);
    if (isAdmin) return [...baseNavItems, adminNavItem];
    return baseNavItems;
  };

  const handleLogout = async () => {
    try {
      await logout();
      toast.success('Logged out successfully');
      navigate('/');
      setIsMobileMenuOpen(false);
    } catch (error) {
      toast.error(error?.message || 'Failed to logout');
      console.error("Logout error:", error);
    }
  };

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <header className={cn(
      "fixed inset-x-0 z-50 transition-all duration-300 transform",
      isVisible ? "top-0 translate-y-0" : "-translate-y-full",
      isScrolled 
        ? "bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-lg dark:shadow-gray-950/30 border-b border-gray-200 dark:border-gray-800/50" 
        : "bg-white dark:bg-gray-900 border-b border-transparent",
    )}>
      <div className="container mx-auto h-16 flex items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          to="/"
          className="flex-shrink-0 group relative"
          onClick={closeMobileMenu}
          aria-label="Innovation Remedies Home"
        >
          <img
            src={BrandLogo}
            alt="Innovation Remedies Company Logo"
            className="h-10 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
          />
          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full rounded-full"></span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:block mx-auto">
          <NavigationMenu>
            <NavigationMenuList className="flex items-center p-1 bg-gray-100/70 dark:bg-gray-800/50 rounded-full shadow-inner">
              {getAllNavItems().map((item) => (
                <NavigationMenuItem key={item.to} className="mx-0.5">
                  <NavLink
                    to={item.to}
                    className={({ isActive }) => cn(
                      "group flex items-center px-4 py-2 rounded-full text-sm font-medium transition-all duration-200",
                      isActive 
                        ? `${item.bgColor} ${item.color} shadow-sm` 
                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-200/50 dark:hover:bg-gray-700/50"
                    )}
                  >
                    <div className={cn(
                      "flex items-center justify-center w-7 h-7 rounded-full mr-2",
                      "transition-colors duration-200",
                      "group-hover:bg-white dark:group-hover:bg-gray-800"
                    )}>
                      <item.icon className={cn(
                        "h-4 w-4",
                        item.color
                      )} />
                    </div>
                    {item.label}
                    
                    {/* Badge for cart */}
                    {item.label === 'My Cart' && cartItemsCount > 0 && (
                      <Badge 
                        variant="destructive" 
                        className="ml-2 h-5 min-w-5 px-1.5 flex items-center justify-center"
                      >
                        {cartItemsCount}
                      </Badge>
                    )}
                  </NavLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Right section: User & Mobile Menu */}
        <div className="flex items-center space-x-2">
          {/* User menu - Desktop */}
          <div className="hidden lg:block">
            {isAuthenticated ? (
              <UserDropdown user={user} onLogout={handleLogout} />
            ) : (
              <div className="flex items-center gap-2">
                <Button 
                  asChild 
                  variant="ghost" 
                  size="sm" 
                  className="rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  <Link to="/login">Sign in</Link>
                </Button>
                <Button 
                  asChild 
                  size="sm" 
                  className="rounded-full bg-primary hover:bg-primary/90"
                >
                  <Link to="/login">Register</Link>
                </Button>
              </div>
            )}
          </div>
          
          {/* Mobile menu button */}
          <div className="lg:hidden">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="rounded-full hover:bg-gray-100 dark:hover:bg-gray-800" 
                  aria-label="Open menu"
                >
                  <Menu className="h-6 w-6 text-gray-700 dark:text-gray-300" />
                </Button>
              </SheetTrigger>
              <MobileMenu
                isAuthenticated={isAuthenticated}
                user={user}
                onLogout={handleLogout}
                onClose={closeMobileMenu}
                navItems={getAllNavItems()}
                currentPath={location.pathname}
                cartItemsCount={cartItemsCount}
              />
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}

// --- User Dropdown Component ---
function UserDropdown({ user, onLogout }) {
  const initials = getUserInitials(user);
  const isAdmin = user?.role === 'Admin';
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          className="relative h-10 w-10 rounded-full p-0 overflow-hidden border-2 border-primary/10 hover:border-primary/30 transition-all duration-200"
        >
          <Avatar className="h-10 w-10">
            <AvatarImage src={user?.coverImage || undefined} alt={user?.username || "User avatar"} />
            <AvatarFallback className="bg-gradient-to-br from-primary to-primary/60 text-white font-semibold">
              {initials}
            </AvatarFallback>
          </Avatar>
          <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-white dark:border-gray-900"></span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-60 p-2 mt-1 rounded-xl overflow-hidden" align="end" forceMount>
        <div className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-800/70 rounded-lg mb-1">
          <Avatar className="h-12 w-12 border-2 border-white dark:border-gray-900 shadow-sm">
            <AvatarImage src={user?.coverImage || undefined} alt={user?.username || "User avatar"} />
            <AvatarFallback className="bg-gradient-to-br from-primary to-primary/60 text-white font-semibold">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <p className="text-base font-medium leading-none mb-1">{user?.username || "Welcome!"}</p>
            {user?.mobile && (
              <p className="text-xs text-muted-foreground">
                {user.mobile}
              </p>
            )}
            {user?.role && (
              <Badge 
                variant={user.role === 'Admin' ? 'outline' : 'secondary'} 
                className={cn(
                  "mt-2 text-xs",
                  user.role === 'Admin' ? "border-purple-500 text-purple-600 bg-purple-50 dark:bg-purple-900/30" : ""
                )}
              >
                {user.role}
              </Badge>
            )}
          </div>
        </div>
        
        <DropdownMenuSeparator className="my-1" />
        
        <div className="p-1">
         
          
          {isAdmin && (
            <DropdownMenuItem asChild>
              <Link 
                to="/admin/orders" 
                className="cursor-pointer w-full flex items-center p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-500/20 flex items-center justify-center mr-2">
                  <Package className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                </div>
                <span>Manage Orders</span>
              </Link>
            </DropdownMenuItem>
          )}
          
         
        </div>
        
        <DropdownMenuSeparator className="my-1" />
        
        <div className="p-1">
          <DropdownMenuItem 
            onClick={onLogout} 
            className="cursor-pointer w-full flex items-center p-2 rounded-md text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20"
          >
            <div className="w-8 h-8 rounded-full bg-red-100 dark:bg-red-500/20 flex items-center justify-center mr-2">
              <LogOut className="h-4 w-4 text-red-600 dark:text-red-400" />
            </div>
            <span>Sign out</span>
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

// --- Mobile Menu Component ---
function MobileMenu({ isAuthenticated, user, onLogout, onClose, navItems, currentPath, cartItemsCount }) {
  return (
    <SheetContent 
      side="right" 
      className="w-full max-w-xs sm:max-w-sm p-0 border-l border-gray-200 dark:border-gray-800"
    >
      <SheetHeader className="p-4 border-b border-gray-200 dark:border-gray-800 flex flex-row justify-between items-center">
        <SheetTitle className="text-left">Menu</SheetTitle>
        <Button 
          variant="ghost" 
          size="icon" 
          className="rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
          onClick={onClose}
        >
          <X className="h-5 w-5 text-gray-500" />
        </Button>
      </SheetHeader>
      
      {isAuthenticated && (
        <div className="p-4 border-b border-gray-200 dark:border-gray-800">
          <div className="flex items-center space-x-3">
            <Avatar className="h-12 w-12 border-2 border-white dark:border-gray-900 shadow-sm">
              <AvatarImage src={user?.coverImage || undefined} alt={user?.username || "User"} />
              <AvatarFallback className="bg-gradient-to-br from-primary to-primary/60 text-white font-medium">
                {getUserInitials(user)}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="font-medium text-base">{user?.username || "User"}</div>
              {user?.mobile && (
                <div className="text-xs text-gray-500 dark:text-gray-400">{user.mobile}</div>
              )}
              {user?.role && (
                <Badge 
                  variant={user.role === 'Admin' ? 'outline' : 'secondary'} 
                  className={cn(
                    "mt-1 text-xs",
                    user.role === 'Admin' ? "border-purple-500 text-purple-600 bg-purple-50 dark:bg-purple-900/30" : ""
                  )}
                >
                  {user.role}
                </Badge>
              )}
            </div>
          </div>
        </div>
      )}
      
      <div className="flex-1 overflow-y-auto">
        <div className="p-4">
          <div className="mb-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
            Navigation
          </div>
          
          <nav className="space-y-1 mt-3">
            {navItems.map((item) => {
              const isActive = currentPath === item.to;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={cn(
                    "flex items-center justify-between py-3 px-3 rounded-lg text-sm font-medium transition-all duration-200",
                    isActive 
                      ? `${item.bgColor} ${item.color}` 
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                  )}
                  onClick={onClose}
                >
                  <div className="flex items-center">
                    <div className={cn(
                      "flex items-center justify-center w-9 h-9 rounded-full mr-3",
                      isActive ? "bg-white/80 dark:bg-gray-800" : "bg-gray-100 dark:bg-gray-800"
                    )}>
                      <item.icon className={cn(
                        "h-5 w-5",
                        isActive ? item.color : "text-gray-500 dark:text-gray-400"
                      )} />
                    </div>
                    <span>{item.label}</span>
                    
                    {/* Badge for cart */}
                    {item.label === 'My Cart' && cartItemsCount > 0 && (
                      <Badge 
                        variant="destructive" 
                        className="ml-2 h-5 min-w-5 px-1.5"
                      >
                        {cartItemsCount}
                      </Badge>
                    )}
                  </div>
                  
                  {isActive && <ChevronRight className={cn("h-4 w-4", item.color)} />}
                </Link>
              );
            })}
          </nav>
          
          {isAuthenticated && (
            <div className="mt-6">
              <div className="mb-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Account
              </div>
              <nav className="space-y-1 mt-3">
                <Link
                  to="/profile"
                  className={cn(
                    "flex items-center justify-between py-3 px-3 rounded-lg text-sm font-medium transition-all duration-200",
                    currentPath === '/profile' 
                      ? "bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400" 
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                  )}
                  onClick={onClose}
                >
                  
                  
                  {currentPath === '/profile' && (
                    <ChevronRight className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  )}
                </Link>
              </nav>
            </div>
          )}
        </div>
      </div>

      <SheetFooter className="p-4 border-t border-gray-200 dark:border-gray-800 mt-auto">
        {isAuthenticated ? (
          <Button
            variant="outline"
            onClick={() => {
              onLogout();
              onClose();
            }}
            className="w-full justify-center text-red-600 hover:bg-red-50 hover:text-red-700 border-red-200 gap-2"
          >
            <LogOut className="h-4 w-4" />
            Sign out
          </Button>
        ) : (
          <div className="grid grid-cols-2 gap-2 w-full">
            <Button
              asChild
              variant="outline"
              className="w-full"
              onClick={onClose}
            >
              <Link to="/login">Sign in</Link>
            </Button>
            <Button
              asChild
              className="w-full bg-primary hover:bg-primary/90"
              onClick={onClose}
            >
              <Link to="/register">Sign up</Link>
            </Button>
          </div>
        )}
      </SheetFooter>
    </SheetContent>
  );
}