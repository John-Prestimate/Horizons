import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { staggerContainer, fadeInUp } from '@/components/landing/animations';

const pricingPlans = [
  {
    name: "Free Trial",
    price: "Free",
    period: "for 30 Days",
    description: "Test drive all our Pro features, no credit card required.",
    features: [
      { text: "Includes all Pro features", included: true },
      { text: "Unlimited estimates", included: true },
      { text: "Manual & AI-assisted drawing", included: true },
      { text: "Email notification with address", included: true },
    ],
    buttonText: "Start Free Trial",
    planId: 'trial',
    popular: false
  },
  {
    name: "Basic",
    price: "$19",
    period: "/month",
    description: "Great for part-timers or solo operators.",
    features: [
      { text: "100 estimates per month", included: true },
      { text: "Manual Drawing/measuring", included: true },
      { text: "Email notification of estimate", included: true },
      { text: "Address information not included", included: false },
    ],
    buttonText: "Choose Basic",
    planId: 'basic',
    popular: false
  },
  {
    name: "Pro",
    price: "$49",
    period: "/month",
    description: "Best value for serious service businesses.",
    features: [
      { text: "Unlimited estimates", included: true },
      { text: "Manual & AI-assisted drawing", included: true },
      { text: "Email notification with address", included: true },
    ],
    buttonText: "Choose Pro",
    planId: 'pro',
    popular: true
  }
];

const PricingSection = ({ handleSubscribe }) => {
  return (
    <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          className="text-center mb-16"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Find the Perfect Plan
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Transparent pricing for businesses of all sizes. Start your 30-day free trial today.
          </motion.p>
        </motion.div>
        
        <motion.div 
          className="grid md:grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          {pricingPlans.map((plan, index) => (
            <motion.div 
              key={index}
              variants={fadeInUp}
              className={`pricing-card p-8 rounded-2xl relative flex flex-col ${plan.popular ? 'featured' : ''}`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-orange-400 to-pink-400 text-white px-4 py-1 rounded-full text-sm font-medium">
                    Best Value
                  </span>
                </div>
              )}
              
              <div className="text-center mb-8">
                <h3 className={`text-2xl font-bold mb-2 ${plan.popular ? 'text-white' : 'text-gray-900'}`}>
                  {plan.name}
                </h3>
                <div className="mb-4">
                  <span className={`text-4xl font-bold ${plan.popular ? 'text-white' : 'text-gray-900'}`}>
                    {plan.price}
                  </span>
                  <span className={`text-lg ${plan.popular ? 'text-gray-200' : 'text-gray-600'}`}>
                    {plan.period}
                  </span>
                </div>
                <p className={`${plan.popular ? 'text-gray-200' : 'text-gray-600'}`}>
                  {plan.description}
                </p>
              </div>
              
              <ul className="space-y-4 mb-8 flex-grow">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start">
                    {feature.included ? (
                      <CheckCircle className={`w-5 h-5 mr-3 flex-shrink-0 mt-1 ${plan.popular ? 'text-green-300' : 'text-green-500'}`} />
                    ) : (
                      <XCircle className={`w-5 h-5 mr-3 flex-shrink-0 mt-1 ${plan.popular ? 'text-red-300' : 'text-red-400'}`} />
                    )}
                    <span className={`${plan.popular ? 'text-gray-200' : 'text-gray-600'}`}>
                      {feature.text}
                    </span>
                  </li>
                ))}
              </ul>
              
              <Button 
                onClick={() => handleSubscribe(plan.planId)}
                className={`w-full py-3 mt-auto ${
                  plan.popular 
                    ? 'bg-white text-blue-600 hover:bg-gray-100' 
                    : 'hero-gradient text-white'
                }`}
              >
                {plan.buttonText}
              </Button>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default PricingSection;