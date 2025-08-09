import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { staggerContainer, fadeInUp } from '@/components/landing/animations';

const HeroSection = ({ handleSubscribe }) => {
  return (
    <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          className="text-center"
          initial="initial"
          animate="animate"
          variants={staggerContainer}
        >
          <motion.div variants={fadeInUp} className="mb-8">
            <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-blue-100 text-blue-800 mb-6">
              <Star className="w-4 h-4 mr-2" />
              The #1 Choice for Service Pros
            </span>
          </motion.div>
          
          <motion.h1 
            variants={fadeInUp}
            className="text-4xl md:text-6xl font-bold text-gray-900 mb-6"
          >
            AI Estimator for
            <span className="gradient-text block">Your Service Business</span>
          </motion.h1>
          
          <motion.p 
            variants={fadeInUp}
            className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto"
          >
            Stop guessing. Start winning more bids. Prestimate delivers instant, accurate estimates for house washing, roof cleaning, and driveways, turning website visitors into paying customers.
          </motion.p>
          
          <motion.div 
            variants={fadeInUp}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
          >
            <Button 
              onClick={() => handleSubscribe('trial')}
              size="lg" 
              className="hero-gradient text-white px-8 py-4 text-lg"
            >
              Start Your Free Trial
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </motion.div>
          
          <motion.div variants={fadeInUp} className="relative">
            <img 
              className="rounded-2xl shadow-2xl mx-auto max-w-5xl w-full"
              alt="The Prestimate instant quoting widget interface, showing map-based drawing tools for accurate pressure washing estimates."
             src="https://storage.googleapis.com/hostinger-horizons-assets-prod/fd054be7-d82b-4a87-9590-be406de39602/443a8898c11b874e34740e7714623de3.png" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;