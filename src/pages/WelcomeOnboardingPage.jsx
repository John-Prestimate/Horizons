import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, ArrowRight } from 'lucide-react';
import { useAuth } from '@/contexts/SupabaseAuthContext';

const WelcomeOnboardingPage = () => {
  const navigate = useNavigate();
  const { user, customer } = useAuth();

  const handleContinue = () => {
    navigate('/app');
  };

  return (
    <>
      <Helmet>
        <title>Welcome to Prestimate!</title>
        <meta name="description" content="Your Prestimate account has been created successfully." />
      </Helmet>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-100 flex items-center justify-center p-4">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
          <Card className="w-full max-w-lg shadow-2xl text-center">
            <CardHeader>
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2, type: 'spring' }} className="mx-auto bg-green-100 rounded-full p-4 w-fit">
                <CheckCircle className="h-16 w-16 text-green-600" />
              </motion.div>
              <CardTitle className="text-3xl font-bold text-gray-800 mt-4">
                Welcome, {customer?.name || user?.email || 'New User'}!
              </CardTitle>
              <CardDescription className="text-gray-600 text-lg">
                Your account for <span className="font-semibold text-blue-600">{customer?.business_name || 'your business'}</span> is all set up.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-6">
                You're ready to start creating professional estimates in seconds. Let's head to your dashboard to get started.
              </p>
              <Button onClick={handleContinue} className="w-full font-bold hero-gradient text-white text-lg py-6">
                Go to My Dashboard
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </>
  );
};

export default WelcomeOnboardingPage;