import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'How to sell anything to anyone',
  description: 'Have you ever wanted to sell salt to a slug? Sell heaters in the Sahara? Sell ketchup popsicles to a woman in white gloves? This is the presentation for you! Learn the secret of sales.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}