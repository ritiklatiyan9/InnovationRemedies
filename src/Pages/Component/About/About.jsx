import React, { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Video from './Video';

import {
  Eye, Target, Users, Trophy,
  Briefcase, Lightbulb, Star,
  ArrowRight, MessageSquare, Heart, Award, Calendar
} from 'lucide-react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';

const customStyle = {
  fontFamily: "SF Pro Text Regular, sans-serif",
  fontWeight: "400",
};

const VisionIcon = () => (
  <motion.svg
    width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
    initial={{ scale: 0.9, opacity: 0.8 }}
    whileHover={{ scale: 1.1, rotate: 5 }}
    transition={{ type: 'spring', stiffness: 300 }}
  >
    <circle cx="12" cy="12" r="9" stroke="#10B981" strokeWidth="1.5" />
    <path d="M12 7v5l3 3" stroke="#10B981" strokeWidth="1.5" strokeLinecap="round" />
    <motion.circle
      cx="12" cy="12" r="2" fill="#10B981"
      animate={{ scale: [1, 1.2, 1], opacity: [1, 0.7, 1] }}
      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
    />
  </motion.svg>
);

const MissionIcon = () => (
  <motion.svg
    width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
    initial={{ scale: 0.9, opacity: 0.8 }}
    whileHover={{ scale: 1.1, rotate: -5 }}
    transition={{ type: 'spring', stiffness: 300 }}
  >
    <rect x="5" y="5" width="14" height="14" rx="2" stroke="#3B82F6" strokeWidth="1.5" />
    <motion.path
      d="M12 5V19" stroke="#3B82F6" strokeWidth="1.5" strokeLinecap="round"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 1, delay: 0.2 }}
    />
    <motion.path
      d="M5 12h14" stroke="#3B82F6" strokeWidth="1.5" strokeLinecap="round"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 1, delay: 0.4 }}
    />
  </motion.svg>
);

// --- New Background Elements ---

// Enhanced background with particles
const EnhancedBackground = () => (
  <div className="absolute inset-0 w-full h-full overflow-hidden opacity-40 pointer-events-none">
    <svg className="w-full h-full opacity-15" preserveAspectRatio="none">
      <defs>
        <radialGradient id="backgroundGrad" cx="50%" cy="50%" r="70%" fx="50%" fy="50%">
          <stop offset="0%" stopColor="#ecfdf5" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#f0fdfa" stopOpacity="0" />
        </radialGradient>
        <filter id="softGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="15" />
        </filter>
      </defs>
      <rect width="100%" height="100%" fill="url(#backgroundGrad)" filter="url(#softGlow)" />
    </svg>
    
    {/* Animated Particles */}
    {Array.from({ length: 15 }).map((_, i) => (
      <motion.div
        key={i}
        className="absolute rounded-full"
        style={{
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
          width: `${Math.random() * 20 + 5}px`,
          height: `${Math.random() * 20 + 5}px`,
          background: i % 2 === 0 ? 'rgba(16, 185, 129, 0.2)' : 'rgba(59, 130, 246, 0.2)',
        }}
        animate={{
          y: [0, Math.random() * -100 - 50],
          x: [0, (Math.random() - 0.5) * 50],
          opacity: [0, 0.7, 0],
        }}
        transition={{
          duration: Math.random() * 10 + 15,
          repeat: Infinity,
          ease: "linear",
          delay: Math.random() * 10,
        }}
      />
    ))}
  </div>
);

// Modernized Wave Divider
const WaveDivider = ({ inverted = false, color = "from-green-100 to-blue-100" }) => (
  <div className={`w-full h-24 relative overflow-hidden ${inverted ? 'transform rotate-180' : ''}`}>
    <div className={`absolute w-full h-full bg-gradient-to-r ${color} opacity-50`}></div>
    <svg viewBox="0 0 1440 120" className="absolute bottom-0 w-full h-full">
      <motion.path
        d="M0,64 C320,120 480,20 720,80 C960,140 1200,40 1440,96 L1440,120 L0,120 Z"
        fill="white"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      />
    </svg>
  </div>
);

