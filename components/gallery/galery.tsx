"use client";

import { Art } from "@/lib/definitions";
import ArtDisplay from "../art-display";

export default function Galery({
  arts,
  columns = 2,
}: {
  arts: Art[];
  columns?: number;
}) {
  const columnArts: Art[][] = Array.from({ length: columns }, () => []);

  arts.forEach((art, index) => {
    columnArts[index % columns].push(art);
  });

  return (
    <div className="flex gap-4 px-4 md:max-w-[60vw] md:gap-40 md:m-auto">
      {columnArts.map((artsInColumn, columnIndex) => (
        <div
          key={columnIndex}
          className="flex-1 flex flex-col gap-12 md:gap-20"
        >
          {artsInColumn.map((art, i) => (
            <ArtDisplay key={`${columnIndex}-${i}`} art={art} />
          ))}
        </div>
      ))}
    </div>
  );
}
