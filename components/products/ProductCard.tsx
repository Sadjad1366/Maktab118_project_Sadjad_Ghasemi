"use client";
import { className } from "@/utils/classNames";
import Link from "next/link";
import React from "react";

interface ProductCardProps {
  product: IProduct;

}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent the Link navigation
    console.log(`Added ${product.name} to cart!`);
  };

  const isOutOfStock = product.quantity === 0;

  return (
    <div
      className={className(
        "bg-white rounded-lg shadow-md overflow-hidden",
        "hover:shadow-lg transition-shadow duration-300 cursor-pointer"
      )}
    >
      {/* Product Image and Discount Badge */}
      <div className="relative h-48">
        <Link href={`/products/${product._id}`}>
          <img
            className="w-full h-full object-cover cursor-pointer rounded-t-lg"
            src={`http://localhost:8000/images/products/images/${product.images[0]}`}
            alt={product.name}
          />
        </Link>
        {product.discount && (
          <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
            {product.discount}% تخفیف
          </div>
        )}
      </div>

      {/* Product Details */}
      <div className="p-4">
        {/* Product Name */}
        <h3 className="text-lg font-semibold mb-2 text-gray-800 truncate">
          {product.name}
        </h3>

        {/* Product Description */}
        <p className="text-sm text-gray-600 truncate mb-2">
          {product.description || "No description available"}
        </p>

        {/* Rating */}
        {product.rating && (
          <div className="flex items-center mb-2">
            <span className="ml-2 text-gray-600 text-xs">({product.rating.count} نظر)</span>
          </div>
        )}

        {/* Product Price and Stock Status */}
        <div className="flex justify-between items-center mt-2">
          <span className="text-lg font-bold text-indigo-600">
            {product.price} تومان
          </span>
          {isOutOfStock ? (
            <span className="text-red-500 text-sm font-semibold">ناموجود</span>
          ) : (
            <span className="text-green-500 text-sm font-semibold">موجود</span>
          )}
        </div>

        {/* Add to Cart Button */}
        {!isOutOfStock && (
          <button
            className={className(
              "mt-4 w-full bg-indigo-600 text-white px-4 py-2 rounded-lg",
              "hover:bg-indigo-700 transition duration-300 shadow"
            )}
            onClick={handleAddToCart}
          >
            افزودن به سبد خرید
          </button>
        )}
      </div>
    </div>
  );
};
