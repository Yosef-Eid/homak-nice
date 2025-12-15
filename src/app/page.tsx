'use client'
import Products from "./components/product";
import Nav from "./components/nav";
import { useState } from "react";

export default function Home() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  return (
    <>
    <Nav query={query} setQuery={setQuery} />
    <Products query={query} category={category} />
    </>
  );
}
