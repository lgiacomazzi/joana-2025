import { Art } from "@/lib/definitions";
import ProcessedImage from "./processed-image";
import Link from "next/link";

export default function ArtDisplay({ art }: { art: Art }) {
  return (
    <Link
      href={`/art/${art.id}`}
      key={art.id}
      className="flex min-w-[40vw] flex-col justify-center mb-10 active:scale-90 transition-all break-inside-avoid"
    >
      <ProcessedImage art={art} />
      <div className="p-4 text-xs md:max-w-[300px] md:px-0">
        <p className="font-bold uppercase text-zinc-200">{art.title}</p>
        <p className="text-zinc-400">
          {/* <span>{art.description}</span> */}
          {/* <span>{art.dimensions && ` [${art.dimensions}]`}</span> */}
          <span>{art.year && `${art.year}`}</span>
        </p>
      </div>
    </Link>
  );
}
