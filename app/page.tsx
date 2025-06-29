import { fetchAvailableArts, fetchHomeArts } from "@/lib/data";
import { Carousel } from "@/components/carousel";
import LoadMore from "@/components/gallery/load-more";
import Galery from "@/components/gallery/galery";

export default async function Home() {
  const homeArts = await fetchHomeArts();
  const availableArts = await fetchAvailableArts();

  return (
    <div className="flex flex-col gap-10 pb-4">
      {/* Carousel de entrada */}
      <Carousel arts={homeArts} />

      {/* Região para artes dispníveis */}
      <Galery arts={availableArts} />

      {/* Galeria de artes */}
      <LoadMore />
    </div>
  );
}
