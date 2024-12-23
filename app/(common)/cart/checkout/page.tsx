export default function Checkout() {
      

  return (
    <div className="bg-checkout-pattern flex justify-center py-6 w-full h-screen rounded-lg">
      <form className="bg-slate-200 px-8 py-2 space-y-3 rounded-xl shadow-md w-full max-w-md my-auto">
        <div className="flex justify-between items-center gap-x-8">
          <p className="text-xl font-semibold">نهایی کردن خرید</p>
          <img src="/images/logo/ninja.png" alt="Ninja Logo" className="h-16" />
        </div>
        <div className="flex flex-col">
          <label className="p-2 font-semibold" htmlFor="firstanme">
            نام
          </label>
          <input className="rounded-md shadow-lg" type="text" />
        </div>
        <div className="flex flex-col">
          <label className="p-2 font-semibold" htmlFor="lastname">
            نام خانوادگی
          </label>
          <input className="rounded-md shadow-lg" type="text" />
        </div>
        <div className="flex flex-col">
          <label className="p-2 font-semibold" htmlFor="address">
            آدرس
          </label>
          <textarea className="rounded-md shadow-lg" rows={3} />
        </div>
        <div className="flex flex-col">
          <label className="p-2 font-semibold" htmlFor="phoneNumber">
            موبایل
          </label>
          <input className="rounded-md shadow-lg" type="text" />
        </div>
        <div className="flex flex-col">
          <label className="p-2 font-semibold" htmlFor="deliveryDate">
            تاریخ تحویل
          </label>
          <input className="rounded-md shadow-lg" type="text" />
        </div>
        <div className="text-center">
          <button className="bg-green-600 rounded-lg text-slate-100 p-2">
            پرداخت
          </button>
        </div>
      </form>
    </div>
  );
}
