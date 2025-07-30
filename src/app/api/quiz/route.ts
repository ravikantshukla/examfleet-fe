import { NextResponse } from 'next/server';
import { sampleQuiz } from '@/services/sampleQuiz';

/**
 * API endpoint that returns multiple choice quiz questions for a given
 * topic.  Use `?topic=<topicId>` to retrieve a specific set; otherwise
 * returns an empty list.
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const topic = searchParams.get('topic');
  const questions = topic ? sampleQuiz[topic] || [] : [];
  return NextResponse.json({ questions });
}