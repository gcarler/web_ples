// src/lib/firebase/firebase-admin-config.ts
import admin from 'firebase-admin';

// CRITICAL CONFIGURATION INSTRUCTIONS ARE IN THE `.env` FILE.
// PLEASE ADD YOUR FIREBASE ADMIN CREDENTIALS TO A `.env.local` FILE.

if (!admin.apps.length) {
    const projectId = process.env.FIREBASE_PROJECT_ID;
    const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
    const privateKeyEnv = process.env.FIREBASE_PRIVATE_KEY;

    // First, check if all required environment variables are present.
    if (!projectId || !clientEmail || !privateKeyEnv) {
        console.error('--- Firebase Admin SDK Initialization FAILED ---');
        const errorLines = [
            'Firebase Admin SDK Error: One or more required environment variables are missing.',
            'This is a configuration issue, not a code bug. Your app cannot connect to Firebase without these keys.',
            '\n--- HOW TO FIX ---',
            '1.  Find or create a file named `.env.local` in the ROOT directory of this project (the same folder as `package.json`).',
            '2.  Go to your Firebase project console: https://console.firebase.google.com/',
            '3.  Navigate to Project Settings (click the gear icon) > Service Accounts.',
            '4.  Click "Generate new private key". A .json file will be downloaded.',
            '5.  Open the downloaded JSON file and copy the values for `project_id`, `client_email`, and `private_key`.',
            '6.  Add these values to your `.env.local` file. It should look like this:',
            '\n    FIREBASE_PROJECT_ID="your-project-id-from-the-file"',
            '    FIREBASE_CLIENT_EMAIL="your-client-email-from-the-file"',
            '    FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\\n...your...private...key...\\n-----END PRIVATE KEY-----\\n"',
            '\n7.  **IMPORTANT**: The private key must be in ONE LINE, enclosed in double quotes, with all original newlines replaced by the characters `\\n`.',
            '8.  **RESTART** your development server (e.g., stop `npm run dev` and run it again) for the changes to apply.',
        ];
        throw new Error(errorLines.join('\n'));
    }

    // If all variables are present, then try to initialize.
    try {
        const privateKey = privateKeyEnv.replace(/\\n/g, '\n');

        admin.initializeApp({
            credential: admin.credential.cert({
                projectId,
                clientEmail,
                privateKey,
            }),
        });

        console.log('Firebase Admin SDK initialized successfully.');

    } catch (error: any) {
        // This catch block will now primarily handle PEM parsing errors.
        console.error('--- Firebase Admin SDK Initialization FAILED ---');
        const pemHint = 
            '\n\n******************** PEM PARSING HINT ********************\n' +
            'This error suggests the FIREBASE_PRIVATE_KEY in your .env.local file is incorrectly formatted, even though it was found.\n' +
            'Please CAREFULLY review the formatting instructions in the main `.env` file or the error message above.\n' +
            'Common mistakes include missing quotes or incorrect newline (`\\n`) characters.\n' +
            'Remember to RESTART your server after making changes.\n' +
            '************************************************************\n';

        throw new Error(`Original Error: ${error.message}${pemHint}`);
    }
}

const adminDb = admin.firestore();
const adminAuth = admin.auth();

export { adminDb, adminAuth, admin };
