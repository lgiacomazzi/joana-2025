import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const categoryTranslations: { [key: string]: string } = {
  all: "Todas as Artes",
  is_available: "Disponíveis",
  in_carousel: "Carousel",
  painting: "Pinturas",
  drawing: "Desenhos",
  digital: "Arte Digital",
  illustration: "Ilustrações",
  collage: "Colagens",
  foto: "Fotografias",
  clothes: "Vestuário",
};

export const getPageName = (searchParams: string): string => {
  const params = new URLSearchParams(searchParams);

  // Check for specific parameters in order of priority
  if (params.has("category")) return params.get("category") || "all";
  if (params.has("is_available")) return "is_available";
  if (params.has("in_carousel")) return "in_carousel";

  // Default value
  return "all";
};
