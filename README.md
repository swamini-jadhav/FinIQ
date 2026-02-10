<div align="center">

# FinIQ

**Intelligent Stock Market Analysis Platform**

*AI-Powered Predictions • Sentiment Analysis • Real-Time Insights*

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-18.x-61dafb?logo=react)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-18.x-339933?logo=node.js)](https://nodejs.org/)
[![Flask](https://img.shields.io/badge/Flask-2.x-000000?logo=flask)](https://flask.palletsprojects.com/)
[![PyTorch](https://img.shields.io/badge/PyTorch-2.x-EE4C2C?logo=pytorch)](https://pytorch.org/)

</div>

---

## 🚀 Overview

FinIQ revolutionizes stock market analysis by combining cutting-edge machine learning with intuitive design. Built on the MERN stack with an integrated Flask ML service, it delivers sophisticated LSTM-based price forecasting, real-time news sentiment analysis, and conversational AI assistance—all in one seamless platform.

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

### 📰 **Real-Time Sentiment Analysis**
- Live news aggregation from premium financial sources
- NLP-powered sentiment classification (Positive/Neutral/Negative)
- TextBlob integration for nuanced emotion detection

### 🤖 **AI Investment Assistant**
- Interactive chatbot for stock market queries
- Context-aware responses powered by natural language understanding
- 24/7 availability for instant market insights

### 📈 **Interactive Analytics Dashboard**
- Dynamic charts with Chart.js for price trends and predictions
- Real-time sentiment visualization
- Comprehensive technical indicators and metrics

### 💡 **Smart Recommendations**
- AI-generated buy/hold/sell signals
- Multi-factor analysis combining technical and sentiment data
- Risk-adjusted investment suggestions

---

## 🛠️ Tech Stack

<table>
<tr>
<td valign="top" width="33%">

### Frontend
- ⚛️ **React.js** - Component-based UI
- 🎨 **TailwindCSS** - Modern styling
- 📊 **Chart.js** - Data visualization
- 🔀 **React Router** - Navigation
- 🌐 **Axios** - HTTP client

</td>
<td valign="top" width="33%">

### Backend
- 🟢 **Node.js** - Runtime environment
- 🚂 **Express.js** - Web framework
- 🍃 **MongoDB** - NoSQL database
- 📦 **Mongoose** - ODM
- 🔑 **JWT** - Authentication
- 🛂 **Passport.js** - Auth middleware

</td>
<td valign="top" width="33%">

### ML Service
- 🐍 **Flask** - Microservice framework
- 🔥 **PyTorch** - Deep learning
- 🧠 **LSTM Networks** - Time series
- 📈 **yfinance** - Market data
- 💬 **TextBlob** - NLP
- 📡 **NewsAPI** - News feeds

</td>
</tr>
</table>

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
│   ├── package.json            # Backend dependencies
│   └── package-lock.json
│
├── frontend/                   # React application
│   ├── public/                 # Static files
│   ├── src/
│   │   ├── components/         # Reusable UI components
│   │   ├── context/            # React Context for state management
│   │   ├── pages/              # Application pages/routes
│   │   ├── utils/              # Helper functions & utilities
│   │   ├── App.js              # Main App component
│   │   ├── index.js            # React entry point
│   │   └── index.css           # Global styles
│   ├── package.json            # Frontend dependencies
│   ├── package-lock.json
│   ├── postcss.config.js       # PostCSS configuration
│   └── tailwind.config.js      # TailwindCSS configuration
│
├── ml-service/                 # Flask ML microservice
│   ├── app.py                  # Flask application entry point
│   ├── chatbot.py              # AI chatbot implementation
│   ├── lstm_model.py           # LSTM model architecture & training
│   ├── sentiment_analysis.py   # NLP sentiment analysis
│   └── requirements.txt        # Python dependencies
│
└── README.md
```

---

## 🚀 How to run the repository?

### Prerequisites

- **Node.js** (v18.x or higher)
- **Python** (v3.9 or higher)
- **MongoDB** (v6.x or higher)
- **npm** or **yarn**
- **pip** (Python package manager)

### Installation & Setup

#### 1️⃣ Clone the Repository
```bash
git clone https://github.com/yourusername/FinIQ.git
cd FinIQ
```

#### 2️⃣ Backend Setup
```bash
cd backend

# Install dependencies
npm install
```

Create a `.env` file in the `backend/` folder:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/finiq
JWT_SECRET=your_jwt_secret_key_here
NODE_ENV=development
```
```bash
# Start the server
npm start
```

The backend will run on `http://localhost:5000`

#### 3️⃣ ML Service Setup
```bash
cd ../ml-service

# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Windows (Command Prompt):
venv\Scripts\activate
# On Windows (PowerShell):
venv\Scripts\Activate.ps1
# On macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt
```

Create a `.env` file in the `ml-service/` folder:
```env
FLASK_PORT=5001
NEWS_API_KEY=your_newsapi_key_here
FLASK_ENV=development
```
```bash
# Start Flask service
python app.py
```

The ML service will run on `http://localhost:5001`

#### 4️⃣ Frontend Setup
```bash
cd ../frontend

# Install dependencies
npm install
```

Create a `.env` file in the `frontend/` folder:
```env
REACT_APP_API_URL=http://localhost:5000
REACT_APP_ML_API_URL=http://localhost:5001
```
```bash
# Start development server
npm start
```

The frontend will run on `http://localhost:3000`

### 🔑 API Keys Required

- **NewsAPI:** Get your free key at [newsapi.org](https://newsapi.org/)
- **MongoDB:** Set up a local instance or use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)

---

## 🤝 Contributors

<table>
<tr>
    <td align="center">
        <a href="https://github.com/aaradhanac07">
            <img src="https://github.com/aaradhanac07.png" width="100px;" alt="Contributor 1"/>
            <br />
            <sub><b>Aaradhana Chaudhary</b></sub>
        </a>
        <br />
    </td>
    <td align="center">
        <a href="https://github.com/muskaankarwa">
            <img src="https://github.com/muskaankarwa.png" width="100px;" alt="Contributor 2"/>
            <br />
            <sub><b>Muskaan Karwa</b></sub>
        </a>
        <br />
    </td>
    <td align="center">
        <a href="https://github.com/sahilapage">
            <img src="https://github.com/sahilapage.png" width="100px;" alt="Contributor 3"/>
            <br />
            <sub><b>Sahil Apage</b></sub>
        </a>
        <br />
    </td>
    <td align="center">
        <a href="https://github.com/swamini-jadhav">
            <img src="https://github.com/swamini-jadhav.png" width="100px;" alt="Contributor 4"/>
            <br />
            <sub><b>Swamini Jadhav</b></sub>
        </a>
        <br />
    </td>
</tr>
</table>

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🌟 Future Roadmap

- Multi-stock portfolio tracking
- Advanced technical indicators (RSI, MACD, Bollinger Bands)
- Email/SMS price alerts
- Social sentiment integration (Twitter, Reddit)
- Mobile application (React Native)

---

<div align="center">
</div>