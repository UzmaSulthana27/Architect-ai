import React, { createContext, useContext, useState, useEffect } from "react";
import { supabase, isSupabaseConfigured } from "../lib/supabase";
import { ShieldAlert, ExternalLink, Settings } from "lucide-react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isSupabaseConfigured || !supabase) {
      const mockSession = localStorage.getItem('user_session');
      if (mockSession) {
        const sessionData = JSON.parse(mockSession);
        setUser({ email: sessionData.email });
      }
      setLoading(false);
      return;
    }

    let isMounted = true;

    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (isMounted) {
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
      }
    }).catch(err => {
      console.error("Session error:", err);
      if (isMounted) setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (isMounted) {
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
      }
    });

    return () => {
      isMounted = false;
      subscription?.unsubscribe();
    };
  }, []);

  const login = async (email, password) => {
    if (!isSupabaseConfigured) {
      // Mock Login for Demo
      const users = JSON.parse(localStorage.getItem('neural_users') || '[]');
      const userMatch = users.find(u => u.email === email && u.password === password);
      
      if (userMatch) {
         setUser({ email: userMatch.email, user_metadata: { full_name: userMatch.name } });
         localStorage.setItem('user_session', JSON.stringify({ email }));
         return { user: userMatch };
      }
      throw new Error("Invalid neural credentials");
    }
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    return data;
  };

  const signup = async (email, password, name) => {
    if (!isSupabaseConfigured) {
      // Mock Signup for Demo
      const users = JSON.parse(localStorage.getItem('neural_users') || '[]');
      if (users.find(u => u.email === email)) throw new Error("Identifier already in registry");
      
      const newUser = { id: crypto.randomUUID(), email, password, name };
      localStorage.setItem('neural_users', JSON.stringify([...users, newUser]));
      setUser({ email: newUser.email, user_metadata: { full_name: newUser.name } });
      localStorage.setItem('user_session', JSON.stringify({ email }));
      return { user: newUser };
    }
    const { data, error } = await supabase.auth.signUp({ 
      email, 
      password,
      options: {
        data: { full_name: name }
      }
    });
    if (error) throw error;
    return data;
  };

  const logout = async () => {
    setUser(null);
    localStorage.removeItem('user_session');
    if (!isSupabaseConfigured) return;
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  };

  const resendVerification = async (email) => {
    if (!isSupabaseConfigured) throw new Error("Neural Link not configured");
    const { error } = await supabase.auth.resend({
      type: 'signup',
      email: email,
    });
    if (error) throw error;
  };

  return (
    <AuthContext.Provider value={{ user, session, login, signup, logout, resendVerification, loading, isSupabaseConfigured }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
