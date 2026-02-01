const express = require('express');
const router = express.Router();
const axios = require('axios');
const { optionalAuth } = require('../middleware/auth');

const ML_SERVICE_URL = process.env.ML_SERVICE_URL || 'http://localhost:5001';

// @route   POST /api/chatbot/query
// @desc    Ask chatbot a question
// @access  Public/Private (optional auth)
router.post('/query', optionalAuth, async (req, res) => {
  try {
    const { message, context } = req.body;

    if (!message) {
      return res.status(400).json({ 
        success: false, 
        message: 'Message is required' 
      });
    }

    // Call ML service chatbot endpoint
    const response = await axios.post(`${ML_SERVICE_URL}/chatbot`, 
      { 
        message,
        context: context || {},
        userId: req.user?._id
      },
      { timeout: 30000 }
    );

    res.json({
      success: true,
      data: response.data
    });

  } catch (error) {
    console.error('Chatbot error:', error.response?.data || error.message);
    
    if (error.code === 'ECONNREFUSED') {
      return res.status(503).json({
        success: false,
        message: 'Chatbot service is currently unavailable'
      });
    }

    res.status(500).json({ 
      success: false, 
      message: error.response?.data?.message || 'Error processing chatbot query' 
    });
  }
});

// @route   POST /api/chatbot/feedback
// @desc    Submit feedback on chatbot response
// @access  Public
router.post('/feedback', async (req, res) => {
  try {
    const { messageId, rating, feedback } = req.body;

    // In a production app, you would store this feedback
    // For now, just acknowledge receipt
    
    res.json({
      success: true,
      message: 'Feedback received, thank you!'
    });

  } catch (error) {
    console.error('Feedback error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error submitting feedback' 
    });
  }
});

module.exports = router;
