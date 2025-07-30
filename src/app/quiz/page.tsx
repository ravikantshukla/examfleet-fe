import TopicCard from '@/components/ui/TopicCard';
import { topics } from '@/lib/topics';

/**
 * The quiz landing page displays the available subjects as cards.  Each card
 * links to the notes and quiz pages for that topic.  We reuse the
 * `TopicCard` component to handle navigation.
 */
export default function QuizTopicsPage() {
  return (
    <main className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Select a Topic</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {topics.map((topic) => (
          <TopicCard key={topic.id} topic={topic} />
        ))}
      </div>
    </main>
  );
}