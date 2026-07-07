import numpy as np
import pandas as pd
import yfinance as yf
from sklearn.preprocessing import MinMaxScaler
from sklearn.metrics import mean_squared_error, r2_score
import torch
import torch.nn as nn
from torch.utils.data import TensorDataset, DataLoader
import warnings

warnings.filterwarnings('ignore')

np.random.seed(42)
torch.manual_seed(42)

class StockLSTM(nn.Module):
    def __init__(self, input_size=8, hidden_size=64, num_layers=2, dropout=0.2):
        super(StockLSTM, self).__init__()
        
        self.hidden_size = hidden_size
        self.num_layers = num_layers
        
        self.lstm = nn.LSTM(
            input_size=input_size,
            hidden_size=hidden_size,
            num_layers=num_layers,
            dropout=dropout,
            batch_first=True
        )
        
        self.fc = nn.Linear(hidden_size, 1)
    
    def forward(self, x):
        h0 = torch.zeros(self.num_layers, x.size(0), self.hidden_size).to(x.device)
        c0 = torch.zeros(self.num_layers, x.size(0), self.hidden_size).to(x.device)
        
        out, _ = self.lstm(x, (h0, c0))
        out = self.fc(out[:, -1, :])
        
        return out


def resolve_ticker(ticker):
    """Try to find valid yfinance ticker by auto-appending Indian exchange suffixes."""
    candidates = [ticker]
    
    # If no suffix already, try Indian exchanges
    if not any(ticker.endswith(s) for s in ['.NS', '.BO', '.', '-']):
        candidates += [f"{ticker}.NS", f"{ticker}.BO"]
    
    for candidate in candidates:
        try:
            data = yf.download(candidate, period="1mo", progress=False)
            if not data.empty:
                return candidate
        except Exception:
            continue
    
    raise ValueError(
        f"No data found for '{ticker}'. "
        f"Tried: {', '.join(candidates)}. "
        f"For Indian stocks use NSE (e.g. TCS.NS) or BSE (e.g. TCS.BO) suffix, "
        f"or just type the symbol and it will be auto-detected."
    )


def fetch_stock_data(ticker, period="5y"):
    try:
        resolved = resolve_ticker(ticker)
        if resolved != ticker:
            print(f"Resolved '{ticker}' → '{resolved}'")
        data = yf.download(resolved, period=period, progress=False)
        if data.empty:
            raise ValueError(f"No data found for ticker: {resolved}")
        data = data[['Open', 'High', 'Low', 'Close', 'Volume']]
        data._resolved_ticker = resolved  # carry resolved name forward
        return data, resolved
    except Exception as e:
        raise Exception(f"Error fetching data for {ticker}: {str(e)}")



def calculate_technical_indicators(df):
    data = df.copy()
    
    data['SMA_10'] = data['Close'].rolling(window=10).mean()
    
    data['EMA_20'] = data['Close'].ewm(span=20, adjust=False).mean()
    
    delta = data['Close'].diff()
    gain = (delta.where(delta > 0, 0)).rolling(window=14).mean()
    loss = (-delta.where(delta < 0, 0)).rolling(window=14).mean()
    rs = gain / loss
    data['RSI_14'] = 100 - (100 / (1 + rs))
    
    data.dropna(inplace=True)
    
    return data


def create_sequences(data, seq_length=60):
    X, y = [], []
    
    for i in range(seq_length, len(data)):
        X.append(data[i-seq_length:i])
        y.append(data[i, 3])  
    
    return np.array(X), np.array(y)


def prepare_data(df, seq_length=60, train_split=0.8):
    feature_cols = ['Open', 'High', 'Low', 'Close', 'Volume', 'SMA_10', 'EMA_20', 'RSI_14']
    data = df[feature_cols].values
    
    scaler = MinMaxScaler(feature_range=(0, 1))
    scaled_data = scaler.fit_transform(data)
    
    X, y = create_sequences(scaled_data, seq_length)
    
    split_idx = int(len(X) * train_split)
    X_train, X_test = X[:split_idx], X[split_idx:]
    y_train, y_test = y[:split_idx], y[split_idx:]
    
    X_train_t = torch.FloatTensor(X_train)
    y_train_t = torch.FloatTensor(y_train)
    X_test_t = torch.FloatTensor(X_test)
    y_test_t = torch.FloatTensor(y_test)
    
    train_dataset = TensorDataset(X_train_t, y_train_t)
    test_dataset = TensorDataset(X_test_t, y_test_t)
    
    train_loader = DataLoader(train_dataset, batch_size=32, shuffle=True)
    test_loader = DataLoader(test_dataset, batch_size=32, shuffle=False)
    
    return train_loader, test_loader, scaler, feature_cols, X_test, y_test


