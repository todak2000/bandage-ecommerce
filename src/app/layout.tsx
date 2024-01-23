import '@/styles/global.css';

import type { Metadata } from 'next';

import TanstackProvider from '@/providers/TanstackProvider';
import { BaseLayout } from '@/templates/BaseLayout';
import { AppConfig } from '@/utils/AppConfig';

export const metadata: Metadata = {
  title: {
    default: AppConfig.title,
    template: `%s | ${AppConfig.title}`,
  },
  description: AppConfig.description,
  robots: { index: true, follow: true },
  manifest: `/site.webmanifest`,
  icons: [
    {
      rel: 'apple-touch-icon',
      url: '/apple-touch-icon.png',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '32x32',
      url: '/favicon-32x32.png',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '16x16',
      url: '/favicon-16x16.png',
    },
    {
      rel: 'icon',
      url: '/favicon.ico',
    },
  ],
};

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <TanstackProvider>
          <BaseLayout>{props.children}</BaseLayout>
        </TanstackProvider>
      </body>
    </html>
  );
}
