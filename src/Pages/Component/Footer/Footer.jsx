import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import {
  Linkedin,
  Twitter,
  Instagram,
  Facebook,
  Youtube,
  Mail,
  MapPin,
  Phone,
  ArrowUpRight,
  ArrowRight,
} from 'lucide-react';
import logo from '../../../assets/Images/logo.png';

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

const exploreLinks = [
  { to: '/', label: 'Home' },
  { to: '/products', label: 'Products' },
  { to: '/about', label: 'About us' },
  { to: '/store', label: 'Information' },
  { to: '/contact', label: 'Contact' },
];

const legalLinks = [
  { to: '/return-policy', label: 'Return policy' },
  { to: '/shipping-policy', label: 'Shipping policy' },
  { to: '/privacy-policy', label: 'Privacy policy' },
  { to: '/terms', label: 'Terms' },
];

const socials = [
  { href: 'https://linkedin.com', label: 'LinkedIn', Icon: Linkedin },
  { href: 'https://twitter.com', label: 'Twitter', Icon: Twitter },
  { href: 'https://instagram.com', label: 'Instagram', Icon: Instagram },
  { href: 'https://facebook.com', label: 'Facebook', Icon: Facebook },
  { href: 'https://youtube.com', label: 'YouTube', Icon: Youtube },
];

function FooterLink({ to, label, external = false }) {
  const Cmp = external ? 'a' : Link;
  const props = external
    ? { href: to, target: '_blank', rel: 'noopener noreferrer' }
    : { to };
  return (
    <Cmp
      {...props}
      className="group inline-flex items-center gap-2 py-1.5 text-sm text-white/60 hover:text-white transition-colors duration-300"
    >
      <span className="relative">
        <span className="relative z-10">{label}</span>
        <span className="absolute left-0 right-0 bottom-0 h-px bg-white origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]" />
      </span>
      <ArrowRight
        size={12}
        className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
      />
    </Cmp>
  );
}

