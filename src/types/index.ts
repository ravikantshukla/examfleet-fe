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