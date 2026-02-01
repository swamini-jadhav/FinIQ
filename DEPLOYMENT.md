# FinIQ Deployment Guide for Render

This guide will help you deploy the complete FinIQ application on Render.

## Prerequisites

1. **GitHub Account** - Push your code to GitHub
2. **Render Account** - Sign up at https://render.com
3. **MongoDB Atlas Account** - For database (free tier available)
4. **NewsAPI Key** - Get from https://newsapi.org (free tier available)

## Step 1: Setup MongoDB Atlas

1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free cluster
3. Create a database user with password
4. Whitelist all IPs: `0.0.0.0/0` (for Render access)
5. Get your connection string (replace `<password>` with actual password):
   ```
   mongodb+srv://username:<password>@cluster0.xxxxx.mongodb.net/finiq?retryWrites=true&w=majority
   ```

## Step 2: Get NewsAPI Key

1. Go to https://newsapi.org
2. Sign up for free account
3. Get your API key from dashboard

## Step 3: Push Code to GitHub

```bash
cd FinIQ
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/FinIQ.git
git push -u origin main
```

## Step 4: Deploy Backend (Node.js)

1. Log in to Render dashboard
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Configure:
   - **Name**: `finiq-backend`
   - **Root Directory**: `backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Free

5. Add Environment Variables:
   ```
   PORT=5000
   NODE_ENV=production
   MONGODB_URI=<your-mongodb-atlas-connection-string>
   JWT_SECRET=<generate-random-string>
   SESSION_SECRET=<generate-random-string>
   ML_SERVICE_URL=<will-add-after-ml-service-deployment>
   NEWSAPI_KEY=<your-newsapi-key>
   FRONTEND_URL=<will-add-after-frontend-deployment>
   ```

6. Click "Create Web Service"
7. **Save the backend URL** (e.g., https://finiq-backend.onrender.com)

## Step 5: Deploy ML Service (Flask)

1. Click "New +" → "Web Service"
2. Connect your GitHub repository
3. Configure:
   - **Name**: `finiq-ml-service`
   - **Root Directory**: `ml-service`
   - **Environment**: `Python 3`
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `gunicorn app:app`
   - **Plan**: Free

4. Add Environment Variables:
   ```
   FLASK_PORT=5001
   FLASK_ENV=production
   NEWSAPI_KEY=<your-newsapi-key>
   ```

5. Click "Create Web Service"
6. **Save the ML service URL** (e.g., https://finiq-ml-service.onrender.com)

## Step 6: Update Backend Environment Variables

1. Go to your backend service settings
2. Update these environment variables:
   ```
   ML_SERVICE_URL=<your-ml-service-url>
   ```

## Step 7: Deploy Frontend (React)

1. Click "New +" → "Static Site"
2. Connect your GitHub repository
3. Configure:
   - **Name**: `finiq-frontend`
   - **Root Directory**: `frontend`
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `build`

4. Add Environment Variables:
   ```
   REACT_APP_API_URL=<your-backend-url>
   REACT_APP_ML_API_URL=<your-ml-service-url>
   ```

5. Click "Create Static Site"
6. **Save the frontend URL** (e.g., https://finiq-frontend.onrender.com)

## Step 8: Final Backend Update

1. Go to backend service settings
2. Update:
   ```
   FRONTEND_URL=<your-frontend-url>
   ```
3. Save and let it redeploy

## Step 9: Test Your Application

1. Visit your frontend URL
2. Register a new account
3. Login
4. Test stock prediction with a ticker (e.g., AAPL, TCS.NS)
5. Test chatbot functionality

## Important Notes

### Free Tier Limitations

- **Render Free Services**: Spin down after 15 minutes of inactivity
  - First request after inactivity may take 30-60 seconds
  - Keep services awake with a cron job or paid tier

- **MongoDB Atlas**: 512MB storage limit on free tier
  - Sufficient for thousands of users

- **NewsAPI**: 100 requests/day on free tier
  - Implement caching if needed

### Performance Tips

1. **Cold Starts**: First ML prediction after inactivity takes 2-3 minutes
   - This is normal for free tier
   - Paid tiers have persistent instances

2. **LSTM Training**: Training happens on-demand
   - May take 1-2 minutes for first prediction
   - Consider caching predictions for popular stocks

3. **CORS**: Already configured for cross-origin requests

### Troubleshooting

**Backend won't start:**
- Check MongoDB connection string is correct
- Ensure all environment variables are set
- Check logs in Render dashboard

**ML Service fails:**
- PyTorch installation takes time on first deploy (5-10 minutes)
- Check requirements.txt is in ml-service directory
- Verify Python version compatibility

**Frontend can't connect:**
- Ensure REACT_APP_API_URL includes https://
- Check CORS settings in backend
- Verify environment variables are set before build

**Predictions are slow:**
- Free tier services spin down after 15 minutes
- First request wakes service (30-60 seconds)
- ML predictions take 1-2 minutes on free tier

### Security Best Practices

1. **JWT Secret**: Use strong random strings (32+ characters)
2. **MongoDB**: Never use default passwords
3. **API Keys**: Don't commit to Git (use .env files)
4. **HTTPS**: Render provides free SSL certificates

## Alternative Deployment Options

### Heroku
- Similar process but uses Procfile
- Also has free tier with limitations

### Railway
- Easier configuration
- Good alternative to Render

### Vercel (Frontend only)
- Excellent for React deployment
- Deploy backend separately

### AWS/DigitalOcean
- More control but requires server management
- Better for production at scale

## Cost Optimization

**Stay on Free Tier:**
- Use all free tier services
- Implement request caching
- Optimize model loading

**Upgrade Path ($7-20/month):**
- Backend: $7/month (always on)
- ML Service: $7/month (always on)
- Frontend: Free (static hosting)
- MongoDB: Free or $9/month

## Monitoring

1. **Render Dashboard**: Check service status and logs
2. **MongoDB Atlas**: Monitor database usage
3. **Error Tracking**: Implement Sentry (optional)

## Maintenance

1. **Regular Updates**: Keep dependencies updated
2. **Security Patches**: Monitor for vulnerabilities
3. **Backup**: Export MongoDB data regularly
4. **Logs**: Check logs for errors

## Support

- Render Docs: https://render.com/docs
- MongoDB Docs: https://docs.mongodb.com
- FinIQ Issues: Use GitHub Issues

---

**Congratulations!** Your FinIQ application should now be live and accessible from anywhere!
