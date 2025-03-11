import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { Analytics } from "@vercel/analytics/react"
import ReactQueryProvider from "@/lib/query/react-query-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TodoApp by Zachari Iligan",
  description: "the backend was done in a rush hahahahaha",
  verification: {
    google: "PBfzmt98FVGiJWm81wPD5bVI3AJD9uigb1SlM8KaNcM"
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
      >
        <Toaster richColors />
        <ReactQueryProvider>
          {children}
          <Analytics />
        </ReactQueryProvider>
      </body>
    </html>
  );
}
