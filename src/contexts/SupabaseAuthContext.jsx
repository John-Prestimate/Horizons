
import React, { createContext, useContext, useEffect, useState, useCallback, useMemo } from 'react';
import { supabase } from '@/lib/customSupabaseClient';
import { useToast } from '@/hooks/use-toast';

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  const [session, setSession] = useState(null);
  const [user, setUser] = useState(null);
  const [customer, setCustomer] = useState(null);
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);

  const { toast } = useToast();

  const fetchAllUserData = useCallback(async (userId) => {
    try {
      if (!userId) {
        setCustomer(null);
        setSettings(null);
        return;
      }
  
      const customerPromise = supabase
        .from('customers')
        .select('*')
        .eq('auth_id', userId)
        .single();

      const settingsPromise = supabase
        .from('business_settings')
        .select('*')
        .eq('user_id', userId)
        .single();

      const [{ data: customerData, error: customerError }, { data: settingsData, error: settingsError }] = await Promise.all([customerPromise, settingsPromise]);

      if (customerError && customerError.code !== 'PGRST116') throw customerError;
      if (settingsError && settingsError.code !== 'PGRST116') throw settingsError;

      setCustomer(customerData);
      setSettings(settingsData);
    } catch (error) {
      console.error('Error fetching user data:', error);
      toast({
        variant: "destructive",
        title: "Error loading account",
        description: "Could not fetch your account details. Please try again.",
      });
      setCustomer(null);
      setSettings(null);
    }
  }, [toast]);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, newSession) => {
        if (!isMounted) return;

        setSession(newSession);
        const currentUser = newSession?.user ?? null;
        setUser(currentUser);
        await fetchAllUserData(currentUser?.id);

        setLoading(false);
      }
    );

    return () => {
      isMounted = false;
      subscription?.unsubscribe();
    };
  }, [fetchAllUserData]);
  
  const signUp = useCallback(async (email, password, options) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options,
    });
    
    if (error) {
      toast({
        variant: "destructive",
        title: "Sign up Failed",
        description: error.message || "Something went wrong",
      });
    }
    return { data, error };
  }, [toast]);

  const signIn = useCallback(async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    
    if (error) {
      toast({
        variant: "destructive",
        title: "Sign in Failed",
        description: error.message || "Something went wrong",
      });
    }
    return { data, error };
  }, [toast]);

  const signOut = useCallback(async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast({
        variant: "destructive",
        title: "Sign out Failed",
        description: error.message || "Something went wrong",
      });
    }
    return { error };
  }, [toast]);

  const value = useMemo(() => ({
    user,
    session,
    customer,
    settings,
    loading,
    signUp,
    signIn,
    signOut,
  }), [user, session, customer, settings, loading, signUp, signIn, signOut]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
