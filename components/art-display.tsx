import { Art } from "@/lib/definitions";
import ProcessedImage from "./processed-image";
import Link from "next/link";

export default function ArtDisplay({ art }: { art: Art }) {
  return (
    <Link
      href={`/art/${art.id}`}
      key={art.id}
      prefetch={false}
      className="flex flex-col justify-center active:scale-90 transition-all break-inside-avoid"
    >
      <ProcessedImage art={art} />
      <div className="p-1 md:px-0">
        {art.is_available && (
          <p className=" text-xs text-green-500">Disponível</p>
        )}
        <p className="text-xs font-bold text-[--foreground-primary]">
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
