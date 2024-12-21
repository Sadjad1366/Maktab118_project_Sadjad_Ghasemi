"use client";

import { getAllCategories } from "@/apis/product.service";
import { redirect, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const categoryImages = {
  "674c5b02d5ab17876575084e": "/images/categoryPage/automatic.jpg",
  "674c679ad5ab178765750896": "/images/categoryPage/chorno3.webp",
  "674c5c43d5ab178765750870": "/images/categoryPage/skeleton.jpg",
  "674c67a2d5ab17876575089a": "/images/categoryPage/smart.jpg",
} as const;

const categoryNames = {
  "674c5b02d5ab17876575084e": "AUTOMATIC",
  "674c679ad5ab178765750896": "CHRONOGRAPH",
  "674c5c43d5ab178765750870": "SKELETON",
  "674c67a2d5ab17876575089a": "SMART",
} as const;

export default function CategoryPage() {
  const [categories, setCategories] = useState<string[]>([]); // Array of category IDs
  // const router = useRouter();

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await getAllCategories();
      setCategories(response.map((cat) => cat._id)); // Extract category IDs
    };

    fetchCategories();
  }, []);

  const handleCategoryClick = (categoryId: string) => {
    redirect(`/category/${categoryId}`); // Navigate to category-specific page
  };

  return (
    <div className="mt-2 py-2 gap-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {categories.map((categoryId) => (
        <div
          key={categoryId}
          className="relative group hover:opacity-70 cursor-pointer"
          onClick={() => handleCategoryClick(categoryId)}
        >
          <img
            src={categoryImages[categoryId as keyof typeof categoryImages]} // Safe access
            className="w-full h-auto"
          />
          <div className="opacity-0 group-hover:opacity-100 duration-700 absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center text-xl text-white font-semibold">
            {categoryNames[categoryId as keyof typeof categoryNames]} {/* Safe access */}
          </div>
        </div>
      ))}
    </div>
  );
}
