import { className } from "@/utils/classNames";

const adminLogin: React.FC = () => {
  return (
    <div className="bg-cover bg-center h-screen bg-hero-pattern relative">
       <div className="absolute inset-0 bg-black opacity-10"></div>
      <div className="relative max-w-sm mx-auto bg-white py-16">
      <form className="">
        <p className="text-center py-2">به پنل مدیریت خوش آمدید</p>
        <div className="mb-5 px-2">
          <label className="block mb-2 text-sm font-medium text-gray-900">
            نام کاربری خود را وارد نمایید
          </label>
          <input
            type="text"
            id="text"
            className={className("bg-gray-100 border border-gray-600 text-gray-900 px-2",
                  "text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block",
                  "w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400",
                  "dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500")}
            placeholder="نام کاربری"
            required
          />
        </div>
        <div className="mb-5 px-2">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            رمز خود را وارد نمایید
          </label>
          <input
            type="password"
            id="password"
            className={className("bg-gray-50 border border-gray-600 text-gray-900 text-sm rounded-lg",
              "focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700","dark:border-gray-600",
              "dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500")}
              placeholder="رمز عبور"
              required
          />
        </div>
        <div className="flex items-start mb-5">
          <div className="flex items-center h-5 px-2">
            <input
              id="remember"
              type="checkbox"
              value=""
              className={className("w-4 h-4 border border-gray-600 rounded bg-gray-50 focus:ring-3",
                "focus:ring-blue-600 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600",
                "dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800")}
              required
            />
          </div>
          <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-600">
            مرا به خاطر داشته باش
          </label>
        </div>
      <div className="flex justify-center">
      <button
          type="submit"
          className={className("text-white bg-blue-700 hover:bg-blue-800 focus:ring-4",
            "focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center",
            "dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800")}
        >
          ثبت
        </button>
      </div>
      </form>
      </div>
    </div>
  );
};
export default adminLogin;
