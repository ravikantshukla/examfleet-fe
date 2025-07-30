import { create } from 'zustand';

/**
 * A simple progress store that keeps track of a few metrics used by the
 * dashboard.  These counters update as the user performs actions in the
 * application (uploading notes, taking quizzes, viewing flashcards and
 * earning XP).  In a production environment you would persist these
 * values to a backend instead of storing them only in memory.
 */
interface ProgressState {
  /** Accumulated experience points */
  xp: number;
  /** Number of quizzes taken */
  quizzesTaken: number;
  /** Number of notes uploaded */
  notesUploaded: number;
  /** Number of flashcards viewed */
  flashcardsViewed: number;
  /** Increase the XP by a specified amount */
  gainXp: (amount: number) => void;
  /** Increment the quiz counter */
  incrementQuizzes: () => void;
  /** Increment the notes uploaded counter */
  incrementNotes: () => void;
  /** Increment the flashcards viewed counter */
  incrementFlashcards: () => void;
}

export const useProgressStore = create<ProgressState>((set) => ({
  xp: 0,
  quizzesTaken: 0,
  notesUploaded: 0,
  flashcardsViewed: 0,
  gainXp: (amount) => set((state) => ({ xp: state.xp + amount })),
  incrementQuizzes: () => set((state) => ({ quizzesTaken: state.quizzesTaken + 1 })),
  incrementNotes: () => set((state) => ({ notesUploaded: state.notesUploaded + 1 })),
  incrementFlashcards: () => set((state) => ({ flashcardsViewed: state.flashcardsViewed + 1 })),
}));