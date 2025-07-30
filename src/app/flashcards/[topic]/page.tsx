"use client";

// Disable static rendering for flashcards because the component uses
// client‑side Firebase authentication.  If Next.js attempted to
// prerender this page at build time it would throw an invalid API key error.
export const dynamic = 'force-dynamic';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import type { Flashcard } from '@/types';
import { useProgressStore } from '@/store/useProgressStore';

/**
 * The flashcard deck page displays a series of cards for a single topic.
 * Users can flip each card to reveal the answer and navigate through the
 * deck.  Each viewed card increments the flashcards counter and awards
 * a small amount of XP (1 XP per card).  Only authenticated users may
 * access this page.
 */
export default function TopicFlashcardsPage() {
  const router = useRouter();
  const params = useParams();
  const topicId = Array.isArray(params?.topic)
    ? params.topic[0]
    : (params?.topic as string);
  const [cards, setCards] = useState<Flashcard[]>([]);
  const [index, setIndex] = useState(0);
  const [showBack, setShowBack] = useState(false);
  const [userChecked, setUserChecked] = useState(false);
  const { incrementFlashcards, gainXp } = useProgressStore();

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

  // Load the flashcards for this topic
  useEffect(() => {
    async function loadCards() {
      try {
        const res = await fetch(`/api/flashcards?topic=${topicId}`);
        const data = await res.json();
        setCards(data.flashcards ?? []);
      } catch (err) {
        console.error('Failed to load flashcards', err);
        setCards([]);
      }
    }
    if (topicId) loadCards();
  }, [topicId]);

  // When the index changes, record that a flashcard has been viewed and award XP
  useEffect(() => {
    if (cards.length > 0) {
      incrementFlashcards();
      gainXp(1);
    }
  }, [index, cards.length, incrementFlashcards, gainXp]);

  if (!userChecked) return null;
  if (cards.length === 0) {
    return (
      <main className="p-6 max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-4 capitalize">
          Flashcards: {topicId.replaceAll('-', ' ')}
        </h1>
        <p>No flashcards available for this topic.</p>
      </main>
    );
  }

  const card = cards[index];

  function nextCard() {
    setShowBack(false);
    setIndex((i) => (i + 1) % cards.length);
  }
  function prevCard() {
    setShowBack(false);
    setIndex((i) => (i - 1 + cards.length) % cards.length);
  }

  return (
    <main className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 capitalize">
        Flashcards: {topicId.replaceAll('-', ' ')}
      </h1>
      <div className="bg-white border rounded shadow p-8 flex flex-col items-center">
        <div
          className="w-full h-40 flex items-center justify-center text-xl font-medium border rounded mb-4 cursor-pointer"
          onClick={() => setShowBack((v) => !v)}
        >
          {showBack ? card.back : card.front}
        </div>
        <div className="flex justify-between w-full">
          <button
            onClick={prevCard}
            className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
          >
            Previous
          </button>
          <button
            onClick={() => setShowBack((v) => !v)}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            {showBack ? 'Show Front' : 'Flip'}
          </button>
          <button
            onClick={nextCard}
            className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
          >
            Next
          </button>
        </div>
        <p className="mt-3 text-sm text-gray-600">
          Card {index + 1} of {cards.length}
        </p>
      </div>
    </main>
  );
}