import { useTranslations } from "next-intl";
import Image from "next/image";

const brands = [
  { id: 1, name: "Rolex", logo: "/images/brands/rolex.webp" },
  { id: 3, name: "ingersoll", logo: "/images/brands/ingersoll.png" },
  { id: 4, name: "Omega", logo: "/images/brands/omega.jpg" },
  { id: 5, name: "seiko", logo: "/images/brands/seiko.png" },
  { id: 6, name: "orient", logo: "/images/brands/orient2.jpg" },

];

const BrandsSection: React.FC = () => {
  const t = useTranslations("CategoryList");
  return (
    <>
      <h2 className="text-2xl font-bold my-6">{t('brand')}</h2>
      <div className="bg-slate-50 py-10 rounded-lg">
          <div className="flex justify-center items-center py-3">
            {brands.map((brand) => (
              <div key={brand.id} className="w-full flex items-center justify-center gap-6 px-8">
                <Image
                width={140}
                height={140}
                  src={brand.logo}
                  alt={brand.name}
                  className="object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </>
  );
};

export default BrandsSection;
