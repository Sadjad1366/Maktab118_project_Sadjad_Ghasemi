"use client";

import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { useParams } from "next/navigation";
import { className } from "@/utils/classNames";
import React, { useEffect, useState } from "react";
import { getProductById } from "@/apis/product.service";
import { CartItem, setButtonDisabled, setGuestCart } from "@/redux/slices/basketSlice";
import { addToCartApi } from "@/redux/thunks/basketThunks";
import { useAppDispatch } from "@/utils/hooks/useAppDispatch";
import { getGuestCart, saveGuestCart } from "@/redux/guestBasket";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

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
  const [activeImage, setActiveImage] = useState<string | undefined>(undefined);
  const params = useParams();
  const dispatch = useAppDispatch();
  const disabledButtons = useSelector(
    (state: RootState) => state.basket.disabledButtons
  );
  const userCart = useSelector((state: RootState) => state.basket.items);

  // بررسی وضعیت دکمه فقط در صورتی که product مقدار داشته باشد
  const isAddedToCart = product ? disabledButtons[product._id] || false : false;

  const id = typeof params?.id === "string" ? params.id : "";

  useEffect(() => {
    if (!id) return;

    const fetchProductDetails = async () => {
      try {
        const response = await getProductById(id);
        const productData = response?.data?.product;

        if (productData) {
          setProduct(productData);
          setActiveImage(
            `http://localhost:8000/images/products/images/${productData.images[0]}`
          );
        } else {
          console.error("Product data is missing in response:", response);
        }
      } catch (error: any) {
        console.error("Error fetching product details:", error.message);
        toast.error("مشکلی در بارگذاری محصول رخ داد.");
      }
    };
    fetchProductDetails();
  }, [id]);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();

    if (!product) {
      toast.error("محصول موجود نیست.");
      return;
    }

    // بررسی تعداد فعلی محصول در سبد
    const userId = Cookies.get("userId");
    let currentQuantityInCart = 0; // تعداد فعلی محصول در سبد

    if (userId) {
      // برای کاربر لاگین شده: تعداد محصول از Redux State خوانده می‌شود
      const existingItem = userCart.find((item) => item.id === product._id);
      currentQuantityInCart = existingItem ? existingItem.quantity : 0;
    } else {
      // برای کاربر مهمان: تعداد محصول از localStorage خوانده می‌شود
      const guestCart = getGuestCart();
      const existingItem = guestCart.find((item:CartItem) => item.id === product._id);
      currentQuantityInCart = existingItem ? existingItem.quantity : 0;
    }

    // چک کردن محدودیت موجودی انبار
    if (currentQuantityInCart >= product.quantity) {
      toast.error("تعداد انتخاب‌شده از موجودی انبار بیشتر است.");
      return;
    }

    // جلوگیری از کلیک دوباره (در صورت نیاز)
    if (isAddedToCart) {
      toast.error("این محصول قبلاً به سبد خرید اضافه شده است.");
      return;
    }

    // علامت زدن دکمه به عنوان غیرفعال
    dispatch(setButtonDisabled(product._id));

    if (userId) {
      // برای کاربر لاگین شده: ارسال به سرور
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
          toast.success("محصول به سبد خرید اضافه شد.");
        })
        .catch((error) => {
          console.error("Error adding to cart:", error);
          toast.error("مشکلی در افزودن به سبد خرید رخ داد.");
        });
    } else {
      // برای کاربر مهمان: ذخیره در localStorage
      const guestCart = getGuestCart();
      const existingProductIndex = guestCart.findIndex(
        (item: any) => item.id === product._id
      );

      if (existingProductIndex !== -1) {
        // افزایش تعداد محصول
        const newQuantity = guestCart[existingProductIndex].quantity + 1;
        if (newQuantity > product.quantity) {
          toast.error("تعداد انتخاب‌شده از موجودی انبار بیشتر است.");
          return;
        }
        guestCart[existingProductIndex].quantity = newQuantity;
      } else {
        // اضافه کردن محصول جدید
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
      toast.success("محصول به سبد خرید اضافه شد.");
    }
  };

  const handleThumbnailClick = (imageUrl: string) => {
    setActiveImage(imageUrl);
  };

  if (!product) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>در حال بارگذاری اطلاعات محصول...</p>
      </div>
    );
  }

  return (
    <div className="bg-slate-100 rounded-lg container mx-auto py-10 px-4 lg:px-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Product Images */}
        <div className="relative">
          {/* Main Product Image */}
          <img
            className="w-full rounded-lg shadow-md"
            src={activeImage || ""}
            alt={product.name}
            width={48}
            height={48}
          />

          {/* Thumbnail Carousel */}
          <div className="flex mt-4 space-x-2 gap-x-2 overflow-x-auto">
            {product.images?.map((image, index) => {
              const imageUrl = `http://localhost:8000/images/products/images/${image}`;
              return (
                <img
                  key={index}
                  className={className(
                    "w-16 h-16 object-cover rounded-lg cursor-pointer border",
                    activeImage === imageUrl
                      ? "border-indigo-600"
                      : "border-gray-300 hover:border-indigo-600"
                  )}
                  src={imageUrl}
                  alt={`Thumbnail ${index}`}
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

          {/* Ratings */}
          <div className="flex items-center mb-4">
            <span className="ml-2 text-gray-600">
              ({product.rating.count} نظر)
            </span>
          </div>

          {/* Price */}
          {product.quantity > 0 ? (
            <p className="text-2xl font-bold text-indigo-600 mb-6">
              {product.price.toLocaleString()} تومان
            </p>
          ) : (
            <p className="text-red-500 text-xl mb-6">ناموجود</p>
          )}

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            disabled={product.quantity === 0 || isAddedToCart} // دکمه غیرفعال شود
            className={className(
              "w-full px-6 py-3 rounded-lg",
              product.quantity > 0 && !isAddedToCart
                ? "bg-indigo-600 hover:bg-indigo-700 text-white transition duration-300 shadow active:translate-y-2 active:scale-95"
                : "bg-indigo-300 cursor-not-allowed text-white"
            )}
          >
            {isAddedToCart
              ? "محصول به سبد خرید اضافه شده"
              : "افزودن به سبد خرید"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
