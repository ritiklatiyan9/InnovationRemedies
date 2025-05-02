"use client";

import React, { useState, useEffect, useRef, createRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext'; // Import our auth hook
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast'; // Optional for notifications

const OTPInput = ({ length, value, onChange }) => {
  const inputsRef = useRef([]);

  // Ensure we have exactly `length` refs
  if (inputsRef.current.length !== length) {
    inputsRef.current = Array(length)
      .fill(null)
      .map((_, i) => inputsRef.current[i] || createRef());
  }

  const handleChange = (idx, e) => {
    const val = e.target.value;
    const newArr = [...value];
    newArr[idx] = val;
    onChange(newArr);
    if (val && idx < length - 1) {
      inputsRef.current[idx + 1]?.focus();
    }
  };

  const handleKeyDown = (idx, e) => {
    if (e.key === 'Backspace' && !value[idx] && idx > 0) {
      const newArr = [...value];
      newArr[idx - 1] = '';
      inputsRef.current[idx - 1]?.focus();
    }
  };

  return (
    <div className="flex space-x-1 justify-center">
      {Array.from({ length }).map((_, i) => (
        <input
          key={i}
          ref={el => (inputsRef.current[i] = el)}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={value[i]}
          onChange={e => handleChange(i, e)}
          onKeyDown={e => handleKeyDown(i, e)}
          className="w-10 h-10 text-center border border-gray-300 rounded-md focus:ring-1 focus:ring-green-400 focus:border-green-400"
        />
      ))}
    </div>
  );
};

export default function AuthForm() {
  // Use our auth context
  const { login, register, error, loading, isAuthenticated, clearError } = useAuth();
  const navigate = useNavigate();

  // Login states
  const [loginMobile, setLoginMobile] = useState(Array(10).fill(''));
  const [loginPassword, setLoginPassword] = useState('');
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  
  // Register states
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showRegisterPassword, setShowRegisterPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [activeTab, setActiveTab] = useState("login");
  const [isAnimating, setIsAnimating] = useState(false);
  const [formError, setFormError] = useState('');

  // Clear any form errors when changing tabs
  useEffect(() => {
    setIsAnimating(true);
    setFormError('');
    clearError();
    const timer = setTimeout(() => setIsAnimating(false), 500);
    return () => clearTimeout(timer);
  }, [activeTab]);

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const [rememberMe, setRememberMe] = useState(false);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      setFormError('');
      const mobileNumber = loginMobile.join('');
      
      if (mobileNumber.length !== 10) {
        setFormError('Please enter a valid 10-digit mobile number');
        return;
      }
      
      await login(mobileNumber, loginPassword);
      // Success notification
      toast.success('Login successful!');
      navigate('/');
    } catch (error) {
      setFormError(error.message || 'Login failed. Please try again.');
      toast.error(error.message || 'Login failed');
    }
  };
  
  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    try {
      setFormError('');
      
      if (password !== confirmPassword) {
        setFormError('Passwords do not match!');
        return;
      }
      
      await register({
        mobile,
        password,
        confirmPassword,
        role: 'user'
      });
      
      // Success notification
      toast.success('Registration successful!');
      setActiveTab('login');
    } catch (error) {
      setFormError(error.message || 'Registration failed. Please try again.');
      toast.error(error.message || 'Registration failed');
    }
  };

  const toggleLoginPasswordVisibility = () => setShowLoginPassword(!showLoginPassword);
  const toggleRegisterPasswordVisibility = () => setShowRegisterPassword(!showRegisterPassword);
  const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword);

  const inputStyle = "pl-10 pr-4 py-2 h-12 border border-gray-200 rounded-xl focus:ring-1 focus:ring-green-400 focus:border-green-400 bg-white";
  const iconStyle = "absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400";

  const triggerBaseStyle = "flex-1 text-center py-2 rounded-full transition-all duration-300 ease-in-out";
  const triggerActiveStyle = "bg-white text-black shadow-md";
  const triggerInactiveStyle = "bg-gray-100 text-gray-500";

  const leftVariants = {
    hidden: { x: -100, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  const rightVariants = {
    hidden: { x: 100, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-white p-4">
      <Card className="w-full max-w-md shadow-xl bg-white rounded-3xl overflow-hidden border-0">
        <div className="p-6 pb-2">
          <Tabs defaultValue="login" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="bg-gray-100 p-1 rounded-full flex mb-8">
              <TabsTrigger
                value="login"
                className={`${triggerBaseStyle} ${activeTab === 'login' ? triggerActiveStyle : triggerInactiveStyle}`}
              >
                Login
              </TabsTrigger>
              <TabsTrigger
                value="register"
                className={`${triggerBaseStyle} ${activeTab === 'register' ? triggerActiveStyle : triggerInactiveStyle}`}
              >
                Register
              </TabsTrigger>
            </TabsList>

            {/* Error message display */}
            {(formError || error) && (
              <div className="bg-red-50 text-red-500 p-3 rounded-lg mb-4 text-sm">
                {formError || error}
              </div>
            )}

            {/* Login Form */}
            <TabsContent value="login" className="mt-0">
              <form onSubmit={handleLoginSubmit}>
                <CardContent className="space-y-5 p-0">
                  {/* Mobile Number Boxes */}
                  <motion.div
                    className="space-y-1"
                    initial="hidden"
                    animate="visible"
                    variants={leftVariants}
                  >
                    <Label className="text-xs text-gray-500 pl-3">Mobile Number</Label>
                    <OTPInput
                      length={10}
                      value={loginMobile}
                      onChange={setLoginMobile}
                    />
                  </motion.div>

                  {/* Password */}
                  <motion.div
                    className="space-y-1"
                    initial="hidden"
                    animate="visible"
                    variants={rightVariants}
                  >
                    <Label htmlFor="login-password" className="text-xs text-gray-500 pl-3">Password</Label>
                    <div className="relative">
                      <svg
                        className={iconStyle}
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                      <Input
                        id="login-password"
                        type={showLoginPassword ? 'text' : 'password'}
                        placeholder="Your Password"
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                        required
                        className={`${inputStyle} pr-10`}
                      />
                      <button
                        type="button"
                        onClick={toggleLoginPasswordVisibility}
                        className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
                        aria-label={showLoginPassword ? "Hide password" : "Show password"}
                      >
                        {showLoginPassword ? (
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                          </svg>
                        ) : (
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        )}
                      </button>
                    </div>
                  </motion.div>

                  {/* Remember Me & Forgot Password */}
                  <motion.div
                    className="flex items-center justify-between text-sm pt-2"
                    initial="hidden"
                    animate="visible"
                    variants={leftVariants}
                    transition={{ delay: 0.1 }}
                  >
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="remember-me"
                        checked={rememberMe}
                        onCheckedChange={(checked) => setRememberMe(!!checked)}
                        className="border-gray-300 rounded data-[state=checked]:bg-[#8DAA91] data-[state=checked]:border-[#8DAA91]"
                      />
                      <Label htmlFor="remember-me" className="font-medium text-gray-600 cursor-pointer">
                        Remember me
                      </Label>
                    </div>
                    <Button variant="link" type="button" className="p-0 h-auto text-[#8DAA91] hover:text-[#7c9981] hover:no-underline">
                      Forgot Password?
                    </Button>
                  </motion.div>

                  {/* Login Button */}
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 300, damping: 24 }}
                  >
                    <Button 
                      type="submit" 
                      className="w-full bg-[#8DAA91] hover:bg-[#7c9981] text-white h-12 rounded-full text-base font-semibold mt-6 shadow-md transition-all duration-300 hover:shadow-lg transform hover:-translate-y-0.5"
                      disabled={loading}
                    >
                      {loading ? 'Logging in...' : 'Login'}
                    </Button>
                  </motion.div>
                </CardContent>
              </form>
            </TabsContent>

            {/* Register Form */}
            <TabsContent value="register" className="mt-0">
              <form onSubmit={handleRegisterSubmit}>
                <CardContent className="space-y-5 p-0">
                  {/* Mobile Number */}
                  <motion.div
                    className="space-y-1"
                    initial="hidden"
                    animate="visible"
                    variants={rightVariants}
                  >
                    <Label htmlFor="mobile" className="text-xs text-gray-500 pl-3">Mobile Number</Label>
                    <div className="relative">
                      <svg
                        className={iconStyle}
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                      </svg>
                      <Input
                        id="mobile"
                        type="tel"
                        placeholder="Your Mobile Number"
                        value={mobile}
                        onChange={(e) => setMobile(e.target.value)}
                        required
                        className={inputStyle}
                      />
                    </div>
                  </motion.div>

                  {/* Password */}
                  <motion.div
                    className="space-y-1"
                    initial="hidden"
                    animate="visible"
                    variants={leftVariants}
                    transition={{ delay: 0.1 }}
                  >
                    <Label htmlFor="register-password" className="text-xs text-gray-500 pl-3">Password</Label>
                    <div className="relative">
                      <svg
                        className={iconStyle}
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                      <Input
                        id="register-password"
                        type={showRegisterPassword ? 'text' : 'password'}
                        placeholder="Create Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className={`${inputStyle} pr-10`}
                      />
                      <button
                        type="button"
                        onClick={toggleRegisterPasswordVisibility}
                        className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
                        aria-label={showRegisterPassword ? "Hide password" : "Show password"}
                      >
                        {showRegisterPassword ? (
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                          </svg>
                        ) : (
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        )}
                      </button>
                    </div>
                  </motion.div>

                  {/* Confirm Password */}
                  <motion.div
                    className="space-y-1"
                    initial="hidden"
                    animate="visible"
                    variants={rightVariants}
                    transition={{ delay: 0.1 }}
                  >
                    <Label htmlFor="confirm-password" className="text-xs text-gray-500 pl-3">Confirm Password</Label>
                    <div className="relative">
                      <svg
                        className={iconStyle}
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                      <Input
                        id="confirm-password"
                        type={showConfirmPassword ? 'text' : 'password'}
                        placeholder="Confirm Your Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        className={`${inputStyle} pr-10`}
                      />
                      <button
                        type="button"
                        onClick={toggleConfirmPasswordVisibility}
                        className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
                        aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                      >
                        {showConfirmPassword ? (
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                          </svg>
                        ) : (
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        )}
                      </button>
                    </div>
                  </motion.div>

                  {/* Register Button */}
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 300, damping: 24 }}
                  >
                    <Button 
                      type="submit" 
                      className="w-full bg-[#8DAA91] hover:bg-[#7c9981] text-white h-12 rounded-full text-base font-semibold mt-6 shadow-md transition-all duration-300 hover:shadow-lg transform hover:-translate-y-0.5"
                      disabled={loading}
                    >
                      {loading ? 'Registering...' : 'Register'}
                    </Button>
                  </motion.div>
                </CardContent>
              </form>
            </TabsContent>

          </Tabs>
        </div>

        {/* Social Login Section */}
        <CardFooter className="flex flex-col space-y-4 pt-6 pb-8 px-6 bg-white">
          <motion.div
            className="relative w-full flex items-center justify-center my-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative bg-white px-3 text-sm text-gray-500">
              Or login with
            </div>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4, type: "spring", stiffness: 300, damping: 24 }}
            >
              <Button variant="outline" className="w-full h-12 rounded-full border-gray-300 bg-white hover:bg-gray-50 text-gray-700 font-medium flex items-center justify-center gap-2 transition-all duration-300 hover:shadow-md">
                {/* … Google SVG … */}
                Google
              </Button>
            </motion.div>
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4, type: "spring", stiffness: 300, damping: 24 }}
            >
              <Button variant="outline" className="w-full h-12 rounded-full border-gray-300 bg-white hover:bg-gray-50 text-gray-700 font-medium flex items-center justify-center gap-2 transition-all duration-300 hover:shadow-md">
                {/* … Facebook SVG … */}
                Facebook
              </Button>
            </motion.div>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
} 