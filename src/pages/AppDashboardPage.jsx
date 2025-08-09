import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { supabase } from '@/lib/customSupabaseClient';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, LogOut, User, Building, Settings, DollarSign, Ruler } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AppDashboardPage = () => {
  const { user, customer, signOut: contextSignOut, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [settings, setSettings] = useState(null);
  const [settingsLoading, setSettingsLoading] = useState(true);

  useEffect(() => {
    const fetchBusinessSettings = async () => {
      if (user) {
        setSettingsLoading(true);
        try {
          const { data, error } = await supabase
            .from('business_settings')
            .select('*')
            .eq('user_id', user.id)
            .single();

          if (error && error.code !== 'PGRST116') { // PGRST116 means no row found
            throw error;
          }
          setSettings(data);
        } catch (error) {
           console.error('Error fetching business settings:', error);
        } finally {
            setSettingsLoading(false);
        }
      } else {
        setSettingsLoading(false);
      }
    };

    if (!authLoading) {
      fetchBusinessSettings();
    }
  }, [user, authLoading]);

  const handleSignOut = async () => {
    await contextSignOut();
    navigate('/');
  };

  if (authLoading || (user && settingsLoading)) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-100 flex items-center justify-center">
        <Loader2 className="h-16 w-16 text-blue-500 animate-spin" />
      </div>
    );
  }

  if (!user || !customer) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-100 flex flex-col items-center justify-center text-center p-4">
        <h1 className="text-2xl font-bold text-red-600 mb-4">Account Data Not Found</h1>
        <p className="text-gray-700 mb-6">We couldn't load your account details. This can sometimes happen during initial setup. Please try signing out and signing back in.</p>
        <Button onClick={handleSignOut} variant="destructive">
          <LogOut className="mr-2 h-4 w-4" />
          Sign Out and Try Again
        </Button>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Dashboard - Prestimate</title>
        <meta name="description" content="Your Prestimate dashboard." />
      </Helmet>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-100 p-4 sm:p-6 lg:p-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-7xl mx-auto"
        >
          <header className="flex justify-between items-center mb-8">
            <div className="flex items-center space-x-4">
              <Building className="h-8 w-8 text-blue-600" />
              <h1 className="text-3xl font-bold text-gray-800">
                {customer?.business_name || 'Your Dashboard'}
              </h1>
            </div>
            <Button onClick={handleSignOut} variant="outline">
              <LogOut className="mr-2 h-4 w-4" />
              Sign Out
            </Button>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="md:col-span-1">
              <CardHeader>
                <CardTitle className="flex items-center"><User className="mr-2 h-5 w-5 text-blue-500" /> Account Info</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p><strong>Name:</strong> {customer?.name || 'N/A'}</p>
                <p><strong>Email:</strong> {user?.email}</p>
                <p><strong>Plan:</strong> <span className="capitalize px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">{customer?.subscription_tier || 'N/A'}</span></p>
                {customer?.subscription_tier === 'trial' && customer.trial_expiry && (
                  <p><strong>Trial Ends:</strong> {new Date(customer.trial_expiry).toLocaleDateString()}</p>
                )}
              </CardContent>
            </Card>

            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center"><Settings className="mr-2 h-5 w-5 text-blue-500" /> Business Settings</CardTitle>
                <CardDescription>Your default settings for new estimates.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center">
                  <DollarSign className="mr-3 h-5 w-5 text-gray-500" />
                  <p><strong>Currency:</strong> {settings?.currency || 'N/A'}</p>
                </div>
                <div className="flex items-center">
                  <Ruler className="mr-3 h-5 w-5 text-gray-500" />
                  <p><strong>Units:</strong> <span className="capitalize">{settings?.units || 'N/A'}</span></p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Default Service Types:</h4>
                  {settings?.service_types ? (
                    <ul className="list-disc list-inside space-y-1 pl-2">
                      {settings.service_types.map((service, index) => (
                        <li key={index}>
                          {service.service}: {new Intl.NumberFormat('en-US', { style: 'currency', currency: settings.currency || 'USD' }).format(service.rate)} per {service.unit}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-500">No services configured.</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default AppDashboardPage;