import { SKILLS } from "@/components/constants/data";
import Image from "next/image";

const SKILL_ICONS: Record<string, string> = {
  HTML: "html",
  HTML5: "html",
  CSS: "css",
  CSS3: "css",
  JavaScript: "js",
  "JavaScript (ES6+)": "js",
  TypeScript: "ts",
  React: "react",
  "React.js": "react",
  "Next.js": "nextjs",
  Redux: "redux",
  "Redux Toolkit": "redux",
  "Tailwind CSS": "tailwind",
  TailwindCSS: "tailwind",
  Bootstrap: "bootstrap",
  "Framer Motion": "framer",
  jQuery: "jquery",

  "Node.js": "nodejs",
  "Express.js": "express",
  "Nest.js": "nestjs",
  NestJS: "nestjs",
  GraphQL: "graphql",
  JWT: "jwt",
  "Socket.io": "socketio",
  WebSocket: "websocket",

  MongoDB: "mongodb",
  MySQL: "mysql",
  PostgreSQL: "postgresql",
  Redis: "redis",
  "Mongoose ODM": "mongodb",
  "Prisma ORM": "prisma",

  C: "c",
  "C++": "cpp",
  Java: "java",
  Python: "py",
  SQL: "mysql",

  AWS: "aws",
  Docker: "docker",
  Vercel: "vercel",
  "GitHub Actions": "githubactions",
  "CI/CD": "githubactions",
  Linux: "linux",
  "Linux/Bash": "linux",

  Git: "git",
  GitHub: "github",
  GitLab: "gitlab",
  Postman: "postman",
  Figma: "figma",
  Vite: "vite",
  Jest: "jest",
  Playwright: "playwright",
  Supertest: "jest",
  Swagger: "swagger",
  Jira: "jira",
  Notion: "notion",
  ESLint: "eslint",
  npm: "npm",
  Yarn: "yarn",
  Windows: "windows",
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
