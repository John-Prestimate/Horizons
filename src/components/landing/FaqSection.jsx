import React from 'react';
import { motion } from 'framer-motion';
import { staggerContainer, fadeInUp } from '@/components/landing/animations';

const steps = [
  {
    step: "Step 1",
    title: "Start Fast With Simple Controls",
    description: "Enter any address, choose your service, and follow the simple color-coded instructions.",
    descriptionBold: "Prestimate’s intuitive design lets anyone start drawing and estimating projects in just seconds.",
    imageUrl: "https://storage.googleapis.com/hostinger-horizons-assets-prod/fd054be7-d82b-4a87-9590-be406de39602/0d59934be7d77cda65ca73bf7f654c19.png",
    imageAlt: "Prestimate widget interface showing easy-to-follow instructions, address entry, and service selection for instant project estimation"
  },
  {
    step: "Step 2",
    title: "Outline & Measure",
    description: "Using our interactive map, they trace the specific areas for cleaning—like driveways, siding, or roofs. Our AI instantly calculates the precise measurements.",
    imageUrl: "https://storage.googleapis.com/hostinger-horizons-assets-prod/fd054be7-d82b-4a87-9590-be406de39602/914b912b7fb6795e9554b56347ac3c8a.png",
    imageAlt: "A user outlining a driveway on a satellite map using the Prestimate tool on a tablet."
  },
  {
    step: "Step 3",
    title: "Instant Estimate & Lead",
    description: "Prestimate generates an accurate, professional estimate based on your pre-set pricing. The customer gets their price, and you get their contact info—a hot lead ready to convert.",
    imageUrl: "https://storage.googleapis.com/hostinger-horizons-assets-prod/fd054be7-d82b-4a87-9590-be406de39602/b887ae6d3693fe5378e88926ffa65b59.png",
    imageAlt: "Email notification showing a new lead submission with project details from Prestimate."
  },
  {
    step: "Step 4",
    title: "Control Your Services & Pricing",
    description: "Our user-friendly dashboard gives you full control. Set your services, define pricing by square foot, linear foot, or fixed rate, and manage your business details—all in one place.",
    imageUrl: "https://storage.googleapis.com/hostinger-horizons-assets-prod/fd054be7-d82b-4a87-9590-be406de39602/a28301eabd6e32560a6d4d166aed3f15.png",
    imageAlt: "Prestimate's powerful dashboard for managing company info, services, and pricing."
  }
];

const HowItWorksSection = () => {
  return (
    <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          className="text-center mb-20"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            How It Works
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-xl text-gray-600 max-w-3xl mx-auto">
            Turn your website into a 24/7 lead generation machine in four simple steps.
          </motion.p>
        </motion.div>
        
        <div className="space-y-24">
          {steps.map((step, index) => (
            <motion.div 
              key={index}
              className="grid md:grid-cols-5 gap-16 items-center"
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, amount: 0.3 }}
              variants={staggerContainer}
            >
              <div className={`${index % 2 === 1 ? 'md:order-last' : ''} md:col-span-2`}>
                <motion.div variants={fadeInUp}>
                  <span className="text-blue-600 font-semibold">{step.step}</span>
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mt-2 mb-4">{step.title}</h3>
                  <p className="text-lg text-gray-600">
                    {step.description}
                    {step.descriptionBold && (
                      <>
                        <br />
                        <span className="font-bold">{step.descriptionBold}</span>
                      </>
                    )}
                  </p>
                </motion.div>
              </div>
              <div className="flex items-center justify-center md:col-span-3">
                <motion.div 
                  variants={fadeInUp} 
                  className="rounded-[14px] overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.12)] w-full"
                >
                  <img 
                    src={step.imageUrl}
                    alt={step.imageAlt}
                    className="w-full h-auto"
                  />
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;