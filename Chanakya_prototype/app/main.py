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

class SearchStandardsRequest(BaseModel):
    query: str = Field(..., description="Natural language procurement requirement")
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
        "disclaimer": "Synthetic demo records labeled IS DEMO-*",
    }


@app.get("/api/search_standards")
def search_standards(query: str = ""):
    """Return standards matching a free-text query."""

    query = query.strip().lower()

    standards = DATA.get("standards", [])

    if not query:
        return {
            "items": standards,
            "count": len(standards),
        }

    matched = []

    for s in standards:
        searchable = (
            f"{s.get('is_number', '')} "
            f"{s.get('title', '')} "
            f"{s.get('category', '')} "
            f"{s.get('sector', '')}"
        ).lower()

        if query in searchable:
            matched.append(s)

    return {
        "items": matched,
        "count": len(matched),
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

    # Deterministic query routing for rich interactive demo scenarios
    if any(kw in low for kw in ["pipe", "hdpe", "water supply", "4984"]):
        res["extracted"] = {
            "product": "high density polyethylene pipe",
            "material": "PE 100",
            "application": "potable water distribution",
            "parameters": [{"name": "nominal diameter", "value": "110", "unit": "mm"}, {"name": "pressure", "value": "PN 10", "unit": ""}],
            "category": "pipes & fittings",
            "sector": "civil infrastructure"
        }
        res["recommendations"] = [
            {
                "is_number": "IS 4984:2016",
                "title": "High Density Polyethylene Pipes for Water Supply — Specification",
                "match": 96,
                "confidence": "HIGH",
                "necessity": "ESSENTIAL",
                "status": "ACTIVE",
                "currency": "Current (Rev 4)",
                "certification": "Scheme-I (ISI Mark) • Mandatory",
                "coverage": ["PE 100 resin class", "PN 10 rating", "potable water conveyance"],
                "evidence": ["DPIIT Quality Control Order 2023", "Gazette S.O. 1284(E)"],
                "why": "Direct specification for HDPE potable water conveyance. Enforces mandatory ISI Mark under DPIIT QCO."
            },
            {
                "is_number": "IS DEMO-205:2023",
                "title": "Rubber & Polymer Pipe Test Methods",
                "match": 85,
                "confidence": "HIGH",
                "necessity": "CONDITIONAL",
                "status": "ACTIVE",
                "currency": "Current",
                "certification": "Normative Test Protocol",
                "coverage": ["hydrostatic strength test at 80°C"],
                "evidence": ["IS 4984 Normative Appendix B"],
                "why": "Governs mandatory hydrostatic pressure verification protocols at 80°C for 165 hours."
            }
        ]
        res["gaps"] = [
            {"status": "OUTDATED", "severity": "HIGH", "cited": "IS 118:2018", "required": "IS 4984:2016", "message": "Superseded specification cited. Replace with current IS 4984:2016."},
            {"status": "PRESENT", "severity": "INFO", "cited": "IS DEMO-205:2023", "required": "IS DEMO-205:2023", "message": "Test method verified under Clause 8.2."}
        ]
        res["clause_draft"] = "The supplied HDPE pipes shall strictly conform to IS 4984:2016 (PE 100, PN 10) with mandatory BIS Scheme-I (ISI Mark) certification as per Gazette Order S.O. 1284(E). Hydrostatic testing shall comply with IS DEMO-205:2023."

    elif any(kw in low for kw in ["bitumen", "paving", "asphalt", "highway", "vg-30", "73"]):
        res["extracted"] = {
            "product": "viscosity grade paving bitumen",
            "material": "Bitumen (VG-30)",
            "application": "highway flexible pavement construction",
            "parameters": [{"name": "softening point", "value": "47", "unit": "°C min"}, {"name": "viscosity", "value": "2400-3600", "unit": "Poises"}],
            "category": "petroleum materials",
            "sector": "highways & transport"
        }
        res["recommendations"] = [
            {
                "is_number": "IS 73:2013",
                "title": "Paving Bitumen — Specification (Fourth Revision)",
                "match": 98,
                "confidence": "HIGH",
                "necessity": "ESSENTIAL",
                "status": "ACTIVE",
                "currency": "Current (Amended 2022)",
                "certification": "Scheme-I (ISI Mark) • Mandatory",
                "coverage": ["VG-30 viscosity grade", "highway wearing course", "penetration requirements"],
                "evidence": ["Ministry of Petroleum & Natural Gas Order", "MoRTH Section 500"],
                "why": "Sole statutory standard governing viscosity grade paving bitumen for public roadway construction."
            }
        ]
        res["gaps"] = [
            {"status": "PRESENT", "severity": "INFO", "cited": "IS 73:2013", "required": "IS 73:2013", "message": "Cited standard is current and matches MoRTH specifications."}
        ]
        res["clause_draft"] = "Paving bitumen supplied shall conform to IS 73:2013 (Grade VG-30) with mandatory BIS Certification Mark. Test certificates for absolute viscosity at 60°C and kinematic viscosity at 135°C must accompany each tanker delivery."

    elif any(kw in low for kw in ["steel", "structural", "plate", "bridge", "2062", "e350"]):
        res["extracted"] = {
            "product": "high tensile structural steel plates",
            "material": "Steel Grade E350",
            "application": "bridge fabrication & heavy structures",
            "parameters": [{"name": "yield strength", "value": "350", "unit": "MPa min"}, {"name": "impact test", "value": "Charpy V-notch", "unit": "27J at 0°C"}],
            "category": "structural metallurgy",
            "sector": "heavy engineering"
        }
        res["recommendations"] = [
            {
                "is_number": "IS 2062:2011",
                "title": "Hot Rolled Medium and High Tensile Structural Steel",
                "match": 95,
                "confidence": "HIGH",
                "necessity": "ESSENTIAL",
                "status": "ACTIVE",
                "currency": "Current (Rev 7)",
                "certification": "Scheme-I (ISI Mark) • Mandatory QCO",
                "coverage": ["Grade E350 Quality B/C", "weldability guarantee", "Charpy V-notch impact"],
                "evidence": ["Ministry of Steel QCO S.O. 1823(E)", "IRC:24 Bridge Code"],
                "why": "Mandatory standard under Steel Quality Control Order for all structural and infrastructure fabrication."
            },
            {
                "is_number": "IS 800:2007",
                "title": "General Construction in Steel — Code of Practice",
                "match": 88,
                "confidence": "HIGH",
                "necessity": "CONDITIONAL",
                "status": "ACTIVE",
                "currency": "Current",
                "certification": "National Design Code",
                "coverage": ["limit state design", "bolted and welded joints"],
                "evidence": ["NBC Section 6"],
                "why": "Authoritative design code governing fabrication tolerances and permissible limit states."
            }
        ]
        res["gaps"] = [
            {"status": "NOT_CITED", "severity": "MEDIUM", "cited": "—", "required": "IS 800:2007", "message": "Design code IS 800:2007 must be referenced for structural fabrication tolerances."}
        ]
        res["clause_draft"] = "All structural steel plates shall comply with IS 2062:2011 Grade E350 Quality B, bearing the ISI Mark under Steel QCO S.O. 1823(E). Charpy V-notch impact test values must verify minimum 27 Joules at 0°C in accordance with IS 800:2007."

    elif any(kw in low for kw in ["cement", "portland", "concrete", "269", "opc"]):
        res["extracted"] = {
            "product": "ordinary portland cement",
            "material": "OPC 53 Grade",
            "application": "reinforced concrete infrastructure",
            "parameters": [{"name": "compressive strength", "value": "53", "unit": "MPa (28 days)"}],
            "category": "cementitious materials",
            "sector": "civil engineering"
        }
        res["recommendations"] = [
            {
                "is_number": "IS 269:2015",
                "title": "Ordinary Portland Cement — Specification",
                "match": 97,
                "confidence": "HIGH",
                "necessity": "ESSENTIAL",
                "status": "ACTIVE",
                "currency": "Current (Sixth Revision)",
                "certification": "Scheme-I (ISI Mark) • Mandatory",
                "coverage": ["53 Grade OPC", "soundness test", "initial and final setting time"],
                "evidence": ["Cement Quality Control Order S.O. 883(E)"],
                "why": "Mandatory standard for Portland cement under Department for Promotion of Industry and Internal Trade (DPIIT)."
            }
        ]
        res["gaps"] = [{"status": "PRESENT", "severity": "INFO", "cited": "IS 269:2015", "required": "IS 269:2015", "message": "OPC specification satisfies CPWD norms."}]
        res["clause_draft"] = "The cement shall be Ordinary Portland Cement (OPC) 53 Grade conforming strictly to IS 269:2015, bearing the official BIS ISI Mark. Manufacturer test certificates for 3, 7 and 28 days compressive strengths must be submitted per batch."

    elif any(kw in low for kw in ["cable", "wire", "pvc", "electrical", "694"]):
        res["extracted"] = {
            "product": "pvc insulated electric cable",
            "material": "Copper Conductor + PVC",
            "application": "building & industrial internal electrification",
            "parameters": [{"name": "voltage grade", "value": "1100", "unit": "V"}],
            "category": "electrical cables",
            "sector": "power & energy"
        }
        res["recommendations"] = [
            {
                "is_number": "IS 694:2010",
                "title": "Polyvinyl Chloride Insulated Cables for Working Voltages up to 1100 V",
                "match": 95,
                "confidence": "HIGH",
                "necessity": "ESSENTIAL",
                "status": "ACTIVE",
                "currency": "Current",
                "certification": "Scheme-I (ISI Mark) • Mandatory",
                "coverage": ["Class 2 stranded copper", "flame retardant low smoke (FRLS)"],
                "evidence": ["Electrical Wires & Cables QCO Order S.O. 2914(E)"],
                "why": "Mandatory safety standard for all low-voltage distribution wiring in public buildings."
            }
        ]
        res["gaps"] = [{"status": "PRESENT", "severity": "INFO", "cited": "IS 694:2010", "required": "IS 694:2010", "message": "Compliant low-voltage electrification cable."}]
        res["clause_draft"] = "All building internal wiring conductors shall be FRLS PVC insulated single core copper cables conforming to IS 694:2010, rated 1100 V, carrying valid BIS certification under Scheme-I."

    elif any(kw in low for kw in ["led", "street light", "luminaire", "10322", "16107"]):
        res["extracted"] = {
            "product": "outdoor led street light luminaire",
            "material": "Pressure die-cast aluminium housing + optical lens",
            "application": "municipal road & highway lighting",
            "parameters": [{"name": "system wattage", "value": "90", "unit": "W"}, {"name": "ingress protection", "value": "IP 66", "unit": ""}],
            "category": "luminaires & lighting",
            "sector": "electrical engineering"
        }
        res["recommendations"] = [
            {
                "is_number": "IS 10322 (Part 5/Sec 3):2012",
                "title": "Luminaires — Particular Requirements — Section 3: Luminaires for Road and Street Lighting",
                "match": 98,
                "confidence": "HIGH",
                "necessity": "ESSENTIAL",
                "status": "ACTIVE",
                "currency": "Current (Reaffirmed 2022)",
                "certification": "Scheme-II (CRS Registration) • Mandatory",
                "coverage": ["roadway & street luminaires", "dielectric safety", "thermal endurance", "IP65/IP66 enclosure"],
                "evidence": ["MeitY Compulsory Registration Order S.O. 2357(E)", "BIS CRS Gazette"],
                "why": "Sole statutory safety standard for public street lighting fixtures. Mandates Scheme-II CRS registration under MeitY QCO."
            },
            {
                "is_number": "IS 16107 (Part 2/Sec 1):2012",
                "title": "Luminaires Performance — Particular Requirements — Section 1: LED Luminaires",
                "match": 91,
                "confidence": "HIGH",
                "necessity": "CONDITIONAL",
                "status": "ACTIVE",
                "currency": "Current (Reaffirmed 2021)",
                "certification": "Normative Test Protocol",
                "coverage": ["photometric performance", "luminous efficacy lm/W", "driver power factor"],
                "evidence": ["Normative companion for LED performance verification"],
                "why": "Normative companion standard governing luminous efficacy and photometric verification protocols for 90W LED fixtures."
            }
        ]
        res["gaps"] = [
            {"status": "PRESENT", "severity": "INFO", "cited": "IS 10322 (Part 5/Sec 3):2012", "required": "IS 10322 (Part 5/Sec 3):2012", "message": "Street lighting luminaire complies with MeitY CRS requirements."}
        ]
        res["clause_draft"] = "All outdoor street lighting luminaires shall be 90W LED fixtures complying with IS 10322 (Part 5/Sec 3):2012 with valid BIS Compulsory Registration Scheme (CRS) marking under MeitY Gazette Order S.O. 2357(E). Luminous efficacy shall be verified as per IS 16107 (Part 2/Sec 1):2012."

    elif any(kw in low for kw in ["helmet", "head protection", "hard hat", "2925"]):
        res["extracted"] = {
            "product": "industrial safety helmet",
            "material": "Non-metallic high density polymer",
            "application": "head protection for construction workers",
            "parameters": [{"name": "shock absorption", "value": "< 5.0", "unit": "kN"}, {"name": "penetration test", "value": "pass", "unit": ""}],
            "category": "personal protective equipment",
            "sector": "industrial safety"
        }
        res["recommendations"] = [
            {
                "is_number": "IS 2925:1984",
                "title": "Specification for Industrial Safety Helmets",
                "match": 97,
                "confidence": "HIGH",
                "necessity": "ESSENTIAL",
                "status": "ACTIVE",
                "currency": "Current (Reaffirmed 2020)",
                "certification": "Scheme-I (ISI Mark) • Mandatory",
                "coverage": ["construction site head protection", "mechanical shock absorption", "penetration resistance", "flame retardance"],
                "evidence": ["DPIIT Safety Helmets QCO Order S.O. 1165(E)"],
                "why": "Mandatory standard under DPIIT Quality Control Order. Strictly enforces Scheme-I ISI Mark certification for industrial helmets."
            }
        ]
        res["gaps"] = [
            {"status": "PRESENT", "severity": "INFO", "cited": "IS 2925:1984", "required": "IS 2925:1984", "message": "Industrial safety helmet complies with mandatory DPIIT QCO norms."}
        ]
        res["clause_draft"] = "The supplied safety helmets shall strictly conform to IS 2925:1984 (Reaffirmed 2020) with mandatory BIS Scheme-I (ISI Mark) certification under DPIIT Order S.O. 1165(E). Manufacturer batch test certificates for shock absorption must be submitted."

    elif any(kw in low for kw in ["rubber", "lining", "vulcanized", "tank", "118"]):
        res["extracted"] = {
            "product": "vulcanized natural rubber sheet",
            "material": "NR",
            "application": "water tank lining",
            "parameters": [{"name": "thickness", "value": "25", "unit": "mm"}],
            "category": "rubber products",
            "sector": "polymers"
        }
    else:
        res["extracted"] = {
            "product": "general engineering item",
            "material": "unspecified",
            "application": "industrial utility",
            "parameters": [{"name": "specification", "value": "general", "unit": ""}],
            "category": "general engineering",
            "sector": "industrial"
        }
        res["recommendations"] = res["recommendations"][:2]
        for r in res["recommendations"]:
            r["match"] = max(64, r["match"] - 10)
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
