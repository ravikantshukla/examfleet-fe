import { NextResponse } from 'next/server';
import { sampleFlashcards } from '@/services/sampleFlashcards';

/**
 * API endpoint to fetch flashcards.  An optional `topic` query parameter
 * filters the cards by their topicId.  When no topic is specified all
 * flashcards are returned.
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const topic = searchParams.get('topic');
  const cards = topic
    ? sampleFlashcards.filter((card) => card.topicId === topic)
    : sampleFlashcards;
  return NextResponse.json({ flashcards: cards });
}