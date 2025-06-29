import Galery from "@/components/gallery/galery";
import { fetchCategoryArts } from "@/lib/data";
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
    <div className="py-4">
      <Galery arts={arts} />
    </div>
  );
}
