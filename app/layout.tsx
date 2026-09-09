import type { Metadata } from "next";
import "./globals.css";
import SmoothScrollProvider from "./components/SmoothScrollProvider";

export const metadata: Metadata = {
  title: "Burak İtik | Bilgisayar Mühendisi & Full-Stack Developer",
  description:
    "Bilgisayar Mühendisi | Full-Stack Developer, ERP Uzman Adayı. Next.js, React, TypeScript, Node.js, PostgreSQL ve modern web teknolojileriyle uçtan uca projeler geliştiriyorum.",
  keywords: [
    "Burak İtik",
    "Bilgisayar Mühendisi",
    "Full Stack Developer",
    "Next.js",
    "React",
    "ERP",
    "Netsim N4",
    "TypeScript",
    "Node.js",
    "PostgreSQL",
  ],
  icons: {
    icon: [
      { url: "/profile-round.png", sizes: "any" },
    ],
    shortcut: "/profile-round.png",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "Burak İtik | Bilgisayar Mühendisi & Full-Stack Developer",
    description:
      "Bilgisayar Mühendisi | Full-Stack Developer. Modern web teknolojileriyle projeler geliştiriyorum.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr" className="dark">
      <body className="bg-[#050505] text-[#ededed] font-sans antialiased selection:bg-[#dfc3a2] selection:text-black">
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}
