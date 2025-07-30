/**
 * The pricing page outlines the available subscription tiers for the SmartStudy
 * application.  For this MVP we offer a generous free plan and a paid plan
 * unlocking unlimited access.  In a production environment the paid plan
 * would integrate with a payment provider.  This page is a simple static
 * React component rendered on the client.
 */

export default function PricingPage() {
  const plans = [
    {
      name: 'Free',
      price: '₹0/month',
      features: [
        'Upload up to 5 notes per month',
        'Take 3 quizzes per day',
        'Access basic flashcards',
        'Track XP and basic stats',
      ],
    },
    {
      name: 'Pro',
      price: '₹499/month',
      features: [
        'Unlimited note uploads',
        'Unlimited quizzes & flashcards',
        'Advanced analytics & progress tracking',
        'Priority support and early feature access',
      ],
    },
  ];

  return (
    <main className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-center">Pricing Plans</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className="border rounded-lg shadow-md p-6 flex flex-col"
          >
            <h2 className="text-2xl font-semibold mb-2">{plan.name}</h2>
            <p className="text-4xl font-bold text-blue-600 mb-4">
              {plan.price}
            </p>
            <ul className="mb-6 space-y-2 flex-1">
              {plan.features.map((feat) => (
                <li key={feat} className="flex items-start space-x-2">
                  <span className="text-green-600">✓</span>
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
            <button
              disabled={plan.name === 'Free'}
              className="w-full bg-blue-600 disabled:bg-gray-400 text-white py-2 rounded-md"
            >
              {plan.name === 'Free' ? 'Current Plan' : 'Upgrade Now'}
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}