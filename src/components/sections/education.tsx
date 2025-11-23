import { EDUCATION } from "@/components/constants/data";
import Link from "next/link";
import { MdOutlineArrowOutward } from "react-icons/md";

export default function Education() {
  return (
    <section className="py-5">
      {/* Education */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold mb-4">education.</h2>
        <div className="space-y-4">
          {EDUCATION.map((edu, index) => (
            <div key={index} className="space-y-1">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                <h3 className="font-medium text-base">{edu.degree}</h3>
                <span className="text-sm text-muted-foreground font-mono">
                  {edu.period}
                </span>
              </div>
              <p className="text-sm text-muted-foreground">
                <Link
                  href={edu.institutionLink || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link"
                >
                  {edu.institution}
                  <MdOutlineArrowOutward className="inline-block w-4 h-4 ml-1" />
                </Link>
              </p>
              <p className="text-sm text-muted-foreground">
                Score: {edu.score}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
