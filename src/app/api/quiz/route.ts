import { NextResponse } from 'next/server';
import { sampleQuiz } from '@/services/sampleQuiz';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;

/**
 * API endpoint that returns multiple choice quiz questions for a given
 * topic.  Use `?topic=<topicId>` to retrieve a specific set; otherwise
 * returns an empty list.
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const topic = searchParams.get('topic');
  // If no topic is provided return an empty list
  if (!topic) {
    return NextResponse.json({ questions: [] });
  }
  // If an API base is configured call the backend to generate a quiz.  Since
  // the Lambda expects a summary we use the topic identifier as a simple
  // placeholder summary.  In a real application you would pass the actual
  // summary of the uploaded note.
  if (API_BASE) {
    try {
      const res = await fetch(`${API_BASE}/generate-quiz`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ summary: topic }),
      });
      const data = await res.json();
      if (res.ok && Array.isArray(data.questions)) {
        return NextResponse.json({ questions: data.questions }, { status: res.status });
      }
    } catch (err) {
      console.error('Generate quiz proxy failed', err);
    }
  }
  // Fallback to sample data when API base is not configured or request fails
  const questions = sampleQuiz[topic] || [];
  return NextResponse.json({ questions });
}