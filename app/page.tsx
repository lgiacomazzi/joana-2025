import ArtDisplay from "@/components/art-display";
import { fetchArts, fetchAvailableArts, fetchHomeArts } from "@/lib/data";
import { Carousel } from "@/components/carousel";

export default async function Home() {
  const homeArts = await fetchHomeArts();
  const arts = await fetchArts();
  const availableArts = await fetchAvailableArts();

  return (
    <div className="pt-[64px] flex flex-col gap-10">
      <Carousel arts={homeArts} />
      {/* <div className="columns-2 gap-4 px-4">
        {arts.map((art: Art, index: number) => (
          <ArtDisplay art={art} key={index} />
        ))}
      </div> */}

      <div className="px-4 hidden">
        <div className="flex flex-row gap-4 overflow-x-scroll">
          {availableArts.map((art, i) => (
            <ArtDisplay key={i} art={art} />
          ))}
        </div>
      </div>

      <div className="flex gap-4 px-4 md:max-w-5xl md:m-auto">
        <div className="flex-1 flex flex-col gap-20">
          {arts.map(
            (art, i) => i % 2 === 0 && <ArtDisplay key={i} art={art} />
          )}
        </div>
        <div className="flex-1 flex flex-col gap-20">
          {arts.map(
            (art, i) => i % 2 !== 0 && <ArtDisplay key={i} art={art} />
          )}
        </div>
      </div>
    </div>
  );
}
