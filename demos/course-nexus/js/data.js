/**
 * CourseNexus EdTech Platform - Mock Data Store
 * Comprehensive dataset for Courses, Curriculums, Quizzes, Mentors, and Placements
 */

const COURSE_CATEGORIES = [
  { id: 'all', name: 'All Programs', icon: 'layers', count: 10 },
  { id: 'coding', name: 'Full-Stack Coding', icon: 'code-2', count: 2 },
  { id: 'datascience', name: 'Data Science & AI', icon: 'brain-circuit', count: 2 },
  { id: 'digitalmarketing', name: 'Digital Marketing', icon: 'trending-up', count: 2 },
  { id: 'upsc', name: 'UPSC / Govt Exams', icon: 'book-open-check', count: 2 },
  { id: 'design', name: 'UI/UX & Product Design', icon: 'palette', count: 2 }
];

const COURSES_DATA = [
  {
    id: 'fswd-ai-pro',
    title: 'Full-Stack Web & AI Engineering (MERN + Next.js + GenAI)',
    slug: 'full-stack-web-ai-engineering',
    category: 'coding',
    categoryLabel: 'Full-Stack Coding',
    badge: 'Bestseller • 100% Placement Support',
    tagColor: 'amber',
    rating: 4.94,
    reviewCount: 3840,
    enrolledCount: 14250,
    duration: '6 Months (240+ Hours)',
    format: 'Live Interactive + Lifetime Access',
    language: 'Hinglish & English',
    level: 'Beginner to Advanced',
    nextBatchDate: 'Next Batch: 5th September (Only 14 Seats Left)',
    price: {
      original: 34999,
      discounted: 14999,
      emiPerMonth: 1250,
      emiMonths: 12,
      scholarshipDiscount: 3000
    },
    instructor: {
      name: 'Aditya Verma',
      role: 'Ex-Senior Staff Engineer @ Google & Microsoft',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80',
      rating: 4.98,
      studentsTaught: '45,000+',
      experience: '12+ Years'
    },
    overview: 'Master modern full-stack development with Next.js 14, Node.js, Microservices, TypeScript, PostgreSQL, and integrate cutting-edge LLMs (OpenAI, LangChain, Claude) into production SaaS apps.',
    highlights: [
      'Build 6 Production-Grade Full-Stack & GenAI Web Apps',
      'Dedicated 1-on-1 Mock Interviews with Ex-FAANG SDE-2/3',
      'Live System Design & High Concurrency Architecture Sessions',
      'Daily Doubt Solving with TAs (10 AM to 10 PM IST)'
    ],
    toolsCovered: ['React', 'Next.js', 'Node.js', 'PostgreSQL', 'Docker', 'LangChain', 'TypeScript', 'TailwindCSS'],
    syllabus: [
      {
        moduleNumber: 1,
        title: 'Module 1: Modern JavaScript, TypeScript & React 19 Core',
        duration: '4 Weeks • 16 Live Sessions',
        summary: 'Deep dive into asynchronous JavaScript, Event Loops, closures, TypeScript types/generics, React hooks, state management, and server components.',
        lessons: [
          {
            title: '1.1 Deep Dive: Execution Context, Event Loop & Promises',
            duration: '22:45 min',
            isFreePreview: true,
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
            videoThumbnail: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
            summary: 'Learn how V8 engine handles microtasks, macrotasks, and asynchronous execution under the hood.',
            keyTakeaways: ['Call stack vs Task queue', 'Promise chaining & async/await optimization', 'Avoiding memory leaks in browser']
          },
          {
            title: '1.2 Advanced React: Custom Hooks & Performance Profiling',
            duration: '31:10 min',
            isFreePreview: true,
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
            videoThumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=800&q=80',
            summary: 'Memoization, re-render avoidance, React Compiler fundamentals and custom hooks architecture.',
            keyTakeaways: ['useMemo and useCallback practical audits', 'Virtual DOM diffing algorithm', 'Writing clean production hook libraries']
          },
          {
            title: '1.3 Production TypeScript: Generics, Mapped Types & Zod Validation',
            duration: '28:15 min',
            isFreePreview: false,
            videoUrl: '',
            videoThumbnail: '',
            summary: 'Type-safe schemas, runtime validation with Zod and end-to-end type safety.',
            keyTakeaways: ['Type inference', 'Strict mode configurations', 'Enterprise schema validation']
          }
        ]
      },
      {
        moduleNumber: 2,
        title: 'Module 2: Scalable Backend, Microservices & Databases (SQL + NoSQL)',
        duration: '6 Weeks • 24 Live Sessions',
        summary: 'Architecting REST & GraphQL APIs with Express/Fastify, ORMs (Prisma, Drizzle), PostgreSQL partitioning, Redis caching, and Kafka message brokers.',
        lessons: [
          {
            title: '2.1 Database Indexing, Query Optimization & PostgreSQL Partitioning',
            duration: '35:20 min',
            isFreePreview: false,
            videoUrl: '',
            videoThumbnail: '',
            summary: 'B-tree indexes, query execution plans (EXPLAIN ANALYZE) and connection pooling.',
            keyTakeaways: ['Preventing N+1 queries', 'Redis caching strategies', 'High-throughput scaling']
          },
          {
            title: '2.2 Microservices Architecture with Docker & RabbitMQ / Kafka',
            duration: '42:00 min',
            isFreePreview: false,
            videoUrl: '',
            videoThumbnail: '',
            summary: 'Event-driven architecture, service discovery, distributed logging, and API gateways.',
            keyTakeaways: ['Saga pattern for transactions', 'Message queues vs pub/sub', 'Container orchestration with Docker Compose']
          }
        ]
      },
      {
        moduleNumber: 3,
        title: 'Module 3: Generative AI SaaS, LangChain & Vector Embeddings',
        duration: '5 Weeks • 20 Live Sessions',
        summary: 'Building RAG (Retrieval-Augmented Generation) pipelines, embeddings with Pinecone/pgvector, prompt engineering frameworks, and deploying AI Agents.',
        lessons: [
          {
            title: '3.1 Building Enterprise RAG System with pgvector & LangChain',
            duration: '38:50 min',
            isFreePreview: false,
            videoUrl: '',
            videoThumbnail: '',
            summary: 'Document chunking, cosine similarity, semantic search, and streaming responses with OpenAI SDK.',
            keyTakeaways: ['Vector embeddings pipeline', 'Chunking strategy trade-offs', 'Hallucination guardrails']
          }
        ]
      }
    ]
  },
  {
    id: 'dsa-system-design',
    title: 'DSA & Low-Level System Design (Cracking FAANG & Tier-1 PBCs)',
    slug: 'dsa-system-design-masterclass',
    category: 'coding',
    categoryLabel: 'Full-Stack Coding',
    badge: 'Popular • 450+ LeetCode Solved',
    tagColor: 'emerald',
    rating: 4.96,
    reviewCount: 2910,
    enrolledCount: 9800,
    duration: '4.5 Months (180+ Hours)',
    format: 'Live Weekend Classes + Daily Coding Arena',
    language: 'English & Hinglish',
    level: 'Intermediate to Pro',
    nextBatchDate: 'Next Batch: 10th September',
    price: {
      original: 27999,
      discounted: 11999,
      emiPerMonth: 999,
      emiMonths: 12,
      scholarshipDiscount: 2500
    },
    instructor: {
      name: 'Rohan Deshmukh',
      role: 'Ex-Amazon SDE-3 | 7x Hackathon Winner',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&q=80',
      rating: 4.97,
      studentsTaught: '28,000+',
      experience: '9+ Years'
    },
    overview: 'Master 450+ algorithmic patterns in C++/Java/Python. Deep dive into dynamic programming, graphs, segment trees, LLD design patterns, and concurrency.',
    highlights: [
      'Top 450 Sheet with Video Solutions & Pattern Recognition',
      'Low-Level Design (LLD): Parking Lot, Cricbuzz, BookMyShow, Uber',
      'Concurrency, Multithreading & Thread-Safe Data Structures',
      '5 FAANG Mock Coding Interviews with Senior Interviewers'
    ],
    toolsCovered: ['C++', 'Java', 'Python', 'LeetCode', 'Design Patterns', 'Concurrency'],
    syllabus: [
      {
        moduleNumber: 1,
        title: 'Module 1: Advanced Arrays, Two Pointers & Sliding Window Patterns',
        duration: '3 Weeks • 12 Live Sessions',
        summary: 'Algorithmic intuition, memory layout, invariant assertions, and high-frequency patterns.',
        lessons: [
          {
            title: '1.1 Mastering the Dynamic Sliding Window & Monotonic Queue',
            duration: '27:10 min',
            isFreePreview: true,
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
            videoThumbnail: 'https://images.unsplash.com/photo-1516116211227-bbc13c74330c?auto=format&fit=crop&w=800&q=80',
            summary: 'Solve hard sliding window problems with O(N) amortized time complexity.',
            keyTakeaways: ['Sliding window maximum', 'Subarray sum equals K', 'Shrinking vs expanding logic']
          }
        ]
      }
    ]
  },
  {
    id: 'ai-data-science-bootcamp',
    title: 'Applied Data Science, Machine Learning & LLMOps Bootcamp',
    slug: 'applied-data-science-ml-bootcamp',
    category: 'datascience',
    categoryLabel: 'Data Science & AI',
    badge: 'Industry Flagship • Real-World Datasets',
    tagColor: 'purple',
    rating: 4.92,
    reviewCount: 2450,
    enrolledCount: 11200,
    duration: '7 Months (260+ Hours)',
    format: 'Live Classes + Cloud Lab GPU Access',
    language: 'Hinglish & English',
    level: 'Beginner to Advanced',
    nextBatchDate: 'Next Batch: 8th September',
    price: {
      original: 39999,
      discounted: 16999,
      emiPerMonth: 1416,
      emiMonths: 12,
      scholarshipDiscount: 3500
    },
    instructor: {
      name: 'Dr. Shalini Ramanathan',
      role: 'Chief AI Scientist @ Optima AI | Ex-Microsoft Research',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=256&q=80',
      rating: 4.99,
      studentsTaught: '32,000+',
      experience: '14+ Years'
    },
    overview: 'From Math, Statistics, and Python to Deep Learning, PyTorch, Transformer Models, Fine-tuning Llama-3, Vector Databases, and MLflow CI/CD deployment.',
    highlights: [
      'Complimentary 100 Hours of Cloud GPU (NVIDIA A100/T4) Labs',
      'Fine-Tune Custom Llama 3 & Mistral Models with LoRA/QLoRA',
      'End-to-End MLOps Pipeline with DVC, MLflow, Docker & AWS SageMaker',
      'Capstone Projects: Real-time Fraud Detection & Medical Diagnostic AI'
    ],
    toolsCovered: ['Python', 'PyTorch', 'HuggingFace', 'LangChain', 'MLflow', 'Docker', 'AWS SageMaker', 'Pandas'],
    syllabus: [
      {
        moduleNumber: 1,
        title: 'Module 1: Applied Statistics, Linear Algebra & Exploratory Data Analysis',
        duration: '4 Weeks • 16 Sessions',
        summary: 'Probability distributions, Hypothesis Testing (A/B testing), PCA, Eigenvalues, and advanced feature engineering.',
        lessons: [
          {
            title: '1.1 A/B Testing, P-Values & Statistical Significance in Product AI',
            duration: '26:40 min',
            isFreePreview: true,
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
            videoThumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
            summary: 'How tech companies design statistically sound experiments without sample ratio mismatch.',
            keyTakeaways: ['Type I & Type II errors', 'Sample size estimation', 'Interpreting confidence intervals']
          }
        ]
      }
    ]
  },
  {
    id: 'business-analytics-powerbi-sql',
    title: 'Business Intelligence & Data Analytics (Power BI + Advanced SQL + Python)',
    slug: 'business-analytics-powerbi-sql',
    category: 'datascience',
    categoryLabel: 'Data Science & AI',
    badge: 'Fast Track • Non-Tech Friendly',
    tagColor: 'blue',
    rating: 4.89,
    reviewCount: 1980,
    enrolledCount: 8400,
    duration: '3.5 Months (120+ Hours)',
    format: 'Live Hands-On + Capstone Portfolios',
    language: 'Hinglish & English',
    level: 'Beginner to Intermediate',
    nextBatchDate: 'Next Batch: 12th September',
    price: {
      original: 24999,
      discounted: 9999,
      emiPerMonth: 833,
      emiMonths: 12,
      scholarshipDiscount: 2000
    },
    instructor: {
      name: 'Kunal Singhania',
      role: 'Lead Business Analyst @ McKinsey & Company',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=256&q=80',
      rating: 4.93,
      studentsTaught: '19,000+',
      experience: '8+ Years'
    },
    overview: 'Become a highly paid Data & Business Analyst. Master SQL window functions, Power BI DAX formulas, interactive dashboards, Excel automation, and storytelling with business data.',
    highlights: [
      '10+ Real Business Case Studies (FinTech, E-Commerce, Healthcare)',
      'Master DAX, Power Query, Data Modeling & Star Schemas',
      'Advanced SQL: CTEs, Window Functions, Stored Procedures',
      'Executive Resume & LinkedIn Optimization by Top HR Recruiters'
    ],
    toolsCovered: ['Power BI', 'SQL Server', 'Excel Power Query', 'Python', 'Tableau', 'Looker Studio'],
    syllabus: [
      {
        moduleNumber: 1,
        title: 'Module 1: Advanced SQL & Data Extraction for Business Insights',
        duration: '4 Weeks • 16 Sessions',
        summary: 'Complex Joins, Window Functions, Aggregate CTEs, and cohort retention queries.',
        lessons: [
          {
            title: '1.1 Master Cohort Analysis & Customer Retention in SQL',
            duration: '21:15 min',
            isFreePreview: true,
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
            videoThumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
            summary: 'Write production SQL queries to calculate Day-7, Day-30 retention rates and revenue cohorts.',
            keyTakeaways: ['Window frame clauses', 'Self joins for repeat purchase analytics', 'Query cost tuning']
          }
        ]
      }
    ]
  },
  {
    id: 'performance-marketing-meta-google',
    title: 'Performance Marketing & Growth Hacking Mastery (Meta Ads + Google Ads + GA4)',
    slug: 'performance-marketing-meta-google-ads',
    category: 'digitalmarketing',
    categoryLabel: 'Digital Marketing',
    badge: 'High ROI • ₹50L+ Ad Budget Case Studies',
    tagColor: 'rose',
    rating: 4.91,
    reviewCount: 1650,
    enrolledCount: 7100,
    duration: '3 Months (90+ Hours)',
    format: 'Live Campaign Building + Ad Credits Included',
    language: 'Hinglish',
    level: 'Beginner to Advanced',
    nextBatchDate: 'Next Batch: 6th September',
    price: {
      original: 22999,
      discounted: 8999,
      emiPerMonth: 750,
      emiMonths: 12,
      scholarshipDiscount: 1800
    },
    instructor: {
      name: 'Tanvi Saxena',
      role: 'Growth Marketing Director @ Ex-Nykaa & D2C Brands',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=256&q=80',
      rating: 4.94,
      studentsTaught: '21,000+',
      experience: '10+ Years'
    },
    overview: 'Learn the exact paid acquisition frameworks used to scale D2C & SaaS brands to 8-figure monthly revenues. Master Meta CBO, Google PMax, Tag Manager, CRO, and Funnel Optimization.',
    highlights: [
      'Live Ad Spend Simulation: Run real campaigns with provided test budgets',
      'Advanced Meta Pixel & Server-Side CAPI (Conversion API) Setup',
      'High-Converting Ad Copywriting & UGC Creative Blueprint',
      'Exclusive Access to 100+ Ready-to-Use High-ROAS Ad Swipe Files'
    ],
    toolsCovered: ['Meta Ads Manager', 'Google Ads', 'Google Analytics 4', 'GTM', 'Shopify', 'Hotjar', 'Canva'],
    syllabus: [
      {
        moduleNumber: 1,
        title: 'Module 1: Meta Ads Architecture & Full-Funnel Scaling',
        duration: '4 Weeks • 12 Sessions',
        summary: 'Advantage+ Shopping Campaigns, Lookalike audiences, broad targeting, creative testing framework.',
        lessons: [
          {
            title: '1.1 The 3-Tier Creative Testing Framework for 4x+ ROAS',
            duration: '24:30 min',
            isFreePreview: true,
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyBlazes.mp4',
            videoThumbnail: 'https://images.unsplash.com/photo-1533750516457-a7f992034fec?auto=format&fit=crop&w=800&q=80',
            summary: 'Systematically test hooks, visual concepts, and calls to action without burning ad spend.',
            keyTakeaways: ['Dynamic creative optimization', 'Hook rate & hold rate metrics', 'Scaling winning angles']
          }
        ]
      }
    ]
  },
  {
    id: 'seo-content-strategy-growth',
    title: 'SEO, Content Strategy & Generative AI Copywriting Accelerator',
    slug: 'seo-content-strategy-growth',
    category: 'digitalmarketing',
    categoryLabel: 'Digital Marketing',
    badge: 'Organic Traffic Blueprint',
    tagColor: 'indigo',
    rating: 4.88,
    reviewCount: 1220,
    enrolledCount: 5400,
    duration: '2.5 Months (80+ Hours)',
    format: 'Live Interactive + Live Website Audits',
    language: 'English & Hinglish',
    level: 'Beginner to Intermediate',
    nextBatchDate: 'Next Batch: 15th September',
    price: {
      original: 19999,
      discounted: 7499,
      emiPerMonth: 625,
      emiMonths: 12,
      scholarshipDiscount: 1500
    },
    instructor: {
      name: 'Varun Joshi',
      role: 'Head of Organic Growth @ Zerodha / FinTech Portal',
      avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=256&q=80',
      rating: 4.90,
      studentsTaught: '14,000+',
      experience: '7+ Years'
    },
    overview: 'Drive millions of free organic visits. Master Technical SEO, Core Web Vitals, programmatic SEO architecture, topical authority maps, and AI-assisted editorial workflows.',
    highlights: [
      'Build a 10,000+ Page Programmatic SEO Site from Scratch',
      'Master Ahrefs, SEMrush, Screaming Frog & Search Console',
      'High-Authority Digital PR & Ethical Backlink Outreach Strategies',
      'SEO Freelance & Agency Client Acquisition Playbook'
    ],
    toolsCovered: ['Ahrefs', 'SEMrush', 'Screaming Frog', 'Search Console', 'Notion', 'ChatGPT Plus'],
    syllabus: [
      {
        moduleNumber: 1,
        title: 'Module 1: Programmatic SEO & Keyword Clustering at Scale',
        duration: '3 Weeks • 10 Sessions',
        summary: 'Keyword research, intent mapping, entity-based SEO, and building dynamic page templates.',
        lessons: [
          {
            title: '1.1 Creating Topical Maps & Semantic Keyword Clusters',
            duration: '19:40 min',
            isFreePreview: true,
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
            videoThumbnail: 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?auto=format&fit=crop&w=800&q=80',
            summary: 'How Google Knowledge Graph identifies topical authority and ranks cluster hubs.',
            keyTakeaways: ['Pillar page hierarchy', 'Internal linking automation', 'Zero-search-volume keywords with high buyer intent']
          }
        ]
      }
    ]
  },
  {
    id: 'upsc-prelims-mains-foundation',
    title: 'UPSC CSE 2025–26: Comprehensive Prelims + Mains Foundation Batch',
    slug: 'upsc-cse-foundation-batch',
    category: 'upsc',
    categoryLabel: 'UPSC / Govt Exams',
    badge: 'AIR Top 50 Faculty • Hinglish Batch',
    tagColor: 'orange',
    rating: 4.97,
    reviewCount: 4120,
    enrolledCount: 18900,
    duration: '12 Months (600+ Hours)',
    format: 'Daily Live 3-Hour Classes + Hardcopy Study Kit',
    language: 'Hinglish & English',
    level: 'Complete Foundation',
    nextBatchDate: 'Next Batch: 1st September (Batch 11)',
    price: {
      original: 59999,
      discounted: 24999,
      emiPerMonth: 2083,
      emiMonths: 12,
      scholarshipDiscount: 5000
    },
    instructor: {
      name: 'Dr. Vivek Swaminathan (IAS Retd.) & Team',
      role: 'Former Addl. Secretary & UPSC Evaluator Panelist',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=256&q=80',
      rating: 4.99,
      studentsTaught: '50,000+',
      experience: '20+ Years'
    },
    overview: 'The most comprehensive UPSC civil services course in India. Complete coverage of GS Paper I–IV, Essay Writing, CSAT, Daily Current Affairs, and Weekly Mains Answer Writing Evaluation with personalized feedback.',
    highlights: [
      'Daily 1-on-1 Mains Answer Evaluation by Former Evaluators',
      'Comprehensive 18-Book Standard Reference Study Material Courier to Doorstep',
      'Daily 20 MCQs Prelims Test Series + 40 Full-Length Mock Exams',
      'Personal Mentorship Hotline with UPSC Qualified Officers'
    ],
    toolsCovered: ['Prelims Portal', 'Mains Answer Portal', 'Current Affairs Mag', 'PIB / Hindu Summaries'],
    syllabus: [
      {
        moduleNumber: 1,
        title: 'Module 1: Indian Polity, Constitution & Governance (M. Laxmikanth Decoded)',
        duration: '8 Weeks • 40 Live Sessions',
        summary: 'Preamble, Fundamental Rights, Directive Principles, Parliamentary Procedures, Supreme Court Landmark Judgments, and Federalism.',
        lessons: [
          {
            title: '1.1 Landmark Supreme Court Cases & Basic Structure Doctrine Decoded',
            duration: '38:10 min',
            isFreePreview: true,
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4',
            videoThumbnail: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&q=80',
            summary: 'From Kesavananda Bharati to recent Constitution Bench rulings on privacy and federalism.',
            keyTakeaways: ['Article 21 evolution', 'Judicial Review limits', 'Mains answer writing model intro-body-conclusion format']
          }
        ]
      }
    ]
  },
  {
    id: 'ssc-banking-quant-reasoning',
    title: 'SSC CGL, CHSL & Banking (IBPS / SBI PO) Complete Quant & Reasoning Super Batch',
    slug: 'ssc-banking-quant-reasoning',
    category: 'upsc',
    categoryLabel: 'UPSC / Govt Exams',
    badge: 'Shortcuts & Speed Tricks',
    tagColor: 'teal',
    rating: 4.90,
    reviewCount: 2780,
    enrolledCount: 13500,
    duration: '5 Months (160+ Hours)',
    format: 'Live Daily Practice + Sectional Speed Drills',
    language: 'Hinglish',
    level: 'Beginner to Advanced',
    nextBatchDate: 'Next Batch: 9th September',
    price: {
      original: 14999,
      discounted: 5499,
      emiPerMonth: 458,
      emiMonths: 12,
      scholarshipDiscount: 1000
    },
    instructor: {
      name: 'Ashish Kashyap',
      role: 'AIR 3 SSC CGL (Income Tax Inspector) | 100%ile Quant',
      avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=256&q=80',
      rating: 4.95,
      studentsTaught: '38,000+',
      experience: '8+ Years'
    },
    overview: 'Solve Quant and Logical Reasoning questions in under 20 seconds. Master Vedic Math tricks, Arithmetic, Advanced Math (Algebra, Geometry, Trigonometry), Puzzles, and Syllogisms with 5,000+ solved questions.',
    highlights: [
      'Solve 5,000+ Exam-Level PYQs with 20-Second Vedic Shortcuts',
      'Daily 30-Minute Speed Math & Calculation Drills',
      '100+ Sectional Mock Tests with All-India Rank (AIR) Leaderboards',
      'Doubt Clearance Groups moderated by Selected Officers'
    ],
    toolsCovered: ['Speed Math Matrix', 'PYQ Bank', 'Live Test Portal', 'Formula Cheat Sheets'],
    syllabus: [
      {
        moduleNumber: 1,
        title: 'Module 1: High-Speed Arithmetic & Vedic Mathematics Mastery',
        duration: '4 Weeks • 20 Sessions',
        summary: 'Percentages, Profit & Loss, Simple & Compound Interest, Time-Speed-Distance shortcuts.',
        lessons: [
          {
            title: '1.1 Compound Interest Installments & Percentage Fraction Matrix',
            duration: '25:40 min',
            isFreePreview: true,
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4',
            videoThumbnail: 'https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?auto=format&fit=crop&w=800&q=80',
            summary: 'Calculate CI in 15 seconds without standard binomial formulas using ratio techniques.',
            keyTakeaways: ['Fraction to percentage conversion mastery', 'Effective rate formula applications', 'Eliminating options trick']
          }
        ]
      }
    ]
  },
  {
    id: 'ui-ux-design-figma-ai',
    title: 'UI/UX & Product Design Mastery: Figma, Design Systems & AI Workflows',
    slug: 'ui-ux-design-figma-ai',
    category: 'design',
    categoryLabel: 'UI/UX & Product Design',
    badge: 'Portfolio Ready • 0 to 1 Case Studies',
    tagColor: 'violet',
    rating: 4.95,
    reviewCount: 1840,
    enrolledCount: 7900,
    duration: '4 Months (140+ Hours)',
    format: 'Live Studio Mentorship + Portfolio Reviews',
    language: 'English & Hinglish',
    level: 'Beginner to Advanced',
    nextBatchDate: 'Next Batch: 7th September',
    price: {
      original: 29999,
      discounted: 12499,
      emiPerMonth: 1041,
      emiMonths: 12,
      scholarshipDiscount: 2500
    },
    instructor: {
      name: 'Ananya Deshmukh',
      role: 'Staff Product Designer @ CRED | Ex-Swiggy & Razorpay',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80',
      rating: 4.97,
      studentsTaught: '16,000+',
      experience: '9+ Years'
    },
    overview: 'Design intuitive, world-class digital products that delight users and drive real business metrics. Master user research, wireframing, interactive prototyping in Figma, Design Tokens, Micro-interactions, and AI design tools.',
    highlights: [
      'Build 3 Industry-Standard Case Studies on Behance & Notion/Webflow',
      'Master Figma Auto-layout, Variables, Component Properties & Tokens',
      'Live 1-on-1 Portfolio Reviews with Senior Product Design Managers',
      'Design Sprint Workshops replicating Uber, Spotify, and Airbnb UI'
    ],
    toolsCovered: ['Figma', 'Framer', 'Protopie', 'Midjourney', 'FigJam', 'Miro', 'Notion'],
    syllabus: [
      {
        moduleNumber: 1,
        title: 'Module 1: Visual Design Fundamentals & Design Systems in Figma',
        duration: '4 Weeks • 16 Sessions',
        summary: 'Typography scale, 8pt Grid Systems, Color harmony, Contrast ratios (WCAG 2.1), and Component Variants.',
        lessons: [
          {
            title: '1.1 Building Scalable Design Systems with Figma Variables & Tokens',
            duration: '29:50 min',
            isFreePreview: true,
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
            videoThumbnail: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&w=800&q=80',
            summary: 'How to structure multi-brand token sets with light/dark modes and component states.',
            keyTakeaways: ['Semantic color tokens', 'Auto layout nested layouts', 'Interactive component variants']
          }
        ]
      }
    ]
  },
  {
    id: 'product-design-ux-research',
    title: 'Product Design, UX Research & Webflow No-Code Accelerator',
    slug: 'product-design-ux-research',
    category: 'design',
    categoryLabel: 'UI/UX & Product Design',
    badge: 'Design to Launch',
    tagColor: 'fuchsia',
    rating: 4.87,
    reviewCount: 940,
    enrolledCount: 4200,
    duration: '3 Months (100+ Hours)',
    format: 'Live Project Reviews + Webflow Site Launch',
    language: 'English',
    level: 'Beginner to Intermediate',
    nextBatchDate: 'Next Batch: 14th September',
    price: {
      original: 24999,
      discounted: 9499,
      emiPerMonth: 791,
      emiMonths: 12,
      scholarshipDiscount: 2000
    },
    instructor: {
      name: 'Samir Merchant',
      role: 'Founder @ Studio Pixel & Design Consultant for YC Startups',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=256&q=80',
      rating: 4.91,
      studentsTaught: '11,000+',
      experience: '11+ Years'
    },
    overview: 'Go beyond Figma visuals. Learn cognitive psychology, qualitative user interviews, usability benchmarking, information architecture, and ship responsive portfolio websites using Webflow without writing code.',
    highlights: [
      'Conduct 10+ Real User Usability Tests with Screen Recording Audits',
      'No-Code Website Development with Webflow CMS & Micro-animations',
      'Freelance Client Acquisition Contract & Pricing Templates Included',
      'Direct Job Referrals to 120+ Design Agencies and Tech Startups'
    ],
    toolsCovered: ['Webflow', 'Figma', 'Maze', 'Loom', 'Hotjar', 'Google Analytics'],
    syllabus: [
      {
        moduleNumber: 1,
        title: 'Module 1: User Research Methodologies & Usability Heuristics',
        duration: '3 Weeks • 12 Sessions',
        summary: "Nielsen's 10 Usability Heuristics, contextual inquiry, persona synthesis, and journey mapping.",
        lessons: [
          {
            title: '1.1 Conducting Actionable User Interviews & Avoiding Bias',
            duration: '23:15 min',
            isFreePreview: true,
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
            videoThumbnail: 'https://images.unsplash.com/photo-1542744094-3a31f272c490?auto=format&fit=crop&w=800&q=80',
            summary: 'Formulating non-leading questions and extracting deep emotional user pain points.',
            keyTakeaways: ['The Mom Test principles', 'Affinity diagramming', 'Translating insights into functional PRDs']
          }
        ]
      }
    ]
  }
];

