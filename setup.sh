#!/bin/bash

# FinIQ Quick Start Script
# This script sets up the development environment

echo "🚀 FinIQ Setup Script"
echo "===================="
echo ""

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js is not installed. Please install Node.js v14+ first.${NC}"
    exit 1
fi

# Check if Python is installed
if ! command -v python3 &> /dev/null; then
    echo -e "${RED}❌ Python is not installed. Please install Python 3.8+ first.${NC}"
    exit 1
fi

# Check if MongoDB is running
if ! command -v mongod &> /dev/null; then
    echo -e "${YELLOW}⚠️  MongoDB is not installed. You can use MongoDB Atlas instead.${NC}"
    echo -e "${YELLOW}   Get connection string from: https://www.mongodb.com/cloud/atlas${NC}"
fi

echo -e "${GREEN}✓ Prerequisites check passed${NC}"
echo ""

# Setup Backend
echo "📦 Setting up Backend..."
cd backend || exit

if [ ! -f .env ]; then
    echo "Creating backend .env file..."
    cp .env.example .env
    echo -e "${YELLOW}⚠️  Please edit backend/.env with your configuration${NC}"
fi

echo "Installing backend dependencies..."
npm install
echo -e "${GREEN}✓ Backend setup complete${NC}"
echo ""

# Setup ML Service
echo "🤖 Setting up ML Service..."
cd ../ml-service || exit

if [ ! -f .env ]; then
    echo "Creating ML service .env file..."
    cp .env.example .env
    echo -e "${YELLOW}⚠️  Please edit ml-service/.env with your NewsAPI key${NC}"
fi

echo "Creating Python virtual environment..."
python3 -m venv venv

echo "Activating virtual environment..."
source venv/bin/activate

echo "Installing ML service dependencies..."
pip install -r requirements.txt
echo -e "${GREEN}✓ ML Service setup complete${NC}"
echo ""

# Setup Frontend
echo "⚛️  Setting up Frontend..."
cd ../frontend || exit

if [ ! -f .env ]; then
    echo "Creating frontend .env file..."
    cp .env.example .env
    echo -e "${YELLOW}⚠️  Please edit frontend/.env if needed${NC}"
fi

echo "Installing frontend dependencies..."
npm install
echo -e "${GREEN}✓ Frontend setup complete${NC}"
echo ""

# Final instructions
echo ""
echo -e "${GREEN}✅ Setup Complete!${NC}"
echo ""
echo "📝 Next Steps:"
echo "   1. Edit configuration files:"
echo "      - backend/.env (MongoDB URI, JWT secrets)"
echo "      - ml-service/.env (NewsAPI key)"
echo ""
echo "   2. Start the services:"
echo ""
echo "      Terminal 1 (Backend):"
echo "      $ cd backend"
echo "      $ npm start"
echo ""
echo "      Terminal 2 (ML Service):"
echo "      $ cd ml-service"
echo "      $ source venv/bin/activate"
echo "      $ python app.py"
echo ""
echo "      Terminal 3 (Frontend):"
echo "      $ cd frontend"
echo "      $ npm start"
echo ""
echo "   3. Open http://localhost:3000 in your browser"
echo ""
echo "📚 For deployment instructions, see DEPLOYMENT.md"
echo ""
