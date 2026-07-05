import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from 'react';
import { login as apiLogin, fetchMe, logout as apiLogout } from '../api/auth.api';
import type { AdminUser, } from '../types/api';
import type { LoginPayload } from '../api/auth.api';

const TOKEN_KEY = 'portfolio_admin_token';

interface AuthContextValue {
  admin: AdminUser | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (payload: LoginPayload) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [admin, setAdmin] = useState<AdminUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // On mount, re-hydrate admin from stored token
  useEffect(() => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (!token) {
      setIsLoading(false);
      return;
    }
    fetchMe()
      .then(setAdmin)
      .catch(() => {
        localStorage.removeItem(TOKEN_KEY);
      })
      .finally(() => setIsLoading(false));
  }, []);

  const login = useCallback(async (payload: LoginPayload) => {
    const result = await apiLogin(payload);
    localStorage.setItem(TOKEN_KEY, result.token);
    setAdmin(result.admin);
  }, []);

  const logout = useCallback(async () => {
    try {
      await apiLogout();
    } catch {
      // ignore — clear locally regardless
    }
    localStorage.removeItem(TOKEN_KEY);
    setAdmin(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        admin,
        isLoading,
        isAuthenticated: Boolean(admin),
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
}
