// src/services/bpm-service.ts
'use server'; // Mark this module for server-side execution

import { ProcessInstance, ProcessInstanceFirestore, ProcessStatus, ProcessStatusSchema } from '@/lib/models/bpm';
import { OpportunityFirestore } from '@/lib/models/opportunity'; // Import Opportunity type
import { Order } from '@/lib/models/erp'; // Import Order type
import { adminDb } from '@/lib/firebase/firebase-admin-config';
import { collection, addDoc, Timestamp, doc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { checkProductStock, createErpOrder, getErpOrderDetails, updateErpOrderStatus } from './erp-service'; // Import ERP service

const PROCESS_DEFINITIONS = {
    OPPORTUNITY_TO_CASH: 'opportunity-to-cash-v1',
    SHIPPING_PROCESS: 'shipping-process-v1',
    // Add other process definitions here
};

/**
 * Starts the "Opportunity to Cash" process when an opportunity is won.
 * This simulates creating a process instance and potentially triggering the first step.
 * @param opportunityId The ID of the won opportunity.
 * @param opportunityData The full opportunity data.
 * @returns Boolean indicating if the process was successfully initiated.
 */
export async function startOpportunityToCashProcess(opportunityId: string, opportunityData: OpportunityFirestore): Promise<boolean> {
    console.log(`BPM Service: Starting Opportunity-to-Cash process for Opportunity ID: ${opportunityId}`);
    try {
        const processInstanceData: Omit<ProcessInstance, 'id'> = {
            processDefinitionId: PROCESS_DEFINITIONS.OPPORTUNITY_TO_CASH,
            status: 'Running', // Start as running
            correlationId: opportunityId, // Link to the opportunity
            variables: {
                opportunityId: opportunityId,
                contactId: opportunityData.contactId,
                opportunityAmount: opportunityData.amount,
                // Add other relevant variables from the opportunity
            },
            startedAt: Timestamp.now(),
            lastUpdatedAt: Timestamp.now(),
            currentTaskName: 'Verify Opportunity Data', // Example starting task
        };

        // --- Replace with actual Firestore call ---
        // const docRef = await addDoc(collection(adminDb, 'processInstances'), processInstanceData);
        // const processInstanceId = docRef.id;
        // console.log(`BPM Process Instance created with ID: ${processInstanceId}`);
        // --- Mock Implementation ---
        const mockProcessInstanceId = `proc_${Date.now()}`;
        console.log(`Mock BPM Process Instance created with ID: ${mockProcessInstanceId}`);
        // Simulate DB write by creating a dummy document (or skip if purely mock)
        const mockInstanceRef = await addDoc(collection(adminDb, 'processInstances'), {
            ...processInstanceData,
            id: mockProcessInstanceId, // Add the generated ID for reference
            lastUpdatedAt: Timestamp.now(), // Ensure timestamp is set
        });
        // In a real scenario, you'd use mockInstanceRef.id, but here we use the pre-generated one


        // ** Simulate next step: Create ERP Order **
        // In a real BPM engine, this would be handled by the engine based on the process model.
        // Here, we call the next logical step directly for demonstration.
        console.log(`BPM Service (Mock): Transitioning to Create ERP Order step for process ${mockProcessInstanceId}`);

        // 1. Prepare order data (example structure, adapt as needed)
        //    You might need to fetch product details based on the opportunity
        const orderItems = [ // Example: Assume opportunity implies specific products
             { productId: 'prod_1', productName: 'PLES Consulting Hour', sku: 'PLES-CONS-01', quantity: opportunityData.amount && opportunityData.amount > 1000 ? 10 : 1, price: 150 },
             // Add more items based on opportunity details if possible
        ];
        const subtotal = orderItems.reduce((sum, item) => sum + item.quantity * item.price, 0);
        const totalAmount = subtotal; // Add shipping, tax etc. later

        const erpOrderData: Omit<Order, 'id' | 'createdAt' | 'updatedAt'> = {
            orderNumber: `ORD-${opportunityId.slice(-6)}`, // Generate an order number
            contactId: opportunityData.contactId,
            opportunityId: opportunityId,
            orderDate: Timestamp.now(),
            items: orderItems,
            subtotal: subtotal,
            totalAmount: totalAmount,
            status: 'Pending', // Initial status
            paymentStatus: 'Pending',
        };

        // 2. Call ERP service to create the order
        const erpOrderId = await createErpOrder(erpOrderData);

        if (erpOrderId) {
            console.log(`BPM Service (Mock): ERP Order ${erpOrderId} created successfully.`);
            // Update process instance variables if needed
            await updateProcessInstance(mockInstanceRef.id, { // Use the actual Firestore doc ID
                 variables: { ...processInstanceData.variables, erpOrderId: erpOrderId },
                 currentTaskName: 'ERP Order Created, Awaiting Payment/Shipment', // Update task name
                 lastUpdatedAt: Timestamp.now(),
             });
        } else {
            console.error(`BPM Service Error: Failed to create ERP Order for Opportunity ${opportunityId}.`);
            // Update process instance to reflect failure
             await updateProcessInstance(mockInstanceRef.id, { // Use the actual Firestore doc ID
                 status: 'Failed',
                 errorDetails: 'Failed to create ERP order.',
                 failedAt: Timestamp.now(),
                 lastUpdatedAt: Timestamp.now(),
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
 * Simulates starting a shipping process, potentially triggered by ERP order creation.
 * @param orderId The ID of the ERP order to be shipped.
 * @returns Boolean indicating success.
 */
export async function startShippingProcess(orderId: string): Promise<boolean> {
    console.log(`BPM Service: Starting Shipping Process for Order ID: ${orderId}`);
     try {
        // Check if a shipping process already exists for this order
        // const existingProcess = await findProcessInstanceByCorrelationId(orderId, PROCESS_DEFINITIONS.SHIPPING_PROCESS);
        // if (existingProcess) {
        //     console.log(`Shipping process already exists for order ${orderId}.`);
        //     return true; // Or handle re-trigger logic
        // }

        const processInstanceData: Omit<ProcessInstance, 'id'> = {
            processDefinitionId: PROCESS_DEFINITIONS.SHIPPING_PROCESS,
            status: 'Running',
            correlationId: orderId, // Link to the order
            variables: { orderId: orderId },
            startedAt: Timestamp.now(),
            lastUpdatedAt: Timestamp.now(),
            currentTaskName: 'Check Inventory Availability', // Example starting task
        };

         // --- Replace with actual Firestore call ---
        // const docRef = await addDoc(collection(adminDb, 'processInstances'), processInstanceData);
        // console.log(`BPM Shipping Process Instance created with ID: ${docRef.id}`);
        // --- Mock Implementation ---
        const mockProcessInstanceId = `proc_ship_${Date.now()}`;
        console.log(`Mock BPM Shipping Process Instance created with ID: ${mockProcessInstanceId}`);
         // Simulate DB write by creating a dummy document (or skip if purely mock)
         const mockInstanceRef = await addDoc(collection(adminDb, 'processInstances'), {
             ...processInstanceData,
             id: mockProcessInstanceId, // Add the generated ID for reference
             lastUpdatedAt: Timestamp.now(), // Ensure timestamp is set
         });


        // ** Simulate next step: Check Inventory **
        console.log(`BPM Service (Mock): Transitioning to Check Inventory step for process ${mockInstanceRef.id}`);
        // Fetch order details to know what items are needed
        const orderDetails = await getErpOrderDetails(orderId); // Use the real Order ID here
        if (!orderDetails) {
             console.error(`BPM Service Error: Could not fetch details for order ${orderId} to check inventory.`);
             await updateProcessInstance(mockInstanceRef.id, { status: 'Failed', errorDetails: 'Failed to fetch order details', failedAt: Timestamp.now(), lastUpdatedAt: Timestamp.now(), currentTaskName: 'Process Failed' });
             return false;
        }

        let allItemsAvailable = true;
        for (const item of orderDetails.items) {
            const stockInfo = await checkProductStock(item.productId);
            if (!stockInfo || stockInfo.stockLevel < item.quantity) {
                allItemsAvailable = false;
                console.warn(`BPM Service: Insufficient stock for product ${item.productId} (Order ${orderId}). Required: ${item.quantity}, Available: ${stockInfo?.stockLevel ?? 0}`);
                // Handle backorder logic or notify someone
                 await updateProcessInstance(mockInstanceRef.id, {
                     status: 'Suspended', // Or Failed, depending on policy
                     currentTaskName: 'Insufficient Stock - Manual Intervention Required',
                     variables: { ...(processInstanceData.variables || {}), missingProductId: item.productId, requiredQty: item.quantity, availableQty: stockInfo?.stockLevel ?? 0 },
                     lastUpdatedAt: Timestamp.now(),
                 });
                break; // Stop checking if one item is unavailable
            }
        }

        if (allItemsAvailable) {
             console.log(`BPM Service: All items available for order ${orderId}. Proceeding to dispatch.`);
              // Update ERP order status (e.g., to 'Awaiting Shipment')
              await updateErpOrderStatus(orderId, 'Awaiting Shipment'); // Use the real Order ID
              // Update Process Instance
              await updateProcessInstance(mockInstanceRef.id, {
                   currentTaskName: 'Ready for Dispatch',
                   lastUpdatedAt: Timestamp.now(),
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
 * Updates a specific process instance.
 * @param processInstanceId The ID of the process instance to update.
 * @param updates An object containing the fields to update.
 * @returns Boolean indicating success.
 */
export async function updateProcessInstance(processInstanceId: string, updates: Partial<ProcessInstanceFirestore>): Promise<boolean> {
    console.log(`BPM Service: Updating Process Instance ${processInstanceId}`);
    if (!processInstanceId) {
         console.error("BPM Service Error: Invalid processInstanceId provided for update.");
         return false;
    }
    try {
        const processRef = doc(adminDb, 'processInstances', processInstanceId);
        // Ensure lastUpdatedAt is always included and is a server timestamp for accuracy
        // Merge existing variables with new ones if variables are being updated
        const dataToUpdate: Record<string, any> = { ...updates };
        if (updates.variables) {
            // Fetch existing doc to merge variables correctly (optional but safer)
            const docSnap = await getDoc(processRef);
            if (docSnap.exists()) {
                const existingData = docSnap.data();
                dataToUpdate.variables = { ...(existingData.variables || {}), ...updates.variables };
            }
        }
         // Convert dates back to Timestamps if they are Date objects
        if (updates.startedAt instanceof Date) dataToUpdate.startedAt = Timestamp.fromDate(updates.startedAt);
        if (updates.completedAt instanceof Date) dataToUpdate.completedAt = Timestamp.fromDate(updates.completedAt);
        if (updates.failedAt instanceof Date) dataToUpdate.failedAt = Timestamp.fromDate(updates.failedAt);
        // Always set lastUpdatedAt server-side
        dataToUpdate.lastUpdatedAt = serverTimestamp();


        await updateDoc(processRef, dataToUpdate);
        console.log(`BPM Process Instance ${processInstanceId} updated successfully.`);
        return true;
    } catch (error) {
        console.error(`BPM Service Error: Failed to update process instance ${processInstanceId}:`, error);
        return false;
    }
}


// Add helper functions like findProcessInstanceByCorrelationId if needed for real implementation
// export async function findProcessInstanceByCorrelationId(correlationId: string, processDefinitionId: string): Promise<ProcessInstanceFirestore | null> { ... }
