
import React from 'react';
import { Note } from '../pages/Index';
import NoteCard from './NoteCard';

interface NotesGridProps {
  notes: Note[];
  onUpdateNote: (id: string, title: string, content: string, todos?: any[], drawingData?: string) => void;
  onDeleteNote: (id: string) => void;
  onChangeColor: (id: string, color: string) => void;
  onTogglePin: (id: string) => void;
  onToggleArchive: (id: string) => void;
}

const NotesGrid = ({ notes, onUpdateNote, onDeleteNote, onChangeColor, onTogglePin, onToggleArchive }: NotesGridProps) => {
  if (notes.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 sm:py-16 text-gray-400 px-4">
        <div className="w-24 h-24 sm:w-32 sm:h-32 mb-3 sm:mb-4 opacity-50">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M9 21c0 .5.4 1 1 1h4c.6 0 1-.5 1-1v-1H9v1zm3-19C8.1 2 5 5.1 5 9c0 2.4 1.2 4.5 3 5.7V17c0 .5.4 1 1 1h6c.6 0 1-.5 1-1v-2.3c1.8-1.3 3-3.4 3-5.7 0-3.9-3.1-7-7-7z"/>
          </svg>
        </div>
        <p className="text-base sm:text-lg text-center">Your notes will appear here</p>
      </div>
    );
  }

  return (
    <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-3 sm:gap-4 space-y-3 sm:space-y-4">
      {notes.map((note) => (
        <NoteCard
          key={note.id}
          note={note}
          onUpdate={onUpdateNote}
          onDelete={onDeleteNote}
          onChangeColor={onChangeColor}
          onTogglePin={onTogglePin}
          onToggleArchive={onToggleArchive}
        />
      ))}
    </div>
  );
};

export default NotesGrid;
