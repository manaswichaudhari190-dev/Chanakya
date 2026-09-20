
from pathlib import Path
import json, re, time
from fastapi import FastAPI, UploadFile, File
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

BASE = Path(__file__).resolve().parent.parent
DATA = json.loads((BASE / "data" / "demo_data.json").read_text(encoding="utf-8"))

app = FastAPI(title="Chanakya Demo API", version="1.0.0")
app.mount("/static", StaticFiles(directory=BASE / "app" / "static"), name="static")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], allow_credentials=True,
    allow_methods=["*"], allow_headers=["*"]
)

class RecommendRequest(BaseModel):
    text: str
    demo_mode: bool = True

@app.get("/health")
def health():
    return {"status":"ok","mode":"DEMO / SIMULATION","pipeline":"ETOG → NCS → MSSS → CNT → PCR"}

@app.get("/api/demo")
def demo():
    return DATA["demo_response"]

@app.get("/api/standards")
def standards():
    return {"items": DATA["standards"], "count": len(DATA["standards"])}

@app.get("/api/standards/{is_number:path}")
def standard_detail(is_number: str):
    for s in DATA["standards"]:
        if s["is_number"].lower() == is_number.lower():
            return s
    return {"error":"Standard not found"}

@app.get("/api/relationships")
def relationships():
    return {"items": DATA["relationships"]}

@app.get("/api/review/queue")
def review_queue():
    return {
        "items":[
            {"id":"REV-104","severity":"HIGH","reason":"DATE_UNRESOLVED","query":"PVC cable specification","status":"OPEN"},
            {"id":"REV-109","severity":"MEDIUM","reason":"LOW_CLASSIFICATION_CONFIDENCE","query":"industrial polymer component","status":"OPEN"},
            {"id":"REV-112","severity":"HIGH","reason":"QCO_CONFLICT","query":"demo electrical product","status":"OPEN"}
        ]
    }

@app.get("/api/audit")
def audit():
    return {
        "events":[
            {"time":"12:02:18","actor":"Officer","event":"recommend","status":"CLOSED","latency":"2.8s"},
            {"time":"12:02:22","actor":"Officer","event":"feedback","status":"ACCEPTED","latency":"41ms"},
            {"time":"12:03:06","actor":"Reviewer","event":"manual_review","status":"OPEN","latency":"—"},
            {"time":"12:04:31","actor":"System","event":"offline_replay","status":"PASSED","latency":"1.7s"}
        ]
    }

@app.post("/api/upload")
async def upload(file: UploadFile = File(...)):
    # Demo ingestion: validates type/size and returns a simulated ingestion job.
    content = await file.read()
    ext = Path(file.filename or "").suffix.lower()
    allowed = {".pdf",".docx",".png",".jpg",".jpeg",".txt"}
    return {
        "filename": file.filename,
        "extension": ext,
        "size_bytes": len(content),
        "accepted": ext in allowed and len(content) <= 20_000_000,
        "job_id":"ING-DEMO-2026-001",
        "ocr_route":"PaddleOCR → Tesseract fallback" if ext in {".pdf",".png",".jpg",".jpeg"} else "text extraction",
        "message":"Demo ingestion accepted. No real BIS content is processed in this prototype."
    }

@app.post("/api/recommend")
def recommend(req: RecommendRequest):
    text = req.text.strip()
    result = json.loads(json.dumps(DATA["demo_response"]))
    result["query"] = text or result["query"]
    low = text.lower()
    # Small deterministic demo router to make the prototype feel interactive.
    if any(k in low for k in ["rubber","lining","vulcanized","tank"]):
        result["extracted"]["product"] = "vulcanized natural rubber sheet"
        result["extracted"]["application"] = "tank lining"
    elif any(k in low for k in ["steel","sheet","box"]):
        result["extracted"]["product"] = "steel fabricated component"
        result["extracted"]["category"] = "metal products"
        result["recommendations"] = result["recommendations"][0:1]
        result["recommendations"][0]["title"] = "Steel Product — Demo Retrieval Candidate"
        result["recommendations"][0]["match"] = 76
        result["recommendations"][0]["confidence"] = "MEDIUM"
    else:
        result["extracted"]["product"] = "technical procurement item"
        result["recommendations"] = result["recommendations"][0:2]
        for r in result["recommendations"]:
            r["match"] = max(61, r["match"]-12)
            r["confidence"] = "MEDIUM"
    result["audit"]["demo_input"] = True
    return result

@app.post("/api/feedback")
def feedback(payload: dict):
    return {"accepted": True, "audit_id":"AUD-DEMO-"+str(int(time.time())), "message":"Feedback captured in simulation mode."}

@app.post("/api/review/resolve")
def resolve_review(payload: dict):
    return {"resolved": True, "review_id": payload.get("review_id","REV-DEMO"), "decision": payload.get("decision","accept"), "audit_id":"AUD-REVIEW-DEMO"}

@app.get("/")
def index():
    return FileResponse(BASE / "app" / "static" / "index.html")
