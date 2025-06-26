// src/lib/firebase/firebase-admin-config.ts
import admin from 'firebase-admin';

// CRITICAL CONFIGURATION INSTRUCTIONS ARE IN THE `.env` FILE.
// PLEASE ADD YOUR FIREBASE ADMIN CREDENTIALS TO A `.env.local` FILE.

if (!admin.apps.length) {
    const projectId = process.env.FIREBASE_PROJECT_ID;
    const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
    const privateKeyEnv = process.env.FIREBASE_PRIVATE_KEY;

    // Check for missing environment variables first and provide a specific, actionable error.
    const missingVars = [];
    if (!projectId) missingVars.push('FIREBASE_PROJECT_ID');
    if (!clientEmail) missingVars.push('FIREBASE_CLIENT_EMAIL');
    if (!privateKeyEnv) missingVars.push('FIREBASE_PRIVATE_KEY');

    if (missingVars.length > 0) {
        const errorLines = [
            `Firebase Admin SDK Error: The following required environment variable(s) are missing: ${missingVars.join(', ')}.`,
            'This is a configuration issue, not a code bug. Your app cannot connect to Firebase without these keys.',
            '\n--- HOW TO FIX ---',
            '1.  Find or create a file named `.env.local` in the ROOT directory of this project (the same folder as `package.json`).',
            '2.  Go to your Firebase project console: https://console.firebase.google.com/',
            '3.  Navigate to Project Settings (click the gear icon) > Service Accounts.',
            '4.  Click "Generate new private key". A .json file will be downloaded.',
            '5.  Open the downloaded JSON file and copy the values for `project_id`, `client_email`, and `private_key`.',
            '6.  Add the missing variables to your `.env.local` file. It should look like this:',
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
        const pemHint = 
            `Original Error: ${error.message}\n\n` +
            '******************** PEM PARSING ERROR ********************\n' +
            'Hint: This error means your FIREBASE_PRIVATE_KEY in the .env.local file is not formatted correctly.\n' +
            '\n--- HOW TO FIX ---\n' +
            '1. Open your `.env.local` file.\n' +
            '2. Find the line starting with `FIREBASE_PRIVATE_KEY=`.\n' +
            '3. It MUST look EXACTLY like this (including the quotes and `\\n`):\n' +
            '\n   FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\\nYOUR_KEY_LINE_1\\nYOUR_KEY_LINE_2\\n...and so on...\\n-----END PRIVATE KEY-----\\n"\n' +
            '\n4. **VERY IMPORTANT**: Every line break from the original key file must be replaced by the two characters: `\\` and `n`.\n' +
            '5. **RESTART** your development server after saving the file.\n' +
            '*************************************************************\n';

        throw new Error(`Firebase Admin SDK failed to initialize: Failed to parse private key. ${pemHint}`);
    }    
}

const adminDb = admin.firestore();
const adminAuth = admin.auth();

export { adminDb, adminAuth, admin };
