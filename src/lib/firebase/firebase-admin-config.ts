// src/lib/firebase/firebase-admin-config.ts
import admin from 'firebase-admin';

// Ensure Firebase Admin SDK is initialized only once
if (!admin.apps.length) {
    try {
        // Explicitly check environment variables before using them
        const projectId = process.env.FIREBASE_PROJECT_ID;
        const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
        const privateKeyEnv = process.env.FIREBASE_PRIVATE_KEY;

        if (!projectId || !clientEmail || !privateKeyEnv) {
            console.error(
                'Firebase Admin SDK Error: Missing required environment variables.\n' +
                'Ensure FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, and FIREBASE_PRIVATE_KEY are set in your .env.local file.\n' +
                'See instructions below for details.'
            );
            throw new Error('Missing Firebase Admin SDK configuration.');
        }

        // Attempt to replace literal '\n' with actual newline characters.
        // This is crucial for correct PEM format parsing.
        const privateKey = privateKeyEnv.replace(/\\n/g, '\n');

        // Validate that the key starts and ends correctly (basic check)
        if (!privateKey.startsWith('-----BEGIN PRIVATE KEY-----') || !privateKey.endsWith('-----END PRIVATE KEY-----\n')) {
             console.warn(
                'Firebase Admin SDK Warning: FIREBASE_PRIVATE_KEY might be incorrectly formatted.\n' +
                'Ensure it starts with "-----BEGIN PRIVATE KEY-----" and ends with "-----END PRIVATE KEY-----\\n", ' +
                'including the newline characters (\\n).'
             );
        }

        admin.initializeApp({
            credential: admin.credential.cert({
                projectId: projectId,
                clientEmail: clientEmail,
                privateKey: privateKey, // Use the processed key
            }),
            databaseURL: `https://${projectId}.firebaseio.com`, // Optional: databaseURL if using Realtime Database
        });
        console.log('Firebase Admin SDK initialized successfully.');
    } catch (error: any) {
        console.error('Firebase Admin SDK initialization error:', error.message);
        // Provide more specific feedback if it's a PEM format issue
        if (error.message?.includes('Invalid PEM formatted message')) {
            console.error(
                'Hint: This usually means the FIREBASE_PRIVATE_KEY in your .env.local file is missing, empty, or incorrectly formatted.\n' +
                'Please verify the key includes the BEGIN/END headers and that newline characters (\\n) are preserved correctly.\n' +
                'Restart your server after fixing the .env.local file.'
            );
        }
        // Re-throw the error to stop the application if initialization fails critically
        throw new Error(`Firebase Admin SDK failed to initialize: ${error.message}`);
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
// **IMPORTANT FORMATTING FOR FIREBASE_PRIVATE_KEY:**
//    - Copy the **entire** private key value from the JSON file, including the `-----BEGIN PRIVATE KEY-----` and `-----END PRIVATE KEY-----` lines.
//    - Enclose the **entire** key value within double quotes (`"..."`) in your `.env.local` file.
//    - Ensure the `\n` characters within the private key string are preserved **exactly** as they appear in the JSON file. DO NOT replace them with actual newlines in the file itself if your system doesn't support multi-line env vars. The format above with explicit `\n` is required.
//    - **Example:**
//      FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQD...\n...\n...-----END PRIVATE KEY-----\n"
//
// 7. **RESTART YOUR NEXT.JS SERVER** after creating or modifying the `.env.local` file (`npm run dev` or `yarn dev`).
// 8. **NEVER** commit your `.env.local` file or the service account JSON file to Git. Add `.env.local` and `*.json` (or the specific service account filename) to your `.gitignore` file.
