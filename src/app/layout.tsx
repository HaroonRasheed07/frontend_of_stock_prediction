import { Inter, Bricolage_Grotesque, Figtree } from 'next/font/google';
import { Toaster } from '@/components/ui/toaster';
import { Toaster as Sonner } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { LayoutWrapper } from './layout-wrapper';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { AnalyticsConsent } from '@/components/common/AnalyticsConsent';
import { OrganizationJsonLd, WebsiteJsonLd } from '@/components/seo/StructuredData';
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION, SEO_INDEXING_ENABLED } from '@/lib/seo';
import '@/index.css';
import type { Metadata } from 'next';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const bricolage = Bricolage_Grotesque({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-bricolage',
});

const figtree = Figtree({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-figtree',
});

export const metadata: Metadata = {
  title: {
    default: `${SITE_NAME} | Evidence-Based Stock Research`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  robots: SEO_INDEXING_ENABLED ? 'index, follow' : 'noindex, nofollow',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '16x16 32x32 48x48 64x64', type: 'image/vnd.microsoft.icon' },
      { url: '/favicon.png', type: 'image/png', sizes: '128x128' },
      { url: '/icon-512.png', type: 'image/png', sizes: '512x512' },
    ],
    apple: [
      { url: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  openGraph: {
    title: `${SITE_NAME} | Evidence-Based Stock Research`,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: '/icon-512.png',
        width: 512,
        height: 512,
        alt: SITE_NAME,
      },
    ],
    type: 'website',
    siteName: SITE_NAME,
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE_NAME} | Evidence-Based Stock Research`,
    description: SITE_DESCRIPTION,
    images: ['/icon-512.png'],
  },
  metadataBase: new URL(SITE_URL),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${bricolage.variable} ${figtree.variable}`}
    >
      <head>
        {/* Pre-paint theme: stored choice wins; otherwise follow the system
            setting before first paint (FOUC-free). Mirrors the zustand
            persist shape stored under 'insightforge-theme'. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "(function(){var dark=true;try{var raw=localStorage.getItem('insightforge-theme');var t=raw?(JSON.parse(raw).state||{}).theme:null;if(t==='light'||t==='dark'){dark=t==='dark';}else{dark=window.matchMedia?window.matchMedia('(prefers-color-scheme: dark)').matches:true;}}catch(e){try{dark=window.matchMedia?window.matchMedia('(prefers-color-scheme: dark)').matches:true;}catch(e2){dark=true;}}document.documentElement.classList.toggle('dark',dark);})();",
          }}
        />
        <OrganizationJsonLd />
        <WebsiteJsonLd />
      </head>
      <body>
        <div>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <LayoutWrapper>{children}</LayoutWrapper>
            <Analytics />
            <SpeedInsights />
            <AnalyticsConsent />
          </TooltipProvider>
        </div>
      </body>
    </html>
  );
}
