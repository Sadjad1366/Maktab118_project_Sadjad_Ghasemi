"use client";
import { getProductById } from "@/apis/product.service";
import { className } from "@/utils/classNames";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function ProductDetailsPage() {
  const [product, setProduct] = useState<
    IProductById["data"]["product"] | null
  >(null);
  const [quantity, setQuantity] = useState(0); // Track the selected quantity
  const params = useParams();
  const id = typeof params?.id === "string" ? params.id : "";

  useEffect(() => {
    if (!id) return;

    const fetchProductDetails = async () => {
      try {
        const response = await getProductById(id);
        if (response?.data?.product) {
          setProduct(response.data.product);
        } else {
          console.error("Product data is missing in response:", response);
        }
      } catch (error: any) {
        console.error("Error fetching product details:", error.message);
      }
    };

    fetchProductDetails();
  }, [id]);

  const handleIncrease = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleDecrease = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 0));
  };

  const handleAddToCart = () => {
    if (product) {
      console.log(`Added ${quantity} of ${product.name} to the cart!`);
      // Integrate with global cart management or API call here
    }
  };

  if (!product) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        Loading product details...
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10 px-4 lg:px-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Product Images */}
        <div className="relative">
          <img
            className="w-full rounded-lg shadow-md"
            src={`http://localhost:8000/images/products/images/${product.images[0]}`}
            alt={product.name}
          />
          {/* Thumbnail Carousel (if more images are available) */}

          <div className="flex mt-4 space-x-2 overflow-x-scroll">
            <img
              className={className("w-16 h-16 object-cover rounded-lg cursor-pointer",
                "border border-gray-300 hover:border-indigo-600 transition")}
              src={`http://localhost:8000/images/products/images/${product.images[0]}`}
              alt={product.name}
            />
          </div>
        </div>

        {/* Product Information */}
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            {product.name}
          </h1>
          <p className="text-gray-600 text-lg mb-4">
            {product.description}ساعت‌های غواصی Islander از برندهای محبوب و
            باکیفیت در دنیای ساعت‌های غواصی هستند که به دلیل طراحی خاص، مقاومت
            بالا، و عملکرد استثنایی‌شان شناخته می‌شوند. این ساعت‌ها معمولاً برای
            علاقه‌مندان به غواصی و کسانی که به ساعت‌های اسپرت و مقاوم علاقه
            دارند، مناسب هستند.
          </p>

          {/* Ratings */}
          <div className="flex items-center mb-4">
            <span className="ml-2 text-gray-600">
              ({product.rating.count} reviews)
            </span>
          </div>

          {/* Price */}
          <p className="text-2xl font-bold text-indigo-600 mb-6">
            {product.price} تومان
          </p>

          {/* Quantity Controls */}
          <div className="flex items-center mb-6">
            <button
              onClick={handleDecrease}
              className="bg-gray-300 px-4 py-2 rounded-lg hover:bg-gray-400"
            >
              -
            </button>
            <span className="text-lg font-semibold px-2">{quantity}</span>
            <button
              onClick={handleIncrease}
              className="bg-gray-300 px-4 py-2 rounded-lg hover:bg-gray-400"
            >
              +
            </button>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            className={className("w-full bg-indigo-600 text-white px-6 py-3",
              "rounded-lg hover:bg-indigo-700 transition duration-300 shadow")}
          >
            افزودن به سبد خرید
          </button>
        </div>
      </div>
    </div>
  );
}
