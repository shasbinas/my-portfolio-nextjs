// This file contains constants and data used across the portfolio template.
// Update the values to personalize your portfolio.

export const ABOUT_ME = {
  name: "Shasbin AS",
  title: "Full Stack Developer",
  location: "Irinjalakuda, Thrissur, Kerala, India",
  email: "shasbin.official@gmail.com",
  description: [
    "Hi, I’m Shasbin A.S, a Full Stack Developer with a strong focus on building reliable, scalable, and secure web applications. I enjoy solving complex problems and turning ideas into efficient systems.",
    "I’m passionate about developing secure authentication flows, robust RESTful APIs, and intelligent data-driven applications. I enjoy crafting full-stack systems that are scalable, maintainable, and built with clean, modern architecture.",
  ],
  profileImage: "/profile-image.jpg", // Replace with your profile image
  profileGif: "/profile-gif.gif", // Replace with your personalised gif
};

export const USER_NAMES = {
  githubUsername: "shasbinas",
  leetcodeUsername: "shasbinas", // remove or keep blank if you don't have a LeetCode profile
  //   hashnodeUsername: "your-hashnode-username", // remove or keep blank if you don't have a Hashnode profile
};

export const SOCIAL_LINKS = {
  github: "https://github.com/shasbinas",
  linkedin: "https://linkedin.com/in/shasbinasdev",
  // twitter: "https://twitter.com/your-twitter",
  leetcode: "https://leetcode.com/shasbinas",
  // peerlist: "https://peerlist.io/your-peerlist", // remove or keep blank if you don't have a Peerlist profile
  instagram: "",
  email: "mailto:shasbin.official@gmail.com",
  // blog: "https://yourblog.com", // remove if you don't have a blog
  resume:
    "https://drive.google.com/file/d/1oPJLNdage1MwhFuwdrVo3a4MfDIHr7lU/view",
  phone: "+91 9746998909",
  whatsapp: "https://wa.me/ 9746998909",
};

// Contact form endpoint (update with your own Formspree endpoint)
export const FORM_ENDPOINT = "https://formspree.io/f/your-form-id";

