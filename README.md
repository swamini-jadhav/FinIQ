# FinIQ - Intelligent Stock Prediction Platform

AI-Powered Stock Market Analysis & Prediction System

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)
[![React](https://img.shields.io/badge/React-18.x-blue.svg)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-14+-green.svg)](https://nodejs.org/)
[![Python](https://img.shields.io/badge/Python-3.8+-yellow.svg)](https://python.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Latest-brightgreen.svg)](https://www.mongodb.com/)

---

## Overview

FinIQ is a full-stack financial intelligence platform that leverages machine learning and natural language processing to provide stock price predictions, sentiment analysis, and AI-powered investment insights. Built with the MERN stack and integrated with a Flask-based ML service, FinIQ empowers investors with data-driven decision-making tools.

## Features

### User Authentication & Security
- Secure user registration and login system
- JWT-based session management
- Password encryption
- Protected API routes

### Stock Price Prediction
- LSTM deep learning model trained on historical stock data
- 60-day sliding window for pattern recognition
- Multi-step ahead forecasting
- Support for multiple stock exchanges (NSE, NASDAQ, NYSE, etc.)
- Confidence intervals and prediction accuracy metrics

### News Sentiment Analysis
- Real-time news aggregation from NewsAPI
- Sentiment scoring using TextBlob
- Sentiment classification (Positive, Neutral, Negative)
- Historical sentiment trend tracking

### AI-Powered Chatbot
- Natural language query processing
- Stock information retrieval
- Market trend explanations
- Educational responses about financial concepts

### Interactive Dashboard
- Real-time stock price charts
- Prediction vs. actual price visualization
- Sentiment score timeline
- Customizable watchlists

### Investment Recommendations
- Multi-factor analysis combining technical indicators, sentiment scores, and price predictions
- Risk-adjusted recommendation engine
- Buy/Hold/Sell signals with confidence levels

## Tech Stack

### Frontend
- React.js
- React Router
- Axios
- Chart.js
- TailwindCSS

### Backend
- Node.js + Express
- MongoDB + Mongoose
- Passport.js (Local Strategy)
- JWT Authentication
- bcrypt

### ML Service
- Flask
- PyTorch (LSTM Networks)
- yfinance
- TextBlob
- NewsAPI
- pandas
- numpy

## Project Structure

```
FinIQ/
├── backend/          # Node.js Express API
├── frontend/         # React Application
├── ml-service/       # Flask ML Service
└── README.md
```

## API Endpoints

### Authentication
```
POST   /api/auth/register      - Register new user
POST   /api/auth/login         - Authenticate user
POST   /api/auth/logout        - Logout user
GET    /api/auth/user          - Get current user profile
```

### Stock Prediction
```
POST   /api/ml/predict         - Get LSTM price prediction
POST   /api/ml/news-sentiment  - Analyze news sentiment
POST   /api/ml/recommendation  - Get investment recommendation
```

### Chatbot
```
POST   /api/chatbot/query      - Send query to AI chatbot
```

## Machine Learning Model

The prediction model uses a stacked LSTM (Long Short-Term Memory) neural network with the following architecture:

- Input Layer: 60 timesteps of historical prices
- LSTM Layer 1: 128 units with dropout (0.2)
- LSTM Layer 2: 64 units with dropout (0.2)
- Dense Layer: 25 units with ReLU activation
- Output Layer: 1 unit (next day's closing price)

### Training Details
- Loss Function: Mean Squared Error (MSE)
- Optimizer: Adam (lr=0.001)
- Training Data: Last 5 years of historical data
- Validation Split: 80-20
- Epochs: 50 with early stopping

## License

This project is licensed under the MIT License.