import { AdminTable } from "@/components/admin/admin-table";

export default async function Admin() {
  return (
    <div className="pt-[64px]">
      <div className="flex w-full justify-between p-4 gap-2">
        <div className="flex gap-2"></div>
        <div className="flex gap-2">
          <button className="flex flex-row gap-1 items-center justify-center font-bold h-10 px-4 bg-[--background-inverse] text-[--foreground-inverse] text-xs border rounded-full">
            Add Art
          </button>
        </div>
      </div>
      <AdminTable />
    </div>
  );
}
