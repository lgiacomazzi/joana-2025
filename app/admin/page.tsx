import AdminSidebar from "@/components/admin/admin-sidebar";
import { AdminTable } from "@/components/admin/admin-table-simple";
import { fetchCategories } from "@/lib/data";

interface AdminSearchParams {
  category?: string;
}

export default async function Admin({
  searchParams: { category },
}: {
  searchParams: AdminSearchParams;
}) {
  const categories = await fetchCategories();

  console.log("Renderizando Admin com categoria", category);

  return (
    <div className="flex flex-row h-[calc(100vh-3rem)] overscroll-contain">
      <AdminSidebar categories={categories} />
      <AdminTable />
    </div>
  );
}
