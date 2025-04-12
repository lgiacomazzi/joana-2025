"use client";

import { Art } from "@/lib/definitions";
import { StarIcon, CurrencyDollarIcon } from "@heroicons/react/24/solid";
import {
  StarIcon as StarIconOutline,
  CurrencyDollarIcon as CurrencyDollarIconOutline,
  EyeIcon,
  EyeSlashIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";
import Image from "next/image";
import Link from "next/link";

import { DeleteArt, SetArtInCarousel, SetArtVisibility } from "@/app/actions";

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

export const AdminTable = ({ arts }: { arts: Art[] }) => {
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
            {arts.map((art) => (
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
                    {art.image_url}
                  </Link>
                </TableCell>
                <TableCell className="p-0">
                  <div className="flex flex-row">
                    {art.is_visible ? (
                      <button
                        className="p-2"
                        title="Esconder Imagem"
                        onClick={() => SetArtVisibility(art.id, false)}
                      >
                        <EyeIcon className="w-4 h-4 active:scale-90 transition-all " />
                      </button>
                    ) : (
                      <button
                        className="p-2"
                        title="Mostrar Imagem"
                        onClick={() => SetArtVisibility(art.id, true)}
                      >
                        <EyeSlashIcon className="w-4 h-4 active:scale-90 transition-all" />
                      </button>
                    )}

                    {art.in_carousel ? (
                      <button
                        className="p-2"
                        title="Remover do Carousel"
                        onClick={() => SetArtInCarousel(art.id, false)}
                      >
                        <StarIcon className="w-4 h-4 active:scale-90 transition-all text-orange-400" />
                      </button>
                    ) : (
                      <button
                        className="p-2"
                        title="Adicionar ao Carousel"
                        onClick={() => SetArtInCarousel(art.id, true)}
                      >
                        <StarIconOutline className="w-4 h-4 active:scale-90 transition-all " />
                      </button>
                    )}

                    {art.is_available ? (
                      <button
                        className="p-2"
                        title="Tornar indisponível"
                        onClick={() => SetArtVisibility(art.id, false)}
                      >
                        <CurrencyDollarIcon className="w-4 h-4 active:scale-90 transition-all text-green-500" />
                      </button>
                    ) : (
                      <button
                        className="p-2"
                        title="Tornar disponível"
                        onClick={() => SetArtVisibility(art.id, true)}
                      >
                        <CurrencyDollarIconOutline className="w-4 h-4 active:scale-90 transition-all" />
                      </button>
                    )}

                    <button
                      className="p-2"
                      title="Deletar"
                      onClick={() => DeleteArt(art.id)}
                    >
                      <TrashIcon className="w-4 h-4 active:scale-90 transition-all " />
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
