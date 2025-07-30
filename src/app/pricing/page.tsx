import Link from 'next/link';

/**
 * Pricing page listing subscription options for ExamFleet.  Users can
 * compare the free tier with paid plans and choose durations ranging
 * from one month to a full year.  In a production environment these
 * buttons would initiate a checkout process via a payment gateway.
 */
export default function PricingPage() {
  // Define the available plans.  Each plan has a name, feature list
  // describing the unlocked capabilities, and a set of tier options
  // specifying duration and price.  Prices here are illustrative and
  // should be adjusted according to your business model.
  const plans = [
    {
      name: 'Free Plan',
      features: [
        'Upload up to 5 notes per month',
        'Take 3 quizzes per day',
        'Access a limited set of flashcards',
        'Track XP and basic stats',
      ],
      tiers: [],
    },
    {
      name: 'FE Services Only',
      features: [
        'Unlimited access to previous year papers',
        'Summarise and save unlimited notes',
        'Basic quiz and flashcard attempts capped',
      ],
      tiers: [
        { duration: '1 Month', price: '₹199' },
        { duration: '3 Months', price: '₹449' },
        { duration: '6 Months', price: '₹699' },
        { duration: '1 Year', price: '₹999' },
      ],
    },
    {
      name: 'All Services',
      features: [
        'Unlimited note uploads',
        'Unlimited quizzes & flashcards',
        'Advanced analytics & progress tracking',
        'Priority support and early feature access',
      ],
      tiers: [
        { duration: '1 Month', price: '₹499' },
        { duration: '3 Months', price: '₹1,299' },
        { duration: '6 Months', price: '₹2,499' },
        { duration: '1 Year', price: '₹3,999' },
      ],
    },
  ];

  return (
    <main className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-center">Choose Your Plan</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className="border rounded-lg shadow-md p-6 flex flex-col"
          >
            <h2 className="text-2xl font-semibold mb-2">{plan.name}</h2>
            <ul className="mb-6 space-y-2 flex-1">
              {plan.features.map((feat) => (
                <li key={feat} className="flex items-start space-x-2">
                  <span className="text-green-600">✓</span>
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
            {/* Free plan has no tiers, so we disable the button */}
            {plan.tiers.length === 0 ? (
              <button
                disabled
                className="w-full bg-gray-300 text-gray-600 py-2 rounded-md cursor-not-allowed"
              >
                Current Plan
              </button>
            ) : (
              <div className="space-y-3">
                {plan.tiers.map((tier) => (
                  <button
                    key={tier.duration}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md"
                  >
                    {tier.duration} – {tier.price}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      <p className="text-sm text-center text-gray-500 mt-8">
        Looking for a custom plan or educational discounts?{' '}
        <Link href="#" className="underline text-blue-600">
          Contact us
        </Link>
        .
      </p>
    </main>
  );
}