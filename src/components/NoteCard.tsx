
import React, { useState } from 'react';
import { X, Pin, Archive, Share } from 'lucide-react';
import { Note, TodoItem } from '../pages/Index';
import { Checkbox } from './ui/checkbox';
import DrawingCanvas from './DrawingCanvas';

interface NoteCardProps {
  note: Note;
  onUpdate: (id: string, title: string, content: string, todos?: TodoItem[], drawingData?: string) => void;
  onDelete: (id: string) => void;
  onChangeColor: (id: string, color: string) => void;
  onTogglePin: (id: string) => void;
  onToggleArchive: (id: string) => void;
}

const noteColors = [
  '#ffffff', // Default white
  '#f28b82', // Red
  '#fbbc04', // Yellow
  '#fff475', // Light yellow
  '#ccff90', // Light green
  '#a7ffeb', // Teal
  '#cbf0f8', // Light blue
  '#aecbfa', // Blue
  '#d7aefb', // Purple
  '#fdcfe8', // Pink
  '#e6c9a8', // Brown
  '#e8eaed', // Gray
];

const NoteCard = ({ note, onUpdate, onDelete, onChangeColor, onTogglePin, onToggleArchive }: NoteCardProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(note.title);
  const [editContent, setEditContent] = useState(note.content);
  const [editTodos, setEditTodos] = useState<TodoItem[]>(note.todos || []);
  const [editDrawingData, setEditDrawingData] = useState(note.drawingData || '');
  const [showColorPicker, setShowColorPicker] = useState(false);

  const handleSave = () => {
    onUpdate(note.id, editTitle, editContent, editTodos, editDrawingData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditTitle(note.title);
    setEditContent(note.content);
    setEditTodos(note.todos || []);
    setEditDrawingData(note.drawingData || '');
    setIsEditing(false);
  };

  const handleColorChange = (color: string) => {
    onChangeColor(note.id, color);
    setShowColorPicker(false);
  };

  const updateTodo = (id: string, text: string, completed: boolean) => {
    setEditTodos(editTodos.map(todo => 
      todo.id === id ? { ...todo, text, completed } : todo
    ));
  };

  const addTodo = () => {
    const newTodo: TodoItem = {
      id: crypto.randomUUID(),
      text: '',
      completed: false
    };
    setEditTodos([...editTodos, newTodo]);
  };

  const removeTodo = (id: string) => {
    setEditTodos(editTodos.filter(todo => todo.id !== id));
  };

  const handleShare = async () => {
    const shareData = {
      title: note.title || 'Shared Note',
      text: note.content || note.todos?.map(t => `${t.completed ? '✓' : '○'} ${t.text}`).join('\n') || 'Shared note from Keep Clone'
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      // Fallback to clipboard
      const textToShare = `${shareData.title}\n\n${shareData.text}`;
      await navigator.clipboard.writeText(textToShare);
    }
  };

  if (isEditing) {
    return (
      <div 
        className="break-inside-avoid mb-4 border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-all"
        style={{ backgroundColor: note.color }}
      >
        <input
          type="text"
          value={editTitle}
          onChange={(e) => setEditTitle(e.target.value)}
          placeholder="Title"
          className="w-full p-4 pb-2 bg-transparent border-0 outline-none placeholder-gray-500 font-medium text-lg"
        />
        
        {note.type === 'text' && (
          <textarea
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
            placeholder="Take a note..."
            className="w-full p-4 pt-0 bg-transparent border-0 outline-none placeholder-gray-500 resize-none min-h-[60px]"
            rows={Math.max(3, editContent.split('\n').length)}
          />
        )}

        {note.type === 'todo' && (
          <div className="p-4 pt-0">
            {editTodos.map((todo) => (
              <div key={todo.id} className="flex items-center gap-2 mb-2">
                <Checkbox
                  checked={todo.completed}
                  onCheckedChange={(checked) => updateTodo(todo.id, todo.text, checked as boolean)}
                />
                <input
                  type="text"
                  value={todo.text}
                  onChange={(e) => updateTodo(todo.id, e.target.value, todo.completed)}
                  placeholder="List item"
                  className="flex-1 bg-transparent border-0 outline-none placeholder-gray-500"
                />
                <button
                  onClick={() => removeTodo(todo.id)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              </div>
            ))}
            <button
              onClick={addTodo}
              className="text-gray-500 hover:text-gray-700 text-sm"
            >
              + Add item
            </button>
          </div>
        )}

        {note.type === 'drawing' && (
          <div className="p-4 pt-0">
            <DrawingCanvas 
              onSave={setEditDrawingData} 
              existingData={editDrawingData}
            />
          </div>
        )}
        
        <div className="flex items-center justify-between p-2">
          <div className="relative">
            <button
              onClick={() => setShowColorPicker(!showColorPicker)}
              className="w-6 h-6 rounded-full border-2 border-gray-300 hover:border-gray-400 transition-colors"
              style={{ backgroundColor: note.color }}
            />
            {showColorPicker && (
              <div className="absolute top-8 left-0 bg-white rounded-lg shadow-lg p-2 grid grid-cols-4 gap-1 z-10">
                {noteColors.map((color) => (
                  <button
                    key={color}
                    onClick={() => handleColorChange(color)}
                    className={`w-6 h-6 rounded-full border-2 ${
                      note.color === color ? 'border-gray-400' : 'border-gray-200'
                    } hover:border-gray-400 transition-colors`}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            )}
          </div>
          
          <div className="flex gap-2">
            <button
              onClick={handleCancel}
              className="px-3 py-1 text-gray-600 hover:bg-gray-100 rounded transition-colors text-sm"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-3 py-1 bg-yellow-400 hover:bg-yellow-500 text-gray-800 rounded transition-colors font-medium text-sm"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="break-inside-avoid mb-4 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-all cursor-pointer group relative"
      style={{ backgroundColor: note.color }}
      onClick={() => setIsEditing(true)}
    >
      {note.isPinned && (
        <Pin size={16} className="absolute top-2 left-2 text-gray-600 fill-current" />
      )}
      
      <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onTogglePin(note.id);
          }}
          className={`p-1 rounded-full hover:bg-gray-200 transition-colors ${
            note.isPinned ? 'text-yellow-600' : 'text-gray-600'
          }`}
          title={note.isPinned ? 'Unpin' : 'Pin'}
        >
          <Pin size={14} className={note.isPinned ? 'fill-current' : ''} />
        </button>
        
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleShare();
          }}
          className="p-1 rounded-full hover:bg-gray-200 transition-colors text-gray-600"
          title="Share"
        >
          <Share size={14} />
        </button>
        
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleArchive(note.id);
          }}
          className="p-1 rounded-full hover:bg-gray-200 transition-colors text-gray-600"
          title={note.isArchived ? 'Unarchive' : 'Archive'}
        >
          <Archive size={14} />
        </button>
        
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete(note.id);
          }}
          className="p-1 rounded-full hover:bg-gray-200 transition-colors text-gray-600"
          title="Delete"
        >
          <X size={14} />
        </button>
      </div>
      
      {note.title && (
        <h3 className={`p-4 pb-2 font-medium text-lg text-gray-800 ${note.isPinned ? 'pl-8' : 'pr-20'}`}>
          {note.title}
        </h3>
      )}
      
      {note.type === 'text' && note.content && (
        <p className="p-4 pt-0 text-gray-700 whitespace-pre-wrap">
          {note.content}
        </p>
      )}

      {note.type === 'todo' && note.todos && (
        <div className="p-4 pt-0">
          {note.todos.map((todo) => (
            <div key={todo.id} className="flex items-center gap-2 mb-1">
              <Checkbox checked={todo.completed} disabled />
              <span className={`${todo.completed ? 'line-through text-gray-500' : 'text-gray-700'}`}>
                {todo.text}
              </span>
            </div>
          ))}
        </div>
      )}

      {note.type === 'drawing' && note.drawingData && (
        <div className="p-4 pt-0">
          <img src={note.drawingData} alt="Drawing" className="w-full rounded" />
        </div>
      )}
      
      <div className="px-4 pb-2 text-xs text-gray-400">
        {note.updatedAt.toLocaleDateString()}
      </div>
    </div>
  );
};

export default NoteCard;
