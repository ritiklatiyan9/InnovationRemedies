// src/Pages/Component/Home/Home.jsx
import React, { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useInView,
  useReducedMotion,
  useSpring,
  useMotionValue,
  animate as fmAnimate,
} from "framer-motion";
import {
  HeartPulse,
  Activity,
  Dog,
  TreePine,
  ShieldCheck,
  Leaf,
  Award,
  Microscope,
  Truck,
  ArrowUpRight,
  ArrowRight,
  ArrowDown,
  Sparkles,
} from "lucide-react";

import buffalo from "../../../assets/Images/buffalo.png";
import cow from "../../../assets/Images/cow.jpg";
import dogs from "../../../assets/Images/dogs.png";
import sheep from "../../../assets/Images/sheep.png";
import cat from "../../../assets/Images/cat.png";
import fish from "../../../assets/Images/fish.png";
import heroBanner from "../../../assets/Images/banner.png";
import { products as allProducts } from "../../../data/products";

/* ----------------------------- Font tokens ------------------------------- */
// BRAND — Moonhouse, reserved for the hero INNOVATION wordmark only
const BRAND = { fontFamily: "Moonhouse, 'Neue Montreal Regular', sans-serif" };
// DISPLAY — professional modern sans for all section headings
const DISPLAY = {
  fontFamily:
    "'Neue Montreal Regular', 'SF Pro Text Semibold', 'Inter', system-ui, -apple-system, sans-serif",
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

/* ----------------------------- Reveal wrapper ---------------------------- */
function Reveal({ children, delay = 0, y = 28, className = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reduce = useReducedMotion();
  return (
    <motion.div
      ref={ref}
      initial={reduce ? false : { opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: EASE_OUT }}
      className={className}
      style={{ willChange: "transform, opacity" }}
    >
      {children}
    </motion.div>
  );
}

/* ------------------------------- Split text ------------------------------ */
function SplitWords({ text, className = "", delay = 0, stagger = 0.06, style }) {
  const reduce = useReducedMotion();
  const words = text.split(" ");
  return (
    <span className={className} style={style}>
      {words.map((w, i) => (
        <span key={i} className="inline-block overflow-hidden align-bottom">
          <motion.span
            initial={reduce ? false : { y: "110%" }}
            animate={{ y: "0%" }}
            transition={{
              duration: 0.9,
              delay: delay + i * stagger,
              ease: EASE_OUT,
            }}
            className="inline-block"
            style={{ willChange: "transform" }}
          >
            {w}
            {i < words.length - 1 ? "\u00A0" : ""}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

/* ------------------------------ Hover link ------------------------------- */
function HoverShiftText({ children, className = "" }) {
  return (
    <span className={`relative inline-block overflow-hidden ${className}`}>
      <span className="block transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-full">
        {children}
      </span>
      <span
        className="absolute inset-0 block translate-y-full transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0"
        aria-hidden
      >
        {children}
      </span>
    </span>
  );
}

/* ------------------------------- Count up -------------------------------- */
function CountUp({ to, suffix = "", duration = 1.8 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const mv = useMotionValue(0);
  const [display, setDisplay] = useState("0");
  const reduce = useReducedMotion();
  useEffect(() => {
    if (!inView) return;
    if (reduce) return setDisplay(String(to));
    const c = fmAnimate(mv, to, {
      duration,
      ease: EASE_OUT,
      onUpdate: (v) => setDisplay(Math.round(v).toLocaleString()),
    });
    return c.stop;
  }, [inView, to, duration, reduce, mv]);
  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
}

/* ================================= HERO ================================== */
function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const reduce = useReducedMotion();
  const videoY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const videoScale = useTransform(scrollYProgress, [0, 1], [1, 1]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "-25%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  // Live clock micro-detail (IST)
  const [time, setTime] = useState("");
  useEffect(() => {
    const fmt = () =>
      new Date().toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
        timeZone: "Asia/Kolkata",
      });
    setTime(fmt());
    const id = setInterval(() => setTime(fmt()), 30_000);
    return () => clearInterval(id);
  }, []);

  return (
    <section
      ref={ref}
      className="relative w-full h-[100svh] min-h-[720px] overflow-hidden text-white"
      style={{
        ...BODY,
        backgroundColor: "#0a0823",
      }}
    >
      {/* Animated colorful gradient base */}
      <motion.div
        aria-hidden
        style={reduce ? {} : { y: videoY, scale: videoScale }}
        className="absolute inset-0 z-0"
      >
        {/* Banner image — full cover on mobile (focal point on farmer), right-anchored on desktop */}
        <img
          src={heroBanner}
          alt=""
          aria-hidden
          className="absolute inset-y-0 right-0 h-full w-full object-cover [object-position:65%_center] md:w-auto md:max-w-none md:object-right"
          style={{ imageRendering: "auto" }}
        />
        {/* Left-to-right dark gradient — minimal on mobile, strong on desktop */}
        <div
          className="absolute inset-0 hidden md:block"
          style={{
            background:
              "linear-gradient(90deg, rgba(5,5,15,1) 0%, rgba(5,5,15,0.97) 20%, rgba(5,5,15,0.85) 38%, rgba(5,5,15,0.55) 52%, rgba(5,5,15,0.15) 70%, rgba(5,5,15,0) 100%)",
          }}
        />
        {/* Mobile-only: left-dark right-bright gradient */}
        <div
          className="absolute inset-0 md:hidden"
          style={{
            background:
              "linear-gradient(90deg, rgba(5,5,15,0.82) 0%, rgba(5,5,15,0.60) 30%, rgba(5,5,15,0.25) 60%, rgba(5,5,15,0.05) 100%)",
          }}
        />
      </motion.div>

      {/* Vignette for text contrast (subtle — keep gradient colors visible) */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/15 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_110%_80%_at_20%_60%,transparent_0%,rgba(0,0,0,0.25)_100%)] pointer-events-none" />

      {/* Top meta bar — status dot + location + time */}
      <div className="absolute top-0 inset-x-0 z-20 px-6 md:px-10 pt-6 flex items-center justify-between text-[11px] text-white/60">
        <div className="flex items-center gap-2" style={MONO}>
          <motion.span
            className="w-[6px] h-[6px] rounded-full bg-emerald-400"
            animate={reduce ? {} : { opacity: [1, 0.3, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
          <span className="uppercase">LIVE · MEERUT, IN</span>
        </div>
        <div className="tabular-nums hidden sm:block" style={MONO}>
          {time} IST
        </div>
      </div>

      {/* Foreground */}
      <motion.div
        style={reduce ? {} : { y: contentY, opacity: contentOpacity }}
        className="relative z-10 h-full flex flex-col justify-end pb-40 md:pb-28 px-6 md:px-10"
      >
        <div className="max-w-[1400px] mx-auto w-full">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE_OUT, delay: 0.1 }}
            className="flex items-center gap-3 mb-8 md:mb-10"
          >
            <span className="h-px w-12 bg-white/60" />
            <span className="text-[11px] uppercase text-white/70" style={MONO}>
              Est. 2020 · Animal Health · India
            </span>
          </motion.div>

          {/* Wordmark — INNOVATION */}
          <h1 className="relative">
            <span className="sr-only">Innovation Remedies Life Science</span>

            <span
              aria-hidden
              className="block leading-[0.82] tracking-[0.02em] text-[10.5vw] md:text-[12.5vw] lg:text-[11.5vw] font-normal whitespace-nowrap"
              style={BRAND}
            >
              <SplitWords
                text="INNOVATION"
                delay={0.15}
                stagger={0}
                className="text-white bg-clip-text text-transparent"
              />
            </span>

            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: EASE_OUT, delay: 0.55 }}
              aria-hidden
              className="mt-2 md:mt-12 flex items-center gap-4 md:gap-6"
            >
              <motion.span
                initial={reduce ? false : { scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1, ease: EASE_OUT, delay: 0.65 }}
                className="hidden md:block h-px bg-white/50 w-12 md:w-24 origin-left"
              />
              <span
                className="text-2xl md:text-4xl lg:text-5xl tracking-[0.03em] text-white/90 font-light inline-flex items-center gap-2 md:gap-3 flex-wrap"
                style={BODY}
              >
                <span>Remedies&nbsp;</span>
                {/* Mobile: plain white */}
                <span className="font-normal text-white md:hidden">Life Science</span>
                {/* Desktop: animated gradient */}
                <motion.span
                  className="hidden md:inline font-normal bg-clip-text text-transparent"
                  style={{
                    backgroundImage:
                      "linear-gradient(90deg, #6ee7b7 0%, #60a5fa 25%, #a78bfa 50%, #f472b6 75%, #6ee7b7 100%)",
                    backgroundSize: "300% 100%",
                  }}
                  animate={
                    reduce
                      ? {}
                      : {
                          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                        }
                  }
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  Life Science
                </motion.span>
                <span>Pvt. Ltd.</span>
                {/* Colored logo mark */}
                <motion.span
                  aria-hidden
                  initial={{ opacity: 0, scale: 0.6 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.9, ease: EASE_OUT }}
                  className="ml-1 inline-flex items-center justify-center w-9 h-9 md:w-12 md:h-12 rounded-full relative shrink-0"
                  style={{
                    background:
                      "conic-gradient(from 0deg, #6ee7b7, #60a5fa, #a78bfa, #f472b6, #6ee7b7)",
                  }}
                >
                  <motion.span
                    className="absolute inset-0 rounded-full"
                    style={{
                      background:
                        "conic-gradient(from 0deg, #6ee7b7, #60a5fa, #a78bfa, #f472b6, #6ee7b7)",
                    }}
                    animate={reduce ? {} : { rotate: 360 }}
                    transition={{
                      duration: 8,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />
                  <span className="relative flex items-center justify-center w-[70%] h-[70%] rounded-full bg-[#0a0823]">
                    <Sparkles size={18} className="text-white" />
                  </span>
                </motion.span>
              </span>
            </motion.span>
          </h1>

          {/* Bottom row — tagline + CTA + feature list */}
          <div className="mt-14 md:mt-20 grid md:grid-cols-12 gap-8 md:gap-10 items-end">
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: EASE_OUT, delay: 0.9 }}
              className="md:col-span-5 text-base md:text-lg text-white/75 leading-relaxed max-w-md"
            >
              Precision-engineered veterinary pharmaceuticals and nutritional
              solutions — trusted by farmers and clinics across 28 states of
              India.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: EASE_OUT, delay: 1.0 }}
              className="md:col-span-3 flex md:justify-start"
            >
              <Link
                to="/products"
                className="group relative inline-flex items-center gap-3 pl-6 pr-1.5 py-1.5 rounded-full bg-white text-neutral-900 shadow-[0_10px_40px_-12px_rgba(255,255,255,0.5)] hover:shadow-[0_14px_50px_-8px_rgba(110,231,183,0.45)] transition-all duration-500 active:scale-[0.97]"
                style={DISPLAY}
              >

                <span className="relative text-sm tracking-tight">
                  Explore products
                </span>
                <span className="relative flex items-center justify-center w-11 h-11 rounded-full overflow-hidden bg-neutral-900 text-white">
                  <ArrowUpRight
                    size={16}
                    className="transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-5 group-hover:-translate-y-5"
                  />
                  <ArrowUpRight
                    size={16}
                    className="absolute transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] -translate-x-5 translate-y-5 group-hover:translate-x-0 group-hover:translate-y-0"
                  />
                </span>
              </Link>
            </motion.div>

            <motion.ul
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.1 }}
              className="md:col-span-4 flex flex-wrap gap-x-6 gap-y-2 md:justify-end text-xs text-white/55"
              style={MONO}
            >
              {[
                { label: "HEALTH", color: "bg-rose-400" },
                { label: "ACTIVITY", color: "bg-amber-400" },
                { label: "GROWTH", color: "bg-emerald-400" },
                { label: "WELLNESS", color: "bg-blue-400" },
              ].map((t, i) => (
                <motion.li
                  key={t.label}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2 + i * 0.08, duration: 0.5 }}
                  className="flex items-center gap-2"
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${t.color}`} />
                  {t.label}
                </motion.li>
              ))}
            </motion.ul>
          </div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.6 }}
        className="absolute bottom-6 right-6 md:right-10 z-20 flex items-center gap-2 text-[10px] uppercase text-white/50"
        style={MONO}
      >
        <span>Scroll</span>
        <motion.span
          animate={reduce ? {} : { y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown size={12} />
        </motion.span>
      </motion.div>
    </section>
  );
}

/* =========================== MARQUEE TAGLINE ============================= */
function MarqueeTagline() {
  const reduce = useReducedMotion();
  const phrases = ["Animal Health", "Backed By Science", "Made In India", "Since 2020"];
  return (
    <section className="relative bg-black text-white overflow-hidden border-y border-white/10">
      <motion.div
        className="flex whitespace-nowrap py-6 md:py-8"
        animate={reduce ? {} : { x: ["0%", "-50%"] }}
        transition={{ duration: 30, ease: "linear", repeat: Infinity }}
      >
        {[...Array(2)].flatMap((_, r) =>
          phrases.map((p, i) => (
            <span
              key={`${r}-${i}`}
              className="inline-flex items-center gap-8 px-8 text-3xl md:text-5xl tracking-tight"
              style={DISPLAY}
            >
              <span className="italic font-light text-white/60">/</span>
              {p}
            </span>
          ))
        )}
      </motion.div>
    </section>
  );
}

/* ============================ STATS / IMPACT ============================= */
function Stats() {
  const stats = [
    { label: "Animals served", value: 2, suffix: "M+" },
    { label: "Products in range", value: 48, suffix: "+" },
    { label: "States covered", value: 28, suffix: "" },
    { label: "Partner clinics", value: 1200, suffix: "+" },
  ];
  return (
    <section className="relative bg-[#0a0a0a] text-white py-28 md:py-36" style={BODY}>
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <div className="grid md:grid-cols-12 gap-10 md:gap-16 items-end mb-20">
          <Reveal className="md:col-span-7">
            <p className="text-[11px] uppercase text-emerald-300/90 mb-5" style={MONO}>
              — The scale of care
            </p>
            <h2
              className="text-4xl md:text-6xl lg:text-7xl tracking-[-0.03em] leading-[1.02]"
              style={DISPLAY}
            >
              Trusted nationwide.
              <br />
              <span className="italic font-light bg-gradient-to-r from-emerald-300 via-teal-200 to-blue-300 bg-clip-text text-transparent">
                Built on evidence.
              </span>
            </h2>
          </Reveal>
          <Reveal className="md:col-span-5" delay={0.1}>
            <p className="text-white/60 text-base md:text-lg leading-relaxed max-w-md md:ml-auto">
              Four metrics. Zero marketing fluff. This is where we stand today —
              and where we're going next.
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.06} y={20}>
              <div className="border-t border-white/20 pt-5 group cursor-default">
                <div
                  className="text-5xl md:text-7xl tracking-[-0.04em] tabular-nums leading-none transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-1"
                  style={DISPLAY}
                >
                  <CountUp to={s.value} suffix={s.suffix} />
                </div>
                <div
                  className="mt-4 text-[11px] uppercase text-white/50"
                  style={MONO}
                >
                  {s.label}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ======================== STICKY PHILOSOPHY SECTION ====================== */
function Philosophy() {
  const items = [
    {
      icon: Microscope,
      tint: "bg-emerald-600",
      title: "Science-led formulation",
      body: "Every molecule vetted by our R&D team, produced under strict GMP protocols across certified facilities.",
    },
    {
      icon: ShieldCheck,
      tint: "bg-blue-600",
      title: "Safety above all",
      body: "Rigorous multi-stage quality control and batch traceability — the product you open is the one we tested.",
    },
    {
      icon: Leaf,
      tint: "bg-teal-600",
      title: "Nutrition that works",
      body: "Balanced supplements designed around real nutritional gaps in Indian livestock and companion animals.",
    },
    {
      icon: Truck,
      tint: "bg-indigo-600",
      title: "Reach across 28 states",
      body: "A pan-India distribution network keeps our products where they're needed — and in transit when they're not.",
    },
  ];

  return (
    <section className="relative bg-white text-neutral-900 py-28 md:py-36" style={BODY}>
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 grid lg:grid-cols-12 gap-12 lg:gap-20">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <Reveal>
              <p className="text-[11px] uppercase text-emerald-700 mb-5" style={MONO}>
                — Our philosophy
              </p>
              <h2
                className="text-4xl md:text-5xl lg:text-6xl tracking-[-0.03em] leading-[1.02]"
                style={DISPLAY}
              >
                Four principles.
                <br />
                <span className="italic font-light bg-gradient-to-r from-emerald-600 via-teal-600 to-blue-700 bg-clip-text text-transparent">
                  One commitment.
                </span>
              </h2>
              <p className="mt-8 text-neutral-600 max-w-md leading-relaxed">
                Behind every product is a belief that animal health should be
                engineered, not improvised.
              </p>
            </Reveal>
          </div>
        </div>

        <div className="lg:col-span-7 flex flex-col">
          {items.map((it, i) => (
            <Reveal key={it.title} delay={i * 0.05} y={40}>
              <article className="group relative py-10 md:py-12 border-t border-neutral-200 first:border-t-0 cursor-default">
                <div className="flex items-start gap-6 md:gap-10">
                  <span
                    className="text-[11px] text-neutral-400 pt-2 tabular-nums"
                    style={MONO}
                  >
                    0{i + 1}
                  </span>
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-3">
                      <motion.span
                        initial={{ rotate: 0 }}
                        whileHover={{ rotate: 12 }}
                        transition={{ duration: 0.4, ease: EASE_OUT }}
                        className={`inline-flex items-center justify-center w-9 h-9 rounded-full text-white ${it.tint || "bg-neutral-900"}`}
                      >
                        <it.icon size={16} />
                      </motion.span>
                      <h3
                        className="text-2xl md:text-3xl tracking-[-0.02em] transition-colors duration-500 group-hover:text-emerald-700"
                        style={DISPLAY}
                      >
                        {it.title}
                      </h3>
                    </div>
                    <p className="text-neutral-600 leading-relaxed max-w-xl pl-[52px]">
                      {it.body}
                    </p>
                  </div>
                  <ArrowUpRight
                    size={20}
                    className="text-neutral-400 transition-all duration-500 group-hover:text-neutral-900 group-hover:rotate-45"
                  />
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================ ANIMALS MARQUEE ============================ */
function AnimalsMarquee() {
  const animals = [
    { name: "Buffalo", img: buffalo, tag: "Livestock" },
    { name: "Cattle", img: cow, tag: "Livestock" },
    { name: "Dogs", img: dogs, tag: "Companion" },
    { name: "Sheep", img: sheep, tag: "Livestock" },
    { name: "Cats", img: cat, tag: "Companion" },
    { name: "Fish", img: fish, tag: "Aquaculture" },
  ];
  const row = [...animals, ...animals];
  const reduce = useReducedMotion();

  return (
    <section className="relative bg-[#0a0a0a] text-white py-28 md:py-36 overflow-hidden" style={BODY}>
      <div className="relative max-w-[1400px] mx-auto px-6 md:px-10 mb-16 grid md:grid-cols-12 gap-10 items-end">
        <Reveal className="md:col-span-7">
          <p className="text-[11px] uppercase text-emerald-300/90 mb-5" style={MONO}>
            — Whom we serve
          </p>
          <h2
            className="text-4xl md:text-6xl lg:text-7xl tracking-[-0.03em] leading-[1.02]"
            style={DISPLAY}
          >
            From the farm
            <br />
            <span className="italic font-light bg-gradient-to-r from-emerald-300 via-teal-200 to-blue-300 bg-clip-text text-transparent">
              to the family.
            </span>
          </h2>
        </Reveal>
        <Reveal className="md:col-span-5" delay={0.1}>
          <p className="text-white/60 leading-relaxed max-w-md md:ml-auto">
            Livestock. Companion animals. Aquaculture. Our range is calibrated
            for each — because one size does not fit all.
          </p>
        </Reveal>
      </div>

      <div className="relative w-full overflow-hidden py-2">
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-40 bg-gradient-to-r from-[#0a0a0a] to-transparent z-10" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-40 bg-gradient-to-l from-[#0a0a0a] to-transparent z-10" />
        <motion.div
          className="flex gap-5 w-max"
          animate={reduce ? {} : { x: ["0%", "-50%"] }}
          transition={{ duration: 40, ease: "linear", repeat: Infinity }}
        >
          {row.map((a, i) => (
            <motion.div
              key={i}
              whileHover={reduce ? {} : { y: -8 }}
              transition={{ duration: 0.5, ease: EASE_OUT }}
              className="relative w-64 h-80 md:w-72 md:h-96 rounded-2xl overflow-hidden bg-neutral-900 shrink-0 group"
            >
              <img
                src={a.img}
                alt={a.name}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5 flex items-end justify-between">
                <div>
                  <div
                    className="text-[10px] uppercase text-white/60 mb-1"
                    style={MONO}
                  >
                    {a.tag}
                  </div>
                  <div
                    className="text-2xl md:text-3xl tracking-[-0.02em]"
                    style={DISPLAY}
                  >
                    {a.name}
                  </div>
                </div>
                <ArrowUpRight
                  size={18}
                  className="text-white/70 transition-all duration-500 group-hover:text-white group-hover:rotate-45"
                />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* =========================== PRODUCTS SHOWCASE =========================== */
const CATEGORY_BY_ID = {
  "r3-vet-ultra-bonus": "Immunity",
  "mood-pills": "Growth",
  "uti-dont-think-so": "Urinary",
  "bye-bye-bloat": "Digestive",
  "good-girl-probiotic": "Liver",
  "perfect-condition-vitamin": "Deworming",
  "weight-booster": "Nutrition",
  "makkhi-soap": "External",
  "makkhi-liquid": "External",
  "makkhi-injection": "Injectable",
};

function hexToRgba(hex, a) {
  const h = hex.replace("#", "");
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${a})`;
}

/* ------------------------ Sticky spotlight showcase ----------------------- */
function ProductShowcaseItem({ p, index, onEnter }) {
  const ref = useRef(null);
  const inView = useInView(ref, { margin: '-45% 0px -45% 0px' });
  const reduce = useReducedMotion();

  useEffect(() => {
    if (inView) onEnter(index);
  }, [inView, index, onEnter]);

  const accent = p.color || '#0a0a0a';
  const category = CATEGORY_BY_ID[p.id] || 'Veterinary';

  return (
    <article
      ref={ref}
      className="group min-h-[55vh] flex flex-col justify-center py-10 border-b border-neutral-200 last:border-b-0"
    >
      <div className="flex items-center gap-4 mb-5">
        <span
          className="text-[11px] text-neutral-400 tabular-nums"
          style={MONO}
        >
          {String(index + 1).padStart(2, '0')} /{' '}
          {String(allProducts.length).padStart(2, '0')}
        </span>
        <span className="h-px flex-1 bg-neutral-200" />
        <span
          className="inline-flex items-center gap-1.5 text-[10px] uppercase text-neutral-500"
          style={MONO}
        >
          <span
            className="w-1.5 h-1.5 rounded-full"
            style={{ backgroundColor: accent }}
          />
          {category}
        </span>
      </div>

      {/* Mobile image (shown inline on small screens) */}
      <div
        className="lg:hidden relative rounded-2xl overflow-hidden mb-6 aspect-[4/3]"
        style={{ background: `${accent}15` }}
      >
        <motion.img
          src={p.imageUrl}
          alt={p.name}
          loading="lazy"
          initial={reduce ? false : { scale: 1.02, opacity: 0.9 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 1, ease: EASE_OUT }}
          className="absolute inset-0 w-full h-full object-contain p-8"
        />
      </div>

      <h3
        className="text-3xl md:text-5xl lg:text-6xl tracking-[-0.025em] text-neutral-900 leading-[1.02] transition-colors duration-500 group-hover:text-neutral-500"
        style={DISPLAY}
      >
        {p.name}
      </h3>

      <p className="mt-5 text-base md:text-lg text-neutral-600 leading-relaxed max-w-xl">
        {p.longDescription || p.description}
      </p>

      {p.features?.length ? (
        <ul className="mt-6 flex flex-wrap gap-x-4 gap-y-2 max-w-2xl">
          {p.features.slice(0, 4).map((f) => (
            <li
              key={f}
              className="inline-flex items-center gap-2 text-[13px] text-neutral-700"
            >
              <span
                className="w-1 h-1 rounded-full"
                style={{ backgroundColor: accent }}
              />
              {f}
            </li>
          ))}
        </ul>
      ) : null}
    </article>
  );
}

function Products() {
  // Show first 6 real products — info only, no shop chrome
  const list = allProducts.slice(0, 6);
  const [activeIdx, setActiveIdx] = useState(0);
  const [prevIdx, setPrevIdx] = useState(0);
  const reduce = useReducedMotion();

  const handleEnter = React.useCallback((i) => {
    setActiveIdx((cur) => {
      if (cur !== i) setPrevIdx(cur);
      return i;
    });
  }, []);

  const active = list[activeIdx] || list[0];
  const accent = active?.color || '#0a0a0a';
  const direction = activeIdx > prevIdx ? 1 : -1;

  return (
    <section
      className="relative bg-white py-28 md:py-36"
      style={BODY}
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        {/* Section header */}
        <div className="grid md:grid-cols-12 gap-10 items-end mb-16 md:mb-20">
          <Reveal className="md:col-span-8">
            <p
              className="text-[11px] uppercase text-emerald-700 mb-5"
              style={MONO}
            >
              — The range
            </p>
            <h2
              className="text-4xl md:text-5xl lg:text-6xl tracking-[-0.03em] leading-[1.05] text-neutral-900"
              style={DISPLAY}
            >
              A closer look
              <br />
              <span className="italic font-light bg-gradient-to-r from-emerald-600 via-teal-600 to-blue-700 bg-clip-text text-transparent">
                at what we make.
              </span>
            </h2>
          </Reveal>
          <Reveal className="md:col-span-4 md:text-right" delay={0.1}>
            <Link
              to="/products"
              className="group inline-flex items-center gap-3 text-sm uppercase tracking-[0.2em] text-neutral-900"
              style={MONO}
            >
              <span className="relative block h-5 overflow-hidden">
                <HoverShiftText>See full range</HoverShiftText>
              </span>
              <span className="relative flex items-center justify-center w-10 h-10 rounded-full border border-neutral-900 overflow-hidden">
                <ArrowUpRight
                  size={16}
                  className="transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-5 group-hover:-translate-y-5"
                />
                <ArrowUpRight
                  size={16}
                  className="absolute transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] -translate-x-5 translate-y-5 group-hover:translate-x-0 group-hover:translate-y-0"
                />
              </span>
            </Link>
          </Reveal>
        </div>

        {/* Sticky spotlight + scrolling entries */}
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
          {/* Sticky image panel — desktop only */}
          <div className="hidden lg:block lg:col-span-6">
            <div className="sticky top-28">
              <motion.div
                className="relative aspect-[4/5] rounded-[2rem] overflow-hidden transition-colors duration-700"
                animate={{ backgroundColor: `${accent}18` }}
                transition={{ duration: 0.6, ease: EASE_OUT }}
              >
                {/* Soft accent radial */}
                <motion.div
                  aria-hidden
                  className="absolute inset-0 pointer-events-none"
                  animate={{
                    background: `radial-gradient(circle at 50% 55%, ${accent}33 0%, transparent 60%)`,
                  }}
                  transition={{ duration: 0.6 }}
                />
                {/* Index badge */}
                <span
                  className="absolute top-6 left-6 text-[11px] uppercase text-neutral-600 tabular-nums"
                  style={MONO}
                >
                  Currently viewing · {String(activeIdx + 1).padStart(2, '0')}
                </span>
                <span
                  className="absolute top-6 right-6 text-[11px] uppercase text-neutral-600"
                  style={MONO}
                >
                  {CATEGORY_BY_ID[active.id] || 'Veterinary'}
                </span>

                {/* Animated image swap */}
                <AnimatePresence initial={false} mode="wait">
                  <motion.img
                    key={active.id}
                    src={active.imageUrl}
                    alt={active.name}
                    loading="eager"
                    initial={
                      reduce
                        ? { opacity: 0 }
                        : { opacity: 0, y: direction * 40, scale: 0.96, rotate: direction * -2 }
                    }
                    animate={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
                    exit={
                      reduce
                        ? { opacity: 0 }
                        : { opacity: 0, y: direction * -40, scale: 0.96, rotate: direction * 2 }
                    }
                    transition={{ duration: 0.7, ease: EASE_OUT }}
                    className="absolute inset-0 w-[78%] h-[78%] m-auto object-contain drop-shadow-[0_30px_40px_rgba(0,0,0,0.18)]"
                    style={{ willChange: 'transform, opacity' }}
                  />
                </AnimatePresence>

                {/* Bottom name tag */}
                <motion.div
                  key={`tag-${active.id}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: EASE_OUT, delay: 0.1 }}
                  className="absolute bottom-6 left-6 right-6 flex items-end justify-between gap-4"
                >
                  <div
                    className="text-2xl tracking-[-0.02em] text-neutral-900 max-w-[70%] leading-tight"
                    style={DISPLAY}
                  >
                    {active.name}
                  </div>
                </motion.div>
              </motion.div>

              {/* Progress dots */}
              <div className="flex items-center gap-1.5 mt-5 justify-center">
                {list.map((p, i) => (
                  <motion.span
                    key={p.id}
                    className="block h-[3px] rounded-full bg-neutral-200 overflow-hidden"
                    animate={{ width: i === activeIdx ? 28 : 14 }}
                    transition={{ duration: 0.4, ease: EASE_OUT }}
                  >
                    <motion.span
                      className="block h-full"
                      animate={{
                        backgroundColor: i === activeIdx ? accent : 'transparent',
                        width: i === activeIdx ? '100%' : '0%',
                      }}
                      transition={{ duration: 0.4, ease: EASE_OUT }}
                    />
                  </motion.span>
                ))}
              </div>
            </div>
          </div>

          {/* Scroll list */}
          <div className="lg:col-span-6">
            {list.map((p, i) => (
              <ProductShowcaseItem
                key={p.id}
                p={p}
                index={i}
                onEnter={handleEnter}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* =========================== SCROLL TEXT REVEAL ========================== */
function TextReveal() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "end 0.4"],
  });
  const reduce = useReducedMotion();

  const text =
    "We exist to raise the standard of animal care in India — one trusted formulation at a time, one farm at a time.";
  const words = text.split(" ");

  return (
    <section
      ref={ref}
      className="relative bg-[#0a0a0a] text-white py-32 md:py-48"
      style={BODY}
    >
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <p className="text-[11px] uppercase text-emerald-300/90 mb-10" style={MONO}>
          — Our mission
        </p>
        <p
          className="text-3xl md:text-5xl lg:text-6xl tracking-[-0.02em] leading-[1.18]"
          style={DISPLAY}
        >
          {words.map((w, i) => {
            const start = i / words.length;
            const end = start + 1 / words.length;
            const opacity = useTransform(
              scrollYProgress,
              [start, end],
              [0.18, 1]
            );
            return (
              <motion.span
                key={i}
                style={reduce ? { opacity: 1 } : { opacity }}
                className="inline-block mr-[0.22em]"
              >
                {w}
              </motion.span>
            );
          })}
        </p>
      </div>
    </section>
  );
}

/* ============================== WHY US GRID ============================== */
function WhyUs() {
  const cards = [
    { icon: HeartPulse, tint: "bg-rose-600", title: "Health boosters", body: "Formulations built around cardiovascular and metabolic support." },
    { icon: Activity, tint: "bg-amber-600", title: "Activity enhancers", body: "Daily-use supplements for stamina, energy and sustained performance." },
    { icon: Dog, tint: "bg-orange-600", title: "Growth boosters", body: "Targeted nutrition for developmental stages across species." },
    { icon: TreePine, tint: "bg-emerald-600", title: "Wellness range", body: "Preventive care, coat & skin, and general-wellness essentials." },
    { icon: Award, tint: "bg-blue-600", title: "GMP certified", body: "Manufactured in audited facilities to pharmaceutical-grade standards." },
    { icon: Leaf, tint: "bg-teal-600", title: "Vet-approved", body: "Endorsed and prescribed across partner veterinary clinics." },
  ];

  return (
    <section className="relative bg-neutral-50 py-28 md:py-36" style={BODY}>
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <Reveal className="max-w-3xl mb-16">
          <p className="text-[11px] uppercase text-emerald-700 mb-5" style={MONO}>
            — Why choose us
          </p>
          <h2
            className="text-4xl md:text-6xl lg:text-7xl tracking-[-0.03em] leading-[1.02] text-neutral-900"
            style={DISPLAY}
          >
            Six reasons
            <br />
            <span className="italic font-light bg-gradient-to-r from-emerald-600 via-teal-600 to-blue-700 bg-clip-text text-transparent">
              partners stay with us.
            </span>
          </h2>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 border-t border-neutral-200">
          {cards.map((c, i) => (
            <Reveal
              key={c.title}
              delay={i * 0.05}
              y={20}
              className="border-b border-neutral-200 sm:[&:nth-child(odd)]:border-r lg:[&]:border-r lg:[&:nth-child(3n)]:border-r-0 sm:[&:nth-child(3n)]:border-r"
            >
              <div className="group relative h-full p-8 md:p-10 cursor-default transition-colors duration-500 hover:bg-white">
                <div className="flex items-center justify-between mb-8">
                  <motion.span
                    whileHover={{ rotate: 12, scale: 1.06 }}
                    transition={{ duration: 0.4, ease: EASE_OUT }}
                    className={`inline-flex items-center justify-center w-10 h-10 rounded-full text-white shadow-sm ${c.tint || "bg-neutral-900"}`}
                  >
                    <c.icon size={16} />
                  </motion.span>
                  <span
                    className="text-[10px] text-neutral-400 tabular-nums"
                    style={MONO}
                  >
                    / 0{i + 1}
                  </span>
                </div>
                <h3
                  className="text-xl md:text-2xl tracking-[-0.02em] text-neutral-900"
                  style={DISPLAY}
                >
                  {c.title}
                </h3>
                <p className="mt-3 text-sm text-neutral-600 leading-relaxed">
                  {c.body}
                </p>
                <span
                  className="absolute left-8 md:left-10 bottom-8 md:bottom-10 h-px bg-neutral-900 transition-[width] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] w-0 group-hover:w-10"
                  aria-hidden
                />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================================== CTA ================================== */
function CTA() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const reduce = useReducedMotion();
  const glowY = useTransform(scrollYProgress, [0, 1], ["15%", "-15%"]);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-[#0a0a0a] text-white py-32 md:py-48"
      style={BODY}
    >
      <motion.div
        style={reduce ? {} : { y: glowY }}
        className="absolute inset-0 pointer-events-none"
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50rem] h-[50rem] rounded-full bg-gradient-to-br from-emerald-500/10 via-teal-500/5 to-transparent blur-3xl" />
      </motion.div>

      <div className="relative max-w-5xl mx-auto px-6 md:px-10 text-center">
        <Reveal>
          <p className="text-[11px] uppercase text-emerald-300/90 mb-10" style={MONO}>
            — Let's build something
          </p>
          <h2
            className="text-4xl md:text-6xl lg:text-8xl tracking-[-0.04em] leading-[0.98]"
            style={DISPLAY}
          >
            Partner with us
            <br />
            <span className="italic font-light bg-gradient-to-r from-emerald-300 via-teal-200 to-blue-300 bg-clip-text text-transparent">
              on the next decade
            </span>
            <br />
            of animal care.
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="mt-14 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/contact"
              className="group inline-flex items-center gap-3 px-7 py-4 rounded-full bg-white text-black overflow-hidden relative active:scale-[0.97] transition-transform"
            >
              <span className="relative block overflow-hidden h-5">
                <HoverShiftText>Get in touch</HoverShiftText>
              </span>
              <ArrowUpRight
                size={16}
                className="transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:rotate-45"
              />
            </Link>
            <Link
              to="/products"
              className="group inline-flex items-center gap-3 px-7 py-4 rounded-full border border-white/30 text-white hover:bg-white/5 transition-colors active:scale-[0.97]"
            >
              <span className="relative block overflow-hidden h-5">
                <HoverShiftText>Browse products</HoverShiftText>
              </span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ============================ PROGRESS BAR =============================== */
function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    mass: 0.2,
  });
  return (
    <motion.div
      style={{ scaleX, transformOrigin: "0% 50%" }}
      className="fixed top-0 left-0 right-0 h-[2px] z-[60] bg-white/80 mix-blend-difference"
      aria-hidden
    />
  );
}

/* ================================== HOME ================================= */
function Home() {
  const siteUrl = "https://www.innovationremedies.com";
  const siteName = "Innovation Remedies Life Science Pvt. Ltd.";
  const pageTitle = `${siteName} | Trusted Animal Health & Veterinary Products Across India`;
  const pageDescription = `${siteName} is your dedicated partner for advanced veterinary pharmaceuticals and animal health solutions throughout India.`;
  const canonicalUrl = `${siteUrl}/`;
  const ogImageUrl = `${siteUrl}/logo.png`;

  const primaryEntitySchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteName,
    alternateName: siteName,
    description: `Pioneering veterinary solutions, ${siteName} offers a comprehensive range of animal health products to customers across India.`,
    url: siteUrl,
    logo: ogImageUrl,
    image: ogImageUrl,
    telephone: "+91-9412702900",
    email: "info@innovationremedies.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Kila Parikshitgarh",
      addressLocality: "Meerut",
      addressRegion: "UP",
      postalCode: "250406",
      addressCountry: "IN",
    },
    sameAs: ["https://www.facebook.com/profile.php?id=61575431486434"],
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: canonicalUrl },
    ],
  };

  return (
    <div className="w-full bg-white text-neutral-900 antialiased" style={BODY}>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta
          name="keywords"
          content={`${siteName}, veterinary products India, animal health solutions India, animal supplements India, pet wellness India, livestock care India, veterinary pharmaceuticals India`}
        />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content={ogImageUrl} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={siteName} />
        <meta property="og:locale" content="en_IN" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="twitter:image" content={ogImageUrl} />
        <meta name="geo.region" content="IN" />
        <script type="application/ld+json">
          {JSON.stringify(primaryEntitySchema, null, 2)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbJsonLd, null, 2)}
        </script>
      </Helmet>

      <ScrollProgress />
      <Hero />
      <MarqueeTagline />
      <Stats />
      <Philosophy />
      <AnimalsMarquee />
      <Products />
      <TextReveal />
      <WhyUs />
      <CTA />
    </div>
  );
}

export default Home;
