// src/lib/firebase/firebase-admin-init.ts
import admin from 'firebase-admin';

// This function ensures Firebase Admin SDK is initialized only once
export function initializeAdminApp() {
  if (admin.apps.length === 0) {
    try {
      const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n');

      if (!process.env.FIREBASE_PROJECT_ID || !process.env.FIREBASE_CLIENT_EMAIL || !privateKey) {
        throw new Error('Missing Firebase Admin SDK configuration in environment variables for Admin Init.');
      }

      admin.initializeApp({
        credential: admin.credential.cert({
          projectId: process.env.FIREBASE_PROJECT_ID,
          clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
          privateKey: privateKey,
        }),
      });
      console.log('Firebase Admin SDK initialized successfully (from init helper).');
    } catch (error) {
      console.error('Firebase Admin SDK initialization error (from init helper):', error);
      // Depending on your error handling strategy, you might want to throw
      // throw error; // Commenting out to avoid crashing server on minor init issues, log is sufficient for now.
    }
  }
  return admin; // Return the initialized admin instance
}
