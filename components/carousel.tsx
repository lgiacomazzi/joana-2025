"use client";

import { Art } from "@/lib/definitions";
import Link from "next/link";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import { categoryTranslations } from "@/lib/utils";
import { ChevronRightIcon } from "@heroicons/react/24/outline";

export function Carousel({ arts }: { arts: Art[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToNext = useCallback(() => {
    const isLastItem = currentIndex === arts.length - 1;
    const newIndex = isLastItem ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  }, [currentIndex, arts.length, setCurrentIndex]);

  useEffect(() => {
    const timer = setInterval(() => {
      goToNext();
    }, 1500);
    return () => clearInterval(timer);
  }, [currentIndex, goToNext]);

  return (
    <div className="h-[--carousel-height]">
      {arts.map((art: Art, index: number) => (
        <Link
          key={art.id}
          href={`/art/${art.id}`}
          className={twMerge(
            "opacity-0 hidden",
            "h-full w-full",
            "transition-all",
            index === currentIndex && "opacity-100 flex flex-col"
          )}
        >
          <div className="relative w-full h-full">
            <Image
              src={art.image_url}
              alt={art.title}
              priority={index === 0}
              fill
              className="object-cover md:object-contain"
            />
          </div>
          <div className="flex gap-1 text-sm uppercase items-center justify-center p-4 bg-[--background-disabled]">
            <span className="text-[--foreground-tertiary] max-w-[100%] truncate">
              {art.title}
            </span>
            /<span>{categoryTranslations[art.category]}</span>
            <ChevronRightIcon className="w-4 h-4 ml-auto" />
          </div>
        </Link>
      ))}
    </div>
  );
}
