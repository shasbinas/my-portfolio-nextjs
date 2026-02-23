import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { Analytics } from "@vercel/analytics/next";
import FluidCursor from "@/components/ui/FluidCursor";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL("https://shasbin.in"),
  title: "Shasbin AS - Full Stack Developer ",
  description:
    "Portfolio of Shasbin AS, a Full Stack Developer from Irinjalakuda, Thrissur, India. Expert in Node.js, Express, React, Next.js, and building scalable full-stack applications.",
  keywords: [
    "Shasbin AS",
    "Full Stack Developer",
    "Backend Developer",
    "MERN Stack",
    "Next.js",
    "React",
    "Node.js",
    "TypeScript",
    "Web Development",
    "Thrissur",
    "Kerala",
    "Software Engineer",
  ],
  authors: [{ name: "Shasbin AS", url: "https://shasbin.in" }],
  creator: "Shasbin AS",
  publisher: "Shasbin AS",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://shasbin.in",
    title: "Shasbin AS - Full Stack Developer Portfolio",
    description:
      "Explore the projects and skills of Shasbin AS. Specializing in building scalable full-stack applications and modern web interfaces.",
    siteName: "Shasbin AS Portfolio",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Shasbin AS Portfolio",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Shasbin AS - Full Stack Developer",
    description:
      "Explore the projects and skills of Shasbin AS. Specializing in building scalable full-stack applications and modern web interfaces.",
    creator: "@shasbinas", // Assuming handle based on github/others
    images: ["/twitter-image.png"], // Next.js automatically generates this if you have twitter-image.tsx
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
    google: "u82iDi1b-lYEt4NXIrOsGpS_PTMQ73tpZSK2Ocq3hKY",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} dark`}
      suppressHydrationWarning
    >
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link rel="preconnect" href="https://skillicons.dev" />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Shasbin AS",
              url: "https://shasbin.in",
              jobTitle: "Full Stack Developer",
              description:
                "Full Stack Developer specializing in Node.js, Express, React, and scalable backend architectures.",
              image: "https://shasbin.in/profile-image.jpg", // Adjust if you have a specific URL
              address: {
                "@type": "PostalAddress",
                addressLocality: "Irinjalakuda, Thrissur",
                addressRegion: "Kerala",
                addressCountry: "India",
              },
              knowsAbout: [
                "Result-Oriented",
                "Backend Development",
                "Frontend Development",
                "React",
                "Next.js",
                "TypeScript",
                "Node.js",
                "Database Management",
              ],
              sameAs: [
                "https://github.com/shasbinas",
                "https://linkedin.com/in/shasbinasdev",
                "https://leetcode.com/shasbinas",
              ],
            }),
          }}
        />
      </head>
      <body
        className={`${outfit.className} antialiased`}
        suppressHydrationWarning
      >
        <Providers>{children}</Providers>
        <FluidCursor />
        <Analytics />
      </body>
    </html>
  );
}
