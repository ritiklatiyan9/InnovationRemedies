import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  useInView,
} from 'framer-motion';
import { ArrowDown, ArrowUpRight, ChevronRight } from 'lucide-react';

import One from '../../Products/one';
import Two from '../../Products/two';
import Three from '../../Products/three';
import Four from '../../Products/four';
import Five from '../../Products/Five';
import Six from '../../Products/Six';
import Seven from '../../Products/Seven';
import Eight from '../../Products/Eight';

const BRAND = { fontFamily: "Moonhouse, 'Neue Montreal Regular', sans-serif" };
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

const chapters = [
  {
    Component: One,
    tag: 'Formulation',
    title: 'Inside the lab.',
    subtitle: 'Where molecules become medicine.',
    accent: '#10b981',
  },
  {
    Component: Two,
    tag: 'Lactation',
    title: 'Milk, optimised.',
    subtitle: 'Nutrition calibrated for dairy performance.',
    accent: '#f59e0b',
  },
  {
    Component: Three,
    tag: 'Growth',
    title: 'Built stronger.',
    subtitle: 'Calibrated growth for young livestock.',
    accent: '#3b82f6',
  },
  {
    Component: Four,
    tag: 'Liver care',
    title: 'The engine room.',
    subtitle: 'Keeping the metabolic engine clean.',
    accent: '#14b8a6',
  },
  {
    Component: Five,
    tag: 'Deworming',
    title: 'Gentle eradication.',
    subtitle: 'Broad-spectrum, easy to administer.',
    accent: '#8b5cf6',
  },
  {
    Component: Six,
    tag: 'Pest control',
    title: 'The outer layer.',
    subtitle: 'Fly, tick and external parasite protection.',
    accent: '#f43f5e',
  },
  {
    Component: Seven,
    tag: 'Performance',
    title: 'Peak output.',
    subtitle: 'Stamina and performance for working animals.',
    accent: '#ea580c',
  },
  {
    Component: Eight,
    tag: 'Wellness',
    title: 'Every day, a little better.',
    subtitle: 'Daily-use essentials and preventive care.',
    accent: '#6366f1',
  },
];

/* ============================ SCROLL PROGRESS ============================ */
function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  return (
    <motion.div
      style={{ scaleX: scrollYProgress, transformOrigin: '0% 50%' }}
      className="fixed top-0 left-0 right-0 h-[2px] z-[60] bg-gradient-to-r from-emerald-400 via-teal-300 to-blue-400"
      aria-hidden
    />
  );
}

/* =============================== HERO ==================================== */
function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });
  const reduce = useReducedMotion();
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '-20%']);
  const contentOp = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative w-full min-h-[90svh] flex items-center overflow-hidden text-white bg-[#05070f]"
      style={BODY}
    >
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(135deg, #05070f 0%, #080d20 45%, #050814 75%, #05070f 100%)',
        }}
      />
      <motion.div
        className="absolute w-[65vw] h-[65vw] rounded-full blur-3xl"
        style={{
          background:
            'radial-gradient(circle, rgba(59,89,200,0.38) 0%, transparent 65%)',
          top: '-25%',
          left: '-15%',
        }}
        animate={reduce ? {} : { x: [0, 30, 0], y: [0, 20, 0] }}
        transition={{ duration: 40, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute w-[70vw] h-[70vw] rounded-full blur-3xl"
        style={{
          background:
            'radial-gradient(circle, rgba(27,44,120,0.4) 0%, transparent 65%)',
          bottom: '-35%',
          right: '-15%',
        }}
        animate={reduce ? {} : { x: [0, -25, 0], y: [0, -20, 0] }}
        transition={{ duration: 50, repeat: Infinity, ease: 'easeInOut' }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/20 pointer-events-none" />

      <motion.div
        style={reduce ? {} : { y: contentY, opacity: contentOp }}
        className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-10 w-full pt-32 md:pt-36 pb-24"
      >
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-2 text-[11px] uppercase text-white/60 mb-10"
          style={MONO}
        >
          <Link to="/" className="hover:text-white transition-colors">
            Home
          </Link>
          <ChevronRight size={12} className="opacity-50" />
          <span className="text-white">Information</span>
        </nav>

        <div className="grid md:grid-cols-12 gap-10 items-end">
          <div className="md:col-span-9">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE_OUT, delay: 0.1 }}
              className="text-[11px] uppercase text-emerald-300/90 mb-6"
              style={MONO}
            >
              — Field notes · Volume 01
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: EASE_OUT, delay: 0.2 }}
              className="leading-[0.92] tracking-[-0.035em] text-5xl md:text-7xl lg:text-[7.5rem]"
              style={DISPLAY}
            >
              <span className="block bg-gradient-to-b from-white via-white to-white/70 bg-clip-text text-transparent">
                Eight chapters
              </span>
              <span className="block italic font-light bg-gradient-to-r from-emerald-300 via-teal-200 to-blue-300 bg-clip-text text-transparent">
                on getting animal health right.
              </span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: EASE_OUT, delay: 0.4 }}
              className="mt-10 max-w-xl text-base md:text-lg text-white/70 leading-relaxed"
            >
              A quiet long-form walkthrough of what we make, why it works, and
              who it's for. Brew a coffee.
            </motion.p>
          </div>
          <div className="md:col-span-3 flex flex-col gap-2 md:items-end">
            <div className="text-[10px] uppercase text-white/40" style={MONO}>
              Read time
            </div>
            <div
              className="text-4xl md:text-5xl tabular-nums tracking-[-0.03em] leading-none"
              style={DISPLAY}
            >
              20 min
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.6 }}
        className="absolute bottom-8 right-6 md:right-10 z-20 flex items-center gap-2 text-[10px] uppercase text-white/50"
        style={MONO}
      >
        <span>Begin reading</span>
        <motion.span
          animate={reduce ? {} : { y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ArrowDown size={12} />
        </motion.span>
      </motion.div>
    </section>
  );
}

