"use client";
import React, { useEffect, useState } from "react";
import { ProductCard } from "./ProductCard";
import { getAllProductsReq } from "@/apis/product.service";
import { SkeletonCard } from "../SkeletonCard";



const ProductGrid: React.FC = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const itemsPerPage = 8;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true); // Set loading to true before fetching
        const response = await getAllProductsReq(currentPage, itemsPerPage);
        setProducts(response.data.products); // Set the product list
        setTotalPages(response.total_pages); // Set the total pages from API metadata
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchProducts();
  }, [currentPage]);

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  return (
    <div className="container mx-auto py-2 px-1">
      <h2 className="text-3xl bg-slate-300 font-bold mb-4 text-center rounded-lg">محصولات</h2>

      {/* Product Grid */}
      <div className="p-2 rounded-lg bg-slate-300 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {loading
          ? Array.from({ length: itemsPerPage }).map((_, index) => (
              <SkeletonCard key={index} />
            )) // Render skeletons when loading
          : products.map((product, index) => (
              <ProductCard key={index} product={product} />
            ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center items-center mt-4 space-x-4">
        <button
          className="text-white px-4 py-2 bg-indigo-500 rounded hover:bg-indigo-600 disabled:opacity-50"
          onClick={handlePrevious}
          disabled={currentPage === 1 || loading}
        >
          قبلی
        </button>
        <span className="pr-3 font-semibold text-gray-700">
          صفحه {currentPage} از {totalPages}
        </span>
        <button
          className="text-white px-4 py-2 bg-indigo-500 rounded hover:bg-indigo-600 disabled:opacity-50"
          onClick={handleNext}
          disabled={currentPage === totalPages || loading}
        >
          بعدی
        </button>
      </div>
    </div>
  );
};

export default ProductGrid;
