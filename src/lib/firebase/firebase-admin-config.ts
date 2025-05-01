// src/lib/firebase/firebase-admin-config.ts
import admin from 'firebase-admin';
import { Timestamp } from 'firebase/firestore'; // Ensure Timestamp is imported if used later

// Ensure Firebase Admin SDK is initialized only once
if (!admin.apps.length) {
    try {
        console.log('--- Firebase Admin SDK Initialization Start ---');
        // Explicitly check environment variables before using them
        const projectId = process.env.FIREBASE_PROJECT_ID;
        const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
        const privateKeyEnv = process.env.FIREBASE_PRIVATE_KEY; // This is the raw value from .env.local

        // 1. Check if variables exist and are non-empty strings
        console.log(`DEBUG: Checking environment variables...`);
        console.log(`DEBUG: typeof FIREBASE_PROJECT_ID: ${typeof projectId}, Value: ${projectId ? 'Present' : 'MISSING/Empty'}`);
        console.log(`DEBUG: typeof FIREBASE_CLIENT_EMAIL: ${typeof clientEmail}, Value: ${clientEmail ? 'Present' : 'MISSING/Empty'}`);
        console.log(`DEBUG: typeof FIREBASE_PRIVATE_KEY: ${typeof privateKeyEnv}, Value: ${privateKeyEnv ? 'Present' : 'MISSING/Empty'}`);

        if (!projectId || !clientEmail || !privateKeyEnv || typeof privateKeyEnv !== 'string' || privateKeyEnv.trim() === '') {
            const missingVars = [
                !projectId && 'FIREBASE_PROJECT_ID',
                !clientEmail && 'FIREBASE_CLIENT_EMAIL',
                (!privateKeyEnv || typeof privateKeyEnv !== 'string' || privateKeyEnv.trim() === '') && 'FIREBASE_PRIVATE_KEY',
            ].filter(Boolean).join(', ');

            console.error(
                'Firebase Admin SDK Error: CRITICAL - Missing or invalid required environment variables.\n' +
                `Missing/Invalid Vars: ${missingVars}\n` +
                'Ensure FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, and FIREBASE_PRIVATE_KEY are set correctly in your .env.local file.\n' +
                'FIREBASE_PRIVATE_KEY must be a non-empty string.\n' +
                '>>> SEE DETAILED INSTRUCTIONS AT THE BOTTOM OF THIS FILE. <<<'
            );
            throw new Error(`Missing or invalid Firebase Admin SDK config env vars: ${missingVars}. SEE DETAILED INSTRUCTIONS IN firebase-admin-config.ts`);
        } else {
             console.log('OK: Found non-empty string values for required Firebase Admin env vars.');
             // **Log Raw Key Preview**
             const rawKeyPreviewStart = privateKeyEnv.substring(0, 40).replace(/\n/g, '\\n'); // Show raw newlines as \n for clarity
             const rawKeyPreviewEnd = privateKeyEnv.substring(privateKeyEnv.length - 40).replace(/\n/g, '\\n');
             console.log(`DEBUG: Raw FIREBASE_PRIVATE_KEY from env - Starts: "${rawKeyPreviewStart}..." Ends: "...${rawKeyPreviewEnd}" (Length: ${privateKeyEnv.length})`);

             // **More detailed RAW key format checks**
             const startsWithQuote = privateKeyEnv.startsWith('"');
             const endsWithQuote = privateKeyEnv.endsWith('"');
             const includesLiteralNewline = privateKeyEnv.includes('\\n');
             const endsWithLiteralNewlineQuote = privateKeyEnv.endsWith('\\n"');
             const includesBeginMarker = privateKeyEnv.includes('-----BEGIN PRIVATE KEY-----');
             const includesEndMarker = privateKeyEnv.includes('-----END PRIVATE KEY-----');

             console.log(`DEBUG: Raw Key Checks: StartsWith("): ${startsWithQuote}, EndsWith("): ${endsWithQuote}, Includes literal \\\\n: ${includesLiteralNewline}, EndsWith \\\\n": ${endsWithLiteralNewlineQuote}, Includes BEGIN marker: ${includesBeginMarker}, Includes END marker: ${includesEndMarker}`);

             if (!startsWithQuote || !endsWithQuote) {
                 console.warn("DEBUG: WARNING! Raw FIREBASE_PRIVATE_KEY from env does NOT seem to be enclosed in DOUBLE QUOTES (\"). This is REQUIRED in `.env.local`.");
             }
             if (!includesLiteralNewline) {
                 console.warn("DEBUG: WARNING! Raw FIREBASE_PRIVATE_KEY from env does NOT contain the literal string '\\\\n'. The key usually requires escaped newlines (\\\\n) within double quotes in .env.local. Actual newlines might cause parsing issues.");
             }
              if (!includesBeginMarker) {
                 console.warn('DEBUG: WARNING! Raw FIREBASE_PRIVATE_KEY from env is MISSING the "-----BEGIN PRIVATE KEY-----" marker. Check for typos or incomplete copy-paste.');
              }
               if (!includesEndMarker) {
                 console.warn('DEBUG: WARNING! Raw FIREBASE_PRIVATE_KEY from env is MISSING the "-----END PRIVATE KEY-----" marker. Check for typos or incomplete copy-paste.');
              }
             if (endsWithQuote && !endsWithLiteralNewlineQuote) {
                 console.warn('DEBUG: WARNING! Raw FIREBASE_PRIVATE_KEY from env appears to end with `"` BUT IS MISSING the crucial `\\\\n` just before it. The correct ending in `.env.local` should be `...KEY-----\\\\n"`.');
             }
        }

        // 2. **PROCESS the private key:** Replace literal '\\n' with actual newline characters ('\n')
        // This is essential because .env files store `\n` as the literal characters `\` and `n`.
        // The firebase-admin library expects actual newline characters.
        // Also, remove the surrounding double quotes if they exist from the .env.local value.
        console.log(`DEBUG: Processing FIREBASE_PRIVATE_KEY: Removing surrounding quotes (if present) and replacing literal '\\\\n' with actual newline '\\n'...`);
        let processedKey = privateKeyEnv;
        if (processedKey.startsWith('"') && processedKey.endsWith('"')) {
            processedKey = processedKey.substring(1, processedKey.length - 1);
             console.log('DEBUG: Removed surrounding double quotes.');
        }
        processedKey = processedKey.replace(/\\n/g, '\n');
        console.log(`DEBUG: Newline replacement finished. Processed key length: ${processedKey.length}`);

        // Log the processed key preview for validation
        const processedKeyPreviewStart = processedKey.substring(0, 40).replace(/\n/g, '\\n'); // Display newlines as \n again for readability in logs
        const processedKeyPreviewEnd = processedKey.substring(processedKey.length - 40).replace(/\n/g, '\\n');
        console.log(`DEBUG: Processed Private Key Preview (after quote removal & newline replace) - Starts: "${processedKeyPreviewStart}..." Ends: "...${processedKeyPreviewEnd}"`);


        // 3. **CRITICAL VALIDATION BEFORE INITIALIZATION** (After processing)
        // Trim potential whitespace *after* newline replacement and quote removal.
        console.log(`DEBUG: Trimming processed key...`);
        const trimmedPrivateKey = processedKey.trim();
        console.log(`DEBUG: Processed key trimmed. Length now: ${trimmedPrivateKey.length}`);

        const startsCorrectly = trimmedPrivateKey.startsWith('-----BEGIN PRIVATE KEY-----');
        const endsCorrectly = trimmedPrivateKey.endsWith('-----END PRIVATE KEY-----');

        if (!startsCorrectly || !endsCorrectly) {
             const formatErrorReason = `${!startsCorrectly ? 'Missing/incorrect "-----BEGIN PRIVATE KEY-----" marker.' : ''} ${!endsCorrectly ? 'Missing/incorrect "-----END PRIVATE KEY-----" marker.' : ''}`.trim();
             console.error(
                'Firebase Admin SDK Error: CRITICAL - PROCESSED & TRIMMED FIREBASE_PRIVATE_KEY is INVALID before initialization.\n' +
                `Reason: ${formatErrorReason}\n` +
                'This usually means the key value in `.env.local` is fundamentally wrong OR the `\\n` processing failed unexpectedly.\n' +
                '>>> RE-READ AND FOLLOW THE `.env.local` FORMATTING INSTRUCTIONS BELOW VERY CAREFULLY. PAY SPECIAL ATTENTION TO DOUBLE QUOTES AND `\\\\n`. <<<' +
                 '\n>>> CHECK CONSOLE LOGS for "Raw Key Checks" and "Processed Private Key Preview" for clues. <<<'
             );
             // THROW error with specific instructions
             throw new Error(
                'Invalid Firebase Private Key format detected AFTER processing (BEGIN/END markers missing/incorrect).\n' +
                '>>> PLEASE **VERY CAREFULLY** CHECK THE `FIREBASE_PRIVATE_KEY` FORMAT IN YOUR `.env.local` FILE - SEE INSTRUCTIONS IN `firebase-admin-config.ts` AND CHECK CONSOLE LOGS. <<<'
             );
        } else {
            console.log("OK: Processed & Trimmed Private Key pre-validation (start/end markers) PASSED.");
        }


        // 4. Prepare credentials object using the PROCESSED and TRIMMED key
        const serviceAccount = {
            projectId: projectId,
            clientEmail: clientEmail,
            privateKey: trimmedPrivateKey, // Use the fully processed and validated key
        };

        // **Enhanced Debugging**: Log the final structure being passed
        console.log('DEBUG: Final Service Account object prepared for admin.credential.cert:');
        console.log(`DEBUG:   projectId: ${serviceAccount.projectId}`);
        console.log(`DEBUG:   clientEmail: ${serviceAccount.clientEmail}`);
        // Previewing the key one last time before it goes into the cert function
        const finalKeyPreviewStart = serviceAccount.privateKey.substring(0, 40).replace(/\n/g, '\\n');
        const finalKeyPreviewEnd = serviceAccount.privateKey.substring(serviceAccount.privateKey.length - 40).replace(/\n/g, '\\n');
        console.log(`DEBUG:   privateKey (final preview): Starts: "${finalKeyPreviewStart}..." Ends: "...${finalKeyPreviewEnd}" (Length: ${serviceAccount.privateKey.length})`);


        // 5. Initialize Firebase Admin
        console.log('DEBUG: Attempting admin.initializeApp with final processed credentials...');
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
            // databaseURL: `https://${projectId}.firebaseio.com`, // Optional
        });
        console.log('--- Firebase Admin SDK initialized successfully. ---');

    } catch (error: any) {
        console.error('--- Firebase Admin SDK Initialization FAILED ---');
        console.error('Error Type:', error.constructor.name);
        console.error('Error Message:', error.message);

        // Check if the error message specifically indicates PEM parsing failure
        const isPemError = error.message?.includes('Invalid PEM formatted message') || error.message?.includes('Failed to parse private key');

        let finalErrorMessage = `Firebase Admin SDK failed to initialize: ${error.message}`;

        if (isPemError) {
            finalErrorMessage +=
                 '\n\n******************** PEM PARSING ERROR DETECTED ********************\n' +
                 'Hint: This *STRONGLY* indicates the FIREBASE_PRIVATE_KEY in your .env.local file is MISSING, EMPTY, or INCORRECTLY FORMATTED.\n' +
                 '>>> PLEASE **VERY CAREFULLY** RE-CHECK YOUR `.env.local` FILE FOR **ALL** OF THE FOLLOWING: <<<\n' +
                 '\n' +
                 '1. ✅ Is the **ENTIRE** key value enclosed in **DOUBLE QUOTES** (e.g., FIREBASE_PRIVATE_KEY="...")?\n' +
                 '   -> SINGLE QUOTES (\'...\') or NO QUOTES WILL NOT WORK.\n' +
                 '\n' +
                 '2. ✅ Does the value start *exactly* with `-----BEGIN PRIVATE KEY-----` (inside the quotes)?\n' +
                 '\n' +
                 '3. ✅ Does the value end *exactly* with `-----END PRIVATE KEY-----`?\n' +
                 '\n' +
                 '4. ✅ Are **ALL** newline characters represented as the **LITERAL STRING `\\\\n`** (backslash followed by n)?\n' +
                 '   -> Example segment: `...keypart1\\\\nkeypart2\\\\nkeypart3...`\n' +
                 '\n' +
                 '5. ✅ **CRITICAL:** Is the **FINAL `\\\\n`** PRESENT immediately AFTER `-----END PRIVATE KEY-----` and **INSIDE** the closing double quote (`"`)?\n' +
                 '   -> Correct end: `...-----END PRIVATE KEY-----\\\\n"`\n' +
                 '   -> Incorrect end: `...-----END PRIVATE KEY-----"` (Missing `\\\\n`)\n' +
                 '\n' +
                 '6. ✅ Are there **NO** extra spaces or characters **BEFORE** `-----BEGIN PRIVATE KEY-----` (inside the quotes)?\n' +
                 '\n' +
                 '7. ✅ Are there **NO** extra spaces or characters **AFTER** the final `\\\\n"`?\n' +
                 '\n' +
                 '8. ✅ Did you **SAVE** the `.env.local` file?\n' +
                 '\n' +
                 '9. ✅ Did you **RESTART** your Next.js server (`npm run dev`) **AFTER** saving `.env.local`? (THIS IS REQUIRED)\n' +
                 '\n' +
                 'Refer to the detailed example structure in the comments below this file.\n' +
                 'Review the "DEBUG: Raw FIREBASE_PRIVATE_KEY from env" log above to see exactly what the code is reading.\n' +
                 'Review the "DEBUG: Processed Private Key Preview" log to see the key *after* newline replacement.\n'+
                 'Review the "DEBUG: Final Service Account object" log to see exactly what is passed to `admin.credential.cert()`.\n'+
                 '**********************************************************************\n';
        } else {
             // Log full stack for other unexpected errors
             console.error("Full Error Stack Trace:", error.stack);
        }

        // IMPORTANT: Re-throw the error to prevent the application from proceeding in a broken state.
        throw new Error(finalErrorMessage);
    }
} else {
     console.log('Firebase Admin SDK already initialized.');
}

