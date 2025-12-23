import Link from "next/link";
import { PROJECTS } from "@/components/constants/data";

export default function Projects() {
  return (
    <section className="py-6 space-y-4">
      <div className="flex flex-col gap-2">
        <h2 className="section-title">featured builds.</h2>
        <p className="text-sm text-muted-foreground max-w-2xl">
          Shipping polished experiences from rapid prototypes to
          production-ready systems. Each build blends performance, resilience,
          and a touch of futurism.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        {PROJECTS.map((project) => (
          <div key={project.name} className="tilt-card p-5 space-y-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="text-xl font-semibold tracking-tight">
                  {project.name}
                </h3>
                <p className="text-xs uppercase tracking-[0.4em] text-muted-foreground mt-1">
                  featured case study
                </p>
              </div>
              <div className="flex gap-2">
                {project.link && (
                  <Link
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="glow-button text-xs"
                    aria-label="Open live project"
                  >
                    live
                  </Link>
                )}
                <Link
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glow-button glow-button--ghost text-xs"
                  aria-label="View source code"
                >
                  code
                </Link>
              </div>
            </div>

            <p className="text-sm text-muted-foreground leading-relaxed">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-1.5">
              {project.tech.map((tech) => (
                <span key={tech} className="badge-chip">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
