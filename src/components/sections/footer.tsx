import { ABOUT_ME } from "@/components/constants/data";

export default function Footer() {
  return (
    <footer className="text-center py-8 mt-16 border-t border-border">
      <p className="text-sm text-muted-foreground">
        © {new Date().getFullYear()} {ABOUT_ME.name}. All rights reserved.
      </p>
    </footer>
  );
}
