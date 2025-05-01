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

        // 1. Check if variables exist
        if (!projectId || !clientEmail || !privateKeyEnv) {
            console.error(
                'Firebase Admin SDK Error: CRITICAL - Missing required environment variables.\n' +
                'Ensure FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, and FIREBASE_PRIVATE_KEY are set correctly in your .env.local file.\n' +
                '>>> Check instructions at the bottom of src/lib/firebase/firebase-admin-config.ts <<<'
            );
            throw new Error('Missing Firebase Admin SDK configuration environment variables.');
        }

        // 2. Check if private key is empty or just whitespace
        if (!privateKeyEnv.trim()) {
             console.error(
                'Firebase Admin SDK Error: CRITICAL - FIREBASE_PRIVATE_KEY environment variable is empty or contains only whitespace.\n' +
                'Please ensure the key value is correctly copied into your .env.local file.'
             );
             throw new Error('FIREBASE_PRIVATE_KEY is empty or whitespace.');
        }


        // 3. Process the private key (replace literal '\n' with actual newlines)
        let privateKey: string;
        if (privateKeyEnv.includes('\\n')) {
            // console.log("Processing FIREBASE_PRIVATE_KEY: Replacing '\\n' with newline characters.");
            privateKey = privateKeyEnv.replace(/\\n/g, '\n');
        } else {
            // console.log("Processing FIREBASE_PRIVATE_KEY: Assuming newlines are already present or key is malformed if using literal \\n.");
            // Warn if it doesn't look like a PEM key at all
            if (!privateKeyEnv.startsWith('-----BEGIN') || !privateKeyEnv.includes('PRIVATE KEY')) {
                 console.warn("Warning: FIREBASE_PRIVATE_KEY does not contain '\\n' and doesn't look like a standard PEM key. Ensure it's formatted correctly in .env.local, including double quotes and literal '\\n'.");
            }
            privateKey = privateKeyEnv;
        }

         // Log the beginning and end of the processed key for validation (DO NOT log the full key)
         const keyPreviewStart = privateKey.substring(0, 40).replace(/\n/g, '\\n'); // Show newlines as \n in preview
         const keyPreviewEnd = privateKey.substring(privateKey.length - 40).replace(/\n/g, '\\n');
         // console.log(`Processed Private Key Preview - Starts with: "${keyPreviewStart}..." Ends with: "...${keyPreviewEnd}"`);


        // 4. Validate that the processed key starts and ends correctly (basic PEM check)
        const startsCorrectly = privateKey.startsWith('-----BEGIN PRIVATE KEY-----');
        // Check for ending with or without a final newline, as SDK might handle both
        const endsCorrectly = privateKey.endsWith('-----END PRIVATE KEY-----\n') || privateKey.endsWith('-----END PRIVATE KEY-----');

        if (!startsCorrectly || !endsCorrectly) {
             console.error(
                'Firebase Admin SDK Error: CRITICAL - Processed FIREBASE_PRIVATE_KEY is incorrectly formatted.\n' +
                `Starts correctly: ${startsCorrectly}. Ends correctly: ${endsCorrectly}.\n` +
                'This strongly suggests an issue with how the key is formatted in .env.local. It MUST start with "-----BEGIN PRIVATE KEY-----" and end with "-----END PRIVATE KEY-----".\n' +
                '>>> Key requirements in `.env.local`: <<<\n' +
                '1. Enclose the ENTIRE value in DOUBLE QUOTES (`"`).\n' +
                '2. Include the exact BEGIN and END header/footer lines.\n' +
                '3. Use literal `\\n` for newlines INSIDE the quotes.\n' +
                '4. Ensure the final `\\n` is present just before the closing quote.\n'+
                '>>> Check instructions at the bottom of src/lib/firebase/firebase-admin-config.ts <<<'
             );
             throw new Error('Invalid Firebase Private Key format after processing (header/footer or newline issue).');
        } else {
             console.log("Processed Private Key format validation (start/end markers) passed.");
        }

        // 5. Initialize Firebase Admin
        admin.initializeApp({
            credential: admin.credential.cert({
                projectId: projectId,
                clientEmail: clientEmail,
                privateKey: privateKey, // Use the processed key
            }),
            // databaseURL: `https://${projectId}.firebaseio.com`, // Optional: if using Realtime Database
        });
        console.log('Firebase Admin SDK initialized successfully.');
    } catch (error: any) {
        // Catch errors during initializeApp, which often include the PEM parsing error
        console.error('Firebase Admin SDK initialization error:', error.message);
        // Provide more specific feedback if it's a PEM format issue
        if (error.message?.includes('Invalid PEM formatted message') || error.message?.includes('Failed to parse private key')) {
            console.error(
                 '\nHint: This error *STRONGLY* suggests the FIREBASE_PRIVATE_KEY in your .env.local file is missing, empty, or incorrectly formatted.\n' +
                 '>>> PLEASE CAREFULLY CHECK YOUR `.env.local` FILE AGAIN FOR: <<<\n' +
                 '1. Is the ENTIRE value enclosed in DOUBLE QUOTES (e.g., FIREBASE_PRIVATE_KEY="...")?\n' +
                 '2. Does the value include the *exact* "-----BEGIN PRIVATE KEY-----" and "-----END PRIVATE KEY-----" headers/footers?\n' +
                 '3. Are the newline characters represented as literal `\\n` (backslash followed by n) *inside* the quotes?\n' +
                 '4. **CRITICAL:** Is the final `\\n` AFTER `-----END PRIVATE KEY-----` present *inside* the closing double quote?\n' +
                 '5. Did you **RESTART** your Next.js server (`npm run dev` or `yarn dev`) after saving changes to `.env.local`?\n' +
                 '>>> Refer to the detailed instructions at the bottom of src/lib/firebase/firebase-admin-config.ts <<<'
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
// 6. Create a file named `.env.local` in the project root if it doesn't exist.
// 7. Add the following lines to your `.env.local` file, replacing placeholders:
//
//    FIREBASE_PROJECT_ID=your_project_id_from_json
//    FIREBASE_CLIENT_EMAIL=your_client_email_from_json
//    FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYOUR_PRIVATE_KEY_LINE_1\nYOUR_PRIVATE_KEY_LINE_2...\n-----END PRIVATE KEY-----\n"
//
// **CRITICAL FORMATTING FOR FIREBASE_PRIVATE_KEY:**
//    - **MUST be enclosed in DOUBLE QUOTES (`"..."`)**. Single quotes will NOT work.
//    - Copy the **ENTIRE** private key value from the JSON file, including the exact `-----BEGIN PRIVATE KEY-----` and `-----END PRIVATE KEY-----` lines.
//    - Ensure the newline characters are represented as literal `\n` (a backslash followed by the letter 'n') **INSIDE** the double quotes. DO NOT use actual line breaks in the `.env.local` file.
//    - **VERY IMPORTANT:** Make sure the final `\n` is present immediately after `-----END PRIVATE KEY-----` and **BEFORE** the closing double quote (`"`).
//    - **Correct Example:**
//      FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQD...\n...\n...-----END PRIVATE KEY-----\n"
//
// 8. **RESTART YOUR NEXT.JS SERVER** (`npm run dev` or `yarn dev`) after creating or modifying `.env.local`. This is **ESSENTIAL**.
// 9. Add `.env.local` and the service account JSON file (`*.json`) to your `.gitignore` file.
// ==========================================================================================
