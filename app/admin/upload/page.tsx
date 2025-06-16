import UploadForm from "@/components/admin/upload-form";
import { ChevronLeftIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

export default async function Upload() {
  return (
    <div className="py-[64px]">
      {/* Future Breadcrumb */}
      <div className="m-4 flex gap-4 flex-col">
        <Link href="/admin">
          <button
            type="submit"
            className="flex flex-row gap-2 items-center justify-center font-bold h-10 px-4 bg-[--background-inverse] text-[--foreground-inverse] text-xs border rounded-full"
          >
            <ChevronLeftIcon className="w-4" />
            Voltar
          </button>
        </Link>
        <h1>Add Art</h1>
      </div>
      <UploadForm />
    </div>
  );
}
