"""
CHANAKYA — AI-Assisted Procurement Standards Review & Recommendation System
SIH 2026 Simulation / Prototype API

NOTE: This is a SIMULATION PROTOTYPE for demonstration purposes.
It uses synthetic fixture data (IS DEMO-*) and deterministic logic to demonstrate
the intended architecture, pipeline flow, proof-validation invariant, and UI experience.
It does not perform live BIS API retrieval, OCR, vector search, or legal verification.
"""

from pathlib import Path
import json
import time
import copy
from typing import Optional, List, Dict, Any
from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

# Locate base directory and load fixture data
BASE_DIR = Path(__file__).resolve().parent.parent
DATA_PATH = BASE_DIR / "data" / "demo_data.json"

def load_demo_data() -> Dict[str, Any]:
    if not DATA_PATH.exists():
        raise RuntimeError(f"Demo data file missing at: {DATA_PATH}")
    return json.loads(DATA_PATH.read_text(encoding="utf-8"))

DATA = load_demo_data()

app = FastAPI(
    title="CHANAKYA Demo API",
    description="SIH 2026 Simulation Prototype API for AI-assisted procurement standards review.",
    version="1.0.0"
)

# Static files setup
app.mount("/static", StaticFiles(directory=BASE_DIR / "app" / "static"), name="static")

# CORS middleware for local frontend access
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

# --------------------------------------------------------------------------
# Request / Response Models
# --------------------------------------------------------------------------

class RecommendRequest(BaseModel):
    text: str = Field(..., description="Procurement requirement text or tender excerpt")
    demo_mode: bool = Field(default=True, description="Enable simulated pipeline execution")

class FeedbackRequest(BaseModel):
    is_number: Optional[str] = Field(None, description="Target IS number if applicable")
    decision: str = Field(..., description="Feedback action: accept, correct, or review")
    notes: Optional[str] = Field(None, description="Optional officer notes")

class ReviewResolveRequest(BaseModel):
    review_id: str = Field(..., description="Review case ID, e.g., REV-104")
    decision: str = Field(..., description="Decision action: accept, reject, or resolve")
    notes: Optional[str] = Field(None, description="Optional reviewer notes")

# --------------------------------------------------------------------------
# API Endpoints
# --------------------------------------------------------------------------

@app.get("/health")
def health():
    """System health check endpoint."""
    return {
        "status": "ok",
        "engine": "CHANAKYA",
        "mode": "DEMO / SIMULATION",
        "pipeline": "ETOG → NCS → MSSS → CNT → PCR",
        "disclaimer": "Synthetic fixture data. Not live BIS verification."
    }

@app.get("/api/demo")
def get_demo_response():
    """Return the canonical demo recommendation payload."""
    return DATA.get("demo_response", {})

@app.get("/api/standards")
def list_standards():
    """Return synthetic standards catalog items."""
    standards = DATA.get("standards", [])
    return {
        "items": standards,
        "count": len(standards),
        "disclaimer": "Synthetic demo records labeled IS DEMO-*"
    }

@app.get("/api/standards/{is_number:path}")
def get_standard_detail(is_number: str):
    """Return detailed metadata for a specific standard by IS number."""
    target = is_number.strip().lower()
    for item in DATA.get("standards", []):
        if item.get("is_number", "").lower() == target:
            return item
    raise HTTPException(status_code=404, detail=f"Standard '{is_number}' not found in demo fixtures.")

@app.get("/api/relationships")
def list_relationships():
    """Return standards relationship graph edges."""
    return {
        "items": DATA.get("relationships", []),
        "disclaimer": "Synthetic ETOG relationship graph"
    }

@app.get("/api/review/queue")
def get_review_queue():
    """Return human-in-the-loop review cases."""
    return {
        "items": [
            {
                "id": "REV-104",
                "severity": "HIGH",
                "reason": "DATE_UNRESOLVED",
                "query": "PVC cable specification for industrial wiring",
                "status": "OPEN",
                "suggested_action": "Verify current edition date manually"
            },
            {
                "id": "REV-109",
                "severity": "MEDIUM",
                "reason": "LOW_CLASSIFICATION_CONFIDENCE",
                "query": "Industrial polymer component for high temp sealing",
                "status": "OPEN",
                "suggested_action": "Check polymer classification sub-group"
            },
            {
                "id": "REV-112",
                "severity": "HIGH",
                "reason": "QCO_CONFLICT",
                "query": "Demo electrical product mandatory certification",
                "status": "OPEN",
                "suggested_action": "Confirm QCO gazette notification reference"
            },
            {
                "id": "REV-115",
                "severity": "MEDIUM",
                "reason": "OPEN_CHAIN_REVIEW",
                "query": "Stainless steel valve fitting for chemical line",
                "status": "OPEN",
                "suggested_action": "Validate pressure test method edge"
            }
        ]
    }

@app.get("/api/audit")
def get_audit_log():
    """Return synthetic audit trail events."""
    return {
        "events": [
            {"time": "12:02:18", "actor": "Officer", "event": "recommend", "status": "CLOSED", "latency": "2.8s"},
            {"time": "12:02:22", "actor": "Officer", "event": "feedback", "status": "ACCEPTED", "latency": "41ms"},
            {"time": "12:03:06", "actor": "Reviewer", "event": "manual_review", "status": "OPEN", "latency": "—"},
            {"time": "12:04:31", "actor": "System", "event": "offline_replay", "status": "PASSED", "latency": "1.7s"}
        ],
        "notice": "Synthetic audit events for demonstration."
    }

