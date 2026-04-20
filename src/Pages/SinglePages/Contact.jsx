import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowUpRight,
  ArrowLeft,
  Mail,
  Phone,
  MapPin,
  Clock,
  ChevronDown,
} from 'lucide-react';
import logo from '../../assets/Images/logo.png';

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
  letterSpacing: '0.2em',
};

const EASE_OUT = [0.22, 1, 0.36, 1];

const countries = [
  { code: 'IN', name: 'India', flag: '🇮🇳', dial: '+91' },
  { code: 'AU', name: 'Australia', flag: '🇦🇺', dial: '+61' },
  { code: 'US', name: 'United States', flag: '🇺🇸', dial: '+1' },
  { code: 'GB', name: 'United Kingdom', flag: '🇬🇧', dial: '+44' },
];

/* ------------------------------- Field ----------------------------------- */
function Field({
  id,
  label,
  type = 'text',
  value,
  onChange,
  placeholder,
  disabled,
  required,
  trailing,
  as = 'input',
  rows = 4,
}) {
  const [focused, setFocused] = useState(false);
  const Tag = as;
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
        className={`relative flex items-start border-b transition-colors duration-300 ${
          focused ? 'border-neutral-900' : 'border-neutral-200'
        }`}
      >
        <Tag
          id={id}
          {...(as === 'input' ? { type } : { rows })}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className="flex-1 bg-transparent py-3 pr-3 text-[15px] text-neutral-900 placeholder:text-neutral-400 focus:outline-none disabled:opacity-60 resize-none"
        />
        {trailing}
      </div>
    </div>
  );
}

/* ----------------------------- Country select ---------------------------- */
function CountrySelect({ value, onChange }) {
  const [open, setOpen] = useState(false);
  const current = countries.find((c) => c.code === value) || countries[0];

  useEffect(() => {
    if (!open) return;
    const close = () => setOpen(false);
    window.addEventListener('click', close);
    return () => window.removeEventListener('click', close);
  }, [open]);

  return (
    <div className="relative" onClick={(e) => e.stopPropagation()}>
      <label
        className="block text-[10px] uppercase text-neutral-500 mb-2"
        style={MONO}
      >
        Country
      </label>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full border-b border-neutral-200 py-3 pr-2 text-[15px] text-neutral-900 hover:border-neutral-900 transition-colors"
      >
        <span className="flex items-center gap-3">
          <span className="text-lg">{current.flag}</span>
          <span>{current.name}</span>
          <span className="text-neutral-400 text-sm">{current.dial}</span>
        </span>
        <ChevronDown
          size={16}
          className={`text-neutral-500 transition-transform duration-300 ${
            open ? 'rotate-180' : ''
          }`}
        />
      </button>
      {open && (
        <motion.ul
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2, ease: EASE_OUT }}
          className="absolute left-0 right-0 top-full mt-2 bg-white border border-neutral-200 rounded-xl shadow-xl overflow-hidden z-20"
        >
          {countries.map((c) => (
            <li key={c.code}>
              <button
                type="button"
                onClick={() => {
                  onChange(c.code);
                  setOpen(false);
                }}
                className="flex items-center gap-3 w-full px-4 py-3 text-left hover:bg-neutral-50 text-sm"
              >
                <span className="text-lg">{c.flag}</span>
                <span className="flex-1 text-neutral-900">{c.name}</span>
                <span className="text-neutral-400 text-xs">{c.dial}</span>
              </button>
            </li>
          ))}
        </motion.ul>
      )}
    </div>
  );
}

