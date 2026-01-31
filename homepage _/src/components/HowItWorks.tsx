const steps = [
  {
    number: '01',
    title: 'Connect Your Data',
    description: 'Link your portfolio or select stocks you want to track. Our platform integrates with major financial data providers.'
  },
  {
    number: '02',
    title: 'AI Analysis',
    description: 'We scan price action, news sentiment, and historical patterns every minute — so you don’t have to.'
  },
  {
    number: '03',
    title: 'Get Recommendations',
    description: 'Receive personalized stock recommendations and predictions tailored to your investment goals and risk profile.'
  },
  {
    number: '04',
    title: 'Make Informed Decisions',
    description: 'Use our insights, chatbot support, and comprehensive analytics to make confident investment choices.'
  }
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-slate-900 text-4xl sm:text-5xl mb-4">
            How FinIQ Works
          </h2>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto">
            From data collection to actionable insights in four simple steps.
          </p>
        </div>

        <div className="max-w-3xl mx-auto mb-16 flex flex-col items-center">
          <div className="space-y-8">
            {steps.map((step, index) => (
              <div
                key={index}
                className="flex gap-6 w-full max-w-2xl">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-gradient-to-br from-emerald-600 to-cyan-600 rounded-lg flex items-center justify-center shadow-lg">
                    <span className="text-white text-xl">{step.number}</span>
                  </div>
                </div>
                <div>
                  <h3 className="text-slate-900 text-xl mb-2">
                    {step.title}
                  </h3>
                  <p className="text-slate-600">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}