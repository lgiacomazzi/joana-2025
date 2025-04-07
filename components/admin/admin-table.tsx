// components/TableParts.tsx
import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

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
        "p-2 border border-[--border-color-default]",
        className
      )}
    >
      {children}
    </td>
  );
};
