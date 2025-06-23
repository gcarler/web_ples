// src/services/bpm-service.ts
'use server'; // Mark this module for server-side execution

import { ProcessInstance, ProcessInstanceFirestore, ProcessInstanceOutputSchema, ProcessInstanceInput } from '@/lib/models/bpm';
import { OpportunityFirestore } from '@/lib/models/opportunity'; // Import Opportunity type
import { Order } from '@/lib/models/erp'; // Import Order type
import { adminDb } from '@/lib/firebase/firebase-admin-config';
import { addDoc, Timestamp, updateDoc, serverTimestamp, getDoc, query, where, getDocs, limit, collection, doc, FirestoreDataConverter, QueryDocumentSnapshot, SnapshotOptions, DocumentData } from 'firebase/firestore';
import { checkProductStock, createErpOrder, getErpOrderDetails, updateErpOrderStatus } from './erp-service'; // Import ERP service
import { z } from 'zod';

const PROCESS_DEFINITIONS = {
    OPPORTUNITY_TO_CASH: 'opportunity-to-cash-v1',
    SHIPPING_PROCESS: 'shipping-process-v1',
};
const PROCESS_INSTANCES_COLLECTION = 'processInstances';

const processInstanceConverter: FirestoreDataConverter<ProcessInstanceFirestore> = {
    toFirestore(processInstance: Omit<ProcessInstanceFirestore, 'id'>): DocumentData {
        const { startedAt, completedAt, failedAt, lastUpdatedAt, ...rest } = processInstance;
        const dataToStore: DocumentData = { ...rest };
        if (startedAt) dataToStore.startedAt = Timestamp.fromDate(startedAt);
        if (completedAt) dataToStore.completedAt = Timestamp.fromDate(completedAt);
        if (failedAt) dataToStore.failedAt = Timestamp.fromDate(failedAt);
        if (lastUpdatedAt) dataToStore.lastUpdatedAt = Timestamp.fromDate(lastUpdatedAt);
        return dataToStore;
    },
    fromFirestore(snapshot: QueryDocumentSnapshot, options: SnapshotOptions): ProcessInstanceFirestore {
        const data = snapshot.data(options);
        const dataWithDates = {
            ...data,
            startedAt: data.startedAt?.toDate(),
            completedAt: data.completedAt?.toDate(),
            failedAt: data.failedAt?.toDate(),
            lastUpdatedAt: data.lastUpdatedAt?.toDate(),
        };
        const parsedData = ProcessInstanceOutputSchema.parse(dataWithDates);
        return { id: snapshot.id, ...parsedData };
    },
};

const processInstancesCol = collection(adminDb, PROCESS_INSTANCES_COLLECTION).withConverter(processInstanceConverter);

export async function startOpportunityToCashProcess(opportunityId: string, opportunityData: OpportunityFirestore): Promise<boolean> {
    console.log(`BPM Service: Starting Opportunity-to-Cash process for Opportunity ID: ${opportunityId}`);    
    try {
        const processInstanceData: ProcessInstanceInput = {
            processDefinitionId: PROCESS_DEFINITIONS.OPPORTUNITY_TO_CASH,
            processDefinitionName: 'Opportunity To Cash',
            status: 'Running',
            correlationId: opportunityId,
            variables: {
                opportunityId: opportunityId,
                contactId: opportunityData.contactId,
                opportunityAmount: opportunityData.amount,
            },
            startedAt: new Date(),
            currentTaskName: 'Verify Opportunity Data',
        };

        const docRef = await addDoc(collection(adminDb, PROCESS_INSTANCES_COLLECTION), {
            ...processInstanceData,
            startedAt: Timestamp.fromDate(processInstanceData.startedAt as Date),
            lastUpdatedAt: serverTimestamp(),
        });
        const processInstanceId = docRef.id;
        console.log(`BPM Process Instance created with ID: ${processInstanceId}`);

        console.log(`BPM Service: Transitioning to Create ERP Order step for process ${processInstanceId}`);
        const orderItems = [{ productId: 'prod_1', productName: 'PLES Consulting Hour', sku: 'PLES-CONS-01', quantity: opportunityData.amount && opportunityData.amount > 1000 ? 10 : 1, price: 150 }];
        const subtotal = orderItems.reduce((sum, item) => sum + item.quantity * item.price, 0);
        const totalAmount = subtotal;

        const erpOrderData: Omit<Order, 'id' | 'createdAt' | 'updatedAt'> = {
            orderNumber: `ORD-${opportunityId.slice(-6)}`,
            contactId: opportunityData.contactId,
            opportunityId: opportunityId,
            orderDate: new Date(),
            items: orderItems,
            subtotal: subtotal,
            totalAmount: totalAmount,
            status: 'Pending',
            paymentStatus: 'Pending',
        };

        const erpOrderId = await createErpOrder(erpOrderData);

        if (erpOrderId) {
            console.log(`BPM Service: ERP Order ${erpOrderId} created successfully.`);
            await updateProcessInstance(processInstanceId, {
                 variables: { ...processInstanceData.variables, erpOrderId: erpOrderId },
                 currentTaskName: 'ERP Order Created, Awaiting Payment/Shipment',
            });
        } else {
            console.error(`BPM Service Error: Failed to create ERP Order for Opportunity ${opportunityId}.`);
            await updateProcessInstance(processInstanceId, {
                 status: 'Failed',
                 errorDetails: 'Failed to create ERP order.',
                 failedAt: new Date(),
                 currentTaskName: 'Process Failed',
            });
            return false;
        }
        return true;
    } catch (error) {
        console.error('BPM Service Error: Failed to start Opportunity-to-Cash process:', error);
        return false;
    }
}

