// src/contexts/AuthContext.tsx
'use client';

import React, { createContext, useContext, useState, type PropsWithChildren } from 'react';

interface AuthContextType {
  user: any | null;
  userProfile: any | null;
  loading: boolean;
  userRole: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [user] = useState<any | null>(null);
  const [userProfile] = useState<any | null>(null);
  const [loading] = useState(false);

  return (
    <AuthContext.Provider value={{ user, userProfile, loading, userRole: null }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