/* ============================== CHAPTER TOC ============================== */
// Sticky right-side chapter navigator
function ChapterTOC({ activeIndex, onJump }) {
  return (
    <div className="hidden lg:flex fixed right-6 top-1/2 -translate-y-1/2 z-40 flex-col gap-2.5">
      {chapters.map((c, i) => {
        const isActive = activeIndex === i;
        return (
          <button
            key={i}
            onClick={() => onJump(i)}
            className="group relative flex items-center justify-end"
            aria-label={`Go to chapter ${i + 1}: ${c.tag}`}
          >
            {/* Label on hover */}
            <span
              className="absolute right-full mr-3 whitespace-nowrap text-[10px] uppercase text-neutral-900 bg-white/95 backdrop-blur-sm border border-neutral-200 px-2.5 py-1 rounded-full opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 pointer-events-none shadow-sm"
              style={MONO}
            >
              <span className="text-neutral-400 mr-1.5 tabular-nums">
                {String(i + 1).padStart(2, '0')}
              </span>
              {c.tag}
            </span>
            {/* Dot */}
            <motion.span
              animate={{
                width: isActive ? 28 : 10,
                backgroundColor: isActive ? c.accent : '#d4d4d4',
              }}
              transition={{ duration: 0.35, ease: EASE_OUT }}
              className="h-[3px] rounded-full block"
            />
          </button>
        );
      })}
    </div>
  );
}

