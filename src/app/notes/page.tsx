"use client";

// Disable static rendering for this page because it relies on the
// client‑side Firebase Auth state.  Without this Next.js will attempt to
// pre‑render the page at build time and cause an invalid API key error.
export const dynamic = 'force-dynamic';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import type { Note } from '@/types';

/**
 * The notes page fetches and displays a list of summarised notes.  Each
 * note can be expanded to reveal the full summary and includes a link
 * back to the original PDF.  Only authenticated users can access this
 * page; unauthenticated visitors are redirected to the login screen.
 */
export default function NotesPage() {
  const router = useRouter();
  const [notes, setNotes] = useState<Note[]>([]);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [userChecked, setUserChecked] = useState(false);

  // Require authentication
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        router.push('/login');
      }
      setUserChecked(true);
    });
    return () => unsubscribe();
  }, [router]);

  // Load all notes on mount
  useEffect(() => {
    async function loadNotes() {
      try {
        const res = await fetch('/api/notes');
        const data = await res.json();
        setNotes(data.notes ?? []);
      } catch (err) {
        console.error('Failed to fetch notes', err);
        setNotes([]);
      }
    }
    loadNotes();
  }, []);

  function toggle(noteId: string) {
    setExpanded((prev) => (prev === noteId ? null : noteId));
  }

  if (!userChecked) return null;

  return (
    <main className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Your Notes</h1>
      {notes.length === 0 ? (
        <p>No notes found. Try uploading some PDFs first.</p>
      ) : (
        <ul className="space-y-4">
          {notes.map((note) => (
            <li key={note.id} className="border rounded p-4 bg-white shadow">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold">{note.title}</h2>
                <button
                  onClick={() => toggle(note.id)}
                  className="text-sm text-blue-600 hover:underline"
                >
                  {expanded === note.id ? 'Hide' : 'View Full Summary'}
                </button>
              </div>
              <p className="mt-2 text-gray-700">
                {expanded === note.id ? note.fullText : note.summary}
              </p>
              {note.pdfUrl && (
                <a
                  href={note.pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block mt-3 text-blue-600 hover:underline"
                >
                  Open PDF
                </a>
              )}
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}