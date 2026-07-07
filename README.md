<div align="center">

# FinIQ

**Intelligent Stock Market Analysis Platform**

*AI-Powered Predictions • Financial Sentiment Analysis • Real-Time Insights*

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-18.x-61dafb?logo=react)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-20.x-339933?logo=node.js)](https://nodejs.org/)
[![Flask](https://img.shields.io/badge/Flask-3.x-000000?logo=flask)](https://flask.palletsprojects.com/)
[![PyTorch](https://img.shields.io/badge/PyTorch-2.x-EE4C2C?logo=pytorch)](https://pytorch.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?logo=mongodb)](https://www.mongodb.com/cloud/atlas)
[![Deployed on Vercel](https://img.shields.io/badge/Frontend-Vercel-000000?logo=vercel)](https://build-iota-two-54.vercel.app)
[![Deployed on Render](https://img.shields.io/badge/Backend-Render-46E3B7?logo=render)](https://finiq-backend-15dz.onrender.com)

</div>

---

## 🌐 Live Demo

| Service | URL |
|---------|-----|
| 🌐 **Frontend** | [build-iota-two-54.vercel.app](https://build-iota-two-54.vercel.app) |
| ⚙️ **Backend API** | [finiq-backend-15dz.onrender.com](https://finiq-backend-15dz.onrender.com) |
| 🤖 **ML Service** | [finiq-ml.onrender.com](https://finiq-ml.onrender.com) |

> ⚠️ **Note:** Render free tier services spin down after 15 minutes of inactivity. The first request may take ~30 seconds to wake up.

---

## 🚀 Overview

FinIQ revolutionizes stock market analysis by combining cutting-edge machine learning with intuitive design. Built on the MERN stack with an integrated Flask ML service, it delivers sophisticated LSTM-based price forecasting, **FinBERT-powered financial news sentiment analysis**, and conversational AI assistance — all in one seamless platform.

Whether you're a seasoned trader or just starting your investment journey, FinIQ transforms complex market data into actionable insights.

---

## ✨ Key Features

### 🔐 **Secure Authentication**
- JWT-based user authentication with Passport.js
- Protected routes and personalized user sessions
- Password encryption and secure token management

### 📊 **LSTM Price Prediction**
- Deep learning model with 60-day temporal lookback window
- Multi-layer LSTM architecture for accurate trend forecasting
- Historical pattern recognition for future price movements
- **Auto-detects Indian stocks** — just type `TCS`, `RELIANCE`, `INFY` (auto-resolved to `.NS`/`.BO`)

### 📰 **FinBERT Sentiment Analysis**
- Live news aggregation from premium financial sources via NewsAPI
- **FinBERT** (`ProsusAI/finbert`) — BERT model fine-tuned on financial text (Reuters, Bloomberg)
- Sentiment classification: Positive / Neutral / Negative with confidence scores
- Far more accurate than general-purpose NLP for financial content

### 🤖 **AI Investment Assistant**
- Interactive chatbot for stock market queries
- Context-aware responses powered by natural language understanding
- 24/7 availability for instant market insights

### 📈 **Interactive Analytics Dashboard**
- Dynamic charts with Chart.js for price trends and predictions
- Real-time sentiment visualization
- Comprehensive technical indicators (SMA, EMA, RSI)

### 💡 **Smart Recommendations**
- AI-generated Buy / Hold / Sell signals
- Multi-factor analysis combining LSTM predictions and FinBERT sentiment
- Risk-adjusted investment suggestions with confidence levels

---

## 🛠️ Tech Stack

<table>
<tr>
<td valign="top" width="33%">

### Frontend
- ⚛️ **React.js 18** — Component-based UI
- 🎨 **TailwindCSS** — Modern styling
- 📊 **Chart.js** — Data visualization
- 🔀 **React Router v6** — Navigation
- 🌐 **Axios** — HTTP client

</td>
<td valign="top" width="33%">

### Backend
- 🟢 **Node.js 20** — Runtime environment
- 🚂 **Express.js** — Web framework
- 🍃 **MongoDB Atlas** — Cloud NoSQL database
- 📦 **Mongoose** — ODM
- 🔑 **JWT** — Authentication
- 🛂 **Passport.js** — Auth middleware

</td>
<td valign="top" width="33%">

### ML Service
- 🐍 **Flask 3** — Microservice framework
- 🔥 **PyTorch** — Deep learning
- 🧠 **LSTM Networks** — Time series forecasting
- 🤗 **FinBERT** — Financial sentiment analysis
- 📈 **yfinance** — Market data (NSE/BSE/NYSE)
- 📡 **NewsAPI** — Financial news feeds

</td>
</tr>
</table>

### Infrastructure
- 🐳 **Docker** — Containerized deployment
- ▲ **Vercel** — Frontend hosting
- 🎯 **Render** — Backend & ML service hosting
- 🍃 **MongoDB Atlas** — Cloud database

---

## 📁 Project Structure

```
FinIQ/
│
├── backend/                    # Node.js Express API
│   ├── config/                 # Database & authentication config
│   ├── middleware/             # Auth & validation middleware
│   ├── models/                 # MongoDB schemas
│   ├── routes/                 # API endpoints
│   ├── server.js               # Express server entry point
│   ├── Dockerfile              # Backend container definition
│   ├── .dockerignore
│   └── package.json
│
├── frontend/                   # React application
│   ├── public/                 # Static files
│   ├── src/
│   │   ├── components/         # Reusable UI components
│   │   ├── context/            # React Context for state management
│   │   ├── pages/              # Application pages/routes
│   │   ├── utils/              # Helper functions & utilities
│   │   ├── App.js              # Main App component
│   │   └── index.css           # Global styles
│   ├── Dockerfile              # Multi-stage nginx build
│   ├── nginx.conf              # Nginx config for React Router
│   ├── .dockerignore
│   └── package.json
│
├── ml-service/                 # Flask ML microservice
│   ├── app.py                  # Flask application entry point
│   ├── chatbot.py              # AI chatbot implementation
│   ├── lstm_model.py           # LSTM model + auto ticker resolution
│   ├── sentiment_analysis.py   # FinBERT sentiment analysis
│   ├── Dockerfile              # Docker + pre-baked FinBERT model
│   ├── .dockerignore
│   └── requirements.txt        # Python dependencies
│
├── docker-compose.yml          # Full-stack local Docker setup
└── README.md
```

---

## 🚀 Running Locally

### Prerequisites

- **Node.js** v20+
- **Python** v3.10+
- **pip** (Python package manager)
- **MongoDB Atlas** account (free) — [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
- **NewsAPI** key (free) — [newsapi.org](https://newsapi.org/)

---

### Option A — Run with Docker (Recommended)

```bash
# Clone the repository
git clone https://github.com/swamini-jadhav/FinIQ.git
cd FinIQ

# Create .env files (see below), then:
docker-compose up --build
```

Open **http://localhost:3000** in your browser.

> **Note:** First build takes 10–15 minutes as Docker pre-downloads the FinBERT model (~440MB).

---

### Option B — Run Manually

#### 1️⃣ Clone the Repository
```bash
git clone https://github.com/swamini-jadhav/FinIQ.git
cd FinIQ
```

#### 2️⃣ Backend Setup
```bash
cd backend
npm install
```

Create `backend/.env`:
```env
PORT=5000
MONGODB_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_jwt_secret_key
SESSION_SECRET=your_session_secret_key
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
ML_SERVICE_URL=http://localhost:5001
```

```bash
npm run dev
# Runs on http://localhost:5000
```

#### 3️⃣ ML Service Setup
```bash
cd ../ml-service

# Create virtual environment
python -m venv venv

# Activate (Windows PowerShell)
.\venv\Scripts\Activate.ps1
# Activate (macOS/Linux)
source venv/bin/activate

# Install PyTorch (CPU build — smaller)
pip install torch --index-url https://download.pytorch.org/whl/cpu

# Install remaining dependencies
pip install -r requirements.txt
```

Create `ml-service/.env`:
```env
FLASK_PORT=5001
FLASK_ENV=development
NEWSAPI_KEY=your_newsapi_key_here
```

```bash
python app.py
# Runs on http://localhost:5001
# FinBERT model (~440MB) downloads on first run and is cached
```

#### 4️⃣ Frontend Setup
```bash
cd ../frontend
npm install
```

Create `frontend/.env`:
```env
REACT_APP_API_URL=http://localhost:5000
REACT_APP_ML_API_URL=http://localhost:5001
```

```bash
npm start
# Runs on http://localhost:3000
```

---

## 🔑 Required API Keys

| Key | Where to get | Used for |
|-----|-------------|----------|
| `NEWSAPI_KEY` | [newsapi.org](https://newsapi.org/) (free) | Financial news articles |
| `MONGODB_URI` | [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) (free tier) | Database |

---

## 📡 API Endpoints

### ML Service (`http://localhost:5001`)

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/health` | Health check |
| `POST` | `/predict` | LSTM stock price prediction |
| `POST` | `/news-sentiment` | FinBERT news sentiment analysis |
| `POST` | `/recommendation` | Combined AI recommendation |
| `POST` | `/chatbot` | AI assistant response |

### Backend (`http://localhost:5000`)

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/auth/register` | User registration |
| `POST` | `/api/auth/login` | User login |
| `GET` | `/api/stocks/predict` | Stock prediction proxy |
| `GET` | `/api/stocks/sentiment` | Sentiment analysis proxy |

---

## 🇮🇳 Indian Stock Support

FinIQ automatically resolves Indian stock tickers — no need to type the exchange suffix:

| You type | Resolved to | Exchange |
|----------|-------------|----------|
| `TCS` | `TCS.NS` | NSE |
| `RELIANCE` | `RELIANCE.NS` | NSE |
| `INFY` | `INFY.NS` | NSE |
| `WIPRO` | `WIPRO.NS` | NSE |
| `HDFC` | `HDFC.NS` | NSE |

US stocks (e.g. `AAPL`, `TSLA`, `GOOGL`) work as-is.

---

## 🤝 Contributors

<table>
<tr>
    <td align="center">
        <a href="https://github.com/aaradhanac07">
            <img src="https://github.com/aaradhanac07.png" width="100px;" alt="Aaradhana Chaudhary"/>
            <br />
            <sub><b>Aaradhana Chaudhary</b></sub>
        </a>
    </td>
    <td align="center">
        <a href="https://github.com/muskaankarwa">
            <img src="https://github.com/muskaankarwa.png" width="100px;" alt="Muskaan Karwa"/>
            <br />
            <sub><b>Muskaan Karwa</b></sub>
        </a>
    </td>
    <td align="center">
        <a href="https://github.com/sahilapage">
            <img src="https://github.com/sahilapage.png" width="100px;" alt="Sahil Apage"/>
            <br />
            <sub><b>Sahil Apage</b></sub>
        </a>
    </td>
    <td align="center">
        <a href="https://github.com/swamini-jadhav">
            <img src="https://github.com/swamini-jadhav.png" width="100px;" alt="Swamini Jadhav"/>
            <br />
            <sub><b>Swamini Jadhav</b></sub>
        </a>
    </td>
</tr>
</table>

---

## 📝 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.

---

## 🌟 Future Roadmap

- [ ] Multi-stock portfolio tracking
- [ ] Advanced technical indicators (MACD, Bollinger Bands)
- [ ] Email/SMS price alerts
- [ ] Social sentiment integration (Twitter, Reddit)
- [ ] Mobile application (React Native)
- [ ] WebSocket for real-time price streaming

---

<div align="center">
Made with ❤️ by the FinIQ Team
</div>