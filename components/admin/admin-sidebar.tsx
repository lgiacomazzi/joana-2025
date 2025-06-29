"use client";

import { Category } from "@/lib/definitions";
import { categoryTranslations } from "@/lib/utils";
import { FolderIcon } from "@heroicons/react/24/outline";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { twMerge } from "tailwind-merge";

interface AdminSidebarProps {
  categories: Category[];
}

export function SidebarItem({
  category,
  isSelected,
  children,
  ...props
}: {
  category?: Category;
  children?: React.ReactNode;
  isSelected?: boolean;
} & React.LiHTMLAttributes<HTMLLIElement>) {
  return (
    <li
      className={twMerge(
        "flex items-center gap-2 text-xs font-bold p-2 rounded-lg cursor-pointer",
        isSelected && "bg-blue-500"
      )}
      {...props}
    >
      <FolderIcon
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

  console.log("Renderizando Sidebar com categoria", selectedCategory);

  const handleCategoryClick = (name: string) => {
    console.log("Alterando categoria para", name);

    setSelectedCategory(name === "all" ? null : name);

    const params = new URLSearchParams();
    params.set("category", name);

    if (name === "all") {
      params.delete("category");
    }

    router.push(`?${params.toString()}`);
  };

  return (
    <div className="bg-[--background-disabled] border-r border-[--border-color-default] w-60 h-full flex-shrink-0 py-4 overflow-y-auto">
      <ul className="px-2">
        <SidebarItem
          isSelected={selectedCategory === null}
          onClick={() => handleCategoryClick("all")}
        >
          Todas
        </SidebarItem>
        {categories.map((category) => (
          <SidebarItem
            category={category}
            key={category.name}
            isSelected={selectedCategory === category.name}
            onClick={() => handleCategoryClick(category.name)}
          />
        ))}
      </ul>
    </div>
  );
}
