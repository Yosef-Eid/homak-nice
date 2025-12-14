"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Nav from "./nav";
import CategoriesBar from "./categories";
import Products2 from "./product";


export default function HomeClient() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string | undefined>(undefined);

  useEffect(() => {
    setQuery(searchParams.get("query") ?? "");
    setCategory(searchParams.get("category") ?? undefined);
  }, [searchParams]);

  useEffect(() => {
    const params = new URLSearchParams();
    if (query) params.set("query", query);
    if (category) params.set("category", category);
    router.replace(`/?${params.toString()}`);
  }, [query, category, router]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Nav query={query} setQuery={setQuery} />
      <CategoriesBar selectedCategory={category} />
      <main className="max-w-7xl mx-auto py-8">
        <Products2 query={query} category={category} />
      </main>
    </div>
  );
}
