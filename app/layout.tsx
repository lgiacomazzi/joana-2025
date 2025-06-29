import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/header/header";
import { ibm_Plex_Mono } from "@/components/fonts";
import { twMerge } from "tailwind-merge";
import Footer from "@/components/footer";

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
      <body className={twMerge("antialised", ibm_Plex_Mono.className)}>
        <Header />
        <div className="pt-[--header-height] min-h-[100dvh] bg-[--background-primary]">
          {children}
        </div>
        {/* Add padding equal to header height */}
        <Footer />
      </body>
    </html>
  );
}
