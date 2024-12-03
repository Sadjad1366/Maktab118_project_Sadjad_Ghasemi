
import Image from "next/image";

const CategoryList: React.FC = () => {
  return (
    <div className="bg-slate-700 py-5 rounded-lg">
      <div className="grid grid-cols-2 gap-4 px-4">
        {/* Automatic Watches */}
        <div className="relative bg-slate-300 rounded-lg h-40 overflow-hidden">
          <Image
            src="/images/category/orient-bg.png"
            layout="fill"
            style = {{objectFit:'cover'}}
            quality={100}
            alt="Automatic Watches"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <p className="text-white font-bold text-lg">ساعت های اتوماتیک</p>
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
            <p className="text-white font-bold text-lg">ساعت های اسکلتون</p>
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
            <p className="text-white font-bold text-lg">ساعت های هوشمند</p>
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
            <p className="text-white font-bold text-lg">ساعت های کورنوگراف</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryList;
