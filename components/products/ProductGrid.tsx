"use client";

import { getAllProductsReq } from "@/apis/product.service";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { SkeletonCard } from "../SkeletonCard";
import { ProductCard } from "./ProductCard";
import { GrSort } from "react-icons/gr";
import { className } from "@/utils/classNames";
import { useDebounce } from "@/utils/hooks/useDebounce";
import { getGuestCart } from "@/redux/guestBasket";
import { useTranslations } from "next-intl";

interface IFilter {
  name: string | undefined;
  brand: string | undefined;
  sort: string | undefined;
}

const ProductGrid: React.FC = () => {
  const [currentPage, setCurrentPage] = React.useState(1);
  const [filters, setFilters] = React.useState<IFilter>({
    name: undefined,
    brand: undefined,
    sort: undefined,
  });

  const perPageItems = 8;
  const t = useTranslations("Products");

  // Debounce the name and brand filters
  const debouncedName = useDebounce(filters.name, 500);
  const debouncedBrand = useDebounce(filters.brand, 500);

  // Fetch products using useQuery
  const { data, isLoading } = useQuery({
    queryKey: [
      "products",
      currentPage,
      debouncedName,
      debouncedBrand,
      filters.sort,
    ],
    queryFn: async () =>
      await getAllProductsReq(
        currentPage,
        perPageItems,
        filters.sort,
        debouncedName,
        debouncedBrand?.toUpperCase()
      ),
    enabled: true,
  });

  const products = data?.data.products;
  const totalPages = data?.total_pages;

  // Pagination handlers
  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < (totalPages ?? 0)) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  // Filter handlers
  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedSort = event.target.value;
    setFilters((prev) => ({ ...prev, sort: selectedSort }));
  };
  React.useEffect(() => {
    console.log("guestcart", getGuestCart()); // آیا آیتم‌ها را به درستی بازمی‌گرداند؟
  }, []);

  return (
    <div className="container mx-auto py-4 px-2 grid grid-cols-12 gap-4">
      <aside className="col-span-3 bg-white p-4 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-4">{t("filters")}</h3>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            {t("brand")}
          </label>
          <input
            type="text"
            name="brand"
            value={filters.brand}
            onChange={handleFilterChange}
            placeholder={t("search_brand")}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            {t("product_name")}
          </label>
          <input
            type="text"
            name="name"
            value={filters.name}
            onChange={handleFilterChange}
            placeholder={t('search_name')}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <button
          className="w-full py-2 px-4 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition"
          onClick={() =>
            setFilters({ brand: undefined, name: undefined, sort: undefined })
          }
        >
          {t("reset_filters")}
        </button>
      </aside>

      <main className="col-span-9">
        <h2 className="text-3xl bg-slate-200 text-slate-600 font-bold mb-4 py-4 text-center rounded-md">
        {t('products')}        </h2>

        {/* Sorting Controls */}
        <div className="flex justify-start items-center mb-6 gap-4">
          <label htmlFor="sort" className="text-sm font-medium text-gray-700">
          {t('sort')}          </label>
          <div className="relative">
            <select
              name="sort"
              value={filters.sort || undefined}
              onChange={handleSortChange}
              className={className(
                "block w-full appearance-none bg-white",
                "border border-gray-300 rounded-lg py-2 px-3 pl-8 shadow-sm",
                "focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              )}
            >
              <option value="">{t('choose')}</option>
              <option value="price">{t('price_asc')}</option>
              <option value="-price">{t('price_desc')}</option>
            </select>
            <div className="absolute inset-y-0 left-0 flex items-center px-2 pointer-events-none">
              <GrSort />
            </div>
          </div>
        </div>
        <div className="p-6 rounded-lg bg-slate-200 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {isLoading
            ? Array.from({ length: perPageItems }).map((_, index) => (
                <SkeletonCard key={index} />
              ))
            : products?.map((product, index) => (
                <ProductCard key={index} product={product} />
              ))}
        </div>
        <div className="flex justify-center items-center mt-4 space-x-4">
          <button
            className="text-white px-4 py-2 bg-indigo-500 rounded-full hover:bg-indigo-600 disabled:opacity-50"
            onClick={handlePrevious}
            disabled={
              currentPage === 1 || isLoading || totalPages === undefined
            }
          >
            {t('previous')}
          </button>
          <span className="pr-3 font-semibold text-gray-700">
          {t('page')} {currentPage} {t('of')} {totalPages ?? "-"}
          </span>
          <button
            className="text-white px-4 py-2 bg-indigo-500 rounded-full hover:bg-indigo-600 disabled:opacity-50"
            onClick={handleNext}
            disabled={
              currentPage === totalPages ||
              isLoading ||
              totalPages === undefined
            }
          >
            {t('next')}
          </button>
        </div>
      </main>
    </div>
  );
};

export default ProductGrid;
