// src/app/actions/bpm-actions.ts
'use server';

import { ProcessInstance, ProcessInstanceFirestore, ProcessInstanceFirestoreSchema } from '@/lib/models/bpm';
import * as BpmService from '@/services/bpm-service'; // Import functions from BPM service
import { adminDb } from '@/lib/firebase/firebase-admin-config';
import { collection, getDocs, query, orderBy, Timestamp } from 'firebase/firestore';
import { revalidatePath } from 'next/cache';

/**
 * Fetches all process instances from the system.
 * In a real system, this might include pagination and filtering.
 * @returns A list of process instances.
 */
export async function getProcessInstances(): Promise<ProcessInstanceFirestore[]> {
    console.log("BPM Action: Fetching process instances");
    try {
        // This would query the 'processInstances' collection in Firestore
        const instancesCol = collection(adminDb, 'processInstances');
        const q = query(instancesCol, orderBy('lastUpdatedAt', 'desc')); // Order by most recently updated
        const snapshot = await getDocs(q);

        const instances: ProcessInstanceFirestore[] = snapshot.docs.map(doc => {
            const data = doc.data();
             // Ensure Timestamps are correctly handled before parsing
             if (data.startedAt && !(data.startedAt instanceof Timestamp)) {
                 data.startedAt = Timestamp.fromMillis(data.startedAt.seconds * 1000);
             }
             if (data.completedAt && !(data.completedAt instanceof Timestamp)) {
                 data.completedAt = Timestamp.fromMillis(data.completedAt.seconds * 1000);
             }
             if (data.failedAt && !(data.failedAt instanceof Timestamp)) {
                 data.failedAt = Timestamp.fromMillis(data.failedAt.seconds * 1000);
             }
             if (data.lastUpdatedAt && !(data.lastUpdatedAt instanceof Timestamp)) {
                 data.lastUpdatedAt = Timestamp.fromMillis(data.lastUpdatedAt.seconds * 1000);
             }

            const parsed = ProcessInstanceFirestoreSchema.safeParse(data);
            if (!parsed.success) {
                console.warn(`Invalid process instance data in Firestore ${doc.id}:`, parsed.error);
                // Provide default/fallback values
                return {
                    id: doc.id,
                    processDefinitionId: 'unknown',
                    status: 'Failed', // Indicate issue
                    lastUpdatedAt: Timestamp.now(), // Use current time as fallback
                } as ProcessInstanceFirestore;
            }
            return { id: doc.id, ...parsed.data };
        });
        return instances;
    } catch (error) {
        console.error('BPM Action Error: Failed to fetch process instances:', error);
        return [];
    }
}

/**
 * Manually triggers a re-check or retry for a suspended or failed process instance.
 * (This is a simplified example; real BPM engines have more sophisticated retry mechanisms)
 * @param processInstanceId The ID of the process instance to resume/retry.
 * @returns Object indicating success and a message.
 */
export async function resumeProcessInstance(processInstanceId: string): Promise<{ message: string | null; success: boolean }> {
    console.log(`BPM Action: Attempting to resume process instance ${processInstanceId}`);
    try {
        // 1. Fetch the process instance data (TODO: Implement findProcessInstanceById in bpm-service or here)
        // const instance = await BpmService.getProcessInstanceDetails(processInstanceId);
        // if (!instance) {
        //     return { message: 'Process instance not found.', success: false };
        // }
        // if (instance.status !== 'Suspended' && instance.status !== 'Failed') {
        //     return { message: 'Process can only be resumed if Suspended or Failed.', success: false };
        // }

        // 2. Logic to determine what to do next (highly dependent on the process)
        //    - If suspended due to stock, maybe re-check stock?
        //    - If failed due to external API, maybe retry the API call?
        //    For this example, we'll just set it back to 'Running' and update the task name.

        const success = await BpmService.updateProcessInstance(processInstanceId, {
            status: 'Running',
            currentTaskName: 'Resumed - Checking Next Step', // Generic resumption task name
            errorDetails: '', // Clear previous error
            failedAt: undefined, // Clear failed timestamp
            lastUpdatedAt: Timestamp.now(),
        });

        if (success) {
             console.log(`Process instance ${processInstanceId} resumed.`);
             revalidatePath('/admin/bpm/processes'); // Revalidate the list page
             return { message: 'Process instance resumed successfully.', success: true };
        } else {
            return { message: 'Failed to update process instance status.', success: false };
        }

    } catch (error) {
        console.error(`BPM Action Error: Failed to resume process instance ${processInstanceId}:`, error);
        return { message: 'An error occurred while resuming the process.', success: false };
    }
}