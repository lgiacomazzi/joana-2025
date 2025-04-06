import ArtDisplay from "@/components/art-display";
import Image from "next/image";
import { fetchArts, fetchHomeArts } from "@/lib/data";
import { Art } from "@/lib/definitions";
import { Carousel } from "@/components/carousel";

export default async function Home() {
  const homeArts = await fetchHomeArts();
  const arts = await fetchArts();

  return (
    <>
      <Carousel arts={homeArts} />
      <div className="columns-2 gap-4 px-4">
        {arts.map((art: Art, index: number) => (
          <ArtDisplay art={art} key={index} />
        ))}
      </div>
    </>
  );
}
