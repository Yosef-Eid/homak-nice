"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { MdArrowOutward } from "react-icons/md";
import Link from "next/link";
type Product = {
    id: number;
    title: string;
    price: number;
    image_url: string;
    description: string;
    category?: string;
  };

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProducts = async () => {
      const { data, error } = await supabase.from("products").select("*");

      if (error) {
        console.error(error);
      } else {
        setProducts(data);
      }

      setLoading(false);
    };

    getProducts();
  }, []);

  if (loading) return <p>Loading...</p>;
  console.log(products);

  return <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 p-4 lg:p-2">
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
                <h1 className="text-lg font-semibold text-gradient-to-r from-blue-600 to-cyan-600">
                  {product.title}
                </h1>
                <p className="text-sm text-gray-500">{product.category}</p>
              </div>
  
              <p className="text-sm font-light text-gray-500">
                {product.description.length > 35
                  ? product.description.slice(0, 35) + "..."
                  : product.description}
              </p>
  
              <div className="w-full flex justify-between items-center mt-5.5">
                <div className="flex items-center justify-between gap-2 bg-linear-to-r from-blue-600 to-cyan-600 p-2 text-white pl-2 px-1 py-1 rounded-full">
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
}
