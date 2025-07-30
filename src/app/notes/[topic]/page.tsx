"use client";

// Prevent pre‑rendering because this page uses client‑only Firebase
// authentication.  See `src/app/notes/page.tsx` for details.
export const dynamic = 'force-dynamic';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import type { Note } from '@/types';

/**
 * Dynamic route that displays notes for a specific topic.  It fetches the
 * notes via the `/api/notes?topic=<topic>` endpoint and allows the user
 * to expand each note to read the full summary.  Only authenticated
 * users may access this route.
 */
export default function TopicNotesPage() {
  const router = useRouter();
  const params = useParams();
  const topicId = Array.isArray(params?.topic)
    ? params.topic[0]
    : (params?.topic as string);
  const [notes, setNotes] = useState<Note[]>([]);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [userChecked, setUserChecked] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        router.push('/login');
      }
      setUserChecked(true);
    });
    return () => unsubscribe();
  }, [router]);

  useEffect(() => {
    async function loadNotes() {
      try {
        const res = await fetch(`/api/notes?topic=${topicId}`);
        const data = await res.json();
        setNotes(data.notes ?? []);
      } catch (err) {
        console.error('Failed to fetch notes', err);
        setNotes([]);
      }
    }
    if (topicId) loadNotes();
  }, [topicId]);

  function toggle(id: string) {
    setExpanded((prev) => (prev === id ? null : id));
  }

  if (!userChecked) return null;

  return (
    <main className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 capitalize">
        Notes: {topicId.replaceAll('-', ' ')}
      </h1>
      {notes.length === 0 ? (
        <p>No notes available for this topic.</p>
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