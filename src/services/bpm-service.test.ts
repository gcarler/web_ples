import {
  addProcessInstance,
  deleteProcessInstance,
  getProcessInstance,
  updateProcessInstance,
} from './bpm-service';
import { adminDb } from '@/lib/firebase/firebase-admin-config';
import {
  ProcessInstanceInput,
  ProcessInstanceOutput,
  ProcessStatus,
  ProcessInstanceOutputSchema,
} from '@/lib/models/bpm';
import {
  Timestamp,
  collection,
  deleteDoc,
  doc,
  getDocs,
  QueryDocumentSnapshot,
  SnapshotOptions,
} from 'firebase/firestore';
import { processInstanceConverter } from './bpm-service'; // Ensure this path is correct
import { mock, mockReset } from 'jest-mock-extended'; // Import mockReset
import { ProcessInstance } from '@/lib/models/bpm';

jest.mock('@/lib/firebase/firebase-admin-config'); // Mock the entire module

const mockedGetDocs = jest.fn();
const mockedDoc = jest.fn(() => ({
  get: jest.fn(),
  delete: jest.fn(),
}));
const mockedCollection = jest.fn(() => ({
  withConverter: jest.fn(() => ({
    getDocs: mockedGetDocs,
    doc: mockedDoc,
  })),
}));


(adminDb as any) = {
  collection: mockedCollection,
  doc: mockedDoc,
};


describe('BPM Service', () => {
  beforeEach(async () => {
    jest.clearAllMocks();
    mockReset(mockedCollection);
    mockReset(mockedDoc);
    mockReset(mockedGetDocs);
    // Clear the test collection before each test
    mockedGetDocs.mockResolvedValue({
      docs: [],
    });

    const processInstancesCol = collection(adminDb, 'processInstances').withConverter(
      processInstanceConverter
    );
    const snapshot = await getDocs(processInstancesCol);
    for (const document of snapshot.docs) {
      const docRef = doc(processInstancesCol, document.id);
      await deleteDoc(docRef);
    }
  });

  it('Debería crear una instancia de proceso correctamente', async () => {
    const newProcess: ProcessInstanceInput = {
      processDefinitionId: 'test-process',
      processDefinitionName: 'Test Process',
      status: 'Not Started',
      variables: {},
      lastUpdatedAt: Timestamp.now(),
    };

    const createdProcess = await addProcessInstance(newProcess);

    expect(createdProcess).toHaveProperty('id');
    // Verificamos en firestore
    const retrievedProcess = await getProcessInstance(createdProcess.id);
    expect(retrievedProcess).toMatchObject(newProcess);
    expect(retrievedProcess?.status).toBe('Not Started');
    await deleteProcessInstance(createdProcess.id);
  });

  it('Debería lanzar un error al crear una instancia de proceso con datos inválidos', async () => {
    const invalidProcess = {
      processDefinitionId: '', // Dato inválido
      processDefinitionName: 'Invalid',
      status: 'Invalid',
      lastUpdatedAt: Timestamp.now(),
    } as unknown as ProcessInstanceInput; // Forzamos el tipo para probar el error

    await expect(addProcessInstance(invalidProcess)).rejects.toThrow();
  });

  it('Debería recuperar una instancia de proceso correctamente', async () => {
    const newProcess: ProcessInstanceInput = {
      processDefinitionId: 'test-process-2',
      processDefinitionName: 'Test Process',
      status: 'Not Started',
      variables: {},
      lastUpdatedAt: Timestamp.now(),
    };

    const createdProcess = await addProcessInstance(newProcess);
    const retrievedProcess = await getProcessInstance(createdProcess.id);

    expect(retrievedProcess).toMatchObject(newProcess);
    expect(retrievedProcess?.id).toBe(createdProcess.id);
    await deleteProcessInstance(createdProcess.id);
  });

  it('Debería devolver undefined al recuperar una instancia de proceso inexistente', async () => {
    const retrievedProcess = await getProcessInstance('inexistent-id');

    expect(retrievedProcess).toBeUndefined();
  });

  it('Debería actualizar el estado de una instancia de proceso correctamente', async () => {
    const newProcess: ProcessInstanceInput = {
      processDefinitionId: 'test-process-3',
      processDefinitionName: 'Test Process',
      status: 'Not Started',
      variables: {},
      lastUpdatedAt: Timestamp.now(),
    };
    const createdProcess = await addProcessInstance(newProcess);
    const updatedProcess = await updateProcessInstance(createdProcess.id, {
      status: 'Running',
      lastUpdatedAt: Timestamp.now(),
    });
    expect(updatedProcess).toBe(true);

    const retrievedProcess = await getProcessInstance(createdProcess.id);
    expect(retrievedProcess?.status).toBe('Running');
    await deleteProcessInstance(createdProcess.id);
  });

  it('Debería lanzar un error al actualizar una instancia con un estado inválido', async () => {
    const newProcess: ProcessInstanceInput = {
      processDefinitionId: 'test-process-4',
      processDefinitionName: 'Test Process',
      status: 'Not Started',
      variables: {},
      lastUpdatedAt: Timestamp.now(),
    };
    const createdProcess = await addProcessInstance(newProcess);
    await expect(
      updateProcessInstance(createdProcess.id, {
        status: 'Invalid' as ProcessStatus,
        lastUpdatedAt: Timestamp.now(),
      })
    ).rejects.toThrow();
    await deleteProcessInstance(createdProcess.id);
  });

  it('Debería borrar una instancia de proceso correctamente', async () => {
    const newProcess: ProcessInstanceInput = {
      processDefinitionId: 'test-process-5',
      processDefinitionName: 'Test Process',
      status: 'Not Started',
      variables: {},
      lastUpdatedAt: Timestamp.now(),
    };
    const createdProcess = await addProcessInstance(newProcess);
    await deleteProcessInstance(createdProcess.id);

    const retrievedProcess = await getProcessInstance(createdProcess.id);
    expect(retrievedProcess).toBeUndefined();
  });
  it('Debería funcionar correctamente al intentar borrar una instancia de proceso inexistente', async () => {
    await deleteProcessInstance('inexistent-id');
  });
});

