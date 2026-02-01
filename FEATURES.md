# FinIQ Features Documentation

## Overview

FinIQ is a comprehensive AI-powered stock prediction platform that combines machine learning, natural language processing, and real-time data analysis to provide investment insights.

## Core Features

### 1. User Authentication
- **Sign Up**: Create account with email and password
- **Sign In**: Secure login with JWT tokens
- **Session Management**: Persistent sessions across browser restarts
- **Logout**: Secure logout with token invalidation

**Implementation**:
- Passport.js for authentication
- bcrypt for password hashing
- JWT for stateless authentication
- MongoDB for user storage

### 2. LSTM Stock Price Prediction

**How It Works**:
1. Fetches 5 years of historical data from Yahoo Finance
2. Calculates technical indicators (SMA, EMA, RSI)
3. Trains LSTM model on 60-day sequences
4. Predicts next day's closing price
5. Provides confidence metrics (R² score, MSE)

**Features**:
- 60-day lookback window
- 8 input features (OHLCV + 3 technical indicators)
- 2-layer LSTM architecture
- 50 training epochs
- Real-time prediction

**Supported Indicators**:
- Simple Moving Average (10-day)
- Exponential Moving Average (20-day)
- Relative Strength Index (14-day)

**Output**:
- Predicted closing price
- Percentage change
- Price change in currency
- Model confidence (R² score)
- Mean Squared Error
- 30-day price history chart

### 3. News Sentiment Analysis

**How It Works**:
1. Fetches recent news from NewsAPI (last 7 days)
2. Analyzes sentiment using TextBlob NLP
3. Classifies as positive, negative, or neutral
4. Calculates aggregate sentiment score
5. Displays top articles with sentiment

**Features**:
- Real-time news aggregation
- Multi-source news analysis
- Sentiment polarity scoring
- Sentiment distribution statistics
- Article metadata (source, date, URL)

**Sentiment Classification**:
- **Positive**: Polarity > 0.1
- **Neutral**: -0.1 ≤ Polarity ≤ 0.1
- **Negative**: Polarity < -0.1

### 4. Investment Recommendations

**How It Works**:
Combines multiple factors to generate buy/hold/sell recommendations:

1. **Price Prediction** (40% weight)
   - Strong increase (>2%): +40 points
   - Modest increase (0-2%): +20 points
   - Slight decrease (0 to -2%): -10 points
   - Significant decrease (<-2%): -30 points

2. **Model Confidence** (20% weight)
   - High confidence (R² > 0.95): +20 points
   - Good confidence (R² > 0.85): +10 points
   - Moderate confidence: -5 points

3. **News Sentiment** (40% weight)
   - Strong positive: +40 points
   - Positive: +25 points
   - Neutral: +10 points
   - Negative: -20 points
   - Strong negative: -40 points

**Recommendation Levels**:
- **Strong Buy**: Score ≥ 60
- **Buy**: Score ≥ 30
- **Hold**: Score ≥ 10
- **Sell**: Score ≥ -20
- **Strong Sell**: Score < -20

**Output**:
- Clear action (BUY/HOLD/SELL)
- Confidence level
- Detailed reasoning
- Risk disclaimer

### 5. AI Chatbot

**Capabilities**:
- Answer questions about stock predictions
- Explain how the platform works
- Provide information about technical indicators
- Suggest stocks to analyze
- Help with platform navigation

**Topics Covered**:
- How LSTM predictions work
- Sentiment analysis explanation
- Recommendation system details
- Technical indicators
- Platform features
- Getting started guide
- Risk disclaimers
- Supported stocks

**Features**:
- Natural language understanding
- Context-aware responses
- Suggested follow-up questions
- Conversational interface
- Real-time responses

### 6. Interactive Dashboard

**Components**:
- Stock search with autocomplete
- Real-time prediction results
- Price history chart (Chart.js)
- News feed with sentiment
- Recommendation card
- Chatbot interface

**Visualizations**:
- Line chart with historical prices
- Predicted price indicator
- Sentiment distribution chart
- Color-coded recommendations

### 7. Historical Price Chart

