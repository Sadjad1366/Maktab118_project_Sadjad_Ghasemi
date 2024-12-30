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
} from "@/redux/thunks/basketThunks";
import { useEffect } from "react";

const Basket: React.FC = () => {
  const dispatch = useAppDispatch();
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
    }
  };
  // useEffect(() => {
  //   if (userId) {
  //     dispatch(fetchCart(userId));
  //   }
  // }, [userId]);

  const handleIncrement = (itemId: string, quantity: number, stock: number) => {
    if (quantity < stock) {
      dispatch(
        updateCartApi({
          userId: userId!,
          productId: itemId,
          quantity: quantity + 1,
        })
      );
    } else {
      toast.error("خرید بیشتر از این مقدار مجاز نیست");
    }
  };

  const handleDecrement = (itemId: string, quantity: number) => {
    if (quantity > 1) {
      dispatch(
        updateCartApi({
          userId: userId!,
          productId: itemId,
          quantity: quantity - 1,
        })
      );
    } else {
      dispatch(removeFromCartApi({ userId: userId!, productId: itemId }));
    }
  };

  const handleRemove = (itemId: string) => {
    dispatch(removeFromCartApi({ userId: userId!, productId: itemId }));
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
        ? (console.log("Rendering basket table with items:", items),
          (
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
                                handleIncrement(
                                  item.id,
                                  item.quantity,
                                  item.stock
                                )
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
          ))
        : (console.log("No items to display. Loading or error occurred."),
          !loading && <p className="text-gray-500">سبد خرید شما خالی است.</p>)}
    </div>
  );
};

export default Basket;
