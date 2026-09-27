/**
 * CHANAKYA — demo data
 * ---------------------------------------------------------------
 * All records below are DEMO DATA ONLY. They are realistic-looking
 * sample records built for the presentation layer and must not be
 * treated as authoritative standards metadata. The production system
 * (Streamlit + Python) is the source of truth.
 */

export type PipelineStep = {
  id: string;
  label: string;
  detail: string;
};

export const PIPELINE_STEPS: PipelineStep[] = [
  { id: "ingestion", label: "Ingestion", detail: "Tender document received" },
  { id: "ocr", label: "OCR", detail: "Scanned pages digitised" },
  { id: "lang", label: "Language Detection", detail: "English · 0.98 confidence" },
  { id: "req", label: "Requirement Extraction", detail: "12 requirements found" },
  { id: "retrieval", label: "Retrieval", detail: "27 candidates" },
  { id: "rerank", label: "Reranking", detail: "Top 8 retained" },
  { id: "graph", label: "Standards Graph", detail: "Relationships expanded" },
  { id: "compliance", label: "Compliance Validation", detail: "3 findings raised" },
  { id: "evidence", label: "Evidence", detail: "14 sources attached" },
];

export const SIDEBAR_ITEMS = [
  { id: "dashboard", label: "Dashboard" },
  { id: "tender-analysis", label: "Tender Analysis", active: true },
  { id: "recommendations", label: "Recommendations" },
  { id: "standards", label: "Standards" },
  { id: "compliance", label: "Compliance Audit" },
  { id: "review", label: "Review Queue", count: 4 },
  { id: "feedback", label: "Feedback" },
  { id: "settings", label: "Settings" },
] as const;

export type Recommendation = {
  code: string;
  year: string;
  title: string;
  confidence: number;
  matchedBecause: string;
  currentEdition: "Verified" | "Sample";
  amendmentStatus: "Current" | "Review required";
  certification: "Review required" | "Not applicable" | "ISI mark";
  evidence: string;
  tag?: string;
};

export const RECOMMENDATIONS: Recommendation[] = [
  {
    code: "IS 800",
    year: "2007",
    title: "General Construction in Steel — Code of Practice",
    confidence: 96,
    matchedBecause: "Structural steel design requirements detected.",
    currentEdition: "Verified",
    amendmentStatus: "Current",
    certification: "Review required",
    evidence: "BIS catalogue source",
    tag: "Primary",
  },
  {
    code: "IS 2062",
    year: "2011",
    title: "Hot Rolled Medium and High Tensile Structural Steel",
    confidence: 91,
    matchedBecause: "Material grade and tensile class references.",
    currentEdition: "Verified",
    amendmentStatus: "Current",
    certification: "ISI mark",
    evidence: "BIS catalogue source",
    tag: "Primary",
  },
  {
    code: "IS 808",
    year: "2021",
    title:
      "Dimensions for Hot Rolled Steel Beam, Column, Channel and Angle Sections",
    confidence: 84,
    matchedBecause: "Section dimension and tolerance references.",
    currentEdition: "Sample",
    amendmentStatus: "Current",
    certification: "Not applicable",
    evidence: "BIS catalogue source",
    tag: "Related",
  },
];

export const TENDER_REFERENCES = [
  { code: "IS 800:2007", note: "General construction in steel" },
  { code: "IS 2062:2011", note: "Hot rolled structural steel" },
];

export const SYSTEM_FINDINGS = [
  {
    status: "present" as const,
    label: "PRESENT",
    text: "IS 800:2007 cited — edition current",
  },
  {
    status: "outdated" as const,
    label: "OUTDATED",
    text: "IS 2062:2011 superseded by later edition",
  },
  {
    status: "missing" as const,
    label: "MANDATORY MISSING",
    text: "Dimensional tolerances not covered — IS 808 required",
  },
  {
    status: "advisory" as const,
    label: "ADVISORY MISSING",
    text: "Protective coatings reference recommended",
  },
];

export const COMPLIANCE_MATRIX = [
  {
    requirement: "Structural steel",
    tender: "IS 800",
    recommendation: "IS 800 + related references",
    status: "verified" as const,
  },
  {
    requirement: "Material grade",
    tender: "—",
    recommendation: "IS 2062",
    status: "missing" as const,
  },
  {
    requirement: "Dimension tolerances",
    tender: "—",
    recommendation: "IS 808",
    status: "missing" as const,
  },
  {
    requirement: "Welding procedures",
    tender: "IS 813",
    recommendation: "IS 813 + IS 816",
    status: "verified" as const,
  },
];

export const AI_METRICS = [
  { label: "Requirements extracted", value: 12, suffix: "" },
  { label: "Candidate standards", value: 27, suffix: "" },
  { label: "Relevant standards", value: 8, suffix: "" },
  { label: "Compliance findings", value: 3, suffix: "" },
  { label: "Evidence sources", value: 14, suffix: "" },
];

export const REVIEW_CARDS = [
  {
    id: "rv-1",
    reason: "Low confidence",
    detail: "IS 456 match below acceptance threshold for cement grade",
    code: "IS 456:2000",
    confidence: 58,
  },
  {
    id: "rv-2",
    reason: "Needs verification",
    detail: "QCO applicability depends on product classification",
    code: "QCO — Steel Products",
    confidence: 72,
  },
  {
    id: "rv-3",
    reason: "Outdated reference",
    detail: "Tender cites superseded edition of IS 2062",
    code: "IS 2062:2011",
    confidence: 88,
  },
  {
    id: "rv-4",
    reason: "Conflicting evidence",
    detail: "Two catalogue records disagree on amendment status",
    code: "IS 808",
    confidence: 64,
  },
];

export const CAPABILITIES = [
  {
    id: "semantic",
    title: "Semantic recommendations",
    description:
      "Find applicable Indian Standards from natural-language specifications.",
  },
  {
    id: "relationships",
    title: "Standards relationships",
    description:
      "Expand allied, normative, test, terminology, safety, installation and related-product references.",
  },
  {
    id: "version",
    title: "Version intelligence",
    description:
      "Track editions, amendments, supersession and currency.",
  },
  {
    id: "certification",
    title: "Certification + QCO",
    description:
      "Surface relevant certification and QCO information using deterministic compliance logic.",
  },
  {
    id: "gap",
    title: "Tender gap analysis",
    description:
      "Compare cited standards against the standards required by the tender requirements.",
  },
  {
    id: "clause",
    title: "Grounded clause drafting",
    description:
      "Create reviewable replacement clauses from verified evidence.",
  },
];

export const LANGUAGES = [
  { id: "en", label: "English", sample: "Find the Indian Standards applicable to this steel structure tender." },
  { id: "hi", label: "Hindi", sample: "इस टेंडर में स्टील स्ट्रक्चर के लिए आवश्यक भारतीय मानक खोजें।" },
  { id: "mr", label: "Marathi", sample: "या निविदेत स्टील स्ट्रक्चरसाठी आवश्यक भारतीय मानके शोधा." },
];

export const PERSONAS = [
  {
    id: "officer",
    role: "Procurement Officer",
    focus: "Primary persona",
    capabilities: [
      "Analyze tenders",
      "Find applicable standards",
      "Review evidence",
      "Resolve gaps",
    ],
  },
  {
    id: "engineer",
    role: "Engineer",
    focus: "Operations",
    capabilities: [
      "Monitor ingestion",
      "Inspect knowledge base",
      "Export audit data",
    ],
  },
  {
    id: "reviewer",
    role: "Reviewer",
    focus: "Assurance",
    capabilities: [
      "Resolve uncertain cases",
      "Inspect evidence",
      "Approve/correct recommendations",
    ],
  },
];

export const VERSION_TIMELINE = [
  {
    year: "2007",
    title: "IS 800 published",
    note: "Third revision — limit state design",
    badge: "Amended",
  },
  {
    year: "2015",
    title: "Amendment 1",
    note: "Partial safety factors revised",
    badge: "Current",
  },
  {
    year: "2020",
    title: "Reaffirmed",
    note: "Periodic review completed",
    badge: "Current",
  },
  {
    year: "2026",
    title: "Current status",
    note: "No further amendments detected",
    badge: "Verified",
  },
];

export const WORKFLOW_STAGES = [
  { label: "Tender / specification", detail: "Input document" },
  { label: "Ingestion + OCR", detail: "Digitisation" },
  { label: "Language detection", detail: "Multilingual" },
  { label: "Requirement extraction", detail: "Structured needs" },
  { label: "Semantic retrieval", detail: "Candidate standards" },
  { label: "Reranking", detail: "Precision pass" },
  { label: "Standards graph reasoning", detail: "Relationships" },
  { label: "Lifecycle / compliance validation", detail: "Version + QCO" },
  { label: "Tender gap resolution", detail: "Missing references" },
  { label: "Grounded synthesis", detail: "Evidence-backed output" },
  { label: "Human review / audit", detail: "Officer in control" },
];

export const DEMO_TENDERS = [
  {
    id: "PSU/STL/2026/014",
    title: "Structural steel components — public infrastructure",
    date: "26 Sep 2026",
    standards: 8,
    findings: 3,
    status: "review" as const,
  },
  {
    id: "PSU/ELE/2026/009",
    title: "LT switchgear panels — substation upgrade",
    date: "24 Sep 2026",
    standards: 11,
    findings: 2,
    status: "complete" as const,
  },
  {
    id: "PSU/CMT/2026/021",
    title: "OPC 43 grade cement — warehouse construction",
    date: "21 Sep 2026",
    standards: 5,
    findings: 1,
    status: "complete" as const,
  },
  {
    id: "PSU/PVC/2026/003",
    title: "PVC insulated cables — township electrification",
    date: "18 Sep 2026",
    standards: 9,
    findings: 4,
    status: "processing" as const,
  },
];

/* ------------------------------------------------------------------ */
/* Standards library browser                                           */
/* ------------------------------------------------------------------ */

export type StandardStatus = "current" | "amended" | "superseded" | "review";

