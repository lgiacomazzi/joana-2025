import ArtDisplay from "@/components/art-display";
import { fetchYearlyPaintings } from "@/lib/data";
import { Art } from "@/lib/definitions";

type YearlyCategoryPageParams = {
  year: string;
  category: string;
};

export default async function YearlyCategoryPage({
  params,
}: {
  params: YearlyCategoryPageParams;
}) {
  const arts = await fetchYearlyPaintings(params.year, params.category);

  return (
    <div className="">
      {arts.map((art: Art, index: number) => (
        <ArtDisplay art={art} key={index} />
      ))}
    </div>
  );
}
