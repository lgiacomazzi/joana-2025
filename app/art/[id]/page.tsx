import { fetchArtById } from "@/lib/data";
import Image from "next/image";

type ArtPageParams = {
  id: string;
};

export default async function ArtPage({ params }: { params: ArtPageParams }) {
  const art = await fetchArtById(params.id);

  return (
    <div className="py-[64px]">
      <div className="flex justify-center">
        <Image
          src={art.image_url}
          alt={art.title}
          width={1000}
          height={1000}
          className="w-full"
        />
      </div>
      <div className="p-4 text-xs">
        {art.is_available ? (
          <p className=" text-xs text-green-500">Disponível</p>
        ) : (
          <p className=" text-xs text-[--foreground-tertiary]">Inisponível</p>
        )}
        <p className="font-bold uppercase text-[--foreground-primary]">
          {art.title}
        </p>
        <p className="text-[--foreground-secondary]">
          {art.description}
          {art.dimensions && ` [${art.dimensions}]`}
          {art.year && `[${art.year}]`}
        </p>
      </div>
      <div>subsequent arts...</div>
    </div>
  );
}
