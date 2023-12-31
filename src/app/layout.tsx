import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toast/toaster";
import StoreProvider from "@/context/strore";
import React from "react";

import Guard from "@/lib/guard";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};



export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
})
{
   return (
    <html lang="en">
      <body className={`${inter.className}`}>
        <Guard>
          <StoreProvider>
            {children}
          </StoreProvider>
          <Toaster />
        </Guard>
      </body>
    </html>
  );
}
