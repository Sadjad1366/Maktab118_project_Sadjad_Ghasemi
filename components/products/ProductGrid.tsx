"use client";

import React, { useEffect, useState } from "react";
import { ProductCard } from "./ProductCard";
import { getAllProductsReq } from "@/apis/product.service";
import { SkeletonCard } from "../SkeletonCard";

const ProductGrid: React.FC = () => {
  const [products, setProducts] = useState<IProduct[]>([]); // All products from the API
  const [filteredProducts, setFilteredProducts] = useState<IProduct[]>([]); // Products after filtering/sorting
  const [currentPage, setCurrentPage] = useState(1); // Current page for pagination
  const [loading, setLoading] = useState(true); // Loading state
  const [filters, setFilters] = useState({ brand: "", name: "" }); // State for filters
  const [sortOrder, setSortOrder] = useState<"low-to-high" | "high-to-low" | null>(null); // Sorting state
  const itemsPerPage = 8; // Number of items per page

  // Fetch all products from the API once
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        // Pass a large value to fetch all products at once
        const response = await getAllProductsReq(1, 1000); // Requesting all products
        setProducts(response.data.products); // Save all products
        setFilteredProducts(response.data.products); // Initialize filtered products
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Apply filters and sorting whenever filters, sorting, or products change
  useEffect(() => {
    let filtered = [...products]; // Start with all products

    // Filter by brand
    if (filters.brand) {
      filtered = filtered.filter((product) =>
        product.brand?.toLowerCase().includes(filters.brand.toLowerCase())
      );
    }

    // Filter by name
    if (filters.name) {
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(filters.name.toLowerCase())
      );
    }

    // Sort by price
    if (sortOrder === "low-to-high") {
      filtered.sort((a, b) => a.price - b.price); // Sort ascending
    } else if (sortOrder === "high-to-low") {
      filtered.sort((a, b) => b.price - a.price); // Sort descending
    }

    setFilteredProducts(filtered); // Update filtered products
    setCurrentPage(1); // Reset to the first page after filters/sorting
  }, [filters, sortOrder, products]);

  // Calculate total pages and paginated products
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Handle sorting
  const handleSort = (order: "low-to-high" | "high-to-low") => {
    setSortOrder(order); // Update sorting state
  };

  // Handle filter input changes
  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value })); // Update specific filter
  };

  // Pagination controls
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
    <div className="container mx-auto py-4 px-2 grid grid-cols-12 gap-4">
      {/* Sidebar */}
      <aside className="col-span-3 bg-white p-4 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-4">فیلتر محصولات</h3>

        {/* Filter by Brand */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">برند</label>
          <input
            type="text"
            name="brand"
            value={filters.brand}
            onChange={handleFilterChange}
            placeholder="جستجوی برند"
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Filter by Name */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">نام محصول</label>
          <input
            type="text"
            name="name"
            value={filters.name}
            onChange={handleFilterChange}
            placeholder="جستجوی نام"
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Reset Filters */}
        <button
          className="w-full py-2 px-4 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition"
          onClick={() => setFilters({ brand: "", name: "" })}
        >
          ریست فیلترها
        </button>
      </aside>

      {/* Product Grid */}
      <main className="col-span-9">
        <h2 className="text-3xl bg-slate-300 font-bold mb-4 text-center rounded-lg">
          محصولات
        </h2>

        {/* Sorting Controls */}
        <div className="flex justify-start mb-4 gap-x-3">
          <button
            className={`px-4 py-2 mr-2 rounded-lg text-white ${
              sortOrder === "low-to-high" ? "bg-indigo-700" : "bg-indigo-500"
            } hover:bg-indigo-600 transition`}
            onClick={() => handleSort("low-to-high")}
          >
            ارزان‌ترین
          </button>
          <button
            className={`px-4 py-2 rounded-lg text-white ${
              sortOrder === "high-to-low" ? "bg-indigo-700" : "bg-indigo-500"
            } hover:bg-indigo-600 transition`}
            onClick={() => handleSort("high-to-low")}
          >
            گران‌ترین
          </button>
        </div>

        {/* Product Grid */}
        <div className="p-2 rounded-lg bg-slate-300 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {loading
            ? Array.from({ length: itemsPerPage }).map((_, index) => (
                <SkeletonCard key={index} />
              ))
            : paginatedProducts.map((product, index) => (
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
      </main>
    </div>
  );
};

export default ProductGrid;
