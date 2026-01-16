import { TrendingUp, Brain, Newspaper, Star, MessageCircle, BarChart3 } from 'lucide-react';

const features = [
  {
    icon: BarChart3,
    title: 'Real-Time Data Analysis',
    description: 'Access live market data and comprehensive analytics to track performance and identify opportunities instantly.'
  },
  {
    icon: Brain,
    title: 'AI-Driven Insights',
    description: 'Leverage advanced machine learning algorithms to uncover patterns and make data-backed investment decisions.'
  },
  {
    icon: TrendingUp,
    title: 'Market Trend Analysis',
    description: 'Stay ahead with intelligent trend detection and forecasting to understand where the market is heading.'
  },
  {
    icon: Star,
    title: 'Stock Predictions',
    description: 'Get AI-powered price predictions and trend forecasts based on historical data and market conditions.'
  },
  {
    icon: Newspaper,
    title: 'News Sentiment Analysis',
    description: 'Automatically analyze financial news and social media to gauge market sentiment and potential impacts.'
  },
  {
    icon: MessageCircle,
    title: 'Finance Chatbot',
    description: 'Ask questions and get instant answers from our AI assistant trained on financial markets and investing.'
  }
];

export function Features() {
  return (
    <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-slate-900 text-4xl sm:text-5xl mb-4">
            Powerful Features for Smart Investing
          </h2>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto">
            Everything you need to analyze markets, predict trends, and make confident investment decisions.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-white border border-slate-200 rounded-xl p-6 hover:border-emerald-300 hover:shadow-lg transition-all group"
            >
              <div className="w-12 h-12 bg-emerald-50 rounded-lg flex items-center justify-center mb-4 group-hover:bg-emerald-100 transition-colors">
                <feature.icon className="w-6 h-6 text-emerald-600" />
              </div>
              <h3 className="text-slate-900 text-xl mb-3">{feature.title}</h3>
              <p className="text-slate-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
