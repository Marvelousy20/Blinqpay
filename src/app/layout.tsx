import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toast/toaster";
import StoreProvider from "@/context/store";
import React from "react";
import { OrdersProvider } from "@/context/pendingOrder";
import { UsersProvider } from "@/context/user";
import Guard from "@/lib/guard";
import { ThemeProvider } from "@/lib/providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AtlasPay",
  description: "Bridging the gap between crypto and fiat economies",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className}`}>
        <ThemeProvider enableSystem={true} attribute="class">
          <Guard>
            <StoreProvider>
              <OrdersProvider>
                <UsersProvider>{children}</UsersProvider>
              </OrdersProvider>
            </StoreProvider>
            <Toaster />
          </Guard>
        </ThemeProvider>
      </body>
    </html>
  );
}
