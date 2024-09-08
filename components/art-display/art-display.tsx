import { Art } from "@/lib/definitions";
import Image from "next/image";

export default function ArtDisplay({ art }: { art: Art }) {
  return (
    <div
      key={art.id}
      className="flex min-w-[40vw] shrink flex-col justify-center max-md:mb-10 md:pl-40"
    >
      <Image
        src={art.image_url}
        alt={art.title}
        width={400}
        height={400}
        className="w-full"
      />
      <div className="p-4 text-xs md:max-w-[300px] md:px-0">
        <p className="font-bold uppercase text-zinc-200">{art.title}</p>
        <p className="text-zinc-500">
          {art.description}
          {art.dimensions && ` [${art.dimensions}]`}
          {art.year && ` - ${art.year}`}
        </p>
      </div>
    </div>
  );
}
