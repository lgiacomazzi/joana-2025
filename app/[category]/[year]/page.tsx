import { fetchYearlyPaintings } from "@/lib/data";
import { Art } from "@/lib/definitions";
import Image from "next/image";

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
    <div>
      <p>
        {params.category} - {params.year}
      </p>
      {arts.map((art: Art, index: number) => (
        <Image
          key={index}
          src={art.image_url}
          alt={art.title}
          priority={index === 0}
          width={100}
          height={100}
        />
      ))}
    </div>
  );
}
