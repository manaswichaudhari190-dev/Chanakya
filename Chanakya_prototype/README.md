# Chanakya — SIH 2026 Prototype

A polished, demo-ready browser prototype based on the supplied v7.13 Chanakya architecture.

## What is included

- Landing page with SIH-ready product story
- Officer recommendation workspace
- Simulated end-to-end processing animation
- Demo tender/product input
- Demo file upload route
- Requirement extraction panel
- Recommendation cards with match/confidence/necessity
- Proof-carrying recommendation panel
- Standards relationship graph
- Tender Compliance Audit
- Grounded clause draft (explicitly human-review-required)
- Manual Review Queue
- System/architecture view
- FastAPI backend with deterministic demo APIs
- Synthetic demo standards, relationships, audit findings and proof chain
- Clear DEMO/SIMULATION labeling so synthetic records are not mistaken for live BIS verification

## Important

This is a **prototype / simulation**, not a live BIS compliance system.

The architecture document explicitly distinguishes SPECIFIED, IMPLEMENTED and VERIFIED behavior and states that a recommendation is actionable only when its proof chain closes. The demo data in this ZIP is synthetic and intentionally uses `IS DEMO-*` identifiers. Replace it with legally reusable, verified metadata before any real procurement/legal demonstration.

## Quick start — Windows

1. Install Python 3.10+ from https://www.python.org/
2. Extract this ZIP.
3. Open Command Prompt / PowerShell in the extracted folder.
4. Create a virtual environment:

   `python -m venv .venv`

5. Activate it:

   PowerShell:
   `.venv\Scripts\Activate.ps1`

   CMD:
   `.venv\Scripts\activate`

6. Install dependencies:

   `pip install -r requirements.txt`

7. Start the prototype:

   `uvicorn app.main:app --reload`

8. Open:

   `http://127.0.0.1:8000`

## Quick start — macOS / Linux

`python3 -m venv .venv`
`source .venv/bin/activate`
`pip install -r requirements.txt`
`uvicorn app.main:app --reload`

Then open `http://127.0.0.1:8000`.

## Demo flow for SIH (4–6 minutes)

1. Open the landing page.
2. Click **Launch Prototype**.
3. Keep the prefilled rubber-sheet tender example.
4. Click **Run simulated recommendation**.
5. Let the stage animation show:
   completeness → extraction → atoms/retrieval → graph/lifecycle → ETOG/NCS/MSSS/CNT → proof/gap/synthesis.
6. Show the primary candidate and its proof state `CLOSED`.
7. Click **Tender Audit** and point out `OUTDATED`, `PRESENT`, and `NOT_CITED`.
8. Click **Standards Graph** and explain the verified relationships.
9. Click **Review Queue** to show human-in-the-loop handling.
10. Return to Recommendation and use Accept/Correct/Flag for review.

## Project structure

```
Chanakya_prototype/
├── app/
│   ├── __init__.py
│   ├── main.py
│   └── static/
│       └── index.html
├── data/
│   └── demo_data.json
├── requirements.txt
└── README.md
```

## Architecture mapping

The supplied architecture specifies:
- FastAPI + Pydantic v2 backend
- PostgreSQL system of record
- FAISS English retrieval index
- NetworkX MultiDiGraph
- bge-large-en-v1.5 + bge-reranker-large for the frozen English MVP path
- OCR/language/translation Tier-2 interfaces
- ETOG → Temporal Gate → NCS → MSSS → CNT → Proof Validator
- deterministic certification/QCO evidence
- tender gap analysis
- grounded clause drafting
- human review and audit

This prototype visually demonstrates the workflow and contracts without pretending to implement all production ML, PostgreSQL, OCR, translation or live BIS integrations.

## Where to replace demo data

Edit:

`data/demo_data.json`

Replace the `IS DEMO-*` records only after source-governance/reuse checks and verification. Do not place copyrighted full standard text in this demo.

## API endpoints

- `GET /health`
- `GET /api/demo`
- `GET /api/standards`
- `GET /api/standards/{is_number}`
- `GET /api/relationships`
- `GET /api/review/queue`
- `GET /api/audit`
- `POST /api/upload`
- `POST /api/recommend`
- `POST /api/feedback`
- `POST /api/review/resolve`

## Troubleshooting

If `uvicorn` is not recognized:
`python -m uvicorn app.main:app --reload`

If port 8000 is busy:
`python -m uvicorn app.main:app --reload --port 8001`
Then open `http://127.0.0.1:8001`.

## Next upgrade path

For a real implementation, connect:
1. PostgreSQL schema and audit tables
2. curated standards metadata
3. FAISS embeddings
4. reranker
5. Requirement Atom extraction
6. ETOG persistence
7. deterministic lifecycle/certification/QCO rules
8. proof validator
9. real file/OCR ingestion
10. verified source links
11. authentication and role-based review
12. evaluation/gold-set harness

