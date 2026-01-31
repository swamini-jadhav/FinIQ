import { ArrowRight } from "lucide-react";

export function Hero() {
  return (
    <section className="min-h-screen flex items-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto w-full">
        <div className="flex flex-col items-center text-center space-y-8">

          <div className="bg-emerald-50 border border-emerald-200 rounded-full px-6 py-2 text-center w-fit mx-auto">
            <span className="text-emerald-700 text-sm block">
              AI-Powered Investment Intelligence
            </span>
          </div>

          <h1 className="text-slate-900 text-5xl sm:text-6xl lg:text-7xl leading-tight max-w-5xl">
            Make Informed Investment Decisions with{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-cyan-600">
              AI Insights
            </span>
          </h1>

          <p className="text-slate-600 text-lg sm:text-xl max-w-2xl">
            FinIQ combines real-time data analysis, market trends, and AI-driven
            predictions to help you invest smarter and stay ahead of the market.
          </p>
          
          <div className="flex gap-4">
            <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-lg flex items-center gap-2 transition-colors">
              Sign Up Now!
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}
