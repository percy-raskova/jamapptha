import { useState, useEffect, useRef, useMemo } from 'react';

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

interface UseSpeechRecognitionReturn {
  isListening: boolean;
  isSupported: boolean;
  toggleListening: () => void;
  transcript: string;
  clearTranscript: () => void;
}

/**
 * Custom hook for browser speech recognition
 * Provides voice-to-text input functionality
 */
export function useSpeechRecognition(): UseSpeechRecognitionReturn {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const recognitionRef = useRef<SpeechRecognitionInstance | null>(null);

  // Check for browser support synchronously during render
  const isSupported = useMemo(() => {
    const win = window as WindowWithSpeech;
    return !!(win.SpeechRecognition || win.webkitSpeechRecognition);
  }, []);

  useEffect(() => {
    const win = window as WindowWithSpeech;
    const SpeechRecognitionClass =
      win.SpeechRecognition || win.webkitSpeechRecognition;

    if (SpeechRecognitionClass) {
      recognitionRef.current = new SpeechRecognitionClass();
      recognitionRef.current.continuous = false;
      recognitionRef.current.onresult = (e: SpeechRecognitionEvent) => {
        setTranscript(
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

  const clearTranscript = () => setTranscript('');

  return {
    isListening,
    isSupported,
    toggleListening,
    transcript,
    clearTranscript,
  };
}
