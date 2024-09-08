import Link from "next/link";
import { fetchCategories } from "@/lib/data";
import { twMerge } from "tailwind-merge";
import JoanaBrum from "@/public/joana_brum_brasil.svg";

export default async function Header() {
  const categories = await fetchCategories();

  return (
    <div
      className={twMerge(
        "relative z-20 flex w-screen items-center justify-between p-5"
      )}
    >
      <Link href="/">
        <JoanaBrum className="h-12 max-h-16" />
      </Link>

      {/* <DesktopNavBar categories={categories} /> */}
      {/* <MobileMenu categories={categories} /> */}
    </div>
  );
}