export const STANDARDS_LIBRARY = [
  {
    code: "IS 800",
    year: "2007",
    title: "General Construction in Steel — Code of Practice",
    sector: "Structural",
    status: "amended" as StandardStatus,
    references: 14,
    qco: false,
  },
  {
    code: "IS 2062",
    year: "2011",
    title: "Hot Rolled Medium and High Tensile Structural Steel",
    sector: "Materials",
    status: "superseded" as StandardStatus,
    references: 9,
    qco: true,
  },
  {
    code: "IS 808",
    year: "2021",
    title: "Dimensions for Hot Rolled Steel Beam, Column, Channel and Angle Sections",
    sector: "Dimensions",
    status: "current" as StandardStatus,
    references: 6,
    qco: false,
  },
  {
    code: "IS 813",
    year: "1986",
    title: "Scheme of Symbols for Welding",
    sector: "Welding",
    status: "current" as StandardStatus,
    references: 4,
    qco: false,
  },
  {
    code: "IS 816",
    year: "1969",
    title: "Code of Practice for Use of Metal Arc Welding for General Construction",
    sector: "Welding",
    status: "review" as StandardStatus,
    references: 5,
    qco: false,
  },
  {
    code: "IS 456",
    year: "2000",
    title: "Plain and Reinforced Concrete — Code of Practice",
    sector: "Structural",
    status: "amended" as StandardStatus,
    references: 21,
    qco: false,
  },
  {
    code: "IS 269",
    year: "2015",
    title: "Ordinary Portland Cement — Specification",
    sector: "Materials",
    status: "current" as StandardStatus,
    references: 8,
    qco: true,
  },
  {
    code: "IS 694",
    year: "2010",
    title: "PVC Insulated Cables — Specification",
    sector: "Electrical",
    status: "current" as StandardStatus,
    references: 11,
    qco: true,
  },
  {
    code: "IS 1239",
    year: "2004",
    title: "Steel Tubes — Specification",
    sector: "Materials",
    status: "amended" as StandardStatus,
    references: 7,
    qco: false,
  },
  {
    code: "IS 1477",
    year: "2000",
    title: "Painting of Ferrous Metals in Buildings",
    sector: "Protective",
    status: "review" as StandardStatus,
    references: 3,
    qco: false,
  },
];

export const LIBRARY_STATUS: Record<
  StandardStatus,
  { label: string; tone: "green" | "amber" | "red" | "blue" }
> = {
  current: { label: "Current", tone: "green" },
  amended: { label: "Amended", tone: "amber" },
  superseded: { label: "Superseded", tone: "red" },
  review: { label: "Review", tone: "blue" },
};

/* ------------------------------------------------------------------ */
/* Feedback                                                            */
/* ------------------------------------------------------------------ */

export const FEEDBACK_ITEMS = [
  {
    id: "fb-1",
    author: "R. Sharma",
    role: "Procurement Officer",
    date: "26 Sep 2026",
    text: "Recommendation set for the steel tender was accepted as-is — the relationship graph saved a full day of catalogue cross-checking.",
    tag: "Accepted",
  },
  {
    id: "fb-2",
    author: "K. Iyer",
    role: "Reviewer",
    date: "22 Sep 2026",
    text: "Flagged a QCO applicability mismatch on cable insulation. Corrected mapping now recorded against IS 694.",
    tag: "Corrected",
  },
  {
    id: "fb-3",
    author: "A. Deshmukh",
    role: "Engineer",
    date: "19 Sep 2026",
    text: "OCR handled a low-scan Marathi annexure cleanly. Requirement extraction found 10 of 11 clauses — the eleventh was a formatting table.",
    tag: "Observation",
  },
];

/* ------------------------------------------------------------------ */
/* Settings                                                            */
/* ------------------------------------------------------------------ */

export const SETTINGS_SECTIONS = [
  {
    id: "notifications",
    title: "Notifications",
    items: [
      { id: "nt-1", label: "Review queue additions", detail: "When a case is routed to human review", on: true },
      { id: "nt-2", label: "Supersession alerts", detail: "A cited standard is superseded by a newer edition", on: true },
      { id: "nt-3", label: "Weekly digest", detail: "Summary of analysed tenders and findings", on: false },
    ],
  },
  {
    id: "workspace",
    title: "Workspace",
    items: [
      { id: "ws-1", label: "Default language", detail: "Used for new tender analyses", on: true },
      { id: "ws-2", label: "Auto-accept above threshold", detail: "Recommendations over 90% confidence skip the review queue", on: false },
      { id: "ws-3", label: "Evidence panel expanded", detail: "Show evidence blocks by default on recommendation cards", on: true },
    ],
  },
  {
    id: "integrations",
    title: "Integrations",
    items: [
      { id: "in-1", label: "BIS catalogue sync", detail: "Nightly metadata refresh from the standards catalogue", on: true },
      { id: "in-2", label: "QCO registry watch", detail: "Track Gazette notifications affecting watched sectors", on: true },
      { id: "in-3", label: "Audit export", detail: "Export recorded decisions for external audit", on: false },
    ],
  },
];

/* ------------------------------------------------------------------ */
/* Tender search demo                                                  */
/* ------------------------------------------------------------------ */

export type TenderDate = { label: string; date: string; done: boolean };

export type TenderSummary = {
  id: string;
  title: string;
  authority: string;
  value: string;
  deadline: string;
  pages: number;
  category: string;
  scope: string;
  /* industrial-grade dossier fields */
  location: string;
  method: string;
  contractType: string;
  emd: string;
  completion: string;
  evaluation: string;
  payment: string;
  timeline: TenderDate[];
  officer: string;
  officerPhone: string;
  officerEmail: string;
  highlights: string[];
  qualification: string[];
  riskNotes: string[];
};

export type TenderDocument = {
  name: string;
  type: string;
  pages: number;
  matches: number;
};

export type StandardClause = { ref: string; text: string };

/** Catalogue-level detail shown when a matched standard is opened. */
export type StandardDetail = {
  publisher: string;
  ics: string;
  docPages: number;
  scope: string;
  clauses: StandardClause[];
  supersedes?: string;
  supersededBy?: string;
  amendment?: string;
  qco: boolean;
  qcoNote?: string;
  isoAligned?: string;
};

export type SearchedStandard = {
  code: string;
  year: string;
  title: string;
  confidence: number;
  matchType: "exact" | "semantic";
  status: "current" | "amended" | "superseded";
  note: string;
  detail: StandardDetail;
};

export type ExactMatch = {
  citation: string;
  resolvedTo: string;
  status: "current" | "amended" | "superseded";
  note: string;
};

export type SearchScenario = {
  id: string;
  label: string;
  keywords: string[];
  tender: TenderSummary;
  documents: TenderDocument[];
  standards: SearchedStandard[];
  exactMatches: ExactMatch[];
};

/**
 * Catalogue detail records, keyed by standard code. Presentation-level
 * metadata for the demo drawer — not authoritative BIS data.
 */
