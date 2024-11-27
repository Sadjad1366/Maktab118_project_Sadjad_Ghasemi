// import Image from "next/image";

// const CategoryList: React.FC = () => {
//   return (
//     <div>
//       <div className="w-full bg-slate-700 grid grid-cols-2 gap-y-2 gap-x-3 py-3 px-2 relative">
//         <div className="w-full flex gap-x-3 justify-center items-center bg-slate-300 rounded-lg h-36">
//           <Image
//             src="/images/category/orient-bg.png"

//             width={100}
//             height={100}
//             alt="Picture of the automatic"
//           />
//           <p className="font-semibold text-lg">ساعت های اتوماتیک</p>
//         </div>
//         <div className="w-full flex gap-x-3 justify-center items-center bg-slate-300 rounded-lg h-36">
//           <Image
//             src="/images/category/skeleton2.png"
//             width={100}
//             height={100}
//             alt="Picture of the automatic"
//           />
//           <p className="font-semibold text-lg">ساعت های اسکلتون</p>
//         </div>
//         <div className="w-full flex gap-x-3 justify-center items-center bg-slate-300 rounded-lg h-36">
//           <Image
//             src="/images/category/smart.png"
//             width={100}
//             height={100}
//             alt="Picture of the automatic"
//           />
//           <p className="font-semibold text-lg">ساعت های هوشمند</p>
//         </div>
//         <div className="w-full flex gap-x-3 justify-center items-center bg-slate-300 rounded-lg h-36">
//           <Image
//             src="/images/category/chornograph2.png"
//             width={100}
//             height={100}
//             alt="Picture of the automatic"
//           />
//           <p className="font-semibold text-lg">ساعت های کورنوگراف</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CategoryList;
import Image from "next/image";

const CategoryList: React.FC = () => {
  return (
    <div>
      <div className="w-full bg-slate-700 grid grid-cols-2 gap-y-2 gap-x-3 py-3 px-2 relative">
        <div className="w-full bg-slate-300 rounded-lg h-36 relative overflow-hidden">
          <Image
            src="/images/category/orient-bg.png"
            layout="fill"
            objectFit="cover"
            alt="Picture of the automatic"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <p className="font-bold text-2xl text-white">ساعت های اتوماتیک</p>
          </div>
        </div>
        <div className="w-full bg-slate-300 rounded-lg h-36 relative overflow-hidden">
          <Image
            src="/images/category/skeleton2.png"
            layout="fill"
            objectFit="cover"
            alt="Picture of the skeleton"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <p className="font-bold text-2xl text-white">ساعت های اسکلتون</p>
          </div>
        </div>
        <div className="w-full bg-slate-300 rounded-lg h-36 relative overflow-hidden">
          <Image
            src="/images/category/smart.png"
            layout="fill"
            objectFit="cover"
            alt="Picture of the smart"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <p className="font-bold text-2xl text-white">ساعت های هوشمند</p>
          </div>
        </div>
        <div className="w-full bg-slate-300 rounded-lg h-36 relative overflow-hidden">
          <Image
            src="/images/category/chornograph2.png"
            layout="fill"
            objectFit="cover"
            alt="Picture of the chronograph"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <p className="font-bold text-2xl text-white">ساعت های کورنوگراف</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryList;
