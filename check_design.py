import pathlib

p = pathlib.Path(r"c:\Users\manas\Downloads\Chanakya_sih_prototype\maanakmitra_prototype\app\static\index.html")
content = p.read_text(encoding="utf-8")

patterns = [
    ("Manrope font",     "Manrope"),
    ("DM Sans font",     "DM Sans"),
    ("JetBrains Mono",   "JetBrains Mono"),
    ("CSS design tokens","--brand:"),
    ("Dark theme tokens","data-theme"),
    ("Brand color",      "#087A5A"),
    ("Theme toggle",     "theme-toggle"),
    ("Pipeline stages",  "pipelineStages"),
    ("ETOG",             "ETOG"),
    ("MSSS",             "MSSS"),
    ("proof-chain",      "proof-chain"),
    ("arch-flow",        "arch-flow"),
    ("tech-grid",        "tech-grid"),
    ("sideitem",         "sideitem"),
    ("audit-table",      "audit-table"),
    ("DEMO MODE",        "DEMO MODE"),
    ("FALLBACK_DATA",    "FALLBACK_DATA"),
    ("No MaanakMitra",   "MaanakMitra"),
    ("Chanakya present", "Chanakya"),
]

print("=== CHANAKYA DESIGN CHECKLIST ===")
for label, pat in patterns:
    found = pat in content
    if label == "No MaanakMitra":
        status = "OK" if not found else "FAIL (still present!)"
    else:
        status = "OK" if found else "MISSING"
    print(f"  [{status}] {label}")

print()
print(f"File size: {len(content)} bytes (~{round(len(content)/1024)} KB)")
print("First 300 chars:")
print(content[:300])