export const SKILLS = {
  languages: [
    "JavaScript (ES6+)",
    "TypeScript",
    "HTML5",
    "CSS3",
    "SQL",
    "Python",
    "C",
    "C++",
    "Java",
  ],

  frontend: [
    "React.js",
    "Next.js",
    "Redux",
    "Redux Toolkit",
    "jQuery",
    "Tailwind CSS",
    "Bootstrap",
    "Framer Motion",
  ],

  backend: [
    "Node.js",
    "Express.js",
    "Nest.js",
    "RESTful APIs",
    "GraphQL",
    "JWT",
    "Socket.io",
    "WebSocket",
  ],

  databases: ["MongoDB", "PostgreSQL", "Redis", "Mongoose ODM", "Prisma ORM"],

  cloudDevOps: [
    "AWS (Cognito, Lambda, API Gateway, EC2, S3)",
    "Docker",
    "CI/CD",
    "GitHub",
    "Linux/Bash",
  ],

  testing: ["Jest", "Postman", "Playwright", "Supertest"],

  tools: [
    "Git",
    "Swagger",
    "Figma",
    "Adobe Photoshop",
    "Vite",
    "VS Code",
    "Jira",
    "Notion",
    "ESLint",
    "npm",
    "Yarn",
  ],

  "architecture Concepts": [
    "MVC",
    "SOLID Principles",
    "OOP",
    "Design Patterns",
    "System Design",
    "API Rate Limiting",
    "Load Balancing",
    "Data Structures & Algorithms",
  ],
};
export const PROJECTS = [
  {
    id: 1,
    name: "Next.js Project Management App",
    category: "Full Stack",
    description:
      "Architected a full-stack project management application supporting 5+ project views with an interactive analytics dashboard.\nDelivered multi-view task tracking (List, Board, Timeline, Table) with priority assignment and team role management for 10+ member teams.\nIntegrated AWS Cognito and JWT authentication for secure access and AWS S3 for scalable file uploads.\nImplemented global search, dark mode, and fully responsive UI for seamless cross-device experience.",
    tech: [
      "Next.js",
      "TypeScript",
      "Node.js",
      "PostgreSQL",
      "Prisma",
      "AWS Cognito",
      "AWS S3",
      "JWT",
      "Tailwind CSS",
    ],
    link: "",
    github: "https://github.com/shasbinas/project-management",
    image: "/product_mangment (1).png",
    color: "#6366F1",
  },
  {
    id: 2,
    name: "Next.js Modern Portfolio Website",
    category: "Frontend",
    description:
      "Designed a responsive 9+ section portfolio using Next.js 15 and TypeScript with dark mode and Framer Motion animations.\nIntegrated GitHub and LeetCode APIs displaying 261+ solved problems, 64-day max streak, and 171 active days.\nOptimized SEO and performance achieving 90+ Lighthouse score via image optimization, code splitting, and Open Graph meta tags.\nConfigured reusable components with ESLint, Prettier, and Vercel Analytics for maintainability.",
    tech: [
      "Next.js 15",
      "TypeScript",
      "Framer Motion",
      "Tailwind CSS",
      "GitHub API",
      "LeetCode API",
      "Vercel",
    ],
    link: "",
    github: "https://github.com/shasbinas/my-portfolio-nextjs",
    image: "/portfolio.png",
    color: "#3178C6",
  },
  {
    id: 3,
    name: "Task Manager REST APIs",
    category: "Backend",
    description:
      "Developed a REST API with 15+ endpoints using Node.js, TypeScript, Express, PostgreSQL, and Prisma ORM with role-based access control.\nSecured APIs using JWT authentication, Redis token blacklisting, and Argon2 password hashing preventing unauthorized access.\nImplemented task CRUD operations and comment modules with Cloudinary file upload support.\nConfigured Helmet, CORS, rate limiting, and Jest achieving 80%+ test coverage for security and reliability.",
    tech: [
      "Node.js",
      "TypeScript",
      "Express.js",
      "PostgreSQL",
      "Prisma ORM",
      "Redis",
      "JWT",
      "Argon2",
      "Cloudinary",
      "Jest",
    ],
    link: "",
    github: "https://github.com/shasbinas/task-manager-api-ts",
    image: "/restapis.png",
    color: "#10B981",
  },
  {
    id: 4,
    name: "Chrono Royale E-Commerce Platform",
    category: "Full Stack",
    description:
      "Launched a full-stack e-commerce platform managing 100+ products using Node.js, Express.js, MongoDB, and MVC architecture.\nSecured JWT authentication with cart, wishlist, and order tracking features for enhanced user experience.\nEngineered admin dashboard with product management and real-time Chart.js analytics.\nImplemented soft delete, user blocking, and order status management reducing admin workload by 40%.",
    tech: [
      "Node.js",
      "Express.js",
      "MongoDB",
      "Handlebars",
      "Chart.js",
      "Bootstrap 5",
      "JWT",
    ],
    link: "",
    github: "",
    image: "/chronoroyale.png",
    color: "#F59E0B",
  },
];

export const EXPERIENCE = [
  {
    company: "G-Tec Computer Education",
    companyLink: "",
    role: "Full Stack Development Intern",
    period: "Jun 2025 - Feb 2026",
    location: "Onsite",
    description:
      "Engineered MERN stack applications serving 50K+ monthly users and reduced load times by 30% through lazy loading and component optimization. Implemented JWT authentication for 4+ REST APIs using Node.js, Nest.js, and TypeScript, preventing 100% of unauthorized access. Optimized MongoDB and PostgreSQL schemas with effective indexing strategies, improving query performance by 40%. Deployed containerized microservices using Docker along with AWS S3 and Cognito, achieving 99.9% uptime, 50% faster deployments, and maintaining 85%+ Jest test coverage.",
    skills: [
      "Node.js",
      "Express.js",

      "JavaScript",
      "TypeScript",
      "React",
      "PostgreSQL",
      "MongoDB",
      "Redis",
      "Docker",
      "REST APIs",
      "Backend Architecture",
    ],
  },
];

export const EDUCATION = [
  {
    degree: "Bachelor of Computer Applications (BCA) – Online Degree",
    institution: " Yenepoya University",
    institutionLink: "https://www.yenepoya.edu.in/",
    period: "Jul 2025 - Jul 2028  Expected",
  },
  {
    degree: "Senior Secondary (Plus Two) ",
    institution: "Lbsm Higher Secondary School ",
    // institutionLink: "https://www.yenepoya.edu.in/",
    period: "Jun 2021 - Mar 2023",
  },
  {
    degree: "Secondary (SSLC)",
    institution: "Lbsm Higher Secondary School ",
    // institutionLink: "https://www.yenepoya.edu.in/",
    period: "Jun 2020 - Mar 2021",
  },

  // Add more education as needed
];
