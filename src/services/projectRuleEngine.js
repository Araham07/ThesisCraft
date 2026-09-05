/**
 * projectRuleEngine.js
 * Rule-Based Project Synthesis Engine for ThesisCraft.
 * Dynamically selects, ranks, customizes, and scores projects based on:
 * - Interests (AI/ML, Web, Cyber, Cloud, FinTech, Health, Data Science, Mobile, Blockchain, IoT)
 * - Tech Stack (Python, React, Node.js, Docker, Rust, SQL, etc.)
 * - Experience (Beginner, Intermediate, Advanced)
 * - Timeline (1 Month, 3 Months, 6 Months)
 * - Goal (Final Year Thesis, Portfolio Project, Hackathon, Startup Prototype)
 */

// ── PROJECT TEMPLATE CATALOG ───────────────────────────────────────────────
const TEMPLATE_CATALOG = [
  // ── AI / ML ──
  {
    id: 'ai-finsight',
    domain: 'AI / ML',
    secondaryDomains: ['FinTech', 'Data Science'],
    projectName: 'FinSight AI',
    tagline: 'Your AI-powered personal finance co-pilot.',
    problem: 'Most students and young professionals make financial decisions based on gut feeling. They lack personalized, data-driven guidance to manage spending, investments, and savings goals effectively.',
    baseDifficulty: 'Intermediate',
    baseTechStack: ['Python', 'React', 'FastAPI', 'scikit-learn', 'PostgreSQL'],
    baseFeatures: [
      'Natural language budget queries ("How much did I spend on food this month?")',
      'AI-powered spending pattern analysis and anomaly detection',
      'Goal-based savings tracker with ML-predicted milestones',
      'Investment portfolio risk analyzer',
      'Smart expense categorization using NLP',
    ],
    baseFutureScope: [
      'Integration with real banking APIs (Plaid, Open Banking)',
      'Multi-currency support for international users',
      'WhatsApp/Telegram bot interface',
      'AI-generated monthly financial health reports',
    ],
  },
  {
    id: 'ai-vision-safety',
    domain: 'AI / ML',
    secondaryDomains: ['IoT / Embedded', 'Healthcare Systems'],
    projectName: 'VisionSense',
    tagline: 'Edge computer vision platform for real-time industrial and workplace safety monitoring.',
    problem: 'Industrial facilities suffer high accident rates due to delayed detection of safety protocol violations (lack of PPE, restricted zone entry, fire hazards). Manual monitoring fails at scale.',
    baseDifficulty: 'Advanced',
    baseTechStack: ['Python', 'OpenCV', 'PyTorch', 'YOLOv8', 'React', 'Docker'],
    baseFeatures: [
      'Real-time PPE compliance verification (helmets, vests, masks)',
      'Restricted zone intrusion alert with sub-second latency',
      'Edge deployment optimization using TensorRT / ONNX',
      'Incident logging dashboard with snapshot evidence',
      'Automated email/SMS notification system for safety managers',
    ],
    baseFutureScope: [
      'Thermal camera integration for heat-hazard detection',
      'Drone video stream analysis for large outdoor construction sites',
      'Predictive safety risk scoring using historical incident trends',
    ],
  },
  {
    id: 'ai-deepdoc',
    domain: 'AI / ML',
    secondaryDomains: ['Data Science'],
    projectName: 'DeepDoc Synthesizer',
    tagline: 'Multimodal AI research assistant for automated literature review and synthesis.',
    problem: 'Researchers spend hundreds of hours filtering through dense academic PDFs, extracting tables, and cross-referencing citations manually.',
    baseDifficulty: 'Intermediate',
    baseTechStack: ['Python', 'LangChain', 'FastAPI', 'React', 'Vector DB', 'PyPDF'],
    baseFeatures: [
      'Automated PDF parsing and formula/table extraction',
      'Retrieval-Augmented Generation (RAG) Q&A across multiple papers',
      'Citation graph visualization and key metric comparison tables',
      'Auto-generated executive summaries and methodology breakdowns',
    ],
    baseFutureScope: [
      'Multi-language translation of international journals',
      'Latex bibliography auto-formatter for IEEE / ACM formats',
    ],
  },

  // ── WEB DEVELOPMENT ──
  {
    id: 'web-devboard',
    domain: 'Web Development',
    secondaryDomains: ['Cloud Infrastructure'],
    projectName: 'DevBoard',
    tagline: 'The developer productivity dashboard that learns from your workflow.',
    problem: 'Developers lose 2–3 hours daily switching between tools — GitHub, Jira, Slack, calendars. There is no single intelligent workspace that surfaces what actually matters right now.',
    baseDifficulty: 'Intermediate',
    baseTechStack: ['React', 'TypeScript', 'Node.js', 'Express', 'GitHub API', 'MongoDB'],
    baseFeatures: [
      'Unified feed aggregating GitHub PRs, issues, and commits',
      'AI daily standup generator based on yesterday\'s activity',
      'Smart task prioritization using deadline + dependency analysis',
      'Focus timer with distraction analytics',
      'Weekly productivity insights and burnout detection',
    ],
    baseFutureScope: [
      'VS Code extension for in-editor productivity insights',
      'Jira and Linear integration',
      'Team dashboard for small engineering teams',
    ],
  },
  {
    id: 'web-agilepulse',
    domain: 'Web Development',
    secondaryDomains: ['Data Science'],
    projectName: 'AgilePulse',
    tagline: 'Automated sprint velocity engine & code health analytics dashboard.',
    problem: 'Software engineering leads lack transparent visibility into repository velocity, code churn, and PR review bottlenecks before deadlines slip.',
    baseDifficulty: 'Intermediate',
    baseTechStack: ['React', 'Node.js', 'PostgreSQL', 'GraphQL', 'TailwindCSS'],
    baseFeatures: [
      'Real-time sprint velocity charts and burndown predictors',
      'Code churn heatmap across repository modules',
      'PR review latency breakdown by team member',
      'Automated release notes generator',
    ],
    baseFutureScope: [
      'Slack bot integration for daily velocity nudges',
      'GitLab and Bitbucket multi-provider support',
    ],
  },

  // ── CYBERSECURITY ──
  {
    id: 'cyber-sentinelx',
    domain: 'Cybersecurity',
    secondaryDomains: ['Cloud Infrastructure', 'AI / ML'],
    projectName: 'SentinelX',
    tagline: 'Zero-trust API security scanner & real-time intrusion detection system.',
    problem: 'Modern REST and GraphQL microservices are vulnerable to API parameter tampering, credential stuffing, and unauthenticated endpoint exposure.',
    baseDifficulty: 'Advanced',
    baseTechStack: ['Python', 'Go / Rust', 'Docker', 'React', 'Redis', 'Wireshark Engine'],
    baseFeatures: [
      'Automated OWASP Top 10 API vulnerability scanner',
      'Real-time rate-limit violation and payload anomaly detection',
      'Interactive attack surface map and risk vector graph',
      'One-click remediation patch advice and curl reproduction scripts',
    ],
    baseFutureScope: [
      'eBPF kernel-level traffic monitoring integration',
      'Automated SIEM alert integration (Splunk, Elastic)',
    ],
  },
  {
    id: 'cyber-phishguard',
    domain: 'Cybersecurity',
    secondaryDomains: ['AI / ML'],
    projectName: 'PhishGuard AI',
    tagline: 'Deep NLP email security inspector & phishing simulation sandbox.',
    problem: 'Social engineering and spear-phishing attacks bypass traditional spam filters by spoofing trusted domains and leveraging zero-day lures.',
    baseDifficulty: 'Intermediate',
    baseTechStack: ['Python', 'FastAPI', 'scikit-learn', 'React', 'TypeScript'],
    baseFeatures: [
      'Header spoofing & SPF/DKIM verification inspector',
      'NLP semantic payload parser for urgent action prompts and malicious links',
      'Browser extension for instant link sandbox preview',
      'Enterprise phishing awareness simulation reporting module',
    ],
    baseFutureScope: [
      'Microsoft 365 & Gmail API plugin integration',
      'Computer vision verification of login landing page clones',
    ],
  },

  // ── CLOUD INFRASTRUCTURE ──
  {
    id: 'cloud-pulse',
    domain: 'Cloud Infrastructure',
    secondaryDomains: ['Web Development', 'Cybersecurity'],
    projectName: 'CloudPulse Engine',
    tagline: 'Multi-cloud resource cost optimizer & auto-scaling orchestration hub.',
    problem: 'Companies overspend up to 35% on cloud compute resources due to idle virtual machines, unattached storage volumes, and misconfigured auto-scaling policies.',
    baseDifficulty: 'Advanced',
    baseTechStack: ['Go / Rust', 'Docker', 'React', 'TypeScript', 'Node.js', 'Prometheus'],
    baseFeatures: [
      'Multi-cloud cost allocation breakdown (AWS / GCP / Azure)',
      'Idle resource identification & automated shutdown scheduler',
      'Real-time CPU/RAM metric streaming with custom alert thresholds',
      'Infrastructure-as-Code (Terraform) cost impact estimator',
    ],
    baseFutureScope: [
      'AI spot-instance bid predictor for maximum cost savings',
      'Kubernetes pod right-sizing auto-remediation operator',
    ],
  },

  // ── FINTECH ──
  {
    id: 'fintech-algotrade',
    domain: 'FinTech',
    secondaryDomains: ['Data Science', 'AI / ML'],
    projectName: 'AlgoTrade Sandbox',
    tagline: 'Algorithmic trading strategy backtester & risk evaluation suite.',
    problem: 'Retail quantitative traders struggle to test complex trading algorithms against historical market tick data without high infrastructure costs.',
    baseDifficulty: 'Intermediate',
    baseTechStack: ['Python', 'Pandas', 'NumPy', 'React', 'FastAPI', 'SQL / Relational'],
    baseFeatures: [
      'High-frequency historical tick data backtesting engine',
      'Sharpe ratio, max drawdown, and win-rate analytics dashboard',
      'Custom visual strategy builder (moving average crossover, RSI, MACD)',
      'Paper trading simulator with live WebSocket price feeds',
    ],
    baseFutureScope: [
      'Reinforcement learning trading agent implementation',
      'Crypto exchange API integration (Binance, Coinbase)',
    ],
  },

  // ── HEALTHCARE SYSTEMS ──
  {
    id: 'health-medalert',
    domain: 'Healthcare Systems',
    secondaryDomains: ['AI / ML', 'Data Science'],
    projectName: 'MedAlert AI',
    tagline: 'Early health risk detection & clinical summary generator.',
    problem: 'Preventable chronic conditions cost healthcare systems billions because patients don\'t act on early warning signs or structured vitals logs.',
    baseDifficulty: 'Advanced',
    baseTechStack: ['Python', 'scikit-learn', 'React', 'FastAPI', 'PostgreSQL'],
    baseFeatures: [
      'Vitals input parsing & multi-condition risk scoring (diabetes, cardiac)',
      'Interactive symptom decision tree with confidence interval scoring',
      'Doctor-ready PDF health summary report with clinical trend charts',
      'HIPAA compliance data anonymization module',
    ],
    baseFutureScope: [
      'Wearable Apple Health / Fitbit sync interface',
      'Telemedicine appointment booking integration',
    ],
  },

  // ── DATA SCIENCE ──
  {
    id: 'data-datamorph',
    domain: 'Data Science',
    secondaryDomains: ['AI / ML', 'Web Development'],
    projectName: 'DataMorph Studio',
    tagline: 'No-code exploratory data analysis & automated ML pipeline synthesizer.',
    problem: 'Data analysts waste hours writing repetitive Pandas boilerplate for data cleaning, missing value imputation, and feature correlation matrix plots.',
    baseDifficulty: 'Intermediate',
    baseTechStack: ['Python', 'Pandas', 'scikit-learn', 'React', 'TypeScript', 'FastAPI'],
    baseFeatures: [
      'Drag-and-drop CSV/Parquet dataset profiler',
      'Automated missing data detection & smart imputation options',
      'Interactive feature correlation heatmaps and outlier distribution plots',
      'One-click Export to Jupyter Notebook / Python script',
    ],
    baseFutureScope: [
      'AutoML model benchmark tournament (RandomForest, XGBoost, LightGBM)',
      'Big Data Snowflake & BigQuery connection adapter',
    ],
  },

  // ── MOBILE SYSTEMS ──
  {
    id: 'mobile-crossrun',
    domain: 'Mobile Systems',
    secondaryDomains: ['Healthcare Systems'],
    projectName: 'CrossRun Mobile',
    tagline: 'Offline-first cross-platform fitness analytics & route tracking app.',
    problem: 'Outdoor runners and cyclists lose workout logs when passing through dead signal zones due to poor cloud-only syncing in traditional fitness apps.',
    baseDifficulty: 'Intermediate',
    baseTechStack: ['Flutter', 'React', 'Node.js', 'SQLite', 'TypeScript'],
    baseFeatures: [
      'GPS route tracking with offline vector map caching',
      'Heart rate & pace zone distribution analysis charts',
      'Local-first SQLite synchronization engine with cloud merge resolution',
      'Social leaderboard & route GPX export functionality',
    ],
    baseFutureScope: [
      'Smartwatch OS companion app (Apple Watch / Wear OS)',
      'AI audio coach providing real-time pace feedback',
    ],
  },

  // ── BLOCKCHAIN ──
  {
    id: 'blockchain-chainproof',
    domain: 'Blockchain',
    secondaryDomains: ['Cybersecurity', 'Web Development'],
    projectName: 'ChainProof',
    tagline: 'Decentralized academic credential verification protocol.',
    problem: 'University degree forgery and credential fraud remain rampant globally, while manual background verification checks take weeks and cost companies millions.',
    baseDifficulty: 'Advanced',
    baseTechStack: ['Solidity', 'React', 'TypeScript', 'Node.js', 'IPFS', 'Ethers.js'],
    baseFeatures: [
      'Smart contract-based degree issuance by accredited institutions',
      'Zero-Knowledge (ZK) proof verification without exposing sensitive student PII',
      'Instant QR-code verification portal for hiring managers',
      'Tamper-proof IPFS storage for transcript metadata',
    ],
    baseFutureScope: [
      'Integration with LinkedIn digital credentials standard',
      'Multi-chain deployment (Polygon, Ethereum, Arbitrum)',
    ],
  },

  // ── IOT / EMBEDDED ──
  {
    id: 'iot-agrisense',
    domain: 'IoT / Embedded',
    secondaryDomains: ['Cloud Infrastructure', 'Data Science'],
    projectName: 'AgriSense IoT',
    tagline: 'Precision agriculture sensor network & automated irrigation hub.',
    problem: 'Farmers struggle with water waste and crop yield loss due to inefficient manual soil moisture testing and unpredictable micro-climates.',
    baseDifficulty: 'Intermediate',
    baseTechStack: ['Python', 'C++', 'React', 'Node.js', 'MQTT', 'Docker'],
    baseFeatures: [
      'MQTT sensor data ingestion (soil moisture, temp, humidity, NPK levels)',
      'Automated solenoid valve trigger rules based on soil threshold & weather forecast',
      'Real-time farm sector telemetry map and alert dashboard',
      'Historical soil degradation analytics with predictive irrigation advice',
    ],
    baseFutureScope: [
      'LoRaWAN long-range rural mesh network connectivity',
      'Drone multispectral imagery crop health overlay',
    ],
  }
]