function Footer() {
  const year = new Date().getFullYear();
  const [email, setEmail] = useState('');
  const ref = React.useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <footer
      ref={ref}
      className="relative overflow-hidden bg-[#05070f] text-white"
      style={BODY}
    >
      {/* Ambient gradient orbs */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 -left-40 w-[40rem] h-[40rem] rounded-full blur-3xl opacity-30"
        style={{
          background:
            'radial-gradient(circle, rgba(59,89,200,0.35) 0%, transparent 65%)',
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-40 -right-40 w-[45rem] h-[45rem] rounded-full blur-3xl opacity-25"
        style={{
          background:
            'radial-gradient(circle, rgba(27,44,120,0.35) 0%, transparent 65%)',
        }}
      />

      <div className="relative max-w-[1400px] mx-auto px-6 md:px-10 pt-24 md:pt-32 pb-10">
        {/* Hero wordmark + newsletter */}
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 pb-20 md:pb-24 border-b border-white/10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, ease: EASE_OUT }}
            className="lg:col-span-7"
          >
            <p
              className="text-[11px] uppercase text-white/50 mb-6"
              style={MONO}
            >
              — Keep in touch
            </p>
            <h2
              className="text-4xl md:text-6xl lg:text-7xl tracking-[-0.04em] leading-[0.95]"
              style={DISPLAY}
            >
              Let's talk animal
              <br />
              <span className="italic font-light text-white/55">
                health — in detail.
              </span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, ease: EASE_OUT, delay: 0.1 }}
            className="lg:col-span-5 flex flex-col justify-end"
          >
            <p className="text-sm text-white/60 mb-5 max-w-md">
              Monthly notes on new formulations, trials, and field reports —
              delivered to your inbox. No spam.
            </p>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="relative flex items-center border-b border-white/25 focus-within:border-white transition-colors duration-300"
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                aria-label="Email for newsletter"
                className="flex-1 bg-transparent py-4 pr-14 text-base text-white placeholder:text-white/35 focus:outline-none"
              />
              <button
                type="submit"
                className="absolute right-0 w-11 h-11 rounded-full bg-white text-black flex items-center justify-center overflow-hidden group/btn active:scale-95 transition-transform"
                aria-label="Subscribe"
              >
                <ArrowUpRight
                  size={16}
                  className="transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/btn:translate-x-4 group-hover/btn:-translate-y-4"
                />
                <ArrowUpRight
                  size={16}
                  className="absolute transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] -translate-x-4 translate-y-4 group-hover/btn:translate-x-0 group-hover/btn:translate-y-0"
                />
              </button>
            </form>
          </motion.div>
        </div>

        {/* Columns */}
        <div className="grid grid-cols-2 lg:grid-cols-12 gap-10 md:gap-8 py-16 md:py-20 border-b border-white/10">
          {/* Brand block */}
          <div className="col-span-2 lg:col-span-4">
            <Link to="/" className="inline-flex items-center gap-3 mb-6 group">
              <img
                src={logo}
                alt="Innovation Remedies"
                className="h-10 w-auto object-contain transition-transform duration-500 group-hover:scale-[1.04]"
              />
              <span
                className="text-[9px] uppercase text-white/50 leading-tight"
                style={MONO}
              >
                Innovation
                <br />
                Remedies
              </span>
            </Link>
            <p className="text-sm text-white/55 leading-relaxed max-w-xs">
              Veterinary pharmaceuticals and nutritional solutions — trusted
              across 28 states of India.
            </p>
            <div className="mt-6 flex items-center gap-2">
              {socials.map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-full border border-white/15 hover:border-white hover:bg-white hover:text-black flex items-center justify-center text-white/70 transition-all duration-300"
                >
                  <Icon size={14} strokeWidth={1.75} />
                </a>
              ))}
            </div>
          </div>

          {/* Explore */}
          <div className="lg:col-span-2 lg:col-start-6">
            <p
              className="text-[10px] uppercase text-white/40 mb-5"
              style={MONO}
            >
              Explore
            </p>
            <ul className="space-y-0.5">
              {exploreLinks.map((l) => (
                <li key={l.to}>
                  <FooterLink to={l.to} label={l.label} />
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div className="lg:col-span-2">
            <p
              className="text-[10px] uppercase text-white/40 mb-5"
              style={MONO}
            >
              Legal
            </p>
            <ul className="space-y-0.5">
              {legalLinks.map((l) => (
                <li key={l.to}>
                  <FooterLink to={l.to} label={l.label} />
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-4 lg:col-start-10">
            <p
              className="text-[10px] uppercase text-white/40 mb-5"
              style={MONO}
            >
              Get in touch
            </p>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm text-white/70">
                <MapPin size={16} className="mt-0.5 shrink-0 text-white/40" />
                <span>
                  B-Block, Baba Colony, Burari,
                  <br />
                  North Delhi — 110084
                </span>
              </li>
              <li>
                <a
                  href="tel:+919412702900"
                  className="flex items-center gap-3 text-sm text-white/70 hover:text-white transition-colors"
                >
                  <Phone size={16} className="shrink-0 text-white/40" />
                  +91 94127 02900
                </a>
              </li>
              <li>
                <a
                  href="mailto:innovationremedies@gmail.com"
                  className="flex items-center gap-3 text-sm text-white/70 hover:text-white transition-colors"
                >
                  <Mail size={16} className="shrink-0 text-white/40" />
                  innovationremedies@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Giant brand wordmark */}
        <div className="py-14 md:py-20 overflow-hidden">
          <motion.div
            initial={{ y: 60, opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 1.1, ease: EASE_OUT, delay: 0.15 }}
            className="text-center select-none"
          >
            <h3
              aria-hidden
              className="leading-[0.82] tracking-[-0.05em] text-[12vw] md:text-[12vw] bg-gradient-to-b from-white/90 via-white/30 to-transparent bg-clip-text text-transparent"
              style={BRAND}
            >
              INNOVATION
            </h3>
          </motion.div>
        </div>

        {/* Copyright bar */}
        <div className="flex flex-col-reverse md:flex-row items-start md:items-center justify-between gap-4 pt-8 border-t border-white/10">
          <p className="text-xs text-white/45" style={MONO}>
            © {year} Innovation Remedies Life Science Pvt. Ltd. — All rights
            reserved
          </p>
          <p className="text-xs text-white/45" style={MONO}>
            Made in India · Serving Nationwide
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
