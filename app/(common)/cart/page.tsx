"use client";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { incrementQuantity, decrementQuantity, removeFromCart } from "@/redux/slices/basketSlice";
import { IoIosAdd, IoIosRemove, IoIosTrash } from "react-icons/io";

const Basket: React.FC = () => {
  const dispatch = useDispatch();
  const items = useSelector((state: RootState) => state.basket.items);

  const totalPrice = items.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">سبد خرید</h2>
      {items.length === 0 ? (
        <p className="text-gray-500">سبد خرید شما خالی است.</p>
      ) : (
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
                    <td className="p-3 border border-gray-200 text-center">{item.name}</td>
                    <td className="p-3 border border-gray-200 text-center">
                      <div className="flex items-center justify-center space-x-2">
                        <button
                          onClick={() => dispatch(decrementQuantity(item.id))}
                          className="p-1 bg-red-500 text-white rounded"
                        >
                          <IoIosRemove size={16} />
                        </button>
                        <span className="pr-2">{item.quantity}</span>
                        <button
                          onClick={() => dispatch(incrementQuantity(item.id))}
                          className="p-1 bg-green-500 text-white rounded"
                        >
                          <IoIosAdd size={16} />
                        </button>
                      </div>
                    </td>
                    <td className="p-3 border border-gray-200 text-center">
                      {item.price.toLocaleString()} تومان
                    </td>
                    <td className="p-3 border border-gray-200 text-center">
                      {(item.quantity * item.price).toLocaleString()} تومان
                    </td>
                    <td className="p-3 border border-gray-200 text-center">
                      <button
                        onClick={() => dispatch(removeFromCart(item.id))}
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

          {/* Total Price Box */}
          <div className="flex justify-end">
            <div className="bg-gray-100 p-4 rounded shadow-md w-64">
              <h3 className="text-lg font-semibold mb-2 text-gray-700">مجموع قیمت</h3>
              <p className="text-2xl font-bold text-gray-800 text-right">
                {totalPrice.toLocaleString()} تومان
              </p>
            </div>
            
          </div>
        </div>
      )}
    </div>
  );
};

export default Basket;
