import React from 'react'
import Image from 'next/image';


export const ProductCard:React.FC<{ product: IProduct } & React.HTMLAttributes<HTMLElement>> = ({product}) => {
  return (
      <div
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
    >
      <div className="relative h-48">
        <img
          src={product.images[0]}
          alt={product.name}
        />
      </div>
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
        <p className="text-gray-600 mb-4 line-clamp-2">{product.price}</p>
        <div className="flex justify-between items-center">
          <span className="text-xl font-bold text-indigo-600">
            ${product.price.toFixed(2)}
          </span>
          <button className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  )
}
