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
        const missingVarsError = new Error(
            'Firebase Admin SDK Error: One or more required environment variables are missing.\n' +
            'Please check your `.env.local` file and ensure the following are set:\n' +
            '- FIREBASE_PROJECT_ID\n' +
            '- FIREBASE_CLIENT_EMAIL\n' +
            '- FIREBASE_PRIVATE_KEY\n\n' +
            'Remember to restart your server after modifying the .env.local file.'
        );
        throw missingVarsError;
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
            'Please CAREFULLY review the formatting instructions in the main `.env` file.\n' +
            'Common mistakes include missing quotes or incorrect newline (`\\n`) characters.\n' +
            'Remember to RESTART your server after making changes.\n' +
            '************************************************************\n';

        throw new Error(`Original Error: ${error.message}${pemHint}`);
    }
}

const adminDb = admin.firestore();
const adminAuth = admin.auth();

export { adminDb, adminAuth, admin };
