import type { Flashcard } from '@/types';

/**
 * Flashcards derived from the sample notes.  Each card contains a simple
 * question on the front and its answer on the back.  For demonstration
 * purposes these cards are kept minimal; you can expand them to cover
 * more granular facts or formulas as your content grows.
 */
export const sampleFlashcards: Flashcard[] = [
  {
    id: 'fc-1',
    front: 'What is the combined work rate formula for two people?',
    back: 'The combined work rate is the sum of their individual rates: 1/T = 1/T₁ + 1/T₂.',
    topicId: 'time-and-work',
  },
  {
    id: 'fc-2',
    front: 'How do you calculate net pipe fill rate?',
    back: 'Subtract the emptying rate from the filling rate to find the net rate.',
    topicId: 'pipes-and-cisterns',
  },
  {
    id: 'fc-3',
    front: 'What comes next in the series 2, 4, 8, 16?',
    back: '32 — the sequence doubles each time.',
    topicId: 'number-series',
  },
];