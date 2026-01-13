import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ClerkProvider } from '@clerk/nextjs';
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: 'LaterStack - Your smart reading queue',
  description: 'Save articles and get AI-powered recommendations on what to read next based on your interests and available time.',
  keywords: ['reading queue', 'article manager', 'AI recommendations', 'read later', 'productivity', 'smart reading'],
  authors: [{ name: 'Davi Giroux', url: 'https://devgiroux.com' }],
  creator: 'Davi Giroux',
  metadataBase: new URL('https://laterstack.io'),

  openGraph: {
    title: 'LaterStack - Your smart reading queue',
    description: 'Save articles and get AI-powered recommendations on what to read next based on your interests and available time.',
    url: 'https://laterstack.io',
    siteName: 'LaterStack',
    locale: 'en_US',
    type: 'website',
  },

  twitter: {
    card: 'summary_large_image',
    title: 'LaterStack - Your smart reading queue',
    description: 'Save articles and get AI-powered recommendations on what to read next.',
    creator: '@devgiroux',
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
