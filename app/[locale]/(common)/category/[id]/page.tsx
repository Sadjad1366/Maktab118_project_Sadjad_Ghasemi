"use client";

import { getAllProductsByCategory } from "@/apis/category.service";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { ProductCard } from "@/components/products/ProductCard";
import { useQuery } from "@tanstack/react-query";
import { SkeletonCard } from "@/components/SkeletonCard";
import { useTranslations } from "next-intl";

export default function CategoryProductsPage() {
  const { id } = useParams(); 
  const [page, setPage] = useState(1);
  const itemsPerPage = 8;
  const t = useTranslations("CategoryId");

  const { data, isLoading, error } = useQuery({
    queryKey: ["productCat", id, page],
    queryFn: () => getAllProductsByCategory(page, 8, id as string),
  });

  const totalPages = data?.total_pages;

  useEffect(() => {
    console.log(data?.data.products);
  }, [data]);

  if (error) {
    return <div>Error loading products. Please try again.</div>;
  }

  if (data?.data.products.length === 0) {
    return <div>No products found for this category.</div>;
  }

  return (
    <div>
      {/* Products Grid */}
      <div className="bg-slate-100 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 p-8">
        {isLoading
          ? Array.from({ length: itemsPerPage }).map((_, index) => (
              <SkeletonCard key={index} />
            ))
          : data?.data.products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center gap-4 mt-6 py-2">
        <button
          disabled={page === 1}
          onClick={() => setPage((prev) => prev - 1)}
          className={`px-4 py-2 rounded ${
            page === 1
              ? "bg-gray-300 text-gray-500 cursor-not-allowed rounded-full"
              : "bg-indigo-600 text-white rounded-full"
          }`}
        >
          {t("category_products.pagination.previous")}
        </button>

        <span className="px-4 py-2">
          {t("category_products.pagination.page_info", { page, totalPages })}
        </span>

        <button
          disabled={page === totalPages}
          onClick={() => setPage((prev) => prev + 1)}
          className={`px-4 py-2 rounded-full ${
            page === totalPages
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-indigo-600 text-white"
          }`}
        >
          {t("category_products.pagination.next")}
        </button>
      </div>
    </div>
  );
}
