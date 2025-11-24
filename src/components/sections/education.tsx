import { EDUCATION } from "@/components/constants/data";
import Link from "next/link";
import { MdOutlineArrowOutward } from "react-icons/md";

export default function Education() {
  return (
    <section className="py-6 space-y-4">
      <div className="flex flex-col gap-2">
        <h2 className="section-title">education.</h2>
        <p className="text-sm text-muted-foreground max-w-2xl">
          Continuous learning through formal programs and self-directed research.
        </p>
      </div>

      <div className="flex flex-col gap-4">
        {EDUCATION.map((edu, index) => (
          <div key={index} className="tilt-card p-6 space-y-3 w-full">
            <div className="flex items-center justify-between gap-2">
              <h3 className="text-lg font-semibold">{edu.degree}</h3>
              <span className="text-xs uppercase tracking-[0.35em] text-muted-foreground">
                {edu.period}
              </span>
            </div>
            <Link
              href={edu.institutionLink || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-[hsl(var(--border-hover))]"
            >
              {edu.institution}
              <MdOutlineArrowOutward className="w-4 h-4" />
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
