"use client";

// Prevent Next.js from attempting to statically render the dashboard on the
// server.  The dashboard depends on client‑side Firebase state, so we
// instruct Next.js to always render it dynamically on demand.
export const dynamic = 'force-dynamic';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useProgressStore } from '@/store/useProgressStore';

/**
 * The dashboard provides a high‑level overview of the user's progress.  It
 * displays counts of uploaded notes, quizzes taken and flashcards viewed
 * along with a simple XP progress bar.  Navigation cards link to the
 * primary sections of the app.  Access is restricted to authenticated
 * users.
 */
export default function DashboardPage() {
  const router = useRouter();
  const {
    xp,
    quizzesTaken,
    notesUploaded,
    flashcardsViewed,
  } = useProgressStore();
  // The user object returned by Firebase Auth contains many optional fields.
  // We use `unknown` here and leave runtime checks to Firebase rather than
  // specifying every possible property.  See https://firebase.google.com/docs/reference/js/auth.user
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [user, setUser] = useState<any>(null);
  const [userChecked, setUserChecked] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        router.push('/login');
      }
      setUser(currentUser);
      setUserChecked(true);
    });
    return () => unsubscribe();
  }, [router]);

  // Determine a level based on XP (simple threshold mapping)
  const level = Math.floor(xp / 100) + 1;
  const xpForNextLevel = 100;
  const progressPercent = ((xp % xpForNextLevel) / xpForNextLevel) * 100;

  if (!userChecked) return null;

  return (
    <main className="p-6 max-w-6xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Welcome {user?.displayName || user?.email || 'User'}</h1>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-white border p-4 rounded shadow">
          <h2 className="font-semibold text-lg">Notes Uploaded</h2>
          <p className="text-2xl mt-2">{notesUploaded}</p>
        </div>
        <div className="bg-white border p-4 rounded shadow">
          <h2 className="font-semibold text-lg">Quizzes Taken</h2>
          <p className="text-2xl mt-2">{quizzesTaken}</p>
        </div>
        <div className="bg-white border p-4 rounded shadow">
          <h2 className="font-semibold text-lg">Flashcards Reviewed</h2>
          <p className="text-2xl mt-2">{flashcardsViewed}</p>
        </div>
      </div>
      <div className="mb-8">
        <h2 className="font-semibold text-lg mb-2">Experience Points (XP)</h2>
        <div className="w-full h-4 bg-gray-200 rounded overflow-hidden">
          <div
            className="h-4 bg-green-500"
            style={{ width: `${progressPercent}%` }}
          ></div>
        </div>
        <p className="text-sm mt-2">
          Level {level} · {xp % xpForNextLevel} / {xpForNextLevel} XP to next level
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <button
          className="block w-full p-4 bg-blue-100 text-blue-700 rounded text-center hover:bg-blue-200"
          onClick={() => router.push('/upload')}
        >
          Upload Notes
        </button>
        <button
          className="block w-full p-4 bg-green-100 text-green-700 rounded text-center hover:bg-green-200"
          onClick={() => router.push('/notes')}
        >
          View Notes
        </button>
        <button
          className="block w-full p-4 bg-purple-100 text-purple-700 rounded text-center hover:bg-purple-200"
          onClick={() => router.push('/quiz')}
        >
          Take Quiz
        </button>
        <button
          className="block w-full p-4 bg-yellow-100 text-yellow-700 rounded text-center hover:bg-yellow-200"
          onClick={() => router.push('/flashcards')}
        >
          Review Flashcards
        </button>
      </div>
    </main>
  );
}