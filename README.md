# FinIQ - Stock Prediction Platform

A full-stack MERN application with Flask ML service for stock price prediction, sentiment analysis, and AI-powered insights.

## Overview

FinIQ is an intelligent stock market analysis platform that combines machine learning and natural language processing to help investors make data-driven decisions. The platform provides LSTM-based price predictions, real-time news sentiment analysis, and an AI chatbot for stock market queries.

## Features

- **User Authentication** - Secure sign up/sign in with JWT authentication
- **Stock Price Prediction** - LSTM neural network model with 60-day lookback for forecasting future prices
- **News Sentiment Analysis** - NLP-powered sentiment scoring of real-time stock news using TextBlob
- **AI Chatbot** - Interactive chatbot for answering stock market questions and providing insights
- **Interactive Dashboard** - Real-time charts, predictions, and sentiment visualization
- **Investment Recommendations** - AI-generated buy/hold/sell recommendations based on technical and sentiment analysis

## Tech Stack

**Frontend:** React.js, Axios, React Router, Chart.js, TailwindCSS

**Backend:** Node.js, Express, MongoDB, Mongoose, Passport.js, JWT

**ML Service:** Flask, PyTorch, LSTM Networks, yfinance, TextBlob, NewsAPI

## Project Structure

```
FinIQ/
├── backend/          # Node.js Express API
├── frontend/         # React Application
├── ml-service/       # Flask ML Service
└── README.md
```

## Machine Learning

**LSTM Model Architecture:**
- Input: 60-day historical price data
- Two stacked LSTM layers (128 and 64 units)
- Dropout layers (0.2) for regularization
- Dense output layer for price prediction

**Training:**
- Loss Function: Mean Squared Error (MSE)
- Optimizer: Adam
- Dataset: 5 years of historical stock data
- Trained with 80-20 train-validation split

**NLP Sentiment Analysis:**
- Real-time news fetched via NewsAPI
- Sentiment scoring using TextBlob
- Classification into Positive/Neutral/Negative categories

## License

MIT License