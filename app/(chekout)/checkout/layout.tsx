// CheckoutLayout.tsx
import type { Metadata } from 'next';
import { Header } from '@/modules/layout/header/header';

export const metadata: Metadata = {
  title: 'Checkout - Pizza',
  description: 'Checkout page',
};

export default function CheckoutLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="bg-[rgba(244,241,238,1)] min-h-screen">
      {children}
    </div>
  );
}
