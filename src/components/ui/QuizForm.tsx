"use client";

import { useEffect, useState } from 'react';
import type { QuizQuestion } from '@/types';
import { useProgressStore } from '@/store/useProgressStore';

interface Props {
  /** The identifier of the topic to load questions for */
  topicId: string;
}

/**
 * A quiz form that fetches questions from the `/api/quiz` endpoint and walks
 * the user through them one by one.  It tracks selected answers and
 * displays a final score when complete.  Upon completion the progress
 * store is updated to reflect a quiz taken and the XP earned (10 points per
 * correct answer).
 */
export default function QuizForm({ topicId }: Props) {
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [score, setScore] = useState<number | null>(null);
  const { gainXp, incrementQuizzes } = useProgressStore();

  // Fetch the quiz questions when the component mounts or topic changes
  useEffect(() => {
    async function loadQuestions() {
      try {
        const res = await fetch(`/api/quiz?topic=${topicId}`);
        const data = await res.json();
        setQuestions(data.questions ?? []);
      } catch (err) {
        console.error('Failed to load quiz questions', err);
        setQuestions([]);
      }
    }
    loadQuestions();
  }, [topicId]);

  // Evaluate the selected answer and move to the next question or finish
  function handleNext() {
    if (!selected) return;
    const question = questions[current];
    const isCorrect = selected === question.answer;
    // Update score if correct
    setScore((prev) => (prev ?? 0) + (isCorrect ? 1 : 0));
    // Reset selection for next question
    setSelected(null);
    if (current + 1 < questions.length) {
      setCurrent((i) => i + 1);
    } else {
      // Quiz complete
      // Finalize the score and update progress
      const finalScore = (score ?? 0) + (isCorrect ? 1 : 0);
      setScore(finalScore);
      incrementQuizzes();
      gainXp(finalScore * 10);
    }
  }

  if (questions.length === 0) {
    return <p>No quiz found for this topic.</p>;
  }

  // When score is not null and we've completed all questions
  if (score !== null && current >= questions.length) {
    return (
      <div className="bg-white border p-6 rounded shadow">
        <h2 className="text-2xl font-semibold mb-4">Quiz Complete!</h2>
        <p className="mb-2">
          You answered {score} out of {questions.length} questions correctly.
        </p>
        <p>
          XP earned: <span className="font-bold">{score * 10}</span>
        </p>
      </div>
    );
  }

  const question = questions[current];

  return (
    <div className="bg-white border p-6 rounded shadow">
      <p className="font-medium mb-4">
        Question {current + 1} of {questions.length}: {question.question}
      </p>
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
      <button
        onClick={handleNext}
        disabled={!selected}
        className="mt-4 bg-blue-600 disabled:bg-gray-400 text-white px-4 py-2 rounded"
      >
        {current + 1 < questions.length ? 'Next' : 'Submit'}
      </button>
    </div>
  );
}