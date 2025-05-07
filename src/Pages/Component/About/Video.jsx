import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import bg4 from '../../../assets/Video/bg11.mp4';

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
        className="absolute inset-0 w-full h-full object-cover brightness-125"
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
      
       
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
        
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
