"use client";

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'; // Added CardDescription
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext'; // Adjust path if needed
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { cn } from '@/lib/utils'; // Assuming you have this utility
import { Eye, EyeOff, Lock, Smartphone, ShieldCheck, AlertCircle, KeyRound } from 'lucide-react'; // Using Lucide icons

// --- Google SVG Icon ---
const GoogleIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="24px" height="24px" {...props}>
    <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12 s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20 s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z" />
    <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657 C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z" />
    <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36 c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z" />
    <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.574l6.19,5.238 C42.012,35.846,44,30.138,44,24C44,22.659,43.862,21.35,43.611,20.083z" />
  </svg>
);


// --- Main Auth Form Component ---
export default function AuthForm() {
  const { login, register, error, loading, isAuthenticated, clearError } = useAuth();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("login");
  const [formError, setFormError] = useState('');

  // Login states - Changed loginMobile from array to string
  const [loginMobileNumber, setLoginMobileNumber] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  // Register states
  const [registerMobile, setRegisterMobile] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showRegisterPassword, setShowRegisterPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    setFormError('');
    clearError();
    // Reset fields when tab changes for better UX
    if (activeTab === 'login') {
      setRegisterMobile('');
      setRegisterPassword('');
      setConfirmPassword('');
    } else {
      setLoginMobileNumber('');
      setLoginPassword('');
      setRememberMe(false);
    }
  }, [activeTab, clearError]);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  // --- Input Handlers ---
  const handleMobileInputChange = (setter) => (e) => {
    const value = e.target.value.replace(/[^0-9]/g, ''); // Allow only digits
    if (value.length <= 10) { // Limit to 10 digits
       setter(value);
    }
  };

  // --- Submit Handlers ---
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setFormError('');
    clearError();

    if (!loginMobileNumber || loginMobileNumber.length !== 10) {
      setFormError('Please enter a valid 10-digit mobile number');
      return;
    }
    if (!loginPassword) {
      setFormError('Please enter your password');
      return;
    }
    try {
      await login(loginMobileNumber, loginPassword); // Use loginMobileNumber directly
      toast.success('Login successful!');
      navigate('/');
    } catch (err) {
      console.error("Login failed:", err);
      toast.error(err.message || 'Login failed');
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setFormError('');
    clearError();
    if (!registerMobile || !/^\d{10}$/.test(registerMobile)) {
      setFormError('Please enter a valid 10-digit mobile number');
      return;
    }
    if (!registerPassword || registerPassword.length < 6) {
        setFormError('Password must be at least 6 characters long');
        return;
    }
    if (registerPassword !== confirmPassword) {
      setFormError('Passwords do not match!');
      return;
    }
    try {
      await register({ mobile: registerMobile, password: registerPassword, confirmPassword : confirmPassword, });
      toast.success('Registration successful! Please login.');
      setActiveTab('login'); // Switch to login automatically
    } catch (err) {
      console.error("Registration failed:", err);
      toast.error(err.message || 'Registration failed');
    }
  };

  // --- Styling & Animation ---
  const inputBaseClasses = "flex h-11 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"; // Reduced ring offset slightly
  const inputWithIconClasses = `${inputBaseClasses} pl-10`;
  const iconWrapperClasses = "absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground";
  const passwordToggleClasses = "absolute inset-y-0 right-0 flex items-center pr-3 text-muted-foreground hover:text-foreground cursor-pointer";

  const triggerBaseStyle = "flex-1 py-2.5 px-2 sm:px-4 text-sm font-medium rounded-full transition-all duration-300 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2";
  const triggerActiveStyle = "bg-primary text-primary-foreground shadow-sm"; // Slightly reduced shadow
  const triggerInactiveStyle = "text-muted-foreground hover:bg-muted/60 hover:text-foreground";

  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.4, ease: "easeOut" } }
  };

  const formVariants = {
    enter: (direction) => ({ x: direction > 0 ? 25 : -25, opacity: 0 }),
    center: { x: 0, opacity: 1, transition: { duration: 0.35, ease: "easeOut" } },
    exit: (direction) => ({ x: direction < 0 ? 25 : -25, opacity: 0, position: 'absolute', width: '100%', transition: { duration: 0.25, ease: "easeIn" } }) // Added position absolute for smoother exit
  };

  const motionProps = {
    custom: activeTab === 'login' ? 1 : -1,
    initial: "enter", animate: "center", exit: "exit", variants: formVariants,
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 p-4"> {/* Changed gradient */}
      <motion.div initial="hidden" animate="visible" variants={cardVariants} className="w-full max-w-md">
        <Card className="w-full shadow-lg bg-card rounded-xl overflow-hidden border border-border/50"> {/* Refined card appearance */}
          <CardHeader className="p-5 sm:p-6 pb-3 text-center">
            <CardTitle className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
              {activeTab === 'login' ? 'Welcome Back!' : 'Create Account'}
            </CardTitle>
            <CardDescription className="text-xs sm:text-sm text-muted-foreground pt-1">
               {activeTab === 'login' ? 'Login using your mobile number.' : 'Enter your details to register.'}
            </CardDescription>
          </CardHeader>

          <div className="px-4 sm:px-6 pb-5">
            <Tabs defaultValue="login" value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-muted p-1 rounded-full h-auto mb-5 sm:mb-6">
                <TabsTrigger value="login" className={cn(triggerBaseStyle, activeTab === 'login' ? triggerActiveStyle : triggerInactiveStyle)}>Login</TabsTrigger>
                <TabsTrigger value="register" className={cn(triggerBaseStyle, activeTab === 'register' ? triggerActiveStyle : triggerInactiveStyle)}>Register</TabsTrigger>
              </TabsList>

              {/* Error Alert */}
              <AnimatePresence>
                 {(formError || error) && (
                   <motion.div
                       initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
                       transition={{ duration: 0.3 }} className="mb-4"
                   >
                       <Alert variant="destructive" className="p-3 rounded-md">
                           <AlertCircle className="h-4 w-4" />
                           <AlertTitle className="text-sm font-medium">Error</AlertTitle>
                           <AlertDescription className="text-xs">
                               {formError || error}
                           </AlertDescription>
                       </Alert>
                   </motion.div>
                 )}
              </AnimatePresence>

              {/* Form Content Area with fixed height for smooth animation */}
              <div className="relative overflow-hidden min-h-[310px] sm:min-h-[330px]"> {/* Adjusted min-height */}
                 <AnimatePresence initial={false} custom={activeTab === 'login' ? 1 : -1}>
                    {/* Login Form */}
                    {activeTab === 'login' && (
                      <motion.div key="login" {...motionProps}>
                        <TabsContent value="login" className="mt-0 border-0 p-0">
                          <form onSubmit={handleLoginSubmit} className="space-y-4 sm:space-y-5">
                            {/* Mobile Number Input */}
                            <div className="space-y-1.5">
                              <Label htmlFor="login-mobile" className="text-xs sm:text-sm font-medium text-muted-foreground pl-1">Mobile Number</Label>
                              <div className="relative">
                                <Smartphone className={iconWrapperClasses} aria-hidden="true" />
                                <Input
                                  id="login-mobile"
                                  type="tel"
                                  inputMode='numeric'
                                  placeholder="Enter 10-digit mobile number"
                                  maxLength={10}
                                  value={loginMobileNumber}
                                  onChange={handleMobileInputChange(setLoginMobileNumber)} // Use reusable handler
                                  required
                                  disabled={loading}
                                  className={inputWithIconClasses}
                                />
                              </div>
                            </div>
                            {/* Password Input */}
                            <div className="space-y-1.5">
                              <Label htmlFor="login-password" className="text-xs sm:text-sm font-medium text-muted-foreground pl-1">Password</Label>
                              <div className="relative">
                                <KeyRound className={iconWrapperClasses} aria-hidden="true" />
                                <Input id="login-password" type={showLoginPassword ? 'text' : 'password'} placeholder="Enter your password" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} required disabled={loading} className={inputWithIconClasses} />
                                <button type="button" onClick={() => setShowLoginPassword(!showLoginPassword)} className={passwordToggleClasses} aria-label={showLoginPassword ? "Hide password" : "Show password"}>
                                  {showLoginPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                </button>
                              </div>
                            </div>
                            {/* Remember Me & Forgot Password */}
                            <div className="flex items-center justify-between text-xs sm:text-sm pt-1">
                              <div className="flex items-center space-x-2">
                                <Checkbox id="remember-me" checked={rememberMe} onCheckedChange={(checked) => setRememberMe(!!checked)} disabled={loading} className="data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground rounded-[4px]" /> {/* Slightly less rounded checkbox */}
                                <Label htmlFor="remember-me" className="font-medium text-foreground cursor-pointer select-none">Remember me</Label>
                              </div>
                              <Button variant="link" type="button" className="p-0 h-auto text-xs sm:text-sm text-primary hover:text-primary/80 hover:no-underline" disabled={loading}>Forgot Password?</Button>
                            </div>
                            {/* Login Button */}
                            <Button type="submit" className="w-full h-11 rounded-md text-sm font-semibold mt-3 sm:mt-4 shadow-sm transition-all duration-300 hover:shadow-md disabled:opacity-70" disabled={loading}>
                              {loading ? 'Logging in...' : 'Login'}
                            </Button>
                          </form>
                        </TabsContent>
                       </motion.div>
                     )}

                     {/* Register Form */}
                     {activeTab === 'register' && (
                        <motion.div key="register" {...motionProps}>
                          <TabsContent value="register" className="mt-0 border-0 p-0">
                            <form onSubmit={handleRegisterSubmit} className="space-y-4 sm:space-y-5">
                              {/* Mobile Number Input */}
                              <div className="space-y-1.5">
                                <Label htmlFor="register-mobile" className="text-xs sm:text-sm font-medium text-muted-foreground pl-1">Mobile Number</Label>
                                <div className="relative">
                                  <Smartphone className={iconWrapperClasses} aria-hidden="true" />
                                  <Input id="register-mobile" type="tel" inputMode='numeric' placeholder="Enter 10-digit mobile number" maxLength={10} value={registerMobile} onChange={handleMobileInputChange(setRegisterMobile)} required disabled={loading} className={inputWithIconClasses} />
                                </div>
                              </div>
                              {/* Password Input */}
                              <div className="space-y-1.5">
                                <Label htmlFor="register-password" className="text-xs sm:text-sm font-medium text-muted-foreground pl-1">Create Password</Label>
                                <div className="relative">
                                  <Lock className={iconWrapperClasses} aria-hidden="true" />
                                  <Input id="register-password" type={showRegisterPassword ? 'text' : 'password'} placeholder="Minimum 6 characters" value={registerPassword} onChange={(e) => setRegisterPassword(e.target.value)} required disabled={loading} className={inputWithIconClasses} />
                                  <button type="button" onClick={() => setShowRegisterPassword(!showRegisterPassword)} className={passwordToggleClasses} aria-label={showRegisterPassword ? "Hide password" : "Show password"}>
                                    {showRegisterPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                  </button>
                                </div>
                              </div>
                              {/* Confirm Password Input */}
                              <div className="space-y-1.5">
                                <Label htmlFor="confirm-password" className="text-xs sm:text-sm font-medium text-muted-foreground pl-1">Confirm Password</Label>
                                <div className="relative">
                                   <ShieldCheck className={iconWrapperClasses} aria-hidden="true" />
                                  <Input id="confirm-password" type={showConfirmPassword ? 'text' : 'password'} placeholder="Re-enter your password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required disabled={loading} className={inputWithIconClasses} />
                                  <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className={passwordToggleClasses} aria-label={showConfirmPassword ? "Hide password" : "Show password"}>
                                    {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                  </button>
                                </div>
                              </div>
                              {/* Register Button */}
                              <Button type="submit" className="w-full h-11 rounded-md text-sm font-semibold mt-3 sm:mt-4 shadow-sm transition-all duration-300 hover:shadow-md disabled:opacity-70" disabled={loading}>
                                {loading ? 'Registering...' : 'Create Account'}
                              </Button>
                            </form>
                          </TabsContent>
                        </motion.div>
                     )}
                 </AnimatePresence>
              </div>
            </Tabs>
          </div>

          {/* Footer with Social Login */}
        
        </Card>
      </motion.div>
    </div>
  );
}