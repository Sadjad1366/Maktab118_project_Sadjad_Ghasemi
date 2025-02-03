"use client";

import React from "react";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import { useTranslations } from "next-intl";
import { className } from "@/utils/classNames";

interface ProductCardProps {
  product: IProduct;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [isLike, setIsLike] = React.useState(false);
  const toggleLike = () => {
    setIsLike((prev) => !prev);
  };
  const isOutOfStock = product.quantity === 0;
  const t = useTranslations("Products");

  return (
    <div
      className={className(
        "bg-white rounded-lg shadow-md overflow-hidden",
        "hover:shadow-lg transition-shadow duration-300 cursor-pointer",
        "hover:scale-105 hover:transition duration-700"
      )}
    >
      {isLike ? (
        <>
          <FaHeart
            onClick={toggleLike}
            className="text-red-600 p-1"
            size={36}
          />
        </>
      ) : (
        <>
          <CiHeart onClick={toggleLike} className="text-red-500" size={36} />
        </>
      )}

      {/* Product Image */}
      <div className="relative h-40 size-36 mx-auto">
        <Link href={`/products/${product._id}`}>
          <Image
            className="w-full h-full object-cover cursor-pointer rounded-t-lg mt-2"
            src={`http://backend-6us4acis1-sadjad1366s-projects.vercel.app/images/products/images/${product.images[0]}`}
            width={150} // ✅ Specify width
            height={150} // ✅ Specify height
            alt={product.name} // ✅ Provide an alt attribute
          />
        </Link>
      </div>

      {/* Product Details */}
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2 text-gray-800 truncate">
          {product.name}
        </h3>
        <p className="text-sm text-gray-600 truncate mb-2">
          {product.description || `${t("no_description")}`}
        </p>
        {isOutOfStock ? (
          <div className="flex justify-center items-center mt-2">
            <span className="text-red-500 text-xl font-semibold">
              {t("out_of_stock")}
            </span>
          </div>
        ) : (
          <div className="flex justify-between items-center mt-2">
            <span className="text-lg font-bold text-indigo-600">
              {Number(product.price).toLocaleString()} {t("currency")}
            </span>
            <span className="text-green-500 text-sm font-semibold">
              {t("in_stock")}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
