# CHANAKYA — SIH 2026 Prototype

**AI-Assisted Procurement Standards Review & Recommendation System**

> **IMPORTANT DISCLAIMER — SIMULATION PROTOTYPE**  
> This application is a **demonstrable simulation and prototype** created for Smart India Hackathon (SIH) 2026 presentation.  
> All standard identifiers (`IS DEMO-*`), relationships, evidence items, and QCO records are **synthetic demonstration fixtures** loaded from `data/demo_data.json`.  
> It does **NOT** perform live Bureau of Indian Standards (BIS) retrieval, live OCR, FAISS vector index search, live LLM inference, or legal compliance verification.

---

## 1. Problem Statement

Government procurement officers frequently review complex technical tender specifications and product requirement descriptions. Identifying applicable Indian Standards (IS), verifying version currency, checking mandatory Quality Control Orders (QCOs), and spotting outdated references is a time-consuming, error-prone manual process. Citing superseded or incorrect standards in public tenders creates compliance risks, legal ambiguity, and procurement delays.

---

## 2. Proposed Solution

**CHANAKYA** is an intelligent, evidence-backed procurement standards review system. It ingests tender requirement texts or documents, extracts structured atomic requirements, retrieves and reranks relevant Indian Standards, validates proof closure and temporal validity, detects tender gaps (such as outdated standard references), and generates grounded draft clauses for human review.

---

## 3. Conceptual Pipeline Architecture

```
Procurement Requirement
        ↓
Requirement Completeness Check
        ↓
Technical Extraction
        ↓
Requirement Atoms
        ↓
Candidate Standards Retrieval (FAISS Top-50)
        ↓
Candidate Reranking (bge-reranker Top-10)
        ↓
Relationship / Graph Expansion (ETOG)
        ↓
Lifecycle & Temporal Validation
        ↓
Evidence / Proof Validation (Hard Invariant: No Proof → No Actionable Recommendation)
        ↓
Tender Gap Detection (Outdated / Missing / Present)
        ↓
Grounded Clause Recommendation (Drafting)
        ↓
Human-in-the-Loop Officer Review
        ↓
Audit Trail & Replay Log
```

---

## 4. Simulation vs. Production Architecture

| Component | Prototype Implementation (Simulation) | Production Architecture (Target) |
|---|---|---|
| **Standards Database** | Deterministic JSON (`data/demo_data.json`) | PostgreSQL + BIS API integration |
| **Semantic Retrieval** | Deterministic fixture routing | `bge-large-en-v1.5` + FAISS IndexFlatIP |
| **Reranker** | Pre-scored synthetic candidates | `bge-reranker-large` cross-encoder |
| **Ontology Graph** | Static NetworkX-style relationships | Dynamic MultiDiGraph ETOG |
| **Document Ingestion** | Simulated OCR upload route (`/api/upload`) | PaddleOCR + Tesseract fallback |
| **Clause Drafting** | Grounded template draft | Fine-tuned LLM (e.g. GPT-OSS 120B) |
| **Verification Invariant** | Hard-coded proof-closure rules | Automated proof validator engine |

---

## 5. Core Features

- **Single-Page Procurement Workspace**: Professional government enterprise UI with light/dark theme support.
- **Deterministic Recommendation Runner**: Evaluates requirement queries against synthetic standards (`IS DEMO-101:2024`, `IS DEMO-205:2023`, `IS DEMO-420:2025`).
- **Outdated Reference Detection**: Automatically flags superseded references in tenders (e.g., `IS DEMO-118:2018` → `IS DEMO-101:2024`).
- **Visual Pipeline Animation**: 11-stage progress tracker showcasing the conceptual workflow.
- **Proof-Carrying Recommendations**: Displays explicit requirement coverage, evidence nodes, and proof chain status.
- **Standards Catalog Inspection**: Searchable catalog of fixture records with detailed metadata drawer.
- **Standards Relationship Graph**: Visual representation of `test_method`, `safety`, `terminology`, and `superseded_by` edges.
- **Human Review Queue**: Manage open cases flagged for date ambiguity, low confidence, or QCO conflicts.
- **Session Audit Log**: Track events, actor actions, system latencies, and feedback history.

