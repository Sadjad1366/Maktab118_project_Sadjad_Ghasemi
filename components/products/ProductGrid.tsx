// components/ProductGrid.tsx

import React from 'react';
import { posts } from '@/data/posts';
import { ProductCard } from './ProductCard';
import { getAllProductsReq } from '@/apis/product.service';

const ProductGrid: React.FC = async() => {
  let products: IProduct[] = [];
  try {
    const page = 1;
    const response = await getAllProductsReq(page);
    console.log(response.data.products);
    products = response.data.products;
  } catch (error) {
    console.log(error);
  }
  return (
    <div className="container mx-auto py-4 px-4">
      <h2 className="text-3xl font-bold mb-8 text-center">Our Products</h2>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.map((product,index) => (
           <ProductCard  key={index} product={product}/>
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;
