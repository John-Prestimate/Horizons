import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import stripePromise from '@/lib/stripe';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/SupabaseAuthContext';

const OnboardingPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();

  useEffect(() => {
    const redirectToCheckout = async () => {
      const searchParams = new URLSearchParams(location.search);
      const plan = searchParams.get('plan');
      
      let priceId;
      if (plan === 'basic') {
        priceId = 'price_1RioCw2LLmSGSzUmWvPq32dc';
      } else if (plan === 'pro') {
        priceId = 'price_1RioDe2LLmSGSzUm89JNTgWd';
      } else {
        toast({
          title: 'Invalid Plan',
          description: 'No plan was selected. Redirecting to pricing.',
          variant: 'destructive',
        });
        navigate('/#pricing');
        return;
      }
      
      try {
        const stripe = await stripePromise;
        const checkoutOptions = {
          lineItems: [{ price: priceId, quantity: 1 }],
          mode: 'subscription',
          successUrl: `${window.location.origin}/welcome`,
          cancelUrl: `${window.location.origin}/payment-cancel`,
        };

        // If the user is already logged in, pre-fill their email for upgrades
        if (user && user.email) {
            checkoutOptions.customerEmail = user.email;
        }

        const { error } = await stripe.redirectToCheckout(checkoutOptions);

        if (error) {
          toast({
            title: 'Stripe Error',
            description: error.message,
            variant: 'destructive',
          });
        }
      } catch (error) {
         toast({
            title: 'Error',
            description: 'Could not connect to Stripe. Please try again.',
            variant: 'destructive',
          });
      }
    };

    redirectToCheckout();
  }, [location, navigate, toast, user]);

  return (
    <>
      <Helmet>
        <title>Redirecting to Checkout - Prestimate</title>
        <meta name="description" content="Please wait while we redirect you to our secure checkout page." />
      </Helmet>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-100 flex flex-col items-center justify-center p-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Loader2 className="h-16 w-16 animate-spin text-blue-600 mb-6" />
          <h1 className="text-3xl font-bold text-gray-800">Redirecting to Secure Checkout</h1>
          <p className="text-gray-600 mt-2">Please wait a moment...</p>
        </motion.div>
      </div>
    </>
  );
};

export default OnboardingPage;