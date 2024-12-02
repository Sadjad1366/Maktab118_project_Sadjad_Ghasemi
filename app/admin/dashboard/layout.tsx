import Link from "next/link";
import { redirect } from "next/navigation";



export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-cover bg-center h-screen bg-bretling-pattern relative flex justify-between">
      <section className="flex flex-col h-screen w-64 bg-gray-300 text-slate-800">
        <div className="p-6">
          <h2 className="text-2xl font-bold">logo</h2>
        </div>
        <div>
          <ul>
            <li className="p-4 hover:bg-gray-400">
              <Link href="/admin/dashboard" className="text-2xl font-bold">
                پنل مدیریت
              </Link>
            </li>
            <li className="py-2 px-4 mt-4 hover:bg-gray-400">
              <Link href="/admin/dashboard/products">کالاها</Link>
            </li>
            <li className="py-2 px-4 hover:bg-gray-400">
              <Link href="/admin/dashboard/entity">موجودیت و قیمت</Link>
            </li>
            <li className="py-2 px-4 hover:bg-gray-400">
              <Link href="/admin/dashboard/orders">سفارشات</Link>
            </li>
          </ul>
        </div>

        <div className="mt-auto p-6">
          <Link className="text-blue-700 font-medium hover:underline" href="/">بازگشت به سایت</Link>
        </div>
      </section>
      <div className="w-full flex justify-center items-center p-6">
        {children}
      </div>
    </div>
  );
}