---

## 6. API Endpoints

- `GET /health` — System health check & simulation status
- `GET /api/demo` — Canonical recommendation payload
- `GET /api/standards` — Synthetic standards catalog list
- `GET /api/standards/{is_number}` — Standard detail inspection
- `GET /api/relationships` — Graph edges & relationship types
- `GET /api/review/queue` — Human-in-the-loop review cases
- `GET /api/audit` — Session audit trail events
- `POST /api/upload` — Simulated tender file upload & OCR route acceptance
- `POST /api/recommend` — Recommendation engine query endpoint
- `POST /api/feedback` — Officer feedback recorder (`accept`, `correct`, `review`)
- `POST /api/review/resolve` — Review queue case resolution (`accept`, `reject`, `resolve`)
- `GET /` — Frontend web application (`index.html`)

---

## 7. 3-Minute Presentation Demo Flow

1. Open `http://127.0.0.1:8000/` in browser.
2. Click **"Use Demo Data"** to load the canonical query:
   > *"Supply of 25 mm thick vulcanized natural rubber sheets for lining of a water tank. Tender currently cites IS DEMO-118:2018."*
3. Click **"Run Recommendation"**. Observe the 11-stage pipeline execute visually (1–2 seconds).
4. Review **Extracted Requirement**: product (`vulcanized natural rubber sheet`), thickness (`25 mm`), application (`water tank lining`).
5. Review **Recommendation Results**:
   - **IS DEMO-101:2024** identified as Primary Candidate (94% Match, Essential, Active).
   - **IS DEMO-205:2023** (Test method) & **IS DEMO-420:2025** (Safety guidance).
6. Inspect **Tender Gap Analysis**: Visually highlights **IS DEMO-118:2018** as `OUTDATED` and superseded by **IS DEMO-101:2024**.
7. Examine **Proof Chain**: `REQ-001 → SATISFIES → IS DEMO-101:2024 → SUPPORTED BY → EV-DEMO-01`.
8. Review **Grounded Clause Draft** and copy the generated text.
9. Navigate sidebar tabs: **Standards Catalog**, **Standards Graph**, **Review Queue**, and **Audit Log**.

---

## 8. Running Locally

### Prerequisites
- Python 3.10+

### Installation & Launch

1. Open terminal in `Chanakya_prototype` directory:
   ```bash
   pip install -r requirements.txt
   ```

2. Start the FastAPI development server:
   ```bash
   uvicorn app.main:app --reload --port 8000
   ```

3. Open your browser at:
   [http://127.0.0.1:8000/](http://127.0.0.1:8000/)

4. Run the integrity checklist script:
   ```bash
   python check_design.py
   ```

---

## 9. Project Structure

```
Chanakya_prototype/
│
├── app/
│   ├── __init__.py
│   ├── main.py              # FastAPI server & deterministic API endpoints
│   └── static/
│       └── index.html       # Single-page application frontend
│
├── data/
│   └── demo_data.json       # Synthetic fixture data & canonical responses
│
├── ARCHITECTURE_MAPPING.txt # Technical mapping document
├── check_design.py          # Automated prototype integrity checklist
├── requirements.txt         # Project dependencies
├── README.md                # Project documentation
└── .gitignore               # Git ignore configuration
```

---

## 10. Limitations & Disclaimers

- **Synthetic Records Only**: Standard numbers like `IS DEMO-101:2024` are mock data. They do not represent official BIS publications.
- **Deterministic Responses**: Recommendations are generated using pre-computed fixture data to ensure repeatable, zero-latency presentation demos.
- **Human Review Mandatory**: All recommendations and draft clauses require manual verification by an authorized procurement officer before incorporation into real tenders.
