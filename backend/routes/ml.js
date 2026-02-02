const express = require('express');
const router = express.Router();
const axios = require('axios');
const { optionalAuth } = require('../middleware/auth');
const User = require('../models/User');

const ML_SERVICE_URL = process.env.ML_SERVICE_URL || 'http://localhost:5001';

// @route   POST /api/ml/predict
// @desc    Get stock price prediction
// @access  Public/Private (optional auth)
router.post('/predict', optionalAuth, async (req, res) => {
  try {
    const { ticker } = req.body;

    if (!ticker) {
      return res.status(400).json({ 
        success: false, 
        message: 'Stock ticker is required' 
      });
    }

    // Add to search history if user is authenticated
    if (req.user) {
      const user = await User.findById(req.user._id);
      user.searchHistory.push({ ticker, timestamp: new Date() });
      // Keep only last 50 searches
      if (user.searchHistory.length > 50) {
        user.searchHistory = user.searchHistory.slice(-50);
      }
      await user.save();
    }

    // Call ML service for prediction
    const response = await axios.post(`${ML_SERVICE_URL}/predict`, { ticker }, {
      timeout: 120000 // 2 minutes timeout for ML processing
    });

    res.json({
      success: true,
      data: response.data
    });

  } catch (error) {
    console.error('Prediction error:', error.response?.data || error.message);
    
    if (error.response?.status === 404) {
      return res.status(404).json({
        success: false,
        message: 'Stock ticker not found'
      });
    }

    if (error.code === 'ECONNREFUSED') {
      return res.status(503).json({
        success: false,
        message: 'ML service is currently unavailable'
      });
    }

    res.status(500).json({ 
      success: false, 
      message: error.response?.data?.message || 'Error processing prediction request' 
    });
  }
});

// @route   POST /api/ml/news-sentiment
// @desc    Get news sentiment analysis
// @access  Public/Private (optional auth)
router.post('/news-sentiment', optionalAuth, async (req, res) => {
  try {
    const { ticker, company } = req.body;

    if (!ticker && !company) {
      return res.status(400).json({ 
        success: false, 
        message: 'Stock ticker or company name is required' 
      });
    }

    // Call ML service for sentiment analysis
    const response = await axios.post(`${ML_SERVICE_URL}/news-sentiment`, 
      { ticker, company },
      { timeout: 30000 }
    );

    res.json({
      success: true,
      data: response.data
    });

  } catch (error) {
    console.error('News sentiment error:', error.response?.data || error.message);
    
    if (error.code === 'ECONNREFUSED') {
      return res.status(503).json({
        success: false,
        message: 'ML service is currently unavailable'
      });
    }

    res.status(500).json({ 
      success: false, 
      message: error.response?.data?.message || 'Error processing sentiment analysis' 
    });
  }
});

// @route   POST /api/ml/recommendation
// @desc    Get investment recommendation based on prediction and sentiment
// @access  Public/Private (optional auth)
router.post('/recommendation', optionalAuth, async (req, res) => {
  try {
    const { ticker, company } = req.body;

    if (!ticker) {
      return res.status(400).json({ 
        success: false, 
        message: 'Stock ticker is required' 
      });
    }

    // Call ML service for recommendation
    const response = await axios.post(`${ML_SERVICE_URL}/recommendation`, 
      { ticker, company },
      { timeout: 150000 } // 2.5 minutes for combined analysis
    );

    res.json({
      success: true,
      data: response.data
    });

  } catch (error) {
    console.error('Recommendation error:', error.response?.data || error.message);
    
    if (error.code === 'ECONNREFUSED') {
      return res.status(503).json({
        success: false,
        message: 'ML service is currently unavailable'
      });
    }

    res.status(500).json({ 
      success: false, 
      message: error.response?.data?.message || 'Error generating recommendation' 
    });
  }
});

// @route   GET /api/ml/health
// @desc    Check ML service health
// @access  Public
router.get('/health', async (req, res) => {
  try {
    const response = await axios.get(`${ML_SERVICE_URL}/health`, {
      timeout: 5000
    });

    res.json({
      success: true,
      mlService: response.data
    });
  } catch (error) {
    res.status(503).json({
      success: false,
      message: 'ML service is unavailable'
    });
  }
});

module.exports = router;
