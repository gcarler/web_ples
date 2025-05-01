// src/lib/firebase/firebase-admin-config.ts
import admin from 'firebase-admin';

// Ensure Firebase Admin SDK is initialized only once
if (!admin.apps.length) {
    try {
        console.log('--- Firebase Admin SDK Initialization Start ---');
        // Explicitly check environment variables before using them
        const projectId = process.env.FIREBASE_PROJECT_ID;
        const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
        const privateKeyEnv = process.env.FIREBASE_PRIVATE_KEY;

        // 1. Check if variables exist
        if (!projectId) console.error('CRITICAL: FIREBASE_PROJECT_ID environment variable is MISSING or empty.');
        if (!clientEmail) console.error('CRITICAL: FIREBASE_CLIENT_EMAIL environment variable is MISSING or empty.');
        if (!privateKeyEnv) console.error('CRITICAL: FIREBASE_PRIVATE_KEY environment variable is MISSING or empty.');

        if (!projectId || !clientEmail || !privateKeyEnv) {
            console.error(
                'Firebase Admin SDK Error: CRITICAL - Missing required environment variables.\n' +
                'Ensure FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, and FIREBASE_PRIVATE_KEY are set correctly in your .env.local file.\n' +
                'See detailed instructions at the bottom of this file (src/lib/firebase/firebase-admin-config.ts).'
            );
            throw new Error('Missing Firebase Admin SDK configuration environment variables.');
        } else {
             console.log('OK: Found FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, and FIREBASE_PRIVATE_KEY environment variables.');
             // Log the start/end of the raw key from env var for debugging quotes/whitespace
             const rawKeyPreviewStart = privateKeyEnv.substring(0, 20);
             const rawKeyPreviewEnd = privateKeyEnv.substring(privateKeyEnv.length - 20);
             console.log(`DEBUG: Raw FIREBASE_PRIVATE_KEY from env - Starts with: "${rawKeyPreviewStart}..." Ends with: "...${rawKeyPreviewEnd}" (Length: ${privateKeyEnv.length})`);
             // Check for leading/trailing whitespace
             if (privateKeyEnv !== privateKeyEnv.trim()) {
                 console.warn('DEBUG: Warning: Raw FIREBASE_PRIVATE_KEY from env appears to have leading or trailing whitespace. This can cause parsing errors.');
             }
        }

        // 2. Check if private key is just whitespace
        if (!privateKeyEnv.trim()) {
             console.error(
                'Firebase Admin SDK Error: CRITICAL - FIREBASE_PRIVATE_KEY environment variable is empty or contains only whitespace.\n' +
                'Please ensure the key value is correctly copied into your .env.local file.'
             );
             throw new Error('FIREBASE_PRIVATE_KEY is empty or whitespace.');
        }


        // 3. Process the private key (replace literal '\\n' with actual newlines)
        let privateKey: string;
        console.log(`DEBUG: Attempting to process FIREBASE_PRIVATE_KEY...`);
        if (privateKeyEnv.includes('\\n')) {
            console.log("DEBUG: Processing FIREBASE_PRIVATE_KEY: Replacing literal '\\n' with actual newline characters.");
            privateKey = privateKeyEnv.replace(/\\n/g, '\n');
        } else {
            console.warn("DEBUG: Processing FIREBASE_PRIVATE_KEY: No literal '\\n' found. Assuming newlines are already present OR the key is malformed if literal '\\n' was intended but missing.");
            // Warn if it doesn't look like a PEM key at all
            if (!privateKeyEnv.trim().startsWith('-----BEGIN') || !privateKeyEnv.includes('PRIVATE KEY')) {
                 console.warn("DEBUG: Warning: Raw FIREBASE_PRIVATE_KEY does not contain '\\n' and doesn't look like a standard PEM key. Ensure it's formatted correctly in .env.local, especially check quotes and literal '\\n'.");
            }
            privateKey = privateKeyEnv;
        }

         // Log the beginning and end of the PROCESSED key for validation (DO NOT log the full key)
         const processedKeyPreviewStart = privateKey.substring(0, 40).replace(/\n/g, '\\n'); // Show newlines as \n in preview
         const processedKeyPreviewEnd = privateKey.substring(privateKey.length - 40).replace(/\n/g, '\\n');
         console.log(`DEBUG: Processed Private Key Preview - Starts with: "${processedKeyPreviewStart}..." Ends with: "...${processedKeyPreviewEnd}"`);
         // Log if processed key still has whitespace issues
         if (privateKey !== privateKey.trim()) {
             console.warn('DEBUG: Warning: Processed private key still has leading/trailing whitespace after replacing "\\n". Check the original value in .env.local.');
         }


        // 4. Validate that the processed key starts and ends correctly (basic PEM check)
        const trimmedPrivateKey = privateKey.trim(); // Trim before checking start/end
        const startsCorrectly = trimmedPrivateKey.startsWith('-----BEGIN PRIVATE KEY-----');
        // Check for ending with or without a final newline, as SDK might handle both
        const endsCorrectly = trimmedPrivateKey.endsWith('-----END PRIVATE KEY-----'); // Trimmed check is sufficient

        if (!startsCorrectly || !endsCorrectly) {
             console.error(
                'Firebase Admin SDK Error: CRITICAL - Processed FIREBASE_PRIVATE_KEY appears incorrectly formatted.\n' +
                `DEBUG: Starts with "-----BEGIN PRIVATE KEY-----": ${startsCorrectly}\n` +
                `DEBUG: Ends with "-----END PRIVATE KEY-----": ${endsCorrectly}\n` +
                'This strongly suggests an issue with how the key is formatted in .env.local. It MUST start with "-----BEGIN PRIVATE KEY-----" and end with "-----END PRIVATE KEY-----".\n' +
                '>>> DOUBLE-CHECK `.env.local` FOR THESE REQUIREMENTS: <<<\n' +
                '1. Is the ENTIRE value enclosed in DOUBLE QUOTES (`"`)? (e.g., FIREBASE_PRIVATE_KEY="...")\n' +
                '2. Does the value include the *exact* BEGIN and END header/footer lines?\n' +
                '3. Are newline characters represented as literal `\\n` (backslash followed by n) *inside* the quotes?\n' +
                '4. **CRITICAL:** Is the final `\\n` AFTER `-----END PRIVATE KEY-----` present *inside* the closing double quote (`"`)? (e.g., "...-----END PRIVATE KEY-----\\n")\n' +
                '5. Are there any extra spaces or characters before `-----BEGIN` or after the final `\\n"`?\n' +
                '6. Did you **RESTART** the Next.js server after saving `.env.local`? (`npm run dev`)\n' +
                'See detailed instructions at the bottom of this file.'
             );
             throw new Error('Invalid Firebase Private Key format after processing (header/footer, newline, or extra whitespace issue).');
        } else {
             console.log("OK: Processed Private Key format validation (start/end markers) PASSED.");
        }

        // 5. Prepare credentials object
        const serviceAccount = {
            projectId: projectId,
            clientEmail: clientEmail,
            // Use the potentially trimmed key if whitespace was the only issue,
            // but the original `privateKey` should be correct if formatting is right.
            // Sticking with `privateKey` as the SDK might handle minor whitespace nuances itself.
            privateKey: privateKey,
        };

        // 6. Initialize Firebase Admin
        console.log('DEBUG: Attempting admin.initializeApp with processed credentials...');
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
            // databaseURL: `https://${projectId}.firebaseio.com`, // Optional: if using Realtime Database
        });
        console.log('--- Firebase Admin SDK initialized successfully. ---');

    } catch (error: any) {
        // Catch errors during initializeApp, which often include the PEM parsing error
        console.error('--- Firebase Admin SDK Initialization FAILED ---');
        console.error('Error Message:', error.message);

        // Provide more specific feedback if it's a PEM format issue
        if (error.message?.includes('Invalid PEM formatted message') || error.message?.includes('Failed to parse private key')) {
            console.error(
                 '\nHint: The error "Invalid PEM formatted message" or "Failed to parse private key" *STRONGLY* indicates the FIREBASE_PRIVATE_KEY in your .env.local file is missing, empty, or incorrectly formatted.\n' +
                 '>>> PLEASE CAREFULLY RE-CHECK YOUR `.env.local` FILE FOR THE FOLLOWING: <<<\n' +
                 '1. Is the ENTIRE value enclosed in DOUBLE QUOTES (e.g., FIREBASE_PRIVATE_KEY="...")?\n' +
                 '2. Does the value include the *exact* "-----BEGIN PRIVATE KEY-----" and "-----END PRIVATE KEY-----" headers/footers?\n' +
                 '3. Are the newline characters represented as literal `\\n` (backslash followed by n) *inside* the quotes?\n' +
                 '4. **CRITICAL:** Is the final `\\n` AFTER `-----END PRIVATE KEY-----` present *inside* the closing double quote (`"`)? (e.g., "...-----END PRIVATE KEY-----\\n")\n' +
                 '5. Are there any extra spaces or characters before `-----BEGIN` or after the final `\\n"`?\n' +
                 '6. Did you **RESTART** your Next.js server (`npm run dev` or `yarn dev`) after saving changes to `.env.local`?\n\n' +
                 'Refer to the detailed instructions at the bottom of this file (src/lib/firebase/firebase-admin-config.ts).'
            );
        } else {
             // Log the original error stack for other types of errors
             console.error("Full Error Details:", error);
        }
        // Re-throw the error to stop the application if initialization fails critically
        throw new Error(`Firebase Admin SDK failed to initialize: ${error.message}`);
    }
} else {
     console.log('Firebase Admin SDK already initialized.');
}

