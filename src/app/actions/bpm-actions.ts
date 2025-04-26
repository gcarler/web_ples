// src/app/actions/bpm-actions.ts
'use server';

import { ProcessInstance, ProcessInstanceFirestore, ProcessInstanceFirestoreSchema } from '@/lib/models/bpm';
import * as BpmService from '@/services/bpm-service'; // Import functions from BPM service which now use Firestore
import { adminDb } from '@/lib/firebase/firebase-admin-config';
import { collection, getDocs, query, orderBy, Timestamp, getDoc, doc, serverTimestamp } from 'firebase/firestore';
import { revalidatePath } from 'next/cache';

/**
 * Fetches all process instances from Firestore.
 * @returns A list of process instances.
 */
export async function getProcessInstances(): Promise<ProcessInstanceFirestore[]> {
    console.log("BPM Action: Fetching process instances from Firestore");
    try {
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
 * Updates the process instance status in Firestore.
 * @param processInstanceId The ID of the process instance to resume/retry.
 * @returns Object indicating success and a message.
 */
export async function resumeProcessInstance(processInstanceId: string): Promise<{ message: string | null; success: boolean }> {
    console.log(`BPM Action: Attempting to resume process instance ${processInstanceId} in Firestore`);
    try {
        const instanceRef = doc(adminDb, 'processInstances', processInstanceId);
        const instanceSnap = await getDoc(instanceRef);

        if (!instanceSnap.exists()) {
            return { message: 'Process instance not found.', success: false };
        }

        const instanceData = instanceSnap.data();
        if (instanceData.status !== 'Suspended' && instanceData.status !== 'Failed') {
           return { message: `Process can only be resumed if Suspended or Failed. Current status: ${instanceData.status}`, success: false };
        }

        // In a real system, this would trigger logic based on the process definition
        // and current task. For now, just reset status and clear error.
        const updateData: Partial<ProcessInstanceFirestore> = {
            status: 'Running',
            currentTaskName: 'Resumed - Checking Next Step', // Generic resumption task name
            errorDetails: '', // Clear previous error
            failedAt: undefined, // Clear failed timestamp
            // 'lastUpdatedAt' will be handled by the service using serverTimestamp
        };

        // Call the BPM service to handle the update (ensures serverTimestamp)
        const success = await BpmService.updateProcessInstance(processInstanceId, updateData);

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
