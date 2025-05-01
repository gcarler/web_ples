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

        // 1. Check if variables exist and are non-empty strings
        console.log(`DEBUG: Checking environment variables...`);
        console.log(`DEBUG: typeof FIREBASE_PROJECT_ID: ${typeof projectId}`);
        console.log(`DEBUG: typeof FIREBASE_CLIENT_EMAIL: ${typeof clientEmail}`);
        console.log(`DEBUG: typeof FIREBASE_PRIVATE_KEY: ${typeof privateKeyEnv}`); // Log the type

        if (!projectId) console.error('CRITICAL: FIREBASE_PROJECT_ID environment variable is MISSING or empty.');
        if (!clientEmail) console.error('CRITICAL: FIREBASE_CLIENT_EMAIL environment variable is MISSING or empty.');
        if (!privateKeyEnv) console.error('CRITICAL: FIREBASE_PRIVATE_KEY environment variable is MISSING or empty.');
        if (typeof privateKeyEnv !== 'string') console.error(`CRITICAL: FIREBASE_PRIVATE_KEY environment variable is not a string (it's type: ${typeof privateKeyEnv}).`); // Log if not string


        if (!projectId || !clientEmail || !privateKeyEnv || typeof privateKeyEnv !== 'string' || privateKeyEnv.trim() === '') {
            console.error(
                'Firebase Admin SDK Error: CRITICAL - Missing or invalid required environment variables.\n' +
                'Ensure FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, and FIREBASE_PRIVATE_KEY are set correctly in your .env.local file.\n' +
                'FIREBASE_PRIVATE_KEY must be a non-empty string.\n' +
                '>>> SEE DETAILED INSTRUCTIONS AT THE BOTTOM OF THIS FILE. <<<'
            );
            // THROWING ERROR due to missing/invalid config
            throw new Error('Missing or invalid Firebase Admin SDK configuration environment variables.');
        } else {
             console.log('OK: Found non-empty string values for FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, and FIREBASE_PRIVATE_KEY.');
             // Log the start/end of the raw key from env var for debugging quotes/whitespace
             const rawKeyPreviewStart = privateKeyEnv.substring(0, 20);
             const rawKeyPreviewEnd = privateKeyEnv.substring(privateKeyEnv.length - 20);
             console.log(`DEBUG: Raw FIREBASE_PRIVATE_KEY from env - Starts with: "${rawKeyPreviewStart}..." Ends with: "...${rawKeyPreviewEnd}" (Length: ${privateKeyEnv.length})`);
             // Check for leading/trailing whitespace
             if (privateKeyEnv !== privateKeyEnv.trim()) {
                 console.warn('DEBUG: Warning: Raw FIREBASE_PRIVATE_KEY from env appears to have leading or trailing whitespace. This can cause parsing errors.');
             }
             // Check if the key is suspiciously short
             if (privateKeyEnv.length < 200) { // Arbitrary short length check
                 console.warn(`DEBUG: Warning: Raw FIREBASE_PRIVATE_KEY seems unusually short (${privateKeyEnv.length} characters). Ensure the full key was copied.`);
             }
        }

        // 2. Process the private key (replace literal '\\n' with actual newlines)
        let privateKey: string;
        let replacedNewlines = false;
        console.log(`DEBUG: Attempting to process FIREBASE_PRIVATE_KEY...`);
        // Check if the raw env var CONTAINS the literal string "\\n"
        if (privateKeyEnv.includes('\\n')) {
            console.log("DEBUG: Processing FIREBASE_PRIVATE_KEY: Replacing literal string '\\\\n' with actual newline characters ('\\n').");
            privateKey = privateKeyEnv.replace(/\\n/g, '\n');
            replacedNewlines = true; // Flag that replacement happened
        }
        // Check if the raw env var looks like it MIGHT have actual newlines already (less likely in .env but possible)
        else if (privateKeyEnv.includes('\n') && !privateKeyEnv.includes('\\n')) {
            console.warn("DEBUG: Processing FIREBASE_PRIVATE_KEY: Found actual newline characters ('\\n') but not the literal string '\\\\n'. Assuming newlines are already correct. Ensure this is intended in .env.local.");
            privateKey = privateKeyEnv;
        }
        // If neither literal "\\n" nor actual "\n" is found, it's likely malformed for a multi-line PEM key
        else if (!privateKeyEnv.includes('\n') && !privateKeyEnv.includes('\\n')) {
            console.warn("DEBUG: Processing FIREBASE_PRIVATE_KEY: Neither literal '\\\\n' nor actual newline '\\n' found. PEM key might be malformed or on a single line (unlikely). Check .env.local format carefully, especially quoting and inclusion of BEGIN/END markers.");
            privateKey = privateKeyEnv; // Proceed with the raw value but warn
        }
        // Fallback / Unexpected case
        else {
             console.warn("DEBUG: Processing FIREBASE_PRIVATE_KEY: Unexpected format. No literal '\\\\n' found. Proceeding with raw value.");
             privateKey = privateKeyEnv;
        }

        if (replacedNewlines) {
            console.log("DEBUG: Newline replacement ('\\\\n' -> '\\n') was performed.");
        } else {
            console.log("DEBUG: No literal '\\\\n' strings were found to replace. Key used as-is or based on existing '\\n'.");
        }


         // Log the beginning and end of the PROCESSED key for validation (DO NOT log the full key)
         const processedKeyPreviewStart = privateKey.substring(0, 40).replace(/\n/g, '\\n'); // Show newlines as \n in preview
         const processedKeyPreviewEnd = privateKey.substring(privateKey.length - 40).replace(/\n/g, '\\n');
         console.log(`DEBUG: Processed Private Key Preview - Starts with: "${processedKeyPreviewStart}..." Ends with: "...${processedKeyPreviewEnd}" (Length: ${privateKey.length})`);

         // Log if processed key still has whitespace issues AFTER replacement
         if (privateKey !== privateKey.trim()) {
             console.warn('DEBUG: Warning: Processed private key *still* has leading/trailing whitespace after processing. Check the original value in .env.local, especially around quotes.');
         }


        // 3. Prepare credentials object using the processed key
        const serviceAccount = {
            projectId: projectId,
            clientEmail: clientEmail,
            privateKey: privateKey.trim(), // Explicitly trim whitespace before passing to SDK
        };

        // 4. **CRITICAL VALIDATION BEFORE INITIALIZATION**
        // Check the processed key format *before* calling initializeApp
        const trimmedPrivateKeyForValidation = privateKey.trim(); // Use the same trimmed key as passed to SDK
        const startsCorrectly = trimmedPrivateKeyForValidation.startsWith('-----BEGIN PRIVATE KEY-----');
        const endsCorrectly = trimmedPrivateKeyForValidation.endsWith('-----END PRIVATE KEY-----');

        if (!startsCorrectly || !endsCorrectly) {
             console.error(
                'Firebase Admin SDK Error: CRITICAL - Processed FIREBASE_PRIVATE_KEY is INVALID before initialization.\n' +
                `DEBUG (Processed Key Check): Starts with "-----BEGIN PRIVATE KEY-----": ${startsCorrectly}\n` +
                `DEBUG (Processed Key Check): Ends with "-----END PRIVATE KEY-----": ${endsCorrectly}\n` +
                'This means the key value in `.env.local` is fundamentally wrong or the replacement logic failed.\n' +
                '>>> RE-READ AND FOLLOW THE `.env.local` FORMATTING INSTRUCTIONS BELOW VERY CAREFULLY. <<<'
             );
             // DO NOT PROCEED if the key format is clearly wrong here.
             // THROWING ERROR due to invalid key format (BEGIN/END markers)
             throw new Error('Invalid Firebase Private Key format detected before initialization (BEGIN/END markers missing or incorrect). Check .env.local.');
        } else {
            console.log("OK: Processed Private Key pre-validation (start/end markers) PASSED.");
        }


        // 5. Initialize Firebase Admin
        console.log('DEBUG: Attempting admin.initializeApp with processed credentials...');
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
            // databaseURL: `https://${projectId}.firebaseio.com`, // Optional: if using Realtime Database
        });
        console.log('--- Firebase Admin SDK initialized successfully. ---');

    } catch (error: any) {
        // Catch errors during initializeApp, which often include the PEM parsing error
        console.error('--- Firebase Admin SDK Initialization FAILED ---');
        console.error('Error Type:', error.constructor.name); // Log the type of error
        console.error('Error Message:', error.message);

        // Provide more specific feedback if it's a PEM format issue
        if (error.message?.includes('Invalid PEM formatted message') || error.message?.includes('Failed to parse private key')) {
            console.error(
                 '\n\n******************** PEM PARSING ERROR DETECTED ********************\n' +
                 'Hint: The error "Invalid PEM formatted message" or "Failed to parse private key" *STRONGLY* indicates the FIREBASE_PRIVATE_KEY in your .env.local file is MISSING, EMPTY, or INCORRECTLY FORMATTED.\n' +
                 '>>> PLEASE **VERY CAREFULLY** RE-CHECK YOUR `.env.local` FILE FOR **ALL** OF THE FOLLOWING: <<<\n' +
                 '\n' +
                 '1. ✅ Is the **ENTIRE** key value enclosed in **DOUBLE QUOTES** (e.g., FIREBASE_PRIVATE_KEY="...")?\n' +
                 '   -> SINGLE QUOTES (\'...\') WILL NOT WORK.\n' +
                 '   -> NO QUOTES WILL NOT WORK.\n' +
                 '\n' +
                 '2. ✅ Does the value include the *exact* line `-----BEGIN PRIVATE KEY-----` at the very start (inside the quotes)?\n' +
                 '\n' +
                 '3. ✅ Does the value include the *exact* line `-----END PRIVATE KEY-----` at the very end?\n' +
                 '\n' +
                 '4. ✅ Are **ALL** newline characters represented as the **LITERAL STRING `\\n`** (backslash followed by n)?\n' +
                 '   -> DO NOT USE ACTUAL LINE BREAKS IN THE `.env.local` FILE.\n' +
                 '   -> Example segment: `...keypart1\\nkeypart2\\nkeypart3...`\n' +
                 '\n' +
                 '5. ✅ **CRITICAL:** Is the **FINAL `\\n`** PRESENT immediately AFTER `-----END PRIVATE KEY-----` and **INSIDE** the closing double quote (`"`)?\n' +
                 '   -> Correct end: `...-----END PRIVATE KEY-----\\n"`\n' +
                 '   -> Incorrect end: `...-----END PRIVATE KEY-----"` (Missing `\\n`)\n' +
                 '   -> Incorrect end: `...-----END PRIVATE KEY-----\n" ` (Space after `"`)\n' +
                 '\n' +
                 '6. ✅ Are there **NO** extra spaces or characters **BEFORE** `-----BEGIN PRIVATE KEY-----` (inside the quotes)?\n' +
                 '\n' +
                 '7. ✅ Are there **NO** extra spaces or characters **AFTER** the final `\\n"`?\n' +
                 '\n' +
                 '8. ✅ Did you **SAVE** the `.env.local` file?\n' +
                 '\n' +
                 '9. ✅ Did you **RESTART** your Next.js server (e.g., `npm run dev`) **AFTER** saving `.env.local`? (THIS IS REQUIRED)\n' +
                 '\n' +
                 'Refer to the detailed example structure in the comments below this file.\n' +
                 '**********************************************************************\n'
            );
        } else {
             // Log the original error stack for other types of errors
             console.error("Full Error Stack Trace:", error.stack);
        }
        // Re-throw the error to stop the application if initialization fails critically
        // This prevents the app from running with a non-functional Admin SDK.
        // THROWING ERROR due to initialization failure
        throw new Error(`Firebase Admin SDK failed to initialize: ${error.message}`);
    }
} else {
     console.log('Firebase Admin SDK already initialized.');
}

