import Galery from "@/components/gallery/galery";
import { fetchArtById, fetchRelatedArtsFromId } from "@/lib/data";
import { ShoppingBagIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";

type ArtPageParams = {
  id: string;
};

export async function generateMetadata({ params }: { params: ArtPageParams }) {
  const art = await fetchArtById(params.id);

  return {
    title: art.title + " | Joana Brum Brasil",
  };
}

export default async function ArtPage({ params }: { params: ArtPageParams }) {
  const art = await fetchArtById(params.id);
  const relatedArts = await fetchRelatedArtsFromId(params.id);

  const whatsappMessage = `Olá, acessei seu site e me interessei por esta obra: ${process.env.NEXT_PUBLIC_SITE_URL}/art/${params.id}`;
  const whatsappUrl = `https://wa.me/${
    process.env.NEXT_PUBLIC_JOANA_PHONE_NUMBER
  }?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <>
      <div className="flex flex-col md:flex-row md:m-auto md: md:max-w-[80vw] h-[calc(100vh-2*(var(--header-height)))] border-b border-[--border-color-default] md:border-none md:mb-20 justify-center">
        <div className="relative flex-1 m-4">
          <Image
            src={art.image_url}
            alt={art.title}
            fill
            className="object-contain"
          />
        </div>
        <div className="md:w-60 p-4 md:py-10">
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
            {art.year && ` [${art.year}]`}
          </p>
          {art.is_available ? (
            <Link
              href={whatsappUrl}
              target="_blank"
              className="w-full flex flex-1 flex-row gap-2 items-center justify-center font-bold h-12 px-6 bg-green-500 text-black rounded-full active:scale-90 transition-all"
            >
              <ShoppingBagIcon className="w-6 h-6" />
              Comprar
            </Link>
          ) : (
            <button
              disabled
              className="flex flex-1 w-full flex-row gap-2 items-center justify-center font-bold h-12 px-6 bg-[--background-disabled] text-[--foreground-disabled] rounded-full"
            >
              Indisponível
            </button>
          )}
        </div>
      </div>
      {relatedArts && relatedArts.length > 0 && (
        <div className="p-4">
          <p className="uppercase text-xs text-[--foreground-tertiary]">
            Obras relacionadas:
          </p>
        </div>
      )}
      <Galery arts={relatedArts} />
    </>
  );
}
