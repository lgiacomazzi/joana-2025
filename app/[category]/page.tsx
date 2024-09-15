import ArtDisplay from "@/components/art-display";
import { fetchCategoryArts } from "@/lib/data";
import { Art } from "@/lib/definitions";
import { categoryTranslations } from "@/lib/utils";
import { Metadata, ResolvingMetadata } from "next";

type CategoryPageParams = {
  category: string;
};

export async function generateMetadata(
  { params }: { params: CategoryPageParams },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const parentTitle = (await parent).title?.absolute;
  const title = `${categoryTranslations[params.category]} - ${parentTitle}`;
  return { title };
}

export default async function CategoryPage({
  params,
}: {
  params: CategoryPageParams;
}) {
  const arts = await fetchCategoryArts(params.category);

  return (
    <div>
      <p>{params.category}</p>
      {arts.map((art: Art, index: number) => (
        <ArtDisplay art={art} key={index} />
      ))}
    </div>
  );
}
