import { SKILLS } from "@/components/constants/data";
import Image from "next/image";

const SKILL_ICONS: Record<string, string> = {
  HTML: "html",
  CSS: "css",
  JavaScript: "js",
  TypeScript: "ts",
  React: "react",
  "Next.js": "nextjs",
  "Vue.js": "vue",
  Angular: "angular",
  Redux: "redux",
  TailwindCSS: "tailwind",
  Bootstrap: "bootstrap",
  Sass: "sass",
  Less: "less",
  jQuery: "jquery",
  "Node.js": "nodejs",
  "Express.js": "express",
  NestJS: "nestjs",
  Django: "django",
  Flask: "flask",
  "Spring Boot": "spring",
  "Ruby on Rails": "rails",
  Laravel: "laravel",
  "ASP.NET": "dotnet",
  FastAPI: "fastapi",
  MongoDB: "mongodb",
  MySQL: "mysql",
  PostgreSQL: "postgresql",
  SQLite: "sqlite",
  Redis: "redis",
  Firebase: "firebase",
  Supabase: "supabase",
  C: "c",
  "C++": "cpp",
  "C#": "cs",
  Java: "java",
  Python: "py",
  Go: "go",
  Rust: "rust",
  Ruby: "ruby",
  PHP: "php",
  Kotlin: "kotlin",
  Swift: "swift",
  Dart: "dart",
  Scala: "scala",
  AWS: "aws",
  Azure: "azure",
  GCP: "gcp",
  Docker: "docker",
  Kubernetes: "kubernetes",
  Vercel: "vercel",
  Netlify: "netlify",
  Heroku: "heroku",
  "GitHub Actions": "githubactions",
  Jenkins: "jenkins",
  "VS Code": "vscode",
  Git: "git",
  GitHub: "github",
  GitLab: "gitlab",
  Bitbucket: "bitbucket",
  Postman: "postman",
  Figma: "figma",
  Vite: "vite",
  Webpack: "webpack",
  Babel: "babel",
  Jest: "jest",
  Cypress: "cypress",
  Linux: "linux",
  Windows: "windows",
  MacOS: "apple",
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
      <h2 className="section-title w-full">technical skills.</h2>
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
