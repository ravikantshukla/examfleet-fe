import QuizForm from '@/components/ui/QuizForm';
import { topics } from '@/lib/topics';

interface Props {
  params: { topic: string };
}

export default function QuizPage({ params }: Props) {
  const topic = topics.find((t) => t.id === params.topic);
  if (!topic) return <div className="p-6">Topic not found</div>;

  return (
    <main className="p-6">
      <h1 className="text-xl font-bold mb-4">{topic.title} - Quiz</h1>
      <QuizForm topicId={topic.id} />
    </main>
  );
}