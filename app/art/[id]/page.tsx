import { fetchArtById } from "@/lib/data";
import Image from "next/image";

type ArtPageParams = {
  id: string;
};

export default async function ArtPage({ params }: { params: ArtPageParams }) {
  const art = await fetchArtById(params.id);

  return (
    <div>
      <Image src={art.image_url} alt={art.title} width={400} height={400} />
      <div className="p-4 text-xs md:max-w-[300px] md:px-0">
        <p className="font-bold uppercase text-[--foreground-primary]">
          {art.title}
        </p>
        <p className="text-[--foreground-secondary]">
          {art.description}
          {art.dimensions && ` [${art.dimensions}]`}
          {art.year && `[${art.year}]`}
        </p>
      </div>
    </div>
  );
}
