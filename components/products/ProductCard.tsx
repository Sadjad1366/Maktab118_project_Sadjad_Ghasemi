"use client";

import { className } from "@/utils/classNames";
import Link from "next/link";
import React from "react";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";

interface ProductCardProps {
  product: IProduct;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [isLike, setIsLike] = React.useState(false);
  const toggleLike = ()=> {setIsLike((prev)=> !prev)};
  const isOutOfStock = product.quantity === 0;

  return (
    <div
      className={className(
        "bg-white rounded-lg shadow-md overflow-hidden",
        "hover:shadow-lg transition-shadow duration-300 cursor-pointer"
      )}
    >
      {isLike ? (
        <>
          <FaHeart onClick={toggleLike} className="text-red-600 p-1" size={36} />
        </>
      ) : (
        <>
          <CiHeart onClick={toggleLike} className="text-red-500" size={36} />
        </>
      )}

      {/* Product Image */}
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
      </div>
    </div>
  );
};
