import Link from "next/link";

export default function PaymentPage() {
  return (
    <div className="relative min-h-screen bg-paymnet-pattern flex items-center justify-center">
      <div className="absolute bg-slate-200 shadow-md rounded-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold text-gray-700 text-center mb-6">
          پرداخت آنلاین
        </h2>
        <form className="space-y-5">
          {/* شماره کارت */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              شماره کارت
            </label>
            <input
              type="text"
              placeholder="XXXX-XXXX-XXXX-XXXX"
              maxLength={19}
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* نام صاحب کارت */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              نام صاحب کارت
            </label>
            <input
              type="text"
              placeholder="نام و نام خانوادگی"
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* تاریخ انقضا */}
          <div className="flex gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                ماه انقضا
              </label>
              <input
                type="text"
                placeholder="MM"
                maxLength={2}
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                سال انقضا
              </label>
              <input
                type="text"
                placeholder="YY"
                maxLength={2}
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* CVV2 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              CVV2
            </label>
            <input
              type="text"
              placeholder="XXX"
              maxLength={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* دکمه پرداخت */}
          <div className="flex justify-between gap-x-4">
            <Link href="/payment/success"
              type="submit"
              className="w-[60%] text-center bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md"
            >
              پرداخت
            </Link>
            <Link
              className="w-[40%] text-center bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-md"
              href="/payment/fail"
            >
              انصراف
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
