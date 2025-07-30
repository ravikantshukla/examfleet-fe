"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";

const topics = [
  "Mathematics",
  "Physics",
  "Chemistry",
  "Biology",
  "General Knowledge",
];

export default function QuizPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (!currentUser) router.push("/login");
    });
    return () => unsubscribe();
  }, [router]);

  const handleTopicClick = (topic: string) => {
    router.push(`/quiz/${encodeURIComponent(topic)}`);
  };

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-6">Choose a Quiz Topic</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {topics.map((topic) => (
          <button
            key={topic}
            onClick={() => handleTopicClick(topic)}
            className="w-full p-6 bg-white shadow border rounded hover:bg-blue-50 text-left"
          >
            <span className="text-lg font-semibold">{topic}</span>
          </button>
        ))}
      </div>
    </main>
  );
}
