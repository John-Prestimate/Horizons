import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/lib/customSupabaseClient';
import { useAuth } from '@/contexts/SupabaseAuthContext';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Copy, Check, Loader2 } from 'lucide-react';

const WidgetInstructionsPage = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [copied, setCopied] = useState(false);
  const [customerId, setCustomerId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCustomerId = async () => {
      if (user) {
        setLoading(true);
        const { data, error } = await supabase
          .from('customers')
          .select('id')
          .eq('auth_id', user.id)
          .single();

        if (error) {
          toast({
            title: 'Error',
            description: 'Could not fetch your customer ID. Please try again later.',
            variant: 'destructive',
          });
          console.error('Error fetching customer ID:', error);
        } else if (data) {
          setCustomerId(data.id);
        }
        setLoading(false);
      }
    };

    fetchCustomerId();
  }, [user, toast]);

  const widgetUrl = 'https://www.prestimate.io/Mapview/widget.js';
  const embedCode = `<script src="${widgetUrl}" data-customer="${customerId}"></script>`;

  const handleCopy = () => {
    navigator.clipboard.writeText(embedCode);
    setCopied(true);
    toast({
      title: 'Copied to Clipboard!',
      description: 'You can now paste the code into your website.',
    });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <Helmet>
        <title>Your Widget Code - Prestimate</title>
        <meta name="description" content="Here is your unique embed code to add the Prestimate tool to your website." />
      </Helmet>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="w-full max-w-2xl shadow-2xl">
            <CardHeader>
              <CardTitle className="text-3xl font-bold text-center hero-text-gradient">You're All Set!</CardTitle>
              <CardDescription className="text-center text-gray-600 text-lg">
                Copy and paste this single line of code into your website's HTML, just before the closing `&lt;/body&gt;` tag.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="flex justify-center items-center h-24">
                  <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
                </div>
              ) : customerId ? (
                <div className="bg-slate-900 rounded-lg p-4 flex items-center justify-between">
                  <pre className="text-slate-100 overflow-x-auto">
                    <code>{embedCode}</code>
                  </pre>
                  <Button variant="ghost" size="icon" onClick={handleCopy} className="text-slate-300 hover:text-white">
                    {copied ? <Check className="h-5 w-5 text-green-400" /> : <Copy className="h-5 w-5" />}
                  </Button>
                </div>
              ) : (
                 <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-md" role="alert">
                    <p className="font-bold">Could Not Load Widget Code</p>
                    <p>We couldn't find your customer ID. Please ensure you are logged in and have completed onboarding.</p>
                </div>
              )}
              <div className="mt-6 text-center">
                <p className="text-gray-500">Once embedded, a "Open Measuring Tool" button will appear on your site, allowing customers to generate their own estimates!</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </>
  );
};

export default WidgetInstructionsPage;