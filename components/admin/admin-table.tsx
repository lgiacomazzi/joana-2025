"use client";

import { Art } from "@/lib/definitions";
import {
  StarIcon,
  CurrencyDollarIcon,
  EyeIcon,
  EyeSlashIcon,
  StarIcon as StarIconOutline,
  TrashIcon,
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

export const AdminTable = () => {
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
      case "delete":
        if (confirm("Tem certeza que deseja deletar esta arte?")) {
          await DeleteArt(id);
          alert("Arte deletada com sucesso.");
        }
      // alert("Arte deletada com sucesso.");
      default:
        console.warn("Ação desconhecida:", action);
    }

    // Depois de qualquer ação, atualiza os dados:
    // alert("RefreshKey: " + refreshKey);
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <div className="p-4">
      <div className="overflow-x-auto">
        <table className="min-w-full border border-[--border-color-default] text-xs table-auto">
          <thead>
            <tr>
              <TableHead>Image</TableHead>
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
                className={twMerge("h-16", !art.is_visible && "opacity-30")}
              >
                <TableCell>
                  <div className="flex gap-4">
                    <div className="relative w-8 h-8">
                      {art.is_visible && (
                        <Image
                          className="w-full h-full object-cover object-center rounded-lg border border-[--border-color-default] overflow-hidden"
                          src={art.image_url}
                          fill={true}
                          alt={""}
                        />
                      )}
                    </div>
                    <div>
                      <Link href={`/art/${art.id}`}>
                        <p className="text-[--foreground-default] font-bold">
                          {art.title || "{Sem título}"}
                        </p>
                      </Link>
                      <span
                        className="text-[--foreground-tertiary] cursor-pointer"
                        onClick={() => {
                          navigator.clipboard.writeText(art.id);
                          alert("ID copiado: " + art.id); // Optional feedback
                        }}
                      >
                        {art.id}
                      </span>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
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

                {/* Action Buttons */}
                <TableCell className="p-0">
                  <div className="flex flex-row">
                    {/* Botão para visibilidade */}
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

                    {/* Botão para Home/Carousel */}
                    {art.in_carousel ? (
                      <button
                        className="p-2 hover:scale-90 active:scale-90 transition-all"
                        title="Remover do Carousel"
                        onClick={() => handleAction("unstar", art.id)}
                      >
                        <StarIcon className="w-4 h-4 text-orange-400" />
                      </button>
                    ) : (
                      <button
                        className="p-2 hover:scale-90 active:scale-90 transition-all"
                        title="Adicionar ao Carousel"
                        onClick={() => handleAction("star", art.id)}
                      >
                        <StarIconOutline className="w-4 h-4" />
                      </button>
                    )}

                    {/* Botão para Disponibilidade */}
                    {art.is_available ? (
                      <button
                        className="p-2 hover:scale-90 active:scale-90 transition-all"
                        title="Tornar indisponível"
                        onClick={() => handleAction("unsell", art.id)}
                      >
                        <CurrencyDollarIcon className="w-4 h-4 text-green-500" />
                      </button>
                    ) : (
                      <button
                        className="p-2 hover:scale-90 active:scale-90 transition-all"
                        title="Tornar disponível"
                        onClick={() => handleAction("sell", art.id)}
                      >
                        <CurrencyDollarIcon className="w-4 h-4" />
                      </button>
                    )}

                    {/* Botão para Deletar */}
                    <button
                      className="p-2 hover:scale-90 active:scale-90 transition-all"
                      title="Deletar"
                      onClick={() => handleAction("delete", art.id)}
                    >
                      <TrashIcon className="w-4 h-4" />
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