**Features**:
- 30-day price history
- Predicted next-day price
- Interactive tooltips
- Smooth animations
- Responsive design

**Technology**: Chart.js with React

### 8. Search History (Authenticated Users)

**Features**:
- Automatic search tracking
- Last 50 searches saved
- Timestamp recording
- Quick re-search capability

## Technical Architecture

### Backend (Node.js/Express)
- RESTful API design
- JWT authentication
- MongoDB integration
- Passport.js middleware
- Error handling
- Request validation

### ML Service (Flask)
- PyTorch LSTM models
- Yahoo Finance integration
- NewsAPI integration
- TextBlob sentiment analysis
- Real-time predictions
- RESTful endpoints

### Frontend (React)
- Component-based architecture
- React Router for navigation
- Axios for API calls
- Chart.js for visualizations
- TailwindCSS for styling
- Context API for state management

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/user` - Get current user
- `PUT /api/auth/favorites` - Update favorites

### ML Operations
- `POST /api/ml/predict` - Get price prediction
- `POST /api/ml/news-sentiment` - Get sentiment analysis
- `POST /api/ml/recommendation` - Get recommendation
- `GET /api/ml/health` - Check ML service status

### Chatbot
- `POST /api/chatbot/query` - Send message
- `POST /api/chatbot/feedback` - Submit feedback

## Supported Stock Exchanges

- **NSE (National Stock Exchange, India)**: Use .NS suffix (e.g., TCS.NS)
- **BSE (Bombay Stock Exchange, India)**: Use .BO suffix (e.g., RELIANCE.BO)
- **NYSE (New York Stock Exchange)**: Standard tickers (e.g., AAPL)
- **NASDAQ**: Standard tickers (e.g., TSLA)
- **Other**: Any exchange supported by Yahoo Finance

## Data Sources

1. **Yahoo Finance**: Historical stock data
2. **NewsAPI**: Real-time news articles
3. **TextBlob**: NLP sentiment analysis

## Performance Metrics

### Model Performance
- Typical R² Score: 0.90 - 0.98
- Training Time: 30-60 seconds
- Prediction Time: < 1 second
- Data Points Used: ~1,200 (5 years)

### API Performance
- Prediction Endpoint: 1-2 minutes (training + prediction)
- Sentiment Endpoint: 5-10 seconds
- Recommendation Endpoint: 1-2 minutes (combined)
- Chatbot Response: < 1 second

## Security Features

1. **Password Hashing**: bcrypt with salt rounds
2. **JWT Tokens**: 7-day expiration
3. **HTTPS**: SSL/TLS encryption
4. **CORS**: Configured for allowed origins
5. **Input Validation**: Express-validator
6. **Rate Limiting**: API request limits
7. **Session Security**: HTTP-only cookies

## Limitations

1. **Prediction Accuracy**: Not guaranteed; past performance doesn't predict future
2. **News Coverage**: Limited by NewsAPI free tier (100 requests/day)
3. **Training Time**: 1-2 minutes per stock on free tier
4. **Data Freshness**: Yahoo Finance data (15-20 minute delay)
5. **Market Hours**: Predictions don't account for after-hours trading

## Best Practices

1. **Use Multiple Indicators**: Don't rely solely on predictions
2. **Check Confidence Metrics**: Higher R² = more reliable
3. **Consider News Sentiment**: Market psychology matters
4. **Set Stop Losses**: Risk management is crucial
5. **Diversify**: Don't put all eggs in one basket
6. **Stay Updated**: Check recent news regularly

## Future Enhancements

1. Portfolio tracking
2. Real-time alerts
3. Multi-day predictions
4. More technical indicators
5. Backtesting functionality
6. Social sentiment analysis
7. Fundamental analysis integration
8. Mobile app
9. Advanced charting
10. Stock comparison tools

## Disclaimer

FinIQ is an educational tool for stock market analysis. It should not be used as the sole basis for investment decisions. Always:
- Do your own research
- Consult financial advisors
- Consider your risk tolerance
- Understand market volatility
- Never invest more than you can afford to lose

Stock market investments carry inherent risks, and past performance does not guarantee future results.
