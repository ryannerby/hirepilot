'use client';

import './globals.css';
import React, { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";

type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body>
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}
