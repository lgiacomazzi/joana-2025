"use client";

import { Category } from "@/lib/definitions";
import { categoryTranslations } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Instagram from "@/public/instagram.svg";

export function DesktopDropdown({
  category,
  years,
}: {
  category: string;
  years: string[];
}) {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const selectedCategory = usePathname().split("/")[1];
  const selectedYear = usePathname().split("/")[2];

  return (
    <div className="flex flex-col items-center text-sm">
      <button
        className="border-b border-transparent uppercase hover:border-black"
        onClick={() => setIsDropdownVisible(!isDropdownVisible)}
      >
        {categoryTranslations[category]}
        {category === selectedCategory && `/${selectedYear}`}
      </button>
      {isDropdownVisible && (
        <div className="absolute mt-8 flex flex-col items-center gap-2 bg-zinc-950 px-8 py-3 text-white">
          {years.map((year) => (
            <Link
              href={`/${category}/${year}`}
              key={year}
              onClick={() => setIsDropdownVisible(false)}
            >
              {year}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default function DesktopNavBar({
  categories,
}: {
  categories: Category[];
}) {
  return (
    <nav className="hidden w-full flex-row items-center justify-end gap-8 pr-4 md:flex">
      {categories.map((category, index) => (
        <Link
          key={index}
          href={`/${category.name}`}
          className="border-b border-transparent text-sm uppercase text-[--foreground-primary] hover:border-[--foreground-primary]"
        >
          {categoryTranslations[category.name]}
        </Link>
      ))}
      <Link
        href="/bio"
        className="border-b border-transparent text-sm uppercase text-[--foreground-primary] hover:border-[--foreground-primary]"
      >
        Bio
      </Link>
      <Link
        className="w-4 text-[--foreground-primary]"
        href={`${process.env.NEXT_PUBLIC_JOANA_INSTAGRAM_URL}`}
      >
        <Instagram className="h-4 w-4" />
      </Link>
    </nav>
  );
}
