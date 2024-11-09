import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const categoryTranslations: { [key: string]: string } = {
  painting: 'Pinturas',
  drawing: 'Desenhos',
  digital: 'Arte Digital',
  illustration: 'Ilustrações',
  collage: 'Colagens',
};
