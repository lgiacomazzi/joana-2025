import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/header/header";

export const metadata: Metadata = {
  title: "Joana Brum Brasil",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>
        <Header />
        {children}
      </body>
    </html>
  );
}
