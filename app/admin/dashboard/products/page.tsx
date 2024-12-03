"use client";
import { getAllProductsReq } from "@/apis/product.service";
import { className } from "@/utils/classNames";
import Link from "next/link";
import React from "react";
import { FaSort } from "react-icons/fa";
import { GrPrevious, GrNext } from "react-icons/gr";

const ProductPage: React.FC = () => {
  const [products, setProducts] = React.useState<IProduct[]>([]);
  const [page, setPage] = React.useState(1);
  const [totalPages, setTotalPages] = React.useState(1);
  // const [sortKey, setSortKey] = React.useState<string | null>(null);
  // const [sortDirection, setSortDirection] = React.useState<"asc" | "desc">(
  //   "asc"
  // );

  const fetchProducts = async (currentPage: number) => {
    try {
      // const sortParam = sortKey ? `${sortKey}:${sortDirection}` : undefined;
      const response = await getAllProductsReq(currentPage, 6);
      setProducts(response.data.products);
      setTotalPages(response.total_pages);
    } catch (error) {
      console.log("Error fetching products:", error);
    }
  };

  // const handleSort = (key: keyof IProduct) => {
  //   const newDirection =
  //     sortKey === key && sortDirection === "asc" ? "desc" : "asc";
  //   setSortKey(key);
  //   setSortDirection(newDirection);
  //   fetchProducts(page); // Trigger fetch with updated sort
  // };

  React.useEffect(() => {
    fetchProducts(page);
  }, [page]);

  const handleNext = () => {
    if (page < totalPages) setPage((prev) => prev + 1);
  };

  const handlePrevious = () => {
    if (page > 1) setPage((prev) => prev - 1);
  };

  return (
    <div className="overflow-x-auto sm:rounded-lg bg-slate-300 lg:w-[800px] p-3">
      <div className="flex justify-between py-3 px-2">
        <h2 className="text-slate-600 font-semibold text-xl">مدیریت کالا</h2>
        <button className="bg-blue-600 text-white p-2 rounded-lg">
          افزودن کالا
        </button>
      </div>
      <table
        className={className(
          "w-full text-sm text-left",
          "rtl:text-right text-gray-500 dark:text-gray-400"
        )}
      >
        <thead
          className={className(
            "text-xs text-gray-700 uppercase",
            "bg-gray-200 border-b-2 dark:bg-gray-700 dark:text-gray-400"
          )}
        >
          <tr>
            <th>تصاویر</th>
            <th scope="col" className="px-2 py-3">
              نام محصول
            </th>
            <th scope="col" className="px-2 py-3">
              <div
                // onClick={() => handleSort("category")}
                className="flex items-center"
              >
                دسته بندی
                <FaSort />
              </div>
            </th>
            <th scope="col" className="px-2 py-3">
              <div
                // onClick={() => handleSort("price")}
                className="flex items-center"
              >
                قیمت
                <FaSort />
              </div>
            </th>
            <th scope="col" className="px-6 py-3"></th>
          </tr>
        </thead>
        <tbody>
          {products.map((product: IProduct) => (
            <tr
              key={product._id}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
            >
              <td>
                <img
                  src={`http://localhost:8000/images/products/images/${product.images[0]}`}
                  alt={product.name}
                  width="50px"
                />
              </td>
              <td
                className={className(
                  "flex items-center px-2 py-4",
                  "font-medium text-gray-900 whitespace-nowrap dark:text-white"
                )}
              >
                {product.name}
              </td>
              <td className="px-2 py-4">{product.category}</td>
              <td className="px-2 py-4">
                {Number(product.price).toLocaleString()} تومان
              </td>
              <td className="px-1 py-4 text-right">
                <div className="flex gap-x-2">
                  <Link
                    href="#"
                    className="font-medium text-blue-800 dark:text-blue-500 hover:underline"
                  >
                    ویرایش
                  </Link>
                  <Link
                    href="#"
                    className="font-medium px-3 space-x-1 text-blue-400 dark:text-blue-500 hover:underline"
                  >
                    حذف
                  </Link>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-center items-center gap-x-5 pt-2">
        <button
          onClick={handlePrevious}
          disabled={page === 1}
          type="button"
          className={className(
            "text-white bg-blue-700 hover:bg-blue-800",
            "rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center justify-center",
            "gap-2 flex-row-reverse",
            "dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800",
            page === 1 ? "opacity-50 cursor-not-allowed" : ""
          )}
        >
          <GrNext className="text-lg" />
          قبلی
        </button>
        <p>
          {page} از {totalPages}
        </p>
        <button
          onClick={handleNext}
          disabled={page === totalPages}
          type="button"
          className={className(
            "text-white bg-blue-700 hover:bg-blue-800",
            "rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center justify-center",
            "gap-2 flex-row-reverse",
            "dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800",
            page === totalPages ? "opacity-50 cursor-not-allowed" : ""
          )}
        >
          بعدی
          <GrPrevious className="text-lg" />
        </button>
      </div>
    </div>
  );
};

export default ProductPage;
