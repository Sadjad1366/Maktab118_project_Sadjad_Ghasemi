"use client";

import { className } from "@/utils/classNames";
import Link from "next/link";
import React from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "@/redux//slices/basketSlice";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { IoMdHeart } from "react-icons/io";
import { IoMdHeartEmpty } from "react-icons/io";

interface ProductCardProps {
  product: IProduct;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [isLike, setIsLike] = React.useState(false);
  const toggleLike = () => setIsLike((prev) => !prev);
  const isOutOfStock = product.quantity === 0;

  return (
    <div
      className={className(
        "bg-white rounded-lg shadow-md overflow-hidden",
        "hover:shadow-lg transition-shadow duration-300 cursor-pointer"
      )}
    >
      {/* <IoMdHeartEmpty
       className={className("absolute m-1",)} size={25} /> */}
      {/* <IoMdHeart
        onClick={toggleLike}
        className="absolute m-1 text-red"
        size={25}
      /> */}

      {/* Product Image and Discount Badge */}
      <div className="relative h-40 size-36 mx-auto">
        <Link href={`/products/${product._id}`}>
          <img
            className="w-full h-full object-cover cursor-pointer rounded-t-lg mt-2"
            src={`http://localhost:8000/images/products/images/${product.images[0]}`}
            alt={product.name}
          />
        </Link>
      </div>

      {/* Product Details */}
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2 text-gray-800 truncate">
          {product.name}
        </h3>
        <p className="text-sm text-gray-600 truncate mb-2">
          {product.description || "No description available"}
        </p>
        {isOutOfStock ? (
          <div className="flex justify-center items-center mt-2">
            <span className="text-red-500 text-xl font-semibold">ناموجود</span>
          </div>
        ) : (
          <div className="flex justify-between items-center mt-2">
            <span className="text-lg font-bold text-indigo-600">
              {Number(product.price).toLocaleString()} تومان
            </span>
            <span className="text-green-500 text-sm font-semibold">موجود</span>
          </div>
        )}
        {/* <button
          className={className(
            "mt-4 w-full px-4 py-2 rounded-lg text-white shadow transform transition duration-150",
            isOutOfStock
              ? "bg-indigo-400 cursor-not-allowed"
              : "bg-indigo-600 hover:bg-indigo-700 active:translate-y-1 active:scale-95"
          )}
          onClick={handleAddToCart}
          disabled={isOutOfStock}
        >
          افزودن به سبد خرید
        </button> */}
      </div>
    </div>
  );
};
