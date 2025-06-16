import { AdminTable } from "@/components/admin/admin-table";
import { FilterSelect } from "@/components/admin/filter";
import { Search } from "@/components/admin/search";
import { fetchBugs, fetchCategories, fetchYears } from "@/lib/data";

export default async function Admin({
  searchParams,
}: {
  searchParams: { search?: string; category?: string; year?: string };
}) {
  const arts = await fetchBugs(
    searchParams.search,
    searchParams.category,
    searchParams.year
  );
  const categories = (await fetchCategories()).map((item) => item.name);
  const years = (await fetchYears()).map((item) => item.year);

  return (
    <div className="pt-[64px]">
      <div className="flex w-full justify-between p-4 gap-2">
        <div className="flex gap-2">
          <Search />
          <FilterSelect
            name="category"
            options={categories}
            placeholder="Categoria"
          />
          <FilterSelect name="year" options={years} placeholder="Anos" />
        </div>
        <div className="flex gap-2">
          <button className="flex flex-row gap-1 items-center justify-center font-bold h-10 px-4 bg-[--background-deafult] text-xs border rounded-full">
            Export
          </button>
          <button className="flex flex-row gap-1 items-center justify-center font-bold h-10 px-4 bg-[--background-deafult] text-xs border rounded-full">
            Import
          </button>
          <button className="flex flex-row gap-1 items-center justify-center font-bold h-10 px-4 bg-[--background-inverse] text-[--foreground-inverse] text-xs border rounded-full">
            Add Art
          </button>
        </div>
      </div>
      <AdminTable />
    </div>
  );
}
