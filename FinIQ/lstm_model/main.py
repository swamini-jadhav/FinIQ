from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import torch
import torch.nn as nn
from lstm_model import (
    StockLSTM,
    fetch_stock_data,
    calculate_technical_indicators,
    prepare_data,
    train_model,
    evaluate_model,
    predict_next_close,
    generate_actual_vs_pred_graph,
    generate_training_loss_graph
)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class PredictionRequest(BaseModel):
    ticker: str

class PredictionResponse(BaseModel):
    predicted_price: float
    last_close: float
    price_change: float
    percent_change: float
    mse: float
    r2: float
    actual_vs_pred_graph: str
    training_loss_graph: str

@app.post("/predict", response_model=PredictionResponse)
async def predict_stock(request: PredictionRequest):
    try:
        ticker = request.ticker.strip().upper()
        
        # Fetch stock data
        df = fetch_stock_data(ticker)
        if df.empty:
            raise HTTPException(status_code=400, detail=f"Invalid ticker: {ticker}")
        
        # Calculate technical indicators
        df = calculate_technical_indicators(df)
        
        # Prepare data
        train_loader, test_loader, scaler, feature_cols, X_test, y_test = prepare_data(
            df, seq_length=60
        )
        
        # Initialize model
        input_size = len(feature_cols)
        model = StockLSTM(input_size=input_size, hidden_size=64, num_layers=2, dropout=0.2)
        
        # Set device
        device = 'cuda' if torch.cuda.is_available() else 'cpu'
        
        # Define loss and optimizer
        criterion = nn.MSELoss()
        optimizer = torch.optim.Adam(model.parameters(), lr=0.001)
        
        # Train model
        train_losses = train_model(
            model, train_loader, criterion, optimizer,
            num_epochs=50, device=device
        )
        
        # Evaluate model
        predictions, actuals, mse, r2 = evaluate_model(
            model, test_loader, scaler, X_test, y_test, device=device
        )
        
        # Predict next closing price
        next_price = predict_next_close(model, df, scaler, seq_length=60, device=device)
        last_close = float(df['Close'].iloc[-1])
        price_change = next_price - last_close
        percent_change = ((next_price / last_close) - 1) * 100
        
        # Generate graphs
        actual_vs_pred_graph = generate_actual_vs_pred_graph(actuals, predictions, ticker)
        training_loss_graph = generate_training_loss_graph(train_losses)
        
        return PredictionResponse(
            predicted_price=float(next_price),
            last_close=float(last_close),
            price_change=float(price_change),
            percent_change=float(percent_change),
            mse=float(mse),
            r2=float(r2),
            actual_vs_pred_graph=actual_vs_pred_graph,
            training_loss_graph=training_loss_graph
        )
    
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/")
async def root():
    return {"message": "Stock LSTM Prediction API is running"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)