"use client";
import "./globals.css";

import { SessionProvider } from "next-auth/react";
import Header from "@/app/components/Header";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
      <SessionProvider>
          <Header />
        {children}
      </SessionProvider>
      </body>
    </html>
  );
}
