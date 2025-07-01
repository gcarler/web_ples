// src/lib/firebase/firebase-admin-config.ts
import admin from 'firebase-admin';

let adminDb: admin.firestore.Firestore | null = null;
let adminAuth: admin.auth.Auth | null = null;
let initialized = false;

// This configuration uses environment variables to securely initialize the Firebase Admin SDK.
// It's the recommended approach instead of including a physical serviceAccountKey.json file.
// You can get these values from the service account JSON file you download from the Firebase Console.
if (
  process.env.FIREBASE_PROJECT_ID &&
  process.env.FIREBASE_CLIENT_EMAIL &&
  process.env.FIREBASE_PRIVATE_KEY
) {
  const serviceAccount = {
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    // Replace \\n with \n to correctly parse the private key from environment variables
    privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
  };

  if (!admin.apps.length) {
    try {
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
      });
      console.log('Firebase Admin SDK initialized successfully.');
      initialized = true;
    } catch (error: any) {
      console.error('Firebase Admin SDK initialization error:', error.message);
      // We don't throw here to allow the app to run without admin features
    }
  } else {
    // Already initialized
    initialized = true;
  }
} else {
  // This is a warning, not an error, to allow the app to run
  console.warn(
    'Firebase Admin SDK is not configured. Server-side features requiring authentication (like the admin panel) will not work. Please provide FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, and FIREBASE_PRIVATE_KEY in your .env.local file.'
  );
}

if (initialized && admin.apps.length > 0) {
    adminDb = admin.firestore();
    adminAuth = admin.auth();
}

// Export adminDb, adminAuth, and the admin namespace.
// They might be null if initialization failed.
export { adminDb, adminAuth, admin };
