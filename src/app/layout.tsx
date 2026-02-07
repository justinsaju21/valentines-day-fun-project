import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import MusicPlayerComponent from "@/components/MusicPlayerComponent";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Valentine Builder 💕 | Create Your Valentine Proposal",
  description: "Create a personalized Valentine's Day proposal for your crush. Customize themes, messages, and share a unique link!",
  openGraph: {
    title: "Valentine Builder 💕",
    description: "Will you be my Valentine? Create your own proposal now!",
    url: "https://your-domain.com", // User can update this
    siteName: "Valentine Builder",
    images: [
      {
        url: "/og-image.png", // Ensure this exists or use a default
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
      >
        <MusicPlayerComponent />
        {children}
        <Footer />
      </body>
    </html>
  );
}