// ── RULE ENGINE FUNCTION ───────────────────────────────────────────────────
export function synthesizeProjects(profile = {}) {
  const {
    interests = [],
    skills = [],
    experience = 'intermediate',
    timeline = '3-months',
    goal = 'thesis'
  } = profile

  // Normalize user inputs
  const userInterests = Array.isArray(interests) && interests.length > 0 ? interests : ['AI / ML', 'Web Development']
  const userSkills = Array.isArray(skills) && skills.length > 0 ? skills : ['Python', 'React', 'JavaScript']

  // 1. Score every template in the catalog based on interest & skill overlap
  const scoredCatalog = TEMPLATE_CATALOG.map((tpl) => {
    let score = 0

    // Primary domain match: +40 points
    if (userInterests.includes(tpl.domain)) {
      score += 40
    }
    // Secondary domain match: +20 points
    tpl.secondaryDomains.forEach((sec) => {
      if (userInterests.includes(sec)) score += 20
    })

    // Skill overlap: +15 points per matching stack item
    tpl.baseTechStack.forEach((stk) => {
      if (userSkills.some((s) => s.toLowerCase() === stk.toLowerCase())) {
        score += 15
      }
    })

    return { template: tpl, matchScore: score }
  })

  // Sort candidate projects by score descending
  scoredCatalog.sort((a, b) => b.matchScore - a.matchScore)

  // Pick top 3 distinct templates
  const selected = scoredCatalog.slice(0, 3).map((item) => item.template)

  // If less than 3 (should not happen), fill from top of catalog
  while (selected.length < 3) {
    const candidate = TEMPLATE_CATALOG.find((t) => !selected.includes(t))
    if (candidate) selected.push(candidate)
    else break
  }

  // 2. Synthesize dynamic, customized project objects for the student
  return selected.map((tpl, idx) => {
    // Merge user's skills into tech stack to make it personalized
    const mergedTechStack = Array.from(new Set([...userSkills.slice(0, 3), ...tpl.baseTechStack])).slice(0, 6)

    // Calculate dynamic scores based on experience & skills match
    const skillMatchScore = Math.min(98, Math.max(82, 85 + (userSkills.length * 2) - (idx * 3)))
    const innovationScore = Math.min(96, Math.max(80, 88 + (idx * 4) - (userInterests.length)))
    const feasibilityScore = timeline === '1-month' ? 92 : timeline === '6-months' ? 78 : 86 - (idx * 3)

    // Formulate personalized whyItMatches statement
    const primaryInterest = userInterests[0] || tpl.domain
    const skillsListStr = userSkills.slice(0, 3).join(', ')
    const timelineLabel = timeline === '1-month' ? '1 Month' : timeline === '6-months' ? '6 Months' : '3 Months'
    const goalLabel = goal === 'thesis' ? 'Final Year Thesis' : goal === 'portfolio' ? 'Portfolio Project' : goal === 'competition' ? 'Hackathon' : 'Startup Prototype'

    const whyItMatches = `Perfectly tailored for your focus on ${primaryInterest}. Harnesses your selected stack (${skillsListStr}) with an architectural scope optimized for your ${timelineLabel} timeline and ${goalLabel} requirements.`

    // Synthesize roadmap based on timeline
    const roadmap = generateTimelineRoadmap(timeline, tpl.projectName)

    // Determine difficulty based on user experience or template default
    const difficultyLevel = idx === 0 
      ? (experience === 'beginner' ? 'Beginner' : experience === 'advanced' ? 'Advanced' : tpl.baseDifficulty)
      : idx === 1 ? 'Intermediate' : (experience === 'beginner' ? 'Intermediate' : 'Advanced')

    return {
      projectName: tpl.projectName,
      tagline: tpl.tagline,
      problem: tpl.problem,
      whyItMatches,
      difficulty: difficultyLevel,
      scores: {
        skillMatch: skillMatchScore,
        innovation: innovationScore,
        feasibility: feasibilityScore,
      },
      features: tpl.baseFeatures,
      techStack: mergedTechStack,
      roadmap,
      futureScope: tpl.baseFutureScope,
    }
  })
}