const QUIZ_QUESTIONS = [
  {
    id: 1,
    category: 'Logical & Algorithmic Aptitude',
    question: 'You need to find if an array of 100,000 integers contains duplicate elements in optimal O(N) time with minimal code complexity. Which approach is best?',
    options: [
      { text: 'Nested loop comparing every pair (Time: O(N²), Space: O(1))', isCorrect: false },
      { text: 'Insert elements into a Hash Set / Hash Map and check for existing keys (Time: O(N), Space: O(N))', isCorrect: true },
      { text: 'Sort the array first using Bubble Sort then check adjacent elements', isCorrect: false },
      { text: 'Recursively binary search every element against the un-sorted list', isCorrect: false }
    ],
    explanation: 'Using a Hash Set provides average O(1) time complexity per lookup and insertion, allowing you to detect duplicates in a single pass of O(N) total time.'
  },
  {
    id: 2,
    category: 'Modern Web & AI Architecture',
    question: 'In modern Next.js / React applications, what is the primary benefit of React Server Components (RSC) compared to traditional client-side rendering (CSR)?',
    options: [
      { text: 'They completely eliminate the need for any backend database servers', isCorrect: false },
      { text: 'They execute strictly on the server, sending zero JavaScript bundle size for those components to the browser while enabling direct secure database access', isCorrect: true },
      { text: 'They only work on mobile devices and cannot render on desktop browsers', isCorrect: false },
      { text: 'They automatically convert all SQL queries into CSS stylesheets', isCorrect: false }
    ],
    explanation: 'React Server Components render entirely on the server. Their dependencies and heavy libraries are never shipped to the client bundle, drastically boosting First Contentful Paint (FCP) and SEO.'
  },
  {
    id: 3,
    category: 'Career & Quantitative Problem Solving',
    question: 'A tech startup grows its active paid subscribers from 2,000 to 5,000 in 6 months while lowering Customer Acquisition Cost (CAC) by 25%. What is the percentage growth in subscribers?',
    options: [
      { text: '120% growth', isCorrect: false },
      { text: '150% growth', isCorrect: true },
      { text: '250% growth', isCorrect: false },
      { text: '300% growth', isCorrect: false }
    ],
    explanation: 'Percentage growth = ((New Value - Old Value) / Old Value) * 100 = ((5000 - 2000) / 2000) * 100 = (3000 / 2000) * 100 = 150%.'
  }
];

