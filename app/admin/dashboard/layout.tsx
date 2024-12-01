import Link from 'next/link';

export default function DashboardLayout({
      children, // will be a page or nested layout
    }: {
      children: React.ReactNode
    }) {
  return (
  <div className='"bg-cover bg-center h-screen bg-bretling-pattern relative flex'>
        <section className=" h-screen w-64 bg-gray-200 text-white">
      <div className="p-6">
        <h2 className="text-2xl font-bold">logo</h2>
      </div>
      <ul>
        <li className="p-4 hover:bg-gray-700">
          <Link href="/admin/dashboard" className='text-2xl font-bold'>مدیریت محصولات</Link>

        </li>
        <li className="py-2 px-4 mt-4 hover:bg-gray-700">
          <Link href="/admin/dashboard/product">کالاها</Link>
        </li>
        <li className="py-2 px-4 hover:bg-gray-700">
          <Link href="/admin/dashboard/entity">موجودیت و قیمت</Link>
        </li>
        <li className="py-2 px-4 hover:bg-gray-700">
          <Link href="/admin/dashboard/orders">سفارشات</Link>
        </li>
      </ul>

    </section>
    {children}
  </div>
  );
};
