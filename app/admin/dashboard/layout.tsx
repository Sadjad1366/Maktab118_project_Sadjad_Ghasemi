import Link from 'next/link';

export default function DashboardLayout({
      children, // will be a page or nested layout
    }: {
      children: React.ReactNode
    }) {
  return (
  <div className='flex'>
        <section className="h-screen w-64 bg-gray-800 text-white">
      <div className="p-6">
        <h2 className="text-2xl font-bold">Watch Dashboard</h2>
      </div>
      <ul>
        <li className="p-4 hover:bg-gray-700">
          <Link href="/">Dashboard</Link>
        </li>
        <li className="p-4 hover:bg-gray-700">
          <Link href="/products">Products</Link>
        </li>
        <li className="p-4 hover:bg-gray-700">
          <Link href="/orders">Orders</Link>
        </li>
        <li className="p-4 hover:bg-gray-700">
          <Link href="/customers">Customers</Link>
        </li>
        {/* Add more links here */}
      </ul>

    </section>
    {children}
  </div>
  );
};
