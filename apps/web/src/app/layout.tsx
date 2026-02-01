import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { Providers } from '@/providers';

const fontSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const fontMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'SioLabs - AI/ML Learning Platform',
    template: '%s | SioLabs',
  },
  description: 'Master AI and Machine Learning with structured courses, hands-on projects, and expert mentorship.',
  keywords: ['AI', 'Machine Learning', 'Learning Platform', 'EdTech', 'Online Courses'],
  authors: [{ name: 'SioLabs' }],
  creator: 'SioLabs',
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    siteName: 'SioLabs',
    title: 'SioLabs - AI/ML Learning Platform',
    description: 'Master AI and Machine Learning with structured courses, hands-on projects, and expert mentorship.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SioLabs - AI/ML Learning Platform',
    description: 'Master AI and Machine Learning with structured courses, hands-on projects, and expert mentorship.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${fontSans.variable} ${fontMono.variable} font-sans antialiased`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
