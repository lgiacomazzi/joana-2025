"use client";

import { Art } from "@/lib/definitions";
import Link from "next/link";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import { categoryTranslations } from "@/lib/utils";

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
    <div className="h-[calc(90vh-64px)] md:h-[100vh]">
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
          <div className="uppercase p-4 bg-[--background-disabled]">
            <span className="text-[--foreground-tertiary]">{art.year}</span> /{" "}
            <span>{categoryTranslations[art.category]}</span>
          </div>
        </Link>
      ))}
    </div>
  );
}
