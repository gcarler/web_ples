// src/lib/firebase/firebase-admin-config.ts
import admin from 'firebase-admin';

// Ensure Firebase Admin SDK is initialized only once
if (!admin.apps.length) {
    try {
        console.log('Attempting to initialize Firebase Admin SDK...');
        // Explicitly check environment variables before using them
        const projectId = process.env.FIREBASE_PROJECT_ID;
        const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
        const privateKeyEnv = process.env.FIREBASE_PRIVATE_KEY;

        if (!projectId || !clientEmail || !privateKeyEnv) {
            console.error(
                'Firebase Admin SDK Error: CRITICAL - Missing required environment variables.\n' +
                'Ensure FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, and FIREBASE_PRIVATE_KEY are set correctly in your .env.local file.\n' +
                'See detailed instructions at the bottom of this file (src/lib/firebase/firebase-admin-config.ts).'
            );
            throw new Error('Missing Firebase Admin SDK configuration environment variables.');
        }

        // Attempt to replace literal '\n' with actual newline characters.
        // This is crucial for correct PEM format parsing.
        // Also check if it ALREADY has newlines, in case the env var was pasted multiline.
        let privateKey: string;
        if (privateKeyEnv.includes('\\n')) {
             // console.log("Processing FIREBASE_PRIVATE_KEY: Replacing '\\n' with newline characters.");
            privateKey = privateKeyEnv.replace(/\\n/g, '\n');
        } else {
             // console.log("Processing FIREBASE_PRIVATE_KEY: Assuming newlines are already present.");
            privateKey = privateKeyEnv;
        }

         // Log the beginning and end of the processed key for validation (DO NOT log the full key)
         // console.log(`Processed Private Key - Starts with: "${privateKey.substring(0, 30)}..." Ends with: "...${privateKey.substring(privateKey.length - 30)}"`);


        // Validate that the key starts and ends correctly (basic check)
        const startsCorrectly = privateKey.startsWith('-----BEGIN PRIVATE KEY-----');
        const endsCorrectly = privateKey.endsWith('-----END PRIVATE KEY-----\n') || privateKey.endsWith('-----END PRIVATE KEY-----'); // Allow with or without final newline for flexibility

        if (!startsCorrectly || !endsCorrectly) {
             console.error(
                'Firebase Admin SDK Error: CRITICAL - FIREBASE_PRIVATE_KEY is incorrectly formatted in .env.local.\n' +
                `Starts correctly: ${startsCorrectly}. Ends correctly: ${endsCorrectly}.\n` +
                'It MUST start with "-----BEGIN PRIVATE KEY-----" and end with "-----END PRIVATE KEY-----" (ideally including the final newline `\\n`).\n' +
                'Please carefully check your .env.local file and ensure the entire key, including headers/footers, is enclosed in double quotes "" and `\\n` characters are preserved.\n'+
                'See detailed instructions at the bottom of this file.'
             );
             throw new Error('Invalid Firebase Private Key format (header/footer or newline issue).');
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
                 'Hint: This error *strongly* suggests the FIREBASE_PRIVATE_KEY in your .env.local file is missing, empty, or incorrectly formatted.\n' +
                 '>>> PLEASE DOUBLE-CHECK THE FOLLOWING IN YOUR `.env.local` FILE: <<<\n' +
                 '1. Is the value enclosed in DOUBLE QUOTES (e.g., FIREBASE_PRIVATE_KEY="...")?\n' +
                 '2. Does the value include the *exact* -----BEGIN PRIVATE KEY----- and -----END PRIVATE KEY----- headers?\n' +
                 '3. Are the newline characters (`\\n`) preserved EXACTLY as they were in the JSON file you downloaded?\n' +
                 '4. **CRITICAL:** Is the final `\\n` AFTER `-----END PRIVATE KEY-----` present *inside* the closing double quote?\n' +
                 '5. Did you **RESTART** your Next.js server (`npm run dev` or `yarn dev`) after saving changes to `.env.local`?'
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
//
// ==========================================================================================
// !! CRITICAL CONFIGURATION !! - Failure to set these correctly WILL cause errors.
// ==========================================================================================
//
// 1. Go to your Firebase project settings: https://console.firebase.google.com/
// 2. Navigate to the "Service accounts" tab.
// 3. Click "Generate new private key" and confirm. A JSON file will be downloaded.
// 4. **KEEP THIS FILE SECURE AND DO NOT COMMIT IT TO VERSION CONTROL.**
// 5. Open the downloaded JSON file. You will need the `project_id`, `client_email`, and `private_key`.
// 6. Add the following lines to your `.env.local` file (create this file in the project root if it doesn't exist):
//
//    FIREBASE_PROJECT_ID=your_project_id_from_json
//    FIREBASE_CLIENT_EMAIL=your_client_email_from_json
//    FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYOUR_PRIVATE_KEY_LINE_1\nYOUR_PRIVATE_KEY_LINE_2...\n-----END PRIVATE KEY-----\n"
//
// **CRITICAL FORMATTING FOR FIREBASE_PRIVATE_KEY:**
//    - **Enclose the ENTIRE key value within DOUBLE QUOTES (`"..."`)**. Single quotes will not work correctly.
//    - Copy the **entire** private key value from the JSON file, including the `-----BEGIN PRIVATE KEY-----` and `-----END PRIVATE KEY-----` lines.
//    - Ensure the `\n` characters within the private key string are preserved **EXACTLY** as they appear in the JSON file. **DO NOT replace `\n` with actual newlines in the `.env.local` file unless your system explicitly supports multi-line env vars AND you've tested it.** Using the literal `\n` inside the quotes is the safest method.
//    - **Make absolutely sure the final `\n` after `-----END PRIVATE KEY-----` is present *inside* the closing double quote.** This is a common mistake.
//    - **Example (with literal `\n`):**
//      FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQD...\n...\n...-----END PRIVATE KEY-----\n"
//
// 7. **RESTART YOUR NEXT.JS SERVER** after creating or modifying the `.env.local` file (`npm run dev` or `yarn dev`). This is **ESSENTIAL** for the changes to be picked up.
// 8. **NEVER** commit your `.env.local` file or the service account JSON file to Git. Add `.env.local` and `*.json` (or the specific service account filename) to your `.gitignore` file.
// ==========================================================================================