export async function startShippingProcess(orderId: string): Promise<boolean> {
    console.log(`BPM Service: Starting Shipping Process for Order ID: ${orderId}`);
     try {
        const existingProcess = await findProcessInstanceByCorrelationId(orderId, PROCESS_DEFINITIONS.SHIPPING_PROCESS);
        if (existingProcess) {
            console.log(`Shipping process already exists for order ${orderId}. ID: ${existingProcess.id}`);
            return true;
        }

        const processInstanceData: ProcessInstanceInput = {
            processDefinitionId: PROCESS_DEFINITIONS.SHIPPING_PROCESS,
            processDefinitionName: 'Shipping Process',
            status: 'Running',
            correlationId: orderId,
            variables: { orderId: orderId },
            startedAt: new Date(),
            currentTaskName: 'Check Inventory Availability',
        };

        const docRef = await addDoc(collection(adminDb, PROCESS_INSTANCES_COLLECTION), {
            ...processInstanceData,
            startedAt: Timestamp.fromDate(processInstanceData.startedAt as Date),
            lastUpdatedAt: serverTimestamp(),
        });
        const processInstanceId = docRef.id;
        console.log(`BPM Shipping Process Instance created with ID: ${processInstanceId}`);

        console.log(`BPM Service: Transitioning to Check Inventory step for process ${processInstanceId}`);
        const orderDetails = await getErpOrderDetails(orderId);
        if (!orderDetails) {
             console.error(`BPM Service Error: Could not fetch details for order ${orderId} to check inventory.`);
             await updateProcessInstance(processInstanceId, { status: 'Failed', errorDetails: 'Failed to fetch order details', failedAt: new Date(), currentTaskName: 'Process Failed' });
             return false;
        }

        let allItemsAvailable = true;
        for (const item of orderDetails.items) {
            const stockInfo = await checkProductStock(item.productId);
            if (!stockInfo || stockInfo.stockLevel < item.quantity) {
                allItemsAvailable = false;
                console.warn(`BPM Service: Insufficient stock for product ${item.productId} (Order ${orderId}). Required: ${item.quantity}, Available: ${stockInfo?.stockLevel ?? 0}`);
                await updateProcessInstance(processInstanceId, {
                     status: 'Suspended',
                     currentTaskName: 'Insufficient Stock - Manual Intervention Required',
                     variables: { ...(processInstanceData.variables || {}), missingProductId: item.productId, requiredQty: item.quantity, availableQty: stockInfo?.stockLevel ?? 0 },
                });
                break;
            }
        }

        if (allItemsAvailable) {
             console.log(`BPM Service: All items available for order ${orderId}. Proceeding to update status.`);
              const erpUpdateSuccess = await updateErpOrderStatus(orderId, 'Awaiting Shipment');
              if (!erpUpdateSuccess) {
                   console.error(`BPM Service Error: Failed to update ERP order ${orderId} status to Awaiting Shipment.`);
                   await updateProcessInstance(processInstanceId, { status: 'Failed', errorDetails: 'Failed to update ERP order status.', failedAt: new Date(), currentTaskName: 'Process Failed' });
                   return false;
              }
              await updateProcessInstance(processInstanceId, { currentTaskName: 'Ready for Dispatch' });
        }
        return true;
     } catch (error) {
        console.error('BPM Service Error: Failed to start Shipping Process:', error);
        return false;
     }
}

export async function updateProcessInstance(processInstanceId: string, updates: Partial<ProcessInstanceInput>): Promise<boolean> {
    console.log(`BPM Service: Updating Process Instance ${processInstanceId} in Firestore`);
    if (!processInstanceId) {
        console.error("BPM Service Error: Invalid processInstanceId provided for update.");
        return false;
    }
    try {
        const processRef = doc(adminDb, 'processInstances', processInstanceId);
        
        const { failedAt, ...restOfUpdates } = updates;
        const dataToUpdate: Record<string, any> = { ...restOfUpdates };

        if (failedAt) {
            dataToUpdate.failedAt = Timestamp.fromDate(failedAt);
        }

        if (updates.variables) {            
            const docSnap = await getDoc(processRef);
            if (docSnap.exists()) {
                const existingData = docSnap.data();
                dataToUpdate.variables = { ...(existingData?.variables || {}), ...updates.variables };
            }
        }

        dataToUpdate.lastUpdatedAt = serverTimestamp();

        await updateDoc(processRef, dataToUpdate);
        console.log(`BPM Process Instance ${processInstanceId} updated successfully.`);
        return true;
    } catch (error) {
        console.error(`BPM Service Error: Failed to update process instance ${processInstanceId}:`, error);
        return false;
    }
}

export async function findProcessInstanceByCorrelationId(correlationId: string, processDefinitionId: string): Promise<ProcessInstanceFirestore | null> {
    console.log(`BPM Service: Finding process instance by correlationId=${correlationId}, definitionId=${processDefinitionId}`);
    if (!correlationId || !processDefinitionId) return null;

    try {
        const q = query(
            processInstancesCol,
            where('correlationId', '==', correlationId),
            where('processDefinitionId', '==', processDefinitionId),
            limit(1)
        );
        const snapshot = await getDocs(q);        
        
        if (snapshot.empty) {
            console.log(`No process instance found for correlationId=${correlationId}, definitionId=${processDefinitionId}`);
            return null;
        }

        return snapshot.docs[0].data();
    } catch (error) {
        console.error(`Error finding process instance by correlation ID ${correlationId}:`, error);
        return null;
    }
}
