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
            
            console.error(`Firebase Admin SDK Error: Missing required environment variables: ${missingVars}. Please check your .env.local file.`);
            throw new Error(`Missing Firebase Admin SDK config env vars: ${missingVars}. See setup instructions in this file.`);
        }

        // Process the private key: replace literal '\\n' with actual newline characters ('\n') and remove quotes.
        const privateKey = privateKeyEnv.replace(/\\n/g, '\n').replace(/"/g, '');

        if (!privateKey.startsWith('-----BEGIN PRIVATE KEY-----') || !privateKey.endsWith('-----END PRIVATE KEY-----')) {
            console.error(
                 '\nFirebase Admin SDK Error: CRITICAL - PROCESSED FIREBASE_PRIVATE_KEY is INVALID.\n' +
                'This usually means the key value in `.env.local` is malformed.\n' +
                '>>> RE-READ AND FOLLOW THE `.env.local` FORMATTING INSTRUCTIONS BELOW VERY CAREFULLY. <<<'
            );
            throw new Error( 'Invalid Firebase Private Key format. Ensure it is correctly formatted in .env.local with double quotes and \\n for newlines.' );
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
             finalErrorMessage +=
                 '\n\n******************** PEM PARSING ERROR ********************\n' +
                 'Hint: This strongly indicates the FIREBASE_PRIVATE_KEY in your .env.local file is INCORRECTLY FORMATTED.\n' +
                 'Please **VERY CAREFULLY** check the following in your `.env.local` file:\n' +
                 '1. The **ENTIRE** key value MUST be enclosed in **DOUBLE QUOTES** (e.g., FIREBASE_PRIVATE_KEY="...").\n' +
                 '2. **ALL** newline characters within the key block MUST be replaced with the **LITERAL STRING `\\\\n`** (backslash then n).\n' +
                 '3. The **FINAL `\\\\n`** MUST be present immediately AFTER `-----END PRIVATE KEY-----` and INSIDE the closing double quote (`"`).\n' +
                 '4. You MUST **RESTART** your Next.js server (`npm run dev`) after saving the `.env.local` file.\n' +
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
