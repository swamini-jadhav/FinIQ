# FinIQ - Complete Project Structure

```
FinIQ/
│
├── README.md                          # Main documentation
├── DEPLOYMENT.md                      # Detailed deployment guide
├── FEATURES.md                        # Complete features documentation
├── setup.sh                          # Quick setup script
├── .gitignore                        # Git ignore file
├── render.yaml                       # Render deployment config
│
├── backend/                          # Node.js/Express Backend
│   ├── package.json                  # Dependencies
│   ├── server.js                     # Main server file
│   ├── .env.example                  # Environment template
│   ├── config/
│   │   └── passport.js              # Authentication config
│   ├── models/
│   │   └── User.js                  # User model
│   ├── middleware/
│   │   └── auth.js                  # Auth middleware
│   └── routes/
│       ├── auth.js                  # Auth routes
│       ├── ml.js                    # ML proxy routes
│       └── chatbot.js               # Chatbot routes
│
├── ml-service/                       # Flask ML Service
│   ├── app.py                       # Main Flask app
│   ├── requirements.txt             # Python dependencies
│   ├── .env.example                 # Environment template
│   ├── lstm_model.py                # LSTM implementation
│   ├── sentiment_analysis.py       # NLP sentiment analysis
│   └── chatbot.py                   # Chatbot logic
│
└── frontend/                         # React Frontend
    ├── package.json                 # Dependencies
    ├── tailwind.config.js           # Tailwind config
    ├── postcss.config.js            # PostCSS config
    ├── .env.example                 # Environment template
    ├── public/
    │   └── index.html               # HTML template
    └── src/
        ├── index.js                 # Entry point
        ├── index.css                # Global styles
        ├── App.js                   # Main app component
        ├── utils/
        │   └── api.js               # API utilities
        ├── context/
        │   └── AuthContext.js       # Auth state management
        ├── pages/
        │   ├── Login.js             # Login page
        │   ├── Register.js          # Register page
        │   └── Dashboard.js         # Main dashboard
        └── components/
            ├── PredictionChart.js   # Chart component
            ├── NewsCard.js          # News card component
            └── Chatbot.js           # Chatbot component
```

## Quick Start

### 1. Clone and Setup
```bash
git clone https://github.com/sahilapage/FinIQ.git
cd FinIQ
chmod +x setup.sh
./setup.sh
```

### 2. Configure Environment Variables

**backend/.env**:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/finiq
JWT_SECRET=your_jwt_secret
SESSION_SECRET=your_session_secret
ML_SERVICE_URL=http://localhost:5001
NEWSAPI_KEY=your_newsapi_key
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

**ml-service/.env**:
```env
FLASK_PORT=5001
NEWSAPI_KEY=your_newsapi_key
FLASK_ENV=development
```

**frontend/.env**:
```env
REACT_APP_API_URL=http://localhost:5000
REACT_APP_ML_API_URL=http://localhost:5001
```

### 3. Start Services

**Terminal 1 - Backend**:
```bash
cd backend
npm install
npm start
```

**Terminal 2 - ML Service**:
```bash
cd ml-service
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
python app.py
```

**Terminal 3 - Frontend**:
```bash
cd frontend
npm install
npm start
```

### 4. Access Application
Open http://localhost:3000 in your browser

## Deployment

See **DEPLOYMENT.md** for detailed deployment instructions on Render.

## Key Features

✅ User authentication (signup/login/logout)
✅ LSTM-based stock price prediction
✅ Real-time news sentiment analysis
✅ AI-powered investment recommendations
✅ Interactive price charts
✅ AI chatbot for queries
✅ Clean, modern UI with TailwindCSS
✅ Responsive design
✅ RESTful API architecture
✅ Secure authentication with JWT
✅ MongoDB integration
✅ Production-ready deployment config

## Technology Stack

**Frontend**: React, TailwindCSS, Chart.js, Axios
**Backend**: Node.js, Express, MongoDB, Passport.js
**ML Service**: Flask, PyTorch, yfinance, TextBlob
**Deployment**: Render, MongoDB Atlas

## API Keys Required

1. **MongoDB Atlas**: Free cluster at mongodb.com/cloud/atlas
2. **NewsAPI**: Free key at newsapi.org

## File Count

- Total Files: 30+
- Backend Files: 7
- ML Service Files: 5
- Frontend Files: 15+
- Documentation Files: 3

## Lines of Code

- Backend: ~800 lines
- ML Service: ~900 lines
- Frontend: ~1,500 lines
- Total: ~3,200 lines

## Support

For issues or questions:
1. Check FEATURES.md for functionality details
2. Check DEPLOYMENT.md for deployment help
3. Check README.md for general information
4. Create GitHub issue for bugs

---

**Built with ❤️ for stock market enthusiasts**
