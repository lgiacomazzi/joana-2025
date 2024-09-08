import ArtDisplay from "@/components/art-display/art-display";
import { fetchArts } from "@/lib/data";
import { Art } from "@/lib/definitions";

export default async function Home() {
  const arts = await fetchArts();

  return (
    <div>
      {arts.map((art: Art, index: number) => (
        <ArtDisplay art={art} key={index} />
      ))}
    </div>
  );
}
