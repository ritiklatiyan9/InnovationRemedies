"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { cn } from '@/lib/utils';
import {
  Eye,
  EyeOff,
  Smartphone,
  ShieldCheck,
  AlertCircle,
  KeyRound,
  Lock,
  ArrowUpRight,
  ArrowLeft,
} from 'lucide-react';

const BRAND = {
  fontFamily: "Moonhouse, 'Neue Montreal Regular', sans-serif",
};
const DISPLAY = {
  fontFamily:
    "'Neue Montreal Regular', 'SF Pro Text Semibold', 'Inter', system-ui, sans-serif",
  fontWeight: 600,
};
const BODY = {
  fontFamily:
    "'Neue Montreal Regular', 'SF Pro Text Regular', system-ui, sans-serif",
};
const MONO = {
  fontFamily: "'SF Pro Text Regular', ui-monospace, monospace",
  letterSpacing: "0.2em",
};

const EASE_OUT = [0.22, 1, 0.36, 1];

/* ------------------------------ Field input ------------------------------ */
function Field({
  id,
  label,
  type = 'text',
  Icon,
  value,
  onChange,
  placeholder,
  maxLength,
  inputMode,
  disabled,
  required,
  trailing,
}) {
  const [focused, setFocused] = useState(false);
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-[10px] uppercase text-neutral-500 mb-2"
        style={MONO}
      >
        {label}
      </label>
      <div
        className={cn(
          'relative flex items-center border-b transition-colors duration-300',
          focused ? 'border-neutral-900' : 'border-neutral-200'
        )}
      >
        {Icon ? (
          <Icon
            size={16}
            className={cn(
              'mr-3 transition-colors duration-300',
              focused ? 'text-neutral-900' : 'text-neutral-400'
            )}
            aria-hidden
          />
        ) : null}
        <input
          id={id}
          type={type}
          inputMode={inputMode}
          maxLength={maxLength}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className="flex-1 bg-transparent py-3 text-[15px] text-neutral-900 placeholder:text-neutral-400 focus:outline-none disabled:opacity-60"
        />
        {trailing}
      </div>
    </div>
  );
}