/* ============================ CHAPTER COVER ============================== */
function ChapterCover({ index, total, tag, title, subtitle, accent, coverRef, onEnter }) {
  const innerRef = useRef(null);
  const inView = useInView(innerRef, { margin: '-40% 0px -40% 0px' });
  const reduce = useReducedMotion();

  useEffect(() => {
    if (inView) onEnter(index);
  }, [inView, index, onEnter]);

  return (
    <section
      ref={coverRef}
      className="relative overflow-hidden bg-white border-t border-neutral-200"
    >
      {/* Accent wash */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `linear-gradient(135deg, ${accent}10 0%, transparent 60%)`,
        }}
      />
      {/* Accent orb */}
      <motion.div
        aria-hidden
        className="absolute -top-32 -right-20 w-[40rem] h-[40rem] rounded-full blur-3xl pointer-events-none"
        style={{
          background: `radial-gradient(circle, ${accent}26 0%, transparent 60%)`,
        }}
        animate={reduce ? {} : { x: [0, -20, 0], y: [0, 20, 0] }}
        transition={{ duration: 24, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div
        ref={innerRef}
        className="relative max-w-[1400px] mx-auto px-6 md:px-10 py-28 md:py-40"
      >
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-20%' }}
          transition={{ duration: 0.9, ease: EASE_OUT }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-10"
        >
          <div className="flex items-baseline gap-5">
            <span
              className="text-8xl md:text-[10rem] tabular-nums tracking-[-0.05em] leading-none"
              style={{ ...DISPLAY, color: accent }}
            >
              {String(index + 1).padStart(2, '0')}
            </span>
            <span
              className="text-[11px] uppercase text-neutral-500 tabular-nums pb-4"
              style={MONO}
            >
              / {String(total).padStart(2, '0')} · {tag}
            </span>
          </div>
          <span className="hidden md:block h-px flex-1 bg-neutral-200 mb-6 mx-6" />
          <motion.span
            initial={reduce ? false : { scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: EASE_OUT, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] uppercase text-white pb-1.5 shrink-0"
            style={{ ...MONO, backgroundColor: accent }}
          >
            Chapter {index + 1}
          </motion.span>
        </motion.div>

        <motion.h2
          initial={reduce ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-20%' }}
          transition={{ duration: 0.9, ease: EASE_OUT, delay: 0.1 }}
          className="text-4xl md:text-6xl lg:text-7xl tracking-[-0.03em] leading-[1.02] text-neutral-900 max-w-4xl"
          style={DISPLAY}
        >
          {title}
          {subtitle && (
            <>
              <br />
              <span
                className="italic font-light text-transparent bg-clip-text"
                style={{
                  backgroundImage: `linear-gradient(135deg, ${accent}, #0a0a0a 80%)`,
                }}
              >
                {subtitle}
              </span>
            </>
          )}
        </motion.h2>
      </div>
    </section>
  );
}

/* ============================ CHAPTER BODY =============================== */
function ChapterBody({ children }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-10%' });
  const reduce = useReducedMotion();
  return (
    <motion.div
      ref={ref}
      initial={reduce ? false : { opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: EASE_OUT }}
      className="relative bg-white"
    >
      {children}
    </motion.div>
  );
}

/* ================================ CTA ==================================== */
function CTA() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const reduce = useReducedMotion();
  const glowY = useTransform(scrollYProgress, [0, 1], ['15%', '-15%']);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-[#05070f] text-white py-28 md:py-40 border-t border-neutral-900"
      style={BODY}
    >
      <motion.div
        style={reduce ? {} : { y: glowY }}
        className="absolute inset-0 pointer-events-none"
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50rem] h-[50rem] rounded-full bg-gradient-to-br from-emerald-500/10 via-teal-500/5 to-transparent blur-3xl" />
      </motion.div>

      <div className="relative max-w-5xl mx-auto px-6 md:px-10 text-center">
        <p
          className="text-[11px] uppercase text-emerald-300/90 mb-8"
          style={MONO}
        >
          — End of volume
        </p>
        <h2
          className="text-4xl md:text-6xl lg:text-7xl tracking-[-0.04em] leading-[0.98]"
          style={DISPLAY}
        >
          Found something
          <br />
          <span className="italic font-light bg-gradient-to-r from-emerald-300 via-teal-200 to-blue-300 bg-clip-text text-transparent">
            that looks useful?
          </span>
        </h2>
        <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
          <Link
            to="/products"
            className="group inline-flex items-center gap-3 px-7 py-4 rounded-full bg-white text-black hover:bg-emerald-300 transition-colors duration-300 active:scale-[0.98]"
            style={DISPLAY}
          >
            <span className="text-sm">Browse products</span>
            <ArrowUpRight
              size={16}
              className="transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:rotate-45"
            />
          </Link>
          <Link
            to="/contact"
            className="inline-flex items-center gap-3 px-7 py-4 rounded-full border border-white/30 text-white hover:bg-white/5 transition-colors duration-300 active:scale-[0.98]"
            style={DISPLAY}
          >
            <span className="text-sm">Talk to us</span>
            <ArrowUpRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ================================ STORE ================================== */
export default function Store() {
  const coverRefs = useRef([]);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleEnter = React.useCallback((i) => {
    setActiveIndex(i);
  }, []);

  const handleJump = (i) => {
    const el = coverRefs.current[i];
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="w-full bg-white text-neutral-900 antialiased" style={BODY}>
      <ScrollProgress />
      <ChapterTOC activeIndex={activeIndex} onJump={handleJump} />
      <Hero />
      {chapters.map((c, i) => (
        <React.Fragment key={i}>
          <ChapterCover
            index={i}
            total={chapters.length}
            tag={c.tag}
            title={c.title}
            subtitle={c.subtitle}
            accent={c.accent}
            coverRef={(el) => (coverRefs.current[i] = el)}
            onEnter={handleEnter}
          />
          <ChapterBody>
            <c.Component />
          </ChapterBody>
        </React.Fragment>
      ))}
      <CTA />
    </div>
  );
}
