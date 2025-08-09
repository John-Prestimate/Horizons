
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Loader2, CheckCircle } from 'lucide-react';
import { useAuth } from '@/contexts/SupabaseAuthContext';

const WelcomePage = () => {
  const navigate = useNavigate();
  const { session, customer, loading } = useAuth();
  const [status, setStatus] = useState('processing'); // processing, success

  useEffect(() => {
    if (loading) {
      return; // Wait for auth context to load
    }

    // If we have a session and customer data, the user is good to go.
    if (session && customer) {
      setStatus('success');
      setTimeout(() => {
        // Redirect to the main app dashboard
        navigate('/app');
      }, 2000);
    } else if (!session) {
      // If there's no session after loading, something is wrong.
      // This could be a failed webhook or the user landed here by mistake.
      // Redirecting to the homepage is a safe fallback.
      setTimeout(() => {
        navigate('/');
      }, 3000);
    }
    // If there's a session but no customer data yet, we just wait.
    // The AuthProvider will update the customer state when it's available.
  }, [session, customer, loading, navigate]);

  return (
    <>
      <Helmet>
        <title>Welcome to Prestimate!</title>
        <meta name="description" content="Finalizing your account setup." />
      </Helmet>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-100 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          {status === 'processing' && (
            <>
              <Loader2 className="h-16 w-16 text-blue-500 animate-spin mx-auto" />
              <h1 className="mt-6 text-3xl font-bold text-gray-800">Finalizing Your Account...</h1>
              <p className="mt-2 text-gray-600">This will just take a moment. Please don't refresh the page.</p>
            </>
          )}
          {status === 'success' && (
            <>
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto" />
              <h1 className="mt-6 text-3xl font-bold text-gray-800">Success! Welcome Aboard!</h1>
              <p className="mt-2 text-gray-600">Redirecting you to your dashboard now...</p>
            </>
          )}
        </motion.div>
      </div>
    </>
  );
};

export default WelcomePage;
