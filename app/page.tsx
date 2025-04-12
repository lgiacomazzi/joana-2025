import ArtDisplay from "@/components/art-display";
import { fetchArts, fetchHomeArts } from "@/lib/data";
import { Carousel } from "@/components/carousel";

export default async function Home() {
  const homeArts = await fetchHomeArts();
  const arts = await fetchArts();

  return (
    <div className="pt-[64px]">
      <Carousel arts={homeArts} />
      {/* <div className="columns-2 gap-4 px-4">
        {arts.map((art: Art, index: number) => (
          <ArtDisplay art={art} key={index} />
        ))}
      </div> */}
      <div className="flex gap-4 px-4">
        <div className="flex-1 flex flex-col gap-4">
          {arts.map(
            (art, i) => i % 2 === 0 && <ArtDisplay key={i} art={art} />
          )}
        </div>
        <div className="flex-1 flex flex-col gap-4">
          {arts.map(
            (art, i) => i % 2 !== 0 && <ArtDisplay key={i} art={art} />
          )}
        </div>
      </div>
    </div>
  );
}
