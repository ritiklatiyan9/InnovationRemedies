import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { motion, LayoutGroup } from 'framer-motion';
import {
  Menu,
  LogOut,
  ChevronRight,
  ShoppingCart,
  Package,
  X,
  ArrowUpRight,
} from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from '@/components/ui/sheet';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
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

const DISPLAY = {
  fontFamily:
    "'Neue Montreal Regular', 'SF Pro Text Semibold', 'Inter', system-ui, sans-serif",
  fontWeight: 600,
};
const MONO = {
  fontFamily: "'SF Pro Text Regular', ui-monospace, monospace",
  letterSpacing: "0.18em",
};

const navItems = [
  { to: '/', label: 'Home' },
  { to: '/products', label: 'Products' },
  { to: '/store', label: 'Information' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
];

const adminNavItem = { to: '/admin/orders', label: 'Orders', adminOnly: true };

const getUserInitials = (user) => {
  if (!user) return 'GU';
  if (user.username) {
    const names = user.username.split(' ');
    if (names.length > 1)
      return (names[0][0] + names[names.length - 1][0]).toUpperCase();
    return names[0].substring(0, 2).toUpperCase();
  }
  if (user.mobile && user.mobile.length >= 2)
    return user.mobile.substring(0, 2).toUpperCase();
  return 'U';
};

export default function Header() {
  const { user, isAuthenticated, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const isAdmin = user?.role === 'Admin';

  const cartItemsCount = 0;

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 20);
      if (currentScrollY < 20) setIsVisible(true);
      else if (currentScrollY < lastScrollY) setIsVisible(true);
      else if (currentScrollY > lastScrollY && currentScrollY > 120)
        setIsVisible(false);
      setLastScrollY(currentScrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const getAllNavItems = () => {
    if (isAdmin) return [...navItems, adminNavItem];
    return navItems;
  };

  const handleLogout = async () => {
    try {
      await logout();
      toast.success('Logged out');
      navigate('/');
      setIsMobileMenuOpen(false);
    } catch (error) {
      toast.error(error?.message || 'Failed to logout');
      console.error('Logout error:', error);
    }
  };

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: isVisible ? 0 : -100, opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-500',
        'bg-white/90 backdrop-blur-xl border-b',
        isScrolled ? 'border-neutral-200/80 shadow-[0_1px_20px_-8px_rgba(0,0,0,0.1)]' : 'border-neutral-200/40'
      )}
    >
      <div
        className={cn(
          'mx-auto flex items-center justify-between px-5 sm:px-8 transition-all duration-500',
          isScrolled ? 'h-14' : 'h-16 md:h-[72px]'
        )}
      >
        {/* Logo with animated gradient ring */}
        <Link
          to="/"
          className="flex items-center gap-3 group"
          onClick={closeMobileMenu}
          aria-label="Innovation Remedies Home"
        >
          <motion.span
            aria-hidden
            className="relative inline-flex items-center justify-center w-11 h-11 rounded-full overflow-hidden"
            style={{
              background:
                'conic-gradient(from 0deg, #6ee7b7, #60a5fa, #a78bfa, #f472b6, #6ee7b7)',
            }}
          >
            <motion.span
              className="absolute inset-0 rounded-full"
              style={{
                background:
                  'conic-gradient(from 0deg, #6ee7b7, #60a5fa, #a78bfa, #f472b6, #6ee7b7)',
              }}
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
            />
            <span className="relative flex items-center justify-center w-[86%] h-[86%] rounded-full bg-white">
              <img
                src={BrandLogo}
                alt="Innovation Remedies"
                className="w-[80%] h-[80%] object-contain transition-transform duration-500 group-hover:scale-105"
              />
            </span>
          </motion.span>
          <span className="hidden md:flex flex-col leading-tight">
            <span
              className="text-[10px] uppercase text-neutral-900 tracking-[0.22em]"
              style={MONO}
            >
              Innovation
            </span>
            <span
              className="text-[13px] text-neutral-900 tracking-[-0.01em]"
              style={{
                ...DISPLAY,
                fontWeight: 600,
              }}
            >
              Remedies
              <span className="text-emerald-600">.</span>
            </span>
          </span>
        </Link>

        {/* Desktop Nav with morphing active pill */}
        <LayoutGroup id="header-nav">
          <nav
            className="hidden lg:flex items-center gap-0.5 bg-neutral-50/80 border border-neutral-200/70 p-1 rounded-full"
            style={DISPLAY}
          >
            {getAllNavItems().map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) =>
                  cn(
                    'relative px-4 py-1.5 text-sm tracking-tight transition-colors duration-300 rounded-full',
                    isActive ? 'text-white' : 'text-neutral-600 hover:text-neutral-900'
                  )
                }
              >
                {({ isActive }) => (
                  <>
                    {isActive && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 rounded-full bg-neutral-900 -z-0"
                        transition={{
                          type: 'spring',
                          stiffness: 380,
                          damping: 30,
                        }}
                      />
                    )}
                    <span className="relative z-10">{item.label}</span>
                  </>
                )}
              </NavLink>
            ))}
          </nav>
        </LayoutGroup>

        {/* Right actions */}
        <div className="flex items-center gap-2 md:gap-3">
          {/* Cart */}
          <Link
            to="/cart"
            aria-label="Cart"
            className="relative w-10 h-10 rounded-full flex items-center justify-center text-neutral-800 hover:bg-neutral-100 transition-colors duration-300 border border-transparent hover:border-neutral-200"
          >
            <ShoppingCart className="h-[18px] w-[18px]" />
            {cartItemsCount > 0 && (
              <span
                className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 rounded-full bg-emerald-500 text-white text-[10px] font-semibold flex items-center justify-center tabular-nums ring-2 ring-white"
                style={{ fontFamily: 'inherit' }}
              >
                {cartItemsCount}
              </span>
            )}
          </Link>

          {/* Sign in / user */}
          <div className="hidden lg:block">
            {isAuthenticated ? (
              <UserDropdown user={user} onLogout={handleLogout} />
            ) : (
              <Link
                to="/login"
                className="group relative inline-flex items-center gap-2 pl-4 pr-1.5 py-1.5 rounded-full text-sm bg-neutral-900 text-white overflow-hidden hover:shadow-[0_8px_30px_-6px_rgba(110,231,183,0.5)] transition-all duration-500"
                style={DISPLAY}
              >
                {/* Animated gradient border on hover */}
                <motion.span
                  aria-hidden
                  className="absolute inset-0 rounded-full p-[1.5px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background:
                      'conic-gradient(from 0deg, #6ee7b7, #60a5fa, #a78bfa, #f472b6, #6ee7b7)',
                    WebkitMask:
                      'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                    WebkitMaskComposite: 'xor',
                    maskComposite: 'exclude',
                  }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
                />
                <span className="relative">Sign in</span>
                <span className="relative flex items-center justify-center w-7 h-7 rounded-full bg-white/15 overflow-hidden">
                  <ArrowUpRight
                    size={13}
                    className="transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-4 group-hover:-translate-y-4"
                  />
                  <ArrowUpRight
                    size={13}
                    className="absolute transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] -translate-x-4 translate-y-4 group-hover:translate-x-0 group-hover:translate-y-0"
                  />
                </span>
              </Link>
            )}
          </div>

          {/* Mobile hamburger */}
          <div className="lg:hidden">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <button
                  className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-neutral-100 text-neutral-900 transition-colors duration-300"
                  aria-label="Open menu"
                >
                  <Menu className="h-[18px] w-[18px]" />
                </button>
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
    </motion.header>
  );
}