/* ============================== Contact page ============================= */
export default function ContactPage() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [country, setCountry] = useState('IN');
  const [sending, setSending] = useState(false);

  const domain = 'https://www.innovationremedies.com';
  const canonicalUrl = `${domain}/contact`;
  const ogImageUrl = `${domain}${logo}`;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSending(true);
    const current = countries.find((c) => c.code === country) || countries[0];
    const whatsappNumber = '918938963778';
    const text = `
New Inquiry — Innovation Remedies
--------------------------------
First name: ${firstName}
Last name: ${lastName}
Mobile: ${mobile}
Email: ${email}
Country: ${current.name} (${current.code})
Message: ${message}
--------------------------------
    `.trim();
    const encoded = encodeURIComponent(text);
    window.open(`https://wa.me/${whatsappNumber}?text=${encoded}`, '_blank');

    setFirstName('');
    setLastName('');
    setMobile('');
    setEmail('');
    setMessage('');
    setCountry('IN');
    setTimeout(() => setSending(false), 600);
  };

  return (
    <div className="relative min-h-screen w-full bg-white" style={BODY}>
      <Helmet>
        <title>Contact Innovation Remedies | Veterinary Solutions in India</title>
        <meta
          name="description"
          content="Get in touch with Innovation Remedies for advanced veterinary products in India. We respond within 24 hours."
        />
        <meta
          name="keywords"
          content="Innovation Remedies contact, veterinary care, pet wellness contact, vet supplies in Uttar Pradesh"
        />
        <link rel="canonical" href={canonicalUrl} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Contact Innovation Remedies | Veterinary Solutions in India" />
        <meta property="og:description" content="Get in touch with Innovation Remedies for advanced veterinary products in India" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content={ogImageUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Innovation Remedies" />
        <meta name="geo.region" content="IN-UP" />
        <meta name="geo.placename" content="Meerut" />
        <meta name="geo.position" content="28.9803;77.7039" />
        <meta name="ICBM" content="28.9803, 77.7039" />
      </Helmet>

      <div className="flex min-h-screen">
        {/* ============================ Left panel ============================ */}
        <aside className="hidden lg:flex relative w-[45%] overflow-hidden text-white">
          {/* Deep gradient base */}
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(135deg, #05070f 0%, #080d20 45%, #050814 75%, #05070f 100%)',
            }}
          />
          {/* Ambient orbs */}
          <motion.div
            className="absolute w-[60vh] h-[60vh] rounded-full blur-3xl"
            style={{
              background:
                'radial-gradient(circle, rgba(59,89,200,0.4) 0%, transparent 65%)',
              top: '-20%',
              left: '-15%',
            }}
            animate={{ x: [0, 30, 0], y: [0, 20, 0] }}
            transition={{ duration: 40, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute w-[65vh] h-[65vh] rounded-full blur-3xl"
            style={{
              background:
                'radial-gradient(circle, rgba(27,44,120,0.4) 0%, transparent 65%)',
              bottom: '-25%',
              right: '-10%',
            }}
            animate={{ x: [0, -25, 0], y: [0, -20, 0] }}
            transition={{ duration: 50, repeat: Infinity, ease: 'easeInOut' }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/25 pointer-events-none" />

          {/* Content */}
          <div className="relative z-10 flex flex-col justify-between p-10 xl:p-14 w-full">
            <div className="flex items-center gap-3">
              <motion.span
                className="w-[6px] h-[6px] rounded-full bg-emerald-400"
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
              <span
                className="text-[11px] uppercase text-white/70"
                style={MONO}
              >
                Contact · Available Mon – Sat
              </span>
            </div>

            <div>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: EASE_OUT, delay: 0.1 }}
                className="text-[11px] uppercase text-white/50 mb-6"
                style={MONO}
              >
                — Get in touch
              </motion.p>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: EASE_OUT, delay: 0.2 }}
                className="text-5xl xl:text-6xl tracking-[-0.035em] leading-[1.02] mb-6"
                style={DISPLAY}
              >
                Let's build
                <br />
                <span className="italic font-light text-white/60">
                  something together.
                </span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: EASE_OUT, delay: 0.35 }}
                className="text-base text-white/65 max-w-md leading-relaxed mb-10"
              >
                Distributor, veterinarian, or farm owner — we'd love to hear
                from you. Typical response within 24 hours.
              </motion.p>

              {/* Contact cards */}
              <motion.ul
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="space-y-5"
              >
                <li className="flex items-start gap-4">
                  <span className="flex items-center justify-center w-10 h-10 rounded-full border border-white/15 shrink-0">
                    <Phone size={14} />
                  </span>
                  <div>
                    <div
                      className="text-[10px] uppercase text-white/45 mb-0.5"
                      style={MONO}
                    >
                      Call us
                    </div>
                    <a
                      href="tel:+919412702900"
                      className="text-sm text-white/85 hover:text-white transition-colors"
                    >
                      +91 94127 02900
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <span className="flex items-center justify-center w-10 h-10 rounded-full border border-white/15 shrink-0">
                    <Mail size={14} />
                  </span>
                  <div>
                    <div
                      className="text-[10px] uppercase text-white/45 mb-0.5"
                      style={MONO}
                    >
                      Email
                    </div>
                    <a
                      href="mailto:innovationremedies@gmail.com"
                      className="text-sm text-white/85 hover:text-white transition-colors"
                    >
                      innovationremedies@gmail.com
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <span className="flex items-center justify-center w-10 h-10 rounded-full border border-white/15 shrink-0">
                    <MapPin size={14} />
                  </span>
                  <div>
                    <div
                      className="text-[10px] uppercase text-white/45 mb-0.5"
                      style={MONO}
                    >
                      Visit
                    </div>
                    <p className="text-sm text-white/85 leading-relaxed">
                      B-Block, Baba Colony,
                      <br />
                      Burari, North Delhi — 110084
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <span className="flex items-center justify-center w-10 h-10 rounded-full border border-white/15 shrink-0">
                    <Clock size={14} />
                  </span>
                  <div>
                    <div
                      className="text-[10px] uppercase text-white/45 mb-0.5"
                      style={MONO}
                    >
                      Hours
                    </div>
                    <p className="text-sm text-white/85">
                      Mon – Sat · 09:00 – 18:00 IST
                    </p>
                  </div>
                </li>
              </motion.ul>
            </div>

            {/* Footer of panel */}
            <div
              className="flex items-center justify-between text-[11px] uppercase text-white/50 pt-6"
              style={MONO}
            >
              <span>Est. 2020</span>
              <span>28 States · 1200+ Clinics</span>
            </div>
          </div>
        </aside>

        {/* ============================ Right panel =========================== */}
        <main className="relative flex-1 flex flex-col">
          {/* Top bar with back link */}
          <div className="flex items-center justify-between px-6 md:px-10 pt-20 md:pt-24 pb-6">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-[11px] uppercase text-neutral-500 hover:text-neutral-900 transition-colors"
              style={MONO}
            >
              <ArrowLeft size={14} />
              Back to home
            </Link>
            <span
              className="hidden md:inline text-[11px] uppercase text-neutral-400"
              style={MONO}
            >
              01 / Contact
            </span>
          </div>

          <div className="flex-1 flex items-start md:items-center justify-center px-6 md:px-10 pb-16">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: EASE_OUT }}
              className="w-full max-w-xl"
            >
              {/* Mobile brand / eyebrow */}
              <div className="lg:hidden mb-10">
                <p
                  className="text-[11px] uppercase text-neutral-500 mb-3"
                  style={MONO}
                >
                  — Get in touch
                </p>
                <h1
                  className="text-4xl tracking-[-0.035em] leading-tight text-neutral-900"
                  style={DISPLAY}
                >
                  Let's build
                  <br />
                  <span className="italic font-light text-neutral-400">
                    something together.
                  </span>
                </h1>
              </div>

              <p
                className="hidden lg:block text-[11px] uppercase text-neutral-500 mb-3"
                style={MONO}
              >
                — Inquiry form
              </p>
              <h2
                className="hidden lg:block text-3xl md:text-4xl tracking-[-0.03em] leading-tight text-neutral-900 mb-2"
                style={DISPLAY}
              >
                Send us a note.
              </h2>
              <p className="text-sm text-neutral-500 mb-10 max-w-md">
                Fill the form and we'll continue the conversation on WhatsApp
                within 24 hours.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <Field
                    id="firstName"
                    label="First name"
                    placeholder="Your first name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                  />
                  <Field
                    id="lastName"
                    label="Last name"
                    placeholder="Your last name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>

                <Field
                  id="email"
                  label="Email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />

                <div className="grid sm:grid-cols-2 gap-6">
                  <CountrySelect value={country} onChange={setCountry} />
                  <Field
                    id="mobile"
                    label="Mobile"
                    type="tel"
                    placeholder="10-digit number"
                    value={mobile}
                    onChange={(e) =>
                      setMobile(e.target.value.replace(/[^0-9]/g, '').slice(0, 10))
                    }
                    required
                  />
                </div>

                <Field
                  id="message"
                  label="Your message"
                  as="textarea"
                  rows={4}
                  placeholder="Tell us what you need — product inquiry, partnership, support…"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                />

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-2">
                  <p
                    className="text-[11px] uppercase text-neutral-400"
                    style={MONO}
                  >
                    Protected · No spam
                  </p>
                  <button
                    type="submit"
                    disabled={sending}
                    className="group inline-flex items-center justify-between gap-3 pl-6 pr-1.5 py-1.5 rounded-full bg-neutral-900 text-white hover:bg-neutral-800 disabled:opacity-60 transition-colors duration-300 active:scale-[0.98]"
                    style={DISPLAY}
                  >
                    <span className="text-sm">
                      {sending ? 'Sending…' : 'Send message'}
                    </span>
                    <span className="flex items-center justify-center w-9 h-9 rounded-full bg-white/10 overflow-hidden relative">
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
                </div>
              </form>

              {/* Mobile contact info */}
              <div className="lg:hidden mt-14 pt-8 border-t border-neutral-200 grid grid-cols-2 gap-6">
                <a
                  href="tel:+919412702900"
                  className="group text-sm text-neutral-900"
                >
                  <div
                    className="text-[10px] uppercase text-neutral-500 mb-1"
                    style={MONO}
                  >
                    Call
                  </div>
                  +91 94127 02900
                </a>
                <a
                  href="mailto:innovationremedies@gmail.com"
                  className="group text-sm text-neutral-900"
                >
                  <div
                    className="text-[10px] uppercase text-neutral-500 mb-1"
                    style={MONO}
                  >
                    Email
                  </div>
                  innovationremedies@gmail.com
                </a>
              </div>
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  );
}
