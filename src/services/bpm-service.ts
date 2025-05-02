// src/services/bpm-service.ts
'use server'; // Mark this module for server-side execution

import { ProcessInstance, ProcessInstanceFirestore, ProcessInstanceFirestoreSchema, ProcessInstanceOutputSchema, ProcessInstanceInput } from '@/lib/models/bpm';
import { OpportunityFirestore } from '@/lib/models/opportunity'; // Import Opportunity type
import { Order } from '@/lib/models/erp'; // Import Order type
import { adminDb } from '@/lib/firebase/firebase-admin-config';
import { addDoc, Timestamp, updateDoc, serverTimestamp, getDoc, query, where, getDocs, limit, collection, doc, FirestoreDataConverter, QueryDocumentSnapshot, SnapshotOptions, DocumentData } from 'firebase/firestore';
import { checkProductStock, createErpOrder, getErpOrderDetails, updateErpOrderStatus } from './erp-service'; // Import ERP service
import { z } from 'zod';

const PROCESS_DEFINITIONS = {
    OPPORTUNITY_TO_CASH: 'opportunity-to-cash-v1',
    SHIPPING_PROCESS: 'shipping-process-v1',
    // Add other process definitions here
};
// Define Process Instances collection name
const PROCESS_INSTANCES_COLLECTION = 'processInstances';


const processInstanceConverter: FirestoreDataConverter<ProcessInstanceFirestore> = {
    toFirestore(processInstance: ProcessInstanceFirestore): DocumentData {
        // Validate with Zod before converting to Firestore
        const validatedData = ProcessInstanceOutputSchema.parse(processInstance);
        return validatedData; // Firestore can store the validated data as-is
    },
    fromFirestore(
        snapshot: QueryDocumentSnapshot,
        options: SnapshotOptions
    ): ProcessInstanceFirestore {
        const data = snapshot.data(options);

        // Validate data from Firestore with Zod
        const parsedData = ProcessInstanceOutputSchema.safeParse(data);
        if (!parsedData.success) {
            console.error('Error parsing data from Firestore:', parsedData.error);
            throw new Error('Invalid data received from Firestore');
        }
        return { id: snapshot.id, ...parsedData.data };
    },
};


const processInstancesCol = collection(adminDb, PROCESS_INSTANCES_COLLECTION).withConverter(processInstanceConverter);



/**
 * Starts the "Opportunity to Cash" process when an opportunity is won.
 * Creates a process instance in Firestore and triggers the first step (creating ERP Order).
 * @param opportunityId The ID of the won opportunity.
 * @param opportunityData The full opportunity data.
 * @returns Boolean indicating if the process was successfully initiated.
 */
export async function startOpportunityToCashProcess(opportunityId: string, opportunityData: OpportunityFirestore) {
    console.log(`BPM Service: Starting Opportunity-to-Cash process for Opportunity ID: ${opportunityId}`);    
    try {
        const processInstanceData: Omit<ProcessInstance, 'id'> = {
            processDefinitionId: PROCESS_DEFINITIONS.OPPORTUNITY_TO_CASH,
            processDefinitionName: 'Opportunity To Cash',
            status: 'Running', // Start as running
            correlationId: opportunityId, // Link to the opportunity
            variables: {
                opportunityId: opportunityId,
                contactId: opportunityData.contactId,
                opportunityAmount: opportunityData.amount,
                // Add other relevant variables from the opportunity
            },
            startedAt: Timestamp.now(), // Use client-side timestamp for start
            // Use serverTimestamp for updates
            currentTaskName: 'Verify Opportunity Data', // Example starting task
        };

        // --- Create Process Instance in Firestore ---
        const docRef = await addDoc(collection(adminDb, PROCESS_INSTANCES_COLLECTION).withConverter(processInstanceConverter), {
            ...processInstanceData,
            lastUpdatedAt: serverTimestamp(), // Set initial update time server-side
        });
        const processInstanceId = docRef.id;
        console.log(`BPM Process Instance created with ID: ${processInstanceId}`);


        // ** Trigger next step: Create ERP Order **
        // In a real BPM engine, this would be handled by the engine based on the process model.
        // Here, we call the next logical step directly for demonstration.
        console.log(`BPM Service: Transitioning to Create ERP Order step for process ${processInstanceId}`);

        // 1. Prepare order data (example structure, adapt as needed)
        //    You might need to fetch product details based on the opportunity
        const orderItems = [ // Example: Assume opportunity implies specific products
             { productId: 'prod_1', productName: 'PLES Consulting Hour', sku: 'PLES-CONS-01', quantity: opportunityData.amount && opportunityData.amount > 1000 ? 10 : 1, price: 150 },
             // TODO: Add more items based on opportunity details if possible
        ];
        const subtotal = orderItems.reduce((sum, item) => sum + item.quantity * item.price, 0);
        const totalAmount = subtotal; // Add shipping, tax etc. later

        const erpOrderData: Omit<Order, 'id' | 'createdAt' | 'updatedAt'> = {
            orderNumber: `ORD-${opportunityId.slice(-6)}`, // Generate an order number
            contactId: opportunityData.contactId,
            opportunityId: opportunityId,
            orderDate: Timestamp.now(), // Order date is now
            items: orderItems,
            subtotal: subtotal,
            totalAmount: totalAmount,
            status: 'Pending', // Initial status
            paymentStatus: 'Pending',
        };

        // 2. Call ERP service to create the order
        const erpOrderId = await createErpOrder(erpOrderData);

        if (erpOrderId) {
            console.log(`BPM Service: ERP Order ${erpOrderId} created successfully.`);
            // Update process instance variables with erpOrderId
            await updateProcessInstance(processInstanceId, {
                 variables: { ...processInstanceData.variables, erpOrderId: erpOrderId },
                 currentTaskName: 'ERP Order Created, Awaiting Payment/Shipment', // Update task name
             });
        } else {
            console.error(`BPM Service Error: Failed to create ERP Order for Opportunity ${opportunityId}.`);
            // Update process instance to reflect failure
             await updateProcessInstance(processInstanceId, {
                 status: 'Failed',
                 errorDetails: 'Failed to create ERP order.',
                 failedAt: Timestamp.now(), // Use client-side for failure time
                 currentTaskName: 'Process Failed',
             });
            return false; // Indicate failure
        }

        return true;
    } catch (error) {
        console.error('BPM Service Error: Failed to start Opportunity-to-Cash process:', error);
        return false;
    }
}