// --- Attempt to get Firestore and Auth instances ---
// It's crucial this part runs *after* the initialization block.
let adminDb: admin.firestore.Firestore;
let adminAuth: admin.auth.Auth;

try {
    // Check again if the app was actually initialized before trying to get services
    if (!admin.apps.length) {
        // This should ideally not happen if the above logic is correct, but as a safeguard:
        throw new Error("Attempted to get Firestore/Auth instance, but Firebase Admin SDK was not initialized (admin.apps.length is 0).");
    }
    adminDb = admin.firestore();
    adminAuth = admin.auth();
    console.log("OK: Successfully retrieved Firestore and Auth instances from Admin SDK.");
} catch (instanceError: any) {
    console.error("CRITICAL ERROR: Failed to get Firestore/Auth instance AFTER initialization check.", instanceError);
    console.error("This likely means the Admin SDK initialization failed silently or partially, or there's a deeper issue. The application cannot proceed safely.");
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
//    FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\\nYOUR_PRIVATE_KEY_LINE_1\\nYOUR_PRIVATE_KEY_LINE_2...\\n...MORE_KEY_LINES...\\n-----END PRIVATE KEY-----\\n"
//
// **CRITICAL FORMATTING FOR `FIREBASE_PRIVATE_KEY` in `.env.local`:**
//    - **MUST** be enclosed in **DOUBLE QUOTES (`"..."`)**. Single quotes or no quotes will NOT work.
//    - Copy the **ENTIRE** private key value, starting *exactly* with `-----BEGIN PRIVATE KEY-----` and ending *exactly* with `-----END PRIVATE KEY-----`.
//    - Replace **ALL** actual newline characters within the key block with the **LITERAL STRING `\\\\n`** (two characters: backslash, then n).
//    - **VERY IMPORTANT:** Ensure the **FINAL LITERAL `\\\\n`** is present immediately AFTER `-----END PRIVATE KEY-----` and **BEFORE** the closing double quote (`"`).
//    - NO extra spaces/chars before `-----BEGIN PRIVATE KEY-----` (inside the quotes).
//    - NO extra spaces/chars after the final `\\\\n"`.
//
// **CORRECT Example Structure in `.env.local`:**
//
// ```env
// FIREBASE_PROJECT_ID=my-cool-project-12345
// FIREBASE_CLIENT_EMAIL=firebase-adminsdk-blahblah@my-cool-project-12345.iam.gserviceaccount.com
// FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQDudxr[...]oZ/\\nT9PIC0irj2k3g=\\n-----END PRIVATE KEY-----\\n"
// ```
// (Note: `[...]` represents the bulk of your key where original newlines are replaced by `\\\\n`)
//
// **Common Mistakes:**
//    - Using single quotes or no quotes.
//    - Missing `-----BEGIN...` or `-----END...` markers.
//    - Using actual line breaks instead of the literal string `\\\\n`.
//    - Missing the **FINAL `\\\\n`** before the closing quote.
//    - Extra spaces inside the quotes.
//    - Copying extra characters before or after the key.
//
// 8. **SAVE** the `.env.local` file.
// 9. **RESTART YOUR NEXT.JS DEVELOPMENT SERVER** (`npm run dev` or `yarn dev`). THIS IS ESSENTIAL.
// 10. Add `.env.local` and the downloaded `*.json` file to your `.gitignore`.
// ========================================================================================================
