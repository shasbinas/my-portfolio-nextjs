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
  // Keep only the skills you want to showcase and remove the rest
  frontend: [
    "HTML",
    "CSS",
    "JavaScript",
    "TypeScript",
    "React",
    "Next.js",
    "Bootstrap",
  ],
  backend: ["Node.js", "Express.js"],
  databases: ["MongoDB", "MySQL", "PostgreSQL", "Redis"],
  languages: [
    "C",
    "C++",
    "Java",
    "Python",
    "Django",
    "JavaScript",
    "TypeScript",
  ],
  cloudDevOps: ["AWS", "Docker", "Vercel", "GitHub Actions"],
  tools: [
    "VS Code",
    "Git",
    "GitHub",
    "GitLab",
    "Postman",
    "Figma",
    "Jest",
    "Windows",
  ],
};

export const PROJECTS = [
  {
    name: "task-manager-api-ts",
    description:
      " A production-ready Task Manager REST API built with TypeScript, Express, PostgreSQL, Prisma, and Redis — featuring secure auth, role-based access, task management, comments, user controls, and Cloudinary uploads.",
    tech: [
      "Node.js",
      "TypeScript",
      "JWT",
      "Redis",
      "PostgreSQL",
      "Prisma ORM",
      "argon2",
      "Cloudinary",
      "Jest + Supertest",
    ],
    link: "",
    github: "https://github.com/shasbinas/task-manager-api-ts",
  },
  {
    name: "ChronoRoyale-Ecommerce-WebApp",
    description:
      "ChronoRoyale is built to deliver a modern e-commerce experience specifically for luxury watches. Users can browse, wishlist, add to cart, and place orders. Admins can manage products, users, and orders with ease.",
    tech: [
      "Node.js",
      "JavaScript",
      "Bootstrap 5",
      "Handlebars",
      "Chart.js",
      "Express.js",
      "Multer",
      "MongoDBAtlas",
      "JWT",
    ],
    link: "https://chronoroyale-ecommerce-webapp.onrender.com",
    github: "https://github.com/shasbinas/ChronoRoyale-Ecommerce-WebApp.git",
  },
  // Add more projects as needed
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
