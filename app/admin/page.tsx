import { AdminTable } from "@/components/admin/admin-table";
import { PlusIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

export default async function Admin() {
  return (
    <div className="pt-[64px]">
      <div className="flex w-full justify-between items-center p-4 gap-2">
        <div className="flex gap-2">
          <h1>Admin</h1>
        </div>
        <div className="flex gap-2">
          <Link href="/admin/upload">
            <button className="flex flex-row gap-1 items-center justify-center font-bold h-10 px-4 bg-[--background-inverse] text-[--foreground-inverse] text-xs border rounded-full">
              <PlusIcon className="w-4" />
              Add Art
            </button>
          </Link>
        </div>
      </div>
      <AdminTable />
    </div>
  );
}
