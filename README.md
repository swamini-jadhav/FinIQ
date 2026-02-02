# FinIQ - Stock Prediction Platform

A full-stack MERN application with Flask ML service for stock price prediction, sentiment analysis, and AI-powered insights.

## Features

- User Authentication (Sign up, Sign in, Sign out)
- LSTM-based Stock Price Prediction (60-day lookback)
- Real-time Stock News with Sentiment Analysis
- AI Chatbot for Stock Market Queries
- Interactive Dashboard
- Investment Recommendations

## Tech Stack

### Frontend
- React.js
- Axios
- React Router
- Chart.js
- TailwindCSS

### Backend
- Node.js + Express
- MongoDB + Mongoose
- Passport.js (Local Strategy)
- JWT Authentication

### ML Service (Flask)
- Flask
- PyTorch (LSTM Model)
- yfinance
- TextBlob (Sentiment Analysis)
- NewsAPI

## Project Structure

```
FinIQ/
├── backend/          # Node.js Express API
├── frontend/         # React Application
├── ml-service/       # Flask ML API
└── README.md
```

## Setup Instructions

### Prerequisites
- Node.js (v14+)
- Python (v3.8+)
- MongoDB
- NewsAPI Key (get from https://newsapi.org/)

### 1. Backend Setup

```bash
cd backend
npm install
```

Create `.env` file:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/finiq
JWT_SECRET=your_jwt_secret_here
SESSION_SECRET=your_session_secret_here
ML_SERVICE_URL=http://localhost:5001
NEWSAPI_KEY=your_newsapi_key_here
NODE_ENV=development
```

Start backend:
```bash
npm start
```

### 2. ML Service Setup

```bash
cd ml-service
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

Create `.env` file:
```
FLASK_PORT=5001
NEWSAPI_KEY=your_newsapi_key_here
```

Start ML service:
```bash
python app.py
```

### 3. Frontend Setup

```bash
cd frontend
npm install
```

Create `.env` file:
```
REACT_APP_API_URL=http://localhost:5000
REACT_APP_ML_API_URL=http://localhost:5001
```

Start frontend:
```bash
npm start
```

## Deployment on Render

### 1. MongoDB Atlas Setup
- Create a free cluster at https://www.mongodb.com/cloud/atlas
- Get connection string
- Whitelist all IPs (0.0.0.0/0)

### 2. Backend Deployment
- Create new Web Service
- Connect GitHub repository
- Root directory: `backend`
- Build command: `npm install`
- Start command: `npm start`
- Add environment variables from `.env`

### 3. ML Service Deployment
- Create new Web Service
- Root directory: `ml-service`
- Build command: `pip install -r requirements.txt`
- Start command: `gunicorn app:app`
- Add environment variables from `.env`

### 4. Frontend Deployment
- Create new Static Site
- Root directory: `frontend`
- Build command: `npm run build`
- Publish directory: `build`
- Add environment variables with deployed backend URLs

## API Endpoints

### Authentication
- POST `/api/auth/register` - Register new user
- POST `/api/auth/login` - Login user
- POST `/api/auth/logout` - Logout user
- GET `/api/auth/user` - Get current user

### Stock Prediction
- POST `/api/ml/predict` - Get stock price prediction
- POST `/api/ml/news-sentiment` - Get news sentiment analysis
- POST `/api/ml/recommendation` - Get investment recommendation

### Chatbot
- POST `/api/chatbot/query` - Ask chatbot a question

## Environment Variables

### Backend
- `PORT` - Server port (default: 5000)
- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - JWT signing secret
- `SESSION_SECRET` - Session secret
- `ML_SERVICE_URL` - ML service URL
- `NEWSAPI_KEY` - NewsAPI key

### ML Service
- `FLASK_PORT` - Flask server port (default: 5001)
- `NEWSAPI_KEY` - NewsAPI key

### Frontend
- `REACT_APP_API_URL` - Backend API URL
- `REACT_APP_ML_API_URL` - ML service URL

## Usage

1. Register/Login to the platform
2. Enter a stock ticker (e.g., TCS.NS, AAPL, TSLA)
3. View price prediction, news sentiment, and recommendations
4. Use the chatbot for queries about stocks

## License

MIT
