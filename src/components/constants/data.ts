// This file contains constants and data used across the portfolio template.
// Update the values to personalize your portfolio.

export const ABOUT_ME = {
  name: "Shasbin AS",
  title: "Backend Developer",
  location: "Kerala",
  email: "shasbinas1@gmail.com",
  description: [
    "Hi, I’m Shasbin A.S, a backend developer with a strong focus on building reliable, scalable, and secure server-side applications. I enjoy solving complex problems and turning ideas into efficient APIs and systems.",
    "I’m passionate about developing secure authentication flows, robust RESTful APIs, and intelligent data-driven applications. I enjoy crafting backend systems that are scalable, maintainable, and built with clean, modern architecture.",
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
  email: "mailto:shasbinas1@gmail.com",
  // blog: "https://yourblog.com", // remove if you don't have a blog
  resume:
    "https://drive.google.com/file/d/1lf2eQpjK10k9CFMpI7HCLGmskxRb3hdT/view?usp=sharing",
  phone: "+91 00000 00000",
  whatsapp: "https://wa.me/910000000000",
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
    "Bitbucket",
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
    company: "Company Name",
    companyLink: "https://companyname.com/",
    role: "Software Developer",
    period: "Jan 2025 - Present",
    location: "Remote/Location",
    description: "Describe your responsibilities and achievements.",
    skills: ["React", "Node.js", "XXXX"],
  },
  {
    company: "Another Org",
    companyLink: "https://example.org/",
    role: "Backend Engineering Intern",
    period: "Jun 2024 - Dec 2024",
    location: "Remote",
    description:
      "Placeholder copy for a second experience entry to showcase timeline styling.",
    skills: ["TypeScript", "Express.js", "PostgreSQL"],
  },
];

export const EDUCATION = [
  {
    degree: "Bachelor of Computer Applications (BCA) – Online Degree",
    institution: " Yenepoya University",
    institutionLink: "https://www.yenepoya.edu.in/",
    period: "2025 - 2028 Expected",
    // score: "XX % or GPA", education.tsx uncomment future for score(Score:)
  },
  // Add more education as needed
];

