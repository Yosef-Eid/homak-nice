"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Nav from "./components/nav";
import CategoriesBar from "./components/categories";
import Product from "./components/product";

export default function Home() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialQuery = searchParams?.get("query") ?? "";
  const initialCategory = searchParams?.get("category") ?? undefined;
  const [query, setQuery] = useState(initialQuery);
  const [category, setCategory] = useState<string | undefined>(initialCategory);

  useEffect(() => {
    const q = searchParams?.get("query") ?? "";
    const cat = searchParams?.get("category") ?? undefined;
    if (q !== query) setQuery(q);
    if (cat !== category) setCategory(cat);
  }, [searchParams]);

  // When query changes, we update the URL but without navigating; we use replace to avoid bloating history
  useEffect(() => {
    const params = new URLSearchParams();
    if (query) params.set("query", query);
    if (category) params.set("category", category);
    const url = `/?${params.toString()}`;
    router.replace(url);
  }, [query, category, router]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Nav query={query} setQuery={setQuery} />
      <CategoriesBar selectedCategory={category} />
      <main className="max-w-7xl mx-auto py-8">
        <Product query={query} category={category} />
      </main>
    </div>
  );
}
