import { EXPERIENCE } from "@/components/constants/data";
import Link from "next/link";
import { MdOutlineArrowOutward } from "react-icons/md";

export default function Experience() {
  return (
    <section className="py-5">
      <h2 className="text-xl mb-4 font-semibold">work experience.</h2>

      <div className="space-y-6 relative">
        {/* Single continuous vertical line */}
        <div className="absolute left-0 top-0 -bottom-6 w-px bg-accent"></div>

        {EXPERIENCE.map((exp, index) => (
          <div key={index} className="relative">
            {/* Solid dot */}
            <span className="absolute -left-3 -top-0 bg-muted rounded-full w-6 h-6 flex items-center justify-center z-10">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            </span>

            <div className="space-y-3 pl-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                <div className="space-y-1">
                  <h3 className="font-medium text-base">{exp.role}</h3>
                  <p className="text-sm text-muted-foreground">
                    <Link
                      href={exp.companyLink || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link"
                    >
                      {exp.company}
                      <MdOutlineArrowOutward className="inline-block w-4 h-4 ml-1" />
                    </Link>
                  </p>
                </div>
                <div className="flex flex-col text-left sm:text-right">
                  <span className="text-sm text-muted-foreground font-mono">
                    {exp.period}
                  </span>
                  <span className="text-sm text-muted-foreground font-mono">
                    {exp.location}
                  </span>
                </div>
              </div>

              <p className="text-sm text-muted-foreground leading-relaxed text-justify">
                {exp.description}
              </p>

              <div className="flex flex-wrap gap-1.5">
                {exp.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-2 py-1 text-xs rounded-md badge text-foreground"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
