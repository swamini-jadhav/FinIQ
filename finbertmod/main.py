from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from finbert_model import analyze_stock

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class CompanyRequest(BaseModel):
    company_name: str

class ArticleResponse(BaseModel):
    title: str
    source: str
    published: str
    url: str
    sentiment: str
    signal: str
    confidence: float
    emoji: str

class OverallSignalResponse(BaseModel):
    signal: str
    emoji: str
    positive_count: int
    negative_count: int
    neutral_count: int
    avg_confidence: float
    explanation: str
    total: int

class SentimentAnalysisResponse(BaseModel):
    overall: OverallSignalResponse
    articles: list[ArticleResponse]

@app.post("/analyze", response_model=SentimentAnalysisResponse)
async def analyze_company(request: CompanyRequest):
    try:
        company_name = request.company_name.strip()
        
        if not company_name:
            raise HTTPException(status_code=400, detail="Company name cannot be empty")
        
        # Analyze the stock
        result = analyze_stock(company_name)
        
        if result is None:
            raise HTTPException(status_code=404, detail=f"No articles found for {company_name}")
        
        return result
    
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/")
async def root():
    return {"message": "FinBERT Sentiment Analysis API is running"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)