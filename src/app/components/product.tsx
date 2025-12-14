"use client";

import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import Loader from "./loader";
import { MdArrowOutward } from "react-icons/md";

type Product = {
  id: number;
  title: string;
  price: number;
  image_url: string;
  description: string;
  Category?: string;
};

// الألوان المستخدمة في التصميم:
// التمييز الأساسي: Deep Indigo (مثلاً: text-indigo-800 أو dark)
// التمييز الثانوي (المعدني): Copper/Amber (مثلاً: text-amber-700 للسعر والأزرار)

export default function Products2({
  query,
  category,
}: {
  query?: string;
  category?: string;
}) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        let builder = supabase
          .from("products")
          .select("id, title, price, image_url, description, Category, size, colors");

        if (query && query.trim().length > 0) {
          const q = `%${query.trim()}%`;
          // البحث في العنوان أو الوصف
          builder = builder.or(`title.ilike.${q},description.ilike.${q}`);
        }

        if (category && category.trim().length > 0) {
          // التصفية حسب الفئة
          builder = builder.eq("Category", category);
        }

        // ترتيب المنتجات الأحدث أولاً (اختياري)
        builder = builder.order("id", { ascending: false });

        const { data, error } = await builder;
        if (error) throw error;
        if (mounted && data) setProducts(data as Product[]);
      } catch (err: unknown) {
        console.error(err);
        const message = (err as Error)?.message || "فشل تحميل المنتجات";
        setError(message);
      } finally {
        setLoading(false);
      }
    };

    // تأخير بسيط لتحسين تجربة البحث
    const delay = setTimeout(fetchProducts, 250);
    return () => {
      mounted = false;
      clearTimeout(delay);
    };
  }, [query, category]);

  if (loading) return <Loader />;

  if (error)
    return (
      <div className="p-6 text-center">
        <p className="text-red-600 text-lg font-medium">
          ⚠️ حدث خطأ في تحميل البيانات:
        </p>
        <p className="text-sm text-gray-500 mt-1">{error}</p>
      </div>
    );

  return (
    // الخلفية الرئيسية هنا يجب أن تكون (مثلاً: bg-gray-50 أو F4F4F9)
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 p-4 lg:p-2">
      {products.map((product) => (
        <Link
          href={`/product/${product.id}`}
          key={product.id}
          className=" w-full h-[390px] p-1 flex flex-col justify-start items-center group rounded-xl overflow-hidden bg-white shadow-xl hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:-translate-y-1"
        >
          <div className="w-full h-[75%] overflow-hidden rounded-lg z-10">
            <img
              src={product.image_url}
              alt={product.title}
              className=" w-full h-full hover:scale-[1.1] transition-all duration-300 ease-in-out"
            />
          </div>

          <div className=" w-full h-[35%] flex flex-col items-start justify-start mt-1 p-3">
            <div className="w-full flex items-center justify-between gap-2">
              <h1 className="text-lg font-semibold text-gray-900">
                {product.title}
              </h1>
              <p className="text-sm text-gray-500">{product.Category}</p>
            </div>

            <p className="text-sm font-light text-gray-500">
              {product.description.length > 35
                ? product.description.slice(0, 35) + "..."
                : product.description}
            </p>

            <div className="w-full flex justify-between items-center mt-5.5">
              <div className="flex items-center justify-between gap-2 bg-black text-white pl-2 px-1 py-1 rounded-full">
                <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center">
                  <MdArrowOutward className="text-black" />
                </div>
                <p>شراء الآن</p>
              </div>

              <div className="text-lg font-bold text-black flex items-center gap-1.5">
                {product.price}
                <p className="text-sm text-gray-500 mt-2">جنيه</p>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
