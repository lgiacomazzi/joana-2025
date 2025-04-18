"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState, useTransition } from "react";

export function Search() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [, startTransition] = useTransition();
  const [search, setSearch] = useState(searchParams.get("search") || "");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSearch = e.target.value;
    setSearch(newSearch);

    // atualiza a URL sem recarregar a página
    startTransition(() => {
      const params = new URLSearchParams(window.location.search);
      if (newSearch) {
        params.set("search", newSearch);
      } else {
        params.delete("search");
      }
      router.replace(`?${params.toString()}`);
    });
  };

  return (
    <input
      type="text"
      value={search}
      onChange={handleChange}
      placeholder="Buscar..."
      className="text-xs    p-3 bg-[--background-disabled]"
    />
  );
}
