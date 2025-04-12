import Link from "next/link";
import { fetchCategories } from "@/lib/data";
import { twMerge } from "tailwind-merge";
import JoanaBrum from "@/public/joana_brum_brasil.svg";
import MobileMenu from "./header-mobile";
import {
  Cog6ToothIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";

export default async function Header() {
  const categories = await fetchCategories();

  return (
    <div
      className={twMerge(
        "fixed z-20 flex w-full items-center justify-between px-4 py-2 transform bg-[--background-default]"
      )}
    >
      <Link href="/" className="active:scale-90 transition-all">
        <JoanaBrum className="h-10 max-h-16" />
      </Link>

      {/* <DesktopNavBar categories={categories} /> */}
      <div className="flex flex-row flex-end">
        <Link href="/admin" className="p-3 hidden md:block">
          <Cog6ToothIcon className="w-6 h-6 active:scale-90 transition-all" />
        </Link>

        <button className="p-3 md:hidden">
          <MagnifyingGlassIcon className="w-6 h-6 active:scale-90 transition-all" />
        </button>
        <MobileMenu categories={categories} />
      </div>
    </div>
  );
}
