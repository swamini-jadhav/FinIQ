# 🚀 FinIQ - Complete Getting Started Guide

Welcome to FinIQ! This guide will help you get the application running locally and deployed to production.

## 📋 Table of Contents

1. [Prerequisites](#prerequisites)
2. [Local Development Setup](#local-development-setup)
3. [Running the Application](#running-the-application)
4. [Testing the Application](#testing-the-application)
5. [Deployment to Render](#deployment-to-render)
6. [Troubleshooting](#troubleshooting)
7. [FAQ](#faq)

---

## Prerequisites

### Required Software

1. **Node.js** (v14 or higher)
   - Download: https://nodejs.org/
   - Verify: `node --version`

2. **Python** (v3.8 or higher)
   - Download: https://www.python.org/
   - Verify: `python3 --version`

3. **MongoDB** (Optional - can use MongoDB Atlas)
   - Local: https://www.mongodb.com/try/download/community
   - Cloud: https://www.mongodb.com/cloud/atlas (Recommended)

### Required API Keys

1. **NewsAPI Key** (Free)
   - Sign up: https://newsapi.org/
   - Free tier: 100 requests/day
   - Save your API key

2. **MongoDB Connection String**
   - If using Atlas, create free cluster and get connection string
   - If using local MongoDB: `mongodb://localhost:27017/finiq`

---

## Local Development Setup

### Step 1: Clone Repository

```bash
# If you haven't already
git clone https://github.com/sahilapage/FinIQ.git
cd FinIQ
```

### Step 2: Setup Backend

```bash
cd backend
npm install

# Create .env file
cp .env.example .env

# Edit .env with your configuration
# Required variables:
# - MONGODB_URI
# - JWT_SECRET (any random string, 32+ characters)
# - SESSION_SECRET (any random string, 32+ characters)
# - NEWSAPI_KEY
```

**Example backend/.env**:
```env
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/finiq
JWT_SECRET=my_super_secret_jwt_key_change_this_in_production_12345
SESSION_SECRET=my_super_secret_session_key_change_this_12345
ML_SERVICE_URL=http://localhost:5001
NEWSAPI_KEY=your_newsapi_key_here
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

### Step 3: Setup ML Service

```bash
cd ../ml-service

# Create virtual environment
python3 -m venv venv

# Activate virtual environment
# On Mac/Linux:
source venv/bin/activate
# On Windows:
# venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Create .env file
cp .env.example .env

# Edit .env
# Required: NEWSAPI_KEY
```

**Example ml-service/.env**:
```env
FLASK_PORT=5001
NEWSAPI_KEY=your_newsapi_key_here
FLASK_ENV=development
```

### Step 4: Setup Frontend

```bash
cd ../frontend
npm install

# Create .env file (optional, defaults work for local)
cp .env.example .env
```

**Example frontend/.env**:
```env
REACT_APP_API_URL=http://localhost:5000
REACT_APP_ML_API_URL=http://localhost:5001
```

---

## Running the Application

You need to run three services in three separate terminal windows.

### Terminal 1: Backend

```bash
cd backend
npm start

# You should see:
# ✅ MongoDB connected successfully
# 🚀 Server running on port 5000
```

### Terminal 2: ML Service

```bash
cd ml-service
source venv/bin/activate  # Windows: venv\Scripts\activate
python app.py

# You should see:
# 🚀 Starting FinIQ ML Service on port 5001
```

### Terminal 3: Frontend

```bash
cd frontend
npm start

# Browser should auto-open to http://localhost:3000
```

---

## Testing the Application

### 1. Register Account

1. Open http://localhost:3000
2. Click "Sign Up"
3. Fill in:
   - Name: Test User
   - Email: test@example.com
   - Password: test123
4. Click "Sign Up"
5. You should be redirected to dashboard

### 2. Test Stock Prediction

1. In the dashboard, enter a stock ticker:
   - **US Stocks**: `AAPL`, `TSLA`, `MSFT`, `GOOGL`
   - **Indian Stocks**: `TCS.NS`, `RELIANCE.NS`, `INFY.NS`

2. Optionally enter company name: `Apple`, `Tesla`, `TCS`

3. Click "Analyze"

4. Wait 1-2 minutes for results (first time may take longer)

5. You should see:
   - Predicted price
   - Current price
   - Model confidence
   - Price chart
   - News sentiment
   - Investment recommendation

### 3. Test Chatbot

1. Click "AI Assistant" button
2. Try asking:
   - "How do predictions work?"
   - "What stocks are supported?"
   - "How accurate are the predictions?"

### 4. Test Different Stocks

Try these tickers to test various scenarios:
- `AAPL` - Large cap, stable
- `TSLA` - Volatile
- `TCS.NS` - Indian stock
- `RELIANCE.NS` - Indian conglomerate

---

## Deployment to Render

### Prerequisites for Deployment

1. **GitHub Account** - Push code to GitHub
2. **Render Account** - Sign up at https://render.com
3. **MongoDB Atlas** - Free cluster setup
4. **NewsAPI Key** - Already obtained

### Step 1: Push to GitHub

```bash
cd FinIQ
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/FinIQ.git
git push -u origin main
```

### Step 2: Deploy Backend

1. Log in to Render
2. Click "New +" → "Web Service"
3. Connect GitHub repo
4. Configure:
   - Name: `finiq-backend`
   - Root Directory: `backend`
   - Environment: `Node`
   - Build Command: `npm install`
   - Start Command: `npm start`
   
5. Add Environment Variables:
```
PORT=5000
NODE_ENV=production
MONGODB_URI=<your-mongodb-atlas-uri>
JWT_SECRET=<generate-strong-random-string>
SESSION_SECRET=<generate-strong-random-string>
NEWSAPI_KEY=<your-newsapi-key>
ML_SERVICE_URL=https://finiq-ml-service.onrender.com
FRONTEND_URL=https://finiq-frontend.onrender.com
```

6. Click "Create Web Service"
7. **Copy the backend URL**

### Step 3: Deploy ML Service

1. Click "New +" → "Web Service"
2. Connect GitHub repo
3. Configure:
   - Name: `finiq-ml-service`
   - Root Directory: `ml-service`
   - Environment: `Python 3`
   - Build Command: `pip install -r requirements.txt`
   - Start Command: `gunicorn app:app`
   
4. Add Environment Variables:
```
FLASK_PORT=5001
FLASK_ENV=production
NEWSAPI_KEY=<your-newsapi-key>
```

5. Click "Create Web Service"
6. **Copy the ML service URL**

### Step 4: Update Backend

1. Go to backend service in Render
2. Update `ML_SERVICE_URL` with actual ML service URL
3. Save (triggers redeploy)

### Step 5: Deploy Frontend

1. Click "New +" → "Static Site"
2. Connect GitHub repo
3. Configure:
   - Name: `finiq-frontend`
   - Root Directory: `frontend`
   - Build Command: `npm install && npm run build`
   - Publish Directory: `build`
   
4. Add Environment Variables:
```
REACT_APP_API_URL=<your-backend-url>
REACT_APP_ML_API_URL=<your-ml-service-url>
```

5. Click "Create Static Site"
6. **Copy the frontend URL**

### Step 6: Final Backend Update

1. Go to backend service
2. Update `FRONTEND_URL` with actual frontend URL
3. Save

### Step 7: Test Production

1. Visit your frontend URL
2. Test signup, login, predictions
3. Everything should work!

---

## Troubleshooting

### Backend Issues

**Error: MongoDB connection failed**
- Check MongoDB URI is correct
- Ensure IP whitelist includes `0.0.0.0/0` (Atlas)
- Verify username/password in connection string

**Error: Port already in use**
```bash
# Kill process on port 5000
# Mac/Linux:
lsof -ti:5000 | xargs kill
# Windows:
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

### ML Service Issues

**Error: Module not found**
```bash
# Ensure virtual environment is activated
source venv/bin/activate
# Reinstall requirements
pip install -r requirements.txt
```

**Error: PyTorch installation fails**
- Use CPU version: `pip install torch --index-url https://download.pytorch.org/whl/cpu`

**Predictions are slow**
- Normal on first run (model training)
- Subsequent predictions are faster
- Free tier services have resource limits

### Frontend Issues

**Error: Cannot connect to backend**
- Check backend is running on port 5000
- Verify REACT_APP_API_URL in .env
- Check CORS settings in backend

**Error: npm install fails**
```bash
# Clear npm cache
npm cache clean --force
# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json
# Reinstall
npm install
```

### Deployment Issues

**Service won't start on Render**
- Check build logs for errors
- Verify all environment variables are set
- Ensure paths are correct (root directory)

**CORS errors in production**
- Add deployed frontend URL to backend CORS config
- Update FRONTEND_URL environment variable

**MongoDB connection timeout**
- Whitelist `0.0.0.0/0` in MongoDB Atlas
- Check connection string format
- Ensure database user has correct permissions

---

## FAQ

### Q: How long does a prediction take?
**A:** First prediction: 1-2 minutes (model training). Subsequent predictions: 30-60 seconds.

### Q: Which stocks are supported?
**A:** Any stock available on Yahoo Finance with sufficient historical data. Major exchanges include NYSE, NASDAQ, NSE, BSE.

### Q: How accurate are the predictions?
**A:** Model accuracy varies (typically R² > 0.90 for stable stocks). This is educational; not financial advice.

### Q: Can I use this in production?
**A:** Yes, but implement proper error handling, monitoring, and security measures. Consider rate limiting and caching.

### Q: How do I add more features?
**A:** The code is modular. Add new indicators in `lstm_model.py`, new routes in backend, and new components in frontend.

### Q: Is it free to deploy?
**A:** Yes, using free tiers:
- Render: Free tier (sleeps after inactivity)
- MongoDB Atlas: 512MB free
- NewsAPI: 100 requests/day free

### Q: What are the limitations?
**A:** 
- Free tier services sleep after 15 min inactivity
- NewsAPI rate limit (100/day)
- Predictions not guaranteed accurate
- Training time on free tier

### Q: Can I monetize this?
**A:** Yes, but ensure compliance with:
- Financial regulations
- API terms of service
- Proper disclaimers
- Data usage policies

### Q: How do I get support?
**A:** 
1. Check documentation files
2. Review error logs
3. Create GitHub issue
4. Check Render/MongoDB docs

---

## Next Steps

1. ✅ Set up local development
2. ✅ Test all features
3. ✅ Deploy to production
4. 📚 Read FEATURES.md for details
5. 🚀 Customize and enhance
6. 💡 Add your own features

## Resources

- **Render Docs**: https://render.com/docs
- **MongoDB Docs**: https://docs.mongodb.com
- **React Docs**: https://react.dev
- **Flask Docs**: https://flask.palletsprojects.com
- **PyTorch Docs**: https://pytorch.org/docs

---

**Happy Coding! 🎉**

If you have questions or need help, check the documentation or create an issue on GitHub.
