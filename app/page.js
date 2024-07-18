'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AtomIcon, Edit, Share2, ArrowRight, CheckCircle, X } from "lucide-react";
import Header from './dashboard/_components/Header';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2
    }
  }
};

const Button = ({ children, className, ...props }) => (
  <motion.button 
    whileHover={{ scale: 1.05, boxShadow: "0px 0px 8px rgb(59, 130, 246)" }} 
    whileTap={{ scale: 0.95 }} 
    className={`px-6 py-3 rounded-full font-semibold transition-colors ${className}`} 
    {...props}
  >
    {children}
  </motion.button>
);

const Card = ({ icon: Icon, title, description }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.div 
      className="bg-gray-800 border border-gray-700 rounded-lg p-6 cursor-pointer transition-all duration-300 hover:bg-gray-750"
      variants={fadeIn}
      whileHover={{ y: -5, boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.2)" }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <div className="flex justify-center mb-4">
        <motion.div
          animate={{ rotate: isHovered ? 360 : 0 }}
          transition={{ duration: 0.5 }}
        >
          <Icon className="h-12 w-12 text-blue-500" />
        </motion.div>
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </motion.div>
  );
};

const TestimonialCard = ({ name, role, testimonial }) => (
  <motion.div 
    className="bg-gray-800 border border-gray-700 rounded-lg p-6 shadow-lg"
    variants={fadeIn}
  >
    <p className="text-gray-300 mb-4">"{testimonial}"</p>
    <div className="flex items-center">
      <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center mr-3">
        {name.charAt(0)}
      </div>
      <div>
        <p className="font-semibold">{name}</p>
        <p className="text-gray-400 text-sm">{role}</p>
      </div>
    </div>
  </motion.div>
);

const Modal = ({ isOpen, onClose, children }) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-gray-800 p-6 rounded-lg max-w-md w-full"
          onClick={(e) => e.stopPropagation()}
        >
          {children}
          <button
            className="absolute top-2 right-2 text-gray-400 hover:text-white"
            onClick={onClose}
          >
            <X />
          </button>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      
      <Header />
      <main className="pt-20 px-4 md:px-16">
        <motion.section 
          className="py-20 text-center"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
        >
          <motion.h1 
            className="text-5xl md:text-6xl font-extrabold mb-6"
            animate={{ 
              backgroundImage: [
                "linear-gradient(45deg, #3b82f6, #60a5fa)",
                "linear-gradient(45deg, #60a5fa, #93c5fd)",
                "linear-gradient(45deg, #93c5fd, #3b82f6)"
              ]
            }}
            transition={{ duration: 5, repeat: Infinity, repeatType: "reverse" }}
            style={{ WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
          >
            Your Personal AI Interview Coach
          </motion.h1>
          <p className="text-xl mb-8 text-gray-300 max-w-2xl mx-auto">
            Double your chances of landing that job offer with our AI-powered interview prep
          </p>
          <a
           href="/dashboard">
          <Button 
            className="bg-blue-600 hover:bg-blue-700 text-white text-lg flex items-center justify-center mx-auto"
           
          >
            Get Started
            <ArrowRight className="ml-2 inline" />
          </Button>
          </a>
        </motion.section>
        
        <motion.section 
          className="py-16"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card 
              icon={AtomIcon}
              title="Choose Your Interview"
              description="Select from a variety of industry-specific interview simulations"
            />
            <Card 
              icon={Edit}
              title="Practice and Improve"
              description="Engage in realistic AI-driven interviews and receive instant feedback"
            />
            <Card 
              icon={Share2}
              title="Analyze and Excel"
              description="Review your performance with detailed insights and improvement suggestions"
            />
          </div>
        </motion.section>
        
        <motion.section 
          className="py-16"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <h2 className="text-3xl font-bold text-center mb-12">What Our Users Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <TestimonialCard 
              name="Sarah Johnson"
              role="Software Engineer"
              testimonial="InterviewAI helped me ace my dream job interview. The AI's feedback was spot-on!"
            />
            <TestimonialCard 
              name="Michael Chen"
              role="Marketing Specialist"
              testimonial="I felt so much more confident in my interviews after practicing with InterviewAI."
            />
          </div>
        </motion.section>
        
        <motion.section 
          className="py-16 text-center"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
        >
          <h2 className="text-3xl font-bold mb-6">Ready to Ace Your Next Interview?</h2>
          <p className="text-xl mb-8 text-gray-300 max-w-2xl mx-auto">
            Join thousands of job seekers who have improved their interview skills with InterviewAI
          </p>
          
          <Button 
            className="bg-blue-600 hover:bg-blue-700 text-white text-lg flex items-center justify-center mx-auto"
            onClick={() => setIsModalOpen(true)}
          >
            Start Your Free Trial
          </Button>
        </motion.section>
      </main>
      
      <footer className="py-8 text-center text-gray-400">
        <p>&copy; 2024 InterviewAI. All rights reserved.</p>
      </footer>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2 className="text-2xl font-bold mb-4">Start Your Journey</h2>
        <p className="mb-4">Enter your email to begin your free trial of InterviewAI.</p>
        <input 
          type="email" 
          placeholder="Your email" 
          className="w-full p-2 mb-4 bg-gray-700 rounded"
        />
        <Button className="bg-blue-600 hover:bg-blue-700 text-white w-full">
          Begin Free Trial
        </Button>
      </Modal>
    </div>
  );
}