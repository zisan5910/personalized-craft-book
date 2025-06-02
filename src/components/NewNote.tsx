
import React, { useState } from 'react';
import { Plus, Type, ListTodo, PenTool } from 'lucide-react';
import { TodoItem } from '../pages/Index';
import DrawingCanvas from './DrawingCanvas';

interface NewNoteProps {
  onAddNote: (title: string, content: string, color: string, type: 'text' | 'todo' | 'drawing', todos?: TodoItem[], drawingData?: string) => void;
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

const NewNote = ({ onAddNote }: NewNoteProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedColor, setSelectedColor] = useState(noteColors[0]);
  const [noteType, setNoteType] = useState<'text' | 'todo' | 'drawing'>('text');
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [drawingData, setDrawingData] = useState<string>('');

  const handleSubmit = () => {
    if (title.trim() || content.trim() || todos.length > 0 || drawingData) {
      onAddNote(title.trim(), content.trim(), selectedColor, noteType, todos, drawingData);
      resetForm();
    }
  };

  const resetForm = () => {
    setTitle('');
    setContent('');
    setSelectedColor(noteColors[0]);
    setNoteType('text');
    setTodos([]);
    setDrawingData('');
    setIsExpanded(false);
  };

  const addTodo = () => {
    const newTodo: TodoItem = {
      id: crypto.randomUUID(),
      text: '',
      completed: false
    };
    setTodos([...todos, newTodo]);
  };

  const updateTodo = (id: string, text: string) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, text } : todo
    ));
  };

  const removeTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  if (!isExpanded) {
    return (
      <div className="max-w-xl mx-auto mb-8">
        <div 
          onClick={() => setIsExpanded(true)}
          className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-text p-4"
        >
          <div className="flex items-center gap-3 text-gray-500">
            <Plus size={20} />
            <span>Take a note...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto mb-8">
      <div 
        className="border border-gray-200 rounded-lg shadow-md transition-all"
        style={{ backgroundColor: selectedColor }}
      >
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-4 pb-2 bg-transparent border-0 outline-none placeholder-gray-500 font-medium text-lg"
        />
        
        {noteType === 'text' && (
          <textarea
            placeholder="Take a note..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full p-4 pt-0 bg-transparent border-0 outline-none placeholder-gray-500 resize-none min-h-[60px]"
            rows={3}
          />
        )}

        {noteType === 'todo' && (
          <div className="p-4 pt-0">
            {todos.map((todo) => (
              <div key={todo.id} className="flex items-center gap-2 mb-2">
                <input
                  type="text"
                  value={todo.text}
                  onChange={(e) => updateTodo(todo.id, e.target.value)}
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

        {noteType === 'drawing' && (
          <div className="p-4 pt-0">
            <DrawingCanvas onSave={setDrawingData} />
          </div>
        )}
        
        <div className="p-2 space-y-3">
          {/* Color palette */}
          <div className="flex gap-1">
            {noteColors.map((color) => (
              <button
                key={color}
                onClick={() => setSelectedColor(color)}
                className={`w-6 h-6 rounded-full border-2 ${
                  selectedColor === color ? 'border-gray-400' : 'border-gray-200'
                } hover:border-gray-400 transition-colors`}
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
          
          {/* Note type buttons */}
          <div className="flex gap-1">
            <button
              onClick={() => setNoteType('text')}
              className={`p-2 rounded transition-colors ${
                noteType === 'text' ? 'bg-gray-200' : 'hover:bg-gray-100'
              }`}
              title="Text note"
            >
              <Type size={16} />
            </button>
            <button
              onClick={() => setNoteType('todo')}
              className={`p-2 rounded transition-colors ${
                noteType === 'todo' ? 'bg-gray-200' : 'hover:bg-gray-100'
              }`}
              title="Checklist"
            >
              <ListTodo size={16} />
            </button>
            <button
              onClick={() => setNoteType('drawing')}
              className={`p-2 rounded transition-colors ${
                noteType === 'drawing' ? 'bg-gray-200' : 'hover:bg-gray-100'
              }`}
              title="Drawing"
            >
              <PenTool size={16} />
            </button>
          </div>
          
          {/* Action buttons */}
          <div className="flex justify-end gap-2">
            <button
              onClick={resetForm}
              className="px-4 py-1 text-gray-600 hover:bg-gray-100 rounded transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="px-4 py-1 bg-yellow-400 hover:bg-yellow-500 text-gray-800 rounded transition-colors font-medium"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewNote;
