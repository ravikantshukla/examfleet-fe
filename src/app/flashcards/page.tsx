"use client";

import { topics } from '@/lib/topics';

/**
 * The flashcards landing page lists all available topics and links to
 * individual flashcard decks.  We reuse the `TopicCard` component but
 * override its default buttons to point to the flashcards route.
 */
export default function FlashcardsTopicsPage() {
  return (
    <main className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Review Flashcards</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {topics.map((topic) => (
          <div key={topic.id} className="border rounded-lg p-4 shadow hover:shadow-lg transition">
            <h2 className="text-xl font-semibold mb-2">{topic.title}</h2>
            <p className="text-gray-600 mb-4">{topic.description}</p>
            <button
              className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded"
              onClick={() => {
                window.location.href = `/flashcards/${topic.id}`;
              }}
            >
              View Flashcards
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}