"use client";

import { Category } from "@/lib/definitions";
import { categoryTranslations } from "@/lib/utils";
import Link from "next/link";
import Instagram from "@/public/instagram.svg";

type NavBarLinkProps = React.ComponentProps<typeof Link> & {
  children: React.ReactNode;
};

function NavBarLink({ children, ...props }: NavBarLinkProps) {
  return (
    <Link
      {...props}
      className="border-b border-transparent 
      text-xs uppercase text-[--foreground-secondary] 
      hover:text-[--foreground-primary] hover:border-[--foreground-primary] 
      active:scale-95
      transition-all"
    >
      {children}
    </Link>
  );
}

export default function DesktopNavBar({
  categories,
}: {
  categories: Category[];
}) {
  return (
    <nav className="hidden flex-row items-center justify-end gap-6 pr-4 md:flex">
      {/* Map de Categorias */}
      {categories.map((category, index) => (
        <NavBarLink key={index} href={`/${category.name}`}>
          {categoryTranslations[category.name]}
        </NavBarLink>
      ))}

      {/* Link bio */}
      {/* <NavBarLink href="/bio">Bio</NavBarLink> */}

      {/* Icon Links */}
      <NavBarLink href={`${process.env.NEXT_PUBLIC_JOANA_INSTAGRAM_URL}`}>
        <Instagram className="h-5 w-5" />
      </NavBarLink>
    </nav>
  );
}
