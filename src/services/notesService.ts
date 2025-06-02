
import { 
  collection, 
  doc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  getDocs, 
  query, 
  where, 
  orderBy, 
  onSnapshot,
  serverTimestamp,
  Timestamp 
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { db, storage } from '../lib/firebase';
import { Note, TodoItem } from '../pages/Index';

export interface FirebaseNote {
  id?: string;
  userId: string;
  title: string;
  content: string;
  color: string;
  type: 'text' | 'todo' | 'drawing';
  todos?: TodoItem[];
  isPinned: boolean;
  isArchived: boolean;
  drawingData?: string;
  drawingImageUrl?: string;
  sharedWith?: string[];
  isPublic?: boolean;
  createdAt: Timestamp | Date;
  updatedAt: Timestamp | Date;
}

class NotesService {
  private getNotesCollection(userId: string) {
    return collection(db, 'users', userId, 'notes');
  }

  async createNote(userId: string, noteData: Omit<FirebaseNote, 'id' | 'userId' | 'createdAt' | 'updatedAt'>): Promise<string> {
    try {
      const notesRef = this.getNotesCollection(userId);
      const docRef = await addDoc(notesRef, {
        ...noteData,
        userId,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      return docRef.id;
    } catch (error) {
      console.error('Error creating note:', error);
      throw error;
    }
  }

  async updateNote(userId: string, noteId: string, updates: Partial<FirebaseNote>): Promise<void> {
    try {
      const noteRef = doc(this.getNotesCollection(userId), noteId);
      await updateDoc(noteRef, {
        ...updates,
        updatedAt: serverTimestamp()
      });
    } catch (error) {
      console.error('Error updating note:', error);
      throw error;
    }
  }

  async deleteNote(userId: string, noteId: string): Promise<void> {
    try {
      const noteRef = doc(this.getNotesCollection(userId), noteId);
      await deleteDoc(noteRef);
    } catch (error) {
      console.error('Error deleting note:', error);
      throw error;
    }
  }

  async getUserNotes(userId: string): Promise<Note[]> {
    try {
      const notesRef = this.getNotesCollection(userId);
      const q = query(notesRef, orderBy('updatedAt', 'desc'));
      const querySnapshot = await getDocs(q);
      
      return querySnapshot.docs.map(doc => {
        const data = doc.data() as FirebaseNote;
        return {
          id: doc.id,
          title: data.title,
          content: data.content,
          color: data.color,
          type: data.type,
          todos: data.todos,
          isPinned: data.isPinned,
          isArchived: data.isArchived,
          drawingData: data.drawingData,
          createdAt: data.createdAt instanceof Timestamp ? data.createdAt.toDate() : new Date(data.createdAt),
          updatedAt: data.updatedAt instanceof Timestamp ? data.updatedAt.toDate() : new Date(data.updatedAt)
        };
      });
    } catch (error) {
      console.error('Error fetching notes:', error);
      throw error;
    }
  }

  subscribeToUserNotes(userId: string, callback: (notes: Note[]) => void): () => void {
    const notesRef = this.getNotesCollection(userId);
    const q = query(notesRef, orderBy('updatedAt', 'desc'));
    
    return onSnapshot(q, (querySnapshot) => {
      const notes = querySnapshot.docs.map(doc => {
        const data = doc.data() as FirebaseNote;
        return {
          id: doc.id,
          title: data.title,
          content: data.content,
          color: data.color,
          type: data.type,
          todos: data.todos,
          isPinned: data.isPinned,
          isArchived: data.isArchived,
          drawingData: data.drawingData,
          createdAt: data.createdAt instanceof Timestamp ? data.createdAt.toDate() : new Date(data.createdAt),
          updatedAt: data.updatedAt instanceof Timestamp ? data.updatedAt.toDate() : new Date(data.updatedAt)
        };
      });
      callback(notes);
    });
  }

  async uploadDrawing(userId: string, noteId: string, drawingBlob: Blob): Promise<string> {
    try {
      const storageRef = ref(storage, `drawings/${userId}/${noteId}.png`);
      const snapshot = await uploadBytes(storageRef, drawingBlob);
      const downloadURL = await getDownloadURL(snapshot.ref);
      return downloadURL;
    } catch (error) {
      console.error('Error uploading drawing:', error);
      throw error;
    }
  }

  async deleteDrawing(userId: string, noteId: string): Promise<void> {
    try {
      const storageRef = ref(storage, `drawings/${userId}/${noteId}.png`);
      await deleteObject(storageRef);
    } catch (error) {
      console.error('Error deleting drawing:', error);
      // Don't throw error if file doesn't exist
    }
  }

  async shareNote(userId: string, noteId: string, targetUserEmail: string): Promise<void> {
    try {
      // In a real implementation, you'd need to find the target user's ID
      // and add the note to their shared notes collection
      const noteRef = doc(this.getNotesCollection(userId), noteId);
      await updateDoc(noteRef, {
        sharedWith: [targetUserEmail],
        updatedAt: serverTimestamp()
      });
    } catch (error) {
      console.error('Error sharing note:', error);
      throw error;
    }
  }
}

export const notesService = new NotesService();