describe('processInstanceConverter', () => {
  it('should correctly convert a ProcessInstance to Firestore data', () => {
    const processInstance: ProcessInstance = {
      id: 'test-id',
      processDefinitionId: 'test-process',
      processDefinitionName: 'Test Process',
      status: 'Not Started',
      variables: {},
      lastUpdatedAt: Timestamp.now(),
    };
    const firestoreData = processInstanceConverter.toFirestore(processInstance);

    expect(firestoreData).toEqual({
      processDefinitionId: 'test-process',
      processDefinitionName: 'Test Process',
      status: 'Not Started',
      variables: {},
      lastUpdatedAt: expect.any(Timestamp),
    });
  });

  it('should correctly convert Firestore data to a ProcessInstance', () => {
    const firestoreData = {
      processDefinitionId: 'test-process',
      processDefinitionName: 'Test Process',
      status: 'Not Started',
      variables: {},
      lastUpdatedAt: Timestamp.now(),
    };
    const mockSnapshot = mock<QueryDocumentSnapshot>();
    mockSnapshot.data.mockReturnValue(firestoreData);

    const processInstance = processInstanceConverter.fromFirestore(
      mockSnapshot,
      {} as SnapshotOptions
    );

    expect(processInstance).toEqual({
      processDefinitionId: 'test-process',
      processDefinitionName: 'Test Process',
      status: 'Not Started',
      variables: {},
      lastUpdatedAt: expect.any(Timestamp),
    });
  });

  it('should throw an error if Firestore data is invalid', () => {
    const invalidFirestoreData = {
      processDefinitionId: 123, // Invalid type
      processDefinitionName: 'Test Process',
      status: 'Not Started',
      variables: {},
      lastUpdatedAt: Timestamp.now(),
    };
    const mockSnapshot = mock<QueryDocumentSnapshot>();
    mockSnapshot.data.mockReturnValue(invalidFirestoreData);

    expect(() => {
      processInstanceConverter.fromFirestore(
        mockSnapshot,
        {} as SnapshotOptions
      );
    }).toThrow();
  });
});