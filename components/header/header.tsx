import Link from "next/link";
import { fetchCategories } from "@/lib/data";
import { twMerge } from "tailwind-merge";
import JoanaBrum from "@/public/joana_brum_brasil.svg";
import MobileMenu from "./header-mobile";

export default async function Header() {
  const categories = await fetchCategories();

  return (
    <div
      className={twMerge(
        "relative z-20 flex w-screen items-center justify-between px-4 py-2"
      )}
    >
      <Link href="/" className="active:scale-90 transition-all">
        <JoanaBrum className="h-10 max-h-16" />
      </Link>

      {/* <DesktopNavBar categories={categories} /> */}
      <MobileMenu categories={categories} />
    </div>
  );
}
