import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-800">
      <div className="text-center">
        <div className="text-9xl font-bold text-gray-400 mb-6">404</div>
        <h1 className="text-4xl text-gray-700 font-bold m-9">
          متاسفم. صفحه مد نظر پیدا نشد!!!!!
        </h1>
        <Link
          href="/"
          className="px-6 py-3 mt-4 bg-blue-600 text-white text-lg font-semibold rounded-lg shadow hover:bg-blue-700 transition"
        >
          بازگشت به صفحه اصلی
        </Link>
      </div>
    </div>
  );
}