const STANDARD_DETAILS: Record<string, StandardDetail> = {
  "IS 2925": {
    publisher: "Bureau of Indian Standards",
    ics: "13.340.20",
    docPages: 14,
    scope:
      "Specifies construction, performance and marking requirements for industrial safety helmets — shell, harness and chin-strap assembly — intended to protect the wearer against falling objects and lateral impact. Covers shock absorption, penetration resistance, flame retardance and electrical insulation, together with the corresponding test methods.",
    clauses: [
      { ref: "Cl. 5.1", text: "Shell to be non-metallic, smooth and free from ridges or projections; material shall withstand heat, cold and industrial corrosion." },
      { ref: "Cl. 6.2", text: "Shock absorption — force transmitted to the neck form shall not exceed 5 kN when struck by a 5 kg striker falling through 1 m." },
      { ref: "Cl. 7", text: "Penetration resistance — a 3 kg conical striker dropped from 1 m shall make no contact with the headform." },
      { ref: "Cl. 10", text: "Marking — manufacturer, size, quarter and year of manufacture, mass and the ISI mark with BIS licence number." },
    ],
    qco: false,
    qcoNote: "Not notified under a QCO; the tender's ISI-mark clause applies the voluntary BIS licence scheme.",
  },
  "IS 5983": {
    publisher: "Bureau of Indian Standards",
    ics: "13.340.20",
    docPages: 9,
    scope:
      "Requirements for industrial eye-protectors — goggles, face shields and spectacles — against impact, dust, liquid splash and glare. Prescribes lens material quality, minimum thickness, field of vision and transmittance.",
    clauses: [
      { ref: "Cl. 4.2", text: "Impact-resistant lenses shall withstand a 22 mm steel ball dropped from 1.3 m without fracture." },
      { ref: "Cl. 5", text: "Optical quality — prismatic imbalance and refractive power limits for clear, distortion-free vision." },
      { ref: "Cl. 8", text: "Ventilation and fit — eye-protectors for grinding shall exclude dust ingress while avoiding fogging." },
    ],
    qco: false,
  },
  "IS 15298": {
    publisher: "Bureau of Indian Standards",
    ics: "13.340.50",
    docPages: 22,
    scope:
      "Occupational protective footwear — safety, protective and occupational shoes and boots. Specifies toecap impact resistance, compression resistance, closure strength and outsole slip/abrasion behaviour.",
    clauses: [
      { ref: "Cl. 4.1", text: "Safety footwear toecap shall withstand 100 J impact and 10 kN compression with no fracture of the inner surface." },
      { ref: "Cl. 5.2", text: "Closure strength — straps and lacing anchors to resist repeated 400 N pulls without separation." },
      { ref: "Cl. 7.1", text: "Outsole — cleated pattern, fuel and slip resistance; maximum 15 % volume change after oil exposure." },
    ],
    qco: true,
    qcoNote: "Safety footwear is a notified product under the PPE Quality Control Order — a BIS licence is mandatory to manufacture or import.",
    isoAligned: "Harmonized with the ISO 20345/20344 test programme.",
  },
  "IS 73": {
    publisher: "Bureau of Indian Standards",
    ics: "75.140",
    docPages: 12,
    scope:
      "Specifies requirements for paving-grade bitumen VG-10 to VG-40 produced from refinery crude, including penetration, softening point, ductility, viscosity at 135 °C and purity requirements, with corresponding methods of test and sampling.",
    clauses: [
      { ref: "Cl. 4", text: "Viscosity-graded classes VG-10, VG-20, VG-30 and VG-40 with absolute viscosity ranges at 60 °C." },
      { ref: "Cl. 5.2", text: "VG-30 — minimum 45 dm at 25 °C ductility, softening point ≥ 47 °C, viscosity ≥ 240 Pa·s at 60 °C." },
      { ref: "Cl. 8", text: "Marking — drums and tankers to show grade, batch, producer and dispatch date." },
    ],
    supersedes: "IS 73:2006",
    qco: false,
  },
  "IS 2386": {
    publisher: "Bureau of Indian Standards",
    ics: "91.100.15",
    docPages: 8,
    scope:
      "Methods of test for aggregates for concrete and road works — Part IV covers the determination of aggregate impact value, a toughness measure used to judge suitability of road stone.",
    clauses: [
      { ref: "Cl. 3", text: "Aggregate impact value — fraction passing 2.36 mm sieve after 15 blows of a 14 kg hammer, expressed as a percentage." },
      { ref: "Cl. 4", text: "Sample preparation — aggregate between 10 and 12.5 mm, oven-dried at 100–110 °C to constant mass." },
      { ref: "Table 1", text: "Surface-course aggregates generally limited to 30 % impact value unless a relaxation is recorded." },
    ],
    qco: false,
  },
  "IS 2720": {
    publisher: "Bureau of Indian Standards",
    ics: "93.020",
    docPages: 10,
    scope:
      "Methods of test for soils — Part 8 determines the relationship between water content and dry density, providing the maximum dry density (MDD) and optimum moisture content (OMC) used for field compaction control.",
    clauses: [
      { ref: "Cl. 4", text: "Heavy compaction — 4.9 kg rammer, 450 mm drop, five layers, 25 blows per layer in a 1,000 ml mould." },
      { ref: "Cl. 5", text: "Dry density computed from the compacted mass; a minimum of five water contents brackets the optimum." },
      { ref: "Cl. 6", text: "Field acceptance — embankment layers compacted to ≥ 97 % of heavy-compaction MDD." },
    ],
    qco: false,
  },
  "IS 15462": {
    publisher: "Bureau of Indian Standards",
    ics: "75.140",
    docPages: 16,
    scope:
      "Specification for polymer and rubber modified bitumen — PMB-P (plastomeric) and PMB-E (elastomeric) grades — for use in wearing courses, overlays and stress-absorbing membrane interlayers.",
    clauses: [
      { ref: "Cl. 4.1", text: "Polymer content not less than 4.0 % by mass of total binder, factory-blended and hot-stored with agitation." },
      { ref: "Cl. 5.3", text: "Softening point ≥ 60 °C for PMB-E; separation test after hot storage within 2 °C TR&B change." },
      { ref: "Cl. 8", text: "Elastic recovery at 15 °C ≥ 70 % for elastomeric grades." },
    ],
    supersedes: "IS 15462:1999",
    qco: false,
  },
  "IRC:37": {
    publisher: "Indian Roads Congress",
    ics: "93.080.01",
    docPages: 384,
    scope:
      "Guidelines for the design of flexible pavements using a mechanistic-empirical approach: traffic characterisation in MSA, subgrade CBR evaluation, sub-layer material properties, fatigue and rutting criteria, and design catalogues for the permitted pavement compositions.",
    clauses: [
      { ref: "Cl. 4.4", text: "Design subgrade CBR from soaked tests on the top 500 mm of embankment; effective CBR governs the catalogue entry." },
      { ref: "Cl. 5.2", text: "Fatigue criterion — 20 % area cracked; rutting criterion — 20 mm in the design traffic period." },
      { ref: "Annex II", text: "Design catalogue — cementitious base, bituminous base and granular base compositions for 2 to 200 MSA." },
    ],
    qco: false,
  },
  "IS 458": {
    publisher: "Bureau of Indian Standards",
    ics: "23.040.50",
    docPages: 33,
    scope:
      "Specification for precast concrete pipes — plain, reinforced and prestressed — in non-pressure classes NP-2, NP-3 and NP-4, with collars and sockets. Covers materials, reinforcement cages, manufacture, tolerances, and hydrostatic and three-edge-bearing acceptance tests.",
    clauses: [
      { ref: "Cl. 4.2", text: "Concrete — minimum grade M-25 for NP-3 and above, with 28-day cubes verified each casting day." },
      { ref: "Cl. 8.3", text: "Three-edge-bearing test — 0.8 mm crack load and ultimate load requirements per class." },
      { ref: "Cl. 9.1", text: "Hydrostatic proof — NP-2 pipes tested at 0.07 MPa for 10 min without leakage or sweating." },
    ],
    supersedes: "IS 458:1971",
    qco: false,
  },
  "IS 8329": {
    publisher: "Bureau of Indian Standards",
    ics: "23.040.10",
    docPages: 40,
    scope:
      "Centrifugally cast (spun) ductile iron pipes for water, gas and sewerage — class K7 to K12 — with socket-and-spigot joints. Includes zinc coating, cement-mortar lining, dimensional tolerances and type testing.",
    clauses: [
      { ref: "Cl. 4.1", text: "Wall thickness from the class formula e = K(0.5 + 0.001DN) with a minimum for handling." },
      { ref: "Cl. 6.2", text: "External zinc coating ≥ 130 g/m² with a bituminous finishing layer." },
      { ref: "Cl. 7.1", text: "Internal cement-mortar lining to IS 12183 — thickness by diameter, cured before hydrostatic test." },
    ],
    qco: false,
  },
  "IS 10500": {
    publisher: "Bureau of Indian Standards",
    ics: "13.060.20",
    docPages: 12,
    scope:
      "Drinking water specification — acceptable and permissible limits for physical, chemical and bacteriological parameters, with sampling methods and references to analytical procedures.",
    clauses: [
      { ref: "Cl. 2.1", text: "Turbidity — 1 NTU acceptable, 5 NTU permissible only in the absence of an alternate source." },
      { ref: "Cl. 3.1", text: "pH 6.5 to 8.5 with no relaxation; taste and odour unobjectionable." },
      { ref: "Cl. 4.1", text: "E. coli nil per 100 ml; coliform organisms absent in 95 % of samples over a year." },
    ],
    amendment: "Amendment No. 1 (2015) — ten pesticide parameters revised.",
    qco: false,
  },
  "IS 4985": {
    publisher: "Bureau of Indian Standards",
    ics: "23.040.20",
    docPages: 18,
    scope:
      "Unplasticized PVC pipes for potable water supplies in classes SC-25 to SC-100 — outside diameters 40 to 315 mm. Covers material, dimensions, workmanship, hydraulic and impact tests, and suitability for drinking water.",
    clauses: [
      { ref: "Cl. 4.2", text: "Compound — lead and tin content restricted for potable suitability, verified per batch." },
      { ref: "Cl. 5.4", text: "Hydraulic proof — pipes to hold 2 × working pressure for 10 min without weeping." },
      { ref: "Cl. 6.3", text: "Opacity of the pipe wall to prevent algal growth in sunlit runs." },
    ],
    qco: true,
    qcoNote: "Pipes for water supply are certified through the BIS product-certification scheme; ISI marking is widely demanded.",
  },
  "IS 3589": {
    publisher: "Bureau of Indian Standards",
    ics: "23.040.10",
    docPages: 24,
    scope:
      "Steel pipes for water and sewerage — 80 to 3 000 mm — welded or seamless, plain ended or with flanged ends, with protective coatings. For sizes below 80 mm IS 1239 applies.",
    clauses: [
      { ref: "Cl. 4.1", text: "Steel — YSt 210 / YSt 240 to IS 1239 or equivalent HR coil grade." },
      { ref: "Cl. 6.2", text: "Hydraulic test — 1.5 × design pressure held for a duration proportional to wall thickness." },
      { ref: "Cl. 9", text: "External protection — spun bitumen or epoxy at site for buried runs; bare pipes only for exposed interiors." },
    ],
    supersedes: "IS 3589:1991",
    qco: false,
  },
  "IS 456": {
    publisher: "Bureau of Indian Standards",
    ics: "91.100.30",
    docPages: 100,
    scope:
      "Code of practice for plain and reinforced concrete — materials, workmanship, durability, mix design, structural design by limit state and working stress, detailing and quality control. The base document for almost every RCC specification in India.",
    clauses: [
      { ref: "Cl. 6", text: "Quality assurance — cube sampling rates, 28-day characteristic strength acceptance and retesting rules." },
      { ref: "Cl. 8.1", text: "Durability — exposure classification (mild to extreme) fixes minimum cement, maximum w/c and cover." },
      { ref: "Cl. 16.1", text: "Mix design — target mean strength = characteristic + 1.65 σ; standard deviation from site control data." },
      { ref: "Cl. 26.2", text: "Nominal cover — 20 mm mild exposure for reinforcement; 40 mm for footings in contact with soil." },
    ],
    supersedes: "IS 456:1978",
    amendment: "Amendments No. 1–4 issued since 2000 (latest 2016).",
    qco: false,
  },
  "IS 1893": {
    publisher: "Bureau of Indian Standards",
    ics: "91.120.25",
    docPages: 44,
    scope:
      "Criteria for earthquake resistant design of structures — Part 1 covers general provisions and buildings: seismic zoning, importance and response reduction factors, design horizontal base shear, storey distribution and drift limits, plus the design response spectrum.",
    clauses: [
      { ref: "Cl. 6.2", text: "Zone factor Z — 0.16 for Zone III (moderate seismicity)." },
      { ref: "Cl. 6.4.2", text: "Response reduction factor R — 3.0 for ordinary RC moment frames, 5.0 with ductile detailing to IS 13920." },
      { ref: "Cl. 7.7.1", text: "Design base shear VB = Ah × W, distributed over height by the inverse-weight rule." },
      { ref: "Cl. 7.11.1", text: "Storey drift — limited to 0.004 × storey height under factored load with partial load factor 1.0." },
    ],
    supersedes: "IS 1893 (Part 1):2002",
    qco: false,
  },
  "IS 875": {
    publisher: "Bureau of Indian Standards",
    ics: "91.060.10",
    docPages: 12,
    scope:
      "Design loads (other than earthquake) for buildings and structures — Part 2 imposes (live) loads by occupancy: residential, office, assembly, storage and industrial, with reduction factors for area and number of storeys.",
    clauses: [
      { ref: "Table 2", text: "Imposed loads — offices 2.5 kN/m² for general rooms, 3.0 kN/m² corridors and stairs." },
      { ref: "Cl. 3.2", text: "Reduction in imposed load permitted for members supporting large floor areas and many storeys." },
      { ref: "Cl. 4", text: "Roofs — 1.5 kN/m² for access provided; separate allowance for services and solar plant." },
    ],
    qco: false,
  },
  "IS 800": {
    publisher: "Bureau of Indian Standards",
    ics: "91.080.10",
    docPages: 78,
    scope:
      "General construction in steel — code of practice for the limit state design of steel structures: material properties, partial safety factors, tension, compression, flexural and connection design, plus serviceability checks and fabrication/erection tolerances.",
    clauses: [
      { ref: "Cl. 6.3.2", text: "Tension capacity — lesser of yielding (Ag fy/γm0) and rupture (0.9 fu Anc/γm1) at the net section." },
      { ref: "Cl. 7.1.1", text: "Bending strength — βb Z fy/γm0 for laterally restrained sections; LTB checks otherwise." },
      { ref: "Cl. 8.2.1", text: "Shear capacity Vd = Av fy /(√3 γm0); stiffeners where the web alone is inadequate." },
      { ref: "Cl. 9.2.2", text: "Bolt shear — nominal 0.9 fub An/ (√3 γmb) with packing and long-grip reductions." },
    ],
    supersedes: "IS 800:1984",
    amendment: "Amendment No. 1 (2016) — cold-formed member additions.",
    qco: false,
  },
  "IS 2062": {
    publisher: "Bureau of Indian Standards",
    ics: "77.140.50",
    docPages: 40,
    scope:
      "Hot rolled medium and high tensile structural steel — E250 to E550 grades in plates, sections and bars. Specifies chemistry (including carbon-equivalent classes), mechanical properties, impact (Charpy V-notch) sub-grades and bend/UT requirements.",
    clauses: [
      { ref: "Cl. 4.1", text: "E250BR / E350BR — minimum yield 250 / 350 MPa with the listed tensile and elongation bands." },
      { ref: "Cl. 5.1", text: "Impact sub-grades — B, C and D fix the CVN test temperature (20, 0 and −20 °C)." },
      { ref: "Cl. 7", text: "Carbon equivalent for weldability — BO/BR classes to be re-verified when plates are thermally cut." },
    ],
    supersedes: "IS 2062:2006",
    supersededBy: "IS 2062:2024 — E250 series now consolidated with revised CVN classes.",
    qco: true,
    qcoNote: "Structural steel falls under the Steel & Steel Products (Quality Control) Order — BIS licence mandatory for covered sections.",
  },
  "IS 808": {
    publisher: "Bureau of Indian Standards",
    ics: "77.140.70",
    docPages: 96,
    scope:
      "Dimensions for hot rolled beam, column, channel and angle sections — mass, cross-sectional area, axis properties, radii of gyration and rolling tolerances for the full range of Indian Standard sections.",
    clauses: [
      { ref: "Cl. 4", text: "Section designation and mass — ISMB, ISMC, ISA and built-up equivalents with nominal masses." },
      { ref: "Cl. 5.2", text: "Rolling tolerances — depth ±2.5 mm, flange width ±2 mm, length +50/−0 mm." },
      { ref: "Annex A", text: "Axis properties — Ixx, Iyy, rxx, ryy tabulated for design use with IS 800." },
    ],
    supersedes: "IS 808:1989",
    qco: false,
  },
  "IS 813": {
    publisher: "Bureau of Indian Standards",
    ics: "25.160.01",
    docPages: 24,
    scope:
      "Scheme of symbols for welding — the Indian adoption of the international welding-symbol system: elementary and supplementary symbols, their position on the reference line and dimensioning of weld size and length.",
    clauses: [
      { ref: "Cl. 4.1", text: "Elementary symbols — fillet, square butt, single-V and backing symbols placed on the reference line." },
      { ref: "Cl. 7", text: "Supplementary symbols — weld-all-around and field-weld flags on the kink." },
      { ref: "Cl. 9", text: "Dimensioning — leg size and throat prefixed by Z and S; intermittent weld pitch shown after the length." },
    ],
    qco: false,
  },
  "IS 269": {
    publisher: "Bureau of Indian Standards",
    ics: "91.100.10",
    docPages: 16,
    scope:
      "Ordinary Portland Cement, 43 grade — chemical and physical requirements including silicate limits, setting times, soundness, compressive strength at 3/7/28 days, and marking requirements for bagged and bulk cement.",
    clauses: [
      { ref: "Cl. 4.1", text: "Strength — 43 MPa at 28 days with 23 / 33 MPa floors at 3 / 7 days (RV method)." },
      { ref: "Cl. 5.1", text: "Setting — initial not less than 30 min, final not more than 600 min." },
      { ref: "Cl. 6", text: "Soundness — Le Chatelier expansion ≤ 10 mm; autoclave ≤ 0.8 % when required." },
      { ref: "Cl. 9", text: "Marking — BIS licence number, week and year of packing on every bag." },
    ],
    supersedes: "IS 269:1989",
    qco: true,
    qcoNote: "Cement is notified under the Cement (Quality Control) Order — ISI marking with a valid BIS licence is mandatory.",
  },
  "IS 4031": {
    publisher: "Bureau of Indian Standards",
    ics: "91.100.10",
    docPages: 96,
    scope:
      "Methods of physical tests for hydraulic cement — fifteen parts covering fineness, soundness, setting time, compressive strength, density, heat of hydration and drying shrinkage, with apparatus and procedure for each.",
    clauses: [
      { ref: "Part 2", text: "Fineness by sieving — residue on 90 μm sieve limited for the grade under test." },
      { ref: "Part 6", text: "Compressive strength — 70.6 mm cubes, RV or CV packing, tested at the specified ages." },
      { ref: "Part 11", text: "Density — Le Chatelier flask, kerosene displacement at a controlled temperature." },
    ],
    qco: false,
  },
  "IS 1489": {
    publisher: "Bureau of Indian Standards",
    ics: "91.100.10",
    docPages: 18,
    scope:
      "Portland Pozzolana Cement — Part 1 covers fly-ash based PPC: pozzolana proportion, strength classes, soundness and drying shrinkage, and the additional tests required for the blended binder.",
    clauses: [
      { ref: "Cl. 4.1", text: "Fly ash content 15 to 35 % by mass, interground at the works." },
      { ref: "Cl. 5.2", text: "Strength — 33 grade floors at 3/7/28 days; sample frequency per IS 3535." },
      { ref: "Cl. 6.3", text: "Drying shrinkage ≤ 0.15 %; soundness by Le Chatelier for the blended mix." },
    ],
    supersedes: "IS 1489 (Part 1):1976",
    amendment: "Amendments issued — read with the latest to date.",
    qco: true,
    qcoNote: "PPC is notified under the Cement (Quality Control) Order — BIS licence mandatory.",
  },
  "IS 8112": {
    publisher: "Bureau of Indian Standards",
    ics: "91.100.10",
    docPages: 16,
    scope:
      "Ordinary Portland Cement, 53 grade — the higher-strength OPC class with tighter setting-time and strength requirements, used where early strength and high-grade concrete are specified.",
    clauses: [
      { ref: "Cl. 4.1", text: "Strength — 53 MPa at 28 days with 27 / 37 MPa floors at 3 / 7 days." },
      { ref: "Cl. 5.1", text: "Setting — initial ≥ 30 min, final ≤ 600 min." },
      { ref: "Cl. 7", text: "Marking — grade, licence number and packing date on each bag." },
    ],
    supersedes: "IS 8112:1976",
    qco: true,
    qcoNote: "Covered by the Cement (Quality Control) Order — BIS licence mandatory.",
  },
  "IS 694": {
    publisher: "Bureau of Indian Standards",
    ics: "29.060.20",
    docPages: 16,
    scope:
      "PVC insulated cables for working voltages up to and including 1 100 V — single and multicore, annealed copper conductor, PVC insulated and sheathed. Covers conductor classes, insulation thickness, FR/HR variants and routine tests.",
    clauses: [
      { ref: "Cl. 4.1", text: "Conductor — annealed copper, class 1 solid up to 4 mm², class 2 stranded above." },
      { ref: "Cl. 5.2", text: "Insulation thickness table by conductor size, measured at the thinnest point after extrusion." },
      { ref: "Cl. 9.2", text: "Routine tests — spark test on insulation, high-voltage 3 kV water immersion and conductor resistance." },
      { ref: "Cl. 6", text: "Flame-retardant PVC compound to IS 5831 type A / FHR for cable trays and risers." },
    ],
    supersedes: "IS 694:1990",
    qco: false,
  },
  "IS 732": {
    publisher: "Bureau of Indian Standards",
    ics: "91.140.50",
    docPages: 56,
    scope:
      "Code of practice for electrical wiring installations (voltage not exceeding 650 V) — circuit arrangement, conductor selection, earthing and protection, wiring systems by occupancy, inspection and testing before energisation.",
    clauses: [
      { ref: "Cl. 4.2", text: "Circuit loading and diversity — final sub-circuits sized with diversity from the schedule." },
      { ref: "Cl. 7.1", text: "Earthing — every installation earthed per IS 3043 with earth continuity conductor sized to fault current." },
      { ref: "Cl. 10", text: "Segments and enclosures — IP ratings fixed by location; conduits sealed against moisture." },
      { ref: "Cl. 12", text: "Testing — polarity, earth continuity and insulation resistance ≥ 1 MΩ before energisation." },
    ],
    amendment: "Amendments issued 1991 onwards — read with the latest.",
    qco: false,
  },
  "IS 8623": {
    publisher: "Bureau of Indian Standards",
    ics: "29.130.20",
    docPages: 44,
    scope:
      "Low-voltage switchgear and controlgear assemblies — type-tested and partially type-tested panels: short-circuit withstand, temperature-rise verification, forms of internal separation, and the routine tests to be performed on every completed assembly.",
    clauses: [
      { ref: "Cl. 7.2", text: "Short-circuit withstand — panels rated for the prospective fault current at the incomer, type-tested." },
      { ref: "Cl. 8.101", text: "Forms of separation — Form 2b / 3b / 4 by functional-unit separation from busbars and terminals." },
      { ref: "Cl. 11", text: "Routine tests — insulation resistance, dielectric 2.5 kV, wiring checks and mechanical operation on every panel." },
    ],
    isoAligned: "Aligned with IEC 61439-1 and 61439-2.",
    qco: false,
  },
  "IS 3043": {
    publisher: "Bureau of Indian Standards",
    ics: "91.140.50",
    docPages: 48,
    scope:
      "Code of practice for earthing — earth-electrode materials and dimensions, grid and strip electrode design, resistance measurement, step and touch potential control, and maintenance of earthing systems for installations and substations.",
    clauses: [
      { ref: "Cl. 5.2", text: "Electrode — GI pipe ≥ 40 mm × 2.5 m or plate electrodes with alternate layers of charcoal and salt." },
      { ref: "Cl. 9.1", text: "Substation grids — designed so step and touch potentials remain within the tolerance limits." },
      { ref: "Cl. 10", text: "Measurement — three-terminal fall-of-potential with the test spike spacing of the electrode zone." },
    ],
    supersedes: "IS 3043:1987",
    qco: false,
  },
  "IS 12640": {
    publisher: "Bureau of Indian Standards",
    ics: "29.120.50",
    docPages: 28,
    scope:
      "Residual current operated circuit breakers (RCCBs) — sensitivity classes, operating characteristics, surge-current withstand and the test device required on every unit. Part 1 covers RCCBs without integral overcurrent protection.",
    clauses: [
      { ref: "Cl. 4.1", text: "Rated residual current IΔn — 30 mA for personal protection on final circuits." },
      { ref: "Cl. 5.3", text: "Operating time — non-delayed units trip within 300 ms at IΔn." },
      { ref: "Cl. 8.3", text: "Dielectric strength and the in-built test button verified on every RCCB." },
    ],
    isoAligned: "Aligned with IEC 61008-1.",
    qco: false,
  },
  "IS 2190": {
    publisher: "Bureau of Indian Standards",
    ics: "13.220.10",
    docPages: 22,
    scope:
      "Selection, installation and maintenance of portable first-aid fire extinguishers — hazard assessment, extinguisher class per fuel, numbers and locations by occupancy, plus the refill and maintenance schedule.",
    clauses: [
      { ref: "Cl. 4.1", text: "Travel distance — no point on a floor more than 10 m from a suitable extinguisher in light hazard areas." },
      { ref: "Cl. 5.2", text: "Provision — minimum of one 9 L water / 5 kg CO₂ unit per 800 m², two per floor as a floor." },
      { ref: "Cl. 8.1", text: "Refill — after every use, partial loss or the interval fixed by the manufacturer; record kept." },
      { ref: "Cl. 9", text: "Maintenance — quarterly inspection and annual service by a competent agency." },
    ],
    supersedes: "IS 2190:1992",
    qco: false,
  },
  "SP 7": {
    publisher: "Bureau of Indian Standards",
    ics: "13.220.01",
    docPages: 92,
    scope:
      "National Building Code of India 2016, Part 4 — Fire and Life Safety: occupancy-wise provisions for fire prevention, means of egress, compartmentation, fire load and suppression systems, hydrant and sprinkler pressures, and the acceptance tests required for a fire NOC.",
    clauses: [
      { ref: "Cl. 3.2", text: "Occupancy classification and occupant load — business at 10 m² gross per occupant." },
      { ref: "Cl. 4.3", text: "Travel distance — 30 m for business sprinklered occupancies; two remote exits per compartment." },
      { ref: "Cl. 7.1", text: "Wet riser and hydrant — minimum static pressure 3.2 kg/cm² with fire pumps to NBC Annex norms." },
      { ref: "Cl. 10", text: "Compartmentation — floor area subdivided by fire-resistant barriers; refuge areas at 24 m intervals in high-rises." },
    ],
    qco: false,
  },
  "IS 15683": {
    publisher: "Bureau of Indian Standards",
    ics: "13.220.10",
    docPages: 48,
    scope:
      "Portable fire extinguishers — performance and construction: fire ratings A/B/C/F, minimum fill and propellant requirements, dielectric and pressure tests, and the colour/marking scheme for stored-pressure and cartridge types.",
    clauses: [
      { ref: "Cl. 5.2", text: "Fire ratings — minimum 21A for office use extinguishers; ratings from the 34B/55B liquid tests." },
      { ref: "Cl. 6.1", text: "Minimum fill — stored-pressure units not less than 60 % of nominal charge at 20 °C." },
      { ref: "Cl. 7.4", text: "Dielectric test — 35 kV held for 1 min across CO₂ and dry-powder horn assemblies." },
      { ref: "Cl. 9", text: "Marking — instructions, rating badge and year of manufacture visible after mounting." },
    ],
    isoAligned: "Broadly aligned with the EN 3 series.",
    qco: false,
  },
  "IS 15105": {
    publisher: "Bureau of Indian Standards",
    ics: "13.220.20",
    docPages: 40,
    scope:
      "Design and installation of fixed automatic sprinkler systems — hazard classification (light, ordinary and extra), design density and area of operation, hydraulic calculation, spacing and obstruction rules for sprinklers, and the water supply and pump duty for each hazard.",
    clauses: [
      { ref: "Cl. 4.1", text: "Hazard classification of each compartment fixes density × area — 7.5 mm/min × 210 m² for ordinary hazard Group 2." },
      { ref: "Cl. 6.2", text: "Sprinkler spacing — maximum 4.6 m between heads, 2.3 m to walls, with obstruction clearances." },
      { ref: "Cl. 8", text: "Hydraulic design — Hazen-Williams with C = 120, balanced at the most remote heads." },
      { ref: "Cl. 10", text: "Water supply — 60 min duration for ordinary hazard; jockey and main pumps per the fire-pump schedule." },
    ],
    qco: false,
  },
};

