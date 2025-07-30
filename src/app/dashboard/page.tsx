"use client";
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import Link from 'next/link';

interface DashboardStats {
  notesCount: number;
  quizzesTaken: number;
  performanceScore: number;
}

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null);
  const [stats, setStats] = useState<DashboardStats>({
    notesCount: 3,
    quizzesTaken: 5,
    performanceScore: 78,
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);


  return (
    <main className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Welcome {user?.phoneNumber || user?.email || 'User'}</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white border p-4 rounded shadow">
          <h2 className="font-semibold text-lg">Uploaded Notes</h2>
          <p className="text-2xl mt-2">{stats.notesCount}</p>
        </div>
        <div className="bg-white border p-4 rounded shadow">
          <h2 className="font-semibold text-lg">Quizzes Taken</h2>
          <p className="text-2xl mt-2">{stats.quizzesTaken}</p>
        </div>
        <div className="bg-white border p-4 rounded shadow">
          <h2 className="font-semibold text-lg">Avg. Performance</h2>
          <p className="text-2xl mt-2">{stats.performanceScore}%</p>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link href="/upload" className="block p-4 bg-blue-100 text-blue-700 rounded text-center hover:bg-blue-200">
          Upload Notes
        </Link>
        <Link href="/notes" className="block p-4 bg-green-100 text-green-700 rounded text-center hover:bg-green-200">
          View Notes
        </Link>
        <Link href="/quiz" className="block p-4 bg-purple-100 text-purple-700 rounded text-center hover:bg-purple-200">
          Take Quiz
        </Link>
      </div>
    </main>
  );
}
