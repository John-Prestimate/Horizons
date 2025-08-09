import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { XCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const StripeCancelPage = () => {
  return (
    <>
      <Helmet>
        <title>Payment Canceled - Prestimate</title>
        <meta name="description" content="Your payment was canceled. Please try again or contact support if you face any issues." />
      </Helmet>
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-100 flex items-center justify-center p-4">
        <motion.div
          className="bg-white p-8 md:p-12 rounded-2xl shadow-2xl max-w-lg w-full text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 260, damping: 20 }}
          >
            <XCircle className="w-20 h-20 text-red-500 mx-auto mb-6" />
          </motion.div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Payment Canceled</h1>
          <p className="text-gray-600 text-lg mb-8">
            It looks like you've canceled the checkout process. No worries, you can always go back and choose a plan whenever you're ready.
          </p>
          <Button asChild className="hero-gradient text-white text-lg px-8 py-6">
            <Link to="/#pricing">View Pricing Plans</Link>
          </Button>
        </motion.div>
      </div>
    </>
  );
};

export default StripeCancelPage;