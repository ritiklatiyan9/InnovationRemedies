import React, { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useInView,
  useReducedMotion,
  useMotionValue,
  animate as fmAnimate,
} from 'framer-motion';
import {
  Users,
  Trophy,
  Lightbulb,
  Star,
  Target,
  ArrowUpRight,
  ArrowDown,
  Heart,
  Award,
  Microscope,
} from 'lucide-react';
import vikasji from '../../../assets/Images/vikasji.jpg';
import aboutVideo from '../../../assets/Images/vid.mp4';

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

/* ------------------------------- Count up -------------------------------- */
function CountUp({ to, suffix = '', duration = 1.8 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const mv = useMotionValue(0);
  const [display, setDisplay] = useState('0');
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

/* ------------------------------- Reveal ---------------------------------- */
function Reveal({ children, delay = 0, y = 28, className = '' }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const reduce = useReducedMotion();
  return (
    <motion.div
      ref={ref}
      initial={reduce ? false : { opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: EASE_OUT }}
      className={className}
    >
      {children}
    </motion.div>
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
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.05, 1.18]);
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '-25%']);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative w-full h-[100svh] min-h-[720px] overflow-hidden text-white bg-[#05070f]"
      style={BODY}
    >
      {/* Video layer with parallax */}
      <motion.div
        aria-hidden
        style={reduce ? {} : { y: bgY, scale: bgScale }}
        className="absolute inset-0 -z-10"
      >
        <video
          className="absolute inset-0 w-full h-full object-cover"
          src={aboutVideo}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
        />
      </motion.div>

      {/* Color overlays for depth + readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#05070f]/60 via-[#05070f]/45 to-[#05070f]/80 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_90%_70%_at_20%_60%,transparent_0%,rgba(0,0,0,0.4)_100%)] pointer-events-none" />

      {/* Ambient blue orbs to match site */}
      <motion.div
        className="absolute w-[55vw] h-[55vw] rounded-full blur-3xl opacity-70 pointer-events-none"
        style={{
          background:
            'radial-gradient(circle, rgba(59,89,200,0.35) 0%, transparent 65%)',
          top: '-20%',
          left: '-10%',
        }}
        animate={reduce ? {} : { x: [0, 30, 0], y: [0, 20, 0] }}
        transition={{ duration: 40, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Top meta bar */}
      <div className="absolute top-24 inset-x-0 z-20 px-6 md:px-10 flex items-center justify-between text-[11px] text-white/60">
        <div className="flex items-center gap-2" style={MONO}>
          <motion.span
            className="w-[6px] h-[6px] rounded-full bg-emerald-400"
            animate={reduce ? {} : { opacity: [1, 0.3, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
          <span className="uppercase">About · Innovation Remedies</span>
        </div>
      </div>

      <motion.div
        style={reduce ? {} : { y: contentY, opacity: contentOpacity }}
        className="relative z-10 h-full flex flex-col justify-end pb-24 md:pb-28 px-6 md:px-10"
      >
        <div className="max-w-[1400px] mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE_OUT, delay: 0.1 }}
            className="flex items-center gap-3 mb-8"
          >
            <span className="h-px w-12 bg-white/60" />
            <span
              className="text-[11px] uppercase text-emerald-300/90"
              style={MONO}
            >
              Est. 2020 · Animal health · India
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: EASE_OUT, delay: 0.2 }}
            className="text-5xl md:text-7xl lg:text-8xl tracking-[-0.03em] leading-[0.95] max-w-5xl"
            style={DISPLAY}
          >
            <span className="block bg-gradient-to-b from-white via-white to-white/70 bg-clip-text text-transparent">
              We exist to advance
            </span>
            <span className="block italic font-light bg-gradient-to-r from-emerald-300 via-teal-200 to-blue-300 bg-clip-text text-transparent">
              animal care — together.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE_OUT, delay: 0.45 }}
            className="mt-10 max-w-xl text-base md:text-lg text-white/75 leading-relaxed"
          >
            Since 2020, Innovation Remedies has engineered veterinary
            pharmaceuticals and nutritional solutions for farmers, clinics, and
            distributors across 28 Indian states.
          </motion.p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-6 right-6 md:right-10 z-20 flex items-center gap-2 text-[10px] uppercase text-white/50"
        style={MONO}
      >
        <span>Scroll</span>
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

/* ============================ VALUES / STORY ============================= */
function Story() {
  const values = [
    {
      icon: Microscope,
      tint: 'bg-emerald-600',
      title: 'Science first',
      body:
        'Every formulation is validated through rigorous R&D before it reaches a single farm.',
    },
    {
      icon: Heart,
      tint: 'bg-rose-600',
      title: 'Animals above all',
      body:
        'Welfare is the yardstick — if it does not measurably improve animal health, we do not ship it.',
    },
    {
      icon: Users,
      tint: 'bg-blue-600',
      title: 'For the farmer',
      body:
        'Designed around the realities of Indian livestock, Indian climate, and Indian economics.',
    },
  ];

  return (
    <section className="relative bg-white py-28 md:py-36" style={BODY}>
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <div className="grid md:grid-cols-12 gap-10 lg:gap-16 items-start">
          <Reveal className="md:col-span-5">
            <p
              className="text-[11px] uppercase text-emerald-700 mb-5"
              style={MONO}
            >
              — Who we are
            </p>
            <h2
              className="text-4xl md:text-5xl lg:text-6xl tracking-[-0.03em] leading-[1.02]"
              style={DISPLAY}
            >
              A quiet company,
              <br />
              <span className="italic font-light bg-gradient-to-r from-emerald-600 via-teal-600 to-blue-700 bg-clip-text text-transparent">
                doing loud work.
              </span>
            </h2>
          </Reveal>
          <div className="md:col-span-7 space-y-6 text-neutral-600 leading-relaxed text-base md:text-lg">
            <Reveal delay={0.1}>
              <p>
                Innovation Remedies Life Science was founded in 2020 with a
                simple belief: India's animal health sector deserved
                pharmaceutical-grade rigour without pharmaceutical-grade
                pricing.
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <p>
                What began as a small R&D lab in Meerut has grown into a
                pan-India operation — 48+ formulations, 1,200+ partner clinics,
                2 million animals served. We remain stubbornly focused on the
                fundamentals: science, safety, and trust.
              </p>
            </Reveal>
          </div>
        </div>

        {/* Values row */}
        <div className="grid md:grid-cols-3 gap-5 mt-20 md:mt-28">
          {values.map((v, i) => (
            <Reveal key={v.title} delay={i * 0.08}>
              <article className="group relative h-full p-8 rounded-[1.5rem] bg-neutral-50 border border-neutral-200 hover:bg-white hover:border-neutral-300 transition-colors duration-500">
                <motion.span
                  whileHover={{ rotate: 12, scale: 1.06 }}
                  transition={{ duration: 0.4, ease: EASE_OUT }}
                  className={`inline-flex items-center justify-center w-11 h-11 rounded-full text-white mb-6 shadow-sm ${v.tint}`}
                >
                  <v.icon size={18} />
                </motion.span>
                <h3
                  className="text-xl md:text-2xl tracking-[-0.02em] text-neutral-900 mb-3"
                  style={DISPLAY}
                >
                  {v.title}
                </h3>
                <p className="text-sm text-neutral-600 leading-relaxed">
                  {v.body}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================================ STATS ================================== */
function Stats() {
  const stats = [
    { label: 'States reached', value: 28, suffix: '' },
    { label: 'Animals served', value: 2, suffix: 'M+' },
    { label: 'Diagnostic accuracy', value: 99, suffix: '%' },
    { label: 'Partner clinics', value: 1200, suffix: '+' },
  ];
  return (
    <section
      className="relative bg-[#05070f] text-white py-24 md:py-32 overflow-hidden"
      style={BODY}
    >
      <div
        aria-hidden
        className="absolute w-[55vw] h-[55vw] rounded-full blur-3xl opacity-40 pointer-events-none"
        style={{
          background:
            'radial-gradient(circle, rgba(59,89,200,0.3) 0%, transparent 65%)',
          top: '-25%',
          left: '-15%',
        }}
      />
      <div className="relative max-w-[1400px] mx-auto px-6 md:px-10">
        <Reveal>
          <p
            className="text-[11px] uppercase text-emerald-300/90 mb-5"
            style={MONO}
          >
            — By the numbers
          </p>
          <h2
            className="text-4xl md:text-6xl tracking-[-0.03em] leading-[1.02] max-w-3xl"
            style={DISPLAY}
          >
            Measured impact.
            <br />
            <span className="italic font-light bg-gradient-to-r from-emerald-300 via-teal-200 to-blue-300 bg-clip-text text-transparent">
              No marketing fluff.
            </span>
          </h2>
        </Reveal>
        <div className="mt-16 md:mt-20 grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.06}>
              <div className="border-t border-white/20 pt-5">
                <div
                  className="text-5xl md:text-7xl tracking-[-0.04em] tabular-nums leading-none"
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

/* ============================== TIMELINE ================================= */
// Each item has a pre-set (x) position for its dot so it lands on the curve.
// Curve alternates between x=20 and x=80 (SVG viewBox units = px since SVG is 100px wide).
function dotXForIndex(i) {
  return i % 2 === 0 ? 80 : 20;
}

// Items are 220 tall (minHeight). Dot y is at top+110 of each item.
// Builds a smooth S-curve that passes through every dot.
function buildCurvePath(count) {
  if (count < 1) return '';
  const itemH = 220;
  const firstY = 110;
  let d = `M ${dotXForIndex(0)} ${firstY}`;
  for (let i = 1; i < count; i++) {
    const prevX = dotXForIndex(i - 1);
    const prevY = firstY + (i - 1) * itemH;
    const curX = dotXForIndex(i);
    const curY = firstY + i * itemH;
    // Bulge outward from the midpoint to create a wave.
    // Control points pull the curve toward the opposite side in between.
    const midY = (prevY + curY) / 2;
    const bulge = prevX === 80 ? 110 : -10; // push past the edge for a nice bow
    const c1x = bulge;
    const c2x = prevX === 80 ? -10 : 110;
    d += ` C ${c1x} ${midY - 10}, ${c2x} ${midY + 10}, ${curX} ${curY}`;
  }
  return d;
}

function TimelineItem({ m, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-20%' });
  const reduce = useReducedMotion();
  const x = dotXForIndex(index);

  return (
    <div
      ref={ref}
      className="relative pl-32 md:pl-40 py-10 md:py-14 group"
      style={{ minHeight: '220px' }}
    >
      {/* Single dot — positioned on the curve */}
      <motion.span
        initial={reduce ? false : { scale: 0 }}
        animate={inView ? { scale: 1 } : {}}
        transition={{ duration: 0.6, ease: EASE_OUT, delay: 0.1 }}
        className="absolute top-[100px] md:top-[110px] w-5 h-5 rounded-full bg-white border-[3px] shadow-[0_0_0_6px_rgba(255,255,255,0.9)] z-10"
        style={{
          left: `${x}px`,
          borderColor: m.color || '#10b981',
          transform: 'translate(-50%, -50%)',
        }}
      />

      {/* Header row: step + divider + year pill */}
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 14 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: EASE_OUT, delay: 0.15 }}
        className="flex items-baseline gap-4 mb-4"
      >
        <span
          className="text-[10px] uppercase text-neutral-500 tabular-nums"
          style={MONO}
        >
          Step {String(index + 1).padStart(2, '0')}
        </span>
        <span className="h-px flex-1 bg-neutral-200" />
        <span
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] text-white tabular-nums"
          style={{ ...MONO, backgroundColor: m.color || '#10b981' }}
        >
          {m.year}
        </span>
      </motion.div>

      {/* Content */}
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: EASE_OUT, delay: 0.2 }}
        className="flex items-start gap-4"
      >
        <motion.span
          whileHover={{ rotate: 12, scale: 1.06 }}
          transition={{ duration: 0.4, ease: EASE_OUT }}
          className={`shrink-0 inline-flex items-center justify-center w-11 h-11 rounded-full text-white shadow-sm ${m.tint}`}
        >
          <m.icon size={18} />
        </motion.span>
        <div className="flex-1">
          <h3
            className="text-2xl md:text-4xl tracking-[-0.02em] text-neutral-900 leading-tight transition-colors duration-500 group-hover:text-neutral-600"
            style={DISPLAY}
          >
            {m.title}
          </h3>
          <p className="mt-3 text-neutral-600 leading-relaxed max-w-2xl">
            {m.desc}
          </p>
        </div>
      </motion.div>
    </div>
  );
}

function Timeline() {
  const sectionRef = useRef(null);
  const railRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: railRef,
    offset: ['start 80%', 'end 20%'],
  });
  const reduce = useReducedMotion();

  const milestones = [
    {
      year: '2019',
      title: 'The idea',
      desc: 'Founders begin R&D on veterinary formulations built specifically for Indian livestock conditions.',
      icon: Lightbulb,
      tint: 'bg-amber-600',
      color: '#d97706',
    },
    {
      year: '2020',
      title: 'Company founded',
      desc: 'Innovation Remedies Life Science Pvt. Ltd. incorporated in Meerut, UP.',
      icon: Target,
      tint: 'bg-emerald-600',
      color: '#059669',
    },
    {
      year: '2021',
      title: 'First 5 states',
      desc: 'Distribution network established across five north-Indian states and 200 partner clinics.',
      icon: Users,
      tint: 'bg-blue-600',
      color: '#2563eb',
    },
    {
      year: '2022',
      title: '50+ products shipping',
      desc: 'Catalogue crossed 50 formulations spanning lactation, growth, liver, deworming and dermatology.',
      icon: Award,
      tint: 'bg-teal-600',
      color: '#0d9488',
    },
    {
      year: '2023',
      title: '1 million animals served',
      desc: 'Our products reached an estimated one million animals through partner clinics and cooperatives.',
      icon: Trophy,
      tint: 'bg-indigo-600',
      color: '#4f46e5',
    },
    {
      year: '2025',
      title: 'Online platform',
      desc: 'Launched innovationremedies.com to reach distributors, veterinarians and farmers directly.',
      icon: Star,
      tint: 'bg-rose-600',
      color: '#e11d48',
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative bg-white py-28 md:py-36"
      style={BODY}
    >
      <div className="max-w-[1100px] mx-auto px-6 md:px-10">
        <div className="grid md:grid-cols-12 gap-10 items-end mb-16 md:mb-20">
          <Reveal className="md:col-span-8">
            <p
              className="text-[11px] uppercase text-emerald-700 mb-5"
              style={MONO}
            >
              — The journey
            </p>
            <h2
              className="text-4xl md:text-5xl lg:text-6xl tracking-[-0.03em] leading-[1.02] text-neutral-900"
              style={DISPLAY}
            >
              Five years.
              <br />
              <span className="italic font-light bg-gradient-to-r from-emerald-600 via-teal-600 to-blue-700 bg-clip-text text-transparent">
                Six milestones.
              </span>
            </h2>
          </Reveal>
          <Reveal className="md:col-span-4" delay={0.1}>
            <p className="text-sm md:text-base text-neutral-600 leading-relaxed max-w-sm">
              A short story — told through the moments that shaped us.
            </p>
          </Reveal>
        </div>

        {/* Timeline rail — curved SVG */}
        <div ref={railRef} className="relative">
          {/* Curved rail covers the whole timeline with an S-curve that passes
              through each dot (alternating x=80 and x=20, 220 units apart). */}
          <svg
            aria-hidden
            className="absolute left-0 top-0 h-full w-[100px] pointer-events-none"
            preserveAspectRatio="none"
            viewBox={`0 0 100 ${milestones.length * 220}`}
            fill="none"
          >
            <defs>
              <linearGradient
                id="rail-gradient"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop offset="0%" stopColor="#10b981" />
                <stop offset="50%" stopColor="#14b8a6" />
                <stop offset="100%" stopColor="#2563eb" />
              </linearGradient>
            </defs>

            {/* Background rail */}
            <path
              d={buildCurvePath(milestones.length)}
              stroke="#e5e7eb"
              strokeWidth="2"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
            />

            {/* Progress rail — fills as user scrolls */}
            <motion.path
              d={buildCurvePath(milestones.length)}
              stroke="url(#rail-gradient)"
              strokeWidth="2.5"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
              style={reduce ? { pathLength: 1 } : { pathLength: scrollYProgress }}
            />
          </svg>

          {milestones.map((m, i) => (
            <TimelineItem key={m.year + i} m={m} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================================= TEAM ================================== */
function Team() {
  const team = [
    {
      name: 'Mr. Vikas Malik',
      role: 'Managing Director',
      bio: 'Veterinarian with 15+ years in clinical practice and telemedicine development.',
      avatar: vikasji,
    },
    {
      name: 'Geeta',
      role: 'Chief Marketing Officer',
      bio: 'Visionary expert in medical diagnostics and veterinary brand strategy.',
      avatar:
        'https://images.unsplash.com/photo-1607746882042-944635dfe10e?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=80',
    },
    {
      name: 'Aryan Malik',
      role: 'Lead Market Specialist',
      bio: 'Growth mindset with 4+ years in veterinary marketing and channel sales.',
      avatar:
        'https://images.unsplash.com/photo-1599566150168-df1fcf16f1f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=80',
    },
  ];

  return (
    <section
      className="relative bg-neutral-50 py-28 md:py-36 border-t border-neutral-200"
      style={BODY}
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <Reveal className="max-w-3xl mb-16">
          <p
            className="text-[11px] uppercase text-emerald-700 mb-5"
            style={MONO}
          >
            — Leadership
          </p>
          <h2
            className="text-4xl md:text-5xl lg:text-6xl tracking-[-0.03em] leading-[1.02] text-neutral-900"
            style={DISPLAY}
          >
            The people
            <br />
            <span className="italic font-light bg-gradient-to-r from-emerald-600 via-teal-600 to-blue-700 bg-clip-text text-transparent">
              behind the work.
            </span>
          </h2>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {team.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.08}>
              <article className="group relative rounded-[1.5rem] overflow-hidden bg-white border border-neutral-200 hover:border-neutral-300 transition-colors duration-500 h-full">
                <div className="relative aspect-[4/5] overflow-hidden">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1100ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  <span
                    className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] uppercase bg-white/90 backdrop-blur-sm text-neutral-700"
                    style={MONO}
                  >
                    0{i + 1}
                  </span>
                </div>
                <div className="p-6 md:p-7">
                  <div
                    className="text-[10px] uppercase text-emerald-700 mb-2"
                    style={MONO}
                  >
                    {t.role}
                  </div>
                  <h3
                    className="text-xl md:text-2xl tracking-[-0.02em] text-neutral-900 mb-3"
                    style={DISPLAY}
                  >
                    {t.name}
                  </h3>
                  <p className="text-sm text-neutral-600 leading-relaxed">
                    {t.bio}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================================= CTA =================================== */
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
      className="relative overflow-hidden bg-[#05070f] text-white py-28 md:py-40"
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
          <p
            className="text-[11px] uppercase text-emerald-300/90 mb-8"
            style={MONO}
          >
            — Let's build together
          </p>
          <h2
            className="text-4xl md:text-6xl lg:text-7xl tracking-[-0.04em] leading-[0.98]"
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
          <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/contact"
              className="group inline-flex items-center gap-3 px-7 py-4 rounded-full bg-white text-black hover:bg-emerald-300 transition-colors duration-300 active:scale-[0.98]"
              style={DISPLAY}
            >
              <span className="text-sm">Get in touch</span>
              <ArrowUpRight
                size={16}
                className="transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:rotate-45"
              />
            </Link>
            <Link
              to="/products"
              className="inline-flex items-center gap-3 px-7 py-4 rounded-full border border-white/30 text-white hover:bg-white/5 transition-colors duration-300 active:scale-[0.98]"
              style={DISPLAY}
            >
              <span className="text-sm">See products</span>
              <ArrowUpRight size={16} />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* =============================== About =================================== */
export default function About() {
  return (
    <div className="w-full bg-white text-neutral-900 antialiased" style={BODY}>
      <Hero />
      <Story />
      <Stats />
      <Timeline />
      <Team />
      <CTA />
    </div>
  );
}
