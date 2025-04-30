import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
    Eye, Target, Users, Trophy,
    Briefcase, Lightbulb, Star,
    ArrowRight, MessageSquare
} from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';

// --- Enhanced SVG Icons ---

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

// --- New SVG Illustrations & Backgrounds ---

// Subtle flowing background lines
const FlowBackground = () => (
    <svg className="absolute inset-0 w-full h-full opacity-10 pointer-events-none" preserveAspectRatio="none">
        <defs>
            <linearGradient id="flowGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ecfdf5" />
                <stop offset="100%" stopColor="#d1fae5" />
            </linearGradient>
            <linearGradient id="flowGrad2" x1="100%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#eff6ff" />
                <stop offset="100%" stopColor="#dbeafe" />
            </linearGradient>
            <filter id="softBlur" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="10" />
            </filter>
        </defs>
        <motion.path
            d="M -200,300 Q 100,100 500,300 T 1200,300 T 1900,300"
            stroke="url(#flowGrad1)"
            strokeWidth="150"
            fill="none"
            filter="url(#softBlur)"
            initial={{ x: -200 }}
            animate={{ x: 0 }}
            transition={{ duration: 20, ease: "linear", repeat: Infinity, repeatType: "reverse" }}
        />
        <motion.path
            d="M -200,600 Q 400,800 900,600 T 1600,600 T 2300,600"
            stroke="url(#flowGrad2)"
            strokeWidth="120"
            fill="none"
            filter="url(#softBlur)"
            initial={{ x: 100 }}
            animate={{ x: -100 }}
            transition={{ duration: 25, ease: "linear", repeat: Infinity, repeatType: "reverse" }}
        />
    </svg>
);

// Animated Globe Illustration
const GlobeIllustration = () => {
    const { scrollYProgress } = useScroll();
    const rotate = useTransform(scrollYProgress, [0, 1], [0, 90]);

    return (
        <motion.svg
            className="w-full h-auto max-w-md mx-auto"
            viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg"
            style={{ rotate }} // Apply rotation based on scroll
        >
            {/* Outer subtle glow */}
            <circle cx="200" cy="200" r="180" fill="#BFDBFE" opacity="0.1" filter="url(#softBlur)"/>
            {/* Main globe shape */}
            <circle cx="200" cy="200" r="150" fill="#BFDBFE" opacity="0.3" />
            {/* Grid lines */}
            <motion.path
                d="M80 200 C 140 150, 260 150, 320 200"
                stroke="#3B82F6" strokeWidth="2"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.5, delay: 0.2, ease: "easeInOut" }}
            />
             <motion.path
                d="M80 200 C 140 250, 260 250, 320 200"
                stroke="#3B82F6" strokeWidth="2"
                 initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.5, delay: 0.4, ease: "easeInOut" }}
            />
             <motion.path
                d="M200 80 C 150 140, 150 260, 200 320"
                stroke="#3B82F6" strokeWidth="2"
                 initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.5, delay: 0.6, ease: "easeInOut" }}
            />
            <motion.path
                d="M200 80 C 250 140, 250 260, 200 320"
                stroke="#3B82F6" strokeWidth="2"
                 initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.5, delay: 0.8, ease: "easeInOut" }}
            />
            {/* Inner pulsing circle */}
            <motion.circle
                cx="200" cy="200" r="80" fill="#3B82F6" opacity="0.1"
                animate={{ scale: [1, 1.05, 1], opacity: [0.1, 0.2, 0.1] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            />
            <defs>
              <filter id="softBlur" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="15" />
              </filter>
            </defs>
        </motion.svg>
    );
};

// Simple Flow Divider SVG
const FlowDivider = ({ className = '' }) => (
    <svg
        className={`w-full h-16 md:h-24 opacity-30 ${className}`}
        viewBox="0 0 1440 100"
        preserveAspectRatio="none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <defs>
            <linearGradient id="dividerGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#a7f3d0" />
                <stop offset="50%" stopColor="#6ee7b7" />
                <stop offset="100%" stopColor="#a7f3d0" />
            </linearGradient>
        </defs>
        <motion.path
            d="M0,50 Q360,10 720,50 T1440,90 V100 H0 Z"
            fill="url(#dividerGrad)"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
        />
    </svg>
);


