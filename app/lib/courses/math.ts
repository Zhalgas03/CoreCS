import { Course } from "./types"

export const mathCourses: Course[] = [
     {
  slug: "discrete-mathematics",
  level: "Intermediate",
  category: "math",
  catalog: {
    title: "Discrete Mathematics",
    author: "CoreCS Team",
    coverUrl: "/covers/discrete-mathematics.png",
    rating: 4.8,
    reviewsCount: 2_100,
    durationHours: 42,
  },

  hero: {
    title: "Discrete Mathematics",
    tagline: "Mathematical foundations of computer science",
    description:
      "Discrete Mathematics provides the formal mathematical foundations required to understand algorithms, data structures, cryptography, and computer systems. The course focuses on sets, relations, graphs, logic, algebraic structures, and counting techniques used throughout computer science.",
    format: "Structured theoretical course",
    bundle: "Core Computer Science",
  },

  pricing: {
    price: 12.99,
    currency: "EUR",
  },

  learningOutcomes: [
    "work confidently with sets, relations, and functions",
    "understand graphs and their matrix representations",
    "apply mathematical induction to prove statements",
    "reason about Boolean logic and logical implication",
    "use algebraic structures such as groups and finite fields",
    "apply modular arithmetic and number theory concepts",
    "solve counting problems using combinatorics",
    "understand mathematical foundations behind cryptography",
  ],

  about: {
    paragraphs: [
      "Discrete Mathematics is a core subject in computer science that studies mathematical structures which are fundamentally discrete rather than continuous.",
      "This course builds a rigorous foundation for understanding algorithms, data structures, databases, security, and theoretical aspects of computing.",
      "The material follows an academic approach, combining theory, formal definitions, proofs, and problem-solving techniques widely used in computer science.",
    ],
  },

  whyStudy: {
    intro:
      "Many key concepts in computer science rely on discrete mathematical reasoning rather than continuous mathematics.",
    benefits: [
      "build strong analytical and problem-solving skills",
      "understand the theory behind algorithms and data structures",
      "gain mathematical maturity required for advanced CS topics",
      "prepare for subjects such as algorithms, cryptography, and complexity theory",
    ],
  },

  targetAudience: [
    "computer science students",
    "software engineering students",
    "learners preparing for algorithms and data structures",
    "anyone seeking strong mathematical foundations in computing",
  ],

  prerequisites: [
    "basic high-school mathematics",
    "comfort with algebraic notation",
    "willingness to reason abstractly",
  ],

  howItWorks: [
    "each topic is introduced with precise definitions",
    "concepts are illustrated with examples and diagrams",
    "theoretical results are supported by proofs",
    "exercises reinforce understanding and problem-solving skills",
  ],

  curriculum: [
    {
      title: "Sets, Relations, and Functions",
      focus: "fundamental discrete structures",
      topics: [
        "Set notation and representations",
        "Operations on sets",
        "Cartesian product",
        "Relations and their properties",
        "Equivalence relations and partitions",
        "Functions and mappings",
        "Proof by induction",
      ],
    },
    {
      title: "Graphs and Matrices",
      focus: "graph theory foundations",
      topics: [
        "Graphs and graph representations",
        "Adjacency matrices",
        "Walks and paths in graphs",
        "Graph connectivity",
        "Matrix powers and graph walks",
      ],
    },
    {
      title: "Discrete Algebra",
      focus: "algebraic structures in computing",
      topics: [
        "Groups and fields",
        "Binary vectors",
        "Polynomials over finite fields",
        "Irreducible polynomials",
        "Applications to finite fields",
        "Linear Feedback Shift Registers (LFSR)",
      ],
    },
    {
      title: "Boolean Functions and Logic",
      focus: "logic and reasoning",
      topics: [
        "Boolean functions",
        "Logical operators",
        "Implication and equivalence",
        "Truth tables",
        "Boolean logic in information technology",
      ],
    },
    {
      title: "Clock Arithmetic and Number Theory",
      focus: "modular arithmetic",
      topics: [
        "Arithmetic modulo n",
        "Prime numbers and coprimality",
        "Linear equations in modular arithmetic",
        "Chinese Remainder Theorem",
        "Applications to cryptography",
      ],
    },
    {
      title: "Counting and Combinatorics",
      focus: "enumeration techniques",
      topics: [
        "Fibonacci sequences",
        "Inclusion–Exclusion principle",
        "Permutations and combinations",
        "Counting with repetition",
        "Pascal triangle and binomial theorem",
      ],
    },
  ],
}
,
  {

  slug: "mathematics-for-data-analysis",
  level: "Beginner",
    category: "math",
  catalog: {
    title: "Mathematics for Data Analysis",
    author: "CoreCS Team",
    coverUrl: "/covers/mathematics-for-data-analysis.png",
    rating: 4.8,
    reviewsCount: 2_100,
    durationHours: 32,
  },

  hero: {
    title: "Mathematics for Data Analysis",
    tagline: "Mathematical foundations for understanding and modeling data",
    description:
      "This course introduces the fundamental mathematical concepts behind data analysis. It focuses on how data are collected, cleaned, explored, modeled, and interpreted using linear algebra, statistics, probability theory, and regression techniques. The emphasis is on understanding the principles behind data-driven reasoning rather than black-box methods.",
    format: "Academic-style online course",
    bundle: "Core Computer Science",
  },

  pricing: {
    price: 12.99,
    currency: "EUR",
  },

  learningOutcomes: [
    "understand what data analysis is and why it is essential in modern decision-making",
    "analyze data using descriptive statistical measures",
    "apply basic probability theory to interpret uncertainty",
    "model relationships between variables using regression techniques",
    "understand the role of data cleaning and preprocessing",
    "interpret analytical results critically rather than mechanically",
    "recognize the limits of purely data-driven approaches",
  ],

  about: {
    paragraphs: [
      "Data analysis is a mathematical process for collecting, cleaning, transforming, and modeling data to extract useful and compact information.",
      "This course presents data analysis as a structured process, starting from raw data and ending with interpretation and decision-making.",
      "Rather than focusing on tools alone, the course emphasizes mathematical reasoning and conceptual understanding behind analytical techniques.",
    ],
  },

  whyStudy: {
    intro:
      "In a world dominated by data-driven decisions, understanding the mathematical foundations of data analysis is crucial to avoid blind reliance on algorithms.",
    benefits: [
      "build solid analytical intuition grounded in mathematics",
      "understand why analytical methods work, not just how to apply them",
      "avoid common misinterpretations of data and statistics",
      "prepare for more advanced topics such as machine learning and data mining",
    ],
  },

  targetAudience: [
    "students of Computer Science, Data Science, or related fields",
    "learners approaching data analysis from a mathematical perspective",
    "future data scientists who want strong theoretical foundations",
    "anyone interested in understanding how data-driven decisions are made",
  ],

  prerequisites: [
    "basic calculus",
    "elementary linear algebra",
    "basic familiarity with mathematical notation",
  ],

  howItWorks: [
    "concepts are introduced gradually through theory-driven explanations",
    "real-life examples illustrate abstract mathematical ideas",
    "emphasis on reasoning and interpretation rather than software-specific tools",
    "connections between mathematics, statistics, and data science are highlighted",
  ],

  curriculum: [
    {
      title: "Introduction to Data Analysis",
      focus: "foundations and motivation",
      topics: [
        "What is data analysis",
        "Data analysis in everyday life",
        "The role of data in decision-making",
        "Limits of data-driven reasoning",
      ],
    },
    {
      title: "Data Analysis Process",
      focus: "from raw data to decisions",
      topics: [
        "Data requirement gathering",
        "Data collection",
        "Data processing and organization",
        "Data cleaning",
        "Exploratory data analysis",
        "Data interpretation and visualization",
      ],
    },
    {
      title: "Descriptive Statistics",
      focus: "summarizing data",
      topics: [
        "Measures of central tendency",
        "Measures of dispersion",
        "Frequency distributions",
        "Descriptive analysis vs inferential analysis",
      ],
    },
    {
      title: "Probability Theory",
      focus: "modeling uncertainty",
      topics: [
        "Random variables",
        "Probability distributions",
        "Basic probability laws",
        "Interpretation of probabilistic results",
      ],
    },
    {
      title: "Statistical and Predictive Analysis",
      focus: "understanding and forecasting",
      topics: [
        "Statistical analysis: what happened",
        "Diagnostic analysis: why it happened",
        "Predictive analysis: what may happen",
        "Prescriptive analysis: decision support",
      ],
    },
    {
      title: "Regression and Modeling",
      focus: "relationships between variables",
      topics: [
        "Regression models",
        "Data fitting techniques",
        "Residuals and errors",
        "Limits of modeling",
      ],
    },
    {
      title: "Dimensionality Reduction",
      focus: "simplifying complex data",
      topics: [
        "High-dimensional data",
        "Principal Component Analysis (PCA)",
        "Interpretation of reduced representations",
      ],
    },
  ],
}
]