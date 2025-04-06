"use client";

import { Art } from "@/lib/definitions";
import Link from "next/link";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";

export function Carousel({ arts }: { arts: Art[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // const goToPrevious = () => {
  //   const isFirstItem = currentIndex === 0;
  //   const newIndex = isFirstItem ? arts.length - 1 : currentIndex - 1;
  //   setCurrentIndex(newIndex);
  // };

  const goToNext = useCallback(() => {
    const isLastItem = currentIndex === arts.length - 1;
    const newIndex = isLastItem ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  }, [currentIndex, arts.length, setCurrentIndex]);

  useEffect(() => {
    const timer = setInterval(() => {
      goToNext();
    }, 2000);
    return () => clearInterval(timer);
  }, [currentIndex, goToNext]);

  return (
    <div className="relative h-[70vh] overflow-hidden mb-4 p-4">
      {arts.map((art: Art, index: number) => (
        <Link key={art.id} href={`/art/${art.id}`}>
          <Image
            src={art.image_url}
            alt={art.title}
            priority={index === 0}
            fill
            className={twMerge(
              "object-contain absolute inset-0 mx-auto opacity-0 transition focus:scale-125",
              index === currentIndex && "scale-105 opacity-100"
            )}
          />
        </Link>
      ))}
    </div>
  );
}