/**
 * Starts a shipping process, typically triggered by ERP order creation or status update.
 * Creates a process instance in Firestore and performs the first step (Check Inventory).
 * @param orderId The ID of the ERP order to be shipped.
 * @returns Boolean indicating success.
 */
export async function startShippingProcess(orderId: string) {
    console.log(`BPM Service: Starting Shipping Process for Order ID: ${orderId}`);
     try {
        // Check if a shipping process already exists for this order
        const existingProcess = await findProcessInstanceByCorrelationId(orderId, PROCESS_DEFINITIONS.SHIPPING_PROCESS);
        if (existingProcess) {
            console.log(`Shipping process already exists for order ${orderId}. ID: ${existingProcess.id}`);
            // Decide if you want to re-trigger or just return true.
            // For now, we'll just return true assuming it's already handled.
            return true;
        }

        const processInstanceData: Omit<ProcessInstance, 'id'> = {
            processDefinitionId: PROCESS_DEFINITIONS.SHIPPING_PROCESS,
            processDefinitionName: 'Shipping Process',
            status: 'Running',
            correlationId: orderId, // Link to the order
            variables: { orderId: orderId },
            startedAt: Timestamp.now(), // Client-side start time
            currentTaskName: 'Check Inventory Availability', // Example starting task
        };

         // --- Create Process Instance in Firestore ---
        const docRef = await addDoc(collection(adminDb, PROCESS_INSTANCES_COLLECTION).withConverter(processInstanceConverter), {
            ...processInstanceData,
            lastUpdatedAt: serverTimestamp(), // Set initial update time server-side
        });
        const processInstanceId = docRef.id;
        console.log(`BPM Shipping Process Instance created with ID: ${processInstanceId}`);


        // ** Trigger next step: Check Inventory **
        console.log(`BPM Service: Transitioning to Check Inventory step for process ${processInstanceId}`);
        // Fetch order details to know what items are needed
        const orderDetails = await getErpOrderDetails(orderId); // Use the real Order ID here
        if (!orderDetails) {
             console.error(`BPM Service Error: Could not fetch details for order ${orderId} to check inventory.`);
             await updateProcessInstance(processInstanceId, { status: 'Failed', errorDetails: 'Failed to fetch order details', failedAt: Timestamp.now(), currentTaskName: 'Process Failed' });
             return false;
        }

        let allItemsAvailable = true;
        for (const item of orderDetails.items) {
            const stockInfo = await checkProductStock(item.productId);
            if (!stockInfo || stockInfo.stockLevel < item.quantity) {
                allItemsAvailable = false;
                console.warn(`BPM Service: Insufficient stock for product ${item.productId} (Order ${orderId}). Required: ${item.quantity}, Available: ${stockInfo?.stockLevel ?? 0}`);
                // Handle backorder logic or notify someone
                 await updateProcessInstance(processInstanceId, {
                     status: 'Suspended', // Or Failed, depending on policy
                     currentTaskName: 'Insufficient Stock - Manual Intervention Required',
                     variables: { ...(processInstanceData.variables || {}), missingProductId: item.productId, requiredQty: item.quantity, availableQty: stockInfo?.stockLevel ?? 0 },
                 });
                break; // Stop checking if one item is unavailable
            }
        }

        if (allItemsAvailable) {
             console.log(`BPM Service: All items available for order ${orderId}. Proceeding to update status.`);
              // Update ERP order status (e.g., to 'Awaiting Shipment')
              // This might happen here, or as a separate step triggered by BPM completion
              const erpUpdateSuccess = await updateErpOrderStatus(orderId, 'Awaiting Shipment'); // Use the real Order ID
              if (!erpUpdateSuccess) {
                   console.error(`BPM Service Error: Failed to update ERP order ${orderId} status to Awaiting Shipment.`);
                  // Optionally fail or suspend the BPM process here
                   await updateProcessInstance(processInstanceId, {
                       status: 'Failed',
                       errorDetails: 'Failed to update ERP order status.',
                       failedAt: Timestamp.now(),
                       currentTaskName: 'Process Failed',
                   });
                   return false;
              }

              // Update Process Instance
              await updateProcessInstance(processInstanceId, {
                   currentTaskName: 'Ready for Dispatch', // Or move to a 'Dispatch Goods' task
               });
              // Potentially trigger actual warehouse/shipping system API call here
        }

        return true;
     } catch (error) {
        console.error('BPM Service Error: Failed to start Shipping Process:', error);
        return false;
     }
}

