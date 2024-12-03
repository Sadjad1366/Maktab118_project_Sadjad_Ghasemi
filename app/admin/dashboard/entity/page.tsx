"use client";
import { getAllProductsReq } from "@/apis/product.service";
import { className } from "@/utils/classNames";
import React from "react";

export default function entityPage() {
  const [products, setProducts] = React.useState<IProduct[]>([]);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [totalPages, setTotalPages] = React.useState(1);

  const fetchProducts = async (currentPage: number) => {
    try {
      const response = await getAllProductsReq(currentPage);
      setProducts(response.data.products);
      setTotalPages(response.total_pages);
    } catch (error) {
      console.log("Error fetching products:", error);
    }
  };
  // Handle page change
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };
  React.useEffect(() => {
    fetchProducts(currentPage);
  }, [currentPage]);

  return (
    <div className="overflow-x-auto sm:rounded-lg bg-slate-300 lg:w-[800px] p-3">
      <div className="flex justify-between py-3 px-2">
        <h2 className="text-slate-600 font-semibold text-xl">
          مدیریت موجودی و قیمت
        </h2>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">
          ذخیره
        </button>
      </div>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 bg-gray-200 border-y-2 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-2 py-3">
              نام محصول
            </th>
            <th scope="col" className="px-2 py-3">
              <div className="flex items-center">قیمت</div>
            </th>
            <th scope="col" className="px-2 py-3">
              <div className="flex items-center">موجودی</div>
            </th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <td className="px-2 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {product.name}
              </td>
              <td className="px-2 py-4">{product.price}</td>
              <td className="px-2 py-4">{product.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-between items-center gap-x-5 pt-2">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          type="button"
          className={className(
            "text-white bg-blue-700 hover:bg-blue-800",
            "rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center justify-center",
            "gap-2 flex-row-reverse",
            "dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800",
            currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
          )}
        >
          قبلی
        </button>
        <div className="flex space-x-2">
          {Array.from({ length: totalPages }, (_, index) => index + 1).map(
            (page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`px-3 mx-2 py-1 rounded ${
                  page === currentPage
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                {page}
              </button>
            )
          )}
        </div>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          type="button"
          className={className(
            "text-white bg-blue-700 hover:bg-blue-800",
            "rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center justify-center",
            "gap-2 flex-row-reverse",
            "dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800",
            currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""
          )}
        >
          بعدی
        </button>
      </div>
    </div>
  );
}
