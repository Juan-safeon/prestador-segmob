"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { getSupabaseBrowser } from "@/lib/supabase";
import type { User } from "@supabase/supabase-js";

interface AuthContextValue {
  user: User | null;
  loading: boolean;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue>({
  user: null,
  loading: true,
  logout: async () => {},
});

const isDevMode = () => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
  return !url || url.includes('SEU_PROJETO');
};

// Fake user for dev mode
const DEV_USER = {
  id: "dev-admin-001",
  email: "admin@segmob.com.br",
} as User;

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isDevMode()) {
      // Dev mode: check cookie
      const hasAuth = document.cookie.includes('dev-auth=true');
      setUser(hasAuth ? DEV_USER : null);
      setLoading(false);
      return;
    }

    // Production: Supabase
    const supabase = getSupabaseBrowser();

    const init = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
      setLoading(false);
    };
    init();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    return () => listener.subscription.unsubscribe();
  }, []);

  const logout = async () => {
    if (isDevMode()) {
      document.cookie = "dev-auth=; path=/; max-age=0";
      window.location.href = "/admin/login";
      return;
    }
    const supabase = getSupabaseBrowser();
    await supabase.auth.signOut();
    window.location.href = "/admin/login";
  };

  return (
    <AuthContext.Provider value={{ user, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
