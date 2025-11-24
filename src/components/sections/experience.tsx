import { EXPERIENCE } from "@/components/constants/data";
import Link from "next/link";
import { MdOutlineArrowOutward } from "react-icons/md";

export default function Experience() {
  return (
    <section className="py-6 space-y-4">
      <div className="flex flex-col gap-2">
        <h2 className="section-title">work experience.</h2>
        <p className="text-sm text-muted-foreground max-w-2xl">
          Collaborating with teams to ship resilient platforms, streamline developer workflows,
          and ship products with a focus on security, scale, and craft.
        </p>
      </div>

      <div className="grid gap-5">
        {EXPERIENCE.map((exp, index) => (
          <div key={index} className="tilt-card p-6 space-y-4">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.4em] text-muted-foreground">
                  {exp.period}
                </p>
                <h3 className="text-xl font-semibold mt-1">{exp.role}</h3>
                <Link
                  href={exp.companyLink || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-[hsl(var(--border-hover))]"
                >
                  {exp.company}
                  <MdOutlineArrowOutward className="w-4 h-4" />
                </Link>
              </div>

              <span className="text-xs font-mono uppercase tracking-[0.3em] text-muted-foreground">
                {exp.location}
              </span>
            </div>

            <p className="text-sm text-muted-foreground leading-relaxed">{exp.description}</p>

            <div className="flex flex-wrap gap-1.5">
              {exp.skills.map((skill) => (
                <span key={skill} className="badge-chip">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
