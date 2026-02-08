import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
 
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Bulltrack Pro",
  description: "Advanced Bull Tracking Dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}