const PLACEMENT_STORIES = [
  {
    name: 'Aman Sharma',
    fromRole: 'B.Tech (Tier-3 College) • ₹3.5 LPA',
    toRole: 'Software Development Engineer-1 @ Amazon',
    package: '₹28.5 LPA (714% Hike)',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=256&q=80',
    batch: 'Full-Stack Web & AI Engineering',
    companyLogo: 'Amazon',
    quote: 'The 1-on-1 mock interviews and real-world system design modules gave me the confidence to crack FAANG hiring rounds without any prior big-tech background!'
  },
  {
    name: 'Sneha Reddy',
    fromRole: 'Customer Support Executive • Non-Tech',
    toRole: 'Product Designer @ Swiggy',
    package: '₹18.0 LPA (350% Hike)',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=256&q=80',
    batch: 'UI/UX Design Mastery',
    companyLogo: 'Swiggy',
    quote: 'CourseNexus mentors personally tore down my Figma case studies until they were Silicon Valley standard. Within 3 weeks of graduating, I had 4 interview offers!'
  },
  {
    name: 'Rajesh Gupta',
    fromRole: 'Working Professional in IT',
    toRole: 'Cracked UPSC CSE 2024 (AIR 42)',
    package: 'Indian Administrative Service (IAS)',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&q=80',
    batch: 'UPSC CSE Prelims + Mains Foundation',
    companyLogo: 'Govt of India',
    quote: 'Daily answer evaluations with former IAS evaluators was the single biggest differentiator. Their line-by-line feedback transformed my GS-2 and GS-4 scoring.'
  },
  {
    name: 'Pooja Iyer',
    fromRole: 'Fresher (B.Com Graduate)',
    toRole: 'Lead Performance Marketer @ Nykaa',
    package: '₹14.2 LPA',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=256&q=80',
    batch: 'Performance Marketing & Growth Hacking',
    companyLogo: 'Nykaa',
    quote: 'Running live campaigns with real ad budgets inside the course made all the difference. I was able to show verified ROAS dashboards directly to the hiring managers.'
  }
];

