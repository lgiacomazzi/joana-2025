import Image from "next/image";
import { fetchArts } from "@/lib/data";
import { EllipsisHorizontalIcon } from "@heroicons/react/24/outline";
import { TableCell, TableHead } from "@/components/admin/admin-table";

export default async function Admin() {
  const arts = await fetchArts();

  return (
    <div className="p-4">
      <div className="flex w-full justify-end pb-4 gap-2">
        <button className="text-xs p-3 border text-bold">Export</button>
        <button className="text-xs p-3 border text-bold">Import</button>
        <button className="text-xs p-3 bg-blue-500 text-bold">Add Art</button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-[--border-color-default] text-xs table-auto">
          <thead>
            <tr>
              <TableHead>Imagem</TableHead>
              <TableHead>ID</TableHead>
              <TableHead className="text-left">Descrição</TableHead>
              <TableHead>Categoria</TableHead>
              <TableHead>Ano</TableHead>
              <TableHead>Link</TableHead>
              <TableHead></TableHead>
            </tr>
          </thead>
          <tbody>
            {arts.map((art) => (
              <tr
                key={art.id}
                className="hover:bg-[--background-disabled] h-16"
              >
                <TableCell className="p-2 max-w-fit">
                  <div className="relative w-12 h-12">
                    <Image
                      className="object-cover object-center rounded-lg border border-[--border-color-default] overflow-hidden"
                      src={art.image_url}
                      fill
                      alt={""}
                    />
                  </div>
                </TableCell>
                <TableCell>{art.id}</TableCell>
                <TableCell>
                  <p className="text-[--foreground-default] font-bold uppercase">
                    {art.title}
                  </p>
                  <p className="text-[--foreground-tertiary]">
                    {art.description}
                  </p>
                  <p className="text-[--foreground-tertiary]">
                    {art.dimensions && `${art.dimensions}`}
                  </p>
                </TableCell>
                <TableCell>{art.category}</TableCell>
                <TableCell>{art.year}</TableCell>
                <TableCell>
                  <a className="text-blue-500" href={art.image_url}>
                    {art.image_url}
                  </a>
                </TableCell>
                <TableCell>
                  <button className="p-2">
                    <EllipsisHorizontalIcon className="w-6 h-6 active:scale-90 transition-all " />
                  </button>
                </TableCell>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
