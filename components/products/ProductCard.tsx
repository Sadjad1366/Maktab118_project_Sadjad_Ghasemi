import React from "react";

export const ProductCard: React.FC<
  { product: IProduct } & React.HTMLAttributes<HTMLElement>
> = ({ product }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative h-48">
        <img
          className="py-2"
          src={`http://localhost:8000/images/products/images/${product.images[0]}`}
          alt={product.name}
          width="80%"
        />
      </div>
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
        <div className="flex justify-between items-center">
          <span className="text-xl font-bold text-indigo-600">
            {product.price} تومان
          </span>
          <button className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};
