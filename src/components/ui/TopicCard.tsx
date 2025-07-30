'use client';

import { useRouter } from 'next/navigation';
import { Topic } from '@/types';

interface Props {
  topic: Topic;
}

export default function TopicCard({ topic }: Props) {
  const router = useRouter();

  return (
    <div className="border rounded-lg p-4 shadow hover:shadow-lg transition">
      <h2 className="text-xl font-semibold mb-2">{topic.title}</h2>
      <p className="text-gray-600 mb-4">{topic.description}</p>
      <div className="flex gap-3">
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          onClick={() => router.push(`/notes/${topic.id}`)}
        >
          Notes
        </button>
        <button
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
          onClick={() => router.push(`/quiz/${topic.id}`)}
        >
          Quiz
        </button>
      </div>
    </div>
  );
}