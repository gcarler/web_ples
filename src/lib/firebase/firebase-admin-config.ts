
// src/lib/firebase/firebase-admin-config.ts
import admin from 'firebase-admin';

// This is a critical configuration file.
// Please add your Firebase Admin credentials to a `.env.local` file.
// See the main `.env` file for detailed instructions.

const serviceAccount = {
  projectId: process.env.FIREBASE_PROJECT_ID,
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
};

if (!admin.apps.length) {
  try {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
    console.log('Firebase Admin SDK initialized successfully.');
  } catch (error: any) {
    let errorMessage = `Firebase Admin SDK failed to initialize: ${error.message}`;
    if (!serviceAccount.projectId || !serviceAccount.clientEmail || !serviceAccount.privateKey) {
        errorMessage = 'Firebase Admin SDK Error: One or more required environment variables (FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY) are missing. Please check your .env.local file and restart the server.';
    }
    throw new Error(errorMessage);
  }
}

const adminDb = admin.firestore();
const adminAuth = admin.auth();

export { adminDb, adminAuth, admin };