// --- Main Component ---

export default function EnhancedAboutUs() {

    // Animation Variants
    const fadeIn = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
    };

    const staggerContainer = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: 0.15
            }
        }
    };

    const teamMemberVariant = {
        hidden: { opacity: 0, scale: 0.8, y: 30 },
        visible: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
    };

    const timelineItemVariant = {
        hidden: { opacity: 0, x: -50 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.6 } }
    };
    const timelineItemVariantRight = {
        hidden: { opacity: 0, x: 50 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.6 } }
    };


    return (
        <div 
        style={{
          fontFamily: '"SF Pro Text Semibold", system-ui, sans-serif',
          fontWeight: 600,
        }}
         className="min-h-screen bg-gradient-to-br from-gray-50 via-emerald-50 to-blue-50 font-sans text-gray-800 overflow-hidden relative">
            {/* Flowing Background */}
            <FlowBackground />

            {/* Hero Section */}
            <motion.section
                className="relative overflow-hidden py-24 md:py-40 z-10"
                initial="hidden"
                animate="visible"
                variants={fadeIn}
            >
                {/* Decorative Shapes (optional enhancement) */}
                 <motion.div
                    className="absolute top-10 left-10 w-32 h-32 bg-emerald-200 rounded-full opacity-30 filter blur-xl"
                    animate={{ scale: [1, 1.1, 1], x: [0, 10, 0] }}
                    transition={{ duration: 8, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
                />
                 <motion.div
                    className="absolute bottom-20 right-20 w-40 h-40 bg-blue-200 rounded-lg opacity-30 filter blur-xl transform rotate-45"
                     animate={{ scale: [1, 0.9, 1], y: [0, -10, 0] }}
                     transition={{ duration: 10, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
                />

                <div className="container mx-auto px-4 sm:px-6 relative z-10">
                    <div className="max-w-3xl mx-auto text-center">
                        <motion.h1
                            className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                        >
                            Shaping the Future of{' '}
                            <span className="bg-gradient-to-r from-emerald-500 to-teal-400 text-transparent bg-clip-text">
                                Veterinary Innovation
                            </span>
                        </motion.h1>
                        <motion.p
                            className="text-lg md:text-xl text-gray-600 mb-8"
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
                            <Button size="lg" className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-3 rounded-full flex items-center mx-auto shadow-lg hover:shadow-emerald-300/50 transition-all duration-300 transform hover:scale-105">
                                <span>Explore Our Story</span>
                                <ArrowRight className="ml-2" size={20} />
                            </Button>
                        </motion.div>
                    </div>
                </div>

                {/* Wavy divider - Replaced static SVG */}
                 <div className="absolute bottom-0 left-0 w-full h-24 md:h-32">
                    <svg viewBox="0 0 1440 150" preserveAspectRatio="none" className="w-full h-full">
                        <defs>
                            <linearGradient id="waveGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                                <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
                                <stop offset="100%" stopColor="#f0fdfa" stopOpacity="1" />
                            </linearGradient>
                        </defs>
                        <motion.path
                            fill="url(#waveGrad)"
                            d="M0,50 C360,150 1080, -50 1440,50 L1440,150 L0,150 Z"
                            initial={{ pathLength: 0, opacity: 0 }}
                             animate={{ pathLength: 1, opacity: 1 }}
                             transition={{ duration: 1.5, delay: 0.5 }}
                        />
                    </svg>
                </div>
            </motion.section>

             <FlowDivider className="fill-emerald-100"/>

            {/* Vision & Mission */}
            <motion.section
                className="py-16 md:py-24 bg-white relative z-10"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={staggerContainer}
            >
                <div className="container mx-auto px-4 sm:px-6">
                    <div className="grid md:grid-cols-2 gap-16 items-center">
                        <motion.div className="order-2 md:order-1 space-y-10" variants={fadeIn}>
                            <motion.div variants={fadeIn}>
                                <div className="flex items-center mb-4">
                                    <VisionIcon />
                                    <h2 className="text-2xl md:text-3xl font-bold ml-4 text-gray-800">Our Vision</h2>
                                </div>
                                <p className="text-gray-600 leading-relaxed text-lg">
                                    To revolutionize veterinary medicine through intelligent technology integration,
                                    creating a world where every animal receives optimal care through innovative solutions.
                                </p>
                            </motion.div>

                            <motion.div variants={fadeIn}>
                                <div className="flex items-center mb-4">
                                    <MissionIcon />
                                    <h2 className="text-2xl md:text-3xl font-bold ml-4 text-gray-800">Our Mission</h2>
                                </div>
                                <p className="text-gray-600 leading-relaxed text-lg">
                                    Develop AI-powered diagnostic tools and telemedicine platforms that empower veterinary
                                    professionals to deliver faster, more accurate care across 50+ countries.
                                </p>
                            </motion.div>
                        </motion.div>

                        <motion.div
                           className="order-1 md:order-2 flex justify-center"
                           variants={fadeIn}
                           initial={{ opacity: 0, scale: 0.8 }}
                           whileInView={{ opacity: 1, scale: 1 }}
                           viewport={{ once: true, amount: 0.5 }}
                           transition={{ duration: 0.8, type: 'spring' }}
                        >
                           <img src="https://www.blogtyrant.com/wp-content/uploads/2011/02/best-about-us-pages.png" alt="" />
                        </motion.div>
                    </div>
                </div>
            </motion.section>

             <FlowDivider className="fill-gray-100 rotate-180"/>


            {/* Team Section */}
            <motion.section
                className="py-16 md:py-24 bg-gray-50 relative z-10"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }} // Trigger when 20% of section is visible
                variants={staggerContainer}
            >
                <div className="container mx-auto px-4 sm:px-6">
                    <motion.div className="text-center mb-16" variants={fadeIn}>
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Meet Our Leadership</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                            A team of veterinary experts, software engineers, and healthcare innovators driving our mission forward.
                        </p>
                    </motion.div>

                    <motion.div
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
                        variants={staggerContainer} // Apply stagger to the grid itself
                    >
                        {[
              {
                name: "Mr. Arjit Malik",
                role: "Chief Medical Officer",
                bio: "Veterinarian with 15+ years experience in clinical practice and telemedicine development",
                avatar: "https://images.unsplash.com/photo-1612349317150-e413f6a5f3c8?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=80"
              },
              {
                name: "Ayushi Sharma",
                role: "CMO",
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
                        ].map((member, index) => (
                            <motion.div key={index} variants={teamMemberVariant}> {/* Animate each card */}
                                <Card className="bg-white p-6 rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300 h-full flex flex-col text-center">
                                    <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden border-4 border-emerald-100 shadow-md">
                                        <img src={member.avatar} alt={member.name} className="w-full h-full object-cover" loading="lazy"/>
                                    </div>
                                    <h3 className="font-semibold text-lg mb-1">{member.name}</h3>
                                    <p className="text-emerald-600 text-sm mb-3 font-medium">{member.role}</p>
                                    <p className="text-gray-600 text-sm flex-grow">{member.bio}</p>
                                </Card>
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* Team Illustration can be added back if desired, perhaps also animated */}
                    {/* <div className="mt-16 flex justify-center">
                        <TeamIllustration />
                    </div> */}
                </div>
            </motion.section>

             <FlowDivider className="fill-white"/>


            {/* Achievements Timeline */}
            <section className="py-16 md:py-24 bg-white relative z-10">
                <div className="container mx-auto px-4 sm:px-6">
                    <motion.div
                        className="text-center mb-20"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.5 }}
                        variants={fadeIn}
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Milestones</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                            Transforming veterinary care one achievement at a time.
                        </p>
                    </motion.div>

                    <div className="relative max-w-3xl mx-auto">
                        {/* Timeline line */}
                        <div className="absolute left-1/2 top-2 bottom-2 transform -translate-x-1/2 w-1 bg-emerald-200 rounded-full"></div>

                        {/* Timeline items */}
                        {[
                           { year: "2020", title: "Company Founding", desc: "Established with a $2M seed round focused on veterinary AI research", icon: <Lightbulb/> },
                           { year: "2021", title: "Global Expansion", desc: "Launched platform in 15 countries across North America and Europe", icon: <Users/> },
                           { year: "2022", title: "AI Diagnostic Breakthrough", desc: "Released first-gen diagnostic tool achieving 94% accuracy in pilot studies", icon: <Target/> },
                           { year: "2023", title: "1 Million Pet Lives Impacted", desc: "Reached milestone of serving 1 million pets through partner clinics", icon: <Trophy/> },
                           { year: "2024", title: "Mobile App Launch", desc: "Released pet owner app with 500K downloads in first month", icon: <Star/> }
                        ].map((item, index) => (
                            <motion.div
                                key={index}
                                className={`mb-12 flex items-center w-full ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, amount: 0.5 }} // Trigger when half the item is visible
                                variants={index % 2 === 0 ? timelineItemVariant : timelineItemVariantRight}
                            >
                                <div className={`w-5/12 px-4 ${index % 2 === 0 ? 'order-3 text-left' : 'order-1 text-right'}`}>
                                     <div className="inline-block bg-emerald-100 text-emerald-700 font-bold px-4 py-1 rounded-full mb-3 text-sm shadow-sm">
                                        {item.year}
                                    </div>
                                    <h3 className="text-xl font-semibold mb-2 text-gray-800">{item.title}</h3>
                                    <p className="text-gray-600 leading-relaxed">{item.desc}</p>
                                </div>

                                {/* Center Dot */}
                                <div className="order-2 w-1/12 flex justify-center">
                                      <div className="relative z-10 w-10 h-10 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-md">
                                        <div className="transform scale-75">{item.icon}</div>
                                    </div>
                                </div>

                                {/* Spacer for alignment */}
                                <div className={`w-5/12 px-4 ${index % 2 === 0 ? 'order-1' : 'order-3'}`}></div>

                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="relative py-20 md:py-32 z-10 overflow-hidden">
                 {/* Animated Gradient Background */}
                 <motion.div
                    className="absolute inset-0 z-0"
                    style={{
                        background: 'linear-gradient(35deg, #6ee7b7, #3b82f6, #10b981)',
                        backgroundSize: '200% 200%',
                    }}
                    animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
                    transition={{ duration: 10, ease: 'linear', repeat: Infinity }}
                />

                <div className="container mx-auto px-4 sm:px-6 text-center relative z-10">
                    <motion.h2
                        className="text-3xl md:text-4xl font-bold mb-6 text-white drop-shadow-md"
                         initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}
                    >Ready to Join Our Journey?</motion.h2>
                    <motion.p
                         className="max-w-2xl mx-auto mb-10 text-emerald-50 text-lg drop-shadow"
                         initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} transition={{delay: 0.2}}
                    >
                        Whether you're a veterinarian looking to enhance your practice or a developer passionate about animal health, we'd love to hear from you.
                    </motion.p>

                    <motion.div
                        className="flex flex-col sm:flex-row justify-center gap-4"
                         initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} transition={{delay: 0.4}}
                    >
                        <Button variant="secondary" size="lg" className="bg-white text-emerald-900 hover:bg-emerald-50 px-8 py-3 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                            <MessageSquare className="mr-2" size={20} />
                            Contact Sales
                        </Button>
                        <Button variant="outline" size="lg" className="border-white text-black hover:bg-white hover:text-emerald-600 px-8 py-3 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                           <Briefcase className="mr-2" size={20} />
                            View Careers
                        </Button>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}