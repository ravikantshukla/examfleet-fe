'use client';

import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/lib/firebase';

interface Note {
  id: string;
  title: string;
  uploadedAt: string;
  fileUrl: string;
}

export default function NotesPage() {
  const [user, setUser] = useState<any>(null);
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    // Replace with your actual fetch logic from backend/S3
    setNotes([
      {
        id: '1',
        title: 'Thermodynamics Notes',
        uploadedAt: '2024-01-10',
        fileUrl: '#',
      },
      {
        id: '2',
        title: 'Quantum Mechanics Summary',
        uploadedAt: '2024-02-15',
        fileUrl: '#',
      },
    ]);
  }, []);

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Your Uploaded Notes</h1>

      {notes.length === 0 ? (
        <p>No notes uploaded yet.</p>
      ) : (
        <ul className="space-y-4">
          {notes.map((note) => (
            <li key={note.id} className="p-4 border rounded shadow">
              <h2 className="font-semibold text-lg">{note.title}</h2>
              <p className="text-sm text-gray-600">Uploaded on {note.uploadedAt}</p>
              <a
                href={note.fileUrl}
                className="text-blue-600 hover:underline"
                target="_blank"
              >
                View Note
              </a>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