/* --------------------------- Main auth component ------------------------- */
export default function AuthForm() {
  const { login, register, error, loading, isAuthenticated, clearError } = useAuth();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('login');
  const [formError, setFormError] = useState('');

  const [loginMobile, setLoginMobile] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const [registerMobile, setRegisterMobile] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showRegisterPassword, setShowRegisterPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    setFormError('');
    clearError();
    if (activeTab === 'login') {
      setRegisterMobile('');
      setRegisterPassword('');
      setConfirmPassword('');
    } else {
      setLoginMobile('');
      setLoginPassword('');
      setRememberMe(false);
    }
  }, [activeTab, clearError]);

  useEffect(() => {
    if (isAuthenticated) navigate('/');
  }, [isAuthenticated, navigate]);

  const handleMobileChange = (setter) => (e) => {
    const v = e.target.value.replace(/[^0-9]/g, '');
    if (v.length <= 10) setter(v);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setFormError('');
    clearError();
    if (!loginMobile || loginMobile.length !== 10) {
      setFormError('Please enter a valid 10-digit mobile number');
      return;
    }
    if (!loginPassword) {
      setFormError('Please enter your password');
      return;
    }
    try {
      await login(loginMobile, loginPassword);
      toast.success('Welcome back');
      navigate('/');
    } catch (err) {
      console.error('Login failed:', err);
      toast.error(err.message || 'Login failed');
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setFormError('');
    clearError();
    if (!registerMobile || !/^\d{10}$/.test(registerMobile)) {
      setFormError('Please enter a valid 10-digit mobile number');
      return;
    }
    if (!registerPassword || registerPassword.length < 6) {
      setFormError('Password must be at least 6 characters');
      return;
    }
    if (registerPassword !== confirmPassword) {
      setFormError('Passwords do not match');
      return;
    }
    try {
      await register({
        mobile: registerMobile,
        password: registerPassword,
        confirmPassword,
      });
      toast.success('Account created. Please sign in.');
      setActiveTab('login');
    } catch (err) {
      console.error('Registration failed:', err);
      toast.error(err.message || 'Registration failed');
    }
  };

  return (
    <div
      className="relative min-h-screen w-full flex bg-white"
      style={BODY}
    >
      {/* Back to home */}
      <Link
        to="/"
        className="absolute top-6 left-6 z-20 inline-flex items-center gap-2 text-[11px] uppercase text-neutral-500 hover:text-neutral-900 transition-colors"
        style={MONO}
      >
        <ArrowLeft size={14} />
        Home
      </Link>

      {/* ============================ Left panel ============================ */}
      <div className="hidden lg:flex relative w-1/2 overflow-hidden text-white">
        {/* Animated gradient */}
        <motion.div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'linear-gradient(135deg, #03060f 0%, #0a1230 25%, #0d1b4a 50%, #05071a 75%, #03060f 100%)',
            backgroundSize: '300% 300%',
          }}
          animate={{
            backgroundPosition: ['0% 0%', '100% 50%', '50% 100%', '0% 0%'],
          }}
          transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute w-[60vh] h-[60vh] rounded-full blur-3xl opacity-55"
          style={{
            background:
              'radial-gradient(circle, rgba(59,89,200,0.55) 0%, transparent 65%)',
            top: '-15%',
            left: '-10%',
          }}
          animate={{ x: [0, 60, 0], y: [0, 40, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute w-[55vh] h-[55vh] rounded-full blur-3xl opacity-45"
          style={{
            background:
              'radial-gradient(circle, rgba(27,44,120,0.6) 0%, transparent 65%)',
            bottom: '-20%',
            right: '-10%',
          }}
          animate={{ x: [0, -50, 0], y: [0, -30, 0] }}
          transition={{ duration: 24, repeat: Infinity, ease: 'easeInOut' }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20 pointer-events-none" />

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-between p-10 xl:p-14 w-full">
          <div className="flex items-center gap-3">
            <motion.span
              className="w-[6px] h-[6px] rounded-full bg-emerald-400"
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            />
            <span className="text-[11px] uppercase text-white/70" style={MONO}>
              Innovation Remedies · Meerut, IN
            </span>
          </div>

          <div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: EASE_OUT, delay: 0.2 }}
              className="text-6xl xl:text-7xl tracking-[-0.04em] leading-[0.9] mb-6"
              style={BRAND}
            >
              INNOVATION
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: EASE_OUT, delay: 0.35 }}
              className="text-lg text-white/70 max-w-sm leading-relaxed"
            >
              Advancing animal health — one trusted formulation at a time.
              Access your dashboard to track orders, partner resources, and
              more.
            </motion.p>
          </div>

          <div
            className="flex items-center justify-between text-[11px] uppercase text-white/50"
            style={MONO}
          >
            <span>Est. 2020</span>
            <span>28 States · 1200+ Clinics</span>
          </div>
        </div>
      </div>

      {/* ============================ Right panel =========================== */}
      <div className="relative flex-1 flex items-center justify-center px-6 py-20 md:py-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE_OUT }}
          className="w-full max-w-md"
        >
          {/* Mobile brand */}
          <div className="lg:hidden mb-10 text-center">
            <h1
              className="text-5xl tracking-[-0.04em] leading-[0.9] mb-2 text-neutral-900"
              style={BRAND}
            >
              INNOVATION
            </h1>
            <p className="text-xs uppercase text-neutral-500" style={MONO}>
              Remedies Life Science
            </p>
          </div>

          <p
            className="text-[11px] uppercase text-neutral-500 mb-3"
            style={MONO}
          >
            {activeTab === 'login' ? '— Sign in' : '— Create account'}
          </p>
          <h2
            className="text-3xl md:text-4xl tracking-[-0.03em] leading-tight text-neutral-900 mb-2"
            style={DISPLAY}
          >
            {activeTab === 'login'
              ? 'Welcome back.'
              : 'Join Innovation Remedies.'}
          </h2>
          <p className="text-sm text-neutral-500 mb-10">
            {activeTab === 'login'
              ? 'Sign in with your mobile number to continue.'
              : 'Create an account in under a minute.'}
          </p>

          {/* Tab toggle */}
          <div className="relative inline-flex items-center p-1 rounded-full bg-neutral-100 mb-8">
            {['login', 'register'].map((t) => {
              const isActive = activeTab === t;
              return (
                <button
                  key={t}
                  onClick={() => setActiveTab(t)}
                  className={cn(
                    'relative z-10 px-5 py-2 text-xs uppercase tracking-[0.2em] transition-colors duration-300',
                    isActive ? 'text-white' : 'text-neutral-500'
                  )}
                  style={MONO}
                >
                  {isActive && (
                    <motion.span
                      layoutId="tabHighlight"
                      className="absolute inset-0 bg-neutral-900 rounded-full -z-10"
                      transition={{ duration: 0.4, ease: EASE_OUT }}
                    />
                  )}
                  {t === 'login' ? 'Sign in' : 'Create'}
                </button>
              );
            })}
          </div>

          {/* Error */}
          <AnimatePresence>
            {(formError || error) && (
              <motion.div
                initial={{ opacity: 0, y: -6, height: 0 }}
                animate={{ opacity: 1, y: 0, height: 'auto' }}
                exit={{ opacity: 0, y: -6, height: 0 }}
                transition={{ duration: 0.3 }}
                className="mb-6"
              >
                <div className="flex items-start gap-2.5 p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-700">
                  <AlertCircle size={15} className="mt-0.5 shrink-0" />
                  <p className="text-xs">{formError || error}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Forms */}
          <div className="relative">
            <AnimatePresence mode="wait" initial={false}>
              {activeTab === 'login' ? (
                <motion.form
                  key="login"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.35, ease: EASE_OUT }}
                  onSubmit={handleLogin}
                  className="space-y-6"
                >
                  <Field
                    id="login-mobile"
                    label="Mobile number"
                    type="tel"
                    inputMode="numeric"
                    maxLength={10}
                    Icon={Smartphone}
                    placeholder="10-digit number"
                    value={loginMobile}
                    onChange={handleMobileChange(setLoginMobile)}
                    disabled={loading}
                    required
                  />
                  <Field
                    id="login-password"
                    label="Password"
                    type={showLoginPassword ? 'text' : 'password'}
                    Icon={KeyRound}
                    placeholder="Your password"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    disabled={loading}
                    required
                    trailing={
                      <button
                        type="button"
                        onClick={() => setShowLoginPassword(!showLoginPassword)}
                        className="p-1.5 text-neutral-400 hover:text-neutral-900 transition-colors"
                        aria-label={
                          showLoginPassword ? 'Hide password' : 'Show password'
                        }
                      >
                        {showLoginPassword ? (
                          <EyeOff size={16} />
                        ) : (
                          <Eye size={16} />
                        )}
                      </button>
                    }
                  />

                  <div className="flex items-center justify-between">
                    <label className="flex items-center gap-2 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        className="w-4 h-4 rounded-[3px] border-neutral-300 accent-neutral-900"
                      />
                      <span className="text-xs text-neutral-600">
                        Remember me
                      </span>
                    </label>
                    <button
                      type="button"
                      className="text-xs text-neutral-900 underline-offset-4 hover:underline"
                    >
                      Forgot password?
                    </button>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="group w-full inline-flex items-center justify-between gap-3 px-6 py-4 rounded-full bg-neutral-900 text-white hover:bg-neutral-800 disabled:opacity-60 transition-colors duration-300 active:scale-[0.98]"
                    style={DISPLAY}
                  >
                    <span className="text-sm">
                      {loading ? 'Signing in…' : 'Sign in'}
                    </span>
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-white/10 overflow-hidden relative">
                      <ArrowUpRight
                        size={14}
                        className="transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-4 group-hover:-translate-y-4"
                      />
                      <ArrowUpRight
                        size={14}
                        className="absolute transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] -translate-x-4 translate-y-4 group-hover:translate-x-0 group-hover:translate-y-0"
                      />
                    </span>
                  </button>
                </motion.form>
              ) : (
                <motion.form
                  key="register"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.35, ease: EASE_OUT }}
                  onSubmit={handleRegister}
                  className="space-y-6"
                >
                  <Field
                    id="register-mobile"
                    label="Mobile number"
                    type="tel"
                    inputMode="numeric"
                    maxLength={10}
                    Icon={Smartphone}
                    placeholder="10-digit number"
                    value={registerMobile}
                    onChange={handleMobileChange(setRegisterMobile)}
                    disabled={loading}
                    required
                  />
                  <Field
                    id="register-password"
                    label="Create password"
                    type={showRegisterPassword ? 'text' : 'password'}
                    Icon={Lock}
                    placeholder="Minimum 6 characters"
                    value={registerPassword}
                    onChange={(e) => setRegisterPassword(e.target.value)}
                    disabled={loading}
                    required
                    trailing={
                      <button
                        type="button"
                        onClick={() =>
                          setShowRegisterPassword(!showRegisterPassword)
                        }
                        className="p-1.5 text-neutral-400 hover:text-neutral-900 transition-colors"
                        aria-label={
                          showRegisterPassword
                            ? 'Hide password'
                            : 'Show password'
                        }
                      >
                        {showRegisterPassword ? (
                          <EyeOff size={16} />
                        ) : (
                          <Eye size={16} />
                        )}
                      </button>
                    }
                  />
                  <Field
                    id="confirm-password"
                    label="Confirm password"
                    type={showConfirmPassword ? 'text' : 'password'}
                    Icon={ShieldCheck}
                    placeholder="Re-enter password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    disabled={loading}
                    required
                    trailing={
                      <button
                        type="button"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        className="p-1.5 text-neutral-400 hover:text-neutral-900 transition-colors"
                        aria-label={
                          showConfirmPassword
                            ? 'Hide password'
                            : 'Show password'
                        }
                      >
                        {showConfirmPassword ? (
                          <EyeOff size={16} />
                        ) : (
                          <Eye size={16} />
                        )}
                      </button>
                    }
                  />

                  <button
                    type="submit"
                    disabled={loading}
                    className="group w-full inline-flex items-center justify-between gap-3 px-6 py-4 rounded-full bg-neutral-900 text-white hover:bg-neutral-800 disabled:opacity-60 transition-colors duration-300 active:scale-[0.98]"
                    style={DISPLAY}
                  >
                    <span className="text-sm">
                      {loading ? 'Creating account…' : 'Create account'}
                    </span>
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-white/10 overflow-hidden relative">
                      <ArrowUpRight
                        size={14}
                        className="transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-4 group-hover:-translate-y-4"
                      />
                      <ArrowUpRight
                        size={14}
                        className="absolute transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] -translate-x-4 translate-y-4 group-hover:translate-x-0 group-hover:translate-y-0"
                      />
                    </span>
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>

          <p
            className="mt-10 text-[11px] uppercase text-neutral-400 text-center"
            style={MONO}
          >
            Protected by industry-standard encryption
          </p>
        </motion.div>
      </div>
    </div>
  );
}
