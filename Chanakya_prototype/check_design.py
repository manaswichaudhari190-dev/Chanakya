"""
CHANAKYA — SIH 2026 Prototype Quality & Integrity Verification Script
"""

from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent

print("=== CHANAKYA PROTOTYPE INTEGRITY CHECK ===")
print(f"Target Root: {BASE_DIR}\n")

# 1. Required Files Check
required_files = [
    BASE_DIR / "app" / "main.py",
    BASE_DIR / "app" / "static" / "index.html",
    BASE_DIR / "data" / "demo_data.json",
    BASE_DIR / "ARCHITECTURE_MAPPING.txt",
    BASE_DIR / "requirements.txt",
]

all_files_exist = True
for f in required_files:
    if f.exists():
        print(f"  [OK] File exists: {f.relative_to(BASE_DIR)}")
    else:
        print(f"  [FAIL] Missing file: {f.relative_to(BASE_DIR)}")
        all_files_exist = False

print()

# 2. Frontend Check
index_path = BASE_DIR / "app" / "static" / "index.html"
if index_path.exists():
    html = index_path.read_text(encoding="utf-8")
    
    frontend_patterns = [
        ("Frontend Title", "CHANAKYA", "CHANAKYA" in html),
        ("Simulation Badge", "DEMO / SIMULATION", "DEMO / SIMULATION" in html),
        ("Pipeline Stages Visual", "Simulated Processing Pipeline", "Simulated Processing Pipeline" in html or "pipeline-steps" in html),
        ("Extracted Requirement Panel", "Extracted Requirement", "Extracted Requirement" in html),
        ("Recommendation Results", "Recommendation Results", "Recommendation Results" in html),
        ("Proof Chain Section", "Proof Chain", "Proof Chain" in html),
        ("Tender Gap Analysis", "Tender Gap Analysis", "Tender Gap Analysis" in html),
        ("Grounded Clause Draft", "Grounded Clause Draft", "Grounded Clause Draft" in html),
        ("Standards Catalog View", "Standards Catalog", "Standards Catalog" in html),
        ("Standards Graph View", "Standards Graph", "Standards Graph" in html),
        ("Review Queue View", "Review Queue", "Review Queue" in html),
        ("Audit Log View", "Audit Log", "Audit Log" in html),
        ("Synthetic Data Disclaimer", "IS DEMO-*", "IS DEMO-*" in html or "IS DEMO" in html),
        ("No Legacy Product Name", "No MaanakMitra", "MaanakMitra" not in html),
    ]

    print("--- Frontend HTML Checks ---")
    for name, query, passed in frontend_patterns:
        status = "OK" if passed else "FAIL"
        print(f"  [{status}] {name}")

print()

# 3. Backend API Routes Check
main_path = BASE_DIR / "app" / "main.py"
if main_path.exists():
    py_code = main_path.read_text(encoding="utf-8")
    
    routes = [
        "/health",
        "/api/demo",
        "/api/standards",
        "/api/standards/{is_number:path}",
        "/api/relationships",
        "/api/review/queue",
        "/api/audit",
        "/api/upload",
        "/api/recommend",
        "/api/feedback",
        "/api/review/resolve",
        "/"
    ]

    print("--- Backend API Route Checks ---")
    for route in routes:
        passed = route in py_code
        status = "OK" if passed else "FAIL"
        print(f"  [{status}] Endpoint route: {route}")

print()

# 4. Demo Data Check
demo_data_path = BASE_DIR / "data" / "demo_data.json"
if demo_data_path.exists():
    data_content = demo_data_path.read_text(encoding="utf-8")
    synthetic_records = [
        "IS DEMO-101:2024",
        "IS DEMO-205:2023",
        "IS DEMO-310:2021",
        "IS DEMO-118:2018",
        "IS DEMO-420:2025"
    ]
    print("--- Demo Data Fixture Checks ---")
    for rec in synthetic_records:
        passed = rec in data_content
        status = "OK" if passed else "FAIL"
        print(f"  [{status}] Synthetic fixture present: {rec}")

print("\n=== VERIFICATION COMPLETE ===")
