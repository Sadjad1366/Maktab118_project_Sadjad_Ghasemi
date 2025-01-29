import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import Image from "next/image";

const CategoryList: React.FC = () => {
  const t = useTranslations("CategoryList")
  return (
    <Link href="/category">
      <h2 className="text-2xl font-bold mt-6 ">{t('category')}</h2>
      <div className="bg-slate-200 py-5 rounded-lg my-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 p-8">
          {/* Automatic Watches */}
          <div className="relative bg-slate-300 rounded-lg h-40 overflow-hidden">
            <Image
              src="/images/category/orient-bg.png"
              layout="fill"
              style={{ objectFit: "cover" }}
              quality={100}
              alt="Automatic Watches"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <p className="text-white font-bold text-lg">{t('automatic')}</p>
            </div>
          </div>
          {/* Skeleton Watches */}
          <div className="relative bg-slate-300 rounded-lg h-40 overflow-hidden">
            <Image
              src="/images/category/skeleton2.png"
              layout="fill"
              objectFit="cover"
              quality={100}
              alt="Skeleton Watches"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <p className="text-white font-bold text-lg">{t('skeleton')}</p>
            </div>
          </div>
          {/* Smart Watches */}
          <div className="relative bg-slate-300 rounded-lg h-40 overflow-hidden">
            <Image
              src="/images/category/smart.png"
              layout="fill"
              objectFit="cover"
              quality={100}
              alt="Smart Watches"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <p className="text-white font-bold text-lg">{t('smart')}</p>
            </div>
          </div>
          {/* Chronograph Watches */}
          <div className="relative bg-slate-300 rounded-lg h-40 overflow-hidden">
            <Image
              src="/images/category/chornograph2.png"
              layout="fill"
              objectFit="cover"
              quality={100}
              alt="Chronograph Watches"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <p className="text-white font-bold text-lg">{t('chornograph')}</p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CategoryList;
