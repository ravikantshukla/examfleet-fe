"use client";

// Force dynamic rendering because this page depends on client‑side
// authentication via Firebase.  Static rendering would result in build
// failures due to missing API keys.
export const dynamic = 'force-dynamic';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import QuizForm from '@/components/ui/QuizForm';

/**
 * Dynamic route for taking a quiz on a specific topic.  It ensures the
 * user is authenticated before allowing access and passes the topic ID
 * down to the `QuizForm` component.  If the user is not logged in they
 * are redirected to the login page.
 */
export default function TopicQuizPage() {
  const router = useRouter();
  const params = useParams();
  const [userChecked, setUserChecked] = useState(false);
  const topicId = Array.isArray(params?.topic)
    ? params.topic[0]
    : (params?.topic as string);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        router.push('/login');
      }
      setUserChecked(true);
    });
    return () => unsubscribe();
  }, [router]);

  if (!userChecked) {
    return null;
  }

  return (
    <main className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 capitalize">Quiz: {topicId.replaceAll('-', ' ')}</h1>
      <QuizForm topicId={topicId} />
    </main>
  );
}