@app.post("/api/upload")
async def upload_file(file: UploadFile = File(...)):
    """Simulated file upload & ingestion endpoint."""
    content = await file.read()
    filename = file.filename or "uploaded_tender.file"
    ext = Path(filename).suffix.lower()
    allowed_extensions = {".pdf", ".docx", ".png", ".jpg", ".jpeg", ".txt"}

    if ext not in allowed_extensions:
        raise HTTPException(
            status_code=400,
            detail=f"Unsupported file format '{ext}'. Allowed formats: PDF, DOCX, PNG, JPG, JPEG, TXT."
        )

    max_bytes = 20 * 1024 * 1024  # 20 MB
    if len(content) > max_bytes:
        raise HTTPException(
            status_code=400,
            detail="File size exceeds maximum allowed limit of 20 MB."
        )

    is_ocr = ext in {".pdf", ".png", ".jpg", ".jpeg"}
    ocr_route = "PaddleOCR → Tesseract fallback" if is_ocr else "Direct text extraction"
    job_id = f"ING-DEMO-{int(time.time()) % 100000:05d}"

    return {
        "filename": filename,
        "extension": ext,
        "size_bytes": len(content),
        "accepted": True,
        "job_id": job_id,
        "ocr_route": ocr_route,
        "status": "ACCEPTED",
        "message": f"Tender accepted for demo ingestion ({ocr_route}). Job ID: {job_id}. No live BIS content is processed in this prototype."
    }

@app.post("/api/recommend")
def recommend(req: RecommendRequest):
    """Deterministic recommendation engine endpoint."""
    text = req.text.strip()
    if not text:
        raise HTTPException(status_code=400, detail="Requirement text cannot be empty.")

    # Deep copy canonical demo response from demo_data.json
    res = copy.deepcopy(DATA.get("demo_response", {}))
    res["query"] = text

    low = text.lower()

    # Deterministic query routing for interactive demo experience
    if any(kw in low for kw in ["rubber", "lining", "vulcanized", "tank", "118"]):
        # Canonical primary demo case
        res["extracted"]["product"] = "vulcanized natural rubber sheet"
        res["extracted"]["application"] = "water tank lining"
        res["extracted"]["material"] = "NR"
        res["extracted"]["category"] = "rubber products"
        res["extracted"]["sector"] = "polymers"
    elif any(kw in low for kw in ["steel", "sheet", "box", "pipe", "metal"]):
        res["extracted"]["product"] = "steel fabricated component"
        res["extracted"]["application"] = "structural support"
        res["extracted"]["material"] = "Mild Steel"
        res["extracted"]["category"] = "metal products"
        res["extracted"]["sector"] = "metallurgy"
        res["recommendations"] = res["recommendations"][:1]
        res["recommendations"][0]["title"] = "Steel Product — Demo Retrieval Candidate"
        res["recommendations"][0]["match"] = 76
        res["recommendations"][0]["confidence"] = "MEDIUM"
        res["recommendations"][0]["why"] = "Simulated candidate retrieval match for steel fabrication query."
    else:
        res["extracted"]["product"] = "technical procurement item"
        res["extracted"]["application"] = "general industrial use"
        res["extracted"]["material"] = "unspecified"
        res["extracted"]["category"] = "general engineering"
        res["extracted"]["sector"] = "industrial"
        res["recommendations"] = res["recommendations"][:2]
        for r in res["recommendations"]:
            r["match"] = max(61, r["match"] - 12)
            r["confidence"] = "MEDIUM"

    res["audit"]["demo_input"] = True
    return res

@app.post("/api/feedback")
def record_feedback(req: FeedbackRequest):
    """Capture officer feedback on recommendations."""
    return {
        "accepted": True,
        "audit_id": f"AUD-FEEDBACK-{int(time.time())}",
        "decision": req.decision,
        "is_number": req.is_number,
        "message": "Feedback captured in simulation mode."
    }

@app.post("/api/review/resolve")
def resolve_review(req: ReviewResolveRequest):
    """Resolve a human review queue item."""
    return {
        "resolved": True,
        "review_id": req.review_id,
        "decision": req.decision,
        "audit_id": f"AUD-RESOLVE-{int(time.time())}",
        "message": "Review resolution simulated."
    }

@app.get("/")
def read_index():
    """Serve the single-page application index.html."""
    index_path = BASE_DIR / "app" / "static" / "index.html"
    if not index_path.exists():
        raise HTTPException(status_code=404, detail="Frontend index.html not found.")
    return FileResponse(index_path)

@app.get("/dashboard")
def read_dashboard():
    """Serve the full Chanakya prototype dashboard."""
    dashboard_path = BASE_DIR / "app" / "static" / "app_dashboard.html"
    if not dashboard_path.exists():
        dashboard_path = BASE_DIR / "app" / "static" / "index.html"
    return FileResponse(dashboard_path)
