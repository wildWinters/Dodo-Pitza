import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { Header } from '@/modules/layout/header/header';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export default function CatchAllLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { slug?: string[] };
}) {
  const slug = Array.isArray(params.slug) ? params.slug.join('/') : '';
  const isCheckoutPage = slug.startsWith('checkout');

  return (
    <html lang="en">
      <body
        className={`
          ${geistSans.variable} 
          ${geistMono.variable} 
          antialiased 
          ${isCheckoutPage ? 'bg-[rgba(244,241,238,1)]' : 'bg-white'}
        `}
      >
        {!isCheckoutPage && (
          <Header>
            <Header.LogoPanel />
            <Header.InputContainer />
            <Header.RegistrationPanel />
          </Header>
        )}
      <main className='mx-[60px]'> 
        {children}
      </main>
      </body>
    </html>
  );
}
