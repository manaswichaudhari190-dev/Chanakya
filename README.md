# CHANAKYA — AI Standards Intelligence Workspace
### SIH 2026 Simulation Prototype

> **Indian Standards Recommendation System for Government Procurement**  
> AI-assisted review and recommendation of applicable IS codes in public tenders.

---

## Overview

CHANAKYA is a FastAPI-based simulation prototype that demonstrates an AI pipeline for:

- Analyzing procurement tender text
- Recommending applicable Indian Standards (IS codes)
- Flagging outdated or missing standards
- Verifying Quality Control Orders (QCOs)
- Generating audit-ready tender clauses
- Human-in-the-loop review queue

> **Note:** This is a DEMO / SIMULATION prototype using synthetic fixture data (`IS DEMO-*`). It does not perform live BIS retrieval, real OCR, or real vector search.

---

## Project Structure

```
Chanakya_sih_prototype/          ← git repo root
├── vercel.json                  ← Vercel deployment config
├── check_design.py              ← integrity verification script
└── Chanakya_prototype/          ← application root (working directory)
    ├── app/
    │   ├── main.py              ← FastAPI entry point
    │   └── static/
    │       ├── index.html       ← landing page  →  served at /
    │       ├── app_dashboard.html  ← AI workspace  →  served at /dashboard
    │       └── hero_bg.jpg
    ├── data/
    │   └── demo_data.json       ← synthetic IS DEMO-* fixture data
    └── requirements.txt         ← 4 packages only
```

---

## Tech Stack

| Layer | Technology |
|---|---|
| Backend | Python 3.11 · FastAPI · Uvicorn |
| Frontend | Vanilla HTML/CSS/JS (served by FastAPI) |
| Deployment | Vercel (Python serverless) |
| Dependencies | `fastapi`, `uvicorn[standard]`, `python-multipart`, `pydantic` |

---

## API Routes

| Method | Route | Description |
|---|---|---|
| `GET` | `/` | Landing page |
| `GET` | `/dashboard` | AI Standards Workspace dashboard |
| `GET` | `/health` | Health check |
| `GET` | `/docs` | Swagger UI |
| `GET` | `/api/demo` | Canonical demo payload |
| `GET` | `/api/standards` | Standards catalog |
| `GET` | `/api/standards/{is_number}` | Standard detail |
| `GET` | `/api/relationships` | Standards relationship graph |
| `GET` | `/api/review/queue` | Human review queue |
| `GET` | `/api/audit` | Audit trail |
| `POST` | `/api/upload` | Tender file upload (simulated) |
| `POST` | `/api/recommend` | Recommendation engine |
| `POST` | `/api/feedback` | Officer feedback |
| `POST` | `/api/review/resolve` | Resolve review item |

---

## Local Development

```bash
# Install dependencies
cd Chanakya_prototype
pip install -r requirements.txt

# Start the server
uvicorn app.main:app --host 0.0.0.0 --port 8000

# Open in browser
# Landing page:  http://localhost:8000/
# Dashboard:     http://localhost:8000/dashboard
# Health check:  http://localhost:8000/health
# Swagger docs:  http://localhost:8000/docs
```

---

## Deployment — Vercel

This project deploys to **Vercel** as a Python serverless web service.

### Files

| File | Purpose |
|---|---|
| [`vercel.json`](./vercel.json) | Routes all requests to the FastAPI app via `@vercel/python` |

### vercel.json

```json
{
  "version": 2,
  "builds": [
    {
      "src": "Chanakya_prototype/app/main.py",
      "use": "@vercel/python"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "Chanakya_prototype/app/main.py"
    }
  ]
}
```

### Deploy via Vercel Dashboard

1. Go to **https://vercel.com/** and sign in with GitHub
2. Click **New Project** → import `manaswichaudhari190-dev/Chanakya`
3. Set **Framework Preset** → **Other**
4. Leave Root Directory, Build Command, and Output Directory **blank**
5. Add environment variable: `DEMO_MODE=true`
6. Click **Deploy**

### Deploy via Vercel CLI

```bash
# Install CLI (one-time)
npm install -g vercel

# Deploy from repo root
cd Chanakya_sih_prototype
vercel --prod --token <YOUR_VERCEL_TOKEN>
```

### Expected Live URLs

```
https://your-project.vercel.app/
https://your-project.vercel.app/dashboard
https://your-project.vercel.app/health
https://your-project.vercel.app/docs
```

### Required Environment Variables

| Variable | Value |
|---|---|
| `DEMO_MODE` | `true` |

---

## Integrity Check

```bash
# From repo root
python check_design.py
```

Expected output: all backend routes `[OK]`, all demo fixtures `[OK]`.

---

## Branding

- **CHANAKYA — Indian Standards Recommendation System** (landing page)
- **CHANAKYA — AI Standards Intelligence Workspace** (dashboard)
- SIH 2026 · Smart India Hackathon

---

## Disclaimer

This prototype uses **synthetic demo records** (`IS DEMO-101:2024`, `IS DEMO-205:2023`, `IS DEMO-310:2021`, `IS DEMO-118:2018`, `IS DEMO-420:2025`).  
It does **not** perform live BIS verification, real OCR, real embeddings, or legal compliance checks.  
Replace fixture data with verified BIS source records before any legal/compliance demonstration.
