// src/contexts/AuthContext.tsx
'use client';

import React, { createContext, useContext, useState, useEffect, type ReactNode, type PropsWithChildren } from 'react';
import { getAuth, onAuthStateChanged, User as FirebaseAuthUser } from 'firebase/auth';
import { doc, getDoc, Timestamp, onSnapshot } from 'firebase/firestore'; // Import Firestore functions
import { app, db } from '@/lib/firebase/firebase-config'; // Import Firebase app instance and Firestore db
import { UserProfile, UserProfileSchema, UserRole } from '@/lib/models/user'; // Import UserProfile types
import { Skeleton } from '@/components/ui/skeleton'; // For loading state

interface AuthContextType {
  user: FirebaseAuthUser | null;
  userProfile: UserProfile | null;
  loading: boolean;
  userRole: UserRole | null; // Add userRole to context
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<FirebaseAuthUser | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const auth = getAuth(app);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        // User is logged in, fetch profile from Firestore using onSnapshot for real-time updates
        const userDocRef = doc(db, 'users', currentUser.uid);
        const unsubscribeProfile = onSnapshot(userDocRef, (docSnap) => {
          if (docSnap.exists()) {
            const data = docSnap.data();
            // UserProfileSchema expects Firestore Timestamps.
            // The client SDK's onSnapshot should provide these directly.
            const profileToValidate = { ...data, uid: currentUser.uid };
            const parsedProfile = UserProfileSchema.safeParse(profileToValidate);

            if (parsedProfile.success) {
                 setUserProfile(parsedProfile.data);
            } else {
                console.error("Firestore User Profile validation error:", parsedProfile.error);
                // Consider how to handle profile data that doesn't match the schema.
                // For now, setting to null, which might restrict access if role is derived from it.
                setUserProfile(null);
            }
          } else {
            // Handle case where user exists in Auth but not in Firestore 'users' collection
            console.warn(`User profile not found in Firestore for uid: ${currentUser.uid}`);
            setUserProfile(null);
          }
          setLoading(false); // Set loading to false after profile fetched/checked
        }, (error) => {
            console.error("Error fetching user profile:", error);
            setUserProfile(null);
            setLoading(false);
        });
         return () => unsubscribeProfile(); // Cleanup profile listener on auth state change or unmount

      } else {
        // User is logged out
        setUserProfile(null);
        setLoading(false);
      }
    });

    // Cleanup auth subscription on unmount
    return () => unsubscribeAuth();
  }, [auth]);

  // Show a loading state while authentication status and profile are being determined
  if (loading) {
     return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="space-y-2">
                <Skeleton className="h-8 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
            </div>
        </div>
        );
  }

  const userRole = userProfile?.role ?? null;

  return (
    <AuthContext.Provider value={{ user, userProfile, loading, userRole }}>
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
