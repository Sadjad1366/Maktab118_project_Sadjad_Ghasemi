"use client";
import { className } from "@/utils/classNames";
import Image from "next/image";
import Link from "next/link";
import { IoMdCart } from "react-icons/io";

const Navbar: React.FC = () => {
  return (
    <div className="bg-gradient-to-r from-slate-500 to-slate-800">
      <nav className=" flex justify-between items-center container mx-auto">
        <div className="flex gap-x-4 py-4 px-3 ">
          <p className="text-white">LOGO</p>
          <p className="text-white">گالری ساعت نیجا</p>
        </div>
        <div>
          <Link href="/products" className="text-white"> نمایش محصولات</Link>
        </div>
        <div className="flex items-center gap-x-3 px-3">
          <Link href="/carts">
            <button className=" flex  items-center bg-green-500 rounded-md text-white py-2 gap-x-2 px-4">
              <IoMdCart />
              (0)
            </button>
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
