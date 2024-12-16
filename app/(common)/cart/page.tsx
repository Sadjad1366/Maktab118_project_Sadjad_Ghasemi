"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { IoLogoYen } from "react-icons/io";

const Basket: React.FC = () => {
  const items = useSelector((state: RootState) => state.basket.items);

  return (
    <div>
      <h2>Cart</h2>
      {items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>
          {items.map((item) => (
            <li key={item.id}>
              <img src={`http://localhost:8000/images/products/images/${item.image}`} alt={item.name} width={50} />
              <p>{item.name}</p>
              <p>{item.quantity} x {item.price} تومان</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Basket;
