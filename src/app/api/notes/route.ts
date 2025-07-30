import { NextResponse } from 'next/server';
import { sampleNotes } from '@/services/sampleNotes';

/**
 * API endpoint returning summarised notes.  Supports optional filtering by
 * `topic` query parameter.  Returns all notes when no topic is provided.
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const topic = searchParams.get('topic');
  const notes = topic
    ? sampleNotes.filter((note) => note.topicId === topic)
    : sampleNotes;
  return NextResponse.json({ notes });
}