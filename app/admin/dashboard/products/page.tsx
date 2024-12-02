import { getAllProductsReq } from "@/apis/product.service";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaSort } from "react-icons/fa";

export default async function productPage() {
  let products: IProduct[] = [];
  try {
    const page = 1;
    const response = await getAllProductsReq(page);
    console.log(response.data.products);
    products = response.data.products;
  } catch (error) {
    console.log(error);
  }
  return (
    <div className="overflow-x-auto sm:rounded-lg bg-slate-300 lg:w-[800px] p-3">
      <div className="flex justify-between py-3 px-2">
        <h2 className="text-slate-600 font-semibold text-xl">مدیریت کالا</h2>
        <button className="bg-blue-600 text-white p-2 rounded-lg">
          افزودن کالا
        </button>
      </div>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-200 border-b-2 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th>تصاویر</th>
            <th scope="col" className="px-2 py-3">
              نام محصول
            </th>
            <th scope="col" className="px-2 py-3">
              <div className="flex items-center">
                دسته بندی
                <FaSort />
              </div>
            </th>
            <th scope="col" className="px-2 py-3">
              <div className="flex items-center">
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
              <td className="flex items-center px-2 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {product.name}
              </td>
              <td className="px-2 py-4">{product.category}</td>
              <td className="px-2 py-4">${product.price}</td>
              <td className="px-1 py-4 text-right">
                <Link
                  href="#"
                  className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                >
                  ویرایش
                </Link>
                <Link
                  href="#"
                  className="font-medium px-3 space-x-1 text-blue-600 dark:text-blue-500 hover:underline"
                >
                  حذف
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
