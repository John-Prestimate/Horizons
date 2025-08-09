import React from 'react';
import { motion } from 'framer-motion';
import { Target, Users, Droplets, Bot, LayoutDashboard, Mail } from 'lucide-react';
import { staggerContainer, fadeInUp } from '@/components/landing/animations';

const features = [
  {
    icon: <Bot className="w-8 h-8 text-blue-600" />,
    title: "AI-Powered Bidding",
    description: "Our AI analyzes property size and surface types to generate winning bids in seconds. Say goodbye to manual measurements."
  },
  {
    icon: <Target className="w-8 h-8 text-green-600" />,
    title: "24/7 Lead Capture",
    description: "Your website works for you around the clock. Capture customer details and job requirements automatically, even while you're on a job."
  },
  {
    icon: <Droplets className="w-8 h-8 text-cyan-600" />,
    title: "Multi-Service Ready",
    description: "Perfect for pressure washing, but flexible enough for lawncare, landscaping, gutter cleaning, Christmas light installation, and more."
  },
  {
    icon: <Users className="w-8 h-8 text-purple-600" />,
    title: "Impress Your Customers",
    description: "Provide instant, professional estimates that build trust and help you stand out from the competition. No more waiting or phone tag."
  },
  {
    icon: <LayoutDashboard className="w-8 h-8 text-orange-600" />,
    title: "User Friendly Dashboard",
    description: "Allows you to add your business details and edit services."
  },
  {
    icon: <Mail className="w-8 h-8 text-indigo-600" />,
    title: "Get Customer Leads",
    description: "Emails notify you when someone uses the drawing tool, giving you the address, service selected, and estimate generated."
  }
];

const FeaturesSection = () => {
  return (
    <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          className="text-center mb-16"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            The Ultimate Toolkit for Your Service Business
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-xl text-gray-600 max-w-3xl mx-auto">
            Perfect for Pressure Washing, Lawncare, Landscaping, Gutter Cleaning, Christmas Light Installation, and more. Automate your leads and grow your profits.
          </motion.p>
        </motion.div>
        
        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          {features.map((feature, index) => (
            <motion.div 
              key={index}
              variants={fadeInUp}
              className="feature-card p-8 rounded-2xl hover:shadow-lg transition-all duration-300"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;