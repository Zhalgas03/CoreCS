import { Course } from "./types"

export const dataScienceCourses: Course[] = [
    {
  slug: "databases",
  level: "Beginner",
category:"data-science"  ,
  catalog: {
    title: "Databases",
    author: "CoreCS Team",
    coverUrl: "/covers/databases.png",
    rating: 4.9,
    reviewsCount: 3_200,
    durationHours: 28,
  },

  hero: {
    title: "Databases",
    tagline: "From relational theory to modern NoSQL and distributed data systems",
    description:
      "This course provides a comprehensive introduction to database systems, covering relational database theory, SQL, database design, and modern NoSQL and distributed database architectures used in real-world applications.",
    format: "Structured online course",
    bundle: "Core Computer Science",
  },

  pricing: {
    price: 10.99,
    currency: "EUR",
  },

  learningOutcomes: [
    "understand what a database and a DBMS are",
    "learn the relational data model and its theoretical foundations",
    "design databases using conceptual and logical modeling techniques",
    "write SQL queries for data definition and data manipulation",
    "understand normalization and avoid redundancy in database design",
    "learn how transactions, concurrency, and recovery work",
    "understand the limitations of relational databases",
    "gain an introduction to NoSQL and distributed databases",
    "compare relational and non-relational data models",
    "understand how databases are used in modern cloud systems",
  ],

  about: {
    paragraphs: [
      "Databases are the backbone of modern software systems, supporting applications ranging from small web services to large-scale cloud platforms.",
      "This course is inspired by academic Computer Science programs and introduces both the theoretical foundations and practical aspects of database systems.",
      "You will start from classical relational databases and SQL, then progressively move toward modern topics such as distributed databases, NoSQL systems, and data architectures used in real-world environments.",
    ],
  },

  whyStudy: {
    intro:
      "Almost every software system relies on data. Understanding how databases work is essential for building reliable, scalable, and secure applications.",
    benefits: [
      "design efficient and well-structured databases",
      "avoid common modeling and performance mistakes",
      "choose the right database technology for each use case",
      "understand how modern data systems scale",
    ],
  },

  targetAudience: [
    "students of Computer Science, Data Science, or related fields",
    "beginner programmers who want to understand data storage",
    "future backend, full-stack, or data engineers",
    "anyone interested in how data systems work internally",
  ],

  prerequisites: [
    "basic programming knowledge",
    "basic understanding of how software applications work",
    "no prior database experience is required",
  ],

  howItWorks: [
    "the course is divided into clear modules with increasing complexity",
    "each topic combines theory with practical examples",
    "SQL and database concepts are introduced gradually",
    "real-world architectures and systems are discussed",
  ],

  curriculum: [
    {
      title: "Introduction to Databases",
      focus: "basic concepts and motivation",
      topics: [
        "What is data and what is a database",
        "Database Management Systems (DBMS)",
        "File systems vs databases",
        "Overview of database architectures",
      ],
    },
    {
      title: "Relational Model",
      focus: "theoretical foundations",
      topics: [
        "Relational data model",
        "Relations, tuples, and attributes",
        "Primary and foreign keys",
        "Integrity constraints",
        "Relational algebra and relational calculus",
      ],
    },
    {
      title: "Database Design",
      focus: "conceptual and logical design",
      topics: [
        "Conceptual design and ER diagrams",
        "Entities, relationships, and attributes",
        "Logical design",
        "Schema transformation",
        "Normalization",
        "Functional dependencies",
      ],
    },
    {
      title: "SQL: Data Definition and Manipulation",
      focus: "working with relational databases",
      topics: [
        "SQL overview",
        "DDL: CREATE, ALTER, DROP",
        "DML: SELECT, INSERT, UPDATE, DELETE",
        "Joins and subqueries",
        "Aggregation and grouping",
      ],
    },
    {
      title: "Transactions and Reliability",
      focus: "consistency and performance",
      topics: [
        "Transactions and ACID properties",
        "Concurrency control",
        "Isolation levels",
        "Indexes and query optimization",
        "Recovery and logging",
      ],
    },
    {
      title: "NoSQL and Distributed Databases",
      focus: "modern data systems",
      topics: [
        "Limitations of relational databases",
        "Introduction to NoSQL databases",
        "Key-value, document, column, and graph databases",
        "MongoDB fundamentals",
        "Distributed databases and scalability",
        "CAP theorem",
      ],
    },
  ],
}
,

  {
  slug: "machine-learning",
  level: "Intermediate",
category:"data-science"  ,
  catalog: {
    title: "Machine Learning",
    author: "CoreCS Team",
    coverUrl: "/covers/machine-learning.png",
    rating: 4.8,
    reviewsCount: 4_100,
    durationHours: 34,
  },

  hero: {
    title: "Machine Learning",
    tagline: "Foundations, algorithms, and real-world applications",
    description:
      "This course introduces the fundamental principles of Machine Learning, covering supervised, unsupervised, and reinforcement learning, along with practical workflows and real-world applications.",
    format: "Structured online course",
    bundle: "Data Science",
  },

  pricing: {
    price: 14.99,
    currency: "EUR",
  },

  learningOutcomes: [
    "understand what machine learning is and how it differs from traditional programming",
    "formulate machine learning problems using tasks, performance, and experience",
    "understand the machine learning workflow from data to deployment",
    "distinguish between supervised, unsupervised, and reinforcement learning",
    "apply regression and classification models",
    "understand clustering and dimensionality reduction techniques",
    "evaluate and validate machine learning models",
    "understand common real-world applications of machine learning",
  ],

  about: {
    paragraphs: [
      "Machine Learning is a core area of Artificial Intelligence that enables systems to learn from data and improve performance without being explicitly programmed.",
      "This course provides a solid foundation in Machine Learning concepts, algorithms, and workflows, following an academic approach combined with practical insights.",
      "Students will explore both the theoretical foundations and the applications of Machine Learning in domains such as computer vision, natural language processing, finance, and healthcare.",
    ],
  },

  whyStudy: {
    intro:
      "Machine Learning is at the heart of modern intelligent systems, powering applications from recommendation engines to medical diagnostics.",
    benefits: [
      "understand how learning algorithms work internally",
      "build intuition about model behavior and limitations",
      "apply machine learning to real-world problems",
      "prepare for advanced topics such as deep learning and AI systems",
    ],
  },

  targetAudience: [
    "students of Computer Science, Data Science, or related fields",
    "developers with basic programming experience",
    "learners interested in Artificial Intelligence",
    "anyone planning to work with data-driven or intelligent systems",
  ],

  prerequisites: [
    "basic programming knowledge (Python recommended)",
    "introductory understanding of algorithms",
    "basic probability and linear algebra",
  ],

  howItWorks: [
    "concepts are introduced from intuitive examples",
    "each algorithm is explained both conceptually and mathematically",
    "visual examples and real-world use cases are used extensively",
    "hands-on notebooks and datasets support learning",
  ],

  curriculum: [
    {
      title: "Introduction to Machine Learning",
      focus: "foundations and motivation",
      topics: [
        "What is Machine Learning",
        "Machine Learning vs traditional programming",
        "Tasks, performance, and experience (P, T, E)",
        "Examples of learning systems",
      ],
    },
    {
      title: "Machine Learning Workflow",
      focus: "end-to-end process",
      topics: [
        "Problem formulation",
        "Data collection and curation",
        "Data analysis and visualization",
        "Feature engineering",
        "Training and evaluation",
        "Deployment and monitoring",
      ],
    },
    {
      title: "Supervised Learning",
      focus: "learning from labeled data",
      topics: [
        "Regression problems",
        "Linear regression",
        "Classification problems",
        "Logistic regression",
        "Decision trees",
        "Support Vector Machines (SVM)",
      ],
    },
    {
      title: "Unsupervised Learning",
      focus: "discovering structure in data",
      topics: [
        "Clustering",
        "K-Means algorithm",
        "Hierarchical clustering",
        "Dimensionality reduction",
        "Principal Component Analysis (PCA)",
      ],
    },
    {
      title: "Reinforcement Learning",
      focus: "learning from interaction",
      topics: [
        "Agent and environment",
        "Rewards and policies",
        "Examples of reinforcement learning",
        "Applications in games and robotics",
      ],
    },
    {
      title: "Applications of Machine Learning",
      focus: "real-world use cases",
      topics: [
        "Image recognition",
        "Natural Language Processing",
        "Fraud detection",
        "Recommendation systems",
        "Medical and scientific applications",
        "Generative models",
      ],
    },
  ],
}
,
{
  slug: "data-mining-analytics",
  level: "Intermediate",
category:"data-science"  ,
  catalog: {
    title: "Data Mining & Analytics",
    author: "CoreCS Team",
    coverUrl: "/covers/data-mining.png",
    rating: 4.8,
    reviewsCount: 2_100,
    durationHours: 36,
  },

  hero: {
    title: "Data Mining & Analytics",
    tagline: "From raw data to predictive and explanatory models",
    description:
      "Learn how to extract knowledge from data using modern data mining and machine learning techniques. This course covers data preprocessing, supervised and unsupervised learning, model evaluation, and real-world applications including images and complex datasets.",
    format: "Structured academic-style course",
    bundle: "Core Computer Science",
  },

  pricing: {
    price: 14.99,
    currency: "EUR",
  },

  learningOutcomes: [
    "understand the goals and scope of data mining and data analytics",
    "distinguish between data mining, machine learning, and statistics",
    "prepare and clean real-world datasets for analysis",
    "apply supervised learning techniques for classification and regression",
    "apply unsupervised learning techniques such as clustering",
    "evaluate models using proper validation strategies",
    "understand bias–variance tradeoff and generalization",
    "work with high-dimensional data and dimensionality reduction methods",
    "design and implement a complete data mining pipeline",
  ],

  about: {
    paragraphs: [
      "Data Mining and Analytics is a multidisciplinary field focused on discovering patterns, structures, and useful knowledge from data.",
      "This course provides a solid theoretical foundation combined with practical methodologies used in modern machine learning systems.",
      "Inspired by university-level programs, the course emphasizes understanding why algorithms work, not just how to use them.",
    ],
  },

  whyStudy: {
    intro:
      "Modern decision-making systems rely on extracting insights from large and complex datasets. Data mining techniques power applications from recommendation systems to medical diagnosis.",
    benefits: [
      "build predictive models from real-world data",
      "understand strengths and limitations of machine learning algorithms",
      "avoid common pitfalls such as overfitting and data leakage",
      "apply analytics methods across multiple domains",
    ],
  },

  targetAudience: [
    "students of Computer Science, Data Science, or Engineering",
    "learners with basic programming experience",
    "future data scientists and machine learning engineers",
    "anyone interested in understanding how data-driven systems work",
  ],

  prerequisites: [
    "basic programming knowledge",
    "introductory understanding of algorithms",
    "basic linear algebra and probability",
  ],

  howItWorks: [
    "each topic is introduced from first principles",
    "theoretical concepts are followed by practical examples",
    "real datasets and case studies are discussed",
    "progressive path from fundamentals to advanced topics",
    "final project to integrate all concepts",
  ],

  curriculum: [
    {
      title: "Introduction to Data Mining and Analytics",
      focus: "foundations and motivation",
      topics: [
        "What is data mining",
        "Data mining vs machine learning vs data analytics",
        "Statistical models vs machine learning models",
        "Common application domains",
      ],
    },
    {
      title: "Data Types and Data Preparation",
      focus: "working with real-world data",
      topics: [
        "Types of data and data sources",
        "Data representation",
        "Data preprocessing pipeline",
        "Data cleaning",
        "Feature engineering and selection",
      ],
    },
    {
      title: "Data Exploration and Visualization",
      focus: "understanding data structure",
      topics: [
        "Exploratory Data Analysis (EDA)",
        "Correlation analysis",
        "Data visualization principles",
      ],
    },
    {
      title: "Supervised Learning",
      focus: "learning from labeled data",
      topics: [
        "Nearest neighbor methods",
        "Regression models",
        "Gradient descent",
        "Decision trees and ensemble methods",
        "Generalization and regularization",
      ],
    },
    {
      title: "Unsupervised Learning",
      focus: "discovering hidden structures",
      topics: [
        "Clustering methods",
        "Similarity measures",
        "Dimensionality reduction",
        "Feature transformation",
      ],
    },
    {
      title: "Model Evaluation and Selection",
      focus: "reliable machine learning",
      topics: [
        "Cross validation",
        "Evaluation metrics",
        "Bias–variance tradeoff",
        "Model comparison",
      ],
    },
    {
      title: "Advanced Topics",
      focus: "real-world applications",
      topics: [
        "Data mining on images",
        "Neural networks",
        "Convolutional Neural Networks (CNNs)",
        "High-dimensional data",
      ],
    },
    {
      title: "Final Project",
      focus: "end-to-end data mining workflow",
      topics: [
        "Problem formulation",
        "Dataset creation and preparation",
        "Model selection and training",
        "Evaluation and interpretation",
      ],
    },
  ],
}

]