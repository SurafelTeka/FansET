import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { apiClient } from '../services/apiClient.js';

const AUTH_STORAGE_KEY = 'fanset.auth';

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem(AUTH_STORAGE_KEY);

    if (stored) {
      try {
        const parsed = JSON.parse(stored);

        if (parsed?.token && parsed?.user) {
          setToken(parsed.token);
          setUser(parsed.user);
        }
      } catch (error) {
        console.warn('Unable to restore persisted session', error);
        localStorage.removeItem(AUTH_STORAGE_KEY);
      }
    }

    setInitializing(false);
  }, []);

  const persistSession = useCallback((sessionToken, sessionUser) => {
    setToken(sessionToken);
    setUser(sessionUser);
    localStorage.setItem(
      AUTH_STORAGE_KEY,
      JSON.stringify({
        token: sessionToken,
        user: sessionUser
      })
    );
  }, []);

  const clearSession = useCallback(() => {
    setToken(null);
    setUser(null);
    localStorage.removeItem(AUTH_STORAGE_KEY);
  }, []);

  const signup = useCallback(
    async (payload) => {
      const response = await apiClient('/auth/register', {
        method: 'POST',
        data: payload
      });

      if (response?.token && response?.user) {
        persistSession(response.token, response.user);
      }

      return response?.user ?? null;
    },
    [persistSession]
  );

  const login = useCallback(
    async (payload) => {
      const response = await apiClient('/auth/login', {
        method: 'POST',
        data: payload
      });

      if (response?.token && response?.user) {
        persistSession(response.token, response.user);
      }

      return response?.user ?? null;
    },
    [persistSession]
  );

  const refreshProfile = useCallback(async () => {
    if (!token) {
      return null;
    }

    const response = await apiClient('/auth/me', {
      token
    });

    if (response?.user) {
      persistSession(token, response.user);
      return response.user;
    }

    return null;
  }, [persistSession, token]);

  const logout = useCallback(() => {
    clearSession();
  }, [clearSession]);

  const value = useMemo(
    () => ({
      user,
      token,
      initializing,
      signup,
      login,
      logout,
      refreshProfile
    }),
    [initializing, login, logout, refreshProfile, signup, token, user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }

  return context;
};

export default AuthContext;
