// src/lib/firebase/firebase-admin-config.ts
import admin from 'firebase-admin';

// Ensure Firebase Admin SDK is initialized only once
if (!admin.apps.length) {
    try {
        const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n');

        if (!process.env.FIREBASE_PROJECT_ID || !process.env.FIREBASE_CLIENT_EMAIL || !privateKey) {
            throw new Error('Missing Firebase Admin SDK configuration in environment variables.');
        }

        admin.initializeApp({
            credential: admin.credential.cert({
                projectId: process.env.FIREBASE_PROJECT_ID,
                clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
                privateKey: privateKey,
            }),
            databaseURL: `https://${process.env.FIREBASE_PROJECT_ID}.firebaseio.com`, // Optional: databaseURL if using Realtime Database
        });
        console.log('Firebase Admin SDK initialized successfully.');
    } catch (error) {
        console.error('Firebase Admin SDK initialization error:', error);
        // Depending on your error handling strategy, you might want to:
        // - Log the error and continue (potentially with limited functionality).
        // - Throw the error to stop the application startup
        // For now, we log it. Critical server actions will likely fail later.
        throw error; // Throwing the error to halt the application
    }
}

const adminDb = admin.firestore();
const adminAuth = admin.auth(); // If you need admin auth operations

export { adminDb, adminAuth, admin };


// --- Instructions for Environment Variables ---
// 1. Go to your Firebase project settings: https://console.firebase.google.com/
// 2. Navigate to the "Service accounts" tab.
// 3. Click "Generate new private key" and confirm. A JSON file will be downloaded.
// 4. **KEEP THIS FILE SECURE AND DO NOT COMMIT IT TO VERSION CONTROL.**
// 5. Open the downloaded JSON file. You will need the `project_id`, `client_email`, and `private_key`.
// 6. Add the following lines to your `.env.local` file (or your hosting provider's environment variable settings):
//    FIREBASE_PROJECT_ID=your_project_id_from_json
//    FIREBASE_CLIENT_EMAIL=your_client_email_from_json
//    FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYOUR_PRIVATE_KEY_LINE_1\nYOUR_PRIVATE_KEY_LINE_2...\n-----END PRIVATE KEY-----\n"
//
// IMPORTANT:
//    - Copy the entire private key, including the `-----BEGIN PRIVATE KEY-----` and `-----END PRIVATE KEY-----` lines.
//    - Ensure the `\n` characters within the private key string in the JSON are preserved exactly like that when you put it into the .env file (or replace them with actual newline characters if your environment variable system supports multi-line values). The format above with explicit `\n` is common for single-line env vars.
//    - **NEVER** commit your `.env.local` file or the service account JSON file to Git. Add `.env.local` and `*.json` (or the specific service account filename) to your `.gitignore` file.
