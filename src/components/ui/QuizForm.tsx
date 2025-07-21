import { QuizQuestion } from '@/types';
import { useState } from 'react';

const quizData: Record<string, QuizQuestion[]> = {
  'time-and-work': [
    {
      question: 'If A can do a job in 10 days and B in 5 days, how long together?',
      options: ['2 days', '3.33 days', '4 days', '5 days'],
      answer: '3.33 days',
    },
  ],
  'pipes-and-cisterns': [
    {
      question: 'A pipe fills a tank in 6 hrs and another empties in 12 hrs. Net fill time?',
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

export default function QuizForm({ topicId }: { topicId: string }) {
  const [selected, setSelected] = useState<string | null>(null);
  const question = quizData[topicId]?.[0];

  if (!question) return <p>No quiz found.</p>;

  return (
    <div className="bg-white border p-4 rounded">
      <p className="font-medium mb-4">{question.question}</p>
      <div className="space-y-2">
        {question.options.map((opt) => (
          <button
            key={opt}
            className={`block w-full px-4 py-2 text-left border rounded ${selected === opt ? 'bg-blue-100' : ''}`}
            onClick={() => setSelected(opt)}
          >
            {opt}
          </button>
        ))}
      </div>
      {selected && (
        <p className="mt-4 font-semibold">
          {selected === question.answer ? '✅ Correct!' : `❌ Wrong. Correct: ${question.answer}`}
        </p>
      )}
    </div>
  );
}