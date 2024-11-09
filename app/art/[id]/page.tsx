import ArtDisplay from "@/components/art-display";
import { fetchArtById } from "@/lib/data";
import { Art } from "@/lib/definitions";

type ArtPageParams = {
  id: string;
};

export default async function ArtPage({ params }: { params: ArtPageParams }) {
  const arts = await fetchArtById(params.id);

  return (
    <div>
      <p>{params.id}</p>
      {arts.map((art: Art, index: number) => (
        <ArtDisplay art={art} key={index} />
      ))}
    </div>
  );
}
