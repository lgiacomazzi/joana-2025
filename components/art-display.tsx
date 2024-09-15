import { Art } from "@/lib/definitions";
import ProcessedImage from "./processed-image";
import Link from "next/link";

export default function ArtDisplay({ art }: { art: Art }) {
  return (
    <Link
      href={`/art/${art.id}`}
      key={art.id}
      className="flex min-w-[40vw] flex-col justify-center mb-10"
    >
      <ProcessedImage art={art} />
      <div className="p-4 text-xs md:max-w-[300px] md:px-0">
        <p className="font-bold uppercase text-zinc-200">{art.title}</p>
        <p className="text-zinc-400">
          {art.description}
          {art.dimensions && ` [${art.dimensions}]`}
          {art.year && ` - ${art.year}`}
        </p>
      </div>
    </Link>
  );
}
