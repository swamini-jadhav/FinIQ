import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { mlAPI } from '../utils/api';
import { 
  TrendingUp, Search, LogOut, User, AlertCircle, 
  TrendingDown, Minus, Newspaper, Bot, BarChart3,
  Loader2, CheckCircle, XCircle
} from 'lucide-react';
import PredictionChart from '../components/PredictionChart';
import NewsCard from '../components/NewsCard';
import Chatbot from '../components/Chatbot';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [ticker, setTicker] = useState('');
  const [company, setCompany] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState('');
  const [showChatbot, setShowChatbot] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    
    if (!ticker.trim()) {
      setError('Please enter a stock ticker');
      return;
    }

    setLoading(true);
    setError('');
    setResults(null);

    try {
      // Fetch comprehensive analysis
      const response = await mlAPI.recommendation(ticker.toUpperCase(), company);
      
      if (response.data.success) {
        // setResults(response.data.data);
        const actualData = response.data.data?.data || response.data.data;
        setResults(actualData);
      } else {
        setError(response.data.message || 'Analysis failed');
      }
    } catch (err) {
      console.error('Analysis error:', err);
      setError(
        err.response?.data?.message || 
        'Failed to analyze stock. Please check the ticker and try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  const getRecommendationColor = (action) => {
    switch (action) {
      case 'BUY':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'SELL':
        return 'bg-red-100 text-red-800 border-red-300';
      default:
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
    }
  };

  const getSentimentColor = (sentiment) => {
    switch (sentiment) {
      case 'positive':
        return 'text-green-600';
      case 'negative':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <TrendingUp className="h-8 w-8 text-blue-600" />
              <h1 className="text-2xl font-bold gradient-text">FinIQ</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowChatbot(!showChatbot)}
                className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition"
              >
                <Bot className="h-5 w-5" />
                <span className="hidden sm:inline">AI Assistant</span>
              </button>
              
              <div className="flex items-center space-x-2 px-4 py-2 bg-gray-100 rounded-lg">
                <User className="h-5 w-5 text-gray-600" />
                <span className="text-gray-700 font-medium hidden sm:inline">{user?.name}</span>
              </div>
              
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition"
              >
                <LogOut className="h-5 w-5" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Stock Analysis</h2>
          
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                value={ticker}
                onChange={(e) => setTicker(e.target.value.toUpperCase())}
                placeholder="Enter stock ticker (e.g., AAPL, TCS.NS)"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
            </div>
            
            <div className="flex-1">
              <input
                type="text"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="Company name (optional)"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
            </div>
            
            <button
              type="submit"
              disabled={loading}
              className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:shadow-lg transform hover:scale-[1.02] transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {loading ? (
                <>
                  <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Search className="h-5 w-5 mr-2" />
                  Analyze
                </>
              )}
            </button>
          </form>

          {error && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start">
              <AlertCircle className="h-5 w-5 text-red-500 mt-0.5 mr-2" />
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}
        </div>

        {/* Results Section */}
        {/* {results && ( */}
        {results && results.recommendation && results.prediction && (
          <div className="space-y-6">
            {/* Recommendation Card */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-800">
                  {results.ticker} Analysis
                </h3>
                <div className={`px-6 py-3 rounded-full border-2 ${getRecommendationColor(results.recommendation.action)}`}>
                  <span className="text-lg font-bold">{results.recommendation.recommendation}</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                {/* Predicted Price */}
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-600">Predicted Price</span>
                    <BarChart3 className="h-5 w-5 text-blue-600" />
                  </div>
                  <p className="text-3xl font-bold text-gray-800">
                    {results.prediction.currency} {results.prediction.predicted_price.toFixed(2)}
                  </p>
                  <div className="flex items-center mt-2">
                    {results.prediction.percent_change >= 0 ? (
                      <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-red-600 mr-1" />
                    )}
                    <span className={`text-sm font-semibold ${results.prediction.percent_change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {results.prediction.percent_change >= 0 ? '+' : ''}{results.prediction.percent_change.toFixed(2)}%
                    </span>
                  </div>
                </div>

                {/* Current Price */}
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-600">Current Price</span>
                    <Minus className="h-5 w-5 text-purple-600" />
                  </div>
                  <p className="text-3xl font-bold text-gray-800">
                    {results.prediction.currency} {results.prediction.last_close.toFixed(2)}
                  </p>
                  <p className="text-sm text-gray-600 mt-2">Last close</p>
                </div>

                {/* Model Confidence */}
                <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-600">Model Confidence</span>
                    {results.prediction.r2_score > 0.9 ? (
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    ) : (
                      <XCircle className="h-5 w-5 text-yellow-600" />
                    )}
                  </div>
                  <p className="text-3xl font-bold text-gray-800">
                    {(results.prediction.r2_score * 100).toFixed(1)}%
                  </p>
                  <p className="text-sm text-gray-600 mt-2">R² Score: {results.prediction.r2_score.toFixed(3)}</p>
                </div>
              </div>

              {/* Recommendation Details */}
              <div className="bg-gray-50 rounded-xl p-4">
                <h4 className="font-semibold text-gray-800 mb-3">Analysis Summary</h4>
                <ul className="space-y-2">
                  {results.recommendation.reasons.map((reason, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-blue-600 mr-2">•</span>
                      <span className="text-gray-700">{reason}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="text-xs text-yellow-800">{results.recommendation.disclaimer}</p>
                </div>
              </div>
            </div>

            {/* Chart */}
            {results.prediction.recent_prices && (
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Price History</h3>
                <PredictionChart 
                  data={results.prediction.recent_prices}
                  predictedPrice={results.prediction.predicted_price}
                />
              </div>
            )}

            {/* News Sentiment */}
            {results.sentiment && results.sentiment.articles_analyzed > 0 && (
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-gray-800 flex items-center">
                    <Newspaper className="h-6 w-6 mr-2 text-blue-600" />
                    News Sentiment Analysis
                  </h3>
                  <div className="text-right">
                    <p className={`text-2xl font-bold ${getSentimentColor(results.sentiment.overall_sentiment)}`}>
                      {results.sentiment.overall_sentiment.toUpperCase()}
                    </p>
                    <p className="text-sm text-gray-600">
                      {results.sentiment.articles_analyzed} articles analyzed
                    </p>
                  </div>
                </div>

                {/* Sentiment Distribution */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="bg-green-50 rounded-lg p-3 text-center">
                    <p className="text-2xl font-bold text-green-600">
                      {results.sentiment.sentiment_distribution.positive}
                    </p>
                    <p className="text-sm text-gray-600">Positive</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3 text-center">
                    <p className="text-2xl font-bold text-gray-600">
                      {results.sentiment.sentiment_distribution.neutral}
                    </p>
                    <p className="text-sm text-gray-600">Neutral</p>
                  </div>
                  <div className="bg-red-50 rounded-lg p-3 text-center">
                    <p className="text-2xl font-bold text-red-600">
                      {results.sentiment.sentiment_distribution.negative}
                    </p>
                    <p className="text-sm text-gray-600">Negative</p>
                  </div>
                </div>

                {/* News Articles */}
                <div className="space-y-4">
                  {results.sentiment.recent_articles.slice(0, 5).map((article, index) => (
                    <NewsCard key={index} article={article} />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Welcome Message */}
        {!results && !loading && (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <TrendingUp className="h-16 w-16 text-blue-600 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Welcome to FinIQ!</h2>
            <p className="text-gray-600 mb-6">
              Enter a stock ticker to get AI-powered predictions, news sentiment analysis, and investment recommendations.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <span className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg text-sm font-medium">LSTM Predictions</span>
              <span className="px-4 py-2 bg-purple-100 text-purple-700 rounded-lg text-sm font-medium">Sentiment Analysis</span>
              <span className="px-4 py-2 bg-green-100 text-green-700 rounded-lg text-sm font-medium">AI Recommendations</span>
            </div>
          </div>
        )}
      </main>

      {/* Chatbot */}
      {showChatbot && (
        <Chatbot onClose={() => setShowChatbot(false)} context={{ ticker: results?.ticker }} />
      )}
    </div>
  );
};

export default Dashboard;
