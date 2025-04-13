"use client";

import { GetPaginatedArts } from "@/app/actions";
import { Art } from "@/lib/definitions";
import { useState } from "react";
import ArtDisplay from "../art-display";
import Spinner from "@/public/spinner.svg";

let page = 1;

export default function LoadMore() {
  const [data, setData] = useState<Art[]>([]);

  const handleLoadMore = async () => {
    const data = await GetPaginatedArts(page);
    console.log(data);

    if (Array.isArray(data)) {
      setData((prev) => [...prev, ...data]);
      page++;
    }
  };

  return (
    <>
      <div className="flex gap-4 px-4 md:max-w-5xl md:m-auto">
        <div className="flex-1 flex flex-col gap-12">
          {data.map(
            (art, i) => i % 2 === 0 && <ArtDisplay key={i} art={art} />
          )}
        </div>
        <div className="flex-1 flex flex-col gap-12">
          {data.map(
            (art, i) => i % 2 !== 0 && <ArtDisplay key={i} art={art} />
          )}
        </div>
      </div>

      <div className="w-full flex justify-center flex-col items-center">
        <Spinner
          className="text-[--foreground-secondary]"
          onClick={() => handleLoadMore()}
        />
      </div>
    </>
  );
}
