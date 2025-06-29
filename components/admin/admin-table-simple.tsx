"use client";

import { Art } from "@/lib/definitions";
import {
  StarIcon,
  CurrencyDollarIcon,
  EyeIcon,
  EyeSlashIcon,
  TrashIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import {
  StarIcon as StarIconSolid,
  CurrencyDollarIcon as CurrencyDollarIconSolid,
} from "@heroicons/react/24/solid";

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
import { useSearchParams } from "next/navigation";
import { categoryTranslations } from "@/lib/utils";
import UploadForm from "./upload-form";

export const TableHead = ({ children, className }: ComponentProps<"th">) => {
  return (
    <th
      className={twMerge(
        "px-4 py-2 border-b border-[--border-color-default] text-left",
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
        "p-4 border-b border-[--border-color-default] max-w-[250px]",
        className
      )}
    >
      {children}
    </td>
  );
};

export const AdminTable = () => {
  const searchParams = useSearchParams();
  const category = searchParams.get("category");

  const [arts, setArts] = useState<Art[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploadFormOpen, setUploadFormOpen] = useState(false);

  console.log("Renderizando Table com categoria", category);

  useEffect(() => {
    const fetchArts = async () => {
      setLoading(true);

      const fetchedArts = await GetArts(category || undefined);
      console.log("Fetched arts:", fetchedArts);

      if (Array.isArray(fetchedArts) && fetchedArts.length > 0) {
        setArts(fetchedArts);
      } else {
        setArts([]); // Handle error case
      }

      setLoading(false);
    };

    fetchArts();
  }, [category]);

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
    setLoading(false); // End loading state
    // Depois de qualquer ação, atualiza os dados:
    // alert("RefreshKey: " + refreshKey);
    // setRefreshKey((prev) => prev + 1);
  };

  return (
    <div className="flex-1 overflow-y-auto">
      {uploadFormOpen && (
        <UploadForm setUploadFormOpen={() => setUploadFormOpen(false)} />
      )}
      <div className="px-4 pt-4">
        <div className="flex justify-between gap-2">
          <h1 className="text-[--foreground-primary] font-bold text-xl">
            {category ? categoryTranslations[category] : "Todas as Artes"}
          </h1>

          <button
            onClick={() => setUploadFormOpen(true)}
            className="flex flex-row gap-1 items-center justify-center font-bold h-8 px-4 bg-[--background-inverse] text-[--foreground-inverse] text-xs border rounded-full"
          >
            <PlusIcon className="w-4" />
            Nova Arte
          </button>
        </div>

        <p className="text-xs text-[--foreground-secondary]">
          {loading
            ? "Carregando..."
            : arts.length === 1
            ? `1 arte`
            : `${arts.length} artes`}
        </p>
      </div>
      <div className="border rounded-md border-[--border-color-default] m-4">
        <table className="min-w-full text-xs table-auto">
          <thead>
            <tr>
              <TableHead>Arte</TableHead>
              <TableHead className="text-left">Descrição</TableHead>
              <TableHead>Ano</TableHead>
              <TableHead className="w-4"></TableHead>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={5} className="text-center p-4">
                  Carregando...
                </td>
              </tr>
            ) : arts && arts.length > 0 ? (
              arts.map((art) => (
                <tr
                  key={art.id}
                  className={twMerge("h-16", !art.is_visible && "opacity-30")}
                >
                  {/* Image and Title*/}
                  <TableCell>
                    <div className="flex flex-1 gap-4 overflow-hidden">
                      <div className="relative w-8 h-8 flex-shrink-0 rounded-md border bg-[--background-disabled] border-[--border-color-default] overflow-hidden ">
                        {art.is_visible && (
                          <Image
                            className="w-full h-full object-cover object-center overflow-hidden"
                            src={art.image_url}
                            fill={true}
                            sizes="(max-width: 32px) 32px, 32px"
                            alt={""}
                          />
                        )}
                      </div>
                      <div className="flex flex-1 flex-col overflow-hidden">
                        <Link
                          href={`/art/${art.id}`}
                          className="text-[--foreground-default] font-bold truncate"
                          title={art.title}
                        >
                          {art.title || <span className="text-red-500">!</span>}
                        </Link>
                        <span
                          className="text-[--foreground-tertiary] truncate"
                          title={art.id}
                        >
                          {art.id}
                        </span>
                      </div>
                    </div>
                  </TableCell>

                  {/* Description and Dimensions */}
                  <TableCell>
                    <p className="text-[--foreground-tertiary] truncate">
                      {art.description}
                    </p>
                    <p className="text-[--foreground-tertiary]">
                      {art.dimensions && `${art.dimensions}`}
                    </p>
                  </TableCell>

                  <TableCell>{art.year}</TableCell>

                  {/* Action Buttons */}
                  <TableCell>
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
                          <StarIconSolid className="w-4 h-4 text-orange-400" />
                        </button>
                      ) : (
                        <button
                          className="p-2 hover:scale-90 active:scale-90 transition-all"
                          title="Adicionar ao Carousel"
                          onClick={() => handleAction("star", art.id)}
                        >
                          <StarIcon className="w-4 h-4" />
                        </button>
                      )}

                      {/* Botão para Disponibilidade */}
                      {art.is_available ? (
                        <button
                          className="p-2 hover:scale-90 active:scale-90 transition-all"
                          title="Tornar indisponível"
                          onClick={() => handleAction("unsell", art.id)}
                        >
                          <CurrencyDollarIconSolid className="w-4 h-4 text-green-500" />
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
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center p-4">
                  Nenhuma arte encontrada.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
