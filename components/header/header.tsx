import Link from "next/link";
import { fetchCategories } from "@/lib/data";
// import JoanaBrum from "@/public/joana_brum_brasil.svg";
import JoanaBrum from "@/public/joana-new.svg";
import MobileMenu from "./header-mobile";
import {
  Cog6ToothIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import DesktopNavBar from "./header-desktop";

export default async function Header() {
  const categories = await fetchCategories();

  return (
    <div className="fixed z-20 flex w-full items-center justify-between pl-4 md:px-4 h-[--header-height] transform bg-[--background-default-blur] backdrop-blur-xl">
      <Link href="/" className="active:scale-90 transition-all">
        <JoanaBrum className="h-8" />
      </Link>

      <DesktopNavBar categories={categories} />
      <div className="flex flex-row flex-end ">
        <Link href="/admin" className="p-3 hidden">
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