const HIRING_PARTNERS = [
  { name: 'Google', domain: 'Cloud & AI' },
  { name: 'Microsoft', domain: 'Enterprise Software' },
  { name: 'Amazon', domain: 'E-Commerce & AWS' },
  { name: 'Swiggy', domain: 'FoodTech / Logistics' },
  { name: 'Zomato', domain: 'Hyperlocal Commerce' },
  { name: 'Paytm', domain: 'Fintech Payments' },
  { name: 'Flipkart', domain: 'Supply Chain & Ecom' },
  { name: 'CRED', domain: 'High-Scale Fintech' }
];

const STATS_DATA = [
  { value: '25,000+', label: 'Students Upskilled', icon: 'graduation-cap', change: '+120% this year' },
  { value: '1,200+', label: 'Hiring Corporate Partners', icon: 'briefcase', change: 'Across India & Remote' },
  { value: '125%', label: 'Average Salary Hike', icon: 'trending-up', change: 'Highest: 48 LPA' },
  { value: '4.93 / 5', label: 'Verified Student Rating', icon: 'star', change: 'Over 12,000+ Reviews' }
];

const FAQS_DATA = [
  {
    q: 'Are the classes live or recorded? What if I miss a live class?',
    a: 'All our core sessions are 100% LIVE and highly interactive with direct voice & chat Q&A. However, every live session is recorded in HD 1080p and uploaded to your student LMS dashboard within 2 hours with detailed timestamps, code repositories, and slide notes for lifetime revision.'
  },
  {
    q: 'How does the No-Cost EMI payment option work?',
    a: 'We have partnered with major Indian banks and NBFCs (HDFC, ICICI, SBI, Axis, Bajaj Finserv, Razorpay Capital) to provide 0% interest EMI for 3, 6, 9, or 12 months with zero processing fees. You only pay the exact course price split evenly across your chosen months.'
  },
  {
    q: 'What is the 100% Placement Support Guarantee process?',
    a: 'Once you complete 80% of course milestones and pass our internal exit assessment, you are assigned a dedicated Career Coach. We provide resume overhauls, LinkedIn optimization, unlimited 1-on-1 mock interviews, and direct referrals through our exclusive network of 1,200+ hiring partners.'
  },
  {
    q: 'Can I get a refund if I am not satisfied with the course?',
    a: 'Yes! We offer a 7-Day No-Questions-Asked 100% Money-Back Guarantee from your first live class. If you feel the curriculum or teaching methodology does not meet your expectations, simply send a one-line email to support@coursenexus.in or WhatsApp your counselor.'
  },
  {
    q: 'Will I get an industry-recognized certificate?',
    a: 'Yes! Upon successful completion of projects and assignments, you will receive a verifiable, QR-coded ISO 9001:2015 accredited Certificate of Excellence with a unique credential URL shareable directly on LinkedIn and resumes.'
  }
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    COURSE_CATEGORIES,
    COURSES_DATA,
    QUIZ_QUESTIONS,
    PLACEMENT_STORIES,
    HIRING_PARTNERS,
    STATS_DATA,
    FAQS_DATA
  };
}
