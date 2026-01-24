import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter, Space_Grotesk } from "next/font/google";
import { ClerkProvider } from '@clerk/nextjs';
import { Analytics } from '@vercel/analytics/next';
import { OrganizationJsonLd, WebApplicationJsonLd } from '@/components/seo/json-ld';
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = {
  title: 'LaterStack - Stop hoarding links. Start reading what matters.',
  description: 'Your "Save for Later" list is a graveyard of good intentions. LaterStack filters the noise, scores relevance based on your goals, and tells you exactly what to read next.',
  keywords: ['reading queue', 'article manager', 'AI recommendations', 'read later', 'productivity', 'smart reading'],
  authors: [{ name: 'Davi Giroux', url: 'https://devgiroux.com' }],
  creator: 'Davi Giroux',
  metadataBase: new URL('https://laterstack.io'),

  openGraph: {
    title: 'LaterStack - Stop hoarding links. Start reading what matters.',
    description: 'Your "Save for Later" list is a graveyard of good intentions. LaterStack filters the noise, scores relevance based on your goals, and tells you exactly what to read next.',
    url: 'https://laterstack.io',
    siteName: 'LaterStack',
    locale: 'en_US',
    type: 'website',
  },

  twitter: {
    card: 'summary_large_image',
    title: 'LaterStack - Stop hoarding links. Start reading what matters.',
    description: 'Your "Save for Later" list is a graveyard of good intentions. LaterStack tells you exactly what to read next.',
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
        <head>
          <OrganizationJsonLd />
          <WebApplicationJsonLd />
        </head>
        <body
          className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} ${spaceGrotesk.variable} antialiased`}
        >
          {children}
          <Analytics />
        </body>
      </html>
    </ClerkProvider>
  );
}
