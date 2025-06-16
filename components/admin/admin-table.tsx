"use client";

import { Art } from "@/lib/definitions";
import {
  StarIcon,
  CurrencyDollarIcon,
  PencilSquareIcon,
  EyeIcon,
  EyeSlashIcon,
  StarIcon as StarIconOutline,
} from "@heroicons/react/16/solid";

import { ComponentProps, useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import Image from "next/image";
import Link from "next/link";

import {
  DeleteArt,
  GetArts,
  SetArtForSale,
  SetArtInCarousel,
  SetArtVisibility,
} from "@/app/actions";

export function shortenUrl(url: string, maxLength = 40): string {
  if (url.length <= maxLength) return url;
  const start = url.slice(0, 15);
  const end = url.slice(-10);
  return `${start}...${end}`;
}

export const TableHead = ({ children, className }: ComponentProps<"th">) => {
  return (
    <th
      className={twMerge(
        "p-2 border border-[--border-color-default] uppercase",
        className
      )}
    >
      {children}
    </th>
  );
};

export const TableCell = ({ children, className }: ComponentProps<"td">) => {
  return (
    <td
      className={twMerge(
        "px-2 border border-[--border-color-default]",
        className
      )}
    >
      {children}
    </td>
  );
};

export const AdminTable = ({
  search,
  category,
  year,
}: {
  search?: string;
  category?: string;
  year?: string;
}) => {
  const [data, setData] = useState<Art[]>([]);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    // alert("useEffect triggered");
    GetArts().then((data) => {
      if (Array.isArray(data)) {
        setData(data);
      }
    });
  }, [refreshKey]);

  const handleAction = async (action: string, id: string) => {
    switch (action) {
      case "hide":
        await SetArtVisibility(id, false);
        break;
      case "show":
        await SetArtVisibility(id, true);
        break;
      case "star":
        await SetArtInCarousel(id, true);
        break;
      case "unstar":
        await SetArtInCarousel(id, false);
        break;
      case "sell":
        await SetArtForSale(id, true);
        break;
      case "unsell":
        await SetArtForSale(id, false);
        break;
      default:
        console.warn("Ação desconhecida:", action);
    }

    // Depois de qualquer ação, atualiza os dados:
    // alert("RefreshKey: " + refreshKey);
    setRefreshKey((prev) => prev + 1);
  };

  const handleEdit = () => {
    alert("edit");
  };

  return (
    <div className="p-4">
      <div className="overflow-x-auto">
        <table className="min-w-full border border-[--border-color-default] text-xs table-auto">
          <thead>
            <tr>
              <TableHead>Preview</TableHead>
              <TableHead>ID</TableHead>
              <TableHead className="text-left">Descrição</TableHead>
              <TableHead>Categoria</TableHead>
              <TableHead>Ano</TableHead>
              <TableHead className="w-10">Link</TableHead>
              <TableHead className="w-4"></TableHead>
            </tr>
          </thead>
          <tbody>
            {data.map((art) => (
              <tr
                key={art.id}
                className={twMerge(
                  "hover:bg-[--background-disabled] h-16",
                  !art.is_visible && "opacity-50"
                )}
              >
                <TableCell className="p-2 max-w-fit">
                  <div className="relative w-12 h-12">
                    {art.is_visible && (
                      <Image
                        className="w-full h-full object-cover object-center rounded-lg border border-[--border-color-default] overflow-hidden"
                        src={art.image_url}
                        width={40}
                        height={40}
                        alt={""}
                      />
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <Link href={`/art/${art.id}`}>{art.id}</Link>
                </TableCell>
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
                  <Link className="text-blue-500" href={art.image_url}>
                    {shortenUrl(art.image_url)}
                  </Link>
                </TableCell>
                <TableCell className="p-0">
                  <div className="flex flex-row">
                    {art.is_visible ? (
                      <button
                        className="p-2"
                        title="Esconder Imagem"
                        onClick={() => handleAction("hide", art.id)}
                      >
                        <EyeIcon className="w-4 h-4 active:scale-90 transition-all " />
                      </button>
                    ) : (
                      <button
                        className="p-2"
                        title="Mostrar Imagem"
                        onClick={() => handleAction("show", art.id)}
                      >
                        <EyeSlashIcon className="w-4 h-4 active:scale-90 transition-all" />
                      </button>
                    )}

                    {art.in_carousel ? (
                      <button
                        className="p-2"
                        title="Remover do Carousel"
                        onClick={() => handleAction("unstar", art.id)}
                      >
                        <StarIcon className="w-4 h-4 active:scale-90 transition-all text-orange-400" />
                      </button>
                    ) : (
                      <button
                        className="p-2"
                        title="Adicionar ao Carousel"
                        onClick={() => handleAction("star", art.id)}
                      >
                        <StarIconOutline className="w-4 h-4 active:scale-90 transition-all " />
                      </button>
                    )}

                    {art.is_available ? (
                      <button
                        className="p-2"
                        title="Tornar indisponível"
                        onClick={() => handleAction("unsell", art.id)}
                      >
                        <CurrencyDollarIcon className="w-4 h-4 active:scale-90 transition-all text-green-500" />
                      </button>
                    ) : (
                      <button
                        className="p-2"
                        title="Tornar disponível"
                        onClick={() => handleAction("sell", art.id)}
                      >
                        <CurrencyDollarIcon className="w-4 h-4 active:scale-90 transition-all" />
                      </button>
                    )}

                    <button
                      className="p-2"
                      title="Deletar"
                      onClick={() => handleEdit()}
                    >
                      <PencilSquareIcon className="w-4 h-4 active:scale-90 transition-all " />
                    </button>
                  </div>
                </TableCell>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
