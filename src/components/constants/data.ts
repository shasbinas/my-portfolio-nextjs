// This file contains constants and data used across the portfolio template. 
// Update the values to personalize your portfolio.

export const ABOUT_ME = {
  name: "Shasbin AS",
  title: "Software Developer",
  location: "Your Location",
  email: "your.email@example.com",
  description: [
    "Write a short introduction about yourself!",
    "Mention your interests, what you love to build, or your coding journey.",
    "You can add more lines or remove these as you like.",
  ],
  profileImage: "/profile-image.webp", // Replace with your profile image
  profileGif: "/profile-gif.gif", // Replace with your personalised gif
};

export const USER_NAMES = {
  githubUsername: "your-github-username",
  leetcodeUsername: "your-leetcode-username", // remove or keep blank if you don't have a LeetCode profile
  hashnodeUsername: "your-hashnode-username", // remove or keep blank if you don't have a Hashnode profile
};

export const SOCIAL_LINKS = {
  github: "https://github.com/your-github-username",
  linkedin: "https://linkedin.com/in/your-linkedin",
  twitter: "https://twitter.com/your-twitter",
  leetcode: "https://leetcode.com/your-leetcode",
  peerlist: "https://peerlist.io/your-peerlist", // remove or keep blank if you don't have a Peerlist profile
  instagram: "https://instagram.com/your-instagram",
  email: "mailto:your.email@example.com",
  blog: "https://yourblog.com", // remove if you don't have a blog
  resume: "https://your-resume-drive-link.com",
};

// Contact form endpoint (update with your own Formspree endpoint)
export const FORM_ENDPOINT = "https://formspree.io/f/your-form-id";

export const SKILLS = { // Keep only the skills you want to showcase and remove the rest
  frontend: [
    "HTML", "CSS", "JavaScript", "TypeScript", "React", "Next.js", "Vue.js", "Angular", "Redux", "TailwindCSS", "Bootstrap", "Sass", "Less", "jQuery"
  ],
  backend: [
    "Node.js", "Express.js", "NestJS", "Django", "Flask", "Spring Boot", "Ruby on Rails", "Laravel", "ASP.NET", "FastAPI"
  ],
  databases: [
    "MongoDB", "MySQL", "PostgreSQL", "SQLite", "Redis", "Firebase", "Supabase"
  ],
  languages: [
    "C", "C++", "C#", "Java", "Python", "JavaScript", "TypeScript", "Go", "Rust", "Ruby", "PHP", "Kotlin", "Swift", "Dart", "Scala"
  ],
  cloudDevOps: [
    "AWS", "Azure", "GCP", "Docker", "Kubernetes", "Vercel", "Netlify", "Heroku", "GitHub Actions", "Jenkins"
  ],
  tools: [
    "VS Code", "Git", "GitHub", "GitLab", "Bitbucket", "Postman", "Figma", "Vite", "Webpack", "Babel", "Jest", "Linux", "Windows", "MacOS"
  ],
};

export const PROJECTS = [
  {
    name: "Project 1",
    description: "Describe your project 1 here. Example: A web app for tracking habits.",
    tech: ["React", "TypeScript"],
    link: "https://yourproject1-link.com",
    github: "https://github.com/yourusername/project1",
  },
  {
    name: "Project 2",
    description: "Describe your project 2 here. Example: An e-commerce site for books.",
    tech: ["Next.js", "Tailwind CSS"],
    link: "https://yourproject2-link.com",
    github: "https://github.com/yourusername/project2",
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
  // Add more experience as needed
];

export const EDUCATION = [
  {
    degree: "Your Degree (e.g., B.Tech. in Computer Science)",
    institution: "Your University",
    institutionLink: "https://youruniversity.com/",
    period: "2020 - 2024",
    score: "XX % or GPA",
  },
  // Add more education as needed
];