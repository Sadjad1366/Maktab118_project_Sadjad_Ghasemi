"use client";

import { useSelector } from "react-redux";
import { useAppDispatch } from "@/utils/hooks/useAppDispatch";
import { RootState } from "@/redux/store";
import { IoIosAdd, IoIosRemove, IoIosTrash } from "react-icons/io";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import {
  updateCartApi,
  removeFromCartApi,
  fetchCart,
  mergeGuestCartWithUserCart, // اضافه کردن اکشن
} from "@/redux/thunks/basketThunks";
import { useEffect } from "react";
import { getGuestCart, saveGuestCart } from "@/redux/guestBasket";
import { CartItem, setGuestCart } from "@/redux/slices/basketSlice";
import { useRef } from "react";
const Basket: React.FC = () => {
  const dispatch = useAppDispatch();
  const mergeTriggered = useRef(false); // برای جلوگیری از فراخوانی چندباره
  const { items, loading, error } = useSelector((state: RootState) => state.basket);
  const router = useRouter();
  const role = Cookies.get("role");
  const token = Cookies.get("accessToken");
  const userId = Cookies.get("userId");

  const onClickHandler = () => {
    if (role && token) {
      router.push("/cart/checkout");
    } else {
      toast.error("برای ادامه فرآیند وارد حساب کاربری شوید");
      router.push("/auth/login");
    }
  };

  // useEffect(() => {
  //   const guestCart = getGuestCart();
  //   if (userId) {
  //     // کاربر وارد شده است
  //     if (guestCart.length > 0) {
  //       // اگر سبد مهمان وجود دارد، آن را ادغام کن
  //       dispatch(mergeGuestCartWithUserCart({ userId })).then(() => {
  //         console.log("Guest cart merged with user cart.");
  //       });
  //     } else {
  //       // اگر سبد مهمان وجود ندارد، فقط سبد کاربر را از سرور دریافت کن
  //       dispatch(fetchCart(userId));
  //     }
  //   } else {
  //     // کاربر وارد نشده است، سبد مهمان را به Redux انتقال بده
  //     dispatch(setGuestCart(guestCart));
  //   }
  // }, [dispatch, userId]);

  useEffect(() => {
    const guestCart = getGuestCart();
    if (userId && guestCart.length > 0 && !mergeTriggered.current) {
      mergeTriggered.current = true; // جلوگیری از اجرای چندباره
      dispatch(mergeGuestCartWithUserCart({ userId }))
        .unwrap()
        .then(() => console.log("Merge completed."))
        .catch((err) => console.error("Error merging carts:", err));
    }
  }, [userId]); // آرایه وابستگی فقط شامل userId

  useEffect(() => {
    if (!userId) {
      // اگر کاربر وارد نشده باشد
      const guestCart = getGuestCart(); // دریافت سبد مهمان
      dispatch(setGuestCart(guestCart)); // انتقال به Redux
    }
  }, [dispatch, userId]);



  const handleIncrement = (itemId: string, quantity: number, stock: number) => {
    if (quantity < stock) {
      if (userId) {
        // حالت کاربر وارد شده
        dispatch(
          updateCartApi({
            userId: userId!,
            productId: itemId,
            quantity: quantity + 1,
          })
        );
      } else {
        // حالت مهمان
        const guestCart = getGuestCart();
        const item = guestCart.find((product:CartItem) => product.id === itemId);
        if (item) {
          item.quantity += 1;
          saveGuestCart(guestCart); // ذخیره تغییرات در localStorage
          dispatch(setGuestCart(guestCart)); // بروزرسانی Redux
        }
      }
    } else {
      toast.error("خرید بیشتر از این مقدار مجاز نیست");
    }
  };

  const handleDecrement = (itemId: string, quantity: number) => {
    if (quantity > 1) {
      if (userId) {
        // حالت کاربر وارد شده
        dispatch(
          updateCartApi({
            userId: userId!,
            productId: itemId,
            quantity: quantity - 1,
          })
        );
      } else {
        // حالت مهمان
        const guestCart = getGuestCart();
        const item = guestCart.find((product:CartItem) => product.id === itemId);
        if (item) {
          item.quantity -= 1;
          saveGuestCart(guestCart); // ذخیره تغییرات در localStorage
          dispatch(setGuestCart(guestCart)); // بروزرسانی Redux
        }
      }
    } else {
      handleRemove(itemId); // حذف محصول اگر مقدار <= 1 باشد
    }
  };

  const handleRemove = (itemId: string) => {
    if (userId) {
      // حالت کاربر وارد شده
      dispatch(removeFromCartApi({ userId: userId!, productId: itemId }));
    } else {
      // حالت مهمان
      const guestCart = getGuestCart();
      const updatedCart = guestCart.filter((product:CartItem) => product.id !== itemId);
      saveGuestCart(updatedCart); // ذخیره تغییرات در localStorage
      dispatch(setGuestCart(updatedCart)); // بروزرسانی Redux
    }
  };
  const totalPrice = items.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );
  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">سبد خرید</h2>
      {loading && <p>در حال بارگذاری...</p>}
      {error && <p className="text-red-500">خطا: {error}</p>}
      {!loading && !error && items.length > 0
        ? (
          <div>
            <div className="overflow-x-auto mb-6">
              <table className="min-w-full table-auto border-collapse border border-gray-200">
                <thead>
                  <tr className="bg-gray-100 text-gray-700">
                    <th className="p-3 border border-gray-200">تصویر</th>
                    <th className="p-3 border border-gray-200">نام محصول</th>
                    <th className="p-3 border border-gray-200">تعداد</th>
                    <th className="p-3 border border-gray-200">قیمت واحد</th>
                    <th className="p-3 border border-gray-200">قیمت کل</th>
                    <th className="p-3 border border-gray-200">عملیات</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="p-3 border border-gray-200 text-center">
                        <img
                          src={`http://localhost:8000/images/products/images/${item.image}`}
                          alt={item.name}
                          className="w-12 h-12 object-cover mx-auto rounded"
                        />
                      </td>
                      <td className="p-3 border border-gray-200 text-center">
                        {item.name}
                      </td>
                      <td className="p-3 border border-gray-200 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() =>
                              handleDecrement(item.id, item.quantity)
                            }
                            className="p-1 bg-red-500 text-white rounded"
                          >
                            <IoIosRemove size={16} />
                          </button>
                          <span>{item.quantity}</span>
                          <button
                            onClick={() =>
                              handleIncrement(item.id, item.quantity, item.stock)
                            }
                            className="p-1 bg-green-500 text-white rounded"
                          >
                            <IoIosAdd size={16} />
                          </button>
                        </div>
                        {item.quantity >= item.stock && (
                          <p className="text-red-500 text-xs">
                            حداکثر میزان خرید
                          </p>
                        )}
                      </td>
                      <td className="p-3 border border-gray-200 text-center">
                        {item.price.toLocaleString()} تومان
                      </td>
                      <td className="p-3 border border-gray-200 text-center">
                        {(item.quantity * item.price).toLocaleString()} تومان
                      </td>
                      <td className="p-3 border border-gray-200 text-center">
                        <button
                          onClick={() => handleRemove(item.id)}
                          className="p-1 bg-red-600 text-white rounded"
                        >
                          <IoIosTrash size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex justify-end gap-4">
              <div className="bg-gray-100 p-4 rounded shadow-md w-64">
                <h3 className="text-lg font-semibold mb-2">مجموع قیمت</h3>
                <p className="text-2xl font-bold">
                  {totalPrice.toLocaleString()} تومان
                </p>
              </div>
              <button
                onClick={onClickHandler}
                className="bg-green-500 px-4 py-2 text-white font-bold rounded-lg shadow-lg"
              >
                نهایی کردن خرید
              </button>
            </div>
          </div>
        )
        : (
          !loading && <p className="text-gray-500">سبد خرید شما خالی است.</p>
        )}
    </div>
  );
};

export default Basket;