// --- Main Component ---

export default function EnhancedAboutUs() {
  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const fadeInScale = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.6 } }
  };

  const staggerContainer = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  // References for scroll animations
  const timelineRef = useRef(null);

  // Team member data
  const teamMembers = [
    {
      name: "Arjit Malik",
      role: "Chief Medical Officer",
      bio: "Veterinarian with 15+ years experience in clinical practice and telemedicine development",
      avatar: "https://images.unsplash.com/photo-1612349317150-e413f6a5f3c8?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=80"
    },
    {
      name: "Ayushi Sharma",
      role: "Chief Marketing Officer",
      bio: "Tech visionary specializing in AI integration for medical diagnostics",
      avatar: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=80"
    },
    {
      name: "Vineet Kumar",
      role: "Head of Operations",
      bio: "Strategic leader managing global expansion across 30+ countries",
      avatar: "https://images.unsplash.com/photo-1614952105-7b2a7ae3f8ee?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=80"
    },
    {
      name: "Rahul Singh",
      role: "Lead Market Specialist",
      bio: "Machine learning expert developing predictive analytics for animal health",
      avatar: "https://images.unsplash.com/photo-1599566150168-df1fcf16f1f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=80"
    }
  ];
  
  // Timeline milestones
  const milestones = [
    { 
      year: "2020", 
      title: "Company Founding", 
      desc: "Established with a $2M seed round focused on veterinary AI research", 
      icon: <Lightbulb className="text-amber-500" />,
      color: "bg-amber-50 border-amber-200"
    },
    { 
      year: "2021", 
      title: "Global Expansion", 
      desc: "Launched platform in 15 countries across North America and Europe", 
      icon: <Users className="text-blue-500" />,
      color: "bg-blue-50 border-blue-200"
    },
    { 
      year: "2022", 
      title: "AI Diagnostic Breakthrough", 
      desc: "Released first-gen diagnostic tool achieving 94% accuracy in pilot studies", 
      icon: <Target className="text-emerald-500" />,
      color: "bg-emerald-50 border-emerald-200"
    },
    { 
      year: "2023", 
      title: "1 Million Pet Lives Impacted", 
      desc: "Reached milestone of serving 1 million pets through partner clinics", 
      icon: <Trophy className="text-purple-500" />,
      color: "bg-purple-50 border-purple-200"
    },
    { 
      year: "2024", 
      title: "Mobile App Launch", 
      desc: "Released pet owner app with 500K downloads in first month", 
      icon: <Star className="text-rose-500" />,
      color: "bg-rose-50 border-rose-200"
    }
  ];

  // Stats data
  const stats = [
    { value: "50+", label: "Countries", icon: <Users className="mx-auto mb-3 text-blue-500" size={32} /> },
    { value: "1M+", label: "Pets Helped", icon: <Heart className="mx-auto mb-3 text-rose-500" size={32} /> },
    { value: "94%", label: "Diagnostic Accuracy", icon: <Target className="mx-auto mb-3 text-emerald-500" size={32} /> },
    { value: "5,000+", label: "Veterinary Partners", icon: <Award className="mx-auto mb-3 text-amber-500" size={32} /> }
  ];

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-emerald-50 font-sans text-gray-800 overflow-hidden relative"
      style={customStyle}
      id="about-us-page"
    >
      {/* Enhanced Background */}
      <EnhancedBackground />

      {/* Hero Section with Video Background */}
      <motion.section
        className="relative pt-20 pb-24 overflow-hidden min-h-screen flex items-center"
        initial="hidden"
        animate="visible"
        variants={fadeIn}
      >
        {/* Video Background */}
        <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/30 to-blue-500/30 mix-blend-overlay z-10"></div>
          <div className="absolute inset-0 bg-black/50 z-10"></div>
          <Video className="absolute inset-0 w-full h-full object-cover" />
        </div>
        
        <div className="container mx-auto px-4 relative z-20">
          <motion.div 
            className="text-center"
            variants={fadeIn}
          >
            <motion.h1 
              className="text-4xl sm:text-5xl md:text-7xl font-bold mb-6 text-white drop-shadow-lg"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Transforming Healthcare
            </motion.h1>
            <motion.p
              className="text-xl md:text-2xl text-white mt-4 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Revolutionizing animal healthcare with AI-powered diagnostic tools and telemedicine platforms.
            </motion.p>
          </motion.div>
        </div>
      </motion.section>

      <WaveDivider color="from-blue-100 to-emerald-100" />

      {/* Vision & Mission */}
      <motion.section
        className="py-20 bg-white relative z-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={staggerContainer}
      >
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div 
              className="order-2 md:order-1 space-y-12"
              variants={fadeIn}
            >
              <motion.div 
                variants={fadeInScale}
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 100 }}
                className="p-8 rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100 shadow-sm relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-transparent opacity-30"></div>
                <div className="flex items-center mb-4">
                  <MissionIcon />
                  <h2 className="text-2xl md:text-3xl font-bold ml-4 text-gray-800">Our Mission</h2>
                </div>
                <p className="text-gray-700 leading-relaxed text-lg">
                  Revolutionize animal healthcare with AI-powered diagnostic tools and telemedicine platforms designed specifically for veterinary professionals. Our innovative solutions enable faster, more accurate diagnoses and remote consultations, helping veterinarians deliver high-quality care anytime, anywhere. Trusted in over 50 countries, our technology leverages advanced machine learning and real-time data analytics to support decision-making, reduce diagnostic errors, and streamline workflows.
                </p>
              </motion.div>
            </motion.div>

            <motion.div
              className="order-1 md:order-2 flex justify-center"
              variants={fadeIn}
              initial={{ opacity: 0, scale: 0.8, rotate: -2 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.8, type: 'spring' }}
            >
              <div className="relative">
                <div className="absolute inset-0 bg-blue-200 rounded-xl transform rotate-3"></div>
                <img 
                  src="https://www.blogtyrant.com/wp-content/uploads/2011/02/best-about-us-pages.png" 
                  alt="About our mission" 
                  className="relative z-10 rounded-xl shadow-xl transform hover:rotate-0 transition-all duration-500 hover:scale-105"
                />
                <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-emerald-400 rounded-full flex items-center justify-center text-white">
                  <Award size={32} />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      <WaveDivider inverted={true} color="from-emerald-100 to-blue-100" />

      {/* Team Section */}
      <motion.section
        className="py-20 bg-gradient-to-br from-blue-50 to-blue-100 relative z-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={staggerContainer}
      >
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div 
            className="text-center mb-16" 
            variants={fadeIn}
          >
            <span className="inline-block px-4 py-1 rounded-full bg-blue-200 text-blue-700 text-sm font-medium mb-4">
              Our People
            </span>
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-gray-800">Meet Our Leadership</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              A team of veterinary experts, software engineers, and healthcare innovators driving our mission forward.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={staggerContainer}
          >
            {teamMembers.map((member, index) => (
              <motion.div 
                key={index} 
                variants={{
                  hidden: { opacity: 0, y: 50 },
                  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, delay: index * 0.1 } }
                }}
                whileHover={{ y: -10, scale: 1.02, boxShadow: "0 10px 20px rgba(0,0,0,0.1)" }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                <Card className="bg-white p-6 rounded-xl overflow-hidden shadow-lg transition-all duration-300 h-full flex flex-col text-center border-t-4 border-blue-400">
                  <div className="w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden ring-4 ring-blue-100 ring-offset-2 shadow-md transform transition-all duration-300 hover:scale-105">
                    <img src={member.avatar} alt={member.name} className="w-full h-full object-cover" loading="lazy"/>
                  </div>
                  <h3 className="font-bold text-xl mb-1 text-gray-800">{member.name}</h3>
                  <p className="text-emerald-600 text-sm mb-4 font-medium tracking-wide uppercase">{member.role}</p>
                  <p className="text-gray-600 text-base flex-grow">{member.bio}</p>
                  
                  <div className="mt-6 pt-6 border-t border-gray-100">
                    <Button variant="ghost" size="sm" className="text-blue-500 hover:text-blue-700 hover:bg-blue-50 rounded-full">
                      View Profile
                    </Button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      <WaveDivider color="from-blue-100 to-white" />

      {/* Achievements Timeline */}
      <section 
        className="py-20 bg-white relative z-10"
        ref={timelineRef}
      >
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            variants={fadeIn}
          >
            <span className="inline-block px-4 py-1 rounded-full bg-emerald-200 text-emerald-700 text-sm font-medium mb-4">
              Our Journey
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800">Milestones & Achievements</h2>
            <p className="text-gray-600 max-w-3xl mx-auto text-lg">
              Transforming veterinary care one achievement at a time, with innovative solutions and global impact.
            </p>
          </motion.div>

          <div className="relative max-w-4xl mx-auto">
            {/* Timeline line - enhanced */}
            <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-emerald-200 via-blue-300 to-purple-300 rounded-full"></div>

            {/* Timeline items with improved design and animations - properly alternating */}
            {milestones.map((item, index) => {
              const isEven = index % 2 === 0;
              
              return (
                <motion.div
                  key={index}
                  className="mb-16 w-full"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }}
                  variants={{
                    hidden: { 
                      opacity: 0, 
                      scale: 0.9,
                      x: isEven ? -50 : 50 
                    },
                    visible: { 
                      opacity: 1, 
                      scale: 1,
                      x: 0,
                      transition: { 
                        type: "spring", 
                        stiffness: 100, 
                        delay: index * 0.1 
                      } 
                    }
                  }}
                >
                  {/* Mobile layout (stacked) */}
                  <div className="md:hidden flex flex-col items-start pl-8 relative">
                    <div className="absolute left-0 top-4 w-6 h-6 rounded-full bg-white border-4 border-emerald-400 shadow-md z-10"></div>
                    <motion.div 
                      className={`w-full p-6 rounded-xl shadow-lg border-l-4 ${item.color} hover:shadow-xl transition-all duration-300`}
                      whileHover={{ scale: 1.03 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center">
                          {item.icon}
                        </div>
                        <div className="text-xl font-bold text-gray-700">{item.year}</div>
                      </div>
                      <h3 className="text-xl font-bold mb-2 text-gray-800">{item.title}</h3>
                      <p className="text-gray-600">{item.desc}</p>
                    </motion.div>
                  </div>
                  
                  {/* Desktop layout (alternating) */}
                  <div className="hidden md:flex items-center w-full">
                    {/* Left side content */}
                    {isEven ? (
                      <>
                        <div className="w-5/12 px-4 text-right">
                          <motion.div 
                            className={`p-6 rounded-xl shadow-lg border-l-4 ${item.color} hover:shadow-xl transition-all duration-300`}
                            whileHover={{ scale: 1.03, y: -5 }}
                            transition={{ type: "spring", stiffness: 300 }}
                          >
                            <div className="flex items-center gap-3 mb-4 justify-end">
                              <div className="text-xl font-bold text-gray-700">{item.year}</div>
                              <div className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center">
                                {item.icon}
                              </div>
                            </div>
                            <h3 className="text-xl font-bold mb-2 text-gray-800">{item.title}</h3>
                            <p className="text-gray-600">{item.desc}</p>
                          </motion.div>
                        </div>
                        
                        {/* Center Dot */}
                        <div className="w-2/12 flex justify-center">
                          <motion.div 
                            className="relative z-10 w-6 h-6 rounded-full bg-white border-4 border-emerald-400 shadow-md"
                            initial={{ scale: 0 }}
                            whileInView={{ scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ type: "spring", stiffness: 300, delay: index * 0.1 + 0.2 }}
                          />
                        </div>
                        
                        {/* Right side (empty) */}
                        <div className="w-5/12"></div>
                      </>
                    ) : (
                      <>
                        {/* Left side (empty) */}
                        <div className="w-5/12"></div>
                        
                        {/* Center Dot */}
                        <div className="w-2/12 flex justify-center">
                          <motion.div 
                            className="relative z-10 w-6 h-6 rounded-full bg-white border-4 border-emerald-400 shadow-md"
                            initial={{ scale: 0 }}
                            whileInView={{ scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ type: "spring", stiffness: 300, delay: index * 0.1 + 0.2 }}
                          />
                        </div>
                        
                        {/* Right side content */}
                        <div className="w-5/12 px-4 text-left">
                          <motion.div 
                            className={`p-6 rounded-xl shadow-lg border-r-4 ${item.color} hover:shadow-xl transition-all duration-300`}
                            whileHover={{ scale: 1.03, y: -5 }}
                            transition={{ type: "spring", stiffness: 300 }}
                          >
                            <div className="flex items-center gap-3 mb-4 justify-start">
                              <div className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center">
                                {item.icon}
                              </div>
                              <div className="text-xl font-bold text-gray-700">{item.year}</div>
                            </div>
                            <h3 className="text-xl font-bold mb-2 text-gray-800">{item.title}</h3>
                            <p className="text-gray-600">{item.desc}</p>
                          </motion.div>
                        </div>
                      </>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <motion.section
        className="py-16 bg-gradient-to-br from-emerald-50 to-blue-50 relative z-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={staggerContainer}
      >
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="p-6 rounded-xl bg-white shadow-md"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { 
                    opacity: 1, 
                    y: 0, 
                    transition: { 
                      delay: index * 0.1,
                      type: "spring",
                      stiffness: 100
                    } 
                  }
                }}
                whileHover={{ 
                  y: -10, 
                  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" 
                }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {stat.icon}
                <motion.h3
                  className="text-3xl md:text-4xl font-bold text-gray-800 mb-1"
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", stiffness: 100, delay: 0.2 + index * 0.1 }}
                >
                  {stat.value}
                </motion.h3>
                <p className="text-gray-500 font-medium">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <section className="relative py-24 md:py-32 z-10 overflow-hidden">
        {/* Animated Gradient Background */}
        <motion.div
          className="absolute inset-0 z-0"
          style={{
            background: 'linear-gradient(135deg, #6ee7b7, #3b82f6, #10b981)',
            backgroundSize: '300% 300%',
          }}
          animate={{ backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'] }}
          transition={{ duration: 15, ease: 'linear', repeat: Infinity }}
        />

        {/* Floating elements in background */}
        {Array.from({ length: 6 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white opacity-20"
            style={{
              width: `${Math.random() * 100 + 50}px`,
              height: `${Math.random() * 100 + 50}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              x: [0, Math.random() * 50 - 25, 0],
              rotate: [0, 360],
            }}
            transition={{
              duration: Math.random() * 20 + 15,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}

        <div className="container mx-auto px-4 sm:px-6 text-center relative z-10">
          <motion.div
            className="max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.h2
              className="text-3xl md:text-5xl font-bold mb-6 text-white drop-shadow-md"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              Ready to Transform Your Veterinary Practice?
            </motion.h2>
            <motion.p
              className="text-xl text-white mb-8"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              Join thousands of veterinary professionals already using our AI-powered solutions.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <Button size="lg" className="bg-white text-emerald-600 hover:bg-emerald-50 font-semibold py-3 px-8 rounded-full shadow-lg hover:shadow-xl transition-all duration-300">
                Get Started <ArrowRight className="ml-2" />
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}