import Link from "next/link";
import { fetchCategories } from "@/lib/data";
import JoanaBrum from "@/public/joana-new.svg";
import MobileMenu from "./header-mobile";
import { Cog6ToothIcon } from "@heroicons/react/24/outline";
import DesktopNavBar from "./header-desktop";
import SearchDialog from "../search-dialog";

export default async function Header() {
  const categories = await fetchCategories();

  return (
    <div className="fixed z-20 flex w-full items-center justify-between pl-4 md:px-4 h-[--header-height] transform bg-[--background-default-blur] backdrop-blur-xl">
      <Link href="/" className="hover:scale-105 active:scale-95 transition-all">
        <JoanaBrum className="h-8" />
      </Link>

      <div className="flex flex-row flex-end">
        {/* Links para desktop */}
        <DesktopNavBar categories={categories} />

        {/* Links para administrador - Desktop Only*/}
        <Link href="/admin" className="p-3 hidden">
          <Cog6ToothIcon className="w-6 h-6 active:scale-90 transition-all" />
        </Link>

        {/* Links para search */}
        <SearchDialog />

        {/* Links para Mobile */}
        <MobileMenu categories={categories} />
      </div>
    </div>
  );
}
