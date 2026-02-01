import requests
from textblob import TextBlob
import os
from datetime import datetime, timedelta

NEWSAPI_KEY = os.getenv('NEWSAPI_KEY')

def get_stock_news(ticker, company_name=None, days=7):
    """Fetch recent news articles for a stock"""
    try:
        # Determine search query
        if company_name:
            query = company_name
        else:
            # Try to extract company name from ticker
            query = ticker.replace('.NS', '').replace('.BO', '').replace('-', ' ')
        
        # Calculate date range
        to_date = datetime.now()
        from_date = to_date - timedelta(days=days)
        
        # NewsAPI endpoint
        url = 'https://newsapi.org/v2/everything'
        
        params = {
            'q': query,
            'from': from_date.strftime('%Y-%m-%d'),
            'to': to_date.strftime('%Y-%m-%d'),
            'language': 'en',
            'sortBy': 'publishedAt',
            'pageSize': 20,
            'apiKey': NEWSAPI_KEY
        }
        
        response = requests.get(url, params=params, timeout=10)
        
        if response.status_code != 200:
            print(f"NewsAPI error: {response.status_code}")
            return []
        
        data = response.json()
        articles = data.get('articles', [])
        
        return articles
        
    except Exception as e:
        print(f"Error fetching news: {str(e)}")
        return []


def analyze_sentiment(text):
    """Analyze sentiment of text using TextBlob"""
    try:
        blob = TextBlob(text)
        polarity = blob.sentiment.polarity
        
        # Classify sentiment
        if polarity > 0.1:
            sentiment = 'positive'
        elif polarity < -0.1:
            sentiment = 'negative'
        else:
            sentiment = 'neutral'
        
        return {
            'polarity': polarity,
            'sentiment': sentiment
        }
    except Exception as e:
        print(f"Sentiment analysis error: {str(e)}")
        return {
            'polarity': 0,
            'sentiment': 'neutral'
        }


def analyze_news_sentiment(ticker, company_name=None):
    """Analyze sentiment of news articles for a stock"""
    try:
        # Fetch news articles
        articles = get_stock_news(ticker, company_name)
        
        if not articles:
            return {
                'ticker': ticker,
                'articles_analyzed': 0,
                'overall_sentiment': 'neutral',
                'average_polarity': 0,
                'sentiment_distribution': {
                    'positive': 0,
                    'neutral': 0,
                    'negative': 0
                },
                'recent_articles': [],
                'message': 'No recent news articles found'
            }
        
        # Analyze each article
        sentiments = []
        analyzed_articles = []
        
        for article in articles[:10]:  # Analyze top 10 articles
            title = article.get('title', '')
            description = article.get('description', '')
            
            # Combine title and description for analysis
            text = f"{title}. {description}"
            
            sentiment = analyze_sentiment(text)
            sentiments.append(sentiment['polarity'])
            
            analyzed_articles.append({
                'title': title,
                'description': description,
                'url': article.get('url'),
                'source': article.get('source', {}).get('name'),
                'published_at': article.get('publishedAt'),
                'sentiment': sentiment['sentiment'],
                'polarity': round(sentiment['polarity'], 3)
            })
        
        # Calculate overall sentiment
        avg_polarity = sum(sentiments) / len(sentiments) if sentiments else 0
        
        if avg_polarity > 0.1:
            overall_sentiment = 'positive'
        elif avg_polarity < -0.1:
            overall_sentiment = 'negative'
        else:
            overall_sentiment = 'neutral'
        
        # Count sentiment distribution
        sentiment_counts = {
            'positive': sum(1 for s in sentiments if s > 0.1),
            'neutral': sum(1 for s in sentiments if -0.1 <= s <= 0.1),
            'negative': sum(1 for s in sentiments if s < -0.1)
        }
        
        return {
            'ticker': ticker,
            'articles_analyzed': len(analyzed_articles),
            'overall_sentiment': overall_sentiment,
            'average_polarity': round(avg_polarity, 3),
            'sentiment_distribution': sentiment_counts,
            'recent_articles': analyzed_articles
        }
        
    except Exception as e:
        raise Exception(f"News sentiment analysis failed: {str(e)}")


def generate_recommendation(prediction_data, sentiment_data):
    """Generate investment recommendation based on prediction and sentiment"""
    try:
        # Extract key metrics
        predicted_change = prediction_data.get('percent_change', 0)
        r2_score = prediction_data.get('r2_score', 0)
        sentiment = sentiment_data.get('overall_sentiment', 'neutral')
        avg_polarity = sentiment_data.get('average_polarity', 0)
        
        # Scoring system
        score = 0
        reasons = []
        
        # Price prediction factor (40% weight)
        if predicted_change > 2:
            score += 40
            reasons.append(f"Strong predicted price increase ({predicted_change:.2f}%)")
        elif predicted_change > 0:
            score += 20
            reasons.append(f"Modest predicted price increase ({predicted_change:.2f}%)")
        elif predicted_change > -2:
            score -= 10
            reasons.append(f"Slight predicted price decrease ({predicted_change:.2f}%)")
        else:
            score -= 30
            reasons.append(f"Significant predicted price decrease ({predicted_change:.2f}%)")
        
        # Model confidence factor (20% weight)
        if r2_score > 0.95:
            score += 20
            reasons.append(f"High model confidence (R² = {r2_score:.3f})")
        elif r2_score > 0.85:
            score += 10
            reasons.append(f"Good model confidence (R² = {r2_score:.3f})")
        else:
            score -= 5
            reasons.append(f"Moderate model confidence (R² = {r2_score:.3f})")
        
        # News sentiment factor (40% weight)
        if sentiment == 'positive' and avg_polarity > 0.2:
            score += 40
            reasons.append(f"Strong positive news sentiment (polarity: {avg_polarity:.3f})")
        elif sentiment == 'positive':
            score += 25
            reasons.append(f"Positive news sentiment (polarity: {avg_polarity:.3f})")
        elif sentiment == 'neutral':
            score += 10
            reasons.append(f"Neutral news sentiment (polarity: {avg_polarity:.3f})")
        elif sentiment == 'negative' and avg_polarity < -0.2:
            score -= 40
            reasons.append(f"Strong negative news sentiment (polarity: {avg_polarity:.3f})")
        else:
            score -= 20
            reasons.append(f"Negative news sentiment (polarity: {avg_polarity:.3f})")
        
        # Determine recommendation
        if score >= 60:
            recommendation = 'Strong Buy'
            action = 'BUY'
            confidence = 'High'
        elif score >= 30:
            recommendation = 'Buy'
            action = 'BUY'
            confidence = 'Medium'
        elif score >= 10:
            recommendation = 'Hold'
            action = 'HOLD'
            confidence = 'Medium'
        elif score >= -20:
            recommendation = 'Sell'
            action = 'SELL'
            confidence = 'Medium'
        else:
            recommendation = 'Strong Sell'
            action = 'SELL'
            confidence = 'High'
        
        return {
            'recommendation': recommendation,
            'action': action,
            'confidence': confidence,
            'score': score,
            'reasons': reasons,
            'disclaimer': 'This recommendation is generated by an AI model and should not be considered as financial advice. Always do your own research and consult with a financial advisor before making investment decisions.'
        }
        
    except Exception as e:
        raise Exception(f"Recommendation generation failed: {str(e)}")
