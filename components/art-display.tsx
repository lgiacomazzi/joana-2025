import { Art } from "@/lib/definitions";
import ProcessedImage from "./processed-image";
import Link from "next/link";

export default function ArtDisplay({ art }: { art: Art }) {
  return (
    <Link
      href={`/art/${art.id}`}
      key={art.id}
      prefetch={false}
      className="flex min-w-[40vw] flex-col justify-center mb-10 active:scale-90 transition-all break-inside-avoid"
    >
      <ProcessedImage art={art} />
      <div className="p-2 text-xs md:max-w-[300px] md:px-0">
        <p className="font-bold uppercase text-[--foreground-primary]">
          {art.title}
        </p>
        <p className="text-[--foreground-secondary]">
          {/* {art.description} */}
          {/* {art.dimensions && ` [${art.dimensions}]`} */}
          {art.year && `[${art.year}]`}
        </p>
      </div>
    </Link>
  );
}
