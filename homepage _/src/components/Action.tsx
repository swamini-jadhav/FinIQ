import { ArrowRight } from 'lucide-react';

export function Action() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50">
      <div className="max-w-7xl mx-auto">
        <div className="relative overflow-hidden bg-gradient-to-br from-emerald-600 to-cyan-600 rounded-2xl p-12 sm:p-16 text-center shadow-2xl">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.1),transparent)]"></div>
          
          <div className="relative">
            <h2 className="text-white text-4xl sm:text-5xl mb-6">
              Ready to Start Investing Smarter?
            </h2>
            <p className="text-emerald-50 text-lg max-w-2xl mx-auto mb-8">
              Join thousands of investors who are already using FinIQ to make better investment decisions with AI-powered insights.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white hover:bg-slate-50 text-emerald-600 px-8 py-4 rounded-lg inline-flex items-center justify-center gap-2 transition-colors shadow-lg">
                Get Started
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
