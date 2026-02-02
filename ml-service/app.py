from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from dotenv import load_dotenv
import logging

from lstm_model import predict_stock
from sentiment_analysis import analyze_news_sentiment, generate_recommendation
from chatbot import get_chatbot_response

load_dotenv()

app = Flask(__name__)
CORS(app)

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

PORT = int(os.getenv('FLASK_PORT', 5001))
NEWSAPI_KEY = os.getenv('NEWSAPI_KEY')

if not NEWSAPI_KEY:
    logger.warning("⚠️  NEWSAPI_KEY not found. News sentiment analysis will be limited.")


@app.route('/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({
        'status': 'healthy',
        'service': 'FinIQ ML Service',
        'version': '1.0.0',
        'newsapi_configured': bool(NEWSAPI_KEY)
    }), 200


@app.route('/predict', methods=['POST'])
def predict():
    """Predict stock price using LSTM model"""
    try:
        data = request.get_json()
        
        if not data or 'ticker' not in data:
            return jsonify({
                'success': False,
                'message': 'Stock ticker is required'
            }), 400
        
        ticker = data['ticker'].upper()
        num_epochs = data.get('epochs', 50)
        
        logger.info(f"Processing prediction request for {ticker}")
        
        result = predict_stock(ticker, num_epochs=num_epochs)
        
        return jsonify({
            'success': True,
            'data': result
        }), 200
        
    except ValueError as e:
        logger.error(f"Validation error: {str(e)}")
        return jsonify({
            'success': False,
            'message': str(e)
        }), 404
        
    except Exception as e:
        logger.error(f"Prediction error: {str(e)}")
        return jsonify({
            'success': False,
            'message': f'Prediction failed: {str(e)}'
        }), 500


@app.route('/news-sentiment', methods=['POST'])
def news_sentiment():
    """Analyze news sentiment for a stock"""
    try:
        data = request.get_json()
        
        if not data or 'ticker' not in data:
            return jsonify({
                'success': False,
                'message': 'Stock ticker is required'
            }), 400
        
        ticker = data['ticker'].upper()
        company = data.get('company')
        
        logger.info(f"Processing sentiment analysis for {ticker}")
        
        if not NEWSAPI_KEY:
            return jsonify({
                'success': False,
                'message': 'News API key not configured'
            }), 503
        
        result = analyze_news_sentiment(ticker, company)
        
        return jsonify({
            'success': True,
            'data': result
        }), 200
        
    except Exception as e:
        logger.error(f"Sentiment analysis error: {str(e)}")
        return jsonify({
            'success': False,
            'message': f'Sentiment analysis failed: {str(e)}'
        }), 500


@app.route('/recommendation', methods=['POST'])
def recommendation():
    """Generate investment recommendation"""
    try:
        data = request.get_json()
        
        if not data or 'ticker' not in data:
            return jsonify({
                'success': False,
                'message': 'Stock ticker is required'
            }), 400
        
        ticker = data['ticker'].upper()
        company = data.get('company')
        
        logger.info(f"Generating recommendation for {ticker}")
        
        prediction_result = predict_stock(ticker, num_epochs=50)
        
        if NEWSAPI_KEY:
            sentiment_result = analyze_news_sentiment(ticker, company)
        else:
            sentiment_result = {
                'overall_sentiment': 'neutral',
                'average_polarity': 0,
                'articles_analyzed': 0
            }
        
        recommendation_result = generate_recommendation(prediction_result, sentiment_result)
        
        combined_result = {
            'ticker': ticker,
            'prediction': prediction_result,
            'sentiment': sentiment_result,
            'recommendation': recommendation_result
        }
        
        return jsonify({
            'success': True,
            'data': combined_result
        }), 200
        
    except ValueError as e:
        logger.error(f"Validation error: {str(e)}")
        return jsonify({
            'success': False,
            'message': str(e)
        }), 404
        
    except Exception as e:
        logger.error(f"Recommendation error: {str(e)}")
        return jsonify({
            'success': False,
            'message': f'Recommendation generation failed: {str(e)}'
        }), 500


@app.route('/chatbot', methods=['POST'])
def chatbot():
    """Chatbot endpoint"""
    try:
        data = request.get_json()
        
        if not data or 'message' not in data:
            return jsonify({
                'success': False,
                'message': 'Message is required'
            }), 400
        
        message = data['message']
        context = data.get('context', {})
        
        logger.info(f"Processing chatbot query: {message[:50]}...")
        
        result = get_chatbot_response(message, context)
        
        return jsonify({
            'success': True,
            'data': result
        }), 200
        
    except Exception as e:
        logger.error(f"Chatbot error: {str(e)}")
        return jsonify({
            'success': False,
            'message': f'Chatbot query failed: {str(e)}'
        }), 500


@app.route('/', methods=['GET'])
def root():
    """Root endpoint"""
    return jsonify({
        'service': 'FinIQ ML Service',
        'version': '1.0.0',
        'endpoints': {
            'health': '/health',
            'predict': '/predict',
            'news_sentiment': '/news-sentiment',
            'recommendation': '/recommendation',
            'chatbot': '/chatbot'
        }
    }), 200


@app.errorhandler(404)
def not_found(error):
    """404 error handler"""
    return jsonify({
        'success': False,
        'message': 'Endpoint not found'
    }), 404


@app.errorhandler(500)
def internal_error(error):
    """500 error handler"""
    return jsonify({
        'success': False,
        'message': 'Internal server error'
    }), 500


if __name__ == '__main__':
    logger.info(f"Starting FinIQ ML Service on port {PORT}")
    logger.info(f"NewsAPI configured: {bool(NEWSAPI_KEY)}")
    app.run(host='0.0.0.0', port=PORT, debug=os.getenv('FLASK_ENV') == 'development')
