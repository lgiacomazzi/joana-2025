import { fetchArts } from "@/lib/data";
import { Art } from "@/lib/definitions";
import Image from "next/image";

export default async function Home() {
  const arts = await fetchArts();

  return (
    <div>
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
