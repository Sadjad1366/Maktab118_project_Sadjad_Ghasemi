// components/ProductGrid.tsx

import React from 'react';
import Image from 'next/image';
import { posts } from '@/data/posts';

const ProductGrid: React.FC = () => {
  return (
    <div className="container mx-auto py-8 px-4">
      <h2 className="text-3xl font-bold mb-8 text-center">Our Products</h2>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {posts.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            <div className="relative h-48">
              <Image
                src={product.imageUrl}
                alt={product.title}
                layout="fill"
                objectFit="cover"
                priority
              />
            </div>
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">{product.title}</h3>
              <p className="text-gray-600 mb-4 line-clamp-2">{product.body}</p>
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
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;
