// components/layout/Navbar.tsx
"use client";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';


export default function Navbar() {
  // Store the current Firebase user.  We intentionally type this as
  // `any` because the full `User` type from Firebase contains many
  // optional properties that are not used in this component.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    setUser(null);
    router.push('/');
  };

  return (
    <nav className="flex justify-between items-center p-4 shadow-md sticky top-0 bg-white z-50">
      <Link href="/" className="text-xl font-bold text-blue-600">
        SmartStudy
      </Link>
      <div className="space-x-4">
        <Link href="/" className="hover:underline">
          Home
        </Link>
        <Link href="/pricing" className="hover:underline">
          Pricing
        </Link>
        {user && (
          <Link href="/dashboard" className="hover:underline">
            Dashboard
          </Link>
        )}
        {!user ? (
          <Link
            href="/login"
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Login / Sign Up
          </Link>
        ) : (
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-4 py-2 rounded"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}
