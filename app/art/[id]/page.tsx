import Galery from "@/components/gallery/galery";
import { fetchArtById, fetchRelatedArtsFromId } from "@/lib/data";
import { ShoppingBagIcon } from "@heroicons/react/24/solid";
import Image from "next/image";

type ArtPageParams = {
  id: string;
};

export default async function ArtPage({ params }: { params: ArtPageParams }) {
  const art = await fetchArtById(params.id);
  const relatedArts = await fetchRelatedArtsFromId(params.id);

  return (
    <div className="py-[64px]">
      <div className="flex justify-center">
        <Image
          src={art.image_url}
          alt={art.title}
          width={400}
          height={400}
          className="w-full"
        />
      </div>
      <div className="p-4 pb-12 mb-12 border-b border-[--border-color-default]">
        {art.is_available ? (
          <p className="text-xs text-green-500">Disponível</p>
        ) : (
          <p className="text-xs text-[--foreground-tertiary]">Indisponível</p>
        )}
        <p className="font-bold uppercase text-[--foreground-primary]">
          {art.title ? art.title : "Sem título"}
        </p>
        <p className="text-sm text-[--foreground-tertiary] mb-4">
          {art.description}
          {art.dimensions && ` [${art.dimensions}]`}
          {art.year && `[${art.year}]`}
        </p>
        {art.is_available ? (
          <button className="w-full flex flex-row gap-1 items-center justify-center font-bold h-10 px-6 bg-[--background-inverse] text-[--foreground-inverse] rounded-full active:scale-90 transition-all">
            <ShoppingBagIcon className="w-4 h-4" />
            Comprar
          </button>
        ) : (
          <button
            disabled
            className="w-full flex flex-row gap-1 items-center justify-center font-bold h-10 px-6 bg-[--background-disabled] text-[--foreground-disabled] rounded-full"
          >
            Indisponível
          </button>
        )}
      </div>
      <Galery arts={relatedArts} />
    </div>
  );
}
