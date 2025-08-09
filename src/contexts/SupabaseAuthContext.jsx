import React, { createContext, useContext, useEffect, useState, useCallback, useMemo } from 'react';
import { supabase } from '@/lib/customSupabaseClient';
import { toast } from '@/hooks/use-toast';

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  const [session, setSession] = useState(null);
  const [user, setUser] = useState(null);
  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchCustomerData = useCallback(async (userId) => {
    if (!userId) return null;
    try {
      const { data, error } = await supabase
        .from('customers')
        .select('*')
        .eq('auth_id', userId)
        .single();
      if (error && error.code !== 'PGRST116') throw error;
      return data;
    } catch (error) {
      console.error('Error fetching customer data:', error);
      toast({
        variant: "destructive",
        title: "Error loading account",
        description: "Could not fetch your account details.",
      });
      return null;
    }
  }, []);

  useEffect(() => {
    const initializeSession = async () => {
      setLoading(true);
      const { data: { session: initialSession } } = await supabase.auth.getSession();
      
      setSession(initialSession);
      const currentUser = initialSession?.user ?? null;
      setUser(currentUser);

      if (currentUser) {
        const customerData = await fetchCustomerData(currentUser.id);
        setCustomer(customerData);
      } else {
        setCustomer(null);
      }
      setLoading(false);
    };

    initializeSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        setSession(session);
        const currentUser = session?.user ?? null;
        setUser(currentUser);
        
        if (currentUser) {
          const customerData = await fetchCustomerData(currentUser.id);
          setCustomer(customerData);
        } else {
          setCustomer(null);
        }
        
        // No setLoading here, as initial load is handled above
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, [fetchCustomerData]);
  
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
  }, []);

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
  }, []);

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
  }, []);

  const value = useMemo(() => ({
    user,
    session,
    customer,
    loading,
    signUp,
    signIn,
    signOut,
  }), [user, session, customer, loading, signUp, signIn, signOut]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};