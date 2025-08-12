import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LogOut, User, Building, PlusCircle, BarChart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import DashboardSettings from '@/components/DashboardSettings';

const DashboardPage = () => {
  const { user, customer, settings, signOut: contextSignOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await contextSignOut();
    navigate('/');
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <>
      <Helmet>
        <title>Dashboard - Prestimate</title>
        <meta name="description" content="Your Prestimate dashboard." />
      </Helmet>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-100 p-4 sm:p-6 lg:p-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-7xl mx-auto"
        >
          <motion.header variants={itemVariants} className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-white rounded-lg shadow-sm">
                <Building className="h-8 w-8 text-blue-600" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-800">
                  {customer?.business_name || 'Your Dashboard'}
                </h1>
                <p className="text-gray-500">Welcome back, {customer?.name || user?.email}!</p>
              </div>
            </div>
            <Button onClick={handleSignOut} variant="outline" className="bg-white">
              <LogOut className="mr-2 h-4 w-4" />
              Sign Out
            </Button>
          </motion.header>

          <motion.div variants={containerVariants} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <motion.div variants={itemVariants}>
                <Card className="shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-2xl">Get Started</CardTitle>
                    <CardDescription>Create your first estimate or view your existing ones.</CardDescription>
                  </CardHeader>
                  <CardContent className="flex flex-col sm:flex-row gap-4">
                    <Button size="lg" className="hero-gradient text-white font-bold w-full sm:w-auto">
                      <PlusCircle className="mr-2 h-5 w-5" />
                      New Estimate
                    </Button>
                     <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                      <BarChart className="mr-2 h-5 w-5" />
                      View Estimates
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div variants={itemVariants}>
                 <DashboardSettings settings={settings} />
              </motion.div>
            </div>

            <div className="lg:col-span-1 space-y-8">
               <motion.div variants={itemVariants}>
                <Card className="shadow-lg">
                  <CardHeader>
                      <CardTitle className="flex items-center"><User className="mr-3 h-6 w-6 text-blue-500" /> Account Info</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 text-sm">
                      <div className="flex justify-between">
                        <span className="font-semibold text-gray-600">Full Name:</span>
                        <span>{customer?.name || 'N/A'}</span>
                      </div>
                       <div className="flex justify-between">
                        <span className="font-semibold text-gray-600">Email:</span>
                        <span className="truncate">{user?.email}</span>
                      </div>
                       <div className="flex justify-between items-center">
                        <span className="font-semibold text-gray-600">Plan:</span>
                        <span className="capitalize px-3 py-1 bg-blue-100 text-blue-800 rounded-full font-medium">{customer?.subscription_tier || 'N/A'}</span>
                      </div>
                      {customer?.subscription_tier === 'trial' && customer.trial_expiry && (
                       <div className="flex justify-between text-blue-600 font-semibold pt-2 border-t mt-2">
                        <span>Trial Ends:</span>
                        <span>{new Date(customer.trial_expiry).toLocaleDateString()}</span>
                      </div>
                      )}
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </>
  );
};

export default DashboardPage;