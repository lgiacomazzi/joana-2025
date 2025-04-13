"use client";

import { GetPaginatedArts } from "@/app/actions";
import { Art } from "@/lib/definitions";
import { useEffect, useState } from "react";
import Spinner from "@/public/spinner.svg";
import { useInView } from "react-intersection-observer";
import Galery from "./galery";

let page = 1;

export default function LoadMore() {
  const { ref, inView } = useInView();
  const [data, setData] = useState<Art[]>([]);

  useEffect(() => {
    if (inView) {
      console.log("# Loading more...");
      GetPaginatedArts(page).then((data) => {
        if (Array.isArray(data)) {
          setData((prev) => [...prev, ...data]);
        }
      });
      page++;
    }
  }, [data, inView]);

  return (
    <>
      <Galery arts={data} />

      <div
        ref={ref}
        className="w-full flex justify-center flex-col items-center"
      >
        <Spinner className="text-[--foreground-secondary]" />
      </div>
    </>
  );
}
