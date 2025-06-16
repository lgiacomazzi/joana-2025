import ArtDisplay from "@/components/art-display";
import { fetchAvailableArts, fetchHomeArts } from "@/lib/data";
import { Carousel } from "@/components/carousel";
import LoadMore from "@/components/gallery/load-more";

export default async function Home() {
  const homeArts = await fetchHomeArts();
  const availableArts = await fetchAvailableArts();

  return (
    <div className="py-[64px] flex flex-col gap-10">
      {/* Carousel de entrada */}
      <Carousel arts={homeArts} />

      {/* Região para artes dispníveis */}
      <div className="px-4 hidden">
        <div className="flex flex-row gap-4 overflow-x-scroll">
          {availableArts.map((art, i) => (
            <ArtDisplay key={i} art={art} />
          ))}
        </div>
      </div>

      {/* <div className="flex gap-4 px-4 md:max-w-5xl md:m-auto">
        <div className="flex-1 flex flex-col gap-12">
          {arts.map(
            (art, i) => i % 2 === 0 && <ArtDisplay key={i} art={art} />
          )}
        </div>
        <div className="flex-1 flex flex-col gap-12">
          {arts.map(
            (art, i) => i % 2 !== 0 && <ArtDisplay key={i} art={art} />
          )}
        </div>
      </div> */}

      <LoadMore />
    </div>
  );
}
