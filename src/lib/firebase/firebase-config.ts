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

// Basic validation to ensure config values are present (helps catch missing .env variables)
if (!firebaseConfig.apiKey || !firebaseConfig.projectId) {
    console.error(
        "Firebase configuration error: Missing NEXT_PUBLIC_FIREBASE_API_KEY or NEXT_PUBLIC_FIREBASE_PROJECT_ID environment variables." +
        " Please ensure you have a .env.local file with the correct Firebase web app config." +
        " See instructions in src/lib/firebase/firebase-config.ts."
    );
    // Depending on the application flow, you might want to throw an error here
    // or handle it gracefully, but logging is essential for debugging.
}

// Initialize Firebase for client-side
let app;
if (!getApps().length) {
    try {
        app = initializeApp(firebaseConfig);
    } catch (error) {
        console.error("Firebase initialization error:", error);
        // Handle initialization error (e.g., show a message to the user)
        // For now, we re-throw or handle based on application needs.
        // If firebaseConfig is invalid due to missing env vars, this might throw.
        throw new Error("Failed to initialize Firebase. Check configuration and environment variables.");
    }
} else {
    app = getApp();
}

const db = getFirestore(app);

export { app, db };

// --- Instructions for Environment Variables ---
//
// **CRITICAL FOR THE APP TO WORK:** You MUST configure these environment variables.
// The error "auth/api-key-not-valid" means your `NEXT_PUBLIC_FIREBASE_API_KEY` is missing or incorrect.
//
// 1. Go to your Firebase project settings: https://console.firebase.google.com/
// 2. In the "General" tab, scroll down to the "Your apps" section.
// 3. Find your Web app (or create one if you haven't).
// 4. Under "SDK setup and configuration", select the "Config" option.
// 5. You will see a JavaScript object with your Firebase configuration keys (apiKey, authDomain, etc.).
// 6. Create a file named `.env.local` in the ROOT directory of your project (the same level as package.json).
// 7. Add the following lines to `.env.local`, replacing `your_..._value` with the actual values from your Firebase project config:
//
//    NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_value
//    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain_value
//    NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id_value
//    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket_value
//    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id_value
//    NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id_value
//
// IMPORTANT:
//    - The `NEXT_PUBLIC_` prefix is MANDATORY. It makes these variables accessible in the browser.
//    - Ensure there are no quotes around the values in the `.env.local` file unless the value itself contains spaces or special characters that require quoting.
//    - **Restart your Next.js development server** (`npm run dev` or `yarn dev`) after creating or modifying the `.env.local` file for the changes to take effect.
//    - Make sure your `.gitignore` file includes `.env.local` to avoid committing sensitive keys to version control.
