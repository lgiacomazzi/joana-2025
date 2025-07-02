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
  const [loadMore, setLoadMore] = useState(true);

  useEffect(() => {
    if (inView) {
      console.log("# Loading more...");
      GetPaginatedArts(page).then((data) => {
        console.log(data);
        if (Array.isArray(data) && data.length > 0) {
          setData((prev) => [...prev, ...data]);
        } else {
          setLoadMore(false);
        }
      });
      page++;
    }
  }, [data, inView]);

  return (
    <>
      <Galery arts={data} />

      {loadMore && (
        <div
          ref={ref}
          className="w-full flex justify-center flex-col items-center"
        >
          <Spinner className="text-[--foreground-secondary]" />
        </div>
      )}
    </>
  );
}
