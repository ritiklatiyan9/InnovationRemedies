import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { 
  PlayCircle, 
  ChevronRight, 
  ChevronLeft,
  Sparkles,
  Beaker,
  Microscope,
  Activity,
  Volume2,
  VolumeX
} from "lucide-react";

const HeroSection = () => {
  const [isMuted, setIsMuted] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Video URL - Replace with your actual video
  const videoUrl = "https://cdn.pixabay.com/video/2021/08/12/85462-591194719_large.mp4";
  const posterImageUrl = "https://images.pexels.com/photos/2280571/pexels-photo-2280571.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2";

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100
      }
    }
  };

  const floatingVariants = {
    animate: {
      y: [0, -10, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        repeatType: "reverse"
      }
    }
  };

  const features = [
    { icon: Beaker, text: "Advanced Testing", delay: 0 },
    { icon: Microscope, text: "Precision Analysis", delay: 0.1 },
    { icon: Activity, text: "Real-time Results", delay: 0.2 }
  ];

  return (
    <section className="relative w-full overflow-hidden h-screen bg-black">
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted={isMuted}
          playsInline
          poster={posterImageUrl}
          className="w-full h-full object-cover object-center scale-105"
        >
          <source src={videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Animated Gradient Overlays */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="absolute inset-0 z-[5]"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/60 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 via-transparent to-transparent"></div>
      </motion.div>

      {/* Animated Particles/Dots Background */}
      <div className="absolute inset-0 z-[6]">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-blue-400/30 rounded-full"
            initial={{ 
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              opacity: 0
            }}
            animate={{ 
              opacity: [0, 0.5, 0],
              scale: [0, 1.5, 0]
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 flex items-center min-h-screen">
        <motion.div 
          className="max-w-xl lg:max-w-2xl"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Badge */}
          <motion.div 
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6"
          >
            <Sparkles className="w-4 h-4 text-blue-400" />
            <span className="text-sm text-white/90">State-of-the-art Laboratory</span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1 
            variants={itemVariants}
            className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white leading-tight"
          >
            Research & Verify
            <br />
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Innovation
            </span>
          </motion.h1>

          {/* Subheading */}
          <motion.div 
            variants={itemVariants}
            className="mt-4"
          >
            <h2 className="text-xl sm:text-2xl lg:text-3xl text-white/90">
              Remedies Life Science Pvt. Ltd.
            </h2>
            <p className="text-lg sm:text-xl text-blue-400 mt-1">
              Laboratory of Excellence
            </p>
          </motion.div>

          {/* Description */}
          <motion.p 
            variants={itemVariants}
            className="mt-6 text-base sm:text-lg text-slate-200 leading-relaxed"
          >
            Innovation Remedies provides ultramodern laboratory services, 
            delivering cutting-edge molecular solutions from our state-of-the-art 
            facilities with precision and reliability.
          </motion.p>

          {/* Feature Icons */}
          <motion.div 
            variants={itemVariants}
            className="mt-8 flex flex-wrap gap-6"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="flex items-center gap-2 text-white/70"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 + feature.delay }}
              >
                <div className="p-2 rounded-lg bg-white/10 backdrop-blur-sm">
                  <feature.icon className="w-5 h-5" />
                </div>
                <span className="text-sm">{feature.text}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div 
            variants={itemVariants}
            className="mt-10 flex flex-col sm:flex-row gap-4"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                size="lg"
                className="group relative overflow-hidden bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-6 text-base rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <span className="relative z-10 flex items-center">
                  <PlayCircle className="mr-2 h-5 w-5" />
                  Explore Our Services
                </span>
                <motion.div
                  className="absolute inset-0 bg-white/20"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.5 }}
                />
              </Button>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                size="lg"
                variant="outline"
                className="group border-white/20 backdrop-blur-sm bg-white/5 text-white hover:bg-white/50 px-8 py-6 text-base rounded-full transition-all duration-300"
              >
                View Research Portfolio
                <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Floating Elements */}
      <motion.div 
        className="absolute bottom-10 right-10 hidden lg:block"
        variants={floatingVariants}
        animate="animate"
      >
        <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20">
          <Microscope className="w-8 h-8 text-blue-400" />
        </div>
      </motion.div>

      {/* Navigation Arrows */}
      <div className="absolute top-1/2 -translate-y-1/2 w-full px-4 z-20">
        <div className="flex justify-between">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Previous slide"
            className="p-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300"
            onClick={() => setCurrentSlide(prev => prev - 1)}
          >
            <ChevronLeft className="h-5 w-5 text-white" />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Next slide"
            className="p-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300"
            onClick={() => setCurrentSlide(prev => prev + 1)}
          >
            <ChevronRight className="h-5 w-5 text-white" />
          </motion.button>
        </div>
      </div>

      {/* Sound Toggle */}
     

      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5 }}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-6 h-10 rounded-full border-2 border-white/30 flex justify-center"
        >
          <motion.div
            animate={{ y: [2, 12, 2] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1 h-3 bg-white/60 rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;