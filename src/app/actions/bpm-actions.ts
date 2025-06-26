// src/app/actions/bpm-actions.ts
'use server';

import { ProcessInstanceFirestore, ProcessInstanceFirestoreSchema } from '@/lib/models/bpm';
import * as BpmService from '@/services/bpm-service';
import { adminDb } from '@/lib/firebase/firebase-admin-config';
import { collection, getDocs, query, orderBy, doc, getDoc } from 'firebase/firestore';
import { revalidatePath } from 'next/cache';

const sdkNotInitializedError = { message: "Firebase Admin SDK is not configured. Server-side features are disabled.", success: false };

export async function getProcessInstances(): Promise<ProcessInstanceFirestore[]> {
    if (!adminDb) {
      console.error(sdkNotInitializedError.message);
      return [];
    }
    try {
        const instancesCol = collection(adminDb, 'processInstances');
        const q = query(instancesCol, orderBy('lastUpdatedAt', 'desc'));
        const snapshot = await getDocs(q);

        return snapshot.docs.map(doc => {
            const data = doc.data();
            const dataWithDates = {
                ...data,
                startedAt: data.startedAt?.toDate(),
                completedAt: data.completedAt?.toDate(),
                failedAt: data.failedAt?.toDate(),
                lastUpdatedAt: data.lastUpdatedAt?.toDate(),
            };

            const parsed = ProcessInstanceFirestoreSchema.safeParse(dataWithDates);
            if (!parsed.success) {
                console.warn(`Invalid process instance data in Firestore ${doc.id}:`, parsed.error);
                return {
                    id: doc.id,
                    processDefinitionId: 'unknown',
                    processDefinitionName: 'Unknown Process',
                    status: 'Failed',
                    lastUpdatedAt: new Date(),
                } as ProcessInstanceFirestore;
            }
            return { id: doc.id, ...parsed.data };
        });
    } catch (error) {
        console.error('BPM Action Error: Failed to fetch process instances:', error);
        return [];
    }
}

export async function resumeProcessInstance(processInstanceId: string): Promise<{ message: string | null; success: boolean }> {
    if (!adminDb) {
      console.error(sdkNotInitializedError.message);
      return sdkNotInitializedError;
    }
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

        const updateData = {
            status: 'Running',
            currentTaskName: 'Resumed - Checking Next Step',
            errorDetails: '',
            failedAt: undefined, // Clear failed date
        };

        const success = await BpmService.updateProcessInstance(processInstanceId, updateData);

        if (success) {
             console.log(`Process instance ${processInstanceId} resumed.`);
             revalidatePath('/admin/bpm/processes');
             return { message: 'Process instance resumed successfully.', success: true };
        } else {
            return { message: 'Failed to update process instance status.', success: false };
        }
    } catch (error) {
        console.error(`BPM Action Error: Failed to resume process instance ${processInstanceId}:`, error);
        return { message: 'An error occurred while resuming the process.', success: false };
    }
}
