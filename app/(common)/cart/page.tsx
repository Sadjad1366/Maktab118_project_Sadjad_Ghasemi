"use client";

import { useRef } from "react";
import Cookies from "js-cookie";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useRouter } from "next/navigation";
import { getGuestCart, saveGuestCart } from "@/redux/guestBasket";
import { useAppDispatch } from "@/utils/hooks/useAppDispatch";
import { IoIosAdd, IoIosRemove, IoIosTrash } from "react-icons/io";
import { CartItem, clearDisabledButtons, setGuestCart } from "@/redux/slices/basketSlice";
import {
  updateCartApi,
  removeFromCartApi,
  fetchCart,
  mergeGuestCartWithUserCart,
} from "@/redux/thunks/basketThunks";

const Basket: React.FC = () => {
  const dispatch = useAppDispatch();
  const mergeTriggered = useRef(false);
  const { items, loading, error } = useSelector(
    (state: RootState) => state.basket
  );
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
      // router.push(`/auth/login?redirect=/cart`);
    }
  };

  useEffect(() => {
    const guestCart = getGuestCart();
    if (userId && guestCart.length > 0 && !mergeTriggered.current) {
      mergeTriggered.current = true;
      dispatch(mergeGuestCartWithUserCart({ userId }))
        .unwrap()
        .then((result) => {
          console.log("Merge completed. Updated Cart:", result);
        })
        .catch((error) => console.error("Error merging carts:", error));
    }
  }, [userId, dispatch]);

  useEffect(() => {
    if (!userId) {
      const guestCart = getGuestCart();
      dispatch(setGuestCart(guestCart));
    } else {
      dispatch(fetchCart(userId));
    }
  }, [userId, dispatch]);

  const handleIncrement = (itemId: string, quantity: number, stock: number) => {
    if (quantity < stock) {
      if (userId) {
        dispatch(
          updateCartApi({
            userId: userId!,
            productId: itemId,
            quantity: quantity + 1,
          })
        );
      } else {
        const guestCart = getGuestCart();
        const item = guestCart.find(
          (product: CartItem) => product.id === itemId
        );
        if (item) {
          item.quantity += 1;
          saveGuestCart(guestCart);
          dispatch(setGuestCart(guestCart));
        }
      }
    } else {
      toast.error("خرید بیشتر از این مقدار مجاز نیست");
    }
  };

  const handleDecrement = (itemId: string, quantity: number) => {
    if (quantity > 1) {
      if (userId) {
        dispatch(
          updateCartApi({
            userId: userId!,
            productId: itemId,
            quantity: quantity - 1,
          })
        );
      } else {
        const guestCart = getGuestCart();
        const item = guestCart.find(
          (product: CartItem) => product.id === itemId
        );
        if (item) {
          item.quantity -= 1;
          saveGuestCart(guestCart);
          dispatch(setGuestCart(guestCart));
        }
      }
    } else {
      handleRemove(itemId);
    }
  };

  const handleRemove = (itemId: string) => {
    if (userId) {
      dispatch(removeFromCartApi({ userId: userId!, productId: itemId }));
    } else {
      const guestCart = getGuestCart();
      const updatedCart = guestCart.filter(
        (product: CartItem) => product.id !== itemId
      );
      saveGuestCart(updatedCart);
      dispatch(setGuestCart(updatedCart));
    }
        dispatch(clearDisabledButtons());
    
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
      {!loading && !error && items.length > 0 ? (
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
      ) : (
        !loading && <p className="text-gray-500">سبد خرید شما خالی است.</p>
      )}
    </div>
  );
};

export default Basket;
