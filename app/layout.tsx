import "@/app/globals.css";
import { Inter as FontSans } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";

import { cn } from "@/lib/utils";
const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
        suppressHydrationWarning={true}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
