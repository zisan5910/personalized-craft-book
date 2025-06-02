import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import NewNote from '../components/NewNote';
import NotesGrid from '../components/NotesGrid';
import { useAuth } from '../contexts/AuthContext';
import { notesService } from '../services/notesService';
import { useToast } from '@/hooks/use-toast';

export interface TodoItem {
  id: string;
  text: string;
  completed: boolean;
}

export interface Note {
  id: string;
  title: string;
  content: string;
  color: string;
  createdAt: Date;
  updatedAt: Date;
  type: 'text' | 'todo' | 'drawing';
  todos?: TodoItem[];
  isPinned: boolean;
  isArchived: boolean;
  drawingData?: string;
}

const Index = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showArchived, setShowArchived] = useState(false);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (!currentUser) return;

    setLoading(true);
    const unsubscribe = notesService.subscribeToUserNotes(currentUser.uid, (userNotes) => {
      setNotes(userNotes);
      setLoading(false);
    });

    return unsubscribe;
  }, [currentUser]);

  const addNote = async (title: string, content: string, color: string, type: 'text' | 'todo' | 'drawing' = 'text', todos?: TodoItem[], drawingData?: string) => {
    if (!currentUser) return;

    try {
      await notesService.createNote(currentUser.uid, {
        title,
        content,
        color,
        type,
        todos,
        drawingData,
        isPinned: false,
        isArchived: false
      });
      
      toast({
        title: "Note created",
        description: "Your note has been saved successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create note. Please try again.",
        variant: "destructive",
      });
    }
  };

  const updateNote = async (id: string, title: string, content: string, todos?: TodoItem[], drawingData?: string) => {
    if (!currentUser) return;

    try {
      await notesService.updateNote(currentUser.uid, id, {
        title,
        content,
        todos,
        drawingData
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update note. Please try again.",
        variant: "destructive",
      });
    }
  };

  const deleteNote = async (id: string) => {
    if (!currentUser) return;

    try {
      await notesService.deleteNote(currentUser.uid, id);
      toast({
        title: "Note deleted",
        description: "Your note has been deleted successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete note. Please try again.",
        variant: "destructive",
      });
    }
  };

  const changeNoteColor = async (id: string, color: string) => {
    if (!currentUser) return;

    try {
      await notesService.updateNote(currentUser.uid, id, { color });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to change note color. Please try again.",
        variant: "destructive",
      });
    }
  };

  const togglePin = async (id: string) => {
    if (!currentUser) return;

    try {
      const note = notes.find(n => n.id === id);
      if (note) {
        await notesService.updateNote(currentUser.uid, id, { isPinned: !note.isPinned });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to pin/unpin note. Please try again.",
        variant: "destructive",
      });
    }
  };

  const toggleArchive = async (id: string) => {
    if (!currentUser) return;

    try {
      const note = notes.find(n => n.id === id);
      if (note) {
        await notesService.updateNote(currentUser.uid, id, { isArchived: !note.isArchived });
        toast({
          title: note.isArchived ? "Note unarchived" : "Note archived",
          description: `Your note has been ${note.isArchived ? 'unarchived' : 'archived'}.`,
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to archive/unarchive note. Please try again.",
        variant: "destructive",
      });
    }
  };

  const filteredNotes = notes.filter(note => {
    const matchesSearch = note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (note.todos && note.todos.some(todo => todo.text.toLowerCase().includes(searchTerm.toLowerCase())));
    
    return matchesSearch && note.isArchived === showArchived;
  });

  // Separate pinned and unpinned notes
  const pinnedNotes = filteredNotes.filter(note => note.isPinned);
  const unpinnedNotes = filteredNotes.filter(note => !note.isPinned);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-yellow-400 rounded-lg flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl font-bold text-gray-800">Z</span>
          </div>
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-400 mx-auto"></div>
          <p className="text-gray-600 mt-4">Loading your notes...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header 
        searchTerm={searchTerm} 
        onSearchChange={setSearchTerm}
        showArchived={showArchived}
        onToggleArchived={setShowArchived}
      />
      <main className="max-w-6xl mx-auto px-3 sm:px-4 py-4 sm:py-8">
        {!showArchived && <NewNote onAddNote={addNote} />}
        
        {pinnedNotes.length > 0 && !showArchived && (
          <div className="mb-6 sm:mb-8">
            <h2 className="text-xs sm:text-sm font-medium text-gray-600 mb-3 sm:mb-4 uppercase tracking-wide px-1">Pinned</h2>
            <NotesGrid 
              notes={pinnedNotes} 
              onUpdateNote={updateNote}
              onDeleteNote={deleteNote}
              onChangeColor={changeNoteColor}
              onTogglePin={togglePin}
              onToggleArchive={toggleArchive}
            />
          </div>
        )}
        
        {unpinnedNotes.length > 0 && (
          <div>
            {pinnedNotes.length > 0 && !showArchived && (
              <h2 className="text-xs sm:text-sm font-medium text-gray-600 mb-3 sm:mb-4 uppercase tracking-wide px-1">Others</h2>
            )}
            <NotesGrid 
              notes={unpinnedNotes} 
              onUpdateNote={updateNote}
              onDeleteNote={deleteNote}
              onChangeColor={changeNoteColor}
              onTogglePin={togglePin}
              onToggleArchive={toggleArchive}
            />
          </div>
        )}
        
        {filteredNotes.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12 sm:py-16 text-gray-400 px-4">
            <div className="w-24 h-24 sm:w-32 sm:h-32 mb-3 sm:mb-4 opacity-50">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M9 21c0 .5.4 1 1 1h4c.6 0 1-.5 1-1v-1H9v1zm3-19C8.1 2 5 5.1 5 9c0 2.4 1.2 4.5 3 5.7V17c0 .5.4 1 1 1h6c.6 0 1-.5 1-1v-2.3c1.8-1.3 3-3.4 3-5.7 0-3.9-3.1-7-7-7z"/>
              </svg>
            </div>
            <p className="text-base sm:text-lg text-center">
              {showArchived ? 'Your archived notes will appear here' : 'Your notes will appear here'}
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;
