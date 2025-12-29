import { useState, useEffect, useRef } from 'react';
import { Mic, Trash2 } from 'lucide-react';
import type { ViewProps, Note } from '../../types';
import { Header } from '../ui';

// SpeechRecognition types for browser compatibility
interface SpeechRecognitionEvent {
  results: { [index: number]: { [index: number]: { transcript: string } } };
}

interface SpeechRecognitionInstance {
  continuous: boolean;
  onresult: ((e: SpeechRecognitionEvent) => void) | null;
  onend: (() => void) | null;
  start: () => void;
  stop: () => void;
}

type SpeechRecognitionConstructor = new () => SpeechRecognitionInstance;

interface WindowWithSpeech extends Window {
  SpeechRecognition?: SpeechRecognitionConstructor;
  webkitSpeechRecognition?: SpeechRecognitionConstructor;
}

export const NotesView = ({ onBack }: ViewProps) => {
  const [notes, setNotes] = useState<Note[]>(() => {
    const stored = localStorage.getItem('recovery_notes');
    return stored ? JSON.parse(stored) : [];
  });
  const [inputText, setInputText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<SpeechRecognitionInstance | null>(null);

  useEffect(() => {
    localStorage.setItem('recovery_notes', JSON.stringify(notes));
  }, [notes]);

  useEffect(() => {
    const win = window as WindowWithSpeech;
    const SpeechRecognitionClass =
      win.SpeechRecognition || win.webkitSpeechRecognition;
    if (SpeechRecognitionClass) {
      recognitionRef.current = new SpeechRecognitionClass();
      recognitionRef.current.continuous = false;
      recognitionRef.current.onresult = (e: SpeechRecognitionEvent) => {
        setInputText(
          (prev) => prev + (prev ? ' ' : '') + e.results[0][0].transcript,
        );
        setIsListening(false);
      };
      recognitionRef.current.onend = () => setIsListening(false);
    }
  }, []);

  const toggleListening = () => {
    if (!recognitionRef.current) {
      alert('Dictation not supported in this browser');
      return;
    }
    if (isListening) {
      recognitionRef.current.stop();
    } else {
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  const addNote = () => {
    if (!inputText.trim()) return;
    setNotes([{ id: Date.now(), text: inputText }, ...notes]);
    setInputText('');
  };

  return (
    <div className="h-full flex flex-col page-transition">
      <Header title="External Brain" onBack={onBack} />

      {/* Input section */}
      <div className="flex flex-col gap-4 mb-6">
        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Don't hold it in your head..."
          className="w-full p-5 rounded-2xl resize-none h-32 text-lg bg-[var(--bg-elevated)] text-[var(--text-primary)] placeholder-[var(--text-muted)] border border-[rgba(255,255,255,0.06)] focus:outline-none focus:border-indigo-500/40 transition-colors duration-300"
        />
        <div className="flex gap-3">
          <button
            onClick={toggleListening}
            className={`flex-1 py-3.5 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all duration-300 border ${
              isListening
                ? 'bg-red-900/30 border-red-700/50 text-red-300 listening-pulse'
                : 'bg-[var(--bg-surface)] border-[rgba(255,255,255,0.06)] text-[var(--text-secondary)]'
            }`}
          >
            <Mic size={20} />
            <span>{isListening ? 'Listening...' : 'Dictate'}</span>
          </button>
          <button
            onClick={addNote}
            className="flex-1 bg-gradient-to-b from-indigo-500 to-indigo-600 text-white rounded-2xl font-bold py-3.5 transition-all duration-300 hover:from-indigo-400 hover:to-indigo-500"
          >
            Save
          </button>
        </div>
      </div>

      {/* Notes list */}
      <div className="flex-1 overflow-y-auto space-y-3 pb-4">
        {notes.map((note) => (
          <div
            key={note.id}
            className="p-5 rounded-2xl flex justify-between items-start bg-[var(--bg-elevated)] border border-[rgba(255,255,255,0.04)] transition-all duration-300"
          >
            <p className="text-[var(--text-primary)] text-lg leading-relaxed pr-4">
              {note.text}
            </p>
            <button
              onClick={() => setNotes(notes.filter((n) => n.id !== note.id))}
              className="text-[var(--text-muted)] hover:text-red-400 p-1.5 transition-colors duration-300 flex-shrink-0"
            >
              <Trash2 size={18} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
