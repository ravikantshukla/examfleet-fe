import type { Topic } from '@/types';

/**
 * A centralised list of quiz and note topics used throughout the
 * application.  Each entry includes a unique identifier, a human
 * friendly title and a short description.  These topics are used to
 * populate the dashboard, quizzes, flashcards and notes sections.
 */
export const topics: Topic[] = [
  {
    id: 'time-and-work',
    title: 'Time and Work',
    description:
      'Learn about efficiency, work completion rates and how to combine efforts.',
  },
  {
    id: 'pipes-and-cisterns',
    title: 'Pipes and Cisterns',
    description:
      'Understand inflow and outflow problems involving tanks, pipes and cisterns.',
  },
  {
    id: 'number-series',
    title: 'Number Series',
    description:
      'Identify patterns in arithmetic, geometric and other numerical sequences.',
  },
];