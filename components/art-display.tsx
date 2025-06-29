import { Art } from "@/lib/definitions";
import ProcessedImage from "./processed-image";
import Link from "next/link";

export default function ArtDisplay({ art }: { art: Art }) {
  return (
    <Link
      href={`/art/${art.id}`}
      key={art.id}
      prefetch={false}
      className="relative flex flex-col justify-center transition-all break-inside-avoid hover:scale-105"
    >
      <ProcessedImage art={art} />
      <div className="p-1">
        {art.is_available && (
          <p className=" text-xs text-green-500">Disponível</p>
        )}
        <p className="text-xs uppercase font-bold text-[--foreground-primary]">
          {art.title}
        </p>
        <p className="text-xs text-[--foreground-tertiary]">
          {/* {art.description} */}
          {/* {art.dimensions && ` [${art.dimensions}]`} */}
          {art.year && `${art.year}`}
        </p>
      </div>
    </Link>
  );
}
