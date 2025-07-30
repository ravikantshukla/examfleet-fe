interface Props {
  topicId: string;
}

const dummyNotes = {
  'time-and-work': 'To solve time and work questions, use the concept of 1-day work...',
  'pipes-and-cisterns': 'If a pipe fills in 5 hrs, its 1 hour rate is 1/5 of tank...',
  'number-series': 'Identify arithmetic or geometric patterns between numbers...'
};

export default function NotesViewer({ topicId }: Props) {
  return (
    <div className="bg-white border p-4 rounded">
      <p className="whitespace-pre-line text-gray-800">
        {dummyNotes[topicId] || 'No notes found for this topic.'}
      </p>
    </div>
  );
}