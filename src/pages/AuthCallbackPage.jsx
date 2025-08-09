
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { Helmet } from 'react-helmet';
import { useAuth } from '@/contexts/SupabaseAuthContext';

const AuthCallbackPage = () => {
  const navigate = useNavigate();
  const { session } = useAuth();

  useEffect(() => {
    // The onAuthStateChange listener in SupabaseAuthContext handles the session.
    // Once the session is detected, we can redirect the user.
    if (session) {
      // User is logged in, send them to the dashboard.
      navigate('/app');
    }
  }, [session, navigate]);

  return (
    <>
      <Helmet>
        <title>Confirming Account - Prestimate</title>
        <meta name="description" content="Finalizing your account confirmation." />
      </Helmet>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-100 flex flex-col items-center justify-center text-center p-4">
        <Loader2 className="h-16 w-16 text-blue-500 animate-spin mb-6" />
        <h1 className="text-2xl font-bold text-gray-800">Finalizing your confirmation...</h1>
        <p className="text-gray-600 mt-2">Please wait while we securely log you in.</p>
      </div>
    </>
  );
};

export default AuthCallbackPage;
