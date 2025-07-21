import { Topic } from '@/types/topic';

export default function TopicCard({ topic }: { topic: Topic }) {
  return (
    <div className="border rounded-lg p-4 shadow-sm hover:shadow-md transition">
      <h3 className="text-lg font-bold mb-2">{topic.title}</h3>
      <p className="text-sm text-gray-600">{topic.description}</p>
      <div className="mt-4 flex gap-2">
        <button className="bg-blue-500 text-white px-3 py-1 rounded">Notes</button>
        <button className="bg-green-500 text-white px-3 py-1 rounded">Quiz</button>
      </div>
    </div>
  );
}