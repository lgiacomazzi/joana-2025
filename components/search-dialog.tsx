"use client";

import Image from "next/image";
import { SearchArts } from "@/app/actions";
import { Art } from "@/lib/definitions";
import {
  ChevronRightIcon,
  MagnifyingGlassIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { useEffect, useState } from "react";
import Spinner from "@/public/spinner.svg";

export function SearchResultItem({
  art,
  handleClose,
}: {
  art: Art;
  handleClose: () => void;
}) {
  return (
    <Link
      href={`/art/${art.id}`}
      className="flex flex-1 flex-row items-center gap-4 max-w-full overflow-hidden p-4 hover:bg-[--background-disabled] transition-all border-b border-[--border-color-default] last:border-b-0"
      onClick={() => handleClose()}
    >
      <div className="relative w-8 h-8 flex-shrink-0 rounded-md border bg-[--background-disabled] border-[--border-color-default] overflow-hidden ">
        {art.is_visible && (
          <Image
            className="w-full h-full object-cover object-center overflow-hidden"
            src={art.image_url}
            fill={true}
            sizes="(max-width: 32px) 32px, 32px"
            alt={art.title + ", " + art.description}
          />
        )}
      </div>
      <div className="flex flex-1 flex-col overflow-hidden">
        <p className="text-xs font-bold uppercase text-[--foreground-primary] truncate">
          {art.title}
        </p>
        <span className="text-xs text-[--foreground-tertiary] truncate">
          {art.year}, {art.description}
        </span>{" "}
      </div>
      <ChevronRightIcon className="w-4 h-4 text-[--foreground-tertiary] flex-shrink-0" />
    </Link>
  );
}

export default function SearchDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [searchResults, setSearchResults] = useState<Art[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearchTerm(value);
  };

  const handleClose = () => {
    setIsOpen(false);
    setSearchResults([]);
    setSearchTerm("");
  };

  useEffect(() => {
    if (searchTerm.length >= 3) {
      console.log("# Searching for", searchTerm);
      setIsLoading(true);

      SearchArts(searchTerm).then((data) => {
        if (Array.isArray(data)) {
          setSearchResults(data);
          setIsLoading(false);
        }
      });
    } else {
      setSearchResults([]);
    }
  }, [searchTerm]);

  return (
    <>
      <button className="p-3" onClick={() => setIsOpen(true)}>
        <MagnifyingGlassIcon className="w-6 md:w-5 active:scale-90 transition-all" />
      </button>
      {isOpen && (
        <div className="fixed top-0 left-0 flex w-screen h-screen z-30 p-2">
          {/* Search Dialog Container */}
          <div
            className="flex flex-col flex-1 
            bg-[--background-default] border border-[--border-color-default] rounded-xl 
            h-fit max-h-[80dvh] max-w-full md:my-[--header-height] md:mx-auto md:max-w-[600px]
            overflow-hidden 
            transition-all
            shadow-2xl shadow-black
            z-30"
          >
            {/* Search Input and its actions */}
            <div className="flex flex-rol items-center h-fit w-full border-b border-[--border-color-default] md:p-1 last-of-type:border-none">
              <div className="p-3 md:p-4">
                <MagnifyingGlassIcon className="w-5 md:w-6 text-[--foreground-tertiary]" />
              </div>
              <input
                id="search"
                name="search"
                placeholder="Buscar..."
                className="flex-1 bg-transparent outline-none autofill:bg-transparent"
                autoFocus
                onChange={handleChange}
                autoComplete="off"
              />
              <button onClick={() => handleClose()} className="p-3 md:p-4">
                <XMarkIcon className="w-6 h-6" />
              </button>
            </div>

            {/* Loading Indicator */}
            {isLoading && (
              <div className="flex items-center justify-center p-4">
                <Spinner className="text-[--foreground-secondary]" />
              </div>
            )}

            {/* No Results Message */}
            {!isLoading &&
              searchTerm.length >= 3 &&
              searchResults.length === 0 && (
                <div className="flex items-center justify-center p-4">
                  <p className="text-xs text-[--foreground-tertiary]">
                    Nenhum resultado encontrado.
                  </p>
                </div>
              )}

            {/* Search Results */}
            {searchResults.length > 0 && (
              <div className="h-full overflow-y-scroll">
                {searchResults.map((art) => (
                  <SearchResultItem
                    key={art.id}
                    art={art}
                    handleClose={handleClose}
                  />
                ))}
                <div className="flex items-center justify-center p-4">
                  <p className="text-xs text-[--foreground-tertiary]">
                    {searchResults.length} resultado(s) encontrado(s).
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Overlay */}
          <div
            id="overlay"
            onClick={() => handleClose()}
            className="fixed top-0 left-0 w-screen h-screen bg-[--background-default-blur] z-10"
          ></div>
        </div>
      )}
    </>
  );
}
