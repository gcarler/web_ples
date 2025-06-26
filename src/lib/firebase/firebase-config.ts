// src/lib/firebase/firebase-config.ts
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Ensure environment variables are being accessed correctly
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Individually check for each required environment variable
const missingVars: string[] = [];
if (!firebaseConfig.apiKey) missingVars.push('NEXT_PUBLIC_FIREBASE_API_KEY');
if (!firebaseConfig.authDomain) missingVars.push('NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN');
if (!firebaseConfig.projectId) missingVars.push('NEXT_PUBLIC_FIREBASE_PROJECT_ID');
// Add other checks as necessary, e.g., for storageBucket, etc.

if (typeof window !== 'undefined' && missingVars.length > 0) {
    const errorLines = [
        '\n\n--- Firebase Web SDK Configuration Error ---',
        `The following required NEXT_PUBLIC_ environment variable(s) are missing: ${missingVars.join(', ')}.`,
        'The login page may show an "Invalid API key" error. This is a configuration issue, not a code bug.',
        '\n--- HOW TO FIX ---',
        '1.  Find or create a file named `.env.local` in the ROOT directory of your project.',
        '2.  Go to your Firebase project console: https://console.firebase.google.com/',
        '3.  Navigate to Project Settings (click the gear icon) > General tab.',
        '4.  Scroll down to the "Your apps" section and find your Web app.',
        '5.  Select the "Config" option for "SDK setup and configuration".',
        '6.  Copy the values (apiKey, authDomain, etc.) into your `.env.local` file.',
        '7.  **IMPORTANT**: Each variable name MUST start with `NEXT_PUBLIC_`. For example:',
        '\n    NEXT_PUBLIC_FIREBASE_API_KEY="your-api-key-value"',
        '    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="your-auth-domain-value"',
        '    ...',
        '\n8.  **RESTART** your development server (e.g., stop `npm run dev` and run it again) for the changes to apply.\n\n'
    ];
    // Log a clear error to the developer console
    console.error(errorLines.join('\n'));
}


// Initialize Firebase for client-side
let app;
if (!getApps().length) {
    try {
        app = initializeApp(firebaseConfig);
    } catch (error) {
        console.error("Firebase initialization error:", error);
        // This will now only be thrown if the config object itself is fundamentally broken,
        // as the missing var check above provides a clearer error in the console.
        throw new Error("Failed to initialize Firebase. Check browser console for detailed instructions.");
    }
} else {
    app = getApp();
}

const db = getFirestore(app);

export { app, db };