let adminDb: admin.firestore.Firestore;
let adminAuth: admin.auth.Auth;

try {
    adminDb = admin.firestore();
    adminAuth = admin.auth(); // If you need admin auth operations
} catch (initError) {
    console.error("CRITICAL: Failed to get Firestore/Auth instance AFTER potential initialization.", initError);
    // Handle the case where initialization might have seemed successful but getting instances fails
    // This might indicate a deeper issue or partial initialization.
    throw new Error("Failed to get Firestore/Auth instances from initialized Firebase Admin SDK.");
}


export { adminDb, adminAuth, admin };


// --- Instructions for Environment Variables ---
//
// ========================================================================================================
// !! CRITICAL CONFIGURATION !! - Failure to set these correctly WILL cause errors like "Invalid PEM".
// ========================================================================================================
//
// 1. Go to your Firebase project settings: https://console.firebase.google.com/
// 2. Navigate to the "Service accounts" tab.
// 3. Click "Generate new private key" and confirm. A JSON file will be downloaded.
// 4. **KEEP THIS FILE SECURE AND DO NOT COMMIT IT TO VERSION CONTROL.**
// 5. Open the downloaded JSON file. You will need the `project_id`, `client_email`, and `private_key`.
// 6. Create a file named `.env.local` in the project ROOT directory (same level as package.json) if it doesn't exist.
// 7. Add the following lines to your `.env.local` file, replacing placeholders:
//
//    FIREBASE_PROJECT_ID=your_project_id_from_json
//    FIREBASE_CLIENT_EMAIL=your_client_email_from_json
//    FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYOUR_PRIVATE_KEY_LINE_1\nYOUR_PRIVATE_KEY_LINE_2...\n-----END PRIVATE KEY-----\n"
//
// **CRITICAL FORMATTING FOR FIREBASE_PRIVATE_KEY in `.env.local`:**
//    - **MUST be enclosed in DOUBLE QUOTES (`"..."`)**. Single quotes will NOT work.
//    - Copy the **ENTIRE** private key value from the JSON file, including the exact `-----BEGIN PRIVATE KEY-----` and `-----END PRIVATE KEY-----` lines.
//    - Ensure the newline characters WITHIN the key are represented as literal `\n` (a backslash followed by the letter 'n') **INSIDE** the double quotes. DO NOT use actual line breaks in the `.env.local` file itself.
//    - **VERY IMPORTANT:** Make sure the final `\n` is present immediately after `-----END PRIVATE KEY-----` and **BEFORE** the closing double quote (`"`). There should be nothing between the final `\n` and the closing `"`.
//    - **Correct Example Structure:**
//      FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n[...your key content with \n replacing actual newlines...]\n[...more key content...]\n-----END PRIVATE KEY-----\n"
//    - **Common Mistakes:**
//      - Using single quotes: `FIREBASE_PRIVATE_KEY='...'` (WRONG)
//      - Missing the outer double quotes: `FIREBASE_PRIVATE_KEY=-----BEGIN...` (WRONG)
//      - Using actual line breaks instead of `\n`: (WRONG)
//        ```
//        FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----
//        ...key lines...
//        -----END PRIVATE KEY-----
//        "
//        ```
//      - Missing the FINAL `\n` before the closing quote: `FIREBASE_PRIVATE_KEY="...-----END PRIVATE KEY-----"` (WRONG)
//      - Extra spaces before/after the key within the quotes (e.g., `" -----BEGIN...KEY-----\n "`).
//
// 8. **RESTART YOUR NEXT.JS SERVER** (`npm run dev` or `yarn dev`) after creating or modifying `.env.local`. This is **ESSENTIAL** for Next.js to pick up the changes.
// 9. Add `.env.local` and the service account JSON file (`*.json`) to your `.gitignore` file.
// ========================================================================================================
