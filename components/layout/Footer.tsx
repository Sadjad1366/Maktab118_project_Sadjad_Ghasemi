import React from "react";
import { FaTelegramPlane, FaGithub, FaFacebook } from "react-icons/fa";

const Footer:React.FC = () => {
  return (
    <div>
      <footer className="bg-gradient-to-r from-slate-300 to-slate-500">
        <div className="w-full container mx-auto">
          <div className="grid grid-cols-2 gap-8 px-4 py-6 lg:py-8 md:grid-cols-3">
            <div>
              <h2 className="border-b-2 py-2 max-w-90 mb-6 text-xl font-semibold text-gray-900 uppercase dark:text-white">
                گالری ساعت نینجا
              </h2>
              <div className="text-justify max-w-90 px-2">
                نماینده رسمی فروش و خدمات پس از فروش ساعتهای بوم‌مرسیه، رادو،
                گوچی، بالمن، تیسوت، سرتینا، هامیلتون، میدو، کلوین‌کلاین،
                ویکتورینوکس، سواروسکی، ونگر، سواچ و فلیک‌فلاک زیورآلات و
                کریستال‌های سواروسکی ابزارهای چندکاره، چاقوها و لوازم آشپزخانه و
                ادوات سفر ویکتورینوکس با بیش از ربع قرن تجربه
              </div>
            </div>
            <div className="flex flex-col gap-y-2">
              <h2 className="border-b-2 py-2 max-w-90 mb-6 text-xl font-semibold text-gray-900 uppercase dark:text-white">
                درباره ما
              </h2>

              <p className="hover:underline">تلفن: 77400524-021</p>

              <p className="hover:underline">
                ایمیل : sadjad.ghasemi@gmail.com
              </p>

              <p className="hover:underline">
                آدرس : خ پیروزی -خ ششم نیرو هوایی- فرعی 6/35 پلاک 28 واحد 3
              </p>
            </div>
            <div className="flex flex-col gap-y-2">
              <h2 className="border-b-2 py-2 max-w-90 mb-6 text-xl font-semibold text-gray-900 uppercase dark:text-white">
                شبکه های اجتماعی
              </h2>
              <div className="flex items-center">
                <p className="flex items-center px-1 gap-x-2">
                  <FaFacebook />: sadjad.ghasemi
                </p>
              </div>

              <div className="flex items-center">
                <a
                  href="https://github.com/sadjad1366"
                  className="hover:text-gray-900 dark:hover:text-white"
                >
                  <p className="flex items-center px-1 gap-x-2">
                    <FaGithub /> : github account
                  </p>
                </a>
              </div>
              <div className="flex items-center">
                <p className="flex items-center px-1 gap-x-2">
                  <FaTelegramPlane /> : SadjadQasemi66@
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="px-4 py-6 bg-gray-800 text-center">
          <span className="text-center text-gray-200 dark:text-gray-300 sm:text-center">
            تمام حق و حقوق استفاده از این سایت متعلق به گالری ساعت نینجا می باشد
          </span>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
