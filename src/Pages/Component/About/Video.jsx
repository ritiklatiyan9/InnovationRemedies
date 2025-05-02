import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import bg4 from '../../../assets/Video/bg4.mp4';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function HeroSectionWithVideoBG() {
  return (
    <motion.section
      className="relative  h-screen overflow-hidden py-24 md:py-40"
      initial="hidden"
      animate="visible"
      variants={fadeIn}
    >
      {/* Background video (dimmed) */}
      <video
        className="absolute inset-0 w-full h-full object-cover brightness-50"
        src={bg4}
        poster="/videos/your-video-poster.jpg"
        autoPlay
        muted
        loop
        playsInline
      />

      {/* Decorative Shapes */}
    

      {/* Content */}
      <div className="relative z-20 container mx-auto px-4 sm:px-6 text-center">
        <motion.h1
          className="text-5xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight text-white"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Shaping the Future of{' '}
          <span className="bg-gradient-to-r from-emerald-400 to-teal-300 text-transparent bg-clip-text">
            Veterinary Innovation
          </span>
        </motion.h1>
        <motion.p
          className="text-lg md:text-xl text-gray-100 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Empowering veterinary professionals through cutting-edge technology solutions that enhance animal care worldwide.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <Button size="lg" className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-3 rounded-full flex items-center mx-auto shadow-lg transition-all duration-300 transform hover:scale-105">
            <span>Explore Our Story</span>
            <ArrowRight className="ml-2" size={20} />
          </Button>
        </motion.div>
      </div>

      {/* Wavy divider */}
      <div className="absolute bottom-0 left-0 w-full h-36 md:h-36 overflow-hidden">
        <svg viewBox="0 0 1440 150" preserveAspectRatio="none" className="w-full h-full">
          <defs>
            <linearGradient id="waveGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
              <stop offset="100%" stopColor="#f0fdfa" stopOpacity="1" />
            </linearGradient>
          </defs>
          <motion.path
            fill="url(#waveGrad)"
            d="M0,50 C360,150 1080,-50 1440,50 L1440,150 L0,150 Z"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.5 }}
          />
        </svg>
      </div>
    </motion.section>
  );
}
