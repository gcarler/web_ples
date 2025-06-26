// src/lib/firebase/firebase-admin-config.ts
import admin from 'firebase-admin';

// Ensure Firebase Admin SDK is initialized only once
if (!admin.apps.length) {
    try {
        const projectId = process.env.FIREBASE_PROJECT_ID;
        const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
        const privateKeyEnv = process.env.FIREBASE_PRIVATE_KEY; 

        if (!projectId || !clientEmail || !privateKeyEnv) {
            const missingVars = [
                !projectId && 'FIREBASE_PROJECT_ID',
                !clientEmail && 'FIREBASE_CLIENT_EMAIL',
                !privateKeyEnv && 'FIREBASE_PRIVATE_KEY',
            ].filter(Boolean).join(', ');
            
            const setupInstructions = 
                '\n\n******************** MISSING FIREBASE ADMIN CONFIG ********************\n' +
                'Hint: One or more required Firebase Admin variables are missing in your .env.local file.\n\n' +
                '--- HOW TO FIX ---\n' +
                '1. Go to your Firebase project settings -> "Service accounts" tab.\n' +
                '2. Click "Generate new private key". A JSON file will be downloaded.\n' +
                '3. Open the downloaded JSON file to get your `project_id`, `client_email`, and `private_key`.\n' +
                '4. Ensure your `.env.local` file has these exact lines (with your values):\n\n' +
                '   FIREBASE_PROJECT_ID=your_project_id_from_json\n' +
                '   FIREBASE_CLIENT_EMAIL=your_client_email_from_json\n' +
                '   FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\\nYOUR_PRIVATE_KEY...\\n-----END PRIVATE KEY-----\\n"\n\n' +
                '5. **RESTART** your development server after saving the file.\n' +
                '************************************************************************\n';
            
            throw new Error(`Firebase Admin SDK Error: Missing required environment variables: ${missingVars}.${setupInstructions}`);
        }
        
        // Replace the literal `\n` character sequence with actual newline characters.
        const privateKey = privateKeyEnv.replace(/\\n/g, '\n');

        // NEW: Add a more specific check to guide the user.
        if (!privateKey.startsWith('-----BEGIN PRIVATE KEY-----')) {
            throw new Error(
                'Invalid FIREBASE_PRIVATE_KEY format. The key must start with "-----BEGIN PRIVATE KEY-----". Please check your .env.local file to ensure the entire key, including the header and footer, is copied correctly.'
            );
        }
        
        const serviceAccount = {
            projectId: projectId,
            clientEmail: clientEmail,
            privateKey: privateKey,
        };
        
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
        });

        console.log('Firebase Admin SDK initialized successfully.');
        
    } catch (error: any) {
        console.error('--- Firebase Admin SDK Initialization FAILED ---');
        console.error('Error Message:', error.message);
        const isPemError = error.message?.includes('Invalid PEM formatted message') || error.message?.includes('Failed to parse private key');

        let finalErrorMessage = `Firebase Admin SDK failed to initialize: ${error.message}`;
        if (isPemError) {
             finalErrorMessage =
                 'Firebase Admin SDK failed to initialize: Failed to parse private key: Error: Invalid PEM formatted message.\n\n' +
                 '******************** PEM PARSING ERROR ********************\n' +
                 'Hint: This error means your FIREBASE_PRIVATE_KEY in the .env.local file is not formatted correctly.\n\n' +
                 '--- HOW TO FIX ---\n' +
                 '1. Open your `.env.local` file.\n' +
                 '2. Find the line starting with `FIREBASE_PRIVATE_KEY=`.\n' +
                 '3. It MUST look EXACTLY like this (including the quotes and `\\n`):\n\n' +
                 '   FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\\nYOUR_KEY_LINE_1\\nYOUR_KEY_LINE_2\\n...and so on...\\n-----END PRIVATE KEY-----\\n"\n\n' +
                 '4. **VERY IMPORTANT**: Every line break from the original key file must be replaced by the two characters: `\\` and `n`.\n' +
                 '5. **RESTART** your development server after saving the file.\n' +
                 '*************************************************************\n';
        }
        throw new Error(finalErrorMessage);
    }    
}

const adminDb = admin.firestore();    
const adminAuth = admin.auth();

export { adminDb, adminAuth, admin };


// ========================================================================================================
// !! CRITICAL CONFIGURATION !!
// ========================================================================================================
//
// 1. Go to your Firebase project settings -> "Service accounts" tab.
// 2. Click "Generate new private key". A JSON file will be downloaded.
// 3. Open the downloaded JSON file to get `project_id`, `client_email`, and `private_key`.
// 4. Create a `.env.local` file in your project ROOT directory.
// 5. Add the following, replacing placeholders with YOUR values:
//
//    FIREBASE_PROJECT_ID=your_project_id_from_json
//    FIREBASE_CLIENT_EMAIL=your_client_email_from_json
//    FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\\nYOUR_PRIVATE_KEY_LINE_1\\n...MORE_LINES...\\n-----END PRIVATE KEY-----\\n"
//
// **KEY FORMATTING (VERY IMPORTANT):**
//    - Must be in **DOUBLE QUOTES (`"..."`)**.
//    - All newlines must be the literal string `\\n`.
//    - Must end with `\\n` INSIDE the closing quote.
//
// 6. **RESTART** your Next.js server after saving `.env.local`.
// 7. Add `.env.local` and the `*.json` file to your `.gitignore`.
// ========================================================================================================
