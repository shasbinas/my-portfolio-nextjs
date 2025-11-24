import { ABOUT_ME } from "@/components/constants/data";

export default function Footer() {
  return (
    <footer className="py-10">
      <div className="glass-panel text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} {ABOUT_ME.name} · crafted in Next.js
      </div>
    </footer>
  );
}
