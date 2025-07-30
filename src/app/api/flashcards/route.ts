import { NextResponse } from 'next/server';
import { sampleFlashcards } from '@/services/sampleFlashcards';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;

/**
 * API endpoint to fetch flashcards.  An optional `topic` query parameter
 * filters the cards by their topicId.  When no topic is specified all
 * flashcards are returned.
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const topic = searchParams.get('topic');
  // Attempt to call the backend if configured
  if (API_BASE && topic) {
    try {
      const res = await fetch(`${API_BASE}/flashcards`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ summary: topic, topicId: topic }),
      });
      const data = await res.json();
      if (res.ok && Array.isArray(data.flashcards)) {
        return NextResponse.json({ flashcards: data.flashcards }, { status: res.status });
      }
    } catch (err) {
      console.error('Flashcards proxy failed', err);
    }
  }
  // Fallback to sample data
  const cards = topic
    ? sampleFlashcards.filter((card) => card.topicId === topic)
    : sampleFlashcards;
  return NextResponse.json({ flashcards: cards });
}