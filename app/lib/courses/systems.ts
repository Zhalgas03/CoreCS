import { Course } from "./types"

export const systemsCourses: Course[] = [
      {
  slug: "operating-systems",
  level: "Intermediate",
category: "systems" ,
  catalog: {
    title: "Operating Systems & Virtualization",
    author: "CoreCS Team",
    coverUrl: "/covers/operating-systems.png",
    rating: 4.8,
    reviewsCount: 2_400,
    durationHours: 48,
  },

  hero: {
    title: "Operating Systems & Virtualization",
    tagline: "From classical operating systems to virtualization and cloud computing",
    description:
      "This course provides a structured introduction to modern operating systems with a strong focus on virtualization technologies. Students explore how operating systems evolved to support flexible, scalable, and distributed computing environments, including virtual machines, containers, and cloud platforms.",
    format: "Structured online course",
    bundle: "Core Computer Science",
  },

  pricing: {
    price: 14.99,
    currency: "EUR",
  },

  learningOutcomes: [
    "understand the role and evolution of operating systems",
    "explain core operating system concepts and responsibilities",
    "understand virtualization and paravirtualization principles",
    "describe how hypervisors work and how virtual machines are managed",
    "understand CPU, memory, storage, and I/O virtualization",
    "explain container-based virtualization and microservices",
    "understand cloud computing architectures and services",
    "analyze modern distributed and virtualized systems",
  ],

  about: {
    paragraphs: [
      "Operating Systems & Virtualization introduces the fundamental concepts behind modern computing platforms, focusing on how operating systems enable efficient and flexible use of hardware resources.",
      "The course explores virtualization as a key enabling technology for cloud computing, distributed systems, and large-scale data centers.",
      "Through a combination of theoretical foundations and practical examples, students gain insight into how modern operating systems support virtual machines, containers, and cloud-native applications.",
    ],
  },

  whyStudy: {
    intro:
      "Virtualization and operating systems are the foundation of modern computing infrastructures, from personal devices to large cloud platforms.",
    benefits: [
      "understand how modern computing infrastructures are built",
      "learn how virtualization enables scalability and isolation",
      "gain insight into cloud and container-based architectures",
      "prepare for careers in systems, cloud, and infrastructure engineering",
    ],
  },

  targetAudience: [
    "Computer Science students",
    "students interested in systems and infrastructure",
    "future cloud, DevOps, or platform engineers",
    "developers who want to understand systems under the hood",
  ],

  prerequisites: [
    "basic programming knowledge",
    "introductory understanding of computer architecture",
    "familiarity with operating system basics is helpful but not required",
  ],

  howItWorks: [
    "lectures introduce operating system and virtualization concepts",
    "real-world examples illustrate system-level design choices",
    "case studies on cloud and container technologies",
    "discussion of modern infrastructures and architectures",
  ],

  curriculum: [
    {
      title: "Introduction to Operating Systems",
      focus: "core concepts",
      topics: [
        "Role of an operating system",
        "Evolution of operating systems",
        "System resources and abstraction",
        "Operating systems in modern computing",
      ],
    },
    {
      title: "Virtualization Fundamentals",
      focus: "system abstraction",
      topics: [
        "What is virtualization",
        "Virtualization vs paravirtualization",
        "Benefits and limitations of virtualization",
        "Use cases in modern systems",
      ],
    },
    {
      title: "Hypervisors and Virtual Machines",
      focus: "virtual machine management",
      topics: [
        "Type 1 and Type 2 hypervisors",
        "Virtual machine lifecycle",
        "CPU virtualization",
        "Virtual machine monitoring and management",
      ],
    },
    {
      title: "Resource Virtualization",
      focus: "hardware abstraction",
      topics: [
        "Virtual CPU",
        "Virtual memory",
        "Storage virtualization",
        "Network and I/O virtualization",
      ],
    },
    {
      title: "Containers and Microservices",
      focus: "lightweight virtualization",
      topics: [
        "Container-based virtualization",
        "Linux containers",
        "Containers vs virtual machines",
        "Microservices architecture",
      ],
    },
    {
      title: "Cloud Computing",
      focus: "distributed virtualized systems",
      topics: [
        "Cloud computing models",
        "Infrastructure as a Service (IaaS)",
        "Platform and Software as a Service",
        "Cloud-oriented architectures",
      ],
    },
    {
      title: "Virtualization in Practice",
      focus: "real-world systems",
      topics: [
        "Data centers and server virtualization",
        "Containers in production systems",
        "Virtualization for scalability and reliability",
        "Trends in modern operating systems",
      ],
    },
  ],
}
,
  {
  slug: "computer-networks",
  level: "Intermediate",
category: "systems" ,
  catalog: {
    title: "Computer Networks",
    author: "CoreCS Team",
    coverUrl: "/covers/computer-networks.png",
    rating: 4.8,
    reviewsCount: 2_400,
    durationHours: 55,
  },

  hero: {
    title: "Computer Networks",
    tagline: "How the Internet really works — from protocols to practice",
    description:
      "This course provides a structured and in-depth introduction to computer networks. Students learn how the Internet works by studying its layered architecture, core protocols, performance metrics, and real-world networked applications. The course combines solid theoretical foundations with hands-on experiments and Python-based network programming.",
    
    format: "Structured online course",
    bundle: "Core Computer Science",
  },

  pricing: {
    price: 14.99,
    currency: "EUR",
  },

  learningOutcomes: [
    "understand how the Internet and packet-switched networks operate",
    "analyze delay, loss, throughput, and performance metrics",
    "understand the layered network architecture and service models",
    "work with application-layer protocols such as HTTP, DNS, SMTP, and FTP",
    "implement simple network applications using Python",
    "understand reliable data transfer and congestion control",
    "analyze routing algorithms and Internet control protocols",
    "understand link-layer technologies and data center networking",
  ],

  about: {
    paragraphs: [
      "Computer Networks is a core course that explains how modern communication systems and the Internet are designed and implemented.",
      "The course follows a layered approach, starting from basic concepts and progressively moving through the application, transport, network, and link layers.",
      "Special attention is given to real Internet protocols and hands-on experimentation, allowing students to connect theory with practice.",
    ],
  },

  whyStudy: {
    intro:
      "Every modern software system relies on networks. Understanding how data moves across the Internet is essential for software engineers, data scientists, and system architects.",
    benefits: [
      "develop a deep understanding of Internet protocols and architectures",
      "gain practical experience with network programming",
      "analyze performance and scalability of networked systems",
      "prepare for advanced topics such as distributed systems and cloud computing",
    ],
  },

  targetAudience: [
    "Computer Science students",
    "Software Engineering students",
    "learners interested in networking and Internet technologies",
    "anyone planning to work with distributed or cloud systems",
  ],

  prerequisites: [
    "basic programming knowledge (Python recommended)",
    "basic understanding of computer systems",
  ],

  howItWorks: [
    "lectures introduce core networking concepts and protocols",
    "examples illustrate how real Internet systems work",
    "laboratory sessions use tools like Wireshark",
    "hands-on Python programming for network protocols",
  ],

  curriculum: [
    {
      title: "Introduction to Computer Networks",
      focus: "fundamental concepts",
      topics: [
        "What is the Internet",
        "Network edge and network core",
        "Packet-switched networks",
        "Delay, loss, and throughput",
        "Protocol layers and service models",
        "Transmission modes and network topologies",
      ],
    },
    {
      title: "Application Layer",
      focus: "networked applications",
      topics: [
        "Principles of network applications",
        "The Web and HTTP",
        "Electronic mail (SMTP)",
        "DNS",
        "Peer-to-peer file distribution",
        "Video streaming and CDNs",
        "FTP",
        "Application-layer programming in Python",
      ],
    },
    {
      title: "Transport Layer",
      focus: "end-to-end communication",
      topics: [
        "Transport-layer services",
        "Multiplexing and demultiplexing",
        "User Datagram Protocol (UDP)",
        "Reliable data transfer",
        "Transmission Control Protocol (TCP)",
        "Congestion control",
        "Transport-layer programming in Python",
      ],
    },
    {
      title: "Network Layer",
      focus: "routing and forwarding",
      topics: [
        "Network-layer overview",
        "Inside a router",
        "Internet Protocol (IP)",
        "Subnetting",
        "Routing algorithms (Link-State, Distance-Vector)",
        "Intra-AS and inter-AS routing",
        "SDN and control plane",
        "Network management and SNMP",
      ],
    },
    {
      title: "Link Layer",
      focus: "local communication",
      topics: [
        "Link-layer services",
        "Error detection and correction",
        "Multiple access protocols",
        "Switched local area networks",
        "Link virtualization",
        "Data center networking",
      ],
    },
  ],
}
,
 {
  slug: "system-security",
  level: "Intermediate",
category: "systems" ,
  catalog: {
    title: "System Security",
    author: "CoreCS Team",
    coverUrl: "/covers/system-security.png",
    rating: 4.8,
    reviewsCount: 2_400,
    durationHours: 42,
  },

  hero: {
    title: "System Security",
    tagline: "Protecting systems, data, and networks from real-world threats",
    description:
      "This course provides a comprehensive introduction to computer and system security. It focuses on the protection of hardware, software, data, and networks against threats, vulnerabilities, and attacks. Students learn fundamental security principles, the CIA triad, access control, cryptography basics, operating system and network security, and emerging topics such as cloud security and blockchain.",
    format: "Theory-driven course with real-world security examples",
    bundle: "Core Computer Science",
  },

  pricing: {
    price: 17.99,
    currency: "EUR",
  },

  learningOutcomes: [
    "understand core concepts of computer and system security",
    "identify threats, vulnerabilities, and attacks",
    "apply the CIA triad to real security scenarios",
    "understand access control and authentication mechanisms",
    "analyze security issues in programs, operating systems, and networks",
    "understand cryptography goals and limitations",
    "evaluate security controls and countermeasures",
    "reason about privacy, legal, and ethical aspects of security",
  ],

  about: {
    paragraphs: [
      "System Security introduces the fundamental concepts needed to protect computer systems and digital assets.",
      "The course follows a structured approach based on classical security models, focusing on threats, vulnerabilities, attacks, and controls.",
      "Through real-world examples and case studies, students learn how security principles apply to operating systems, networks, databases, and cloud environments.",
    ],
  },

  whyStudy: {
    intro:
      "Security is a critical concern in modern computing systems. Understanding how and why systems fail is essential to designing secure software and infrastructures.",
    benefits: [
      "develop a strong security mindset",
      "learn how attackers think and operate",
      "understand how controls mitigate security risks",
      "prepare for advanced courses in cybersecurity and systems",
    ],
  },

  targetAudience: [
    "Computer Science students",
    "Data Science and Engineering students",
    "developers interested in secure systems",
    "anyone seeking a solid foundation in cybersecurity",
  ],

  prerequisites: [
    "basic programming knowledge",
    "introductory understanding of operating systems and networks",
  ],

  howItWorks: [
    "lectures introduce theoretical security foundations",
    "case studies illustrate real security failures and attacks",
    "students analyze threats and corresponding controls",
    "conceptual exercises reinforce security reasoning",
  ],

  curriculum: [
    {
      title: "Introduction to Computer Security",
      focus: "core concepts",
      topics: [
        "What is computer security",
        "Assets and their value",
        "Threats, vulnerabilities, and attacks",
        "Controls and countermeasures",
      ],
    },
    {
      title: "Security Goals and Models",
      focus: "foundations",
      topics: [
        "Confidentiality, Integrity, Availability (CIA triad)",
        "Authentication and nonrepudiation",
        "Security policies and trust assumptions",
        "Principle of weakest link",
      ],
    },
    {
      title: "Access Control",
      focus: "authorization mechanisms",
      topics: [
        "Identification and authentication",
        "Access control models",
        "Privileges and permissions",
      ],
    },
    {
      title: "Threats and Attacks",
      focus: "adversarial behavior",
      topics: [
        "Types of attackers",
        "Interception, interruption, modification, fabrication",
        "Advanced Persistent Threats (APT)",
        "Method–Opportunity–Motive (MOM)",
      ],
    },
    {
      title: "Cryptography Basics",
      focus: "data protection",
      topics: [
        "Encryption and confidentiality",
        "Integrity and authentication",
        "Limits of cryptography",
        "Proper and improper use of encryption",
      ],
    },
    {
      title: "Program and Software Security",
      focus: "secure software",
      topics: [
        "Program vulnerabilities",
        "Secure development practices",
        "Penetration testing",
        "Operating system and network controls",
      ],
    },
    {
      title: "System and Network Security",
      focus: "infrastructure protection",
      topics: [
        "Operating system security",
        "Network threats and defenses",
        "Firewalls and intrusion detection",
      ],
    },
    {
      title: "Emerging Topics and Ethics",
      focus: "modern security challenges",
      topics: [
        "Cloud computing security",
        "Blockchain fundamentals",
        "Privacy",
        "Legal and ethical issues in security",
      ],
    },
  ],
}
]