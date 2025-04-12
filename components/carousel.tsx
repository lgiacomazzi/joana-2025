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
    }, 1500);
    return () => clearInterval(timer);
  }, [currentIndex, goToNext]);

  return (
    <div className="relative h-[70vh] overflow-hidden mb-4">
      {arts.map((art: Art, index: number) => (
        <div
          key={art.id}
          className={twMerge(
            "opacity-0 hidden",
            index === currentIndex && "opacity-100 block"
          )}
        >
          <Link href={`/art/${art.id}`}>
            <Image
              src={art.image_url}
              alt={art.title}
              priority={index === 0}
              fill
              className="object-cover"
            />
          </Link>
        </div>
      ))}
    </div>
  );
}
