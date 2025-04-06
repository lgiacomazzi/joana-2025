"use client";

import { Category } from "@/lib/definitions";
import { categoryTranslations } from "@/lib/utils";
import Link from "next/link";
import { ComponentProps, useState } from "react";
import { twMerge } from "tailwind-merge";
import {
  Bars3Icon,
  XMarkIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/solid";

export function MobileNavLink({
  className,
  ...props
}: ComponentProps<typeof Link>) {
  return (
    <Link
      className={twMerge(
        "block p-3 text-sm uppercase text-zinc-100",
        className
      )}
      {...props}
    />
  );
}

export default function MobileMenu({ categories }: { categories: Category[] }) {
  const [open, setOpen] = useState(false);

  return (
    <div data-open={open} className="md:hidden">
      <button className="p-4" onClick={() => setOpen(true)}>
        <Bars3Icon className="w-6 h-6 active:scale-90 transition-all" />
      </button>
      {/* <div
        className={twMerge(
          "fixed left-0 top-0 h-full w-full bg-zinc-950 opacity-60",
          open === false && "hidden",
          open === true && ""
        )}
      /> */}
      <div
        className={twMerge(
          "fixed left-0 top-0 z-50 h-screen w-full overflow-y-scroll bg-zinc-950 pb-20 duration-500",
          open === false && "translate-y-[100%] opacity-80 rounded-3xl",
          open === true && "translate-y-[0%] opacity-100 rounded-none"
        )}
      >
        <div className="flex justify-end p-5">
          <button className="p-4 text-zinc-100" onClick={() => setOpen(false)}>
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>
        <nav>
          <MobileNavLink href="/">Home</MobileNavLink>
          {categories.map((category, index) => (
            <div key={category.name}>
              <MobileNavLink
                key={index}
                href={`/${category.name}`}
                onClick={() => setOpen(false)}
              >
                {categoryTranslations[category.name]}
              </MobileNavLink>
              {category.years.map(
                (year, index) =>
                  year && (
                    <MobileNavLink
                      key={index}
                      href={`/${category.name}/${year}`}
                      className="flex pl-12"
                      onClick={() => setOpen(false)}
                    >
                      {year}
                      <ChevronRightIcon className="ml-2 w-4" />
                    </MobileNavLink>
                  )
              )}
            </div>
          ))}
          <MobileNavLink href="bio">Bio</MobileNavLink>
          <MobileNavLink href="bio">Instagram</MobileNavLink>
        </nav>
      </div>
    </div>
  );
}
