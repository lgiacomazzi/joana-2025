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
