"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";

import { GetPaginatedArts } from "@/app/actions";
import { Art } from "@/lib/definitions";

import Spinner from "@/public/spinner.svg";
import Galery from "./galery";

export default function LoadMore() {
  const { ref: loaderRef, inView } = useInView();
  const [arts, setArts] = useState<Art[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const pageRef = useRef(1);

  const fetchNextPage = async () => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);
    const nextPage = pageRef.current;

    try {
      const newArts = await GetPaginatedArts(nextPage);

      if (Array.isArray(newArts) && newArts.length > 0) {
        setArts((prev) => [...prev, ...newArts]);
        pageRef.current += 1;
      } else {
        setHasMore(false);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (inView) {
      fetchNextPage();
      // GetPaginatedArts(page).then((newArts) => {
      //   if (Array.isArray(newArts) && newArts.length > 0) {
      //     setArts((prev) => [...prev, ...newArts]);
      //   } else {
      //     setHasMore(false);
      //   }
      // });
      // page++;
    }
  }, [inView]);

  return (
    <>
      <Galery arts={arts} />
      {hasMore && (
        <div
          ref={loaderRef}
          className="w-full flex justify-center flex-col items-center"
        >
          {isLoading && <Spinner className="text-[--foreground-secondary]" />}
        </div>
      )}
    </>
  );
}
