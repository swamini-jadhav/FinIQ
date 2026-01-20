import requests
from datetime import datetime, timedelta
from transformers import pipeline
import warnings

warnings.filterwarnings('ignore')

# NEWS API KEY
NEWS_API_KEY = "49fb384f80a2404b8d8107a7030ea317"

# Company to ticker mapping for better search
COMPANY_TICKERS = {
    'apple': 'AAPL',
    'tesla': 'TSLA',
    'microsoft': 'MSFT',
    'google': 'GOOGL',
    'amazon': 'AMZN',
    'meta': 'META',
    'nvidia': 'NVDA',
    'intel': 'INTC',
    'samsung': 'SSNLF',
    'netflix': 'NFLX',
    'uber': 'UBER',
    'airbnb': 'ABNB',
    'twitter': 'TWTR',
    'instagram': 'META',
    'facebook': 'META'
}

# Sentiment analyzer - using FinBERT
def load_sentiment_analyzer():
    """
    Load the FinBERT sentiment analyzer
    Using pretrained FinBERT model
    """
    try:
        sentiment_analyzer = pipeline(
            "sentiment-analysis",
            model="ProsusAI/finbert"
        )
        return sentiment_analyzer
    except Exception as e:
        print(f"Error loading model: {e}")
        return None

# Initialize analyzer
sentiment_analyzer = load_sentiment_analyzer()

def normalize_company_search(company_name):
    """
    Convert company name to better search term for accurate results
    """
    lower_name = company_name.lower().strip()
    
    # Check if it's in our mapping
    if lower_name in COMPANY_TICKERS:
        ticker = COMPANY_TICKERS[lower_name]
        return ticker
    
    return company_name

def fetch_stock_news(company_name, days_back=30):
    """
    Fetch recent news about a company from NewsAPI
    Optimized for accurate results
    """
    try:
        url = "https://newsapi.org/v2/everything"
        
        # Date range
        today = datetime.now()
        past_date = today - timedelta(days=days_back)
        
        # Normalize search term
        search_term = normalize_company_search(company_name)
        
        # Build search query for better accuracy
        search_query = f'"{search_term}" stock OR earnings OR product OR announcement'
        
        params = {
            'q': search_query,
            'apiKey': NEWS_API_KEY,
            'language': 'en',
            'sortBy': 'relevancy',  # Changed to relevancy for better results
            'pageSize': 15,  # Get 15 to filter best ones
            'from': past_date.strftime('%Y-%m-%d')
        }
        
        response = requests.get(url, params=params)
        
        if response.status_code == 200:
            articles = response.json().get('articles', [])
            
            # Filter out low-quality or duplicate results
            filtered_articles = []
            seen_titles = set()
            
            for article in articles:
                title = article['title'].lower()
                
                # Skip if we've seen similar title
                if title in seen_titles:
                    continue
                
                # Skip if title is too generic or unrelated
                if article['title'] and len(article['title']) > 20:
                    filtered_articles.append(article)
                    seen_titles.add(title)
                
                # Limit to 5 articles
                if len(filtered_articles) >= 5:
                    break
            
            return filtered_articles
        else:
            return []
    except Exception as e:
        print(f"Error fetching news: {e}")
        return []

def analyze_headline(headline):
    """
    Analyze sentiment of a single headline using FinBERT
    """
    try:
        result = sentiment_analyzer(headline)[0]
        
        # Convert label to readable format
        label = result['label'].lower()
        
        if 'negative' in label or label == 'label_0':
            sentiment = 'NEGATIVE'
            signal = 'SELL'
            emoji = '📉🔴'
        elif 'positive' in label or label == 'label_2':
            sentiment = 'POSITIVE'
            signal = 'BUY'
            emoji = '📈🟢'
        else:
            sentiment = 'NEUTRAL'
            signal = 'HOLD'
            emoji = '➖🟡'
        
        confidence = result['score'] * 100
        
        return {
            'sentiment': sentiment,
            'signal': signal,
            'confidence': confidence,
            'emoji': emoji
        }
    except Exception as e:
        print(f"Error analyzing headline: {e}")
        return {
            'sentiment': 'UNKNOWN',
            'signal': 'HOLD',
            'confidence': 0,
            'emoji': '❓'
        }

def calculate_overall_signal(results):
    """
    Combine multiple sentiment results into one overall signal
    """
    if not results:
        return None
    
    # Count each sentiment
    positive_count = sum(1 for r in results if r['sentiment'] == 'POSITIVE')
    negative_count = sum(1 for r in results if r['sentiment'] == 'NEGATIVE')
    neutral_count = sum(1 for r in results if r['sentiment'] == 'NEUTRAL')
    
    # Calculate average confidence
    avg_confidence = sum(r['confidence'] for r in results) / len(results)
    
    # Decision logic
    total = len(results)
    positive_ratio = positive_count / total
    negative_ratio = negative_count / total
    
    # Determine overall signal
    if positive_ratio >= 0.6:  # 60% or more positive
        overall_signal = "STRONG BUY"
        emoji = "🟢🟢"
        explanation = "Majority of recent news is positive"
    elif positive_ratio >= 0.4:  # 40-60% positive
        overall_signal = "BUY"
        emoji = "🟢"
        explanation = "More positive than negative news"
    elif negative_ratio >= 0.6:  # 60% or more negative
        overall_signal = "STRONG SELL"
        emoji = "🔴🔴"
        explanation = "Majority of recent news is negative"
    elif negative_ratio >= 0.4:  # 40-60% negative
        overall_signal = "SELL"
        emoji = "🔴"
        explanation = "More negative than positive news"
    else:  # Mixed or mostly neutral
        overall_signal = "HOLD"
        emoji = "🟡"
        explanation = "Mixed sentiment across recent news"
    
    return {
        'signal': overall_signal,
        'emoji': emoji,
        'positive_count': positive_count,
        'negative_count': negative_count,
        'neutral_count': neutral_count,
        'avg_confidence': avg_confidence,
        'explanation': explanation,
        'total': total
    }

def analyze_stock(company_name):
    """
    Complete analysis: Fetch news + Analyze sentiment
    """
    # Step 1: Fetch news
    articles = fetch_stock_news(company_name)
    
    if not articles:
        return None
    
    # Step 2: Analyze each headline
    results = []
    detailed_articles = []
    
    for article in articles:
        headline = article['title']
        analysis = analyze_headline(headline)
        results.append(analysis)
        
        detailed_articles.append({
            'title': headline,
            'source': article['source']['name'],
            'published': article['publishedAt'][:10],
            'url': article['url'],
            'sentiment': analysis['sentiment'],
            'signal': analysis['signal'],
            'confidence': analysis['confidence'],
            'emoji': analysis['emoji']
        })
    
    # Step 3: Calculate overall signal
    overall = calculate_overall_signal(results)
    
    return {
        'overall': overall,
        'articles': detailed_articles
    }