"use client";
import { useTranslations } from "next-intl";

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
}

const FeaturedProducts: React.FC = () => {
  const t = useTranslations("Feature");

  const featuredProducts: Product[] = [
    {
      id: "1",
      name: t("products.product_1.name"),
      price: 25000000,
      image: "/images/brandstory/rolex.webp",
    },
    {
      id: "2",
      name: t("products.product_2.name"),
      price: 15000000,
      image: "/images/brandstory/omega.webp",
    },
    {
      id: "3",
      name: t("products.product_3.name"),
      price: 5000000,
      image: "/images/brandstory/seiko.webp",
    },
    {
      id: "4",
      name: t("products.product_4.name"),
      price: 15000000,
      image: "/images/brandstory/omega.webp",
    },
    {
      id: "5",
      name: t("products.product_5.name"),
      price: 5000000,
      image: "/images/brandstory/seiko.webp",
    },
  ];

  return (
    <div className="bg-gray-100 py-5">
      <h2 className="text-2xl font-bold mb-6">{t("featured_products")}</h2>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-7">
        {featuredProducts.map((product) => (
          <div
            key={product.id}
            className="flex flex-col items-center bg-slate-200 shadow-lg rounded-lg overflow-hidden py-5"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-48 h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="font-semibold text-lg">{product.name}</h3>
              <p className="text-gray-600">
                {product.price.toLocaleString()} {t('currency')}
              </p>
              <button className="mt-4 px-4 py-2 bg-blue-500 hover:bg-blue-400 text-white rounded-lg">
                {t("view_product")}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedProducts;
