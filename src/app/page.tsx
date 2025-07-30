import Link from 'next/link';

/**
 * Home page for the ExamFleet application.  This page provides a high‑level
 * overview of the platform including recent exam notifications, access
 * to previous year papers, and quick links to try a quiz or flashcards.
 * It also encourages users to explore premium plans for unlimited access.
 */
export default function Home() {
  // Sample notifications for demonstration.  In a real application these
  // would be fetched from an API or content management system.
  const notifications = [
    {
      title: 'UPSC CSE 2024 Prelims Result Announced',
      date: '25 July 2025',
      description:
        'Check your result on the official UPSC portal. Congratulations to all qualifiers!',
    },
    {
      title: 'SSC CGL Tier I 2024 Admit Card Released',
      date: '1 June 2025',
      description:
        'Download your admit card from the SSC website and verify your exam centre details.',
    },
    {
      title: 'Banking Exams Calendar Updated',
      date: '15 May 2025',
      description:
        'IBPS has updated the exam schedule for PO and Clerk exams. View dates here.',
    },
  ];

  return (
    <main className="p-4 md:p-8 max-w-6xl mx-auto space-y-12">
      {/* Hero section */}
      <section className="text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold">
          Prepare for Government Exams with ExamFleet
        </h1>
        <p className="text-lg md:text-xl text-gray-600">
          Download past papers, test yourself with quizzes and flashcards, and
          track your progress all in one place.
        </p>
        <Link
          href="/pricing"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md mt-2"
        >
          Explore Premium Plans
        </Link>
      </section>

      {/* Notifications section */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Latest Notifications</h2>
        <ul className="space-y-3">
          {notifications.map((note) => (
            <li
              key={note.title}
              className="border p-4 rounded-md hover:bg-gray-50 transition"
            >
              <h3 className="font-medium text-lg mb-1">{note.title}</h3>
              <p className="text-sm text-gray-500 mb-1">{note.date}</p>
              <p className="text-gray-600 text-sm">{note.description}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* Previous year papers section */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Previous Year Papers</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <a
            href="#"
            className="block border rounded-md p-4 hover:bg-gray-50 transition"
          >
            <h3 className="font-medium mb-1">UPSC CSE Prelims 2024</h3>
            <p className="text-sm text-blue-600 underline">Download Paper</p>
          </a>
          <a
            href="#"
            className="block border rounded-md p-4 hover:bg-gray-50 transition"
          >
            <h3 className="font-medium mb-1">SSC CGL Model Question Paper</h3>
            <p className="text-sm text-blue-600 underline">Download Paper</p>
          </a>
          <a
            href="#"
            className="block border rounded-md p-4 hover:bg-gray-50 transition"
          >
            <h3 className="font-medium mb-1">Bank PO Previous Papers</h3>
            <p className="text-sm text-blue-600 underline">Coming Soon</p>
          </a>
        </div>
      </section>

      {/* Try quiz and flashcards section */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="border rounded-md p-6 flex flex-col justify-between">
          <div>
            <h2 className="text-xl font-semibold mb-2">Try a Quiz</h2>
            <p className="text-gray-600 mb-4">
              Test your knowledge with a sample question from our quiz bank.
            </p>
          </div>
          <Link
            href="/quiz/time-and-work"
            className="inline-block mt-auto bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md"
          >
            Start Sample Quiz
          </Link>
        </div>
        <div className="border rounded-md p-6 flex flex-col justify-between">
          <div>
            <h2 className="text-xl font-semibold mb-2">Preview Flashcards</h2>
            <p className="text-gray-600 mb-4">
              Review a few flashcards to get a feel for the study aids in our
              premium plan.
            </p>
          </div>
          <Link
            href="/flashcards/time-and-work"
            className="inline-block mt-auto bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md"
          >
            View Sample Flashcards
          </Link>
        </div>
      </section>
    </main>
  );
}