/* ----------------------------- User dropdown ----------------------------- */
function UserDropdown({ user, onLogout }) {
  const initials = getUserInitials(user);
  const isAdmin = user?.role === 'Admin';

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className="relative h-10 w-10 rounded-full p-0 overflow-hidden border border-neutral-200 hover:border-neutral-900 transition-colors duration-300"
        >
          <Avatar className="h-10 w-10">
            <AvatarImage
              src={user?.coverImage || undefined}
              alt={user?.username || 'User avatar'}
            />
            <AvatarFallback className="bg-neutral-900 text-white font-semibold text-xs">
              {initials}
            </AvatarFallback>
          </Avatar>
          <span className="absolute bottom-0.5 right-0.5 h-2 w-2 rounded-full bg-emerald-500 border border-white" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-60 p-2 mt-2 rounded-2xl border border-neutral-200"
        align="end"
        forceMount
      >
        <div className="flex items-start gap-3 p-3 bg-neutral-50 rounded-xl mb-1">
          <Avatar className="h-10 w-10 border border-white shadow-sm">
            <AvatarImage
              src={user?.coverImage || undefined}
              alt={user?.username || 'User avatar'}
            />
            <AvatarFallback className="bg-neutral-900 text-white font-semibold text-xs">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <p
              className="text-sm leading-tight text-neutral-900"
              style={DISPLAY}
            >
              {user?.username || 'Welcome'}
            </p>
            {user?.mobile && (
              <p className="text-[11px] text-neutral-500 mt-0.5">
                {user.mobile}
              </p>
            )}
            {user?.role && (
              <Badge
                variant={user.role === 'Admin' ? 'outline' : 'secondary'}
                className={cn(
                  'mt-2 text-[10px] w-fit',
                  user.role === 'Admin'
                    ? 'border-neutral-900 text-neutral-900'
                    : ''
                )}
              >
                {user.role}
              </Badge>
            )}
          </div>
        </div>

        {isAdmin && (
          <>
            <DropdownMenuSeparator className="my-1" />
            <DropdownMenuItem asChild>
              <Link
                to="/admin/orders"
                className="cursor-pointer flex items-center gap-3 p-2 rounded-lg hover:bg-neutral-50"
              >
                <div className="w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center">
                  <Package className="h-4 w-4 text-neutral-800" />
                </div>
                <span className="text-sm">Manage orders</span>
              </Link>
            </DropdownMenuItem>
          </>
        )}

        <DropdownMenuSeparator className="my-1" />
        <DropdownMenuItem
          onClick={onLogout}
          className="cursor-pointer flex items-center gap-3 p-2 rounded-lg text-red-600 hover:bg-red-50"
        >
          <div className="w-8 h-8 rounded-full bg-red-50 flex items-center justify-center">
            <LogOut className="h-4 w-4" />
          </div>
          <span className="text-sm">Sign out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

/* ------------------------------ Mobile menu ------------------------------ */
function MobileMenu({
  isAuthenticated,
  user,
  onLogout,
  onClose,
  navItems,
  currentPath,
  cartItemsCount,
}) {
  return (
    <SheetContent
      side="right"
      className="w-full max-w-sm p-0 border-l border-neutral-200 bg-white"
    >
      <SheetHeader className="p-5 border-b border-neutral-200 flex flex-row justify-between items-center">
        <SheetTitle className="text-left text-sm uppercase" style={MONO}>
          Menu
        </SheetTitle>
        <button
          className="w-9 h-9 rounded-full hover:bg-neutral-100 flex items-center justify-center"
          onClick={onClose}
        >
          <X className="h-4 w-4 text-neutral-700" />
        </button>
      </SheetHeader>

      {isAuthenticated && (
        <div className="p-5 border-b border-neutral-200">
          <div className="flex items-center gap-3">
            <Avatar className="h-11 w-11 border border-neutral-200">
              <AvatarImage
                src={user?.coverImage || undefined}
                alt={user?.username || 'User'}
              />
              <AvatarFallback className="bg-neutral-900 text-white text-xs">
                {getUserInitials(user)}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="text-sm text-neutral-900" style={DISPLAY}>
                {user?.username || 'User'}
              </div>
              {user?.mobile && (
                <div className="text-[11px] text-neutral-500">
                  {user.mobile}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="flex-1 overflow-y-auto">
        <div className="p-4">
          <div
            className="mb-3 px-2 text-[10px] uppercase text-neutral-400"
            style={MONO}
          >
            Navigation
          </div>

          <nav className="space-y-0.5">
            {navItems.map((item) => {
              const isActive = currentPath === item.to;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={cn(
                    'flex items-center justify-between py-3 px-3 rounded-xl text-sm transition-colors duration-300',
                    isActive
                      ? 'bg-neutral-900 text-white'
                      : 'text-neutral-800 hover:bg-neutral-50'
                  )}
                  style={DISPLAY}
                  onClick={onClose}
                >
                  <span>{item.label}</span>
                  {item.label === 'My Cart' && cartItemsCount > 0 && (
                    <Badge className="h-5 min-w-5 px-1.5 bg-emerald-500">
                      {cartItemsCount}
                    </Badge>
                  )}
                  <ChevronRight
                    className={cn(
                      'h-4 w-4 transition-opacity',
                      isActive ? 'opacity-100' : 'opacity-30'
                    )}
                  />
                </Link>
              );
            })}

            <Link
              to="/cart"
              className={cn(
                'flex items-center justify-between py-3 px-3 rounded-xl text-sm transition-colors duration-300',
                currentPath === '/cart'
                  ? 'bg-neutral-900 text-white'
                  : 'text-neutral-800 hover:bg-neutral-50'
              )}
              style={DISPLAY}
              onClick={onClose}
            >
              <span>My Cart</span>
              <ChevronRight className="h-4 w-4 opacity-30" />
            </Link>
          </nav>
        </div>
      </div>

      <SheetFooter className="p-4 border-t border-neutral-200 mt-auto">
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
          <Button
            asChild
            className="w-full bg-neutral-900 hover:bg-neutral-800 text-white rounded-full h-11"
            onClick={onClose}
          >
            <Link to="/login" className="flex items-center justify-center gap-2" style={DISPLAY}>
              Sign in
              <ArrowUpRight size={14} />
            </Link>
          </Button>
        )}
      </SheetFooter>
    </SheetContent>
  );
}
