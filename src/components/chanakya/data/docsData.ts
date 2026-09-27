/**
 * CHANAKYA — Docs content
 * Original documentation for the demo docs view. All records are sample data.
 */

export type DocBlock =
  | { type: "p"; text: string }
  | { type: "list"; items: string[] }
  | { type: "code"; text: string }
  | { type: "callout"; tone: "note" | "warning"; title: string; text: string }
  | { type: "table"; head: string[]; rows: string[][] };

export interface DocSection {
  id: string;
  heading: string;
  blocks: DocBlock[];
}

export interface DocArticle {
  id: string;
  title: string;
  description: string;
  icon: "rocket" | "workflow" | "graph" | "audit" | "shield" | "users" | "book";
  category: string;
  popular?: boolean;
  sections: DocSection[];
}

export const DOC_CATEGORIES = [
  "Getting started",
  "How CHANAKYA works",
  "Governance",
  "Reference",
] as const;

export const DOCS: DocArticle[] = [
  {
    id: "getting-started",
    title: "Getting started",
    description: "What CHANAKYA does, who it is for, and how to run your first tender analysis.",
    icon: "rocket",
    category: "Getting started",
    popular: true,
    sections: [
      {
        id: "what-chanakya-does",
        heading: "What CHANAKYA does",
        blocks: [
          {
            type: "p",
            text: "CHANAKYA is an AI-assisted procurement intelligence system for Government departments and Public Sector Enterprises. It helps officers identify applicable Indian Standards, discover related, allied and normative standards, check version and amendment currency, identify certification and QCO requirements, audit tender references, and produce grounded recommendations with evidence.",
          },
          {
            type: "p",
            text: "The system is designed for three roles: Procurement Officers as the primary users, with Engineers and Reviewers supporting verification. Sixteen officer-facing workflows and three engineer and reviewer workflows are defined in the architecture, covering the full path from tender ingestion to audited recommendation.",
          },
          {
            type: "callout",
            tone: "note",
            title: "Demo layer",
            text: "This site is a front-end demonstration. The production system runs on Streamlit and Python, and every record shown in the demo is sample data.",
          },
        ],
      },
      {
        id: "the-officer-workflow",
        heading: "The officer workflow",
        blocks: [
          {
            type: "p",
            text: "A typical session starts from a tender document. The officer submits a specification — pasted text or a scanned file — and the pipeline takes over: ingestion with OCR when needed, language detection, requirement extraction, retrieval, reranking, graph expansion and validation. A few seconds later the officer reads a ranked recommendation set instead of searching catalogues manually.",
          },
          {
            type: "list",
            items: [
              "Submit the tender or specification fragment that needs standards.",
              "Review the recommended IS codes with confidence and evidence.",
              "Inspect the relationship graph for normative and test references.",
              "Resolve tender gaps flagged by the deterministic audit rules.",
              "Send uncertain cases to the review queue with one action.",
            ],
          },
        ],
      },
      {
        id: "launching-first-analysis",
        heading: "Launching your first analysis",
        blocks: [
          {
            type: "p",
            text: "Open the demo dashboard and select a tender from the recent analyses table, or start a new analysis. The processing pipeline visualises each stage as it completes, so you can watch extraction, retrieval and validation happen in order. The resulting recommendation cards show the matched requirement, the reasoning, and the source record behind every suggestion.",
          },
          {
            type: "p",
            text: "Recommendations are ranked by confidence, but confidence never replaces judgement. Anything ambiguous is routed to the review queue, and the officer always retains the final decision on what enters the tender.",
          },
        ],
      },
    ],
  },
  {
    id: "recommendations",
    title: "How recommendations work",
    description: "The full pipeline from tender ingestion to grounded, evidence-backed recommendations.",
    icon: "workflow",
    category: "How CHANAKYA works",
    popular: true,
    sections: [
      {
        id: "pipeline-overview",
        heading: "Pipeline overview",
        blocks: [
          {
            type: "p",
            text: "A tender or specification enters the pipeline and is ingested, with OCR applied when the source is scanned. Language is detected early so multilingual retrieval can operate across supported Indian languages before anything else happens. Requirement extraction then converts the text into structured needs the system can match against the standards corpus.",
          },
          {
            type: "p",
            text: "Semantic retrieval proposes candidate standards for each structured need. Candidates are reranked, and the strongest are expanded through the standards graph, which pulls in relationships — primary, normative, test, terminology, safety, installation and related products. Lifecycle and compliance validation runs last, before grounded synthesis produces the recommendation set.",
          },
        ],
      },
      {
        id: "extraction-and-retrieval",
        heading: "Extraction and retrieval",
        blocks: [
          {
            type: "p",
            text: "Requirement extraction turns free-language clauses into structured needs: material grades, dimensional tolerances, test methods, workmanship and certification obligations. Each need keeps a pointer back to the clause it came from, so every downstream match can quote the exact source text.",
          },
          {
            type: "code",
            text: `{
  "requirement": "Structural steel plates for bridge girders",
  "matched": ["IS 2062:2011", "IS 800:2007"],
  "language": "en",
  "clause_ref": "Tender clause 2.4.1",
  "confidence": 0.94
}`,
          },
        ],
      },
      {
        id: "reranking-and-validation",
        heading: "Reranking and validation",
        blocks: [
          {
            type: "p",
            text: "Reranking weighs lexical fit, semantic similarity and graph centrality together, so a standard that anchors many relevant references can outrank a loosely worded lexical match. Validation then checks edition currency, outstanding amendments, supersession chains, certification requirements and QCO applicability — deterministic checks whose results are recorded, not inferred.",
          },
          {
            type: "callout",
            tone: "note",
            title: "Why validation is deterministic",
            text: "Compliance findings are produced by fixed rules against source records. The model proposes; the rules dispose. This separation keeps audit findings reproducible and defensible.",
          },
        ],
      },
    ],
  },
  {
    id: "standards-graph",
    title: "The standards graph",
    description: "How Indian Standards connect — relationships, versions, supersession and QCO coverage.",
    icon: "graph",
    category: "How CHANAKYA works",
    popular: true,
    sections: [
      {
        id: "relationship-types",
        heading: "Relationship types",
        blocks: [
          {
            type: "p",
            text: "The graph links standards through typed relationships. When a recommendation names one standard, the graph explains what travels with it: the test methods it requires, the terminology it assumes, the safety codes it defers to, and the product standards that cover adjacent materials.",
          },
          {
            type: "table",
            head: ["Relationship", "Meaning", "Example"],
            rows: [
              ["Normative", "Indispensable reference within the standard", "IS 800 cites IS 2062 for steel supply"],
              ["Test method", "Procedure used to verify conformity", "IS 2062 cross-references tensile testing"],
              ["Terminology", "Shared vocabulary definition", "IS 806 defines structural terms"],
              ["Supersession", "Replaces an earlier edition or code", "IS 800:2007 supersedes IS 800:1984"],
              ["Related product", "Adjacent material or component standard", "IS 808 sections with IS 2062"],
            ],
          },
        ],
      },
      {
        id: "versions-and-amendments",
        heading: "Versions and amendments",
        blocks: [
          {
            type: "p",
            text: "Every node in the graph carries its lifecycle state: publication year, current edition, applied amendments, reaffirmation status and supersession target. A tender that cites a superseded edition is flagged with the corrected reference, and the audit records the change rather than silently accepting the old citation.",
          },
          {
            type: "callout",
            tone: "warning",
            title: "Cite the full designation",
            text: "A tender that references only 'IS 800' without a year leaves the applicable edition ambiguous. CHANAKYA flags such citations and proposes the current designation.",
          },
        ],
      },
    ],
  },
  {
    id: "tender-audit",
    title: "Tender audit",
    description: "Deterministic checks on every standards reference in a tender, and how gaps are resolved.",
    icon: "audit",
    category: "How CHANAKYA works",
    sections: [
      {
        id: "what-the-audit-checks",
        heading: "What the audit checks",
        blocks: [
          {
            type: "p",
            text: "The audit walks every standards reference in a tender and checks it against the graph: existence, current edition, amendment status, applicability to the described procurement, and QCO coverage. Findings are classified as pass, warning or fail, and each finding cites the rule that produced it.",
          },
          {
            type: "list",
            items: [
              "Reference to a standard that does not exist or is withdrawn.",
              "Superseded edition cited where a newer edition is in force.",
              "Missing amendment that changes a cited requirement.",
              "Applicable QCO not acknowledged in the specification.",
              "Requirement in the text with no supporting standard cited.",
            ],
          },
        ],
      },
      {
        id: "gap-resolution",
        heading: "Gap resolution",
        blocks: [
          {
            type: "p",
            text: "A tender gap is the difference between the standards a tender cites and those its requirements actually need. CHANAKYA resolves gaps by proposing the missing reference with its evidence, drafting the corrected citation, and recording the change so the officer can accept or reject it deliberately.",
          },
        ],
      },
    ],
  },
  {
    id: "evidence-review",
    title: "Evidence and review",
    description: "Where evidence comes from, how confidence is reported, and how humans stay in the loop.",
    icon: "shield",
    category: "Governance",
    sections: [
      {
        id: "evidence-blocks",
        heading: "Evidence blocks",
        blocks: [
          {
            type: "p",
            text: "Every recommendation carries its evidence: the matched requirement, the clause or query that grounded it, the source record — for example the BIS Standard Catalogue — and the last-verified timestamp. An officer should never have to trust a suggestion; the system shows the receipts inline with each card.",
          },
        ],
      },
      {
        id: "review-queue",
        heading: "The review queue",
        blocks: [
          {
            type: "p",
            text: "When evidence conflicts or confidence is low, the result is routed to the human review queue instead of being promoted. Reviewers accept, correct, reject or flag each case, and their decisions are recorded alongside the recommendation for later audit. The officer always retains the final decision.",
          },
        ],
      },
    ],
  },
  {
    id: "workflows",
    title: "Workflows and roles",
    description: "The sixteen officer workflows and three engineer and reviewer workflows.",
    icon: "users",
    category: "Governance",
    sections: [
      {
        id: "officer-workflows",
        heading: "Officer workflows",
        blocks: [
          {
            type: "p",
            text: "Officer workflows cover the daily path of a procurement: analysing a tender, reviewing recommendations, resolving gaps, approving citations and exporting the audited specification. Sixteen workflows are defined, each producing a recorded outcome that feeds the audit trail.",
          },
        ],
      },
      {
        id: "engineer-reviewer-workflows",
        heading: "Engineer and reviewer workflows",
        blocks: [
          {
            type: "p",
            text: "Three workflows belong to engineers and reviewers: verifying a flagged recommendation, correcting a standards mapping, and signing off a resolved gap. Their outputs flow back to the officer with the reviewer identity attached, so accountability is explicit.",
          },
        ],
      },
    ],
  },
  {
    id: "glossary",
    title: "Glossary",
    description: "The vocabulary used across CHANAKYA, in one place.",
    icon: "book",
    category: "Reference",
    popular: true,
    sections: [
      {
        id: "terms",
        heading: "Terms",
        blocks: [
          {
            type: "table",
            head: ["Term", "Definition"],
            rows: [
              ["BIS", "Bureau of Indian Standards — the national standards body of India."],
              ["IS", "Indian Standard — a standard published by BIS (e.g. IS 800:2007)."],
              ["QCO", "Quality Control Order — a statutory order making conformity to a standard mandatory."],
              ["Amendment", "A formal change to a standard that does not create a new edition."],
              ["Supersession", "Replacement of one standard (or edition) by a later one."],
              ["Normative reference", "A reference cited within a standard that is indispensable to its application."],
              ["Reaffirmation", "Periodic confirmation that a standard remains current without change."],
              ["Tender gap", "The difference between the standards a tender cites and those its requirements actually need."],
            ],
          },
        ],
      },
    ],
  },
];

export const docById = (id: string) => DOCS.find((d) => d.id === id);