def train_model(model, train_loader, criterion, optimizer, num_epochs=50, device='cpu'):
    model.to(device)
    model.train()
    
    train_losses = []
    
    for epoch in range(num_epochs):
        epoch_loss = 0
        
        for X_batch, y_batch in train_loader:
            X_batch, y_batch = X_batch.to(device), y_batch.to(device)
            
            predictions = model(X_batch)
            loss = criterion(predictions.squeeze(), y_batch)
            
            optimizer.zero_grad()
            loss.backward()
            optimizer.step()
            
            epoch_loss += loss.item()
        
        avg_loss = epoch_loss / len(train_loader)
        train_losses.append(avg_loss)
    
    return train_losses


def evaluate_model(model, test_loader, scaler, device='cpu'):
    model.to(device)
    model.eval()
    
    predictions = []
    actuals = []
    
    with torch.no_grad():
        for X_batch, y_batch in test_loader:
            X_batch = X_batch.to(device)
            pred = model(X_batch)
            predictions.extend(pred.squeeze().cpu().numpy())
            actuals.extend(y_batch.numpy())
    
    predictions = np.array(predictions)
    actuals = np.array(actuals)
    
    dummy = np.zeros((len(predictions), scaler.n_features_in_))
    dummy[:, 3] = predictions
    predictions_inv = scaler.inverse_transform(dummy)[:, 3]
    
    dummy[:, 3] = actuals
    actuals_inv = scaler.inverse_transform(dummy)[:, 3]
    
    mse = mean_squared_error(actuals_inv, predictions_inv)
    r2 = r2_score(actuals_inv, predictions_inv)
    
    return predictions_inv, actuals_inv, mse, r2


def predict_next_close(model, data, scaler, seq_length=60, device='cpu'):
    model.to(device)
    model.eval()
    
    feature_cols = ['Open', 'High', 'Low', 'Close', 'Volume', 'SMA_10', 'EMA_20', 'RSI_14']
    last_sequence = data[feature_cols].values[-seq_length:]
    
    last_sequence_scaled = scaler.transform(last_sequence)
    
    input_tensor = torch.FloatTensor(last_sequence_scaled).unsqueeze(0).to(device)
    
    with torch.no_grad():
        prediction_scaled = model(input_tensor).cpu().numpy()[0][0]
    
    dummy = np.zeros((1, scaler.n_features_in_))
    dummy[0, 3] = prediction_scaled
    predicted_price = scaler.inverse_transform(dummy)[0, 3]
    
    return predicted_price


def predict_stock(ticker, num_epochs=50):
    try:
        print(f"Fetching data for {ticker}...")
        df, resolved_ticker = fetch_stock_data(ticker)
        df = calculate_technical_indicators(df)
        
        train_loader, test_loader, scaler, feature_cols, X_test, y_test = prepare_data(
            df, seq_length=60
        )
        
        input_size = len(feature_cols)
        model = StockLSTM(input_size=input_size, hidden_size=64, num_layers=2, dropout=0.2)
        
        criterion = nn.MSELoss()
        optimizer = torch.optim.Adam(model.parameters(), lr=0.001)
        
        print(f"Training model for {resolved_ticker}...")
        device = 'cuda' if torch.cuda.is_available() else 'cpu'
        train_losses = train_model(
            model, train_loader, criterion, optimizer,
            num_epochs=num_epochs, device=device
        )
        
        print(f"Evaluating model for {resolved_ticker}...")
        predictions, actuals, mse, r2 = evaluate_model(
            model, test_loader, scaler, device=device
        )
        
        next_price = predict_next_close(model, df, scaler, seq_length=60, device=device)
        last_close = float(df['Close'].iloc[-1])
        price_change = next_price - last_close
        percent_change = ((next_price / last_close) - 1) * 100
        
        recent_prices = df['Close'].tail(30).values.tolist()
        
        return {
            'ticker': resolved_ticker,
            'predicted_price': float(next_price),
            'last_close': float(last_close),
            'price_change': float(price_change),
            'percent_change': float(percent_change),
            'mse': float(mse),
            'r2_score': float(r2),
            'recent_prices': recent_prices,
            'currency': 'INR' if resolved_ticker.endswith('.NS') or resolved_ticker.endswith('.BO') else 'USD'
        }
        
    except Exception as e:
        raise Exception(f"Prediction failed: {str(e)}")

