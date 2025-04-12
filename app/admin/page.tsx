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
    <>
      <div className="flex w-full justify-between p-4 gap-2 pt-[64px]">
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
          <button className="text-xs p-3 border text-bold">Export</button>
          <button className="text-xs p-3 border text-bold">Import</button>
          <button className="text-xs p-3 bg-blue-500 text-bold">Add Art</button>
        </div>
      </div>
      <AdminTable arts={arts} />
    </>
  );
}
