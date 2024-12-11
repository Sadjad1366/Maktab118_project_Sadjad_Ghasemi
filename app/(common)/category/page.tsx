export default function CategoryPage() {
      return (
        <div className="mt-2 py-2 gap-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {/* Automatic */}
          <div className="relative group hover:opacity-70">
            <img src="/images/categoryPage/automatic.jpg" className="w-full h-auto" />
            <div className="opacity-0 group-hover:opacity-100 duration-700 absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center text-xl text-white font-semibold">
              AUTOMATIC
            </div>
          </div>

          {/* Chrono */}
          <div className="relative group hover:opacity-70">
            <img src="/images/categoryPage/chorno3.webp" className="w-full h-auto" />
            <div className="opacity-0 group-hover:opacity-100 duration-700 absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center text-xl text-white font-semibold">
              CHRONOGRAPH
            </div>
          </div>

          {/* Skeleton */}
          <div className="relative group hover:opacity-70">
            <img src="/images/categoryPage/skeleton.jpg" className="w-full h-auto" />
            <div className="opacity-0 group-hover:opacity-100 duration-700 absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center text-xl text-white font-semibold">
              SKELETON
            </div>
          </div>

          {/* Smart */}
          <div className="relative group hover:opacity-70">
            <img src="/images/categoryPage/smart.jpg" className="w-full h-auto" />
            <div className="opacity-0 group-hover:opacity-100 duration-700 absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center text-xl text-white font-semibold">
              SMART
            </div>
          </div>
        </div>
      );
    }
