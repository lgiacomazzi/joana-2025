import AdminSidebar from "@/components/admin/admin-sidebar";
import { AdminTable } from "@/components/admin/admin-table-simple";
import { Suspense } from "react";

// interface AdminSearchParams {
//   search?: string;
//   category?: string;
//   year?: string;
//   is_available?: boolean;
//   in_carousel?: boolean;
// }

export default async function Admin() {
  return (
    <div className="flex flex-row h-[calc(100vh-3rem)] overscroll-contain">
      <Suspense>
        <AdminSidebar />
        <AdminTable />
      </Suspense>
    </div>
  );
}
