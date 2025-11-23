import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { Analytics } from "@vercel/analytics/next";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  title:
    "Your Name - Portfolio Website",
  description:
    "Your portfolio showcasing your development projects and skills. Update this description with your own details.",
  keywords: [
    "Your Name",
    "Full Stack Developer",
    "React",
    "Next.js",
    "TypeScript",
    "Web Development",
    "Portfolio",
    "Frontend Developer",
    "Backend Developer",
    "JavaScript",
    "Node.js",
    "Your City",
    "Your Country",
  ],
  authors: [{ name: "Your Name" }],
  creator: "Your Name",
  publisher: "Your Name",
  metadataBase: new URL("https://your-portfolio-url.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://your-portfolio-url.com",
    title: "Your Name - Portfolio Website for a Full Stack Developer",
    description:
      "Personal portfolio showcasing skills, projects, experience, and more. Built with modern web technologies.",
    siteName: "Your Name Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Your Name - Portfolio Website for a Full Stack Developer",
    description:
      "Personal portfolio showcasing skills, projects, experience, and more. Built with modern web technologies.",
    creator: "@your_twitter_handle",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={outfit.variable} suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />

        {/* Font Preloading */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* Skill Icons Preconnect */}
        <link rel="preconnect" href="https://skillicons.dev" />


        {/* JSON-LD structured data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Your Name",
              url: "https://your-portfolio-url.com",
              jobTitle: "Full Stack Developer",
              description:
                "Personal portfolio showcasing skills, projects, experience, and more. Built with modern web technologies.",
              knowsAbout: [
                "React",
                "Next.js",
                "TypeScript",
                "JavaScript",
                "Node.js",
                "Full Stack Development",
                "Web Development",
              ],
              sameAs: [
                "https://github.com/your-github-username",
                "https://linkedin.com/in/your-linkedin",
                "https://twitter.com/your-twitter",
              ],
            }),
          }}
        />
      </head>
      <body className={`${outfit.className} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
