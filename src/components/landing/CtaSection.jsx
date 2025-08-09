import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { staggerContainer, fadeInUp } from '@/components/landing/animations';

const CtaSection = ({ handleSubscribe }) => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 hero-gradient">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Wash Away the Competition?
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Start your 30-day free trial today and see how many more jobs you can win with instant, AI-powered quotes. No credit card required.
          </motion.p>
          <motion.div variants={fadeInUp} className="flex justify-center">
            <Button 
              onClick={() => handleSubscribe('trial')}
              size="lg" 
              className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg"
            >
              Start Your Free Trial
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default CtaSection;