/**
 * Updates a specific process instance in Firestore.
 * @param processInstanceId The ID of the process instance to update.
 * @param updates An object containing the fields to update. Uses serverTimestamp for lastUpdatedAt.
 * @returns Boolean indicating success.
 */
export async function updateProcessInstance(processInstanceId: string, updates: Partial<ProcessInstanceInput>): Promise<boolean> {
    console.log(`BPM Service: Updating Process Instance ${processInstanceId} in Firestore`);
    if (!processInstanceId) {
        console.error("BPM Service Error: Invalid processInstanceId provided for update.");
        return false;
    }
    try {
        const processRef = adminDb.doc(`processInstances/${processInstanceId}`).withConverter(processInstanceConverter);
        
        const dataToUpdate: Record<string, any> = { ...updates };

        // Merge variables intelligently if provided
        if (updates.variables) {            
            const docSnap = await getDoc(processRef);
            if (docSnap.exists()) {
                const existingData = docSnap.data();
                dataToUpdate.variables = { ...(existingData.variables || {}), ...updates.variables };
            }
        }

        // Always update 'lastUpdatedAt' using serverTimestamp
        dataToUpdate.lastUpdatedAt = serverTimestamp();

        await updateDoc(processRef, dataToUpdate);
        console.log(`BPM Process Instance ${processInstanceId} updated successfully.`);
        return true;
    } catch (error) {
        console.error(`BPM Service Error: Failed to update process instance ${processInstanceId}:`, error);
        return false;
    }
}


/**
 * Finds a process instance by its correlation ID and definition ID.
 * Used to prevent duplicate process instances for the same entity/process type.
 * @param correlationId The ID linking the process to a business entity (e.g., Order ID).
 * @param processDefinitionId The type of process (e.g., 'shipping-process-v1').
 * @returns The found process instance or null.
 */
export async function findProcessInstanceByCorrelationId(correlationId: string, processDefinitionId: string): Promise<ProcessInstanceFirestore | null> {
    console.log(`BPM Service: Finding process instance by correlationId=${correlationId}, definitionId=${processDefinitionId}`);
    if (!correlationId || !processDefinitionId) return null;

    try {
        const instancesCol = collection(adminDb, PROCESS_INSTANCES_COLLECTION).withConverter(processInstanceConverter);      
        const q = query(
            instancesCol,
           where('correlationId', '==', correlationId),
            where('processDefinitionId', '==', processDefinitionId),
            limit(1) // We only expect one active instance per correlation/definition
        );
        const snapshot = await getDocs(q);        
        
        if (snapshot.empty) {
            console.log(`No process instance found for correlationId=${correlationId}, definitionId=${processDefinitionId}`);
            return null;
        }

        const docSnap = snapshot.docs[0];
        const data = docSnap.data();

        const parsed = ProcessInstanceFirestoreSchema.safeParse(data);

        if (parsed.success) {
            return { id: docSnap.id, ...parsed.data };
        } else {
            console.error(`Invalid process instance data in Firestore for ID ${docSnap.id} (correlationId=${correlationId}):`, parsed.error);
            return null;
        }
    } catch (error) {
        console.error(`Error finding process instance by correlation ID ${correlationId}:`, error);
        return null;
    }
}

export async function addProcessInstance(processInstance: ProcessInstanceInput) {
    console.log(`BPM Service: Adding Process Instance in Firestore`);
    try {
        // --- Create Process Instance in Firestore ---
        const docRef = await addDoc(collection(adminDb, PROCESS_INSTANCES_COLLECTION).withConverter(processInstanceConverter), {
            ...processInstance,
            lastUpdatedAt: serverTimestamp(), // Set initial update time server-side
        } as ProcessInstanceFirestore);
        const processInstanceId = docRef.id;
        console.log(`BPM Process Instance created with ID: ${processInstanceId}`);
        return { id: processInstanceId, ...processInstance } as ProcessInstanceFirestore;
    } catch (error) {
        console.error(`BPM Service Error: Failed to add process instance:`, error);
        throw error;
    }
}

export async function getProcessInstance(id: string): Promise<ProcessInstanceFirestore | undefined> {
    try {
        const processInstanceRef = doc(collection(adminDb, PROCESS_INSTANCES_COLLECTION).withConverter(processInstanceConverter), id);
        const docSnap = await getDoc(processInstanceRef);
        return docSnap.data();
    } catch (error) {
        throw error;
    }
}
