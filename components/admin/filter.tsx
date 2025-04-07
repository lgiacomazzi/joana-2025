"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState, useTransition, useEffect } from "react";

type FilterSelectProps = {
  name: string; // ex: "category"
  options: string[];
  placeholder?: string;
};

export function FilterSelect({
  name,
  options,
  placeholder = "Selecionar",
}: FilterSelectProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [, startTransition] = useTransition();

  const [value, setValue] = useState(searchParams.get(name) || "");

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());

    value ? params.set(name, value) : params.delete(name);

    startTransition(() => {
      router.replace(`?${params.toString()}`);
    });
  }, [value, name, router, searchParams]);

  return (
    <select
      value={value}
      onChange={(e) => setValue(e.target.value)}
      className="p-3 bg-[--background-deafult] text-sm border"
    >
      <option value="">{placeholder}</option>
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  );
}
