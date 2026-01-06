import { cover } from "../storage"
import { Course } from "./types"

export const programmingCourses: Course[] = [
    {
  slug: "programming-fundamentals",
  level: "Beginner",
category: "programming" ,
  catalog: {
    title: "Programming Fundamentals",
    author: "CoreCS Team",
    coverUrl: cover("courses/programming-fundamentals.png"),
    rating: 4.7,
    reviewsCount: 3_100,
    durationHours: 40,
  },

  hero: {
    title: "Programming Fundamentals",
    tagline: "Your first step into computer programming with C",
    description:
      "This course introduces the fundamental concepts of computer programming using the C language. It is designed as a first programming course and requires no prior experience. Students learn how computers execute programs, how to design simple algorithms, and how to implement them using structured imperative programming.",
    format: "Structured online course",
    bundle: "Core Computer Science",
  },

  pricing: {
    price: 11.99,
    currency: "EUR",
  },

  learningOutcomes: [
    "understand how a computer executes a program",
    "learn the basic structure of a C program",
    "use variables, data types, and arithmetic expressions",
    "write conditional statements and loops",
    "design simple algorithms to solve problems",
    "work with arrays, functions, and basic data structures",
    "understand memory concepts such as pointers",
    "compile, run, and debug C programs",
  ],

  about: {
    paragraphs: [
      "Programming Fundamentals is an introductory course designed for students with no prior background in computer science.",
      "The course introduces the classical model of computation, programming languages, and the compilation process before focusing on structured imperative programming in C.",
      "Through lectures and laboratory exercises, students gradually build the skills needed to design algorithms and translate them into working programs.",
    ],
  },

  whyStudy: {
    intro:
      "Programming is a core skill in computer science and data-related disciplines. This course provides the essential foundation required to understand how software works at a low level.",
    benefits: [
      "build a solid mental model of how programs run on a computer",
      "develop problem-solving and algorithmic thinking skills",
      "gain hands-on experience with a real systems programming language",
      "prepare for advanced courses in algorithms, systems, and software engineering",
    ],
  },

  targetAudience: [
    "students with no prior programming experience",
    "first-year Computer Science students",
    "learners interested in understanding how software works internally",
    "anyone starting a technical path in computing",
  ],

  prerequisites: [
    "no prior programming knowledge is required",
    "basic familiarity with using a computer",
  ],

  howItWorks: [
    "lectures introduce core concepts and theoretical foundations",
    "laboratory sessions focus on hands-on programming exercises",
    "students write and test C programs incrementally",
    "practical assignments reinforce concepts learned in lectures",
  ],

  curriculum: [
    {
      title: "Introduction to Computing and Programming",
      focus: "basic concepts and terminology",
      topics: [
        "What is a computer",
        "Von Neumann architecture",
        "Programs and algorithms",
        "Programming languages overview",
        "Compilation and execution model",
      ],
    },
    {
      title: "C Language Basics",
      focus: "first programs",
      topics: [
        "Structure of a C program",
        "The main function",
        "Standard input and output",
        "Using printf",
        "Comments and formatting",
      ],
    },
    {
      title: "Variables and Data Types",
      focus: "data representation",
      topics: [
        "Variables and memory",
        "Fundamental data types",
        "Arithmetic expressions",
        "Assignments and operators",
        "Input and output formatting",
      ],
    },
    {
      title: "Control Flow",
      focus: "program logic",
      topics: [
        "Conditional statements",
        "Decision making",
        "Loops",
        "Program execution flow",
      ],
    },
    {
      title: "Functions and Modular Programming",
      focus: "program structure",
      topics: [
        "Defining and calling functions",
        "Parameters and return values",
        "Scope and lifetime of variables",
        "Code modularity",
      ],
    },
    {
      title: "Arrays and Strings",
      focus: "collections of data",
      topics: [
        "Arrays",
        "Iterating over arrays",
        "Strings in C",
        "Common array and string operations",
      ],
    },
    {
      title: "Pointers and Memory",
      focus: "low-level programming concepts",
      topics: [
        "Memory addresses",
        "Pointers and dereferencing",
        "Pointers and arrays",
        "Basic memory management concepts",
      ],
    },
    {
      title: "Structures and Files",
      focus: "structured data and I/O",
      topics: [
        "Structures",
        "User-defined data types",
        "File input and output",
        "Working with structured data",
      ],
    },
  ],
},
  {
  slug: "algorithms-and-data-structures",
  level: "Intermediate",
category: "programming" ,
  catalog: {
    title: "Algorithms and Data Structures",
    author: "CoreCS Team",
    coverUrl: cover("courses/algorithms.png"),  
    rating: 4.8,
    reviewsCount: 2_600,
    durationHours: 55,
  },

  hero: {
    title: "Algorithms and Data Structures",
    tagline: "Learn algorithmic thinking with Python",
    description:
      "This course introduces the fundamental principles of algorithms and data structures using Python. Students learn how to design, analyze, and implement efficient algorithms, understand data organization, and develop strong problem-solving skills essential for computer science and data-related fields.",
    format: "Structured online course",
    bundle: "Core Computer Science",
  },

  pricing: {
    price: 14.99,
    currency: "EUR",
  },

  learningOutcomes: [
    "understand what an algorithm is and how to formally describe it",
    "develop algorithmic and computational thinking",
    "analyze algorithm correctness and efficiency",
    "use Python as a tool to implement algorithms",
    "work with fundamental data structures such as lists, dictionaries, sets, and tuples",
    "design algorithms using iteration and recursion",
    "apply problem-solving strategies to real computational problems",
    "prepare for advanced courses in data science, machine learning, and systems",
  ],

  about: {
    paragraphs: [
      "Algorithms and Data Structures form the theoretical and practical foundation of computer science.",
      "This course focuses on teaching students how to reason about problems algorithmically and how to translate those solutions into efficient Python programs.",
      "The course emphasizes clarity, correctness, and efficiency, combining theoretical explanations with hands-on programming exercises.",
    ],
  },

  whyStudy: {
    intro:
      "Efficient algorithms are at the core of modern software systems, from search engines to data analysis pipelines.",
    benefits: [
      "learn how to approach complex problems systematically",
      "write efficient and readable code",
      "understand performance trade-offs in software design",
      "build a strong foundation for advanced CS and data courses",
    ],
  },

  targetAudience: [
    "students who completed an introductory programming course",
    "Computer Science and Data Science students",
    "learners who want to strengthen algorithmic thinking",
    "anyone preparing for technical interviews or advanced studies",
  ],

  prerequisites: [
    "basic programming knowledge",
    "familiarity with variables, conditionals, and loops",
    "basic mathematical reasoning",
  ],

  howItWorks: [
    "lectures introduce algorithmic concepts and formal reasoning",
    "Python is used as the main implementation language",
    "examples gradually increase in complexity",
    "exercises reinforce both theory and practice",
  ],

  curriculum: [
    {
      title: "Introduction to Algorithms and Python",
      focus: "foundations",
      topics: [
        "What is an algorithm",
        "Problem-solving strategies",
        "Python as an algorithmic language",
        "Execution model and interpretation",
        "Computational thinking",
      ],
    },
    {
      title: "Variables, Expressions, and Control Flow",
      focus: "program structure",
      topics: [
        "Variables and assignments",
        "Expressions and operators",
        "Conditionals",
        "Loops",
        "Program execution flow",
      ],
    },
    {
      title: "Functions and Recursion",
      focus: "abstraction and decomposition",
      topics: [
        "Defining and calling functions",
        "Parameters and return values",
        "Local and global variables",
        "Recursion and base cases",
        "Recursive problem solving",
      ],
    },
    {
      title: "Basic Data Structures",
      focus: "data organization",
      topics: [
        "Lists",
        "Tuples",
        "Dictionaries",
        "Sets",
        "Mutability and immutability",
      ],
    },
    {
      title: "Algorithms on Sequences",
      focus: "processing data",
      topics: [
        "Traversing sequences",
        "Searching",
        "Counting and aggregation",
        "Mapping and filtering",
        "Reduce patterns",
      ],
    },
    {
      title: "Complex Data Structures",
      focus: "structured data",
      topics: [
        "Nested data structures",
        "Dictionaries of lists",
        "Tuples as keys",
        "Aliasing and references",
        "Memory behavior in Python",
      ],
    },
    {
      title: "Efficiency and Problem Solving",
      focus: "algorithmic quality",
      topics: [
        "Correctness of algorithms",
        "Efficiency intuition",
        "Iterative vs recursive solutions",
        "Algorithm design patterns",
        "Real-world problem examples",
      ],
    },
  ],
}
,
  {
  slug: "object-oriented-programming",
  level: "Intermediate",
category: "programming" ,
  catalog: {
    title: "Object-Oriented Programming",
    author: "CoreCS Team",
    coverUrl: cover("courses/oop.png"),
    rating: 4.8,
    reviewsCount: 2_600,
    durationHours: 72,
  },

  hero: {
    title: "Object-Oriented Programming",
    tagline: "From structured programming to modern object-oriented design in Java",
    description:
      "This course introduces Object-Oriented Programming (OOP) as a paradigm for designing complex software systems. Starting from the limits of structured programming, students learn how to model real-world problems using classes, objects, and interactions. The course focuses on Java and covers core OOP principles, language mechanisms, and software design techniques.",
    format: "Structured online course",
    bundle: "Core Computer Science",
  },

  pricing: {
    price: 19.99,
    currency: "EUR",
  },

  learningOutcomes: [
    "understand the object-oriented programming paradigm",
    "apply core OOP principles such as encapsulation and abstraction",
    "design software using classes, objects, and interfaces",
    "use inheritance and polymorphism correctly",
    "write robust Java programs with exception handling",
    "work with files and streams in Java",
    "understand concurrency and multithreading basics",
    "design and implement a complete OOP project in Java",
  ],

  about: {
    paragraphs: [
      "Object-Oriented Programming is one of the most widely used paradigms for building complex and maintainable software systems.",
      "In this course, students move from structured and imperative programming toward object-oriented design, learning how to model systems as interacting objects.",
      "The course emphasizes both theoretical foundations and practical Java programming, culminating in a large project that applies all learned OOP concepts.",
    ],
  },

  whyStudy: {
    intro:
      "Modern software systems are built using object-oriented principles. Mastering OOP is essential for writing scalable, maintainable, and reusable code.",
    benefits: [
      "design software that reflects real-world domains",
      "reduce complexity through abstraction and modularity",
      "reuse and extend existing code safely",
      "prepare for advanced software engineering and system design courses",
    ],
  },

  targetAudience: [
    "Computer Science students",
    "learners with prior experience in structured programming",
    "future software engineers",
    "developers transitioning to Java and OOP",
  ],

  prerequisites: [
    "basic programming knowledge",
    "familiarity with imperative and structured programming",
    "basic understanding of data structures",
    "introductory knowledge of computer architecture and operating systems",
  ],

  howItWorks: [
    "lectures introduce OOP concepts and theoretical foundations",
    "hands-on labs focus on Java programming",
    "incremental development of object-oriented designs",
    "a final project integrates all OOP principles",
  ],

  curriculum: [
    {
      title: "Programming Paradigms and Languages",
      focus: "foundations",
      topics: [
        "What is a programming language",
        "High-level vs low-level languages",
        "Programming paradigms overview",
        "Imperative and structured programming",
        "Limits of procedural approaches",
      ],
    },
    {
      title: "Introduction to Object-Oriented Programming",
      focus: "oop fundamentals",
      topics: [
        "From structured programming to OOP",
        "Abstract data types",
        "Classes and objects",
        "Interfaces",
        "Object interactions",
      ],
    },
    {
      title: "Core OOP Principles",
      focus: "design concepts",
      topics: [
        "Encapsulation",
        "Information hiding",
        "Abstraction",
        "Inheritance",
        "Polymorphism",
        "Composition vs inheritance",
      ],
    },
    {
      title: "Java Language Fundamentals",
      focus: "java oop",
      topics: [
        "Java syntax and first programs",
        "The Java compiler and JVM",
        "Bytecode and execution model",
        "Classes and methods in Java",
        "Control structures and arrays",
      ],
    },
    {
      title: "Advanced Java OOP",
      focus: "language mechanisms",
      topics: [
        "Inheritance and method overriding",
        "Polymorphism in Java",
        "Interfaces and abstract classes",
        "Packages and modularity",
      ],
    },
    {
      title: "Exceptions and Error Handling",
      focus: "robust software",
      topics: [
        "Exception hierarchy",
        "Checked and unchecked exceptions",
        "Exception handling strategies",
        "Designing fault-tolerant software",
      ],
    },
    {
      title: "Files, Streams, and I/O",
      focus: "input and output",
      topics: [
        "File handling in Java",
        "Streams and buffers",
        "Text and binary files",
        "Object serialization",
      ],
    },
    {
      title: "Concurrency and Threads",
      focus: "parallel execution",
      topics: [
        "Threads and processes",
        "Thread lifecycle",
        "Synchronization",
        "Concurrency issues and solutions",
      ],
    },
    {
      title: "OOP Project",
      focus: "practical application",
      topics: [
        "Project proposal and validation",
        "Designing a complex OOP system",
        "Applying all OOP principles",
        "Final report and oral discussion",
      ],
    },
  ],
}
,
 {
  slug: "software-engineering",
  level: "Intermediate",
category: "programming" ,
  catalog: {
    title: "Software Engineering",
    author: "CoreCS Team",
    coverUrl: cover("courses/software-engineering.png"),
    rating: 4.8,
    reviewsCount: 2_400,
    durationHours: 48,
  },

  hero: {
    title: "Software Engineering",
    tagline: "Design, build, and evolve complex software systems",
    description:
      "This course provides a comprehensive introduction to Software Engineering, covering principles, processes, and techniques used to design, develop, test, deploy, and maintain complex software systems. Inspired by academic Computer Science programs, it focuses on both theoretical foundations and real-world practices such as Agile, DevOps, software architecture, and quality assurance.",
    format: "Structured online course",
    bundle: "Core Computer Science",
  },

  pricing: {
    price: 14.99,
    currency: "EUR",
  },

  learningOutcomes: [
    "understand what software engineering is and why it matters",
    "analyze software quality attributes and trade-offs",
    "apply core software engineering principles",
    "understand and compare software development processes",
    "elicit, analyze, and document software requirements",
    "design software architectures and apply design patterns",
    "model software systems using UML",
    "understand software testing, verification, and validation",
    "manage software evolution, maintenance, and reuse",
    "gain awareness of real-world software engineering challenges",
  ],

  about: {
    paragraphs: [
      "Software Engineering is the discipline concerned with the systematic development, operation, and maintenance of software systems.",
      "This course introduces fundamental concepts, methodologies, and techniques used to engineer reliable, maintainable, and scalable software.",
      "Students explore the full software lifecycle, from requirements and design to testing, deployment, evolution, and reuse, with a strong emphasis on complex software systems.",
    ],
  },

  whyStudy: {
    intro:
      "Modern society relies on large and complex software systems. Understanding how these systems are engineered is essential for building reliable and sustainable technology.",
    benefits: [
      "understand how real-world software systems are designed and managed",
      "learn to reason about software quality and trade-offs",
      "gain a structured view of the software lifecycle",
      "prepare for careers in software development, architecture, and engineering",
    ],
  },

  targetAudience: [
    "Computer Science students",
    "Software Engineering students",
    "developers who want a structured view of software engineering",
    "learners interested in large-scale software systems",
  ],

  prerequisites: [
    "basic programming knowledge",
    "familiarity with programming languages",
    "basic understanding of software development",
  ],

  howItWorks: [
    "lectures introduce theoretical foundations and concepts",
    "real-world examples illustrate engineering trade-offs",
    "case studies of complex software systems",
    "project-oriented approach aligned with academic standards",
  ],

  curriculum: [
    {
      title: "Introduction to Software Engineering",
      focus: "foundations and scope",
      topics: [
        "What is Software Engineering",
        "Software systems and complexity",
        "Software lifecycle overview",
        "Roles and responsibilities in software projects",
      ],
    },
    {
      title: "Software Qualities and Principles",
      focus: "quality and design thinking",
      topics: [
        "Software quality attributes",
        "Maintainability, reliability, scalability",
        "Core software engineering principles",
        "Trade-offs in software design",
      ],
    },
    {
      title: "Software Development Processes",
      focus: "process models",
      topics: [
        "Software process models",
        "Plan-driven development",
        "Agile development",
        "DevOps",
        "Process cycles and activities",
        "Conway’s Law",
      ],
    },
    {
      title: "Requirements Engineering",
      focus: "understanding the problem",
      topics: [
        "Feasibility studies",
        "Functional and non-functional requirements",
        "User and system requirements",
        "Requirements elicitation and analysis",
        "Requirements validation and management",
      ],
    },
    {
      title: "Software Design and Architecture",
      focus: "system structure",
      topics: [
        "Architectural design",
        "Software architectures",
        "Design patterns",
        "Architectural styles",
      ],
    },
    {
      title: "Software Modeling",
      focus: "model-driven development",
      topics: [
        "Introduction to UML",
        "Use case diagrams",
        "Class and object diagrams",
        "Interaction diagrams",
        "State and activity diagrams",
        "Model-driven engineering",
      ],
    },
    {
      title: "Development, Reuse, and CBSE",
      focus: "building software",
      topics: [
        "Rapid software development",
        "Software reuse",
        "Component-Based Software Engineering (CBSE)",
        "Service-oriented architectures",
      ],
    },
    {
      title: "Software Testing and Quality Assurance",
      focus: "verification and validation",
      topics: [
        "Software testing fundamentals",
        "Verification vs validation",
        "Testing strategies and levels",
        "Quality assurance",
      ],
    },
    {
      title: "Evolution, Maintenance, and Deployment",
      focus: "long-term software life",
      topics: [
        "Software evolution",
        "Maintenance strategies",
        "Release and deployment",
        "Operation and monitoring",
        "Infrastructure as Code",
        "Software product lines",
      ],
    },
  ],
}
,
  {
  slug: "web-programming",
  level: "Intermediate",
category: "programming" ,
  catalog: {
    title: "Web Programming",
    author: "CoreCS Team",
    coverUrl: cover("courses/web-programming.png"),
    rating: 4.8,
    reviewsCount: 4_200,
    durationHours: 60,
  },

  hero: {
    title: "Web Programming",
    tagline: "From the foundations of the Web to full-stack web applications",
    description:
      "This course provides a comprehensive introduction to Web Programming, covering both client-side and server-side technologies. Students learn how the Web works under the hood and how to design, develop, and secure modern web applications following the Web 2.0 paradigm.",
    format: "Structured online course",
    bundle: "Core Computer Science",
  },

  pricing: {
    price: 19.99,
    currency: "EUR",
  },

  learningOutcomes: [
    "understand the architecture and evolution of the World Wide Web",
    "build static and dynamic web pages using HTML5 and CSS3",
    "design responsive layouts with modern CSS techniques",
    "program interactive client-side behavior using JavaScript",
    "apply object-oriented principles in JavaScript",
    "develop server-side applications using PHP",
    "connect web applications to relational databases",
    "implement authentication, validation, and error handling",
    "understand web security threats and mitigation techniques",
    "consume and implement RESTful web services",
    "design complete web applications following best practices",
  ],

  about: {
    paragraphs: [
      "Web Programming is a core subject for students interested in software development, data-driven applications, and modern distributed systems.",
      "The course introduces the fundamental concepts behind the Web, starting from its history and architecture, and progressively moves toward practical development of full-stack web applications.",
      "Both client-side and server-side technologies are covered, with a strong emphasis on standards, scalability, usability, and security.",
      "Practical exercises and projects complement the theoretical foundations, helping students gain hands-on experience with real-world web technologies.",
    ],
  },

  whyStudy: {
    intro:
      "The Web is the primary platform for modern software systems. Understanding how web applications are built and how they operate internally is essential for any software engineer or data professional.",
    benefits: [
      "gain a solid understanding of how the Web works end-to-end",
      "learn industry-standard web technologies and practices",
      "build real, data-driven web applications",
      "acquire skills applicable to backend, frontend, and full-stack roles",
      "prepare for advanced topics such as distributed systems and cloud computing",
    ],
  },

  targetAudience: [
    "Computer Science and Data Science students",
    "students with basic programming experience",
    "future backend or full-stack developers",
    "anyone interested in understanding modern web technologies",
  ],

  prerequisites: [
    "basic programming knowledge",
    "familiarity with algorithms and data structures",
    "basic understanding of how software applications work",
  ],

  howItWorks: [
    "lectures introduce theoretical foundations and standards",
    "examples illustrate real-world web development scenarios",
    "hands-on exercises reinforce client-side and server-side concepts",
    "a final project integrates all parts of the course",
  ],

  curriculum: [
    {
      title: "Introduction to the Web",
      focus: "foundations and architecture",
      topics: [
        "History of the Internet and the World Wide Web",
        "From the Internet to the Web",
        "Web architecture and scalability",
        "Web standards and evolution",
        "Web 2.0, Mobile Web, and Cloud architectures",
      ],
    },
    {
      title: "HTML and CSS",
      focus: "structure and presentation",
      topics: [
        "HTML syntax and document structure",
        "HTML5 semantic elements",
        "CSS fundamentals",
        "CSS3 features",
        "Responsive design principles",
        "Advanced CSS layouts",
      ],
    },
    {
      title: "Client-Side Programming",
      focus: "interactivity and behavior",
      topics: [
        "Introduction to JavaScript",
        "JavaScript language fundamentals",
        "DOM manipulation",
        "Events and client-side logic",
        "Object-oriented programming in JavaScript",
        "Using JavaScript libraries and frameworks",
      ],
    },
    {
      title: "Server-Side Programming with PHP",
      focus: "backend development",
      topics: [
        "Introduction to server-side scripting",
        "PHP syntax and control structures",
        "Arrays and functions in PHP",
        "Object-oriented PHP",
        "PHP for web applications",
        "Error handling and validation",
      ],
    },
    {
      title: "Databases and Web Applications",
      focus: "data-driven systems",
      topics: [
        "Relational databases for the Web",
        "PHP and MySQL integration",
        "Executing queries from web applications",
        "Managing application state",
        "Working with structured data",
      ],
    },
    {
      title: "Web Security",
      focus: "reliability and protection",
      topics: [
        "Common web security vulnerabilities",
        "Input validation and sanitization",
        "Authentication and authorization",
        "Secure session management",
        "Best practices for secure web applications",
      ],
    },
    {
      title: "Web Services and Application Design",
      focus: "modern architectures",
      topics: [
        "Introduction to web services",
        "RESTful services",
        "SOAP and WSDL overview",
        "Information architecture and usability principles",
        "Web application design patterns",
      ],
    },
    {
      title: "Web and Mobile Applications",
      focus: "cross-platform development",
      topics: [
        "Web programming environments and tools",
        "Using containers and development environments",
        "Introduction to mobile web applications",
        "Multi-platform development concepts",
        "Overview of mobile frameworks",
      ],
    },
  ],
}
]