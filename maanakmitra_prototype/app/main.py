from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.staticfiles import StaticFiles
from fastapi.responses import HTMLResponse
from pydantic import BaseModel
from typing import Optional
import pathlib, random, string

app = FastAPI(
    title="Chanakya Demo API",
    version="0.1.0"
)
STATIC_DIR = pathlib.Path(__file__).parent / "static"
INDEX_HTML = STATIC_DIR / "index.html"

app.mount("/static", StaticFiles(directory=str(STATIC_DIR)), name="static")

@app.get("/", response_class=HTMLResponse)
async def root():
    return INDEX_HTML.read_text(encoding="utf-8")

class RecommendRequest(BaseModel):
    text: str
    demo_mode: bool = True
    tender_date: Optional[str] = None

class FeedbackRequest(BaseModel):
    decision: str
    query_id: Optional[str] = None

class ReviewResolveRequest(BaseModel):
    review_id: str
    decision: str

DEMO_RESULT = {
    "query": "Supply of 25mm vulcanized rubber sheets for tank lining",
    "demo_mode": True,
    "pipeline": {"retrieval_top_k": 50, "rerank_top_k": 10, "primary_top_k": 3},
    "extracted": {
        "product": "vulcanized natural rubber sheet",
        "application": "water tank lining",
        "material": "natural rubber",
        "category": "Rubber products"
    },
    "recommendations": [
        {"is_number": "IS DEMO-101:2024", "title": "Vulcanized Rubber Sheets for Industrial Lining", "match": 94, "confidence": "HIGH", "necessity": "ESSENTIAL", "status": "ACTIVE", "currency": "CURRENT", "certification": "ISI MARK REQUIRED", "why": "Primary applicable standard for vulcanized rubber sheet tank lining.", "coverage": ["REQ-001","REQ-003","REQ-004"], "evidence": ["EV-DEMO-01","EV-DEMO-02"], "proof": {"closure_state": "CLOSED"}},
        {"is_number": "IS DEMO-205:2023", "title": "Methods of Test for Vulcanized Rubber", "match": 81, "confidence": "HIGH", "necessity": "TEST_METHOD", "status": "ACTIVE", "currency": "CURRENT", "certification": "N/A", "why": "Test methods for tensile strength and hardness referenced by IS DEMO-101:2024.", "coverage": ["REQ-002"], "evidence": ["EV-DEMO-03"], "proof": {"closure_state": "PARTIAL"}},
        {"is_number": "IS DEMO-420:2025", "title": "Safety Requirements for Rubber in Potable Water", "match": 72, "confidence": "MEDIUM", "necessity": "SAFETY", "status": "ACTIVE", "currency": "CURRENT", "certification": "N/A", "why": "Safety standard for rubber in potable water contact.", "coverage": ["REQ-005"], "evidence": ["EV-DEMO-04"], "proof": {"closure_state": "CLOSED"}},
    ],
    "proof_chain": [
        {"from": "REQ-001", "relation": "SATISFIES", "to": "IS DEMO-101:2024"},
        {"from": "IS DEMO-101:2024", "relation": "SUPPORTED_BY", "to": "EV-DEMO-01"},
        {"from": "EV-DEMO-01", "relation": "VALID_DURING", "to": "2024-2029"},
    ],
    "gaps": [
        {"status": "OUTDATED",  "severity": "HIGH",   "cited": "IS DEMO-118:2018", "required": "IS DEMO-101:2024", "message": "Cited standard is superseded."},
        {"status": "NOT_CITED", "severity": "MEDIUM", "cited": "N/A", "required": "IS DEMO-205:2023", "message": "Test method standard not cited."},
        {"status": "NOT_CITED", "severity": "LOW",    "cited": "N/A", "required": "IS DEMO-420:2025", "message": "Safety standard not cited."},
        {"status": "PRESENT",   "severity": "INFO",   "cited": "IS DEMO-101:2024", "required": "IS DEMO-101:2024", "message": "Correctly cited."},
    ],
    "clause_draft": "The rubber lining shall conform to IS DEMO-101:2024. Test methods per IS DEMO-205:2023. Safety per IS DEMO-420:2025. WARNING: HUMAN REVIEW REQUIRED.",
    "audit": {"hallucinations_removed": 0, "demo_input": True},
}

DEMO_REVIEWS = [
    {"id": "REV-104", "severity": "HIGH",   "reason": "DATE_UNRESOLVED",               "query": "PVC cable specification",     "status": "OPEN"},
    {"id": "REV-109", "severity": "MEDIUM", "reason": "LOW_CLASSIFICATION_CONFIDENCE", "query": "Industrial polymer component", "status": "OPEN"},
    {"id": "REV-112", "severity": "HIGH",   "reason": "QCO_CONFLICT",                  "query": "Demo electrical product",      "status": "OPEN"},
    {"id": "REV-115", "severity": "MEDIUM", "reason": "OPEN_CHAIN_REVIEW",             "query": "Stainless steel valve",        "status": "OPEN"},
]

@app.post("/api/recommend")
async def recommend(req: RecommendRequest):
    r = dict(DEMO_RESULT)
    r["query"] = req.text
    return r

@app.get("/api/demo")
async def demo():
    return DEMO_RESULT

@app.post("/api/upload")
async def upload(file: UploadFile = File(...)):
    ext = pathlib.Path(file.filename).suffix.lower()
    ocr = "PaddleOCR" if ext in {".png", ".jpg", ".jpeg", ".pdf"} else "direct-text"
    return {"filename": file.filename, "accepted": True, "ocr_route": ocr, "demo_mode": True, "job_id": "JOB-DEMO-" + "".join(random.choices(string.ascii_uppercase + string.digits, k=6))}

@app.post("/api/feedback")
async def feedback(req: FeedbackRequest):
    if req.decision not in {"accept", "correct", "review"}:
        raise HTTPException(400, "invalid decision")
    return {"recorded": True, "decision": req.decision, "demo_mode": True}

@app.get("/api/review/queue")
async def review_queue():
    return {"items": DEMO_REVIEWS, "total": len(DEMO_REVIEWS), "demo_mode": True}

@app.post("/api/review/resolve")
async def review_resolve(req: ReviewResolveRequest):
    if req.decision not in {"accept", "reject", "resolve"}:
        raise HTTPException(400, "invalid decision")
    return {"review_id": req.review_id, "decision": req.decision, "resolved": True, "demo_mode": True}

@app.get("/api/health")
async def health():
    return {"status": "ok", "product": "Chanakya", "mode": "demo", "version": "0.1.0-prototype"}