// --- Attempt to get Firestore and Auth instances ---
// Place this *outside* the initialization block to ensure they are accessible
// but handle potential errors if initialization actually failed despite checks.
let adminDb: admin.firestore.Firestore;
let adminAuth: admin.auth.Auth;

try {
    adminDb = admin.firestore();
    adminAuth = admin.auth();
    console.log("Successfully retrieved Firestore and Auth instances from Admin SDK.");
} catch (instanceError: any) {
    // This catch block might be redundant if the throw in the init block stops execution,
    // but it's a safeguard.
    console.error("CRITICAL ERROR: Failed to get Firestore/Auth instance AFTER initialization check.", instanceError);
    console.error("This likely means the Admin SDK initialization failed silently or partially. The application cannot proceed safely.");
    // Ensure the application stops if we can't get DB/Auth instances.
    // THROWING ERROR due to inability to get DB/Auth instances
    throw new Error(`Failed to get Firestore/Auth instances from Firebase Admin SDK: ${instanceError.message}`);
}


export { adminDb, adminAuth, admin };


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
// 7. Add the following lines to your `.env.local` file, replacing placeholders WITH YOUR ACTUAL VALUES:
//
//    FIREBASE_PROJECT_ID=your_project_id_from_json
//    FIREBASE_CLIENT_EMAIL=your_client_email_from_json
//    FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYOUR_PRIVATE_KEY_LINE_1\nYOUR_PRIVATE_KEY_LINE_2...\n...MORE_KEY_LINES...\n-----END PRIVATE KEY-----\n"
//
// **CRITICAL FORMATTING FOR `FIREBASE_PRIVATE_KEY` in `.env.local`:**
//    - **MUST** be enclosed in **DOUBLE QUOTES (`"..."`)**. Single quotes will NOT work.
//    - Copy the **ENTIRE** private key value from the JSON file, starting *exactly* with `-----BEGIN PRIVATE KEY-----` and ending *exactly* with `-----END PRIVATE KEY-----`.
//    - Replace **ALL** actual newline characters within the key block with the **LITERAL STRING `\\n`** (a backslash followed by the letter 'n'). Do **NOT** use actual line breaks in the `.env.local` file itself.
//    - **VERY IMPORTANT:** Ensure the **FINAL LITERAL `\\n`** is present immediately AFTER `-----END PRIVATE KEY-----` and **BEFORE** the closing double quote (`"`). There should be nothing between the final `\\n` and the closing `"`.
//    - NO extra spaces or characters before `-----BEGIN PRIVATE KEY-----`.
//    - NO extra spaces or characters after the final `\\n"`.
//
// **CORRECT Example Structure in `.env.local`:**
//
// ```env
// FIREBASE_PROJECT_ID=my-cool-project-12345
// FIREBASE_CLIENT_EMAIL=firebase-adminsdk-blahblah@my-cool-project-12345.iam.gserviceaccount.com
// FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQDudxr[...]oZ/\nT9PIC0irj2k3g=\n-----END PRIVATE KEY-----\n"
// ```
// (Note: `[...]` represents the bulk of your key content where all original newlines are replaced by `\n`)
//
// **Common Mistakes & How to Fix:**
//    - **Mistake:** Using single quotes: `FIREBASE_PRIVATE_KEY='...'`
//      **Fix:** Change to double quotes: `FIREBASE_PRIVATE_KEY="..."`
//    - **Mistake:** Missing outer double quotes: `FIREBASE_PRIVATE_KEY=-----BEGIN...`
//      **Fix:** Add double quotes around the entire value: `FIREBASE_PRIVATE_KEY="..."`
//    - **Mistake:** Using actual line breaks in `.env.local`:
//      ```env
//      FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----
//      ...key lines...
//      -----END PRIVATE KEY-----
//      "
//      ```
//      **Fix:** Replace ALL line breaks inside the quotes with the literal string `\n`.
//    - **Mistake:** Missing the FINAL `\n` before the closing quote: `FIREBASE_PRIVATE_KEY="...-----END PRIVATE KEY-----"`
//      **Fix:** Add `\n` right after `-----END PRIVATE KEY-----` and before the closing `"`: `FIREBASE_PRIVATE_KEY="...-----END PRIVATE KEY-----\n"`
//    - **Mistake:** Extra spaces inside quotes: `" -----BEGIN...KEY-----\n "`
//      **Fix:** Remove the leading/trailing spaces inside the quotes: `"-----BEGIN...KEY-----\n"`
//
// 8. **SAVE** the `.env.local` file.
// 9. **RESTART YOUR NEXT.JS DEVELOPMENT SERVER** (`npm run dev` or `yarn dev`). This step is **ESSENTIAL** for Next.js to load the new environment variable values. Simply saving the file is not enough.
// 10. Add `.env.local` and the downloaded service account `*.json` file to your `.gitignore` file to prevent committing secrets.
// ========================================================================================================
