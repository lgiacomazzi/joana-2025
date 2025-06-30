"use client";

import { Category } from "@/lib/definitions";
import { categoryTranslations } from "@/lib/utils";
import {
  CurrencyDollarIcon,
  FolderIcon,
  StarIcon,
} from "@heroicons/react/24/solid";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { twMerge } from "tailwind-merge";
import FolderClose from "@/public/folder-close.svg";
import FolderOpen from "@/public/folder-open.svg";

interface AdminSidebarProps {
  categories: Category[];
}

export function SidebarItem({
  category,
  isSelected,
  children,
  icon: Icon = FolderIcon,
  ...props
}: {
  category?: Category;
  children?: React.ReactNode;
  isSelected?: false | boolean;
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
} & React.LiHTMLAttributes<HTMLLIElement>) {
  return (
    <li
      className={twMerge(
        "flex items-center gap-2 text-xs font-bold p-2 rounded-lg cursor-pointer",
        isSelected && "bg-blue-500"
      )}
      {...props}
    >
      <Icon
        className={twMerge(
          "w-4 h-4 text-[--foreground-tertiary]",
          isSelected && "text-[--foreground-primary"
        )}
      />
      {category ? categoryTranslations[category.name] : children}
    </li>
  );
}

export default function AdminSidebar({ categories }: AdminSidebarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    searchParams.get("category")
  );

  const handleCategoryClick = (name: string) => {
    setSelectedCategory(name === "all" ? null : name);

    const params = new URLSearchParams();
    params.set("category", name);

    if (name === "all") {
      params.delete("category");
    }

    router.push(`?${params.toString()}`);
  };

  return (
    <div className="bg-[--background-disabled] border-r border-[--border-color-default] w-60 h-full flex flex-col gap-4 flex-shrink-0 py-4 overflow-y-auto">
      <ul className="px-2 hidden">
        <SidebarItem icon={StarIcon} onClick={() => handleCategoryClick("all")}>
          Carousel
        </SidebarItem>
        <SidebarItem
          icon={CurrencyDollarIcon}
          onClick={() => handleCategoryClick("all")}
        >
          Disponíveis
        </SidebarItem>
      </ul>
      <ul className="px-2">
        <SidebarItem
          icon={selectedCategory === null ? FolderOpen : FolderClose}
          isSelected={selectedCategory === null}
          onClick={() => handleCategoryClick("all")}
        >
          Todas
        </SidebarItem>
        {categories.map((category) => (
          <SidebarItem
            category={category}
            key={category.name}
            icon={selectedCategory === category.name ? FolderOpen : FolderClose}
            isSelected={selectedCategory === category.name}
            onClick={() => handleCategoryClick(category.name)}
          />
        ))}
      </ul>
    </div>
  );
}
