"use client";

import { Art } from "@/lib/definitions";
import ArtDisplay from "../art-display";

export default function Galery({ arts }: { arts: Art[] }) {
  return (
    <div className="flex gap-4 px-4 md:max-w-[60vw] md:gap-40 md:m-auto">
      <div className="flex-1 flex flex-col gap-12 md:gap-20">
        {arts.map((art, i) => i % 2 === 0 && <ArtDisplay key={i} art={art} />)}
      </div>
      <div className="flex-1 flex flex-col gap-12 md:gap-20">
        {arts.map((art, i) => i % 2 !== 0 && <ArtDisplay key={i} art={art} />)}
      </div>
    </div>
  );
}
