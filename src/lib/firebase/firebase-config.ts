// src/lib/firebase/firebase-config.ts
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase for client-side
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);

export { app, db };

// --- Instructions for Environment Variables ---
// 1. Create a Firebase project: https://console.firebase.google.com/
// 2. Go to Project settings > General tab.
// 3. Find your Web app configuration under "Your apps". If you don't have one, click "Add app" and select Web.
// 4. Copy the config values (apiKey, authDomain, etc.).
// 5. Create a file named `.env.local` in the root of your project (if it doesn't exist).
// 6. Add the following lines to `.env.local`, replacing the placeholder values with your actual Firebase config:
//    NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
//    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
//    NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
//    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
//    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
//    NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
//
// IMPORTANT: The `NEXT_PUBLIC_` prefix makes these variables accessible in the browser.
// Ensure you have a `.gitignore` file and that `.env.local` is listed in it to avoid committing sensitive keys.
