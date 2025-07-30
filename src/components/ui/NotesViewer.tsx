interface Props {
  topicId: string;
}

// Use a strongly typed record so TypeScript knows that any string key is allowed
const dummyNotes: Record<string, string> = {
  'time-and-work':
    'To solve time and work questions, use the concept of 1‑day work...',
  'pipes-and-cisterns':
    'If a pipe fills in 5 hrs, its 1 hour rate is 1/5 of the tank...',
  'number-series':
    'Identify arithmetic or geometric patterns between numbers...'
};

export default function NotesViewer({ topicId }: Props) {
  const note = dummyNotes[topicId];
  return (
    <div className="bg-white border p-4 rounded">
      <p className="whitespace-pre-line text-gray-800">
        {note ?? 'No notes found for this topic.'}
      </p>
    </div>
  );
}