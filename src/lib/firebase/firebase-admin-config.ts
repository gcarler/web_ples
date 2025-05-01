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
        // Also check if it ALREADY has newlines, in case the env var was pasted multiline.
        let privateKey: string;
        if (privateKeyEnv.includes('\\n')) {
             console.log("Processing FIREBASE_PRIVATE_KEY: Replacing '\\n' with newline characters.");
            privateKey = privateKeyEnv.replace(/\\n/g, '\n');
        } else {
             console.log("Processing FIREBASE_PRIVATE_KEY: Assuming newlines are already present.");
            privateKey = privateKeyEnv;
        }


        // Validate that the key starts and ends correctly (basic check)
        if (!privateKey.startsWith('-----BEGIN PRIVATE KEY-----')) {
             console.error(
                'Firebase Admin SDK Error: FIREBASE_PRIVATE_KEY is incorrectly formatted.\n' +
                'It MUST start with "-----BEGIN PRIVATE KEY-----". Please check your .env.local file.'
             );
             throw new Error('Invalid Firebase Private Key format (start header missing).');
        }
        if (!privateKey.endsWith('-----END PRIVATE KEY-----\n') && !privateKey.endsWith('-----END PRIVATE KEY-----')) {
             console.error(
                'Firebase Admin SDK Error: FIREBASE_PRIVATE_KEY is incorrectly formatted.\n' +
                'It MUST end with "-----END PRIVATE KEY-----\\n". Please check your .env.local file and ensure the final newline is included.'
             );
            throw new Error('Invalid Firebase Private Key format (end header or newline missing).');
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
        if (error.message?.includes('Invalid PEM formatted message') || error.message?.includes('Failed to parse private key')) {
            console.error(
                'Hint: This usually means the FIREBASE_PRIVATE_KEY in your .env.local file is missing, empty, or incorrectly formatted.\n' +
                '1. Ensure the value is enclosed in double quotes (e.g., FIREBASE_PRIVATE_KEY="...").\n' +
                '2. Verify the key includes the exact -----BEGIN PRIVATE KEY----- and -----END PRIVATE KEY-----\\n headers.\n' +
                '3. Ensure that newline characters (\\n) are preserved correctly within the quotes. Do NOT replace them with actual newlines in the file itself if your system does not support multi-line env vars.\n' +
                '4. Restart your Next.js server after fixing the .env.local file.'
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
// **CRITICAL FORMATTING FOR FIREBASE_PRIVATE_KEY:**
//    - Copy the **entire** private key value from the JSON file, including the `-----BEGIN PRIVATE KEY-----` and `-----END PRIVATE KEY-----` lines.
//    - Enclose the **ENTIRE** key value within double quotes (`"..."`) in your `.env.local` file.
//    - Ensure the `\n` characters within the private key string are preserved **EXACTLY** as they appear in the JSON file. If your system doesn't support multi-line env vars, use the literal `\n` within the quotes. If your system DOES support multi-line, you *might* be able to paste the key directly, but the quoted version with literal `\n` is generally safer.
//    - **Make absolutely sure the final `\n` after `-----END PRIVATE KEY-----` is present inside the quotes.**
//    - **Example (with literal `\n`):**
//      FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQD...\n...\n...-----END PRIVATE KEY-----\n"
//
// 7. **RESTART YOUR NEXT.JS SERVER** after creating or modifying the `.env.local` file (`npm run dev` or `yarn dev`). This is essential for the changes to be picked up.
// 8. **NEVER** commit your `.env.local` file or the service account JSON file to Git. Add `.env.local` and `*.json` (or the specific service account filename) to your `.gitignore` file.
