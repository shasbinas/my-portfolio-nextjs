import GridPattern from "@/components/ui/grid-pattern";
import ScrollToTop from "@/components/ui/scroll-to-top";
import Navbar from "@/components/sections/navbar";
import Header from "@/components/sections/header";
import AboutMe from "@/components/sections/about-me";
import Skills from "@/components/sections/skills";
import Projects from "@/components/sections/projects";
import Experience from "@/components/sections/experience";
import Education from "@/components/sections/education";
import Github from "@/components/sections/github";
import LeetCode from "@/components/sections/leetcode";
import Blog from "@/components/sections/blog";
import Contact from "@/components/sections/contact";
import Footer from "@/components/sections/footer";

export default function Home() {
  return (
    <div className="font-sans min-h-screen flex flex-col items-center justify-center relative">
      {/* Faded Grid Background */}
      <GridPattern />

      <main className="relative z-10 max-w-3xl w-full mx-auto px-4 sm:px-6 md:px-8">
        <Navbar />
        <ScrollToTop />

        <section id="header"><Header /></section>
        <section id="about"><AboutMe /></section>
        <section id="skills"><Skills /></section>
        <section id="projects"><Projects /></section>
        <section id="experience"><Experience /></section>
        <section id="education"><Education /></section>
        <section id="github"><Github /></section>
        <section id="leetcode"><LeetCode /></section>
        <section id="blog"><Blog /></section>
        <section id="contact"><Contact /></section>
        
        <Footer />
      </main>

    </div>
  );
}
