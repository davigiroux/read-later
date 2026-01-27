import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter, Space_Grotesk } from "next/font/google";
import { ClerkProvider } from '@clerk/nextjs';
import { Analytics } from '@vercel/analytics/next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { OrganizationJsonLd, WebApplicationJsonLd } from '@/components/seo/json-ld';
import { routing, type Locale } from '@/i18n/routing';
import "../globals.css";

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

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const messages = await getMessages({ locale });
  const metadata = messages.metadata as Record<string, string>;

  const ogLocale = locale === 'pt-BR' ? 'pt_BR' : 'en_US';

  return {
    title: metadata?.title || 'LaterStack - Master your reading list with AI',
    description: metadata?.description || 'Stop drowning in tabs. LaterStack uses advanced AI to rank, summarize, and schedule your reading based on your goals and available time.',
    keywords: ['reading queue', 'article manager', 'AI recommendations', 'read later', 'productivity', 'smart reading'],
    authors: [{ name: 'Davi Giroux', url: 'https://devgiroux.com' }],
    creator: 'Davi Giroux',
    metadataBase: new URL('https://laterstack.io'),
    alternates: {
      languages: {
        'en': '/en',
        'pt-BR': '/pt-BR',
      },
    },
    openGraph: {
      title: metadata?.title || 'LaterStack - Master your reading list with AI',
      description: metadata?.description || 'Stop drowning in tabs. LaterStack uses advanced AI to rank, summarize, and schedule your reading based on your goals and available time.',
      url: 'https://laterstack.io',
      siteName: 'LaterStack',
      locale: ogLocale,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: metadata?.title || 'LaterStack - Master your reading list with AI',
      description: metadata?.description || 'Stop drowning in tabs. LaterStack uses AI to rank and schedule your reading based on your goals.',
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
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Validate locale
  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  // Load messages for the current locale
  const messages = await getMessages();

  return (
    <ClerkProvider>
      <html lang={locale}>
        <head>
          <OrganizationJsonLd />
          <WebApplicationJsonLd />
        </head>
        <body
          className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} ${spaceGrotesk.variable} antialiased`}
        >
          <NextIntlClientProvider messages={messages}>
            {children}
          </NextIntlClientProvider>
          <Analytics />
        </body>
      </html>
    </ClerkProvider>
  );
}
