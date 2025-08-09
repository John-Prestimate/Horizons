
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Lock, ArrowRight, Loader2 } from 'lucide-react';
import { supabase } from '@/lib/customSupabaseClient';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/SupabaseAuthContext';

const CreateAccountPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { session } = useAuth();
  
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // If user has a session and lands here, they are likely coming from a magic link.
    // We want to redirect them to the next step in their onboarding.
    if (session) {
      navigate('/widget-instructions');
    }
  }, [session, navigate]);

  const handleSetPassword = async (e) => {
    e.preventDefault();
    if (!password || password.length < 6) {
      toast({ title: "Password must be at least 6 characters.", variant: "destructive" });
      return;
    }
    setLoading(true);

    const { error } = await supabase.auth.updateUser({ password });

    if (error) {
      toast({
        title: 'Error setting password',
        description: error.message || "There might have been an issue. Please try logging in with the magic link sent to your email.",
        variant: 'destructive',
      });
      // Fallback: If update fails, maybe they should just log in normally.
      navigate('/'); 
    } else {
      toast({
        title: 'Password set successfully!',
        description: 'You are now being redirected to your dashboard.',
      });
      // The onAuthStateChange listener in AuthProvider will handle the session update,
      // and the useEffect above will redirect.
      navigate('/widget-instructions');
    }

    setLoading(false);
  };
  
  return (
    <>
      <Helmet>
        <title>Set Your Password - Prestimate</title>
        <meta name="description" content="Finalize your Prestimate account setup by setting a password." />
      </Helmet>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-100 flex items-center justify-center p-4">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
          <Card className="w-full max-w-md shadow-2xl">
            <CardHeader>
              <CardTitle className="text-3xl font-bold text-center text-gray-800">Set Your Password</CardTitle>
              <CardDescription className="text-center text-gray-600">
                You're almost there! Create a password to secure your account.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSetPassword} className="space-y-4">
                 <div className="space-y-2">
                  <Label htmlFor="password">Choose a Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                      id="password"
                      type="password"
                      placeholder="At least 6 characters"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="pl-10"
                    />
                  </div>
                </div>
                <Button type="submit" className="w-full font-bold hero-gradient text-white" disabled={loading}>
                  {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Save Password & Enter'}
                  {!loading && <ArrowRight className="ml-2 h-4 w-4" />}
                </Button>
              </form>
            </CardContent>
             <CardFooter className="text-center text-xs text-gray-500">
                <p>If you have any issues, please check your email for a login link.</p>
            </CardFooter>
          </Card>
        </motion.div>
      </div>
    </>
  );
};

export default CreateAccountPage;