/**
 * Demo search index — each scenario maps a keyword to a simulated
 * tender-analysis result. Presentation only; not authoritative metadata.
 */
export const SEARCH_SCENARIOS: SearchScenario[] = [
  {
    id: "helmet",
    label: "Helmet",
    keywords: ["helmet", "helmets", "hard hat", "ppe", "protective gear"],
    tender: {
      id: "PSU/PPE/2026/031",
      title: "Industrial safety helmets & protective gear — factory workforce",
      authority: "Directorate of Industrial Safety",
      value: "₹ 1.86 Cr",
      deadline: "14 Oct 2026",
      pages: 48,
      category: "Personal protective equipment",
      scope:
        "Supply of certified industrial safety helmets with chin straps and accessories for 3,200 factory workers across four sites, including third-party inspection and ISI-mark compliance verification.",
      location: "Pune, Maharashtra — four factory sites",
      method: "Two-envelope e-procurement",
      contractType: "Supply with inspection",
      emd: "₹ 3.7 L",
      completion: "12 weeks (phased delivery)",
      evaluation: "L1 price, technically qualified bidders",
      payment: "100 % on receipt & inspection",
      timeline: [
        { label: "Published", date: "05 Sep 2026", done: true },
        { label: "Pre-bid meeting", date: "17 Sep 2026", done: true },
        { label: "Bid submission & opening", date: "14 Oct 2026", done: false },
      ],
      officer: "K. Venkatesan, DGM (Procurement)",
      officerPhone: "+91 20 2645 1180",
      officerEmail: "tenders.disp@mah.gov.in",
      highlights: [
        "3,200 helmets across four sites, phased by shift strength",
        "Ratchet suspension and chin straps included in base scope",
        "Third-party inspection before every dispatch",
        "ISI-mark verification on every delivered lot",
      ],
      qualification: [
        "Valid BIS licence for IS 2925 (category I)",
        "₹ 92 L average annual turnover (last 3 years)",
        "Two similar PPE supply orders in the last 5 years",
        "MSME / ESE registration preferred",
      ],
      riskNotes: [
        "Bids with an expiring BIS licence risk rejection before dispatch",
        "Clause 3.4.2 requires the ISI mark — verify licence scope covers helmets",
      ],
    },
    documents: [
      { name: "Vol 1 — Technical Specification", type: "Specification", pages: 24, matches: 6 },
      { name: "Annexure B — PPE Matrix", type: "Annexure", pages: 8, matches: 11 },
      { name: "Bill of Quantities", type: "BoQ", pages: 12, matches: 3 },
      { name: "Eligibility & Past Performance", type: "Qualification", pages: 4, matches: 0 },
    ],
    standards: [
      {
        code: "IS 2925",
        year: "1984",
        title: "Industrial Safety Helmets — Specification",
        confidence: 96,
        matchType: "exact",
        status: "current",
        note: "Clause 2.1 cites this code with edition for helmet shells.",
        detail: STANDARD_DETAILS["IS 2925"],
      },
      {
        code: "IS 5983",
        year: "1981",
        title: "Industrial Safety Eye-Protectors",
        confidence: 78,
        matchType: "semantic",
        status: "current",
        note: "Annexure B lists eye protection for grinding operations.",
        detail: STANDARD_DETAILS["IS 5983"],
      },
      {
        code: "IS 15298 (Part 1)",
        year: "2016",
        title: "Personal Protective Equipment — Occupational Footwear",
        confidence: 71,
        matchType: "semantic",
        status: "current",
        note: "Safety footwear listed alongside helmets in the PPE matrix.",
        detail: STANDARD_DETAILS["IS 15298"],
      },
    ],
    exactMatches: [
      {
        citation: "IS 2925:1984",
        resolvedTo: "IS 2925",
        status: "current",
        note: "Cited with edition — active helmet specification.",
      },
      {
        citation: "ISI mark (clause 3.4.2)",
        resolvedTo: "IS 2925 — BIS marking scheme",
        status: "current",
        note: "Marking reference implies conformity to IS 2925.",
      },
    ],
  },
  {
    id: "road",
    label: "Road construction",
    keywords: ["road", "roads", "highway", "bitumen", "pavement"],
    tender: {
      id: "PWD/SH/2026/104",
      title: "Widening of SH-47 to 2-lane with paved shoulders — km 12.4 to 38.9",
      authority: "Public Works Department",
      value: "₹ 86.2 Cr",
      deadline: "02 Nov 2026",
      pages: 342,
      category: "Highway works",
      scope:
        "Widening of 26.5 km state highway including earthwork, granular sub-base, wet mix macadam, bituminous concrete surfacing, drainage and road furniture, executed per MoRTH specifications with a five-year maintenance period.",
      location: "SH-47, km 12.4–38.9 (Nashik division)",
      method: "Open e-procurement (item-rate)",
      contractType: "Works — EPC",
      emd: "₹ 1.72 Cr",
      completion: "24 months + 60-month DLP",
      evaluation: "L1 item-rate",
      payment: "Monthly RA bills · 5 % retention",
      timeline: [
        { label: "Published", date: "28 Aug 2026", done: true },
        { label: "Pre-bid meeting", date: "11 Sep 2026", done: true },
        { label: "Bid submission & opening", date: "02 Nov 2026", done: false },
      ],
      officer: "S. R. Deshmukh, Executive Engineer (PWD NH Division-III)",
      officerPhone: "+91 253 231 0042",
      officerEmail: "ee-nh3.pwd@mah.gov.in",
      highlights: [
        "26.5 km widening to 2-lane with paved shoulders",
        "1.42 lakh m³ earthwork and 62,000 m³ wet mix macadam",
        "VG-30 bituminous concrete surfacing with PMB option",
        "Five-year post-construction maintenance included",
      ],
      qualification: [
        "Class A PWD contractor registration",
        "₹ 215 Cr average annual turnover (last 3 years)",
        "One similar road work of 20 km or more",
        "Own WMM plant and paver with calibration certificates",
      ],
      riskNotes: [
        "Citation IS 73:2013 to be re-validated against the catalogue at bid time",
        "Monsoon window compresses the WMM and surfacing programme",
      ],
    },
    documents: [
      { name: "Vol 1 — Technical Specification", type: "Specification", pages: 186, matches: 22 },
      { name: "Vol 2 — Bill of Quantities", type: "BoQ", pages: 94, matches: 6 },
      { name: "Drawings & Cross-Sections", type: "Drawings", pages: 31, matches: 2 },
      { name: "MoRTH Compliance Statement", type: "Annexure", pages: 12, matches: 9 },
    ],
    standards: [
      {
        code: "IS 73",
        year: "2013",
        title: "Paving Bitumen — Specification",
        confidence: 94,
        matchType: "exact",
        status: "current",
        note: "Clause 5.2 specifies VG-30 bitumen as per IS 73.",
        detail: STANDARD_DETAILS["IS 73"],
      },
      {
        code: "IS 2386 (Part IV)",
        year: "1963",
        title: "Methods of Test for Aggregates — Impact Value",
        confidence: 88,
        matchType: "semantic",
        status: "current",
        note: "Aggregate testing schedule in the QA plan.",
        detail: STANDARD_DETAILS["IS 2386"],
      },
      {
        code: "IS 2720 (Part 8)",
        year: "1983",
        title: "Soil — Determination of Water Content and Dry Density",
        confidence: 84,
        matchType: "semantic",
        status: "current",
        note: "Subgrade compaction acceptance criteria.",
        detail: STANDARD_DETAILS["IS 2720"],
      },
      {
        code: "IS 15462",
        year: "2004",
        title: "Polymer and Rubber Modified Bitumen — Specification",
        confidence: 76,
        matchType: "semantic",
        status: "current",
        note: "PMB option permitted in the surfacing clause.",
        detail: STANDARD_DETAILS["IS 15462"],
      },
      {
        code: "IRC:37",
        year: "2018",
        title: "Guidelines for the Design of Flexible Pavements",
        confidence: 81,
        matchType: "semantic",
        status: "current",
        note: "Design method referenced for pavement thickness.",
        detail: STANDARD_DETAILS["IRC:37"],
      },
    ],
    exactMatches: [
      {
        citation: "IS 73:2013",
        resolvedTo: "IS 73",
        status: "current",
        note: "Correct code and edition cited.",
      },
      {
        citation: "IRC:37-2018",
        resolvedTo: "IRC:37",
        status: "current",
        note: "Flexible pavement design basis.",
      },
      {
        citation: "MoRTH Spec (5th Rev)",
        resolvedTo: "Section 500 series — MoRTH",
        status: "current",
        note: "Ministry specification governs road works.",
      },
    ],
  },
  {
    id: "water",
    label: "Water pipelines",
    keywords: ["water", "pipeline", "pipelines", "pipe", "sewer", "distribution main"],
    tender: {
      id: "WRD/WS/2026/028",
      title: "Bulk water supply main DN800 — 14.2 km distribution pipeline",
      authority: "State Water Resources Department",
      value: "₹ 63.8 Cr",
      deadline: "21 Oct 2026",
      pages: 286,
      category: "Water supply infrastructure",
      scope:
        "Laying of 14.2 km DN800 bulk water main including trenching, pipe supply, thrust blocks, valve chambers, hydrostatic testing and disinfection, with flow metering at two terminal points.",
      location: "Krishna river belt, Satara district",
      method: "Open e-procurement (item-rate)",
      contractType: "Works — pipeline laying",
      emd: "₹ 1.28 Cr",
      completion: "18 months incl. testing",
      evaluation: "L1 item-rate with PQ",
      payment: "Milestones — 60 % laying / 30 % testing / 10 % commissioning",
      timeline: [
        { label: "Published", date: "02 Sep 2026", done: true },
        { label: "Pre-bid meeting", date: "15 Sep 2026", done: true },
        { label: "Bid submission & opening", date: "21 Oct 2026", done: false },
      ],
      officer: "A. K. Bhosale, Superintending Engineer (WRD Circle-II)",
      officerPhone: "+91 2162 240 118",
      officerEmail: "se-circle2.wrd@mah.gov.in",
      highlights: [
        "14.2 km DN800 bulk main with thrust blocks",
        "46 valve chambers and two flow-metered terminals",
        "Hydrostatic testing at 1.5 × working pressure",
        "Disinfection to IS 10500 before handover",
      ],
      qualification: [
        "Class-I pipeline contractor (WRD empanelled)",
        "₹ 160 Cr average annual turnover (last 3 years)",
        "DN600+ pipeline of 10 km or more completed",
        "Own thrust-boring unit for the railway crossing",
      ],
      riskNotes: [
        "Tender cites IS 458:1971 — superseded; amend to the 2003 edition",
        "Railway crossing NOC is on the critical path",
      ],
    },
    documents: [
      { name: "Technical Specification Vol 1", type: "Specification", pages: 142, matches: 18 },
      { name: "GIS Alignment Drawings", type: "Drawings", pages: 28, matches: 1 },
      { name: "Hydraulic Design Report", type: "Report", pages: 16, matches: 4 },
      { name: "Bill of Quantities", type: "BoQ", pages: 58, matches: 7 },
    ],
    standards: [
      {
        code: "IS 458",
        year: "2003",
        title: "Precast Concrete Pipes (with and without reinforcement)",
        confidence: 92,
        matchType: "exact",
        status: "current",
        note: "Pipe material clause cites IS 458 — the tender's 1971 edition is superseded.",
        detail: STANDARD_DETAILS["IS 458"],
      },
      {
        code: "IS 8329",
        year: "2000",
        title: "Centrifugally Cast (Spun) Ductile Iron Pipes",
        confidence: 89,
        matchType: "semantic",
        status: "current",
        note: "Alternative ductile-iron pipe option in the materials clause.",
        detail: STANDARD_DETAILS["IS 8329"],
      },
      {
        code: "IS 10500",
        year: "2012",
        title: "Drinking Water — Specification",
        confidence: 90,
        matchType: "semantic",
        status: "current",
        note: "Disinfection and water quality at delivery point.",
        detail: STANDARD_DETAILS["IS 10500"],
      },
      {
        code: "IS 4985",
        year: "2000",
        title: "uPVC Pipes for Potable Water Supplies",
        confidence: 82,
        matchType: "semantic",
        status: "current",
        note: "Service-connection clause references PVC piping.",
        detail: STANDARD_DETAILS["IS 4985"],
      },
      {
        code: "IS 3589",
        year: "2001",
        title: "Steel Pipes for Water and Sewerage",
        confidence: 74,
        matchType: "semantic",
        status: "current",
        note: "Crossing sections beneath the railway corridor.",
        detail: STANDARD_DETAILS["IS 3589"],
      },
    ],
    exactMatches: [
      {
        citation: "IS 458:1971",
        resolvedTo: "IS 458:2003",
        status: "superseded",
        note: "Tender edition superseded — 2003 revision active.",
      },
      {
        citation: "IS 10500:2012",
        resolvedTo: "IS 10500",
        status: "current",
        note: "Cited for potable quality at delivery point.",
      },
    ],
  },
  {
    id: "construction",
    label: "Building construction",
    keywords: ["construction", "building", "concrete", "campus", "block", "rcc"],
    tender: {
      id: "PSU/BLD/2026/017",
      title: "Administrative block G+4 — green campus phase II",
      authority: "Central Public Works Department",
      value: "₹ 47.4 Cr",
      deadline: "09 Nov 2026",
      pages: 318,
      category: "Building works",
      scope:
        "Construction of a G+4 administrative block of 9,600 sqm built-up area with RCC frame, structural glazing, MEP services, rainwater harvesting and sustainability features targeting an IGBC platinum rating.",
      location: "Campus phase II, Bhopal",
      method: "Two-envelope e-procurement",
      contractType: "Works — item-rate",
      emd: "₹ 94.8 L",
      completion: "30 months",
      evaluation: "QCBS 75 : 25",
      payment: "Monthly RA bills · 5 % retention",
      timeline: [
        { label: "Published", date: "19 Aug 2026", done: true },
        { label: "Pre-bid meeting", date: "04 Sep 2026", done: true },
        { label: "Bid submission & opening", date: "09 Nov 2026", done: false },
      ],
      officer: "R. Menon, Chief Engineer (Projects)",
      officerPhone: "+91 755 267 1120",
      officerEmail: "ce-projects@cpwd.gov.in",
      highlights: [
        "G+4 block, 9,600 m² built-up administrative space",
        "RCC frame designed for Seismic Zone III",
        "IGBC platinum target — RWH and 42 kW rooftop solar",
        "Structural glazing and MEP in the main package",
      ],
      qualification: [
        "Class-I builder with electrical and civil capability",
        "₹ 120 Cr average annual turnover (last 3 years)",
        "One G+3 RCC building of 8,000 m² or more",
        "Structural design by an IIT-empanelled consultant",
      ],
      riskNotes: [
        "IS 456:2000 cited — read with all four amendments to date",
        "Glazing scope needs special-class CPWD approval",
      ],
    },
    documents: [
      { name: "Structural Specification Vol 2", type: "Specification", pages: 88, matches: 14 },
      { name: "Architectural Drawings Set", type: "Drawings", pages: 64, matches: 2 },
      { name: "Electrical & HVAC Annexure", type: "Annexure", pages: 36, matches: 8 },
      { name: "Bill of Quantities", type: "BoQ", pages: 121, matches: 5 },
    ],
    standards: [
      {
        code: "IS 456",
        year: "2000",
        title: "Plain and Reinforced Concrete — Code of Practice",
        confidence: 97,
        matchType: "exact",
        status: "amended",
        note: "Design basis of the RCC structural specification.",
        detail: STANDARD_DETAILS["IS 456"],
      },
      {
        code: "IS 1893 (Part 1)",
        year: "2016",
        title: "Criteria for Earthquake Resistant Design of Structures",
        confidence: 91,
        matchType: "semantic",
        status: "current",
        note: "Seismic Zone III design loads mandated.",
        detail: STANDARD_DETAILS["IS 1893"],
      },
      {
        code: "IS 875 (Part 2)",
        year: "1987",
        title: "Design Loads — Imposed Loads",
        confidence: 85,
        matchType: "semantic",
        status: "current",
        note: "Live-load schedule for office occupancy.",
        detail: STANDARD_DETAILS["IS 875"],
      },
      {
        code: "IS 800",
        year: "2007",
        title: "General Construction in Steel — Code of Practice",
        confidence: 79,
        matchType: "semantic",
        status: "current",
        note: "Structural steel canopies and staircase stringers.",
        detail: STANDARD_DETAILS["IS 800"],
      },
    ],
    exactMatches: [
      {
        citation: "IS 456:2000",
        resolvedTo: "IS 456",
        status: "amended",
        note: "Cited — read with amendments issued since 2000.",
      },
      {
        citation: "IS 875 (Part 3):1987",
        resolvedTo: "IS 875 (Part 3)",
        status: "current",
        note: "Wind loads for the site's 42 m/s zone.",
      },
      {
        citation: "IS 1893 (Part 1):2016",
        resolvedTo: "IS 1893 (Part 1)",
        status: "current",
        note: "Latest edition cited for seismic design.",
      },
    ],
  },
  {
    id: "steel",
    label: "Steel structure",
    keywords: ["steel", "structural steel", "truss", "fabrication", "girder"],
    tender: {
      id: "PSU/STL/2026/014",
      title: "Structural steel components — public infrastructure",
      authority: "State Infrastructure Development Corporation",
      value: "₹ 29.3 Cr",
      deadline: "12 Oct 2026",
      pages: 176,
      category: "Structural works",
      scope:
        "Fabrication and supply of structural steel components including built-up sections, trusses and connection assemblies for a public infrastructure facility, with shop inspection and site assembly support.",
      location: "Worksite: Ranipet, Tamil Nadu",
      method: "Open e-procurement (supply)",
      contractType: "Supply + shop inspection",
      emd: "₹ 58.6 L",
      completion: "16 weeks (phased)",
      evaluation: "L1 price",
      payment: "90 % against inspection · 10 % on site acceptance",
      timeline: [
        { label: "Published", date: "08 Sep 2026", done: true },
        { label: "Pre-bid meeting", date: "19 Sep 2026", done: true },
        { label: "Bid submission & opening", date: "12 Oct 2026", done: false },
      ],
      officer: "P. Iyer, GM (Contracts)",
      officerPhone: "+91 4172 266 041",
      officerEmail: "contracts@sidc.co.in",
      highlights: [
        "1,840 MT fabricated sections and built-ups",
        "Trusses up to 24 m clear span",
        "Shop welding under approved WPS / PQR",
        "Blast cleaning and primer coat before dispatch",
      ],
      qualification: [
        "Fabricator with an IS 800-compliant QA system",
        "₹ 74 Cr average annual turnover (last 3 years)",
        "Two similar fabrication orders of 1,200 MT or more",
        "Welders qualified to IS 817 / IS 9595",
      ],
      riskNotes: [
        "Tender cites IS 2062:2011 — a later edition is active",
        "WPS to be re-qualified if the plate grade changes",
      ],
    },
    documents: [
      { name: "Technical Specification Vol 1", type: "Specification", pages: 86, matches: 12 },
      { name: "Welding Procedure Annexure", type: "Annexure", pages: 22, matches: 6 },
      { name: "Drawings & Section Schedules", type: "Drawings", pages: 48, matches: 4 },
      { name: "Bill of Quantities", type: "BoQ", pages: 20, matches: 2 },
    ],
    standards: [
      {
        code: "IS 800",
        year: "2007",
        title: "General Construction in Steel — Code of Practice",
        confidence: 96,
        matchType: "exact",
        status: "current",
        note: "Structural steel design requirements detected.",
        detail: STANDARD_DETAILS["IS 800"],
      },
      {
        code: "IS 2062",
        year: "2011",
        title: "Hot Rolled Medium and High Tensile Structural Steel",
        confidence: 91,
        matchType: "exact",
        status: "superseded",
        note: "Material grade references — the tender's 2011 edition is superseded.",
        detail: STANDARD_DETAILS["IS 2062"],
      },
      {
        code: "IS 808",
        year: "2021",
        title: "Dimensions for Hot Rolled Steel Beam, Column, Channel and Angle Sections",
        confidence: 84,
        matchType: "semantic",
        status: "current",
        note: "Section dimension and tolerance references.",
        detail: STANDARD_DETAILS["IS 808"],
      },
      {
        code: "IS 813",
        year: "1986",
        title: "Scheme of Symbols for Welding",
        confidence: 80,
        matchType: "semantic",
        status: "current",
        note: "Weld-symbol conventions on fabrication drawings.",
        detail: STANDARD_DETAILS["IS 813"],
      },
    ],
    exactMatches: [
      {
        citation: "IS 800:2007",
        resolvedTo: "IS 800",
        status: "current",
        note: "Correct code and edition cited.",
      },
      {
        citation: "IS 2062:2011",
        resolvedTo: "IS 2062 (latest)",
        status: "superseded",
        note: "Later edition active — update the citation.",
      },
    ],
  },
  {
    id: "cement",
    label: "Cement",
    keywords: ["cement", "opc", "ppc", "binder"],
    tender: {
      id: "PSU/CMT/2026/021",
      title: "OPC 43 grade cement — warehouse construction",
      authority: "Central Warehousing Corporation",
      value: "₹ 3.4 Cr",
      deadline: "18 Oct 2026",
      pages: 42,
      category: "Materials supply",
      scope:
        "Supply of 18,000 MT OPC 43 grade cement in 50 kg bags with factory test certificates, third-party sampling at site and phased delivery over 22 weeks.",
      location: "Regional warehouse, Nagpur",
      method: "Open e-procurement (supply)",
      contractType: "Rate contract — phased supply",
      emd: "₹ 6.8 L",
      completion: "22 weeks",
      evaluation: "L1 price (nearest depot basis)",
      payment: "Per lot, on receipt and testing",
      timeline: [
        { label: "Published", date: "11 Sep 2026", done: true },
        { label: "Pre-bid meeting", date: "22 Sep 2026", done: true },
        { label: "Bid submission & opening", date: "18 Oct 2026", done: false },
      ],
      officer: "M. Sharma, Manager (Materials)",
      officerPhone: "+91 712 225 0488",
      officerEmail: "materials@cwcindia.nic.in",
      highlights: [
        "18,000 MT OPC 43 grade in 50 kg bags",
        "Third-party sampling per IS 3535 at receipt",
        "Factory test certificate with every lot",
        "Phased delivery aligned to the pour schedule",
      ],
      qualification: [
        "Valid BIS licence for IS 269 (43 grade)",
        "Rail dispatch capability — 2,000 MT per week",
        "₹ 18 Cr average annual turnover (last 3 years)",
        "No failed-lot history in the past 12 months",
      ],
      riskNotes: [
        "PPC alternate only under IS 1489 (Part 1) with approval",
        "Bag condition at GRN is binding for moisture claims",
      ],
    },
    documents: [
      { name: "Technical Specification", type: "Specification", pages: 14, matches: 7 },
      { name: "Quality Assurance Plan", type: "Report", pages: 10, matches: 4 },
      { name: "Delivery & Storage Instructions", type: "Annexure", pages: 8, matches: 1 },
      { name: "Bill of Quantities", type: "BoQ", pages: 10, matches: 2 },
    ],
    standards: [
      {
        code: "IS 269",
        year: "2015",
        title: "Ordinary Portland Cement — 43 Grade Specification",
        confidence: 97,
        matchType: "exact",
        status: "current",
        note: "Grade requirement directly names the specification.",
        detail: STANDARD_DETAILS["IS 269"],
      },
      {
        code: "IS 4031 (Parts 1–15)",
        year: "1988",
        title: "Methods of Physical Tests for Hydraulic Cement",
        confidence: 88,
        matchType: "semantic",
        status: "current",
        note: "QA plan testing schedule references the series.",
        detail: STANDARD_DETAILS["IS 4031"],
      },
      {
        code: "IS 1489 (Part 1)",
        year: "1991",
        title: "Portland Pozzolana Cement — Specification",
        confidence: 76,
        matchType: "semantic",
        status: "current",
        note: "Blended-cement option with fly ash.",
        detail: STANDARD_DETAILS["IS 1489"],
      },
      {
        code: "IS 8112",
        year: "1989",
        title: "Ordinary Portland Cement — 53 Grade Specification",
        confidence: 72,
        matchType: "semantic",
        status: "current",
        note: "Alternate grade permitted in clause 2.3.",
        detail: STANDARD_DETAILS["IS 8112"],
      },
    ],
    exactMatches: [
      {
        citation: "IS 269:2015",
        resolvedTo: "IS 269",
        status: "current",
        note: "Correct code and edition cited.",
      },
      {
        citation: "IS 4031 (various parts)",
        resolvedTo: "IS 4031 series",
        status: "current",
        note: "Test methods cited by part number.",
      },
    ],
  },
  {
    id: "electrical",
    label: "Electrical wiring",
    keywords: ["electrical", "electric", "wiring", "cable", "switchgear", "substation"],
    tender: {
      id: "PSU/ELE/2026/009",
      title: "LT switchgear panels & internal wiring — substation upgrade",
      authority: "State Electricity Distribution Company",
      value: "₹ 11.7 Cr",
      deadline: "27 Oct 2026",
      pages: 154,
      category: "Electrical works",
      scope:
        "Supply and installation of LT distribution panels, copper internal wiring, earthing and protective devices for a 33/11 kV substation upgrade, with commissioning support and load testing.",
      location: "33/11 kV substation, Sector 14, Gurugram",
      method: "Open e-procurement (turnkey)",
      contractType: "Supply + install + commission",
      emd: "₹ 23.4 L",
      completion: "26 weeks incl. load testing",
      evaluation: "L1 among PQ-qualified bidders",
      payment: "60 / 30 / 10 — supply / erection / commissioning",
      timeline: [
        { label: "Published", date: "30 Aug 2026", done: true },
        { label: "Pre-bid meeting", date: "12 Sep 2026", done: true },
        { label: "Bid submission & opening", date: "27 Oct 2026", done: false },
      ],
      officer: "D. K. Rawat, Superintending Engineer (Distribution)",
      officerPhone: "+91 124 232 0051",
      officerEmail: "se-distribution@statepower.co.in",
      highlights: [
        "18 LT panels with Form 3b internal separation",
        "12 km internal wiring — Cu conductor, FR grade",
        "Earth grid ≤ 1 Ω measured at the 33 kV frame",
        "RCCB 30 mA protection on all final circuits",
      ],
      qualification: [
        "Class-A electrical works contractor",
        "₹ 29 Cr average annual turnover (last 3 years)",
        "Two 33/11 kV substation upgrades completed",
        "Licensed supervisors per the IE Rules 1956",
      ],
      riskNotes: [
        "Vendor to verify the fault level at site before panel rating",
        "IS 732:1989 citations — apply the issued amendments",
      ],
    },
    documents: [
      { name: "Technical Specification", type: "Specification", pages: 72, matches: 11 },
      { name: "Single-Line Diagrams", type: "Drawings", pages: 24, matches: 3 },
      { name: "Testing & Commissioning Plan", type: "Report", pages: 34, matches: 6 },
      { name: "Bill of Quantities", type: "BoQ", pages: 24, matches: 4 },
    ],
    standards: [
      {
        code: "IS 694",
        year: "2010",
        title: "PVC Insulated Cables — Specification",
        confidence: 95,
        matchType: "exact",
        status: "current",
        note: "Wiring clause mandates PVC cables to IS 694.",
        detail: STANDARD_DETAILS["IS 694"],
      },
      {
        code: "IS 732",
        year: "1989",
        title: "Code of Practice for Electrical Wiring Installations",
        confidence: 92,
        matchType: "semantic",
        status: "current",
        note: "Wiring methodology and safety clearances.",
        detail: STANDARD_DETAILS["IS 732"],
      },
      {
        code: "IS 8623",
        year: "2011",
        title: "Low-Voltage Switchgear and Controlgear Assemblies",
        confidence: 87,
        matchType: "semantic",
        status: "current",
        note: "Panel construction and ingress-protection ratings.",
        detail: STANDARD_DETAILS["IS 8623"],
      },
      {
        code: "IS 3043",
        year: "2018",
        title: "Code of Practice for Earthing",
        confidence: 85,
        matchType: "semantic",
        status: "current",
        note: "Earth-grid resistance requirement.",
        detail: STANDARD_DETAILS["IS 3043"],
      },
      {
        code: "IS 12640 (Part 1)",
        year: "2008",
        title: "Residual Current Operated Circuit Breakers",
        confidence: 83,
        matchType: "semantic",
        status: "current",
        note: "Shock-protection devices in distribution.",
        detail: STANDARD_DETAILS["IS 12640"],
      },
    ],
    exactMatches: [
      {
        citation: "IS 694:2010",
        resolvedTo: "IS 694",
        status: "current",
        note: "Correct code and edition cited.",
      },
      {
        citation: "IS 732:1989",
        resolvedTo: "IS 732",
        status: "amended",
        note: "Cited — read with subsequent amendments.",
      },
    ],
  },
  {
    id: "fire",
    label: "Fire safety",
    keywords: ["fire", "extinguisher", "firefighting", "hydrant", "sprinkler", "fire safety"],
    tender: {
      id: "PSU/FSC/2026/012",
      title: "Fire fighting systems — 12-storey office tower",
      authority: "State Fire Services Directorate",
      value: "₹ 12.9 Cr",
      deadline: "04 Nov 2026",
      pages: 198,
      category: "Fire protection systems",
      scope:
        "Design, supply and installation of hydrant system, sprinkler network, portable extinguishers and addressable detection for a 12-storey office tower, including NOC compliance testing.",
      location: "Office tower, Bandra Kurla Complex, Mumbai",
      method: "Two-envelope e-procurement",
      contractType: "Design + supply + install",
      emd: "₹ 25.8 L",
      completion: "40 weeks incl. NOC trials",
      evaluation: "QCBS 60 : 40",
      payment: "Milestones linked to NOC stage clearance",
      timeline: [
        { label: "Published", date: "26 Aug 2026", done: true },
        { label: "Pre-bid meeting", date: "10 Sep 2026", done: true },
        { label: "Bid submission & opening", date: "04 Nov 2026", done: false },
      ],
      officer: "F. D'Souza, Deputy Director (Technical)",
      officerPhone: "+91 22 2640 1214",
      officerEmail: "dd-technical@fireservices.gov.in",
      highlights: [
        "Hydrant and sprinkler for 12 storeys (49.5 m height)",
        "Addressable detection — 1,840 devices",
        "Diesel fire pump 2,800 LPM at 8 bar",
        "NOC-oriented acceptance tests witnessed",
      ],
      qualification: [
        "Class-I fire contractor licence (State)",
        "₹ 32 Cr average annual turnover (last 3 years)",
        "One high-rise system above 40 m",
        "AMC capability — 5-year response within 4 h",
      ],
      riskNotes: [
        "NBC 2016 Part 4 governs — verify the occupant-load calc",
        "Refill and AMC scope excluded — award separately",
      ],
    },
    documents: [
      { name: "Technical Specification", type: "Specification", pages: 98, matches: 13 },
      { name: "Fire Load Calculation Report", type: "Report", pages: 18, matches: 5 },
      { name: "NOC Compliance Checklist", type: "Annexure", pages: 22, matches: 8 },
      { name: "Bill of Quantities", type: "BoQ", pages: 60, matches: 4 },
    ],
    standards: [
      {
        code: "IS 2190",
        year: "2010",
        title: "Selection, Installation and Maintenance of Portable Fire Extinguishers",
        confidence: 94,
        matchType: "exact",
        status: "current",
        note: "Extinguisher provision table cites this code.",
        detail: STANDARD_DETAILS["IS 2190"],
      },
      {
        code: "SP 7 (NBC 2016, Part 4)",
        year: "2016",
        title: "National Building Code — Fire and Life Safety",
        confidence: 93,
        matchType: "semantic",
        status: "current",
        note: "Occupancy classification and egress provisions.",
        detail: STANDARD_DETAILS["SP 7"],
      },
      {
        code: "IS 15683",
        year: "2006",
        title: "Portable Fire Extinguishers — Performance and Construction",
        confidence: 90,
        matchType: "semantic",
        status: "current",
        note: "Type approval and construction of extinguishers.",
        detail: STANDARD_DETAILS["IS 15683"],
      },
      {
        code: "IS 15105",
        year: "2002",
        title: "Design and Installation of Fixed Automatic Sprinkler Systems",
        confidence: 88,
        matchType: "semantic",
        status: "current",
        note: "Sprinkler density and spacing basis.",
        detail: STANDARD_DETAILS["IS 15105"],
      },
    ],
    exactMatches: [
      {
        citation: "IS 2190:2010",
        resolvedTo: "IS 2190",
        status: "current",
        note: "Correct code and edition cited.",
      },
      {
        citation: "IS 15105:2002",
        resolvedTo: "IS 15105",
        status: "current",
        note: "Sprinkler system design basis.",
      },
      {
        citation: "NBC 2016, Part 4",
        resolvedTo: "SP 7 — BIS",
        status: "current",
        note: "Building-code fire chapter mandated by NOC.",
      },
    ],
  },
];

/** Simulated search pipeline — labels shown while the demo "runs". */
export const SEARCH_STAGES = [
  { label: "Parsing requirement", detail: "Breaking the query into procurement terms" },
  { label: "Matching catalogue", detail: "Scanning 2,847 standards records" },
  { label: "Ranking matches", detail: "Relevance scoring across editions" },
  { label: "Validating versions", detail: "Edition, amendment and QCO checks" },
  { label: "Preparing evidence", detail: "Attaching tender citations" },
];

/** Per-stage simulated durations (ms) — ~2.3 s total. */
export const SEARCH_STAGE_MS = [420, 560, 480, 420, 380];
