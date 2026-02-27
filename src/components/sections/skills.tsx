import { SKILLS } from "@/components/constants/data";
import Image from "next/image";

const SKILL_ICONS: Record<string, string> = {
  // Languages
  "JavaScript (ES6+)": "js",
  TypeScript: "ts",
  HTML5: "html",
  CSS3: "css",
  SQL: "mysql",
  Python: "python",
  C: "c",
  "C++": "cpp",
  Java: "java",
  // Frontend
  "React.js": "react",
  "Next.js": "nextjs",
  Redux: "redux",
  "Redux Toolkit": "redux",
  jQuery: "jquery",
  "Tailwind CSS": "tailwind",
  Bootstrap: "bootstrap",
  "Framer Motion": "framer",
  // Backend
  "Node.js": "nodejs",
  "Express.js": "express",
  "Nest.js": "nestjs",
  "RESTful APIs": "",
  JWT: "",
  WebSocket: "",
  GraphQL: "graphql",
  "Socket.io": "socketdotio",
  // Databases
  MongoDB: "mongodb",
  PostgreSQL: "postgresql",
  Redis: "redis",
  "Mongoose ODM": "mongodb",
  "Prisma ORM": "prisma",
  // Cloud & DevOps
  "AWS (Cognito, Lambda, API Gateway, EC2, S3)": "aws",
  Docker: "docker",
  "CI/CD": "",
  GitHub: "github",
  "Linux/Bash": "linux",
  // Testing
  Jest: "jest",
  Playwright: "playwright",
  Postman: "postman",
  Supertest: "",
  // Tools
  Git: "git",
  Swagger: "swagger",
  Figma: "figma",
  "Adobe Photoshop": "adobephotoshop",
  Vite: "vite",
  "VS Code": "vscode",
  Jira: "jira",
  Notion: "notion",
  ESLint: "eslint",
  npm: "npm",
  Yarn: "yarn",
  // Architecture & Concepts
  MVC: "",
  "SOLID Principles": "",
  OOP: "",
  "Design Patterns": "",
  "System Design": "",
  "API Rate Limiting": "",
  "Load Balancing": "",
  "Data Structures & Algorithms": "",
};
const SkillBadge = ({ skill }: { skill: string }) => (
  <span className="skill-chip">
    {SKILL_ICONS[skill] && (
      <Image
        src={`https://skillicons.dev/icons?i=${SKILL_ICONS[skill]}`}
        alt={`${skill} icon`}
        width={16}
        height={16}
        className="w-4 h-4"
      />
    )}
    {skill}
  </span>
);

const Skills = () => {
  return (
    <section className="py-6 space-y-4">
      <h2 className="section-title w-full">Technical skills.</h2>
      <div className="glass-panel hover-lift space-y-5">
        {Object.entries(SKILLS).map(([key, skills]) => (
          <div
            key={key}
            className="rounded-2xl border p-4 bg-[hsl(var(--muted)/0.35)] transition-all hover:border-[hsl(var(--border-hover))]"
            style={{ borderColor: "hsl(var(--border) / 0.6)" }}
          >
            <h3 className="text-sm uppercase tracking-[0.35em] text-muted-foreground mb-3">
              {"< " + key + " />"}
            </h3>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <SkillBadge key={skill} skill={skill} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
