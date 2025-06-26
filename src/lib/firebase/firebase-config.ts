// src/lib/firebase/firebase-config.ts
import { initializeApp, getApps, getApp, type FirebaseApp } from "firebase/app";
import { getFirestore, type Firestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const missingVars: string[] = [];
if (!firebaseConfig.apiKey) missingVars.push('NEXT_PUBLIC_FIREBASE_API_KEY');
if (!firebaseConfig.authDomain) missingVars.push('NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN');
if (!firebaseConfig.projectId) missingVars.push('NEXT_PUBLIC_FIREBASE_PROJECT_ID');


let app: FirebaseApp | null = null;
let db: Firestore | null = null;

if (missingVars.length > 0) {
    if (typeof window !== 'undefined') {
        const errorLines = [
            `\n\n--- Firebase Web SDK Configuration Error ---`,
            `The following required NEXT_PUBLIC_ environment variable(s) are missing: ${missingVars.join(', ')}.`,
            'Client-side features like login and user management will not work until this is fixed.',
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
        console.error(errorLines.join('\n'));
    }
} else {
    // Only initialize if all required variables are present
    if (getApps().length) {
        app = getApp();
    } else {
        try {
            app = initializeApp(firebaseConfig);
        } catch (error) {
            console.error("Firebase client initialization error:", error);
        }
    }

    if (app) {
        db = getFirestore(app);
    }
}

export { app, db };