// ── TIMELINE ROADMAP GENERATOR ──────────────────────────────────────────────
function generateTimelineRoadmap(timeline, projectName) {
  if (timeline === '1-month') {
    return [
      'Week 1: Core architecture setup, database schema design, and baseline API routes',
      'Week 2: Core feature development & integration of primary tech stack dependencies',
      'Week 3: Interactive UI dashboard construction and state management implementation',
      'Week 4: End-to-end integration testing, polish, and cloud deployment setup',
    ]
  }

  if (timeline === '6-months') {
    return [
      'Month 1: In-depth domain research, formal literature review, & system specification',
      'Month 2: Architecture design, data collection/ingestion pipelines, & prototype setup',
      'Month 3: Core algorithm development, model training / backend service implementation',
      'Month 4: Full-stack integration, reactive dashboard UI, & metric visualization',
      'Month 5: Comprehensive empirical testing, benchmarking, & security audit',
      'Month 6: Thesis documentation, code refinement, & final presentation demo',
    ]
  }

  // Default: 3 Months
  return [
    'Week 1–2: Requirements breakdown, API architecture design, and database schema',
    'Week 3–4: Ingestion pipelines and backend microservices setup',
    'Week 5–6: Frontend dashboard development & core feature component integration',
    'Week 7–8: Advanced scoring/analytics engine & real-time metric visualization',
    'Week 9–10: System integration, error handling, & performance optimization',
    'Week 11: End-to-end user acceptance testing & bug fixing',
    'Week 12: Production deployment & project documentation walkthrough',
  ]
}
