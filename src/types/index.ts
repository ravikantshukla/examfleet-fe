export interface Topic {
  id: string;
  title: string;
  description: string;
}

export interface QuizQuestion {
  question: string;
  options: string[];
  answer: string;
}

// A summarised note as returned from the backend.  Each note belongs to a
// topic and can optionally include a link to the original PDF.
export interface Note {
  /** Unique identifier for the note */
  id: string;
  /** Title or headline of the note */
  title: string;
  /** Two‑line summary snippet */
  summary: string;
  /** Full text of the summarised note */
  fullText: string;
  /** Topic identifier the note is associated with */
  topicId: string;
  /** Optional URL pointing to the uploaded PDF */
  pdfUrl?: string;
}

// A flashcard model consisting of a question/answer pair.  Flashcards are
// derived from notes and grouped by topic.  The front of the card holds the
// question while the back contains the answer.
export interface Flashcard {
  id: string;
  front: string;
  back: string;
  topicId: string;
}