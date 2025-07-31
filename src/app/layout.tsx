import type { Metadata } from "next";
import '@ant-design/v5-patch-for-react-19';
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { ThemeProvider } from './ThemeContext';
import GoogleAnalytics from '@/app/components/GoogleAnalytics';
import HydrationWrapper from "./components/HydrationWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
title: "XEQ | XAI Experience Quality",
  description: "Evaluate XAI Experiences with XEQ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <GoogleAnalytics />
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <ThemeProvider><HydrationWrapper>{children}</HydrationWrapper></ThemeProvider>
      </body>
    </html>
  );
}
