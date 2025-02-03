"use client";

import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { className } from "@/utils/classNames";
import React, { useEffect, useState } from "react";
import { getProductById } from "@/apis/product.service";
import { addToCartApi } from "@/redux/thunks/basketThunks";
import { useAppDispatch } from "@/utils/hooks/useAppDispatch";
import { getGuestCart, saveGuestCart } from "@/redux/guestBasket";
import {
  CartItem,
  setButtonDisabled,
  setGuestCart,
} from "@/redux/slices/basketSlice";
import Image from "next/image"; // ✅ Use next/image for better performance

interface IProduct {
  _id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  images: string[];
  rating: {
    count: number;
  };
}

const ProductDetailsPage: React.FC = () => {
  const [product, setProduct] = useState<IProduct | null>(null);
  const params = useParams();
  const dispatch = useAppDispatch();
  const disabledButtons = useSelector(
    (state: RootState) => state.basket.disabledButtons
  );
  const userCart = useSelector((state: RootState) => state.basket.items);
  const [activeImage, setActiveImage] = useState<string | undefined>(undefined);
  const isAddedToCart = product ? disabledButtons[product._id] || false : false;

  const id = typeof params?.id === "string" ? params.id : "";
  const t = useTranslations("ProductDetail");

  useEffect(() => {
    if (!id) return;

    const fetchProductDetails = async () => {
      try {
        const response = await getProductById(id);
        const productData = response?.data?.product;

        if (productData) {
          setProduct(productData);
          setActiveImage(
            `https://backend-6us4acis1-sadjad1366s-projects.vercel.app/images/products/images/${productData.images[0]}`
          );
        } else {
          console.error("Product data is missing in response:", response);
        }
      } catch (error) {
        console.error("Error fetching product details:", error);
        toast.error(t("loading_error"));
      }
    };
    fetchProductDetails();
  }, [id, t]); // ✅ Added `t` to dependency array

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();

    if (!product) {
      toast.error(t("product_unavailable"));
      return;
    }

    const userId = Cookies.get("userId");
    let currentQuantityInCart = 0;

    if (userId) {
      const existingItem = userCart.find((item) => item.id === product._id);
      currentQuantityInCart = existingItem ? existingItem.quantity : 0;
    } else {
      const guestCart = getGuestCart();
      const existingItem = guestCart.find(
        (item: CartItem) => item.id === product._id
      );
      currentQuantityInCart = existingItem ? existingItem.quantity : 0;
    }

    if (currentQuantityInCart >= product.quantity) {
      toast.error(t("guest_error_stock"));
      return;
    }

    if (isAddedToCart) {
      toast.error(t("repeat"));
      return;
    }

    dispatch(setButtonDisabled(product._id));

    if (userId) {
      dispatch(
        addToCartApi({
          userId,
          item: {
            id: product._id,
            name: product.name,
            price: product.price,
            quantity: 1,
            image: product.images[0] || "",
            stock: product.quantity,
          },
        })
      )
        .unwrap()
        .then(() => {
          toast.success(t("success_add_cart"));
        })
        .catch((error) => {
          console.error("Error adding to cart:", error);
          toast.error(t("error_add_cart"));
        });
    } else {
      const guestCart = getGuestCart();
      const existingProductIndex: number = guestCart.findIndex(
        (item: CartItem) => item.id === product._id
      );

      if (existingProductIndex !== -1) {
        const newQuantity = guestCart[existingProductIndex].quantity + 1;
        if (newQuantity > product.quantity) {
          toast.error(t("exceeds_stock"));
          return;
        }
        guestCart[existingProductIndex].quantity = newQuantity;
      } else {
        guestCart.push({
          id: product._id,
          name: product.name,
          price: product.price,
          quantity: 1,
          image: product.images[0] || "",
          stock: product.quantity,
        });
      }

      saveGuestCart(guestCart);
      dispatch(setGuestCart(guestCart));
      toast.success(t("success_add_cart"));
    }
  };

  const handleThumbnailClick = (imageUrl: string) => {
    setActiveImage(imageUrl);
  };

  if (!product) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>{t("loading_product")}</p>
      </div>
    );
  }

  return (
    <div className="bg-slate-100 rounded-lg container mx-auto py-10 px-4 lg:px-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Product Images */}
        <div className="relative">
          {/* ✅ Use next/image */}
          <Image
            className="w-full rounded-lg shadow-md"
            src={activeImage || ""}
            alt={product.name}
            width={500}
            height={500}
            priority
          />

          {/* Thumbnail Carousel */}
          <div className="flex mt-4 space-x-2 gap-x-2 overflow-x-auto">
            {product.images?.map((image, index) => {
              const imageUrl = `https://backend-6us4acis1-sadjad1366s-projects.vercel.app/images/products/images/${image}`;
              return (
                <Image
                  key={index}
                  className={className(
                    "w-16 h-16 object-cover rounded-lg cursor-pointer border",
                    activeImage === imageUrl
                      ? "border-indigo-600"
                      : "border-gray-300 hover:border-indigo-600"
                  )}
                  src={imageUrl}
                  alt={`Thumbnail ${index}`}
                  width={64}
                  height={64}
                  onClick={() => handleThumbnailClick(imageUrl)}
                />
              );
            })}
          </div>
        </div>

        {/* Product Information */}
        <div className="flex flex-col justify-center pb-24">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            {product.name}
          </h1>
          <p className="text-gray-600 text-lg mb-4">{product.description}</p>

          {/* Price */}
          {product.quantity > 0 ? (
            <p className="text-2xl font-bold text-indigo-600 mb-6">
              {product.price.toLocaleString()} {t("currency")}
            </p>
          ) : (
            <p className="text-red-500 text-xl mb-6">{t("out_of_stock")}</p>
          )}

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            disabled={product.quantity === 0 || isAddedToCart}
            className={className(
              "w-full px-6 py-3 rounded-lg",
              product.quantity > 0 && !isAddedToCart
                ? "bg-indigo-600 hover:bg-indigo-700 text-white transition duration-300 shadow active:translate-y-2 active:scale-95"
                : "bg-indigo-300 cursor-not-allowed text-white"
            )}
          >
            {isAddedToCart ? t("added_to_cart") : t("add_to_cart")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
