"use client";

import { categoryTranslations } from "@/lib/utils";
import { CurrencyDollarIcon, StarIcon } from "@heroicons/react/24/solid";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import FolderClose from "@/public/folder-close.svg";
// import FolderOpen from "@/public/folder-open.svg";
import Spinner from "@/public/spinner.svg";
import { GetCategories } from "@/app/actions";

type SidebarItemProps = {
  name: string;
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

const defaultSidebarItems: SidebarItemProps[] = [
  { name: "all" },
  { name: "is_available", icon: StarIcon },
  { name: "in_carousel", icon: CurrencyDollarIcon },
];

const getPageName = (searchParams: string): string => {
  const params = new URLSearchParams(searchParams);

  // Check for specific parameters in order of priority
  if (params.has("category")) return params.get("category") || "all";
  if (params.has("is_available")) return "is_available";
  if (params.has("in_carousel")) return "in_carousel";

  // Default value
  return "all";
};

const buildSearchParams = (filterName: string): string => {
  const params = new URLSearchParams();

  params.delete("category");
  params.delete("is_available");
  params.delete("in_carousel");

  if (filterName === "is_available" || filterName === "in_carousel") {
    params.set(filterName, "true");
  } else if (filterName !== "all") {
    params.set("category", filterName);
  }

  return params.toString();
};

export function SidebarItem({
  sidebarItem,
  isSelected,
  ...props
}: {
  sidebarItem: SidebarItemProps;
  isSelected?: boolean;
} & React.LiHTMLAttributes<HTMLLIElement>) {
  const { name, icon: Icon = FolderClose } = sidebarItem;

  return (
    <li
      className={twMerge(
        "flex items-center gap-2 text-xs font-bold p-2 rounded-lg cursor-pointer w-full",
        isSelected && "bg-blue-500"
      )}
      {...props}
    >
      <Icon
        className={twMerge(
          "w-4 h-4 text-[--foreground-tertiary]",
          isSelected && "text-[--foreground-primary]"
        )}
      />
      {categoryTranslations[name]}
    </li>
  );
}

export default function AdminSidebar() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [isLoading, setIsLoading] = useState(true);
  const [menuItems, setMenuItems] = useState<SidebarItemProps[]>([]);
  const [activeFilter, setActiveFilter] =
    useState<SidebarItemProps["name"]>("all");

  useEffect(() => {
    const initializeSidebar = async () => {
      try {
        const fetchedCategories = await GetCategories();
        if (Array.isArray(fetchedCategories) && fetchedCategories.length > 0) {
          const items = fetchedCategories.map((category) => ({
            name: category.name,
          }));
          setMenuItems([...defaultSidebarItems, ...items]);
        }

        setActiveFilter(getPageName(searchParams.toString()));
      } catch (error) {
        console.error("Failed to initialize sidebar:", error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeSidebar();
  }, [searchParams]);

  const handleClick = (item: SidebarItemProps) => {
    setActiveFilter(item.name);
    const updatedParams = buildSearchParams(item.name);
    router.push(`?${updatedParams}`);
  };

  return (
    <div className="bg-[--background-disabled] border-r border-[--border-color-default] w-60 h-full flex flex-col items-center gap-4 flex-shrink-0 py-4 overflow-y-auto">
      {isLoading ? (
        <Spinner />
      ) : (
        <ul className="px-2 w-full">
          {menuItems.map((item) => (
            <SidebarItem
              key={item.name}
              sidebarItem={item}
              isSelected={item.name === activeFilter}
              onClick={() => handleClick(item)}
            />
          ))}
        </ul>
      )}
    </div>
  );
}
