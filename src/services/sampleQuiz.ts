import type { QuizQuestion } from '@/types';

/**
 * A mapping from topic identifiers to multiple choice quiz questions.  These
 * questions mirror the examples in the existing `QuizForm` component and
 * can be served via the `/api/quiz` endpoint.
 */
export const sampleQuiz: Record<string, QuizQuestion[]> = {
  'time-and-work': [
    {
      question:
        'If A can do a job in 10 days and B in 5 days, how long will they take together?',
      options: ['2 days', '3.33 days', '4 days', '5 days'],
      answer: '3.33 days',
    },
  ],
  'pipes-and-cisterns': [
    {
      question:
        'A pipe fills a tank in 6 hrs and another empties in 12 hrs. What is the net fill time?',
      options: ['4 hrs', '6 hrs', '8 hrs', '12 hrs'],
      answer: '8 hrs',
    },
  ],
  'number-series': [
    {
      question: 'What comes next? 2, 4, 8, 16, ?',
      options: ['20', '24', '32', '36'],
      answer: '32',
    },
  ],
};