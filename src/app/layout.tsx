import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import Script from 'next/script';
import './globals.css';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import InstallPrompt from '@/components/InstallPrompt';
import ServiceWorkerRegistration from '@/components/ServiceWorkerRegistration';
import { siteConfig } from '@/config/site';
import { getMetadata } from '@/lib/questions';

const inter = Inter({ subsets: ['latin'] });
const { totalQuestions } = getMetadata();

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} - ${totalQuestions} Questions Built to Be Memorized`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    'react',
    'react interview questions',
    'react hooks',
    'useState',
    'useEffect',
    'useMemo',
    'virtual dom',
    'server components',
    'redux',
    'next.js',
    'frontend interview',
    'javascript interview',
  ],
  authors: [{ name: siteConfig.author.name }],
  manifest: '/manifest.json',
  applicationName: siteConfig.name,
  appleWebApp: {
    capable: true,
    title: 'React Prep',
    // The nav bar is white, so let it run under the iOS status bar.
    statusBarStyle: 'default',
  },
  icons: {
    icon: [
      { url: '/react-icon.svg', type: 'image/svg+xml' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
  },
  openGraph: {
    title: `${siteConfig.name} - ${totalQuestions} Questions`,
    description: siteConfig.description,
    type: 'website',
    url: siteConfig.url,
  },
  twitter: {
    card: 'summary_large_image',
    title: `${siteConfig.name} - ${totalQuestions} Questions`,
    description: siteConfig.description,
  },
};

// Matches the white sticky nav, so the status bar reads as part of the app.
export const viewport: Viewport = {
  themeColor: '#ffffff',
  colorScheme: 'light',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const gaId = siteConfig.analytics.gaMeasurementId;
  const googleVerification = siteConfig.verification.googleSiteVerification;

  return (
    <html lang="en">
      <head>
        {googleVerification && (
          <meta name="google-site-verification" content={googleVerification} />
        )}

        {gaId && (
          <>
            <Script
              strategy="afterInteractive"
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaId}');
              `}
            </Script>
          </>
        )}
      </head>
      <body className={inter.className} suppressHydrationWarning>
        <Navigation />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <InstallPrompt />
        <ServiceWorkerRegistration />
      </body>
    </html>
  );
}
