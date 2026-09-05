/**
 * mockProjects.js
 * 3 carefully crafted mock project objects matching the AI JSON schema.
 * Used as fallback (or primary) when no real AI API is connected.
 */

export const MOCK_PROJECTS = [
  {
    projectName: "FinSight AI",
    tagline: "Your AI-powered personal finance co-pilot.",
    problem:
      "Most students and young professionals make financial decisions based on gut feeling. They lack personalized, data-driven guidance to manage spending, investments, and savings goals effectively.",
    whyItMatches:
      "Combines your interest in AI/ML and FinTech with your Python and React skills. The 3-month timeline is perfect for building the core dashboard, ML model, and visualizations without scope creep.",
    difficulty: "Intermediate",
    scores: {
      skillMatch: 92,
      innovation: 88,
      feasibility: 85,
    },
    features: [
      "Natural language budget queries (\"How much did I spend on food this month?\")",
      "AI-powered spending pattern analysis and anomaly detection",
      "Goal-based savings tracker with ML-predicted milestones",
      "Investment portfolio risk analyzer",
      "Smart expense categorization using NLP",
    ],
    techStack: ["Python", "React", "FastAPI", "scikit-learn", "Recharts", "PostgreSQL", "Plaid API"],
    roadmap: [
      "Week 1–2: Research financial APIs, design database schema, set up FastAPI backend",
      "Week 3–4: Build transaction ingestion pipeline and expense categorization model",
      "Week 5–6: React dashboard with charts, budget views, and goal tracker",
      "Week 7–8: Integrate ML model for predictions and anomaly alerts",
      "Week 9–10: Add natural language query interface",
      "Week 11: Testing, bug fixes, and performance optimization",
      "Week 12: Deployment to Render/Railway + demo preparation",
    ],
    futureScope: [
      "Integration with real banking APIs (Plaid, Open Banking)",
      "Multi-currency support for international students",
      "WhatsApp/Telegram bot interface",
      "AI-generated monthly financial health reports",
      "Investment recommendation engine",
    ],
  },
  {
    projectName: "DevBoard",
    tagline: "The developer productivity dashboard that learns from your workflow.",
    problem:
      "Developers lose 2–3 hours daily switching between tools — GitHub, Jira, Slack, calendars. There's no single intelligent workspace that surfaces what actually matters right now.",
    whyItMatches:
      "A perfect match for your Web Development skills and React/Node.js stack. It's achievable in 3 months and demonstrates real-world API integration, data aggregation, and a polished UI — exactly what recruiters want to see.",
    difficulty: "Intermediate",
    scores: {
      skillMatch: 90,
      innovation: 82,
      feasibility: 91,
    },
    features: [
      "Unified feed aggregating GitHub PRs, issues, and commits",
      "AI daily standup generator based on yesterday's activity",
      "Smart task prioritization using deadline + dependency analysis",
      "Focus timer with distraction analytics",
      "Weekly productivity insights and burnout detection",
    ],
    techStack: ["React", "Node.js", "Express", "GitHub API", "OpenAI API", "MongoDB", "Recharts"],
    roadmap: [
      "Week 1–2: Design system + GitHub OAuth integration",
      "Week 3–4: GitHub activity feed and PR/issue aggregation",
      "Week 5–6: AI standup generator and task prioritization logic",
      "Week 7–8: Focus timer, Pomodoro mode, and distraction tracker",
      "Week 9–10: Analytics dashboard with weekly reports",
      "Week 11: Testing across different repo types and edge cases",
      "Week 12: Deployment + portfolio documentation",
    ],
    futureScope: [
      "VS Code extension for in-editor productivity insights",
      "Jira and Linear integration",
      "Team dashboard for small engineering teams",
      "Voice-activated standup summaries",
      "GitHub Actions pipeline monitoring",
    ],
  },
  {
    projectName: "MedAlert AI",
    tagline: "Early health risk detection powered by machine learning.",
    problem:
      "Preventable diseases cost healthcare systems billions annually because patients don't act on early warning signs. Most health apps track data but don't predict risks or recommend timely action.",
    whyItMatches:
      "Leverages your Python and Data Science skills with your AI/ML interest. The healthcare domain adds serious impact to your resume and final-year project — judges and employers take notice of socially meaningful projects.",
    difficulty: "Advanced",
    scores: {
      skillMatch: 84,
      innovation: 95,
      feasibility: 76,
    },
    features: [
      "Health risk scoring from lifestyle and vitals input",
      "ML-based early detection for diabetes, hypertension, and cardiac risk",
      "Personalized health improvement recommendations",
      "Interactive symptom checker with confidence scoring",
      "Doctor-ready PDF health summary report",
    ],
    techStack: ["Python", "React", "Flask", "scikit-learn", "XGBoost", "Pandas", "Chart.js", "FHIR API"],
    roadmap: [
      "Week 1–2: Research medical datasets (UCI, Kaggle), define prediction targets",
      "Week 3–4: Data preprocessing, feature engineering, and model training",
      "Week 5–6: Flask API for model serving + risk score endpoints",
      "Week 7–8: React frontend — user input forms, risk dashboard, and charts",
      "Week 9–10: Symptom checker module and PDF report generation",
      "Week 11: Clinical accuracy validation and edge-case testing",
      "Week 12: Deployment + ethical AI documentation",
    ],
    futureScope: [
      "Wearable device integration (Apple Health, Fitbit)",
      "Telemedicine referral system",
      "Multi-language support for rural healthcare access",
      "Federated learning for privacy-preserving model training",
      "Integration with EHR systems via FHIR",
    ],
  },
]
