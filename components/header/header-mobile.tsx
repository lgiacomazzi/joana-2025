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
import Instagram from "@/public/instagram.svg";
import WhatsApp from "@/public/whatsApp.svg";
import JoanaBrum from "@/public/joana-new.svg";
import { EnvelopeIcon } from "@heroicons/react/24/outline";

export function MobileNavLink({
  className,
  children,
  ...props
}: ComponentProps<typeof Link>) {
  return (
    <Link
      className={twMerge(
        "flex p-4 text-sm uppercase text-[--foreground-primary] justify-between border-[--border-color-default] border-b",
        className
      )}
      {...props}
    >
      {children}
      <ChevronRightIcon className="ml-2 w-4" />
    </Link>
  );
}

export default function MobileMenu({ categories }: { categories: Category[] }) {
  const [open, setOpen] = useState(false);

  return (
    <div data-open={open} className="md:hidden">
      <button className="p-3" onClick={() => setOpen(true)}>
        <Bars3Icon className="w-6 h-6 active:scale-90 transition-all" />
      </button>
      <div
        className={twMerge(
          "flex flex-col gap-4 fixed left-0 top-0 z-50 h-screen w-full overflow-y-scroll bg-[--background-default] pb-20 duration-200",
          open === false && "translate-x-[100%]",
          open === true && "translate-x-[0%]"
        )}
      >
        <div className="flex flex-row justify-end h-[--header-height]">
          <button
            className="p-3 text-[--foreground-primary]"
            onClick={() => setOpen(false)}
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>
        <nav>
          <MobileNavLink href="/" onClick={() => setOpen(false)}>
            Home
          </MobileNavLink>
          <MobileNavLink href="bio" onClick={() => setOpen(false)}>
            Bio
          </MobileNavLink>
          {categories.map((category, index) => (
            <div key={category.name}>
              <MobileNavLink
                key={index}
                href={`/${category.name}`}
                onClick={() => setOpen(false)}
              >
                {categoryTranslations[category.name]}
              </MobileNavLink>
            </div>
          ))}
        </nav>
        <div className="flex flex-row items-center p-4 text-[--foreground-secondary]">
          <JoanaBrum className="h-6 mr-auto" />

          <Link
            href={`${process.env.NEXT_PUBLIC_JOANA_INSTAGRAM_URL}`}
            target="_blank"
            className="p-3"
          >
            <Instagram className="h-6 w-6" />
          </Link>
          <Link
            href={`https://wa.me/${process.env.NEXT_PUBLIC_JOANA_PHONE_NUMBER}`}
            target="_blank"
            className="p-3"
          >
            <WhatsApp className="h-6 w-6" />
          </Link>
          <Link
            href={`mailto:${process.env.NEXT_PUBLIC_JOANA_EMAIL}`}
            target="_blank"
            className="p-3"
          >
            <EnvelopeIcon className="h-6 w-6" />
          </Link>
        </div>
      </div>
    </div>
  );
}
