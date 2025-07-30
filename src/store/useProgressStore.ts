import { create } from 'zustand';
import { auth } from '@/lib/firebase';

// Base URL for the backend API.  The value should be set in your
// environment (e.g. .env.local) under NEXT_PUBLIC_API_BASE_URL.
const API_BASE: string | undefined = process.env.NEXT_PUBLIC_API_BASE_URL;

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
  /**
   * Increase the XP by a specified amount and persist the update via the
   * backend if configured.  The user's ID and token are obtained from
   * Firebase auth; if no user is logged in or no API base is defined the
   * update is local only.
   */
  gainXp: async (amount: number) => {
    set((state) => ({ xp: state.xp + amount }));
    if (!API_BASE) return;
    const user = auth.currentUser;
    if (!user) return;
    try {
      const token = await user.getIdToken();
      await fetch(`${API_BASE}/progress`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ userId: user.uid, xp: amount }),
      });
    } catch (err) {
      console.error('Failed to persist XP', err);
    }
  },
  /**
   * Increment the quiz counter and optionally record the activity to the backend.
   */
  incrementQuizzes: async () => {
    set((state) => ({ quizzesTaken: state.quizzesTaken + 1 }));
    if (!API_BASE) return;
    const user = auth.currentUser;
    if (!user) return;
    try {
      const token = await user.getIdToken();
      await fetch(`${API_BASE}/progress`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ userId: user.uid, xp: 0 }),
      });
    } catch (err) {
      console.error('Failed to persist quiz progress', err);
    }
  },
  /**
   * Increment the notes uploaded counter and optionally record the activity.
   */
  incrementNotes: async () => {
    set((state) => ({ notesUploaded: state.notesUploaded + 1 }));
    if (!API_BASE) return;
    const user = auth.currentUser;
    if (!user) return;
    try {
      const token = await user.getIdToken();
      await fetch(`${API_BASE}/progress`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ userId: user.uid, xp: 0 }),
      });
    } catch (err) {
      console.error('Failed to persist notes progress', err);
    }
  },
  /**
   * Increment the flashcards viewed counter and optionally record the activity.
   */
  incrementFlashcards: async () => {
    set((state) => ({ flashcardsViewed: state.flashcardsViewed + 1 }));
    if (!API_BASE) return;
    const user = auth.currentUser;
    if (!user) return;
    try {
      const token = await user.getIdToken();
      await fetch(`${API_BASE}/progress`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ userId: user.uid, xp: 0 }),
      });
    } catch (err) {
      console.error('Failed to persist flashcards progress', err);
    }
  },
}));