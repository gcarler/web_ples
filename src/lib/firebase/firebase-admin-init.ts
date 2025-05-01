// src/lib/firebase/firebase-admin-init.ts
import admin from 'firebase-admin';

// This function ensures Firebase Admin SDK is initialized only once
export function initializeAdminApp() {
  if (admin.apps.length === 0) {
    console.log('Attempting Firebase Admin SDK initialization...');
    try {
      const projectId = process.env.FIREBASE_PROJECT_ID;
      const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
      const privateKeyEnv = process.env.FIREBASE_PRIVATE_KEY;

      if (!projectId) {
        throw new Error('FIREBASE_PROJECT_ID environment variable is not set.');
      }
      if (!clientEmail) {
        throw new Error('FIREBASE_CLIENT_EMAIL environment variable is not set.');
      }
      if (!privateKeyEnv) {
        throw new Error('FIREBASE_PRIVATE_KEY environment variable is not set.');
      }

      // Clean the private key
      const privateKey = privateKeyEnv.replace(/\\n/g, '\n');

      admin.initializeApp({
        credential: admin.credential.cert({
          projectId: projectId,
          clientEmail: clientEmail,
          privateKey: privateKey,
        }),
        // Optional: Add databaseURL if using Realtime Database
        // databaseURL: `https://${projectId}.firebaseio.com`,
      });
      console.log('Firebase Admin SDK initialized successfully (from init helper).');
    } catch (error: any) {
      // Log a more detailed error message, especially for configuration issues
      console.error('Firebase Admin SDK initialization error (from init helper):', error.message);
      // Re-throwing the error is important, as middleware loading might depend on successful initialization.
      // If the app can function partially without admin features, you might reconsider throwing.
      throw new Error(`Failed to initialize Firebase Admin SDK: ${error.message}`);
    }
  } else {
    console.log('Firebase Admin SDK already initialized.');
  }
  // Return the initialized admin instance (or the existing one)
  return admin;
}
