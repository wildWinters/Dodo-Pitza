import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { Header } from '@/modules/layout/header/header';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body
        className={`antialiased`}
        >
          <Header className='bg-transparent'> 
            <Header.LogoPanel/>
            <Header.InputContainer/>
            <Header.RegistrationPanel/>
          </Header>   
          <main className='flex items-start justify-start flex-col mx-[67px]'>
            {children}
          </main>
      </body>
    </html>
  );
}
 