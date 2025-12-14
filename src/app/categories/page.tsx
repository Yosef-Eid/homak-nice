import { supabase } from "@/lib/supabase";
import Link from "next/link";

export default async function CategoriesPage() {
  const { data } = await supabase.from("products").select("Category");
  const unique = Array.from(new Set((data || []).map((row: any) => row.Category?.trim()).filter(Boolean)));

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">الفئات</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {unique.map((cat) => (
          <Link
            href={`/?category=${encodeURIComponent(cat)}`}
            key={cat}
            className="rounded-lg border p-4 hover:shadow-md transition text-center text-sm"
          >
            {cat}
          </Link>
        ))}
      </div>
    </div>
  );
}
